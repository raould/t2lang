import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('ifForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")
    (let (x) 10)

    ;; if with then and else
    (let (out) undefined)
    (if (> x 5) (set! out "big") (set! out "small"))
    (asrt out "big")

    ;; if with then only (no else)
    (if (> x 0) (set! out "positive"))
    (asrt out "positive")
  )
`);
}, 30_000);
