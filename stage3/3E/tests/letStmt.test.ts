import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('letStmt.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      ;; simple let binding
      (let (x) 42)
      (let (name) "hello")
      (let (flag) true)
      (asrt x 42)
      (asrt name "hello")
      (asrt flag true)
  )
`);
}, 30_000);
