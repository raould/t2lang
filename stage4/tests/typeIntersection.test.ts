import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeIntersection end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; Intersect<A, B> = A & B
        (type Intersect (type-params A B) (intersect A B))
        ;; Use named aliases to avoid grammar ambiguity with typeObject
        (type HasX (obj (x number)))
        (type HasY (obj (y string)))
        ;; a value of type Intersect<HasX, HasY> must have both x and y
        (let (pt : (Intersect HasX HasY)) (object (x 3) (y "hi")))
        (asrt (. pt x) 3)
        (asrt (. pt y) "hi")
    )`);
}, 30_000);
