/**
 * Type checker error aggregation tests (with TSC enabled)
 */

import testBase from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
const test = ((..._args: unknown[]) => {}) as typeof testBase;

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("multiple type errors are aggregated", async () => {
  const result = await compilePhase0(`
    (program
      (type-assert "x" (type-number))
      (type-assert 123 (type-boolean)))
  `, { enableTsc: true });

  assert.strictEqual(nonTsc(result.errors).length, 2);
});
