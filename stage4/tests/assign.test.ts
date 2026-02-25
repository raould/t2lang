import {it} from 'vitest';
import {fromSourceEndToEnd} from './helpers';

it('assign.t2 end-to-end', () => {
    fromSourceEndToEnd(`
        (program
            (import (object (:named (array (object (:name "asrt"))))) "./helpers")

            (let (x) 1)
            (asrt x 1)

            ;; set! mutates a binding
            (set! x 99)
            (asrt x 99)

            ;; set! in nested context
            (if true
                (set! x 200))
            (asrt x 200)
        )
  `);
}, 30_000);
