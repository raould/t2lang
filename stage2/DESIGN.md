Stage 2 is the moment your language stops being a “TS‑emitting s‑expr DSL” and becomes a *real language with its own semantics, its own AST, and its own lowering pipeline*.

---

# 🌱 **What Stage 2 *is***  
Stage 2 is the first stage where your language:

- has **real control flow constructs** (`if`, `while`, `return`, `block`)
- has a **canonical AST** (Phase A)
- has **sugar lowering** (Phase B)
- has a **macro system**
- has **no raw TypeScript** in the compiler
- is **self‑hosting in a meaningful sense**

---

# 🌳 **The 3 big changes in Stage 2**

## **1. Introduce a canonical AST (Phase A)**  

Stage 2 introduces a **canonical AST** with:

### **Expressions**
- `literal`
- `identifier`
- `lambda`
- `call`
- `block-expr`
- `let-expr`
- `return-expr`
- `assign-expr`
- `operator-expr` (canonical, not sugar)

### **Statements**
- `expr-stmt`
- `let-stmt`
- `return-stmt`
- `if-stmt`
- `while-stmt`
- `block-stmt`

This is the AST you will use for the rest of the language’s life.

---

## Architectural split

Language Core (Stage 2 of T2Lang)
  - canonical AST
  - sugar lowering
  - macros
  - control flow
  - scoping
  - codegen logic
  - everything expressible in your language

Backend Layer (Stage 2 remenants in TS)
  - import header
  - object literal construction
  - throw
  - return (if not yet implemented)
  - module wrapper

## **2. Introduce sugar lowering (Phase B)**  
This is where your language becomes ergonomic.

Examples:

### **Sugar → Canonical AST**
```
(+ a b c)     →   (call + a (call + b c))
```

```
(let* ((x 1) (y 2)) body)
→
(let-expr x 1 (let-expr y 2 body))
```

```
(if test then else)
→
(if-expr test then else)
```

```
(while test body)
→
(loop (if test (begin body (recur)) (break)))
```

Stage 2 is where you define the *real semantics* of the language.

---

## **3. Introduce macros**  
This is the moment your language becomes *alive*.

Macros operate on the canonical AST, not the CST.

Examples:

### **Define a macro**
```lisp
(defmacro when (cond body)
  `(if ,cond (begin ,@body) undefined))
```

### **Define a macro that rewrites operators**
```lisp
(defmacro + (a b)
  `(operator-expr "+" ,a ,b))
```

### **Define a macro that introduces new syntax**
```lisp
(defmacro for (init test step body)
  `(begin
     ,init
     (while ,test
       (begin
         ,@body
         ,step))))
```

Macros are the main new feature gain of Stage 2.

---

# 🌲 **What happens to the compiler in Stage 2**

You rewrite the compiler *again*, but this time:

- no raw TS  
- no TS control flow  
- no TS string concatenation  
- no TS loops  
- no TS conditionals  

Everything is expressed in your language.

### Example: Stage 2 codegen (real language)
```lisp
(if-expr
  (call emitExpr node.test)
  (block-expr
    (call emitStmt node.ifthen))
  (block-expr
    (call emitStmt node.ifelse)))
```

This is the moment the compiler becomes *self‑describing*.

---

# 🌳 **The Stage 2 pipeline**

Here’s the full pipeline:

```
CST
  ↓ parse
AST (surface)
  ↓ Phase B (sugar lowering)
AST (canonical)
  ↓ Phase A (semantic checks)
AST (lowered)
  ↓ backend
TypeScript (or JS, or WASM, or LLVM)
```

Stage 2 introduces the real compiler architecture.

---

# 🌱 **What Stage 2 buys you**

### ✔ The compiler no longer depends on TypeScript semantics  
### ✔ You can add new language features without touching TS   

Stage 2 is the foundation for everything.

---

# 🎯 **Final clarity**

Stage 2 is about *giving the language the power to express the compiler*.  

Once Stage 2 is complete, your language is no longer a TS‑emitting DSL.  
