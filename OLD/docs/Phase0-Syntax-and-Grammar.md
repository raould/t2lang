# T2 Phase 0 Syntax and Grammar

## Core principles

- All source is a single s-expression.
- The root form is always `(program ...)`.
- No C-style syntax: no semicolons, no braces, no infix operators.
- Everything is lists and atoms.

## Top-level

```t2
(program <form>*)
```

## Identifiers and literals

- Identifiers: letters, digits, `_`, `-`, not starting with a digit.
- Literals:
  - numbers
  - strings
  - booleans
  - null
  - undefined

## Calls

```t2
(foo 42)
(bar x y)
```

## Let*

```t2
(let* ((x 1)
       (y 2))
  (foo x y))

(let* ((x 1)
       (y (+ x 1)))
  (bar y))
```

## Blocks

```t2
(block
  (let* ((y 1))
    (foo y))
  (bar y))
```

## Program example

```t2
(program
  (let* ((a 10))
    (foo a))
  (block
    (let* ((b a))
      (foo b)))
)
```
