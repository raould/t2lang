/**
 * Acceptance tests for Phase 3 — (export-default (class ...)) and
 * (export-default (def name (lambda ...)))
 *
 * These tests will fail until:
 *   - Stage 3E is patched to support anonymous classes (anonClassDef)
 *   - Stage 3F extends exportDefault to accept classDef / anonClassDef / def
 *   - The lowering pass performs declaration lifting for (def name (lambda ...))
 *
 * Syntax:
 *   (export-default (class Name (class-body ...)))   → export default class Name { ... }
 *   (export-default (class (class-body ...)))        → export default class { ... }
 *   (export-default (def name (lambda ...)))         → export default function name(...) { ... }
 *
 * Note: (export-default (def name non-function)) must produce a compile-time error.
 * That case is NOT tested here because a compile-time error would fail the test runner.
 */
import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('export-default — named class declaration', () => {
    // (export-default (class Greeter ...)) emits:
    //   export default class Greeter { ... }
    // The class is still instantiable in the same file (default export does not
    // prevent local use).
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (export-default (class Greeter
            (class-body
                (field name : string)
                (constructor ((n : string))
                    (set! (. this name) n))
                (method greet () (returns string)
                    (return (+ "hello " (. this name)))))))
        (let (g) (new Greeter "world"))
        (asrt ((. g greet)) "hello world")
    )`);
}, 30_000);

it('export-default — anonymous class declaration', () => {
    // (export-default (class (class-body ...))) emits:
    //   export default class { ... }
    // Anonymous class — no name token after 'class'.
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (export-default (class
            (class-body
                (field value : number 0)
                (method getValue () (returns number)
                    (return (. this value))))))
        (asrt 1 1)
    )`);
}, 30_000);

it('export-default — function declaration (declaration lifting)', () => {
    // (export-default (def add (lambda ((a) (b)) (return (+ a b))))) emits:
    //   export default function add(a, b) { return a + b; }
    //
    // This is the only place Stage 3F performs a semantic transformation:
    // the lambda is lifted into a named function declaration.
    // The function is still callable locally in the same file.
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (export-default (def add (lambda ((a) (b)) (return (+ a b)))))
        (asrt (add 3 4) 7)
    )`);
}, 30_000);

it('export-default — class with extends', () => {
    // Verifies that (export-default (class Child (extends Base) ...)) works
    // with an inheritance chain — class body lowering must still apply.
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (class Base
            (class-body
                (method name () (returns string)
                    (return "base"))))
        (export-default (class Child
            (extends Base)
            (class-body
                (method :override name () (returns string)
                    (return "child")))))
        (let (c) (new Child))
        (asrt ((. c name)) "child")
    )`);
}, 30_000);
