import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('letStmt.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; simple let binding
  (let (x) 42)
  (let (name) "hello")
  (let (flag) true)
  ((. console log) x)
  ((. console log) name)
  ((. console log) flag))
`);
});
