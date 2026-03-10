import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('type alias end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrtDeep"))))) "./helpers")
      (type Result (type-params T (E (default Error)))
        (union
          (obj (ok T))
          (obj (err E))))
      (let (r : (Result number)) (object (ok 42)))
      (asrtDeep r (object (ok 42)))
    )
  `);
}, 30_000);
