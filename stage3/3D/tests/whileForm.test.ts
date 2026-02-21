import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('whileForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (i) 5)

  ;; while loop with multiple body statements
  (while (> i 0)
    ((. console log) i)
    (set! i (- i 1))))
`);
});
