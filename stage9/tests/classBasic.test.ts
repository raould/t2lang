import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — field with initializer and methods via this', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Counter: field with numeric initializer, inc/getCount using (set! (. this x) ...)
        (class Counter
            (class-body
                (field (count : number) 0)
                (method inc ()
                    (set! (. this count) (+ (. this count) 1)))
                (method getCount () : number
                    (return (. this count)))))
        (let ((c (new Counter))))
        (asrt ((. c getCount)) 0)
        ((. c inc))
        ((. c inc))
        (asrt ((. c getCount)) 2)
    )`);
}, 30_000);

it('class — typed constructor sets field, method returns computed string', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Greeter: constructor param stored in this.name, method uses this.name
        (class Greeter
            (class-body
                (field (name : string))
                (constructor ((name : string))
                    (set! (. this name) name))
                (method greet () : string
                    (return (+ "hello, " (. this name))))))
        (let ((g (new Greeter "world"))))
        (asrt (. g name) "world")
        (asrt ((. g greet)) "hello, world")
    )`);
}, 30_000);

it('class — multiple fields set from constructor params', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Point: two typed fields, constructor assigns both from params
        (class Point
            (class-body
                (field (x : number))
                (field (y : number))
                (constructor ((x : number) (y : number))
                    (set! (. this x) x)
                    (set! (. this y) y))
                (method sumXY () : number
                    (return (+ (. this x) (. this y))))))
        (let ((p (new Point 3 4))))
        (asrt (. p x) 3)
        (asrt (. p y) 4)
        (asrt ((. p sumXY)) 7)
    )`);
}, 30_000);

it('class — generic type parameter', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Wrapper<T>: generic field val, constructor stores it, getValue returns it
        (class Wrapper
            (type-params (T))
            (class-body
                (field (val : T))
                (constructor ((val : T))
                    (set! (. this val) val))
                (method getValue () : T
                    (return (. this val)))))
        (let ((w (new Wrapper 99))))
        (asrt ((. w getValue)) 99)
        (let ((s (new Wrapper "hi"))))
        (asrt ((. s getValue)) "hi")
    )`);
}, 30_000);
