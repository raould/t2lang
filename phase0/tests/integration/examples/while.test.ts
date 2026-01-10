/**
 * Test for while loops
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("simple while loop", async () => {
  const result = await compilePhase0(`(program (fn foo () null) (while true (foo)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /while \(true\)/);
  assert.match(result.tsSource, /foo\(\)/);
});

test("while with variable condition", async () => {
  const result = await compilePhase0(`
    (program
      (fn process () null)
      (let* ((running true))
        (while running
          (process))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /while \(running\)/);
});

test("while with multiple body statements", async () => {
  const result = await compilePhase0(`
    (program
      (fn a () null)
      (fn b () null)
      (fn c () null)
      (while true
        (a)
        (b)
        (c)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /a\(\)/);
  assert.match(result.tsSource, /b\(\)/);
  assert.match(result.tsSource, /c\(\)/);
});

test("while with call condition", async () => {
  const result = await compilePhase0(`(program (fn hasMore () true) (fn process () null) (while (hasMore) (process)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /while \(hasMore\(\)\)/);
});
