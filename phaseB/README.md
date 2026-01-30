# Phase B: Macro, Sugar, and Reader Layer

Phase B is the frontend layer of t2lang, responsible for ergonomics, macros, and lowering complex syntax into the canonical Phase A AST.

## Documentation

- [Macro Specification](MACROS.md): Defines the macro system (hygiene, defmacro, quasiquotes).
- [Sugar Specification](SUGAR.md): Defines syntactic sugar (properties, literals, rewrites).
- [Implementation Plan](TODO.md): Roadmap for building Phase B.

## Responsibilities

1.  **Reading**: Parsing source text into S-expressions.
2.  **Expanding**: Running macros and rewriting sugar.
3.  **Lowering**: Producing valid Phase A AST for the next compilation stage.
