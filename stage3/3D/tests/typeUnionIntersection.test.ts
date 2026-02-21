import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeUnionIntersection.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; union: string | number | boolean
  (let (u : (union string number boolean)) (array 1))
  ;; intersection: A & B
  (let (a : (intersect (obj (a number)) (obj (b string)))) (object (a 1) (b "x")))
  ((. console log) u)
  ((. console log) a)
)
`);
});
