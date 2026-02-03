* check all other TODO files.
* compare all this with actual typescript docs
    * e.g. https://www.typescriptlang.org/docs/handbook/2/classes.html
* fix use of relative paths in the compiler implementation.
* all the fn signature variations ad nauseam (Phase B)
    * including ":"
* are snapshots really happening per-stage?
* should we support enableTsc in Phase A or Phase B?
* revisit `(return value)`, the whole implicit return and type heuristic again.
* more .t2 examples generated from existing .ts examples, and assert equivalence.
    * e.g. static blocks.

# Critical review

Note: This is, fortunately, somewhat out of date. It needs to be re-generated. (Claude did this.)

## What T2lang Currently Supports

### ✅ Statements (Reasonably Complete)

| Feature | T2 Syntax | Status |
|---------|-----------|--------|
| Variable declarations | `(let* ((x 1)))` / `(const* ((y 2)))` | ✅ Working |
| Block statements | `(block ...)` | ✅ Working |
| If/else | `(if cond then else)` | ✅ Working |
| While loops | `(while cond body)` | ✅ Working |
| For loops (classic) | `(for classic init cond update body)` | ✅ Working |
| For...of | `(for of ((item) iterable) body)` | ✅ Working |
| For...await | `(for await ((item) iterable) body)` | ✅ Working |
| Switch/case | `(switch expr (case v ...) (default ...))` | ✅ Working |
| Return | `(return expr)` | ✅ Working |
| Break/Continue | `(break)` / `(continue)` with optional labels | ✅ Working |
| Throw | `(throw expr)` | ✅ Working |
| Try/catch/finally | `(try body (catch (e) ...) (finally ...))` | ✅ Working |
| Assignment | `(assign target value)` | ✅ Working |

### ✅ Expressions (Reasonably Complete)

| Feature | T2 Syntax | Status |
|---------|-----------|--------|
| Literals | `1`, `"string"`, `true`, `null`, `undefined` | ✅ Working |
| Identifiers | `foo`, `bar` | ✅ Working |
| Function calls | `(call fn arg1 arg2)` | ✅ Working |
| Property access | `(prop obj "key")` | ✅ Working |
| Index access | `(index obj key)` | ✅ Working |
| Array literals | `(array 1 2 3)` | ✅ Working |
| Object literals | `(object ("key" value))` | ✅ Working |
| New expressions | `(new Class args)` | ✅ Working |
| Ternary | `(ternary cond then else)` | ✅ Working |
| Spread | spread expressions in arrays/objects | ✅ Working |
| Await | `(await expr)` | ✅ Working |
| Yield | `(yield expr)` | ✅ Working |
| Type assertions | `(type-assert expr type)` | ✅ Working |

### ✅ Functions (Partial)

| Feature | T2 Syntax | Status |
|---------|-----------|--------|
| Named functions | `(fn name ((param)) body)` | ✅ Working |
| Lambda/arrow functions | `(lambda ((param)) body)` | ✅ Working |
| Methods | `(method "name" ((param)) body)` | ✅ Working |
| Async functions | `(fn async name ...)` | ✅ Working |
| Generator functions | `(fn generator name ...)` | ✅ Working |
| Type parameters on functions | `(fn (typeparams (T)) ...)` | ⚠️ Type aliases only, not function signatures |
| Parameter type annotations | Via Phase B sugar | ⚠️ Partial |
| Return type annotations | Via Phase B sugar | ⚠️ Partial |
| Default parameters | — | ❌ Not documented |
| Rest parameters | `(rest target)` in patterns | ✅ Working |
| Function overloads | — | ❌ Missing |
| `this` parameter | — | ❌ Missing |

### ✅ Classes (Partial - Major Gaps)

| Feature | T2 Syntax | Status |
|---------|-----------|--------|
| Class declaration | `(class Name (class-body ...))` | ✅ Working |
| Extends | `(extends Parent)` | ✅ Working |
| Implements | `(implements Interface1 Interface2)` | ✅ Working |
| Fields with modifiers | `(field public static readonly "x" value)` | ✅ Working |
| Methods | `(method "name" ...)` | ✅ Working |
| Constructor | `(method "constructor" ...)` | ✅ Working |
| Static blocks | — | ⚠️ AST exists, uncertain if fully wired |
| Getters/Setters | — | ❌ **Missing** |
| Private fields (`#field`) | — | ❌ **Missing** |
| Abstract classes | — | ❌ **Missing** |
| Abstract methods | — | ❌ **Missing** |
| Parameter properties | — | ❌ **Missing** |
| Class expressions | AST exists | ⚠️ Uncertain |
| Decorators | AST field exists | ❌ Not implemented in codegen |
| Generic classes | — | ❌ **Missing** |
| Index signatures in classes | — | ❌ **Missing** |
| `override` modifier | — | ❌ **Missing** |

### ✅ Type System (Surprisingly Comprehensive for AST, Incomplete for Semantics)

| Feature | T2 Syntax | Status |
|---------|-----------|--------|
| Primitive types | `type-string`, `type-number`, `type-boolean`, etc. | ✅ Working |
| `any`, `unknown`, `never`, `void` | `type-any`, `type-unknown`, `type-never`, `type-void` | ✅ Working |
| Union types | `(type-union type1 type2)` | ✅ Working |
| Intersection types | `(type-intersection type1 type2)` | ✅ Working |
| Type references | `(type-ref TypeName)` | ✅ Working |
| Function types | `(type-function (params) return)` | ✅ Working |
| Object types | `(type-object ("key" type))` | ✅ Working |
| Array types | `(type-array element)` | ✅ Working |
| Tuple types | `(type-tuple ...)` | ✅ AST exists |
| Literal types | `(type-literal "value1" "value2")` | ✅ Working |
| Type aliases | `(type-alias Name ...)` | ✅ Working |
| Interfaces | `(type-interface Name (interface-body ...))` | ✅ Working |
| Generics (type aliases) | `(type-alias Name (typeparams (T)) ...)` | ✅ Working |
| Type application | `(type-app (type-ref Box) (type-string))` | ✅ Working |
| Mapped types | `(type-mapped (Key) valueType ...)` | ✅ Working |
| Conditional types | `TypeConditional` AST node | ✅ AST exists |
| `keyof` | `TypeKeyof` AST node | ✅ AST exists |
| `typeof` | `TypeTypeof` AST node | ✅ AST exists |
| Indexed access types | `TypeIndexed` AST node | ✅ AST exists |
| `infer` keyword | `TypeInfer` AST node | ✅ AST exists |
| Nullable types | `TypeNullable` AST node | ✅ AST exists |
| Optional/readonly modifiers | In mapped types and type fields | ✅ Working |
| Variance (`in`/`out`) | In `TypeParam` | ✅ AST exists |

**Important caveat**: The type system AST nodes exist and can be emitted, but t2lang does **not** perform type checking. It relies entirely on the TypeScript compiler to validate types after emission.

### ✅ Modules (Basic)

| Feature | T2 Syntax | Status |
|---------|-----------|--------|
| Default import | `(import-default Name "path")` | ✅ Working |
| Named imports | `(import-named ((orig local)) "path")` | ✅ Working |
| Namespace import | `(import-all Alias "path")` | ✅ Working |
| Named exports | `(export identifier)` | ✅ Working |
| Default export | `(export-default expr)` | ✅ Working |
| Re-exports | — | ❌ Missing |
| `import type` | — | ❌ Missing |
| Dynamic imports | — | ❌ Missing |

### ⚠️ Destructuring (Partial)

| Feature | Status |
|---------|--------|
| Array destructuring | `(array-pattern a b (rest c))` ✅ Working |
| Object destructuring | `(object-pattern ("key" target))` ✅ Working |
| Nested destructuring | ✅ Working |
| Default values in destructuring | ❌ Missing |
| Renaming in destructuring | ✅ Working |

---

## What TypeScript Has That T2lang Lacks

### 🔴 Critical Missing Features (Blocks Practical Use)

1. [x] **Getters and Setters**
   ```typescript
   // TypeScript
   class C {
     private _value: number = 0;
     get value() { return this._value; }
     set value(v: number) { this._value = v; }
   }
   ```
   No equivalent in t2lang grammar.

2. [x] **Abstract Classes and Methods**
   ```typescript
   abstract class Animal {
     abstract makeSound(): void;
   }
   ```
   Not supported.

3. [x] **Private Class Fields (`#`)**
   ```typescript
   class C {
     #secret = 42;
   }
   ```
   Not supported.

4. [x] **Function Overloads**
   ```typescript
   function process(x: string): string;
   function process(x: number): number;
   function process(x: string | number) { ... }
   ```
   Not supported.

5. [x] **`this` Parameter**
   ```typescript
   function handler(this: HTMLElement, e: Event) { ... }
   ```
   Not supported.

6. [x] **Enums**
   ```typescript
   enum Direction { Up, Down, Left, Right }
   ```
   No grammar support whatsoever.

7. [x] **Namespaces**
   ```typescript
   namespace Utils {
     export function helper() { ... }
   }
   ```
   Not supported.

8. [x] **Declaration Merging**
   ```typescript
   interface Box { width: number; }
   interface Box { height: number; } // Merges
   ```
   Not supported.

9. [x] **Decorators**
   AST field exists on `ClassExpr` but no codegen or grammar for actual decorator syntax.

10. [x] **String Literal Types & Template Literal Types**
    ```typescript
    type Greeting = `Hello, ${string}!`;
    ```
    Not supported.

### 🟡 Missing but Less Critical

- [ ] `as const` assertions
- [ ] `satisfies` operator  
- [ ] `declare` keyword
- [ ] Ambient declarations
- [ ] Triple-slash directives
- [ ] JSX/TSX support
- [ ] `readonly` arrays (can use mapped types)
- [ ] `never` narrowing and exhaustiveness checking (relies on tsc)

#### Phase A

- [x] Non-null assertion (`!`), Phase A with sugar in Phase B.
- [x] Optional chaining (`?.`) — Phase A call-with-this with sugar in Phase B.
- [x] Nullish coalescing (`??`) — Phase A with sugar in Phase B.

#### Phase B

- [ ] Non-null assertion (`!`), Phase A with sugar in Phase B.
- [ ] Optional chaining (`?.`) — Phase A call-with-this with sugar in Phase B.
- [ ] Nullish coalescing (`??`) — Phase A with sugar in Phase B.

---

## Comparison: TypeScript Classes Handbook vs T2lang

Referencing the TypeScript classes documentation you cited:

| Handbook Topic | T2lang Support |
|----------------|----------------|
| Fields | ✅ Yes |
| Field initializers | ✅ Yes |
| `readonly` fields | ✅ Yes (via modifiers) |
| `--strictPropertyInitialization` | ❌ No (relies on tsc) |
| Constructors | ✅ Yes |
| Constructor overloads | ❌ No |
| Super calls | ✅ Yes (`(call super)`) |
| Methods | ✅ Yes |
| Getters/Setters | ❌ **No** |
| Index signatures | ❌ No |
| `implements` clause | ✅ Yes |
| `extends` clause | ✅ Yes |
| Overriding methods | ⚠️ Works but no `override` keyword |
| `public`/`protected`/`private` | ✅ Yes |
| Static members | ✅ Yes |
| Static blocks | ⚠️ Uncertain |
| Generic classes | ❌ No |
| `this` at runtime (arrow properties) | ⚠️ Can be done manually |
| `this` parameter | ❌ No |
| `this` types | ❌ No |
| `this`-based type guards | ❌ No |
| Parameter properties | ❌ No |
| Class expressions | ⚠️ AST exists |
| `abstract` classes/members | ❌ **No** |

**Summary**: T2lang covers maybe **50-60%** of the TypeScript classes handbook.

---

## Practical Assessment

### Can You Build Real Projects?

**Small scripts and utilities**: Possibly, if you avoid classes with getters/setters, enums, advanced generics, or decorators.

**React/Vue/Angular applications**: No. Lack of JSX, decorators, and many TypeScript features makes this impractical.

**Node.js backends**: Limited. Missing features like function overloads, `this` parameters, and certain module patterns would be problematic.

**Library development**: No. You can't write proper `.d.ts` files or use many patterns expected by TypeScript consumers.

### Developer Experience Concerns

1. **No IDE support beyond syntax highlighting** — The LSP mentioned in the README is "planned" (Phase 1).

2. **No type checking** — T2lang just emits TypeScript and relies on `tsc` for validation. You don't get in-editor feedback until you compile.

3. **Verbose syntax** — The S-expression format is more verbose than TypeScript for many constructs:
   ```typescript
   // TypeScript
   const x = obj.foo.bar;
   
   // T2lang
   (const* ((x (prop (prop obj "foo") "bar"))))
   ```

4. **Learning curve** — Developers need to learn both TypeScript semantics AND S-expression syntax.

5. **Debugging** — Source maps exist, but the mapping between S-expressions and generated TypeScript adds cognitive overhead.

---

## Conclusion

### Strengths

- Clean architectural separation (Phase A/B)
- Surprisingly complete type system AST
- Support for async/await and generators
- Destructuring patterns
- Macro system (Phase B) shows ambition

### Weaknesses

- Missing critical class features (getters, setters, abstract, private fields)
- No enums
- No function overloads
- No decorators (despite AST support)
- No JSX
- No type checking (just emit and hope)
- Very small community (0 stars, 0 forks)
- Clearly AI-generated code structure (`/mnt/user-data/outputs/` paths in repo)

### Verdict

**T2lang is an interesting experiment** but is **not currently useful for practical TypeScript development**. It covers perhaps 40-50% of TypeScript's feature set when you account for both syntax and semantics.
