import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('ternary.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")

      (let (x) 10)

      ;; ternary with three branches (test, then, else)
      (let (result) (ternary (> x 5) "big" "small"))
      (asrt result "big")

      ;; ternary always requires else
      (let (maybe) (ternary (> x 0) "positive" "non-positive"))
      (asrt maybe "positive")

      ;; ternary nested in expression
      (let (nested) (+ 1 (ternary true 10 20)))
      (asrt nested 11)
  )
`);
}, 30_000);
