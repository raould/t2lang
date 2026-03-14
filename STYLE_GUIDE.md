# t2lang Stage9 Syntax Style Guide

This guide documents preferred syntax forms and available sugar. It is primarily aimed at AI agents and contributors who need to write t2 source without building up bad habits from the raw ANTLR grammar.

The golden rule: **prefer the shorter, more readable form** whenever it produces identical output.

---

## 1. Property Access

### Dotted-identifier sugar (preferred)

A dotted identifier like `foo.bar.baz` is tokenised as a single token and desugared automatically into chained `prop-access` nodes.

```lisp
;; PREFER
obj.x
obj.a.b.c
arr.length
process.stdout
Array.prototype.concat

;; AVOID (verbose)
(. obj x)
(. (. obj a) b)
(. arr length)
```

**Rule:** use `(. expr key)` only when the object is itself a non-identifier expression, e.g. a call or literal.

```lisp
;; Required — object is a call result, not a plain name
(. (getConfig) timeout)
(. [1 2 3] length)           ;; bracket array literal — not a plain name
```

**Numeric and keyword keys** work in dotted sugar too:

```lisp
obj.0.x          ;; emits obj["0"].x — numeric key uses bracket form automatically
obj.then         ;; keyword-named property — no quoting needed
```

---

## 2. Method Calls

### Dotted sugar for method calls (preferred)

When the receiver is a plain name (possibly dotted), put the receiver and method segments together and pass args normally:

```lisp
;; PREFER
(console.log "hello")
(arr.push 99)
(s.slice 0 5)
(arr.join ", ")
(Array.prototype.join.call arr "-")

;; AVOID
((. console log) "hello")
(method-call arr push 99)
(method-call s slice 0 5)
```

Zero-arg method calls — wrap in parens to call:

```lisp
;; PREFER — calls the method (emits s.toUpperCase())
(s.toUpperCase)

;; NOT a call — just the property value (emits s.toUpperCase)
s.toUpperCase
```

**Use `method-call` only when the receiver is a complex expression:**

```lisp
;; Required — receiver is a call result
(method-call (getArr) join ", ")
(method-call (. matrix [i]) toString)
```

---

## 3. Array Literals

```lisp
;; PREFER — bracket sugar
[1 2 3]
[]
["a" "b" "c"]
[x (+ x 1) true null]
[[1 2] [3 4]]         ;; nested
[0 ...rest 9]         ;; spread

;; AVOID — verbose form
(array 1 2 3)
(array)
```

Commas between elements are optional: `[1 2 3]` and `[1, 2, 3]` are identical.

---

## 4. Object Literals

```lisp
;; PREFER — brace sugar
{ x: 1, y: 2 }
{}
{ name: "Alice", age: 30 }
{ x }                 ;; shorthand: key and value are the same name
{ [k]: "val" }        ;; computed key
{ a: 1, [tag]: 2 }   ;; mixed static and computed

;; AVOID — verbose form
(object (x 1) (y 2))
(object)
(object (name "Alice") (age 30))
```

Commas between fields are optional: `{ a: 1 b: 2 }` and `{ a: 1, b: 2 }` are identical.

---

## 5. Mutation

### Binding mutation — `set!`

```lisp
(set! x 99)              ;; x = 99
```

### Property mutation — dotted sugar works on both sides

Dotted sugar works on the left-hand side of `set!`:

```lisp
;; PREFER
(set! obj.x 99)
(set! this.count (+ this.count 1))
(set! obj.a.b 42)        ;; chained path

;; VERBOSE — still valid
(set! (. obj x) 99)
(set! (. this count) (+ (. this count) 1))
```

### Index/subscript mutation — bracket assignment sugar

```lisp
;; PREFER — bracket sugar
(arr [1] = 99)
(arr [i] = newVal)
(arr [(+ i 1)] = val)

;; Also valid
(set! (. arr [i]) val)
```

### Compound assignment — `+=`, `-=`, `*=`, `/=`, `%=`

Use compound assignment operators instead of the verbose `(set! x (op x val))` form:

```lisp
;; PREFER
(+= x 1)                      ;; x += 1
(-= total cost)                ;; total -= cost
(*= factor 2)                  ;; factor *= 2
(/= size 4)                    ;; size /= 4
(%= index len)                 ;; index %= len

;; NOT SUPPORTED due to syntax confusion
(++ foo)                       ;; ++foo vs. foo++

;; AVOID — too verbose
(set! x (+ x 1))
(set! total (- total cost))
```

Dotted sugar works on the left-hand side too:

```lisp
(+= this.count 1)              ;; this.count += 1
(+= obj.score bonus)           ;; obj.score += bonus
```

---

## 6. Bindings & Scope

### Top-level declarations

```lisp
;; Immutable constant (top-level, no parens around name)
(const greeting "hello")
(const add (lambda ((x) (y)) (return (+ x y))))

;; Mutable let (top-level)
(let counter 0)
```

### Statement-level (inside function bodies, blocks)

Names get parens in statement position:

```lisp
;; Mutable, single binding
(let (x) 10)

;; Mutable, multiple sequential bindings (each sees previous)
(let* ((x 10) (y 20) (z (+ x y)))
  (console.log z))

;; Immutable
(const (pi) 3.14159)
```

### Type annotations

```lisp
(let (x : number) 42)
(const (name : string) "Alice")
(let* ((a : number 10) (b : string "world"))
  body)
```

---

## 7. Functions

### `lambda` — anonymous function (preferred for short inline functions)

```lisp
;; No params, no return type
(lambda () (return 42))

;; With params
(lambda ((x) (y)) (return (+ x y)))

;; With types and return type annotation
(lambda ((x : number) (y : number)) : number
  (return (+ x y)))

;; Rest params
(lambda ((...xs)) (return xs))

;; With spread in body
(lambda ((...args)) (return [0 ...args]))
```

### `fn` — named function expression or statement

```lisp
;; Named (name comes before param list)
(fn add ((x) (y)) (return (+ x y)))
(const double (fn f ((x)) (return (* 2 x))))  ;; name is optional in expression position
```

### `async-lambda` / `async-fn`

```lisp
(async-lambda ((url)) (return (await (fetch url))))
(async-fn fetchData ((url)) (return (await (fetch url))))
```

### `generator-fn` / `async-generator-fn`

```lisp
(generator-fn ((n))
  (let (i) 0)
  (while (< i n)
    (yield i)
    (set! i (+ i 1))))
```

### `lambda-o` / `fn-o` — named-argument (options-object) functions

Use for functions called with a brace-object `{ key: val }` instead of positional args:

```lisp
(fn-o greet ((name : string) (greeting? : string (default "Hello"))) : string
  (return (template greeting ", " name "!")))

;; Call with brace object
(greet { name: "Alice" })
(greet { name: "Bob", greeting: "Hi" })
```

### Return type annotation placement

For `lambda`/`fn`/`async-lambda` etc., `: returnType` goes between the param-list close-paren and the body:

```lisp
(lambda ((x : number)) : number (return (* x x)))
;;                     ^^^^^^^^ after param list, before body
```

For **class methods**, use `(returns TypeExpr)` — not `: type`:

```lisp
(method greet () (returns string) (return "hello"))
;;               ^^^^^^^^^^^^^^^ not `: string`
```

---

## 8. Conditionals

### `if` — statement, with `then`/`else` blocks

```lisp
(if (> x 0)
  (then (console.log "positive"))
  (else (console.log "non-positive")))

;; then-only (no else required)
(if (=== x null)
  (then (return "missing")))
```

### `ternary` — inline expression

```lisp
(ternary (> x 5) "big" "small")
(const label (ternary flag "on" "off"))
```

### `cond` — multi-branch expression (compiles to nested ternaries)

```lisp
(const grade
  (cond
    (>= score 90) "A"
    (>= score 80) "B"
    (>= score 70) "C"
    else "F"))

;; No match without `else` clause → undefined
```

---

## 9. Loops

### `for` — C-style with step sugar (preferred)

The sugar form `(for (var init) cond (delta) body...)` is shorter. The `delta` is added to `var` each iteration:

```lisp
;; PREFER — sugar form: (for (var init) cond updateExpr body...)
;; updateExpr is the full new value assigned to var each iteration
(for (i 0) (< i n) (+ i 1)
  (set! sum (+ sum i)))

(for (i n) (> i 0) (- i 1)      ;; backwards
  (console.log i))

(for (i 0) (< i 128) (+ i 2)    ;; step by 2
  (process i))

(for (i 0) (< i 10) (% (+ i 1) 5)  ;; any expression
  (process i))

;; VERBOSE — still valid when the update isn't a simple delta
(for (let (i) 0) (< i n) (set! i (+ i 1))
  (set! sum (+ sum i)))
```

### `for-of` — iterate over iterable values (preferred for arrays)

```lisp
(for-of item [1 2 3]
  (set! sum (+ sum item)))

(for-of char "hello"
  (console.log char))
```

### `for-in` — iterate over object keys

```lisp
(for-in key obj
  (console.log key))
```

### `for-await` — async iteration

```lisp
(for-await chunk stream
  (process chunk))
```

### `while`

```lisp
(while (> i 0)
  (set! sum (+ sum i))
  (set! i (- i 1)))
```

---

## 10. Optional Chaining and Null Coalescing

```lisp
;; Optional property access: user?.name
(.? user name)

;; Optional index: arr?.[i]
(optchain-index arr i)

;; Null coalescing: x ?? "default"
(?? x "default")

;; Combined idiom
(?? (.? config timeout) 5000)    ;; config?.timeout ?? 5000
```

---

## 11. Index Access

```lisp
;; PREFER — clearer intent
(index arr 0)
(index arr i)

;; Also valid
(. arr [0])
(. arr [i])
```

---

## 12. Switch

```lisp
(switch val
  (case 1 (return "one"))
  (case 2 (return "two"))
  (default (return "other")))
```

---

## 13. Error Handling

```lisp
(try
  (doSomething)
  (throw "explode")
  (catch err
    (console.log "caught:" err))
  (finally
    (cleanup)))

;; try/finally without catch
(try
  (doSomething)
  (finally
    (cleanup)))
```

---

## 14. String Interpolation

Use `template` for template literals. Alternating strings and expressions:

```lisp
(template "Hello, " name "! Score: " score ".")
;; emits: `Hello, ${name}! Score: ${score}.`

(template "" x "")      ;; `${x}` — wrap expression in empty strings
```

---

## 15. Classes

```lisp
(class Counter
  (class-body
    (field (count : number) 0)

    (constructor ((start : number))
      (set! (. this count) start))

    (method inc ()
      (set! (. this count) (+ (. this count) 1)))

    (get value () : number
      (return (. this count)))))
```

Key rules for class bodies:
- Use `(set! this.field val)` to mutate fields (dotted sugar works on both sides of `set!`)
- Use `this.field` (dotted sugar) to **read** fields: `(return this.count)`
- Use `(this.method)` to call a zero-arg method on self: `(return (this.inner))`
- Use `(this.method arg)` to call a method with args: `(this.push x)`
- Use `this.a.b` to read chained properties on self
- Modifiers (`public`, `private`, `static`, `readonly`, etc.) go between the form keyword and the name: `(private method foo () ...)`

---

## 16. Imports

### Concise import sugar (preferred)

```lisp
;; Named imports — brace destructure
(import {readFile writeFile} "fs/promises")

;; Default import — bare identifier
(import fs "node:fs")
(import path "node:path")

;; Default + named — identifier then brace destructure
(import React {useState useEffect} "react")

;; Type-only import
(import-type (named MyType) "./types")
(import-type (named (Foo FooAlias) Bar) "./types")  ;; with alias
```

### Legacy verbose form (avoid in new code)

```lisp
;; AVOID — verbose; only needed when compiler sources cannot use sugar
;; (compiler .s8 files are compiled by stage8 which predates the sugar)
(import (object (named (array (object (name "readFile")) (object (name "writeFile"))))) "fs/promises")
(import (object (default myLib)) "./myLib")
(import (object (namespace utils)) "./utils")
```

**Note:** The concise forms produce identical output to the verbose forms. Use them everywhere except in `.s8` compiler source files, which are compiled by an earlier stage that does not support this sugar.

---

## 17. Exports

```lisp
;; Export a new binding
(export PI 3.14159)

;; Re-export existing binding (possibly with alias)
(export-named (myFn))
(export-named (myFn publicFn))   ;; export myFn as publicFn

;; Default export
(export-default myClass)
(export-default (lambda ((x)) (return x)))

;; Re-export from another module
(export-from "./math" (add) (subtract))
(export-all-from "./utils")
(export-ns-from "ns" "./utils")  ;; export * as ns from "./utils"

;; Type exports
(export-type (MyType) (OtherType Alias))
(export-type-from "./types" (Foo) (Bar))
(export-type-all-from "./types")
```

---

## 18. Type Expressions

```lisp
;; Primitives
number  string  boolean  null  undefined  void  any  never  unknown

;; Union / intersection
(union string number)
(intersect Readable Writable)

;; Array
(type-array number)                  ;; number[]
(type-array (type-array string))     ;; string[][]

;; Tuple
(tuple number string)                ;; [number, string]
(tuple (x number) (y number))        ;; [x: number, y: number]

;; Function type
(tfn ((x number)) number)            ;; (x: number) => number
(tfn () void)                         ;; () => void

;; Object type
(Object (x number) (y? string))      ;; { x: number; y?: string }

;; Generics
(type-app Array number)              ;; Array<number>
(type-app Map string number)         ;; Map<string, number>

;; Literal type
(tlit "hello")                       ;; "hello"
(tlit 42)                            ;; 42
(tlit true)                          ;; true

;; keyof / typeof
(keyof MyType)
(typeof x)
```

---

## 19. `new`, `typeof`, `bind`

```lisp
;; new — constructor call
(new Map)
(new Point 3 4)
(new Error "something went wrong")

;; typeof (runtime)
(typeof x)                           ;; emits typeof x

;; bind — bind function to context (and optionally partial args)
(bind fn ctx)                        ;; fn.bind(ctx)
(bind fn ctx arg1)                   ;; fn.bind(ctx, arg1)
```

---

## 20. Operators

### Prefix form (always valid)

All binary operators can be written in prefix position:

```lisp
(+ a b)    (- a b)    (* a b)    (/ a b)    (% a b)
(=== a b)  (!== a b)  (== a b)   (!= a b)
(> a b)    (< a b)    (>= a b)   (<= a b)
(&& a b)   (|| a b)   (! x)
(& a b)    (| a b)    (^ a b)    (~ x)
(<< a b)   (>> a b)   (>>> a b)
```

### Infix form `#{}` (preferred for arithmetic-heavy expressions)

Use `#{}` for natural math notation. The `#` sigil is only on the **outermost** group; inner sub-groups use plain `{...}`.

```lisp
;; Basic arithmetic
#{a + b}
#{x * y}
#{{a + b} * c}                  ;; (a + b) * c — sub-group required for mixed ops
#{{x ** 2} + {y ** 2}}          ;; (x ** 2) + (y ** 2)

;; Comparisons and logic
#{arr.length === 0}
#{!done && {count > 0}}         ;; (!done) && (count > 0)
#{value ?? defaultVal}          ;; null coalescing

;; Unary operators bind tightly to the next atom
#{-x + 1}                       ;; (-x) + 1
#{~mask | flags}                ;; (~mask) | flags

;; Neoteric function calls: identifier(args) inside #{}
#{f(x) + 1}
#{f(x, y) * g(z)}
#{Math.abs(n) + 1}
#{f(a + b, c * d)}              ;; args are full infix expressions — no {} needed

;; Property access: dotted names are single tokens
#{arr.length + 1}
#{obj.method(x) * 2}
```

**Operator uniformity rule:** within a single `{...}` level, all binary operators must be the same. Mixed operators without explicit grouping are a compile-time error:

```lisp
#{a + b * c}                    ;; ERROR: mixed + and *
#{{a + b} * c}                  ;; OK: explicit grouping
```

**Supported operators:**

| Category    | Operators |
|-------------|-----------|
| Arithmetic  | `+` `-` `*` `/` `%` `**` |
| Comparison  | `<` `>` `<=` `>=` `===` `!==` `==` `!=` |
| Logical     | `&&` `\|\|` `??` |
| Bitwise     | `&` `\|` `^` |
| Unary       | `-` `!` `~` |

---

## 21. Macro System

* Macros in T2 only exist in the compiler during runtime; they do not produce any typescript output.
* A .t2 file can contain macros but cannot export them.
* Any macros that need to be shared via `macro-export` must be in a .t2m file.
* In order to successfully generate the .ts output, `macro-imports` must have appropriate .t2m files.

### File types

- **`.t2`** — normal source files. May not contain `macro-export` or `macro-reexport`.
- **`.t2m`** — macro module files. May only contain `defmacro`, `#[macro-time]` bindings, `macro-import`, `macro-export`, and `macro-reexport`.

### Defining macros

```lisp
;; defmacro — top-level macro definition (in .t2m files)
(defmacro my-macro (x y)
  (quasi (+ ~x ~y)))

;; #[macro-time] — mark a const/let as available at macro-expansion time
(#[macro-time] (const helpers (lambda ((x)) (return (+ x 1)))))
```

### Importing and exporting macros

```lisp
;; macro-import — import macros from a .t2m file into a namespace
(macro-import m "./macros.t2m")
;; Use: (m/macro-name args...)

;; macro-export — declare which macros this .t2m file exports
(macro-export my-macro other-macro)

;; macro-reexport — re-export macros from an imported namespace (umbrella .t2m files)
(macro-import core "./core.t2m")
(macro-reexport core)              ;; re-export all macros from core
(macro-reexport core foo bar)      ;; re-export only foo and bar from core
```

**Umbrella pattern** — one `.t2m` that re-exports from several sub-modules:

```lisp
;; all-macros.t2m
(macro-import m1 "./macros1.t2m")
(macro-import m2 "./macros2.t2m")
(macro-reexport m1)
(macro-reexport m2)
(macro-export)                     ;; empty export block still required to declare the file as exporting
```

### Invoking macros

```lisp
;; Expression form (=>) — compiles to an IIFE; usable in expression position
(m/my-macro arg1 arg2 => body1 body2)

;; Body form (=&) — inlines statements directly; usable in statement position only
(m/my-macro arg1 arg2 =& body1 body2)
```

The header expressions before `=>` / `=&` are the macro arguments. The body after the sigil is passed as a sequence of statements (each visible to the macro as a raw call/form node, with `expr-stmt` wrappers stripped).

### Macro evaluator builtins

These names are available inside macro body expressions:

| Builtin | Signature | Description |
|---------|-----------|-------------|
| `head` | `(head arr)` | First element of array or call node |
| `tail` | `(tail arr)` | Remaining elements (slice 1) |
| `drop` | `(drop n arr)` | Drop first n elements |
| `take_while` | `(take_while fn arr)` | Prefix while predicate holds |
| `map_indexed` | `(map_indexed arr fn)` | Map with `(i item)` args |
| `get_option` | `(get_option opts key)` | Lookup in `[[key val] ...]` pairs |
| `symbol` | `(symbol str)` | Build an identifier node from a string; `?` suffix → `_p` |
| `string` | `(string node)` | Extract `.name` from identifier, else coerce to string |
| `string_lower` | `(string_lower str)` | `str.toLowerCase()` |
| `gensym` | `(gensym prefix)` | Generate a fresh unique identifier |
| `and` | `(and a b ...)` | Short-circuit logical AND |
| `or` | `(or a b ...)` | Short-circuit logical OR |
| `+` | `(+ a b ...)` | Numeric addition (folds all args) |

**`symbol` normalisation:** names ending in `?` are converted to `_p` suffix so the result is a valid JS identifier — e.g. `(symbol "done?")` → identifier `done_p`.

### Quasiquote inside macros

```lisp
;; ~ unquotes a value; ~@ splices an array
(quasi (+ ~x ~y))
(quasi (array ~@items))

;; Dotted sugar inside quasi: "obj." followed by property
(quasi (obj.method ~arg))          ;; prop-access sform
```

---

## 22. Quasiquote (Macro Use Only)

```lisp
;; Quote a form
(quasi (object (tag 'div') (children children)))
(quote (const x 1))

;; Unquote (splice in a value)
(quasi (array ~x ~y))        ;; ~expr is shorthand for (unquote expr)
(quasi (array ~@xs))         ;; ~@expr is shorthand for (unquote-splicing expr)
```

---

## Quick Reference: Prefer vs Avoid

| Goal | PREFER | AVOID |
|------|--------|-------|
| Read property | `obj.prop` | `(. obj prop)` |
| Read chained | `obj.a.b.c` | `(. (. (. obj a) b) c)` |
| Call method (receiver is a name) | `(obj.method arg)` | `(method-call obj method arg)` |
| Call method (receiver is an expression) | `(method-call (expr) method arg)` | — |
| Zero-arg method call | `(obj.method)` | `((. obj method))` |
| Array literal | `[1 2 3]` | `(array 1 2 3)` |
| Object literal | `{ a: 1 }` | `(object (a 1))` |
| Mutate property | `(set! obj.key val)` | `(set! (. obj key) val)` |
| Mutate array index | `(arr [i] = val)` | — |
| Compound update | `(+= x 1)` | `(set! x (+ x 1))` |
| Multi-branch expression | `(cond test1 e1 test2 e2 else e3)` | nested ternary |
| Sequential let | `(let* ((a 1) (b 2)) ...)` | multiple `(let (x) ...)` |
| Iterate array values | `(for-of item arr ...)` | `(for ...)` |
| String template | `(template "x=" x ".")` | string concat |
| Optional access | `(.? obj key)` | manual null check |
| Default if null | `(?? val default)` | `(ternary (!== val null) val default)` |
| Named imports | `(import {foo bar} "mod")` | verbose `(import (object ...) "mod")` |
| Default import | `(import myLib "mod")` | verbose `(import (object (default myLib)) "mod")` |
| Arithmetic expression | `#{a + {b * c}}` | `(+ a (* b c))` |
| Comparison expression | `#{x === 0}` | `(=== x 0)` |
| Macro import | `(macro-import m "./m.t2m")` then `(m/macro arg)` | — |
| Macro re-export | `(macro-reexport ns)` or `(macro-reexport ns foo bar)` | — |
