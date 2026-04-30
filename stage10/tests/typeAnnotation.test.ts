import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeAnnotation.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (import {asrtDeep} "./helpers")
      (let ((x : number 42)))
      (let ((name : string "hello")))
      (const (pi : number) 3.14)
      (let ((pair : (tuple number string) (array 42 "foo"))))

      (asrt x 42)
      (asrt (typeof x) "number")

      (asrt name "hello")
      (asrt (typeof name) "string")

      (asrt pi 3.14)
      (asrt (typeof pi) "number")

      (asrtDeep pair (array 42 "foo"))
      (asrt (typeof pair) "object")

      (let ((a : number 10)
            (b : string "world"))
        (asrt a 10)
        (asrt (typeof a) "number")
        (asrt b "world")
        (asrt (typeof b) "string"))

      (const ((flag : boolean true))
        (asrt flag true)
        (asrt (typeof flag) "boolean"))
  )
`);
}, 30_000);
