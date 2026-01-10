# TypeScript Generics to T2 S-Expression Conversion

## Important Note on Generics in T2 Phase 0

**T2 Phase 0 does not support generics.** Generics are a Phase 1+ feature that will be added as syntactic sugar. This document shows how the *JavaScript runtime behavior* of generic functions can be expressed in T2 Phase 0, but without the compile-time type checking that generics provide.

When converting TypeScript generics to T2 Phase 0, you must:
1. Remove generic type parameters (`<T>`, `<K, V>`, etc.)
2. Remove type annotations from parameters
3. Keep the runtime logic intact
4. Accept that type safety is lost

## Example 1: Basic Identity Function

### TypeScript
```typescript
function identity<T>(value: T): T {
  return value;
}

const stringResult = identity("Hello");
const numberResult = identity(42);
```

### T2 (Phase 0 - No Generics)
```t2
(program
  ; Generic type parameter T is removed
  ; Runtime behavior is the same
  (fn identity (value)
    (return value))
  
  (const stringResult (call identity "Hello"))
  (const numberResult (call identity 42)))
```

**Note:** The T2 version has identical runtime behavior but loses TypeScript's compile-time type checking.

## Example 2: First Element Function

### TypeScript
```typescript
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = firstElement([1, 2, 3]);
const firstWord = firstElement(["apple", "banana", "cherry"]);
```

### T2 (Phase 0)
```t2
(program
  (fn firstElement (arr)
    (return (index arr 0)))
  
  (const firstNum (call firstElement (array 1 2 3)))
  (const firstWord (call firstElement (array "apple" "banana" "cherry"))))
```

## Example 3: Get First Element with Type Inference

### TypeScript
```typescript
function getFirstElement<T>(array: T[]): T {
  return array[0];
}

const firstString = getFirstElement(["apple", "banana", "cherry"]);
const firstNumber = getFirstElement([10, 20, 30]);
```

### T2 (Phase 0)
```t2
(program
  (fn getFirstElement (array)
    (return (index array 0)))
  
  (const firstString 
    (call getFirstElement (array "apple" "banana" "cherry")))
  (const firstNumber
    (call getFirstElement (array 10 20 30))))
```

## Example 4: Echo Function

### TypeScript
```typescript
function echo<T>(value: T): T {
  return value;
}

const stringResult = echo("Hello");
const numberResult = echo(42);
```

### T2 (Phase 0)
```t2
(program
  (fn echo (value)
    (return value))
  
  (const stringResult (call echo "Hello"))
  (const numberResult (call echo 42)))
```

## Example 5: Multiple Generic Types

### TypeScript
```typescript
function normalFun<DT, DT2>(a: DT, b: DT2) {
  return { a, b };
}

const result = normalFun("hello", 123);
const result2 = normalFun(true, "world");
```

### T2 (Phase 0)
```t2
(program
  (fn normalFun (a b)
    (return (obj 
      (field "a" a) 
      (field "b" b))))
  
  (const result (call normalFun "hello" 123))
  (const result2 (call normalFun true "world")))
```

## Example 6: Combine Arrays

### TypeScript
```typescript
function combineArrays<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  return [...arr1, ...arr2];
}

const combined = combineArrays([1, 2], ["a", "b"]);
```

### T2 (Phase 0)
```t2
(program
  ; Note: Spread operator is Phase 1+
  ; Must use explicit array concatenation
  (fn combineArrays (arr1 arr2)
    (return (call (prop arr1 "concat") arr2)))
  
  (const combined 
    (call combineArrays (array 1 2) (array "a" "b"))))
```

## Example 7: Identity Function with Explicit Type Call

### TypeScript
```typescript
function identity<Type>(value: Type): Type {
  return value;
}

// Explicit type parameter
const result1 = identity<string>("myString");

// Type inference
const result2 = identity("myString");
```

### T2 (Phase 0)
```t2
(program
  (fn identity (value)
    (return value))
  
  ; No generic syntax - both calls are the same at runtime
  (const result1 (call identity "myString"))
  (const result2 (call identity "myString")))
```

## Example 8: Generic with Simple Logic (Number Only Example)

### TypeScript
```typescript
function getFirstElement(arr: number[]): number {
  return arr[0];
}

// Without generics, this would fail for strings
// But this is the "before generics" example
const first = getFirstElement([1, 2, 3]);
```

### T2 (Phase 0)
```t2
(program
  ; T2 Phase 0 is dynamically typed at runtime
  ; Type checking happens at compile time (if using tsc)
  (fn getFirstElement (arr)
    (return (index arr 0)))
  
  (const first (call getFirstElement (array 1 2 3))))
```

## Example 9: Generic Class (Stack)

### TypeScript
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
  
  (const numberStack (new Stack))
  (call (prop numberStack "push") 1)
  (call (prop numberStack "push") 2))
```

## Example 10: Generic Interface - Key Value Pair

### TypeScript
```typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = {
  key: "Age",
  value: 30
};

console.log(pair);
```

### T2 (Phase 0)
```t2
(program
  ; Interfaces don't exist at runtime - only types do
  ; Type alias would be used for compile-time checking
  (type-alias KeyValuePair
    (type-object
      ("key" (type-string))
      ("value" (type-number))))
  
  (const pair (obj
    (field "key" "Age")
    (field "value" 30)))
  
  (call (prop console "log") pair))
```

## Example 11: Generic Type Alias - API Response

### TypeScript
```typescript
type APIResponse<T> = {
  data: T;
  isError: boolean;
};

const response: APIResponse<string> = {
  data: "Hello, world!",
  isError: false
};

const userResponse: APIResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "John" },
  isError: false
};
```

### T2 (Phase 0)
```t2
(program
  ; Generic type alias - the T parameter is removed in Phase 0
  ; You would need separate type aliases for each concrete type
  
  ; For string data:
  (type-alias APIResponseString
    (type-object
      ("data" (type-string))
      ("isError" (type-boolean))))
  
  (const response (obj
    (field "data" "Hello, world!")
    (field "isError" false)))
  
  ; For user object data:
  (type-alias APIResponseUser
    (type-object
      ("data" (type-object
        ("id" (type-number))
        ("name" (type-string))))
      ("isError" (type-boolean))))
  
  (const userResponse (obj
    (field "data" (obj
      (field "id" 1)
      (field "name" "John")))
    (field "isError" false))))
```

## Example 12: Generic List Interface and Implementation

### TypeScript
```typescript
interface List<T> {
  items: T[];
  addItem(item: T): void;
  getItem(index: number): T;
}

class StringList implements List<string> {
  items: string[] = [];
  
  addItem(item: string): void {
    this.items.push(item);
  }
  
  getItem(index: number): string {
    return this.items[index];
  }
}

const myList = new StringList();
myList.addItem("TypeScript");
console.log(myList.getItem(0));
```

### T2 (Phase 0)
```t2
(program
  ; Interface at compile time only
  ; Implementation loses generic parameter
  (class StringList
    (field "items" (array))
    
    (method "addItem" (item)
      (call (prop (prop this "items") "push") item))
    
    (method "getItem" (index)
      (return (index (prop this "items") index))))
  
  (const myList (new StringList))
  (call (prop myList "addItem") "TypeScript")
  (call (prop console "log") 
    (call (prop myList "getItem") 0)))
```

## Example 13: Generic with Extends Constraint

### TypeScript
```typescript
type APIResponse<T extends object> = {
  data: T;
  isError: boolean;
};

// This works - object type
const validResponse: APIResponse<{ name: string }> = {
  data: { name: "John" },
  isError: false
};

// This would error - string is not an object
// const invalidResponse: APIResponse<string> = {
//   data: "Hello",
//   isError: false
// };
```

### T2 (Phase 0)
```t2
(program
  ; Constraints are compile-time only
  ; At runtime, we just have the structure
  (type-alias APIResponse
    (type-object
      ("data" (type-object
        ("name" (type-string))))
      ("isError" (type-boolean))))
  
  (const validResponse (obj
    (field "data" (obj
      (field "name" "John")))
    (field "isError" false))))
```

## Example 14: Generic Function with Constraints

### TypeScript
```typescript
function createLoggedPair<S extends string | number, T extends string | number>(
  v1: S,
  v2: T
): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}

const pair1 = createLoggedPair(1, "hello");
const pair2 = createLoggedPair("world", 42);
```

### T2 (Phase 0)
```t2
(program
  (fn createLoggedPair (v1 v2)
    ; Template literals are Phase 1+ 
    ; Use string concatenation
    (call (prop console "log")
      (+ (+ (+ "creating pair: v1='" v1) "', v2='") (+ v2 "'")))
    (return (array v1 v2)))
  
  (const pair1 (call createLoggedPair 1 "hello"))
  (const pair2 (call createLoggedPair "world" 42)))
```

## Example 15: Generic Default Value

### TypeScript
```typescript
class NamedValue<T = string> {
  private _value: T | undefined;
  
  constructor(private name: string) {}
  
  public setValue(value: T): void {
    this._value = value;
  }
  
  public getValue(): T | undefined {
    return this._value;
  }
  
  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value = new NamedValue('myNumber');
value.setValue('myValue');
console.log(value.toString());
```

### T2 (Phase 0)
```t2
(program
  (class NamedValue
    (field "_value" undefined)
    (field "name" "")
    
    (method "constructor" (name)
      (assign (prop this "name") name))
    
    (method "setValue" (value)
      (assign (prop this "_value") value))
    
    (method "getValue" ()
      (return (prop this "_value")))
    
    (method "toString" ()
      ; Template literal becomes string concatenation
      (return (+ (+ (prop this "name") ": ") (prop this "_value")))))
  
  (let* ((value (new NamedValue "myNumber")))
    (call (prop value "setValue") "myValue")
    (call (prop console "log") 
      (call (prop value "toString")))))
```

## Example 16: Generic Wrapped Type

### TypeScript
```typescript
type Wrapped<T> = {
  value: T;
};

const wrappedValue: Wrapped<number> = {
  value: 10
};

const wrappedString: Wrapped<string> = {
  value: "hello"
};
```

### T2 (Phase 0)
```t2
(program
  ; Need separate type aliases for each concrete type
  (type-alias WrappedNumber
    (type-object
      ("value" (type-number))))
  
  (type-alias WrappedString
    (type-object
      ("value" (type-string))))
  
  (const wrappedValue (obj
    (field "value" 10)))
  
  (const wrappedString (obj
    (field "value" "hello"))))
```

## Example 17: Generic Box Class

### TypeScript
```typescript
class Box<T> {
  private contents: T;
  
  constructor(value: T) {
    this.contents = value;
  }
  
  getContents(): T {
    return this.contents;
  }
  
  setContents(value: T): void {
    this.contents = value;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("hello");
console.log(numberBox.getContents());
console.log(stringBox.getContents());
```

### T2 (Phase 0)
```t2
(program
  (class Box
    (field "contents" undefined)
    
    (method "constructor" (value)
      (assign (prop this "contents") value))
    
    (method "getContents" ()
      (return (prop this "contents")))
    
    (method "setContents" (value)
      (assign (prop this "contents") value)))
  
  (const numberBox (new Box 123))
  (const stringBox (new Box "hello"))
  (call (prop console "log") 
    (call (prop numberBox "getContents")))
  (call (prop console "log") 
    (call (prop stringBox "getContents"))))
```

## Example 18: Identities Function with Multiple Generics

### TypeScript
```typescript
function identities<T, U>(arg1: T, arg2: U): [T, U] {
  return [arg1, arg2];
}

// Explicit types
let result1 = identities<string, number>("argument 1", 100);

// Type inference
let result2 = identities("hello", 42);
```

### T2 (Phase 0)
```t2
(program
  (fn identities (arg1 arg2)
    (return (array arg1 arg2)))
  
  ; Both calls identical at runtime
  (let* ((result1 (call identities "argument 1" 100)))
    (let* ((result2 (call identities "hello" 42)))
      result2)))
```

## Key Takeaways

### What Changes When Converting to T2 Phase 0:

1. **Generic type parameters are removed**: `<T>`, `<K, V>` disappear
2. **Type annotations are removed**: `: T`, `: T[]` are gone
3. **Runtime behavior stays the same**: The actual JavaScript logic is preserved
4. **Type safety is lost**: No compile-time checking of generic constraints
5. **Interfaces become type aliases**: Interfaces don't exist at runtime
6. **Template literals become concatenation**: Use `(+)` operator

### What Stays the Same:

1. **Function logic**: The actual operations remain identical
2. **Control flow**: if, loops, etc. work the same way
3. **Object and array operations**: Creation and access are unchanged
4. **Method calls**: Still use `(call (prop obj "method") args...)`

### Future Phase 1+ Support:

When T2 Phase 1+ adds generic support, it will likely include:
- Generic type parameters: `(fn<T> identity (value) ...)`
- Type constraints: `(extends T SomeType)`
- Generic classes and interfaces
- Proper type inference
- Generic type aliases

Until then, T2 Phase 0 code has identical runtime behavior but requires separate type definitions for each concrete type you want to support.
