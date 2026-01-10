import test from 'node:test';
import assert from 'node:assert';
import { compilePhase1 } from '../../src/api';

test('phase1 param shorthand desugars to phase0 typed param', async () => {
  const src = `(program (fn foo (x: number) (returns number) (return x)))`;
  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.strictEqual(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  // emitted TS should contain the param type and return annotation when emitTypes is true
  assert.match(result.tsSource, /function foo\(x: number\): number/);
});

test('phase1 param shorthand in anonymous lambda', async () => {
  const src = `(program (let* ((f (fn (x: number) (returns number) (+ x 1)))) (call f 1)))`;
  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.strictEqual(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  // Accept arrow with optional inline return annotation, e.g. `(x: number) =>` or `(x: number): number =>`
  assert.match(result.tsSource, /\(x: number\).*=>/);
  assert.match(result.tsSource, /: number/);
});

test('phase1 colon return shorthand desugars to (returns ...) form', async () => {
  const src = `(program (fn bar ((a number)) : number (return a)))`;
  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.strictEqual(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /function bar\(a: number\): number/);
});
