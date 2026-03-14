import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — abstract class with concrete subclass', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; Abstract base: declares abstract area() and concrete describe()
        (class abstract Shape
            (class-body
                (abstract-method public area () (returns number))
                (method public describe () (returns string)
                    (return (+ "area=" (+ ((. this area)) ""))))))
        ;; Concrete subclass: implements area
        (class Circle
            (extends Shape)
            (class-body
                (field private (r : number))
                (constructor ((r : number))
                    (super)
                    (set! (. this r) r))
                (method public override area () (returns number)
                    (return (* (. this r) (. this r))))))
        (let (c) (new Circle 5))
        (asrt ((. c area)) 25)
        (asrt ((. c describe)) "area=25")
    )`);
}, 30_000);

it('class — abstract class with multiple concrete subclasses', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class abstract Animal
            (class-body
                (abstract-method public sound () (returns string))
                (method public greet () (returns string)
                    (return (+ "I say: " ((. this sound)))))))
        (class Dog
            (extends Animal)
            (class-body
                (method public override sound () (returns string)
                    (return "woof"))))
        (class Cat
            (extends Animal)
            (class-body
                (method public override sound () (returns string)
                    (return "meow"))))
        (let (d) (new Dog))
        (let (c) (new Cat))
        (asrt ((. d sound)) "woof")
        (asrt ((. c sound)) "meow")
        (asrt ((. d greet)) "I say: woof")
        (asrt ((. c greet)) "I say: meow")
    )`);
}, 30_000);

it('class — abstract method with parameters', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class abstract Transformer
            (class-body
                (abstract-method public transform ((n : number)) (returns number))
                (method public applyTwice ((n : number)) (returns number)
                    (return ((. this transform) ((. this transform) n))))))
        (class Doubler
            (extends Transformer)
            (class-body
                (method public override transform ((n : number)) (returns number)
                    (return (* n 2)))))
        (let (d) (new Doubler))
        (asrt ((. d transform) 5) 10)
        (asrt ((. d applyTwice) 3) 12)
    )`);
}, 30_000);
