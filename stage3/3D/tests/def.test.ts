import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('def.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; top-level constant definition
  (def x 42)
  (def greeting "hello")
  (def pi 3.14)
  ((. console log) x)
  ((. console log) greeting)
  ((. console log) pi))
`);
});
