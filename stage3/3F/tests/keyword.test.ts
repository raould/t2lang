import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('keyword.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      ;; keyword literals resolve to strings
      (asrt :foo ":foo")
      (asrt :bar-baz ":bar-baz")
      (asrt :type ":type")
    )
  `);
}, 30_000);
