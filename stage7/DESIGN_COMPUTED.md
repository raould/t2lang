# Stage 7 — Computed Method Names Plan

## Goals
- Support computed method/getter/setter names (static + async/generator combos) using `[expr]` keys.
- Mirror TS/JS semantics: key expression evaluates once in element order; forbid `this`/`super` inside key expressions (`new.target` has no Stage 7 grammar form).
- Preserve existing pipeline shape (AST → lower → codegen) and macro visibility.

## Work Plan
- Grammar: allow `[expression]` keys for methods/getters/setters (including static) in class bodies; avoid lookahead conflicts.
- AST builder: add `computed` flag and `key` expr on class element nodes; enforce `this`/`super` ban in key expressions via `ensureNoThisSuperInKey`.
- Tags/whitelist: update Stage7 tag sets and macro traversal allowances to include computed class elements.
- Scope resolve: traverse/resolve key expressions; preserve current body resolution; no new bindings.
- Lowering: carry `computed` + `key` through lowered class element nodes without altering evaluation order.
- Codegen: emit `[expr]` names via shared helper (methods/getters/setters, static/async/generator/abstract variants); ensure expression emitted once.
  - **async/generator modifier** (`Stage7-codegen.s6` — `emitClassMethodDef`): currently emits `accMod + staticStr + overrideStr + nameStr + ...` but has no `asyncStr` or `generatorStr`. Add:
    - `(asyncStr (ternary ((. (. node modifiers) includes) ':async') 'async ' ''))`
    - `(generatorStr (ternary ((. (. node modifiers) includes) ':generator') '* ' ''))`
    - Insert before `nameStr` in the emitted string: `accMod + staticStr + overrideStr + asyncStr + generatorStr + nameStr + ...`
    - `async` and `generator` are orthogonal: `async *[key]()` is valid; emit in the order TS expects: `async *`.
    - `abstract` methods (`emitAbstractMethodDef`) cannot be `async`/`generator` — no change needed there.
    - Getters/setters cannot be `async`/`generator` — no change needed there.
- Validation: reject forbidden `this/super` in key expressions at AST or dedicated validation pass. (`new.target` has no grammar form in Stage 7 — omit from validation.)
- Tests: expand classComputedKeys tests to cover method/getter/setter, static, async/generator, symbol key (e.g., `(. Symbol asyncDispose)`), and negative cases for forbidden key expressions.

## Verification
- Run `cd stage7 && npm test` (build included) after updates; ensure new/updated tests in `tests/classComputedKeys.test.ts` are covered.
