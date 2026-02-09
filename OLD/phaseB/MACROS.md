## Limitation: Reader Macro Sugar (Backtick, Comma) Not Supported Inside `defmacro`

Currently, the t2lang Phase B macro system does **not** support reader macro sugar (such as backtick `` ` ``, comma `,`, or comma-at `,@`) inside the body of a `defmacro`. These forms are only recognized at the top level by the reader, not recursively inside macro bodies. As a result, macro authors must use the canonical forms `(quasiquote ...)`, `(unquote ...)`, and `(unquote-splicing ...)` inside macros, rather than the shorthand reader macro syntax.

**Example (not supported):**

```lisp
(defmacro mymacro (x)
  `(something ,x)) ; ❌ This will cause a parse error
```

**Use this instead:**

```lisp
(defmacro mymacro (x)
  (quasiquote (something (unquote x)))) ; ✅ This works
```

### Why?

The current parser only expands reader macro sugar at the surface level, not recursively inside macro bodies. Supporting reader macro sugar inside macros would require the reader/parser to expand these forms at all levels, which is not yet implemented.

### TODO

- [ ] **Remove this limitation:**
    - Update the reader/parser to support recursive expansion of reader macro sugar (backtick, comma, comma-at) inside macro bodies and other nested forms.
    - Update tests and documentation when this is supported.
# Phase B Macro Specification

## Overview

Phase B implements a powerful macro system influenced by Clojure. Macros allow users to extend the language syntax by defining functions that transform code (S-expressions) into other code before compilation proceeds to Phase A.

## Reader Macros

Phase B mirrors Clojure’s reader macro philosophy: the reader rewrites terse surface forms into explicit lists before any macro expansion runs. These helper forms keep the user-facing syntax familiar while the rest of the pipeline works with canonical S-expressions.

| Surface | Expansion |
| ------- | --------- |
| `'x` | `(quote x)` |
| `` `x `` | `(quasiquote x)` |
| `~x` | `(unquote x)` (only valid inside a quasiquote) |
| `~@x` | `(unquote-splicing x)` (only valid inside a quasiquote)

The reader enforces the same structure as Clojure’s implementation:

1. **Quote `'`** becomes the literal form `(quote ...)`.
2. **Quasiquote `` ` ``** wraps the target expression, allowing unquoted sections inside.
3. **Unquote `~`** only appears within a quasiquote; outside of a quasiquote it is treated as a plain symbol (for forward compatibility).
4. **Unquote-splice `~@`** expands to `(unquote-splicing ...)` inside a quasiquote, merging a list’s elements with the surrounding list structure.

Phase B’s reader keeps the new symbols (`quote`, `quasiquote`, `unquote`, `unquote-splicing`) available for macros, so macro authors can mimic Clojure’s quasiquote helpers. `MacroRegistry` and the expander itself do not treat reader macro results specially—they simply operate on the rewritten lists like any other form.

## Guiding Principles

1.  **Expansion Before Phase A**: All macro expansion happens strictly within Phase B. The output of Phase B is a canonical Phase A AST. Phase A itself has no knowledge of macros.
2.  **Homoiconicity**: Macros manipulate the same data structures (lists, symbols, literals) that make up the program.
3.  **Hygiene**: A deterministic `gensym` mechanism ensures macros can introduce bindings without accidental capture.

## Core Special Forms

### `defmacro`

Defines a new macro.

```lisp
(defmacro name (params...) body...)
```

*   **name**: The symbol used to invoke the macro.
*   **params**: A parameter list, supporting rest arguments (`& rest`).
*   **body**: Expressions that evaluate to the replacement S-expression.

### Quasiquoting

To make code generation ergonomic, Phase B supports quasiquoting:

*   **Quote (`'`)**: Suppresses evaluation. `(quote x)` or `'x`.
*   **Quasiquote (`` ` ``)**: Suppresses evaluation but allows unquoting.
*   **Unquote (`~` or `,`)**: Evaluates an expression inside a quasiquote.
*   **Unquote-Splice (`~@` or `,@`)**: Evaluates a list and splices its elements into the surrounding list.

*Note: Phase B syntax prefers `~` for unquote to avoid commas which are used as whitespace/separators in TypeScript-like contexts, but spec should align with the implementation decision.*

### `gensym`

Generates a unique symbol for the current expansion context to avoid naming collisions.

```lisp
(let* ((temp (gensym "temp")))
  ...)
```

The expansion engine seeds the `GensymGenerator` deterministically so expansions are reproducible given the same source and compiler seed.

### `macroexpand`

Provide basic debugging information.

## Expansion Process

1.  **Macro Registry**: The compiler maintains a simplified environment of defined macros.
2.  **Traversal**: The expander traverses the AST from top to bottom.
3.  **Invocation**: When a list form `(head ...)` is encountered where `head` is a registered macro:
    *   The arguments are passed *unevaluated* to the macro function.
    *   The macro function executes (in the compiler's JS environment).
    *   The returned S-expression replaces the original form.
4.  **Re-expansion**: The replacement form is itself traversed and expanded until no macro forms remain.

## Examples

### 1. `when` (Single-branch Guard)

```lisp
(defmacro when (cond & body)
  `(if ~cond
       (block ,@body)
       (void)))
```

### 2. Threading Macro (`->`)

```lisp
(defmacro -> (x & forms)
  (loop
    (if (empty? forms)
        x
        (let* ((form (first forms))
               (threaded (if (list? form)
                           `(,(first form) ~x ,@(rest form))
                           `(,form ~x))))
          (recur threaded (rest forms))))))
```

### 3. Trace Helper

```lisp
(defmacro trace (expr)
  (let* ((val (gensym "val")))
    `(let* ((~val ~expr))
       (console.log "TRACE:" '~expr "=" ~val)
       ~val)))
```

## Interaction with Phase A

Macros must ultimately produce valid Phase A AST nodes (or other macros that strictly produce valid Phase A AST).

*   **Bindings**: Macros should emit `let*` or `const*`.
*   **Control Flow**: Macros requiring complex control flow (e.g., `cond`) must rewrite to nested `if` statements or `switch`.
*   **Functions**: Macros can emit `fn` or `FunctionExpr`.

## Debugging and Source Maps

*   **Source Locations**: The expander must track the original source location of:
    *   The macro call site.
    *    Any unquoted parts of the macro body.
*   **Expansion Trace**: The compiler dumps intermediate expansion states when allowed (via `--trace`), helping debugging of complex macros.

## Error Handling

When macros fail, Phase B reports diagnostics with full expansion context. See [phaseB/ERRORS.md](phaseB/ERRORS.md) for the complete specification.

## Macro Sandboxing

To ensure compiler stability, security, and reproducibility, macro execution is restricted.

### Execution Environment

Macros execute within a restricted environment during the expansion phase. They have access only to a curated set of globals and utilities.

#### Available Globals

*   **List Manipulation**: `list`, `cons`, `first`, `rest`, `nth`, `append`, `concat`, `empty?`, `list?`.
*   **Symbols & Literals**: `symbol`, `symbol?`, `number?`, `string?`, `boolean?`.
*   **Hygienic Symbols**: `gensym` (deterministic symbol generation seeded by the compiler).
*   **String Utilities**: `str`, `lower-case`, `upper-case`.
*   **Diagnostic Tools**: `println` (outputs to compiler trace).

#### Restricted Access

Macros are **strictly prohibited** from accessing:
*   **The File System**: No reading or writing files.
*   **The Network**: No socket or HTTP connections.
*   **System/Process State**: No access to `process`, `env`, or other runtime globals.
*   **Compiler State**: Macros cannot mutate the `MacroRegistry` or access internal compiler data structures directly.

### Side Effects

Macros must be side-effect free. They should not mutate state or perform I/O. The only "output" of a macro is the replacement S-expression.

### Resource Constraints

*   **Recursion Depth**: Expansion is limited to a maximum depth (default: 100) to prevent infinite loops.
*   **Execution Timeout**: Macro execution is subject to a wall-clock timeout to prevent CPU exhaustion.
*   **Determinism**: Macros must be deterministic. Non-deterministic functions (e.g., `Date.now` or unseeded `Math.random`) are disallowed. Expansion must be reproducible given the same source and compiler seed.

## Best Practices for Macro Authors

1. **Validate inputs early**: Check argument count and forms at the start of your macro body.
2. **Use descriptive gensym prefixes**: `(gensym "loop-temp")` is easier to trace than `(gensym "x")`.
3. **Preserve source locations**: Prefer `~expr` when injecting user code so the original `.loc` survives into the expanded AST.

