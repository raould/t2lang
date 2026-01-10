import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('fn end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; fn: regular function expression — has own this, is constructible
        (def add (fn ((a) (b)) (return (+ a b))))
        (asrt (add 2 3) 5)
        (asrt (typeof add) "function")
        ;; fn called immediately (IIFE-style)
        (let (result) ((fn ((x)) (return (* x x))) 7))
        (asrt result 49)
        ;; fn is constructible (can use new)
        (def Greeter (fn ((name))
            (set! (. this name) name)))
        (let (g) (new Greeter "world"))
        (asrt (. g name) "world")
    )`);
}, 30_000);
