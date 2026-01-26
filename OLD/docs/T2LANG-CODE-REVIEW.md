# T2Lang Code Review

## Executive Summary

T2lang is an S-expression syntax frontend for TypeScript. The project has a **solid foundation** with a well-thought-out two-phase architecture, but has several **incomplete features**, **inconsistencies**, and **areas needing attention**.

**Overall Assessment: 70% Complete** - Core functionality works, but polish, testing edge cases, and documentation synchronization needed.

---

## Architecture Overview

### Project Structure
```
t2lang/
├── common/           # Shared utilities (CLI helpers, sexpr printer, t2jc/t2run wrappers)
├── phase0/    # Core compiler (lexer, parser, resolver, typechecker, codegen)
├── phase1/    # Sugar layer + macros (extends Phase0)
├── vscode-t2-formatter/  # Basic VS Code extension (incomplete)
└── bin/              # CLI entry points
```

### Compilation Pipeline
```
Source (.t2) 
  → [Phase1 Sugar Rewrite] 
  → [Phase1 Lexer] 
  → [Phase1 Parser] 
  → [Macro Expansion] 
  → [Phase0 Resolver] 
  → [Phase0 TypeChecker] 
  → [Phase0 CodeGen] 
  → TypeScript (.ts)
  → [optional: tsc] 
  → JavaScript (.js)
```

---

## What IS Implemented ✅

### Phase0 Core (Mostly Complete)

| Feature | Status | Notes |
|---------|--------|-------|
| Lexer | ✅ Complete | Handles strings, numbers, identifiers, punctuation |
| Parser | ✅ Complete | All documented AST forms parse correctly |
| AST Nodes | ✅ Complete | 56+ node kinds defined |
| Resolver | ✅ Complete | Symbol resolution, scope tracking |
| TypeChecker | ✅ Functional | Basic structural typing, inference |
| CodeGen | ✅ Complete | Generates valid TypeScript |

### Language Features

| Feature | Status | Notes |
|---------|--------|-------|
| Literals | ✅ | strings, numbers, booleans, null, undefined |
| Variables | ✅ | `let*`, `const` with sequential binding |
| Functions | ✅ | `fn` (named and anonymous) |
| Control Flow | ✅ | `if`, `while`, `for`, `return` |
| Classes | ✅ | Basic class definitions with fields/methods |
| Arrays | ✅ | `(array ...)` literal |
| Objects | ✅ | `(obj ("key" value) ...)` literal |
| Property Access | ✅ | `(prop obj "field")` |
| Index Access | ✅ | `(index obj expr)` |
| Operators | ✅ | Binary (+,-,*,/,etc), unary (!, -, typeof), logical (and, or, not) |
| Imports | ✅ | `import-default`, `import-named`, `import-all` |
| Exports | ✅ | `export`, `export-default` |
| Type Aliases | ✅ | `(type-alias Name Type)` |
| Type Assertions | ✅ | `(type-assert expr Type)` |
| Try/Catch | ✅ | `(try ... (catch e ...) (finally ...))` |
| Throw | ✅ | `(throw expr)` |
| Ternary | ✅ | `(ternary cond then else)` or `(?:  cond then else)` |
| Nullish Coalescing | ✅ | `(?? a b)` |
| Nullish Assignment | ✅ | `(??= target value)` |

### Phase1 Macros

| Feature | Status | Notes |
|---------|--------|-------|
| `defmacro` | ✅ | Define compile-time macros |
| `quote` | ✅ | Quote expressions |
| `unquote` | ✅ | Unquote within quoted forms |
| `unquote-splice` | ✅ | Splice lists into quoted forms |
| `gensym` | ✅ | Generate unique symbols for hygiene |
| Macro expansion | ✅ | Recursive expansion to fixpoint |

### Sugar (Phase1)

| Feature | Status | Notes |
|---------|--------|-------|
| Dotted identifiers | ✅ | `a.b.c` → nested `prop` |
| Dotted call sugar | ✅ | `(obj.method arg)` → `(call (prop obj "method") arg)` |
| Type field sugar | ✅ | `(.name: Type)` → `("name" (type-ref "Type"))` |

### Tooling

| Feature | Status | Notes |
|---------|--------|-------|
| CLI (`t2tc`) | ✅ | Compile .t2 → .ts |
| CLI (`t2jc`) | ✅ | Compile .t2 → .ts → .js |
| CLI (`t2run`) | ✅ | Compile and execute |
| Debug flags | ✅ | `T2_DEBUG_PARSE`, `T2_DEBUG_EXPAND`, etc. |
| AST dump | ✅ | `--dump-ast`, `--ast-before-expand`, `--ast-after-expand` |
| Tests | ✅ | 76 test files, ~296 tests passing |

---

## What is MISSING / INCOMPLETE ❌

### High Priority (Blocking or Significant Gaps)

#### 1. **Function Parameter Type Annotations** 🔴
**Status:** NOT IMPLEMENTED  
**Documentation says:** Functions should support inline argument type annotations  
**Current reality:** Parameters are untyped in syntax

```lisp
; WANTED (per TODO.md):
(fn isNotAvailable (obj: any key: any) ...)

; CURRENT (no type syntax supported):
(fn isNotAvailable (obj key) ...)
```

**Fix needed:** Parser needs to accept `name: Type` in parameter lists and propagate to AST/codegen.

#### 2. **Function Return Type Annotations** 🔴
**Status:** NOT IMPLEMENTED in syntax  
**Documentation says:** Functions should support inline return type annotations  
**Current reality:** No syntax for return types

```lisp
; WANTED:
(fn greet (name) : string (return (+ "Hello, " name)))

; CURRENT (no syntax):
(fn greet (name) (return (+ "Hello, " name)))
```

**Fix needed:** Parser and AST need return type field; codegen needs to emit `: ReturnType`.

#### 3. **Multi-file Support** 🔴
**Status:** NOT IMPLEMENTED  
**README says:** "todo: support for multi-file sources"  
**Current reality:** Single file only, no module resolution between .t2 files

**Fix needed:** Module system that resolves imports from other .t2 files.

#### 4. **VS Code Extension is Skeleton** 🟡
**Status:** INCOMPLETE  
- `vscode-t2-formatter/` exists but lacks implementation
- No `extension.js` file
- Only has `package.json` manifest

**Fix needed:** Complete the extension with actual formatting/compile-on-save functionality (I created `vscode-t2-compiler/` to address this).

### Medium Priority (Functionality Gaps)

#### 5. **Generics** 🟡
**Status:** NOT IMPLEMENTED  
**Phase0_Overview.md says:** "Phase 1 can add: generics..."  
**Current reality:** No generic type support

#### 6. **Interfaces** 🟡
**Status:** NOT IMPLEMENTED  
**Documented as:** Planned for Phase1+

#### 7. **Enums** 🟡
**Status:** NOT IMPLEMENTED

#### 8. **Spread Operator** 🟡
**Status:** NOT IMPLEMENTED  
**Documented as:** Planned sugar

#### 9. **Destructuring** 🟡
**Status:** NOT IMPLEMENTED

#### 10. **Template Literals** 🟡
**Status:** NOT IMPLEMENTED  
**Note:** Backticks are used for macro quoting, conflict potential

#### 11. **Optional Chaining** 🟡
**Status:** NOT IMPLEMENTED  
`?.` operator not available

### Low Priority (Polish/Enhancement)

#### 12. **EBNF Grammar** 🟢
**TODO.md says:** "we need to define a grammar for phase0 e.g. Extended Backus-Naur Form"  
**Current:** Informal documentation only

#### 13. **Infix Sugar** 🟢
**TODO.md proposes:** `.(1 + 2)` for infix notation  
**Status:** Not implemented, design not finalized

#### 14. **Prettier Integration** 🟢
**Status:** Optional dependency, not always installed

---

## What Needs to be FIXED 🔧

### 1. **Test Flag Inconsistency**
**TODO.md says:** "there are tests still trying to use --enable-tsc which has been removed"

```typescript
// Some tests may still reference this deprecated flag
// Search for: --enable-tsc
```

### 3. **Type Object Field Parsing Complexity**
The sugar for `(.name: Type)` goes through multiple transformation layers:
1. `sugarRewrite.ts` - structural preprocessing
2. `Lexer` - tokenization 
3. `MacroExpander` - canonicalization

This is fragile and documented as needing simplification.

### 4. **Import Statement `alias` Field Confusion**
```typescript
// In ImportStmt:
alias?: string; // for all (namespace import)
name?: string;  // for default and all
```

The `name` field serves double duty. Consider making this clearer.

### 5. **Macro Expansion Error Messages**
When macros fail, error messages could be more helpful with macro-specific context.

### 6. **Phase1 Code Duplication**
**DEDUPE_PLAN.md** documents ongoing work to reduce duplication between Phase0 and Phase1. Some files are still duplicated or have thin wrappers that could be simplified further.

---

## Documentation vs Implementation Mismatches 📝

| Document | Issue |
|----------|-------|
| `Phase0_Syntax_and_Grammar.md` | Shows `(fn name params block type?)` but type annotation not implemented |
| `Phase0_AST_Specification.md` | Shows `(import-named identifier string)` but implementation expects list `(import-named (name1 name2) string)` |
| `TODO_OPS.md` | Checklist items unchecked but features appear implemented |
| `README.md` | Says "todo: everything not yet done" - vague |

---

## Test Coverage Assessment

### Well Tested ✅
- Lexer edge cases (strings, escapes, backticks)
- Parser for all core forms
- Operator codegen
- Macro expansion (defmacro, gensym, quote/unquote)
- Type checking basic cases

### Under-Tested ⚠️
- Error recovery in parser
- Complex nested macros
- Import/export with actual module resolution
- `runtimePropCallCheck` edge cases
- TypeScript interop when importing real npm packages

### Not Tested ❌
- Multi-file compilation (not implemented)
- VS Code extension (not complete)
- Windows-specific path handling

---

## Recommendations

### Immediate Actions (This Week)

1. **Implement function parameter types**
   - Update parser to accept `(fn name (arg: Type ...) body)`
   - Update FunctionExpr AST to include param types
   - Update codegen to emit `function name(arg: Type)`

2. **Implement function return types**
   - Update parser to accept `: ReturnType` after params
   - Update FunctionExpr AST
   - Update codegen

3. **Fix deprecated test flags**
   - Search for `--enable-tsc` in tests
   - Update or remove

4. **Sync documentation**
   - Update `Phase0_Syntax_and_Grammar.md` to match implementation
   - Check TODO_OPS.md checklist against actual state

### Short Term (This Month)

5. **Complete VS Code extension**
   - Use `vscode-t2-compiler/` I created as starting point
   - Add syntax highlighting
   - Add compile-on-save

6. **Add integration tests for imports**
   - Test importing actual npm packages
   - Verify generated TypeScript works with tsc

7. **Improve error messages**
   - Add source location to all errors
   - Add suggestions for common mistakes

### Medium Term (This Quarter)

8. **Multi-file support**
   - Design module resolution for .t2 files
   - Implement cross-file imports

9. **Basic generics**
   - At minimum, allow `type-ref` to carry type parameters
   - Let TypeScript handle the heavy lifting

10. **EBNF grammar**
    - Formalize the grammar
    - Use for documentation and potential parser generation

---

## Code Quality Observations

### Strengths 💪
- Clean separation of concerns (lexer/parser/resolver/typechecker/codegen)
- Good use of TypeScript for implementation
- Comprehensive AST type definitions
- Event system for debugging/tracing
- Shared code extracted to `common/` package

### Weaknesses 😕
- Some files are very long (macroExpander.ts: 1276 lines, typeChecker.ts: 1135 lines)
- Magic strings in places (operator names, node kinds)
- Error handling could be more consistent
- Some console.error calls mixed with proper event emission

### Style 📐
- Mostly consistent formatting
- Good use of TypeScript strict mode
- Some ESLint rules in place

---

## Summary

T2lang is a **thoughtfully designed** language with a **working core**. The two-phase architecture (minimal Phase0 + sugary Phase1) is sound. However, several documented features remain unimplemented, and there's drift between documentation and code.

**Priority fixes:**
1. Function type annotations (params and return)
2. Sync documentation with implementation
3. Complete VS Code tooling

**The project would benefit from:**
- A clear roadmap with milestones
- More integration tests
- Formal grammar specification
- Contributing guidelines

The codebase is maintainable and extensible - a good foundation to build upon.
