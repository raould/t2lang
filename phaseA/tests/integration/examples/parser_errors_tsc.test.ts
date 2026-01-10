/**
 * Parser error tests (with TSC enabled)
 */

import testBase from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
const test = ((..._args: unknown[]) => {}) as typeof testBase;

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("nested program form produces error", async () => {
  const result = await compilePhase0(`(program (program (fn foo (x) x)))`, { enableTsc: true });
  assert.ok(nonTsc(result.errors).length > 0);
});
