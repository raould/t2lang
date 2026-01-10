import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — extends with super constructor call', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; Animal: base class with constructor and method
        (class Animal
            (class-body
                (field name : string)
                (constructor ((name : string))
                    (set! (. this name) name))
                (method speak () (returns string)
                    (return (. this name)))))
        ;; Dog: subclass that calls super constructor and super method
        (class Dog
            (extends Animal)
            (class-body
                (constructor ((name : string))
                    (super name))
                (method speak () (returns string)
                    (return (+ (super-method speak) " barks")))))
        (let (d) (new Dog "Rex"))
        (asrt ((. d speak)) "Rex barks")
        (asrt (. d name) "Rex")
    )`);
}, 30_000);

it('class — :override method with super-method call', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; Base: plain method
        (class Base
            (class-body
                (method describe () (returns string)
                    (return "base"))))
        ;; Child: overrides describe, prepends super result
        (class Child
            (extends Base)
            (class-body
                (method :override describe () (returns string)
                    (return (+ (super-method describe) "+child")))))
        (let (c) (new Child))
        (asrt ((. c describe)) "base+child")
    )`);
}, 30_000);

it('class — super method call with arguments', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        ;; Calculator base
        (class Calculator
            (class-body
                (method add ((a : number) (b : number)) (returns number)
                    (return (+ a b)))))
        ;; LoggingCalculator: overrides add, calls super.add
        (class LoggingCalculator
            (extends Calculator)
            (class-body
                (method :override add ((a : number) (b : number)) (returns number)
                    (return (* 2 (super-method add a b))))))
        (let (lc) (new LoggingCalculator))
        (asrt ((. lc add) 3 4) 14)
    )`);
}, 30_000);

it('class — two-level inheritance chain', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class A
            (class-body
                (field x : number)
                (constructor ((x : number))
                    (set! (. this x) x))
                (method val () (returns number)
                    (return (. this x)))))
        (class B
            (extends A)
            (class-body
                (constructor ((x : number))
                    (super x))
                (method val () (returns number)
                    (return (+ (super-method val) 10)))))
        (class C
            (extends B)
            (class-body
                (constructor ((x : number))
                    (super x))
                (method val () (returns number)
                    (return (+ (super-method val) 100)))))
        (let (c) (new C 5))
        (asrt ((. c val)) 115)
    )`);
}, 30_000);
