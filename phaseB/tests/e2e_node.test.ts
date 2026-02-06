import assert from "node:assert";
import test from "node:test";
import { runE2E_TSC } from "./e2e_helpers.js";

test("phaseB compile -> tsc API (no diagnostics)", async () => {
  const source = `(program (call (prop console "log") "hello"))`;
  const [result, tscErrors] = await runE2E_TSC(source);
  assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
  assert.ok(result.tsSource.length > 0, "Expected emitted TypeScript output");
});

test("phaseB compile -> tsc API supports multiple statements", async () => {
  const source = `(program
    (call (prop console "log") "alpha")
    (call (prop console "log") "beta"))`;
  const [result, tscErrors] = await runE2E_TSC(source);
  assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
  assert.ok(result.tsSource.includes("console.log"), "Expected console.log to be present in output");
});
