import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('objectExpr.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      ;; object with identifier keys
      (let (obj) (object (x 1) (y 2) (z 3)))
      (asrt ((. JSON stringify) obj) '{"x":1,"y":2,"z":3}')

      ;; object with string keys
      (let (obj2) (object ("name" "Alice") ("age" 30)))
      (asrt ((. JSON stringify) obj2) '{"name":"Alice","age":30}')
      ;; empty object
      (let (empty) (object))
      (asrt ((. JSON stringify) empty) "{}"))
`);
}, 30_000);
