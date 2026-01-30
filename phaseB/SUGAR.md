# Phase B Syntactic Sugar Specification

## Overview

"Sugar" refers to syntactic conveniences that allow developers to write more ergonomic TypeScript-like code, which the parser or a rewrite pass transforms into canonical S-expressions (Phase A AST).

Unlike macros, sugar is often handled at the lexer or parser level, or via structural rewrites that don't involve user-defined code execution.

# 0. set!

`set!` should be an alias for `assign`, if the lisp semantics are not too different.

## 1. Dotted Identifiers & Property Access

To support standard object-oriented programming patterns without verbose nested `prop` calls.

### Sugar
```typescript
obj.prop
obj.method(arg)
a.b.c
```

### Canonical Rewrite (Phase A)
```lisp
(prop obj "prop")
(call (prop obj "method") arg)
(prop (prop a "b") "c")
```

### Rules
1.  **Dotted Atoms**: Identifiers containing dots (and no whitespace) are split.
2.  **Method Calls**: A list `(obj.method args...)` transforms into `(call (prop obj "method") args...)`.
3.  **Property Access**: A bare atom `obj.prop` transform into `(prop obj "prop")`.

## 2. Infix Operators (Future/WIP)

While Phase A requires prefix operators `(call + a b)`, Phase B aims to support infix expressions for common math and logic.

### Sugar
```typescript
(1 + 2 * 3)
(x && y || z)
```

### Canonical Rewrite
```lisp
(call + 1 (call * 2 3))
(call || (call && x y) z)
```

> Phase B fully parenthesizes every rewritten operator expression (so `1 + 2 * 3` yields `(call + 1 (call * 2 3))`) before any formatting step. The emitted TypeScript therefore never relies on Prettier’s precedence handling to preserve semantic order.

*Status: To be implemented via a precedence-climbing parser or a specialized rewrite pass.*

## 3. Literal Shorthands

### Object Literals
Allowed to use implicit keys or shorthand syntax.

**Sugar**:
```lisp
(object
  name          ;; shorthand for "name" name
  "age" 30)
```

**Rewrite**:
```lisp
(object
  ("name" name)
  ("age" 30))
```

### Array Literals
Phase B may support `[...]` syntax if the tokenizer handles brackets.

**Sugar (hypothetical)**:
```lisp
[1 2 3]
```

**Rewrite**:
```lisp
(array 1 2 3)
```

## 4. Binding Forms

Decide how `let` and `const` parallel bindings are to be implemented. Extending the compiler vs. sugar vs. macros.

Phase A strictly requires `let*` and `const*` with specific nesting. Phase B allows `let` and `const` which are parallel bindings.

## 5. Assignment Sugar

**Sugar**:
```lisp
(x := 10)
(obj.prop := 20)
(:= obj.prop 20)
```

**Rewrite**:
```lisp
(assign x 10)
(assign (prop obj "prop") 20)
(assign (prop obj "prop") 20)
```

## 6. Function Definitons

Support for TypeScript-style parameter lists with colons.

**Sugar**:
```lisp
(fn (x: number, y: string) : boolean ...)
```

**Rewrite**:
```lisp
(fn ((x (type-number)) (y (type-string))) (type-boolean) ...)
```

Phase B is responsible for parsing the type syntax (`x: T`) and converting it into the `(x T)` tuple structure Phase A expects for named parameters.

## 7. Optional Chaining (Expanded)

Optional chaining rewrites avoid thunks by nesting `let*` bindings with `if` checks so arguments are never evaluated when the chain short-circuits.
See [phaseB/ERRORS.md](phaseB/ERRORS.md) for the diagnostics Surface B surfaces when optional chaining sugar is malformed.

### Rewrite Rules

**Property access** `obj?.prop`:
```lisp
(let* ((tmp obj))
  (if (== tmp null)
      undefined
      (prop tmp "prop")))
```

**Method call** `obj?.method(args...)`:
```lisp
(let* ((tmp obj))
  (if (== tmp null)
      undefined
      ((prop tmp "method") args...)))
```

**Callable check** `expr?.(args...)`:
```lisp
(let* ((tmp expr))
  (if (== tmp null)
      undefined
      (tmp args...)))
```

When the callable target is a method access (e.g., `obj.method?.(a, b)`), the rewrite must preserve the `this` binding explicitly. Phase A exposes a `call-with-this` primitive so Phase B can emit a general call form that compiles to `fn.call(thisVal, ...args)`.

**Sugar:**
```lisp
(obj.method?. a b)
```

**Rewrite:**
```lisp
(let* ((tmp-obj obj)
       (tmp-fn (prop tmp-obj "method")))
  (if (== tmp-fn null)
      undefined
      (call-with-this tmp-fn tmp-obj a b)))
```

**Nested chains** `a?.b?.c(x)` introduce one `let*`/`if` per `?.`, short-circuiting to `undefined` at the first nullish value while reusing the previous temporary in the next check.

### Notes

- `==` handles both `null` and `undefined` for the guard.
- Temporary bindings must use `gensym` to avoid capture.
- Method calls must preserve `this` semantics; emitting `(tmp.call obj args...)` or equivalent Phase A call is acceptable.
- The base expression (like `getObj()?.method`) is evaluated exactly once because it is bound before the guard.

## 8. Async / Await

**Sugar**:
```lisp
(async (x) ...)
```

**Rewrite**:
```lisp
(fn (x) (return (await ...))) ;; sets async flag on FunctionExpr
```

Explicit `async` keyword macros or rewrites produce the `FunctionExpr` with `async: true` metadata.
Additional metadata on the generated `FunctionExpr` indicates it is async so downstream phases can treat `await` appropriately; the canonical form might look like `(fn (x) :async true (return (await ...)))` or similar depending on how Phase A records metadata, but the key point is that the node is decorated with `async: true` rather than requiring a separate sugar form.

## 9. Type Expression Syntax

Phase B parses TypeScript-style type annotations and rewrites them to the structured `t:` nodes documented in [phaseA/TYPES.md](phaseA/TYPES.md).

### Parameter Annotations

**Sugar**:
```lisp
(fn (x: number, y: string): boolean ...)
```

**Rewrite**:
```lisp
(fn
  ((x (t:primitive "number"))
   (y (t:primitive "string")))
  (t:primitive "boolean")
  ...)
```

### Generic Parameters

**Sugar**:
```lisp
(fn <T, U>(x: T, y: U): [T, U] ...)
```

**Rewrite**:
```lisp
(fn
  ((x (t:var "T"))
   (y (t:var "U")))
  (t:tuple (t:var "T") (t:var "U"))
  :type-params ("T" "U")
  ...)
```

### Inline Type Expressions

| Sugar | Canonical |
| --- | --- |
| `number` | `(t:primitive "number")` |
| `Foo` | `(t:ref "Foo")` |
| `T` (in generic context) | `(t:var "T")` |
| `string[]` | `(t:array (t:primitive "string"))` |
| `Array<T>` | `(t:apply (t:ref "Array") (t:var "T"))` |
| `A \| B` | `(t:union A' B')` |
| `A & B` | `(t:intersection A' B')` |
| `[A, B]` | `(t:tuple A' B')` |
| `T?` | `(t:nullable T')` |
| `{ a: T }` | `(t:object ("a" T'))` |
| `(a: A) => R` | `(t:fn ((a A')) R')` |
| `"literal"` | `(t:literal "literal")` |
| `keyof T` | `(t:keyof T')` |

### Type Declarations

**Sugar**:
```lisp
(type Alias SomeType)
(type Generic (Array))
```

**Rewrite**:
```lisp
(type-alias "Alias" SomeType')
(type-alias "Generic" (t:apply (t:ref "Array") (t:var "T")) :type-params ("T"))
```
