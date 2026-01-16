/**
 * Test for array literals (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("empty array", async () => {
  const result = await compilePhase0(`(program (array))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("[]"));
});

test("array with numbers", async () => {
  const result = await compilePhase0(`(program (array 1 2 3))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("[1, 2, 3]"));
});

test("array with strings", async () => {
  const result = await compilePhase0(`(program (array "a" "b" "c"))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes('["a", "b", "c"]'));
});

test("array with mixed types", async () => {
  const result = await compilePhase0(`(program (array 1 "two" true null))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes('[1, "two", true, null]'));
});

test("nested arrays", async () => {
  const result = await compilePhase0(`(program (array (array 1 2) (array 3 4)))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("[[1, 2], [3, 4]]"));
});

test("array assigned to variable", async () => {
  const result = await compilePhase0(`(program (const ((foo (fn (x) x)) (nums (array 1 2 3))) (foo nums)))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("const nums = [1, 2, 3]"));
});
