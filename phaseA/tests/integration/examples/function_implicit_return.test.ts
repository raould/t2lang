import test from "node:test";
import assert from 'node:assert';
import { compile } from '../../../src/api';
 
test("fn does not implicitly return last expression", async () => {
  const src = `(program (fn ((a (type-number)) (type-number)) (call add a 1)))`;
  const result = await compile(src, { dumpAst: false, emitTypes: true });
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.equal(result.diagnostics.length, 0, `errors: ${JSON.stringify(result.diagnostics)}`);
  assert.match(result.tsSource, /add\(a, 1\);/, "expected emitted TS to keep last expression as a statement");
});
