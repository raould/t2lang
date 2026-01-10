# SUGAR Migration — Current Summary

This file documents the current Phase1 sugar design, what is supported, and where each transformation happens.

Supported sugar (current):
- Parenthesized dot-sigil fields: `(.name: Type)` — converted to `("name" Type)` during Phase1 preprocessing.
- Colon-type shorthand in field position (e.g. `name: Type`) — normalized by the Phase1 `MacroExpander` into canonical Phase0 `type-object` fields.
- Dotted identifiers (e.g. `a.b.c`) — combined into a single identifier token by the Phase1 `Lexer` and expanded to nested `prop` calls by the `MacroExpander`.
- Dotted identifiers (e.g. `a.b.c`) — combined into a single identifier token by the Phase1 `Lexer` and expanded to nested `prop` calls by the `MacroExpander`.
- Dotted-head call sugar: `(a.b args...)` is rewritten by `rewriteSugar` into `(call (prop a "b") args...)` which allows the concise call form ` (a.b x) `.  Likewise `obj["k"]` in head position is rewritten to `(call (prop obj "k") ...)`.

Where transformations occur:
- `Lexer` (`t2lang-phase1/src/parse/lexer.ts`): token-level handling — dotted identifiers and parenthesized dot-sigil sequences are recognized and tokenized.
- `rewriteSugar` (`t2lang-phase1/src/parse/sugarRewrite.ts`): small, structural preprocessing (currently includes a targeted preprocessing step that rewrites `(.name: Type)` into `("name" Type)` before tokenization).
- `MacroExpander` (`t2lang-phase1/src/expand/macroExpander.ts`): context-aware canonicalization — converts shorthand type fields to Phase0 canonical `( "name" (type-ref "Type") )` forms and turns dotted identifiers into nested `prop` expressions.

Design notes / rationale:
- Keep Phase0 minimal: Phase0 parser and typechecker expect canonical, simple S-expr shapes. Ergonomic sugars should be implemented in Phase1.
- Put purely lexical concerns in the `Lexer`, and put context-sensitive rewrites in the `MacroExpander` so parsing and Phase0 remain stable.
- Parenthesized dot-sigil forms were kept as a Phase1 preprocess step to ensure compatibility with the Phase0 `type-object` parser.

Runtime prop-call checks:
- Compiler option `runtimePropCallCheck` (default: `true`) causes codegen to emit a small IIFE wrapper around property-call callees when the callee is a `prop` expression. The wrapper evaluates the object once, verifies the named property is a function, and throws a helpful runtime error if not. This helps catch mistakes like `(a.b x)` where `a.b` is actually a non-callable field.
	- The check is generated only for call sites where the callee is a `prop` (e.g. calls produced by dotted-head sugar or `(prop ...)` forms).
	- The check does not change semantics for correct programs, but provides clearer runtime errors for accidental non-callable property invokes.

Status and tests:
- Phase0 tests: passing (all unit and integration tests run locally).
- Phase1 tests: passing. Unit tests were added for lexer sugar and `type-object` canonicalization.

Notes for contributors:
- If adding new sugar, prefer lexer for purely lexical rewrites and `MacroExpander` for context-aware normalization.
- Avoid adding Phase0-aware rewrites in `sugarRewrite` unless they are purely structural and do not require symbol resolution.

Changelog pointers:
- See `CHANGELOG.md` and `t2lang-phase1/docs/SugarAndMacroDesign.md` for migration history and rationale.

Next suggested actions:
- Add more edge-case unit tests (nested parentheses, quoted names, mixed forms).
- Continue simplifying `sugarRewrite.ts` to only contain structural rewrites that are safe pre-parse.

