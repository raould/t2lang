# T2 Phase A/Phase B Specification Draft

> T2lang is not a runtime. It never executes code on its own; it only rewrites ergonomic source into canonical forms that downstream TypeScript (and thus Node/Browser runtimes) consume. There is no intent to ship a t2lang runtime or to perform full TypeScript-style typechecking inside t2lang itself—the only way to run t2lang code is to compile it to TypeScript and then run that output through the TypeScript toolchain and an existing JS runtime.

## Purpose
Capture the language rules, tricky edge cases, and the macro/sugar hacks so we can reason about a clean reimplementation that uses the Phase A/B naming. Phase A is the new equivalent of Phase 0—still the minimal canonical core (sexpressions correspond one-to-one with AST constructors, no macros). Phase B corresponds to Phase 1 and provides the ergonomic layer: lexical rewrites, sugar, and macros that normalize back into Phase A's pipeline. This draft references the old system as a directional sketch but keeps the focus on the new Phase A/B boundaries, their interop points, and the expectations for tooling.

Phase A/B are not tied to the current Phase0/Phase1 implementation—they represent the tightened, future-facing specification we plan to reimplement. Phase0/Phase1 are rough drafts that helped us explore the design space, but the Phase A/B effort is intentionally re-specifying everything from the ground up before rewriting the compiler to match the cleaner, canonical pipeline described here.

---

## Phase A: Split Design (A0 + A1)

- **Phase A0 (Minimal Calculus)** is the pure, TypeScript-agnostic sexpr AST: lambdas, applications, sequential bindings, literal primitives, and the bare control-flow constructs (`return`, `break`, `continue`, `if`, `while`, `switch`). It carries only the metadata needed for hoisting/TDZ tracking so the resolver and code generator can remain deterministic. No TypeScript-specific sugar, optional chaining, or mapped-type nodes live here. This is the layer that Phase B (and any other front-end) can target when it just wants a canonical, language-agnostic IR.
- See `phaseA/PhaseA0-Overview.md` for the precise calculus that Phase A0 exposes.
- **Phase A1 (TypeScript Bridge)** reintroduces the TypeScript plumbing on top of A0: typed declarations, generics, conditional/mapped types, optional chaining guards, and the richer loop variants. Phase A1 transforms the ergonomic `phase1` syntax into these structured TypeScript-friendly nodes before handing them off to the Phase A0 resolver/typechecker/codegen helpers. All of the existing grammar/AST details we document (typeparams, type-mapped, `ForClassic`/`ForOf`/`ForAwait`, etc.) live in this layer, and Phase B is responsible for rewrites that produce A1 nodes.

### Phase A0 vs A1 Responsibilities

- **Phase B targets Phase A1 directly.** Every ergonomic TypeScript construct is lowered into one of the A1 nodes documented in `phaseA/GRAMMAR.md` (and enumerated in `phaseA/AST-Spec-Draft.md`). Phase B never emits A0 primitives directly because it needs the richer TypeScript metadata to perform desugaring, resolve generics, and maintain TDZ/const semantics. Only after Phase B finishes its rewrites does the pipeline optionally strip those metadata-heavy nodes down to the A0 calculus when only the minimal core is required.
- **Phase A1 grammar owns the TypeScript-aware productions.** The EBNF in `phaseA/GRAMMAR.md` defines the s-expr keywords and node shapes that Phase A1 accepts (`type-params`, `type-mapped`, `for-classic`, `for-of`, `for-await`, optional chaining guards, etc.). These productions describe the exact tree Phase B must emit; the same grammar also indicates which nodes carry extra metadata (e.g., `function`/`class` with decorators or `type-mapped` modifiers). Whenever Phase B introduces a new construct (a sugar rewrite, macro, or operator), it extends this grammar so the responsibility boundary stays explicit.
- **Phase A0 grammar is a strict subset.** Once TypeScript-specific annotations are resolved, Phase A1 may lower nodes to the subset described in `phaseA/PhaseA0-Overview.md` (only `program`, `block`, `if`, `while`, `switch`, `for-classic`, `for-of`, `for-await`, `let*`, `const*`, etc.). The resolver/typechecker helpers that live under `phase0/` consume this minimal calculus. Keeping the boundary explicit ensures that Phase A0 never surprises Phase B by expecting TypeScript sugar it did not rewrite.
- **When to drop metadata:** Some downstream tooling (tracing, serialization, codegen) runs over Phase A1 for diagnostics but then continues with Phase A0 for the actual TypeScript output. The transition simply means dropping TypeScript-specific nodes or rewriting them into the core constructs—e.g., `type-mapped` may turn into `type-object` in A0, optional chaining guards become explicit `if` statements plus `PropExpr`/`IndexExpr`, and `FunctionExpr` loses decorator metadata once codegen has recorded it. Phase B coordinates this lowering so both layers stay in sync.
- Phase A1 is the phase whose grammar we document in this file; it is what TypeScript-aware tooling targets before exporting the canonical Phase A0 AST to the shared lower layers.
- Every file is an explicit `(program ...)` form with a sequence of primitive statements (`block`, `if`, `while`, `for`, `return`, `let*`, `const*`, `assign`, expression statements, `fn`, `class`, `import`, `export`, `type-alias`). The new [`phaseA/GRAMMAR.md`](phaseA/GRAMMAR.md) records the precise EBNF that describes these primitive forms, including dedicated nodes for `ForClassic`, `ForOf`, and `ForAwait` so each TypeScript loop variant maps to its own canonical AST shape instead of being overloaded.
- `let*` and `const*` exist only as sequential binding primitives; they expose the minimal structure Phase A understands (name/init pairs followed by a body). Phase B rewrites every ergonomic form into the canonical `LetStarExpr` (the table in `phaseA/AST-Spec-Draft.md` describes the `isConst` flag that distinguishes the kind) and hands that single node to Phase A’s resolver/typechecker/codegen. Quote, unquote, and unquote-splice never reach Phase A; Phase B fully expands every macro form before Phase A parsing even begins.
- Phase A’s AST is public to allow additional tools to interoperate once Phase B stabilizes, but the AST API is intentionally unstable during development. We expect Phase B (and subsequent tooling) to consume the exposed AST helpers directly, while the exact node shapes may still evolve until Phase B is feature-complete. After Phase B ships, the AST contract becomes fixed so other consumers have a stable surface.
- Control flow forms are unadorned; `_`/`null` placeholders, macros, and TypeScript-specific conveniences are delegated entirely to Phase B rewrites. Implicit returns are listed here only as a future Phase B todo—Phase A always requires explicit `return` expressions so codegen, resolver, and diagnostics operate on deterministic control flow.

### Expressions & Calls
- Literals remain the raw constructors tracked by [docs/Phase0_AST_Specification.md](Phase0_AST_Specification.md): numbers, strings, booleans, `null`, `undefined`, arrays, objects, and structured type forms.
- Call nodes are strictly `(call callee arg1 arg2 …)`; there is only one call form in Phase A. Implicit lists and infix forms live exclusively in Phase B, which rewrites them into this canonical representation. This ensures Phase A stays free of precedence or syntactic sugar.
- Property/index access (`(prop ...)`, `(index ...)`), `new`, `throw`, `try`, and other primitives exist only with explicit parentheses; TypeScript shorthands (dotted access, method chaining, optional chaining, spread) are expanded by Phase B before Phase A ever runs.
- Property access follows a two-node model: fixed-name lookups (the old `prop`) still require string literals, while computed labels are lowered into the `index` node when Phase B sees an expression property name (e.g., `obj[methodName]`). Method calls on dynamic keys therefore become `(call (index obj methodName) args...)`, so there is no separate computed `prop` form—`prop` always points at a literal property name, and computed access flows through `index` instead.

### Type System & Type Checker
- Phase A keeps a small structural type language: `type-string`, `type-number`, `type-boolean`, `type-null`, `type-undefined`, `type-array`, `type-object`, `type-function`, `type-union`, `type-intersection`, `type-ref`, `type-literal`, plus `type-alias`/`type-interface` nodes.
- The phaseA type checker is intentionally minimal: it validates the syntactic shape of types, preserves metadata for downstream codegen, and does not implement TypeScript’s inference or generics semantics. All macro-generated annotations must reduce to these canonical nodes.
- Type annotations are attached only where Phase B rewrites them into explicit nodes (bindings, returns, fields); Phase A itself never invents a `: Type` shorthand.
- Phase B must also insist Arrow Function Type expressions are parenthesized when they appear inside unions, intersections, or as parameter/result annotations (e.g., `(s: string) => void` vs. the ambiguous `n => number | string`). The canonical AST only accepts the unambiguous shapes described in `phaseA/GRAMMAR.md`, so Phase B is responsible for adding the parentheses and the required parameter type names before handing the tree to Phase A.

### Deferred TypeScript Type Features
We recognize that TypeScript exposes richer type constructs than the ones listed above (conditional types with their surrounding `T extends U ? X : Y` wrapper, template literal types, index access types `T[K]`, `keyof`/`typeof` type operators, labeled tuple types, readonly arrays, and others). These features are not defined in Phase A/B yet; they remain deferred to future work that will define the rewrites translating each construct into the Phase A0 type calculus before type checking or codegen runs.
It is known that supporting these features in the future may require a substantial rewrite or extension of the spec, so we cannot claim that our current Phase A/B nodes already permit a straightforward implementation. We simply do not have the time right now to invest in capturing them, so they remain part of the backlog until we can revisit the type system with the necessary resources.
- Phase B records richer metadata on each `TypeParam` so the constraint can be any `TypeNode` (allowing `extends A & B` to become a single intersection) and the `infer` flag is only `true` when a conditional type introduces that binding; resolver/typechecker code uses the flag plus the conditional-type context to perform inference without inventing new syntax. Phase B also rewrites mapped types into the new `type-mapped` node (with dedicated fields for the key binding, `as` remapping, modifiers, and the mapped value) so TypeScript’s mapped-type sugar never reaches Phase A directly.
- Phase B orchestrates resolution/inference: it consumes Phase A’s AST, configures resolver/typechecker/codegen pipelines (shared helpers living in `phase0/src/resolve/`, `phase0/src/typecheck/`, `phase0/src/codegen/`), and supplies the metadata (symbol tables, generics constraints) needed for real inference. Phase A exposes the core checker to enforce structural typing and to serve as the shared implementation, but Phase B owns the policy layer that handles generics, inference, and union/intersection narrowing before or after calling into the Phase A helpers.

### Classes, Functions, Imports/Exports, Control Flow
- Classes/functions are the minimal constructors that Phase0 already defines; there are no decorators, implicit `public`, `private`, or `static` forms—those decorators are rewritten by Phase B macros into metadata attached to `field`/`method` nodes.
- Imports/exports follow the Phase0 AST forms (`import-default`, `import-named`, `import-all`, `export`, `export-default`). TypeScript-specific variants such as `import type`, `export * as`, or namespace imports are broken into canonical Phase A nodes by Phase B sugar.
- Control flow keeps `switch`, `try/catch/finally`, `break`, and `continue` as their explicit S-expr counterparts with no TypeScript-specific simplifications. Support for TypeScript's `switch` targets a dedicated Phase A node; Phase A enforces syntactic validity (case labels, `default`, `break`, `return`, `throw` placements) but does not impose fall-through rules beyond emitting valid AST for the downstream TypeScript generator. Phase B may still introduce helper lambdas to share code between cases, but as long as the emitted switch AST matches TypeScript's grammar the TypeScript compiler is responsible for enforcing fall-through behavior. When Phase B rewrites TypeScript switch bodies, it must ensure each `SwitchCase`’s `consequent` list terminates with explicit control-transfer nodes (`break`, `return`, `throw`) so the generated `.ts` is syntactically valid and the downstream emitter can defer fall-through checks to TypeScript.

### Operator & Literal Support
- Operators stay as plain s-expr call nodes documented in [docs/TODO_OPS.md](docs/TODO_OPS.md); there is no precedence resolution in Phase A—it simply records the operator call head and operands.
- Literal and property/access forms likewise stay explicit; any TypeScript literal sugar (template strings, arrays, objects with shorthand keys) must be normalized by Phase B macros before reaching this core.
- Optional chaining is also desugared entirely during Phase B. When the source uses `?.` or `?.[]`, Phase B rewrites the access into explicit guards (e.g., an `if` that checks `null`/`undefined` before continuing) or inserts the appropriate runtime helper so Phase A sees only canonical `prop`/`index` forms. Phase B must set the `maybeNull` flag to `true` when the receiver could be `null` or `undefined` and `false` when the guard proves the receiver is defined; this keeps downstream stages aware that a `{maybeNull: true}` path may need extra runtime checks.

### Discipline & Pipeline Expectations
- Phase A keeps naming aligned with the minimal calculus (`fn`, `(call ...)`, `(prop ...)`), and all explicit parentheses enforce sequential evaluation. All macro logic lives in Phase B; Phase A exposes APIs (parsing, normalization, AST helpers) that Phase B explicitly calls rather than inheriting. Any user-facing renaming or sugar (e.g., offering `function` aliases, shorthand binds, implicit returns) must happen in Phase B so the core remains small and deterministic.
- Rather than embedding shared logic directly into either phase, create a dedicated `common` workspace (as already exists under `t2lang/common`) for helpers that both phases need. Phase B should never duplicate Phase A internals; instead, it should consume Phase A through its documented API surface. The compiler pipeline remains strictly feed-forward: Phase B rewrites feed canonical Phase A ASTs, then resolver/typechecker/codegen execute without feedback loops. Serialization and tracing are read-only hooks that observe this pipeline to keep behavior predictable and easy to reason about.
- Scoping rules must mirror TypeScript as closely as possible. Phase B tracks lexical boundaries (functions, blocks, `if`/`else`, loops, switches) and only emits a `block` node when TypeScript actually introduces a new scope; otherwise it reuses the surrounding block and updates symbol tables via metadata (e.g., `scopeBoundary: true`) so the resolver can fuse scopes without exploding parentheses. `LetStarExpr`, `ForClassic`, `ForOf`, `ForAwait`, and `FunctionExpr` carry TDZ/const/hoisting metadata so Phase A can enforce temporal dead zone semantics even when Phase B coalesces braces. Shadowing rules remain TypeScript-compliant: a later binding shadows earlier ones within the same scope, and the resolver records each scope’s environment explicitly so destructuring and macros cannot accidentally leak outer symbols.

### Expression vs Statement Tradeoffs
- Phase A is expression-oriented to simplify composition, but TypeScript semantics are statement-based when it comes to `return` and `break`. We plan to explore the following alternatives before settling:
- Statement-Compatible is the chosen approach: Phase A explicitly includes the TypeScript control statements (`return`, `break`, `continue`, loop forms, `switch`) while keeping the surrounding expressions composable. This keeps the AST predictable for resolver/codegen and imposes a minimal rewrite burden on Phase B.
- The minimal statement set keeps the core calculus lean while still giving downstream tooling explicit constructs to reason about control flow. The remaining sugar (implicit returns, macros, optional chaining, etc.) rewrites into these statements before Phase A runs so Phase A never sees raw TypeScript shorthand or macro forms.
- Diagnostics and codegen can point directly at the statement nodes, reducing the need for origin metadata while still allowing the rest of the AST to stay highly compositional.
- “Statement-compatible” means every control flow form that can interrupt evaluation lives as a statement in the Phase A grammar. TypeScript's `if`, `switch`, loops, `return`, `break`, `continue`, and `throw` never appear inline inside another expression; instead Phase B rewrites any expression-form control flow into the matching canonical nodes before handing the AST to Phase A. When a value is required from a conditional (for example, in a binding initializer), Phase B emits the dedicated `ternary` expression `(ternary cond then else)` so the result can be consumed in expression contexts even though `if` remains a statement. This keeps bindings such as `(const* ((x (ternary condition a b))))` valid even though the `if` statement itself cannot live inside the binding list. Otherwise, `if` only produces a value when its `then`/`else` branches contain explicit `return` statements or expression statements whose results are discarded.
- A `block` produces no implicit value—the only way to expose a result is via an expression statement (which Phase B may insert when sugar needs it) or an explicit `return`. Phase B must still emit the parameterized arrow-function type syntax described earlier (`(s: string)=>void`), but an `if` used inside a type annotation is rewritten into the canonical `if` statement and any desired result value is captured by explicit bindings/returns, not by relying on an expression’s last value.
- `return`, `break`, and `continue` behave exactly like their TypeScript counterparts: they are statements that transfer control out of the nearest enclosing function or loop, and they optionally carry an expression when values need to escape the current block. The Phase A resolver/typechecker tracks those jumps explicitly so it can ensure, for example, that `return` is only used inside functions and that `break`/`continue` are scoped to loops. Expression nodes (calls, arithmetic, property access, etc.) continue to live alongside these statements in the AST, but they never capture the control-flow semantics that belong to statements.
- Because Phase A is otherwise expression-oriented, the statement-level control flow is the only place the engine models jumps: the resolver/typechecker records the enclosing `function` or loop when type checking each `return`/`break`/`continue`, and Phase B must forward metadata (TDZ/hoisting, point of origin) to keep diagnostics precise. Expressions surrounding these statements simply evaluate in sequence, and any value that needs to propagate outside a statement must appear as the optional payload expression on the statement itself—there isn’t a separate “result” of the block that subsumes the statement.

---

## Phase B: Sugar, Macros, and Diagnostics (inherited from Phase1)

Phase B reads ergonomic TypeScript-flavored syntax, rewrites type annotations, macros, and infix syntax back into Phase A, and then reuses the resolver/typechecker/codegen pipeline. The pipeline is strictly linear: Phase B runs its lexer/parser/macro expander, normalizes every construct into the canonical s-expr AST that Phase A already understands, and then hands that AST (or its serialized form) straight to Phase A’s helpers. Macro expansion happens entirely within Phase B (and therefore before Phase A1 emits Phase A0 nodes); Phase A does not reparse the original ergonomic text and never sees macro forms. It simply consumes the canonical sexprs that Phase B produces and feeds them into the shared resolver/typechecker/codegen helper implementations.

### Lexical & Structural Sugar
1. **Lexer transforms** (`phase1/src/parse/lexer.ts`): dotted identifiers (`a.b.c`), sigil field names (`.foo`), quasiquoted symbols, and optional commas are tokenized to reduce friction when mixing TypeScript-like punctuation with sexpr structure.
2. **Sugar rewrites** (`phase1/src/parse/sugarRewrite.ts`): rewrite dotted calls (`obj.method args...` to `(call (prop obj "method") args...)`), inline type annotations (`(fn (x: number) : number ...)`), `type`/`interface` shortcuts, optional chaining, and macro-friendly implicit array/object fields.
3. **Infix notation pipeline** (future work): plan to parse expressions that look like `a + b * c` or `a ?? b` and rewrite them to normalized call forms while keeping precedence explicit.

### Canonical Nodes From Sugar & Macros
Phase B macro expansion and sugar rewrites emit the canonical Phase A nodes so downstream tooling always sees the same shapes. Expression statements, for example, wrap calls, assignments, or macro-provided helpers inside `ExprStmt`. Macros that emit control flow surface as `ReturnExpr`, helpers for async/await produce `AwaitExpr`, generators map to `YieldExpr`, and every `...` spread/rest position becomes `SpreadExpr` with a `kind` flag (`array`, `object`, or `rest`) so the downstream phases can differentiate array concatenation, object merging, and trailing-value/rest captures. Keeping this catalog short lets macro authors and sugar passes know exactly which canonical nodes to produce when they normalize ergonomic syntax.

### Macros & Hygiene
- Macros mirror Clojure's model: `defmacro`, quasiquoting with `quote`, `unquote`, and `unquote-splice`, `reader macros` for sigils, and `gensym` for hygiene (`phase1/src/expand/macroExpander.ts`). The Phase B expander uses a deterministic `GensymGenerator` similar to `phase0/src/lib/gensym.ts` but seeded per-run so macro expansion is reproducible. The generator still produces `${prefix}${counter}` identifiers while the configuration supplies the starting counter or seed (which, together with prefix counters, is logged in the tracing stream) so two runs with the same seed yield the same symbol names. After expansion, Phase B emits the final gensym state (per-prefix counters and current values) to the trace log for replay.
- In line with review item §1.1, Phase B expands every macro before Phase A so canonical Phase A ASTs never include `Quote`, `Unquote`, or `UnquoteSplice` nodes; quoted forms remain entirely within Phase B.
- Quoted values differentiate between strings, symbols, and data structures so macros can concatenate, evaluate, or manipulate syntactic fragments without confusing string interpolation with code.
- Macro expansion respects implicit TypeScript semantics: macros can emit `let*`, `const*`, `type` declarations, or even macro forms that produce other macros; the expander runs until no macro forms remain.
- Phase B optional runtime helpers produce prop-call guards when sugar introduces dynamic access and may introduce implicit returns that mirror TypeScript's expression statements; this implicit-return sugar remains a Phase B TODO and must keep emitting explicit `return` nodes before handing the AST to Phase A.

### Macro Examples
These patterns demonstrate how Phase B macros surface in the syntax; each shows the original call site, the `defmacro` definition, and the expected canonical expansion complete with `quote`/`unquote`/`unquote-splice` helpers. All of the macros run inside Phase B, and the expansions are what Phase A ultimately receives.

1. **`when` (single branch guard)**
     ```lisp
     (defmacro when (cond & body)
         `(if ~cond
                    (let* () ,@body)
                    (void)))

     ;; use
     (when ready
         (log "go"))

     ;; expands to
     (if ready
         (let* ()
             (log "go"))
         (void))
     ```
     This hides the `else` branch and emits a `LetStarExpr` block so Phase A sees only canonical statements.

2. **`cond` (multi-branch branching)**
     ```lisp
     (defmacro cond (& clauses)
         (if clauses
             `(if ,@(take 2 clauses)
                        ,(if (next clauses)
                             `(cond ,@(drop 2 clauses))
                             (third clauses))
                        (void))
             (void)))

     ;; use
     (cond
         (> x 0) (return "pos")
         (< x 0) (return "neg")
         :else (return "zero"))

     ;; expands to nested `if` statements with explicit `return`s, so Phase A only sees `IfStmt`/`ReturnExpr` nodes.
     ```

3. **Threading macro (`->`)**
     ```lisp
     (defmacro -> (value & forms)
         (reduce (fn [acc form]
                             (if (list? form)
                                 `(, (first form) ~acc ,@(rest form))
                                 `(,form ~acc)))
                         value
                         forms))

     ;; use
     (-> value
             (call foo 1)
             (prop bar)
             baz)

     ;; expands to
     (baz (prop (call foo value 1) bar))
     ```
     Each intermediate expansion is already in canonical `call`/`prop` form so Phase A never sees the sugar.

4. **Pattern-matching helper (`match`, medium complexity)**
     ```lisp
     (defmacro match (expr & clauses)
         (letfn [(phrase [clause]
                             (let [[pattern body] clause]
                                 `(let* [(~pattern ~expr)]
                                        ,body)))]
             `(let* []
                    ,@(map phrase clauses))))

     ;; use
     (match value
         ((just x) (return x))
         (_ (return null)))

     ;; Phase B rewrites the pattern clauses into explicit bindings plus `ReturnExpr`s before Phase A sees them.
     ```

5. **`defn` with logging (adds instrumentation around function bodies)**
     ```lisp
     (defmacro defn (name params & body)
         `(fn ~name ~params
                (log "entering" '~name)
                ~@body
                (log "exiting" '~name)))

     ;; use
     (defn foo [x]
         (return x))

     ;; expands to a `FunctionExpr` that logs before/after executing the body, so Phase A receives only metadata-rich `fn` nodes.
     ```

6. **Splicing statements into `let*`**
     ```lisp
     (defmacro with-steps (bindings & steps)
         `(let* ~bindings
                ,@steps))

     ;; use
     (with-steps ((x 1))
         (log x)
         (return x))

     ;; Phase B emits a `LetStarExpr` whose `body` array contains the spliced statements, so Phase A receives a canonical sequential block.
     ```

### Mixed Syntax Ergonomics
- Type annotations can appear everywhere—bindings, parameters, returns, fields, and even type assertions in expressions; Phase B rewrites them into Phase A `type-assert`, `type-object`, and `type-function` nodes.
- Comma allowance lets TypeScript-style argument lists `(fn (x: number, y: number) ...)` remain easy to write while still translating to canonical sexprs.
- Data access modifiers (`public`, `private`, `static`, `readonly`) are syntactic sugar that annotate Phase A `field`/`method` nodes.
- Interfaces and TypeScript `type` declarations map to `(type-interface ...)` and `(type-alias ...)` sexprs so both Phase B authors and Phase A tooling agree on the target schema.
- Functions and methods maintain similar shapes so return typing, implicit returns, and type annotations behave identically from the sugar point of view.

-### CLI & Diagnostic Surface
- Phase A requires its own standalone CLI that mirrors the usability refinements in Phase1 but has zero runtime dependency on `phase0` or `phase1`. The Phase A bin (eventually `t2tc`, `t2jc`, `t2run` etc.) should parse the same ergonomic flags (`-o/--output`, `--stdout`, `--ast`, `--ast-before-expand`, `--ast-after-expand`, `--pretty-option`, `--log-level`, `--seed`, `--trace`, `--emit-types`, etc.) so existing tooling can switch phases without retraining users, but the implementation must live entirely inside `phaseA/src/cli.ts` and may only reference shared helpers hosted under `common/` or `phaseA/` itself (no imports from `phase0` or `phase1`).
- The CLI must support reading from stdin (`t2tc -`) and optionally publishing AST dumps before/after each compiler stage, tracing events, and rewrite maps just like Phase1’s CLI does today, but the event names should clearly tag the Phase A stage (e.g., `phaseA-parse`, `phaseA-expand`, `phaseA-typecheck`).
- Diagnostics must keep the established `T2:` namespace but gain a Phase A-specific prefix (for example `T2TC:xxxx`) so tooling that inspects the JSON registry in `phaseA/errors/reg_errors.json` can differentiate between errors emitted by Phase A vs. other phases. Diagnostics should still emit location metadata `{ file, line, column }` plus stage (`parse`, `resolve`, `typecheck`, `codegen`) and, where applicable, the original `.t2` coordinates recovered from rewrite maps so that source maps stay accurate even when Stage B rewrites nodes before handing them to this new pipeline.
- The CLI will also expose an event-stream API (similar in shape to Phase1’s `ArrayEventSink`) so consumers can opt into trace logs for `lexer`, `parse`, `expand` (if macros are hosted inside Phase A), `resolve`, `typecheck`, and `codegen`. Each emitted event should include the compiler stamp, UTC timestamp, and any deterministic seeds (via `--seed`) to support reproducible runs.
- When future integration with Phase B happens, the Phase B driver should execute this Phase A CLI via an explicit API (e.g., `import { compilePhaseA } from 'phaseA/src/api.js'`) without pulling in the Phase1 CLI bundle; Phase B is responsible for translating its sugar macros into the Phase A AST that this CLI expects before invoking it.

### Source Maps & Debugging
- Every compiler phase should emit source maps that relate the Phase B t2lang input to the generated TypeScript output. Phase B tracks `{ source, line, column }` metadata on every emitted AST node (including macros) so the serializer can build a mapping table before handing the `.ts` to TypeScript’s `sourcemap` support. When Phase B lowers templates or expands macros, it forwards the original location of the defining form so diagnostics can report the precise t2lang source rather than the expanded node.
- Macro expansion preserves source locations by carrying the location of each bound identifier/argument through the expansion; when a macro generates new statements, it annotates them with the nearest enclosing t2lang source span (falling back to the macro call site if the macro itself synthesized the code). This ensures that errors emitted after expansion can still point back at the macro invocation that produced the offending AST instead of the freshly synthesized helper nodes.
- VS Code integration relies on publishing the generated TypeScript along with its source map (and the original t2lang file path) so the editor can set breakpoints and step through the original source. The Phase B tooling should expose CLI flags such as `--source-map` (writes `<input>.map`) and `--source-root` (records the t2lang project root) so debuggers like the `vscode-typescript` adapter see matching path/line info. Apprenticeship workflows (set breakpoint in `.t2`, run via `t2jc` → `node --inspect`) should work once the chain outputs canonical source maps and the generated JS uses `//# sourceMappingURL` directives.

---

## Tooling Expectations
- Shared logic is deduplicated in `common/src/cliHelper.ts` and reusable helpers so both phases can parse CLI args, format output, and run Prettier via `importOptional` without duplicating code.
- Each phase ships its own compiler binary (`t2tc`/`t2jc`/`t2run`) but they point to the same helper in `bin/` to stay consistent with tracing, AST dumping, and tsconfig options.
- VS Code integrations (`vscode-t2-compiler`, `vscode-t2-formatter`) and `watch-t2.mjs` rely on the Phase B CLI being the ergonomic entry point while Phase A remains the canonical core that the editor or formatter can attach to.
- Every compiler phase and sub-phase should expose an event stream that traces progress, emits structured logs describing lexer/parse/expand/typecheck/codegen steps, and includes context for debugging when the user passes flags like `--trace`, `--log-level`, or similar.
- CLI helpers must also respect all existing configuration flags from phase0 and phase1 (AST dumping, `emitTypes`, `enableTsc`, `runtimePropCallCheck`, etc.) so the new implementation is a drop-in runtime for existing scripts.
- Module resolution is explicitly out of scope for t2lang: the emitted `.ts` files are expected to be fed into downstream TypeScript/JavaScript tooling (`tsc`, bundlers, runtimes) which are responsible for resolving imports, node_modules, path mappings, and related environment-specific behaviors.
 - Module resolution is explicitly out of scope for t2lang: the emitted `.ts` files are expected to be fed into downstream TypeScript/JavaScript tooling (`tsc`, bundlers, runtimes) which are responsible for resolving imports, node_modules, path mappings, and related environment-specific behaviors.
    - Each compiler state (raw parse, after sugar, after macro expansion, resolver output, typechecked AST, generated TS) must be serializable to a JSON snapshot so a later build can replay the stage. The precise schema is deferred until a given stage is implemented—at that point the schema matches the current stage inputs/outputs. Snapshots record any ancillary files the stage needs via a `{ "checksums": [{ "relative/path": "sha" }, ...] }` block rather than embedding raw contents. The schema and snapshot files are not yet required to stay stable between versions; they exist for post-mortem replaying of the current implementation while the compiler is still evolving. Snapshot files live under `snapshots/${component_name}/${git_sha}/${compiler_stamp}/${utc_msec}/${input-or-output}.json` so trace runs can correlate them with the trace logs (the `compiler stamp` should increment whenever the repo changes, even for docs/tests, so the path orders cleanly when git SHA stays constant during development).
    - Sources of non-determinism (current date/time, random numbers, environment-dependent defaults) are wrapped in explicit dependencies (monadic/stateful helpers) that accept seed values as arguments. The tracing event stream logs those seeds so any run can inject the same initial state (see the attached `seeds` notes for a state-monad approach to deterministic PRNGs).

### Interoperability & IDE Support Expectations
- t2lang only understands import/export syntax for syntax-level interoperability; it does not resolve modules, perform semantic validation, or typecheck imports on its own. Every `.t2` source is compiled to `.ts` before any downstream TypeScript or runtime code can import it.
- Because only the emitted `.ts` files participate in module resolution, one `.t2` file cannot directly import another `.t2` module. You must compile the dependency to `.ts` first (typically via the build/watch pipeline) and then import the resulting `.ts` file from your consumer. Any IDE that watches a `.t2` project must therefore know which compiled `.ts` corresponds to each source file.
- t2lang does not yet generate `.d.ts` declarations; if a consumer needs typings you can feed the emitted `.ts` files through `tsc --declaration` or a separate declaration generator. Future tooling might add a `--emit-declarations` flag once we agree on how to expose the public surface consistently.
- IDE features such as completion or error markers require running the compiler/watch pipeline in the background: the watcher compiles each edited `.t2` into `.ts`, pipes the generated `.ts` through the TypeScript language server (or `tsc --watch`), and then maps diagnostics/completions back to the original `.t2` positions via the source maps described earlier. Without this round-trip (t2lang → `.ts` → TypeScript LS), the editor cannot know about the resulting TypeScript symbols, so it relies on the generated source maps to map errors or breakpoints back to the `.t2` lines.

## Observability & Error Handling
- Error reporting must preserve accurate file/line references even when reading from stdin, pipes, or generated wrappers; line numbers should align with the input source or clearly annotated in trace logs.
- The compiler should be able to emit AST snapshots for each notable milestone (`raw`, `after-sugar`, `after-macros`, `after-tracing`) and make those available through CLI flags (e.g., `--ast-raw`, `--ast-after-sugar`, `--ast-after-expand`). Input/output snapshots can be captured at any pipeline component; each stage or subcomponent may expose snapshots of whatever inputs/outputs it owns. Ancillary files are written separately (e.g., due to size) but their relative path and SHA checksum appear inside the snapshot’s `checksums` section. Trace runs already correlate snapshots by reusing the same `snapshots/.../${compiler_stamp}/${utc_msec}/...` layout described earlier under tooling expectations.
- Pretty-printing the generated TypeScript output remains optional via flags (reuse Prettier when available) so the new pipeline can observe the same aesthetic expectations as the current Phase1 CLI.
- Every new error message gets recorded in the JSON registry at `phaseA/errors/reg_errors.json`. The registry maps fully qualified IDs (e.g., `T2:0001`, `T2:0002`, ...) to fixed literal messages plus metadata (`category`, `severity`, optional `docs`). These IDs increase sequentially, so the next issued diagnostic always receives the following number (`T2:0000` is reserved for the schema/introduction). Runtime drivers append any context data separately (line/column spans, offending text) rather than interpolating it into the stored string so the registry stays stable and cacheable. The `T2:` prefix reserves the namespace for compiler diagnostics while leaving room for other subsystems to use different prefixes later.
        - Example registry entry (straw-man format; likely to change as we refine the schema):
            ```json
            {
                "errors": {
                    "T2:0001": {
                        "message": "The form 'let' is not supported in Phase A, use 'let*' for sequential bindings.",
                        "category": "parse",
                        "severity": "error",
                        "docs": "https://example.com/docs/errors/0001"
                    }
                }
            }
            ```
            Use this JSON layout as a reference point for what the registry might hold, keeping in mind that the schema is a straw-man and free to evolve as we learn more about the reporting requirements.
- Invalid syntax handling should favor recovery: the parser emits a `T2:`-registered diagnostic when it encounters malformed input, skips ahead to the next recognizable statement boundary (based on balanced parens/braces), and marks the affected subtree as errored. Recovery paths still prevent code generation but keep the trace/log pipeline flowing and allow editor tooling to consume as much of the file as possible.
    - **Token-balancing recovery algorithm:** maintain a stack of open tokens (`(`, `{`, `[`) while scanning; when an error is detected, drop tokens until the stack is empty or you hit a statement boundary keyword (`block`, `if`, `while`, `for`, `return`, `let*`, etc.). Each closing token (`)`, `}`, `]`) pops the stack, and encountering a new opening token pushes it, so the parser can recognize the next position where the paren depth returns to the level at the start of recovery. This ensures skipping always lands on a well-formed boundary rather than half-baked expressions.
- Each compiler section (lexer, parser, sugar rewrite, macro expansion, resolver, typechecker, codegen) must emit timestamped events into the trace log so the event stream can be used for profiling overlapping stages.
- Timestamped profiling events follow a shared shape so consumers can correlate timings across runs. Each entry uses the `TimestampEvent` interface: `{ section: Section, event: EventType, utc_ms: bigint }` where `Section` is one of the enum values `ast`, `codegen`, `parse`, `resolve`, or `typecheck`, and `EventType` enumerates paired begin/end markers (e.g., `ParseBegin`, `ParseEnd`, `CodegenBegin`, `CodegenEnd`, etc.). Emit the matching begin/end pairs (and stage-specific qualifiers as needed) so the event stream doubles as a performance trace alongside diagnostics.

## Global Compiler Stamp
- A dedicated file at the repository root (`.internal_id`) contains nothing but the scalar integer that represents the current compiler stamp. Every invocation of the compiler reads this file during startup and flows the value into the shared global state so any component (tracing, snapshots, perf logging, CLI output) can consume it. An npm script such as `npm run bump-stamp` increments the number whenever any repository change lands—code, documentation, tests, tool config, etc.—so the artifact paths discussed above can stay monotonic even while the git SHA remains fixed during local experimentation.

## Testing & Documentation
- Tests must log compiler errors immediately after any compilation step (`if (result.errors.length > 0) { console.error(result.errors); }`).
- Phase0 tests verify canonical parsing, minimal type checking, operator normalization, type assertions, and `type-alias` handling.
- Phase1 tests (Phase B) cover macros, sugar rewrites, CLI diagnostics, and future infix/parser options; they live under `phase1/tests/`.
- The existing Phase0/Phase1 tests and examples count as regression/acceptance suites. They should be copied into the new test harness so they stay valid while we port the compiler (phaseA/phaseB). Use them as baseline inputs before adding new coverage.
- Precedence regression suites must be empirically maintained: maintain a set of pure TypeScript fixtures whose runtime output would flip if the precedence of `extends`, `infer`, `keyof`, `typeof`, `? :`, `[]`, and other TypeScript-specific operators shifted. Those fixtures serve as the authoritative baseline (compile with `tsc`/`node` to capture expected behavior), and Phase B must have corresponding t2lang tests that compile through the full pipeline (`t2lang → .ts → tsc → .js → node`) while asserting the observed output matches the TypeScript run. This ensures any change to Phase B’s sugar or operator handling that flips the precedence will fail the regression guard.
- Documentation stays synchronized with `docs/Phase0_TypeChecker.md`, `docs/Phase0_AST_Specification.md`, `docs/SugarAndMacroDesign.md`, `docs/Phase0_Syntax_and_Grammar.md`, `docs/TODO_OPS.md`, `docs/TODO_GENERICS.md`, and the VS Code guides.
- Any feature that originates in Phase B must have Phase B-specific tests (including end-to-end integrations that run the full pipeline: `t2lang → .ts → tsc → .js → node` asserting no runtime errors).
- Each pipeline stage must have tests that deserialize a static serialized input snapshot, run the stage, and assert the output matches a stored serialized result. Those tests are regenerated whenever the stage implementation changes, even if the schema remains unchanged.
- Error-generation tests are required from day one: every error must have a unique ID shown in the output, carry correct line/column locations (even when reading from stdin or pipes), and preserve consistent formatting across runs so tooling can rely on the canonical codes.
- Property-based ("fuzz") testing is desirable as the codebase matures, but it is optional initially; introduce these generators/benchmarks after the core pipeline is stable and the snapshot tests cover the critical paths.
    - Performance testing hooks also matter: each automated test run must enable the trace logging congruent with the `TimestampEvent` begin/end pairs so the traced output can serve as a performance profile. The log for every test executes is archived under `test_perf/${test_file_name}/${test_name}/${git_sha}/${compiler_stamp}/${utc_msec}` (create directories as needed), making it easy to compare timing traces between runs and to understand which outputs are newer when `git_sha` does not change between commits because the stamp bumps on any repository change.

---

## Open Work / TODOs for Implementation
1. **Operators & nullish/ternary**: finish documenting TypeScript operators in `docs/TODO_OPS.md` and ensure Phase A can emit them while Phase B exposes infix sugar.
2. **Generics**: support Phase B syntax (angle brackets, `extends`, `infer`) while canonicalizing to `(typeparams ...)`, `(type-app ...)`, and `(type-ref ...)` nodes.
3. **Infix notation**: implement Phase B support for TypeScript-style expression parsing (`+`, `&&`, `??`, `?:`, etc.) and rewrite to Phase A.
4. **Macro hygiene helpers**: expand `docs/MACROS.md` to clarify quoting vs string vs symbol handling plus reader macros.
5. **Shared helper extraction**: refactor `phase0/` and `phase1/` to reuse CLI, lexer, parser, and AST helpers (see `docs/DEDUPE_PLAN.md`).
6. **Type and interface sugar**: describe how Phase B rewrites TypeScript `type`/`interface`/`implements` declarations into Phase A type nodes.
7. **Sequential/per-file semantics**: ensure `(program ...)` wrapping, implicit returns, and let/const binding blocks remain consistent across macros and sugar.

---

## Next Steps for Specification Iteration
1. **Formalize canonical AST**: enumerate nodes and fields in Phase A (`phase0/src/ast/nodes.ts`, parser output) so Phase B rewrites target concrete structures.
2. **Rewrite matrix**: document how each Phase B sugar form (definitions, macros, dotted access, type annotations, operators, commas) maps to Phase A sexprs.
3. **Macro lifecycle**: detail the compile sequence (`parse → rewrite → macroexpand → resolve → typecheck → codegen`), highlight quoting vs symbols, and describe how `gensym` ensures hygiene.
4. **Diagnostics contract**: specify which CLI flags trigger AST dumps, rewrite maps, Prettier formatting, and trace logging so future tooling matches existing behavior.
5. **Tooling spec**: spell out expectations for CLI binaries, VS Code integrations, watch scripts, and Prettier formatting to keep Phase A/B aligned.
