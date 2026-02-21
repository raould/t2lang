import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('quasiquote.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; quasi form
  (let (q1) (quasi (object (tag "div"))))
  ((. console log) q1)

  ;; quote form
  (let (q2) (quote (object (tag "span"))))
  ((. console log) q2))
`);
});
