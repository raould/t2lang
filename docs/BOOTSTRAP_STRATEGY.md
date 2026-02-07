# T2Lang Compiler Bootstrap Strategy

## Overview

This document outlines a strategy to bootstrap a new t2lang compiler written in t2lang itself (`.t2` files), while also using this opportunity to implement a cleaner, strictly staged architecture.

## Current Architecture

The existing TypeScript-based compiler has:

### PhaseB (Frontend Layer)
- **Reader** (`reader.ts`): Tokenizes and parses ergonomic s-expressions
- **Sugar** (`sugar.ts`): Rewrites syntactic sugar (dotted notation, infix ops, etc.)
- **Expander** (`expander.ts`): Macro expansion system
- **Lower** (`lower.ts`): Lowers sugar + macros to canonical PhaseA AST

### PhaseA (Core Compiler Layer)
- **Parse** (`parse.ts`): Parses canonical s-expressions to AST
- **PhaseA0** (`phaseA0.ts`): TypeScript-agnostic minimal calculus (lambda, app, bindings)
- **PhaseA1** (`phaseA1.ts`): TypeScript bridge (types, generics, decorators)
- **Serialization** (`serialization.ts`): AST serialization/deserialization
- **Codegen** (`codegen.ts`): TypeScript code generation

## Bootstrap Strategy: 5-Stage Approach

### Stage 0: Foundation (Current State)
**Status**: Complete ✓
- Full TypeScript compiler exists
- Can compile `.t2` files to `.ts`
- Macro system works
- All tests pass

### Stage 1: Self-Hosting Prerequisites
**Goal**: Identify and implement missing t2lang features needed for self-hosting

**Tasks**:
1. **Feature Gap Analysis**
   - Audit what TypeScript features the compiler uses
   - Document which features t2lang currently supports
   - Identify gaps (e.g., advanced types, namespaces, complex imports)

2. **Implement Missing Features**
   - Add any missing TypeScript constructs to PhaseA grammar
   - Ensure PhaseB can parse and lower them
   - Write tests for each new feature

3. **Standard Library Design**
   - Create a minimal t2lang standard library
   - Include essential utilities (string manipulation, array ops, etc.)
   - Design module system for multi-file programs

**Deliverable**: t2lang can express all patterns used in the compiler itself

### Stage 2: Minimal Bootstrap Kernel
**Goal**: Write core compiler components in t2lang

**Approach**: Start with the simplest, most isolated components:

1. **AST Data Structures** (in t2lang)
   ```lisp
   ;; file: ast.t2
   (program
     (type-alias ASTNode 
       (type-union
         (type-ref NumberLit)
         (type-ref StringLit)
         (type-ref CallExpr)
         ;; ... all other node types
       ))
     
     (type-alias CallExpr
       (type-object
         ((kind (type-literal "call"))
          (callee (type-ref ASTNode))
          (args (type-array (type-ref ASTNode))))))
     
     ;; ... more AST types
   )
   ```

2. **Utilities** (in t2lang)
   ```lisp
   ;; file: utils.t2
   (program
     (export (fn gensym ((prefix :string)) :string
       (let* ((counter 0))
         (fn () :string
           (block
             (assign counter (call + counter 1))
             (call + prefix (call toString counter)))))))
     
     (export (fn mapArray ((arr :any[]) (f :any)) :any[]
       (call arr.map f)))
   )
   ```

3. **Simple Parser** (in t2lang)
   ```lisp
   ;; file: simple-parser.t2
   (program
     (export (fn tokenize ((source :string)) :(type-array Token)
       ;; Simplified tokenizer in t2lang
       (let* ((tokens (array)))
         ;; ... tokenization logic
         tokens)))
     
     (export (fn parseExpr ((tokens :(type-array Token))) :ASTNode
       ;; Recursive descent parser
       ;; ...
     ))
   )
   ```

**Compilation Strategy**:
- Use existing TS compiler to compile these `.t2` files to `.ts`
- Import generated `.ts` into main TypeScript compiler
- Gradually replace TypeScript modules with t2lang equivalents

**Deliverable**: A hybrid compiler where some components are t2lang, some are TS

### Stage 3: Complete PhaseB in T2Lang
**Goal**: Rewrite the entire PhaseB (frontend) in t2lang

**Order of Implementation**:
1. `reader.t2` - Tokenizer and s-expr parser
2. `ast.t2` - AST type definitions
3. `gensym.t2` - Hygenic symbol generation
4. `rewriter.t2` - Basic syntactic rewrites
5. `sugar.t2` - All sugar transformations
6. `expander.t2` - Macro expansion engine
7. `macroRegistry.t2` - Macro definition storage
8. `lower.t2` - PhaseB → PhaseA lowering
9. `cli.t2` - Command-line interface

**Hybrid Architecture During Stage 3**:
```
┌─────────────────────────────────────┐
│   PhaseB (written in .t2)          │
│  - reader.t2                        │
│  - sugar.t2                         │
│  - expander.t2                      │
│  - lower.t2                         │
│                                     │
│  (compiled to .ts by TS compiler)  │
└──────────────┬──────────────────────┘
               │ emits PhaseA AST
               ↓
┌─────────────────────────────────────┐
│   PhaseA (still TypeScript)         │
│  - parse.ts                         │
│  - phaseA0.ts                       │
│  - phaseA1.ts                       │
│  - codegen.ts                       │
└─────────────────────────────────────┘
```

**Deliverable**: PhaseB completely in t2lang, bootstrapped via TS compiler

### Stage 4: Complete PhaseA in T2Lang
**Goal**: Rewrite PhaseA core in t2lang

**Order of Implementation**:
1. `parse.t2` - Canonical s-expr → AST
2. `phaseA0.t2` - Minimal calculus (resolver, basic type checker)
3. `phaseA1.t2` - TypeScript bridge
4. `serialization.t2` - AST serialization
5. `codegen.t2` - TypeScript code generation

**Bootstrap Mechanism**:
At this stage, we can compile the entire compiler with itself!

```
┌──────────────────────────────────┐
│  Bootstrap Process               │
│                                  │
│  1. TS Compiler compiles:       │
│     phaseB/*.t2 → phaseB/*.ts   │
│     phaseA/*.t2 → phaseA/*.ts   │
│                                  │
│  2. Generated compiler (in .ts) │
│     can now compile itself:     │
│     *.t2 → *.ts                 │
│                                  │
│  3. Verify: Compiler compiled   │
│     by itself === Compiler      │
│     compiled by TS              │
└──────────────────────────────────┘
```

**Deliverable**: Fully self-hosting t2lang compiler

### Stage 5: Architectural Refinement
**Goal**: Clean up and improve architecture now that we're in pure t2lang

**Improvements**:

1. **Strict Staging**
   - Enforce clear boundaries between PhaseB → PhaseA → CodeGen
   - Make intermediate representations explicit
   - Add validation passes between stages

2. **Better Error Handling**
   - Rich diagnostic system with source locations
   - Error recovery during parsing
   - Helpful error messages

3. **Modular Design**
   - Break large files into focused modules
   - Clear dependency graph
   - Pluggable macro system

4. **Performance**
   - Lazy AST construction
   - Incremental compilation support
   - Caching of macro expansions

5. **Better Type System Integration**
   - Proper TypeScript type inference
   - Generic constraints
   - Mapped types

**Refined Architecture**:
```
Source (.t2)
    ↓
┌───────────────────────────────────────┐
│ PhaseB: Frontend                      │
├───────────────────────────────────────┤
│ Reader                                │
│   - Tokenize                          │
│   - Parse to S-expressions            │
│                                       │
│ Expander                              │
│   - Macro expansion                   │
│   - Hygenic renaming (gensym)         │
│                                       │
│ Sugar                                 │
│   - Infix notation                    │
│   - Dotted access                     │
│   - Type syntax sugar                 │
│                                       │
│ Lower                                 │
│   - Emit PhaseA1 AST                  │
└───────────────┬───────────────────────┘
                ↓
         PhaseA1 AST (IR)
                ↓
┌───────────────────────────────────────┐
│ PhaseA: Core Compiler                 │
├───────────────────────────────────────┤
│ PhaseA1: TypeScript Bridge            │
│   - Parse A1 AST                      │
│   - Resolve imports/exports           │
│   - Type checking                     │
│   - Lower to A0                       │
│                                       │
│ PhaseA0: Minimal Calculus             │
│   - Resolve variables                 │
│   - TDZ/const checking                │
│   - Control flow analysis             │
└───────────────┬───────────────────────┘
                ↓
          PhaseA0 AST (IR)
                ↓
┌───────────────────────────────────────┐
│ CodeGen: TypeScript Emission          │
├───────────────────────────────────────┤
│   - Pretty printing                   │
│   - Emit .ts files                    │
│   - Preserve comments                 │
│   - Source maps                       │
└───────────────┬───────────────────────┘
                ↓
          TypeScript (.ts)
```

## Implementation Details

### File Organization for Bootstrap

```
t2lang-compiler/
├── bootstrap/               # Bootstrap utilities
│   ├── verify.ts           # Verify bootstrap succeeded
│   └── compare.ts          # Compare TS vs T2 output
│
├── phaseB/                 # Frontend (t2lang)
│   ├── reader.t2
│   ├── sugar.t2
│   ├── expander.t2
│   ├── lower.t2
│   └── tests/
│
├── phaseA/                 # Core compiler (t2lang)
│   ├── parse.t2
│   ├── phaseA0.t2
│   ├── phaseA1.t2
│   ├── codegen.t2
│   └── tests/
│
├── stdlib/                 # T2lang standard library
│   ├── core.t2            # Core utilities
│   ├── string.t2          # String operations
│   ├── array.t2           # Array operations
│   └── io.t2              # File I/O
│
├── runtime/               # Runtime support (if needed)
│   └── t2lang-runtime.ts
│
└── legacy-ts/             # Original TypeScript compiler (for bootstrap)
    ├── phaseB/
    └── phaseA/
```

### Bootstrap Testing Strategy

1. **Differential Testing**
   - Compile test programs with both TS and T2 compilers
   - Compare generated TypeScript output
   - Ensure semantic equivalence

2. **Self-Compilation Test**
   - Compile compiler with itself
   - Compile result again
   - Verify fixpoint: C(C(source)) === C(source)

3. **Regression Suite**
   - Keep all existing tests
   - Run them on both TS and T2 compilers
   - Ensure no regressions during transition

### Migration Path for Each Module

For each module being rewritten:

1. **Create `.t2` version** alongside `.ts`
2. **Write comprehensive tests** for the module
3. **Compile `.t2` → `.ts`** with current compiler
4. **Run tests** on both versions
5. **Swap imports** to use t2-compiled version
6. **Verify** entire compiler still works
7. **Remove** old `.ts` version

### Macro System Bootstrap

The macro system is crucial for t2lang expressiveness. Bootstrap strategy:

1. **Phase 1**: Implement core macro expansion in TypeScript
   - This becomes the "trusted" macro expander
   
2. **Phase 2**: Rewrite macro expander in t2lang
   - Use Phase 1 compiler to compile it
   
3. **Phase 3**: Use t2lang macro expander to compile itself
   - Verify it produces same result as Phase 1

4. **Phase 4**: Define core macros in t2lang
   ```lisp
   (defmacro when (cond & body)
     (quote (if (unquote cond)
              (block (unquote-splice body))
              null)))
   
   (defmacro unless (cond & body)
     (quote (if (unquote cond)
              null
              (block (unquote-splice body)))))
   
   (defmacro cond (& clauses)
     ;; Implement cond as nested ifs
     )
   ```

## Risks and Mitigations

### Risk 1: Feature Gap
**Problem**: T2lang can't express patterns used in compiler
**Mitigation**: Complete Stage 1 thoroughly; add features incrementally

### Risk 2: Performance
**Problem**: T2-compiled code might be slower than hand-written TS
**Mitigation**: 
- Profile and optimize hot paths
- Keep codegen readable for TS optimizer
- Consider ahead-of-time optimizations

### Risk 3: Debugging
**Problem**: Harder to debug generated TypeScript
**Mitigation**:
- Emit source maps
- Keep generated code readable
- Add diagnostic modes

### Risk 4: Bootstrap Circularity
**Problem**: Compiler bugs preventing self-compilation
**Mitigation**:
- Always keep working TS compiler as fallback
- Extensive testing at each stage
- Ability to rollback to previous stage

### Risk 5: Ecosystem Integration
**Problem**: Hard to integrate with existing TS/JS tools
**Mitigation**:
- Emit idiomatic TypeScript
- Support standard module formats
- Provide good interop story

## Success Criteria

### Stage 1 Success
- [ ] All TypeScript features used in compiler are supported
- [ ] Multi-file compilation works
- [ ] Test suite expanded for new features

### Stage 2 Success
- [ ] 20%+ of compiler in t2lang
- [ ] Hybrid compilation pipeline works
- [ ] Tests pass with mixed TS/T2 compiler

### Stage 3 Success
- [ ] All of PhaseB in t2lang
- [ ] Generated TypeScript identical to hand-written
- [ ] No regressions in test suite

### Stage 4 Success
- [ ] Full compiler in t2lang
- [ ] Self-compilation works
- [ ] Fixpoint reached: C(C(src)) === C(src)

### Stage 5 Success
- [ ] Cleaner architecture than original TS
- [ ] Better error messages
- [ ] Measurable improvements (compile speed, code size, etc.)

## Timeline Estimate

- **Stage 1**: 2-3 weeks
- **Stage 2**: 3-4 weeks  
- **Stage 3**: 6-8 weeks
- **Stage 4**: 6-8 weeks
- **Stage 5**: 4-6 weeks

**Total**: 5-7 months for complete bootstrap

## Next Steps

1. **Immediate (Week 1)**:
   - Complete feature gap analysis
   - Set up hybrid build system
   - Write first utility module in t2lang

2. **Short-term (Month 1)**:
   - Implement missing features
   - Create t2lang standard library
   - Write AST definitions in t2lang

3. **Medium-term (Months 2-4)**:
   - Complete PhaseB in t2lang
   - Begin PhaseA rewrite
   - Continuous testing and validation

4. **Long-term (Months 5-7)**:
   - Complete PhaseA
   - Achieve self-hosting
   - Architectural refinements

## Example: First Module in T2Lang

Here's what the first utility module might look like:

```lisp
;; file: stdlib/array.t2
(program
  (export 
    (fn map ((arr :(type-array any)) (f :(type-fn ((param any)) any)))
        :(type-array any)
      (let* ((result (array))
             (i 0))
        (while (call < i (prop arr "length"))
          (block
            (call result.push (call f (index arr i)))
            (assign i (call + i 1))))
        result)))
  
  (export
    (fn filter ((arr :(type-array any)) (pred :(type-fn ((param any)) boolean)))
        :(type-array any)
      (let* ((result (array))
             (i 0))
        (while (call < i (prop arr "length"))
          (block
            (const* ((elem (index arr i))))
            (if (call pred elem)
              (call result.push elem)
              null)
            (assign i (call + i 1))))
        result)))
  
  (export
    (fn reduce ((arr :(type-array any)) 
                (f :(type-fn ((acc any) (val any)) any))
                (init any))
        :any
      (let* ((acc init)
             (i 0))
        (while (call < i (prop arr "length"))
          (block
            (assign acc (call f acc (index arr i)))
            (assign i (call + i 1))))
        acc))))
```

This can be compiled with the existing TypeScript compiler, and the generated `.ts` can be used immediately.

## Conclusion

This bootstrap strategy provides a clear path from the current TypeScript implementation to a fully self-hosting t2lang compiler, while also achieving a cleaner architecture through strict staging. The key is incremental migration, comprehensive testing, and maintaining backward compatibility throughout the process.
