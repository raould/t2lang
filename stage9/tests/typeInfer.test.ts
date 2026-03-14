import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeInfer end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; UnpackArray<T> = T extends Array<infer U> ? U : never
        (type UnpackArray (type-params (T)) (cond T (type-app Array (infer U)) U never))
        ;; UnpackArray<string[]> resolves to string
        (let (s : (type-app UnpackArray (type-array string))) "hello")
        (asrt s "hello")
        (asrt (typeof s) "string")
        ;; UnpackArray<number[]> resolves to number
        (let (n : (type-app UnpackArray (type-array number))) 42)
        (asrt n 42)
        (asrt (typeof n) "number")
    )`);
}, 30_000);
