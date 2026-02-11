/**
 * Test for object literals
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("empty object", async () => {
  const result = await compile(`(program (object))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\{\s*\}/);
});

test("object with string value", async () => {
  const result = await compile(`(program (object ("name" "John")))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /name: "John"/);
});

test("object with number value", async () => {
  const result = await compile(`(program (object ("age" 30)))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /age: 30/);
});

test("object with multiple fields", async () => {
  const result = await compile(`
    (program
      (object
        ("name" "John")
        ("age" 30)
        ("active" true)))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /name: "John"/);
  assert.match(result.tsSource, /age: 30/);
  assert.match(result.tsSource, /active: true/);
});

test("nested object", async () => {
  const result = await compile(`
    (program
      (object
        ("user" (object ("name" "John")))))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /user:/);
  assert.match(result.tsSource, /name: "John"/);
});

test("object with array field", async () => {
  const result = await compile(`
    (program
      (object
        ("items" (array 1 2 3))))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /items: \[1, 2, 3\]/);
});

test("object assigned to variable", async () => {
  const result = await compile(`
    (program
      (const* ((foo (fn ((x)) x))
              (person (object ("name" "John"))))
        (foo person)))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /const person = \{ name: "John" \}/);
});
