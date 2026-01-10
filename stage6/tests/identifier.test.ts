import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('identifier.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")
    (let (x) 42)
    (let (myVar) "hello")

    ;; identifier references
    (asrt x 42)
    (asrt myVar "hello")
  )
`);
}, 30_000);
