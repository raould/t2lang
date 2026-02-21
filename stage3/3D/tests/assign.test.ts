import {it} from 'vitest';
import {fromSourceEndToEnd} from './helpers';

it('assign.t2 end-to-end', () => {
    fromSourceEndToEnd(`
        (program
            (let (ass)
                (lambda ((estr) (v))
                (let (vstr) ((. v toString)))
                ((. console log) vstr)
                ((. console assert) (== estr vstr))))

            (let (x) 1)
            (ass "1" x)

            ;; set! mutates a binding
            (set! x 99)
            (ass "99" x)

            ;; set! in nested context
            (if true
                (set! x 200))
            (ass "200" x)
        )
  `);
});