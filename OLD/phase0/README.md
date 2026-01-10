# T2 Phase 0 Compiler

This is a minimal, deterministic Phase 0 compiler for the T2 language.

Phase 0 goals:

- S-expression based syntax only
- Explicit `(program ...)` root form
- Core constructs: identifiers, literals, calls, `let*`, `block`
- Full pipeline: parse → resolve → typeCheck → TypeScript codegen
- Structured events and errors
- Integration tests as executable examples

This repo is a checkpoint of the current design and implementation.
