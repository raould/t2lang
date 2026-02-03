import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("this types emit in TS output", async () => {
  const result = await compile(`(program
  (type-alias Self (type-this)))`);
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /type Self = this;/);
});
