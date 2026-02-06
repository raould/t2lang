/**
 * Test for array literals
 */

import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("empty array", async () => {
  const result = await compile(`(program (array))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\[\]/);
});

test("array with numbers", async () => {
  const result = await compile(`(program (array 1 2 3))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\[1, 2, 3\]/);
});

test("array with strings", async () => {
  const result = await compile(`(program (array "a" "b" "c"))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\["a", "b", "c"\]/);
});

test("array with mixed types", async () => {
  const result = await compile(`(program (array 1 "two" true null))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\[1, "two", true, null\]/);
});

test("nested arrays", async () => {
  const result = await compile(`(program (array (array 1 2) (array 3 4)))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\[\[1, 2\], \[3, 4\]\]/);
});

test("array assigned to variable", async () => {
  const result = await compile(`(program (const* ((foo (fn ((x)) x)) (nums (array 1 2 3))) (foo nums)))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /const nums = \[1, 2, 3\]/);
});
