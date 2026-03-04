import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('lambda.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      ;; lambda with params and body
      (const add (lambda ((a) (b))
        (return (+ a b))))

      ;; lambda with no params
      (const greet (lambda ()
        (return "hi")))

      ;; lambda as inline expression
      (let (result) ((lambda ((x)) (return (* x x))) 5))
      
      (asrt (add 1 2) 3)
      (asrt (greet) "hi")
      (asrt result 25)
  )
`);
}, 30_000);
