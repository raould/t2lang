import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — basic constructor and field access', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Foo (class-body (field x) (constructor ((x : number)) (set! (. this x) x))))
        (let (f) (new Foo 42))
        (asrt (. f x) 42)
    )`);
});

it('class — method with this access', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Greeter (class-body
            (field name)
            (constructor ((name : string)) (set! (. this name) name))
            (method greet () (returns string) (return (+ "hello, " (. this name))))))
        (let (g) (new Greeter "world"))
        (asrt ((. g greet)) "hello, world")
    )`);
});

it('class — static method', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class MathUtils (class-body
        (method :static square ((n : number)) (returns number) (return (* n n)))))
        (asrt ((. MathUtils square) 7) 49)
    )`);
});

it('class — getter and setter', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Box (class-body
            (field _v)
            (constructor ((v : number)) (set! (. this _v) v))
            (get value () (returns number) (return (. this _v)))
            (set value ((n : number)) (set! (. this _v) n))))
        (let (b) (new Box 10))
        (asrt (. b value) 10)
        (set! (. b value) 20)
        (asrt (. b value) 20)
    )`);
});

it('class — extends with super constructor call', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Animal (class-body
            (field name)
            (constructor ((name : string)) (set! (. this name) name))
            (method speak () (returns string) (return (. this name)))))
        (class Dog (extends Animal) (class-body
            (constructor ((name : string)) (super name))
            (method speak () (returns string) (return (+ (super-method speak) " barks")))))
        (let (d) (new Dog "Rex"))
        (asrt ((. d speak)) "Rex barks")
    )`);
});

it('class — super method call in overridden method', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Base (class-body
            (method describe () (returns string) (return "base"))))
        (class Child (extends Base) (class-body
            (method :override describe () (returns string)
                (return (+ (super-method describe) "+child")))))
        (let (c) (new Child))
        (asrt ((. c describe)) "base+child")
    )`);
});

it('class — implements interface', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (interface Printable (Object (print (tfn () string))))
            (class Doc (implements Printable) (class-body
            (method print () (returns string) (return "document"))))
        (let (d) (new Doc))
        (asrt ((. d print)) "document")
    )`);
});

it('class — generic type parameter', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Wrapper (type-params T) (class-body
            (field val : T)
            (constructor ((val : T)) (set! (. this val) val))
            (method getv () (returns T) (return (. this val)))))
        (let (wn : (Wrapper number)) (new Wrapper 99))
        (asrt ((. wn getv)) 99)
        (let (ws : (Wrapper string)) (new Wrapper "99"))
        (asrt ((. ws getv)) "99")
    )`);
});

it.todo('class — field with default initializer', () => {
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Counter (class-body
            (field count : number 0)
            (method inc () (set! (. this count) (+ (. this count) 1)))
            (method get () (returns number) (return (. this count)))))
        (let (c) (new Counter))
        (asrt ((. c get)) 0)
        ((. c inc))
        (asrt ((. c get)) 1)
    )`);
});