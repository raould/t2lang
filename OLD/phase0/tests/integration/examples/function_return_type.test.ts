import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('fn supports inline return type annotation (plain sexpr)', async () => {
  const src = `(program (fn ((a number)) (returns number) (return 1)))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  // no compiler errors
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  // generated TypeScript should include the inline return type annotation
  assert.match(result.tsSource, /: number/, 'expected emitted TS to contain ": number"');
});
