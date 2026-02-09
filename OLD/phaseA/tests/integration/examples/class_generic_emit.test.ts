import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("generic classes emit type parameters", async () => {
  const result = await compile(`(program
  (class Box
    (typeparams (T))
    (class-body)))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /class Box<T> \{/);
});
