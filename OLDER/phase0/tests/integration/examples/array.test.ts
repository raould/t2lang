/**
 * Test for array literals
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("empty array", async () => {
  const result = await compilePhase0(`(program (array))`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\[\]/);
});

test("array with numbers", async () => {
  const result = await compilePhase0(`(program (array 1 2 3))`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\[1, 2, 3\]/);
});

test("array with strings", async () => {
  const result = await compilePhase0(`(program (array "a" "b" "c"))`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\["a", "b", "c"\]/);
});

test("array with mixed types", async () => {
  const result = await compilePhase0(`(program (array 1 "two" true null))`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\[1, "two", true, null\]/);
});

test("nested arrays", async () => {
  const result = await compilePhase0(`(program (array (array 1 2) (array 3 4)))`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\[\[1, 2\], \[3, 4\]\]/);
});

test("array assigned to variable", async () => {
  const result = await compilePhase0(`(program (const* ((foo (fn (x) x)) (nums (array 1 2 3))) (foo nums)))`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /const nums = \[1, 2, 3\]/);
});
