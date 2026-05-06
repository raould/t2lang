import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — implements single interface', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (interface Greetable (Object (greet (tfn () string))))
        (class Hello
            (implements Greetable)
            (class-body
                (method greet () : string
                    (return "hello"))))
        (let ((h (new Hello))))
        (asrt ((. h greet)) "hello")
    )`);
}, 30_000);

it('class — implements multiple interfaces', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (interface HasName (Object (name string)))
        (interface HasAge (Object (age number)))
        (class Person
            (implements HasName HasAge)
            (class-body
                (field (name : string))
                (field (age : number))
                (constructor ((n : string) (a : number))
                    (set! (. this name) n)
                    (set! (. this age) a))))
        (let ((p (new Person "Alice" 30))))
        (asrt (. p name) "Alice")
        (asrt (. p age) 30)
    )`);
}, 30_000);

it('class — extends and implements', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (interface Describable (Object (describe (tfn () string))))
        (class Animal
            (class-body
                (field (name : string))
                (constructor ((n : string))
                    (set! (. this name) n))
                (method speak () : string
                    (return (+ (. this name) " speaks")))))
        (class Dog
            (extends Animal)
            (implements Describable)
            (class-body
                (constructor ((n : string))
                    (super n))
                (method describe () : string
                    (return (+ "Dog: " (. this name))))))
        (let ((d (new Dog "Rex"))))
        (asrt ((. d speak)) "Rex speaks")
        (asrt ((. d describe)) "Dog: Rex")
    )`);
}, 30_000);

it('class — abstract class implementing interface', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (interface Shape (Object (area (tfn () number))))
        (class abstract AbstractShape
            (implements Shape)
            (class-body
                (abstract-method public area () : number)))
        (class Circle
            (extends AbstractShape)
            (class-body
                (field (r : number))
                (constructor ((radius : number))
                    (super)
                    (set! (. this r) radius))
                (method public override area () : number
                    (return (* 3 (* (. this r) (. this r)))))))
        (let ((c (new Circle 5))))
        (asrt ((. c area)) 75)
    )`);
}, 30_000);
