import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeConditional end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; CondType<T> = T extends string ? number : string
        (type CondType (type-params T) (cond T string number string))
        ;; CondType<string> resolves to number
        (let (a : (CondType string)) 42)
        (asrt (typeof a) "number")
        ;; CondType<boolean> resolves to string
        (let (b : (CondType boolean)) "fallback")
        (asrt (typeof b) "string")
    )`);
}, 30_000);
