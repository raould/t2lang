/**
 * Test for object literals
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("empty object", async () => {
  const result = await compilePhase0(`(program (obj))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("{  }"));
});

test("object with string value", async () => {
  const result = await compilePhase0(`(program (obj (field "name" "John")))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes('"name": "John"'));
});

test("object with number value", async () => {
  const result = await compilePhase0(`(program (obj (field "age" 30)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes('"age": 30'));
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
  assert.ok(result.tsSource.includes('"name": "John"'));
  assert.ok(result.tsSource.includes('"age": 30'));
  assert.ok(result.tsSource.includes('"active": true'));
});

test("nested object", async () => {
  const result = await compilePhase0(`
    (program
      (obj
        (field "user" (obj (field "name" "John")))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes('"user":'));
  assert.ok(result.tsSource.includes('"name": "John"'));
});

test("object with array field", async () => {
  const result = await compilePhase0(`
    (program
      (obj
        (field "items" (array 1 2 3))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes('"items": [1, 2, 3]'));
});

test("object assigned to variable", async () => {
  const result = await compilePhase0(`
    (program
      (const ((foo (fn (x) x))
              (person (obj (field "name" "John"))))
        (foo person)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes('const person = { "name": "John" }'));
});
