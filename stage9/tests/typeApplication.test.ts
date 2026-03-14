import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeApplication end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Foo<T> = T (identity type alias)
        (type Foo (type-params (T)) T)
        (let (x : (type-app Foo number)) 42)
        (asrt x 42)
        (asrt (typeof x) "number")
        ;; Foo applied to string
        (let (s : (type-app Foo string)) "hello")
        (asrt s "hello")
        (asrt (typeof s) "string")
    )`);
}, 30_000);
