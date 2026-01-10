## Collated unfinished tasks (extracted from project .md files)

Below are the remaining unfinished, actionable items discovered across the repository's Markdown files. They are grouped and prioritized roughly by impact.

- **Phase0 — Operators & type/system work**:
	- [ ] Update `phase0/src/codegen/tsCodegen.ts` to support math, comparison, bitwise, and logical operators and emit infix when appropriate.
	- [ ] Add operator-specific typing rules in Phase0 typechecker (arithmetic, comparisons, equality, logical, bitwise, xor, nullish operators).
	- [ ] Decide and document `+` string-concat policy and implement as desired.
	- [ ] Add unit tests and integration tests (with `enableTsc` where useful) for operator categories.
	- [ ] Consider nullish coalescing `??`, `??=` and ternary `?:` support (parse/type/codegen/tests).

- **Generics**:
	- [ ] Implement Phase0 AST + parser support for `typeparams` and `type-app` (syntax-only checks).
	- [ ] Add codegen (emit generics when `emitTypes` enabled) and Phase1 sugar to support angle-bracket syntax.
	- [ ] Add acceptance tests for generic declarations, type application, and malformed forms.

- **Phase1 → Phase0 deduplication & macro helpers**:
	- [ ] Extract small helpers from `phase1/expand/macroExpander.ts` into `phase0` or `common` (e.g., quoted-to-AST conversion, splice flattening, gensym helpers).
	- [ ] Replace duplicated Phase1 implementations with thin shims importing Phase0/common APIs.
	- [ ] Harmonize `Lexer`/`Parser` extension hooks and types so Phase1 can remain a thin adapter.
	- [ ] Add regression tests capturing previously fixed macro edge-cases before refactors.

- **Docs, tests, and CI**:
	- [ ] Add/update docs: `Phase0_Syntax_and_Grammar.md`, operator docs, generics guide, and conversion examples.
	- [ ] Add more edge-case sugar/unit tests (nested parentheses, quoted names, splices, parenthesized dot-sigil fields).
	- [ ] Set up GitHub Actions CI to run build, lint, and tests across `common`, `phase0`, and `phase1`.

- **Tooling / examples / polish**:
	- [ ] Verify `t2tc` and `t2jc` correctness across sample inputs; fix regressions.
	- [ ] Fix `t2run` runtime issues.
	- [ ] Continue adding TypeScript → T2 examples from the TypeScript Cookbook.
	- [ ] Formatter: add Toggle Line Comment using `//` and ensure indentation handling for `//`, `;`, and `/* */`.

---

# bugs

* make sure t2tc (compile .t2 to .ts) and t2jc (compile .t2 to .ts and then invoke tsc on .ts) are working correctly.
* t2run is always broken for me.

# todo

* set up CI e.g. github actions.
* read all other TODO.md files.
* (human): continue to create examples based on https://typescript-cookbook.com/examples/
