import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('ifForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (x) 10)

  ;; if with then and else
  (if (> x 5)
    ((. console log) "big")
    ((. console log) "small"))

  ;; if with then only (no else)
  (if (> x 0)
    ((. console log) "positive")))
`);
});
