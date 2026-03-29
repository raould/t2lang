import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('ifForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((x 10)))

    ;; if with then and else
    (let ((out undefined)))
    (if (> x 5)
      (then (set! out "big"))
      (else (set! out "small")))
    (asrt out "big")

    ;; if with then only (no else)
    (if (> x 0)
      (then (set! out "positive")))
    (asrt out "positive")

    ;; if with multi-statement branches
    (let ((a 0)))
    (let ((b 0)))
    (if (> x 5)
      (then
        (set! a 1)
        (set! b 2))
      (else
        (set! a 9)
        (set! b 9)))
    (asrt a 1)
    (asrt b 2)
  )
`);
}, 30_000);
