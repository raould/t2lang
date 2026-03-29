import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('type alias end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (type Result (type-params (T) (E (default Error)))
        (union
          (obj (ok T))
          (obj (err E))))
      (let ((r : (type-app Result number) (object (ok 42)))))
      (asrtDeep r (object (ok 42)))
    )
  `);
}, 30_000);
