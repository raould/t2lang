import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

// the test itself
it('arrayExpr.t2 end-to-end', () => {
  fromSourceEndToEnd(`
    (program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; array with elements
        (let (arr) (array 1 2 3))
        (let (astr) ((. arr toString)))
        (asrt astr "1,2,3")

        ;; array with mixed types
        (let (mixed) (array "a" 1 true null))
        (let (mstr) ((. mixed toString)))
        (asrt mstr "a,1,true,")

        ;; empty array
        (let (empty) (array))
        (let (estr) ((. empty toString)))
        (asrt estr "")
    )
  `);
}, 30_000);
