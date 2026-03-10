# Plan

* Goal: add a T2 compiler flag that allows inclusion of one or more .t2 macro source files so the main .t2 file that is being compiled can invoke those new macros (not just the macros that are already built into the core of T2).

- [ ] Locate option plumbing: identify where compiler CLI/config is parsed (likely index.ts and any Config type). Decide naming (e.g., macroPreludePaths: string[]).
- [ ] Input normalization: ensure CLI accepts repeated flags (--macro-prelude path1 --macro-prelude path2) and/or comma-separated; resolve to absolute paths relative to cwd or compiler root; validate existence and .t2 extension.
- [ ] Load order semantics: prelude paths are processed in provided order before the user’s file(s); failures should be fatal and reported with path context.

## Compilation flow changes:
- [ ] Parse/expand each prelude file, registering any macros (and macro-time functions) into the macro environment without emitting runtime output.
- [ ] Then process the main input(s) using the populated macro environment.
- [ ] Guard against leaking state between top-level inputs (reset macro env per compilation unless explicitly shared; decide per current multi-file behavior).
- [ ] AST/codegen handling: ensure prelude defmacro nodes are still emitted as comments in the generated TS (consistent with existing behavior), but emitted only once per compile when a prelude is used.

## Tests:
- [ ] Positive: multiple preludes, ordering matters (later macro can shadow earlier), macros usable in main file.
- [ ] Error: missing file; non-.t2 extension; macro reference without prelude present.
- [ ] Ensure existing macroIntegration tests still pass without specifying the option.
- [ ] CLI docs: update README/docs and usage strings to show the new option and multiple paths example.
