# SUGAR Migration & Plan

This file records the current todo list for Phase1 sugar migration (lexer vs macros), with statuses and short descriptions.

- 1. Inventory sugar features: Completed
  - List existing sugar rewrites in `t2lang-phase1/src/parse/sugarRewrite.ts` and examples (colon-type, sigils, dotted access, field shorthand).

- 2. Map sugars to macro/reader-macro options: Completed
  - For each sugar, decide whether a reader macro, Phase1 macro, or lexer rewrite is more appropriate and note trade-offs.

- 3. Recommend migration approach: Completed
  - Propose priorities (which sugar to move first), and the preferred mechanism (reader macro vs macro) with justification.

- 4. Provide example designs: Completed
  - Small pseudo-implementations showing how to implement key sugars as macros or reader macros.

- 5. Prototype selected migration (optional): In-Progress
  - Implement one chosen sugar as a macro/reader-macro in Phase1 and run tests.

- 6. Move lexical sugars to lexer: Completed
  - Modify `t2lang-phase1/src/parse/lexer.ts` to tokenize dotted identifiers and `.name:`/`/name:` sigils as distinct tokens.

- 7. Add Phase1 macro for `type-object` canonicalization: Completed
  - Implement a macro/pass in Phase1 expansion that rewrites colon-type shorthand and bare sigil pairs into canonical `(name (type-ref ...))` fields.

- 8. Remove corresponding parts from `sugarRewrite.ts`: Completed
  - After lexer & macro are in place, simplify `sugarRewrite.ts` removing the handled cases and keep remaining sugars.

- 9. Add unit tests for lexer and macro changes: Completed
  - Add tests for dotted identifiers, `.name:` parenthesized and bare forms, and macro expansion of dotted id.

- 10. Remove dotted-access from sugarRewrite: Completed
  - Eliminate dotted-identifier handling in `sugarRewrite.ts` now implemented by macro expander.

- 11. Add design doc for lexer vs macro responsibilities: In-Progress
  - Create `t2lang-phase1/docs/SugarAndMacroDesign.md` summarizing which sugars live in lexer, macro, or Phase1 rewrite and why.


Notes

- Current status: Phase1 lexer handles lexical tokenization for several sugars; MacroExpander performs context-aware canonicalization for `type-object` and dotted identifier to `prop` transforms. `sugarRewrite.ts` has been reduced to a minimal structural rewrite module.

- Next recommended steps:
  - Add more unit tests for edge cases (nested parentheses, quoted names, mixed forms).
  - Clean up `sugarRewrite.ts` comments and remove any remaining dead code.
  - Consider documenting migration decisions in CHANGELOG or release notes.
