/**
 * Parser error tests
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("nested program form produces error", async () => {
  const result = await compilePhase0(`(program (program (function foo (x) x)))`, { enableTsc: false });
  assert.ok(result.errors.length > 0);
});
