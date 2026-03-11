/**
 * Acceptance tests for Phase 2 — (export <decl>) inline declaration export
 * These tests will fail until the exportDeclForm grammar rule, the 'decl' nonterminal,
 * and the export-decl AST/lower/codegen path are implemented.
 *
 * Syntax: (export (def ...))         → export const name = expr;
 *         (export (class ...))       → export class Name { ... }
 *         (export (interface ...))   → export interface Name { ... }
 *         (export (type ...))  → export type Name = T;
 *
 * The export keyword does not affect runtime semantics. Tests verify the
 * declaration is still usable in the same file after being exported.
 */
import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('export decl — export a def (constant)', () => {
    // (export (const PI 3.14)) emits: export const PI = 3.14;
    // PI is still accessible in the same file.
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (const PI 3.14))
        (asrt PI 3.14)
    )`);
}, 30_000);

it('export decl — export a def (fn)', () => {
    // (export (const double (lambda ((x)) (return (* x 2))))) emits:
    //   export const double = (x) => { return x * 2; };
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (const double (lambda ((x)) (return (* x 2)))))
        (asrt (double 7) 14)
    )`);
}, 30_000);

it('export decl — export a class', () => {
    // (export (class Counter ...)) emits: export class Counter { ... }
    // Counter is still instantiable in the same file.
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (class Counter
            (class-body
                (field (n : number) 0)
                (method inc () (returns number)
                    (set! (. this n) (+ (. this n) 1))
                    (return (. this n))))))
        (let (c) (new Counter))
        (asrt ((. c inc)) 1)
        (asrt ((. c inc)) 2)
    )`);
}, 30_000);

it('export decl — export an interface', () => {
    // (export (interface IPoint ...)) emits: export interface IPoint { ... }
    // The interface is still usable as a type annotation in the same file.
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (interface IPoint (Object (x number) (y number))))
        (let (p : IPoint) (object (x 3) (y 4)))
        (asrt (. p x) 3)
        (asrt (. p y) 4)
    )`);
}, 30_000);

it('export decl — export a type alias', () => {
    // (export (type Meters number)) emits:
    //   export type Meters = number;
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (type Meters number))
        (let (d : Meters) 42)
        (asrt d 42)
    )`);
}, 30_000);

it('export decl — export a function declaration (fn)', () => {
    // (export (fn double ((x)) (return (* x 2)))) emits:
    //   export function double(x) { return x * 2; }
    // The function is still callable in the same file.
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (fn double ((x)) (return (* x 2))))
        (asrt (double 7) 14)
    )`);
}, 30_000);

it('export decl — exported function with multiple params', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (fn add ((a) (b)) (return (+ a b))))
        (asrt (add 3 4) 7)
        (asrt (add "foo" "bar") "foobar")
    )`);
}, 30_000);

it('export decl — exported function with return type annotation', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        (export (fn greet ((name : string)) : string
            (return (+ "Hello, " name "!"))))
        (asrt (greet "world") "Hello, world!")
    )`);
}, 30_000);
