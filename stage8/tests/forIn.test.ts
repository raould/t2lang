import {it} from 'vitest';
import {fromSourceEndToEnd} from './helpers';

it('forIn.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    (let* ((obj (object (a 1) (b 2) (c 3)))
          (keys (array)))
      (for-in k obj
        ((. keys push) k))
      (asrt (. keys length) 3)
    )
  )`);
}, 30_000);
