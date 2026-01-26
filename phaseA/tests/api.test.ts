import test from "node:test";
import assert from "node:assert";
import { compilePhaseA } from "../src/api.js";

test("compilePhaseA parses/serializes/codegens simple let*", async () => {
  const source = `(program (let* ((x 42)) x))`;
  const result = await compilePhaseA(source);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  assert.strictEqual(result.snapshots.length, 4);
  assert.strictEqual(result.events.length, 12);
  assert.ok(result.tsSource.includes("let x = 42"));
  assert.ok(result.tsSource.includes("x"));
});