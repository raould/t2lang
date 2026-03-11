# Infix Math Notation — Stage9 Design

This document describes the full plan for adding `#{}` infix expression sugar to t2lang stage9.

---

## Motivation

Prefix notation for arithmetic is verbose. Infix sugar lets users write math naturally while keeping the rest of the language in s-expression form.

---

## Syntax

### Entry sigil

`#{}` is the infix entry sigil. The `#` is required only on the **outermost** expression. Inside, `{...}` is plain sub-grouping (not object literal — context disambiguates).

```lisp
#{1 + 2}                        ;; (+ 1 2) → 1 + 2
#{a * b + c}                    ;; ERROR: mixed operators at same level
#{a * b}                        ;; ok
#{{a * b} + c}                  ;; ok: (+ (* a b) c)
#{{x ** 2} + {y ** 2}}          ;; ok: (+ (** x 2) (** y 2))
```

### Operator uniformity (MVP)

Within a single `{...}` level, all binary operators must be identical. Mixed operators without explicit grouping are an AST-time error. This avoids needing a precedence table for the MVP. Full PEMDAS precedence may be added later by replacing this check with a precedence table.

```lisp
#{a + b + c}                    ;; ok: left-associates → (+ (+ a b) c)
#{a + b * c}                    ;; ERROR: mixed + and *
#{{a + b} * c}                  ;; ok: (* (+ a b) c)
```

### Neoteric function calls

`identifier(args)` inside `#{}` is a function call. Comma-separated args. Args may be full infix expressions without extra `{}`.

```lisp
#{sin(angle) * radius}          ;; (* (sin angle) radius)
#{f(x, y) + g(z)}              ;; (+ (f x y) (g z))
#{Math.abs(n) + 1}              ;; (+ (Math.abs n) 1)
#{f(a + b, c * d)}              ;; args are full infix expressions — no {} needed
```

### Property access

Dotted names are single `IDENTIFIER` tokens in the lexer (`.` is not excluded from `IDENTIFIER`). They work naturally as infix atoms.

```lisp
#{arr.length === 0}             ;; arr.length is one IDENTIFIER token
#{a.b.c + 1}                   ;; a.b.c is one IDENTIFIER token
#{obj.method(x) * 2}           ;; neoteric call on dotted identifier
```

No `.`-separated grammar rule is needed — the existing tokenization handles this for free.

### Unary operators

Unary prefix operators bind tightly to the immediately following atom.

```lisp
#{-x * y}                       ;; (* (neg x) y)
#{!done && {count > 0}}        ;; (&& (! done) (> count 0))
#{~mask | flags}                ;; (| (~ mask) flags)
```

`~` is safe to use for bitwise NOT inside `#{}` even though `TILDE` is the macro unquote token elsewhere. Inside `infixBody` the parser is in a disjoint rule subtree from `sForm` — there is no ambiguity.

### Variables and literals

```lisp
#{myScale * 2.5}
#{PI * {r * r}}
#{-1 + offset}
```

---

## Operator Set

ECMAScript operators, usable in infix position:

| Category    | Operators                                          |
|-------------|----------------------------------------------------|
| Arithmetic  | `+`  `-`  `*`  `/`  `%`  `**`                     |
| Comparison  | `<`  `>`  `<=`  `>=`  `===`  `!==`  `==`  `!=`   |
| Logical     | `&&`  `\|\|`  `??`                                 |
| Bitwise     | `&`  `\|`  `^`                                     |
| Unary       | `-`  `!`  `~`                                      |

`??` is included — `NULLCOAL` already exists in the grammar, so no new token is needed. It must be added to `infixBinOp`, `opSymbol`, and `propKey`.

Bitwise shift (`<<`, `>>`, `>>>`) deferred — low priority for MVP.

Weak equality (`==`, `!=`) is allowed. Linting is the user's responsibility.

---

## Grammar Changes

### New lexer tokens

Add in the operator token block, before `IDENTIFIER`:

```antlr
HASH_LBRACE  : '#{' ;
STARSTAR     : '**' ;
AMPAMP       : '&&' ;
PIPEPIPE     : '||' ;
PLUS         : '+'  ;
STAR         : '*'  ;
SLASH        : '/'  ;
PERCENT      : '%'  ;
LT           : '<'  ;
GT           : '>'  ;
BANG         : '!'  ;
AMP          : '&'  ;
PIPE         : '|'  ;
```

`CARET` (`^`), `MINUS` (`-`), `TILDE` (`~`), `NULLCOAL` (`??`), `LTE_OP`, `GTE_OP`, `STRICT_EQ`, `STRICT_NEQ`, `EQ_OP`, `NEQ_OP` already exist.

Token ordering notes:
- `HASH_LBRACE` (`#{`, 2 chars) beats IDENTIFIER's `#` (1 char) via maximal munch — `#[macro-time]` is unaffected since `MACRO_TIME_ATTR` matches 14 chars.
- `BANG` (`!`, 1 char) is always beaten by `STRICT_NEQ` (`!==`, 3 chars) and `NEQ_OP` (`!=`, 2 chars) via maximal munch — token order does not affect correctness, but place `BANG` after them by convention.

### Updated IDENTIFIER rule

Extend the exclusion set to include the new operator characters. `_`, `#`, `$`, `@` remain valid identifier characters.

```antlr
IDENTIFIER
    : ~[() \n\t\r:;\-~\u005B\u005D\u007B\u007D,\u0060?=+*/\%<>!&|^]+
    ;
```

Note: `.` is intentionally **not** excluded. Dotted names like `arr.length` and `Math.abs` remain single `IDENTIFIER` tokens, which is what makes property access work inside infix without a dedicated grammar rule.

### Extend `opSymbol` and `propKey` — mandatory checklist

Every new operator token that is removed from `IDENTIFIER` must be added to both `opSymbol` and `propKey`, or existing s-expression uses like `(+ a b)` and `(. obj +)` break with confusing parse errors.

| Token | `infixBinOp` / `infixUnaryOp` | `opSymbol` | `propKey` |
|---|---|---|---|
| `PLUS` | binary | ✓ | ✓ |
| `STAR` | binary | ✓ | ✓ |
| `SLASH` | binary | ✓ | ✓ |
| `PERCENT` | binary | ✓ | ✓ |
| `STARSTAR` | binary | ✓ | ✓ |
| `LT` | binary | ✓ | ✓ |
| `GT` | binary | ✓ | ✓ |
| `BANG` | unary | ✓ | ✓ |
| `AMP` | binary | ✓ | ✓ |
| `PIPE` | binary | ✓ | ✓ |
| `AMPAMP` | binary | ✓ | ✓ |
| `PIPEPIPE` | binary | ✓ | ✓ |
| `TILDE` | unary | ✓ | ✓ |
| `NULLCOAL` | binary | ✓ | ✓ (already in grammar — verify) |

**Run the full test suite after Phase 0 grammar changes before proceeding to Phase 1.** Any missed entry in this table will cause existing tests to fail with parser errors, making omissions easy to catch.

### New parser rules

```antlr
infixExpr
    : HASH_LBRACE infixBody RBRACE
    ;

infixBody
    : infixAtom (infixBinOp infixAtom)*
    ;

infixAtom
    : IDENTIFIER LPAREN infixArgs? RPAREN   // neoteric call: f(x, y), Math.abs(x)
    | infixAtom LPAREN infixArgs? RPAREN    // chained call: f(x)(y)
    | LBRACE infixBody RBRACE               // sub-group: {a * b}
    | infixUnaryOp infixAtom               // unary: -x  !done  ~mask
    | literal
    | IDENTIFIER                            // simple or dotted: x, arr.length, a.b.c
    ;

infixArgs
    : infixBody (COMMA infixBody)*
    ;

infixUnaryOp
    : MINUS | BANG | TILDE
    ;

infixBinOp
    : PLUS | MINUS | STAR | SLASH | PERCENT | STARSTAR
    | LT | GT | LTE_OP | GTE_OP
    | STRICT_EQ | STRICT_NEQ | EQ_OP | NEQ_OP
    | AMPAMP | PIPEPIPE | NULLCOAL
    | AMP | PIPE | CARET
    ;

// Add to expression rule:
// | infixExpr
```

`infixArgs` uses `infixBody` (not `infixAtom`) so that arguments can be full infix expressions without requiring extra `{}`. COMMA is not an `infixBinOp`, so there is no ambiguity between argument separator and operator.

---

## AST Changes

Two new node types. All other atom forms inside `#{}` map to existing node types.

### `BinaryOpNode`

```
tag:   'binary-op'
op:    string          // the ECMAScript operator: "+", "===", "&&", etc.
left:  Node
right: Node
id:    SpanId
```

### `UnaryOpNode`

```
tag:     'unary-op'
op:      string        // "-", "!", "~"
operand: Node
id:      SpanId
```

### `infixAtom` → existing node types

| Grammar alternative | AST result |
|---|---|
| `IDENTIFIER` | identifier node (dotted names like `arr.length` remain as-is) |
| `IDENTIFIER LPAREN args RPAREN` | existing `call` node |
| `infixAtom LPAREN args RPAREN` | existing `call` node (callee is result of inner atom) |
| `LBRACE infixBody RBRACE` | recurse → `BinaryOpNode`, `UnaryOpNode`, or atom |
| `infixUnaryOp infixAtom` | `UnaryOpNode` |
| `literal` | literal node |

### AST builder: `astInfixBody`

The grammar produces a flat sequence `[atom, op, atom, op, atom, ...]`. The builder must:

1. Collect atoms into `[a₀, a₁, ..., aₙ]` and operators into `[op₀, op₁, ..., opₙ₋₁]`.
2. **Uniformity check**: verify all `opᵢ` are the same string. If not, throw an `Error` with `formatSpan(id)` — caught by the main loop's existing `try/catch`, consistent with other AST builder errors.
3. **Left-fold**: start with `result = a₀`, then for each `(opᵢ, aᵢ₊₁)` set `result = BinaryOpNode(opᵢ, result, aᵢ₊₁)`.
4. Single-atom case (`#{x}`): return the atom directly, no `BinaryOpNode`.

The uniformity check and fold can be done in a single pass.

---

## Pipeline Behavior

| Stage             | `BinaryOpNode`                                      | `UnaryOpNode`                        |
|-------------------|-----------------------------------------------------|--------------------------------------|
| **AST build**     | Build from `infixBody`; uniformity check + left-fold here | Build from `infixUnaryOp infixAtom` |
| **Macro expand**  | New branch: recurse into `left`, `right`            | New branch: recurse into `operand`   |
| **Scope resolve** | New branch: recurse into `left`, `right`            | New branch: recurse into `operand`   |
| **Lower**         | New branch: pass through (recurse into children)    | New branch: pass through             |
| **Codegen**       | `emitBinaryOp`: see parenthesization rule below     | `emitUnaryOp`: see below             |

The `op` field is a plain string — it is **never resolved as an identifier binding** in scope resolve.

Each of macro-expand, scope-resolve, and lower requires two new tag branches in its expression dispatcher — one for `binary-op` and one for `unary-op`. No generic child-recursion helper exists; add explicit cases to the if-chain in each stage's `expandExpr` / `resolveExpr` / `lowerExpr`.

### Codegen parenthesization

Wrap an operand in parens **if and only if it is a `BinaryOpNode` or `UnaryOpNode`**. Atoms (identifiers, literals, calls) are never wrapped.

```
#{a + b}                →  a + b
#{{a + b} * c}          →  (a + b) * c
#{-n * 2}               →  (-n) * 2
#{!done && {count > 0}} →  (!done) && (count > 0)
#{a + {b * c}}          →  a + (b * c)
```

`emitUnaryOp`: emit `op + operand` (e.g. `-x`, `!done`, `~mask`) with no extra parens around the operand itself — the caller wraps the whole `UnaryOpNode` when it appears as a `BinaryOpNode` child.

---

## Acceptance Tests (to be written)

```lisp
;; basic arithmetic
#{1 + 2}                        ;; → 1 + 2
#{{2 * 3} + 1}                  ;; → (2 * 3) + 1

;; variables
#{x + y}                        ;; → x + y
#{-x + 1}                       ;; → (-x) + 1

;; neoteric calls
#{f(x) + 1}                     ;; → f(x) + 1
#{f(x, y) * g(z)}              ;; → f(x, y) * g(z)
#{f(a + b, c * d)}             ;; → f(a + b, c * d)  — infix args without {}

;; property access (dotted IDENTIFIER tokens)
#{arr.length === 0}             ;; → arr.length === 0
#{a.b + c.d}                    ;; → a.b + c.d

;; chained neoteric call on dotted identifier
#{obj.method(x) + 1}           ;; → obj.method(x) + 1

;; unary
#{!done && {count > 0}}        ;; → (!done) && (count > 0)
#{-n * 2}                       ;; → (-n) * 2
#{~mask | flags}                ;; → (~mask) | flags

;; nullish coalescing
#{value ?? defaultVal}          ;; → value ?? defaultVal

;; weak equality (allowed)
#{a == b}                       ;; → a == b
#{a != b}                       ;; → a != b

;; error: mixed operators without grouping
#{a + b * c}                    ;; → ERROR: mixed operators at same grouping level
```

---

## Implementation Phases

### Phase 0 — Single `.g4` edit, then build and verify

All of the following must be done in **one `.g4` edit** — the IDENTIFIER change and the `opSymbol`/`propKey` additions are causally linked and must not be built separately mid-edit:

1. Add new lexer tokens (`HASH_LBRACE`, `PLUS`, `STAR`, `SLASH`, `PERCENT`, `STARSTAR`, `LT`, `GT`, `BANG`, `AMP`, `PIPE`, `AMPAMP`, `PIPEPIPE`) before `IDENTIFIER`
2. Update `IDENTIFIER` exclusion set (exclude new operator chars; keep `.` included)
3. Add every new token to `opSymbol` and `propKey` per the mandatory checklist above; also add `TILDE` and `NULLCOAL` to `opSymbol` and `propKey`
4. Add `infixExpr` / `infixBody` / `infixAtom` / `infixBinOp` / `infixUnaryOp` / `infixArgs` parser rules
5. Add `infixExpr` to `expression`

Then:
- Run `npm run build-grammar`
- **Run full test suite** — any missed `opSymbol`/`propKey` entry surfaces here as a parse error on existing tests. Fix before proceeding.
- Update STYLE_GUIDE.md

### Phase 1 — AST

Add `binary-op` and `unary-op` to `Stage9-tags.ts`.

Add to `Stage9-ast.s8` — four functions with the following call tree:

```
astInfixExpr
  └─ astInfixBody      (flat sequence → uniformity check → left-fold → BinaryOpNode)
       └─ astInfixAtom (dispatch per grammar alternative)
            └─ astUnaryOp  (unary case only)
```

- `astInfixExpr`: entry point for the `infixExpr` grammar rule; calls `astInfixBody` on the inner `infixBody` context
- `astInfixBody`: collects alternating atoms and operators, uniformity check (throw `Error` with `formatSpan` if mixed), left-fold into `BinaryOpNode` tree; calls `astInfixAtom` per atom; single-atom case returns the atom directly
- `astInfixAtom`: dispatches per grammar alternative — `IDENTIFIER` → identifier node, `IDENTIFIER LPAREN args RPAREN` → call node, `infixAtom LPAREN args RPAREN` → call node, `LBRACE infixBody RBRACE` → recurse into `astInfixBody`, `infixUnaryOp infixAtom` → call `astUnaryOp`, `literal` → literal node
- `astUnaryOp`: builds `UnaryOpNode` from operator token text + `astInfixAtom` result

**Verification checkpoint:** after building, run:
```
npx tsx index.ts - <<< '(program (const x #{1 + 2}))'
```
Inspect output to confirm a `binary-op` node with `op: "+"`, `left: 1`, `right: 2` before continuing.

- Update STYLE_GUIDE.md

### Phase 2 — Macro expand / scope resolve / lower

Add two tag branches to each stage's expression dispatcher. The `binary-op` and `unary-op` tags are **unchanged through lower** — no `-expr` suffix rename, since there is no structural transformation. Codegen dispatches on `binary-op` / `unary-op` directly.

- `expandExpr` (`Stage9-macro-expand.s8`): `binary-op` → recurse `left`, `right`; `unary-op` → recurse `operand`
- `resolveExpr` (`Stage9-scope-resolve.s8`): same; `op` string is passed through unchanged, never resolved as a binding
- `lowerExpr` (`Stage9-lower.s8`): same; lower children, rebuild node with same tag

**Verification checkpoint:** `(program (const x #{1 + 2}))` should now compile end-to-end to `const x = 1 + 2;`.

- Update STYLE_GUIDE.md

### Phase 3 — Codegen

- `emitBinaryOp`: emit `leftStr op rightStr` where each operand string is wrapped in parens if the operand node is a `BinaryOpNode` or `UnaryOpNode`, bare otherwise
- `emitUnaryOp`: emit `op + emitOperand(operand)` where `emitOperand` wraps in parens if the operand is a `BinaryOpNode` or `UnaryOpNode`, bare otherwise — e.g. `~mask` (atom, no parens), `~(a + b)` (binary operand, parens), `!done` (identifier, no parens)

Note the two responsibilities: the *binary* emitter wraps `UnaryOpNode` children (e.g. `(-n)` in `(-n) * 2`); the *unary* emitter wraps its own compound operands (e.g. `~(a + b)`).

**Verification checkpoint:** manually run each acceptance case and confirm output matches expected strings before writing the test file.

- Update STYLE_GUIDE.md

### Phase 4 — Tests

- Unit tests for each acceptance case in the list above
- Error test for mixed-operator uniformity violation
- Run full test suite to confirm no regressions
