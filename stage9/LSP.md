# t2lang Language Server — Design Document

## Overview

The t2lang LSP provides editor-agnostic support for:

- Snippet evaluation
- Program normalization
- Import inference (Stage 2)
- State injection (Stage 3)

The server ships as part of the `t2lang` npm package. Users install `npm install t2lang` and editor extensions spawn the server via the `t2lang-lsp` bin entry. In-repo development works against the local source.

The design is intentionally staged so that early versions remain minimal and predictable, while later versions add power without compromising explicitness or semantic clarity.

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

### Pipeline (Stage 1)

```
document store lookup
  -> extract selection (with character offsets)
  -> normalize to (program ...)
  -> compile()
  -> run JS
  -> return results
```

### Runner Constraints

- **Unique temp files:** Each invocation writes to a unique temp file (via `mkdtemp` or random suffix) to avoid clobbering under concurrent evals.
- **Timeout:** Default 5-second timeout on JS execution. Configurable later.
- **Output limits:** Max output size (e.g., 1MB). If exceeded, output is truncated and the response includes a `truncated: true` flag.

### Error Handling

- **Compilation failure:** `diagnostics` field is populated with structured compiler errors (with span info). No JS is produced; `js`, `stdout` are absent.
- **Runtime failure:** Compilation succeeds but execution throws. `stderr` contains the runtime error. `stdout` may be partial.
- **Rule:** If `diagnostics` is present and non-empty, the pipeline stopped at compilation. Otherwise, `stderr` indicates runtime failure.

### Non-Goals

- No semantic tokens or paren highlighting (editors handle this natively)
- No import inference
- No state injection
- No multi-selection support
- No diagnostics beyond compiler errors

### Why this stage matters

It gives every editor (VS Code, Emacs, Neovim, Helix, Zed) the ability to evaluate a snippet and see the compilation pipeline — with zero semantic complexity.

This is the pure baseline that everything else builds on.

---

# Stage 2 — Import Inference

> *Goal: Allow snippet evaluation to behave like a standalone module by injecting top-level static imports from the file.*

### New Capabilities

1. **Top-Level Static Import Extraction**
   - The server parses the full file text from its document store.
   - It extracts only top-level, static `(import ...)` forms.
   - It stops at the first non-import top-level form.
   - It excludes dynamic imports, conditional imports, and imports inside functions/macros.

2. **Import Injection**
   - Extracted imports are injected into the `(program ...)` wrapper, before the user's code.
   - Preserve order.
   - Do not deduplicate.
   - Do not hoist.

3. **Updated `t2/eval`**
   - The pipeline now includes import extraction and injection.
   - Verbose mode returns `finalT2` showing the fully assembled program (with injected imports).

### Pipeline (Stage 2)

```
document store lookup
  -> extract selection (with character offsets)
  -> normalize to (program ...)
  -> extract static imports from full file
  -> inject imports into program
  -> compile()
  -> run JS
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

# Stage 3 — State Injection

> *Goal: Provide Postman-style reusable runtime state that scopes bindings around evaluated snippets.*

### Concept

A state block is a named bag of t2 bindings written in regular t2 syntax:

```lisp
(state dev
  (let token "abc123")
  (let base-url "http://localhost:3000"))
```

When the user evaluates a snippet with state `"dev"`, the server wraps the snippet body in a `let*` using the state block's bindings. For example, given the snippet `(+ 2 foo)` and state:

```lisp
(state dev
  (let foo (+ 40 2)))
```

The server assembles:

```lisp
(program
  (let* ((foo (+ 40 2)))
    (+ 2 foo)))
```

### Key Properties

- **Regular t2 syntax.** No new forms or keywords beyond `state` as a container. Bindings use standard t2 expressions.
- **`let*` scoping.** State bindings become the binding list of a `let*` that wraps the user's code. Multiple bindings become multiple entries. This makes scoping explicit and avoids top-level name collisions.
- **Imports above, state inside.** When combined with Stage 2 import injection, imports go above the `let*`, state bindings inside it.
- **No mutation.** State blocks are declarative and evaluated fresh each time. No persistent runtime environment.

### Pipeline (Stage 3)

```
document store lookup
  -> extract selection (with character offsets)
  -> normalize to (program ...)
  -> extract static imports from full file
  -> inject imports into program
  -> wrap snippet body in let* with state bindings
  -> compile()
  -> run JS
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
interface T2EvalParams {
  textDocument: TextDocumentIdentifier;
  selection: Range;
  mode: "normal" | "verbose";
  state?: string; // Stage 3
}
```

**Result:**

```ts
interface T2EvalResult {
  // always present
  stdout: string;
  stderr: string;
  truncated?: boolean;

  // present when mode is "verbose"
  finalT2?: string;
  ts?: string;
  js?: string;

  // present on compilation failure
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
