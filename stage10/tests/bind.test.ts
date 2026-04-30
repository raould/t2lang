import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('bind end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; bind fixes this to a specific object
        (const (greet) (fn ((msg)) (return (+ msg ", " (. this name)))))
        (let ((obj (object (name "Alice")))))
        (let ((boundGreet (bind greet obj))))
        (asrt (boundGreet "Hello") "Hello, Alice")
        ;; bind with pre-filled extra args
        (const (addThree) (fn ((a) (b) (c)) (return (+ a (+ b c)))))
        (let ((add10 (bind addThree undefined 10))))
        (asrt (add10 1 2) 13)
    )`);
}, 30_000);
