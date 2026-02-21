import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('literal.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; number literals
  ((. console log) 42)
  ((. console log) 3.14)

  ;; string literals
  ((. console log) "hello world")
  ((. console log) 'single quotes')

  ;; boolean literals
  ((. console log) true)
  ((. console log) false)

  ;; null and undefined
  ((. console log) null)
  ((. console log) undefined))
`);
});
