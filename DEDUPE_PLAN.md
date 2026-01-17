# Phase1 → Phase0 Deduplication Plan 🔧

## Goal 🎯
Make `t2lang-phase1` a **thin wrapper** around `t2lang-phase0` so Phase1 contains only the minimal code needed to:
- act as a compatibility/adapter layer for features unique to phase1 (e.g., macro-related parsing hooks, dev utilities), and
- reuse core parsing, resolving, typechecking and codegen from `phase0` without duplication.

This reduces maintenance, avoids drift, and centralizes bug fixes and behavior in `phase0`.

---

## Non-goal ❌
- Merging the packages; this is a code dedup/refactor to call into Phase0 where appropriate, not a monorepo layout change.

---

## Scope & High-level Strategy 🧭
1. **Inventory**: Find duplicated files and APIs across `t2lang-phase1/src` and `t2lang-phase0/src`.
2. **Categorize** each duplication by feasibility: "extractable shared module", "phase1 specialization", or "incompatible".
3. **Introduce clear public APIs** in Phase0 (or a `common` package) for functionality Phase1 needs (parsing helpers, macro utilities, normalization helpers). Favor small, well-typed interfaces.
4. **Replace** Phase1 duplicates with adapters that import and call Phase0 APIs. Keep Phase1-specific logic localized to small shim modules.
5. **Tests & CI**: Add regression tests to lock in behavior. Run full test suites during each change.
6. **Iterate** in small, reviewable commits (one logical change per commit) until duplication is minimized.

---

## Inventory (initial findings) 🔎
Files and areas to inspect (candidate duplicates):
- `parse/lexer.ts` (both packages — lexing differences around backtick/quasiquote)
- `parse/parser.ts` (Phase1 has wrappers/quoted parsing helpers)
- `expand/macroExpander.ts` (Phase1-specific, but many utilities for evaluating quoted forms may be shareable)
- `codegen/tsCodegen.ts` (Phase0 contains final codegen, Phase1 reuses this but ensure shared types)
- `tests/` (many macro tests live in Phase1: consider moving common parser/macro tests to Phase0 or to a shared test harness)

Note: Phase1 intentionally diverges where macro handling is needed; aim to keep only the adapter surface in Phase1 and extract the heavy logic into Phase0 (or `common`).

---

## Proposed Phased Workplan (small steps) ✅

### Phase A — Preparation (small, low-risk)
- Add `DEDUPE_PLAN.md` and a short ADR if desired. (done)
- Add regression tests that capture failing cases we fixed earlier (`mkchain`, `mkblock`, `where`, `gensym` hygiene) to ensure no regressions when moving code.
- Add `TODO`-style comments in Phase1 indicating candidate extraction points.

Acceptance: tests and lint remain green after adding tests.

### Phase B — API Extraction (medium risk)
For each duplicate area:
- Extract a well-defined helper into `t2lang-phase0/src/lib` or a new `common` package (e.g., `parseQuotedSexpr`, `normalizeQuotedAst`, `expandGensym`, `spliceMarker` handling).
- Add unit tests for the extracted helper in Phase0.
- Replace Phase1 duplicate implementation with a small shim that imports the helper.

Make changes package-by-package, commit per helper.

Acceptance: Unit tests in both packages and integration macro tests pass after each helper extraction.

### Phase C — Parser/Tokenizer Centralization (higher risk)
- If Phase1's `Lexer` changes are small and compatible, standardize on Phase0's `Lexer` as the canonical implementation and add flags or extension points for Phase1-specific behavior.
- Introduce a `ParseOptions` interface and pass a `mode: 'phase0'|'phase1'` flag where necessary.
- Ensure `Parser` has extension hooks for Phase1 (e.g., quoted-list parsing) implemented in Phase0 behind optional callbacks.

Acceptance: No behavioral change in macro expansion tests and Phase1 can be initialized as a client of Phase0's Parser.

### Phase D — Macro Expander Harmonization (highest risk)
- Move macro-expansion core logic into Phase0 as a public `expandMacros` API or into `common` if semantic boundaries demand it.
- Keep Phase1-specific converters/normalizers as small translators.
- Add comprehensive tests around quoted forms, splice flattening, gensym, and nested macro expansion.

Acceptance: All macro tests pass and Phase1's surface-level adapter is < 100 LOC per module for macros.

### Phase E — Cleanup & Documentation
- Remove duplicated files, update README/MACROS.md to point to canonical logic locations.
- Add comments documenting why Phase1 remains thin and what extension points exist.
- Add a short migration note for contributors.

---

## Testing Strategy 🧪
- Add regression tests to `t2lang-phase1/tests/integration/examples` for all previously problematic macros (done already for many cases).
- Add unit tests for each extracted helper inside Phase0's `tests/unit`.
- Run full `npm run lint` and `npm test` in both packages on CI for each PR.

---

## Risk & Mitigation ⚠️
- Risk: Behavioral drift when extracting logic. Mitigate by adding focused tests around semantics before refactor and running full test suites after each change.
- Risk: Cyclic dependencies between packages. Mitigate by using a `common` package or keeping helpers in Phase0 with deliberate public API surface.

---

## Rollout & PR Guidelines ✳️
- Make one helper extraction per PR (small, reviewable changes).
- Each PR must: run `cd <pkg> ; npm run lint ; npm test` and attach test logs to the PR description.
- Keep changes backwards compatible; if API breakage is inevitable, add a deprecation layer and document it.

---

## Checklist (quick) 📋
- [ ] Add regression tests for leftover macro cases (if any missing)
- [ ] Create `common` or `phase0/lib` helpers for parse/expand utilities
- [ ] Replace Phase1 duplicates with import shims and thin adapters
- [ ] Harmonize `Lexer`/`Parser` extension hooks
- [ ] Move macro expansion core to Phase0 or `common` with stable public API
- [ ] Update READMEs and add contributor notes

---

If you'd like, I can start with the **first extraction** (pick a small helper to extract, add tests, and replace a Phase1 duplicate) and submit the changes in small commits. Which helper would you like me to extract first: `parseQuotedSexpr`, `convertQuotedToAst`, or `expandGensym`? 
