/**
 * Type checker error aggregation tests
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("type assertions do not emit errors yet", async () => {
  const result = await compile(`
    (program
      (type-assert "x" (type-number))
      (type-assert 123 (type-boolean)))
  `, );

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
});
