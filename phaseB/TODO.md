# Phase B Implementation Plan

## 1. Project Setup
- [ ] Initialize `phaseB/package.json`
- [ ] Initialize `phaseB/tsconfig.json` (reference common or Copy phaseA's config)
- [ ] Set up `eslint` and test runner infrastructure.

## 2. Core Infrastructure
- [ ] **AST Definitions**: Define the "Surface AST" (AST-B) which includes sugar nodes that don't exist in Phase A (e.g. `MacroDef`, `InfixExpr` if we allow mixed trees).
- [ ] **Parser (Reader)**: Implement a reader that produces S-expressions (or AST-B nodes) from text.
    - Needs to handle dotted identifiers at the token level or post-process them.
    - Needs to support `'(...)`, `` `(...) ``, `~expr`, `~@expr` reader macros.

## 3. Macro System
- [ ] **Macro Registry**: Storage for `defmacro` definitions.
- [ ] **Expander**: Recursive function that traverses AST-B.
    - Input: AST-B (potential macros, sugar)
    - Output: AST-A (canonical Phase A nodes)
    - If head of list is a macro, invoke it.
- [ ] **Quasiquote Expansion**: Implement the logic to transform `` `(a ~b) `` into list construction code `(list 'a b)`.
- [ ] **GenSym**: Implement hygienic symbol generation.

## 4. Syntactic Sugar (Rewrites)
- [ ] **Assignment**: Rewrite `(:= ...)` to `(assign ...)`
- [ ] **Dot Notation**: 
    - Rewrite `(obj.method ...)` -> `(call (prop obj "method") ...)`
    - Rewrite `obj.prop` -> `(prop obj "prop")`
- [ ] **Type Syntax**: Parse `(x: type)` sugar into `(x (type-ref ...))`.

## 5. Normalization
- [ ] Ensure all output from Phase B is strictly compliant with Phase A AST types.
- [ ] Validation pass before handing off to Phase A compiler.

## 6. CLI Integration
- [ ] Update `t2` CLI to support running Phase B -> Phase A.

## 7. Type System Infrastructure
- [ ] Define `t:*` type AST nodes in Phase A (see `phaseA/TYPES.md`).
- [ ] Implement type expression parser in the Phase B reader.
- [ ] Implement type sugar rewrites (generics, unions, tuples, mapped types, etc.).
- [ ] Add type annotation support to `fn`, `let*`, and `const*` forms.
- [ ] Validate type node structure before handing the AST to Phase A.

## 8. Error Handling Infrastructure
- [ ] Define `SourceLoc` and `ExpansionFrame` types
- [ ] Attach source locations in reader
- [ ] Propagate expansion stack in macro expander
- [ ] Implement error code registry
- [ ] Implement error formatter (TTY, JSON, short)
- [ ] Add `--error-format` CLI flag
- [ ] Test error messages for all categories
