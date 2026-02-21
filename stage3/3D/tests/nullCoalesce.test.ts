import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('nullCoalesce.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let* ((a null)
         (b undefined)
         (c "hello"))
    ((. console log) (?? a "fallback"))
    ((. console log) (?? b "fallback"))
    ((. console log) (?? c "fallback"))
    ((. console assert) (=== (?? a "fallback") "fallback"))
    ((. console assert) (=== (?? b "fallback") "fallback"))
    ((. console assert) (=== (?? c "fallback") "hello"))
    ;; nested: opt-chain + null-coalesce
    (let* ((user undefined))
      ((. console assert) (=== (?? (.? user name) "guest") "guest")))))
`);
});
