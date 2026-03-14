import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('defn — basic function declaration', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (defn square ((x)) (return (* x x)))
        (asrt (square 5) 25)
        (asrt (square 0) 0)
    )`);
}, 30_000);

it('defn — multiple params', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (defn add ((a) (b)) (return (+ a b)))
        (asrt (add 1 2) 3)
        (asrt (add 10 20) 30)
    )`);
}, 30_000);

it('defn — with typed params and return type', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (defn repeat ((s : string) (n : number)) : string
            (return ((. s repeat) n)))
        (asrt (repeat "ab" 3) "ababab")
    )`);
}, 30_000);

it('defn — multi-statement body', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (defn clamp ((v) (lo) (hi))
            (if (< v lo) (return lo))
            (if (> v hi) (return hi))
            (return v))
        (asrt (clamp 5 0 10) 5)
        (asrt (clamp -1 0 10) 0)
        (asrt (clamp 99 0 10) 10)
    )`);
}, 30_000);

it('defn — function declarations are hoisted', () => {
    // Unlike const, function declarations are hoisted — can call before definition.
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (asrt (double 4) 8)
        (defn double ((x)) (return (* x 2)))
    )`);
}, 30_000);
