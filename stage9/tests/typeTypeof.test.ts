import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTypeof end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; typeof foo captures the type of foo (number in this case)
        (let (foo) 42)
        (let (x : (typeof foo)) 99)
        (asrt x 99)
        (asrt (typeof x) "number")
        ;; typeof works with string values too
        (let (bar) "hello")
        (let (y : (typeof bar)) "world")
        (asrt y "world")
        (asrt (typeof y) "string")
    )`);
}, 30_000);
