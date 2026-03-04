# Grammar

- [ ] Keep propAccess/optChain rules as-is in Stage6.g4:616-672; dotted sugar is handled in AST desugar, not in ANTLR.
- [ ] Document in Stage6.g4 comment block that dotted identifiers are rewritten in AST so future keyword additions do not rely on grammar changes.

# AST desugar

- [x] Pre-req: define stage-specific tag unions plus runtime sets (e.g., ASTTag/AST_TAGS) so desugar can assert inputs are core and outputs are in the AST tag set; mirror this pattern in later stages as touched.
- [x] Implement dotted-identifier sugar in astExpression (surface → core) so macros see canonical prop-access nodes.
	- [x] Split dotted IDENTIFIERs (excluding spread `...`) into segments, reject empties/trailing dot, and fold into nested prop-access nodes with fresh ids via registerSpan/nextNodeId.
	- [x] Preserve original ctx.text for error reporting on synthesized nodes.
- [x] Add assertion helper in astExpression/adjacent utilities to ensure returned tags are core-only; throw with clear "desugar produced non-core tag X" and include source span.
- [x] Validate dotted folding (no empty segments, no spread prefix, per-segment core shape) before returning nested prop-access nodes; throw early on malformed identifiers.
- [x] Centralize the core-tag whitelist: use a single ASTTag union + runtime set (in AST/shared tags helper) as the source of truth, imported by scope/lower/emit assertions to prevent drift.
- [x] Decide span/text strategy for synthesized nested prop-access nodes to keep error locations useful (parent ctx.getText vs derived snippet per segment) — hybrid: outer keeps full text, inner nodes use segment text, all with unique ids.
- [x] Clarify identifier edge cases: allow keyword segments (propKey already permits), treat numeric segments as prop keys (obj.0.x → key "0"), and ensure quoted identifiers are not split; reject leading/trailing/double dots.
- [x] Ensure spread/rest tokens (`...`) bypass dotted sugar and still throw the existing dotted-identifier guard.
- [x] Keep dotted sugar value-only; document that type positions remain untouched unless explicitly needed.
- [x] Clarify no implicit optional chaining/nullish sugar is introduced by dotted identifiers; explicit `.?
` / `??` forms remain required.

# Macro expansion

- [x] Confirm no structural change is needed; macros consume core forms post-desugar. Sanity-check a macro expand path with dotted sugar to ensure shapes stay stable.
- [x] Note behavioral shift: macros that pattern-match raw identifiers with dots will now see prop-access trees; document in macro notes.
- [x] Consider a brief macro doc note/example showing how to match dotted input post-desugar (pattern on prop-access instead of identifier with dot).

# Scope, lowering, codegen

- [x] Reuse existing prop-access handling in Stage6-scope-resolve.ts:140-148, Stage6-lower.ts:744-752, Stage6-codegen.ts:329-336. No changes expected; verify emitted TS for dotted sugar matches desugared baseline.

# Tests

- [x] Add e2e test covering dotted sugar: (Array.prototype.concat.call (array 1) (array 2)) and ensure emitted TS matches the explicit desugared form; include `if (result.errors.length > 0) { console.error(result.errors); }` before assertions.
- [x] Add chained access case (obj.a.b) to confirm multi-segment folding.
- [x] Add negative test: malformed dotted identifier (e.g., trailing dot or empty segment) triggers the new desugar assertion with a clear message.
- [x] Add a regression where an unknown tag returned from desugar throws the "non-core tag" error to prove the guard works.
- [x] Add mixed-case coverage: segment requiring bracket emit (`obj."not-an-id"` stays explicit), numeric segment decision, and macro returning dotted identifiers should error early.

