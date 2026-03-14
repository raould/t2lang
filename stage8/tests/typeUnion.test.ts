import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeUnion end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; union type: number | string — holds either kind of value
        (let (x : (union number string)) 42)
        (asrt x 42)
        (asrt (typeof x) "number")
        (let (y : (union number string)) "hello")
        (asrt y "hello")
        (asrt (typeof y) "string")
    )`);
}, 30_000);
