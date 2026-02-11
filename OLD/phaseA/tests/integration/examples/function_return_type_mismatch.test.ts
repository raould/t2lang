import test from "node:test";
import assert from 'node:assert';
import { compile } from '../../../src/api';
 
test("fn annotated return type mismatch is not enforced yet", async () => {
  const src = `(program (fn ((a (type-number)) (type-number)) (return "oops")))`;
  const result = await compile(src, { dumpAst: false, emitTypes: true });
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0, `expected no errors yet; ts: ${result.tsSource}`);
  assert.match(result.tsSource, /return "oops";/, "expected return statement to remain intact");
});
