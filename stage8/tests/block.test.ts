import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('block.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (let (x) 0)
      ;; begin block groups multiple statements
      (begin
        (set! x 1)
        (asrt x 1)
        (set! x 2)
        (asrt x 2)))
    `);
}, 30_000);
