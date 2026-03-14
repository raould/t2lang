import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('stringPlus.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let* ((a "one")
            (b "Two")
            (c "3")
            (abc (+ a b c)))
          (asrt abc "oneTwo3")
      )
    )
`);
}, 30_000);
