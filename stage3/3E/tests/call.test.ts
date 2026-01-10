import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('call.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")
    ;; call with operator (lowered to operator-expr)
    ((. console log) (+ 1 2))
    ((. console log) (- 10 3))
    ((. console log) (* 4 5))

    ;; call with named function
    (def double (lambda ((x)) (return (* x 2))))
    (asrt (double 21) 42)

    ;; call with no args
    (def now (lambda () (return 0)))
    (asrt (now) 0)

    ;; nested calls
    (asrt (+ (double 3) (double 4)) 14)

    ;; call with explicit type arguments
    (def id (lambda ((x)) (return x)))
    (asrt (id 123) 123)

    ;; new expression with type arguments on built-in Map
    (asrt (typeof (new Map (type-args string number))) "object")
)`);
}, 30_000);
