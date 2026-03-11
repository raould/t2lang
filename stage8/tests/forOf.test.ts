import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('forOf.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    (let* ((arr (array 10 20 30))
          (sum 0))
      (for-of item arr
        (set! sum (+ sum item)))
      (asrt sum 60)
    )
  )
`);
}, 30_000);
