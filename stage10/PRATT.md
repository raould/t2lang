# Stage10 Infix: Pratt Parser Plan

> **Status: Implemented.** Phases A and B landed. Stage10 now uses the Pratt parser for all `#{...}` expressions. The "Implementation Gotchas" section near the end captures everything discovered during the build that wasn't obvious from this plan.

## Motivation

The current `#{...}` infix implementation uses ANTLR rules for the full parse. Two problems:

1. **`/` whitespace ambiguity.** ANTLR skips whitespace before the parser sees any tokens. `#{gWidth/2}` and `#{gWidth / 2}` are indistinguishable because `/` is intentionally not excluded from `IDENTIFIER` (it serves as a macro namespace separator: `m/identity`). There is no hook in the ANTLR grammar to enforce spaces around `/`.

2. **No operator precedence.** The "uniformity check" (all operators at the same `{}` level must be identical) is a workaround for the missing precedence table. `#{a + b * c}` is a compile error today; it should produce `a + (b * c)`.

A Pratt parser running on **raw text with whitespace preserved** solves both problems. ANTLR is reduced to a brace-balancing rule; all semantic parsing moves into a dedicated module.

---

## Design Decision: Precedence Replaces Uniformity

This change drops the "uniformity check" (mixed operators are an error) in favor of a real precedence table. `#{a + b * c}` becomes valid and produces `a + (b * c)`. INFIX.md still documents the uniformity check as a feature; **INFIX.md must be updated** when this lands so the two design docs don't disagree.

---

## How Raw Text Extraction Works

The reader pre-transforms the source before ANTLR parsing (e.g. `arr.length` → `(. arr length)`). The `CharStream` that ANTLR lexed from is still accessible on any token:

```typescript
const startTok   = ctx.start;                    // HASH_LBRACE token
const stopTok    = ctx.stop;                     // RBRACE token
const innerStart = startTok.stop + 1;            // first char after '#{'
const innerStop  = stopTok.start - 1;            // last char before '}'
const inner = innerStart <= innerStop
  ? startTok.inputStream.getTextFromRange(innerStart, innerStop)
  : "";
// inner = "gWidth / 2"  or  "gWidth/2"  or  "(. arr length) + 1"  or  ""
```

`inner` is post-reader text with whitespace intact. The Pratt parser operates on this string.

> **API note:** antlr4ng's `CharStream` exposes `getTextFromRange(start, stop)` and `getTextFromInterval(interval)`. There is no `getText(start, stop)`. Token boundary positions are `token.start` / `token.stop` (inclusive char indices) — not `startIndex` / `stopIndex` (which is the antlr4ts API).
>
> The defensive `start.stop + 1` / `stop.start - 1` form is preferred over the equivalent `start.start + 2` / `stop.stop - 1`: it doesn't depend on the literal lengths of `#{` and `}`, and it cleanly handles the empty `#{}` case (produces `innerStart > innerStop`, guarded by the ternary).

---

## Grammar Changes (verified)

Three new rules replace the old `infixBody` / `infixAtom` / `infixBinOp` / `infixUnaryOp` / `infixArgs` rules. Delete those, then add:

```antlr
infixExpr    : HASH_LBRACE infixContent RBRACE ;

infixContent : infixPart* ;

infixPart    : LBRACE infixContent RBRACE
             | ~(LBRACE | RBRACE)
             ;
```

`~(LBRACE | RBRACE)` matches any single token that is not LBRACE or RBRACE. This balances `{}` recursively with no token enumeration. New token types added to the language never need to be added here.

`infixExpr` remains in the `expression` rule unchanged. All operator tokens stay in `opSymbol` / `propKey` as before.

### What this grammar accepts and rejects (verified by test)

| Input | Outcome |
|---|---|
| `#{a + b * c}` | parse OK, inner = `"a + b * c"` (whitespace preserved) |
| `#{{a + b} * c}` | parse OK, nested `{}` balanced, inner = `"{a + b} * c"` |
| `#{{{deeply nested}}}` | parse OK |
| `#{f(x, y) + 1}` | parse OK (parens not grammar-balanced — Pratt's job) |
| `#{}` / `#{   }` | parse OK, inner empty/whitespace — **Pratt must error** |
| `#{f(x}` | parse OK, inner = `"f(x"` — **Pratt must error** (unmatched paren) |
| `#{#{nested}}` | **ANTLR error**: `extraneous input '}' expecting {<EOF>, '#{'}` |
| `#{a + #{b}}` | **ANTLR error**: same — nested `#{}` rejected at parse time, no Pratt work needed |

---

## New File: `Stage10-infix-parser.s9`

Exports one function:

```typescript
parsePrattInfix(inner: string, ctx: any): AstNode
// inner  — post-reader text between #{ and }
// ctx    — the infixExpr parse context (used for span registration)
// returns a binary-op, unary-op, call, prop-access, identifier, or literal node
```

### Pratt error responsibilities

The Pratt parser owns these error cases (ANTLR doesn't catch them):

- Empty or whitespace-only `inner` → `"empty #{} expression"`
- Identifier text containing `/` → `"identifier 'gWidth/2' contains '/' — add spaces: gWidth / 2"`
- Unmatched `(` / `)` → `"unmatched parenthesis in #{}"`
- Bare `(` in atom position not followed by `.` (s-form) → `"'(' is not a sub-grouping form inside #{}; use {...}"`
- Trailing `,` in argument list, missing operand, etc. → standard parse-error messages

ANTLR catches: nested `#{}`, unbalanced `{}`.

### Pratt Tokenizer

Scans `inner` char-by-char. Each token: `{ kind, text, offset }` where `offset` is the start character offset within `inner`.

**Token kinds:** `NUM STR IDENT PLUS MINUS STAR SLASH PERCENT STARSTAR LT GT LTE GTE STRICT_EQ STRICT_NEQ EQ NEQ AMPAMP PIPEPIPE NULLCOAL AMP PIPE CARET BANG TILDE LPAREN RPAREN LBRACE RBRACE COMMA DOT EOF`

There is **no SFORM token kind**. S-expression sub-forms are recognized by the parser in `nud`, not by the tokenizer.

**Identifier scanning.** An identifier is a run of characters that are not whitespace and not in `(){},:;+*%<>!&|^"`. The `/` character is included in an identifier **unless** the character immediately before it is whitespace (or it is at the start of `inner`) **and** the character immediately after it is whitespace. In that case `/` is emitted as `SLASH`.

- `gWidth/2` → `IDENT("gWidth/2")` — one token
- `gWidth / 2` → `IDENT("gWidth")` `SLASH` `NUM("2")` — three tokens

If `nud` receives an `IDENT` token whose text contains `/`, throw a span error (see error responsibilities above).

**String scanning.** `"..."` and `` `...` `` (if backtick templates are used inside `#{}`) are scanned as a single `STR` token. The scanner respects backslash escapes inside the quotes. This is required so that a `}` or `)` inside a string literal does not unbalance anything downstream.

**Multi-character operators.** Scanned longest-first: `**`, `===`, `!==`, `<=`, `>=`, `==`, `!=`, `&&`, `||`, `??` before their single-char prefixes.

---

### Pratt Parser

Standard top-down operator precedence. Binding powers:

| Operator(s)            | bp (left) | right bp         |
|------------------------|-----------|------------------|
| `\|\|` `??`           | 10        | 10               |
| `&&`                  | 20        | 20               |
| `\|`                  | 30        | 30               |
| `^`                   | 40        | 40               |
| `&`                   | 50        | 50               |
| `===` `!==` `==` `!=` | 60        | 60               |
| `<` `>` `<=` `>=`    | 70        | 70               |
| `+` `-`               | 80        | 80               |
| `*` `/` `%`           | 90        | 90               |
| `**`                  | 100       | 99 (right-assoc) |
| `(` (call, in `led`)  | 120       | —                |

`RPAREN`, `RBRACE`, `COMMA`, `EOF`, and any token in `nud`-only position have `bp = 0` so they terminate the `parseExpr` loop.

**`nud` dispatch** (prefix / atom position):

| Token    | Action |
|----------|--------|
| `NUM`    | literal node |
| `STR`    | literal node |
| `IDENT`  | check for `/` in text (error if found); identifier node |
| `MINUS`  | `unary-op("-", parseExpr(100))` |
| `BANG`   | `unary-op("!", parseExpr(100))` |
| `TILDE`  | `unary-op("~", parseExpr(100))` |
| `LBRACE` | `parseExpr(0)` then expect `RBRACE` — sub-group |
| `LPAREN` | peek next token: if `DOT` → `parsePropAccess()`; else error (bare `(` not allowed) |

> Dotted identifiers like `arr.length` never reach the tokenizer as a single `IDENT` because the reader pre-transforms them to `(. arr length)`. The `IDENT` `nud` therefore does not need to call `desugarDottedIdentifier`.

**`led` dispatch** (infix position, called after the left operand is parsed):

| Token     | Action |
|-----------|--------|
| binary op | `binary-op(op, left, parseExpr(bp))` |
| `**`      | `binary-op("**", left, parseExpr(99))` — right-assoc |
| `LPAREN`  | neoteric call: parse comma-separated `parseExpr(0)` args until `RPAREN`; return `call` node |

**Main loop:**
```
parseExpr(minBp):
  left = nud(advance())
  while bp(peek()) > minBp:
    left = led(left, advance())
  return left
```

**S-form parser** (`nud` for `LPAREN` followed by `DOT`). The reader produces `(. obj key)` chains; the parser walks the same token stream recursively rather than re-tokenizing captured text:

```
parsePropAccess():
  // LPAREN already consumed
  expect DOT
  obj = parseSFormAtom()    // recurses into another (. ...) if peek is LPAREN+DOT
  key = expectIDENT()
  expect RPAREN
  return prop-access(obj, key)

parseSFormAtom():
  if peek == LPAREN and peek(1) == DOT:
    consume LPAREN; return parsePropAccess()
  return identifier-from(expectIDENT())
```

This naturally handles `(. (. a b) c)` (which is `a.b.c`).

---

## Span Strategy

**Phase 1 (MVP):** All nodes produced by `parsePrattInfix` receive the span of the enclosing `infixExpr` ctx — every `binary-op`, `unary-op`, `call`, etc. gets the same `registerSpan(nextNodeId(), ctx)`. Error messages point to the start of `#{`.

> This is a real regression vs. the rest of the codebase, where each node has a precise span. Inside complex `#{}` expressions, runtime errors will be imprecise. Plan to do Phase 2 sooner rather than later.

**Phase 2 (follow-up):** Build a char-offset → line:col index from `inner` at parse time. Add `registerSpanByOffset(id, baseLine, baseCol, localStart, localEnd)` to `Stage10-spans.s9`. Per-token precision.

---

## What Changes vs. What Stays the Same

### Changes

| Item | Change |
|------|--------|
| `Stage10.g4` | Remove `infixBody / infixAtom / infixBinOp / infixUnaryOp / infixArgs`; add `infixContent / infixPart` (3 lines) |
| `Stage10-ast.s9` | Remove `astInfixBody`, `astInfixAtom`, `astUnaryOp`; replace `astInfixExpr` body with `parsePrattInfix(inner, ctx)` |
| **New** `Stage10-infix-parser.s9` | Pratt tokenizer + parser; exports `parsePrattInfix`. Actual size: ~270 lines `.s9` → ~720 lines compiled `.ts` (smaller than the 400–600 estimate because Phase 1 spans don't track per-token positions). |
| `tests/infix.test.ts` | Update mixed-operator test (no longer an error); add precedence and `/`-without-spaces tests |
| `INFIX.md` | Remove "uniformity check" as a feature; document precedence table |

### Unchanged

- `Stage10-tags.ts` — `binary-op`, `unary-op` tag strings
- `Stage10-macro-expand.s9`, `Stage10-scope-resolve.s9`, `Stage10-lower.s9` — already handle `binary-op`/`unary-op`
- `Stage10-codegen.s9` — no change

---

## Implementation Phases

### Phase A — Standalone Pratt module

Build `Stage10-infix-parser.s9` in isolation. No grammar changes. No integration. The module is dead code on the main path until Phase B.

Unit tests (in a new test file, run via vitest) cover the tokenizer and parser independently:

**Tokenizer:**
- `"gWidth/2"` → `[IDENT("gWidth/2")]`
- `"gWidth / 2"` → `[IDENT("gWidth"), SLASH, NUM("2")]`
- `"(. arr length) + 1"` → `[LPAREN, DOT, IDENT("arr"), IDENT("length"), RPAREN, PLUS, NUM("1")]`
- `"sin(x) * r"` → `[IDENT("sin"), LPAREN, IDENT("x"), RPAREN, STAR, IDENT("r")]`
- `'f("hello)world")'` → `[IDENT("f"), LPAREN, STR("\"hello)world\""), RPAREN]` (string literal contains `)`)

**Parser:**
- `"1 + 2"` → `binary-op(+, 1, 2)`
- `"a + b * c"` → `binary-op(+, a, binary-op(*, b, c))`
- `"a ** b ** c"` → `binary-op(**, a, binary-op(**, b, c))` — right-assoc
- `"(. arr length)"` → prop-access node
- `"(. (. a b) c)"` → nested prop-access chain

**Errors:**
- `""` → "empty #{}"
- `"gWidth/2"` → "identifier contains '/'"
- `"f(x"` → "unmatched parenthesis"
- `"(x + 1)"` → "'(' is not a sub-grouping form"

This phase is pure addition: it cannot break anything.

### Phase B — Atomic swap

Single commit:

1. Edit `Stage10.g4`: delete old infix rules, add the 3-line `infixContent` / `infixPart` rules.
2. Run `npm run build-grammar`.
3. Replace `astInfixExpr` body in `Stage10-ast.s9`: extract `inner` via `inputStream.getTextFromRange`, call `parsePrattInfix`. Delete `astInfixBody`, `astInfixAtom`, `astUnaryOp`.
4. Update `tests/infix.test.ts` mixed-operator test (verify precedence output instead of error).
5. Run full test suite — must be green.
6. Update INFIX.md: remove uniformity-check description, add precedence table.

The "stub during transition" approach is **not viable**: the parse-tree shape changes when the grammar changes, so the old AST functions cannot run on the new tree. Phase B must land as one commit.

### Phase C (follow-up) — Precise spans

Per the Span Strategy section. Recommended within a few weeks of Phase B; do not let Phase 1 spans become permanent.

---

## Follow-up Features (F1, F2, F3)

After Phase B landed, three gaps were documented as locked-in error tests in `tests/infixCallables.test.ts` section H. The plans below implement each. They are independent and can be done in any order.

### F1 — `.` led for prop-access on call results

**Problem:** `#{f(x).prop}` is rejected with `unexpected token after expression: DOT '.'`. The reader's dotted-id transform requires identifier characters on both sides of `.`; after a `)` it doesn't fire, so the Pratt parser sees a literal `DOT` token after the call and has no `led` for it.

**Plan:**

1. **Tokenizer:** no change. `.` is already emitted as `DOT`.
2. **Parser bp table:** add `(if (=== kind "DOT") (then (return 110)))`. bp 110 is between unary (100) and call (120) — `f(x).a(y)` works because `.` binds tighter than `+` but looser than `(`.
3. **Parser led:** when `DOT` appears in led position, consume DOT, expect IDENT (the property key), produce `prop-access` node:
   ```
   { id, text: "", tag: 'prop-access', object: left, key: identText }
   ```
4. **Chained `.` falls out of left-assoc Pratt.** `f(x).a.b` parses as `prop-access(prop-access(f(x), 'a'), 'b')` automatically.
5. **`f(x).a(y)` falls out of bp ordering.** After `f(x).a`, peek `(` (bp 120) > 110 minBp from outer `parseExpr(0)`, so the call-led runs and produces `call(prop-access(f(x), 'a'), [y])`.

**Tests to add:**
- `f(x).prop` → prop-access
- `f(x).a.b` → chained prop-access
- `f(x).method(y)` → call on prop-access on call
- `arr.length` direct (already works via reader, but add an explicit non-reader version)
- `(. obj method)(x).result` → DOT after s-form call
- `arr[0].length` → DOT after subscript

**Tests to flip:** the H1 locked-error test in `tests/infixCallables.test.ts` flips from `expect(throw)` to a positive assertion.

**Reader fix (landed alongside F1):** the original implementation surfaced two bugs in the reader that had been blocking chained postfix patterns: (1) `findPrecedingExprStart` didn't continue walking past a closed paren/bracket group through preceding ident characters, so `f(x)[0]` produced `f(subscript (x) "0")`; (2) the dotted-id trigger predicate only fired when both prev and next chars were ident-like, so `f(x).a` stayed un-transformed and `f(x).a.b` got mangled to `f(x)(. .a b)`. Both were fixed: `findPrecedingExprStart` now alternates between paren/bracket/brace walks and ident walks, and the dotted-id trigger now also fires when prev is `)`, `]`, or `}`. The Pratt parser's `parseSFormAtom` was generalized to accept arbitrary expressions (calls, subscript forms, nested s-forms) in obj position, since the reader now produces those.

### F2 — Spread arguments

**Problem:** `#{f(...args)}` is rejected. The tokenizer emits three separate `DOT` tokens; the parser has no nud for DOT in atom position.

**The codebase already has spread machinery** for array literals: AST tag `'spread'` with `expr` field, lowered to `'spread-expr'`, emitted as `'...' + emit(expr)` in codegen. Call-arg emit (`emitCall` → `emitExpr` over args) already handles `spread-expr` because it goes through the generic expr emitter. So **only the Pratt parser needs to change** — the rest of the pipeline supports spread already.

**Plan:**

1. **Tokenizer:** add a longest-match check for `...` before single-DOT dispatch. Emit a `DOTDOTDOT` token (text `"..."`).
2. **Parser:** add spread support **only inside `parseCallArgs`** (it's not a general expression form):
   ```
   parseOneArg():
     if peek == DOTDOTDOT:
       consume DOTDOTDOT
       inner = parseExpr(0)
       return { id, text: "", tag: 'spread', expr: inner }
     return parseExpr(0)
   ```
   `parseCallArgs` calls `parseOneArg` instead of `parseExpr(0)` directly.
3. **Token-kind in `bp()`:** `DOTDOTDOT` is not a binary or led-trigger, so bp returns 0 (default). No change needed.

**Tests to add:**
- `f(...args)` → call with one spread arg
- `f(x, ...rest)` → call with mixed args
- `f(...a, ...b)` → call with multiple spreads
- `f(...a + b)` — should this even parse? Probably yes — `parseExpr(0)` after consuming `...` parses the full expression. So `f(...a + b)` = `f(...(a + b))`. Document this.

**Tests to flip:** H3 (`f(...args)`) and H4 (`f(x, ...rest)`).

### F3 — Trailing comma in call arg list

**Problem:** `#{f(x,)}` errors because after consuming the comma, `parseCallArgs` expects another expression and gets `RPAREN`.

**Plan:**

1. **Parser only:** change `parseCallArgs` to allow trailing comma:
   ```
   parseCallArgs():
     if peek == RPAREN: advance; return []
     args.push(parseOneArg())
     while peek == COMMA:
       consume COMMA
       if peek == RPAREN: break    ← new
       args.push(parseOneArg())
     expect RPAREN
     return args
   ```

**Tests to add:**
- `f(x,)` → call with one arg
- `f(x, y,)` → call with two args plus trailing comma
- `f(,)` → still error (no preceding arg)

**Tests to flip:** H6 (`f(x,)`).

### Acceptance after F1+F2+F3

All three together should:
- Make every test in section H of `tests/infixCallables.test.ts` either flip to positive or remain a sensible error (only `(. f(x) prop)` and `f(,)` remain errors — these are different design choices, not gaps).
- Compile end-to-end: `#{arr.push(...newItems)(extra)}` → `arr.push(...newItems)(extra)` JavaScript.
- Add ~15 new passing tests across `infixCallables.test.ts` and `infix.test.ts`.

---

## Implementation Gotchas

Discovered during the actual Phase A and Phase B build. Capture here so the next person doesn't re-discover them.

### `.s9` / t2lang language

1. **Statement-level `(const NAME ...)` requires parens around the name.** Top level: `(const foo expr)`. Inside a `lambda` body or `let` body: **`(const (foo) expr)`**. Forgetting the parens produces an opaque error like `extraneous input 'foo' expecting {'(', '[', '{'}`. The same rule applies to `let` (statement-level wants `(let (name) val)`).

2. **`quote` is a reserved word.** Used by quasiquote machinery. Rename to `quoteCh` or similar.

3. **`at` is a reserved word too.** Couldn't pin down the form, but the parser rejects it as a const name. Renamed to `chAt`.

4. **Inner helpers close over outer `let` bindings.** Because `let` is `let*`-style (sequential), helpers defined later see and can mutate earlier bindings via `set!`. This is the right pattern for a tokenizer with `i`, `len`, `tokens` state plus inline scanner functions.

5. **Avoid nested `(if (then ...) (else (if ...)))` chains.** They explode in close-paren count and become unmaintainable. Use a flat sequence of `(if cond (then ... (return ...)))` — each branch short-circuits via `(return)` from the enclosing lambda. This was a 4× win in readability for the tokenizer dispatch.

6. **Run a paren-balance check before compiling** — saves round-trips. The compiler reports unclosed parens by *count*, not location:

   ```bash
   node -e '
     const fs = require("fs"); const src = fs.readFileSync(process.argv[1], "utf-8");
     let depth = 0, line = 1, inStr = null, inComment = false, openLines = [];
     for (let i = 0; i < src.length; i++) {
       const ch = src[i];
       if (ch === "\n") { line++; inComment = false; continue; }
       if (inComment) continue;
       if (inStr) { if (ch === "\\") i++; else if (ch === inStr) inStr = null; continue; }
       if (ch === ";" && src[i+1] === ";") { inComment = true; continue; }
       if (ch === "\"" || ch === "\x27" || ch === "`") { inStr = ch; continue; }
       if (ch === "(") { depth++; openLines.push(line); }
       else if (ch === ")") { depth--; openLines.pop(); }
     }
     console.log("Final depth:", depth, "Unclosed at lines:", openLines);
   ' path/to/file.s9
   ```

### ANTLR4 / antlr4ng API

1. **`CharStream.getText(start, stop)` does not exist.** Use `getTextFromRange(start, stop)` or `getTextFromInterval(interval)`. (The non-existent method is in many antlr4ts examples, which is why the first draft of PRATT.md got it wrong.)

2. **Token positions are `.start` and `.stop` (inclusive char indices).** Not `.startIndex` / `.stopIndex` — that's antlr4ts. This API divergence is a known antlr4ng vs. antlr4ts gotcha.

3. **`token.inputStream` is a getter** that returns the original `CharStream` directly. No need to plumb the input stream through the parser; any token gives you the source text.

4. **`~(SET)` works in PARSER rules, not just lexer rules.** Matches "any single token not in the set". This is the key insight that made the 3-line grammar possible. Verified by generating a throwaway `.g4` and parsing test inputs before locking the design.

5. **HASH_LBRACE inside `#{...}` triggers parse error at the outer level.** Because the negation rule `~(LBRACE | RBRACE)` matches HASH_LBRACE (it's not LBRACE or RBRACE), the inner `#{nested}` consumes its own `#{` and then the inner `}` ends the *outer* `infixContent`, leaving a stray `}` that ANTLR rejects with: `extraneous input '}' expecting {<EOF>, '#{'}`. Bonus: nested `#{}` is rejected for free; no Pratt-level work needed.

### Reader pre-transforms

1. **Dotted identifiers are converted before ANTLR runs.** `arr.length` becomes `(. arr length)` in the post-reader text. So inside `#{...}` raw text, the Pratt parser sees `(` `.` `arr` `length` `)`, never a dotted IDENT. The Pratt parser must handle s-form sub-expressions; dotted-name desugaring code paths (e.g. `desugarDottedIdentifier`) are dead code in this context.

2. **No way to opt out** of reader transforms inside `#{...}`. The reader doesn't know about infix expressions — it reads the entire source uniformly.

### Span and testing

1. **`registerSpan(id, ctx)` accepts `null`/`undefined` ctx** and returns `id` unchanged. Lets unit tests call `parsePrattInfix(inner, null)` directly without constructing fake ANTLR contexts. Major DX win for testing.

2. **All Pratt-generated nodes share the same span** (Phase 1). When a downstream stage emits a runtime error from inside a complex `#{a + f(b * c)}`, the span points to the start of `#{`, not the offending sub-expression. Phase C is the fix and is recommended.

### Build and test commands

```bash
# From stage10/src/ — compile a single .s9 file:
npm --silent --prefix ../../stage9 run t2tc -- $PWD/Stage10-infix-parser.s9

# From stage10/ — regenerate ANTLR parser/lexer after grammar edits:
npm run build-grammar

# Compile every Stage10-*.s9:
npm run build-ts-files

# Full test suite (typecheck is mandatory per CLAUDE.md):
npx vitest --typecheck run

# Single test file:
npx vitest run tests/infixPratt.test.ts
```

The `npm test` script runs `build` first (grammar + .s9 compile + main); `npm run testnow` skips the build. Use `testnow` for fast iteration after non-grammar/non-s9 changes.

---

## Acceptance Tests

```lisp
;; precedence (formerly errors)
#{a + b * c}                    ;; → a + (b * c)
#{a * b + c}                    ;; → (a * b) + c
#{a || b && c}                  ;; → a || (b && c)

;; right-associativity
#{a ** b ** c}                  ;; → a ** (b ** c)

;; whitespace enforcement
#{gWidth/2}                     ;; → ERROR: identifier 'gWidth/2' contains '/'
#{gWidth / 2}                   ;; → gWidth / 2

;; empty / malformed
#{}                             ;; → ERROR: empty #{}
#{f(x}                          ;; → ERROR: unmatched parenthesis
#{#{nested}}                    ;; → ERROR (caught by ANTLR)

;; neoteric calls (already in test suite — verify still pass)
#{f(x) + 1}                     ;; → f(x) + 1
#{obj.method(x) * 2}           ;; → obj.method(x) * 2  (reader: (. obj method)(x) * 2)

;; chained prop access
#{a.b.c + 1}                    ;; → a.b.c + 1  (reader: (. (. a b) c) + 1)
```
