import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeLiteral end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; literal string type "foo"
        (let (x : (tlit "foo")) "foo")
        (asrt x "foo")
        (asrt (typeof x) "string")
        ;; literal number type 42
        (let (n : (tlit 42)) 42)
        (asrt n 42)
        (asrt (typeof n) "number")
        ;; literal boolean type true
        (let (b : (tlit true)) true)
        (asrt b true)
        (asrt (typeof b) "boolean")
    )`);
}, 30_000);
