import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('block.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (x) 0)

  ;; begin block groups multiple statements
  (begin
    (set! x 1)
    ((. console log) x)
    (set! x 2)
    ((. console log) x)))
`);
});
