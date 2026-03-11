import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeObject end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; object type annotation: { a: number }
        (let (x : (obj (a number))) (object (a 1)))
        (asrt (. x a) 1)
        (asrt (typeof (. x a)) "number")
        ;; multi-field object type: { name: string, age: number }
        (let (p : (obj (name string) (age number))) (object (name "bob") (age 25)))
        (asrt (. p name) "bob")
        (asrt (. p age) 25)
        ;; shorthand
        (let* ((fred "fred")
               (p (object (fred) (age 42))))
            (asrt (. p fred) "fred")
            (asrt (. p age) 42))
    )`);
}, 30_000);
