import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('fn end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; fn: regular function expression — has own this, is constructible
        (const (add) (fn ((a) (b)) (return (+ a b))))
        (asrt (add 2 3) 5)
        (asrt (typeof add) "function")
        ;; fn called immediately (IIFE-style)
        (let ((result ((fn ((x)) (return (* x x))) 7))))
        (asrt result 49)
        ;; fn is constructible (can use new)
        (const (Greeter) (fn ((name))
            (set! (. this name) name)))
        (let ((g (new Greeter "world"))))
        (asrt (. g name) "world")
    )`);
}, 30_000);

it('fn with types end-to-end', () => {
        fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let ((add (fn ((a : number) (b : number)) : string
                    (return (+ (String a) (String b))))))
            (asrt (add 2 3) "23")
            (asrt (typeof (add 2 3)) "string")
        )
    )`);
}, 30_000);

// todo: ...rest with type.
