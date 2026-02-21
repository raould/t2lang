import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('switch.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let* ((x 2))
    (switch x
      (case 1 ((. console log) "one"))
      (case 2 ((. console log) "two"))
      (default ((. console log) "other")))))
`);
});
