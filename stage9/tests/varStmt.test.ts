import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('varStmt.test.t2 end-to-end', () => {
  const result = fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; simple var binding
      (var ((x 42)))
      (var ((name "hello")))
      (var ((flag true)))
      (asrt x 42)
      (asrt name "hello")
      (asrt flag true)
  )
`);
  if (result && result.errors && result.errors.length > 0) { console.error(result.errors); }
}, 30_000);
