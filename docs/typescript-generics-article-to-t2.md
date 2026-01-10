# TypeScript Generics to T2: Complete Examples from Article

## Important Note on T2 Phase 0 and Generics

**T2 Phase 0 does not support generics.** This document shows how to convert the TypeScript code examples to T2 Phase 0, preserving the runtime behavior while losing the compile-time type safety that generics provide.

---

## Example 1: First Element Without Generics (The Problem)

### TypeScript
```typescript
function firstElement(arr: any[]) {
  return arr[0];
}
```

### T2 (Phase 0)
```t2
(program
  (fn firstElement (arr)
    (return (index arr 0))))
```

**Issue:** Return type is `any`, no type safety.

---

## Example 2: First Element With Generics (The Solution)

### TypeScript
```typescript
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const numbers = [1, 2, 3];
const firstNum = firstElement(numbers); // Type: number

const words = ["hello", "world"];
const firstWord = firstElement(words); // Type: string
```

### T2 (Phase 0)
```t2
(program
  (fn firstElement (arr)
    (return (index arr 0)))
  
  (const numbers (array 1 2 3))
  (const firstNum (call firstElement numbers))
  
  (const words (array "hello" "world"))
  (const firstWord (call firstElement words)))
```

---

## Example 3: Basic Identity Function

### TypeScript
```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // Type: number
const str = identity("hello"); // Type: string
```

### T2 (Phase 0)
```t2
(program
  (fn identity (value)
    (return value))
  
  (const num (call identity 42))
  (const str (call identity "hello")))
```

---

## Example 4: Get First Element

### TypeScript
```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

// Usage
const numbers = [1, 2, 3];
const firstNumber = getFirstElement<number>(numbers); // Type is number

const strings = ["a", "b", "c"];
const firstString = getFirstElement<string>(strings); // Type is string
```

### T2 (Phase 0)
```t2
(program
  (fn getFirstElement (arr)
    (return (index arr 0)))
  
  ; Usage
  (const numbers (array 1 2 3))
  (const firstNumber (call getFirstElement numbers))
  
  (const strings (array "a" "b" "c"))
  (const firstString (call getFirstElement strings)))
```

---

## Example 5: Pair Function with Multiple Generic Types

### TypeScript
```typescript
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const result = pair("id", 123); // Type: [string, number]
```

### T2 (Phase 0)
```t2
(program
  (fn pair (key value)
    (return (array key value)))
  
  (const result (call pair "id" 123)))
```

---

## Example 6: Generic with Constraints (Length Property)

### TypeScript
```typescript
function logLength<T extends { length: number }>(value: T): number {
  return value.length;
}

logLength("hello"); // ✓ Works (string has length)
logLength([1, 2, 3]); // ✓ Works (array has length)
logLength({ length: 10 }); // ✓ Works (object has length)
// logLength(42); ✗ Error (number has no length)
```

### T2 (Phase 0)
```t2
(program
  (fn logLength (value)
    (return (prop value "length")))
  
  (call logLength "hello")
  (call logLength (array 1 2 3))
  (call logLength (obj (field "length" 10)))
  ; logLength(42) would fail at runtime, not compile-time
)
```

**Note:** T2 Phase 0 loses the compile-time constraint checking. The error for `logLength(42)` would only occur at runtime.

---

## Example 7: Generic Interface - Box

### TypeScript
```typescript
interface Box<T> {
  content: T;
}

const box1: Box<number> = { content: 42 };
const box2: Box<string> = { content: "hello" };
```

### T2 (Phase 0)
```t2
(program
  ; Need separate type aliases for each concrete type
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

## Example 8: Generic Class - Stack

### TypeScript
```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T) {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

// Usage
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
console.log(stringStack.pop()); // "b"
```

### T2 (Phase 0)
```t2
(program
  (class Stack
    (field "items" (array))
    
    (method "push" (item)
      (call (prop (prop this "items") "push") item))
    
    (method "pop" ()
      (return (call (prop (prop this "items") "pop")))))
  
  ; Usage
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

## Example 9: Type-Safe Dynamic Function Call

### TypeScript
```typescript
type Methods = {
  add: (a: number, b: number) => number;
  concat: (a: string, b: string) => string;
  isEven: (num: number) => boolean;
};

// Generic function to safely call a method from an object
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

// ✓ Valid calls (type-safe)
const sum = callMethod("add", 2, 3);       // number
const text = callMethod("concat", "Hello, ", "World!"); // string
const even = callMethod("isEven", 4);      // boolean

// ✗ TypeScript will catch incorrect usage
// callMethod("add", "hello", 5); // Error
// callMethod("isEven", "42");    // Error
```

### T2 (Phase 0)
```t2
(program
  ; Type alias for compile-time only
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
  
  ; Generic function - spread operator is Phase 1+
  ; Must handle args differently
  (fn callMethod (method args)
    (const methods (obj
      (field "add" (fn (a b) (+ a b)))
      (field "concat" (fn (a b) (+ a b)))
      (field "isEven" (fn (num) (=== (% num 2) 0)))))
    (const methodFn (prop methods method))
    ; Assuming args is an array, apply them
    (return (call (prop methodFn "apply") null args)))
  
  ; Usage - must pass args as array
  (const sum (call callMethod "add" (array 2 3)))
  (const text (call callMethod "concat" (array "Hello, " "World!")))
  (const even (call callMethod "isEven" (array 4))))
```

**Note:** The spread operator `...args` is a Phase 1+ feature. T2 Phase 0 requires passing arguments as an array and using `.apply()`.

---

## Example 10: Deep Partial Utility Type

### TypeScript
```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Example interface
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

// Applying DeepPartial
const partialUser: DeepPartial<User> = {
  name: "Alice",
  address: {
    city: "Wonderland", // OK
  },
  preferences: {
    notifications: {
      email: true, // OK
    },
  },
};

// ✓ TypeScript enforces type correctness
// partialUser.address.zip = 12345; // Error: zip is possibly undefined
// partialUser.preferences.theme = "blue"; // Error: "blue" is not assignable
```

### T2 (Phase 0)
```t2
(program
  ; Mapped types and conditional types are not supported in Phase 0
  ; Must define the complete structure manually
  
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
  
  ; Partial user - just create the object
  ; Optional properties not enforced in Phase 0
  (const partialUser (obj
    (field "name" "Alice")
    (field "address" (obj
      (field "city" "Wonderland")))
    (field "preferences" (obj
      (field "notifications" (obj
        (field "email" true))))))))
```

**Note:** Advanced type utilities like `DeepPartial` with mapped types and conditional types are not supported in T2 Phase 0.

---

## Example 11: When NOT to Use Generics - Always Same Type

### TypeScript
```typescript
function double(num: number): number {
  return num * 2;
}
```

### T2 (Phase 0)
```t2
(program
  (fn double (num)
    (return (* num 2))))
```

**This example doesn't use generics in TypeScript and doesn't need them.**

---

## Example 12: When NOT to Use Generics - Any is Enough

### TypeScript
```typescript
function logAnything(value: any): void {
  console.log(value);
}
```

### T2 (Phase 0)
```t2
(program
  (fn logAnything (value)
    (call (prop console "log") value)))
```

---

## Example 13: When NOT to Use Generics - Simple Interface

### TypeScript
```typescript
interface User {
  id: number;
  name: string;
}
```

### T2 (Phase 0)
```t2
(program
  (type-alias User
    (type-object
      ("id" (type-number))
      ("name" (type-string)))))
```

---

## Complete Working Example: All Concepts Together

### TypeScript
```typescript
// Generic identity
function identity<T>(value: T): T {
  return value;
}

// Generic array function
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

// Multiple generics
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// Generic class
class Box<T> {
  private content: T;
  
  constructor(value: T) {
    this.content = value;
  }
  
  getContent(): T {
    return this.content;
  }
}

// Usage
const num = identity(42);
const str = identity("hello");

const first = getFirstElement([1, 2, 3]);

const keyValue = pair("age", 30);

const numberBox = new Box<number>(100);
console.log(numberBox.getContent());
```

### T2 (Phase 0)
```t2
(program
  ; Generic identity
  (fn identity (value)
    (return value))
  
  ; Generic array function
  (fn getFirstElement (arr)
    (return (index arr 0)))
  
  ; Multiple generics
  (fn pair (key value)
    (return (array key value)))
  
  ; Generic class
  (class Box
    (field "content" undefined)
    
    (method "constructor" (value)
      (assign (prop this "content") value))
    
    (method "getContent" ()
      (return (prop this "content"))))
  
  ; Usage
  (const num (call identity 42))
  (const str (call identity "hello"))
  
  (const first (call getFirstElement (array 1 2 3)))
  
  (const keyValue (call pair "age" 30))
  
  (const numberBox (new Box 100))
  (call (prop console "log") 
    (call (prop numberBox "getContent"))))
```

---

## Summary: Key Differences

### What TypeScript Generics Provide (Lost in T2 Phase 0):
1. **Type parameters**: `<T>`, `<K, V>` syntax
2. **Type inference**: Automatic detection of generic types
3. **Type constraints**: `T extends SomeType`
4. **Compile-time type checking**: Errors before runtime
5. **Mapped types**: `[K in keyof T]`
6. **Conditional types**: `T extends X ? Y : Z`
7. **Utility types**: `Parameters<T>`, `ReturnType<T>`, etc.

### What T2 Phase 0 Provides:
1. **Runtime behavior**: Identical JavaScript execution
2. **Basic type aliases**: For compile-time checking (if using tsc)
3. **Dynamic typing**: Works with any type at runtime
4. **Explicit structure**: Clear, predictable code

### Conversion Guidelines:
1. Remove all generic type parameters (`<T>`, `<K, V>`)
2. Remove type annotations on parameters
3. Keep the core logic identical
4. Replace spread operators with explicit operations
5. Use separate type aliases for each concrete type
6. Accept that type safety moves from compile-time to runtime

### When to Convert:
- You want a minimal runtime without generic complexity
- Type safety at runtime is acceptable
- Code simplicity is prioritized over compile-time checks
- You're targeting a Phase 0 compiler

### Future Phase 1+ Features:
T2 Phase 1 and beyond will likely add:
- Native generic syntax
- Type constraints
- Type inference
- Advanced type utilities
- Better integration with TypeScript's type system
