import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('stringPlus.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (let* ((a "one")
          (b "Two")
          (ab (+ a b)))
        ((. console assert) (=== (+ a b) ab))
        ((. console log) ab)
    )
)
`);
});
