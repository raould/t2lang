# TypeScript Examples

This file shows concise examples for common TypeScript constructs:

1) Classes

```ts
class Person {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  greet(): string {
    return `Hello, ${this.name}`;
  }
}

// Usage
const p = new Person(1, "Alice");
console.log(p.greet());
```

2) Type aliases (type definitions)

```ts
// Simple alias
type ID = number | string;

// Generic alias
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// Usage
const r: Result<number> = { ok: true, value: 42 };
```

3) Interfaces

```ts
interface Animal {
  species: string;
  speak?(message?: string): void; // optional method
}

interface Pet extends Animal {
  name: string;
}

const dog: Pet = { species: 'dog', name: 'Rex', speak(msg = 'woof') { console.log(msg); } };
```

4) Anonymous object types (inline object types)

```ts
// Parameter expecting an anonymous object shape
function logUser(user: { id: ID; username: string; active?: boolean }) {
  console.log(user.id, user.username, !!user.active);
}

logUser({ id: 10, username: 'alice' });
```

5) Anonymous arrays & array syntax

```ts
// Array of primitives
const nums: number[] = [1, 2, 3];

// Generic array type
const strs: Array<string> = ['a', 'b'];

// Array of anonymous object types
const users: { id: number; name: string }[] = [ { id: 1, name: 'A' } ];

// Tuple (fixed-length heterogeneous array)
const pair: [string, number] = ['age', 30];
```

# T2 equivalents

# t2 equivalents for TypeScript examples

This file shows t2 (Phase1/Phase0) equivalents for the TypeScript examples.
Each snippet is a small self-contained `program` you can feed to the compiler.

1) Classes

```t2
(program
  (class Person
    (.id: number)
    (.name: string)

    (method "constructor" (id: number, name: string)
      (this.id := id)
      (this.name := name))

    (method "greet" (): string
      (return (+ "Hello, " this.name))))

  ;; Usage
  (const p (new Person 1 "Alice")
    (console.log (p.greet())))
)
```

2) Type aliases (type definitions)

```t2
(program
  ;; simple alias: ID = number | string
  (type-alias ID (type-union (type-number) (type-string)))

  ;; a concrete `Result<number>`-like alias (non-generic example)
  (type-alias ResultNumber
    (type-union
      (type-object ("ok" (type-literal true)) ("value" (type-number)))
      (type-object ("ok" (type-literal false)) ("error" (type-string)))
    ))
)
```

3) Interfaces (modeled as named object types)

```t2
(program
  ;; Interfaces are represented as named object types / type-aliases
  (type-alias Animal
    (type-object
      ("species" (type-string))
      ("speak" (type-union (type-function () (type-undefined)) (type-undefined)))
    ))

  (type-alias Pet
    (type-object
      ("name" (type-string))
      ("species" (type-string))
    ))

  (const dog (obj ("species" "dog") ("name" "Rex") ("speak" (fn () (console.log "woof"))))
    (console.log (prop dog "name")))
)
```

4) Anonymous objects (inline object literals)

```t2
(program
  ;; object literal with string/number fields
  (const user (obj ("id" 10) ("username" "alice")))

  ;; function that accepts an object; here we don't declare a named type,
  ;; but a caller can pass any object literal matching shape expected.
  (fn logUser (user)
    (console.log (index user "id") (index user "username")))

  (logUser user)
)
```

5) Anonymous arrays

```t2
(program
  ;; array of primitives
  (const nums (array 1 2 3))

  ;; array of strings
  (const strs (array "a" "b" "c"))

  ;; array of anonymous objects
  (const users (array (obj ("id" 1) ("name" "A")) (obj ("id" 2) ("name" "B"))))

  ;; tuple-like usage is just a fixed array literal in t2
  (const pair (array "age" 30))

  (console.log (index nums 0) (index users 1))
)
```

Notes

- Types in t2 use Phase0 type constructors such as `(type-number)`, `(type-string)`,
  `(type-object ("key" <type>) ...)`, `(type-union A B)`, and `(type-function (p1 ...) ret)`.
- Object literals are written as `(obj ("key" expr) ...)` and arrays as `(array e1 e2 ...)`.
- Many TypeScript constructs (interfaces, type aliases) map naturally to `type-alias` + `type-object`.

