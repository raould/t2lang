# Phase B Macro Specification

## Overview

Phase B implements a powerful macro system influenced by Clojure. Macros allow users to extend the language syntax by defining functions that transform code (S-expressions) into other code before compilation proceeds to Phase A.

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

### Best Practices for Macro Authors

1. **Validate inputs early**: Check argument count and forms at the start of your macro body.
2. **Use descriptive gensym prefixes**: `(gensym "loop-temp")` is easier to trace than `(gensym "x")`.
3. **Preserve source locations**: Prefer `~expr` when injecting user code so the original `.loc` survives into the expanded AST.
