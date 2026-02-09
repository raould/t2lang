# Object Literal Parentheses Fix - Summary

## Problem
When an object literal appeared as the base of a property access or call expression used as a statement, the generated TypeScript code was syntactically invalid because JavaScript/TypeScript interprets `{ ... }` at statement position as a block statement, not an object literal.

## Solution
Modified the codegen in [phaseA/src/codegen.ts](../src/codegen.ts) to automatically wrap `ObjectExpr` in parentheses when it appears as the object in:
- `PropExpr` (property access: `.property`)
- `IndexExpr` (index access: `[index]`)
- `OptionalPropExpr` (optional property access: `?.property`)
- `OptionalIndexExpr` (optional index access: `?.[index]`)

## Changes Made

### 1. Fixed Code Generation (phaseA/src/codegen.ts)
Added parentheses wrapping for object literals in four expression types:
- Lines 577-585: PropExpr
- Lines 587-595: OptionalPropExpr
- Lines 597-603: IndexExpr
- Lines 605-611: OptionalIndexExpr

### 2. Added Comprehensive Tests (phaseA/tests/integration/object_literal_parens.test.ts)
Created 8 test cases covering:
- Simple property access on object literal
- Method call on object literal
- Index access on object literal
- Optional property access
- Optional index access
- Non-statement position (verifying parens don't break valid code)
- Nested objects with property access
- Chained property access

## Verification

### Test Results
✅ All 235 tests pass (including 8 new tests)

### Example Transformations

**Before (Invalid):**
```typescript
{ a: 1 }.a(2);  // Syntax Error: TS1128
```

**After (Valid):**
```typescript
({ a: 1 }).a(2);  // Syntactically valid
```

**Before (Invalid):**
```typescript
{ method: (x) => { return x; } }.method(42);  // Syntax Error
```

**After (Valid):**
```typescript
({ method: (x) => { return x; } }).method(42);  // Syntactically valid
```

## Files Modified
1. `/home/superman/Dev/t2lang2/phaseA/src/codegen.ts` - Core fix
2. `/home/superman/Dev/t2lang2/phaseA/tests/integration/object_literal_parens.test.ts` - New test file

## Notes
- The fix follows existing precedent in the codebase where `FunctionExpr` and `ClassExpr` are wrapped in parentheses when used as callees
- Parentheses are only added when the object is an `ObjectExpr`, not for other expression types (identifiers, etc.)
- The fix handles all cases mentioned in the original bug report including the real-world `expect` macro use case
