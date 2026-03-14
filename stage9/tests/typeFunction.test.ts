import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeFunction end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; function type: (a: number) => string
        (let (x : (tfn ((a number)) string)) (lambda ((a)) (return (+ "result " a))))
        (asrt (x 42) "result 42")
        (asrt (typeof x) "function")
        ;; optional param: (b?: number) => string
        (let (y : (tfn ((b ? number)) string)) (lambda ((b)) (return (+ "val " b))))
        (asrt (y 7) "val 7")
    )`);
}, 30_000);
