# Phase B Supplemental Grammar (EBNF)

This grammar describes a more ergonomic syntax for callables that **lowers** to Phase A. 

## Design Principles

1. **Single-paren params**: `(fn (x) x)` instead of `(fn ((x)) x)`
2. **Colon-required types**: `x: type` syntax; bare `x type` is illegal
3. **Comma consistency**: If any comma is used, all params must be comma-separated
4. **Optional types**: Params without types remain untyped in output

---

## Tokens (additions to Phase A)

```
<colon> ::= ":"
<comma> ::= ","
<typed-identifier> ::= <identifier> <colon> <type>
```

---

## Parameters (Phase B)

```
<b-param> ::= <identifier>
            | <typed-identifier>
            | <b-param-with-default>
            | <b-param-modifier>+ <identifier>
            | <b-param-modifier>+ <typed-identifier>

<b-param-with-default> ::= <identifier> "default" <expression>
                         | <typed-identifier> "default" <expression>

<b-param-modifier> ::= "public" | "protected" | "private" | "readonly"

<b-param-list> ::= "(" <b-param-list-body>? ")" <type>?

<b-param-list-body> ::= <b-param-no-comma>*          ; no commas anywhere
                      | <b-param-with-comma>+        ; commas between all params

<b-param-no-comma> ::= <b-param>
<b-param-with-comma> ::= <b-param> <comma>?          ; trailing comma optional on last

; ILLEGAL: mixing comma and non-comma styles
; ILLEGAL: (fn (x type) x)  — colon required for types
```

---

## Callables (Phase B)

```
<b-fn> ::= "(" "fn" <callable-flag>* <identifier>? <b-param-list> <statement>* ")"
<b-lambda> ::= "(" "lambda" <callable-flag>* <b-param-list> <statement>* ")"
<b-method> ::= "(" "method" <callable-flag>* <identifier> <b-param-list> <statement>* ")"
<b-getter> ::= "(" "getter" <callable-flag>* <identifier> <b-param-list> <statement>* ")"
<b-setter> ::= "(" "setter" <callable-flag>* <identifier> <b-param-list> <statement>* ")"
```

---

## Lowering Rules (Phase B → Phase A)

### Parameter Lowering

| Phase B | Phase A |
|---------|---------|
| `x` | `(x)` |
| `x: T` | `(x T)` |
| `x: T default E` | `(x T (default E))` |
| `public x: T` | `(public x T)` |

### Callable Lowering

| Phase B | Phase A |
|---------|---------|
| `(fn (x) x)` | `(fn ((x)) x)` |
| `(fn (x: T) x)` | `(fn ((x T)) x)` |
| `(fn (x: Tx y: Ty) x)` | `(fn ((x Tx) (y Ty)) x)` |
| `(fn (x: Tx, y: Ty) x)` | `(fn ((x Tx) (y Ty)) x)` |
| `(fn (x, y: Ty) x)` | `(fn ((x) (y Ty)) x)` |
| `(fn name (x) x)` | `(fn name ((x)) x)` |
| `(lambda (x) x)` | `(lambda ((x)) x)` |
| `(method name (x) x)` | `(method "name" ((x)) x)` |

### Return Type Lowering

```
(fn (x): T x)  →  (fn ((x)) T x)
(fn (x: A): T x)  →  (fn ((x A)) T x)
```

---

## Validation Rules

1. **Colon required for types**
   ```
   (fn (x type) x)     ; ❌ ILLEGAL — missing colon
   (fn (x: type) x)    ; ✓ legal
   ```

2. **Comma consistency**
   ```
   (fn (x y) x)        ; ✓ legal — no commas
   (fn (x, y) x)       ; ✓ legal — all commas
   (fn (x y, z) x)     ; ❌ ILLEGAL — mixed style
   ```

3. **Untyped params propagate**
   ```
   (fn (x, y: T) x)    ; ✓ legal → function(x, y: T) { x; }
   ```

---

## Examples

### Functions

```lisp
; Phase B                          ; Phase A                           ; TypeScript
(fn (x) x)                         (fn ((x)) x)                        function(x) { return x; }
(fn add (a: number b: number) a)   (fn add ((a number) (b number)) a)  function add(a: number, b: number) { return a; }
(fn (x: T): T x)                   (fn ((x T)) T x)                    function(x: T): T { return x; }
```

### Lambdas (Arrow Functions)

```lisp
; Phase B                          ; Phase A                           ; TypeScript
(lambda (x) x)                     (lambda ((x)) x)                    (x) => x
(lambda (x: number) x)             (lambda ((x number)) x)             (x: number) => x
```

### Methods

```lisp
; Phase B                          ; Phase A                           ; TypeScript
(method greet (name: string)     (method "greet" ((name string))     greet(name: string) {
  (call console.log name))           (call console.log name))            console.log(name); }
```

### Mixed Typed/Untyped

```lisp
; Phase B                          ; Phase A                           ; TypeScript
(fn (x, y: number, z) x)           (fn ((x) (y number) (z)) x)         function(x, y: number, z) { return x; }
```

---

## Notes

- Phase B is purely syntactic sugar; semantics are defined by Phase A.
- The lowering pass runs before any Phase A processing.
- `call`, `new`, and `class` retain their Phase A syntax (no param-list changes needed).
- Rest parameters (`...args`) follow the same colon rule: `...args: T[]` is legal, `...args T[]` is not.