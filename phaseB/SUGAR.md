# Phase B Syntactic Sugar Specification

## Overview

"Sugar" refers to syntactic conveniences that allow developers to write more ergonomic TypeScript-like code, which the parser or a rewrite pass transforms into canonical S-expressions (Phase A AST).

Unlike macros, sugar is often handled at the lexer or parser level, or via structural rewrites that don't involve user-defined code execution.

# 0. set! [x]

`set!` should be an alias for `assign`, if the lisp semantics are not too different.

## 1. Dotted Identifiers & Property Access [x]

To support standard object-oriented programming patterns without verbose nested `prop` calls.

### Sugar [ ]
```typescript
obj.prop
obj.method(arg)
a.b.c
```

### Canonical Rewrite (Phase A) [ ]
```lisp
(prop obj "prop")
(call (prop obj "method") arg)
(prop (prop a "b") "c")
```

### Rules
1.  **Dotted Atoms**: Identifiers containing dots (and no whitespace) are split.
2.  **Method Calls**: A list `(obj.method args...)` transforms into `(call (prop obj "method") args...)`.
3.  **Property Access**: A bare atom `obj.prop` transform into `(prop obj "prop")`.

## 2. Infix Operators (Future/WIP) [ ] not yet done!

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

* precdence to be exactly javascript's. see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table

### Plan for Infix Operator Support

- [ ] Lexer/Reader extension
  - [ ] Expand reader.ts so that when it sees tokens like +, -, *, &&, etc., it emits symbol nodes but also tracks their precedence/associativity metadata (or at least exposes the raw token sequence in a form the parser can work with).
  - [ ] Ensure the reader can differentiate between symbol/infix uses vs. prefix function calls (e.g., ( + a b ) should still be the canonical Phase A call).
- [ ] Parser (“prec-climbing”) or dedicated rewrite
  - [ ] Build a precedence table matching JavaScript’s operator list.
  - [ ] Implement a precedence-climbing parser (or a recursive-descent pass) in rewriter.ts or a new module (infix.ts) that:
    - [ ] Walks list nodes and, when it detects infix tokens interleaved with operands, rewrites the sequence into nested (call <operator> … ) forms in accordance with precedence and associativity.
    - [ ] Handles parentheses/brackets to override precedence and supports unary operators.
    - [ ] Escapes to the existing sugar logic so operators within (call … ) or (prop … ) remain unchanged.
- [ ] Phase B AST integration
  - [ ] Ensure the new pass runs after the reader but before lower.ts so every infix expression is normalized when lowering to Phase A nodes.
  - [ ] Add tests in sugar.test.ts (or equivalent) covering 1 + 2 * 3, logical chains (a && b || c), unary forms (-x), and mixed parentheses.
- [ ] Lower / Codegen compatibility
  - [ ] Verify that lower.ts no longer sees infix symbols—only standard (call … ) nodes—so no further changes are required there.
  - [ ] Add integration / CLI tests (maybe reusing existing Phase B sample programs) to confirm the generated Phase A AST still compiles and runs.
- [ ] Documentation & SUGAR.md update
  - [ ] Mark section 2 as implemented once the above passes and add usage details (supported operators, associativity notes).
  - [ ] Document any limitations (e.g., which operators are implemented, how precedence is resolved).

### Operator Precedence Reference

Derived from the [MDN Operator Precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table), this ordered list is what the infix rewrite must respect before handing expressions off to Phase A.

| Precedence | Associativity | Operators / Notes |
| --- | --- | --- |
| 18 – Grouping | n/a | `( ... )` forces its contents to evaluate before any surrounding operator. |
| 17 – Access & call | left-to-right (member/call) | Member access `obj.prop`, optional chaining `obj?.prop`, computed access `obj[expr]`, `new Foo(arg…)`, function calls `fn(args…)`, `import(expr)`. |
| 16 – `new` without args | n/a | `new Foo` (no argument list). |
| 15 – Postfix | n/a | `x++`, `x--` (operand must be an assignable target). |
| 14 – Prefix | n/a | `++x`, `--x`, `+x`, `-x`, `~x`, `!x`, `typeof`, `void`, `delete`, `await`. |
| 13 – Exponentiation | right-to-left | `x ** y` (right operand cannot be another exponentiation without parentheses). |
| 12 – Multiplicative | left-to-right | `*`, `/`, `%`. |
| 11 – Additive | left-to-right | `+`, `-`. |
| 10 – Bitwise shift | left-to-right | `<<`, `>>`, `>>>`. |
| 9 – Relational | left-to-right | `<`, `>`, `<=`, `>=`, `in`, `instanceof`. |
| 8 – Equality | left-to-right | `==`, `!=`, `===`, `!==`. |
| 7 – Bitwise AND | left-to-right | `x & y`. |
| 6 – Bitwise XOR | left-to-right | `x ^ y`. |
| 5 – Bitwise OR | left-to-right | `x | y`. |
| 4 – Logical AND | left-to-right | `x && y` (short-circuits on falsy `x`). |
| 3 – Logical OR & Nullish | left-to-right | `x || y`, `x ?? y` (short-circuits on truthy/nonnull left operand). |
| 2 – Assignment & control | right-to-left | Assignment `=`, compound assignments `+=`, `-=`, ..., logical/nullish assignments `&&=`, `||=`, `??=`, ternary `x ? y : z`, arrow `x => y`, `yield`, `yield*`, spread `...expr`. |
| 1 – Comma | left-to-right | `x, y` evaluates both operands and returns `y`. |

> Operator precedence only tells us how the operators group. Operand evaluation order remains left-to-right regardless of precedence or associativity, so short-circuiting is only observable when the operand expressions carry side effects. (See the section on evaluation order in the MDN table for the full explanation.)

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
(assign (prop obj "prop") 20)
(assign (prop obj "prop") 20)
```

## 6. Function Definitions [x]

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

## 7. Optional Chaining (Expanded) [ ]

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

## 8. Async / Await [ ]

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
