import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('objectExpr.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; object with identifier keys
  (let (obj) (object (x 1) (y 2) (z 3)))
  ((. console log) obj)

  ;; object with string keys
  (let (obj2) (object ("name" "Alice") ("age" 30)))
  ((. console log) obj2)

  ;; empty object
  (let (empty) (object))
  ((. console log) empty))
`);
});
