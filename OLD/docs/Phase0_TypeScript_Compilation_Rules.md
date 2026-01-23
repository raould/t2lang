Phase 0 → TypeScript Compilation Rules  
\======================================

This document defines how each Phase 0 construct compiles into TypeScript.

## **Program**

(program s1 s2 …)

Compiles to the concatenation of each statement.

## **Blocks**

(block s1 s2 …)

Compiles to:

{  
s1;  
s2;

}

## **If**

(if c t e)

Compiles to:

if (C) T else E

## **While**

(while c b)

Compiles to:

while (C) B

## **For**

(for i c u b)

Compiles to:

for (I; C; U) B

## **Return**

(return e)

Compiles to:

return E

Phase B normalizes every TypeScript `return` (including implicit final returns and instrumentation rewrites) into the canonical `ReturnExpr` node so these rules always target the same shape when rendering to TypeScript.
When we describe `return` here, treat it as the `ReturnExpr` AST node—its optional payload corresponds to the expression emitted in TypeScript.

## **Let / Const**

`(let* ((x e1) (y e2)) ...)` → `let x = e1; let y = e2; ...`

`(const ((x e1) (y e2)) ...)` → `const x = e1; const y = e2; ...`

## **Assignment**

`(assign t v)`

Compiles to:

`T = V`

## **Expression Statement**

Any expression form that is not a statement is wrapped in an `ExprStmt` and terminated with a semicolon.

Phase B rewrites TypeScript expression statements, macro-generated side-effect wrappers, and other sugar into `ExprStmt` before handing the AST to Phase A so the compiler can reason over a single statement form.
`ExprStmt` is the canonical Phase A node; Phase B always emits it when the original code looked like an expression statement so downstream tools can rely on the explicit `ExprStmt` rather than guessing from wrappers.

## **Await**

`(await expr)` rewrites to the canonical `AwaitExpr` node, which simply awaits a single `expr` argument.

Phase B limits `AwaitExpr` to async contexts and rewrites helper calls/vendors before each await reaches Phase A so the awaited value already respects the asynchronous control flow.

## **Yield**

`(yield expr?)` or `(yield* expr)` rewrites to `YieldExpr` with `argument` and `delegate` fields; `delegate` is `true` for `yield*` and the `argument` may be `null` for bare `yield`.

Phase B lowers generator bodies into these nodes, auto-inserting iterator helpers so the Phase A AST receives a consistent generator shape.

## **Function**

`(fn f (p1 p2 ...) body type?)`

Compiles to:

`function f(p1, p2, ...): T { BODY }`

## **Lambda**

`(fn (p1 p2 ...) body)`

Compiles to:

`(p1, p2, ...) => { BODY }`

## **Class**

Compiles directly to a TypeScript class.

## **Calls**

`(call f a1 a2 ...)`

Compiles to:

`f(a1, a2, ...)`

## **Implicit Call**

`(f a1 a2 ...)`

Compiles to:

`f(a1, a2, ...)`

## **New**

`(new C a1 a2 ...)`

Compiles to:

`new C(a1, a2, ...)`

## **Property Access**

`(prop o "x")`

Compiles to:

`o.x`

## **Spread**

Spread/rest positions (array/object spreads, destructuring rest) compile into the canonical `SpreadExpr` node. Phase B rewrites the surrounding container to include `SpreadExpr` entries instead of special syntax so the Phase A AST directly sees the spread as a node.

## **Index Access**

`(index o i)`

Compiles to:

`o[i]`

## **Array Literal**

`(array e1 e2 ...)`

Compiles to:

`[ e1, e2, ... ]`

## **Object Literal**

`(obj ("x" e1) ("y" e2))`

Compiles to:

`{ x: e1, y: e2 }`

## **Throw**

`(throw e)`

Compiles to:

`throw e;`

## **Try/Catch**

`(try (try-body) (catch (e) (catch-body)) (finally (finally-body)))`

Compiles to:

`try { try-body } catch (e) { catch-body } finally { finally-body }`

## **Import**

`(import-default name "path")` → `import name from "path";`
`(import-named (a b) "path")` → `import { a, b } from "path";`
`(import-all alias "path")` → `import * as alias from "path";`

## **Export**

`(export name)` → `export { name };`
`(export-default expr)` → `export default expr;`

## **Type Assertion**

`(type-assert e T)`

Compiles to:

`e as T`

## **Type Alias**

`(type-alias Name T)`

Compiles to:

`type Name = T;`

## **Type Notes**

`(type-object ("field" T) ...)` compiles to `{ field: T, ... }`.

