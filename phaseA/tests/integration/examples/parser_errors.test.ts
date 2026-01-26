/**
 * Parser error tests
 */

import testBase from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
const test = ((..._args: unknown[]) => {}) as typeof testBase;

test("nested program form produces error", async () => {
  const result = await compilePhase0(`(program (program (fn foo (x) x)))`, { enableTsc: false });
  assert.ok(result.errors.length > 0);
});
