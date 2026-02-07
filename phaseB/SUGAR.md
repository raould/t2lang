# Phase B Syntactic Sugar Specification

## Overview

"Sugar" refers to syntactic conveniences that allow developers to write more ergonomic TypeScript-like code, which the parser or a rewrite pass transforms into canonical S-expressions (Phase A AST).

Unlike macros, sugar is often handled at the lexer or parser level, or via structural rewrites that don't involve user-defined code execution.

# 0. set! [x]

`set!` should be an alias for `assign`, if the lisp semantics are not too different.

## 1. Dotted Identifiers & Property Access [x]

To support standard object-oriented programming patterns without verbose nested `prop` calls.

### Sugar
```typescript
obj.prop
obj.method(arg)
a.b.c
```

### Canonical Rewrite (Phase A)
```lisp
(prop obj prop)
(call (prop obj method) arg)
(prop (prop a b) c)
```

### Rules
1.  **Dotted Atoms**: Identifiers containing dots (and no whitespace) are split.
2.  **Method Calls**: A list `(obj.method args...)` transforms into `(call (prop obj method) args...)`.
3.  **Property Access**: A bare atom `obj.prop` transform into `(prop obj prop)`.

## 2. Infix Operators [x]

- [ ] Phase B to support (infix (1 + 2 * 3))
- [ ] Phase B to support :(1 + 2 * 3)

### Grammar

```lisp
(infix (1 + 2 * 3))
(infix (x && y || z))
```

```typescript
(1 + 2 * 3)
(x && y || z)
```

### Sugar using leading-colon reader macro ".(<infix expression>)"

```lisp
:(1 + 2 * 3)
:(x && y || z)
```

### T2 Sugar Rewrite multiple steps in Phase B
```lisp
(+ 1 (* 2 3))
(call + 1 (call * 2 3))
```
```lisp
(|| (&& x y) z)
(call || (call && x y) z)
```

> Phase B fully parenthesizes every rewritten operator expression (so `1 + 2 * 3` yields `(call + 1 (call * 2 3))`) before any formatting step. The emitted TypeScript therefore never relies on Prettier’s precedence handling to preserve semantic order.

* precdence to be exactly javascript's. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table

### Implementation

- Phase B now rewrites `(infix (...))` forms (and the `:(...)` reader macro) into nested `(call <operator> …)` forms using the JavaScript precedence table shown below.
- The rewrite lives in `phaseB/src/sugar.ts` and runs inside `applySugar`, so `lower.ts` only ever sees canonical `call` nodes and the corresponding operators are never touched again.
- Supported operators include `+ - * / % << >> >>> < <= > >= in instanceof == != === !== & ^ | && || ??` (see the precedence table below for their ordering and associativity).
- Regression coverage lives in `phaseB/tests/sugar-infix.test.ts`, which asserts the addition rewrite plus precedence and logical chaining scenarios.

## 3. Literal Shorthands [x]

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

### Optional Keys
Phase B supports `?` suffixes on object literal keys to conditionally include a property only when the value is not nil (null/undefined). This avoids the common JS pitfall where falsy values like `0`, `""`, and `false` get dropped.

**Sugar**:
```lisp
{name "Alice" role? maybe-role age? maybe-age}
```

**Rewrite**:
```lisp
(object
  ("name" "Alice")
  (spread (if (!= maybe-role null) (object ("role" maybe-role)) (object)))
  (spread (if (!= maybe-age null) (object ("age" maybe-age)) (object))))
```

**Optional punning**:
```lisp
{role? age?}
```

**Rewrite**:
```lisp
(object
  (spread (if (!= role null) (object ("role" role)) (object)))
  (spread (if (!= age null) (object ("age" age)) (object))))
```

**Notes**:
- Uses `!= null` to match both `null` and `undefined`.
- Falsy values like `0`, `""`, and `false` are included.
- Multiple optional keys compile to multiple spreads in order of appearance.

### Computed Keys

**Sugar**:
```lisp
{[Symbol.iterator] (fn generator (x) (yield x))}
```

**Rewrite**:
```lisp
(object (computed Symbol.iterator (fn generator (x) (yield x))))
```

**Notes**:
- Computed keys allow symbol-based properties like `Symbol.iterator`.
- The key expression is preserved and lowered into Phase A as a computed object field.
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

## 4. Binding Forms [x]

Phase B exposes `let`/`const` sugar as parallel bindings, but Phase A only understands the sequential `let*`/`const*` forms. To preserve correct semantics (e.g., `(let ((a b) (b a)) ...)` must swap using the *old* values), Phase B rewrites every `let`/`const` into a `let*` that evaluates every initializer into temporary `gensym` bindings before reassigning the user variables.

Example:

```lisp
(let ((a b)
      (b a))
  body)
```

Rewrites to:

```lisp
(let* ((tmp_0 b)
       (tmp_1 a)
       (a tmp_0)
       (b tmp_1))
  body)
```

The emitted TypeScript therefore becomes:

```typescript
const tmp_0 = b;
const tmp_1 = a;
const a = tmp_0;
const b = tmp_1;
// body
```

The general rewrite is captured by the `expandParallelLet` helper described below:

```typescript
function expandParallelLet(bindings, body) {
  const temps = bindings.map(([name, init], i) => [gensym(`let_tmp_${i}`), init]);
  const rebinds = bindings.map(([name], i) => [name, temps[i][0]]);
  return {
    type: 'let*',
    bindings: [...temps, ...rebinds],
    body,
  };
}
```

This strategy guarantees that every `let`/`const` binding becomes a deterministic `let*` sequence where the initial values are fixed before the final bindings occur.

Phase A strictly requires `let*` and `const*` with specific nesting. Phase B allows `let` and `const` which are parallel bindings.

## 5. Assignment Sugar [x]

**Sugar**:
```lisp
(x := 10)
(obj.prop := 20)
(:= obj.prop 20)
```

**Rewrite**:
```lisp
(assign x 10)
(assign (prop obj prop) 20)
(assign (prop obj prop) 20)
```

## 5.5 For-of / For-in / For-await [x]

Phase B accepts explicit loop kinds and lowers them to Phase A loop nodes.

**Sugar:**
```lisp
(for of ((item) items) body...)
(for await ((item) items) body...)
(for in ((key) obj) body...)
```

**Rewrite:**
```lisp
(for of ((item) items) body...)
(for await ((item) items) body...)
(for of ((key) (call (prop Object "keys") obj)) body...)
```

## 6. Function Definitions [x]

Support for TypeScript-style parameter lists with colons.

**Sugar**:
```lisp
(fn (x: number, y: string) : boolean ...)
```

**Rewrite**:
```lisp
(fn ((x (t:primitive "number")) (y (t:primitive "string"))) (t:primitive "boolean") ...)
```

Phase B is responsible for parsing the type syntax (`x: T`) and converting it into the `(x T)` tuple structure Phase A expects for named parameters.

## 7. Optional Chaining (Expanded) [x]

Optional chaining rewrites avoid thunks by nesting `let*` bindings with `if` checks so arguments are never evaluated when the chain short-circuits.
See [phaseB/ERRORS.md](phaseB/ERRORS.md) for the diagnostics Surface B surfaces when optional chaining sugar is malformed.

### Rewrite Rules

**Property access** `obj?.prop`:
```lisp
(let* ((tmp obj))
  (if (== tmp null)
      undefined
      (prop tmp prop)))
```

**Method call** `obj?.method(args...)`:
```lisp
(let* ((tmp obj))
  (if (== tmp null)
      undefined
      ((prop tmp method) args...)))
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
     (tmp-fn (prop tmp-obj method)))
  (if (== tmp-fn null)
    undefined
      (call-with-this tmp-fn tmp-obj a b)))
```

### Computed optional access

Computed lookups like `obj?.[key]` share the same guard strategy, but they always rewrite to the `index` primitive so the downstream compiler can handle arbitrary expressions for the key. For example:

```lisp
(let* ((tmp obj))
  (if (== tmp null)
      undefined
      (index tmp key)))
```

When the receiver is non-optional (e.g., `obj.[key]`) the sugar simply emits `(index obj key)` without introducing guards.

**Nested chains** `a?.b?.c(x)` introduce one `let*`/`if` per `?.`, short-circuiting to `undefined` at the first nullish value while reusing the previous temporary in the next check.

### Notes

- `==` handles both `null` and `undefined` for the guard.
- Temporary bindings must use `gensym` to avoid capture.
- Method calls must preserve `this` semantics; emitting `(tmp.call obj args...)` or equivalent Phase A call is acceptable.
- The base expression (like `getObj()?.method`) is evaluated exactly once because it is bound before the guard.

## 8. Async / Await [x]

Phase B uses callable flags to mark async callables and lowers `(await expr)` directly.

**Sugar**:
```lisp
(fn async (x) (return (await (call fetch x))))
```

**Rewrite**:
```lisp
(fn async (x) (return (await (call fetch x))))
```

Notes:
- `async` is a callable flag (for `fn`, `lambda`, `method`, `getter`, `setter`).
- `(await expr)` is only valid inside async callables.

## 9. Type Expression Syntax [x]

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

TODO (not?): I really cannot envision how these would actually play out in day to day use, so I am punting on it because I think it will actually make things too complected. At least for now.

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
(type Generic <T> (Array<T>))
```

**Rewrite**:
```lisp
(type-alias "Alias" SomeType')
(type-alias "Generic" (t:apply (t:ref "Array") (t:var "T")) :type-params ("T"))
```

# 10 more precedence and evaluation order testing [ ]

- Precedence in TypeScript, JavaScript, ECMAScript must bes tested. We need to build extensive tests that have JavaScript tests being compard with T2 versions thereof to assert that T2 is not genrating incorrect output. This means generating many small tests in javascript which try to cover precedence + evaluation order + short-circuiting with high sensitivity. Then create a T2 version of the same test. Run the matched .js and .t2 pair and assert the output is the same. (Unfortunately it is a bit of a combinatorial explosion.)
  - [ ] validate the t2lang precedence implementation matches EVALUATION_PRECEDENCE.json
  - [ ] implement fully parenthasized type-level precedence. See TYPE_PRECEDENCE.md

  ## 11. Template interpolation macro [x]

  Phase B provides a built-in macro-like sugar, `template-with`, to interpolate fixed values into a template string. It parses `${key}` placeholders inside a string literal and replaces them with values supplied as key/value pairs.

  **Sugar:**
  ```lisp
  (template-with "Hello ${name}, age ${age}!"
    (name "Ada")
    (age 42))
  ```

  **Rewrite (conceptual):**
  ```lisp
  (call
    (lambda (tmpl_1 tmpl_2)
      (return
        (template "Hello " tmpl_1 ", age " tmpl_2 "!")))
    "Ada"
    42)
  ```

  **Rules:**
  - The first argument must be a string literal.
  - Each following argument must be a `(key value)` pair.
  - Placeholders are identifiers only (`${name}`), not expressions.
  - Values must be literals (strings, numbers, booleans, or null).
  - The expansion wraps the template in an IIFE, and parameters use `gensym` to avoid collisions.

