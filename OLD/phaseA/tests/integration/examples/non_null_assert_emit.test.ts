import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("non-null assertion emits postfix bang", async () => {
  const result = await compile(`(program
  (let* ((value "ok"))
    (non-null value)))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\(value\)!/);
});
