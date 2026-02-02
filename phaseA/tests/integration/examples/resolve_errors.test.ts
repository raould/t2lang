/**
 * Resolver error tests
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("unresolved identifier does not crash resolver", async () => {
  const result = await compile(`(program (call foo 1))`, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(1\)/);
});
