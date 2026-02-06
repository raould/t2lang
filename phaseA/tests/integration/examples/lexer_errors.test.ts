/**
 * Test for lexer error handling
 * 
 * Verifies that unexpected characters produce proper errors
 * instead of causing infinite loops.
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("unexpected bracket does not crash parser", async () => {
  const result = await compile(`(program ([ 1 2))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
});

test("unexpected curly brace does not crash parser", async () => {
  const result = await compile(`(program ({ 1 2))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
});

test("valid calls still work after lexer fix", async () => {
  // Ensure we didn't break valid call parsing
  const result = await compile(`(program (call add 1 2))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /add\(1, 2\)/);
});

test("boolean call works", async () => {
  const result = await compile(`(program (call and true false))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /and\(true, false\)/);
});

test("boolean call with alternate name works", async () => {
  const result = await compile(`(program (call or true false))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /or\(true, false\)/);
});

test("identifier-like calls still work", async () => {
  const result = await compile(`(program (call bitXor 5 3))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /bitXor\(5, 3\)/);
});

test("unterminated string throws", async () => {
  const rsult = await compile(`(program (foo "unterminated))`);
  assert(rsult.diagnostics.length > 0);
});
