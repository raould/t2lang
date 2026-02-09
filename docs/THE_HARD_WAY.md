You’re right—this is where “it’s just s-exprs” stops being simple and starts being language design. Let’s write this like a mini-architecture doc for a real compiler.

---

## 1. High-level architecture

**Goal:**  
A sane, debuggable, s-expression–based language with:

- PEG parsing for sugar (including quasiquote characters)
- Optional infix sugar
- Hygienic macros with quasiquote/unquote
- Reader niceties (commas, literals, etc.)
- Good error messages with source locations
- A maintainable grammar story (EBNF + semantic layers)

**Core invariant:**

> Macros operate on canonical AST, not on raw surface sugar.  
> Reader sugar and structural sugar are separate phases.

---

## 2. Phases and pipeline ordering

Here’s the end-to-end pipeline you want:

1. **Lexing / Reader**
   - Turn source into tokens.
   - Handle:
     - whitespace, comments
     - string/char/number literals
     - quasiquote/unquote/comma tokens
     - commas as *optional* list separators
   - Output: token stream with source spans.

2. **PEG Parsing (Surface Syntax → Raw S-exprs)**
   - Use a PEG grammar to parse:
     - parentheses/brackets/braces
     - symbols, literals
     - quasiquote/unquote/splice syntax
     - optional infix sugar (if you choose to do it here)
   - Output: **surface AST** (raw s-exprs + sugar nodes), all with spans.

3. **Structural Sugar Lowering (Pre-Macro)**
   - Lower **structural** sugar into canonical AST:
     - infix → prefix
     - dot → prefix
     - array/object literals → canonical forms
     - pipelines, `if`, `for`, etc.
   - **Do not** lower generic list forms into `call` yet.
   - Output: **canonical AST except for calls**.

4. **Macro Expansion**
   - Walk AST, expanding macros:
     - macros see canonical AST (no infix, no dot, no syntactic ambiguity)
     - quasiquote/unquote handled here
     - hygiene via gensym
   - Output: fully expanded AST.

5. **Post-Expansion Lowering**
   - Now it’s safe to:
     - lower `(f x y)` → `(call f (x y))`
     - desugar remaining high-level constructs into core IR
   - Output: core IR AST.

6. **Typechecking / Analysis / Codegen**
   - Out of scope for now, but they consume the core IR.

This ordering is the backbone:

> Reader → PEG parser → structural sugar → macros → call lowering → IR.

---

## 3. Concrete syntax and PEG parsing

### 3.1 Tokens and trivia

**Tokens:**

- **Parens/brackets/braces:** `(` `)` `[` `]` `{` `}`
- **Quasiquote family:** `` ` `` `,` `,@` (or `,splice`)
- **Symbols:** identifiers, operators (if you treat them as symbols)
- **Literals:** numbers, strings, chars, regex, etc.
- **Separators:** commas (`,`), optional
- **Keywords:** `if`, `fn`, etc. (or just symbols with special meaning)

**Trivia:**

- **Whitespace:** ignored except for span tracking.
- **Comments:** `; ...` or `#| ... |#` style; ignored but tracked for spans if you want.

You want the lexer to attach **source spans** to every token: `(file, start_offset, end_offset)`.

---

### 3.2 PEG grammar for s-exprs + sugar

At the PEG level, you’re not yet enforcing macro rules or semantic constraints—just structure.

Sketch:

```ebnf
Program      <- _ Expr* EOF

Expr         <- List
              / Vector
              / Map
              / Quasiquote
              / UnquoteSplice
              / Unquote
              / Atom

List         <- '(' _ ExprList? _ ')'
Vector       <- '[' _ ExprList? _ ']'
Map          <- '{' _ MapEntryList? _ '}'

ExprList     <- Expr (Separator Expr)* Separator?
MapEntryList <- MapEntry (Separator MapEntry)* Separator?
MapEntry     <- Expr _ Expr

Separator    <- _ (',' _)+

Quasiquote   <- '`' _ Expr
UnquoteSplice<- ',@' _ Expr
Unquote      <- ',' _ Expr

Atom         <- Symbol / Number / String / Boolean / Char / Regex

_            <- (Whitespace / Comment)*
```

**Key points:**

- **Commas as separators:** handled by `Separator`—they’re syntactic sugar, not AST nodes.
- **Quasiquote/unquote:** parsed as distinct node types, not just symbols.
- **Vectors/maps:** parsed as distinct node types (sugar to be lowered later).
- **PEG is only responsible for structure**, not macro semantics.

---

### 3.3 Quasiquote characters in PEG

You treat:

- `` `x`` as `Quasiquote(x)`
- `,x` as `Unquote(x)`
- `,@x` as `UnquoteSplice(x)`

These are **AST node tags**, not just symbols. That’s what lets the macro expander implement quasiquote semantics cleanly.

---

## 4. AST model

You want a small, explicit AST for the macro expander and later phases.

Example (in pseudo-TS):

```ts
type Span = { file: string; start: number; end: number };

type Expr =
  | { kind: 'Symbol'; name: string; span: Span }
  | { kind: 'Number'; value: number; span: Span }
  | { kind: 'String'; value: string; span: Span }
  | { kind: 'List'; items: Expr[]; span: Span }
  | { kind: 'Vector'; items: Expr[]; span: Span }
  | { kind: 'Map'; entries: [Expr, Expr][]; span: Span }
  | { kind: 'Quasiquote'; expr: Expr; span: Span }
  | { kind: 'Unquote'; expr: Expr; span: Span }
  | { kind: 'UnquoteSplice'; expr: Expr; span: Span }
  // post-sugar:
  | { kind: 'If'; cond: Expr; then: Expr; else: Expr; span: Span }
  | { kind: 'Call'; fn: Expr; args: Expr[]; span: Span }
  // etc.
```

**Rule of thumb:**

> Every transformation must preserve or derive spans so you can map errors back to source.

---

## 5. Sugar transformations

### 5.1 Structural vs reader sugar

- **Reader sugar (Phase 1):**
  - string escapes
  - numeric formats
  - regex literals
  - char literals
  - maybe `#foo`-style literals
  - quasiquote tokens

  These produce **canonical literal nodes** or tagged nodes like `Quasiquote`.

- **Structural sugar (Phase 3):**
  - infix operators
  - dot notation
  - array/map literals (if they’re sugar)
  - pipelines
  - `if`, `for`, etc. if they’re syntactic forms

  These change AST shape and must be lowered **before macros**.

---

### 5.2 Infix sugar: how much does it support?

You have three main options:

1. **Minimal infix:**
   - Only for arithmetic/logical operators.
   - Fixed precedence table.
   - No user-defined operators.
   - Example: `1 + 2 * 3` → `(+ 1 (* 2 3))`.

2. **Moderate infix:**
   - Built-in operators + a small set of user-defined ones.
   - Precedence classes, but not fully programmable.
   - Still manageable in PEG with an expression grammar.

3. **Maximal infix:**
   - User-defined operators with precedence/associativity.
   - Requires either:
     - operator table + Pratt parser, or
     - multi-pass parsing.

For sanity, I’d recommend **minimal or moderate**:

```ebnf
Expr         <- InfixExpr

InfixExpr    <- InfixLevel1
InfixLevel1  <- InfixLevel2 (('||') InfixLevel2)*
InfixLevel2  <- InfixLevel3 (('&&') InfixLevel3)*
InfixLevel3  <- InfixLevel4 (('==' / '!=' ) InfixLevel4)*
InfixLevel4  <- InfixLevel5 (('+' / '-') InfixLevel5)*
InfixLevel5  <- InfixLevel6 (('*' / '/' / '%') InfixLevel6)*
InfixLevel6  <- Primary

Primary      <- List / Vector / Map / Quasiquote / Unquote / Atom / '(' _ Expr _ ')'
```

Then lower:

- `a + b` → `(List [Symbol('+'), a, b])`
- `a + b * c` → `(+ a (* b c))`

**Important:**  
This lowering happens **before macros**, so macros never see infix.

---

### 5.3 Call sugar and when to apply it

This is the bug you hit earlier.

**Rule:**

> Do **not** rewrite `(f x y)` into `Call(f, [x, y])` until *after* macro expansion.

Why?

- Macros are invoked as list forms.
- The macro expander needs to see raw list structure to decide:
  - is `f` a macro?
  - is `f` a special form?
  - is `f` a function?

So:

- Pre-macro: `(List [Symbol('when'), cond, body])`
- Macro expander: expands `when` into `(if cond (do body) nil)`
- Post-macro: any remaining `List` that is not a special form becomes `Call`.

---

### 5.4 Commas as list separators

You already saw the PEG trick:

```ebnf
ExprList <- Expr (Separator Expr)* Separator?
Separator <- _ (',' _)+
```

**Design choice:**

- Commas are **pure sugar**.
- They do not appear in AST.
- They do not affect semantics.

This lets you support:

```lisp
(foo a b c)
(foo a, b, c)
(foo a, b c) ; still valid, just weird
```

You can later add lints if you want to enforce style.

---

## 6. Macro system design

### 6.1 Macro definitions

At the AST level, a macro is:

- a binding from symbol → macro function
- macro function: `Expr[] → Expr`

Example surface syntax:

```lisp
(defmacro when (cond body)
  `(if ,cond (do ,body) nil))
```

Internally:

- `defmacro` is a **special form** recognized by the expander.
- It registers `when` in the macro environment.

---

### 6.2 Macro expansion algorithm

Pseudo:

```ts
function expand(expr: Expr, env: MacroEnv): Expr {
  switch (expr.kind) {
    case 'List': {
      if (expr.items.length === 0) return expr;
      const head = expr.items[0];
      if (head.kind === 'Symbol' && env.has(head.name)) {
        const macroFn = env.get(head.name);
        const result = macroFn(expr.items.slice(1), expr.span);
        return expand(result, env); // recursive expansion
      } else {
        return {
          ...expr,
          items: expr.items.map(e => expand(e, env)),
        };
      }
    }
    case 'Quasiquote':
      return expandQuasiquote(expr, env);
    default:
      // recursively expand children where applicable
      return mapChildren(expr, e => expand(e, env));
  }
}
```

**Key invariant:**

> Macros see canonical AST (no infix, no dot, no call sugar).

---

### 6.3 Quasiquote/unquote semantics

You implement quasiquote as a recursive transformer:

- `` `x`` → `(quote x)` if no unquotes inside.
- `` `(,x ,@y z)`` → `(list x (splice y) 'z)` (conceptually).

Algorithm:

```ts
function expandQuasiquote(node: Quasiquote, env: MacroEnv): Expr {
  return qq(node.expr, 1);

  function qq(expr: Expr, depth: number): Expr {
    if (expr.kind === 'Unquote') {
      if (depth === 1) return expand(expr.expr, env);
      return { ...expr, expr: qq(expr.expr, depth - 1) };
    }
    if (expr.kind === 'UnquoteSplice') {
      if (depth === 1) {
        // handled by caller in list context
        throw new Error("splice outside list context");
      }
      return { ...expr, expr: qq(expr.expr, depth - 1) };
    }
    if (expr.kind === 'Quasiquote') {
      return { ...expr, expr: qq(expr.expr, depth + 1) };
    }
    if (expr.kind === 'List') {
      // build (concat ...) with splices
      return buildListWithSplices(expr.items.map(e => qq(e, depth)));
    }
    // atoms: quote them
    return makeQuote(expr);
  }
}
```

You don’t need to expose this complexity to users, but you must get it right.

---

### 6.4 Gensym and hygiene

**Problem:**  
Macros that introduce bindings can accidentally capture or be captured.

Example:

```lisp
(defmacro with-temp (body)
  `(let ((x 42)) ,body))
```

If user writes:

```lisp
(with-temp (print x))
```

You get accidental capture.

**Solution: gensym.**

- Provide a function `gensym(prefix)` that returns a fresh symbol guaranteed not to clash.
- In quasiquote, allow:

```lisp
(defmacro with-temp (body)
  (let ((g (gensym "tmp")))
    `(let ((,g 42)) ,body)))
```

**Hygiene:**

Full hygiene is more complex (requires tracking scopes and renaming systematically), but **gensym + discipline** gets you 80% there.

Gotcha:

> If you don’t design gensym early, you’ll retrofit it later in pain.

---

## 7. Error reporting and source locations

### 7.1 Spans everywhere

Every AST node must carry a `span`.

- Lexer: attaches spans to tokens.
- Parser: builds node spans from token spans.
- Transformations:
  - either preserve original span
  - or derive new spans from children (e.g., from first to last child)

Rule of thumb:

> For user-facing constructs, keep the span pointing at the original surface syntax, not the desugared form.

---

### 7.2 Errors in different phases

You’ll have errors from:

1. **Lexing:**
   - invalid characters
   - unterminated strings
   - bad numeric literals

2. **Parsing:**
   - unexpected tokens
   - unbalanced parens/brackets/braces
   - invalid quasiquote placement (if you enforce it here)

3. **Structural sugar:**
   - malformed infix (e.g., `+ + 1`)
   - invalid dot chains
   - invalid map literals (odd number of elements)

4. **Macro expansion:**
   - macro arity errors
   - macro throwing exceptions
   - unquote/splice misuse

5. **Typechecking / IR:**
   - undefined variables
   - type errors
   - etc.

Each error should include:

- **message**
- **span**
- **phase** (lexing/parsing/sugar/macro/IR)
- optionally: **macro expansion stack**

---

### 7.3 Macro backtraces

When a macro expansion causes an error, you want something like:

> Error: undefined symbol `foo`  
> at expanded code from macro `when` (macro.lisp:10:3)  
> at call site (user.lisp:42:5)

To do this:

- Track an **expansion stack**:
  - when expanding macro `M` at span `S`, push `(M, S)`
  - when done, pop
- Attach expansion provenance to generated nodes:
  - e.g., `origin: { originalSpan, expandedFrom: [frames...] }`

This is one of those “you’ll wish you had it later” features.

---

## 8. Grammar maintenance and EBNF limitations

### 8.1 What EBNF/PEG can express

EBNF/PEG is great for:

- concrete syntax:
  - where parens/brackets/braces go
  - where commas are allowed
  - how quasiquote/unquote appear
  - infix precedence (with some care)

It is **not** great for:

- macro semantics
- hygiene
- “this symbol must be a macro here”
- “this form must have exactly 2 arguments” (beyond arity checks in later phases)

So you should treat the grammar as:

> A spec for surface syntax, not for the full language semantics.

---

### 8.2 How to manage the mismatch

**Strategy:**

1. Keep a **clean, minimal EBNF/PEG** for:
   - s-exprs
   - sugar forms
   - infix
   - quasiquote

2. Document **semantic constraints** separately:
   - in a “Language Semantics” or “Macro Semantics” section
   - e.g., “`defmacro` must appear at top level”, “`if` takes 2 or 3 args”

3. In the implementation:
   - enforce structural constraints in the parser
   - enforce semantic constraints in:
     - sugar lowering
     - macro expansion
     - later passes

Gotcha:

> Don’t try to cram macro semantics into PEG. You’ll end up with an unreadable grammar and still need semantic checks later.

---

## 9. Gotchas and “you should have known”

Here’s the grab bag of things that bite people:

- **Call sugar too early:**
  - Rewriting `(f x y)` into `Call` before macro expansion breaks macros.
  - Fix: only lower calls after macros.

- **Infix too late:**
  - Letting macros see infix means macros must understand precedence.
  - Fix: lower infix before macros.

- **Reader macros doing structural work:**
  - If a “reader macro” changes AST shape, it’s not a reader macro—it’s parser sugar.
  - Fix: reader macros may only produce canonical literals or tagged nodes.

- **Quasiquote as just syntax sugar:**
  - Treating `` `x`` as just `(quote x)` in the parser breaks nested quasiquote/unquote.
  - Fix: represent quasiquote/unquote as AST nodes and implement semantics in the expander.

- **No spans on AST nodes:**
  - You can’t bolt on good error messages later.
  - Fix: spans from day one.

- **No macro backtrace:**
  - Errors in expanded code become inscrutable.
  - Fix: track expansion provenance.

- **Unhygienic macros without gensym:**
  - Subtle name capture bugs.
  - Fix: provide `gensym` and encourage its use; consider full hygiene later.

- **Overloading commas:**
  - Using commas both as separators and as unquote leads to ambiguity.
  - Fix: keep `,` as unquote, use commas as separators only in list contexts, and treat them as trivia in AST.

- **EBNF as “the whole truth”:**
  - Assuming the grammar fully describes the language leads to confusion.
  - Fix: treat grammar as surface syntax only; document semantic layers.

- **Macro expansion order:**
  - Expanding macros in the wrong order (e.g., inner before outer) can break semantics.
  - Fix: standard outermost-first expansion with recursion on results.
