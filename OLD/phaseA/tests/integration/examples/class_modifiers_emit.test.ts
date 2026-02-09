import test from 'node:test';
import assert from 'node:assert';
import { compile } from '../../../src/api';

test('class field modifiers are emitted in TS output', async () => {
  const src = `
    (program
      (class C
        (class-body
          (field public static readonly "x" 1)
          (field private "y" 2)
          (method "constructor" ()
            (assign (prop this "y") 2)))))
    )
  `;
  const result = await compile(src, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // emitted TS should include modifiers for the fields
  assert.match(result.tsSource, /public static readonly x/);
  assert.match(result.tsSource, /private y/);
});
