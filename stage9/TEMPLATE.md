# Backtick Template Literal Sugar

## Status

The paren form `(template "foo " b " bar")` already works end-to-end and emits
`` `foo ${b} bar` ``.  This plan adds syntactic sugar so that
`` `foo ${b}` `` in t2 source compiles to the same thing.  No changes to the
AST, lower, codegen, scope-resolve, or macro-expand passes are needed.

---

## Approach: pre-parser reader transformation

The fundamental difficulty is that `` `foo ${b}` `` contains an **embedded
expression** (`b`) inside the backtick string.  ANTLR4 multi-mode lexers can
handle this but are complex and fragile.  A simpler alternative is a
**pre-parser reader** that transforms the source text string before ANTLR ever
sees it:

```
`foo ${b} bar`   →   (template "foo " b " bar")
```

This is a string-to-string pass over the raw source.  It runs in the entry
point (`Stage9.s8` / `index.ts`) right before the ANTLR parse call.  The rest
of the pipeline is unchanged.

---

## Phase 0 — Reader module (`Stage9-reader.s8`)

New source file; compiled to `Stage9-reader.ts` by `npm run build-compiler`.

### Algorithm

Scan the source character by character, tracking:

- `inTemplate` — inside a backtick template
- `textBuf` — accumulated text chunk between holes
- `parts` — collected `"text"` / `expr-source` pieces for the current template
- `exprBuf` / `braceDepth` — accumulated expression source + brace nesting depth
- `exprMode` — currently collecting an expression (after `${`)

Transitions:

| State | Sees | Action |
|---|---|---|
| default | `` ` `` | enter template mode; clear `textBuf`, `parts` |
| default | `'...'` or `"..."` or `"""..."""` | copy verbatim (skip content, no backtick scan inside) |
| template | `` \` `` | append literal `` ` `` to `textBuf` |
| template | `${` | flush `textBuf` as quoted string part; enter expr mode (`braceDepth=1`) |
| template | `` ` `` | flush `textBuf`; emit `(template PARTS)`; exit template mode |
| template | anything else | append char to `textBuf` |
| expr | `{` | append; `braceDepth++` |
| expr | `}` and `braceDepth > 1` | append; `braceDepth--` |
| expr | `}` and `braceDepth == 1` | flush expr as unquoted part; exit expr mode |
| expr | `'...'` or `"..."` or `"""..."""` | copy verbatim (strings inside `${}`) |
| expr | anything else | append to `exprBuf` |

**String skipping** (inside default, template, and expr states): when a `'`,
`"`, or `"""` opening is seen, copy characters verbatim until the matching
closing delimiter, handling `\\` escapes.  This prevents false detection of
backticks or `${` inside string literals.

### Output format

Text chunks: double-quoted strings with `"` and `\` escaped.
Empty text chunks are omitted.
Expression chunks: copied verbatim (the sub-source text between `${` and `}`).

Examples:

| Input | Output |
|---|---|
| `` `foo ${b} bar` `` | `(template "foo " b " bar")` |
| `` `${b}` `` | `(template b)` |
| `` `${a} ${b}` `` | `(template a " " b)` |
| `` `hello` `` | `(template "hello")` |
| `` `${"lit"}` `` | `(template "lit")` |
| `` `a ${x + 1} b` `` | `(template "a " (+ x 1) " b")` |

**Exported function:**

```s8
(export-named (readerTransform))
```

```s8
(const readerTransform
  (lambda ((source))
    ;; returns the transformed source string
    ...))
```

---

## Phase 1 — Entry point integration (`Stage9.s8`)

Import `readerTransform` and call it on the raw source before parsing:

```s8
(import (object (named (array (object (name "readerTransform"))))) "./Stage9-reader")

;; in the main streaming loop, before astTopLevel:
(const rawSource (readStdin))
(const transformedSource (readerTransform rawSource))
;; pass transformedSource to the ANTLR input stream
```

The existing `CharStream.fromString(source)` call changes to
`CharStream.fromString(transformedSource)`.

---

## Phase 2 — Grammar: exclude backtick from IDENTIFIER

Currently `` ` `` is a valid `IDENTIFIER` character (not in the exclusion set).
After the reader transforms all backtick templates, no backtick should appear in
the transformed source.  However, if a raw backtick somehow survives (e.g. in a
comment or untransformed position), it would parse as IDENTIFIER, producing a
confusing error.

Add `` ` `` (U+0060) to the IDENTIFIER exclusion set:

```antlr
IDENTIFIER
    : ~[() \n\t\r:;\-~\u005B\u005D\u007B\u007D,\u0060]+
    ;
```

This gives a clean parse error rather than a silent mis-parse if a backtick is
ever seen by the ANTLR lexer.

---

## Phase 3 — Tests (`tests/backtickTemplate.test.ts`)

End-to-end tests via `fromSourceEndToEnd`:

```scheme
;; basic interpolation
(let* ((b 42) (a `foo ${b}`))
  (asrt a "foo 42"))

;; expression in hole
(let* ((x 3) (s `result: ${(* x x)}`))
  (asrt s "result: 9"))

;; hole at start
(let* ((name "world") (s `${name}!`))
  (asrt s "world!"))

;; multiple holes
(let* ((a "hi") (b "there") (s `${a} ${b}`))
  (asrt s "hi there"))

;; no interpolation (plain backtick string)
(let* ((s `hello`))
  (asrt s "hello"))

;; empty template
(asrt `` "")
```

---

## What does NOT need to change

| Component | Status |
|---|---|
| `Stage9-ast.s8` | Unchanged — `astTemplateExpr` already handles `template-expr` |
| `Stage9-codegen.s8` | Unchanged — `emitTemplateExpr` already emits `` `...${...}...` `` |
| `Stage9-lower.s8` | Unchanged |
| `Stage9-scope-resolve.s8` | Unchanged |
| `Stage9-macro-expand.s8` | Unchanged |
| Grammar `templateExpr` rule | Unchanged |

---

## Out of scope

- **Nested backtick templates** inside `${...}` holes (e.g. `` `outer ${\`inner\`}` ``) — the expr-mode scanner can handle balanced `{}` but not nested `` ` `` delimiters without a recursive reader.  Defer; use `(template ...)` for nesting.
- **Tagged template literals** (`tag\`...\``) — not planned.
- **Type-level template literals** — already supported via `(type-template ...)`.
