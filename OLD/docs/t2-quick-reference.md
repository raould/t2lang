# T2 Quick Reference Cheat Sheet

## Essential Patterns

### Variables
```javascript
const x = 1;          →  (const x 1)
let x = 0; x = 1;     →  (let* ((x 0)) (assign x 1))
```

### Functions
```javascript
function f(x) { return x; }  →  (fn f (x) (return x))
const f = x => x + 1;        →  (const f (fn (x) (+ x 1)))
f(1, 2);                     →  (call f 1 2)
```

### Operators (Binary)
```javascript
a + b    →  (+ a b)      a && b   →  (&& a b)
a - b    →  (- a b)      a || b   →  (|| a b)
a * b    →  (* a b)      a == b   →  (== a b)
a / b    →  (/ a b)      a === b  →  (=== a b)
a % b    →  (% a b)      a != b   →  (!= a b)
a < b    →  (< a b)      a !== b  →  (!== a b)
a > b    →  (> a b)
a <= b   →  (<= a b)
a >= b   →  (>= a b)
```

### Operators (Unary)
```javascript
!a         →  (! a)
typeof a   →  (typeof a)
-a         →  (- a)
```

### Arrays
```javascript
[]                →  (array)
[1, 2, 3]         →  (array 1 2 3)
arr[0]            →  (index arr 0)
arr[0] = x;       →  (assign (index arr 0) x)
```

### Objects
```javascript
{}                →  (obj)
{a: 1, b: 2}      →  (obj (field "a" 1) (field "b" 2))
obj.prop          →  (prop obj "prop")
obj.prop = x;     →  (assign (prop obj "prop") x)
```

### Control Flow
```javascript
if (cond) a; else b;    →  (if cond a b)

while (cond) body;      →  (while cond body)

for (let i=0; i<n; i++) →  (for ((i 0)) (< i n) (assign i (+ i 1)) body)
  body;
```

### Classes
```javascript
class C {             →  (class C
  x = 1;                   (field "x" 1)
  m() { return 2; }        (method "m" () (return 2)))
}

new C(x, y)           →  (new C x y)
```

### Exceptions
```javascript
throw err;                →  (throw err)

try { a; }                →  (try a
catch (e) { b; }               (catch e b)
finally { c; }                 (finally c))
```

### Types
```javascript
type T = number;          →  (type-alias T (type-number))
x as number               →  (type-assert x "number")
type T = {a: number}      →  (type-alias T (type-object ("a" (type-number))))
type T = A | B            →  (type-alias T (type-union (type-ref "A") (type-ref "B")))
```

### Imports/Exports
```javascript
import d from "./m";      →  (import-default d "./m")
import {a, b} from "./m"; →  (import-named (a b) "./m")
import * as n from "./m"; →  (import-all n "./m")
export {x};               →  (export x)
export default y;         →  (export-default y)
```

## Program Structure

Every T2 file must start with:
```t2
(program
  ...statements...
)
```

## Key Differences from TypeScript

1. **Everything is explicit** - no implicit operations
2. **Prefix notation** - operators come first: `(+ a b)` not `a + b`
3. **Parentheses required** - all constructs wrapped in parens
4. **String property names** - use `"prop"` not bare identifiers
5. **No comma operator** - each statement is separate
6. **Explicit calls** - use `(call func arg)` for clarity

## Common Gotchas

```javascript
// TypeScript                 T2 (WRONG)              T2 (RIGHT)
x++;                          (++ x)                  (assign x (+ x 1))
x += 5;                       (+= x 5)                (assign x (+ x 5))
[...arr, x]                   (... arr x)             Phase 1 feature
`hello ${x}`                  (template ...)          Phase 1 feature
arr?.prop                     (?. arr prop)           Phase 1 feature
{...obj}                      (... obj)               Phase 1 feature
```

## Type Constructors

```t2
(type-string)                              ; string
(type-number)                              ; number
(type-boolean)                             ; boolean
(type-null)                                ; null
(type-undefined)                           ; undefined
(type-array (type-number))                 ; number[]
(type-ref "TypeName")                      ; TypeName
(type-literal 42)                          ; literal 42
(type-object ("x" (type-number)))          ; {x: number}
(type-function ((type-number)) (type-void)) ; (n: number) => void
(type-union A B)                           ; A | B
(type-intersection A B)                    ; A & B
```

## Pattern: Multiple Statements

```javascript
function f() {
  a();
  b();
  return c();
}
```

```t2
(fn f ()
  (call a)
  (call b)
  (return (call c)))
```

## Pattern: Method Chaining

```javascript
arr.map(x => x * 2).filter(x => x > 0)
```

```t2
(call 
  (prop 
    (call (prop arr "map") (fn (x) (* x 2)))
    "filter")
  (fn (x) (> x 0)))
```

## Pattern: Nested Access

```javascript
obj.user.name
matrix[i][j]
```

```t2
(prop (prop obj "user") "name")
(index (index matrix i) j)
```

## Tips for Conversion

1. Start with the outermost construct
2. Convert operators to prefix form
3. Wrap property names in quotes
4. Add explicit `call` for function calls when needed
5. Remember `program` wrapper at top level
6. Use `let*` for variable scopes, not bare `let`
7. Operators with correct arity (2 for binary, 1 for unary) become infix in generated code
8. When in doubt, check the test files in the T2 repository

## Resources

- Full grammar: `phase0/GRAMMAR.md`
- More examples: `phase0/tests/integration/examples/`
- Cheatsheet: `phase0/CHEATSHEET.md`
- Overview: `phase0/Phase0_Overview.md`
