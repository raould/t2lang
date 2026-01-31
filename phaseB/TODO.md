# Phase B Implementation Plan

## 1. Project Setup
- [x] Initialize `phaseB/package.json`
- [x] Initialize `phaseB/tsconfig.json` (reference common or Copy phaseA's config)
- [x] Set up `eslint` and test runner infrastructure.

## 1.5 Tests

- [x] create `phaseB/tests`
- [ ] run all tests after making code chagnes, fix any errors.
- [ ] iteratively create new tests for any new functionalty.

## 2. Core Infrastructure
- [x] **AST Definitions**: Define the "Surface AST" (AST-B) which includes sugar nodes that don't exist in Phase A (e.g. `MacroDef`, `InfixExpr` if we allow mixed trees).
- [x] **Parser (Reader)**: Implement a reader that produces S-expressions (or AST-B nodes) from text.
    - Needs to handle dotted identifiers at the token level or post-process them.
    - Needs to support `'(...)`, `` `(...) ``, `~expr`, `~@expr` reader macros.

## 3. Macro System
- [x] **Macro Registry**: Storage for `defmacro` definitions.
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
- [ ] **Parallel `let`/`const`**: Expand to `let*`/`const*` with temporary `gensym` bindings before reassigning targets.

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
- [x] Implement error code registry
- [x] Implement error formatter (TTY, JSON, short)
- [x] Add `--error-format` CLI flag
- [ ] Test error messages for all categories

## 9. Open Design Decisions
- [ ] Specify infix operator precedence table (see SUGAR.md Section 2)
- [ ] Define macro execution sandbox boundaries (see MACROS.md)

## 10. architecture review

- Implement reader macros — Required for any macro system to work.
- Implement sugar rewrites — The OLD/phase1 sugarRewrite.ts can be used as guidance for reimplementing these features in phase B:
    Assignment (:=)
    Dotted identifier → prop chains
    let/const single-binding sugar
    Type annotation parsing
- Separate reader from rewriter — Keep reader.ts focused on tokenization and S-expr construction. Create a new rewriter.ts for sugar transforms.
- Create expander.ts — Dedicated macro expansion module with:
    MacroRegistry class
    expand(node, registry) function
    gensym(prefix) function
    Depth limiting
- Create lower.ts — Transform Phase B nodes to Phase A:
    Remove all sugar
    Validate structure
    Produce canonical AST
- Test Coverage
    - All error codes (E001-E007)
    - Reader macros
    - Dotted identifiers (edge cases)
    - Type annotations
    - Sugar rewrites
    - Macro expansion
    - Integration with Phase A
