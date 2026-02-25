import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('literal.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      ;; number literals
      (asrt 42 42)
      (asrt 3.14 3.14)

      ;; string literals
      (asrt "hello world" 'hello world')
      (asrt 'single quotes' "single quotes")

      ;; boolean literals
      (asrt true true)
      (asrt false false)

      ;; null and undefined
      (asrt null null)
      (asrt undefined undefined)
  )
`);
}, 30_000);
