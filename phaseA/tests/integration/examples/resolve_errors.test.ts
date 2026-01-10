/**
 * Resolver error tests
 */

import testBase from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
const test = ((..._args: unknown[]) => {}) as typeof testBase;

test("unresolved identifier emits event", async () => {
  const result = await compilePhase0(`(program (foo 1))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  const unresolved = result.events.find(e => e.kind === "unresolvedIdentifier");
  assert.ok(unresolved);
});
