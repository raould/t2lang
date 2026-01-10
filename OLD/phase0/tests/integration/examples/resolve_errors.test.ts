/**
 * Resolver error tests
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("unresolved identifier emits event", async () => {
  const result = await compilePhase0(`(program (foo 1))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  const unresolved = result.events.find(e => e.kind === "unresolvedIdentifier");
  assert.ok(unresolved);
});
