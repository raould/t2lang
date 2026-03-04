import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('cond.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")
    ;; multi-clause cond (grade classifier)
    (let (grade) 85)
    (let (result)
      (cond
        (>= grade 90) "A"
        (>= grade 80) "B"
        (>= grade 70) "C"
        :else "F"))
    (asrt result "B")

    ;; single clause, no match → undefined
    (let (r1) (cond (> 1 2) "nope"))
    (asrt r1 undefined)

    ;; single clause, match
    (let (r2) (cond (< 1 2) "yes"))
    (asrt r2 "yes")
    
    ;; cond nested in expression
    (asrt (+ "grade is " (cond (=== grade 85) "B" :else "other")) "grade is B")

    ;; cond with numeric results
    (let (x) 5)
    (asrt (+ 1 (cond (> x 3) 10 (> x 1) 5 :else 0)) 11)
)`);
}, 30_000);
