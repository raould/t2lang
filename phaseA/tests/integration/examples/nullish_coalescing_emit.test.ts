import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("nullish coalescing emits ??", async () => {
  const result = await compile(`(program
  (let* ((value null))
    (?? value "fallback")))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\(value \?\? "fallback"\)/);
});
