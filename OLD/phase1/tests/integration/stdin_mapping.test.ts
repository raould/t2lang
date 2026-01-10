import test from 'node:test';
import assert from 'node:assert';
import { compilePhase1 } from '../../src/api.js';

test('stdin mapping: typecheck errors map back to original source positions', async () => {
  const src = `
  (program
    (class Person
      (method "constructor" (a: number) : string
        (this.a := a))))`;

  const result = await compilePhase1(src, { emitTypes: true, dumpAst: true });
  assert.ok(result.errors.length > 0, 'expected at least one error');
  const err = result.errors[0];
  assert.ok(err.location, `expected error to include location: ${JSON.stringify(err)}`);
  assert.strictEqual(err.location.file, 'input.t2');

  // Ensure the location refers to text inside the original `src`
  const slice = src.slice(err.location.start, err.location.end);
  // Mapping may point to the return annotation or a nearby param type
  // depending on rewrite heuristics; accept either token here.
  assert.match(slice, /string|number/, `expected location slice to include 'string' or 'number', got: ${JSON.stringify(slice)}`);

  // Verify line/column are consistent with the offset
  const up = src.slice(0, err.location.start);
  const expectedLine = (up.match(/\n/g)?.length ?? 0) + 1;
  assert.strictEqual(err.location.line, expectedLine);
});
