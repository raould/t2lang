import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("nullish coalescing emits ??", async () => {
  const result = await compile(`(program
  (let* ((value null))
    (?? value "fallback")))`);
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\(value \?\? "fallback"\)/);
});
