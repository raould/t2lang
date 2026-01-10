import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeApplication end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; Foo<T> = T (identity type alias)
        (type Foo (type-params T) T)
        (let (x : (Foo number)) 42)
        (asrt x 42)
        (asrt (typeof x) "number")
        ;; Foo applied to string
        (let (s : (Foo string)) "hello")
        (asrt s "hello")
        (asrt (typeof s) "string")
    )`);
}, 30_000);
