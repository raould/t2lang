Yes — `(mixin A M1 M2)` is exactly the right shape, and it composes cleanly with everything we’ve already established.

But let’s make the semantics precise so the macro stays algebraic, predictable, and TypeScript‑friendly.

---

# ✔️ `(mixin A M1 M2)` is the natural, minimal syntax

### Meaning:
- **A** is the target class.
- **M1** and **M2** are mixin classes whose prototype methods should be copied into `A.prototype`.
- Order matters only if you want later mixins to override earlier ones.

### Default expansion (no `:only`, no `:except`)

```ts
Object.assign(A.prototype, M1.prototype)
Object.assign(A.prototype, M2.prototype)

interface A extends M1, M2 {}
```

This is the simplest, most JS‑native interpretation.

---

# ✔️ `(mixin A M1 M2 :only (...))` also works cleanly

If you want to support `:only`, you can apply the filter to *each* mixin:

### t2lang

```
(mixin A M1 M2 :only (foo bar))
```

### emitted TS

```ts
for (const key of ["foo", "bar"]) {
  if (key in M1.prototype) A.prototype[key] = M1.prototype[key]
  if (key in M2.prototype) A.prototype[key] = M2.prototype[key]
}

interface A extends Pick<M1, "foo" | "bar">, Pick<M2, "foo" | "bar"> {}
```

This is still algebraic and predictable.

---

# ✔️ `(mixin A M1 M2 :except (...))` is equally clean

```
(mixin A M1 M2 :except (debug internalHelper))
```

### emitted TS

```ts
for (const key of Object.keys(M1.prototype)) {
  if (!["debug", "internalHelper"].includes(key)) {
    A.prototype[key] = M1.prototype[key]
  }
}

for (const key of Object.keys(M2.prototype)) {
  if (!["debug", "internalHelper"].includes(key)) {
    A.prototype[key] = M2.prototype[key]
  }
}

interface A extends Omit<M1, "debug" | "internalHelper">,
                    Omit<M2, "debug" | "internalHelper"> {}
```

---

# ✔️ Why this syntax is ideal for t2lang

### 1. **Algebraic**
`(mixin A M1 M2)` is just a variadic operator over prototypes.

### 2. **Composable**
You can layer mixins, add filters, or combine with other macros.

### 3. **Zero runtime magic**
No Proxy, no traps, no dynamic dispatch.

### 4. **TypeScript‑friendly**
You can always emit `interface A extends …` with `Pick<>`/`Omit<>`.

### 5. **Predictable override semantics**
Later mixins override earlier ones, just like `Object.assign`.

---

# 🧭 Final answer

Yes — the cleanest, most idiomatic syntax for multiple mixins in t2lang is:

```
(mixin A M1 M2)
```

And it extends naturally to:

```
(mixin A M1 M2 :only (foo bar))
(mixin A M1 M2 :except (debug))
```

---

# Implementation Plan

## Overview

`(mixin ...)` is a new top-level form that compiles to `Object.assign` prototype copies and an `interface` merge declaration. It is a grammar-level construct (not a user-space macro) that threads through all five pipeline passes: grammar → AST → expand → resolve → lower → codegen.

## AST node shape

```ts
{
  tag:    'mixin-form',
  id:     NodeId,
  text:   string,
  target: string,           // class name to mix into
  mixins: string[],         // one or more source class names
  filter: null              // plain (mixin A M1 M2)
        | { kind: 'only',   names: string[] }
        | { kind: 'except', names: string[] }
}
```

After lowering the tag becomes `'mixin-stmt'` (identical fields — lowering is a pass-through here since there are no sub-expressions to lower).

---

## Step 1 — Grammar (`Stage9.g4`)

**1a. New tokens**

```antlr
MIXIN   : 'mixin' ;
DECLARE : 'declare' ;
```

Add both near the class-system keywords block (after `IMPLEMENTS`).

**1b. Add `DECLARE` to the `modifier` rule**

```antlr
modifier
    : PUBLIC | PRIVATE | PROTECTED | STATIC | ABSTRACT | OVERRIDE | ASYNC | GENERATOR | READONLY | DECLARE
    ;
```

**1c. Add `MIXIN` and `DECLARE` to `propKey`**

Add `| MIXIN | DECLARE` to the `propKey` rule (required for any new keyword — see the comment at line 836).

**1d. New grammar rules**

```antlr
mixinForm
    : LPAREN MIXIN IDENTIFIER IDENTIFIER+ mixinFilter? RPAREN
    ;

mixinFilter
    : COLON IDENTIFIER LPAREN IDENTIFIER* RPAREN   // :only  — IDENTIFIER must be "only"
    | COLON EXCEPT    LPAREN IDENTIFIER* RPAREN    // :except — reuses existing EXCEPT token
    ;
```

**1e. Wire into `topLevel`**

Add `| mixinForm` as a new alternative in the `topLevel` rule.

**Rebuild grammar after this step:**

```sh
npm run build-grammar   # in stage9/
```

---

## Step 2 — AST (`Stage9-ast.s8`)

**2a. Add `astMixinForm`**

```scheme
(const astMixinForm
  (lambda ((ctx))
    (let ((target   ((. ((. ctx IDENTIFIER) (0)) getText)))
           (mixinIds ((. ((. ctx IDENTIFIER)) slice) 1))
           (mixins   ((. mixinIds map) (lambda ((id)) (return ((. id getText))))))
           (fctx     ((. ctx mixinFilter)))
           (filter   (if fctx
                       (let ((names ((. ((. fctx IDENTIFIER)) map) (lambda ((id)) (return ((. id getText)))))))
                         (if ((. fctx EXCEPT))
                           (return (object (kind 'except') (names names)))
                           ;; IDENTIFIER alternative — validate it is "only"
                           (begin
                             (if (!== ((. ((. ((. fctx IDENTIFIER) (0))) getText)) 'only')
                               (throw (new Error (+ "mixin: expected :only or :except, got :" ((. ((. ((. fctx IDENTIFIER) (0))) getText)))))))
                             (let ((filterNames ((. ((. ((. fctx IDENTIFIER)) slice) 1) map) (lambda ((id)) (return ((. id getText)))))))
                               (return (object (kind 'only') (names filterNames)))))))
                       null)))
      (return (object (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
                      (tag 'mixin-form')
                      (target target)
                      (mixins mixins)
                      (filter filter))))))
```

**2b. Wire into `astTopLevel`**

Add before the `exportDeclForm` check:

```scheme
(if ((. ctx mixinForm))
  (return (astMixinForm ((. ctx mixinForm)))))
```

---

## Step 3 — Macro-expand (`Stage9-macro-expand.s8`)

`mixin-form` carries no expressions that need expansion. Add a pass-through in `expandTopLevel` before the fall-through to `expandStmt`:

```scheme
(if (=== (. node tag) 'mixin-form')
  (return node))
```

---

## Step 4 — Scope-resolve (`Stage9-scope-resolve.s8`)

Same: no variable references to resolve. Add a pass-through in `resolveTopLevel` before the fall-through to `resolveStmt`:

```scheme
(if (=== (. node tag) 'mixin-form')
  (return node))
```

---

## Step 5 — Lower (`Stage9-lower.s8`)

**5a. Lower `mixin-form` → `mixin-stmt`**

`mixin-form` has no sub-expressions to lower, so lowering renames the tag and preserves all fields. Add in `lowerTopLevel` before the fall-through to `lowerStmt`:

```scheme
(if (=== (. node tag) 'mixin-form')
  (return (object (node node) (id (. node id)) (tag 'mixin-stmt')
                  (target (. node target))
                  (mixins (. node mixins))
                  (filter (. node filter)))))
```

**5b. Validate mixin class field discipline in `lowerClassDef`**

A class that extends `MixinBase` (by literal name) may not own fields — it can only declare requirements via `declare`. A non-`declare` field on a MixinBase subclass is a compiler error: the mixin would own state that the `MixinBase` constructor never initializes (since `MixinBase` throws, and `(mixin)` never calls mixin constructors).

The check is purely syntactic — no type resolution needed. Add at the top of `lowerClassDef`, before any other lowering:

```scheme
(if (&& (. node extendsType)
        (=== (. (. node extendsType) name) 'MixinBase'))
  ((. (. node body) forEach)
    (lambda ((member))
      (if (&& (=== (. member tag) 'field')
              (! ((. (. member modifiers) includes) 'declare')))
        (pushError (. node id)
          (+ "mixin class field '" (. member name)
             "' must use 'declare' — mixin classes cannot own fields, only declare requirements"))))))
```

This enforces the convention mechanically: if you write `(extends MixinBase)`, every `field` must carry `declare`. This in turn makes the `declare` modifier load-bearing rather than advisory — the compiler rejects the alternative.

---

## Step 6 — Codegen (`Stage9-codegen.s8`)

### MixinBase contract

The emitted checks enforce that each mixin extends a `MixinBase` class that must be available in the compiled output. `MixinBase` itself is a single hand-authored TypeScript file (or imported from a runtime support module); the compiler never generates it. Its role:

```ts
export abstract class MixinBase {
  protected constructor() {
    throw new Error(
      `${new.target.name}: mixin class — cannot be instantiated directly`
    )
  }
}
```

`abstract` prevents `new MixinBase()` statically. `protected constructor` prevents direct `new M1()` from external code (TypeScript enforces this on M1 if M1 extends MixinBase and doesn't re-declare its constructor as public). The runtime `throw` catches any JS-only callers that bypass the type system.

### Static check emitted per `(mixin)` call site

```ts
type _MixinGuard<T extends MixinBase> = true
declare const _mixinCheck_A: [_MixinGuard<M1>, _MixinGuard<M2>]
```

`type _MixinGuard<T extends MixinBase>` is a conditional alias that TypeScript resolves to `true` only when T satisfies `MixinBase`. Because `_MixinGuard` has a constraint (`T extends MixinBase`), passing a non-conforming type is a compile error at the `declare const` site — exactly at the `(mixin)` call. The `declare const` is erased at emit: zero runtime bytes.

The name `_mixinCheck_A` is derived from the target class name, making errors legible: TypeScript will report the line of the `declare const` and name the offending mixin.

### Dynamic check emitted per mixin argument

```ts
if (!(M1.prototype instanceof MixinBase))
  throw new Error('mixin: M1 is not a MixinBase subclass')
```

`M1.prototype instanceof MixinBase` is true iff `MixinBase.prototype` is in M1's prototype chain — i.e. M1 genuinely extends MixinBase at runtime. This fires at module load time (top-level code), catches JS callers that bypass TypeScript, and is cheap (one prototype-chain walk per mixin argument per module load).

### Full emitted output for `(mixin A M1 M2)`

```ts
// static check (erased by tsc)
type _MixinGuard<T extends MixinBase> = true
declare const _mixinCheck_A: [_MixinGuard<M1>, _MixinGuard<M2>]

// dynamic checks (module load time)
if (!(M1.prototype instanceof MixinBase))
  throw new Error('mixin: M1 is not a MixinBase subclass')
if (!(M2.prototype instanceof MixinBase))
  throw new Error('mixin: M2 is not a MixinBase subclass')

// prototype copies
Object.assign(A.prototype, M1.prototype)
Object.assign(A.prototype, M2.prototype)

// TypeScript interface merge
interface A extends M1, M2 {}
```

**6a. Add `emitMixinStmt`**

```scheme
(const emitMixinStmt
  (lambda ((node))
    (let ((target (. node target))
           (mixins (. node mixins))
           (filter (. node filter))
           (lines  (array)))
      ;; --- static MixinBase checks (erased by tsc) ---
      (let ((guardArgs ((. ((. mixins map) (lambda ((m)) (return (+ '_MixinGuard<' m '>')))) join) ', ')))
        ((. lines push) 'type _MixinGuard<T extends MixinBase> = true')
        ((. lines push) (+ 'declare const _mixinCheck_' target ': [' guardArgs ']')))
      ;; --- dynamic MixinBase checks (module load time) ---
      ((. mixins forEach)
        (lambda ((m))
          ((. lines push)
            (+ 'if (!(' m '.prototype instanceof MixinBase))\n'
               '  throw new Error(\'mixin: ' m ' is not a MixinBase subclass\')'))))
      ;; --- runtime prototype copies ---
      (if (! filter)
        ;; plain: Object.assign per mixin
        ((. mixins forEach)
          (lambda ((m))
            ((. lines push) (+ 'Object.assign(' target '.prototype, ' m '.prototype);'))))
        (if (=== (. filter kind) 'only')
          ;; :only — keyed loop per mixin
          (let ((keyList (+ '[' ((. ((. ((. filter names) map) (lambda ((n)) (return (+ '"' n '"'))))) join) ', ') ']')))
            ((. mixins forEach)
              (lambda ((m))
                ((. lines push)
                  (+ 'for (const key of ' keyList ') {\n'
                     '  if (key in ' m '.prototype) ' target '.prototype[key] = ' m '.prototype[key];\n'
                     '}')))))
          ;; :except — exclusion loop per mixin
          (let ((excludeList (+ '[' ((. ((. ((. filter names) map) (lambda ((n)) (return (+ '"' n '"'))))) join) ', ') ']')))
            ((. mixins forEach)
              (lambda ((m))
                ((. lines push)
                  (+ 'for (const key of Object.keys(' m '.prototype)) {\n'
                     '  if (!' excludeList '.includes(key)) ' target '.prototype[key] = ' m '.prototype[key];\n'
                     '}')))))))
      ;; --- TypeScript interface merge declaration ---
      (let ((extendsClause
              (if (! filter)
                ;; plain: interface A extends M1, M2
                ((. mixins join) ', ')
                (if (=== (. filter kind) 'only')
                  ;; Pick<M, "foo" | "bar">
                  (let ((union (+ '"' ((. (. filter names) join) '" | "') '"')))
                    ((. ((. mixins map) (lambda ((m)) (return (+ 'Pick<' m ', ' union '>')))) join) ', '))
                  ;; Omit<M, "foo" | "bar">
                  (let ((union (+ '"' ((. (. filter names) join) '" | "') '"')))
                    ((. ((. mixins map) (lambda ((m)) (return (+ 'Omit<' m ', ' union '>')))) join) ', '))))))
        ((. lines push) (+ 'interface ' target ' extends ' extendsClause ' {}')))
      (return ((. lines join) '\n')))))
```

**6b. Wire into `emitStmt`**

Add before the fall-through to the generic statement handler:

```scheme
(if (=== (. stmt tag) 'mixin-stmt')
  (return (emitMixinStmt stmt)))
```

---

## Step 7 — Tests (`stage9/tests/mixin.test.ts`)

Six test cases:

| Input | Expected output / error |
|---|---|
| `(mixin A M1 M2)` | `declare const _mixinCheck_A: [_MixinGuard<M1>, _MixinGuard<M2>]`<br>`M1.prototype instanceof MixinBase` check<br>`Object.assign(A.prototype, M1.prototype);`<br>`interface A extends M1, M2 {}` |
| `(mixin A M1 M2 :only (foo bar))` | `_MixinGuard` checks for M1, M2<br>`instanceof MixinBase` checks for M1, M2<br>`for (const key of ["foo", "bar"])` loop for each mixin<br>`interface A extends Pick<M1, "foo" \| "bar">, Pick<M2, "foo" \| "bar"> {}` |
| `(mixin A M1 M2 :except (debug))` | `_MixinGuard` checks<br>`instanceof MixinBase` checks<br>`Object.keys(M1.prototype)` exclusion loop<br>`interface A extends Omit<M1, "debug">, Omit<M2, "debug"> {}` |
| non-MixinBase class passed as mixin | static: `_MixinGuard<Plain>` fails tsc; dynamic: `instanceof` throws at load time |
| single mixin `(mixin A M1)` | `declare const _mixinCheck_A: [_MixinGuard<M1>]`<br>one `instanceof` check, one `Object.assign` |
| MixinBase subclass with non-`declare` field | compiler error: `"mixin class field 'x' must use 'declare'"` |

---

```scheme
(class M1 (extends MixinBase)
  (class-body
    (field declare (msg: string))
    (method sayIt ()
      (console.log (+ this.msg "!")))))

(class M2 (extends MixinBase)
  (class-body
    (field declare (value: number))
    (method doubleIt ()
      (return (* this.value 2)))))

(class A
  (class-body
    (field (msg : string))
    (field (value : number))
    (constructor ((msg : string) (value : number))
      (set! this.msg msg)
      (set! this.value value))
    (method run ()
      (this.sayIt)
      (this.doubleIt))))

(mixin A M1 M2)
```

`(mixin A M1 M2)` must appear after `(class A ...)` since it modifies `A.prototype` at module load time. M1 and M2 reference `this.msg` and `this.value` respectively; these fields live on A, not on the mixin classes. TypeScript enforces the contract via the emitted `interface A extends M1, M2 {}` — if A's class body were missing `field msg` or `field value`, tsc would error at the interface merge.

---

## Step 8 — Build and verify

```sh
cd stage9
npm run build-grammar    # regenerate lexer/parser from .g4
npm run build-compiler   # recompile .s8 → .ts
npx vitest --typecheck run # Do not run "vitest --typecheck" from any other directory.
```

All 124+ existing tests must continue to pass.

---

## File change summary

| File | Change |
|---|---|
| `Stage9.g4` | Add `MIXIN` + `DECLARE` tokens; add `DECLARE` to `modifier` rule; add `mixinForm` + `mixinFilter` rules; wire `mixinForm` into `topLevel`; add `MIXIN`, `DECLARE` to `propKey` |
| `Stage9-ast.s8` | Add `astMixinForm`; wire into `astTopLevel` |
| `Stage9-macro-expand.s8` | Pass-through for `mixin-form` in `expandTopLevel` |
| `Stage9-scope-resolve.s8` | Pass-through for `mixin-form` in `resolveTopLevel` |
| `Stage9-lower.s8` | Lower `mixin-form` → `mixin-stmt` in `lowerTopLevel`; validate field discipline in `lowerClassDef` |
| `Stage9-codegen.s8` | Add `emitMixinStmt`; wire into `emitStmt` |
| `stage9/tests/mixin.test.ts` | New test file (3 tests) |
