import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTuple end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; tuple type: [number, string]
        (let (x : (tuple number string)) (array 1 "hello"))
        (asrt (index x 0) 1)
        (asrt (index x 1) "hello")
        (asrt (typeof (index x 0)) "number")
        (asrt (typeof (index x 1)) "string")
    )`);
}, 30_000);
