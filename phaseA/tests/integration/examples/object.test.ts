/**
 * Test for object literals
 */

import testBase from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
const test = ((..._args: unknown[]) => {}) as typeof testBase;

test("empty object", async () => {
  const result = await compilePhase0(`(program (obj))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /\{ {2}\}/);
});

test("object with string value", async () => {
  const result = await compilePhase0(`(program (obj (field "name" "John")))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /"name": "John"/);
});

test("object with number value", async () => {
  const result = await compilePhase0(`(program (obj (field "age" 30)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /"age": 30/);
});

test("object with multiple fields", async () => {
  const result = await compilePhase0(`
    (program
      (obj
        (field "name" "John")
        (field "age" 30)
        (field "active" true)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /"name": "John"/);
  assert.match(result.tsSource, /"age": 30/);
  assert.match(result.tsSource, /"active": true/);
});

test("nested object", async () => {
  const result = await compilePhase0(`
    (program
      (obj
        (field "user" (obj (field "name" "John")))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /"user":/);
  assert.match(result.tsSource, /"name": "John"/);
});

test("object with array field", async () => {
  const result = await compilePhase0(`
    (program
      (obj
        (field "items" (array 1 2 3))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /"items": \[1, 2, 3\]/);
});

test("object assigned to variable", async () => {
  const result = await compilePhase0(`
    (program
      (const* ((foo (fn (x) x))
              (person (obj (field "name" "John"))))
        (foo person)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /const person = \{ "name": "John" \}/);
});
