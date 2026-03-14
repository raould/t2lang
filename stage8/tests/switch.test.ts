import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('switch.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    (let* ((x 2)
           (lam (lambda ((x))
                (switch x
                  (case 1 (return "one"))
                  (case 2 (return "two"))
                  (default (return "other"))
                ))))
      (asrt (lam x) "two")
    )
  )
`);
}, 30_000);
