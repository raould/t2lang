import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeArray end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let (x : (type-array number)) (array 1 2 3))
        (asrt ((. Array isArray) x) true)
        (asrt (. x length) 3)
        (asrt (index x 0) 1)
        (asrt (index x 2) 3)
    )`);
}, 30_000);
