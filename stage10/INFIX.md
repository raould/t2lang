# Infix Math Notation — Stage10

`#{ ... }` is the entry sigil for infix math/logic expressions. Inside, ECMAScript-style operators apply with full precedence. The `#` is required only on the **outermost** expression; inside, `{...}` is plain sub-grouping.

This document describes the user-facing semantics. For the implementation plan and design rationale, see [PRATT.md](PRATT.md).

> **History.** Stage9 used a "uniformity check" — all binary operators at the same `{}` level had to be identical (`#{a + b * c}` was a compile error). Stage10 replaced this with a real precedence table. Stage9's [INFIX.md](../stage9/INFIX.md) remains accurate for that earlier design.

---

## Operator Precedence

Higher binding power = binds tighter. All operators are left-associative except `**`.

| bp  | Operator(s)             | Notes |
|----:|-------------------------|-------|
| 10  | `\|\|`  `??`            |       |
| 20  | `&&`                    |       |
| 30  | `\|`                    |       |
| 40  | `^`                     |       |
| 50  | `&`                     |       |
| 60  | `===`  `!==`  `==`  `!=` |       |
| 70  | `<`  `>`  `<=`  `>=`    |       |
| 80  | `+`  `-`                |       |
| 90  | `*`  `/`  `%`           |       |
| 100 | `**`                    | right-associative |
| 110 | unary `-`  `!`  `~`     | prefix only       |
| 110 | `.` (prop access)       | postfix on any expression |
| 120 | `(` (function call)     | postfix; binds tightest |

```lisp
#{a + b * c}                    ;; → a + (b * c)
#{a * b + c}                    ;; → (a * b) + c
#{a + b + c}                    ;; → (a + b) + c   (left-assoc)
#{a ** b ** c}                  ;; → a ** (b ** c) (right-assoc)
#{a || b && c}                  ;; → a || (b && c)
```

Explicit grouping with `{...}` overrides precedence:

```lisp
#{{a + b} * c}                  ;; → (a + b) * c
#{{x ** 2} + {y ** 2}}          ;; → (x ** 2) + (y ** 2)
```

---

## Whitespace Around `/`

`/` doubles as a macro namespace separator (e.g. `m/identity`) outside `#{...}`. Inside `#{...}`, `/` is **division only when surrounded by whitespace**:

```lisp
#{a / b}                        ;; OK — division
#{a/b}                          ;; ERROR: identifier 'a/b' contains '/'
                                ;;        — add spaces around it for division
```

The compiler's error message tells you exactly what to fix. The rule is mechanical: an identifier-character `/` (no surrounding spaces) is absorbed into the surrounding identifier; a `/` between whitespace is a `SLASH` token.

This means `#{2/3}` works (the `2` ends as a number, then `/` is fresh, then `3` is a number). The constraint matters only when `/` could be confused with an in-identifier slash.

---

## Neoteric Function Calls

`identifier(args)` inside `#{}` is a function call. Args may be full infix expressions; no extra `{}` needed.

```lisp
#{sin(angle) * radius}          ;; → (sin angle) * radius
#{f(x, y) + g(z)}               ;; → (f x y) + (g z)
#{Math.abs(n) + 1}              ;; (reader: (. Math abs)(n) + 1)
#{f(a + b, c * d)}              ;; args are infix expressions
```

Calls bind tighter than any operator (bp 120):

```lisp
#{-f(x)}                        ;; → -(f(x))
#{a + f(b) * c}                 ;; → a + (f(b) * c)
```

### Spread arguments

```lisp
#{f(...args)}                   ;; → f(...args)
#{f(x, ...rest)}                ;; → f(x, ...rest)
#{arr.push(...newItems)}        ;; → arr.push(...newItems)
```

### Trailing commas

Trailing commas are accepted in argument lists (and silently dropped):

```lisp
#{f(x,)}                        ;; → f(x)
#{f(x, y,)}                     ;; → f(x, y)
```

### Property access on call and subscript results

```lisp
#{f(x).prop}                    ;; → f(x).prop
#{f(x).a.b}                     ;; → f(x).a.b   (chained DOT after call)
#{f(x).method(y)}               ;; → f(x).method(y)
#{arr[0].length}                ;; → arr[0].length   (DOT after subscript)
```

The reader's dotted-id transform fires when the preceding character is an ident character or a closing delimiter (`)`, `]`, `}`), so chained postfix forms — call → prop, subscript → prop, etc. — all work end-to-end.

---

## Property Access

Dotted names like `arr.length` and `obj.method` are converted by the reader to `(. arr length)` / `(. obj method)` chains *before* parsing. Inside `#{...}` they work the same as anywhere else:

```lisp
#{arr.length === 0}             ;; → arr.length === 0
#{a.b.c + 1}                    ;; → a.b.c + 1
#{obj.method(x) + 1}            ;; → obj.method(x) + 1
```

---

## Unary Operators

Unary prefix operators (`-`, `!`, `~`) bind tighter than any binary operator:

```lisp
#{-x * y}                       ;; → (-x) * y
#{!done && {count > 0}}         ;; → (!done) && (count > 0)
#{~mask | flags}                ;; → (~mask) | flags
```

`~` is unambiguous here even though `~` is the macro unquote sigil elsewhere — inside `#{}` the parser is in a separate sub-language.

---

## Errors

The compiler rejects:

- **`#{}`** — empty
- **`#{   }`** — whitespace only
- **`#{f(x}`** — unmatched parenthesis
- **`#{(x + 1)}`** — bare `(` for sub-grouping (use `{...}`)
- **`#{gWidth/2}`** — identifier containing `/`
- **`#{a + #{b}}`** — nested `#{}` (caught by the grammar)

Each error includes a sensible message naming the problem.

---

## Complete Operator Set

| Category    | Operators                                          |
|-------------|----------------------------------------------------|
| Arithmetic  | `+`  `-`  `*`  `/`  `%`  `**`                      |
| Comparison  | `<`  `>`  `<=`  `>=`  `===`  `!==`  `==`  `!=`     |
| Logical     | `&&`  `\|\|`  `??`                                 |
| Bitwise     | `&`  `\|`  `^`                                     |
| Unary       | `-`  `!`  `~`                                      |
