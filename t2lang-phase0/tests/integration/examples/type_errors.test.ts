/**
 * Type checker error aggregation tests
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("multiple type errors are aggregated", async () => {
  const result = await compilePhase0(`
    (program
      (type-assert "x" (type-number))
      (type-assert 123 (type-boolean)))
  `, { enableTsc: false });

  assert.strictEqual(result.errors.length, 2);
});
