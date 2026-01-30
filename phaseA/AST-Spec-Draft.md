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
| `if/else` | `if` | ✅ condition + branches | ✅ rewrite TS `if`, ternary, and `else if` chains | `IfStmt` plus `block` handles nesting. |
| Expression-level conditionals | `ternary` | ✅ condition + value branches | ✅ rewrite TypeScript `?:` and expression-style `if` into this expression | Provides a value-producing conditional for bindings or other expression contexts without relying on statement-level `if`. |
| Looping | `ForClassic`, `ForOf`, `ForAwait` | ✅ dedicated node per loop variant | ✅ rewrite each TypeScript loop to the matching node with all required slots | Phase B emits `ForClassic` for traditional `for` loops, `ForOf` for `for..of`/`for..in`, and `ForAwait` for async iteration, supplying binding metadata, labels, iterator operands, and TDZ/hoist annotations as needed. |
| `switch` / `case` | `SwitchStmt` | ✅ dedicated structural node | ✅ rewrite TypeScript cases into ordered `SwitchCase` lists and inject explicit `break`/`return` transfers when needed | `SwitchStmt` mirrors TypeScript’s grammar; Phase B is responsible for ordering cases and adding control-transfer nodes, so Phase A can keep the canonical shape documented below. |
| `return` | `return` | ✅ explicit return expression | ✅ rewrite implicit final expressions | `ReturnExpr` stays canonical. |
| `break` / `continue` | `break`, `continue` | ✅ transfer nodes (labels optional) | ✅ rewrite labeled/guarded forms | Phase B maps all TS break/continue to these nodes. |
| `function` declarations/expressions | `function` | ✅ `FunctionExpr` metadata | ✅ expand decorators, parameter sugar | Phase B rewrites TS syntax into canonical shape. |
| `class` | `class` | ✅ `ClassExpr` | ✅ rewrite decorators/modifiers | Phase B emits fields/methods metadata. |
| `import` / `export` | `import` / `export` | ✅ canonical metadata | ✅ rewrite `import type`, namespace sugar | Matches Phase0 forms. |
| `type-alias`, `interface` | `type-alias`, `interface` | ✅ `TypeAliasStmt`, `InterfaceStmt` | ✅ rewrite advanced TS sugar (`extends`, `implements`) | Phase B normalizes convenience syntax. |
| `throw`, `try/catch/finally` | `throw`, `try-catch` | ✅ canonical nodes | ✅ rewrite optional clauses | `TryCatchExpr` already tracks bodies. |

Entries not marked as ✅ in Phase A indicate we still need to decide whether to expand the canonical set or leave the behavior in Phase B (e.g., how best to represent `switch`). Use this table to determine the minimal primitives required before Phase B handles syntactic convenience.

## Canonical Node Naming

Every Phase A node has a single canonical AST interface name and a fixed s-expr keyword. Phase B and downstream tooling should refer to the canonical interface (left column) when discussing the node shape and use the s-expr keyword (middle column) when showing serialized syntax. This keeps the spec consistent even when older docs mix styles such as `let*`/`LetStarExpr`, `switch`/`SwitchStmt`, or `function`/`FunctionExpr`.

| AST Interface | S-expr keyword | Notes |
| --- | --- | --- |
| `Program` | `program` | Top-level wrapper emitted by every file. |
| `BlockStmt` | `block` | Explicit lexical scope node; Phase B only emits it when TypeScript introduces a new block. |
| `LetStarExpr` | `let*` / `const*` | Sequential bindings (const or let) with `isConst` metadata. |
| `IfStmt` | `if` | Conditional statement/captures guard and branches. |
| `TernaryExpr` | `ternary` | Expression-level conditional that yields either `consequent` or `alternate`; Phase B rewrites TypeScript `?:` and expression `if` forms into this node so value-producing conditionals remain legal. |
| `WhileStmt` | `while` | Named `scope-loop` construct in the grammar. |
| `ForClassic`, `ForOf`, `ForAwait` | `for classic`, `for of`, `for await` | Respectively cover traditional `for`, `for..of`/`for..in`, and `for await..of` loops; see the dedicated sections below. |
| `SwitchStmt` | `switch` | Ordered cases plus discriminant. |
| `ReturnExpr` | `return` | Optional payload expression. |
| `BreakStmt`, `ContinueStmt` | `break`, `continue` | Optional label names tracked on the node. |
| `AssignExpr` | `assign` | Mutation expressions emitted as statements. |
| `FunctionExpr` | `fn` | Covers functions and lambdas; use metadata to convey `async`, `generator`, decorators, and param info instead of additional keywords. |
| `ClassExpr` | `class` | Includes constructors, static blocks, decorators, and extends/implements metadata. |
| `ImportStmt` | `import` | Handles named/default/all namespace imports plus TypeScript-specific aliases. |
| `ExportStmt` | `export` | Reuses the Phase0 export shapes. |
| `TypeAliasStmt` | `type-alias` | Type aliases with optional generics. |
| `InterfaceStmt` | `type-interface` | Interface declarations with body expressions. |
| `ThrowExpr` | `throw` | Expression-form throwing. |
| `TryCatchExpr` | `try` | Try/catch/finally with optional catch binding. |
| `ExprStmt` | `exprStmt` | Wraps expression statements so Phase A only sees explicit side-effect nodes (`assign`, `call`, etc.) instead of bare expressions. |
| `YieldExpr` | `yield` | Generator `yield` (and `yield*`) nodes with `delegate` metadata; Phase B resolves the iterator protocol before emitting this canonical shape. |
| `AwaitExpr` | `await` | Async `await` nodes guaranteed to appear only inside `async` contexts; Phase B rewrites helpers and ensures the operand is resolved before Phase A observes the node. |
| `SpreadExpr` | `spread` | `kind: "array" | "object" | "rest"`, `expr: Expr` | A1 | Represents `...` spread/rest positions inside array/object literals, function/rest params, and destructuring so Phase A can distinguish their semantics before codegen. |

Whenever new nodes appear, extend this table so the canonical names remain authoritative throughout the specification.

## TypeScript Statement Feature Inventory

- `switch` with fall-through/`default` clauses: Phase B emits the canonical `SwitchStmt` node with ordered `SwitchCase` clauses and injects explicit `break`/`return` transfers so Phase A only sees the consistent structural shape documented below.
- `for..of`, `for..in`, `for await..of`: Normalized to the canonical `ForOf`, `ForAwait`, or `ForClassic` nodes depending on the form; Phase B supplies iterator helpers, handles async iteration, and drops unused slots so Phase A only consumes the targeted shape.
- `async`/`await` in functions and expressions: Phase B annotates `FunctionExpr`/`CallExpr` metadata to mark `async`, and rewrites `await` into explicit helper calls before the AST hits Phase A.
- Decorators and modifiers (`public`, `private`, `static`, `readonly`): Phase B attaches metadata arrays to canonical `class`/`function` nodes, leaving Phase A with the resulting descriptor lists rather than syntactic sugar.
- Module-level features (`namespace`, `import type`, `export type`, `export =`, `export * as`): Phase B rewrites these forms into the simple `import`/`export` nodes Phase A already exposes, carrying the canonical metadata needed for resolution and codegen.
- Labels and control-transfer sugar (labeled `break`/`continue`, `try/catch/finally`): Phase B keeps the user-facing syntax but emits the canonical `break`, `continue`, and `try-catch` nodes, tagging optional label names when needed.
- `return`/`yield`/`throw`: Implicit returns and generator/yield behavior are normalized by Phase B so Phase A only sees explicit `return`, `yield`, and `throw` nodes with resolved expressions.
- Type declarations (`type` aliases, `interface`, `implements`, `type assertions`): Phase B rewrites these to `TypeAliasStmt`, `InterfaceStmt`, and `type-*` nodes, keeping Phase A focused on structural shape rather than TypeScript syntax.
- `let`/`const` with destructuring and comma-separated bindings: Flattened into ordered entries in `LetStarExpr`, with `isConst` flags to distinguish the binding kind. Each entry is a `Binding` helper so destructuring patterns (`array-pattern`, `object-pattern`, `rest`) can appear directly in Phase A1 without Phase B inventing helper assignments.
- `spread` / `rest` positions in arrays, objects, and destructuring: Phase B rewrites the `...` sugar into canonical `SpreadExpr` entries so Phase A only sees explicit container nodes with ordinal `spread` markers.

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

## ForClassic Loop Node
- Node: `ForClassic`
	* Fields:
		- `init: Stmt | null` — optional initializer, typically a `let*`/`const*` binding or expression statement.
		- `condition: Expr | null` — guard expression evaluated before each iteration; `null` captures omitted guards.
		- `update: Expr | null` — afterthought expression executed after each iteration.
		- `body: Stmt` — loop body to execute.
		- `label: string | null` — preserved label name when Phase B rewrites a labeled loop.

Phase B rewrites classic `for` loops and any label/async annotations that Phase A requires into this node, keeping inheritance to TypeScript semantics minimal.

## ForOf Loop Node
- Node: `ForOf`
	* Fields:
		- `binding: Binding` — the left-hand binding (identifier or destructuring) describing how the loop variable(s) are introduced; reuses the same shape as `let*` entries so TDZ/const metadata stays consistent.
		- `iterable: Expr` — expression producing the iterator or collection.
		- `body: Stmt` — loop body executed on each iteration.
		- `label: string | null` — optional label name preserved from the source.

Phase B emits `ForOf` for both `for..of` and `for..in`, translating any iterator helpers or `Object.keys` rewrites before handing the canonical node to Phase A.

## ForAwait Loop Node
- Node: `ForAwait`
	* Fields:
		- `binding: Binding` — loop binding, same structure as `ForOf` and `let*` entries.
		- `iterable: Expr` — async iterable expression.
		- `body: Stmt` — loop body running for each awaited value.
		- `label: string | null` — optional label preserved from the original loop.

Phase B rewrites `for await..of` into this node, capturing the async iterator semantics and supplying any helper expressions needed for await behavior before Phase A consumes the loop.

## Binding & Pattern Helpers
- Helper: `Binding`
	* Fields:
		- `target: BindingTarget` — either a simple identifier or one of the destructuring patterns described below.
		- `init?: Expr` — optional initializer used by binding entries and loop headers.
	* Notes: This helper appears inside `LetStarExpr`, `ForOf`/`ForAwait`, and optional `CatchClause` bindings so every declarative binding carries the same TDZ/const metadata even when it destructures objects or arrays.

- Helper union: `BindingTarget`  (identifier | destructuring pattern)
	* Includes the following canonical forms:
		- `Identifier` — simple variable names that behave like legacy bindings.
		- `ArrayPattern` — the `(array-pattern ...)` form described below.
		- `ObjectPattern` — the `(object-pattern ...)` form described below.
		- `RestPattern` — captures `...rest` positions inside array/object patterns.
	* Notes: Phase B rewrites TypeScript destructuring (`{a, b: {c}}`, `[first, ...rest]`, `...rest`) into these canonical targets so Phase A never has to expand the sugar itself.

- Node: `ArrayPattern`
	* S-expr keyword: `array-pattern`
	* Fields:
		- `elements: BindingTarget[]` — the ordered binding targets for each indexed slot.
		- `rest?: BindingTarget` — optional `RestPattern` capturing the remaining elements.
	* Notes: Represents `[a, b, ...rest]` destructuring in declarations, loops, or catch clauses. Nesting is allowed since every `BindingTarget` can itself be a nested pattern.

- Node: `ObjectPattern`
	* S-expr keyword: `object-pattern`
	* Fields:
		- `properties: ObjectPatternField[]` — quoted property names and their targets.
		- `rest?: BindingTarget` — optional spread capturing the remaining properties.
	* Notes: Represents `{a, b: {c}}` or `{a: alias}` forms; Phase B rewrites property aliases/dotted identifiers into the quoted string keys required by Phase A.

- Helper: `ObjectPatternField`
	* Fields:
		- `key: string` — quoted name of the property.
		- `target: BindingTarget` — the nested binding target for that property value.
	* Notes: Mirrors the `(object-pattern-field ...)` grammar helper; every object pattern enumerates its properties before moving to the optional rest slot.

- Node: `RestPattern`
	* S-expr keyword: `rest`
	* Fields:
		- `target: BindingTarget` — the binding target (usually an `Identifier`) that receives the rest value.
	* Notes: Used only inside array/object patterns to capture `...rest` semantics so Phase A knows which binding consumes the remaining elements or properties.

## Expression Statement Node
- Node: `ExprStmt`
	* Fields:
		- `expr: Expr` — the side-effecting expression being executed as a statement.
		- `typeId?: number | null` — preserved when Phase B records type information for diagnostics.
	* Notes: Phase B wraps every TypeScript expression statement (calls, member assignments, update expressions, tagged templates, etc.) in `ExprStmt` so Phase A can rely on a consistent statement node rather than scattered expression shapes. The node is also used for `Expr`-based statements emitted from macros or instrumentation passes.

## Return Expression Node
- Node: `ReturnExpr`
	* Fields:
		- `value: Expr | null` — the optional payload expression; `null` represents `return;`.
		- `typeId?: number | null` — optional analytic metadata.
	* Notes: Phase B normalizes implicit final expressions and return-type sugar by emitting explicit `ReturnExpr` nodes before handing the AST to Phase A. This node captures `return` statements emitted by macros or generated control-flow rewrites so Phase A always sees an unambiguous return site.

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

### `ternary`
- Node: `TernaryExpr`
- Fields: `test: Expr`, `consequent: Expr`, `alternate: Expr`
- Notes: Phase B emits this canonical expression whenever TypeScript needs an expression-valued conditional (the native `?:` operator or an `if` used inline). Because `if` is a statement-level construct, Phase B lowers those sugar forms into `(ternary test consequent alternate)` so bindings and other expression contexts can receive a value without resorting to helper statements.

### `await`
- Node: `AwaitExpr`
- Fields: `argument: Expr`
- Notes: Phase B guarantees this node is emitted only within `async` contexts, rewrites helper calls, and resolves the awaited operand before Phase A sees the expression so later passes can assume the operand already represents the awaited value.

### `yield`
- Node: `YieldExpr`
- Fields: `argument: Expr | null`, `delegate: boolean`
- Notes: Phase B lowers generator `yield` and `yield*` forms into this shape, tracking `delegate` when the iteration is delegated to another iterator and allowing `argument` to be `null` for bare `yield` without a payload.

### `prop` / `index`
- Nodes: `PropExpr`, `IndexExpr`
- Use: property and index access with explicit operand structures.
- Optional chaining (Phase B sugar) translates to explicit `if` guards or runtime helpers before Phase A sees `PropExpr`/`IndexExpr`; these nodes do not implicitly allow `null`/`undefined` bypasses unless Phase B rewrote them into dedicated helper calls. Each node carries a `maybeNull: boolean` flag so Phase B can signal when the base expression may still be `null`/`undefined`; `maybeNull: false` means the guard proved the receiver is defined.
- Nullability inference: Phase A1 runs a pass over the canonical AST that consumes the `maybeNull` flags, propagates non-null information through following expressions/statements (e.g., subsequent `prop`/`index`, `if` conditions, binding initializers), and updates downstream metadata before resolver/typechecker code runs so the normalized nodes expose accurate nullability state.

### `new`
- Node: `NewExpr`
- Fields: `callee`, `args`

### `array` / `object`
- Nodes: `ArrayExpr`, `ObjectExpr`
- Notes: hold `elements` arrays or `fields` lists; Phase B rewrites shorthand object literals and spread into these explicit nodes.

### Spread Elements
- Node: `SpreadExpr`
- Fields: `expr: Expr`, `kind: "array" | "object" | "rest"`
- Notes: `SpreadExpr` represents every `...` occurrence that survives into Phase A—array/object spreads, rest bindings pushed into `LetStarExpr`, object pattern rest fields, and rest parameters. Phase B rewrites the sugar so `ArrayExpr.elements`, `ObjectExpr.fields`, and `FunctionExpr` signatures/`Binding` targets include a `SpreadExpr` entry whenever the original source used spread/rest syntax, keeping the canonical containers explicit about their spreads. The `kind` flag distinguishes the semantics of each usage (`"array"` for array literals, `"object"` for object literals, and `"rest"` for rest parameters/pattern captures) so downstream passes can emit the correct TypeScript behavior (merging properties vs concatenating elements vs collecting trailing values).

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
Phase A exposes `LetStarExpr` as the canonical binding node. Its fields are:
	- `bindings: { name: Identifier; init: Expr }[]` — the sequential binding pairs (destructuring and macro splices lower into entries here).
	- `body: Stmt[]` — the statements that execute after the bindings (this is the `<statement>*` suffix from the grammar, not a separate sibling node).
	- `isConst: boolean` — `true` when Phase B rewrites a `const*`, `false` for a `let*` form.
Phase B rewrites destructuring, macros, or inline splices into this sequential list before passing the AST to Phase A; the `isConst` flag keeps the const bonus without introducing a separate `const*` constructor. The grammar’s `(let* (binding ... ) (stmt ...))` and `(const* ...)` forms therefore both map to this single `LetStarExpr` shape with `isConst` toggled.

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
