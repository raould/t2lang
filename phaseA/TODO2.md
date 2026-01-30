# Phase A review (spec alignment)

This file captures the gaps between phaseA implementation and the Phase A spec, plus the ordered plan to resolve them.

## Review findings (ordered)
1. Parser `let*`/`const*` expects a single binding list `(let* (bindings...) body...)`, but the grammar requires flat bindings: `(let* (binding) (binding) ... stmt...)`.
2. Parser statement heads exclude required forms: `break`, `continue`, `fn`, `class`, `type-interface`.
3. Parser expression heads exclude required forms: `ternary`, `await`, `yield`, `spread`, plus `fn`/`class` expressions.
4. `prop`, `object`, and `object-pattern` keys are validated as atoms but must be string literals (grammar requires <string> tokens).
5. Tokenizer only supports double-quoted strings; grammar allows single-quoted strings too.
6. Literal `undefined` is not treated as a literal; it parses as an `Identifier`.
7. Import/export grammar mismatch: parser expects `import-default`/`import-named`/`import-all` and `export-default`, but spec defines `(import (import-spec ...))` / `(export (export-spec ...))`.
8. Codegen missing for `break`, `continue`, `class`, `type-interface` statements.
9. Codegen missing for `ternary`, `await`, `yield`, `spread` expressions.
10. Codegen emits optional chaining via `maybeNull` (`?.`, `?.[]`) even though Phase A should only see canonical access; optional chaining is supposed to be rewritten away before Phase A.
11. `TypeParam` lacks `const` and `infer` metadata fields described in spec.

## Progress log
- [x] 1. Fix `let*`/`const*` flat binding parsing.
- [x] 2. Add missing statement forms to parser.
- [x] 3. Add missing expression forms to parser.
- [x] 4. Enforce string literal keys for `prop`/`object`/`object-pattern`.
- [x] 5. Support single-quoted strings in tokenizer.
- [x] 6. Parse `undefined` as a literal.
- [x] 7. Align import/export parser with spec forms.
- [x] 8. Implement missing statement codegen (`break`, `continue`, `class`, `type-interface`).
- [x] 9. Implement missing expression codegen (`ternary`, `await`, `yield`, `spread`).
- [x] 10. Remove optional-chaining emission from codegen for `maybeNull`.
- [x] 11. Add `const`/`infer` to `TypeParam`.
