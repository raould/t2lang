import test from 'node:test';
import assert from 'node:assert';
import { compile } from '../../../src/api';

test('readonly field is emitted and not enforced by t2lang', async () => {
  const src = `
    (program
      (class C
        (class-body
          (field readonly "x" 0)
          (method "constructor" ()
            (assign (prop this "x") 1)))))
    )
  `;
  const result = await compile(src, );
  // t2lang should not enforce readonly; TypeScript will handle it.
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /readonly x/);
  // assignment should still be emitted in method body
  assert.match(result.tsSource, /this\.x = 1/);
});
