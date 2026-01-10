Phase1 function type sugar

Purpose
- Provide ergonomic syntax in Phase1 for annotating parameter and return types, while producing canonical Phase0 s-exprs.

Supported sugar forms (user-facing Phase1 syntax)
- Param shorthand inside the params list:
  - `(fn (x: number y: string) ...)`  -> canonical Phase0: `(fn ((x number) (y string)) ...)`
  - `(fn ((x number) (y string)) ...)` -> already canonical (Phase0 style)
  - `(fn name (x : number) ...)`       -> canonical `(fn name ((x number)) ...)`

- Return shorthand after params:
  - `(fn (x) : number body...)`        -> canonical Phase0: `(fn (x) (returns number) body...)`
  - `(fn (x) (returns number) body...)` -> canonical as-is
  - `(fn (x) (-> number) body...)`      -> also treated as `(returns number)`

Design constraints
- Phase0 stays minimal: its parser expects plain s-expr shapes like `((name type) ...)` for params and `(returns TYPE)` for return annotation.
- Phase1 performs only syntactic rewrites (in `phase1/src/parse/sugarRewrite.ts`) to transform ergonomic forms into those canonical s-exprs before handing tokens to Phase0's parser.
- This keeps Phase0 simple and reliable; Phase1 is responsible for ergonomics and backwards-compatible shorthands.

Examples
- User writes:
  (program (fn (x: number) : number (return x)))

- Phase1 rewrites to canonical Phase0 form roughly equivalent to:
  (program (fn ((x number)) (returns number) (return x)))

- Phase0 parser produces the AST with `Identifier.typeAnnotation` set for `x` and `FunctionExpr.returnType` set to the parsed type node. The typechecker enforces the annotation and the codegen emits `x: number` and `: number` in the generated TypeScript when `emitTypes` is enabled.

Notes
- Phase1's sugar rewrite is conservative: it only rewrites syntactic shapes and leaves semantic/type checking and macro expansion to the normal Phase1/Phase0 pipelines.
- If you need additional ergonomic forms, add them to Phase1's rewrite/lexer layer so Phase0 continues to receive canonical s-exprs.
