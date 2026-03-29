import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('objectExpr.test.t2 object with identifier keys', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let (obj) (object (x 1) (y 2) (z 3)))
      (asrtDeep obj {"x":1,"y":2,"z":3})
      (asrtDeep obj {x:1,y:2,z:3})
  )`);
},30_000);

it('objectExpr.test.t2 object with string keys', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let (obj2) (object ("name" "Alice") ("age" 30)))
      (asrtDeep obj2 {"name":"Alice","age":30})
      (asrtDeep obj2 {name:"Alice",age:30})
  )`);
}, 30_000);

it('objectExpr.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let (empty) (object))
      (asrtDeep empty {})
  )`)
}, 30_000);
