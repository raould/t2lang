import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('switch.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrtDeep"))))) "./helpers")
    (let* ((fun (lambda ((...x)) (return (array ...x)))))
        (asrtDeep (fun 1 2 3) (array 1 2 3))
    )
  )
  `);
}, 30_000);
