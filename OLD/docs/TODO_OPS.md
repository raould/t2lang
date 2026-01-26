# Phase0 Operators & Boolean Logic Plan

Goal: Implement support for standard math, comparison, bitwise, and boolean logic operators entirely in Phase0 using plain S-expr call heads (no sugar or macros required).

Principles
- Use standard s-expr head style: operators are call heads, e.g. `(+ 1 2)`, `(and a b)`, `(< a b)`.
- Keep Phase1 focused on syntax/macro sugar only; Phase0 performs canonical typing and codegen for operators.
- No new macros: provide word-forms like `and`, `or`, `not`, `xor` as ordinary operator call heads and map them to JS/TS operators in codegen.

Changes to implement
1. Codegen (phase0/src/codegen/tsCodegen.ts)
   - Ensure `BINARY_OPERATORS` and `UNARY_OPERATORS` include:
     - Math: `+ - * / % **` (use `**` for exponentiation)
     - Bitwise: `& | ^ << >> >>>`
     - Comparisons: `< <= > >= == === != !==`
     - Logical: `&& ||` (map `and`→`&&`, `or`→`||`, `not`→`!`, map `xor` → boolean-xor expression)
   - Emit infix syntax only when arity matches (binary or unary), otherwise emit regular call form.
   - Keep `+` string-concat behavior decision explicit (either allow `number|string` in typechecker or restrict to numeric-only).

2. Typechecker (phase0/src/typecheck/typeChecker.ts)
   - Add operator-specific typing rules:
     - Arithmetic (`+ - * / % **`): numeric operands → numeric result. Optionally allow `+` for `string|number`.
     - Comparisons (`< <= > >=`): numeric/string operands → boolean.
     - Equality (`== === != !==`): accept any operand types → boolean.
     - Logical (`and`/`or` → `&&`/`||`, `not` → `!`): boolean operands → boolean result.
     - Bitwise (`& | ^ << >> >>>`): numeric operands → number result.
     - `xor`: define as boolean xor (booleans → boolean) while keeping `^` as numeric bitwise xor.
   - Produce precise error messages pointing at operand locations when types mismatch.

3. Parser / AST
   - Verify boolean literals `true`/`false` are supported as `literal` nodes. If missing, add them to the lexer/parser literal handling.
   - No syntactic sugar required — operators are regular call heads and parsed by existing Phase0 parser.

4. Tests & Docs
   - Update `phase0/Phase0_Syntax_and_Grammar.md` to mention allowed operator forms and boolean literals as valid `expr` heads.
   - Add unit tests (`phase0/tests/unit`) covering:
     - Each arithmetic operator (valid/invalid typing)
     - Comparisons and equality
     - Boolean operators (`and`, `or`, `not`, `xor`) and short-circuit tests
     - Bitwise operators
   - Add integration tests that run with `enableTsc: true` for representative examples to observe TypeScript diagnostics.

Implementation notes & edge cases
- Exponentiation: use `**` to match JS/TS semantics; do not repurpose `^` (keep `^` as bitwise xor).
- XOR: provide a boolean `xor` word-form (emit `(a !== b)` or `(a && !b) || (!a && b)`) and keep `^` numeric.
- `and`/`or` should map to short-circuiting `&&`/`||` in codegen to preserve runtime behavior.
- `+` string concatenation: decide whether to support `string` operands in the typechecker; if allowed it should produce `string` results when operands include strings.

Checklist
- [ ] Update `tsCodegen.ts` operator lists and mapping.
- [ ] Add typechecker rules for each operator category.
- [ ] Verify `true`/`false` literals in parser/lexer and add if missing.
- [ ] Update `Phase0_Syntax_and_Grammar.md` with operator docs.
- [ ] Add unit and integration tests.
- [ ] Run full Phase0/Phase1 test suites and fix any regressions.

- [ ] Support nullish testing and coalescing (`??`, `??=`) and associated semantics.
- [ ] Support ternary operator (`cond ? a : b`) in Phase0 (typed and codegen emissions).

Checklist additions:
- [ ] Add unit tests for nullish coalescing `??` (parsing, typing, codegen behavior).
- [ ] Add unit tests for nullish assignment `??=` and edge cases.
- [ ] Add unit/integration tests for ternary `cond ? a : b` once grammar/type rules decided.
- [ ] Update `Phase0_Syntax_and_Grammar.md` to list `??` and ternary when implemented.

Rationale: Implementing operators in Phase0 centralizes semantics and code generation for the canonical AST. Keeping operators as plain S-expr call heads avoids macros/sugar and makes the language simpler to reason about and test.
