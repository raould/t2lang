import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('indexAccess.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let (arr) (array 10 20 30))
        (let* ((a0 (index arr 0))
              (a2 (index arr 2)))
            (asrt a0 (index arr 0))
            (asrt a2 (index arr 2))
        )

        ;; index access by number
        (asrt (index arr 0) 10)
        (asrt (index arr 2) 30)

        ;; index access with computed index
        (let (i) 1)
        (asrt (index arr i) 20)
      )
  `);
}, 30_000);
