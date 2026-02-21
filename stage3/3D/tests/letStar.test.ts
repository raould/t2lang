import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('letStar.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; let* with multiple bindings and body
  (let* ((x 10)
         (y 20)
         (z (+ x y)))
    ((. console log) z))

  ;; let* with undefined init
  (let* ((a undefined))
    (set! a 42)
    ((. console log) a)))
`);
});
