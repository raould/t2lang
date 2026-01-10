import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('various class field modifier combinations are emitted', async () => {
  const src = `
    (program
      (class A
        (field "a" 1))

      (class B
        (field public "b" 2)
        (field protected "c" 3)
        (field private readonly "d" 4))

      (class C
        (field static "s" 5)
        (field public static readonly "psr" 6))
    )
  `;
  const result = await compilePhase0(src, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);

  // Check emitted modifiers
  assert.match(result.tsSource, /a = 1/);
  assert.match(result.tsSource, /public b/);
  assert.match(result.tsSource, /protected c/);
  assert.match(result.tsSource, /private readonly d/);
  assert.match(result.tsSource, /static s/);
  assert.match(result.tsSource, /public static readonly psr/);
});
