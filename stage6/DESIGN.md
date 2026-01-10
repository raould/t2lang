# Practical streaming architecture

Goal: Stage6 is a modified version of the Stage5 compiler. The goal is to reduce memory overhead by streaming the compiler process.

## Agent directions
- Chanages are only allowed in stage6/.

---

## Phase 0: Reader (streaming)
    - Tokenizes and builds S‑exprs incrementally.
    - Emits complete forms upward as soon as ) closes.

### Stage5 current state
    - `index.ts` calls `CharStream.fromString(input)` which reads the entire file into
      memory, then `Stage5Lexer` + `Stage5Parser` (ANTLR4-generated) fully parse the
      input into a complete parse tree before any AST work begins.
    - `astProgram(tree)` in `Stage5-ast.ts` walks the entire ANTLR4 tree at once via
      `ctx.topLevel().map(astTopLevel)`.
    - All of `Stage5-ast.ts` is tightly coupled to ANTLR4 context objects (e.g.
      `ctx.topLevelLet()`, `ctx.expression()`, etc.).

Stage5 ANTLR4's parse produces a list of top-level parse-tree contexts via `ctx.topLevel()`. These contexts can be iterated one at a time: `astTopLevel(ctx.topLevel()[i])` is already a local, per-form operation. The rest of the pipeline (Phases 1–3) can then be made streaming form-by-form (see below) without ever changing how Phase 0 works.

### Migration plan
    - **Keep ANTLR4 as-is.** No changes to `Stage6Lexer.ts`, `Stage6Parser.ts`, `Stage6Listener.ts`, or `Stage6-ast.ts`.
    - In `index.ts`, replace `astProgram(tree)` (which maps all top-level forms at once) with a loop over `tree.topLevel()` that processes each form individually, feeding them into the streaming Phases 2 and 3 below.
    - Phase 0's output granularity becomes: one ANTLR4 `topLevelContext` per form, which is equivalent to "emit complete form upward" at top-level granularity.

### Implementation steps

1. Keep the ANTLR4 parse block in `stage6/index.ts` unchanged:
   ```ts
   const inputStream = CharStream.fromString(input);
   const lexer       = new Stage6Lexer(inputStream);
   const tokenStream = new CommonTokenStream(lexer);
   const parser      = new Stage6Parser(tokenStream);
   const tree        = parser.program();
   ```
2. Remove the import of `astProgram` from `Stage6-ast`.
3. Add `astTopLevel` to the export list of `stage6/Stage6-ast.ts` (it is defined but not currently exported).
4. Import `astTopLevel` in `index.ts` instead of `astProgram`.
5. Replace the single `astProgram(tree)` call with the streaming loop skeleton:
   ```ts
   for (const ctx of tree.topLevel()) {
     const surfaceNode = astTopLevel(ctx);
     // Phases 1-3 continue inside this loop (see below)
   }
   ```
6. All subsequent pipeline work moves inside this loop body.

### Acceptance tests (Phase 0)

- **Order preservation**: compile a program with 5 top-level `const` declarations in a fixed order; assert the output lines appear in the same order.
- **Single-form program**: compile `(program (const x 42))` and assert output is `const x  = 42;\n` — identical to the batch compiler.
- **Empty program**: compile `(program)` (zero top-level forms) and assert no output is written and exit code is 0.
- **Large program**: compile a program with 50+ top-level `const` forms; assert all are present in the output, in order, and exit code is 0.

---

## Phase 1: Local sugar desugaring (streaming)
    - Infix → prefix
    - quasiquote → expansion
    - commas → whitespace
    - pipeline operators → canonical forms

All local, so still streamable.

### Stage5 current state
    - Infix desugaring `:(expr)` → prefix call form is handled in `Stage5-ast.ts` as part of `astExpression` (the `:` infix rule is parsed by ANTLR4 and converted by `astInfix`).
    - Quasiquote/unquote/unquote-splicing parsing is also done in `Stage5-ast.ts` (`astQuasi`, `astUnquote`, etc.).
    - These are all local to a single form — no cross-form state needed.

### Migration plan
    - **No changes needed to desugaring logic.** `astTopLevel(ctx)` already performs all
      Phase 1 desugaring locally per form. Calling it per form in the Phase 0 loop
      achieves streaming at top-level granularity automatically.

### Implementation steps

1. Export `astTopLevel` from `stage6/Stage6-ast.ts` by adding it to the `export { ... }` statement at the bottom of the file.
2. No other changes to `Stage6-ast.ts` are required.
3. The Phase 0 loop's `astTopLevel(ctx)` call is the complete Phase 1 implementation.

### Acceptance tests (Phase 1)

- **Regression suite**: run the full existing vitest suite (`npm test` in `stage6/`) against the new streaming `index.ts`; all previously passing tests must continue to pass.
- **Infix desugaring**: compile `(program (const x :(1 + 2)))` and assert the output contains `(1 + 2)`.
- **Quasiquote round-trip**: compile a program with a `defmacro` that uses quasiquote and assert the expanded output is correct (covered by existing `quasiquote.test.ts` and `defmacro.test.ts`).

---

## Phase 2: Macro expansion (conditionally streaming)
    - If macros are local: stream.
    - If macros can reorder siblings: buffer.

### Stage5 current state
    - Two-pass, non-streaming:
      1. `collectMacros(surfaceAst, macroEnv)` — single full-program pass that registers every `defmacro` and `macroTimeFnDef` into `macroEnv`.
      2. `expandAll(surfaceAst, macroEnv)` — second full-program pass that expands macro call sites using the fully-populated `macroEnv`.
    - This two-pass approach exists to support forward macro references (a macro used before its `defmacro` definition in source order).
    - `expandTopLevel` in `Stage6-macro-expand.ts` passes `defmacro`/`macro-time-fn-def` forms through unchanged; all other forms recurse through `expandExpr`/`expandStmt`.
    - Individual form expansion is local once `macroEnv` is populated.

### Migration plan
    - **Adopt the "macros before use" constraint** (no forward macro references):
      this is likely already the case in practice and enables streaming.
    - Collapse the two passes into one streaming pass:
      - For each top-level form from Phase 1:
        - Register it in `macroEnv` if it is a `defmacro`, `macroTimeFnDef`, or `let-decl`/`const-decl`.
        - Then expand it against the current (incrementally-built) `macroEnv`.
    - The per-node expansion logic in `expandExpr`, `expandStmt`, `expandMacroCall`,
      `evalMacroExpr`, `evalQuasi`, etc. requires no changes — they already operate on individual nodes.

### Implementation steps

1. **Add `registerTopLevelNode` to `stage6/Stage6-macro-env.ts`**: extract the per-node
   registration logic from `collectMacros` into a new exported function:
   ```ts
   export const registerTopLevelNode = (node, env) => {
     if (node.tag === 'defmacro' || node.tag === 'macro-def') {
       env.macros.set(node.name, {
         name: node.name, params: node.params,
         rest: node.rest, body: node.body, scopeId: node.scopeId,
       });
     }
     if (node.tag === 'macro-time-fn-def') {
       env.macroTimeFns.set(node.name, {
         name: node.name, params: node.init.params,
         rest: node.init.rest, body: node.init.body,
       });
     }
     if (node.tag === 'let-decl' || node.tag === 'const-decl') {
       env.varRegistry.set(node.name, { name: node.name, meta: node.meta });
     }
   };
   ```

2. **Export `expandTopLevel` from `stage6/Stage6-macro-expand.ts`**: add `expandTopLevel` to the `export { ... }` line at the bottom of the file.

3. **In `stage6/index.ts`**, inside the Phase 0 loop after `astTopLevel(ctx)`:
   ```ts
   registerTopLevelNode(surfaceNode, macroEnv);
   const expandedNode = expandTopLevel(surfaceNode, macroEnv);
   if (macroEnv.errors.length > 0) {
     console.error(formatExpansionErrors(macroEnv.errors));
     process.exit(1);
   }
   ```

4. **Remove** the `collectMacros` and `expandAll` imports and their calls from `index.ts`.

5. **Keep** `makeMacroEnv` and `formatExpansionErrors` imports — both are still needed.

6. Initialize `macroEnv` before the loop (unchanged from current code):
   ```ts
   const macroEnv = makeMacroEnv();
   ```

### Acceptance tests (Phase 2)

- **Macro before use (happy path)**: define a `defmacro` then use it in a later form; assert the output matches the batch compiler.
- **Macro not yet defined passes through**: a call to an unknown name that appears before its `defmacro` is treated as a regular function call, not expanded and not an error.
- **`varRegistry` populated incrementally**: a macro using `(resolve 'x)` can see a `const x` declared in an earlier form in the same file; assert correct behavior.
- **Expansion error exits immediately**: trigger a macro arity error; assert the process exits non-zero and prints an error message, and no further forms are emitted.
- **Existing macro tests pass**: `defmacro.test.ts`, `macroExpand.test.ts`, `macroHygiene.test.ts`, `macroIntegration.test.ts`, `macroTimeFnDef.test.ts`, `swapMacro.test.ts`, `variadicMacro.test.ts` all pass unchanged.

---

## Phase 3: AST → TypeScript emitter (streaming)
    - As soon as a form's AST is final, emit TS.
    - Maintain indentation and block context incrementally.

### Stage5 current state
    - Three sequential full-program passes after macro expansion:
      1. `resolveNames(expandedAst)` in `Stage6-scope-resolve.ts` — iterates `programNode.body` sequentially, maintaining a `chain` (binding list) that grows left-to-right as `let-decl`/`const-decl` forms are seen.
      2. `lowerProgram(resolvedAst)` in `Stage6-lower.ts` — maps each top-level node through `lowerTopLevel`; no cross-form dependencies.
      3. `emitProgram(canonicalAst)` in `Stage6-codegen.ts` — maps each top-level node through `emitTopLevel`; no cross-form dependencies.
    - All output is collected into one string and printed via a single `console.log` at the end.

### Migration plan
    - All three passes are naturally per-form and can be pipelined directly:
      - `resolveTopLevel(node, chain)` is already defined in `Stage6-scope-resolve.ts` — thread `chain` as accumulated state between forms.
      - `lowerTopLevel(node)` is already defined in `Stage6-lower.ts` — stateless per form.
      - `emitTopLevel(node)` is already defined in `Stage6-codegen.ts` — stateless per form.
    - Replace `console.log(emitProgram(canonicalAst))` with per-form `process.stdout.write` calls inside the streaming loop.

### Implementation steps

1. **Export `resolveTopLevel` and `addBinding` from `stage6/Stage6-scope-resolve.ts`**: both are already defined; add them to the `export { ... }` line.

2. **Export `lowerTopLevel` from `stage6/Stage6-lower.ts`**: already defined; add to the `export { ... }` line.

3. **Export `emitTopLevel` from `stage6/Stage6-codegen.ts`**: already defined; add to the `export { ... }` line.

4. **In `stage6/index.ts`**, initialize the binding chain before the loop:
   ```ts
   let chain: any[] = [];
   ```

5. **Inside the loop**, after Phase 2 expansion, add the three per-form passes and write output immediately:
   ```ts
   const resolvedNode = resolveTopLevel(expandedNode, chain);
   if (resolvedNode.tag === 'let-decl' || resolvedNode.tag === 'const-decl') {
     chain = addBinding(chain, resolvedNode.name, new Set());
   }
   const loweredNode = lowerTopLevel(resolvedNode);
   const emittedStr  = emitTopLevel(loweredNode);
   process.stdout.write(emittedStr + '\n');
   ```

6. **Remove** the old `resolveNames`, `lowerProgram`, `emitProgram` imports and calls from `index.ts`.

7. **Update imports** in `index.ts`:
   - Remove: `astProgram`, `lowerProgram`, `emitProgram`, `collectMacros`, `expandAll`, `resolveNames`
   - Add: `astTopLevel`, `registerTopLevelNode`, `expandTopLevel`, `resolveTopLevel`, `addBinding`, `lowerTopLevel`, `emitTopLevel`

   The final `index.ts` must contain no calls to any batch `*Program` or `*Names` functions.

### Acceptance tests (Phase 3)

- **Output identity**: for a representative set of programs (simple consts, macros, classes, imports/exports), diff streaming stage6 output against batch stage5 output — must be byte-for-byte identical.
- **Binding chain correctness**: compile `(program (const x 1) (const y x))` and assert both `const x` and `const y` appear correctly in the output (later binding can reference earlier one via chain).
- **Lower error still includes source location**: trigger a lower error (e.g. `export-default` on a non-function initializer) and assert the error message contains `file:line:col` — same behavior as the existing `decision6.test.ts` Phase 2 tests.
- **Per-form writes**: compile a program with N non-macro top-level forms; assert the output contains exactly N newlines (one `process.stdout.write` per form).
- **Regression**: all existing stage6 vitest tests pass with the new streaming `index.ts` — including `pipelineInvariants.test.ts`, `scopeResolve.test.ts`, `letStar.test.ts`, the full class/export/import/type suite.
