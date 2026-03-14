import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('subscriptAssign end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")

      ;; basic element assignment with numeric literal index
      (let* ((arr (array 10 20 30)))
        (arr [1] = 99)
        (asrt (index arr 1) 99))

      ;; assignment with variable index
      (let* ((arr (array 1 2 3)) (i 2))
        (arr [i] = 42)
        (asrt (index arr 2) 42))

      ;; assignment with expression index
      (let* ((arr (array 0 0 0)))
        (arr [(+ 1 1)] = 7)
        (asrt (index arr 2) 7))

      ;; assign to bracket array literal in a variable
      (let* ((a [0 0 0]))
        (a [0] = 100)
        (asrt (. a [0]) 100))

      ;; overwrites existing value
      (let* ((arr (array 5 6 7)))
        (arr [0] = 5)
        (arr [0] = 55)
        (asrt (index arr 0) 55))

      ;; nested array element assignment
      (let* ((m (array (array 1 2) (array 3 4))))
        ((. m [0]) [1] = 99)
        (asrt (index (index m 0) 1) 99))
)
`);
}, 30_000);
