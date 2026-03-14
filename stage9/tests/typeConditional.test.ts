import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeConditional end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; CondType<T> = T extends string ? number : string
        (type CondType (type-params (T)) (cond T string number string))
        ;; CondType<string> resolves to number
        (let (a : (type-app CondType string)) 42)
        (asrt (typeof a) "number")
        ;; CondType<boolean> resolves to string
        (let (b : (type-app CondType boolean)) "fallback")
        (asrt (typeof b) "string")
    )`);
}, 30_000);
