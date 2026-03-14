import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class - method using this', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Foo (class-body
            (constructor ((public x: number)))
            (method m () (return this.x))
        ))
        (let* ((f (new Foo 42)))
            (asrt (. f x) 42)
            (asrt (f.m) 42))
    )`);
});

it('class - full shorthand', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Foo (class-body
            (constructor ((public x: number)))
        ))
        (let* ((f (new Foo 42)))
            (asrt (. f x) 42))
    )`);
});

it('class — basic constructor and field access', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Foo (class-body (field (x)) (constructor ((x : number)) (set! (. this x) x))))
        (let (f) (new Foo 42))
        (asrt (. f x) 42)
    )`);
});

it('class — method with this access', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Greeter (class-body
            (field (name))
            (constructor ((name : string)) (set! (. this name) name))
            (method greet () (returns string) (return (+ "hello, " (. this name))))))
        (let (g) (new Greeter "world"))
        (asrt ((. g greet)) "hello, world")
    )`);
});

it('class — static method', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class MathUtils (class-body
        (method static square ((n : number)) (returns number) (return (* n n)))))
        (asrt ((. MathUtils square) 7) 49)
    )`);
});

it('class — getter and setter', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Box (class-body
            (field (_v))
            (constructor ((v : number)) (set! (. this _v) v))
            (get value () (returns number) (return (. this _v)))
            (set value ((n : number)) (set! (. this _v) n))))
        (let (b) (new Box 10))
        (asrt (. b value) 10)
        (set! (. b value) 20)
        (asrt (. b value) 20)
    )`);
});

it('class — extends with super constructor call', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Animal (class-body
            (field (name))
            (constructor ((name : string)) (set! (. this name) name))
            (method speak () (returns string) (return (. this name)))))
        (class Dog (extends Animal) (class-body
            (constructor ((name : string)) (super name))
            (method speak () (returns string) (return (+ (super-method speak) " barks")))))
        (let (d) (new Dog "Rex"))
        (asrt ((. d speak)) "Rex barks")
    )`);
});

it('class — super method call in overridden method', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Base (class-body
            (method describe () (returns string) (return "base"))))
        (class Child (extends Base) (class-body
            (method override describe () (returns string)
                (return (+ (super-method describe) "+child")))))
        (let (c) (new Child))
        (asrt ((. c describe)) "base+child")
    )`);
});

it('class — implements interface', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (interface Printable (Object (print (tfn () string))))
            (class Doc (implements Printable) (class-body
            (method print () (returns string) (return "document"))))
        (let (d) (new Doc))
        (asrt ((. d print)) "document")
    )`);
});

it('class — generic type parameter', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Wrapper (type-params (T)) (class-body
            (field (val : T))
            (constructor ((val : T)) (set! (. this val) val))
            (method getv () (returns T) (return (. this val)))))
        (let (wn : (type-app Wrapper number)) (new Wrapper 99))
        (asrt ((. wn getv)) 99)
        (let (ws : (type-app Wrapper string)) (new Wrapper "99"))
        (asrt ((. ws getv)) "99")
    )`);
});

it('class — field with default initializer', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Counter (class-body
            (field (count : number) 0)
            (method inc () (set! (. this count) (+ (. this count) 1)))
            (method get () (returns number) (return (. this count)))))
        (let (c) (new Counter))
        (asrt ((. c get)) 0)
        ((. c inc))
        (asrt ((. c get)) 1)
    )`);
});
it('this.prop dotted sugar — read and call', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Counter (class-body
            (field (count : number) 0)
            (method inc ()
                (set! (. this count) (+ this.count 1)))
            (method get () (returns number)
                (return this.count))
            (method double () (returns number)
                (return (* this.count 2)))
        ))
        (let (c) (new Counter))
        (c.inc)
        (c.inc)
        (asrt (c.get) 2)
        (asrt (c.double) 4)
    )`);
});

it('this.method dotted sugar — zero-arg method call via this chain', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Wrapper (class-body
            (field (val : number) 10)
            (method inner () (returns number) (return this.val))
            (method outer () (returns number) (return (this.inner)))
        ))
        (let (w) (new Wrapper))
        (asrt (w.outer) 10)
    )`);
});

it('this.a.b chained dotted sugar inside method', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Nested (class-body
            (field (data) { value: 42 })
            (method getValue () (return this.data.value))
        ))
        (let (n) (new Nested))
        (asrt (n.getValue) 42)
    )`);
});

it('dotted set! — this.prop write sugar', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (class Counter (class-body
            (field (count : number) 0)
            (field (size : number) 5)
            (method inc ()
                (if (< this.count this.size)
                    (then (set! this.count (+ this.count 1)))))
            (method get () (returns number) (return this.count))
        ))
        (let (c) (new Counter))
        (c.inc) (c.inc) (c.inc)
        (asrt (c.get) 3)
    )`);
});

it('dotted set! — plain object property write sugar', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let (obj) { x: 1, y: 2 })
        (set! obj.x 99)
        (set! obj.y (+ obj.x 1))
        (asrt obj.x 99)
        (asrt obj.y 100)
    )`);
});

it('dotted set! — chained path a.b.c write sugar', { timeout: 15000 }, () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let (obj) { a: { b: 0 } })
        (set! obj.a.b 42)
        (asrt obj.a.b 42)
    )`);
});
