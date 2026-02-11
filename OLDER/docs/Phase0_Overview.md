Phase 0 Overview  
\================

Phase 0 is a minimal, explicit, constructor‑based core calculus that forms the foundation of a larger language ecosystem. It is intentionally small, orthogonal, and free of syntactic sugar. Every construct in Phase 0 corresponds directly to a well‑defined AST node, and every AST node has a clear, unambiguous meaning.

Phase 0 is not intended to be written by hand. Instead, it serves as:

* a core calculus  
* a desugaring target for higher‑level phases  
* a stable IR for tooling  
* a precise semantic foundation for the language

Phase 1 and later phases will introduce ergonomic syntax, generics, spread, operator notation, destructuring, template literals, and other conveniences. Phase 0 remains the minimal substrate beneath them.

## **Design Goals**

### **Explicitness**

Every construct is spelled out. There is no implicit behavior, no operator precedence, no grouping, and no syntactic shortcuts.

### **Minimality**

Phase 0 includes only the constructs necessary to express:

* control flow  
* functions  
* classes  
* modules  
* basic types  
* object and array literals  
* property access  
* function calls  
* type annotations

Everything else is sugar for later phases.

### **Orthogonality**

Each construct does exactly one thing. There are no overlapping features, no historical quirks, and no redundant syntax.

### **Predictability**

Phase 0 is designed to be easy to compile, easy to analyze, and easy to reason about formally.

### **Extensibility**

Phase 1 can add:

* spread  
* template literals  
* operator syntax  
* generics  
* tuple types  
* optional chaining  
* destructuring  
* enums  
* interfaces  
* JSX  
* and more

…all as pure sugar over Phase 0.

## **What Phase 0 Is Not**

Phase 0 is not:

* a user‑facing language  
* a full TypeScript replacement  
* a syntax‑rich language  
* a place for convenience features  
* a place for historical JS quirks

It is the core calculus beneath a larger language.

## **Summary of Key Features**

### **Included**

* constructor‑based syntax  
* explicit expression statements  
* blocks, if, while, for, return  
* functions and classes  
* imports and exports  
* arrays and objects  
* property access  
* function calls  
* new expressions  
* a minimal structural type system  
* type aliases  
* type assertions

### **Excluded**

* generics  
* interfaces  
* enums  
* spread  
* template literals  
* operator syntax  
* destructuring  
* tuples  
* exotic primitives  
* implicit expression statements  
* empty statements  
* labeled statements  
* `with`  
* comma operator

