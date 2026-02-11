# T2 Phase 1 Compiler

Phase 1 extends Phase 0 with ergonomic features and advanced constructs.

## Current Goal


## TODO


## Macros and Sugar

Phase1 adds higher-level syntax sugar and macros on top of the Phase0 core.

### Single-binding `let`/`const` sugar

Phase1 supports a concise single-binding form for `let` and `const` that desugars
into the sequential `let*`/`const*` forms used by Phase0. These forms accept an
optional inline type annotation. Examples:

- `(let x 123 body...)` desugars to `(let* ((x 123)) body...)`
- `(let x: Number 123 body...)` desugars to `(let* (((x Number) 123)) body...)`
- `(const name "Alice" body...)` desugars to `(const* ((name "Alice")) body...)`

When a binding includes a type (e.g. `x: Type`), Phase1 rewrites the binding to
the typed-name shape `((name Type) init)` so Phase0 can attach the type
annotation and the TypeScript code generator will emit an inline `: Type` on the
declared variable.

The multi-binding forms `let*` and `const*` remain available for sequential
bindings; single-binding sugar is intended for the common, ergonomic case.
