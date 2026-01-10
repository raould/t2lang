import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('unquote.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrtDeep"))))) "./helpers")
      (let (x) 42)
      ;; unquote inside quasiquote
      (let (tmpl) (quasi (object (val (unquote x)))))
      (asrtDeep tmpl (object (val 42)))
  )
`);
}, 30_000);
