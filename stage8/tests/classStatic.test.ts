import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class — static field with initializer', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; static counter tracks how many instances were created
        (class Widget
            (class-body
                (field static (count : number) 0)
                (constructor ()
                    (set! (. Widget count) (+ (. Widget count) 1)))))
        (new Widget)
        (new Widget)
        (new Widget)
        (asrt (. Widget count) 3)
    )`);
}, 30_000);

it('class — static method', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class MathUtils
            (class-body
                (method static square ((n : number)) (returns number)
                    (return (* n n)))
                (method static cube ((n : number)) (returns number)
                    (return (* n (* n n))))))
        (asrt ((. MathUtils square) 5) 25)
        (asrt ((. MathUtils cube) 3) 27)
    )`);
}, 30_000);

it('class — static method reading static field', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class Registry
            (class-body
                (field private static (items : number) 0)
                (method public static register ()
                    (set! (. Registry items) (+ (. Registry items) 1)))
                (method public static getCount () (returns number)
                    (return (. Registry items)))))
        ((. Registry register))
        ((. Registry register))
        (asrt ((. Registry getCount)) 2)
    )`);
}, 30_000);

it('class — static and instance members coexist', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (class IdGen
            (class-body
                (field private static (nextId : number) 1)
                (field private (id : number))
                (constructor ()
                    (set! (. this id) (. IdGen nextId))
                    (set! (. IdGen nextId) (+ (. IdGen nextId) 1)))
                (method public getId () (returns number)
                    (return (. this id)))
                (method public static peekNextId () (returns number)
                    (return (. IdGen nextId)))))
        (let (a) (new IdGen))
        (let (b) (new IdGen))
        (let (c) (new IdGen))
        (asrt ((. a getId)) 1)
        (asrt ((. b getId)) 2)
        (asrt ((. c getId)) 3)
        (asrt ((. IdGen peekNextId)) 4)
    )`);
}, 30_000);
