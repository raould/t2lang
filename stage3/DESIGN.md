# Stage 3 overview

* Add missing TS features:
    - types
    - generics
    - classes
    - objects
    - arrays
    - Symbol
    - const
    - indexing
    - optional chaining
    - ternary
    - switch
    - loops
    - import/export
    - runtime library

## See also

TYPE_DESIGN.md

## Stage 3A - dotted access et. al.

    - [x] ternary (requires both branches)
    - [x] string concatenation
    - [x] indexing: arrays, objects.
    - [x] real property access via AST.

## Stage 3B

- trying to convert as much `(raw ...)` into t2lang syntax.

Add:
    - [x] cond (expression not statement; multi predicate per Clojure clojuredocs.org/clojure.core/cond)
    - [x] new statement.
    - [x] throw statement.
    - [x] import statement.
    - [x] remove '(raw ...)` support.

## Stage 3C — Data Model Foundations

Add:
    - [x] optional chaining; null coalescing.
    - [x] switch/case/default.
    - [x] looping constructs: for; for‑in; for‑of

Meh:
    - [ ] Map / Set
    - [ ] Symbol

## Stage 3D — Type System Foundations

Add:
    - [x] type annotations: let, const, callable signatures.
    - [x] type aliases
    - [x] generics
    - [x] type assertions ("casting")
    - [x] split the single compiler file into stages & categories.

## Stage 3E — Object System

Add:
    - [x] classes
    - [x] fields
    - [x] methods
    - [x] getters/setters
    
## Stage 3F — Module System

Add:
    - [x] import/export
    - [x] module boundaries
    - [ ] runtime library organization: postponed!

## Stage 4: macros and sugar.
Add:
    - [ ] macros!!!!!!!!!!!!!!!!!! my dude.
    - [ ] reader macros!!!
    - [ ] sugar!!!
    - [ ] sugar for object literals with arbitrary keys
    - [ ] sugar for array literals
