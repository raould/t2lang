# Plan: Await Support in Stage6

## Goal
Add minimal missing await support to Stage6 so it matches TypeScript use-cases: `await` expression is already present; add `for await...of` and top-level await (ESM) support.

## Scope & Constraints
- Work only in `stage6/**`; do not touch `OLD/**` or `OLDER/**`.
- Keep compiler pipeline functions async-friendly (per guardrail: internal functions should remain `async` when applicable).
- Preserve current behavior for existing await expressions and tests; avoid regressions in class/macro systems.

## Tasks
1) Grammar
- Add a parser form for `for-await-of` (e.g. `(for-await name expr body...)`) aligned with existing `forOfForm` structure.
- Add lexer token for the keyword (decide naming: `FORAWAIT` or reuse `FOR` + `AWAIT`? Prefer single keyword `for-await` to disambiguate).
- Update `propKey` alternatives to include the new keyword.
- Allow top-level await expressions in `program` (ESM): ensure grammar doesn’t forbid `await` at top-level and that downstream phases accept it.

2) AST Construction
- Add `astForAwait` builder mirroring `astForOf` shape with tag like `for-await` and fields: `name`, `object`, `body`.
- Ensure span registration and tag whitelist assertions cover the new node.

3) Lowering
- Extend lower pass to emit a TS `for await (const <name> of <expr>) { ... }` loop.
- Ensure emitted code is only in async contexts or wraps the loop in an async IIFE if needed (decide minimal viable approach; likely assume surrounding pipeline already allows async). Document choice.
- Top-level await: emit plain `await` in ESM output; if module target stays ESM, no wrapper needed. If CJS output ever used, document as unsupported or wrap in async IIFE (pick and document one approach—prefer ESM-only for now).

4) Scope/Resolve
- Add binding for loop variable in scope resolution with correct lifetime (matching `for-of`).

5) Macro Env / Expansion
- Ensure macro-time whitelist/tag handling accepts the new `for-await` node and can be macro-generated without crashing.

6) Codegen
- Add codegen support for the new AST tag to emit the lower-level loop (or pass-through if lower already outputs TS).

7) Tests
- Add Stage6 Vitest coverage:
  - Unary await in async fn/lambda: `(await (foo))` lowers and runs.
  - Await inside async generator: `(async-generator-fn ... (await ...))` parses and executes.
  - `for-await` happy path over an async iterable (mock async generator).
  - Error case: using `for-await` in non-async context if we choose to forbid (or document allowed behavior).
  - Top-level await smoke: `(program (await (foo)))` producing ESM with awaited call; execution harness should run under ESM-capable runtime.
  - Ensure existing await expression tests still pass.

8) Docs
- Update Stage6 README / MACROS / grammar docs to mention `for-await` form and any constraints.
- Document top-level await as supported (ESM); call out any limitations (e.g., not supported under CJS execution paths).

9) Follow-ups / Decisions
- Confirm ESM output target so top-level await works without wrapping; if any CJS path remains, specify behavior (unsupported vs auto-IIFE).

## Validation
- Run `cd stage6; npm run lint; npm test` after changes.
- Watch for ANTLR grammar rebuilds and generated file updates during `npm test`.
