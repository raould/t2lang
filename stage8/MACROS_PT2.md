# t2lang Macro System Design

## Overview

This document covers the design for adding macro imports, macro helpers, and a macro compiler stage to t2lang. It is grounded in the constraints of the existing pipeline: t2lang compiles to TypeScript, TypeScript does not have macros, and macros therefore disappear from compiled output. The design works with these constraints rather than against them.

---

## 1. Macro Imports

### Goal

Allow a t2lang file to load macro definitions from an external file before expansion begins.

```lisp
(macro-import "./macros/list-comprehension.t2m")
```

### Why a separate file extension

`.t2m` files are macro modules. `.t2` files are runtime programs. The distinction matters because:

- The JS emitter never needs to process a `.t2m` file at all
- Tooling can enforce different rules per file type
- The mental model is clear: `.t2m` is compile-time only

### Syntax

To handle imports robustly, we introduce specific grammar rules for `macro-import` (and `macro-export`) rather than relying on generic s-forms.

**Grammar Changes (`Stage8.g4`):**

```antlr
topLevel
    : macroImport
    | macroExport
    // ... existing rules
    ;

macroImport
    : LPAREN MACRO_IMPORT STRING RPAREN
    ;

macroExport
    : LPAREN MACRO_EXPORT macroExportSpec+ RPAREN
    ;

macroExportSpec
    : IDENTIFIER
    | KEYWORD
    ;
```

### Semantics

Macro-imports are resolved **before any other top-level form is expanded**. The compiler scans for them first, loads them, and extends the macro environment.

**Path Resolution:**
Paths in `(macro-import "./path")` are resolved **relative to the source file** containing the import.

**Ordering:**
Macro-imports are **order-sensitive with respect to each other** (a macro imported in line 1 can be used in a macro-import in line 2, if we support computed imports later, though mostly for side effects or shadows). They are effectively **order-insensitive with respect to non-macro forms**.

Macros imported from a `.t2m` file are scoped to the importing module. They do not leak to other modules unless explicitly re-exported (see Section 1.5).

### Pre-expansion pass

```ts
function resolveMacroImports(
    program: ProgramNode,
    env: MacroEnv,
    loading: Set<string> = new Set()
): void {
    // Process top-level forms scanning for macro-imports
    for (const form of program.body) {
        if (form.tag === "macro-import") {
            const relPath = form.path; // from STRING token
            // Resolve relative to current file path
            const absPath = path.resolve(path.dirname(currentFile), relPath)
            
            if (loading.has(absPath)) {
                throw new Error(`Macro import cycle detected: ${absPath}`)
            }
            // ... load and eval ...
        }
    }
}
```

### Emission

In both the TS and JS emitters, `macro-import` nodes are skipped entirely:

```ts
case "macro-import": continue  // compile-time only, no runtime output
```

### What `.t2m` files may contain

| Form | Allowed | Notes |
|---|---|---|
| `defmacro` | yes | primary purpose |
| `reader-macro` | yes | |
| `sugar` | yes | |
| `macro-import` | yes | nested imports are resolved recursively |
| `macro-export` | yes | exports macros to importers |
| `fn` (helper) | yes | compile-time helpers only — see Section 2 |
| runtime values | no | enforced by the macro compiler stage |

Violations (runtime-targeted code in a `.t2m` file) produce a hard compile error. Silent discard would be confusing.

### Local macros in `.t2` files

A `.t2` file can define macros for its own internal use without a `.t2m` file:

```lisp
; foo.t2
(defmacro my-macro ((x)) ...)  ; local, never exported
(my-macro 42)                  ; expands fine
```

The emitter skips `defmacro` forms in `.t2` files as well. `.t2m` is the **sharing mechanism**, not the only place macros can live.
### 1.5 Macro Exports

By default, macros defined in a `.t2m` file are **private** to that file. To make them available to importers, use `macro-export`:

```lisp
(fn private-helper ((x)) ...)

(defmacro public-macro ((x)) ...)
(macro-export public-macro)
```

Only symbols listed in `macro-export` are added to the environment of the importing file.

---

## 2. Macro Helpers

### What macro helpers are

Macro helpers are ordinary functions defined inside `.t2m` files that are called **by macros, at macro-expansion time**. They are not macros themselves. They exist purely to keep complex macro logic readable.

```lisp
; comprehensions.t2m

(fn build-map-clause ((expr) (var) (seq))
  ; returns an SForm tree (plain strings and arrays)
  (list "call" (list "." seq "map")
        (list "fn" (list var) expr)))

(defmacro listcomp ((expr) (for var seq))
  (build-map-clause expr var seq))
```

`build-map-clause` is a helper. It is a real function — not a template, not a pattern — that manipulates S-forms and returns a new one.

### How helpers actually execute

This is the key question. Helpers can only execute if the macro module is **compiled to JS and loaded into the expander process at compile time**.

The mechanism:

```
.t2m file
  → macro compiler stage (see Section 3)
  → JS macro module (exports real functions)
  → dynamic import() into the expander process
  → helper functions are live JS functions
  → called by macro-def bodies during expansion
  → return SForm values
  → expander continues with the result
```

**Execution Safety:**
For the initial implementation, we will use raw `import()` which shares the Node.js environment with the compiler. 
> **TODO:** Refactor to use `vm.runInContext` or a separate worker thread for isolation and security in the future.

### The MacroAPI contract

Every macro function (and by extension every helper it calls) has access to the expander's environment via a `MacroAPI` object passed as the final argument:

```ts
interface MacroAPI {
    gensym: () => SForm          // generates a fresh unique identifier string
    expand: (form: SForm) => SForm  // expand a sub-form (for recursive macros)
    error:  (msg: string) => never  // emit a compile error at the macro call site
    lookup: (sym: string) => SForm | null  // look up a compile-time binding
}
```

This ensures helpers use the **expander's gensym generator**, not a local one, which is required for hygiene to work correctly across module boundaries.

### The SForm wire format

Macro modules are compiled separately from the expander. They must share the common **SForm** representation established in `DESIGN.md`.

```ts
type SForm =
    | string          // atom: identifier, keyword, string literal, etc.
    | SForm[]         // list: a parenthesized sequence of sub-sforms
    // Opaque nodes are not serialized across the macro boundary in .t2m files,
    // as they operate on pure data.
```

The distinction between symbols, strings, numbers, and booleans is handled by looking at the string content (e.g. valid identifier vs quoted string vs number string), exactly matching the `evalQuasiToSForm` logic in the compiler.

This format is the **stable public contract** between the expander and all macro modules.

### Macro composition (macros using other macros)

The common case — `unless` defined in terms of `when`, `cond` defined in terms of `if` — does not require runtime execution at all. It is handled by **recursive expansion**: when a macro body produces a form whose head is another macro, the expander expands it again automatically.

```lisp
(defmacro when ((cond) (body))
  (quasiquote (if (unquote cond) (unquote body) nil)))

(defmacro unless ((cond) (body))
  (quasiquote (when (not (unquote cond)) (unquote body))))  ; expander will recursively expand the (when ...) result
```

No compile-time execution needed here. Recursive expansion is already how expanders work.

Runtime execution in helpers is only needed when macro logic requires **actual computation** — traversing lists, computing names, validating inputs, building complex trees conditionally.

---

## 3. Macro Compiler Stage

### The core problem

t2lang's existing pipeline drops `macro-def` forms before emitting TypeScript. This is correct for runtime output. But it means a `.t2m` file compiled through the normal pipeline produces JS with no macros in it — nothing the expander can load.

To make macro modules loadable, the compiler needs a second emission mode.

### Two emission modes

| Mode | Input | `macro-def` treatment | Output |
|---|---|---|---|
| Normal | `.t2` | dropped | JS runtime program |
| Macro-runtime | `.t2m` | emitted as exported JS functions | JS macro module |

The macro-runtime mode is invoked automatically when the input file has a `.t2m` extension, or explicitly:

```ts
compile(source, { mode: "macro-runtime" })
```

### What the macro-runtime emitter does differently

Only `macro-def` emission changes. Everything else — function definitions, let bindings, expressions — emits identically to normal mode (since helpers are ordinary functions).

```ts
// normal mode
case "defmacro": return null  // drop

// macro-runtime mode
case "defmacro":
    // form is DefMacroNode { name, signature, body }
    const { name, signature, body } = form;
    // signature matches fnSignature rule structure
    const params = signature.params; 
    return `
export function ${emitSym(name)}(args, env) {
    const [${emitParams(params)}] = args;
    return ${emit(body)};
}
`
```

`reader-macro` and `sugar` forms are emitted similarly as exported functions with their respective signatures.

### Build order

Because macro modules must be compiled before the files that use them, the build process has two phases:

```
Phase 1: compile all .t2m files → JS macro modules
Phase 2: load macro modules → expand .t2 files → emit TS → emit JS
```

Phase 1 itself requires no macro expansion (`.t2m` files must be written in core t2lang — see the bootstrapping constraint below). Phase 2 uses the loaded macro modules during expansion.

### The bootstrapping constraint

`.t2m` files **cannot use user-defined macros** in the current design. They must be written in core t2lang — built-in forms only, no sugar, no `defmacro` forms from other `.t2m` files.

This is the phase separation boundary. It breaks the circularity:

```
.t2m files (core t2lang only)
  → macro-runtime emitter (no macro expansion needed)
  → JS macro modules

.t2 files (full t2lang)
  → load JS macro modules
  → expansion
  → TS emitter
  → JS
```

No cycle. The constraint is real but acceptable — macro authors write a slightly lower-level style, which is normal in macro systems (Rust proc-macros have a similar constraint).

### Caching

Macro modules should be cached per build. A `.t2m` file only needs recompilation when its source changes or its own macro imports change. Cache keys are `(absolute-path, content-hash)`.

---

## 4. Future Todos

### 4.1 Macro namespaces

Allow importing a macro module under a namespace to avoid name collisions with large macro libraries:

```lisp
(macro-import "./comprehensions.t2m" :as LC)
(LC/listcomp (* x 2) (for x xs))
```

The expander resolves qualified symbols (`LC/listcomp`) before unqualified ones. Implementation: macro-import stores the module under the namespace key rather than merging into the flat macro table.

### 4.2 Selective macro imports

Import only specific macros from a module:

```lisp
(macro-import "./comprehensions.t2m" :only (listcomp setcomp))
```

Reduces the risk of accidental name shadowing.

### 4.3 Re-export sugar

Allow a `.t2m` file to re-export macros it imported directly via the import statement, so consumers only need one import (avoiding the need for a separate `macro-export` form):

```lisp
; utils.t2m
(macro-import "./comprehensions.t2m" :re-export)
(macro-import "./pattern-matching.t2m" :re-export)
```

### 4.4 Lifting the bootstrapping constraint

Once t2lang is fully self-hosting, `.t2m` files can use macros from other `.t2m` files. This requires the compiler to topologically sort macro modules by their import graph and compile them in dependency order, expanding each with the macros from its dependencies.

This is phase-stratified compilation — the same model Racket uses. It is the right long-term design but is not needed until the self-hosting story is solid.

### 4.5 Macro testing framework

Macros are notoriously hard to debug. A dedicated test form for macro expansion:

```lisp
; in a .t2m file or test file
(macro-expand-test
  input:  (listcomp (* x 2) (for x xs))
  expect: (call (. xs map) (fn ((x)) (* x 2))))
```

The test runner expands the input and compares the resulting S-expression tree against the expected form. Runs at compile time, errors surface as build failures.

### 4.6 Incremental rebuild

Only recompile macro modules whose source or transitive dependencies have changed. Combined with the content-hash cache from Section 3, this keeps rebuild times fast as the macro library grows.

### 4.7 Macro error messages

Errors that occur inside macro expansion currently point to the expander internals, not the macro call site. The expander should thread source location information through the `MacroAPI` so that errors report the location of the `(macro-import ...)` or the macro call in the user's source file, not the location inside the `.t2m` implementation.

### 4.8 True compile-time computation

Once the macro compiler stage is stable, macro helpers can be extended to do genuine compile-time work beyond tree manipulation: reading external files, validating schemas, generating code from data sources. This is the full power of Lisp-style macros. It becomes available for free once macro modules are compiled JS running in the expander process — no additional design work needed, just documentation and examples.

---

## 5. Implementation Plan

This implementation plan breaks the delivery of the macro system into testable phases.

### Phase 1: Grammar and AST

**Goal:** The parser accepts `macro-import` and `macro-export` forms, and the AST builder preserves them.

1.  **Grammar:** Update `Stage8.g4` to include the new rules for `macroImport` and `macroExport`.
2.  **AST:** Update `Stage8-ast.ts` (and `.s7`) to generate `ImportMacroNode` and `ExportMacroNode`.
3.  **Acceptance Test:**
    Create a test file `tests/macros/syntax_test.t2` that parses successfully:
    ```lisp
    (macro-import "./lib.t2m")
    (macro-export my-macro)
    (print "parsed okay")
    ```
    Verify it produces the expected AST structure and does not crash the existing pipeline.

### Phase 2: The Macro-Runtime Emitter

**Goal:** Can compile a `.t2m` file into a JavaScript module that exports its macros as functions.

1.  **Compiler Config:** Add `mode: 'runtime' | 'macro'` to the compiler configuration/options.
2.  **Codegen:** Introduce `Stage8-macro-compile.ts` to handle the 'macro' mode:
    *   **In 'macro' mode:**
        *   `defmacro` forms emit as `export function name(args, env) { ... }`.
        *   `fn` forms (helpers) emit as `export function name(...) { ... }`.
        *   `macro-import` forms are skipped (imports are resolved at compile-time/expansion-time, not runtime).
        *   All runtime code (e.g. `(print "hello")` at top level) should flag an error or be skipped.
    *   **In 'runtime' mode (default):**
    Create `tests/macros/phase2/`
    Input `tests/macros/phase2/macro_lib.t2m`:
    ```lisp
    (defmacro add-one ((x)) (quasiquote (+ (unquote x) 1)))
    (macro-export add-one)
    ```
    Run compiler in macro mode:
    `bin/t2 --mode macro tests/macros/phase2/macro_lib.t2m`
    
    Expected Output: A JS file that can be loaded by Node.
    Create `tests/macros/phase2/check.mjs`:
    ```js
    import { add_one } from './macro_lib.mjs';
    // Mock SForms and Env
    const x = "10"; 
    const result = add_one([x], {}); 
    // Expect: ["+", "10", "1"] (SForm list)
    console.log(JSON.stringify(result));
    ```
    Verify that `node check.mjs` prints the expected SForm.

### Phase 3: Macro Resolution and Loading

**Goal:** The compiler intercepts `macro-import`, compiles the target on the fly (or checks cache), loads it, and updates the `MacroEnv`.

1.  **Resolution Pass:** Implement `resolveMacroImports` (Section 1.3) before the main expansion loop in `Stage8-macro-expand.s7`.
    *   It must locate the imported file relative to the source.
    *   It must invoke the compiler in 'macro' mode (Phase 2) to generate JS.
    *   It must use `import()` to load the generated JS module into the compiler process.
    *   **Note:** `resolveMacroImports` should handle the `loading` Set to detect cycles.
2.  **Environment Update:** Iterate the loaded module's exports (filtered by `macro-export` if applicable, or all exports if we simplify initially) and register them in the `MacroEnv`.
3.  **Acceptance Test:**
    Create `tests/macros/phase3/`
    `lib.t2m`:
    ```lisp
    (defmacro plus-one ((x)) (quasiquote (+ (unquote x) 1)))
    (macro-export plus-one)
    ```
    `app.t2`:
    Create `tests/macros/phase4/`
    `complex.t2m`:
    ```lisp
    (fn make-adder ((n)) (quasiquote (+ x (unquote n))))
    (defmacro add-n ((n)) (make-adder n))
    (macro-export add-n)
    ```
    `use-complex.t2`:
    ```lisp
    (macro-import "./complex.t2m")
    (add-n 5)
    ```
    Run: `bin/t2 use-complex.t2`
    Verify output expands
**Goal:** Macros can call helper functions defined in the same `.t2m` file, using `SForm` nodes.

1.  **Interop:** Verify `SForm` nodes (strings, arrays) are passed correctly between the expander and the loaded JS functions.
2.  **Helper Compilation:** Ensure private/public helpers in `.t2m` work as expected.
3.  **Acceptance Test:**
    Input `tests/macros/complex.t2m`:
    ```lisp
    (fn make-adder ((n)) (quasiquote (+ x (unquote n))))
    (defmacro add-n ((n)) (make-adder n))
    (macro-export add-n)
    ```
    Input `tests/macros/use-complex.t2`:
    ```lisp
    (macro-import "./complex.t2m")
    (add-n 5)
    ```
    Should expand to `(+ x 5)`.

### Phase 5: Transitive Imports (Future)

**Goal:** `.t2m` files can themselves import other `.t2m` files.

*   This requires the macro compilation step (Phase 2) to also run the resolution pass (Phase 3) recursively.
*   *Defer this to a later stage once the basic flow is stable.*

## 6. Todo

- [ ] nested macro expansion tests.
