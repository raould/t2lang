import test from 'node:test';
import assert from 'assert/strict';
import { compilePhase1 } from '../../src/api.js';

test('Phase1 sugar: ("key" : Type) rewrites and compiles', async () => {
    const src = `(program
    (type-alias A (type-object ("video" : Video) ("audio" : Audio)))
  )`;

    const res = await compilePhase1(src, { dumpAst: false });
    assert.equal(res.errors.length, 0, `errors: ${JSON.stringify(res.errors)}`);
    // Generated TS should contain the type alias name A
    assert.ok(res.tsSource.includes('type A') || res.tsSource.includes('type A ='), 'ts output missing type alias A');
});
