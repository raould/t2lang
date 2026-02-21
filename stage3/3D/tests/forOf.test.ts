import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('forOf.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let* ((arr (array 10 20 30))
         (sum 0))
    (for-of item arr
      (set! sum (+ sum item)))
    ((. console assert) (=== sum 60))
    ((. console log) sum)))
`);
});
