import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('propAccess.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    (let (obj) (object (x 10) (y 20) (z (lambda ((a)) a))))

    ;; Invalid, should throw if uncommented.
    ;; ((. console log) (obj.x))

    ;; property access with identifier key
    (asrt (. obj x) 10)
    (asrt (. obj y) 20)

    ;; property access with numeric key on arrays and numeric object keys
    (let (nums) (array 5 6 7))
    (asrt (. nums 0) 5)
    (asrt (. nums 2) 7)

    (let (objnum) (object (0 "zero") (42 "answer")))
    (asrt (. objnum 0) "zero")
    (asrt (. objnum 42) "answer")

    ;; chained property access
    (let (nested) (object (inner (object (val 99)))))
    (asrt (. (. nested inner) val) 99)
  )
`);
}, 30_000);
