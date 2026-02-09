# Phase A Codegen Bug: Object Literals Need Parentheses

## Issue

When an object literal appears as the base of a property access or call expression that's used as a statement, the generated TypeScript code is syntactically invalid because the object literal is not wrapped in parentheses.

JavaScript/TypeScript interprets `{ ... }` at statement position as a **block statement**, not an object literal. It needs parentheses: `({ ... })`.

## Minimal Test Cases

### Case 1: Object with property access as statement

**Input:**
```lisp
(call (prop (object ("a" 1)) "a") 2)
```

**Current Output (INVALID):**
```typescript
{ a: 1 }.a(2);
```

**Expected Output (VALID):**
```typescript
({ a: 1 }).a(2);
```

### Case 2: Object with property access (method call) as statement

**Input:**
```lisp
(call (prop (object ("method" (lambda ((x)) (return x)))) "method") 42)
```

**Current Output (INVALID):**
```typescript
{ method: (x) => { return x; } }.method(42);
```

**Expected Output (VALID):**
```typescript
({ method: (x) => { return x; } }).method(42);
```

## Real-World Example: `expect` macro from t2conduit tests

The `expect` macro expands to an object literal with `toBe` and `toEqual` methods, which is immediately accessed and called:

**Source:**
```lisp
(defmacro expect (var)
 (quasiquote
    (object
      ("toBe" (lambda ((expected))
        (if (!== expected (unquote var))
          (console.log (template "toBe fail")))))
      ("toEqual" (lambda ((expected))
        (if (!= expected (unquote var))
          (console.log (template "toEqual fail")))))
    )))

;; Usage:
(call (prop (expect result) "toEqual") (array 1 2 3))
```

**Current Output (INVALID):**
```typescript
{ toBe: (expected) => { ... }, toEqual: (expected) => { ... } }.toEqual([1, 2, 3]);
```

**Expected Output (VALID):**
```typescript
({ toBe: (expected) => { ... }, toEqual: (expected) => { ... } }).toEqual([1, 2, 3]);
```

## Root Cause

The Phase A codegen for `ObjectExpr` doesn't check if the object is:
1. Used as a statement (or part of a larger expression used as a statement)
2. The base of a property access (`PropAccess`) or similar operation

In these cases, the object literal needs to be wrapped in parentheses to prevent it from being interpreted as a block statement.

## Proposed Fix Locations

Files to check:
- `phaseA/src/generateCode.ts` - Object literal generation
- Look for `ObjectExpr` codegen
- Add logic to wrap in parens when:
  - Object is the `object` field of a `PropAccess`
  - Object is the `object` field of an `IndexAccess`
  - Object is the `callee` of a `CallExpr` (if it's a property access on object)

## Workaround

Until fixed, wrap object literals in an IIFE or assign to a variable:

```lisp
;; Workaround 1: Assign to variable
(const* ((expectObj (object ...)))
  (call (prop expectObj "toEqual") ...))

;; Workaround 2: IIFE
(call (call (lambda () (return (object ...)))))
```

## Test to Add

Add a Phase A codegen test that verifies object literals are properly wrapped when used as the base of property access in statement position.

```typescript
// phaseA/tests/codegen.test.ts
test("object literal in property access statement position gets wrapped", () => {
  const obj = new ObjectExpr({
    fields: [{ kind: "field", key: "a", value: new Literal({ value: 1, span: emptySpan }) }],
    span: emptySpan
  });
  const prop = new PropAccess({ object: obj, property: "a", span: emptySpan });
  const call = new CallExpr({ callee: prop, args: [new Literal({ value: 2, span: emptySpan })], span: emptySpan });
  const stmt = new ExprStmt({ expr: call, span: emptySpan });

  const code = generateCode(stmt);
  assert.match(code, /^\(\{.*\}\)\.a\(2\);$/);  // Should have parens around object
});
```
