# Phase0 Cheatsheet — TypeScript ⇄ T2

*Note: Phase0 syntax is low-level. Look toward Phase1 for more erogonomic-for-humans syntax additions.*

Quick reference: concise TypeScript fragments with equivalent Phase0 S-expression (T2) fragments.

Each example shows a small TypeScript snippet followed by the corresponding T2 form.

---

Example: simple constant

TypeScript
```ts
const x = 1;
```

T2
```t2
(const x 1)
```

---

Example: mutable variable and update

TypeScript
```ts
let x = 0;
x = x + 1;
```

T2
```t2
(let* ((x 0))
  (assign x (+ x 1)))
```

---

Example: named function

TypeScript
```ts
function add(a: number, b: number) {
  return a + b;
}
```

T2
```t2
(fn add (a b)
  (return (+ a b)))
```

---

Example: anonymous lambda

TypeScript
```ts
const inc = (n: number) => n + 1;
```

T2
```t2
(fn (n)
  (+ n 1))
```

---

Example: conditional

TypeScript
```ts
if (x > 0) {
  y = 1;
} else {
  y = -1;
}
```

T2
```t2
(if (> x 0)
  (assign y 1)
  (assign y -1))
```

---

Example: for loop

TypeScript
```ts
for (let i = 0; i < 10; i++) { doSomething(i); }
```

T2
```t2
(for ((i 0))
  (< i 10)
  (assign i (+ i 1))
  (call doSomething i))
```

---

Example: while loop

TypeScript
```ts
while (cond()) { step(); }
```

T2
```t2
(while (call cond)
  (call step))
```

---

Example: arrays and indexing

TypeScript
```ts
const arr = [1,2,3];
const v = arr[1];
```

T2
```t2
(const arr (array 1 2 3))
(const v (index arr 1))
```

---

Example: objects and property access

TypeScript
```ts
const obj = { a: 1, b: 2 };
const p = obj.a;
```

T2
```t2
(const obj (obj (field "a" 1) (field "b" 2)))
(const p (prop obj "a"))
```

---

Example: class (fields and methods)

TypeScript
```ts
class C { x = 1; m(y) { return y + this.x } }
```

T2
```t2
(class C
  (field "x" 1)
  (method "m" (y) (return (+ y (prop this "x")))))
```

---

Example: imports/exports

TypeScript
```ts
import def from "./mod";
import {a,b} from "./mod";
export { x };
export default foo;
```

T2
```t2
(import-default def "./mod")
(import-named (a b) "./mod")
(export x)
(export-default foo)
```

---

Example: construction and throw/try

TypeScript
```ts
new Foo(1,2)
throw new Error("msg");
try { f() } catch (e) { handle(e) } finally { cleanup() }
```

T2
```t2
(new Foo 1 2)
(throw (new Error "msg"))
(try (call f)
  (catch e (call handle e))
  (finally (call cleanup)))
```

---

Example: type alias and type assertion

TypeScript
```ts
type Point = {x: number, y: number}
const n = x as number;
```

T2
```t2
(type-alias Point (type-object ("x" (type-number)) ("y" (type-number))))
(const n (type-assert x (type-number)))
```

---

Example: function types, unions, intersections

TypeScript
```ts
// (number, number) => number
type U = A | B;
type I = A & B;
```

T2
```t2
(type-function ((type-number) (type-number)) (type-number))
(type-union (type-ref "A") (type-ref "B"))
(type-intersection (type-ref "A") (type-ref "B"))
```

---

Example: empty list literal

TypeScript
```ts
const empty = [];
```

T2
```t2
(const empty (array))
;; parser treats `()` as empty array
```

---

Notes / tips

- Operator forms are ordinary call heads: `(+ 1 2)`, `(!= a b)`, `(and a b)`.
- `let*` uses a binding-list: `(let* ((x 1) (y 2)) body...)`.
- `for` accepts placeholders for missing slots: use `_` or `null`.
- Strings and numbers are lexed as distinct tokens; `true|false|null|undefined` are parsed as literals.
- Macro-related splice placeholders like `(unquote-splice ...)` may appear inside binding lists during macro expansion and are consumed by the parser.

This cheatsheet is intentionally small and focused — ask if you want examples expanded into runnable Phase0 files.
