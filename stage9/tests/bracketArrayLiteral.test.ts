import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('bracketArrayLiteral end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")

      ;; basic array with commas
      (let ((a [1, 2, 3]))
        (asrt (index a 0) 1)
        (asrt (index a 1) 2)
        (asrt (index a 2) 3))

      ;; no commas
      (let ((b [10 20 30]))
        (asrt (. b length) 3))

      ;; empty array
      (asrt ((. JSON stringify) []) "[]")

      ;; expressions as elements
      (let ((x 7) (a [x (+ x 1)]))
        (asrt (index a 0) 7)
        (asrt (index a 1) 8))

      ;; nested
      (let ((m [[1 2] [3 4]]))
        (asrt (index (index m 1) 0) 3))

      ;; mixed types
      (let ((mix ["hello", 42, true, null]))
        (asrt (index mix 0) "hello")
        (asrt (index mix 1) 42))
)
`);
}, 30_000);
