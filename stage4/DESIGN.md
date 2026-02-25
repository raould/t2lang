# Macros

- **Macros** (compile‑time AST transformers)
- **Gensym** (hygienic symbol generation)
- **Reader macros** (surface‑syntax sugar → Stage 4 AST) — *intentionally deferred; see Section 3*

---

## 1. Macro system (core hygienic macros)

### Purpose and scope

Macros in t2lang operate on **Stage 4 AST**, not raw text, and run **before lowering**. They must be:

- **Explicit**: declared with `(defmacro name (params…) body…)`
- **Hygienic**: no accidental variable capture, enforced via KFFD (sets of scopes)
- **Deterministic**: no runtime side effects, no I/O, no global mutation
- **Composable**: macros may expand into forms containing other macros, including macros that generate macros

### Macro‑time helper functions

Macros may call user‑defined helper functions, but only functions explicitly annotated as macro‑time with `#[macro-time]`. This keeps the compile‑time/runtime boundary explicit and enforceable.

```
(#[macro-time]
  (defn assert-arity [name args expected]
    (when (!= (length args) expected)
      (macro-error (str name " expects " expected " args, got " (length args))))))

(defmacro my-macro (args)
  (assert-arity "my-macro" args 2)
  ...)
```

Functions **not** marked `#[macro-time]` cannot be called from a macro body, even if they are otherwise pure. This restriction is enforced by the macro-time evaluator.

### What macro bodies can and cannot do

**Can:**
- Bind parameters and call `#[macro-time]` functions
- Evaluate quasiquote / unquote / unquote‑splicing
- Construct and inspect AST nodes
- Call `gensym`
- Call other macros (macro calls in a macro body are recursively expanded)

**Cannot:**
- Access runtime values
- Perform I/O
- Mutate global state
- Call functions not marked `#[macro-time]`

---

### Implementation plan

#### Step 1 — AST nodes for macros

- [x] Add AST constructors for:
  - `macro-def` — produced by `defmacro`
  - `macro-call` — a call where the callee resolves to a macro
  - `macro-time-fn-def` — produced by `#[macro-time] defn`
  - `quasiquote`, `unquote`, `unquote-splicing` — grammar already supports these

#### Step 2 — Macro environment

- [x] Define `MacroEnv`:

```ts
interface MacroEnv {
  macros:       Map<string, MacroDefinition>;
  macroTimeFns: Map<string, MacroTimeFnDefinition>;
  gensymCounter: number;
  currentMacroName: string | null;
}
```

- [x] Define `MacroDefinition`:

```ts
interface MacroDefinition {
  name:   string;
  params: string[];
  body:   ASTNode[];
  scopeId: number;   // KFFD: the scope introduced at definition time
}
```

#### Step 3 — Macro expansion algorithm

Expansion is a recursive AST walk. The expander accumulates **all** errors and reports them together — it never aborts on the first error.

- [x] Implement `expand(node, env) → ASTNode`:
  1. If `node` is a `(call IDENTIFIER …)` and `IDENTIFIER` resolves to a macro in `env.macros`: expand it (see expansion step below), then **recursively expand the result** until stable.
  2. If `node` is a `(call IDENTIFIER …)` and `IDENTIFIER` is not a macro: recursively expand its arguments.
  3. Otherwise: recursively expand child nodes.

- [x] Implement single-step expansion:
  1. Bind macro params to the (unexpanded) argument nodes.
  2. Evaluate the macro body in the macro-time evaluator.
  3. Tag all identifiers introduced by the body with a fresh scope (see Section 1, Step 4).
  4. Return the resulting AST node.

- [x] Implement `expandAll(ast, env) → { ast: ASTNode, errors: ExpansionError[] }`:
  - Walks the entire program AST.
  - Collects errors from all expansion sites.
  - Returns both the (partially expanded) AST and the full error list.
  - The caller (compiler driver) reports all errors and halts before lowering if `errors` is non-empty.

#### Step 4 — Hygiene via KFFD (sets of scopes)

Hygiene is enforced using the **KFFD algorithm** (Flatt et al., "Macros that Work Together", 2012). The core idea: every binding and every reference carries a **set of scope labels**. Two identifiers refer to the same binding only when their scope sets match according to a subset rule.

- [x] Assign scope labels:
  - Each `defmacro` form introduces a **definition scope** — a unique integer label assigned at parse time.
  - Each macro **expansion** introduces a fresh **use-site scope** — a unique integer label assigned at expansion time.
  - The expander **adds** the use-site scope to every identifier in the expanded output.
  - Identifiers in the macro's own template already carry the definition scope; user-supplied arguments carry the scopes from their original use site.

- [x] Represent scopes on identifier nodes:

```ts
interface IdentifierNode {
  type:   "identifier";
  name:   string;
  scopes: Set<number>;   // KFFD scope set
}
```

- [x] Resolve identifiers during name resolution (before lowering):
  - Given two identifier nodes with the same `name`, they refer to the same binding if and only if one's scope set is a **subset** of the other's, with the more-specific (larger) set winning.
  - This ensures that a macro-introduced `x` and a user-written `x` at the call site never collide unless the macro explicitly intended to capture.
  - Implemented in `Stage4-scope-resolve.s3d` (`resolveNames`): walks the expanded AST, maintains a scope chain, and applies the KFFD subset rule to annotate each resolved identifier with `resolvedScopes`. Let*/const*/param binding names are tracked with `∅` scope sets (user code); the subset rule still prevents template-scoped bindings (non-empty scopes) from being visible to user references.

**Worked example — no accidental capture:**

```
(defmacro swap! (a b)
  (let ((tmp (gensym "tmp")))
    `(let ((,tmp ,a))
       (set! ,a ,b)
       (set! ,b ,tmp))))

(let ((tmp 1) (y 2))
  (swap! tmp y))
```

After expansion, the `tmp` introduced by `gensym` carries the macro's definition scope plus the use-site scope. The user's `tmp` carries only the call-site scope. Their scope sets differ, so they do not collide. The result is equivalent to:

```
(let ((tmp 1) (y 2))
  (let ((tmp_42 tmp))
    (set! tmp y)
    (set! y tmp_42)))
```

#### Step 5 — Quasiquote semantics (including nested quasiquote)

- [x] `\`expr` (quasiquote): return `expr` as an AST node, substituting unquoted sub-expressions.
- [x] `,expr` (unquote): evaluate `expr` in the macro-time environment and splice the result into the enclosing quasiquote.
- [x] `,@expr` (unquote-splicing): like unquote, but the result must be a list; its elements are spliced into the enclosing list position.

**Nested quasiquote rule:** quasiquote nesting increments a depth counter. `unquote` and `unquote-splicing` only fire at depth 1. At depth > 1, they are left as literal AST nodes (representing a quasiquote to be evaluated at a later expansion stage).

```
; depth 1 — unquote fires
`(a ,b c)          →  (list 'a b 'c)

; depth 2 — inner unquote is literal, outer unquote fires
``(a ,(b ,c) d)    →  `(a ,(b <value-of-c>) d)
```

The evaluator tracks quasiquote depth as a plain integer and recurses accordingly.

#### Step 6 — Error reporting

All macro expansion errors are represented as:

```ts
interface ExpansionError {
  kind:       "arity" | "bad-ast" | "macro-time-fn" | "undefined-macro" | "other";
  message:    string;
  macroName:  string;
  callSite:   SourceLocation;
  expandedFrom?: SourceLocation;  // set when error originates inside a nested expansion
}
```

- [x] Accumulate errors in `expandAll` rather than throwing immediately.
- [x] After expansion, if `errors.length > 0`, the compiler driver formats and reports all errors (grouped by macro name) and exits before lowering.
- [x] Error messages must include the call site source location and, for errors inside nested expansions, the chain of expansion sites (`expandedFrom`).

#### Step 7 — Integration with Stage 4

- [x] Macro expansion happens **after parsing** and **before lowering**:

```
source → Stage4 parser → AST → macro expander → expanded AST → lowering → TS
```

- [x] The compiler driver calls `expandAll(ast, env)`. If the error list is non-empty, it reports them and stops. Otherwise it passes the expanded AST to the lowering pass.
- [x] `#[macro-time]` function definitions are hoisted out of the lowered output — they exist only at compile time.

---

## 2. Gensym (hygienic symbol generation)

### Purpose

`gensym` creates a **unique identifier** guaranteed not to collide with any user-written identifier. It is available only at macro-time.

### Requirements

- Available only inside macro bodies and `#[macro-time]` functions.
- Produces identifiers that are valid Stage 4 identifiers.
- Stable within a single compilation (same counter sequence).
- Not stable across compilations (counter resets; no caching).

### Implementation plan

#### Step 1 — Expose `gensym` in the macro-time environment

```ts
gensym(prefix?: string): IdentifierNode
// If prefix is omitted, defaults to "g"
```

`gensym` increments `MacroEnv.gensymCounter` and returns a fresh `IdentifierNode`.

#### Step 2 — Gensym'd identifier representation

```ts
{
  type:   "identifier",
  name:   `${prefix}_${counter}`,   // e.g. "tmp_42"
  scopes: new Set([currentDefinitionScope, currentUseScope]),
  hygiene: {
    kind:  "gensym",
    id:    counter,
    macro: currentMacroName
  }
}
```

The `hygiene` field is informational (for error messages and tooling). Actual collision-avoidance is handled by the KFFD scope sets.

#### Step 3 — Name resolution

- [x] During lowering, if an identifier has `hygiene.kind === "gensym"`, emit its `name` field (`prefix_N`) directly into TypeScript output.
- [x] The emitted name is guaranteed unique within the compilation because the counter only increments.

#### Step 4 — Usage inside quasiquote

The typical pattern is to bind a gensym to a variable outside the quasiquote template, then unquote it inside:

```
(defmacro inc! (x)
  (let ((tmp (gensym "t")))
    `(let ((,tmp ,x))
       (set! ,x (+ ,tmp 1)))))
```

Binding the gensym outside the template ensures a single fresh symbol is created per expansion, not one per evaluation of the template expression.

- [x] A gensym bound once outside the quasi template and unquoted N times inside produces the **same** identifier name at every use site (one fresh symbol per expansion, not one per unquote).
- [x] Two separate invocations of the same macro each receive a **different** fresh gensym name (the counter advances between expansions).
- [x] Anti-pattern documented: placing `(gensym …)` directly inside the quasi template at multiple unquote sites calls gensym independently, producing distinct names — unlike the canonical pattern above.

---

## 3. Reader macros (intentionally deferred to Stage 5)

Reader macros — transformations on surface syntax before Stage 4 parsing — are **out of scope for this design iteration**. The pipeline entry point (`{}`, `[]`, `.`, template literals, operator sugar) is handled by the reader as a fixed set of transformations. User-extensible reader macros may be designed in a future iteration.

This section is reserved as a placeholder so the omission is explicit.

---

## 4. Putting it all together (full pipeline)

### Final compilation pipeline

```
source code
    ↓
reader (todo: Stage 5) (handles {}, [], ., +, template literals, etc.)
    ↓
Stage4 parser (pure S-expr grammar)
    ↓
macro expander  ←── MacroEnv (macros, #[macro-time] fns, gensym counter)
    │
    ├── KFFD scope tracking
    ├── quasiquote evaluator (with nesting depth)
    ├── error accumulator
    │
    ↓
expanded AST  (or: accumulated errors → report & halt)
    ↓
resolveNames  (KFFD subset-rule annotation — adds resolvedScopes to identifiers)
    ↓
lowering (Stage4 → TS AST)
    ↓
TypeScript emitter
    ↓
tsc
```

### Key invariants across the pipeline

- [x] No macro call nodes survive past the macro expander. The lowering pass can assume a fully macro-expanded AST.
- [x] `#[macro-time]` function definitions are emitted as `// #[macro-time] fn: …` comments — no runtime code.
- [x] `resolveNames` runs between macro expansion and lowering, annotating every identifier with `resolvedScopes` via KFFD subset matching.
- [x] `gensym` counters are not persisted. Incremental or cached compilation must re-run macro expansion from scratch for any file that transitively depends on a changed macro definition.
