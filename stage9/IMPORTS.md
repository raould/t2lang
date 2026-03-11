# Cross-File Import Path Rewriting

## Problem

When `B.t2` imports from `A.t2`, both files are compiled to `.js` (or `.ts`) output files.
The import path written in `B.t2` is currently emitted **verbatim** into `B.js`. This breaks
in two ways:

1. **Extension**: `"./A.t2"` is not a valid runtime specifier — it must become `"./A.js"`.
2. **Relative path**: If source and output directories differ in depth or layout, the
   relative path from `B.t2` to `A.t2` may be wrong from the perspective of the compiled
   output files `B.js` and `A.js`.

---

## Design: TypeScript-style `--root-dir` / `--out-dir`

The compiler gains two new CLI flags:

```
--root-dir <dir>   Root of the source tree. All input .t2 files are expected to
                   live under this directory. Defaults to the directory of the
                   input file (single-file identity mapping).

--out-dir  <dir>   Root of the output tree. Each input file at
                   <root-dir>/a/b.t2 compiles to <out-dir>/a/b.js.
                   Defaults to <root-dir> (output beside source).
```

When `--out-dir` is supplied, the compiler rewrites every relative import that
ends in `.t2` (or `.t2m`) as follows:

1. Resolve the import source relative to the **input** file to get its absolute
   source path.
2. Compute the path of that file's **output** artifact by stripping the `rootDir`
   prefix and prepending `outDir`, then changing the extension to `.js`.
3. Compute the path of the **current** file's output artifact the same way.
4. Emit the relative path from step 3's directory to step 2's file.

Bare specifiers (`"node:fs"`, `"antlr4ng"`, etc.) and relative paths that do
**not** end in `.t2` / `.t2m` are always passed through unchanged.

---

## Concrete Examples

### Example 1 — `src/` → `dist/`

```
project/
  src/
    utils.t2          exports `helper`
    app.t2            imports helper from utils
  dist/
    utils.js          (compiled)
    app.js            (compiled)
```

Compile commands:
```sh
t2 --root-dir src --out-dir dist  src/utils.t2  >  dist/utils.js
t2 --root-dir src --out-dir dist  src/app.t2    >  dist/app.js
```

`src/app.t2` source:
```scheme
(program
  (import (object (:named (array (object (:name "helper"))))) "./utils.t2")
  ...)
```

Without rewriting, `dist/app.js` would emit:
```js
import { helper } from "./utils.t2";   // broken — .t2 not a valid specifier
```

With `--root-dir src --out-dir dist`:
- Input file: `src/app.t2`  →  Output: `dist/app.js`
- Imported: resolves `./utils.t2` → `src/utils.t2`  →  Output: `dist/utils.js`
- Relative from `dist/` to `dist/utils.js` = `"./utils.js"`

`dist/app.js` emits:
```js
import { helper } from "./utils.js";   // correct
```

---

### Example 2 — `src/` vs `tests/` (shared root)

```
project/
  src/
    math.t2           exports `add`
  tests/
    math.test.t2      imports add from src/math.t2
  dist/
    src/
      math.js         (compiled)
    tests/
      math.test.js    (compiled)
```

Compile commands:
```sh
t2 --root-dir . --out-dir dist  src/math.t2         >  dist/src/math.js
t2 --root-dir . --out-dir dist  tests/math.test.t2  >  dist/tests/math.test.js
```

`tests/math.test.t2` source:
```scheme
(program
  (import (object (:named (array (object (:name "add"))))) "../src/math.t2")
  ...)
```

Without rewriting, `dist/tests/math.test.js` would emit:
```js
import { add } from "../src/math.t2";  // broken
```

With `--root-dir . --out-dir dist`:
- Input file: `tests/math.test.t2`  →  Output: `dist/tests/math.test.js`
- Imported: resolves `../src/math.t2` → `src/math.t2`  →  Output: `dist/src/math.js`
- Relative from `dist/tests/` to `dist/src/math.js` = `"../src/math.js"`

`dist/tests/math.test.js` emits:
```js
import { add } from "../src/math.js";  // correct
```

---

### Default (no flags) — output beside source

```
project/
  lib/
    utils.t2     exports `foo`
    app.t2       imports foo   →  compiled to app.js in same dir
```

```sh
t2  lib/app.t2  >  lib/app.js
```

`lib/app.t2`:
```scheme
(import (object (:named (array (object (:name "foo"))))) "./utils.t2")
```

No flags ⇒ `rootDir = lib/`, `outDir = lib/` (identity mapping).
Extension rewriting still applies: `"./utils.t2"` → `"./utils.js"`.

`lib/app.js` emits:
```js
import { foo } from "./utils.js";     // correct — same directory, just ext changed
```

---

## Implementation Phases

### Phase 0 — Extension-only rewriting (no new flags)

**Goal:** Fix the common case where source and output live in the same directory.
Any relative import ending in `.t2` has its extension replaced with `.js`.

**Changes:**

- **`Stage9-codegen.s8` (`emitImport`)**
  - If `node.source` ends with `".t2"`, replace the suffix with `".js"` before emitting.
  - `.t2m` imports are already emitted as `// macro-import: …` comments; no change needed.
  - All other paths pass through unchanged.

**Acceptance test:**
```
input:  (import (object (:named (array (object (:name "x"))))) "./foo.t2")
output: import { x } from "./foo.js";
```

---

### Phase 1 — CLI flags `--root-dir` / `--out-dir`

**Goal:** Wire the two new flags through the CLI and make them available to the
emission layer, without changing emission behaviour yet (that comes in Phase 2).

**Changes:**

- **`Stage9.s8` (`main`)**
  - Parse `--root-dir <dir>` and `--out-dir <dir>` from `argv`.
  - Default `rootDir` to `path.dirname(path.resolve(filePath))`.
  - Default `outDir` to `rootDir`.
  - Both values are resolved to absolute paths via `path.resolve`.
  - Error if `--out-dir` is given without `--root-dir` (avoids ambiguous inference).

- **`Stage9-codegen.s8`**
  - Export a `setImportContext(inputFile, rootDir, outDir)` function that stores the
    three values in module-level variables.
  - `emitImport` reads these variables when deciding how to rewrite a path.

- **`Stage9.s8`** — call `setImportContext` once per file, after parsing the flags and
  before starting the emit loop.

---

### Phase 2 — Full path rewriting

**Goal:** When `--out-dir` differs from `--root-dir`, rewrite relative `.t2` imports
to their correct output-relative path.

**Algorithm in `emitImport`** (pseudo-code):

```
function rewriteSource(rawSource):
  if not rawSource.startsWith("./") and not rawSource.startsWith("../"):
    return rawSource                          // bare specifier, pass through

  ext = extension(rawSource)
  if ext !== ".t2" and ext !== ".t2m":
    return rawSource                          // not a t2 source path, pass through

  // Resolve absolute paths
  inputDir      = path.dirname(inputFile)
  absImported   = path.resolve(inputDir, rawSource)        // absolute source path

  // Map source paths to output paths
  absInputOut   = mapToOutput(inputFile, rootDir, outDir)
  absImportOut  = mapToOutput(absImported, rootDir, outDir)

  // Re-relativize
  rel = path.relative(path.dirname(absInputOut), absImportOut)
  if not rel.startsWith("."):
    rel = "./" + rel
  return rel

function mapToOutput(absSource, rootDir, outDir):
  rel  = path.relative(rootDir, absSource)   // e.g. "src/app.t2"  →  "app.t2"
  noExt = stripExtension(rel)                // "app"
  return path.join(outDir, noExt + ".js")   // "/project/dist/app.js"
```

**Error condition:** If `absImported` does not have `rootDir` as a prefix (e.g. the
imported file is outside the source tree), emit a compile-time error:
```
error: import "../../../outside.t2" escapes root-dir <dir>
```

---

### Phase 3 — Tests

New test file: `stage9/tests/importPathRewrite.test.ts`

| # | Description | Input path | Flags | Expected output |
|---|---|---|---|---|
| 1 | ext rewrite, same dir (no flags) | `"./foo.t2"` | — | `"./foo.js"` |
| 2 | ext rewrite, parent dir | `"../bar.t2"` | — | `"../bar.js"` |
| 3 | no rewrite for bare specifier | `"node:fs"` | — | `"node:fs"` |
| 4 | no rewrite for non-t2 relative | `"./foo.js"` | — | `"./foo.js"` |
| 5 | src→dist, same subdir | `"./utils.t2"` | `--root-dir src --out-dir dist`, input=`src/app.t2` | `"./utils.js"` |
| 6 | src→dist, sibling dir cross | `"../src/math.t2"` | `--root-dir . --out-dir dist`, input=`tests/math.test.t2` | `"../src/math.js"` |
| 7 | escape rootDir error | `"../../outside.t2"` | `--root-dir src --out-dir dist`, input=`src/a.t2` | compile error |
| 8 | `.t2m` extension unchanged (macro) | `"./m.t2m"` | — | comment, not import |

---

## What does NOT change

- Bare specifiers (`"node:path"`, package names) — always verbatim.
- Relative paths that do not end in `.t2` / `.t2m` — always verbatim.
- `macro-import` forms — these are already compiled away to `// macro-import: …`
  comments; they never appear in the final JS runtime output regardless of flags.
- Internal stage compiler files (Stage9-*.s8) use `"./Stage9-foo"` with no extension
  and are not affected.
