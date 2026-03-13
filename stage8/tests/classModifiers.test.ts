import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — private field accessed through public methods', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; TypeScript private is compile-time only; at runtime the field is accessible
        (class BankAccount
            (class-body
                (field private (balance : number) 0)
                (method public deposit ((amount : number))
                    (set! (. this balance) (+ (. this balance) amount)))
                (method public getBalance () (returns number)
                    (return (. this balance)))))
        (let (acc) (new BankAccount))
        (asrt ((. acc getBalance)) 0)
        ((. acc deposit) 100)
        ((. acc deposit) 50)
        (asrt ((. acc getBalance)) 150)
    )`);
}, 30_000);

it('class — readonly field set once in constructor', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Point
            (class-body
                (field readonly (x : number))
                (field readonly (y : number))
                (constructor ((x : number) (y : number))
                    (set! (. this x) x)
                    (set! (. this y) y))
                (method public distSq () (returns number)
                    (return (+ (* (. this x) (. this x)) (* (. this y) (. this y)))))))
        (let (p) (new Point 3 4))
        (asrt (. p x) 3)
        (asrt (. p y) 4)
        (asrt ((. p distSq)) 25)
    )`);
}, 30_000);

it('class — getter and setter', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Box
            (class-body
                (field private (_v : number))
                (constructor ((v : number))
                    (set! (. this _v) v))
                (get public value () (returns number)
                    (return (. this _v)))
                (set public value ((n : number))
                    (set! (. this _v) n))))
        (let (b) (new Box 10))
        (asrt (. b value) 10)
        (set! (. b value) 20)
        (asrt (. b value) 20)
    )`);
}, 30_000);

it('class — getter and setter inherited with override', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Temperature
            (class-body
                (field protected (_celsius : number))
                (constructor ((c : number))
                    (set! (. this _celsius) c))
                (get celsius () (returns number)
                    (return (. this _celsius)))
                (set celsius ((v : number))
                    (set! (. this _celsius) v))
                (get fahrenheit () (returns number)
                    (return (+ (* (. this _celsius) 1.8) 32)))))
        (let (t) (new Temperature 100))
        (asrt (. t celsius) 100)
        (asrt (. t fahrenheit) 212)
        (set! (. t celsius) 0)
        (asrt (. t fahrenheit) 32)
    )`);
}, 30_000);
