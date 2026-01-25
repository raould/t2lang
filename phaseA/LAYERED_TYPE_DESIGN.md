# Layered Type Design in a Compiler

This document explains the design rationale for how types are structured across
compiler layers (A0, A1, A2, etc.) where each layer builds upon the previous one.

## 1. The Problem: A Concrete Example

Consider a simple `FunctionExpr` type across two layers:

```typescript
// Layer A0 - Core runtime calculus
namespace A0 {
  export interface FunctionExpr {
    type: "fn";
    signature: FnSignature;
    body: Statement[];
    span: Span;
  }
  
  export type Statement = FunctionExpr | IfStmt | LetStmt | ...;
}

// Layer A1 - TypeScript bridge (adds async, generators, imports, etc.)
namespace A1 {
  export interface FunctionExpr {
    type: "fn";
    signature: FnSignature;  // A1.FnSignature (has type annotations)
    body: Statement[];       // A1.Statement (includes ImportStmt, etc.)
    span: Span;
    async?: boolean;         // new in A1
    generator?: boolean;     // new in A1
  }
  
  export type Statement = FunctionExpr | IfStmt | LetStmt | ImportStmt | ...;
}
```

At first glance, these look nearly identical. The instinct is to share code:

```typescript
// Tempting but problematic
interface A1.FunctionExpr extends A0.FunctionExpr {
  async?: boolean;
  generator?: boolean;
}
```

But this doesn't work. A1's `FunctionExpr` needs its `body` field to contain
`A1.Statement[]`, not `A0.Statement[]`. The types *look* similar but are
fundamentally different.

## 2. Why This Is Hard: The Core Challenges

### Self-Reference

AST types are deeply self-referential. A `FunctionExpr` contains `Statement[]`,
and `Statement` is a union that includes `FunctionExpr`. When A1 adds new
statement types (like `ImportStmt`), this change must propagate through every
type that references `Statement`.

### The Narrowing Problem

Object-oriented inheritance allows narrowing return types but not field types:

```typescript
interface A0.FunctionExpr {
  body: A0.Statement[];
}

interface A1.FunctionExpr extends A0.FunctionExpr {
  body: A1.Statement[];  // ERROR: Type 'A1.Statement[]' is not assignable
}
```

This restriction exists for good reason. If allowed:

```typescript
const a1Fn: A1.FunctionExpr = { body: [importStmt] };
const a0Fn: A0.FunctionExpr = a1Fn;  // If this worked...
a0Fn.body.push(someA0OnlyStatement);  // ...this would corrupt a1Fn
```

### Inheritance vs. Composition vs. Embedding

| Approach | Problem for our use case |
|----------|--------------------------|
| Inheritance (`extends`) | Can't change field types |
| Composition (`base: A0.FnExpr`) | Awkward access patterns, extra nesting |
| Delegation | Adds runtime overhead, doesn't solve type issues |
| Embedding (like Go) | TypeScript doesn't have it |

### Behavior vs. Data

Classes work well for sharing behavior (methods) via inheritance. But AST nodes
are primarily *data*. We need to vary the *types of fields*, not override
methods. This is exactly backwards from what OO inheritance provides.

## 3. Why Generics Fail: Parameter Explosion

The natural instinct is to parameterize:

```typescript
interface FunctionExpr<TStatement> {
  type: "fn";
  body: TStatement[];
}

type A0FunctionExpr = FunctionExpr<A0.Statement>;
type A1FunctionExpr = FunctionExpr<A1.Statement>;
```

This works for one type. But AST types reference *each other*:

```typescript
interface FunctionExpr<TStatement, TExpr, TBinding, TSignature> {
  signature: TSignature;
  body: TStatement[];
}

interface LetStmt<TStatement, TExpr, TBinding, TSignature> {
  bindings: TBinding[];
  body: TStatement[];
}

interface Binding<TStatement, TExpr, TBinding, TSignature> {
  target: TBindingTarget;  // Need another parameter!
  init?: TExpr;
}

// Every type needs every parameter, threaded everywhere
type Statement<TStmt, TExpr, TBinding, TSignature, TBindingTarget> = 
  | FunctionExpr<TStmt, TExpr, TBinding, TSignature>
  | LetStmt<TStmt, TExpr, TBinding, TSignature>
  | ...;
```

The parameters explode. Every type must carry every parameter, even if it
doesn't directly use them, because it might contain something that does.

## 4. OCaml's Solution: Functors

OCaml has *functors*: modules parameterized by other modules.

```ocaml
module type LAYER = sig
  type binding_target
  type expr  
  type stmt
end

module MakeAST (L : LAYER) = struct
  type fn_expr = {
    body : L.stmt list;  (* References the LAYER's stmt type *)
  }
  
  type stmt =
    | FnExpr of fn_expr
    | IfStmt of ...
    (* All types in this module are coherent *)
end

module A0 = MakeAST(struct
  type binding_target = identifier
  type expr = ...
  type stmt = ...  
end)

module A1 = MakeAST(struct
  type binding_target = identifier | array_pattern
  type expr = A0.expr | spread | await
  type stmt = A0.stmt | import_stmt
end)
```

The key insight: types are defined *once* inside the functor, but they all
reference the module parameter. When you instantiate with different parameters,
you get a coherent set of types that all reference each other correctly.

TypeScript has no equivalent. You can parameterize *types* but not *modules*.

## 5. Go's Solution: Struct Embedding

Go sidesteps the problem with struct embedding:

```go
// A0
type FunctionExpr struct {
    Type      string
    Signature FnSignature
    Body      []Statement
    Span      Span
}

// A1 - embed A0's fields, add new ones
type FunctionExpr struct {
    a0.FunctionExpr           // All fields are "inlined"
    Async     bool
    Generator bool
}

// Access is flat:
fn.Signature  // works - promoted from embedded struct
fn.Async      // works - A1's own field
```

Crucially, **embedding is not inheritance**. `A1.FunctionExpr` is not a subtype
of `A0.FunctionExpr`. They are unrelated types that happen to share field names.
There's no substitutability, and that's fine.

## 6. TypeScript's Limitations

TypeScript lacks both functors and struct embedding. The available tools:

| Feature | Limitation |
|---------|------------|
| `extends` (interfaces) | Can't change field types |
| `&` (intersection) | Can combine, but creates messy union types with conflicts |
| `Omit<T, K>` | Works but produces hard-to-read types |
| Generics | Parameter explosion (see above) |
| Classes | Can't have type members that depend on class type params |

None of these cleanly solve "same structure, different internal types."

## 7. The Dog vs. Table Insight

Consider:

```typescript
interface Dog { legs: number }
interface Table { legs: number }
```

Would you extract a shared base type for `legs`? No. Dogs and tables are
unrelated concepts that happen to share a field name.

Similarly:

```typescript
// A0
interface FnExpr { body: Statement[] }  // A0.Statement[]

// A1
interface FnExpr { body: Statement[] }  // A1.Statement[] - DIFFERENT TYPE
```

These are not "the same type with some additions." They are **different types**
that happen to have similar field names. The `Statement` in each refers to a
different union.

The apparent duplication is *semantic honesty*, not a DRY violation.

## 8. Language Comparison: Which Languages Handle This Well?

Different programming languages have different dominant paradigms that make them
more or less suited to this "layered AST" problem. The key capability needed is
**parameterizing over a coherent family of mutually-recursive types**.

### Well-Suited Languages

| Language | Why It Works |
|----------|--------------|
| **OCaml** | First-class functors allow modules parameterized by other modules. Types within a functor can reference each other coherently. This is the gold standard for this problem. |
| **Haskell** | Type families and associated types let you define type-level functions. A type class can bundle related types that vary together. Less ergonomic than OCaml functors but expressively equivalent. |
| **Scala** | Path-dependent types and abstract type members allow a class/trait to define types that vary together. `trait Layer { type Stmt; type Expr; type Binding }` with concrete implementations gives functor-like behavior. |

These languages share a common trait: they have mechanisms for **abstract type
members** or **module-level parameterization** that allow a family of types to
vary together while maintaining internal coherence.

### Poorly-Suited Languages

| Language | Why It Struggles |
|----------|------------------|
| **TypeScript** | Generics parameterize types, not modules. No abstract type members. Structural typing helps in some cases but can't solve the core problem. |
| **Java** | Generics with erasure, no type members, no higher-kinded types. Can simulate with verbose factory patterns but it's painful. |
| **C++** | Templates are powerful but optimized for monomorphization, not type families. Can approximate with CRTP but very complex and error-prone. |
| **Python** | Dynamic typing sidesteps the problem entirely - you don't declare field types. But you lose static verification that layers are coherent. |
| **Ruby** | Same as Python - duck typing means no declared types to vary. |
| **Go** | No generics until recently, no type members. Struct embedding helps with field reuse but doesn't solve the type coherence problem. Interfaces are implicit but can't bundle type families. |

These languages either lack the type system features entirely, or have generics
that parameterize individual types rather than families of types.

### Summary Table

| Language | Paradigm | Module/Type Parameterization | Verdict |
|----------|----------|------------------------------|---------|
| OCaml | ML/Functional | Functors | ✅ Excellent |
| Haskell | Functional | Type families, associated types | ✅ Excellent |
| Scala | Hybrid OO/FP | Path-dependent types, type members | ✅ Good |
| C++ | Multi-paradigm | Templates (CRTP) | ⚠️ Possible but complex |
| TypeScript | OO/Structural | Generics only | ❌ Poor |
| Java | OO/Nominal | Generics only (with erasure) | ❌ Poor |
| Go | Procedural/Structural | Generics (recent), embedding | ❌ Poor |
| Python | Dynamic/OO | N/A (dynamic typing) | ➖ Sidesteps problem |
| Ruby | Dynamic/OO | N/A (dynamic typing) | ➖ Sidesteps problem |

### The Pattern

Languages in the **ML family** (OCaml, Haskell, and to some extent Scala) were
designed with compiler construction as a primary use case. It's no accident they
handle AST manipulation elegantly - that's what they were built for.

Languages in the **mainstream OO family** (Java, TypeScript, C++) were designed
for modeling business domains with class hierarchies where substitutability
matters. The "family of types that vary together" pattern doesn't fit their
inheritance model.

**Dynamic languages** (Python, Ruby) don't have this problem because they don't
have the types in the first place. You trade static verification for flexibility.

### A Stronger Claim: ML Languages Are Strictly More Expressive

One could argue that the "well-suited" vs "poorly-suited" framing is too
charitable to OO languages. The ML family is arguably **strictly more capable**:

1. **ML has what OO lacks**: Functors, type families, and abstract type members
   solve the "family of types" problem that OO cannot express cleanly.

2. **ML can emulate OO when needed**: The let-over-lambda pattern (closures over
   mutable state) can implement objects, classes, and inheritance. An object is
   just a record of closures sharing a common environment.

```ocaml
(* OO-style "object" via let-over-lambda *)
let make_counter () =
  let state = ref 0 in
  object
    method get = !state
    method increment = state := !state + 1
  end
```

So ML languages can do everything OO languages can do (via closures and records),
**plus** they can do things OO languages cannot (module-level parameterization).

This suggests that for problems like compiler construction - where you need both
type flexibility *and* occasionally OO-style encapsulation - ML languages are
the better tool. The reverse is not true: you cannot easily recover functors
from a language that only has classes and generics.

The choice of TypeScript (or Java, or C++) for a compiler is a pragmatic one
based on ecosystem, team familiarity, and tooling - not because these languages
are well-suited to the problem domain.

## 9. Conclusion: The Recommended Approach

Each layer defines its own complete, self-contained set of types:

```typescript
namespace A0 {
  export interface FunctionExpr {
    type: "fn";
    signature: FnSignature;
    body: Statement[];
    span: Span;
  }
  
  export type Statement = FunctionExpr | IfStmt | LetStmt;
}

namespace A1 {
  // Re-export unchanged types from A0
  export type Span = A0.Span;
  export type Identifier = A0.Identifier;
  export type Literal = A0.Literal;
  
  /**
   * Conceptual expansion of A0.FunctionExpr with:
   * - async, generator fields  
   * - signature uses A1.FnSignature (with type annotations)
   * - body uses A1.Statement (includes imports, exports, etc.)
   * @see A0.FunctionExpr
   */
  export interface FunctionExpr {
    type: "fn";
    signature: FnSignature;
    body: Statement[];
    span: Span;
    // -- A1 additions --
    async?: boolean;
    generator?: boolean;
  }
  
  export type Statement = FunctionExpr | IfStmt | LetStmt | ImportStmt | ExportStmt;
}
```

### What This Gives Us

1. **Clarity**: Each layer is self-documenting. Reading `A1.FunctionExpr` shows
   exactly what it contains without chasing generic parameters or inheritance.

2. **Independence**: Layers don't have subtype relationships. A1 code works
   entirely with A1 types; it never passes an A1 node to something expecting A0.

3. **No parameter explosion**: No `<TStmt, TExpr, TBinding, ...>` threading.

4. **Type safety**: The compiler catches if you accidentally mix A0 and A1 types.

### What It Costs

The field declarations are repeated across layers. This is the "Go embedding
tax" - you pay it in lines of code, but gain clarity and independence.

### The Key Insight

What looks like duplication is actually precision. `A0.FunctionExpr` and
`A1.FunctionExpr` are **different types** that describe **different data
structures**. Defining them independently reflects this truth.

The DRY principle warns against duplicating *logic*. These type definitions
aren't logic - they're specifications of distinct data shapes that happen to
share field names.
