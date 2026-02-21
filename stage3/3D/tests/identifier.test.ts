import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('identifier.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (x) 42)
  (let (myVar) "hello")

  ;; identifier references
  ((. console log) x)
  ((. console log) myVar))
`);
});
