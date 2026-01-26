# TypeScript to T2 S-Expression Conversion Guide

## Overview

T2 is a Lisp-like S-expression language that compiles to TypeScript. Phase 0 represents the minimal core calculus - an explicit, constructor-based syntax without syntactic sugar. This guide shows how to convert TypeScript code into T2 Phase 0 S-expressions.

## Key Principles

1. **Everything is explicit** - No implicit behavior or operator precedence
2. **S-expression format** - All constructs use parenthesized prefix notation `(constructor args...)`
3. **No syntactic sugar** - Every construct maps directly to an AST node
4. **Function calls are explicit** - Use `(call func arg1 arg2)` or implicit operator syntax

## Basic Syntax Rules

### Program Structure

All T2 code must be wrapped in a program constructor:

```t2
(program
  statement1
  statement2
  ...)
```

### Comments

```typescript
// This is a comment
/* This is a block comment */
```

```t2
; This is a comment
;; Block comments use multiple semicolons
```

## Data Types and Literals

### Numbers

```typescript
const x = 42;
const y = 3.14;
```

```t2
(const x 42)
(const y 3.14)
```

### Strings

```typescript
const name = "John";
const greeting = 'Hello';
```

```t2
(const name "John")
(const greeting "Hello")
```

### Booleans and Special Values

```typescript
const isTrue = true;
const isFalse = false;
const nothing = null;
const notDefined = undefined;
```

```t2
(const isTrue true)
(const isFalse false)
(const nothing null)
(const notDefined undefined)
```

## Variables and Constants

### const Declaration

**TypeScript:**
```typescript
const x = 1;
const y = 2, z = 3;
```

**T2:**
```t2
(const x 1)

; Multiple declarations use binding list
(const ((y 2) (z 3))
  body...)
```

### let Declaration

**TypeScript:**
```typescript
let x = 0;
x = x + 1;
```

**T2:**
```t2
(let* ((x 0))
  (assign x (+ x 1)))
```

### Variable Assignment

**TypeScript:**
```typescript
x = 10;
arr[0] = value;
obj.prop = value;
```

**T2:**
```t2
(assign x 10)
(assign (index arr 0) value)
(assign (prop obj "prop") value)
```

## Operators

All operators in T2 are written in prefix notation (Polish notation).

### Arithmetic Operators

**TypeScript:**
```typescript
const sum = a + b;
const diff = a - b;
const product = a * b;
const quotient = a / b;
const remainder = a % b;
```

**T2:**
```t2
(const sum (+ a b))
(const diff (- a b))
(const product (* a b))
(const quotient (/ a b))
(const remainder (% a b))
```

### Comparison Operators

**TypeScript:**
```typescript
a < b
a > b
a <= b
a >= b
a == b
a === b
a != b
a !== b
```

**T2:**
```t2
(< a b)
(> a b)
(<= a b)
(>= a b)
(== a b)
(=== a b)
(!= a b)
(!== a b)
```

### Logical Operators

**TypeScript:**
```typescript
a && b
a || b
!a
```

**T2:**
```t2
(&& a b)
(|| a b)
(! a)
```

### Unary Operators

**TypeScript:**
```typescript
typeof x
-x
+x
```

**T2:**
```t2
(typeof x)
(- x)
(+ x)
```

### Nested Operations

**TypeScript:**
```typescript
const result = (a + b) * (c - d);
```

**T2:**
```t2
(const result (* (+ a b) (- c d)))
```

## Arrays

### Array Literals

**TypeScript:**
```typescript
const empty = [];
const numbers = [1, 2, 3];
const mixed = [1, "two", true, null];
const nested = [[1, 2], [3, 4]];
```

**T2:**
```t2
(const empty (array))
(const numbers (array 1 2 3))
(const mixed (array 1 "two" true null))
(const nested (array (array 1 2) (array 3 4)))
```

### Array Access

**TypeScript:**
```typescript
const value = arr[0];
const nested = matrix[1][2];
```

**T2:**
```t2
(const value (index arr 0))
(const nested (index (index matrix 1) 2))
```

### Array Methods

**TypeScript:**
```typescript
arr.push(item);
arr.map(x => x * 2);
```

**T2:**
```t2
(call (prop arr "push") item)
(call (prop arr "map") (fn (x) (* x 2)))
```

## Objects

### Object Literals

**TypeScript:**
```typescript
const empty = {};
const person = { name: "John", age: 30 };
const nested = {
  user: {
    name: "John"
  }
};
```

**T2:**
```t2
(const empty (obj))
(const person (obj 
  (field "name" "John")
  (field "age" 30)))
(const nested (obj
  (field "user" (obj
    (field "name" "John")))))
```

### Property Access

**TypeScript:**
```typescript
const name = obj.name;
const nested = obj.user.name;
```

**T2:**
```t2
(const name (prop obj "name"))
(const nested (prop (prop obj "user") "name"))
```

### Property Assignment

**TypeScript:**
```typescript
obj.name = "Jane";
```

**T2:**
```t2
(assign (prop obj "name") "Jane")
```

## Control Flow

### if Statement

**TypeScript:**
```typescript
if (x > 0) {
  y = 1;
}

if (x > 0) {
  y = 1;
} else {
  y = -1;
}
```

**T2:**
```t2
(if (> x 0)
  (assign y 1))

(if (> x 0)
  (assign y 1)
  (assign y -1))
```

### while Loop

**TypeScript:**
```typescript
while (condition) {
  step();
}
```

**T2:**
```t2
(while (call condition)
  (call step))
```

### for Loop

**TypeScript:**
```typescript
for (let i = 0; i < 10; i++) {
  doSomething(i);
}

// for without init
for (; i < 10; i++) {
  doSomething(i);
}

// for without update
for (let i = 0; i < 10;) {
  doSomething(i);
}
```

**T2:**
```t2
(for ((i 0))
  (< i 10)
  (assign i (+ i 1))
  (call doSomething i))

; Use _ or null for missing parts
(for _
  (< i 10)
  (assign i (+ i 1))
  (call doSomething i))

(for ((i 0))
  (< i 10)
  _
  (call doSomething i))
```

### Blocks

**TypeScript:**
```typescript
{
  statement1();
  statement2();
}
```

**T2:**
```t2
(block
  (call statement1)
  (call statement2))
```

## Functions

### Named Functions

**TypeScript:**
```typescript
function add(a, b) {
  return a + b;
}

function noReturn() {
  console.log("hi");
}
```

**T2:**
```t2
(fn add (a b)
  (return (+ a b)))

(fn noReturn ()
  (call (prop console "log") "hi"))
```

### Anonymous Functions (Lambdas)

**TypeScript:**
```typescript
const inc = (n) => n + 1;

const add = (a, b) => {
  return a + b;
};
```

**T2:**
```t2
(const inc (fn (n)
  (+ n 1)))

(const add (fn (a b)
  (return (+ a b))))
```

### Function Calls

**TypeScript:**
```typescript
func();
func(a, b, c);
obj.method(arg);
```

**T2:**
```t2
(call func)
(call func a b c)
(call (prop obj "method") arg)
```

### Implicit Call (Operators as Functions)

When using operators with the correct arity (2 for binary, 1 for unary), they're emitted as infix operators. With different arity, they become regular function calls:

**TypeScript:**
```typescript
+(1, 2, 3);  // Unusual, but shows the pattern
```

**T2:**
```t2
(+ 1 2 3)  ; Compiles to: +(1, 2, 3)
```

### Return Statement

**TypeScript:**
```typescript
return value;
return;
```

**T2:**
```t2
(return value)
(return)
```

## Classes

### Class Declaration

**TypeScript:**
```typescript
class Person {
  name = "John";
  age = 30;
  
  greet() {
    console.log("Hello");
  }
  
  sayName(prefix) {
    return prefix + this.name;
  }
}
```

**T2:**
```t2
(class Person
  (field "name" "John")
  (field "age" 30)
  (method "greet" ()
    (call (prop console "log") "Hello"))
  (method "sayName" (prefix)
    (return (+ prefix (prop this "name")))))
```

### Class with Constructor

**TypeScript:**
```typescript
class Counter {
  count = 0;
  
  increment() {
    this.count = this.count + 1;
  }
}
```

**T2:**
```t2
(class Counter
  (field "count" 0)
  (method "increment" ()
    (assign (prop this "count") 
      (+ (prop this "count") 1))))
```

### Class Instantiation

**TypeScript:**
```typescript
const obj = new MyClass(arg1, arg2);
```

**T2:**
```t2
(const obj (new MyClass arg1 arg2))
```

## Exception Handling

### throw Statement

**TypeScript:**
```typescript
throw new Error("Something went wrong");
throw errorObject;
```

**T2:**
```t2
(throw (new Error "Something went wrong"))
(throw errorObject)
```

### try-catch-finally

**TypeScript:**
```typescript
try {
  riskyOperation();
} catch (e) {
  console.log(e);
}

try {
  riskyOperation();
} catch (e) {
  console.log(e);
} finally {
  cleanup();
}
```

**T2:**
```t2
(try
  (call riskyOperation)
  (catch e
    (call (prop console "log") e)))

(try
  (call riskyOperation)
  (catch e
    (call (prop console "log") e))
  (finally
    (call cleanup)))
```

## Type System

### Type Aliases

**TypeScript:**
```typescript
type Point = { x: number, y: number };
type Callback = (arg: string) => void;
type Union = A | B;
type Intersection = A & B;
```

**T2:**
```t2
(type-alias Point 
  (type-object 
    ("x" (type-number)) 
    ("y" (type-number))))

(type-alias Callback
  (type-function ((type-string)) (type-undefined)))

(type-alias Union
  (type-union (type-ref "A") (type-ref "B")))

(type-alias Intersection
  (type-intersection (type-ref "A") (type-ref "B")))
```

### Type Assertions

**TypeScript:**
```typescript
const x = value as number;
const y = getValue() as string;
```

**T2:**
```t2
(const x (type-assert value "number"))
(const y (type-assert (call getValue) "string"))
```

### Type Constructors

Available type constructors:
- `(type-string)` - string type
- `(type-number)` - number type
- `(type-boolean)` - boolean type
- `(type-null)` - null type
- `(type-undefined)` - undefined type
- `(type-array elementType)` - array type
- `(type-ref "TypeName")` - reference to named type
- `(type-literal value)` - literal type
- `(type-object ("prop1" type1) ...)` - object type
- `(type-function (paramTypes...) returnType)` - function type
- `(type-union type1 type2 ...)` - union type
- `(type-intersection type1 type2 ...)` - intersection type

## Module System

### Imports

**TypeScript:**
```typescript
import defaultExport from "./module";
import { named1, named2 } from "./module";
import * as ns from "./module";
```

**T2:**
```t2
(import-default defaultExport "./module")
(import-named (named1 named2) "./module")
(import-all ns "./module")
```

### Exports

**TypeScript:**
```typescript
export { variable };
export default value;
```

**T2:**
```t2
(export variable)
(export-default value)
```

## Common Patterns

### Multiple Statements in a Scope

**TypeScript:**
```typescript
function process(data) {
  validate(data);
  transform(data);
  return save(data);
}
```

**T2:**
```t2
(fn process (data)
  (call validate data)
  (call transform data)
  (return (call save data)))
```

### Callback Functions

**TypeScript:**
```typescript
array.map(x => x * 2);
array.filter(x => x > 0);
```

**T2:**
```t2
(call (prop array "map") (fn (x) (* x 2)))
(call (prop array "filter") (fn (x) (> x 0)))
```

### Method Chaining

**TypeScript:**
```typescript
array
  .filter(x => x > 0)
  .map(x => x * 2)
  .reduce((a, b) => a + b, 0);
```

**T2:**
```t2
(call 
  (prop 
    (call 
      (prop 
        (call (prop array "filter") 
          (fn (x) (> x 0)))
        "map")
      (fn (x) (* x 2)))
    "reduce")
  (fn (a b) (+ a b))
  0)
```

### Conditional Assignment

**TypeScript:**
```typescript
const result = condition ? valueIfTrue : valueIfFalse;
```

**T2 (using if as expression):**
```t2
(const result 
  (if condition
    valueIfTrue
    valueIfFalse))
```

## Complete Examples

### Example 1: Simple Function

**TypeScript:**
```typescript
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**T2:**
```t2
(program
  (fn fibonacci (n)
    (if (<= n 1)
      (return n)
      (return (+ 
        (call fibonacci (- n 1))
        (call fibonacci (- n 2)))))))
```

### Example 2: Working with Arrays

**TypeScript:**
```typescript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const sum = doubled.reduce((a, b) => a + b, 0);
console.log(sum);
```

**T2:**
```t2
(program
  (const numbers (array 1 2 3 4 5))
  (const doubled 
    (call (prop numbers "map") 
      (fn (x) (* x 2))))
  (const sum
    (call (prop doubled "reduce")
      (fn (a b) (+ a b))
      0))
  (call (prop console "log") sum))
```

### Example 3: Class with Methods

**TypeScript:**
```typescript
class Calculator {
  result = 0;
  
  add(n) {
    this.result = this.result + n;
    return this;
  }
  
  multiply(n) {
    this.result = this.result * n;
    return this;
  }
  
  getValue() {
    return this.result;
  }
}

const calc = new Calculator();
const value = calc.add(5).multiply(3).getValue();
```

**T2:**
```t2
(program
  (class Calculator
    (field "result" 0)
    (method "add" (n)
      (assign (prop this "result")
        (+ (prop this "result") n))
      (return this))
    (method "multiply" (n)
      (assign (prop this "result")
        (* (prop this "result") n))
      (return this))
    (method "getValue" ()
      (return (prop this "result"))))
  
  (const calc (new Calculator))
  (const value
    (call 
      (prop 
        (call 
          (prop 
            (call (prop calc "add") 5)
            "multiply")
          3)
        "getValue"))))
```

### Example 4: Error Handling

**TypeScript:**
```typescript
function fetchData(url) {
  try {
    const response = fetch(url);
    return response.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  } finally {
    console.log("Fetch attempt completed");
  }
}
```

**T2:**
```t2
(program
  (fn fetchData (url)
    (try
      (const response (call fetch url))
      (return (call (prop response "json")))
      (catch error
        (call (prop console "error") "Failed to fetch:" error)
        (throw error))
      (finally
        (call (prop console "log") "Fetch attempt completed")))))
```

## Important Notes

1. **Empty arrays**: Use `(array)` or `()` for empty arrays
2. **Missing for loop parts**: Use `_` or `null` for missing init/condition/update
3. **Multiple bindings**: Use `let*` or `const` with binding lists: `((x 1) (y 2))`
4. **String property names**: Always use strings for object field names and property access
5. **Implicit returns**: Functions without explicit `return` implicitly return the last expression
6. **Expression statements**: Most expressions can be used as statements directly
7. **Operator arity**: Binary operators with 2 args become infix; other arities become function calls

## Phase 1 Extensions

Phase 1 adds syntactic sugar and convenience features. When working with Phase 0, remember that higher-level constructs will be desugared to these primitives:

- Spread operators → explicit array operations
- Template literals → string concatenation
- Destructuring → explicit property access
- Optional chaining → explicit null checks
- Operator shortcuts (++, +=) → explicit assign with operation

For more advanced features and macro expansion capabilities, refer to the Phase 1 documentation.
