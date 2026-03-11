import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('optChain.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (let* ((user (object (name "alice")))
            (nobody undefined))
        (asrt (.? user name) "alice")
        (asrt (.? nobody name) undefined))
  )
`);
}, 30_000);
