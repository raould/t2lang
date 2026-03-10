# The Root Cause: Typed Syntax vs. Uniform Data

Stage7's quasi-quoting hits a wall because of a mismatch between two models:

The current model — syntax-directed quasi-quoting on a typed AST:
The grammar has distinct syntactic categories: IDENTIFIER, typeExpr, expression, statement, etc. Quasi-quoting is grafted on top of this by allowing unquote only where the grammar already expects an expression. Everywhere the grammar expects a different syntactic category — an identifier, a type, a return annotation — unquote is a parse error.

The model quasi-quoting was designed for — homoiconic syntax:
In Lisp/Scheme, the language's syntax is its data structure. A quasi template like `(lambda ((,name : ,type)) ,body) works because ,name, ,type, and ,body are all the same thing: a position in a list. The quasi-quoter does not know or care that name "should be an identifier" and type "should be a type expression" — those distinctions don't exist at the data level.

# The general principle:

Quasi-quoting is only unconditionally expressive when the language is homoiconic — when the grammar produces a uniform data representation with no syntactic categories that restrict where holes can appear.

When a language has a typed syntax (distinct identifier, type, expression, statement positions), quasi-quoting requires an ever-growing list of grammar extensions to punch holes in each new position. Every new use case adds another case — exactly the pattern the plan describes.

# The Three Canonical Resolutions

* Option 1 — Accept the limitation (current path)
Extend quasiTypeExpr and quasiFnSignature as planned. Works, but it's an ongoing maintenance burden. Every new syntactic position where unquote is wanted requires a grammar PR.

* Option 2 — Procedural macros (fully explicit AST construction)
Drop quasi-quoting as the primary tool. Macros receive raw AST nodes (as JavaScript objects) and return raw AST nodes, constructed by API calls rather than templates:

```
(defmacro make-handler ((name) (type))
  (return (object
    (tag 'lambda')
    (params (array (object (tag 'param') (name (evalMacroExpr name)) 
                           (typeAnnotation (evalMacroExpr type)))))
    (body ...))))
```

No grammar restrictions at all — the macro just builds data. The tradeoff is verbosity: no syntactic sugar, every node is explicit.

* Option 3 — Two-level representation (the principled fix)
Macros operate on the raw s-expression representation (lists and atoms, before the typed AST is built), and their output is re-parsed by the normal AST builder. Concretely:

- The macro receives the raw parse tree (or a list representation of it)
- The macro body uses quasi-quoting on lists, not on typed AST nodes
- The expansion result is a list structure
- The compiler passes this list back through the grammar/AST builder

This is what Racket and other sophisticated Lisp macro systems do internally. Quasi-quoting works everywhere because it operates below the level of syntactic categories — before the grammar has imposed structure. The type checking / AST building happens after expansion, on the expanded form.

# The Deeper Design Question

The real fork in the road for Stage7 is: at what level should macros operate?

Level	// Pros	// Cons
Typed AST nodes (current) // Type-safe, errors early, fast expansion	// Quasi-quoting is category-restricted
Raw s-expressions (Option 3)  // Quasi-quoting works everywhere	// Re-parsing overhead; expansion errors reported later
Explicit node construction (Option 2) // Maximum flexibility, no grammar changes  // Verbose; loses quasi-quoting elegance entirely

Option 3 is the principled answer to "what general principle would resolve this and future issues?" — but it's a significant architectural change: the macro expander would need to produce s-expressions (or list-structured data) and the compiler pipeline would need a re-parse step between macro expansion and AST lowering.

---

# Option 3 Implementation Plan: Two-Level Representation

## Goal

Allow `(unquote expr)` to appear in any syntactic position inside a quasi template — parameter names, type annotations, return types, generic type arguments, class names, method keys — without requiring grammar extensions for each new position. The fix must be backwards-compatible: all existing quasi templates that work today must continue to work unchanged.

## Core Insight

The current pipeline builds a **typed AST** from the ANTLR parse tree before macro expansion. Quasi templates are stored as fragments of this typed AST, so `unquote` can only appear where the grammar expects an `expression`. Identifier and type positions use different grammar rules and cannot host `unquote`.

The fix: quasi templates are instead stored as **s-forms** — a uniform, grammar-agnostic tree of atoms and lists. Unquote can appear anywhere in an s-form because s-forms have no syntactic categories. After macro expansion substitutes unquotes into the s-form, the result is **re-parsed** by a hand-written `parseForm` function that reconstructs the typed AST. Type errors in templates are reported at re-parse time rather than parse time, which is acceptable.

## Architecture: Before and After

**Current pipeline:**
```
source text
  → ANTLR parse
  → typed AST (quasiForm = typed inner fragment, unquote only in expr positions)
  → expandAll: evalQuasi(typedFragment) → typed AST node
  → lower → codegen
```

**New pipeline:**
```
source text
  → ANTLR parse
  → typed AST (quasiForm = sForm tree, unquote holes anywhere)
  → expandAll: evalQuasiToSForm(sFormTree) → SForm value
               parseForm(SForm) → typed AST node
  → lower → codegen
```

The `parseForm` step is new. Everything else in the outer pipeline (lower, codegen, scope-resolve, expandAll worklist) is unchanged.

## The SForm Type

An SForm is a plain JavaScript value — no class, no tag field:

```
SForm = string          // atom: identifier name, keyword, string literal, number, boolean, colon
      | SFormOpaque     // opaque: a pre-built typed AST node embedded by unquote
      | SForm[]         // list: a parenthesized sequence of sub-sforms
```

`SFormOpaque = { __opaque: true, node: ASTNode }` — a thin wrapper distinguishing embedded typed nodes from plain strings.

Atoms encode their surface syntax as strings: `"x"`, `"42"`, `"\"hello\""`, `":"`, `"number"`, `"lambda"`, `":keyword"`.

## The SFormNode AST Type (Grammar-Level)

These are the typed AST nodes produced by the ANTLR parse / `astSForm` builder — they still carry source position. They are distinct from SForm values (the post-expansion flat representation).

```
SFormNode = { tag: 'sf-atom',   value: string,           id, text }
           | { tag: 'sf-list',  items: SFormNode[],      id, text }
           | { tag: 'sf-hole',  expr:  ASTExpr,          id, text }  // (unquote expr)
           | { tag: 'sf-splice',expr:  ASTExpr,          id, text }  // (unquote-splicing expr)
```

The quasi AST node becomes `{ tag: 'quasi', sform: SFormNode, id, text }`.

---

## Phase 0 — Grammar: `sForm` Rule

**Files changed:** `Stage8.g4` (grammar only, no .s7 files in this phase)
**Build:** `npm run build-grammar` only (generates new parser); `build-compiler` is not yet needed because `Stage8-ast.s7` changes come in Phase 0b.

### Grammar change

Replace the current `quasiForm` rule:

```antlr
// BEFORE
quasiForm
    : expression
    | topLevelLet | topLevelConst | typeAlias | interfaceDef | classDef | importForm
    ;

// AFTER
quasiForm
    : sForm
    ;

sForm
    : LPAREN UNQUOTE expression RPAREN       // hole: (unquote expr)
    | LPAREN UNQUOTE_SPLICING expression RPAREN  // splice hole: (unquote-splicing expr)
    | LPAREN sForm* RPAREN                   // list: any parenthesized sequence
    | ~(LPAREN | RPAREN)                     // atom: any single token except parens
    ;
```

The `~(LPAREN | RPAREN)` complement catches all keyword tokens, identifiers, numbers, strings, booleans, `:`, `,`, and everything else — without enumeration. Unquote holes are recognized before the generic list rule (ANTLR tries alternatives in order).

Note: `UNQUOTE` and `UNQUOTE_SPLICING` tokens remain in the grammar. They are now parsed in the `sForm` context directly, not through the old `unquote`/`unquoteSplicing` sub-rules. The old `unquote` and `unquoteSplicing` rules are still used outside quasi (e.g., if they appear in expression contexts), so they are kept.

### AST change — `astSForm` in `Stage8-ast.s7`

Add `astSForm(ctx)` that walks a `sForm` parse context and builds `SFormNode` trees:

- If `ctx` has an `UNQUOTE` child: `{ tag: 'sf-hole', expr: astExpression(ctx.expression()), ... }`
- If `ctx` has an `UNQUOTE_SPLICING` child: `{ tag: 'sf-splice', expr: astExpression(ctx.expression()), ... }`
- If `ctx` has inner `sForm()` children: `{ tag: 'sf-list', items: ctx.sForm().map(astSForm), ... }`
- Otherwise (atom): `{ tag: 'sf-atom', value: ctx.getText(), ... }`

Change `astQuasiquote(ctx)` to call `astSForm(ctx.quasiForm().sForm())` for the inner form instead of the old type-specific dispatch.

### Acceptance test (Phase 0)

Compile `(quasi 42)` and `(quasi (+ x 1))`. Confirm the compiler does not crash. (The macro expander will fail to handle the new `sf-*` tags — that is expected; fix comes in Phase 1.)

---

## Phase 1 — `evalQuasiToSForm` and `nodeToSForm`

**Files changed:** `Stage8-macro-expand.s7`
**Build:** `npm run build-compiler`

### `nodeToSForm(v)`

Converts a macro-time JavaScript value (the result of `evalMacroExpr`) into an SForm for embedding in a template:

| Input | Output |
|---|---|
| `string` | the string (atom) |
| `number` | string representation |
| `boolean` | `"true"` or `"false"` |
| `null` / `undefined` | `"null"` |
| `{ tag: 'identifier', name: s }` | the string `s` (atom) |
| `{ tag: 'literal', value: v }` | string representation of `v` |
| `{ tag: 'keyword', value: s }` | the string `s` (atom, e.g. `":foo"`) |
| `SForm[]` (array) | the array (for splice contexts) |
| any other AST node | `{ __opaque: true, node: v }` |

Arrays of s-forms (from `unquote-splicing`) are handled in `evalQuasiToSForm` splice logic, not here.

### `evalQuasiToSForm(sfNode, bindings, env, depth)`

Walks an `SFormNode` tree and produces a plain `SForm` value:

- `sf-atom`: return `sfNode.value` (the string)
- `sf-hole` at `depth === 1`: `return nodeToSForm(evalMacroExpr(sfNode.expr, bindings, env))`
- `sf-hole` at `depth > 1`: return `{ __opaque: true, node: { tag: 'sf-hole', expr: evalQuasiToSForm(sfNode.expr, ..., depth - 1) } }` — preserve hole for nested quasi
- `sf-splice` at `depth === 1`: handled in list context (see below)
- `sf-list`: iterate items; for each item, if it is `sf-splice` at depth 1, evaluate and splice (the value must be an array of SForms); otherwise call `evalQuasiToSForm` and push. Return the resulting `SForm[]`.
- For depth changes on nested `quasi`: if the sfNode is `sf-list` and its first item is the atom `"quasi"`, increment depth for the inner items.

### Change `evalMacroExpr` for `quasi`

```scheme
;; BEFORE
(if (=== (. node tag) 'quasi')
  (return (evalQuasi (. node expr) bindings env 1)))

;; AFTER
(if (=== (. node tag) 'quasi')
  (return (evalQuasiToSForm (. node sform) bindings env 1)))
```

The result is now an `SForm` value (not a typed AST node). The caller is responsible for running `parseForm` on it.

### Acceptance test (Phase 1)

Write a unit test (not end-to-end) that:
1. Builds a simple `SFormNode` tree for `(+ x 1)` manually
2. Calls `evalQuasiToSForm` with a bindings map `{x → "myVar"}`
3. Asserts the result is `["+", "myVar", "1"]`

Also add a test for opaque embedding: pass an identifier AST node as a binding, confirm `nodeToSForm` wraps it as opaque vs. extracts its name string.

---

## Phase 2 — `parseForm`: S-Form to Typed AST

**Files changed:** new module `Stage8-parse-form.s7`
**Build:** `npm run build-compiler` (new module added to build script)

`parseForm` is a hand-written recursive descent parser over `SForm` values. It produces typed AST nodes in the same shape as `astTopLevel` / `astStatement` / `astExpression`. It has no access to source position (spans), so it uses `nextNodeId()` for IDs and carries a `spanId` argument (the ID of the originating quasi form) for error attribution.

### Entry points

```
parseForm(sform, spanId, env)      → ASTNode (dispatches on head or atom type)
parseFormExpression(sform, ...)    → ASTExprNode
parseFormStatement(sform, ...)     → ASTStmtNode
parseFormTopLevel(sform, ...)      → ASTTopLevelNode
parseFormTypeExpr(sform, ...)      → ASTTypeNode
parseFormFnSignatureTyped(sform, ...)  → { params, rest, returnType }
parseFormTypedParam(sform, ...)    → { name, optional, typeAnnotation }
parseFormClassBody(sform, ...)     → ASTClassBodyNode
```

### Dispatch in `parseForm`

For a list sform (array), inspect `sform[0]` (the head atom or opaque):

- If head is in the **expression head set** (`"+"`, `"-"`, `"*"`, `"/"`, `"lambda"`, `"fn"`, `"async-lambda"`, `"new"`, `"."`, `"index"`, `"ternary"`, `"if"`, `"object"`, `"array"`, `"quasi"`, `"unquote"`, ...): delegate to `parseFormExpression`
- If head is in the **statement head set** (`"let*"`, `"const*"`, `"return"`, `"throw"`, `"while"`, `"begin"`, `"set!"`, ...): delegate to `parseFormStatement`
- If head is in the **top-level head set** (`"let"`, `"const"`, `"class"`, `"defmacro"`, `"type"`, `"interface"`, `"import"`, `"export"`, ...): delegate to `parseFormTopLevel`

For an atom sform: parse as identifier or literal (try numeric conversion, boolean check, string-literal check, then fall back to identifier).

For an opaque sform (`sform.__opaque === true`): two cases must be distinguished before returning anything.

**Case A — regular embedded AST node** (`opaque.node.tag` is a normal AST tag such as `'identifier'`, `'call'`, `'literal'`, etc.): return `opaque.node` directly. It is already a typed AST node and needs no further parsing.

**Case B — preserved nested quasi hole** (`opaque.node.tag === 'sf-hole'` or `opaque.node.tag === 'sf-splice'`): this opaque was produced by `evalQuasiToSForm` when it encountered an unquote hole at quasi depth > 1. It should **not** be returned as a typed AST node; `sf-hole` is not a valid AST tag and the lowerer will crash on it. Instead:
- Treat `sf-hole` as an `unquote` expression: return `{ tag: 'unquote', expr: opaque.node.expr, id: nextNodeId() }` where `opaque.node.expr` is the preserved typed expression from the original hole.
- Treat `sf-splice` similarly: return `{ tag: 'unquote-splicing', expr: opaque.node.expr, id: nextNodeId() }`.

These reconstructed `unquote`/`unquote-splicing` nodes are legal inside a quasi template's body and will be handled correctly when the surrounding quasi is later evaluated.

**Checking for opaque must happen first in every dispatch path**, before the string/array checks, because an opaque can appear in any s-form position (as a function argument, as the head of a list, as a type expression, as a binding name, etc.).

### `reconstructSFormNode` — Converting `SForm` Back to `SFormNode` for Nested Quasi

When `parseForm` encounters a list whose head atom is `"quasi"` or `"quote"`, the second element (the inner template) must be stored as a grammar-level `SFormNode` in the resulting quasi AST node — **not** parsed as a typed expression. The quasi node's `sform` field is an `SFormNode`, so the plain `SForm` from `evalQuasiToSForm` must be converted back.

`reconstructSFormNode(sform: SForm) → SFormNode`:
- string → `{ tag: 'sf-atom', value: string, id: nextNodeId() }`
- `SForm[]` → `{ tag: 'sf-list', items: sform.map(reconstructSFormNode), id: nextNodeId() }`
- opaque where `opaque.node.tag === 'sf-hole'` → `{ tag: 'sf-hole', expr: opaque.node.expr, id: nextNodeId() }` — the `expr` is the preserved typed expression from the depth-> 1 hole, still valid for a future unquote evaluation
- opaque where `opaque.node.tag === 'sf-splice'` → `{ tag: 'sf-splice', expr: opaque.node.expr, id: nextNodeId() }`
- opaque with any other tag (a regular typed AST node embedded inside a nested quasi via unquote at depth > 1): not representable as an `SFormNode`; push a parse error ("typed AST node cannot be embedded in a nested quasi template") and return `{ tag: 'sf-atom', value: '?', id: nextNodeId() }` as a placeholder

The `parseForm` case for `"quasi"` head:
```
head is "quasi" or "quote":
  innerSForm = sform[1]   // may be string, array, or opaque
  sformNode = reconstructSFormNode(innerSForm)
  return { tag: 'quasi', sform: sformNode, id: nextNodeId() }
```

This keeps the quasi's hole structure intact so that when the generated quasi is later evaluated by `evalMacroExpr → evalQuasiToSForm`, the holes are re-encountered and can be substituted at that time.

### Disambiguation for ambiguous heads

Some heads appear in multiple contexts (`"if"` appears as expression and statement, `"let"` at statement level has parens around name, at top level does not):

- `"if"`: always `parseFormExpression` (the lowerer handles if-as-statement)
- `"let"` list: if `sform[1]` is an array → statement (destructure-style binding); if string or opaque → top-level decl
- `"const"`: same disambiguation as `"let"`

### `parseFormTypedParam(sform)`

The key new capability. A typed param in s-form is a list whose elements are:

| Grammar form | S-form list | Notes |
|---|---|---|
| `(x)` | `["x"]` | required, no type |
| `(x : number)` | `["x", ":", "number"]` | required, typed |
| `(x?)` or `(x ?)` | `["x?"]` or `["x", "?"]` | optional, no type |
| `(x? : number)` or `(x ? : number)` | `["x?", ":", "number"]` or `["x", "?", ":", "number"]` | optional, typed |

**`IDENTIFIER : ~[() \n\t\r:;]+`** — the `?` character is in the identifier character set, so `x?` is always a single atom `"x?"`. The `OPTIONAL : '?'` token only appears as a separate atom when the user writes a space before the `?` (unusual but grammatically valid). `parseFormTypedParam` must handle both spellings.

**No default values.** `typedParam` in Stage8's grammar does not support default parameter values. Defaults must be expressed through `let*` bindings inside the function body.

**Algorithm for `parseFormTypedParam(sform)`:**

1. Read position 0 as `rawName`:
   - If it is an opaque Case-A node, extract the string name from `opaque.node.name` (for identifier nodes) or `opaque.node.value` (for literal/string nodes). If neither, push parse error.
   - If it is a plain string, use it directly.
   - If it is an array, push parse error (a list cannot be a param name).

2. Detect optional marker — two spellings:
   - Suffix style: `rawName` ends with `"?"` → `optional = true`, `name = rawName.slice(0, -1)`
   - Separate atom style: position 1 is the string `"?"` → `optional = true`, advance cursor past `"?"`, `name = rawName`
   - Otherwise: `optional = false`, `name = rawName`

3. Detect colon separator at the current cursor position:
   - If remaining list is empty → `typeAnnotation = null`
   - If next atom is `":"` → advance cursor; read type from remaining positions via `parseFormTypeExpr`
   - Otherwise → push parse error (unexpected content after name)

4. `parseFormTypeExpr` for the type: the type may be a single atom string (`"number"`), an array (`["union", "A", "B"]`), or an opaque Case-A node (a pre-built type AST node). Apply the opaque check first.

5. Return `{ name, optional, typeAnnotation, id: nextNodeId() }`.

**Rest params.** Rest params do not use `typedParam`. In the grammar, `restParam : LPAREN REST IDENTIFIER (COLON typeExpr)? RPAREN` uses the keyword `rest` (token `REST : 'rest'`). In s-form this is a list `["rest", "args"]` or `["rest", "args", ":", "T[]"]`. `parseFormFnSignature` must check whether the last param sub-list starts with the atom `"rest"` and, if so, route it to a `parseFormRestParam` helper rather than `parseFormTypedParam`. The unquoting rules for name and type are identical — the name atom `"args"` follows the same Case-A opaque / plain string logic as above, and `typeAnnotation` uses `parseFormTypeExpr`.

**Unquoting in name and type positions.** Because `sform` is uniform data by the time `parseFormTypedParam` runs, there is no grammar restriction on what the name or type values can be — they are just positions in an array. A macro that produces `[opaque(gensymResult), ":", opaque(computedTypeNode)]` as a param sub-list is valid and handled by the opaque Case-A branch of each step above. The `optional` detection also applies to opaque names: check whether the extracted name string ends with `"?"`.

This is where unquoting parameter names and types becomes possible.

### `parseFormTypeExpr(sform)`

For an atom string: check against known primitive type names (`"number"`, `"string"`, `"boolean"`, `"void"`, `"any"`, `"never"`, `"unknown"`, `"null"`, `"undefined"`, `"object"`, `"symbol"`, `"bigint"`). Otherwise treat as named type reference.

For a list: dispatch on head:
- `"union"` → `{ tag: 'type-union', members: tail.map(parseFormTypeExpr) }`
- `"intersect"` → intersection
- `"Array"` → `{ tag: 'type-array', element: parseFormTypeExpr(sform[1]) }`
- `"tuple"` → tuple
- `"fn"` → function type
- Anything else → `{ tag: 'type-application', fn: parseFormTypeExpr(head), args: tail.map(parseFormTypeExpr) }` — this covers `(AsyncGenerator T)`, `(Promise R)`, `(Map K V)`, etc.

For an opaque: the embedded node is a pre-built type AST node; return it directly.

### Error handling

If `parseForm` cannot recognize a form, it pushes an error to `env.errors` (the macro env) with `spanId` for attribution, and returns a sentinel `{ tag: 'parse-error', message: '...', id: nextNodeId() }`. The `expandAll` loop checks for parse errors in expanded nodes and promotes them to `env.errors`, causing the compiler to exit 1 after expansion.

### Acceptance tests (Phase 2 — unit tests, not end-to-end)

All in a new `tests/parseForm.test.ts`:

1. `parseForm(["+", "x", "1"])` → call expr with op `+`, args `[identifier x, literal 1]`
2. `parseForm(["lambda", [["x", ":", "number"]], ["+", "x", "1"]])` → lambda with typed param `x: number`, body `[+ x 1]`
3. `parseForm(["async-lambda", [[opaque("ctx"), ":", opaque(capType)]], ...])` → async-lambda with name from opaque, type from opaque
4. `parseForm("42")` → literal 42
5. `parseForm(["AsyncGenerator", opaque(elemType)])` → type-application for AsyncGenerator with opaque arg
6. `parseForm(["class", "Foo", ["class-body", ...]])` → class-def
7. Malformed: `parseForm(["bogus-head", "x"])` → parse-error node, error in env.errors

---

## Phase 3 — Pipeline Integration

**Files changed:** `Stage8-macro-expand.s7`, `Stage8-ast.s7` (minor: import parseForm)
**Build:** `npm run build-compiler`

### Change `evalMacroExpr` for quasi

After `evalQuasiToSForm` returns an SForm, immediately call `parseForm`:

```scheme
(if (=== (. node tag) 'quasi')
  (let* ((sform (evalQuasiToSForm (. node sform) bindings env 1))
         (parsed (parseForm sform (. node id) env)))
    (return parsed)))
```

The result is a typed AST node again, same as before — except now it was produced via the s-form path and can contain nodes with arbitrary names and types.

### `expandAll` worklist

No structural change needed. Macro results are typed AST nodes (because `evalMacroExpr` now calls `parseForm` before returning). The worklist already handles typed AST nodes correctly.

The one addition: after `expandTopLevelMacroCall` returns a result (which is now a typed AST node from `parseForm`), check for `{ tag: 'parse-error' }` nodes in the result (including nested). If any are found, the error was already pushed to `env.errors`; skip the node (do not add to `expandedBody` or worklist).

### `expandExpr` macro call path

Same treatment: `expandMacroCall` returns a typed AST node (already through `parseForm`). The existing array-in-expression-position check remains unchanged.

### Remove old `evalQuasi` from the hot path

`evalQuasi` is no longer called from `evalMacroExpr`. It can be kept for internal use (e.g., `addScopeToNode` still uses it in scope-stamping), or gradually migrated. Mark it as internal / do not export it in Phase 3.

Keep the `evalQuasi` export for now so existing unit tests (`tests/evalQuasiStmts.test.ts`, etc.) continue to pass unchanged through the transition.

### Acceptance tests (Phase 3 — end-to-end)

Add to `tests/macroIntegration.test.ts` (or a new `tests/quasiTypePos.test.ts`):

**Test A — unquote in parameter name position:**
```scheme
(defmacro make-adder ((pname))
  (return (quasi (lambda (((unquote pname) : number)) (+ (unquote pname) 1)))))
(const addOne (make-adder x))
(asrt (addOne 5) 6)
```

**Test B — unquote in type annotation position:**
```scheme
(defmacro typed-identity ((T))
  (return (quasi (lambda (((val) : (unquote T))) val))))
(const id (typed-identity number))
(asrt (id 42) 42)
```

**Test C — unquote in generic type argument:**
```scheme
(defmacro wrap-promise ((T))
  (return (quasi (async-lambda () (returns (Promise (unquote T)))
                  (return 42)))))
;; Compiler accepts (Promise (unquote T)) as a type expression; id checks via ts type-check
```

**Test D — backwards compatibility:**
All existing quasi tests must still pass without modification. Run the full suite after Phase 3 and compare totals.

---

## Key Constraints and Notes

**Build order:** Grammar changes require `npm run build-grammar` (regenerates ANTLR parser TS files) before `npm run build-compiler`. Code-only changes only need `npm run build-compiler`.

**s7 syntax reminders:**
- `if` cannot be used as a `let*` binding value — use a separate helper function
- `||` takes exactly 2 args — nest: `(|| a (|| b c))`
- `ternary` for inline conditional in object literals
- Top-level `(const NAME expr)` vs statement-level `(const (NAME) expr)`

**The `sForm[0]` disambiguation problem:** Some forms (e.g., `"let"`) are ambiguous between statement and top-level depending on whether `sform[1]` (the binding name slot) is an atom string or a list. `parseForm` must inspect the second element to disambiguate, not just the head. Document each ambiguous head in `parseForm`'s dispatch table.

**Opaque node propagation:** An opaque node embedded via unquote can appear at any position in the s-form. `parseForm` must check for opaque at every position it reads a sub-form — not just at the top level. Helper `unwrapAtom(sform) → string | null` and `unwrapOpaque(sform) → ASTNode | null` should be used defensively throughout.

**Error locality:** Parse errors from `parseForm` are attributed to the quasi form's `spanId`, not to the individual s-form element position (because s-forms have no per-element source spans). This is a known limitation. Future work could thread source position through `evalQuasiToSForm` by annotating atoms with the quasi form's span.

**`quasiArgs` and `quasiClassBody`:** These helpers in `Stage8-macro-expand.s7` operate on typed AST arrays (the body of lambdas, class elements, etc.). In Phase 3 they are no longer called from `evalMacroExpr` for quasi expansion (that goes through `evalQuasiToSForm` → `parseForm`). They remain used by `evalQuasi` for the non-quasi expansion paths (e.g., expanding macro calls inside lambda bodies). No change needed to these functions in Phase 3.
