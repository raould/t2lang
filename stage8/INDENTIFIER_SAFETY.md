# Identifier Safety Plan for Stage 8

## Goal

Prevent invalid or reserved identifiers from reaching emitted TypeScript output.
We validate at **codegen time** so macro-generated and desugared names are caught too.

---

## Rules (what the compiler enforces)

| Rule | How enforced |
|------|-------------|
| No hyphens | Currently: grammar (`IDENTIFIER` excludes `-`). Phase 5: relax grammar, rely on `checkId` regex |
| No whitespace | Grammar: whitespace never part of `IDENTIFIER` |
| First char must not be a digit | `isValidBindingId` regex: `^[a-zA-Z_$][a-zA-Z0-9_$]*$` |
| Token must not be empty | Grammar: `+` quantifier on IDENTIFIER |
| No Unicode (ASCII-only) | `isValidBindingId` regex only allows `[a-zA-Z0-9_$]` |
| Allow `_` and `$` | Included in regex above |
| Allow `#foo` in property position | `isValidId` regex: `^#?[a-zA-Z_$][a-zA-Z0-9_$]*$` — enables `obj.#field` dot notation |
| Reject `#foo` as binding name | `checkId` uses `isValidBindingId` (no `#`) — `#foo` is not a valid binding in JS |
| Reject JS reserved words | `JS_RESERVED` set checked in `checkId` |
| TS contextual keywords allowed | `from`, `of`, `get`, `set`, `type`, `declare`, `out`, … are valid TS identifiers — not blocked |

We **don't** implement full ECMAScript ID_Start/ID_Continue (yet).

---

## Implementation (DONE)

### Phase 1 — Grammar (done)

- `IDENTIFIER : ~[() \n\t\r:;\-]+` excludes `-`
- `NEG_NUMBER : '-' [0-9]+ ('.' [0-9]+)?` — negative literals; placed **before** `MINUS` in lexer so `-10` → `NEG_NUMBER`
- `MINUS : '-'` — separate token for `(- a b)` operator calls
- `MACRO_ERROR : 'macro-error'` — keyword so `(macro-error "msg")` still parses
- `expression` rule: added `NEG_NUMBER` (via `literal`), `MACRO_ERROR`, `MINUS` branches
- All hyphenated user identifiers in test files renamed to camelCase

**Possible future simplification (Phase 5)**: the `\-` exclusion in `IDENTIFIER` and the
`MACRO_ERROR` keyword could both be removed once Phases 2–4 are tested and trusted.
ANTLR maximal-munch still resolves the remaining ambiguity correctly:
`-10` → `NEG_NUMBER` (longer match); bare `-` in `(- a b)` → `MINUS` (rule-order
tie-break, since MINUS is listed before IDENTIFIER). `my-macro` would lex as a single
IDENTIFIER token and be caught by `checkId` at codegen — no silent failure. If
`macro-error` ever escaped macro expansion to codegen, `checkId` would throw rather
than emit garbage. `MINUS` and `NEG_NUMBER` must be kept.

### Phase 2 — Codegen validation (done)

Added to `Stage8-codegen.s7`:

```
isValidId(key)      — regex ^#?[a-zA-Z_$][a-zA-Z0-9_$]*$  (dot-notation check, accepts #foo)
isValidBindingId(n) — regex ^[a-zA-Z_$][a-zA-Z0-9_$]*$    (binding check, no #)
JS_RESERVED         — Set of JS/TS strict-mode reserved words
checkId(name, spanId) — uses isValidBindingId + JS_RESERVED; throws with span on failure
```

`checkId` call sites:
- `let-stmt`, `const-stmt` — binding name
- `assign-stmt` — target name
- `export-binding-stmt` — binding name
- `for` init + update names
- `for-in`, `for-of`, `for-await` — binding name
- `try-stmt` catch clause param
- `identifier` expr — skips `...` spread prefix
- `new-expr` — constructor name
- `emitParams` — string-form params (skip `...` prefix)
- `emitTypedParam` — structured params (skip `...` prefix)

---

## Phase 3 — Tests (DONE)

Written in `stage8/tests/identifierSafety.test.ts` (21 tests, all passing).

### 3a — Valid identifiers pass through

```
(const x 1)          → const x  = 1;
(const _foo 1)        → const _foo  = 1;
(const $bar 1)        → const $bar  = 1;
(const abc123 1)      → const abc123  = 1;
```

### 3b — Reserved word as binding → throws

```
(const return 1)      → Error: Invalid identifier 'return'
(const class 1)       → Error: Invalid identifier 'class'
(const if 1)          → Error: Invalid identifier 'if'
(const let 1)         → Error: Invalid identifier 'let'
(const null 1)        → Error: Invalid identifier 'null'
(const true 1)        → Error: Invalid identifier 'true'
(const false 1)       → Error: Invalid identifier 'false'
(const void 1)        → Error: Invalid identifier 'void'
```

### 3c — Digit-leading identifier → throws at codegen

These can't be written directly in T2 source (grammar prevents it), but
a macro could generate such a node. Test via the macro pipeline:

```
;; a macro that emits a const node with name "1bad"
→ codegen throws: Invalid identifier '1bad'
```

### 3d — TS contextual keywords are allowed

```
(const type 1)        → const type  = 1;   (valid TS)
(const from 1)        → const from  = 1;
(const of 1)          → const of  = 1;
(const get 1)         → const get  = 1;
(const set 1)         → const set  = 1;
```

### 3e — Spread params skip validation

```
(lambda (...args) args)  → (...args) => { return args; }
```

---

## Phase 4 — Error spans (DONE)

Change `checkId(name)` → `checkId(name, spanId)` so errors include source location.

### AST changes needed (`Stage8-ast.s7`)

Two sub-node builders lack `id` fields and must be extended:

- **`astCatchClause`** (line ~346): add `(id (registerSpan (nextNodeId) ctx))` to the
  returned object. Then pass `catchClause.id` at the call site in codegen.

- **`astTypedParam`** (line ~192): add `(id (registerSpan (nextNodeId) ctx))` to the
  returned object. Then pass `param.id` in `emitTypedParam`.

Extra `id` fields on these objects are harmless — nothing reads them destructively.

### Codegen changes (`Stage8-codegen.s7`)

1. Change signature: `(const checkId (lambda ((name) (spanId)) ...))`
2. Error message: `(+ "Invalid identifier '" name "' at " (formatSpan spanId))`
   (`formatSpan` is already imported)
3. Update all call sites:

| Call site | `spanId` to pass |
|-----------|-----------------|
| `let-stmt`, `const-stmt` | `stmt.id` |
| `assign-stmt` | `stmt.id` |
| `export-binding-stmt` | `stmt.id` |
| `for` initName / updateName | `node.id` (whole for node) |
| `for-in`, `for-of`, `for-await` | `node.id` |
| `try-stmt` catch param | `catchClause.id` (after AST change above) |
| `identifier` expr | `expr.id` |
| `new-expr` | `expr.id` |
| `emitParams` string-form | `undefined` → shows `<unknown>` (legacy defmacro, acceptable) |
| `emitTypedParam` | `param.id` (after AST change above) |

### Test addition (Phase 3 tests, extended)

Add a span assertion to the reserved-word tests in 3b, e.g.:

```
error message matches /Invalid identifier 'return' at <stdin>:2:\d+/
```

---

## Phase 6 — Private field names (`#foo`) (DONE)

JS/TS private class fields use `#name` syntax. `(. this #count)` must emit `this.#count`,
not `this["#count"]`.

### Change

Split the "is this a dot-notation key?" check from the "is this a valid binding?" check:

- `isValidId` updated to `^#?[a-zA-Z_$][a-zA-Z0-9_$]*$` — accepts `#count` for dot notation
- `isValidBindingId` added with `^[a-zA-Z_$][a-zA-Z0-9_$]*$` — no `#`, used by `checkId`
- `checkId` now calls `isValidBindingId` instead of `isValidId` — `#foo` as a binding name throws

No grammar changes needed: `#count` already parses as a single IDENTIFIER token (only `)`,
`(`, spaces, `:`, `;`, `-` are excluded).

### Tests (added to `identifierSafety.test.ts`)

```
;; dot access to a private field
(class Foo (class-body
  (field #count)
  (method getCount ()
    (return (. this #count)))))
→ emits: this.#count   (dot notation, not bracket)

;; private field as binding name → throws
emitTopLevel({tag:'const-stmt', name:'#bad', ...}) → Error: Invalid identifier '#bad'
```

---

## Open decisions

1. (done) **Where to validate**: The hard requirement is **no silent failure** — invalid
   identifiers must never reach emitted TypeScript. Codegen-time `checkId` satisfies
   this. Earlier checking (parse or scope pass) would give friendlier error locations
   for hand-written source but is not required.

2. (done) **`void` and `typeof` as identifiers**: `void` is in `JS_RESERVED`; `typeof` too.
   Both are fine since the grammar has dedicated forms `(void ...)` and `(typeof ...)`.

3. **`macro-error` identifier**: The grammar exposes `macro-error` as a keyword that
   resolves to an `identifier` node. It bypasses `checkId` because `emitExpr` for
   `identifier` checks for `...` prefix but not for `macro-error` specifically — the
   regex `^[a-zA-Z_$][a-zA-Z0-9_$]*$` rejects it (hyphen). That means a bare
   `macro-error` in expression position will throw at codegen. This is intentional:
   `(macro-error "msg")` is only valid as a *call*, not as a raw identifier reference.
