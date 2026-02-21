import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('unquote.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (x) 42)

  ;; unquote inside quasiquote
  (let (tmpl) (quasi (object (val (unquote x)))))
  ((. console log) tmpl))
`);
});
