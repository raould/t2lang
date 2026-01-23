PhaseA canonical AST now records detailed `TypeParam` metadata (variance, `const`, `infer`). When wiring the resolver/typechecker, ensure these flags influence variance checking, const inference, and `infer` handling so the generics implementation honors Phase B’s rewrites.
Extend this metadata so `constraint` can carry intersections/unions (for `extends A & B`), and Phase B sets `infer = true` only when a conditional type introduces the binding alongside contextual hints (e.g., which conditional type or inference target it belongs to). Use the `infer` flag to drive deferred inference instead of inventing additional AST nodes.
Design the error registry loader: read `phaseA/errors/reg_errors.json`, treat every message as a literal string (no interpolation), and append runtime data (locations, tokens) separately when emitting diagnostics. Maintain categories/severities there so downstream tooling can filter by parse/type/codegen. IDs must be the fully qualified strings with the `T2:` prefix so search engines can index the canonical reference, and future subsystems can reserve their own prefixes if needed.
Parser recovery helpers should emit a registry entry when encountering malformed syntax, then skip to the next statement boundary (respect balancing tokens) so we can continue building a partial AST. Ensure downstream stages can detect the errored subtree, stop codegen, but still produce traces/logs for the remainder of the file.

Precedence-sensitive behaviors need their own regression infrastructure. Keep a TypeScript-only suite of fixtures whose runtime outputs would differ if any of the TypeScript-only operators (`extends`, `infer`, `keyof`, `typeof`, `? :`, `[]`, etc.) re-associate, and compile each fixture with `tsc`/`node` to capture the gold output. Then author matching t2lang fixtures that exercise Phase B’s sugar/infix layer and run them through `t2lang → .ts → tsc → .js → node`, asserting the runtime results match the TypeScript baseline. This end-to-end pairing makes it obvious when a precedence tweak in the sugar or rewrite layer drifts away from the TypeScript semantics, and it keeps the regression suite empirically maintained instead of relying on a theoretical table.

Module resolution remains the responsibility of the downstream TypeScript/JavaScript toolchain. t2lang only produces `.ts` that assume whatever module resolution rules the consumer already has configured (`tsconfig`, bundler, runtime). We intentionally avoid re-implementing path lookup, node_modules traversal, or platform-specific loading at the t2lang layer so that the emitted artifacts behave identically to hand-authoring the equivalent TypeScript.

Phase B should emit `ForClassic`, `ForOf`, or `ForAwait` depending on whether it is rewriting a classic `for`, a `for...of`, or a `for await...of`. Each node carries exactly the fields needed by that loop form (init/cond/update vs iterator binding vs async flag) so the resolver/typechecker can treat them simply instead of unraveling nullable helpers.
Destructuring bindings in Phase A1 must mirror TypeScript’s iterator patterns. The current `Binding` shape (`name: Identifier; init: Expr`) that `let*` reuses isn’t enough for constructs like `(for (const {a, b: {c}} of items) ...)`. Phase A1 therefore needs to accept richer patterns (e.g., a `Pattern` node or equivalent destructuring shape) so macro authors and Phase B sugar can emit these loops directly. Phase A0 itself can stay simple: once Phase A1 has interpreted the destructuring, it lowers the pattern into sequential bindings/assignments before handing the minimal calculus to Phase A0, so A0 still only requires identifier-based binding entries.

Optional chaining must be rewritten in Phase B before visiting Phase A: replace controls using `?.`/`?.[]` with explicit guard statements or runtime helper expressions, and set the resulting `PropExpr`/`IndexExpr`’s `maybeNull` flag to `true` when the receiver might still be `null`/`undefined`. Treat `maybeNull: false` as shorthand for “no guard needed,” while `true` signals downstream stages that extra null/undefined checking already took place. This keeps the Phase A core free of `?.` syntax and preserves explicit control-flow for diagnostics. Phase A1 takes ownership of the `maybeNull` metadata by running a nullability inference pass right after parsing/expansion: the pass reads the flags, propagates any proven non-null information through dependent expressions/bindings, and updates each access node so resolver/typechecker/codegen sees the accurate null status without redoing the optional-chain analysis.

Spread/rest occurrences now observe a `SpreadExpr` with a `kind` flag (`array`, `object`, or `rest`) so Phase A can interpret the differing semantics (array literal concat, object literal merge, rest parameter capture, destructuring rest). Phase B still rewrites the sugar into `SpreadExpr` entries inside `ArrayExpr.elements`, `ObjectExpr.fields`, `FunctionExpr` signatures, or `Binding` targets, but it must also set the `kind` so the downstream passes know whether to treat the spread as a property merge, elements concatenation, or trailing-value capture.

Mapped types must similarly be lowered in Phase B: emit `type-mapped` nodes with the bound `TypeParam`, value expression, optional `as` remapping, readonly/optional modifiers, and the `in`-source key type. Resolver/typechecker code consumes these nodes directly instead of reintroducing `in`/`as` sugar inside Phase A.

- Phase B rewrites must emit explicit parameter type names and parenthesized arrow-function type syntax whenever such types appear inside other expressions (`(s: string)=>void` is required, whereas `n => number | string` is ambiguous). Always inject the parentheses so Phase A’s parser/type checker receives the unambiguous shapes documented in `phaseA/GRAMMAR.md`.

```

## IDE Interoperability Design

We keep Phase A/B focused on producing canonical artifacts so IDEs can map from the high-level t2lang source through the compiler down to the generated TypeScript/JavaScript without re-implementing their own parser or resolver. The guiding principle is to publish a small, stable slice of metadata alongside every compilation that mirrors the AST while carrying the extra references an editor needs (spans, node IDs, module contexts, macro origins, and symbol meanings).

- **Canonical spans and IDs.** Every Phase A node continues to expose a `span` (start/end offsets and original file path) plus a stable `nodeId` that survives rewrites, letting an IDE point from text to the right AST node and back. The resolver/typechecker annotates these nodes with symbol identities so hover/completion requests can bundle a node plus its declaration chain.
- **Source-map and trace alignment.** Phase B emits the same `nodeId`s it receives, and the codegen attaches them to the generated TypeScript expressions and the final JavaScript output. That makes it straightforward to generate source maps and trace logs that admit IDEs writing `nodeId` → `trace` lookups without needing to reparse the original t2lang file.
- **Diagnostics & code actions.** Diagnostics already carry typed registry IDs (`T2:scope`) and literal text so language clients can filter or translate them; IDEs can enrich each diagnostic with a `nodeId`/span pair so quick fixes and explainers can be anchored to the precise AST element that produced the error.
- **Macro/mapped-type awareness.** The metadata manifest includes a `macroExpansion` table linking an expanded Phase A subtree back to the macro invocation that produced it (phase1 bridges the gap). IDE features like `goto definition` and rename can climb out of the expansion while composers see the original sugar form in tooltips.

For tooling integration the compiler exposes a compact JSON manifest (e.g., `phaseA/ide-metadata.json`) containing per-file node mappings, exported symbols, diagnostics, and a minimal module graph. Editors can subscribe to this manifest whenever they run the CLI (watch mode or per-request) instead of embedding t2lang-specific parsing logic in the IDE. That manifest, together with the emitted source map, lets the IDE provide accurate navigation, refactorings, and debugging support while leaning on TypeScript's existing language services.

## LetStarExpr Body Semantics

Phase A treats let*/const* as a flat sequence of bindings followed by statements—there is no hidden nesting of binding lists. The draft says Phase B rewrites every ergonomic form into a canonical LetStarExpr whose only structure is “name/init pairs followed by a body,” so anything emitting binding entries must produce them as part of a single sequential list rather than stacking nested let*s. That paragraph is spelled out here: PhaseA-PhaseB-Spec-Draft.md:26.

The grammar reinforces that: <let-star> is defined as ("(" "let*" <binding>* <statement>* ")" ), so once you’re inside a let*, the parser only expects binding tuples, not other bodies or nested let* forms, until it switches over to statements. When a macro splices bindings, it must therefore insert those binding tuples into the <binding>* segment—flattening them into the existing list—while any extra statements belong in the <statement>* portion that follows. See the production at GRAMMAR.md:60.

## Expression / Statement split with TernaryExpr

Phase A deliberately keeps if/switch/return etc. reserved for statements, so Phase B has to rephrase any expression-level control flow into something statement-compatible before it hands the tree to Phase A. Introducing ternary is one part of that—Phase B rewrites expression-side conditionals into (ternary cond then else). But macros can emit arbitrarily many statements (e.g., begin, multi-expression bodies), and a direct ternary can’t accept a begin that produces a temporary value.

That’s why Phase B needs to hoist those statements into bindings and feed Phase A the pattern Phase A already understands: a let*/const* sequence that runs the statements and then uses the final value in the ternary. For your (or-default (begin ...) fallback) example, the macroexpander or a later rewriting pass would either reject it (if the macro deliberately disallows statement bodies) or transform it into something like:

Phase A already understands that shape; the ternary sees just expressions, and the preceding let* handles the statement execution.

If you’d like Phase B to do that automatically, the rewrite needs to:

Detect when a macro-generated operand contains non-expression statements (begin, if statements, etc.).
Hoist them into a sequential binding whose body supplies the resulting expression.
Keep ternary’s arguments expression-only so Phase A never sees statements inside it.
Phase A doesn’t need new nodes for this because let* plus ternary already describe the canonical form, but Phase B will need the hoisting logic and a pass that injects the binding/temp and rewrites the macro output accordingly.

## Spread semantics

Implement the Phase A1 nullability inference pass so maybeNull metadata is actually consumed before type checking.
Update Phase B’s rewrites to emit SpreadExpr nodes with the appropriate kind value in each spread/rest context and ensure downstream passes respect that distinction.
