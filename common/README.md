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

## Optional imports — importOptional helper

The workspace provides a small runtime helper `importOptional(moduleName)` (exported from the package root) that attempts to dynamically import an optional dependency and returns the module namespace or `null` on failure.

When to use:
- Optional developer tools (formatters, reporters) that should not be hard dependencies for consumers (for example, `prettier`).
- Test helpers or example scripts where a dependency may be present in the contributor's environment but not required by all consumers.

Example (from `common/src/cliHelper.ts`):

```ts
const { importOptional } = await import('./importOptional.js');
const prettier = await importOptional('prettier');
if (prettier) {
	out = prettier.format(out, { parser: 'typescript' });
}
```

Notes:
- Prefer static `import` for core dependencies (gives better type-safety, bundling and startup characteristics).
- Use `importOptional` only for truly optional integrations; it returns `null` when the module can't be loaded.
