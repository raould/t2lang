# Reader macro support in .t2

## High-level approach:

- [x] Define a reader-macro registry in the compiler (Phase B reader), keyed by prefix tokens (e.g., : or #) to a handler.
- [x] Extend the reader to consult that registry before default tokenization (same place it handles ', `, ~, :().
- [x] Add a defreadermacro form in Phase B that runs before parsing source, so it can register new prefixes and expansion templates.
- [x] Decide a safe expansion format: the macro must return an S-expression node, not raw text.
- [x] Persist the registry per file/module and clear it between runs.
- [x] Add tests: macro definition, usage, and error cases (unknown prefix, invalid expansion).
- [x] Document limits: reader macro run before defmacro, so they can’t depend on parsed ASTs.

## Syntax

```
(defreadermacro "#" quote)
#(foo bar) ; => (quote (foo bar))
```

Rules:
- `defreadermacro` must be a top-level form.
- Prefix must be a non-alphanumeric token (string literal or symbol) with no whitespace.
- Expansion must be a symbol name; the reader wraps the next node as `(expansion <node>)`.

## Limits

- Reader macros run before `defmacro`, so they cannot rely on expanded ASTs.
- Prefixes are per-file and cleared between runs.
- Unknown prefixes of the form `@(…)` error once reader macros are enabled in a file.
