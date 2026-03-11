# Stage10 Infix Test Expansion Plan

Goal: exercise and demonstrate `#{...}` infix notation comprehensively, with extra emphasis on every supported form of callable. Tests double as living documentation — each test name describes the form it exercises, so reading the file is a reasonable way to learn the syntax.

This plan was preceded by a **probe pass** (run interactively against `parsePrattInfix`) so each form below is labelled with its actual current behaviour, not a guess.

---

## Test File Organization

Two existing files cover roughly:

- [tests/infix.test.ts](tests/infix.test.ts) — integration: compile a `(program ...)` snippet, assert the emitted TypeScript contains the expected substring. Catches whole-pipeline regressions.
- [tests/infixPratt.test.ts](tests/infixPratt.test.ts) — unit: call `parsePrattInfix(text, null)` directly, assert AST shape via `toMatchObject`. Fast, no compile.

This plan adds two new files plus extensions to the existing two:

| File | Role | Size |
|------|------|------|
| **NEW** [tests/infixCallables.test.ts](tests/infixCallables.test.ts) | Every supported callable form, plus gap-documenting tests for unsupported forms | ~80 tests |
| **NEW** [tests/infixPrecedence.test.ts](tests/infixPrecedence.test.ts) | Exhaustive precedence matrix across all binary operators | ~40 tests |
| extend `infix.test.ts` | Integration cases for callables (compile + emit check) | +~15 tests |
| extend `infixPratt.test.ts` | A few parser-level edge cases not in the new files | +~10 tests |

The two new files are unit tests against `parsePrattInfix` directly (no compile). The existing `infix.test.ts` stays the authoritative integration check.

---

## Catalog of Callable Forms

Every form below has been probed against the current parser. Tests assert the labelled outcome.

### A. Bare-identifier callees — **all SUPPORTED**

| Form | Notes |
|---|---|
| `f()` | zero args |
| `f(x)` | one arg |
| `f(x, y)` | two args |
| `f(x, y, z)` | variadic |
| `f(a + b)` | infix expression as arg |
| `f(a + b, c * d)` | multiple infix args |
| `f(g(x))` | nested call as arg |
| `f(g(x), h(y))` | multiple nested calls as args |
| `f(g(h(x)))` | deeply nested |

### B. Dotted-name callees (reader-transformed) — **all SUPPORTED**

The reader rewrites `obj.method` to `(. obj method)` before ANTLR runs. So inside `#{...}`, the Pratt parser sees an s-form callee, not a dotted IDENT.

| Form (as written) | Post-reader | Notes |
|---|---|---|
| `obj.method()` | `(. obj method)()` | zero args |
| `obj.method(x)` | `(. obj method)(x)` | with arg |
| `arr.push(item)` | `(. arr push)(item)` | common method |
| `Math.abs(x)` | `(. Math abs)(x)` | namespace |
| `obj.a.b.method(x)` | `(. (. (. obj a) b) method)(x)` | deep prop chain |
| `console.log(msg)` | `(. console log)(msg)` | multi-segment |

### C. S-expression callees (the post-reader form, written by hand) — **SUPPORTED**

| Form | Notes |
|---|---|
| `(. arr length)` | prop access used as a value (no call) |
| `(. arr push)(x)` | explicit s-form, then call |
| `(. (. a b) c)(x)` | nested s-form, then call |

### D. Chained calls (call on call result) — **all SUPPORTED**

| Form | Notes |
|---|---|
| `f(x)(y)` | curried-style |
| `f()(y)` | zero-arg first link |
| `f(x)(y)(z)` | three-deep |
| `getF()(x, y)` | call-result with multi-arg |
| `obj.method(x)(y)` | method returning fn, then call |
| `(. obj method)(x)(y)` | explicit s-form variant |

### E. Sub-grouped callees — **SUPPORTED**

`{...}` is sub-grouping inside `#{...}`. Anything that returns a value can be a callee:

| Form | Notes |
|---|---|
| `{f}(x)` | bare grouping (semantically same as `f(x)`) |
| `{f + g}(x)` | calling result of `+` (semantically odd, but parses cleanly) |
| `{getF()}(x)` | grouping a call result |

These are useful mainly as a parser-property test — confirming nud's `LBRACE` branch composes with led's `LPAREN`.

### F. Calls in operator chains — **all SUPPORTED**

| Form | Notes |
|---|---|
| `f(x) + g(y)` | calls flanking `+` |
| `f(x) * g(y) + h(z)` | call precedence with three operators |
| `f(x) ** 2` | call as `**` left operand |
| `-f(x)` | unary minus on call |
| `!f(x)` | bang on call |
| `~f(x)` | tilde on call |
| `f(x) === g(y)` | calls in equality |
| `a + f(x) * c` | call inside operator chain |

### G. Unary chains — **SUPPORTED**

| Form | Notes |
|---|---|
| `--x` | parses as `unary-op(-, unary-op(-, x))` |
| `!!x` | double negation |
| `-!x` | mixed unary |
| `~~mask` | double tilde |

These all fall out of the Pratt design (nud calls `parseExpr(100)`, which calls another nud). Documenting that they parse — semantically `--x` is unusual but the parser is permissive.

### H. Unsupported forms — **document the gap, assert the error**

These are real gaps. Each gets a test that asserts the current error message, both to lock current behaviour and to make the gap discoverable in the test file. If/when we decide to support them, the test flips from "expects throw" to "expects parse".

| Form | Current behaviour | Future direction |
|---|---|---|
| `f(x).prop` | `unexpected token after expression: DOT '.'` | Could add a `.` led for prop-access on call results — but reader normally handles this; the gap surfaces only when written directly. |
| `(. f(x) prop)` | `expected IDENT but got LPAREN '('` | s-form parser requires simple-ident or nested s-form for `obj`. Allowing arbitrary expression here would double `parseSFormAtom`'s job. Probably leave unsupported — write `f(x).prop` once that's added, or use an explicit binding. |
| `f(...args)` | `unexpected token in atom position: DOT '.'` | Spread is not in the Pratt grammar. **Likely worth adding** — common need. New token: `DOTDOTDOT` (3 DOTs collapsed) and a nud entry. |
| `f(x, ...rest)` | same as above | falls out of spread support |
| `f(,)` | `unexpected token in atom position: COMMA ','` | reasonable error |
| `f(x,)` | `unexpected token in atom position: RPAREN ')'` | trailing-comma support is a small ergonomic add — maybe worth it |
| `f(x).` | DOT after call | same as `f(x).prop` |

The "Future direction" column is non-binding; this test plan locks behaviour, doesn't drive features.

---

## Operator Precedence Matrix

The Pratt rewrite gave us full precedence; this used to be impossible (uniformity check). Test all the ways operators interact.

### Arithmetic
- `a + b * c` → `a + (b * c)`
- `a * b + c` → `(a * b) + c`
- `a + b - c` → `(a + b) - c`  (left-assoc, same bp)
- `a * b / c` → `(a * b) / c`  (left-assoc, same bp)
- `a + b * c - d / e` → `(a + (b * c)) - (d / e)`
- `a % b + c` → `(a % b) + c`

### Power (right-assoc)
- `a ** b ** c` → `a ** (b ** c)`
- `a ** b * c` → `(a ** b) * c`  (** binds tighter than *)
- `a * b ** c` → `a * (b ** c)`
- `-a ** b` → `(-a) ** b`  (unary 100 = STARSTAR right-bp 99 + 1; unary wins)

### Logical (||  ??  &&)
- `a || b && c` → `a || (b && c)`
- `a && b || c` → `(a && b) || c`
- `a ?? b && c` → `a ?? (b && c)`
- `a || b ?? c` → `(a || b) ?? c`  (same bp 10, left-assoc)
- `a && b && c` → `(a && b) && c`  (left-assoc)

### Comparison
- `a < b + c` → `a < (b + c)`
- `a + b < c` → `(a + b) < c`
- `a < b && c < d` → `(a < b) && (c < d)`
- `a === b + c` → `a === (b + c)`
- `a == b !== c` → `(a == b) !== c`  (same bp, left-assoc — semantically unusual)

### Bitwise (& higher than ^ higher than |)
- `a | b & c` → `a | (b & c)`
- `a ^ b | c` → `(a ^ b) | c`
- `a & b ^ c` → `(a & b) ^ c`
- `a | b ^ c & d` → `a | (b ^ (c & d))`

### Unary tighter than every binary
- `!a && b` → `(!a) && b`
- `-a + b` → `(-a) + b`
- `~a | b` → `(~a) | b`
- `!a == b` → `(!a) == b`
- `-a ** b` → `(-a) ** b` (note: unary minus wins over **)

### Calls tighter than every binary or unary
- `-f(x)` → `unary-op(-, call(f, x))`
- `f(x) ** 2` → `binary-op(**, call(f, x), 2)`
- `f(x) + g(y) * h(z)` → `f(x) + (g(y) * h(z))`

### Explicit grouping overrides
- `{a + b} * c` → `(a + b) * c`
- `{a + b} * {c + d}` → `(a + b) * (c + d)`
- `a * {b + c}` → `a * (b + c)`

---

## Existing Coverage to Keep

These are already in `tests/infix.test.ts` — keep them and add the new sections alongside:

- Basic arithmetic: `1 + 2`, `x + y`, `-x + 1`
- Unary on identifiers: `!done && {count > 0}`, `-n * 2`, `~mask | flags`
- Multi-arg infix calls: `f(x, y) * g(z)`, `f(a + b, c * d)`
- Property access: `arr.length === 0`, `a.b + c.d`, `obj.method(x) + 1`
- Nullish: `value ?? defaultVal`
- Weak equality: `a == b`, `a != b`
- The `gWidth/2` whitespace test (now an error)
- The new precedence demos (`a + b * c`, `a ** b ** c`, etc.)

---

## Test Writing Conventions

For both new files:

1. **Test name = form being demonstrated.** `it('f(x)(y) — chained call on call result')` — reading the test names is reading the syntax catalog.
2. **Group by form/category.** Use `describe` for each section letter (A, B, C, ...).
3. **Use `toMatchObject` partial matching.** Only assert structural facts that matter for the form being demonstrated; don't over-specify.
4. **For unsupported forms, assert the current error message via regex.** Locks behaviour without coupling to exact wording.
5. **Helper `parse(src)` defined at top of file** — `(src) => parsePrattInfix(src, null)`.
6. **Each test ≤ 5 lines of body.** Force concision; if a test needs more, split it.

For the integration extensions (`tests/infix.test.ts`):

1. Use the existing `emittedTs` helper.
2. Test each new section's *integration*, not every form (we have the unit tests for that).
3. Pick one or two representative forms per category; full coverage lives in the unit tests.

---

## Implementation Phases

### Phase 1 — Catalog tests (unit-level, ~80 tests)

Create [tests/infixCallables.test.ts](tests/infixCallables.test.ts). Sections A–H from the catalog above. Mark unsupported forms (H) with `expect(() => parse(src)).toThrow(/regex/)`.

### Phase 2 — Precedence matrix (unit-level, ~40 tests)

Create [tests/infixPrecedence.test.ts](tests/infixPrecedence.test.ts). Six sections from the precedence matrix above.

### Phase 3 — Integration mirrors (compile-path, ~15 tests)

Add to [tests/infix.test.ts](tests/infix.test.ts):

- One or two representative tests per callable category (A, B, C, D, F, G).
- A handful of precedence demos that exercise the full pipeline.
- The error-path tests for unsupported forms (assert compile fails).

### Phase 4 — Edge cases (parser-unit, ~10 tests)

Add to [tests/infixPratt.test.ts](tests/infixPratt.test.ts):

- Span/offset checks (each token gets the right offset)
- Whitespace edge cases beyond `/`: leading/trailing whitespace, tabs, newlines
- String-literal edge cases (escapes, embedded `}` and `)`)

### Phase 5 — Sweep

Run `npm run testnow`. All new tests should pass. If any unsupported form's error message changes, update the regex (the test was meant to lock behaviour, not specific wording — adjust).

---

## Out of Scope for This Plan

- **Adding spread argument support** (form H4). Surfaces as a documented gap; if we want it, separate plan.
- **Adding `.` led for prop-access on call results** (form H1). Same — separate plan.
- **Span precision** (PRATT.md Phase C). Tracked separately.
- **Performance benchmarks.** The tokenizer runs once per `#{...}`; not a hot path.
