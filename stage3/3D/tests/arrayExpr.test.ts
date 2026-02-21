import { it } from 'vitest';
import { compileAndRunT2 } from './helpers';

// the test itself
it('arrayExpr.t2 end-to-end', () => {
  compileAndRunT2('arrayExpr.test.t2');
});
