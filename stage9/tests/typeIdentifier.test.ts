import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeIdentifier end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let (x : number) 0)
        (asrt x 0)
        (asrt (typeof x) "number")
    )`);
}, 30_000);
