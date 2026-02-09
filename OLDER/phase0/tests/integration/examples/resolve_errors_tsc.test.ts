/**
 * Resolver error tests (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("unresolved identifier emits event", async () => {
  const result = await compilePhase0(`(program (foo 1))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  const unresolved = result.events.find(e => e.kind === "unresolvedIdentifier");
  assert.ok(unresolved);
});
