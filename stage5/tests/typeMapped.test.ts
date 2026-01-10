import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeMapped end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; Mapped<T> = { [K in keyof T]: T[K] } (identity copy of all properties)
        (type Mapped (type-params T) (mapped K (keyof T) (index T K)))
        ;; Use a named alias to avoid grammar ambiguity
        (type Point (obj (x number) (y string)))
        ;; A value of type Mapped<Point> has same fields as Point
        (let (pt : (Mapped Point)) (object (x 10) (y "hello")))
        (asrt (. pt x) 10)
        (asrt (. pt y) "hello")
    )`);
}, 30_000);
