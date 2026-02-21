import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeExprBasic.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (x : (union string number)) "hello")
  (let (nums : (array number)) (array 1 2 3))
  (let (obj : (obj (x number) (y string))) (object (x 1) (y "hi")))
  (let (obj2 : (obj (readonly id string) (name ? string))) (object (id "abc")))
  (let (status : (lit "active")) "active")
  ((. console log) x)
  ((. console log) nums)
  ((. console log) (. obj x))
  ((. console log) status))
`);
});
