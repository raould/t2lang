# T2lang Language Specification

**Version**: 0.1.0-draft  
**Status**: Design Proposal  
**Last Updated**: 2025-02-04

---

## Abstract

T2lang is a language that transpiles to TypeScript, providing S-expression syntax with a powerful macro system. It aims to improve developer ergonomics while maintaining full interoperability with the JavaScript/TypeScript ecosystem.

This document specifies T2lang's design philosophy, syntax extensions, standard library, and conventions.

---

## Design Philosophy

### Core Principle

> **Better syntax for existing TypeScript semantics, not new semantics.**

T2lang is a transpiler, not a compiler. It leverages TypeScript's type system rather than replacing it. The generated TypeScript should be predictable—if you can't guess what JS comes out, it's too magic.

### In Scope

| Feature | Purpose |
|---------|---------|
| S-expression syntax | Homoiconicity, macro support |
| Phase B macros | User-extensible syntax |
| Unified collections API | Consistent operations across Array/Object/Map/Set |
| `defclass` sugar | Ergonomic class definitions with record construction |
| `?=` deep equality | Structural comparison |
| `!` mutation convention | Explicit mutability |
| `->` pipeline | Readable data transformation chains |
| `#` lambda shorthand | Concise anonymous functions |
| `{}` object literals | Explicit, predictable object construction |
| `key?` optional keys | Conditional object properties without boilerplate |

### Out of Scope

| Feature | Reason |
|---------|--------|
| New type system | Would require compiler, not just transpiler |
| Fixing async/await | Fundamental to JS runtime |
| Fixing `this` binding | Ecosystem too entrenched |
| null vs undefined unification | Interop nightmare |
| Numeric types beyond number/bigint | Runtime limitation |
| Module system overhaul | Already standardized (ESM) |
| Custom error handling | Result types can be userland |

### Guiding Principles

1. **Explicit over magic**: `{name age}` not `name: age` keyword args
2. **JS/TS naming**: `push` not `conj`, `delete` not `dissoc`
3. **Predictable output**: T2lang → TypeScript should be obvious
4. **Leverage existing libraries**: Use lodash, not reinvent
5. **Interop first**: Generated code works with any JS/TS library

---

## Syntax Overview

### Literals

```lisp
;; Primitives (same as JS)
42              ;; number
3.14            ;; number
42n             ;; bigint
"hello"         ;; string
true            ;; boolean
null            ;; null
undefined       ;; undefined

;; Collections
[1 2 3]                         ;; array
{name "Alice" age 30}           ;; object (Record)
(new Map [[a 1] [b 2]])         ;; Map
(new Set [1 2 3])               ;; Set
```

### Object Literals

T2lang uses `{}` for object literals with a cleaner syntax:

```lisp
;; Basic
{name "Alice" age 30}
;; → { name: "Alice", age: 30 }

;; Punning (variable name = field name)
(let ((name "Alice") (age 30))
  {name age})
;; → { name, age }

;; Spread
{...defaults name "override"}
;; → { ...defaults, name: "override" }

;; Computed keys
{[key-expr] value}
;; → { [keyExpr]: value }

;; Nested
{user {name "Alice" address {city "NYC"}}}
;; → { user: { name: "Alice", address: { city: "NYC" } } }
```

### Optional Keys

In TypeScript, conditionally including a key is verbose and error-prone:

```typescript
// The common pattern - cryptic and buggy
const user = {
  name: "Alice",
  ...(role && { role }),      // WRONG: excludes falsy values like 0, "", false
  ...(age !== undefined ? { age } : {}),  // Correct but verbose
};
```

T2lang provides the `?` suffix for optional keys:

```lisp
;; Include key only if value is not nil (null/undefined)
{name "Alice"
 role? maybe-role
 age? maybe-age}
```

#### Expansion

```lisp
;; T2lang
{name "Alice" role? maybe-role age? maybe-age}

;; Expands to TypeScript
{
  name: "Alice",
  ...(maybe_role != null ? { role: maybe_role } : {}),
  ...(maybe_age != null ? { age: maybe_age } : {})
}
```

Uses `!= null` which catches both `null` and `undefined` but **not** falsy values like `0`, `""`, `false`.

#### Examples

```lisp
(set! name "Alice")
(set! role undefined)
(set! age 0)           ;; falsy but valid!
(set! active false)    ;; falsy but valid!

{name role? role age? age active? active}
;; → { name: "Alice", age: 0, active: false }
;; role excluded (undefined), age and active included (not nil)
```

#### With Punning

```lisp
;; Punning + optional
{name role? age?}

;; Expands to:
{
  name,
  ...(role != null ? { role } : {}),
  ...(age != null ? { age } : {})
}
```

#### Conditional Key Blocks

For multiple related keys that should appear together:

```lisp
{name "Alice"
 (when is-admin
   {role "admin"
    permissions all-permissions})
 age 30}
```

;; Expands to:
{
  name: "Alice",
  ...(isAdmin ? { role: "admin", permissions: allPermissions } : {}),
  age: 30
}
```

#### Edge Cases

```lisp
;; Empty string - INCLUDED (not nil)
{name? ""}     ;; → { name: "" }

;; Zero - INCLUDED (not nil)  
{count? 0}     ;; → { count: 0 }

;; False - INCLUDED (not nil)
{active? false}  ;; → { active: false }

;; Null - EXCLUDED
{role? null}   ;; → {}

;; Undefined - EXCLUDED
{role? undefined}  ;; → {}
```

#### Comparison

| Pattern | T2lang | TypeScript |
|---------|--------|------------|
| Optional key | `{role? x}` | `...(x != null ? { role: x } : {})` |
| Optional punned | `{role?}` | `...(role != null ? { role } : {})` |
| Conditional block | `{(when c {k v ...})}` | `...(c ? { k: v ...} : {})` |

### No Magic Keyword Arguments

Function calls with named arguments require explicit object syntax:

```lisp
;; YES - explicit object
(greet {name "Bob" formal true})

;; NO - magic keyword inference (not supported)
(greet name: "Bob" formal: true)
```

This keeps the generated TypeScript predictable:

```typescript
greet({ name: "Bob", formal: true })
```

---

## Equality Operators

| Operator | Meaning | JS Equivalent |
|----------|---------|----------------|
| `:=` | Assignment | `=` |
| `==` | Loose equality (coercive) | `==` |
| `!=` | Loose inequality (coercive) | `!=` |
| `===` | Strict equality | `===` |
| `!==` | Strict inequality | `!==` |
| `?=` | Deep structural equality | `lodash.isEqual` |
| `?!=` | Deep structural inequality | `!lodash.isEqual` |

### Comparison

Standard JS comparison operators, unchanged:

```lisp
(< a b)
(> a b)
(<= a b)
(>= a b)
```

### Logical

```lisp
(and a b c)    ;; a && b && c
(or a b c)     ;; a || b || c
(not a)        ;; !a
```

---

## Mutation Convention

T2lang uses the `!` suffix to indicate mutation, following Scheme/Clojure convention.

### Principle

```lisp
;; Immutable (returns new, original unchanged)
(set-in obj [:a :b] 1)

;; Mutable (modifies in place, returns same object for chaining)
(set-in! obj [:a :b] 1)
```

### Full Operator Table

| Operation | Immutable (Lodash or pattern) | Mutable (Lodash or native) | Notes |
|-----------|-------------------------------|-----------------------------|-------|
| **Set nested** `set-in` | `_.set(_.cloneDeep(obj), path, value)` | `_.set(obj, path, value)` | `_.set` mutates |
| **Update nested** `update-in` | `_.update(_.cloneDeep(obj), path, fn)` | `_.update(obj, path, fn)` | `_.update` mutates |
| **Merge (shallow/deep)** `merge` | `_.merge(_.cloneDeep(obj), other)` | `_.merge(obj, other)` | `_.merge` mutates first arg |
| **Array push** `push` | `[...arr, value]` (native) | `arr.push(value)` (native) | No lodash helper |
| **Array pop** `pop` | `arr.slice(0, -1)` (native) | `arr.pop()` (native) | No lodash helper |
| **Sort** `sort-by` | `_.sortBy(arr, iteratee)` | `arr.sort(compareFn)` (native) | `_.sortBy` is immutable |
| **Reverse** `reverse` | `_.reverse([...arr])` | `_.reverse(arr)` | `_.reverse` mutates |
| **Map/Object set** `set` | `_.set(_.cloneDeep(obj), key, value)` | `_.set(obj, key, value)` | Same as nested set |
| **Map/Object delete** `delete` | `let c = _.cloneDeep(obj); delete c[key]; c` | `delete obj[key]` | No lodash delete |

### Implementation Strategy

Mutable versions use lodash directly. Immutable versions clone first:

```typescript
import { set } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

// Mutable - direct lodash
export function setIn_mut<T>(obj: T, path: string[], value: any): T {
  return set(obj, path, value);
}

// Immutable - clone then mutate
export function setIn<T>(obj: T, path: string[], value: any): T {
  const copy = cloneDeep(obj);
  return set(copy, path, value);
}
```

### Usage Guidelines

**Use immutable (set!ault) when:**
- Shared state (multiple references)
- React/Redux state updates
- Functional pipelines
- Public APIs

**Use mutable (`!`) when:**
- Local variables not escaping scope
- Builder patterns
- Performance-critical loops
- After explicit `clone`

---

## Syntactic Sugar (Phase B Macros)

A la Clojure.

### Pipeline Operator `->`

Threads a value through a series of transformations, inserting it as the first argument to each form.

```lisp
(-> users
    (filter active?)
    (map get-email)
    (sort-by identity)
    first)

;; Expands to:
(first
  (sort-by
    (map
      (filter users active?)
      get-email)
    identity))
```

For last-position threading, use `->>`:

```lisp
(->> [1 2 3]
     (map inc)
     (filter even?)
     (reduce +))

;; Expands to:
(reduce + (filter even? (map inc [1 2 3])))
```

### Lambda Shorthand `#`

Concise anonymous functions using `%` for arguments:

| Syntax | Expands To |
|--------|-----------|
| `#%.name` | `(fn (%) (get % "name"))` |
| `#(* % 2)` | `(fn (%) (* % 2))` |
| `#(+ %1 %2)` | `(fn (%1 %2) (+ %1 %2))` |
| `#(> %.age 18)` | `(fn (%) (> (get % "age") 18))` |

```lisp
;; Filter active users, get their emails
(-> users
    (filter #%.active)
    (map #%.email))

;; Sum pairs
(map pairs #(+ %1 %2))
```

### Safe Navigation `?.` and Nil Coalesce `??`

```lisp
;; Safe nested access
(?. user :address :city)
;; → user?.address?.city

;; With default
(?? (?. user :address :city) "Unknown")
;; → user?.address?.city ?? "Unknown"
```

---

## Class Definitions

### The Problem

TypeScript classes require repetitive boilerplate:

```typescript
// What we have to write
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet(): string {
    return `Hello, ${this.name}`;
  }
}

// Construction is positional, not named
const p = new Person("Alice", 30);  // what's 30?
```

### T2lang `defclass`

```lisp
(set!class Person
  (fields
    (name String)
    (age Number)
    (active Boolean := true))  ;; default value
  
  (methods
    (greet () -> String
      (str "Hello, " self.name))))
```

### Generated TypeScript

```typescript
interface PersonArgs {
  name: string;
  age: number;
  active?: boolean;
}

class Person {
  readonly name: string;
  readonly age: number;
  readonly active: boolean;

  constructor(args: PersonArgs) {
    this.name = args.name;
    this.age = args.age;
    this.active = args.active ?? true;
  }

  greet(): string {
    return `Hello, ${this.name}`;
  }
}
```

### Construction

Always uses object syntax—named fields, not positional:

```lisp
;; Named fields, clear what each value means
(Person {name "Alice" age 30})

;; With punning
(let ((name "Alice") (age 30))
  (Person {name age}))

;; Using defaults
(Person {name "Bob" age 25})  ;; active defaults to true
```

### Custom Constructor Logic

When constructor args differ from fields:

```lisp
(set!class Person
  (fields
    (name String)
    (nameLower String)      ;; derived
    (age Number)
    (birthYear Number))     ;; derived

  (constructor ({name age})  ;; input signature
    {name
     nameLower (lower name)
     age
     birthYear (- (current-year) age)})

  (methods
    (greet () -> String
      (str "Hello, " self.name))))
```

### Inheritance

```lisp
(set!class Employee
  (extends Person)
  
  (fields
    (department String)
    (salary Number))
  
  (methods
    (give-raise (amount Number)
      (set! self.salary (+ self.salary amount)))))
```

### Visibility

```lisp
(set!class BankAccount
  (fields
    (public owner String)
    (private balance Number := 0))
  
  (methods
    (public deposit (amount Number)
      (set! self.balance (+ self.balance amount)))
    
    (public get-balance () -> Number
      self.balance)
    
    (private validate-amount (amount Number) -> Boolean
      (> amount 0))))
```

---

## Collections API

### Design Approach

T2lang provides a unified API across JavaScript's collection types using hardcoded dispatch, not an extensible protocol system. This keeps the implementation simple and avoids compiler complexity.

### Supported Types

- `Array<T>`
- `Record<K, V>` (plain objects)
- `Map<K, V>`
- `Set<T>`

### Library Delegation

T2lang leverages battle-tested libraries:

| Library | Used For |
|---------|----------|
| `lodash` | `isEqual`, `get`, `mapValues`, `mapKeys`, `pick`, `omit`, `merge`, `groupBy`, `partition`, `cloneDeep` |
| `lodash/fp` | Immutable `set`, `update` |
| Custom wrappers | Type-preserving Map/Set ops, `map-entries` |

### Callback Signature Convention

All callbacks receive `(value, key)` consistently:

| Collection | map | filter | fold |
|------------|-----|--------|------|
| Array | `(v, i) → u` | `(v, i) → bool` | `(acc, v, i) → acc` |
| Object | `(v, k) → u` | `(v, k) → bool` | `(acc, v, k) → acc` |
| Map | `(v, k) → u` | `(v, k) → bool` | `(acc, v, k) → acc` |
| Set | `(v) → u` | `(v) → bool` | `(acc, v) → acc` |

Value always first. Key/index second. Consistent.

### Universal Operations

These work on all collection types:

#### `map`

Transforms values, preserves structure and keys.

```lisp
(map [1 2 3] #(* % 2))
;; → [2, 4, 6]

(map {a 1 b 2} #(* % 10))
;; → {a: 10, b: 20}

(map (new Map [[:x 1] [:y 2]]) #(+ % 100))
;; → Map {:x 101, :y 102}

(map (new Set [1 2 3]) #(* % 2))
;; → Set {2, 4, 6}
```

#### `filter`

Selects elements matching predicate.

```lisp
(filter [1 2 3 4 5] #(> % 2))
;; → [3, 4, 5]

(filter {a 1 b 2 c 3} #(> % 1))
;; → {b: 2, c: 3}
```

#### `fold`

Reduces to single value.

```lisp
(fold [1 2 3] 0 #(+ %1 %2))
;; → 6

(fold {a 1 b 2 c 3} 0 #(+ %1 %2))
;; → 6
```

#### `some` / `every`

```lisp
(some [1 2 3] #(> % 2))   ;; true
(every [1 2 3] #(> % 0))  ;; true
```

#### `find`

```lisp
(find [1 2 3 4] #(> % 2))
;; → 3
```

### Object-Specific Operations

Objects support key transformation with **last-write-wins** on collision.

#### `map-vals`

Transform values only. Keys preserved.

```lisp
(map-vals {a 1 b 2} #(* % 10))
;; → {a: 10, b: 20}
```

#### `map-keys`

Transform keys only. Values preserved.

```lisp
(map-keys {a 1 b 2} upper)
;; → {A: 1, B: 2}

;; Collision: last write wins
(map-keys {foo 1 FOO 2} lower)
;; → {foo: 2}
```

#### `map-entries`

Transform both keys and values. Returns `[newKey, newValue]`.

```lisp
(map-entries {a 1 b 2} 
  (fn (v k) [(upper k) (* v 10)]))
;; → {A: 10, B: 20}
```

### Path Operations

#### `get-in`

Nested access with optional default.

```lisp
(set! data {user {profile {name "Alice"}}})

(get-in data [:user :profile :name])
;; → "Alice"

(get-in data [:user :missing :deep] "default")
;; → "default"
```

#### `set-in` / `set-in!`

Nested update (immutable/mutable).

```lisp
;; Immutable
(set-in data [:user :profile :name] "Bob")
;; → new object, original unchanged

;; Mutable
(set-in! data [:user :profile :name] "Bob")
;; → same object, modified
```

#### `update-in` / `update-in!`

Nested update with function.

```lisp
(update-in data [:user :profile :age] inc)
```

### Object Utilities

```lisp
(keys {a 1 b 2})        ;; → ["a", "b"]
(vals {a 1 b 2})        ;; → [1, 2]
(entries {a 1 b 2})     ;; → [["a", 1], ["b", 2]]

(pick {a 1 b 2 c 3} [:a :c])  ;; → {a: 1, c: 3}
(omit {a 1 b 2 c 3} [:b])     ;; → {a: 1, c: 3}

(merge {a 1} {b 2} {c 3})     ;; → {a: 1, b: 2, c: 3}
```

### Array Operations

```lisp
;; Immutable
(push arr x)            ;; → new array with x appended
(pop arr)               ;; → new array without last element
(prepend arr x)         ;; → new array with x at front
(concat arr1 arr2)      ;; → new combined array
(slice arr start end)   ;; → new sub-array
(sort-by arr f)         ;; → new sorted array
(reverse arr)           ;; → new reversed array

;; Mutable
(push! arr x)           ;; mutates, returns arr
(pop! arr)              ;; mutates, returns arr
(sort-by! arr f)        ;; mutates, returns arr
(reverse! arr)          ;; mutates, returns arr
```

### Grouping

```lisp
(set! users [{name "Alice" dept "eng"}
            {name "Bob" dept "sales"}
            {name "Carol" dept "eng"}])

(group-by users #%.dept)
;; → {eng: [{...}, {...}], sales: [{...}]}

(partition [1 2 3 4 5] #(> % 3))
;; → [[4, 5], [1, 2, 3]]
```

### Conversion

```lisp
(to-array (new Set [1 2 3]))    ;; → [1, 2, 3]
(to-set [1 2 2 3])              ;; → Set {1, 2, 3}
(to-map {a 1 b 2})              ;; → Map {:a 1, :b 2}
(to-object (new Map ...))       ;; → plain object
(from-entries [[:a 1] [:b 2]])  ;; → {a: 1, b: 2}
```

### Utilities

```lisp
(clone obj)             ;; deep clone (lodash cloneDeep)
(shallow-clone obj)     ;; shallow copy

(empty? [])             ;; true
(empty? {})             ;; true

(count [1 2 3])         ;; 3
(count {a 1 b 2})       ;; 2
```

---

## Complete Example

### TypeScript (Verbose)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  department: string;
}

const users: Record<string, User> = { /* ... */ };

// Get active users' emails grouped by department
const emailsByDept = Object.fromEntries(
  Object.entries(
    Object.entries(users)
      .filter(([_, u]) => u.active)
      .reduce((acc, [_, u]) => {
        const dept = u.department;
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(u.email);
        return acc;
      }, {} as Record<string, string[]>)
  ).map(([dept, emails]) => [dept, emails.sort()])
);
```

### T2lang (Clean)

```lisp
(set!class User
  (fields
    (id String)
    (name String)
    (email String)
    (active Boolean)
    (department String)))

(set! users : (Record String User) ...)

;; Get active users' emails grouped by department
(set! emails-by-dept
  (-> users
      (filter #%.active)
      vals
      (group-by #%.department)
      (map-vals #(-> % (map #%.email) sort))))
```

---

## Implementation Notes

### Generated TypeScript

T2lang emits clean, readable TypeScript:

```lisp
;; T2lang
(-> users
    (filter #%.active)
    (map #%.name))
```

```typescript
// Generated TypeScript
import { filter, map } from 't2/collections';

map(filter(users, (x) => x.active), (x) => x.name)
```

### Bundle Size

For tree-shaking, import specific lodash functions:

```typescript
// Good - tree-shakeable
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

// Bad - imports entire lodash
import _ from 'lodash';
```

### TypeScript Interop

Generated code is fully typed via TypeScript overloads:

```typescript
// t2/collections.ts
export function map<A, B>(coll: A[], f: (v: A, i: number) => B): B[];
export function map<K, V, U>(coll: Map<K, V>, f: (v: V, k: K) => U): Map<K, U>;
export function map<A, B>(coll: Set<A>, f: (v: A) => B): Set<B>;
export function map<K extends string, V, U>(coll: Record<K, V>, f: (v: V, k: K) => U): Record<K, U>;
```

TypeScript's overload resolution selects the correct signature.

---

## API Quick Reference

### Operators

| Operator | Meaning |
|----------|---------|
| `=` | Assignment |
| `==` | Reference equality |
| `!=` | Reference inequality |
| `?=` | Deep structural equality |
| `?!=` | Deep structural inequality |
| `<` `>` `<=` `>=` | Comparison |
| `and` `or` `not` | Logical |

### Collections

| Function | Types | Notes |
|----------|-------|-------|
| `map` | All | Preserves keys |
| `filter` | All | |
| `fold` | All | |
| `some` | All | |
| `every` | All | |
| `find` | All | |
| `map-vals` | Object | |
| `map-keys` | Object | Last-write-wins |
| `map-entries` | Object | Last-write-wins |
| `get-in` | Object | Safe nested access |
| `set-in` / `set-in!` | Object | Immutable/mutable |
| `update-in` / `update-in!` | Object | Immutable/mutable |
| `keys` | Object, Map | |
| `vals` | Object, Map | |
| `pick` | Object | |
| `omit` | Object | |
| `merge` / `merge!` | Object | |
| `group-by` | Array | |
| `partition` | All | |
| `push` / `push!` | Array | |
| `pop` / `pop!` | Array | |
| `sort-by` / `sort-by!` | Array | |
| `reverse` / `reverse!` | Array | |
| `clone` | All | Deep clone |
| `empty?` | All | |
| `count` | All | |

### Macros

| Macro | Purpose |
|-------|---------|
| `->` | Thread-first pipeline |
| `->>` | Thread-last pipeline |
| `#` | Lambda shorthand |
| `?.` | Safe navigation |
| `??` | Nil coalesce |
| `defclass` | Class definition |

### Object Literal Syntax

| Syntax | Meaning | Expands To |
|--------|---------|------------|
| `{k v}` | Basic key-value | `{ k: v }` |
| `{k}` | Punning | `{ k: k }` |
| `{...x}` | Spread | `{ ...x }` |
| `{k? v}` | Optional key | `...(v != null ? { k: v } : {})` |
| `{k?}` | Optional punned | `...(k != null ? { k } : {})` |
| `{(when c k v)}` | Conditional block | `...(c ? { k: v } : {})` |
| `{[expr] v}` | Computed key | `{ [expr]: v }` |

---

## Future Considerations

### Potential Additions (v0.2+)

- `zip` - Combine collections
- `flatten` / `flat-map` - Nested handling  
- `distinct` / `uniq` - Remove duplicates
- `take` / `drop` / `take-while` - Subsequences
- `interleave` / `interpose` - Sequence building
- Pattern matching syntax

### Explicitly Not Planned

- Custom protocol/trait system
- Lazy sequences
- Transducers
- Changes to async/await
- Changes to null/undefined
- Custom numeric types

---

## Appendix A: Phase A Grammar Reference

See [GRAMMAR.md](./GRAMMAR.md) for the complete Phase A (core) grammar.

## Appendix B: Phase B Macro System

See [MACROS.md](./MACROS.md) for the macro system specification.

---

*End of specification.*
