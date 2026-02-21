import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('lambda.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; lambda with params and body
  (def add (lambda ((a) (b))
    (return (+ a b))))

  ;; lambda with no params
  (def greet (lambda ()
    (return "hi")))

  ;; lambda as inline expression
  (let (result) ((lambda ((x)) (return (* x x))) 5))
  ((. console log) (add 1 2))
  ((. console log) (greet))
  ((. console log) result))
`);
});
