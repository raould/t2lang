# Literal Sugar: `[...]` Array and `{...}` Object Syntax

## Status

`(array ...)` and `(object ...)` already work fully — `objectExpr.test.ts`,
`arrayExpr.test.ts`, and `computedObjectKeys.test.ts` all pass.  **There is no
missing feature.**  This plan is purely about adding optional alternative syntax
for people who prefer the JS-familiar `[...]` / `{...}` forms.  Both desugar to
the same `array-expr` / `object-expr` AST nodes, so lower, codegen,
scope-resolve, and macro-expand need no changes.

---

## Part 1 — Array literals `[1, 2, 3]`

### Current state

`(array 1 2 3)` → `array-expr { elements: [...] }` — fully implemented.

`LBRACK` (`[`) and `RBRACK` (`]`) tokens already exist and are already excluded
from `IDENTIFIER`.  They are currently used only inside computed object-key
syntax `([expr] value)`.

### Plan

**Phase A1 — Grammar**

Add a new `expression` alternative:

```antlr
bracketArrayExpr
    : LBRACK (expression (COMMA? expression)*)? RBRACK
    ;
```

Add `| bracketArrayExpr` to the `expression` rule (alongside `arrayExpr`).

Commas are optional (matching the style of parameter lists / `(array ...)`), so
`[1 2 3]`, `[1, 2, 3]`, and `[1,2,3]` all parse.

**Phase A2 — AST (`Stage9-ast.s8`)**

Add `astBracketArrayExpr(ctx)` that calls `astBracketArrayExpr` alternatives
and returns exactly:

```
{ tag: 'array-expr', id: spanId, elements: [...astExpression(e) for e in ctx] }
```

This is byte-for-byte the same shape as `astArrayExpr`, so the rest of the
pipeline is unchanged.

**Phase A3 — Tests**

`stage9/tests/bracketArrayLiteral.test.ts` — end-to-end tests:

```scheme
(let* ((a [1, 2, 3]))
  (asrt (index a 0) 1)
  (asrt (index a 2) 3))

;; no commas
(let* ((b [10 20 30]))
  (asrt ((. b length)) 3))

;; nested
(let* ((m [[1 2] [3 4]]))
  (asrt (index (index m 1) 0) 3))

;; empty
(asrt ((. JSON stringify) []) "[]")

;; expressions as elements
(let* ((x 7) (a [x (+ x 1)]))
  (asrt (index a 1) 8))
```

---

## Part 2 — Object literals `{ "foo": "bar", x: 1 }`

### Current state

`(object ("foo" "bar") (x 1))` → `object-expr { fields: [...] }` — fully
implemented.  Computed keys `([expr] value)`, shorthand `(x)`, and method
syntax are all working.

`LBRACE` / `RBRACE` tokens do **not** exist yet.  `{` and `}` are currently
valid `IDENTIFIER` characters (the exclusion set only covers
`[`, `]`, `(`, `)`, whitespace, `:`, `;`, `-`, `~`).

### Plan

**Phase B1 — Lexer / Grammar tokens**

Add tokens:

```antlr
LBRACE      : '{' ;
RBRACE      : '}' ;
```

Update `IDENTIFIER` to exclude `{` and `}` (Unicode `\u007B` and `\u007D`):

```antlr
IDENTIFIER
    : ~[() \n\t\r:;\-~\u005B\u005D\u007B\u007D]+
    ;
```

> **Note:** `{` and `}` never appear in any existing identifier in the test
> suite (identifiers use letters, digits, `!`, `?`, `#`, `/`, `*`, `+`, etc.).
> This change is safe.  Run `npx vitest run` after grammar rebuild to confirm.

**Phase B2 — Grammar rules**

```antlr
braceObjectExpr
    : LBRACE (braceObjectField (COMMA? braceObjectField)*)? RBRACE
    ;

braceObjectField
    : (STRING | IDENTIFIER) COLON expression          // "foo": expr  or  x: expr
    | LBRACK expression RBRACK COLON expression       // [expr]: expr  (computed)
    | IDENTIFIER                                       // shorthand  { x }
    ;
```

Add `| braceObjectExpr` to the `expression` rule (alongside `objectExpr`).

Commas are optional (consistent with the rest of the grammar).

**Key syntax decisions:**

| JS notation | Brace-literal syntax | Existing paren syntax |
|---|---|---|
| `{ "foo": 1 }` | `{ "foo": 1 }` | `(object ("foo" 1))` |
| `{ x: 1 }` | `{ x: 1 }` | `(object (x 1))` |
| `{ [k]: 1 }` | `{ [k]: 1 }` | `(object ([k] 1))` |
| `{ x }` (shorthand) | `{ x }` | `(object (x))` |

Methods (`{ foo() {...} }`) are **out of scope** for this plan; use
`(object (foo (lambda ...)))` or the existing `(method ...)` form inside class
bodies.

**Phase B3 — AST (`Stage9-ast.s8`)**

Add `astBraceObjectField(ctx)` returning the same shape as `astObjectField`:

```
{
  tag: 'object-field',
  id:   spanId,
  key:  string | undefined,      // static key (identifier or string value)
  computed: boolean,
  keyExpr:  ASTNode | undefined, // populated when computed
  isShorthand: boolean,
  isMethod: false,               // methods not supported in brace syntax
  value: ASTNode | undefined,
}
```

Add `astBraceObjectExpr(ctx)` returning:

```
{ tag: 'object-expr', id: spanId, fields: [...astBraceObjectField(f) for f in ctx] }
```

Again the same shape as `astObjectExpr`, so no downstream changes.

**Phase B4 — Tests**

`stage9/tests/braceObjectLiteral.test.ts` — end-to-end tests:

```scheme
;; string keys
(let* ((o { "name": "Alice", "age": 30 }))
  (asrt ((. JSON stringify) o) '{"name":"Alice","age":30}'))

;; identifier keys
(let* ((o { x: 1, y: 2 }))
  (asrt (. o x) 1))

;; shorthand { x }  (same as { x: x })
(let* ((x 42) (o { x }))
  (asrt (. o x) 42))

;; computed key [expr]
(let* ((k "hello") (o { [k]: "world" }))
  (asrt (. o hello) "world"))

;; mixed
(let* ((tag "t") (o { "a": 1, b: 2, [tag]: 3 }))
  (asrt (. o a) 1)
  (asrt (. o b) 2)
  (asrt (. o t) 3))

;; empty
(asrt ((. JSON stringify) {}) "{}")
```

---

## Implementation order

1. **Array first** (A1 → A2 → A3) — no new tokens, smaller change, easy to validate.
2. **Object second** (B1 → B2 → B3 → B4) — adds new tokens; rebuild grammar + re-run full test suite after B1 to catch any IDENTIFIER regressions before writing AST code.

After each grammar change: `npm run build-grammar && npm run build-compiler && npx vitest run`.

---

## Non-goals / future work

- Method shorthand in `{...}` (`{ foo() { ... } }`) — out of scope.
- Spread in `{...}` (`{ ...other }`) — out of scope; use `(object ...)` with explicit fields.
- `JSON`-style mandatory commas — commas remain optional throughout to stay consistent with the rest of the grammar.
- Reader-macro style expansion in the sugar pass — not needed since the AST phase can produce the target node types directly.
