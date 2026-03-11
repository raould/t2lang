import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('letStar.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      ;; let* with multiple bindings and body
      (let* ((x 10)
            (y 20)
            (z (+ x y)))
        (asrt z 30))

      ;; let* with undefined init
      (let* ((a undefined))
        (set! a 42)
        (asrt a 42))
  )
`);
}, 30_000);
