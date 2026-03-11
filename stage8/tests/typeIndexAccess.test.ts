import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeIndexAccess end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; IndexType<T, K extends keyof T> = T[K]
        (type IndexType (type-params (T) (K (extends (keyof T)))) (index T K))
        ;; IndexType<{name~string,age~number}, "name"> resolves to string
        (let (obj) (object (name "alice") (age 30)))
        (let (n : (IndexType (obj (name string) (age number)) (tlit "name"))) (. obj name))
        (asrt n "alice")
        (asrt (typeof n) "string")
        ;; IndexType<{name~string,age~number}, "age"> resolves to number
        (let (a : (IndexType (obj (name string) (age number)) (tlit "age"))) (. obj age))
        (asrt a 30)
        (asrt (typeof a) "number")
    )`);
}, 30_000);
