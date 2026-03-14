import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeKeyof end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Keys<T> = keyof T
        (type Keys (type-params (T)) (keyof T))
        ;; Keys<{a~number,b~string}> = "a" | "b"
        ;; annotate a variable with that key type and check the value
        (let (k : (type-app Keys (obj (a number) (b string)))) "a")
        (asrt k "a")
        (asrt (typeof k) "string")
    )`);
}, 30_000);
