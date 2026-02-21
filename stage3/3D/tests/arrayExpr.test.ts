import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

// the test itself
it('arrayExpr.t2 end-to-end', () => {
  fromSourceEndToEnd(`
    (program
        ;; array with elements
        (let (arr) (array 1 2 3))
        (let (astr) ((. arr toString)))
        ((. console log) astr)
        ((. console assert) (== "1,2,3" astr))

        ;; array with mixed types
        (let (mixed) (array "a" 1 true null))
        (let (mstr) ((. mixed toString)))
        ((. console log) mstr)
        ((. console assert) (== "a,1,true," mstr))

        ;; empty array
        (let (empty) (array))
        (let (estr) ((. empty toString)))
        ((. console log) estr)
        ((. console assert) (== "" estr))

        ((. console log) "end")
    )
  `);
});
