import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('for.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")
    ;; basic for loop
    (let (sum) 0)
    (for (let (i) 0) (< i 5) (set! i (+ i 1))
      (set! sum (+ sum i)))
    (asrt sum 10)
  )
`);
}, 30_000);
