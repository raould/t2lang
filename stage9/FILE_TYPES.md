# File Type Constraints — Stage9 Design

This document describes the validation rules that enforce the distinction between
`.t2` source files and `.t2m` macro-only files.

---

## File Types

### `.t2` — Source files

Regular t2lang source files. Compiled to TypeScript. May define and use macros
locally, and may import macros from `.t2m` files via `macro-import`. Cannot
export macros — macro authoring for reuse must live in `.t2m` files.

### `.t2m` — Macro-only files

Macro library files. Loaded and interpreted at compile time by the macro
expander when a `.t2` or another `.t2m` file uses `macro-import`. They do not
produce TypeScript output — they exist only as compile-time artifacts. Must
contain only macro-related top-level forms — no runtime declarations, type
definitions, or statements.

---

## Rules

### Rule 1 — `.t2` files may not export macros

If a `.t2` file contains a `macro-export` top-level form, the compiler errors:

```
<span>: macro-export is not allowed in .t2 files; use a .t2m file to export macros
```

Rationale: macros are only discoverable across files via `macro-import`, which
loads `.t2m` files. Allowing `macro-export` in `.t2` files would create a
confusing split between runtime and macro-time exports in a single file, and
there is no mechanism for another file to import macros from a `.t2` file.

`macro-import` remains allowed in `.t2` files — consuming macros from a `.t2m`
file is the normal workflow.

### Rule 2 — `.t2m` files may only contain macro-related forms

If a `.t2m` file contains any top-level form whose AST tag is not in the allowed
set, the compiler errors:

```
<span>: .t2m files may only contain macro definitions, #[macro-time] bindings, macro-import, and macro-export
```

**Allowed AST tags in `.t2m`:**

| AST tag | Grammar form | Description |
|---|---|---|
| `"defmacro"` | `defmacro` | Macro definition |
| `"macro-time-fn-def"` | `macroTimeFnDef` | `#[macro-time]` const/let binding |
| `"macro-import"` | `macroImport` | Import macros from another `.t2m` |
| `"macro-export"` | `macroExport` | Export macros for use by consumers |

Everything else is forbidden: bare `const`/`let` declarations, `fn`, type
aliases, interfaces, enums, classes, import forms, export forms, and statements.

Rationale: `.t2m` files are interpreted at macro-expansion time and produce no
TypeScript output. Allowing runtime declarations would be meaningless (they
would never execute) and would create confusion about what the file does.
`#[macro-time]` bindings are allowed because they are the correct way to define
helper values and functions that macros depend on.

---

## Stdin

When input is read from stdin (`filePath === "-"`), `isMacroCompilation` is
`false`. Rule 1 applies (no `macro-export`). Rule 2 does not apply. Stdin is
treated as a `.t2` file.

---

## Implementation

### Detection

`isMacroCompilation` is already computed in `main()`:

```
isMacroCompilation = filePath !== "-" && filePath.endsWith(".t2m")
```

No new flag is needed.

### Where the check runs

After `parseFile(filePath)` returns `programNode`, before `expandAll`. This is
a **pre-expansion** check on the raw AST. We validate what the user wrote, not
what macros might generate. Macro-generated violations are an edge case deferred
to a future phase if needed.

### Implementation location

A single function `validateFileTypeConstraints(programNode, isMacroCompilation)`
in `Stage9.s8`, called from `main()` immediately after `parseFile`. No new
files needed.

```
main():
  ...
  programNode = parseFile(filePath)
  validateFileTypeConstraints(programNode, isMacroCompilation)  ← new
  expandResult = expandAll(programNode, macroEnv, loadMacroModule)
  ...
```

The function iterates `programNode.body` once, checking tags against the rules
above. Errors call `formatSpan(node.id)` for location info and exit with code 1.

---

## macro-import Path Resolution

`macro-import` accepts two path forms:

### Relative paths

```
(macro-import ns "./local/macros.t2m")
(macro-import ns "../shared/utils.t2m")
```

Resolved against the current working directory via `path.resolve`.

### Scoped paths (`@scope/rest`)

```
(macro-import ns "@myScope/helpers.t2m")
```

The `@scope` prefix is resolved to a root directory configured via the
`--macro-root` CLI flag. Multiple scopes may be registered:

```
npx tsx index.ts --macro-root myScope=/path/to/macros --macro-root other=/other/path file.t2
```

If the scope is not registered, the compiler errors with a helpful message:

```
error: unknown macro scope "@myScope" in macro-import; pass --macro-root myScope=<path>
```

If the `@`-prefixed path has no `/`, the compiler errors:

```
error: macro-import @-path must include "/" after the scope name: @noslash
```

**Note:** `@scope` path rewriting applies only to `macro-import`. Regular
`import` paths (for TypeScript modules) are passed through unchanged — import
path resolution for runtime modules belongs to the TypeScript compiler and build
system, not to t2lang.

---

## Acceptance Tests

```
// Rule 1: macro-export in .t2 file → error
(program
  (macro-export myMacro))
→ error: macro-export is not allowed in .t2 files

// Rule 1: macro-import in .t2 file → ok
(program
  (macro-import myLib "./macros.t2m"))
→ ok

// Rule 2: defmacro in .t2m → ok
(program
  (defmacro my-macro (x) (return x)))
→ ok

// Rule 2: #[macro-time] binding in .t2m → ok
(program
  (#[macro-time] (const helper (lambda (x) x))))
→ ok

// Rule 2: bare const in .t2m → error
(program
  (const foo 42))
→ error: .t2m files may only contain macro definitions, ...

// Rule 2: fn in .t2m → error
(program
  (fn myFn ((x)) (return x)))
→ error: .t2m files may only contain macro definitions, ...

// Rule 2: import in .t2m → error
(program
  (import {fs} "node:fs"))
→ error: .t2m files may only contain macro definitions, ...
```
