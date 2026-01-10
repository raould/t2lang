/**
 * Test for while loops (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("simple while loop", async () => {
  const result = await compilePhase0(`(program (function foo () null) (while true (foo)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("while (true)"));
  assert.ok(result.tsSource.includes("foo()"));
});

test("while with variable condition", async () => {
  const result = await compilePhase0(`
    (program
      (function process () null)
      (let* ((running true))
        (while running
          (process))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("while (running)"));
});

test("while with multiple body statements", async () => {
  const result = await compilePhase0(`
    (program
      (function a () null)
      (function b () null)
      (function c () null)
      (while true
        (a)
        (b)
        (c)))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("a()"));
  assert.ok(result.tsSource.includes("b()"));
  assert.ok(result.tsSource.includes("c()"));
});

test("while with call condition", async () => {
  const result = await compilePhase0(`(program (function hasMore () true) (function process () null) (while (hasMore) (process)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("while (hasMore())"));
});
