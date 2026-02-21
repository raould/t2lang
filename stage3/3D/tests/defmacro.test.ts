import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('defmacro.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; defmacro declaration (emitted as a comment by codegen)
  (defmacro myMacro ((x) (y))
    ((. console log) x)
    ((. console log) y))
  ((. console log) "macros declared"))
`);
});
