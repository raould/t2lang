import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('def.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; top-level constant definition
    (const (x) 42)
    (const (greeting) "hello")
    (const (pi) 3.14)
    (asrt x 42)
    (asrt greeting "hello")
    (asrt pi 3.14)
  )
`);
}, 30_000);
