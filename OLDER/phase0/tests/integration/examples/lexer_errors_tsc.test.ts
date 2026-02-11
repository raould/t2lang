/**
 * Test for lexer error handling (with TSC enabled)
 *
 * Verifies that unexpected characters produce proper errors
 * instead of causing infinite loops.
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("unexpected bracket produces error", async () => {
  const result = await compilePhase0(`(program ([ 1 2))`, { enableTsc: true });
  assert.ok(nonTsc(result.errors).length > 0);
});

test("unexpected curly brace produces error", async () => {
  const result = await compilePhase0(`(program ({ 1 2))`, { enableTsc: true });
  assert.ok(nonTsc(result.errors).length > 0);
});

test("valid operators still work after lexer fix", async () => {
  // Ensure we didn't break valid operator parsing
  const result = await compilePhase0(`(program (+ 1 2))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /\(1 \+ 2\)/);
});

test("ampersand operator works", async () => {
  const result = await compilePhase0(`(program (&& true false))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /\(true && false\)/);
});

test("pipe operator works", async () => {
  const result = await compilePhase0(`(program (|| true false))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /\(true \|\| false\)/);
});

test("caret operator works", async () => {
  const result = await compilePhase0(`(program (^ 5 3))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /\(5 \^ 3\)/);
});

test("tilde operator works", async () => {
  const result = await compilePhase0(`(program (~ 5))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /\(~\(?\s*5\s*\)?\)/);
});

test("unterminated string produces error", async () => {
  const result = await compilePhase0(`(program (foo "unterminated))`, { enableTsc: true });
  assert.ok(nonTsc(result.errors).length > 0);
});
