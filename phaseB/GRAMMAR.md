
# Phase B Grammar (Supplemental)

This file documents Phase B-only sugar forms that are not part of the Phase A canonical grammar.

## Infix Forms

```
(infix (<expr> <op> <expr> ...))
```

Reader macro equivalent:

```
:(<expr> <op> <expr> ...)
```

These forms rewrite to nested `(call <op> ...)` expressions based on JavaScript operator precedence.
