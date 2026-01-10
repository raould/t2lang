import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('readonly field is emitted and not enforced by t2lang', async () => {
  const src = `
    (program
      (class C
        (field readonly "x" 0)
        (method "constructor" ()
          (assign (prop this "x") 1)))
    )
  `;
  const result = await compilePhase0(src, { enableTsc: false });
  // t2lang should not enforce readonly; TypeScript will handle it.
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /readonly x/);
  // assignment should still be emitted in method body
  assert.match(result.tsSource, /this\.x = 1/);
});
