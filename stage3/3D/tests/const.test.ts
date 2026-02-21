import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('const.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; basic const
  (const (x) 42)
  ((. console log) x)

  ;; const with expression
  (const (greeting) (+ "hello" " world"))
  ((. console log) greeting)

  ;; const* with multiple bindings
  (const* ((a 10)
           (b 20)
           (c (+ a b)))
    ((. console log) c))

  ;; const* with body
  (const* ((name "Alice"))
    ((. console log) (+ "Hi " name))))
`);
});
