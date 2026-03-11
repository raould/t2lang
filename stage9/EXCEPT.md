# EXCEPT — Design & Implementation Document

## Goals

### Goal 1 — Introduce `(except ...)` as the canonical try/catch/finally form

Replace the current `(try ... (catch ...) (finally ...))` grammar with a new
`(except ...)` wrapper form where `try`, `catch`, and `finally` are siblings:

```lisp
(except
  (try
    (doSomething))
  (catch err
    (console.log "caught:" err))
  (finally
    (cleanup)))
```

This ensures that a paren-depth-based formatter indents `try`, `catch`, and
`finally` at the same column — matching the visual convention of TypeScript/
JavaScript — with no special-case formatter logic required.

The old `(try ... (catch ...) (finally ...))` form is removed immediately — no
migration period.

### Goal 2 — Reader transform (Future)

A future reader transform will allow a flat write style where consecutive
`(try ...)`, `(catch ...)`, `(finally ...)` forms at the same depth are
automatically wrapped in `(except ...)`. This is deferred until after Goal 1
is complete and in use. See the Edge Cases section for the full spec.

---

## Style Guide (end state)

```lisp
;; Standard form — try/catch/finally
(except
  (try
    (doSomething)
    (throw "boom"))
  (catch err
    (console.log "caught:" err))
  (finally
    (cleanup)))

;; try/finally without catch
(except
  (try
    (doSomething))
  (finally
    (cleanup)))

;; try/catch without finally
(except
  (try
    (doSomething))
  (catch err
    (handleErr err)))
```

Once the reader transform (Goal 2) is implemented, the flat style below will
also be valid and preferred:

```lisp
;; Future flat style (Goal 2)
(try
  (doSomething))
(catch err
  (handleErr err))
(finally
  (cleanup))
```

---

## Implementation Plan

### MVP (Goal 1)

Phases 1–6 below. Goal 2 (reader transform) is deferred and tracked separately.

### Phase 1 — Grammar (`Stage9.g4`)

**Add lexer token:**
```antlr
EXCEPT      : 'except' ;
```

**Add `EXCEPT` to `propKey`** so `except` remains valid as an identifier/property name.

**Replace `tryForm` with `exceptForm`:**
```antlr
exceptForm
    : LPAREN EXCEPT tryClause catchClause? finallyClause? RPAREN
    ;

tryClause
    : LPAREN TRY statement* RPAREN
    ;

catchClause
    : LPAREN CATCH IDENTIFIER statement* RPAREN
    ;

finallyClause
    : LPAREN FINALLY statement* RPAREN
    ;
```

Remove `tryForm` from the `statement` rule. Add `exceptForm` in its place.

`TRY`, `CATCH`, `FINALLY` tokens are retained — they are still used inside
`exceptForm` clauses, and `CATCH`/`FINALLY` remain in `propKey`.

Run `npm run build-grammar`.

### Phase 2 — AST (`Stage9-ast.s8`)

Rename `astTryForm` → `astExceptForm`. Source fields from the new clause
structure:

- `tryClause` → `.statement()` list → `body`
- `catchClause` (optional) → `.IDENTIFIER()` → `catchVar`, `.statement()` → `catchBody`
- `finallyClause` (optional) → `.statement()` → `finallyBody`

Tag remains `try-form` (or rename to `except-form` — codegen is unchanged
either way; choose `except-form` for clarity).

### Phase 3 — Codegen (`Stage9-codegen.s8`)

Rename `emitTryForm` → `emitExceptForm`, update tag dispatch. The emitted
TypeScript is identical:

```typescript
try {
  ...body
} catch (err) {
  ...catchBody
} finally {
  ...finallyBody
}
```

### Phase 4 — Reader transform (`Stage9-reader.s8`) — FUTURE (Goal 2)

See Edge Cases section for full spec. Deferred until Goal 1 is complete.

### Phase 5 — Tests

**Update existing tests** in `stage9/tests/tryCatchFinally.test.ts`: replace
all `(try ... (catch ...) (finally ...))` with `(except (try ...) (catch ...) (finally ...))`.
Reader transform tests (EC-1 through EC-12) are added when Goal 2 is implemented.

**Add reader error tests** (see Edge Cases section below).

### Phase 6 — Style Guide (`STYLE_GUIDE.md`)

Update section 13 (Error Handling) with the new preferred flat style and
`(except ...)` explicit form, as shown above.

---

## Edge Cases & Error Tests

Each case below should produce a clear, positioned error message.

### EC-1: `(try)` with no following clause
```lisp
(program
  (try
    (doSomething)))
```
**Expected error:** `reader: (try) must be followed by (catch) or (finally)`

---

### EC-2: Bare `(catch)` with no preceding `(try)`
```lisp
(program
  (catch err
    (console.log err)))
```
**Expected error:** `reader: (catch) without preceding (try)`

---

### EC-3: Bare `(finally)` with no preceding `(try)`
```lisp
(program
  (finally
    (cleanup)))
```
**Expected error:** `reader: (finally) without preceding (try)`

---

### EC-4: `(finally)` following `(catch)` with no `(try)`
```lisp
(program
  (catch err (console.log err))
  (finally (cleanup)))
```
**Expected error:** `reader: (catch) without preceding (try)`
(The `catch` error fires first; `finally` is never reached.)

---

### EC-5: Double `(catch)`
```lisp
(program
  (try (doSomething))
  (catch err (handleA err))
  (catch err (handleB err)))
```
**Expected error:** `reader: duplicate (catch) clause for (try)`

---

### EC-6: `(finally)` before `(catch)`
```lisp
(program
  (try (doSomething))
  (finally (cleanup))
  (catch err (handleErr err)))
```
**Expected error:** `reader: (catch) after (finally) is not allowed`
(Once a `finally` is collected, no further catch is permitted.)

---

### EC-7: Two `(finally)` clauses
```lisp
(program
  (try (doSomething))
  (catch err (handleErr err))
  (finally (cleanupA))
  (finally (cleanupB)))
```
**Expected error:** `reader: duplicate (finally) clause for (try)`

---

### EC-8: `(try)` immediately inside a nested form — not a top-level clause
```lisp
(program
  (const (f) (lambda ()
    (try
      (doSomething))
    (catch err
      (handleErr err)))))
```
**Expected:** valid — the reader handles `(try)`/`(catch)` at any consistent
depth, not only top-level. The lambda body is scanned at its own depth baseline.

---

### EC-9: `(try)` at end of file with no following clause
```lisp
(program
  (doSetup)
  (try
    (doSomething)))
```
**Expected error:** `reader: (try) must be followed by (catch) or (finally)`
(End of enclosing form counts as "no following clause".)

---

### EC-10: Interleaved unrelated form between `(try)` and `(catch)`
```lisp
(program
  (try (doSomething))
  (console.log "between")
  (catch err (handleErr err)))
```
**Expected error:** `reader: (try) must be followed by (catch) or (finally)` —
the intervening `(console.log ...)` breaks the sequence.

---

### EC-11: Valid try/finally without catch (smoke test)
```lisp
(program
  (try
    (doSomething))
  (finally
    (cleanup)))
```
**Expected:** valid — wraps to `(except (try (doSomething)) (finally (cleanup)))`.

---

### EC-12: Valid nested try/catch inside catch body
```lisp
(program
  (try
    (riskyOuter))
  (catch outerErr
    (try
      (riskyInner))
    (catch innerErr
      (console.log innerErr))))
```
**Expected:** valid — two independent `except` forms at different depths.

---

## Open Questions

- Should `except` be reserved as a keyword (removed from `propKey`) or kept
  available as an identifier? Recommendation: keep in `propKey` to avoid
  breaking any existing code that uses `except` as a property name.
