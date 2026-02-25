import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('def.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")
    ;; top-level constant definition
    (def x 42)
    (def greeting "hello")
    (def pi 3.14)
    (asrt x 42)
    (asrt greeting "hello")
    (asrt pi 3.14)
  )
`);
}, 30_000);
