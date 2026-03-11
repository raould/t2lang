import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('nullCoalesce.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (let* ((a null)
            (b undefined)
            (c "hello"))
        (asrt (?? a "fallback") "fallback")
        (asrt (?? b "fallback") "fallback")
        (asrt (?? c "fallback") "hello")
        ;; nested: opt-chain + null-coalesce
        (let* ((user undefined))
          (asrt (?? (.? user name) "guest") "guest")))
  )
`);
}, 30_000);
