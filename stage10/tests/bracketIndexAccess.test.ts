import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('bracketIndexAccess end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")

      ;; (. arr [expr]) with numeric literal index
      (let ((arr (array 10 20 30)))
        (asrt (. arr [0]) 10)
        (asrt (. arr [2]) 30))

      ;; (. arr [expr]) with variable index
      (let ((arr (array 10 20 30)) (i 1))
        (asrt (. arr [i]) 20))

      ;; (. arr [expr]) with expression index
      (let ((arr (array 10 20 30)))
        (asrt (. arr [(+ 1 1)]) 30))

      ;; (. obj [key]) with string key variable on object
      (let ((obj (object (x 42))) (k "x"))
        (asrt (. obj [k]) 42))

      ;; chained bracket index access
      (let ((m (array (array 1 2) (array 3 4))))
        (asrt (. (. m [1]) [0]) 3))

      ;; bracket index access on bracket array literal
      (let ((a [100 200 300]))
        (asrt (. a [0]) 100)
        (asrt (. a [2]) 300))
)
`);
}, 30_000);
