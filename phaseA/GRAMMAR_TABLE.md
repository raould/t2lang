# Phase A/B AST Node Reference

Note: this has likely gotten out of date, GRAMMER.md is the lesser wrong.

| Node Name | S-expr Keyword | Fields (with types) | Phase | Notes |
| --- | --- | --- | --- | --- |
| Program | `program` | `body: Stmt[]` | A1 | Root wrapper. Always emitted as `(program ...)` and holds the sequential statement stream. |
| BlockStmt | `block` | `statements: Stmt[]` | A1 | Introduces a lexical scope. |
| StaticBlockStmt | `static-block` | `statements: Stmt[]` | A1 | Class static block; only valid inside class bodies. |
| IfStmt | `if` | `test: Expr`, `consequent: Stmt`, `alternate?: Stmt` | A1 | Conditional control flow; expressions in `test` only. |
| WhileStmt | `while` | `condition: Expr`, `body: Stmt` | A0 | The `scope-loop` grammar form. |
| ForClassic | `for classic` | `init?: Stmt`, `condition?: Expr`, `update?: Expr`, `body: Stmt`, `label?: string` | A1 | Traditional `for` loops; Phase B emits `label` when rewriting labeled loops. |
| ForOf | `for of` | `binding: Binding`, `iterable: Expr`, `body: Stmt`, `label?: string` | A1 | Covers `for..of`/`for..in` variants with iterator metadata. |
| ForAwait | `for await` | `binding: Binding`, `iterable: Expr`, `body: Stmt`, `label?: string` | A1 | Async iteration; Phase B supplies helper expression when rewriting `for await..of`. |
| ReturnExpr | `return` | `value?: Expr`, `typeId?: number` | A1 | Always explicit; Phase B emits this canonical return form for implicit returns/sugar. |
| BreakStmt | `break` | `label?: Identifier` | A0 | Includes optional label names inherited from labeled loops. |
| ContinueStmt | `continue` | `label?: Identifier` | A0 | Same as `break` for label tracking. |
| SwitchStmt | `switch` | `discriminant: Expr`, `cases: SwitchCase[]` | A1 | Ordered `SwitchCase`s (with `test === null` marking the optional default); Phase B inserts explicit control transfers. |
| LetStarExpr | `let*` / `const*` | `bindings: Binding[]`, `body: Stmt[]`, `isConst: boolean` | A1 | Single node for both `let*` and `const*`; `isConst` distinguishes the semantics and every entry reuses the canonical `Binding` shape described below. |
| Binding | helper | `target: BindingTarget`, `init?: Expr` | A1 | Reused by `LetStarExpr`, `ForOf`/`ForAwait` bindings, and `CatchClause`; `target` can be a simple identifier or a destructuring pattern. |
| BindingTarget | helper (identifier/array-pattern/object-pattern/rest) | Union of `Identifier`, `ArrayPattern`, `ObjectPattern`, `RestPattern` | A1 | Represents every allowable target for a binding entry, including identifiers and nested destructuring patterns. |
| ArrayPattern | `array-pattern` | `elements: BindingTarget[]`, `rest?: BindingTarget` | A1 | Represents `[a, b, ...rest]` loops/bindings so destructuring can introduce temporary names without requiring macros to emit helper assignments. |
| ObjectPattern | `object-pattern` | `properties: ObjectPatternField[]`, `rest?: BindingTarget` | A1 | Represents `{a, b: {c}}`, possibly with nested patterns, while holding an optional rest spread that captures remaining properties. |
| ObjectPatternField | helper | `key: string`, `target: BindingTarget` | A1 | Maps a quoted property name to the nested `BindingTarget`; Phase B rewrites property aliases/dotted keys into this shape before handing the AST to Phase A. |
| RestPattern | `rest` | `target: BindingTarget` | A1 | Captures `...rest` behavior inside array/object destructuring so the remaining values bind to a declared identifier or nested pattern. |
| DefaultPattern | `default` | `target: BindingTarget`, `defaultValue: Expr` | A1 | Destructuring default value wrapper; only valid inside binding targets. |
| AssignExpr | `assign` | `target: Expr`, `value: Expr` | A1 | Mutation form reused from statements by Phase B. |
| ExprStmt | `exprStmt` | `expr: Expr`, `typeId?: number` | A1 | Statement wrapper Phase B emits around every expression statement (calls, updates, template tags, macro helpers). |
| CallExpr | `call` | `callee: Expr`, `args: Expr[]` | A1 | Only canonical call form; Phase B rewrites dots/infix to this. |
| CallWithThisExpr | `call-with-this` | `fn: Expr`, `thisArg: Expr`, `args: Expr[]` | A1 | Emits `fn.call(thisArg, ...args)` to preserve `this` binding. |
| PropExpr | `prop` | `object: Expr`, `name: string`, `maybeNull: boolean` | A1 | Fixed-name property access; `maybeNull` signals optional chaining guards. |
| IndexExpr | `index` | `object: Expr`, `index: Expr`, `maybeNull: boolean` | A1 | Computed access; `maybeNull` stays `true` when guards kept. |
| IndexSignature | `index-signature` | `key: Identifier`, `keyType: TypeNode`, `valueType: TypeNode`, `readonlyFlag?: boolean` | A1 | Class/interface index signature that emits `[key: KeyType]: ValueType`. |
| NewExpr | `new` | `callee: Expr`, `args: Expr[]` | A1 | Constructor call with normalized argument list. |
| ThrowExpr | `throw` | `argument: Expr` | A0 | Expression-form throw used both as statement and nested expression. |
| TryCatchExpr | `try` | `body: Stmt`, `catchClause?: CatchClause`, `finallyClause?: FinallyClause` | A1 | Includes auxiliary nodes for `catch`/`finally`. |
| CatchClause | `catch` | `binding?: Binding`, `body: Stmt[]` | A1 | Optional binding to capture exception value. |
| FinallyClause | `finally` | `body: Stmt[]` | A1 | Executes irrespective of throw. |
| ArrayExpr | `array` | `elements: Expr[]` | A1 | Elements may include `SpreadExpr` entries; commas can appear as separators in source lists. |
| ObjectExpr | `object` | `fields: ObjectField[]` | A1 | `ObjectField` is either `{ kind: "field"; key: string; value: Expr }` or `{ kind: "spread"; expr: Expr }`. Commas can appear as separators in source lists. |
| TemplateExpr | `template` | `parts: Expr[]` | A1 | Interpolated template literals; string literals become raw segments and other expressions become `${...}` slots. |
| NonNullAssertExpr | `non-null` | `expr: Expr` | A1 | Non-null assertion; emits postfix `!` in TypeScript. |
| AwaitExpr | `await` | `argument: Expr` | A1 | Rewritten only inside `async` contexts by Phase B. |
| YieldExpr | `yield` | `argument: Expr | null`, `delegate: boolean` | A1 | Handles both `yield` and `yield*`; Phase B resolves iterator protocol. |
| SpreadExpr | `spread` | `expr: Expr`, `kind: "array" \| "object" \| "rest"` | A1 | Represents every `...` spread/rest after Phase B rewrites. |
| FunctionExpr | `fn` | `callableKind: CallableKind`, `name?: Identifier`, `methodName?: string`, `signature: FnSignature`, `typeParams?: TypeParam[]`, `body: Stmt[]`, `async?: boolean`, `generator?: boolean`, `abstract?: boolean`, `overload?: boolean` | A1 | Covers `fn`, `lambda`, `method`, `getter`, and `setter` forms; Phase B records metadata for decorators, params, `this` annotation. |
| FnParam | helper | `name: Identifier`, `typeAnnotation?: TypeNode`, `paramProperty?: { access?: "public" \| "protected" \| "private"; readonly?: boolean }`, `defaultValue?: Expr` | A1 | Parameter property metadata and default values; parameter properties are only valid on constructor parameters. |
| ClassExpr | `class` | `name?: Identifier`, `typeParams?: TypeParam[]`, `body: ClassBody`, `decorators?: Expr[]`, `extends?: Expr | null`, `implements?: Expr[]`, `abstract?: boolean`, `constructor?: Stmt | null`, `staticBlocks?: Stmt[]` | A1 | Includes metadata for TypeScript sugar (decorators, modifiers, implements). |
| TypeAliasStmt | `type-alias` | `name: Identifier`, `typeParams?: TypeParam[]`, `type: TypeNode` | A1 | Represents TypeScript `type` declarations after Phase B rewrite. |
| InterfaceStmt | `type-interface` | `name: Identifier`, `body: InterfaceBody` | A1 | Represents TypeScript `interface` declarations. |
| EnumStmt | `enum` | `name: Identifier`, `members: EnumMember[]` | A1 | Emits TypeScript enums; Phase A keeps members as optional-value entries. |
| NamespaceStmt | `namespace` | `name: Identifier`, `body: Stmt[]` | A1 | Emits TypeScript namespace blocks; members are normal statements. |
| TypeAssertExpr | `type-assert` | `expr: Expr`, `type: TypeNode` | A1 | Phase B rewrites `as Type` expressions to this form. |
| TypeFunction | `type-function` | `typeParams?: TypeParam[]`, `params: TypeNode[]`, `returns: TypeNode` | A1 | Canonical arrow/function type. |
| TypeObject | `type-object` | `fields: TypeField[]` | A1 | Structured object type. |
| TypeUnion | `type-union` | `types: TypeNode[]` | A1 | Union of alternatives. |
| TypeIntersection | `type-intersection` | `types: TypeNode[]` | A1 | Intersection of alternatives. |
| TypeRef | `type-ref` | `identifier: Identifier`, `typeArgs?: TypeNode[]` | A1 | Reference to named type. |
| TypeThis | `type-this` | (none) | A1 | Represents TypeScript `this` type. |
| TypeLiteral | `type-literal` | `value: literal[]` | A1 | Inline literal type. |
| TypeTemplateLiteral | `type-template` | `parts: Array<string \| TypeNode>` | A1 | Template literal type with string segments and interpolated type slots. |
| TypeMapped | `type-mapped` | `typeParam: TypeParam`, `valueType: TypeNode`, `nameRemap?: TypeNode`, `readonlyModifier?: "readonly" | "-readonly"`, `optionalModifier?: "optional" | "-optional"`, `via?: TypeNode` | A1 | Represents TypeScript mapped types. |
| TypeApp | `type-app` | `expr: Expr`, `typeArgs: TypeNode[]` | A1 | Specialized type application already rewritten by Phase B. |

`Binding` entries, `TypeParam`, `FnSignature`, `ClassBody`, and other helper structures follow the same naming conventions documented in `phase0/src/ast/nodes.ts`. Use this table as the single authoritative reference for field sets, canonical keywords, and phase ownership. The canonical naming table in `phaseA/AST-Spec-Draft.md` still records the interface names that the AST API exposes, so refer to it when you need the plain interface identifier rather than the field definitions.