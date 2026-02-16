### Stage 3 overview

Stage 3 is where the language stops being “TS with s‑expr sugar” and becomes:

- macros that actually run
- quasiquote/unquote
- enough literals and data structures to *build ASTs in the language*
- enough runtime to eliminate almost all `raw` TS

Think of Stage 3 as:

> **“Implement macros and data, not new control flow.”**  
> Control flow is already solid in Stage 2.

---

## 1. New language features in Stage 3

These are the concrete additions you need.

### 1.1 Data & literals

You need enough structure to represent ASTs *as values*:

- **Object literals**  
  - Syntax:  
    - `(object (key expr) (key2 expr2) ...)`  
    - or `(hash (:key expr) (:key2 expr2))`  
  - Lowers to TS `{ key: expr, key2: expr2 }`.

- **Array literals**  
  - Syntax: `(array expr1 expr2 expr3)`  
  - Lowers to `[expr1, expr2, expr3]`.

- **Keyword / symbol literals (optional but nice)**  
  - Syntax: `:foo`, `:bar`  
  - Represented as strings or tagged values.

These three let you build and inspect AST nodes *inside the language*.

---

### 1.2 Quasiquote system

You need a way to *write AST templates*:

- **Quasiquote**:  
  - Syntax: ``(quasi expr)`` or backtick: `` `(...) ``  
- **Unquote**:  
  - Syntax: `(unquote expr)` or `,expr`
- **Unquote-splicing**:  
  - Syntax: `(unquote-splicing expr)` or `,@expr`

Semantics:

- `quasi` walks the quoted form and:
  - turns literals/identifiers into AST literals
  - turns `(unquote x)` into the value of `x`
  - turns `(unquote-splicing xs)` into spliced lists

This is the core of macro authoring.

---

### 1.3 Macro environment & expansion

You need a real macro engine:

- **Macro environment**
  - A map: `name → { params, body }`
  - Populated from `defmacro` at *compile time*.

- **Macro call detection**
  - When you see `(call expr ...)` in the *surface AST*:
    - If `expr` is an identifier and its name is in the macro env → macro call.
    - Otherwise → normal call.

- **Macro expansion function**
  - `expand(node, env)`:
    - Walks the surface AST.
    - When it finds a macro call:
      - Binds arguments to macro params.
      - Evaluates the macro body in a *macro-time interpreter*.
      - Expects the macro to return an AST node (built via quasiquote).
      - Recursively expands the result.

- **Expansion phase in pipeline**

  Your pipeline becomes:

  1. CST → surface AST (`astProgram`)
  2. **Macro expansion** → expanded surface AST
  3. Lowering → canonical AST
  4. Codegen → TS

---

### 1.4 Minimal macro-time interpreter

You don’t need full eval, just enough to run macro bodies:

- Evaluate:
  - literals
  - identifiers (from macro env / local bindings)
  - `lambda`
  - `call`
  - `if`
  - `let*` / `let`
  - `begin`/`block`
- Provide a small macro-time stdlib:
  - list/array ops
  - object construction
  - equality
  - basic control helpers

Macros return AST nodes (built via quasiquote), not runtime values.

---

## 2. Concrete changes to the existing Stage 2 code

Here’s how Stage 3 plugs into what you already have.

### 2.1 Extend grammar

Add:

- `object` form
- `array` form
- `quasi`, `unquote`, `unquote-splicing` (or backtick/comma syntax)
- optionally: `keyword` tokens (`:foo`)

You don’t need new statements; these are all expressions.

---

### 2.2 Extend AST

Add surface AST nodes:

- `object`  
  `{ tag: "object", fields: [{ key, value }, ...] }`
- `array`  
  `{ tag: "array", elements: [expr, ...] }`
- `quasi`, `unquote`, `unquote-splicing`  
  Represented as tagged nodes so the expander can see them.

Canonical AST can reuse `object-expr`, `array-expr` etc.

---

### 2.3 Implement macro expansion phase

Add a new function:

- `expandProgram(surfaceAst)`:
  - Builds macro env from top-level `defmacro` nodes.
  - Walks the AST, expanding macro calls.
  - Returns a new surface AST with macros fully expanded.

Then change `main`:

- Currently: `surfaceAst → lowerProgram → emitProgram`
- Stage 3: `surfaceAst → expandProgram → lowerProgram → emitProgram`

---

### 2.4 Implement quasiquote

Add a function:

- `expandQuasi(node, env, depth)`:
  - If `depth == 0` and node is `unquote` → evaluate its expr.
  - If `depth == 0` and node is `unquote-splicing` → error unless in list context.
  - If node is another `quasi` → recurse with `depth+1`.
  - Otherwise:
    - Turn literals/identifiers into AST literals.
    - Turn lists into AST list/array/object structures.

Macros will look like:

```lisp
(defmacro when ((cond body))
  (quasi
    (if (unquote cond)
        (begin (unquote-splicing body)))))
```

---

## 3. Raw TS elimination plan in Stage 3

Once you have:

- object literals
- array literals
- quasiquote
- macro expansion
- macro-time interpreter

You can start rewriting:

- `parseString` logic in language
- `indent`, `isDefined`, `isOperator` as normal functions
- `emit*` helpers using string builders in language
- main driver (fs, lexer, parser) via a small FFI layer

The only remaining raw TS after Stage 3 should be:

- import header
- FFI shims (fs, antlr, console)

Everything else—compiler logic, macros, lowering, codegen—lives in the language.

Ah, **gensym** — now we’re getting into the *real* macro‑system machinery.  
And yes, Stage 3 absolutely needs it. But the key is understanding **why**, **where**, and **how** it fits into your architecture.

Let me give you a clean, grounded spec for gensym in Stage 3, tailored to your language and your compiler pipeline.

---

# 🌱 What gensym *is* in Stage 3

A **gensym** is:

- a **unique symbol**  
- guaranteed not to collide with user identifiers  
- used inside macros to avoid variable capture  
- generated at macro‑expansion time  
- represented as a normal identifier in the canonical AST  
- but with a unique internal name

In other words:

> **gensym is the simplest form of macro hygiene.**

You don’t need full Racket‑style hygiene in Stage 3 — gensym alone gets you 90% of the safety.

---

# 🌿 Why Stage 3 *must* have gensym

Without gensym, macros like this break:

```lisp
(defmacro with-temp ((body))
  (quasi
    (let ((tmp 0))
      (unquote body))))
```

If the user writes:

```lisp
(with-temp
  (let ((tmp 99))
    (print tmp)))
```

You get accidental capture:

- macro introduces `tmp`
- user introduces `tmp`
- they collide

This is the classic hygiene problem.

### With gensym:

```lisp
(defmacro with-temp ((body))
  (let* ((g (gensym "tmp")))
    (quasi
      (let ((unquote g) 0)
        (unquote body)))))
```

Now the macro introduces something like:

```
tmp$g123
```

And the user’s `tmp` is untouched.

---

# 🌳 Where gensym lives in your Stage 3 pipeline

Your pipeline becomes:

```
CST
  → surface AST
  → macro expansion (needs gensym)
  → lowered AST
  → canonical AST
  → codegen
```

Gensym is used **only during macro expansion**, not during lowering or codegen.

---

# 🌲 How gensym is represented in your AST

You have two options:

---

## **Option A — Gensym produces a unique identifier string**

Example:

```ts
{ tag: "identifier", name: "tmp$g123" }
```

This is the simplest and most practical approach.

### Pros
- trivial to implement  
- no changes to AST shape  
- codegen just prints the identifier  
- no runtime cost  
- works with TS backend  

### Cons
- not hygienic across modules (but Stage 3 doesn’t have modules yet)  
- not reversible (but you don’t need reversibility)

This is the recommended approach for Stage 3.

---

## **Option B — Gensym produces a tagged identifier**

Example:

```ts
{ tag: "identifier", name: "tmp", gensymId: 123 }
```

And codegen prints:

```
tmp$g123
```

### Pros
- preserves original name for debugging  
- easier to extend to full hygiene later  

### Cons
- more complex  
- requires codegen changes  
- requires AST changes  

This is a Stage 4/Stage 5 refinement, not needed now.

---

# 🌱 How gensym is implemented in Stage 3

- Internally, inside the macro expander, use a JS Symbol as a key in the macro environment or for tagging AST nodes.
- But the output of gensym must be a string identifier, not a Symbol.
- This hybrid approach is common:
    - internal: Symbol() for metadata
    - external: "tmp$g42" for emitted identifiers

**The emitted code must never contain a JS Symbol.**

### 1. Tagging AST nodes with metadata

- You may want to attach metadata to AST nodes that:
    - should not appear in emitted code
    - should not collide with user fields
    - should survive macro expansion
    - should be invisible to lowering and codegen

Example:
```ts
const HYGIENE_MARK = Symbol("hygiene");
node[HYGIENE_MARK] = { scopeId: 123 };
```

This metadata is not part of the AST shape — it’s compiler‑internal.

### 2. Representing unique macro‑time bindings
Inside the macro expander, you maintain an environment:
```ts
env = {
  x: <value>,
  y: <value>,
  ...
}
```

But macro‑time evaluation sometimes needs to create internal bindings that should never collide with user identifiers.

Example:
```ts
const INTERNAL_BINDING = Symbol("internal-binding");
env[INTERNAL_BINDING] = someValue;
```

3. Marking AST nodes as “already expanded”
- Macro expansion is recursive.
- You need to avoid re‑expanding nodes that have already been expanded.
- You can do:
```ts
const EXPANDED = Symbol("expanded");
node[EXPANDED] = true;
```

This is a classic trick in macro expanders. This is exactly how ClojureScript, Babel, and many Lisp‑in‑JS systems do it.

### Summary: Where Symbol belongs in Stage 3
✔ YES — use Symbol internally for:
    - hygiene metadata
    - provenance tracking
    - macro‑time environment keys
    - marking nodes as expanded
    - internal compiler state

❌ NO — do not use Symbol for:
    - emitted identifiers
    - gensym output
    - anything that appears in TypeScript code

Gensym output must be a string identifier, like:
```Code
tmp$g42
```

But internally, you can attach:
```ts
node[GENSYM_MARK] = Symbol("gensym");
```
to track hygiene.

### 1. Add a global counter in the macro expander

```ts
let gensymCounter = 0;
```

### 2. Add a function in the macro-time environment

```ts
function gensym(prefix = "g") {
  gensymCounter++;
  return { tag: "identifier", name: `${prefix}$${gensymCounter}` };
}
```

### 3. Expose it to macro bodies

When evaluating macro bodies, bind:

```
gensym → the gensym function
```

So macros can call:

```lisp
(gensym "tmp")
```

or simply:

```lisp
(gensym)
```

### 4. Use gensym inside quasiquote expansion

When expanding:

```lisp
(quasi
  (let ((unquote g) 0)
    ...))
```

The `unquote` expression returns the gensym’d identifier.

---

# 🌿 Example: A real Stage 3 macro using gensym

```lisp
(defmacro with-temp ((body))
  (let* ((t (gensym "tmp")))
    (quasi
      (let ((unquote t) 0)
        (unquote body)))))
```

User code:

```lisp
(with-temp
  (let ((tmp 99))
    (print tmp)))
```

Macro expansion produces:

```lisp
(let ((tmp$g1 0))
  (let ((tmp 99))
    (print tmp)))
```

No capture.  
No confusion.  
No hygiene bugs.

---

# 🌳 How gensym interacts with lowering and codegen

### Lowering  
Lowering doesn’t care — gensym’d identifiers are just identifiers.

### Codegen  
Codegen prints the identifier name exactly as given.

### Runtime  
No runtime behavior changes — gensym is compile‑time only.
