# todo

* refactor the t2lang keyword "function", which is like lisp's defun, to just "fn" please.
* functions should support inline return type annotations.
* function syntax should support inline argument type annotations.
* read t2lang-phase0/TODO.md
* read t2lang-phase1/TODO.md
* human: continue to create examples based on https://typescript-cookbook.com/examples/

# sugar ideas

* how close to looking like typescript should we get? e.g. class definition in t2 can have a lot of parenthases.
* implement infix with "(infix 1 + 2)" or "(infix (1 + 2)" becoming "(+ 1 2), then a leading dot like ".(1 + 2)". Note that it must support variable names. Note that the infix applies to everything inside so "(infix (1 + (2 * 3)))" means the parenthases inside are mathematical grouping, not sexprs.
