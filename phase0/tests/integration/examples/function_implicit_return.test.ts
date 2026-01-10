import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('fn returns last expression without explicit return', async () => {
  const src = `(program (fn ((a number)) (returns number) (+ a 1)))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  // generated TS should contain an implicit return for the last expression
  assert.match(result.tsSource, /return \(+a 1\)+;|return \(a \+ 1\);|return a \+ 1;/, 'expected emitted TS to contain a return for the last expression');
});
