# Phase A0 Minimal Calculus

> T2lang is purely a compiler pipeline; it does not provide a runtime. Every t2lang file must be transpiled to TypeScript and then executed via the TypeScript runtime environment (e.g., Node or browsers). t2lang itself never runs TypeScript code nor performs extensive TypeScript-style typechecking beyond what the shared resolver/typechecker helpers expose—the ultimate execution path always depends on explicitly invoking `tsc`/`node` or equivalent.

Phase A0 exposes the smallest possible sexpr calculus that still supports the downstream resolver/typechecker/codegen helpers. Phase B, Phase A1, or any other front-end may feed Phase A0 the canonical AST once they have rewritten all sugar.

Core assumptions:
- Programs are `(program ...)` wrappers containing statements or expressions.
- Expressions include literals, identifiers, `(call …)`, `(prop …)`, `(index …)`, `(new …)`, `(throw …)`, `(try …)`, `(fn …)`, `(class …)`, and the small set of TypeScript-neutral type nodes (`type-string`, `type-function`, etc.).
- Statements include `(block …)`, `(let* …)`, `(const* …)`, `(assign …)`, `(return …)`, `if`, `while`, `switch`, `break`, `continue` plus the three loop variants (`for-classic`, `for-of`, `for-await`).
- The TypeScript emitter attached to Phase A is responsible for rendering every expression with explicit parentheses that mirror the canonical AST structure, so `call` nodes map to fully parenthesized subexpressions (e.g., `1 + (2 * 3)`) before any downstream formatting.
- All metadata beyond immediate control flow (TDZ marks, hoist flags) attaches directly to existing nodes rather than inventing new constructs.

Phase A0 deliberately omits:
- TypeScript sugar such as mapped/inferred type predicates, optional chaining (`?.`), nullish coalescing, `??=` operators, inline decorators, and macro-like rewriting helpers (quote/unquote).
- Any semantics that rely on `tsconfig` or runtime module resolution; those belong to Phase B or Phase A1.

Once Phase B/Phase A1 have normalized the input down to these primitives, they invoke the shared resolver/typechecker/codegen pipeline that Phase A0 exposes. Keeping Phase A0 small makes reasoning about determinism, tracing, and code generation far easier.
