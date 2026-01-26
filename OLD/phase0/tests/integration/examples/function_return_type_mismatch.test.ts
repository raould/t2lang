import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('fn annotated return type mismatch produces error', async () => {
  const src = `(program (fn ((a number)) (returns number) (return "oops")))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.ok(result.errors.length > 0, `expected errors but got none; ts: ${result.tsSource}`);
  const msg = result.errors[0].message || '';
  assert.match(msg, /Return type mismatch/, 'expected return type mismatch error');
});
