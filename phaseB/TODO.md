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
- [x] **Expander**: Recursive function that traverses AST-B.
    - Input: AST-B (potential macros, sugar)
    - Output: AST-A (canonical Phase A nodes)
    - If head of list is a macro, invoke it.
- [x] **Quasiquote Expansion**: Implement the logic to transform `` `(a ~b) `` into list construction code `(list 'a b)`.
- [x] **GenSym**: Implement hygienic symbol generation.

## 4. Syntactic Sugar (Rewrites)
- [x] Rewrite `(obj.method ...)` -> `(call (prop obj "method") ...)`
- [x] Rewrite `obj.prop` -> `(prop obj "prop")`
- [x] **Assignment**: Rewrite `(:= ...)` to `(assign ...)`
- [x] Rewrite `let`/`const` parallel bindings into `let*`/`const*`

## 5. Normalization
- [x] Ensure all output from Phase B is strictly compliant with Phase A AST types.
- [s] Validation pass before handing off to Phase A compiler.
- Normalization Plan
    - [x] Build a lower.ts (or similarly named) stage that runs after macro expansion/sugar and walks the Phase B AST, transforming every node into the Phase A classes defined in phaseA0.ts (e.g., Identifier, CallExpr, LetStarExpr, t:* nodes) or reporting diagnostics when a structure can’t be lowered.
    - [x] Use typeAnnotationUtils when you translate let/const bindings or fn params so each binding’s annotation is already in (t:…) form before it hits the Phase A constructors; ensure the lowerer reuses those t:* constructors rather than re-parsing raw reader tokens.
    - [x] Add tests that take a Phase B AST, run it through lower.ts, and assert the result matches the Phase A AST schema (e.g., bindings produce LetStarExpr, assign nodes become AssignExpr, no sugar forms remain).
    - [x] Hook the pass into the CLI pipeline so phaseB’s parsePhaseB exports the normalized Phase A AST (and update index.ts accordingly) — this enforces the TODO’s “strict compliance” requirement before handing the tree to Phase A.

## 6. CLI Integration
- [x] Update `t2tc` et. al. CLI to support running Phase B -> Phase A.

- [x] Define `t:*` type AST nodes in Phase A (see `phaseA/TYPES.md`).
- [x] Implement type expression parser in the Phase B reader.
- [x] Implement type sugar rewrites (generics, unions, tuples, mapped types, etc.).
    - [x] Add type annotation support to `fn`, `let*`, and `const*` forms.
    - [x] Validate type node structure before handing the AST to Phase A.

## 8. Error Handling Infrastructure
- [x] Define `SourceLoc` and `ExpansionFrame` types (see src/location.ts)
- [x] Attach source locations in reader
- [x] Propagate expansion stack in macro expander (done in expander.ts)
- [x] Implement error code registry
- [x] Implement error formatter (TTY, JSON, short)
- [x] Add `--error-format` CLI flag
- [ ] Test error messages for all categories

## 9. Open Design Decisions
- [ ] Specify infix operator precedence table (see SUGAR.md Section 2)
- [ ] Define macro execution sandbox boundaries (see MACROS.md)

## 10. architecture review

- [ ] Implement reader macros — Required for any macro system to work.
- Implement sugar rewrites — The OLD/phase1 sugarRewrite.ts can be used as guidance for reimplementing these features in phase B:
    - [ ] Assignment (:=)
    - [ ] Dotted identifier → prop chains
    - [ ] let/const single-binding sugar
    - [ ] Type annotation parsing
- [ ] Separate reader from rewriter — Keep reader.ts focused on tokenization and S-expr construction. Create a new rewriter.ts for sugar transforms.
- Create expander.ts — Dedicated macro expansion module with:
    - [ ] MacroRegistry class
    - [ ] expand(node, registry) function
    - [ ] gensym(prefix) function
    - [ ] Depth limiting
- Create lower.ts — Transform Phase B nodes to Phase A:
    - [ ] Remove all sugar
    - [ ] Validate structure
    - [ ] Produce canonical AST
- Test Coverage (ongoing, requires adding new tests incrementally)
    - last done as of git sha 89fe8dea72951c059b4b8d987fcbdacc86d7603f
    - [ ] All existing error codes. Context: any time a new error code is added to the registry, add a test for the situation in which it arises.
    - [ ] Reader macros (covered by tests/reader.test.ts)
    - [ ] Dotted identifiers (covered by reader.test.ts + rewriter.test.ts cases for multi-part access and invalid identifiers)
    - [ ] Type annotations (covered by the comprehensive sugar tests that assert each t:* form)
    - [ ] Sugar rewrites (covered by rewriter.test.ts and sugar.test.ts)
    - [ ] Macro expansion (covered by tests/expander.test.ts and macroRegistry tests)
    - [ ] Integration with Phase A (covered by cli-debug.test.ts which runs phaseB CLI -> Phase A)
