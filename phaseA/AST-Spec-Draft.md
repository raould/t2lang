# Phase A Canonical AST Draft

## Intent
Capture the minimal set of AST node constructors that Phase A must recognize. The goal is to keep this list small, directly traceable to the existing Phase0/Phase1 nodes and grammar, and gradually expand it as Phase B introduces new sugar or macros that need canonical targets.

## Sources
- `phase0/src/ast/nodes.ts` for the current concrete AST definitions.
- `docs/GRAMMAR.md`, `docs/Phase0_AST_Specification.md`, and `docs/Phase0_Syntax_and_Grammar.md` for the historical sexpr shapes.
- `phase1` features (infix, macros, sugar rewrites) to inform what new canonical nodes Phase A must expose.

## Current Plan
1. Enumerate Phase A statements and expressions, reusing the Phase0 names (`program`, `block`, `if`, `while`, `for`, `switch`, `try/catch/finally`, `return`, `break`, `continue`, `fn`, `class`, `import`, `export`, `type-alias`, etc.).
2. Track the literal and operator constructors already captured in Phase0 (literals, `call`, `prop`, `index`, `new`, `throw`, `array`, `object`, `template`, `type-*` nodes, etc.).
3. Document the expected shape for each node (required fields, optional metadata) and note which Phase B sugar rewrites target it.
4. Maintain a running section for `let*`/`const*` binding structures and the helper APIs Phase B should call when splicing bindings.
5. Update this draft iteratively whenever Phase B adds new sugar that requires Phase A recognition (e.g., infix operators, optional chaining, decorators).

## Statement Nodes and TypeScript Coverage
Phase A keeps only a few canonical primitives per statement class so Phase B can translate TypeScript keywords into those primitives. The table below lists the minimal Phase A nodes, notes how TypeScript surface features map onto them, and highlights where Phase B sugar should emit the canonical form.

| Feature | Phase A Node(s) | Phase A Target | Phase B Work | Notes |
| --- | --- | --- | --- | --- |
| Top-level program | `program` | ✅ existing `Program` body | N/A | Ordered statements/declarations remain canonical. |
| Blocks / lexical scope | `block` | ✅ explicit bodies | ✅ rewrite implicit block syntax | `(block ...)` stays literal; Phase B wraps TypeScript blocks when needed. |
| Bindings (`let`/`const`, destructuring) | `let*` (`isConst`) | ✅ sequential binding list | ✅ rewrite destructuring, comma-separated bindings, and inline splats | Phase B emits `LetStarExpr` with ordered bindings and marks `isConst`. |
| `if/else` | `if` | ✅ condition + branches | ✅ rewrite TS `if`, ternary, and `else if` chains | `IfExpr` plus `block` handles nesting. |
| Looping | `for` (init/condition/update/body) | ✅ canonical slots | ✅ rewrite `while`, `do/while`, `for..of`, `for..in`, `for await`, labeled loops | Missing slots become `null`; iterator helpers wrap the body. |
| `for` | `ForStmt` | ✅ canonical slots | ✅ normalize `for..of`/`for await` to iterator helpers | Fields: `init?: Stmt | null`, `condition?: Expr | null`, `update?: Expr | null`, `body: Stmt`, `isAsync?: boolean`, `label?: string`, `iteratorHelper?: Expr` for sugar rewrites. |
| `switch` / `case` | `SwitchStmt` | ✅ dedicated structural node | ✅ rewrite TypeScript cases into ordered `SwitchCase` lists and inject explicit `break`/`return` transfers when needed | `SwitchStmt` mirrors TypeScript’s grammar; Phase B is responsible for ordering cases and adding control-transfer nodes, so Phase A can keep the canonical shape documented below. |
| `return` | `return` | ✅ explicit return expression | ✅ rewrite implicit final expressions | `ReturnExpr` stays canonical. |
| `break` / `continue` | `break`, `continue` | ✅ transfer nodes (labels optional) | ✅ rewrite labeled/guarded forms | Phase B maps all TS break/continue to these nodes. |
| `function` declarations/expressions | `function` | ✅ `FunctionExpr` metadata | ✅ expand decorators, parameter sugar | Phase B rewrites TS syntax into canonical shape. |
| `class` | `class` | ✅ `ClassExpr` | ✅ rewrite decorators/modifiers | Phase B emits fields/methods metadata. |
| `import` / `export` | `import` / `export` | ✅ canonical metadata | ✅ rewrite `import type`, namespace sugar | Matches Phase0 forms. |
| `type-alias`, `interface` | `type-alias`, `interface` | ✅ `TypeAliasStmt`, `InterfaceExpr` | ✅ rewrite advanced TS sugar (`extends`, `implements`) | Phase B normalizes convenience syntax. |
| `throw`, `try/catch/finally` | `throw`, `try-catch` | ✅ canonical nodes | ✅ rewrite optional clauses | `TryCatchExpr` already tracks bodies. |

Entries not marked as ✅ in Phase A indicate we still need to decide whether to expand the canonical set or leave the behavior in Phase B (e.g., how best to represent `switch`). Use this table to determine the minimal primitives required before Phase B handles syntactic convenience.

## TypeScript Statement Feature Inventory

- `switch` with fall-through/`default` clauses: Phase B emits the canonical `SwitchStmt` node with ordered `SwitchCase` clauses and injects explicit `break`/`return` transfers so Phase A only sees the consistent structural shape documented below.
- `for..of`, `for..in`, `for await..of`: Normalized to the canonical `for` node; Phase B supplies iterator helpers, handles async iteration, and drops unused slots, keeping Phase A unaware of the sugar.
- `async`/`await` in functions and expressions: Phase B annotates `FunctionExpr`/`CallExpr` metadata to mark `async`, and rewrites `await` into explicit helper calls before the AST hits Phase A.
- Decorators and modifiers (`public`, `private`, `static`, `readonly`): Phase B attaches metadata arrays to canonical `class`/`function` nodes, leaving Phase A with the resulting descriptor lists rather than syntactic sugar.
- Module-level features (`namespace`, `import type`, `export type`, `export =`, `export * as`): Phase B rewrites these forms into the simple `import`/`export` nodes Phase A already exposes, carrying the canonical metadata needed for resolution and codegen.
- Labels and control-transfer sugar (labeled `break`/`continue`, `try/catch/finally`): Phase B keeps the user-facing syntax but emits the canonical `break`, `continue`, and `try-catch` nodes, tagging optional label names when needed.
- `return`/`yield`/`throw`: Implicit returns and generator/yield behavior are normalized by Phase B so Phase A only sees explicit `return`, `yield`, and `throw` nodes with resolved expressions.
- Type declarations (`type` aliases, `interface`, `implements`, `type assertions`): Phase B rewrites these to `TypeAliasStmt`, `InterfaceExpr`, and `type-*` nodes, keeping Phase A focused on structural shape rather than TypeScript syntax.
- `let`/`const` with destructuring and comma-separated bindings: Flattened into ordered entries in `LetStarExpr`, with `isConst` flags to distinguish the binding kind.

Each bullet lists a TypeScript surface feature and highlights which phase owns the normalization or canonical node. Use it to decide whether the Phase A node set must grow or if Phase B can continue handling the sugar privately.

## Switch Statement Node
Phase A exposes a dedicated `SwitchStmt` node that mirrors TypeScript’s grammar without enforcing additional semantics. Each switch contains a discriminant expression and an ordered list of cases; fall-through expectations rest with TypeScript once the AST is emitted.

- Node: `SwitchStmt`
	* Fields:
		- `discriminant: Expr` — the expression evaluated once to choose a case.
		- `cases: SwitchCase[]` — ordered clauses, including zero or one case with `test === null` (the `default`).

- Auxiliary node: `SwitchCase`
	* Fields:
		- `test: Expr | null` — `null` denotes `default`.
		- `consequent: Stmt[]` — the statements executed for the case; they rely on existing `break`, `return`, or `throw` nodes to transfer control.

Phase B is responsible for reconstructing TypeScript’s `case`/`default` order and injecting explicit `break` statements when required; Phase A merely ensures the emitted `SwitchStmt` obeys the structural schema above.

## For Statement Node
- Node: `ForStmt`
	* Fields:
		- `init: Stmt | null` — initialization; `null` indicates omitted initializer.
		- `condition: Expr | null` — loop guard expression evaluated each iteration.
		- `update: Expr | null` — afterthought expression for `for` loops.
		- `body: Stmt` — loop body to execute.
		- `isAsync: boolean` — `true` when Phase B rewrites `for await` loops.
		- `label: string | null` — optional label names preserved when Phase B rewrites labeled loops.
		- `iteratorHelper: Expr | null` — helper expression emitted by Phase B for `for..of`/`for..in` to provide iteration semantics without modifying Phase A.

Phase B rewrites all loop variants to this canonical shape, supplying iterator helpers or async wrappers as needed so Phase A only needs to handle the single `ForStmt` form.

## Expression Nodes
### `identifier`
- Node: `Identifier`
- Fields: `name`, optional `symbolId`, optional `typeAnnotation`
- Notes: Phase B resolves bindings and may tag identifiers with metadata such as `symbolId` or inline types before handing them to Phase A.

### `literal`
- Node: `LiteralExpr`
- Values: strings, numbers, booleans, `null`, `undefined`

### `call`
- Node: `CallExpr`
- Fields: `callee: Expr`, `args: Expr[]`
- Notes: This is the only call form Phase A accepts; Phase B rewrites operator syntax, chained calls, and implicit forms into `(call ...)`.

### `prop` / `index`
- Nodes: `PropExpr`, `IndexExpr`
- Use: property and index access with explicit operand structures.
- Optional chaining (Phase B sugar) translates to explicit `if` guards or runtime helpers before Phase A sees `PropExpr`/`IndexExpr`; these nodes do not implicitly allow `null`/`undefined` bypasses unless Phase B rewrote them into dedicated helper calls. Each node carries a `nonNull: boolean` flag to capture whether Phase B ensured the base expression is defined.

### `new`
- Node: `NewExpr`
- Fields: `callee`, `args`

### `array` / `object`
- Nodes: `ArrayExpr`, `ObjectExpr`
- Notes: hold `elements` arrays or `fields` lists; Phase B rewrites shorthand object literals and spread into these explicit nodes.

### `assign`
- Node: `AssignExpr`
- Reused when mutation expressions appear as statements through `ExprStmt` wrappers.

### `function` / `class` expressions
- Nodes: `FunctionExpr`, `ClassExpr`
- Notes: cover lambdas and class expressions with the same metadata as their declaration counterparts.
 - Fields expanded:
	 - `FunctionExpr`: `params: Identifier[]`, `body: Stmt`, `returnType?: TypeNode`, `typeParams?: TypeParam[]`, `async?: boolean`, `generator?: boolean`, `thisAnnotation?: TypeNode | null`, `decorators?: Expr[]`, `isExpression: boolean`. Phase B rewrites TypeScript sugar (default params, rest params, `async`, `generator`) into explicit metadata before handing the node to Phase A.
	 - `ClassExpr`: `name?: Identifier`, `body: Stmt`, `decorators?: Expr[]`, `extends?: Expr | null`, `implements?: Expr[]`, `constructor?: Stmt | null`, `staticBlocks?: Stmt[]`. Phase B rewrites decorators, modifiers, and `implements` clauses to populate these fields while keeping Phase A focused on the canonical class shape.

### `type-assert` / `type-app`
- Nodes: `TypeAssertExpr`, `TypeAppExpr`
- Purpose: explicit TypeScript assertions and type arguments survive into Phase A as dedicated nodes when Phase B rewrites sugar.

### `throw`, `try-catch`
- Nodes: `ThrowExpr`, `TryCatchExpr`
- Notes: executed as expressions/statements with explicit bodies.

## Type Nodes
### Primitives
- `type-string`, `type-number`, `type-boolean`, `type-null`, `type-undefined` — zero-field nodes that represent primitive type literals.

### Structured Types
- `type-array`: `element: TypeNode`
- `type-object`: `fields: TypeObjectField[]` where each field maps a name to a `TypeNode`.
- `type-function`: `params: TypeNode[]`, `returns: TypeNode`
- `type-union` / `type-intersection`: `types: TypeNode[]`

### References & Literals
- `type-ref`: `name: string`
- `type-literal`: `value` matches a runtime literal (`string | number | boolean | null | "undefined"`).

### Applications & Params
- `type-app`: `expr: TypeNode`, `typeArgs: TypeNode[]`
- `typeparams`: recorded via `TypeParam`, which carries `name`, `constraint`, and `defaultType` nodes plus optional metadata.
- `TypeParam` fields:
	- `name: string`
	- `constraint?: TypeNode`
	- `defaultType?: TypeNode`
	- `variance?: "in" | "out" | null` — captures TypeScript variance annotations when Phase B rewrites them.
	- `const?: boolean` — set when the TypeScript `const` modifier applies (TS 5.0 feature).
	- `infer?: boolean` — `true` when Phase B lowers an `infer` type parameter into this structure.

Phase B records additional metadata alongside each `TypeParam`. `constraint` may itself be an intersection/union so an `extends A & B` clause becomes the combined `TypeNode` rather than storing multiple parallel fields. When a conditional type introduces an `infer` binding, Phase B sets `infer = true` and emits linking metadata (e.g., reference to the containing conditional type) so the resolver knows this parameter participates in inference instead of representing a concrete argument. `defaultType` still holds the fallback, while `variance`/`const` mirror TS annotations that need to survive lowering.

### Mapped Types
- `type-mapped`: represents `key in Keys` and owner-mapped semantics. Fields:
	- `typeParam: TypeParam` (the binding introduced by `key in ...`).
	- `valueType: TypeNode` (the mapped value expression).
	- `nameType?: TypeNode` (optional `as` remapping expression).
	- `readonlyModifier?: "readonly" | "-readonly"` (captures `+`/`-` qualifiers).
	- `optionalModifier?: "optional" | "-optional"` (captures `+`/`-` modifiers for `?`).
	- `via?: TypeNode` (the `in` constraint describing the key union).
Phase B rewrites TypeScript mapped types into this node, ensuring each modifier, key remapping, and value expression flows through explicitly before Phase A’s type checker runs.

## Binding Structures
Phase A exposes `LetStarExpr` as the canonical binding node. Each binding entry contains an `Identifier` (with optional inline type annotation) and an initializer expression. Phase B rewrites destructuring, macros, or inline splices into this sequential list before passing the AST to Phase A. Phase A keeps the `isConst` flag on `LetStarExpr` to distinguish const declarations without introducing a separate `const*` constructor.

## Macro & Quote Notes (Phase B only)
Exact macro nodes (`gensym`, `quote`, `unquote`, `unquote-splice`, `__splice`) are omitted from Phase A entirely. They still exist within Phase B’s macro expander for rewriting/ tooling but have no place in the Phase A canonical AST.

## Phase B Macro/Quote Helpers
- `gensym`: deterministic identifier generator (seeded outside Phase A).
- `quote` / `unquote` / `unquote-splice`: quasiquote helpers that Phase B uses when expanding macros.
- `__splice`: internal helper that Phase B unwraps when building `LetStarExpr` bindings.
- Notes: These helpers live in Phase B’s macro expander; the Phase A AST never includes them, but they may annotate tooling metadata until Phase B stabilizes.

## References & Tests
- Documentation: `docs/Phase0_AST_Specification.md` and `docs/GRAMMAR.md` capture the supported sexpr forms that Phase A inherits and refines.
- Implementation: `phase0/src/ast/nodes.ts` enumerates the current node interfaces that Phase A will adopt and simplify if necessary.
- Tests: `phase0/tests/unit` and `phase0/tests/integration` exercises ensure the parser emits these nodes (`phase0/tests/unit/ast.test.mjs` and related suites track canonical parsing, type assertions, imports/exports, and operator use). Use these tests as starting points for verifying Phase A’s node shapes.

## API Stability
The AST API is public so external tooling can hook in, but it is intentionally mutable through Phase B development. The contract only freezes once Phase B is complete and the canonical node set is agreed upon; until then, Phase B and other consumers must adapt to node additions, removals, and field reshaping.
