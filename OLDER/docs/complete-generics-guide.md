# Complete TypeScript Generics to T2 Conversion Guide

## Overview

This comprehensive guide combines examples from:
1. The official TypeScript documentation on generics
2. "TypeScript Generics: A Simple Guide with Practical Examples" by Frontend Highlights
3. Additional practical patterns and use cases

**Critical Note:** T2 Phase 0 does not support generics. This guide shows how to convert TypeScript generic code to T2 Phase 0, preserving runtime behavior while losing compile-time type safety.

---

## Table of Contents

1. [Basic Identity Functions](#basic-identity-functions)
2. [Working with Arrays](#working-with-arrays)
3. [Generic Type Variables](#generic-type-variables)
4. [Generic Interfaces](#generic-interfaces)
5. [Generic Classes](#generic-classes)
6. [Generic Constraints](#generic-constraints)
7. [Type Parameters in Constraints](#type-parameters-in-constraints)
8. [Class Types in Generics](#class-types-in-generics)
9. [Generic Parameter Defaults](#generic-parameter-defaults)
10. [Advanced Examples](#advanced-examples)
11. [When NOT to Use Generics](#when-not-to-use-generics)

---

## Basic Identity Functions

### Example 1.1: Identity with Specific Type (Non-Generic)

**TypeScript:**
```typescript
function identity(arg: number): number {
  return arg;
}
```

**T2:**
```t2
(program
  (fn identity (arg)
    (return arg)))
```

### Example 1.2: Identity with Any (Loses Type Info)

**TypeScript:**
```typescript
function identity(arg: any): any {
  return arg;
}
```

**T2:**
```t2
(program
  (fn identity (arg)
    (return arg)))
```

**Issue:** While flexible, using `any` loses type information. The function accepts anything but returns `any`, providing no type safety.

### Example 1.3: Identity with Generics (Type-Safe)

**TypeScript:**
```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

// Explicit type argument
let output1 = identity<string>("myString");

// Type inference (more common)
let output2 = identity("myString");

// Usage examples
const num = identity(42);      // Type: number
const str = identity("hello"); // Type: string
```

**T2:**
```t2
(program
  (fn identity (arg)
    (return arg))
  
  ; Both explicit and inferred calls are identical at runtime
  (let* ((output1 (call identity "myString")))
    (let* ((output2 (call identity "myString")))
      
      ; Usage examples
      (const num (call identity 42))
      (const str (call identity "hello"))
      
      str)))
```

---

## Working with Arrays

### Example 2.1: First Element - The Problem

**TypeScript:**
```typescript
function firstElement(arr: any[]): any {
  return arr[0];
}
```

**T2:**
```t2
(program
  (fn firstElement (arr)
    (return (index arr 0))))
```

**Issue:** Return type is `any`, losing type information.

### Example 2.2: First Element with Generics

**TypeScript:**
```typescript
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const numbers = [1, 2, 3];
const firstNum = firstElement(numbers); // Type: number

const words = ["hello", "world"];
const firstWord = firstElement(words); // Type: string
```

**T2:**
```t2
(program
  (fn firstElement (arr)
    (return (index arr 0)))
  
  (const numbers (array 1 2 3))
  (const firstNum (call firstElement numbers))
  
  (const words (array "hello" "world"))
  (const firstWord (call firstElement words)))
```

### Example 2.3: Get First Element with Explicit Type

**TypeScript:**
```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const numbers = [1, 2, 3];
const firstNumber = getFirstElement<number>(numbers);

const strings = ["a", "b", "c"];
const firstString = getFirstElement<string>(strings);
```

**T2:**
```t2
(program
  (fn getFirstElement (arr)
    (return (index arr 0)))
  
  (const numbers (array 1 2 3))
  (const firstNumber (call getFirstElement numbers))
  
  (const strings (array "a" "b" "c"))
  (const firstString (call getFirstElement strings)))
```

---

## Generic Type Variables

### Example 3.1: Logging Identity with Length (Error Case)

**TypeScript:**
```typescript
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length); // Error: Property 'length' does not exist on type 'Type'
  return arg;
}
```

**T2:**
```t2
(program
  ; This will fail at runtime if arg doesn't have length
  (fn loggingIdentity (arg)
    (call (prop console "log") (prop arg "length"))
    (return arg)))
```

**Issue:** TypeScript catches this error at compile time. T2 Phase 0 will only fail at runtime.

### Example 3.2: Working with Arrays of Type

**TypeScript:**
```typescript
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length); // Array has a .length property
  return arg;
}

// Alternative syntax
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);
  return arg;
}
```

**T2:**
```t2
(program
  (fn loggingIdentity (arg)
    (call (prop console "log") (prop arg "length"))
    (return arg))
  
  ; Alternative - same implementation at runtime
  (fn loggingIdentity (arg)
    (call (prop console "log") (prop arg "length"))
    (return arg)))
```

---

## Generic Interfaces

### Example 4.1: Generic Function Type

**TypeScript:**
```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

// With different type variable name
let myIdentity: <Input>(arg: Input) => Input = identity;
```

**T2:**
```t2
(program
  (fn identity (arg)
    (return arg))
  
  (let* ((myIdentity identity))
    
    ; Different name - same implementation
    (let* ((myIdentity identity))
      
      myIdentity)))
```

### Example 4.2: Generic Type as Object Literal

**TypeScript:**
```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;
```

**T2:**
```t2
(program
  (fn identity (arg)
    (return arg))
  
  (let* ((myIdentity identity))
    myIdentity))
```

### Example 4.3: Generic Interface

**TypeScript:**
```typescript
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

**T2:**
```t2
(program
  ; Interface is compile-time only
  (type-alias GenericIdentityFn
    (type-function ((type-any)) (type-any)))
  
  (fn identity (arg)
    (return arg))
  
  (let* ((myIdentity identity))
    myIdentity))
```

### Example 4.4: Generic Interface with Type Parameter

**TypeScript:**
```typescript
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

**T2:**
```t2
(program
  ; Type parameter becomes concrete in Phase 0
  (type-alias GenericIdentityFnNumber
    (type-function ((type-number)) (type-number)))
  
  (fn identity (arg)
    (return arg))
  
  (let* ((myIdentity identity))
    myIdentity))
```

### Example 4.5: Box Interface

**TypeScript:**
```typescript
interface Box<T> {
  content: T;
}

const box1: Box<number> = { content: 42 };
const box2: Box<string> = { content: "hello" };
```

**T2:**
```t2
(program
  ; Separate type aliases for each concrete type
  (type-alias BoxNumber
    (type-object
      ("content" (type-number))))
  
  (type-alias BoxString
    (type-object
      ("content" (type-string))))
  
  (const box1 (obj (field "content" 42)))
  (const box2 (obj (field "content" "hello"))))
```

---

## Generic Classes

### Example 5.1: Generic Number Class

**TypeScript:**
```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// Works with strings too
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

**T2:**
```t2
(program
  (class GenericNumber
    (field "zeroValue" undefined)
    (field "add" undefined))
  
  (let* ((myGenericNumber (new GenericNumber)))
    (assign (prop myGenericNumber "zeroValue") 0)
    (assign (prop myGenericNumber "add") 
      (fn (x y) (+ x y)))
    
    ; Works with strings too
    (let* ((stringNumeric (new GenericNumber)))
      (assign (prop stringNumeric "zeroValue") "")
      (assign (prop stringNumeric "add")
        (fn (x y) (+ x y)))
      
      (call (prop console "log")
        (call (prop stringNumeric "add")
          (prop stringNumeric "zeroValue")
          "test")))))
```

### Example 5.2: Stack Class

**TypeScript:**
```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
console.log(stringStack.pop()); // "b"
```

**T2:**
```t2
(program
  (class Stack
    (field "items" (array))
    
    (method "push" (item)
      (call (prop (prop this "items") "push") item))
    
    (method "pop" ()
      (return (call (prop (prop this "items") "pop")))))
  
  (const numberStack (new Stack))
  (call (prop numberStack "push") 1)
  (call (prop numberStack "push") 2)
  (call (prop console "log") (call (prop numberStack "pop")))
  
  (const stringStack (new Stack))
  (call (prop stringStack "push") "a")
  (call (prop stringStack "push") "b")
  (call (prop console "log") (call (prop stringStack "pop"))))
```

---

## Generic Constraints

### Example 6.1: Constraint with Length Property

**TypeScript:**
```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property
  return arg;
}

// Works
loggingIdentity({ length: 10, value: 3 });
loggingIdentity("hello");
loggingIdentity([1, 2, 3]);

// Error: number doesn't have length
// loggingIdentity(3);
```

**T2:**
```t2
(program
  (type-alias Lengthwise
    (type-object
      ("length" (type-number))))
  
  (fn loggingIdentity (arg)
    (call (prop console "log") (prop arg "length"))
    (return arg))
  
  ; Works at runtime
  (call loggingIdentity (obj (field "length" 10) (field "value" 3)))
  (call loggingIdentity "hello")
  (call loggingIdentity (array 1 2 3))
  
  ; Would fail at runtime (no compile-time check)
  ; (call loggingIdentity 3)
)
```

### Example 6.2: Multiple Types with Constraints (Pair Function)

**TypeScript:**
```typescript
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const result = pair("id", 123); // Type: [string, number]
```

**T2:**
```t2
(program
  (fn pair (key value)
    (return (array key value)))
  
  (const result (call pair "id" 123)))
```

---

## Type Parameters in Constraints

### Example 7.1: Getting Property from Object

**TypeScript:**
```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // Works
// getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable
```

**T2:**
```t2
(program
  (fn getProperty (obj key)
    (return (prop obj key)))
  
  (let* ((x (obj 
    (field "a" 1)
    (field "b" 2)
    (field "c" 3)
    (field "d" 4))))
    
    (call getProperty x "a")
    ; (call getProperty x "m") ; Would fail at runtime
))
```

---

## Class Types in Generics

### Example 8.1: Using Constructor Functions

**TypeScript:**
```typescript
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

**T2:**
```t2
(program
  (fn create (c)
    (return (new c)))
  
  (class BeeKeeper
    (field "hasMask" true))
  
  (class ZooKeeper
    (field "nametag" "Mikle"))
  
  (class Animal
    (field "numLegs" 4))
  
  (class Bee Animal
    (field "numLegs" 6)
    (field "keeper" undefined)
    (method "constructor" ()
      (assign (prop this "keeper") (new BeeKeeper))))
  
  (class Lion Animal
    (field "keeper" undefined)
    (method "constructor" ()
      (assign (prop this "keeper") (new ZooKeeper))))
  
  (fn createInstance (c)
    (return (new c)))
  
  (prop (prop (call createInstance Lion) "keeper") "nametag")
  (prop (prop (call createInstance Bee) "keeper") "hasMask"))
```

---

## Generic Parameter Defaults

### Example 9.1: HTML Element Creation

**TypeScript:**
```typescript
// Without defaults
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>;

// With defaults
declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;

const div = create(); // HTMLDivElement
const p = create(new HTMLParagraphElement());
```

**T2:**
```t2
(program
  ; Generic parameter defaults are compile-time only
  ; Runtime behavior doesn't change
  
  (fn create (element children)
    ; Implementation would create container
    (return (obj
      (field "element" element)
      (field "children" children))))
  
  (const div (call create))
  (const p (call create (new HTMLParagraphElement))))
```

---

## Advanced Examples

### Example 10.1: Type-Safe Dynamic Function Call

**TypeScript:**
```typescript
type Methods = {
  add: (a: number, b: number) => number;
  concat: (a: string, b: string) => string;
  isEven: (num: number) => boolean;
};

function callMethod<T extends keyof Methods>(
  method: T,
  ...args: Parameters<Methods[T]>
): ReturnType<Methods[T]> {
  const methods: Methods = {
    add: (a, b) => a + b,
    concat: (a, b) => a + b,
    isEven: (num) => num % 2 === 0,
  };
  return methods[method](...args);
}

const sum = callMethod("add", 2, 3);       // number
const text = callMethod("concat", "Hello, ", "World!"); // string
const even = callMethod("isEven", 4);      // boolean
```

**T2:**
```t2
(program
  (type-alias Methods
    (type-object
      ("add" (type-function 
        ((type-number) (type-number)) 
        (type-number)))
      ("concat" (type-function 
        ((type-string) (type-string)) 
        (type-string)))
      ("isEven" (type-function 
        ((type-number)) 
        (type-boolean)))))
  
  ; Spread operator not available - use apply
  (fn callMethod (method args)
    (const methods (obj
      (field "add" (fn (a b) (+ a b)))
      (field "concat" (fn (a b) (+ a b)))
      (field "isEven" (fn (num) (=== (% num 2) 0)))))
    (const methodFn (prop methods method))
    (return (call (prop methodFn "apply") null args)))
  
  (const sum (call callMethod "add" (array 2 3)))
  (const text (call callMethod "concat" (array "Hello, " "World!")))
  (const even (call callMethod "isEven" (array 4))))
```

### Example 10.2: Deep Partial Utility Type

**TypeScript:**
```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface User {
  id: number;
  name: string;
  address: {
    city: string;
    zip: number;
  };
  preferences: {
    theme: "dark" | "light";
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
}

const partialUser: DeepPartial<User> = {
  name: "Alice",
  address: {
    city: "Wonderland",
  },
  preferences: {
    notifications: {
      email: true,
    },
  },
};
```

**T2:**
```t2
(program
  ; Mapped types not supported - define full structure
  (type-alias User
    (type-object
      ("id" (type-number))
      ("name" (type-string))
      ("address" (type-object
        ("city" (type-string))
        ("zip" (type-number))))
      ("preferences" (type-object
        ("theme" (type-union 
          (type-literal "dark") 
          (type-literal "light")))
        ("notifications" (type-object
          ("email" (type-boolean))
          ("sms" (type-boolean))))))))
  
  (const partialUser (obj
    (field "name" "Alice")
    (field "address" (obj
      (field "city" "Wonderland")))
    (field "preferences" (obj
      (field "notifications" (obj
        (field "email" true))))))))
```

---

## When NOT to Use Generics

### Example 11.1: Always the Same Type

**TypeScript:**
```typescript
function double(num: number): number {
  return num * 2;
}
```

**T2:**
```t2
(program
  (fn double (num)
    (return (* num 2))))
```

**Reason:** This function only works with numbers, so generics add no value.

### Example 11.2: Any is Sufficient

**TypeScript:**
```typescript
function logAnything(value: any): void {
  console.log(value);
}
```

**T2:**
```t2
(program
  (fn logAnything (value)
    (call (prop console "log") value)))
```

**Reason:** If you truly don't care about types, `any` is simpler.

### Example 11.3: Simple Data Structure

**TypeScript:**
```typescript
interface User {
  id: number;
  name: string;
}
```

**T2:**
```t2
(program
  (type-alias User
    (type-object
      ("id" (type-number))
      ("name" (type-string)))))
```

**Reason:** Fixed structure doesn't benefit from generics.

---

## Complete Working Example

### TypeScript:
```typescript
// Generic functions
function identity<T>(value: T): T {
  return value;
}

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// Generic interface
interface Box<T> {
  content: T;
}

// Generic class
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

// Generic with constraint
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(value: T): number {
  console.log(value.length);
  return value.length;
}

// Usage
const num = identity(42);
const str = identity("hello");

const first = getFirstElement([1, 2, 3]);

const keyValue = pair("age", 30);

const box: Box<number> = { content: 100 };

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop());

logLength("hello");
logLength([1, 2, 3]);
```

### T2 (Phase 0):
```t2
(program
  ; Generic functions
  (fn identity (value)
    (return value))
  
  (fn getFirstElement (arr)
    (return (index arr 0)))
  
  (fn pair (key value)
    (return (array key value)))
  
  ; Type aliases (compile-time only)
  (type-alias BoxNumber
    (type-object ("content" (type-number))))
  
  ; Generic class
  (class Stack
    (field "items" (array))
    
    (method "push" (item)
      (call (prop (prop this "items") "push") item))
    
    (method "pop" ()
      (return (call (prop (prop this "items") "pop")))))
  
  ; Generic with constraint
  (type-alias Lengthwise
    (type-object ("length" (type-number))))
  
  (fn logLength (value)
    (call (prop console "log") (prop value "length"))
    (return (prop value "length")))
  
  ; Usage
  (const num (call identity 42))
  (const str (call identity "hello"))
  
  (const first (call getFirstElement (array 1 2 3)))
  
  (const keyValue (call pair "age" 30))
  
  (const box (obj (field "content" 100)))
  
  (const numberStack (new Stack))
  (call (prop numberStack "push") 1)
  (call (prop numberStack "push") 2)
  (call (prop console "log") (call (prop numberStack "pop")))
  
  (call logLength "hello")
  (call logLength (array 1 2 3)))
```

---

## Conversion Summary

### What TypeScript Generics Provide (Lost in T2 Phase 0):

1. **Type parameters**: `<T>`, `<Type>`, `<K, V>` syntax
2. **Type inference**: Automatic detection of types
3. **Type constraints**: `T extends SomeType`
4. **Compile-time checking**: Errors before runtime
5. **keyof operator**: `keyof Type` for property names
6. **Mapped types**: `[K in keyof T]`
7. **Conditional types**: `T extends X ? Y : Z`
8. **Utility types**: `Parameters<T>`, `ReturnType<T>`, `Partial<T>`, etc.
9. **Variance annotations**: `in`, `out` modifiers (advanced)
10. **Generic parameter defaults**: `<T = DefaultType>`

### What Remains in T2 Phase 0:

1. **Identical runtime behavior**: JavaScript execution unchanged
2. **Basic type aliases**: For nominal typing if using tsc
3. **Dynamic typing**: Works with any type at runtime
4. **Function logic**: All operations preserved
5. **Class structure**: Inheritance and methods intact

### Conversion Rules:

1. **Remove** all generic type parameters: `<T>`, `<Type>`, `<K, V>`
2. **Remove** type annotations: `: T`, `: Type[]`, `: T | undefined`
3. **Remove** constraints: `extends` clauses on type parameters
4. **Replace** spread operators (`...`) with explicit operations
5. **Create** separate type aliases for each concrete type needed
6. **Keep** all runtime logic identical
7. **Accept** that type safety moves from compile to runtime
8. **Use** `.apply()` or pass arrays instead of spread args

### Key Differences Table:

| Feature | TypeScript Generics | T2 Phase 0 |
|---------|-------------------|------------|
| Type Parameters | `<T>`, `<K, V>` | Not supported |
| Type Inference | Automatic | Not available |
| Compile-time Checking | Yes | No |
| Runtime Behavior | Identical | Identical |
| Spread Operator | `...args` | Use arrays + `.apply()` |
| Constraints | `extends` | Not supported |
| Mapped Types | `[K in keyof T]` | Not supported |
| Utility Types | `Partial<T>`, etc. | Not supported |
| Type Safety | Compile-time | Runtime only |

### When to Use T2 Phase 0:

- Building minimal runtime systems
- Prototyping without type complexity
- Learning S-expression syntax
- Targeting Phase 0 compiler
- Prioritizing code simplicity over type safety

### Future Phase 1+ Features:

T2 Phase 1 and beyond will likely add:
- Native generic syntax
- Type parameter support
- Constraint checking
- Type inference
- Better TypeScript interop
- Advanced type utilities

---

## Additional Resources

- TypeScript Handbook: [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- T2 Phase 0 Grammar: `phase0/GRAMMAR.md`
- T2 Phase 0 Overview: `phase0/Phase0_Overview.md`
- T2 Cheatsheet: `phase0/CHEATSHEET.md`
