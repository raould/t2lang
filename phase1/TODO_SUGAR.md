# sugar ideas

* collection literal syntax.
* collection access syntax.
* how close to looking like typescript should we get? e.g. class definition in t2 can have a lot of parenthases.
* (call anObject.aMethod anArgument) could we have sugar that allows the more concise (anObject.aMethod anArgument)? the t2lang typechecker is not expected to be able to determine if .aMethod really is a method or a field. However in the case of the user mistakenly trying (anObject.aField anArgument) ideally the resulting errors from the typescript compiler would be somehow enough to indicate to the user what the original problem is.
* experiment with designs to implement infix with "(infix 1 + 2)" or "(infix (1 + 2))" becoming "(+ 1 2), then a leading dot like ".(1 + 2)". Note that it must support variable names. Note that the infix applies to everything inside so "(infix (1 + (2 * 3)))" means the parenthases inside are mathematical grouping, not sexprs.

# SUGAR Migration — Current Summary

This file documents the current Phase1 sugar design, what is supported, and where each transformation happens.

Supported sugar (current):
- Parenthesized dot-sigil fields: `(.name: Type)` — converted to `("name" Type)` during Phase1 preprocessing.
- Colon-type shorthand in field position (e.g. `name: Type`) — normalized by the Phase1 `MacroExpander` into canonical Phase0 `type-object` fields.
- Dotted identifiers (e.g. `a.b.c`) — combined into a single identifier token by the Phase1 `Lexer` and expanded to nested `prop` calls by the `MacroExpander`.
- Dotted identifiers (e.g. `a.b.c`) — combined into a single identifier token by the Phase1 `Lexer` and expanded to nested `prop` calls by the `MacroExpander`.
- Dotted-head call sugar: `(a.b args...)` is rewritten by `rewriteSugar` into `(call (prop a "b") args...)` which allows the concise call form ` (a.b x) `.  Likewise `obj["k"]` in head position is rewritten to `(call (prop obj "k") ...)`.

Where transformations occur:
-- `Lexer` (`phase1/src/parse/lexer.ts`): token-level handling — dotted identifiers and parenthesized dot-sigil sequences are recognized and tokenized.
-- `rewriteSugar` (`phase1/src/parse/sugarRewrite.ts`): small, structural preprocessing (currently includes a targeted preprocessing step that rewrites `(.name: Type)` into `("name" Type)` before tokenization).
-- `MacroExpander` (`phase1/src/expand/macroExpander.ts`): context-aware canonicalization — converts shorthand type fields to Phase0 canonical `( "name" (type-ref "Type") )` forms and turns dotted identifiers into nested `prop` expressions.

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
-- See `CHANGELOG.md` and `phase1/docs/SugarAndMacroDesign.md` for migration history and rationale.

Next suggested actions:
- Add more edge-case unit tests (nested parentheses, quoted names, mixed forms).
- Continue simplifying `sugarRewrite.ts` to only contain structural rewrites that are safe pre-parse.

