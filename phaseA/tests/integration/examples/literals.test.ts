/**
 * Test for boolean, null, and undefined literals
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("boolean literal true", async () => {
  const result = await compile(`(program (fn foo ((x)) x) (call foo true))`, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(true\)/);
});

test("boolean literal false", async () => {
  const result = await compile(`(program (fn foo ((x)) x) (call foo false))`, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(false\)/);
});

test("null literal", async () => {
  const result = await compile(`(program (fn foo ((x)) x) (call foo null))`, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(null\)/);
});

test("undefined literal", async () => {
  const result = await compile(`(program (fn foo ((x)) x) (call foo undefined))`, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(undefined\)/);
});

test("mixed literals in let binding", async () => {
  const result = await compile(`
    (program
      (fn foo ((a) (b) (c) (d)) a)
      (let* ((a true)
            (b false)
            (c null)
            (d undefined))
        (call foo a b c d)))
  `, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /let a = true/);
  assert.match(result.tsSource, /let b = false/);
  assert.match(result.tsSource, /let c = null/);
  assert.match(result.tsSource, /let d = undefined/);
});

test("string literal escapes", async () => {
  const result = await compile(String.raw`
    (program
      (fn foo ((x)) x)
      (call foo "line1\nline2")
    )
  `, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\\n/);
  assert.match(result.tsSource, /line2/);
});
