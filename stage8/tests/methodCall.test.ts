import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('methodCall end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; method-call: explicit receiver-bound invocation
        (let (arr) (array 1 2 3))
        (method-call arr push 4)
        (asrt (. arr length) 4)
        (asrt (index arr 3) 4)
        ;; method-call on string — uses identifier as method name
        (let (s) "hello world")
        (asrt (method-call s toUpperCase) "HELLO WORLD")
        ;; method-call with multiple args
        (asrt (method-call s slice 0 5) "hello")
    )`);
}, 30_000);
