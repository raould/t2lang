# Reader macros (surface syntax → Stage 4 AST)

## Purpose
Reader macros allow t2lang to support:

- `{ foo: 2 }` → `(object (foo 2))`
- `[1, 2, 3]` → `(array 1 2 3)`
- `1 + 2` → `(+ 1 2)`
- `foo.bar` → `(. foo bar)`
- `foo?.bar` → `(optchain foo bar)`
- `foo ?? bar` → `(nullcoal foo bar)`
- `a ? b : c` → `(ternary a b c)`
- Template literals
- JS‑like class syntax (optional)
- And more

These are **reader‑level sugar**, not part of Stage 4 grammar.

### Dotted identifiers and macros

- Dotted identifiers desugar to nested `prop-access` nodes before macro expansion. Macros never see a raw identifier containing dots.
- Optional chaining/nullish must be explicit (`optchain`, `optchain-index`, `nullcoalesce`); dotted sugar does not imply `?.` or `??`.
- To match dotted input inside a macro, pattern on `prop-access` shapes (e.g., `.tag == 'prop-access'`, inspect `.object` and `.key`).

## Why reader macros belong outside Stage 4
Stage 4 is:

- Fully parenthesized
- Explicit
- Deterministic
- Easy to parse
- Easy to manipulate with macros

Adding `{}` and `[]` directly to Stage 4 would:

- Break the uniformity
- Introduce precedence rules
- Complicate the grammar
- Interfere with macro hygiene

## Implementation plan

### Goal pipeline

```
source code
    ↓
reader (handles {}, [], ., +, template literals, etc.)
    ↓
Stage4 parser (pure S‑expr grammar)
    ↓
macro expander (hygienic, gensym, quasiquote)
    ↓
lowering (Stage4 → TS AST)
    ↓
TypeScript emitter
    ↓
tsc
```

### Step 1 — Create a Stage 0 “reader” layer
This layer:

- Tokenizes `{}`, `[]`, `:`, `.`, `?.`, `??`, `+`, `-`, `*`, `/`, `...`, etc.
- Parses JS‑like expressions
- Produces Stage 4 S‑expressions

### Step 2 — Define reader macro hooks
Allow users to define:

```
(reader-macro "#" myHashReader)
```

Or built‑ins:

- `#js{ ... }`
- `#{ ... }` for sets
- `#( ... )` for vectors
- `#'` for quoting

### Step 3 — Desugaring rules
Examples:

- `{ a: 1, b: 2 }` → `(object (a 1) (b 2))`
- `[1, 2, 3]` → `(array 1 2 3)`
- `foo.bar` → `(. foo bar)`
- `foo?.bar` → `(optchain foo bar)`
- `foo ?? bar` → `(nullcoal foo bar)`
- `a ? b : c` → `(ternary a b c)`
- `new Foo(1,2)` → `(new Foo 1 2)`

### Step 4 — Integration with macro system
Reader macros run **before** macro expansion:

```
source → reader → Stage4 AST → macro expander → lowering → TS
```

This ensures macros always see canonical S‑expressions.

---

# Non-deterministic macros

You can add non‑deterministic, effectful macros later, but only if you **deliberately separate the macro system into two strata** and preserve the invariants of the hygienic, deterministic layer you’re building now. The cleanest way to think about this is: *t2lang can support effectful macros, but they must live in a different phase, with different guarantees, different capabilities, and different constraints.*

The rest of this response lays out the full design space, the architectural consequences, and the safest way to integrate effectful macros without breaking the core language.

---

## Why deterministic macros must remain the default
Your current macro plan (Stage 4 macros) is built on three invariants:

- **Purity** — macro expansion is deterministic and reproducible.
- **Hygiene** — gensym and scope metadata guarantee no accidental capture.
- **Stability** — macro expansion is independent of the environment, filesystem, network, or time.

These invariants are what make macros composable, cacheable, and safe to run during incremental compilation. They also allow:

- parallel compilation
- reproducible builds
- macro expansion caching
- static analysis
- IDE tooling

Introducing I/O breaks all of these unless you isolate it.

---

## Two macro layers: the only architecture that scales

### 1. **Core hygienic macros** (what you’re building now)
These are the Scheme/Clojure/Racket‑style macros:

- operate on AST
- deterministic
- hygienic
- pure
- run before lowering
- run before typechecking
- run in a sandboxed macro‑time interpreter

These must remain pure forever. They are the foundation of the language.

### 2. **Effectful macros** (optional, opt‑in, later stage)
These are more like:

- Rust procedural macros
- Template Haskell splices
- Elixir `Code.eval_quoted`
- Babel plugins
- Sweet.js “macro expanders” with host access

They can:

- read files
- query the filesystem
- call external tools
- generate code based on environment
- embed generated code
- perform non‑deterministic operations

But they must be:

- **opt‑in**
- **sandboxed or capability‑based**
- **ordered after deterministic macros**
- **isolated from hygiene unless explicitly integrated**
- **run in a separate compilation phase**

This separation is essential.

---

## How to integrate effectful macros without breaking the language

### Phase ordering
A safe pipeline looks like:

```
source
  → reader macros
  → Stage4 parser
  → deterministic macro expansion
  → effectful macro expansion (optional)
  → lowering
  → TS emission
  → tsc
```

Effectful macros run **after** hygienic macros so they cannot interfere with hygiene or purity.

### Capability model
Effectful macros must not have arbitrary access to the host environment. Instead, they receive a **capability object**:

```
(effect-macro foo (ctx)
  (let ((data (ctx.read-file "./schema.json")))
    `(generate-types ,data)))
```

Capabilities might include:

- `read-file`
- `glob`
- `run-command`
- `fetch`
- `random`
- `time`

You decide which are allowed.

### Syntax separation
You must distinguish:

```
(defmacro foo ...)          ; pure, hygienic
(defmacro-io foo ...)       ; effectful, non-deterministic
```

or:

```
(defmacro foo :pure ...)
(defmacro foo :io ...)
```

or:

```
(defmacro foo ...)
(effect-macro foo ...)
```

This prevents accidental impurity.

### Hygiene interaction
Effectful macros can still use gensym, but:

- they must not break hygiene metadata
- they must not introduce identifiers that bypass lexical scoping
- they must not mutate the macro environment

### Caching and reproducibility
Effectful macros must be marked as:

- **non‑cacheable** (always re-run), or
- **cacheable with fingerprinting** (hash of inputs)

This is the same model used by:

- Rust procedural macros
- Bazel/Starlark rules
- Nix derivations

---

## What effectful macros are good for
Once you have them, you unlock:

- code generation from JSON/YAML/GraphQL/OpenAPI
- embedding file contents
- compile‑time asset pipelines
- compile‑time database schema introspection
- compile‑time code formatting
- compile‑time template expansion
- compile‑time dependency injection
- compile‑time reflection on the filesystem

These are powerful, but they must not contaminate the deterministic macro layer.

---

## What you must avoid
Without separation, effectful macros would:

- break incremental compilation
- break reproducibility
- break hygiene
- break caching
- break IDE tooling
- break static analysis
- break macro expansion determinism
- break the ability to reason about code

This is why languages that support both (Rust, Racket, Elixir) always separate them.

---

## A concrete plan for t2lang

### Stage A — finish deterministic macros (your current plan)
- macro registry
- macro‑time interpreter
- quasiquote/unquote
- gensym
- hygiene metadata
- recursive macro expansion

### Stage B — add a capability system
Define a `MacroContext` object with controlled capabilities.

### Stage C — add effectful macro syntax
Example:

```
(defmacro-io read-json (ctx path)
  (let ((txt (ctx.read-file path)))
    (json->ast txt)))
```

### Stage D — add effectful macro expansion phase
Run after deterministic macros.

### Stage E — add caching/fingerprinting
Optional but recommended.

### Stage F — add user‑defined reader macros
These can also be effectful, but must run before Stage 4 parsing.

---

## Closing thought
You can absolutely add non‑deterministic, I/O‑capable macros later, but only if you **architect them as a separate macro tier** with explicit capabilities and a distinct expansion phase. This preserves the correctness, hygiene, and predictability of the core macro system while unlocking the power of compile‑time code generation.

# Language runtime

Option A — Zero runtime (current approach)

T2 already does this: every form compiles to a native JS/TS primitive. No helpers needed. The "runtime" is just the JavaScript engine. This is the TypeScript philosophy too. Strongest guarantee: generated code has no hidden dependencies.

The main risk is that some future T2 features are hard to express this way — tail call optimization, pattern matching exhaustiveness, persistent data structures.

Option B — Injected sibling file

The compiler emits a __t2rt.ts alongside user output. Generated files import from it with a relative path. Self-contained, no npm package required. Works well for a single-project output.

Problem: in a monorepo or when files are emitted to different directories, the relative path becomes fragile. You'd need to know the output root at compile time.

Option C — npm package (@t2lang/runtime)

Generated files emit import { X } from '@t2lang/runtime'. Standard approach (Babel, SWC, etc. use this). Tree-shakeable if structured right. Versioned independently from the compiler.

The cost is that users must npm install @t2lang/runtime, which adds friction. Also ties compiler version to runtime version — needs careful semver discipline.

Option D — Compiler-injected preamble per file

Only helpers actually used in a given file get emitted at the top of that file. No external dependency, no duplication when a file uses nothing. The compiler does the dead-code analysis itself at compile time.

This is what Go does for some things. Works fine at small scale but duplicates code across files in large projects. Acceptable if the helpers are tiny (a trampoline function, a tag-checker, etc.).

Option E — TypeScript ambient declarations only

For type-level runtime concerns (Result<T>, Option<T>, etc.), just emit .d.ts declaration files. No value-level code. Users bring their own implementations or T2 maps to existing libraries (neverthrow, fp-ts, etc.).

The interesting angle for T2 specifically

Since T2 is self-hosting, the runtime question exists at two levels:

The compiler's runtime — ANTLR, tsx, Node.js. Already decided: it's a dev-time tool, npm-installed.
User programs' runtime — this is the open question.
Given that T2 currently has zero runtime requirements and targets TypeScript output (which targets browsers/Node), Option A is probably worth preserving as long as possible. The moment you add a feature that requires a runtime helper (TCO via trampoline being the classic example), Option D (per-file preamble, emitted only when needed) is probably the lowest-friction path — no new packages, no relative-path fragility, and the compiler already knows exactly which forms are in each file.

Option C makes more sense once T2 has enough runtime surface area that per-file preamble duplication becomes noticeable — probably only after persistent data structures or a macro expansion model that leaves runtime traces.