import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('whileForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let (i) 5)
      (let (sum) 0)
      ;; while loop with multiple body statements
      (while (> i 0)
        ((. console log) i)
        (set! sum (+ sum i))
        (set! i (- i 1))
      )
      (asrt sum 15)
    )
`);
}, 30_000);
