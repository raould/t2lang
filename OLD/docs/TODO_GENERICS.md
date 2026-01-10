# TODO: Generics Support (Phase0 + Phase1)

Goal
----
- Add syntax-only support for TypeScript-style generics. Phase0 must accept an unambiguous sexpr representation (no sugar) and only do syntax validation. Phase1 may provide angle-bracket sugar and rewrite to Phase0 sexprs.

Design (Phase0 - sexpr canonical forms)
--------------------------------------
- New optional child on declarations: `(typeparams ... )` placed after the declaration name where applicable (functions, type aliases, interfaces, classes).
- Type param forms (sexpr):
  - `(T)` — simple param
  - `(T (extends TYPE))` — constraint
  - `(T (default TYPE))` — default
  - `(T (extends TYPE) (default TYPE))` — both
- Type application / explicit type arguments:
  - Introduce a `type-app` sexpr form: `(type-app <type-ref-or-ident> <type-arg> ...)` — used in callee or type positions.
  - Alternatively allow `typeargs` in calls as a separate child, e.g. `(call (typeargs String) fn "hello")` — prefer `type-app` for clarity.

AST changes (Phase0)
--------------------
- Add `TypeParamDecl` node: `{ name: Identifier, extends?: TypeNode, default?: TypeNode }`.
- Add `typeParams?: TypeParamDecl[]` to declaration nodes (FunctionExpr, ClassStmt, TypeAliasStmt, InterfaceStmt).
- Add `TypeApp` node or allow `CallExpr.callee` to be a `TypeApp` expression.

Parser (Phase0)
----------------
- Parse a `(typeparams ...)` sexpr into `TypeParamDecl[]`.
- Parse `(type-app ...)` forms into a `TypeApp` node (or populate a `typeArgs` list on call/type-ref nodes).
- Validate syntax only: malformed forms (missing name, duplicate param names in the same list, invalid `extends`/`default` bodies) should produce parse errors.

Codegen (Phase0)
-----------------
- Emit generics when `emitTypes` is enabled.
  - Declaration emission example: `function foo<T, K extends string = "Guest">(...): R { ... }`.
  - Call emission: `foo<string>(...)` or `Foo<Bar>` for type refs.
- For arrow/function-expr with generics, emit a safe form that TypeScript accepts (prefer `function` declarations or parenthesized generics to avoid JSX ambiguity in TSX contexts).

Typechecker policy (Phase0)
---------------------------
- Phase0 must NOT perform semantic generic typechecking or inference.
- Only do minimal syntax checks: duplicate param names, invalid forms. Do NOT validate `extends` semantics, or try to resolve type parameter usages.

Phase1 sugar
------------
- Implement angle-bracket sugar in Phase1 parse/sugar rewrite:
  - `function id<T>(x: T): T {}` → `(fn id (typeparams (T)) ((x T)) (returns T) ...)`
  - `logType<string>("a")` → `(call (type-app logType string) "a")` or `(call logType (typeargs string) "a")` depending on chosen Phase0 shape.
- Keep all sugar rewrites inside Phase1; Phase0 parser stays strict to sexprs.

Testing
-------
- Add extensive Phase0 acceptance tests that exercise only the sexpr forms:
  - Simple generic function, constrained generic, defaulted generic, multiple params.
  - Explicit type application (`type-app`) in calls and type positions.
  - Declarations: type alias / interface / class with `typeparams`.
  - Syntax error cases: duplicate names, malformed `typeparams`, unknown shapes.

Notes / Trade-offs
------------------
- TypeScript has many advanced generic features (conditional types, mapped types, `infer`, indexed access, etc.). Phase0 should parse these as `TypeNode` trees but not attempt to understand them.
- Prefer explicit and unambiguous sexpr shapes in Phase0 to simplify parsing and later codegen.

Next steps
----------
1. Implement AST + parser + codegen support in Phase0 for the minimal shapes above.
2. Implement Phase1 sugar rewrites for angle-bracket syntax.
3. Iterate on tests until green.
