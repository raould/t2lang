import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('type-as end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    ;; basic type assertion: number as unknown then back
    (let (x : number) 42)
    (let (y) (type-as x unknown))
    (asrt (type-as y number) 42)

    ;; type-as with string
    (let (raw) (type-as "hello" unknown))
    (asrt (type-as raw string) "hello")

    ;; type-as with union type
    (let (val : (union string number)) "hi")
    (asrt (type-as val string) "hi")

    ;; type-as on a property access
    (let (obj) (object (n 99)))
    (asrt (type-as (. obj n) number) 99)

    ;; type-as as unknown (common pattern)
    (let (a) (type-as true unknown))
    (asrt (type-as a boolean) true)
  )`);
}, 30_000);
