# t2lang-common

Shared utilities for the T2 compiler workspace.

## CLI Usage (examples)

The shared CLI helper supports printing an AST dump to stderr using `--ast`.

Example:

```bash
# Print AST dump to stderr instead of writing output file
t2c helloworld.t2 --ast
```

This is implemented by passing `--ast` to the CLI, which sets `dumpAst` in `CompilerConfig`. When enabled, the compiler emits `astDump` events (phase: `parse` for Phase0; `parse` and `expand` for Phase1), and the CLI prints the first `astDump` event's data to stderr.
