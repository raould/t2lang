/**
 * Parser error tests
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("nested program form does not crash parser", async () => {
  const result = await compile(`(program (program (fn foo ((x)) x)))`, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
});
