import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeUnionIntersection.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (import (object (:named (array (object (:name "asrtDeep"))))) "./helpers")
      ;; union: string | number | boolean
      (let (u : (union string number boolean)) 1)
      ;; intersection: A & B
      (let (a : (intersect (obj (a number)) (obj (b string)))) (object (a 1) (b "x")))
      (asrt u 1)
      (asrtDeep a (object (a 1) (b "x")))
)
`);
}, 30_000);
