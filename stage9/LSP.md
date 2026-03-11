# t2lang Language Server — Design Document

---

## Quick Start

### 1. Build the LSP module

```sh
npm run build-lsp        # compiles lsp.t2 → lsp.ts
```

The server entry point (`bin/t2lang-lsp.js`) is hand-authored and does not need to be built.

### 2. Install root dependencies (once)

```sh
# from repo root
npm install              # installs vscode-languageserver, vscode-languageserver-textdocument, etc.
```

### 3. Run the server manually (smoke-test)

The server communicates over stdio and is not meant to be run interactively, but you can verify it starts without crashing:

```sh
npx tsx bin/t2lang-lsp.js
# should hang waiting for LSP input — Ctrl-C to exit
```

### 4. Build and install the VS Code extension

```sh
cd vscode-t2-formatter
npm install              # installs vscode-languageclient, typescript, etc.
npm run build            # compiles src/extension.ts → out/extension.js
npm run package          # produces vscode-t2-formatter-*.vsix

# Install the .vsix into VS Code:
code --install-extension vscode-t2-formatter-0.0.4.vsix
```

Or from the VS Code UI: **Extensions → ⋯ → Install from VSIX…**

### 5. Connect: how the extension finds the server

When a `.t2` or `.s8` file is opened, VS Code activates the extension (`onLanguage:t2`). The extension spawns `t2lang-lsp` (the bin entry from `npm install t2lang`) over stdio. The LSP handshake runs automatically — no manual connection step is needed.

**In-repo development:** the server runs directly from source via `tsx`, so no separate compilation step is required before testing changes to `Stage9-lsp.ts`. Just rebuild with `npm run build-lsp` and reload the extension host (`Ctrl+Shift+P` → *Developer: Restart Extension Host*).

### 6. Evaluate a snippet

1. Open a `.t2` or `.s8` file.
2. Select some code (any valid t2 expression or `(program ...)` block).
3. Press `Ctrl+Enter` (Mac: `Cmd+Enter`).
4. Results appear in the **t2 eval** output panel (stdout, stderr, or compile errors).

---

## Overview

The t2lang LSP provides editor-agnostic support for:

- Syntax highlighting
- Snippet evaluation
- Import inference
- 'Go To' Features (Future)
- State injection (Future)

The server ships as part of the `t2lang` npm package. Users install `npm install t2lang` and editor extensions spawn the server via the `t2lang-lsp` bin entry. In-repo development works against the local source.

The design is intentionally staged so that early versions remain minimal and predictable, while later versions add power without compromising explicitness or semantic clarity.

---

# Stage 0 — Syntax Highlighting ✅ DONE

See also: `vscode-t2-formatter`.

`vscode-t2-formatter` is implemented and published (`.vsix`). Contains `syntaxes/t2.tmLanguage.json` and `language-configuration.json`. Open minor TODOs in the extension (toggle line comment, comment indentation) — tracked in `vscode-t2-formatter/TODO.md`.

**Semantic tokens** (richer highlighting based on resolved types and bindings) are deferred to Future Directions — they require the LSP server and are not part of Stage 0.

---

# Stage 1 — Minimal Viable LSP ✅ DONE

> *Goal: Provide the smallest possible LSP that enables verbatim snippet evaluation.*
>
> **Implementation status:** Complete and smoke-tested.
>
> **Checklist:**
> - [x] Add `vscode-languageserver` and `vscode-languageserver-textdocument` to root `package.json` dependencies
> - [x] Add `"t2lang-lsp": "bin/t2lang-lsp.js"` to `package.json` bin entries
> - [x] Create `bin/t2lang-lsp.js` (server entry point — hand-authored, like other bin files)
> - [x] Create `stage9/Stage9-lsp.s8` → `stage9/Stage9-lsp.ts` (`createEvalService`, `handleT2Eval`, helpers)
> - [x] `Stage9-lsp.s8` compiled by stage9 via `npm run build-lsp` (not stage8 build-compiler)
> - [x] Smoke-tested: `handleT2Eval` compiles, type-checks, runs JS, returns `{ stdout, ts, js, finalT2 }`

### Capabilities

1. **Standard LSP Lifecycle**
   - The server implements standard document sync (`textDocument/didOpen`, `textDocument/didChange`) so the document store always has current file contents.
   - Standard lifecycle methods (`initialize`, `shutdown`, `exit`) are implemented per the LSP specification.

2. **Custom Request: `t2/eval`**
   - The client sends a document identifier, a selection range, and a mode.
   - The server:
     - looks up file text from its document store
     - extracts the selection (respecting character offsets on start/end lines)
     - wraps the selection in `(program ...)` if not already wrapped
     - compiles via `compile()` from t2lang
     - runs the resulting JS
     - returns results based on mode

3. **Selection Normalization**
   - If the selection is already a `(program ...)` form, use it as-is.
   - Otherwise, wrap it in `(program ...)`.
   - This is required because `compile()` expects a `(program ...)` form.

### Selection Pre-flight

One check is applied to the raw selection text before the pipeline runs:

- **Empty selection:** Return immediately with `diagnostics: [{ message: "empty selection" }]`. No compile invoked.

Paren balance is not checked here — `compileSource()` already throws with a clear error on imbalance, which surfaces as `diagnostics`. A separate pre-flight check would need to skip string contents to be correct, and the cost saving over an in-process compile is negligible.

### Pipeline (Stage 1)

```
document store lookup
  -> cancel any in-flight eval (kill child process, discard result)
  -> extract selection (with character offsets)
  -> pre-flight check (empty selection)
  -> normalize to (program ...)
  -> compileSource()
  -> TypeScript type-check + emit (in-process LanguageService)
  -> run JS (child process)
  -> return results
```

### Cancellation

Only one `t2/eval` runs at a time. If a new request arrives while a previous eval is still executing (waiting on the Node child process), the in-flight child is killed immediately and the new request proceeds. The cancelled request's promise is never resolved — the connection handler discards it and returns the new result.

This is simpler than LSP's `$/cancelRequest` protocol (which requires the client to send a cancellation notification and the server to check a token). Instead, the server keeps a single `currentAbort: AbortController | null`. Each incoming `t2/eval` aborts the previous controller before starting. This means the server serialises evals and the latest request always wins.

The `compileSource()` and `LanguageService` calls are synchronous and fast enough that cancellation only matters for the `spawnAsync` step (the Node child process). The `AbortController` passed to `spawnAsync` handles that: `ac.abort()` sends SIGTERM and the promise resolves immediately with `exitCode: 1`.

### TypeScript compilation — persistent LanguageService

Rather than spawning `tsc` as a child process per eval, the server creates a single `ts.LanguageService` instance at startup and reuses it for the lifetime of the process.

The service uses an in-memory virtual host: a single virtual file (e.g. `__eval__.ts`) whose content is swapped out before each type-check/emit. The TypeScript compiler caches parsed lib files and node_modules types across invocations, so the cold-start cost (loading `lib.es2022.full.d.ts` etc.) is paid once. Subsequent evals run in ~5–15ms in-process with no process spawning, no temp files, and no disk I/O.

```
createLanguageService() — once at server startup
  per eval:
    update virtual file content + increment version
    getSemanticDiagnostics()  → type errors
    getEmitOutput()           → JS string
```

The virtual host implements the minimal `LanguageServiceHost` interface:
- `getScriptFileNames` — returns `["__eval__.ts"]`
- `getScriptVersion` — returns a counter incremented on each update
- `getScriptSnapshot` — returns `ts.ScriptSnapshot.fromString(currentSource)` for the eval file; delegates to `ts.sys` for everything else (lib files, node_modules)
- `getCompilationSettings` — `{ module: CommonJS, target: ES2022, lib: ["lib.es2022.full.d.ts"], skipLibCheck: true }`
- `getDefaultLibFileName`, `fileExists`, `readFile`, `readDirectory` — delegate to `ts.sys`

### Runner Constraints

- **Execution model:** JS output from `getEmitOutput()` is written to a temp file and executed via `child_process.spawn(process.execPath, [jsPath])`. Evaluated code runs with full privileges — no sandboxing. This is intentional: t2lang is a single-user developer tool, not a multi-tenant service.
- **Unique temp files:** Each invocation writes to a unique temp file (random suffix). Temp files are deleted after execution completes whether or not execution succeeded. Best-effort cleanup runs on server shutdown.
- **Timeout:** Default 5-second timeout on JS execution. Configurable later.
- **Output limits:** Max output size (e.g. 1MB). If exceeded, output is truncated and the response includes a `truncated: true` flag.

### Error Handling

There are three distinct failure modes. `stdout` and `stderr` are always present (as `""` or a non-empty string) regardless of which stage failed.

| Stage | Failure | `stdout` | `stderr` | `diagnostics` |
|---|---|---|---|---|
| `compileSource()` throws | t2 compile error | `""` | `""` | populated |
| `getSemanticDiagnostics` non-empty | TypeScript type error | `""` | formatted diags | absent |
| `node` exits non-zero | Runtime error | partial | error message | absent |

- **Rule:** If `diagnostics` is present and non-empty, the pipeline stopped at t2 compilation. If `stderr` is non-empty and `diagnostics` is absent, the failure was a TypeScript type error or a runtime error.

### Non-Goals

- No semantic tokens or paren highlighting (editors handle this natively)
- No import inference
- No state injection
- No multi-selection support
- No diagnostics beyond compiler errors

### Why this stage matters

It gives every editor (VS Code, Emacs, Neovim, Helix, Zed) the ability to evaluate a snippet and see the compilation pipeline — with zero semantic complexity.

This is the pure baseline that everything else builds on.

### Implementation

The LSP server is implemented in t2lang source files — dogfooding the compiler and surfacing any missing features.

#### Dependencies

Add to root `package.json`:
```json
"vscode-languageserver": "^9.x",
"vscode-languageserver-textdocument": "^1.x",
"typescript": "^5.x"
```

(`typescript` is already a dependency; it is used here via its programmatic API, not as a CLI tool.)

#### New files

- `bin/t2lang-lsp.s8` — server entry point (compiled to `bin/t2lang-lsp.js`)
- `stage9/lsp.s8` — `t2/eval` handler and helpers

#### New bin entry in `package.json`

```json
"bin": {
  "t2lang-lsp": "bin/t2lang-lsp.js"
}
```

#### Server initialization (`bin/t2lang-lsp.s8`)

```lisp
(program
  (import {createConnection ProposedFeatures TextDocumentSyncKind} "vscode-languageserver/node")
  (import {TextDocuments} "vscode-languageserver")
  (import {TextDocument} "vscode-languageserver-textdocument")
  (import {createEvalService handleT2Eval} "../stage9/lsp")

  (const connection (createConnection ProposedFeatures.all))
  (const documents (new TextDocuments TextDocument))
  (const evalService (createEvalService))
  (let ((currentAbort null)))  ;; tracks the in-flight eval's AbortController

  (connection.onInitialize (lambda ()
    (return { capabilities: { textDocumentSync: TextDocumentSyncKind.Incremental } })))

  (connection.onRequest "t2/eval" (async-lambda ((params))
    ;; Cancel any in-flight eval before starting a new one
    (if currentAbort (then (currentAbort.abort)))
    (const ac (new AbortController))
    (set! currentAbort ac)
    (const doc (documents.get params.textDocument.uri))
    (if (! doc)
      (then (return { stdout: "", stderr: "", diagnostics: [{ message: "document not found" }] })))
    (const result (await (handleT2Eval evalService ac.signal doc params)))
    ;; Only clear currentAbort if this request is still current (wasn't superseded)
    (if (=== currentAbort ac) (then (set! currentAbort null)))
    (return result)))

  (documents.listen connection)
  (connection.listen))
```

#### `t2/eval` handler (`stage9/lsp.s8`)

**`createEvalService`** — called once at server startup. Creates and returns the persistent TypeScript `LanguageService` with an in-memory virtual host. The virtual file `__eval__.ts` is the only script file; its content and version are updated per eval. All other file access (lib files, node_modules types) delegates to `ts.sys`.

```lisp
(const EVAL_FILE "__eval__.ts")

(const createEvalService (lambda ()
  (let ((currentSource "")
        (version 0))
    (const host {
      getScriptFileNames: (lambda () [EVAL_FILE]),
      getScriptVersion:   (lambda () (String version)),
      getScriptSnapshot:  (lambda ((fn))
        (return (ts.ScriptSnapshot.fromString
          (ternary (=== fn EVAL_FILE)
            currentSource
            (?? (ts.sys.readFile fn) ""))))),
      getCurrentDirectory:    (lambda () (process.cwd)),
      getCompilationSettings: (lambda () {
        module:        ts.ModuleKind.CommonJS,
        target:        ts.ScriptTarget.ES2022,
        lib:           ["lib.es2022.full.d.ts"],
        skipLibCheck:  true
      }),
      getDefaultLibFileName: (lambda ((opts)) (ts.getDefaultLibFilePath opts)),
      fileExists:     ts.sys.fileExists,
      readFile:       ts.sys.readFile,
      readDirectory:  ts.sys.readDirectory
    })
    (const svc (ts.createLanguageService host))
    (return {
      update: (lambda ((src))
        (set! currentSource src)
        (set! version (+ version 1))),
      getDiagnostics: (lambda () (svc.getSemanticDiagnostics EVAL_FILE)),
      emit:           (lambda () (svc.getEmitOutput EVAL_FILE))
    }))))
```

**Helpers**

`maybeTruncate`:

```lisp
(const MAX_OUTPUT #{1024 * 1024})

(const maybeTruncate (lambda ((s : string))
  (if (<= s.length MAX_OUTPUT)
    (then (return { text: s, truncated: false })))
  (return { text: (s.slice 0 MAX_OUTPUT), truncated: true })))
```

`spawnAsync` — wraps `child_process.spawn` with stdout/stderr capture and timeout. `opts.signal` is the server-level `AbortSignal` from the request handler; `opts.timeout` drives a local per-process timeout. Either abort source kills the child. The promise always resolves (never rejects):

```lisp
(const spawnAsync (lambda ((cmd : string) (args : (type-array string)) (opts : (Object (timeout number) (signal AbortSignal))))
  (return (new Promise (lambda ((resolve))
    (const ac (new AbortController))
    (const timer (setTimeout (lambda () (ac.abort)) opts.timeout))
    ;; Link server-level signal: if the outer request is cancelled, abort this child too
    (if (&& opts.signal (! opts.signal.aborted))
      (then (opts.signal.addEventListener "abort" (lambda () (ac.abort)) { once: true })))
    (const child (spawn cmd args { signal: ac.signal }))
    (const outChunks [])
    (const errChunks [])
    (child.stdout.on "data" (lambda ((d)) (outChunks.push d)))
    (child.stderr.on "data" (lambda ((d)) (errChunks.push d)))
    (child.on "close" (lambda ((code))
      (clearTimeout timer)
      (resolve {
        stdout:   ((Buffer.concat outChunks).toString "utf-8"),
        stderr:   ((Buffer.concat errChunks).toString "utf-8"),
        exitCode: (?? code 1)
      })))
    (child.on "error" (lambda ((err))
      (clearTimeout timer)
      (const msg (ternary (=== err.name "AbortError") "execution timed out" err.message))
      (resolve { stdout: "", stderr: msg, exitCode: 1 }))))))))
```

**`handleT2Eval`**

Takes the server's `AbortSignal` and passes it to `spawnAsync`. If the signal fires before the child process finishes, the child is killed and the promise resolves with a timeout/cancelled error — the caller discards this result since `currentAbort` will already have been replaced.

Steps 1–2: extract and pre-flight:

```lisp
(const handleT2Eval (async-lambda ((evalService) (signal) (doc) (params))
  (const text ((doc.getText params.selection).trim))
  (if (=== text.length 0)
    (then (return { stdout: "", stderr: "", diagnostics: [{ message: "empty selection" }] })))
```

Step 3: normalize to `(program ...)`:

```lisp
  (const trimmed (text.trimStart))
  (const source (ternary
    (|| (trimmed.startsWith "(program ") (trimmed.startsWith "(program\n"))
    text
    `(program\n${text}\n)`))
```

Step 4: t2 compile. On failure, return diagnostics immediately:

```lisp
  (let ((tsCode "")))
  (except
    (try
      (set! tsCode (compileSource { source: source })))
    (catch err
      (const result { stdout: "", stderr: "", diagnostics: [{ message: err.message }] })
      (if (=== params.mode "verbose") (then (set! result.finalT2 source)))
      (return result)))
```

Step 5: type-check and emit via the persistent LanguageService. On type error, return formatted diagnostics as `stderr`:

```lisp
  (evalService.update tsCode)
  (const tsDiags (evalService.getDiagnostics))
  (if (> tsDiags.length 0)
    (then
      (const stderr ((tsDiags.map (lambda ((d))
        (ts.flattenDiagnosticMessageText d.messageText "\n"))).join "\n"))
      (const result { stdout: "", stderr: stderr })
      (if (=== params.mode "verbose")
        (then (set! result.finalT2 source) (set! result.ts tsCode)))
      (return result)))
  (const emitResult (evalService.emit))
  (if (|| emitResult.emitSkipped (=== emitResult.outputFiles.length 0))
    (then (return { stdout: "", stderr: "emit failed", exitCode: 1 })))
  (const jsCode (. (subscript (. emitResult outputFiles) "0") text))
```

Step 6: write JS to a temp file and execute. Temp file always cleaned up in `finally`:

```lisp
  (const randSuffix ((. ((. ((. Math random)) toString) 36) slice) 2))
  (const jsPath (join (tmpdir) `t2eval-${randSuffix}.js`))
  (except
    (try
      (writeFileSync jsPath jsCode "utf-8")
      (const runResult (await (spawnAsync process.execPath [jsPath] { timeout: 5000, signal: signal })))
      (const out (maybeTruncate runResult.stdout))
      (const result { stdout: out.text, stderr: runResult.stderr })
      (if out.truncated (then (set! result.truncated true)))
      (if (=== params.mode "verbose")
        (then
          (set! result.finalT2 source)
          (set! result.ts tsCode)
          (set! result.js jsCode)))
      (return result))
    (finally
      (except
        (try (unlinkSync jsPath))
        (catch _ undefined)))))) ;; end handleT2Eval
```

**Full module structure (`stage9/lsp.s8`)**

```lisp
(program
  (import {writeFileSync unlinkSync} "node:fs")
  (import {tmpdir} "node:os")
  (import {join} "node:path")
  (import {spawn} "node:child_process")
  (import * as ts "typescript")
  (import {compileSource} "./index")
  ;; Stage 2 adds: (import {readerTransform} "./Stage9-reader")

  (const MAX_OUTPUT #{1024 * 1024})

  (const EVAL_FILE ...)
  (const createEvalService ...)
  (const maybeTruncate ...)
  (const spawnAsync ...)
  (const handleT2Eval ...)

  ;; handleT2Eval: (evalService, signal, doc, params) -> Promise<T2EvalResult>
  (export-named (createEvalService handleT2Eval)))
```

---

# Stage 2 — Import Inference ✅ DONE

> *Goal: Allow snippet evaluation to behave like a standalone module by injecting top-level static imports from the file.*
>
> **Implementation status:** Complete and smoke-tested.
>
> **Checklist:**
> - [x] `scanToMatchingParen` — depth-tracking scan to find end of a paren form
> - [x] `extractTopLevelImports` — runs `readerTransform`, scans depth-1 children of `(program ...)` for `(import ...)` / `(import-type ...)` forms
> - [x] `extractModuleSpecifier` — extracts the last string token (module path) from an import form
> - [x] `injectImports` — inserts deduplicated imports after `(program` opener, skipping any whose specifier is already in the snippet
> - [x] `handleT2Eval` updated — Step 3 extracts file imports and injects them before compiling
> - [x] Import of `readerTransform` from `./Stage9-reader` added
> - [x] Smoke-tested: snippet with no imports compiles/runs correctly; imports from file are injected into `finalT2`

### New Capabilities

1. **Top-Level Static Import Extraction**
   - The server runs `readerTransform()` on the full file text, then does a single linear scan to collect all `(import ...)` and `(import-type ...)` forms at paren depth 1 (direct children of `(program ...)`).
   - Because `readerTransform()` has already consumed strings, comments, and backtick templates, the depth counter is not confused by parens inside those constructs.
   - It excludes dynamic imports, conditional imports, and imports inside function bodies or macros (those appear at depth > 1).

2. **Import Injection**
   - Extracted imports are injected into the `(program ...)` wrapper, before the user's code, preserving file order.
   - Deduplication: if the snippet already contains an `(import ...)` with the same module specifier, that import is skipped. This avoids duplicate-binding errors in ES modules.

3. **Updated `t2/eval`**
   - The pipeline now includes import extraction and injection.
   - Verbose mode returns `finalT2` — the t2 source passed to `compileSource()`, after all LSP transformations. In Stage 2 this includes the injected imports. This field is present in verbose mode for all stages and always represents "what was actually compiled."

### Import extraction — implementation sketch

```lisp
(const extractTopLevelImports (lambda ((fileText : string))
  (const transformed (readerTransform fileText))
  (const imports [])
  (let ((depth 0) (i 0) (n transformed.length)))
  (while (< i n)
    (const ch (transformed[i]))
    (if (=== ch "(")
      (then
        (set! depth (+ depth 1))
        (if (=== depth 2)
          (then
            ;; Check if this form starts with 'import' or 'import-type'
            (const rest (transformed.slice i))
            (if (|| (rest.startsWith "(import ") (rest.startsWith "(import-type "))
              (then
                ;; Capture the full form by scanning to the matching close paren
                (const end (scanToMatchingParen transformed i))
                (imports.push (transformed.slice i end))
                (set! i end)
                (set! depth (- depth 1))
                continue)))))
      (if (=== ch ")")
        (then (set! depth (- depth 1)))))
    (set! i (+ i 1)))
  (return imports)))
```

`scanToMatchingParen` is a simple depth-tracking scan (similar to `scanExprUntilClose` in the reader) that returns the index after the closing `)`.

Deduplication by module specifier — extract the last string token of each `(import ...)` form (the path), skip any form whose specifier already appears in the snippet's own imports.

### Pipeline (Stage 2)

```
document store lookup
  -> cancel any in-flight eval
  -> extract selection (with character offsets)
  -> pre-flight check (empty selection)
  -> normalize to (program ...)
  -> readerTransform full file → extract top-level imports
  -> inject imports into program (dedup by module specifier)
  -> compileSource()
  -> TypeScript type-check + emit (in-process LanguageService)
  -> run JS (child process)
  -> return results
```

### Non-Goals

- No multi-selection
- No state injection
- No semantic selection expansion
- No macro expansion previews

### Why this stage matters

This is the first moment where the LSP becomes semantically aware. It allows snippet evaluation to behave like a standalone module without requiring the user to manually include imports.

It also establishes the core invariant:

> **The LSP is the canonical place where selection-to-program transformation happens.**

---

# Future Directions 🔲 TODO (not yet actionable)

## 'Go To' Features

- Support code navigation in VS Code.
  - Go to definition.
  - Go to type definition.
  - Go to source definition.
  - Go to implementations.
  - Go to references.

## State Injection 🔲 TODO (not yet actionable)

> *Goal: Provide Postman-style reusable runtime state that scopes bindings around evaluated snippets.*
>
> *Status: Concept settled. File format, lookup protocol, and editor UI are not yet designed. This section is not actionable until those decisions are made.*

### Concept

A state block is a named bag of t2 bindings written in regular t2 syntax:

```lisp
(state dev
  (let token "abc123")
  (let base-url "http://localhost:3000"))
```

When the user evaluates a snippet with state `"dev"`, the server wraps the snippet body in a `let` using the state block's bindings. For example, given the snippet `(+ 2 foo)` and state:

```lisp
(state dev
  (let foo (+ 40 2)))
```

The server assembles:

```lisp
(program
  (let ((foo (+ 40 2)))
    (+ 2 foo)))
```

### Key Properties

- **Regular t2 syntax.** No new forms or keywords beyond `state` as a container. Bindings use standard t2 expressions.
- **`let` scoping.** State bindings become the binding list of a `let` that wraps the user's code. Multiple bindings become multiple entries. This makes scoping explicit and avoids top-level name collisions.
- **Imports above, state inside.** When combined with Stage 2 import injection, imports go above the `let`, state bindings inside it.
- **No mutation.** State blocks are declarative and evaluated fresh each time. No persistent runtime environment.

### Pipeline (when implemented)

```
document store lookup
  -> cancel any in-flight eval
  -> extract selection (with character offsets)
  -> pre-flight check (empty selection)
  -> normalize to (program ...)
  -> readerTransform full file → extract top-level imports
  -> inject imports into program (dedup by module specifier)
  -> wrap snippet body in let with state bindings
  -> compileSource()
  -> TypeScript type-check + emit (in-process LanguageService)
  -> run JS (child process)
  -> return results
```

### TBD

- File format and location of `.t2state` files
- Lookup rules (project root, nearest ancestor, configurable)
- Whether state blocks can also be defined inline in `.t2` files
- Editor UI for selecting active state

### Non-Goals

- No REPL
- No persistent runtime environment
- No mutation of state blocks at runtime

### Why this stage matters

This gives t2lang something like Postman environments — reusable runtime context — while preserving purity, determinism, explicitness, and reproducibility. The `let*` wrapping means there are no hidden semantics; the user could write the same program by hand.

---

# Appendix — LSP Method Definition

## `t2/eval`

**Params:**

```ts
// import { TextDocumentIdentifier, Range, Diagnostic } from 'vscode-languageserver-types'

interface T2EvalParams {
  textDocument: TextDocumentIdentifier;
  selection: Range;
  mode: "normal" | "verbose";
  state?: string; // Future: state injection
}
```

**Result:**

```ts
interface T2EvalResult {
  // always present
  stdout: string;   // "" if pipeline stopped before execution
  stderr: string;   // "" if pipeline stopped before execution
  truncated?: boolean;
  exitCode?: number; // present when node child process ran

  // present when mode is "verbose"
  finalT2?: string; // the t2 source passed to compileSource(), after all LSP transformations ("what was actually compiled")
  ts?: string;      // TypeScript output from compileSource()
  js?: string;      // JavaScript output from getEmitOutput()

  // present on t2 compilation failure
  diagnostics?: Diagnostic[];
}
```

---

# Appendix — Client Responsibilities

### VS Code, Emacs, Neovim, etc.

- Provide: document identifier, selection range, optional state name
- Display: stdout, stderr, verbose artifacts, diagnostics
- Spawn the server via the `t2lang-lsp` bin command
- **Associate files with the t2lang LSP** — file extension mapping (`.t2`, `.s8`, or any other) is entirely the client's responsibility

### Client must not:

- parse
- normalize
- inject imports
- inject state
- compile
- run
- make assumptions about what the server accepts based on file extension

The client is a thin UI shell. The server is the semantic engine.

### File extension is not the server's concern

The LSP server treats every document it receives as t2lang source, regardless of filename or extension. If the editor has routed a document to the t2lang LSP, that routing decision was already made correctly by the client's language association configuration. The server never inspects `textDocument.uri` for extension or path — it simply processes the text.

---

# Appendix — Package Integration

The LSP server is part of the `t2lang` npm package:

- **Bin entry:** `"t2lang-lsp"` in `package.json` points to the server entry point
- **Install:** `npm install t2lang` makes the `t2lang-lsp` command available
- **Editor extensions** spawn `t2lang-lsp` as a child process via stdio transport
- **In-repo development** works against the local source

---

# Appendix — VS Code Extension Integration ✅ DONE

The `vscode-t2-formatter` extension currently provides only syntax highlighting (grammar + language configuration). Integrating the LSP client requires adding an extension entry point.

### Dependencies

Add to `vscode-t2-formatter/package.json`:
```json
"dependencies": {
  "vscode-languageclient": "^9.x"
},
"devDependencies": {
  "@types/vscode": "^1.60.0",
  "typescript": "^5.x"
}
```

### `package.json` additions

```json
{
  "main": "./out/extension.js",
  "activationEvents": ["onLanguage:t2"],
  "contributes": {
    "languages": [
      {
        "id": "t2",
        "aliases": ["t2"],
        "extensions": [".t2", ".s8"],
        "configuration": "./language-configuration.json"
      }
    ],
    "commands": [
      {
        "command": "t2lang.eval",
        "title": "t2: Evaluate Selection"
      }
    ],
    "keybindings": [
      {
        "command": "t2lang.eval",
        "key": "ctrl+enter",
        "mac": "cmd+enter",
        "when": "editorLangId == t2 && editorHasSelection"
      }
    ]
  }
}
```

Note: `.s8` is added to `extensions` so compiler source files get t2 highlighting and LSP support automatically.

### Extension entry point (`src/extension.ts`)

```typescript
import * as vscode from 'vscode';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('t2 eval');

  client = new LanguageClient(
    't2lang',
    'T2 Language Server',
    {
      run:   { command: 't2lang-lsp', transport: TransportKind.stdio },
      debug: { command: 't2lang-lsp', transport: TransportKind.stdio }
    },
    {
      documentSelector: [{ scheme: 'file', language: 't2' }]
    }
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('t2lang.eval', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const result: any = await client.sendRequest('t2/eval', {
        textDocument: { uri: editor.document.uri.toString() },
        selection: editor.selection,
        mode: 'normal'
      });

      outputChannel.clear();
      if (result.diagnostics?.length) {
        outputChannel.appendLine('[t2 compile error]');
        for (const d of result.diagnostics) outputChannel.appendLine(d.message);
      } else {
        if (result.stdout) outputChannel.append(result.stdout);
        if (result.stderr) { outputChannel.appendLine('[stderr]'); outputChannel.append(result.stderr); }
        if (result.truncated) outputChannel.appendLine('[output truncated]');
      }
      outputChannel.show(true);
    })
  );

  client.start();
}

export function deactivate() {
  return client?.stop();
}
```

### How it works

1. VS Code activates the extension when a `.t2` or `.s8` file is opened (`onLanguage:t2`).
2. `LanguageClient` spawns `t2lang-lsp` via stdio and handles the LSP handshake.
3. Document sync (`didOpen`, `didChange`) is handled automatically by the client library — the server's document store stays current.
4. When the user presses `Ctrl+Enter` (or `Cmd+Enter` on Mac) with a selection, the `t2lang.eval` command fires, sends the `t2/eval` request, and displays the result in the **t2 eval** output panel.

### Result display

Results appear in a dedicated output channel ("t2 eval") that is shown automatically after each eval. This is the simplest approach. A richer alternative (syntax-highlighted webview panel showing stdout/stderr/ts/js in tabs) is straightforward to add later without changing the server protocol.

### In-repo development

During development, point the server command at the local source instead of the installed bin:

```typescript
run:   { command: 'node', args: ['../bin/t2lang-lsp.js'], transport: TransportKind.stdio },
debug: { command: 'node', args: ['../bin/t2lang-lsp.js'], transport: TransportKind.stdio, options: { execArgv: ['--inspect=6009'] } }
```
