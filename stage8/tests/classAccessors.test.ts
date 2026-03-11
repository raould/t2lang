import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — basic getter and setter', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Box
            (class-body
                (field (_v : number))
                (constructor ((v : number))
                    (set! (. this _v) v))
                (get value () (returns number)
                    (return (. this _v)))
                (set value ((n : number))
                    (set! (. this _v) n))))
        (let (b) (new Box 10))
        (asrt (. b value) 10)
        (set! (. b value) 42)
        (asrt (. b value) 42)
    )`);
}, 30_000);

it('class — getter derived from multiple fields', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Rect
            (class-body
                (field (width : number))
                (field (height : number))
                (constructor ((w : number) (h : number))
                    (set! (. this width) w)
                    (set! (. this height) h))
                (get area () (returns number)
                    (return (* (. this width) (. this height))))
                (get perimeter () (returns number)
                    (return (* 2 (+ (. this width) (. this height)))))))
        (let (r) (new Rect 5 3))
        (asrt (. r area) 15)
        (asrt (. r perimeter) 16)
        (set! (. r width) 10)
        (asrt (. r area) 30)
    )`);
}, 30_000);

it('class — setter with clamping logic', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Clamp
            (class-body
                (field (_pct : number) 0)
                (get pct () (returns number)
                    (return (. this _pct)))
                (set pct ((v : number))
                    (if (< v 0) (set! (. this _pct) 0))
                    (if (> v 100) (set! (. this _pct) 100))
                    (if (&& (>= v 0) (<= v 100)) (set! (. this _pct) v)))))
        (let (c) (new Clamp))
        (set! (. c pct) 50)
        (asrt (. c pct) 50)
        (set! (. c pct) -10)
        (asrt (. c pct) 0)
        (set! (. c pct) 200)
        (asrt (. c pct) 100)
    )`);
}, 30_000);

it('class — getter override calling super getter via (. super prop)', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; (. super label) emits super.label — pure property access, no call parens
        (class Base
            (class-body
                (get label () (returns string)
                    (return "base"))))
        (class Child
            (extends Base)
            (class-body
                (get override label () (returns string)
                    (return (+ (. super label) "+child")))))
        (let (b) (new Base))
        (let (c) (new Child))
        (asrt (. b label) "base")
        (asrt (. c label) "base+child")
    )`);
}, 30_000);

it('class — getter and setter with inheritance', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; Base stores a number; subclass overrides getter to double it
        (class Base
            (class-body
                (field (_n : number))
                (constructor ((n : number))
                    (set! (. this _n) n))
                (get value () (returns number)
                    (return (. this _n)))
                (set value ((n : number))
                    (set! (. this _n) n))))
        (class Doubled
            (extends Base)
            (class-body
                (constructor ((n : number))
                    (super n))
                (get override value () (returns number)
                    (return (* 2 (. this _n))))))
        (let (b) (new Base 5))
        (let (d) (new Doubled 5))
        (asrt (. b value) 5)
        (asrt (. d value) 10)
        (set! (. b value) 7)
        (asrt (. b value) 7)
    )`);
}, 30_000);
