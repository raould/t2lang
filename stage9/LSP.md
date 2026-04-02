# t2lang Language Server — Design Document

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

# Stage 0 — Syntax Highlighting

See also: `vscode-t2-formatter`.

Syntax highlighting is provided by a static TextMate grammar (`vscode-t2-formatter/syntaxes/t2.tmLanguage.json`), bundled with the editor extension. This is independent of the LSP server — no server process is required.

**Coverage:**
- Parentheses (paren depth coloring)
- t2 keywords (`program`, `lambda`, `const`, `let`, `if`, `while`, etc.)
- TypeScript/JavaScript keywords (`async`, `await`, `class`, `new`, etc.)
- Strings (single-quoted, double-quoted, triple-quoted, backtick templates)
- Comments (`;;`)

**Semantic tokens** (richer highlighting based on resolved types and bindings) are deferred to Future Directions — they require the LSP server and are not part of Stage 0.

---

# Stage 1 — Minimal Viable LSP

> *Goal: Provide the smallest possible LSP that enables verbatim snippet evaluation.*

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

Before the pipeline runs, two checks are applied to the raw selection text:

- **Empty selection:** Return immediately with `diagnostics: [{ message: "empty selection" }]`. No compile invoked.
- **Paren imbalance:** Return immediately with `diagnostics: [{ message: "selection has unmatched parentheses" }]`. Catches sloppy region selection before the compiler sees it.

### Pipeline (Stage 1)

```
document store lookup
  -> extract selection (with character offsets)
  -> pre-flight checks (empty, paren balance)
  -> normalize to (program ...)
  -> compile()
  -> tsc (TypeScript type checking + transpile to JS)
  -> run JS (child process)
  -> return results
```

### Runner Constraints

- **Execution model:** Compiled TypeScript is transpiled via `tsc` (for full type checking) then executed in a child Node process via async `spawn`. Evaluated code runs with full privileges — no sandboxing is applied. This is intentional: t2lang is a single-user developer tool, not a multi-tenant service.
- **Unique temp files:** Each invocation writes to a unique temp file (random suffix) to avoid clobbering under concurrent evals. Temp files are deleted after execution completes, whether or not execution succeeded. Best-effort cleanup runs on server shutdown.
- **Timeout:** Default 5-second timeout on JS execution. Configurable later.
- **Output limits:** Max output size (e.g., 1MB). If exceeded, output is truncated and the response includes a `truncated: true` flag.

### Error Handling

There are three distinct failure modes. `stdout` and `stderr` are always present (as `""` or a non-empty string) regardless of which stage failed.

| Stage | Failure | `stdout` | `stderr` | `diagnostics` |
|---|---|---|---|---|
| `compile()` throws | t2 compile error | `""` | `""` | populated |
| `tsc` exits non-zero | TypeScript type error | `""` | tsc output | absent |
| `node` exits non-zero | Runtime error | partial | error message | absent |

- **Rule:** If `diagnostics` is present and non-empty, the pipeline stopped at t2 compilation. If `stderr` is non-empty and `diagnostics` is absent, the failure was either a `tsc` type error or a runtime error (distinguish by exit code or a `stage` field if needed later).

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

The LSP server is implemented in t2lang (`.t2` files) — dogfooding the compiler and surfacing any missing features.

#### Dependencies

Add to root `package.json`:
```json
"vscode-languageserver": "^9.x",
"vscode-languageserver-textdocument": "^1.x"
```

#### New files

- `bin/t2lang-lsp.t2` — server entry point (compiled to `bin/t2lang-lsp.js`)
- `stage9/lsp.t2` — `t2/eval` handler and helpers

#### New bin entry in `package.json`

The bin entry points to the compiled JS output:
```json
"bin": {
  "t2lang-lsp": "bin/t2lang-lsp.js"
}
```

#### Server initialization (`bin/t2lang-lsp.t2`)

```lisp
(program
  (import {createConnection ProposedFeatures TextDocumentSyncKind} "vscode-languageserver/node")
  (import {TextDocuments} "vscode-languageserver")
  (import {TextDocument} "vscode-languageserver-textdocument")
  (import {handleT2Eval} "../stage9/lsp")

  (const connection (createConnection ProposedFeatures.all))
  (const documents (new TextDocuments TextDocument))

  (connection.onInitialize (lambda ()
    (return { capabilities: { textDocumentSync: TextDocumentSyncKind.Incremental } })))

  (connection.onRequest "t2/eval" (async-lambda ((params))
    (const (doc) (documents.get params.textDocument.uri))
    (if (! doc)
      (then (return { stdout: "", stderr: "", diagnostics: [{ message: "document not found" }] })))
    (return (await (handleT2Eval doc params)))))

  (documents.listen connection)
  (connection.listen))
```

#### `t2/eval` handler (`stage9/lsp.t2`)

**Helpers**

`isParenBalanced` — lightweight depth counter, raw character scan, sufficient for pre-flight (not the full ANTLR pass):

```lisp
(const isParenBalanced (lambda ((text : string)) : boolean
  (let (depth) 0)
  (for-of ch text
    (if (=== ch "(")
      (then (+= depth 1))
      (else (if (=== ch ")")
        (then
          (-= depth 1)
          (if (< depth 0)
            (then (return false))))))))
  (return (=== depth 0))))
```

`maybeTruncate`:

```lisp
(const MAX_OUTPUT #{1024 * 1024})

(const maybeTruncate (lambda ((s : string))
  (if (<= s.length MAX_OUTPUT)
    (then (return { text: s, truncated: false })))
  (return { text: (s.slice 0 MAX_OUTPUT), truncated: true })))
```

`spawnAsync` — wraps `child_process.spawn` with stdout/stderr capture and timeout via `AbortController`. On timeout, `ac.abort()` sends SIGTERM; the `error` event fires with an `AbortError`, returned as a stderr message:

```lisp
(const spawnAsync (lambda ((cmd : string) (args : (type-array string)) (opts : (Object (timeout number))))
  (return (new Promise (lambda ((resolve))
    (const (ac) (new AbortController))
    (const (timer) (setTimeout (lambda () (ac.abort)) opts.timeout))
    (const (child) (spawn cmd args { signal: ac.signal }))
    (const (outChunks) [])
    (const (errChunks) [])
    (child.stdout.on "data" (lambda ((d)) (outChunks.push d)))
    (child.stderr.on "data" (lambda ((d)) (errChunks.push d)))
    (child.on "close" (lambda ((code))
      (clearTimeout timer)
      (resolve {
        stdout: ((Buffer.concat outChunks).toString "utf-8"),
        stderr: ((Buffer.concat errChunks).toString "utf-8"),
        exitCode: (?? code 1)
      })))
    (child.on "error" (lambda ((err))
      (clearTimeout timer)
      (resolve { stdout: "", stderr: err.message, exitCode: 1 }))))))))
```

**`handleT2Eval`**

Steps 1–2: extract selection (`TextDocument.getText(range)` handles line/character offset arithmetic) and pre-flight:

```lisp
(const handleT2Eval (async-lambda ((doc) (params))
  (const (text) ((doc.getText params.selection).trim))
  (if (=== text.length 0)
    (then (return { stdout: "", stderr: "", diagnostics: [{ message: "empty selection" }] })))
  (if (! (isParenBalanced text))
    (then (return { stdout: "", stderr: "", diagnostics: [{ message: "selection has unmatched parentheses" }] })))
```

Step 3: normalize to `(program ...)`:

```lisp
  (const (trimmed) (text.trimStart))
  (const (source) (ternary
    (|| (trimmed.startsWith "(program ") (trimmed.startsWith "(program\n"))
    text
    `(program\n${text}\n)`))
```

Step 4: compile. On failure, return diagnostics immediately:

```lisp
  (let (tsCode) "")
  ;; try/catch #1: compile only — returns on error, falls through on success
  (try
    (set! tsCode (compile { filePath: "-", input: source }))
    (catch err
      (const (result) { stdout: "", stderr: "", diagnostics: [{ message: err.message }] })
      (if (=== params.mode "verbose")
        (then (set! result.finalT2 source)))
      (return result)))
```

Steps 5–7: write temp files, transpile with `tsc`, execute. Temp dir always cleaned up in `finally`:

```lisp
  ;; compile succeeded — now transpile and execute
  (const (dir) (mkdtempSync (join (tmpdir) "t2eval-")))
  (const (tsPath) (join dir "eval.ts"))
  (const (jsPath) (join dir "eval.js"))
  ;; try/finally #2: temp dir cleanup guaranteed regardless of outcome
  (try
    (writeFileSync tsPath `${tsCode}\n` "utf-8")

    (const (tscResult) (await (spawnAsync "npx"
      ["tsc" "--skipLibCheck" "--module" "ESNext" "--target" "ES2022" tsPath]
      { timeout: 30000 })))
    (if (!== tscResult.exitCode 0)
      (then
        (const (result) { stdout: "", stderr: tscResult.stderr })
        (if (=== params.mode "verbose")
          (then
            (set! result.finalT2 source)
            (set! result.ts tsCode)))
        (return result)))

    (const (runResult) (await (spawnAsync process.execPath [jsPath] { timeout: 5000 })))
    (const (out) (maybeTruncate runResult.stdout))
    (const (result) { stdout: out.text, stderr: runResult.stderr })
    (if out.truncated
      (then (set! result.truncated true)))
    (if (=== params.mode "verbose")
      (then
        (set! result.finalT2 source)
        (set! result.ts tsCode)
        (set! result.js (readFileSync jsPath "utf-8"))))
    (return result)

    (finally
      (rmSync dir { recursive: true, force: true }))))) ;; end handleT2Eval
```

**Full module structure (`stage9/lsp.t2`)**

```lisp
(program
  (import {mkdtempSync writeFileSync rmSync readFileSync} "node:fs")
  (import {tmpdir} "node:os")
  (import {join} "node:path")
  (import {spawn} "node:child_process")
  (import {compile} "./index")

  (const MAX_OUTPUT #{1024 * 1024})

  (const isParenBalanced ...)
  (const maybeTruncate ...)
  (const spawnAsync ...)
  (const handleT2Eval ...)

  (export-named (handleT2Eval)))
```

---

# Stage 2 — Import Inference

> *Goal: Allow snippet evaluation to behave like a standalone module by injecting top-level static imports from the file.*

### New Capabilities

1. **Top-Level Static Import Extraction**
   - The server parses the full file text from its document store.
   - It collects all top-level, static `(import ...)` forms from the entire file (imports are hoisted; position does not matter).
   - It excludes dynamic imports, conditional imports, and imports inside function bodies or macros.

2. **Import Injection**
   - Extracted imports are injected into the `(program ...)` wrapper, before the user's code, preserving file order.
   - Deduplication: if the snippet already contains an `(import ...)` with the same module specifier, that import is skipped. This avoids duplicate-binding errors in ES modules.

3. **Updated `t2/eval`**
   - The pipeline now includes import extraction and injection.
   - Verbose mode returns `finalT2` — the t2 source passed to `compile()`, after all LSP transformations. In Stage 2 this includes the injected imports. This field is present in verbose mode for all stages and always represents "what was actually compiled."

### Pipeline (Stage 2)

```
document store lookup
  -> extract selection (with character offsets)
  -> pre-flight checks (empty, paren balance)
  -> normalize to (program ...)
  -> extract static imports from full file (all positions)
  -> inject imports into program (dedup by module specifier)
  -> compile()
  -> tsc (TypeScript type checking + transpile to JS)
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

# Future Directions

## 'Go To' Features

- Support code navigation in VS Code.
  - Go to definition.
  - Go to type definition.
  - Go to source definition.
  - Go to implementations.
  - Go to references.

## State Injection

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
  -> extract selection (with character offsets)
  -> pre-flight checks (empty, paren balance)
  -> normalize to (program ...)
  -> extract static imports from full file (all positions)
  -> inject imports into program (dedup by module specifier)
  -> wrap snippet body in let with state bindings
  -> compile()
  -> tsc (TypeScript type checking + transpile to JS)
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

  // present when mode is "verbose"
  finalT2?: string; // the t2 source passed to compile(), after all LSP transformations ("what was actually compiled")
  ts?: string;      // TypeScript output from compile()
  js?: string;      // JavaScript output from tsc

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

### Client must not:

- parse
- normalize
- inject imports
- inject state
- compile
- run

The client is a thin UI shell. The server is the semantic engine.

---

# Appendix — Package Integration

The LSP server is part of the `t2lang` npm package:

- **Bin entry:** `"t2lang-lsp"` in `package.json` points to the server entry point
- **Install:** `npm install t2lang` makes the `t2lang-lsp` command available
- **Editor extensions** spawn `t2lang-lsp` as a child process via stdio transport
- **In-repo development** works against the local source
