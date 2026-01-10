import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('unquoteSplicing.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrtDeep"))))) "./helpers")
      (let (items) (array 1 2 3))
      ;; unquote-splicing inside quasiquote
      (let (tmpl) (quasi (object (vals (unquote-splicing items)))))
      (asrtDeep tmpl (object (vals (array 1 2 3))))
    )
`);
}, 30_000);
