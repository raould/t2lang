# T2Lang Dependency Analysis & Code Smell Report

## Executive Summary

The codebase has **moderate technical debt** with several concerning patterns:
- done: **3 copies of cliHelper.ts** with different implementations
- done: **10 dynamic `await import()` calls** causing runtime complexity
- done: **53 `as any` type assertions** undermining type safety
- **Orphaned debug code** in core compiler files
- **Unnecessary indirection** layers between packages

---

## 1. DUPLICATION ANALYSIS

### Files Duplicated Across Workspaces

| File | Phase0 | Common | Phase1 | Issue |
|------|--------|--------|--------|-------|
| `compilerError.ts` | 17 lines | - | 2 lines (re-export) | OK - proper delegation |
| `eventSink.ts` | 20 lines | - | 2 lines (re-export) | OK - proper delegation |
| `nodes.ts` | 395 lines | - | 70 lines (extends) | OK - Phase1 adds macro nodes |
| `lexer.ts` | 243 lines | - | 160 lines | Phase1 wraps Phase0, adds sugar |
| `parser.ts` | 1524 lines | - | 106 lines | OK - Phase1 is thin wrapper |
| `resolver.ts` | 366 lines | - | 14 lines | OK - thin subclass |
| `tsCodegen.ts` | 641 lines | - | 3 lines (re-export) | OK - proper delegation |


**Problems:**

- cliHelper.ts has an **orphaned console.error** statement:
   ```typescript
   console.error("Run 't2tc --help' for usage information");
   ```
   This line executes on module load - a bug!

**Status:**

- Fixed: `CliOptions` now uses `pretty: "ugly" | "pretty"` (the `newlines` mode was removed).

---

### 🔴 CRITICAL: sexprPrinter.ts Hack

```typescript
// t2lang-phase1/src/util/sexprPrinter.ts
let impl: ((n: any) => string) | null = null;
try {
    const url = new URL('../../../common/src/ast/sexprPrinter.js', import.meta.url).href;
    const mod = await import(url);
    impl = (mod && (mod.printSexpr || mod.default)) as any;
} catch (e) {
    throw new Error('Failed to load common sexprPrinter at runtime: ' + String(e));
}
export const printSexpr: (n: any, opts?: any) => string = impl as any;
```

**Problems:**
1. Builds a URL string and imports it at runtime
2. Falls back through multiple property accesses
3. Casts to `any` twice
4. Top-level await in module
5. Error handling throws generic error

**Fix:** Just `export { printSexpr } from "t2lang-common/ast/sexprPrinter.js"` or configure package.json exports properly.

---

## 3. TYPE SAFETY ISSUES

### `as any` Assertions: 53 instances

**Breakdown by file:**

| File | Count | Severity |
|------|-------|----------|
| `t2lang-phase0/src/lib/substitute.ts` | 15+ | HIGH - core macro logic |
| `common/src/ast/sexprPrinter.ts` | 5 | MEDIUM |
| `common/src/t2jc.ts` | 5 | LOW - CLI tool |
| `t2lang-phase1/src/expand/macroExpander.ts` | 8 | HIGH - core logic |
| `t2lang-phase1/src/cli.ts` | 10+ | MEDIUM |

**Worst examples:**

```typescript
// substitute.ts:50 - casting result and accessing .location
return { kind: "array", elements: (converted as SpliceMarker).items, 
         location: (quoted as any).location } as any;

// substitute.ts:60-62 - triple any cast chain
return { kind: "__splice", items: [evaluated], 
         location: (expr as any).location } as unknown as any;
```

**Root cause:** The quoted/unquoted AST transformation doesn't have proper types for intermediate states.

**Fix:** Define proper intermediate types for macro expansion states.

---

## 4. DEBUG CODE IN PRODUCTION

### Console statements in non-CLI code

| File | Line | Code | Issue |
|------|------|------|-------|
| `t2lang-phase0/src/cliHelper.ts` | 113 | `console.error("Run 't2tc --help'...")` | **EXECUTES ON IMPORT** |
| `t2lang-phase0/src/api.ts` | 65,82,91,112 | `console.error("[DEBUG]...")` | Debug logging |
| `t2lang-phase0/src/parse/parser.ts` | 153 | `console.error('parseList: unexpected...')` | Debug logging |
| `t2lang-phase0/src/parse/parser.ts` | 279 | `console.error('parseLetOrConst: saw...')` | Debug logging |
| `t2lang-phase1/src/api.ts` | 81,99,116,126,146 | `console.error("[DEBUG]...")` | Debug logging |

**The api.ts debug logging IS properly gated:**
```typescript
if (process.env.T2_DEBUG_PARSE === "1") {
    console.error(`[DEBUG] Parsed AST: nodeCount=${nodeCount}`);
}
```

But **parser.ts has ungated debug output** that will print during normal compilation.

---

## 5. UNNECESSARY INDIRECTION

### Phase1 → Phase0 Delegation Layers

The Phase1 package has multiple "thin wrapper" files that just re-export Phase0:

```
t2lang-phase1/src/
├── codegen/
│   ├── index.ts      (2 lines - re-exports Phase0)
│   └── tsCodegen.ts  (3 lines - re-exports Phase0)  ← REDUNDANT
├── errors/
│   └── compilerError.ts (2 lines - re-exports Phase0)
├── events/
│   └── eventSink.ts     (2 lines - re-exports Phase0)
├── resolve/
│   └── resolver.ts      (14 lines - trivial subclass)
├── typecheck/
│   └── index.ts         (17 lines - trivial subclass)
```

**The resolver.ts wrapper:**
```typescript
export class Resolver extends ResolverBase {
  constructor(ctx: CompilerContext) {
    super(ctx);
  }
  resolveProgram(program: Phase0Program): void {
    super.resolveProgram(program as any);  // Just casts and calls super!
  }
}
```

**Fix:** Most of these could be direct re-exports. The `as any` casts suggest a type mismatch that should be fixed at the source.

---

## 6. DEPENDENCY GRAPH ISSUES

### Current Structure
```
                    ┌─────────────┐
                    │   common    │
                    │  (635 LOC)  │
                    └──────┬──────┘
                           │ (runtime import)
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  │
┌───────────────┐  ┌───────────────┐         │
│  t2lang-phase0│  │ t2lang-phase1 │◄────────┘
│  (5277 LOC)   │  │  (2214 LOC)   │
└───────────────┘  └───────────────┘
        ▲                  │
        │                  │
        └──────────────────┘
         (proper static import)
```

### Problems:
1. **Phase0 dynamically imports common** at runtime (in cliHelper.ts)
2. **Phase1 has fallback import logic** trying local then package
3. **common has no dependencies** but is imported different ways

### Ideal Structure
```
                    ┌─────────────┐
                    │   common    │  (static exports only)
                    └──────┬──────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌───────────────┐                    ┌───────────────┐
│  t2lang-phase0│ ◄────────────────  │ t2lang-phase1 │
└───────────────┘  (static import)   └───────────────┘
```

---

## 7. LARGE FILE ANALYSIS

### Files Over 500 Lines

| File | Lines | Functions | Concern |
|------|-------|-----------|---------|
| `parser.ts` | 1524 | 40 | Monolithic parser |
| `macroExpander.ts` | 1275 | 46 | Complex macro logic |
| `typeChecker.ts` | 1134 | 42 | Type checking logic |
| `tsCodegen.ts` | 641 | ~25 | Code generation |

**parser.ts** handles all AST node types in one file. Could split into:
- `parser/statements.ts`
- `parser/expressions.ts`
- `parser/types.ts`
- `parser/base.ts`

**macroExpander.ts** mixes concerns:
- Macro registry management
- Quote/unquote evaluation
- Gensym handling
- AST transformation

---

## 8. RECOMMENDED FIXES

### Priority 1: Critical Bugs (Fix Immediately)

1. **Remove orphaned console.error in Phase0 cliHelper.ts line 113**
   ```typescript
   // DELETE THIS LINE - it runs on module import!
   console.error("Run 't2tc --help' for usage information");
   ```

2. **Remove ungated console.error in parser.ts lines 153, 279**
   - Either delete or gate behind `process.env.T2_DEBUG_PARSE`

### Priority 2: Eliminate Duplication (This Week)

1. **Delete `t2lang-phase0/src/cliHelper.ts`**
   - Update Phase0's cli.ts to import from `t2lang-common` directly
   - Or re-export: `export * from "t2lang-common"`

2. **Fix sexprPrinter.ts hack**
   ```typescript
   // Replace the entire file with:
   export { printSexpr } from "t2lang-common";
   ```

3. **Remove redundant `tsCodegen.ts` in Phase1**
   - `codegen/index.ts` already re-exports everything
   - Delete `codegen/tsCodegen.ts`

### Priority 3: Clean Up Dynamic Imports (This Sprint)

1. **Phase1 cli.ts** - Replace:
   ```typescript
   // BEFORE: try/catch with fallback
   try {
       const local = await import('../common/src/cliHelper.js');
       ...
   } catch {
       const mod = await import('t2lang-common');
       ...
   }
   
   // AFTER: single static import
   import { parseArgs, showHelp, ... } from "t2lang-common";
   ```

2. **Phase1 cli.ts** - Move fs import to top:
   ```typescript
   // BEFORE: await import('node:fs') twice at lines 74, 124
   // AFTER: import * as fs from "node:fs"; at top
   ```

### Priority 4: Improve Type Safety (Ongoing)

1. Define proper types for macro expansion intermediate states
2. Replace `as any` with proper type guards
3. Add `@ts-expect-error` comments explaining unavoidable casts

---

## Summary Statistics

| Metric | Value | Target |
|--------|-------|--------|
| Dynamic imports | 10 | ≤2 (only optional deps) |
| `as any` casts | 53 | ≤10 |
| Duplicate implementations | 3 | 0 |
| Orphaned debug code | 3 statements | 0 |
| Files >1000 lines | 3 | 0 (split them) |

**Technical Debt Score: 6/10** (moderate - needs attention but functional)
