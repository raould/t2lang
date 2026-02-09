import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("call-with-this emits .call invocation", async () => {
  const result = await compile(`(program
  (let* ((obj (object ("method" (lambda () 1)))))
    (call-with-this (prop obj "method") obj 1 2)))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\.call\(obj, 1, 2\)/);
});
