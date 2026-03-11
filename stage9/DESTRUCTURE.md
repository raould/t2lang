# Destructuring Implementation Plan — Stage9

This document describes the full plan for adding destructuring support to t2lang stage9 across all four binding-pattern use cases.

---

## Proposed Syntax

### Object destructuring

```lisp
;; Plain names (shorthand)
(const {x y z} obj)                     ;; const { x, y, z } = obj;

;; With rename alias: (origName aliasName) inside braces
(const {(count c) label} obj)           ;; const { count: c, label } = obj;

;; With default value: (name = defaultExpr) inside braces
(const {(x = 0) (y = 0)} point)         ;; const { x = 0, y = 0 } = point;

;; Rest: ...name at end
(const {x ...rest} obj)                  ;; const { x, ...rest } = obj;

;; Nested
(const {(inner {a b})} outer)            ;; const { inner: { a, b } } = outer;

;; Type annotation on whole pattern
(const {x y} : Point obj)               ;; const { x, y }: Point = obj;
```

### Array destructuring

```lisp
;; Plain names
(const [a b c] arr)                      ;; const [a, b, c] = arr;

;; With hole (skip element)
(const [_ b] arr)                        ;; const [, b] = arr;  (underscore = skip)

;; Rest: ...name at end
(const [head ...tail] arr)               ;; const [head, ...tail] = arr;

;; With default
(const [(a = 0) (b = 1)] arr)            ;; const [a = 0, b = 1] = arr;

;; Nested
(const [[x y] z] arr)                    ;; const [[x, y], z] = arr;

;; Type annotation on whole pattern
(const [a b] : [number string] arr)      ;; const [a, b]: [number, string] = arr;
```

---

## Phase Plan

- **Phase 1** (core): Plain names only — `{x y}` and `[a b]`, with `...rest`. No defaults, no aliases, no nesting, no type annotation.
- **Phase 2**: Aliases `(count c)` and defaults `(x = 0)`, type annotation on whole pattern.
- **Phase 3**: Nested patterns `{(inner {a b})}` / `[[x y] z]`.

The rest of this document covers Phase 1–3 together but notes which phase each feature belongs to.

---

## 1. Grammar (`Stage9.g4`)

### New rules

Add after the existing `singleBinding` / `starBinding` rules (currently lines 357–363):

```antlr
// ──── destructuring patterns ──────────────────────────

destructPattern
    : objectDestructPat
    | arrayDestructPat
    ;

// { x  (count c)  (x = 0)  ...rest }
objectDestructPat
    : LBRACE objDestructField* (ELLIPSIS IDENTIFIER)? RBRACE
    ;

objDestructField
    : IDENTIFIER                                               // x  (shorthand)
    | LPAREN IDENTIFIER IDENTIFIER RPAREN                      // (orig alias)  Phase 2
    | LPAREN IDENTIFIER ASSIGN_EQ expression RPAREN            // (x = default) Phase 2
    | LPAREN IDENTIFIER destructPattern RPAREN                 // (key {sub pat}) Phase 3
    ;

// [ a  (b = 0)  ...rest ]
arrayDestructPat
    : LBRACK arrayDestructElem* (ELLIPSIS IDENTIFIER)? RBRACK
    ;

arrayDestructElem
    : IDENTIFIER                                               // a
    | LPAREN IDENTIFIER ASSIGN_EQ expression RPAREN            // (a = default) Phase 2
    | destructPattern                                          // nested  Phase 3
    | HOLE                                                     // _ → skip (use existing HOLE token if available, else add)
    ;
```

Add token (if not already present):

```antlr
ASSIGN_EQ   : '=' ;    // for default values — distinct from compound-assign tokens
```

> **Note**: `ELLIPSIS` (`...`) is already used in spread expressions; reuse it here. `LBRACE`/`RBRACE`/`LBRACK`/`RBRACK` are already tokens.

### Modify existing binding rules

**`singleBinding`** (line 361) — add destructuring alternatives:

```antlr
singleBinding
    : LPAREN IDENTIFIER (COLON typeExpr)? RPAREN    // existing: (name) or (name : T)
    | destructPattern (COLON typeExpr)?              // new: {x y} or [a b], optional type ann
    ;
```

**`starBinding`** (line 357) — add destructuring:

```antlr
starBinding
    : LPAREN IDENTIFIER (COLON typeExpr)? expression RPAREN    // existing
    | LPAREN destructPattern (COLON typeExpr)? expression RPAREN  // new: ({x y} obj) inside let
    ;
```

**`forInForm` / `forOfForm` / `forAwaitForm`** (lines 528–538) — add pattern alternative:

```antlr
forOfForm
    : LPAREN FOROF IDENTIFIER expression statement* RPAREN           // existing
    | LPAREN FOROF destructPattern expression statement* RPAREN      // new
    ;
// (same change for forInForm and forAwaitForm)
```

---

## 2. AST Builder (`Stage9-ast.s8`)

### New helper: `astDestructPattern`

Add before `astForIn` (line 631):

```lisp
(const astDestructPattern
  (lambda ((ctx))
    ;; Dispatches to object or array destructuring pattern builder
    (if ((. ctx objectDestructPat))
      (return (astObjectDestructPat ((. ctx objectDestructPat)))))
    (if ((. ctx arrayDestructPat))
      (return (astArrayDestructPat ((. ctx arrayDestructPat)))))))

(const astObjectDestructPat
  (lambda ((ctx))
    (let ((fields ((. ((. ctx objDestructField)) map) astObjDestructField)))
           (rest (ternary ((. ctx ELLIPSIS))
                   ((. ((. ((. ctx IDENTIFIER)) getText)))  ;; last IDENTIFIER after ...
                   undefined)))
      (return (object
        (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
        (tag 'destruct-object') (fields fields) (rest rest))))))

(const astObjDestructField
  (lambda ((ctx))
    ;; Phase 1: plain IDENTIFIER shorthand only
    (let ((idents ((. ctx IDENTIFIER))))
           (name ((. ((. idents 0)) getText))))
      (return (object (name name))))))

(const astArrayDestructPat
  (lambda ((ctx))
    (let ((elems ((. ((. ctx arrayDestructElem)) map) astArrayDestructElem)))
           (rest (ternary ((. ctx ELLIPSIS))
                   ((. ((. ((. ctx IDENTIFIER)) getText))))
                   undefined)))
      (return (object
        (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
        (tag 'destruct-array') (elements elems) (rest rest))))))

(const astArrayDestructElem
  (lambda ((ctx))
    ;; Phase 1: plain IDENTIFIER only
    (let ((name ((. ((. ctx IDENTIFIER)) getText))))
      (return (object (name name))))))
```

### Pattern node shapes

```
destruct-object:  { tag: 'destruct-object', fields: ObjField[], rest?: string }
  ObjField:       { name: string, alias?: string, defaultVal?: Expr }   (Phase 2+)

destruct-array:   { tag: 'destruct-array', elements: ArrElem[], rest?: string }
  ArrElem:        { name: string, defaultVal?: Expr }                   (Phase 2+)
```

### Modify `astLetStmt` (line 662) and `astConstStmt` (line 680)

Add a branch: when `ctx.singleBinding()` has a `destructPattern` child instead of an `IDENTIFIER`:

```lisp
(const astLetStmt
  (lambda ((ctx))
    (let ((bindCtx ((. ctx singleBinding))))
      (if ((. bindCtx destructPattern))
        ;; destructuring binding
        (let ((pattern (astDestructPattern ((. bindCtx destructPattern)))))
               (typeAnnotation (ternary ((. bindCtx typeExpr)) (astTypeExpr ((. bindCtx typeExpr))) undefined))
               (init (astExpression ((. ctx expression)))))
          (return (object (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
            (tag 'let') (pattern pattern) (typeAnnotation typeAnnotation) (init init))))
        ;; plain identifier binding (existing path)
        (let ((name ((. ((. bindCtx IDENTIFIER)) getText))))
               (typeAnnotation (ternary ((. bindCtx typeExpr)) (astTypeExpr ((. bindCtx typeExpr))) undefined))
               (init (astExpression ((. ctx expression)))))
          (return (object (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
            (tag 'let') (name name) (typeAnnotation typeAnnotation) (init init))))))))
```

> `astConstStmt` gets the same treatment. The AST node carries **either** `name: string` (plain) **or** `pattern: DestructPattern` (destructuring) — never both.

### Modify `astLetStar` (line 652) and `astConstStar` (line 670)

In the `starBinding` map lambda, check for `destructPattern` on `b`:

```lisp
(let ((bindings ((. ((. ctx starBinding)) map) (lambda ((b))
         (if ((. b destructPattern))
           (let ((pattern (astDestructPattern ((. b destructPattern)))))
                  (init (astExpression ((. b expression))))
                  (typeAnnotation (ternary ((. b typeExpr)) (astTypeExpr ((. b typeExpr))) undefined)))
             (return (object (pattern pattern) (init init) (typeAnnotation typeAnnotation))))
           (let ((id ((. ((. b IDENTIFIER)) getText))))
                  (init (astExpression ((. b expression))))
                  (typeAnnotation (ternary ((. b typeExpr)) (astTypeExpr ((. b typeExpr))) undefined)))
             (return (object (name id) (init init) (typeAnnotation typeAnnotation)))))))))
```

### Modify `astForOf` (line 638), `astForIn` (line 631), `astForAwait` (line 645)

```lisp
(const astForOf
  (lambda ((ctx))
    (if ((. ctx destructPattern))
      (let ((pattern (astDestructPattern ((. ctx destructPattern)))))
             (iterable (astExpression ((. ctx expression))))
             (body ((. ((. ctx statement)) map) astStatement)))
        (return (object (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
          (tag 'for-of') (pattern pattern) (iterable iterable) (body body))))
      (let ((name ((. ((. ctx IDENTIFIER)) getText))))
             (iterable (astExpression ((. ctx expression))))
             (body ((. ((. ctx statement)) map) astStatement)))
        (return (object (id (registerSpan (nextNodeId) ctx)) (text ((. ctx getText)))
          (tag 'for-of') (name name) (iterable iterable) (body body)))))))
```

> Same pattern for `astForIn` and `astForAwait`.

---

## 3. Macro Expand (`Stage9-macro-expand.s8`)

All three sites need to handle nodes that may have either `name` (plain) or `pattern` (destructuring).

### Helper: `evalQuasiPattern`

Add near the top of the macro-expand lambda:

```lisp
(const evalQuasiPattern
  (lambda ((pattern) (bindings) (env) (depth))
    ;; Patterns are not quasi-interpolated — they're structural.
    ;; Just recurse to handle any nested default-value expressions.
    (return pattern)))
```

Phase 2: when defaults are expressions, `evalQuasiPattern` must recurse into `field.defaultVal`.

### Helper: `patternNames`

Extracts all bound names from a pattern as a flat array of strings:

```lisp
(const patternNames
  (lambda ((pattern))
    (let ((names (array)))
      (if (=== (. pattern tag) 'destruct-object')
        (begin
          ((. (. pattern fields) forEach) (lambda ((f))
            ((. names push) (ternary (. f alias) (. f alias) (. f name)))))
          (if (. pattern rest) ((. names push) (. pattern rest)))))
      (if (=== (. pattern tag) 'destruct-array')
        (begin
          ((. (. pattern elements) forEach) (lambda ((e))
            ((. names push) (. e name))))
          (if (. pattern rest) ((. names push) (. pattern rest)))))
      (return names))))
```

### `evalQuasi` (around line 195)

In the `let` / `const*` cases, bindings may have `pattern` instead of a string `name`:

```lisp
;; existing path for plain names unchanged
;; add check for pattern:
(let ((bindingResult
         (if (. b pattern)
           (object (pattern (evalQuasiPattern (. b pattern) bindings env depth))
                   (init (evalQuasi (. b init) bindings env depth))
                   (typeAnnotation (. b typeAnnotation)))
           (object (name (extractBindingName (evalQuasi (. b name) bindings env depth)))
                   (init (evalQuasi (. b init) bindings env depth))
                   (typeAnnotation (. b typeAnnotation))))))
```

### `addScopeToNode` (around line 920)

The `let` / `const` / `const*` / `for-of` / `for-in` cases already pass through `name` unchanged. Patterns don't contain identifier *references* that need scope-stamping — they're binding *definitions* — so pass `pattern` through as-is:

```lisp
;; In the 'let' case:
(if (=== (. node tag) 'let')
  (if (. node pattern)
    (return (object (tag 'let') (text (. node text))
      (pattern (. node pattern))
      (typeAnnotation (. node typeAnnotation))
      (value (addScopeToNode (. node value) scope))))
    ;; existing plain-name path
    (return (object (tag 'let') (text (. node text))
      (name (. node name))
      (typeAnnotation (. node typeAnnotation))
      (value (addScopeToNode (. node value) scope))))))
```

### `expandStmt` (around line 1230)

`let` / `const` cases — pass `pattern` through, expand `init`:

```lisp
(if (=== (. node tag) 'let')
  (if (. node pattern)
    (return (object (tag 'let') (id (. node id)) (text (. node text))
      (pattern (. node pattern))
      (typeAnnotation (. node typeAnnotation))
      (init (expandExpr (. node init) env))))
    (return (object (tag 'let') (id (. node id)) (text (. node text))
      (name (. node name))
      (typeAnnotation (. node typeAnnotation))
      (init (expandExpr (. node init) env))))))
```

Same treatment for `const`, `for-of`, `for-in`, `for-await`, and the `const*` binding maps.

---

## 4. Scope Resolution (`Stage9-scope-resolve.s8`)

Scope resolution must register all names introduced by a pattern into the binding chain.

### Helper: `addPatternBindings`

Add near `addBinding` (line 38):

```lisp
(const addPatternBindings
  (lambda ((chain) (pattern))
    ;; Registers all leaf binding names from a destructuring pattern.
    (let ((extChain chain)))
      (if (=== (. pattern tag) 'destruct-object')
        (begin
          ((. (. pattern fields) forEach) (lambda ((f))
            (let ((bound (ternary (. f alias) (. f alias) (. f name))))
              (set! extChain (addBinding extChain bound (new Set))))))
          (if (. pattern rest)
            (set! extChain (addBinding extChain (. pattern rest) (new Set))))))
      (if (=== (. pattern tag) 'destruct-array')
        (begin
          ((. (. pattern elements) forEach) (lambda ((e))
            (set! extChain (addBinding extChain (. e name) (new Set)))))
          (if (. pattern rest)
            (set! extChain (addBinding extChain (. pattern rest) (new Set))))))
      (return extChain))))
```

Phase 3: recurse into nested patterns inside `addPatternBindings`.

### `resolveStmt` — `let` case (line 404)

```lisp
(if (=== (. node tag) 'let')
  (if (. node pattern)
    (return (object (tag 'let') (text (. node text))
      (pattern (. node pattern))
      (typeAnnotation (. node typeAnnotation))
      (init (resolveExpr (. node init) chain))))
    ;; existing plain-name path (unchanged)
    (return (object (tag 'let') (text (. node text))
      (name (. node name))
      (typeAnnotation (. node typeAnnotation))
      (init (resolveExpr (. node init) chain))))))
```

> `resolveStmt` does **not** extend the chain — it only resolves references inside the `init`. Extending the chain for callers is handled by `resolveTopLevel` and `let`. For statement-level `let`/`const`, the name is available to *subsequent* statements in the same block, but that isn't currently modelled (the chain is not threaded across sibling statements). This is a pre-existing limitation, not something to solve here.

### `resolveStmt` — `const*` cases (lines 341–374)

Add a branch in the binding-loop lambda:

```lisp
((. (. node bindings) forEach)
  (lambda ((b))
    (let ((resolvedInit (resolveExpr (. b init) extChain)))
      (if (. b pattern)
        (begin
          ;; Register all names introduced by the pattern
          (set! extChain (addPatternBindings extChain (. b pattern)))
          ((. resolvedBindings push) (object
            (pattern (. b pattern))
            (init resolvedInit)
            (typeAnnotation (. b typeAnnotation)))))
        (begin
          (let ((bindScopes (ternary (. b scopes) (. b scopes) (new Set)))))
            ((. resolvedBindings push) (object
              (name (. b name))
              (init resolvedInit)
              (typeAnnotation (. b typeAnnotation))))
            (set! extChain (addBinding extChain (. b name) bindScopes))))))))
```

### `resolveStmt` — `for-of` / `for-in` / `for-await`

Currently not in `resolveStmt` (falls through as-is). Add handling:

```lisp
(if (=== (. node tag) 'for-of')
  (let ((bodyChain (ternary (. node pattern)
                      (addPatternBindings chain (. node pattern))
                      (addBinding chain (. node name) (new Set)))))
    (return (object (tag 'for-of') (text (. node text))
      (name (. node name))
      (pattern (. node pattern))
      (iterable (resolveExpr (. node iterable) chain))
      (body ((. (. node body) map) (lambda ((s)) (return (resolveStmt s bodyChain)))))))))
```

---

## 5. Lowering (`Stage9-lower.s8`)

Lowering passes the pattern through unchanged — it's already in its final shape. Only `init` / `iterable` need lowering.

### `lowerStmt` — `let` case (line 354)

```lisp
(if (=== (. node tag) 'let')
  (if (. node pattern)
    (return (object (node node) (id (. node id)) (tag 'let-stmt')
      (pattern (. node pattern))
      (typeAnnotation (ternary (. node typeAnnotation) (lowerTypeExpr (. node typeAnnotation)) undefined))
      (init (lowerExpr (. node init)))))
    ;; existing plain-name path
    (return (object (node node) (id (. node id)) (tag 'let-stmt')
      (name (. node name))
      (typeAnnotation (ternary (. node typeAnnotation) (lowerTypeExpr (. node typeAnnotation)) undefined))
      (init (lowerExpr (. node init)))))))
```

Same for `const` → `const-stmt`.

### `lowerLetStar` / `lowerConstStar`

Thread `pattern` through each binding instead of `name`.

### `lowerStmt` — `for-of` / `for-in` / `for-await` (lines 416–421)

```lisp
(if (=== (. node tag) 'for-of')
  (if (. node pattern)
    (return (object (node node) (id (. node id)) (tag 'for-of-stmt')
      (pattern (. node pattern))
      (iterable (lowerExpr (. node iterable)))
      (body ((. (. node body) map) lowerStmt))))
    ;; existing plain-name path
    (return (object (node node) (id (. node id)) (tag 'for-of-stmt')
      (name (. node name))
      (iterable (lowerExpr (. node iterable)))
      (body ((. (. node body) map) lowerStmt))))))
```

---

## 6. Codegen (`Stage9-codegen.s8`)

### New helper: `emitDestructPattern`

```lisp
(const emitDestructPattern
  (lambda ((pattern))
    (if (=== (. pattern tag) 'destruct-object')
      (let ((parts ((. (. pattern fields) map) (lambda ((f))
                 ;; Phase 1: only plain shorthand
                 (return (. f name)))))
             (withRest (ternary (. pattern rest)
                          ((. parts concat) (array (+ '...' (. pattern rest))))
                          parts)))
        (return (+ '{ ' ((. withRest join) ', ') ' }'))))
    (if (=== (. pattern tag) 'destruct-array')
      (let ((parts ((. (. pattern elements) map) (lambda ((e))
                 (return (. e name)))))
             (withRest (ternary (. pattern rest)
                          ((. parts concat) (array (+ '...' (. pattern rest))))
                          parts)))
        (return (+ '[' ((. withRest join) ', ') ']'))))))
```

Phase 2 additions to `emitDestructPattern`:
- `f.alias` → emit `origName: alias`
- `f.defaultVal` → emit `name = ${emitExpr(f.defaultVal)}`
- Combined: `origName: alias = defaultExpr`

Phase 3: recurse into nested patterns.

### `emitStmt` — `let-stmt` (line 163)

```lisp
(if (=== (. stmt tag) 'let-stmt')
  (let ((typeStr (ternary (. stmt typeAnnotation) (+ ': ' (emitTypeExpr (. stmt typeAnnotation))) '')))
         (lhs (ternary (. stmt pattern)
                 (emitDestructPattern (. stmt pattern))
                 (checkId (. stmt name) (. stmt id)))))
    (if (isDefined (. stmt init))
      (return (+ 'let ' lhs typeStr ' = ' (emitExpr (. stmt init)) ';'))
      (return (+ 'let ' lhs typeStr ';')))))
```

Same change to `const-stmt` (line 168).

### `emitForOf` (line 372), `emitForIn` (line 363), `emitForAwait` (line 381)

```lisp
(const emitForOf
  (lambda ((node))
    (let ((lines (array)))
           (lhs (ternary (. node pattern)
                   (emitDestructPattern (. node pattern))
                   (checkId (. node name) (. node id)))))
      ((. lines push) (+ 'for (const ' lhs ' of ' (emitExpr (. node iterable)) ') {'))
      ((. (. node body) forEach) (lambda ((s))
        ((. lines push) (indent (emitStmt s)))))
      ((. lines push) '}')
      (return ((. lines join) '\n')))))
```

---

## 7. Tags (`Stage9-tags.ts`)

No new tags required for Phase 1 — `'let'`, `'const'`, `'const*'`, `'for-of'`, `'for-in'`, `'for-await'` already exist and the pattern is carried as a field. The `destruct-object` and `destruct-array` values live in `.pattern` fields and are not top-level statement tags.

---

## 8. Tests

New test file: `stage9/tests/destructure.test.ts`

```typescript
// Phase 1
'object destructure — plain names'
  (const {x y} { x: 1, y: 2 })  →  x === 1, y === 2

'object destructure — rest'
  (const {x ...rest} { x: 1, a: 2, b: 3 })  →  rest.a === 2

'array destructure — plain names'
  (const [a b c] [10 20 30])  →  a === 10, b === 20, c === 30

'array destructure — rest'
  (const [head ...tail] [1 2 3])  →  head === 1, tail.length === 2

'let with object destruct'
  (let (({x y} { x: 5, y: 6 })) (+ x y))  →  11

'for-of with array destruct'
  (for-of [k v] entries  (set! sum (+ sum v)))  →  sum correct

'for-of with object destruct'
  (for-of {name age} people  ...)

// Phase 2
'object destructure — alias'
  (const {(count c)} { count: 7 })  →  c === 7

'object destructure — default'
  (const {(x = 99)} {})  →  x === 99

// Phase 3
'nested object destruct'
  (const {(inner {a b})} { inner: { a: 1, b: 2 } })  →  a === 1, b === 2
```

---

## 9. Implementation Order

1. **Grammar** — add `destructPattern` rules + modify `singleBinding`, `starBinding`, `forOfForm`, `forInForm`, `forAwaitForm`; rebuild grammar (`npm run build-grammar`)
2. **AST** — add `astDestructPattern`, `astObjectDestructPat`, `astArrayDestructPat`; update `astLetStmt`, `astConstStmt`, `astLetStar`, `astConstStar`, `astForOf`, `astForIn`, `astForAwait`
3. **Macro-expand** — add `patternNames` helper; update `evalQuasi`, `addScopeToNode`, `expandStmt` to handle `pattern` field alongside `name`
4. **Scope-resolve** — add `addPatternBindings`; update `const*` binding loop and `for-of`/`for-in`/`for-await` handling
5. **Lower** — update `lowerStmt` `let`/`const`/`for-*` cases and `lowerLetStar`/`lowerConstStar`
6. **Codegen** — add `emitDestructPattern`; update `emitStmt` and `emitForOf`/`emitForIn`/`emitForAwait`
7. **Rebuild compiler** — `npm run build-compiler`
8. **Tests** — write Phase 1 tests in `tests/destructure.test.ts`

---

## 10. Key Design Decisions

- **Either `name` or `pattern`, never both**: All AST nodes that currently have `name: string` gain an optional `pattern: DestructPattern`. Code at each pipeline stage checks `node.pattern` first, then falls back to `node.name`. This avoids a breaking change to existing plain-identifier bindings.
- **Scope chain**: `addPatternBindings` extracts all leaf names from a pattern and adds them to the chain in one pass. Nested patterns are handled by recursing into sub-patterns.
- **No new statement tags**: The existing `let`/`const`/`for-of` etc. tags are reused; the pattern is a field on those nodes. This keeps the tag set stable and avoids touching macro-expand `expandAll` worklist logic.
- **`let`/`const` statement scope chain not threaded**: Currently t2 does not thread the binding chain across sibling statements inside a block (only `const*` does). This means destructured names from a bare `(const {x} obj)` are not visible to subsequent sibling statements in scope-resolution. This is the same limitation that applies to plain `(const (x) obj)` today.
- **`_` as hole in array patterns**: A name `_` in array position emits as a normal binding name. True holes (`[, b]`) would require a `HOLE` token; defer to Phase 2.
