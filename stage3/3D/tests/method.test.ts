import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('method end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; method shorthand in object literal — dynamic this binding
        (let (counter)
            (object
                (count 0)
                (inc (method () (set! (. this count) (+ (. this count) 1))))
                (get (method () (return (. this count))))))
        ((. counter inc))
        ((. counter inc))
        (asrt ((. counter get)) 2)
        ;; method with parameters
        (let (calc)
            (object
                (value 10)
                (add (method ((n)) (return (+ (. this value) n))))))
        (asrt ((. calc add) 5) 15)
    )`);
}, 30_000);
