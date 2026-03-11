import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeExprBasic.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (import (object (named (array (object (name "asrtDeep"))))) "./helpers")
      (let (x : (union string number)) "hello")
      (let (nums : (type-array number)) (array 1 2 3))
      (let (obj : (obj (x number) (y string))) (object (x 1) (y "hi")))
      (let (obj2 : (obj (readonly id string) (name ? string))) (object (id "abc")))
      (let (status : (tlit "active")) "active")
      (asrt x "hello")
      (asrtDeep nums (array 1 2 3))
      (asrt (. obj x) 1)
      (asrt status "active")
  )
`);
}, 30_000);
