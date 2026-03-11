import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('returnForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; return with expression
    (const getVal
      (lambda ()
        (return 42)))

    ;; return without expression
    (const doNothing
      (lambda ()
        (return)))

    (asrt (getVal) 42)
    (asrt (doNothing) undefined)
  )
`);
}, 30_000);
