/**
 * Test for object literals needing parentheses in certain contexts
 *
 * When an object literal appears as the base of a property access or call expression
 * that's used as a statement, the generated TypeScript code needs parentheses.
 * JavaScript/TypeScript interprets `{ ... }` at statement position as a block statement,
 * not an object literal. It needs parentheses: `({ ... })`.
 */

import test from "node:test";
import assert from "node:assert";
import { compile } from "../../src/api";

test("object with property access as statement - simple case", async () => {
  const result = await compile(`(program (call (prop (object ("a" 1)) "a") 2))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Should have parens around object: ({ a: 1 }).a(2);
  assert.match(result.tsSource, /\(\{\s*a:\s*1\s*\}\)\.a\(2\)/);
});

test("object with property access (method call) as statement", async () => {
  const result = await compile(`(program (call (prop (object ("method" (lambda ((x)) (return x)))) "method") 42))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Should have parens around object
  assert.match(result.tsSource, /\(\{[\s\S]*method:[\s\S]*\}\)\.method\(42\)/);
});

test("object with index access as statement", async () => {
  const result = await compile(`(program (call (index (object ("a" 1)) "a") 2))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Should have parens around object: ({ a: 1 })["a"](2);
  assert.match(result.tsSource, /\(\{\s*a:\s*1\s*\}\)\["a"\]\(2\)/);
});

test("object with optional property access as statement", async () => {
  const result = await compile(`(program (?. (object ("a" 1)) "a"))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Should have parens around object: ({ a: 1 })?.a;
  assert.match(result.tsSource, /\(\{\s*a:\s*1\s*\}\)\?\.a/);
});

test("object with optional index access as statement", async () => {
  const result = await compile(`(program (?.[] (object ("a" 1)) "a"))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Should have parens around object: ({ a: 1 })?["a"];
  assert.match(result.tsSource, /\(\{\s*a:\s*1\s*\}\)\?\.\["a"\]/);
});

test("object in non-statement position doesn't need parens", async () => {
  const result = await compile(`(program (const* ((x (prop (object ("a" 1)) "a"))) x))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // In assignment position, parens are not strictly needed but are fine either way
  // Just verify it compiles without errors
  assert.ok(result.tsSource.includes("a: 1"));
});

test("nested object with property access as statement", async () => {
  const result = await compile(`(program (call (prop (object ("nested" (object ("method" (lambda ((x)) (return x)))))) "nested") 42))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Outer object should have parens
  assert.match(result.tsSource, /\(\{[\s\S]*nested:[\s\S]*\}\)\.nested\(42\)/);
});

test("chained property access on object literal", async () => {
  const result = await compile(`(program (prop (prop (object ("a" (object ("b" 1)))) "a") "b"))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // Outer object should have parens: ({ a: { b: 1 } }).a.b;
  assert.match(result.tsSource, /\(\{.*a:.*\}\)\.a\.b/);
});
