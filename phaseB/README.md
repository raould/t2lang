# Phase B: Macro, Sugar, and Reader Layer

Phase B is the frontend layer of t2lang, responsible for ergonomics, macros, and lowering complex syntax into the canonical Phase A AST.

## Documentation

- [Macro Specification](MACROS.md): Defines the macro system (hygiene, defmacro, quasiquotes).
- [Sugar Specification](SUGAR.md): Defines syntactic sugar (properties, literals, rewrites).
- [Error Specification](ERRORS.md): Defines error categories, formatting, and source tracking.
- [Implementation Plan](TODO.md): Roadmap for building Phase B.

## Responsibilities

1.  **Reading**: Parsing source text into S-expressions.
2.  **Expanding**: Running macros and rewriting sugar.
3.  **Lowering**: Producing valid Phase A AST for the next compilation stage.

## CLI

Use `npm run phaseb -- <path>` to run the Phase B parser. The package also ships a `t2b` binary (via the `bin` field in `package.json`), so once the package is built you can run `npx t2b -- <file>`. Control how diagnostics are emitted with `--error-format=tty|json|short`—the formats and error codes are documented in [ERRORS.md](ERRORS.md).

Phase B depends on the compiled Phase A distribution, so building Phase B (via `npm run build` or the `t2b` release) first runs `npm --prefix ../phaseA run build`. If you run `npm run phaseb` directly from source, make sure the Phase A dist already exists under `../phaseA/dist`.

The CLI lets you choose where TypeScript output lands (`--output <path>` or `--stdout`), set the pretty printer mode with `--pretty-option=pretty|ugly`, deterministically seed compilation using `--seed`, or print the Phase B AST (after macro/sugar expansion) via `--dump-ast`. Enable compiler event logs with `--log`/`--log-level=<level>` and restrict which phases are emitted via `--log-phases=<phase,...>`. Trace events are controlled analogously with `--trace`/`--trace-phases=<phase,...>` and now dump serialized Phase A snapshots (parse, resolve, typecheck, codegen) to stderr when permitted.
