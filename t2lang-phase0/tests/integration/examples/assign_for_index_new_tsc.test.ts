/**
 * Test for assign, for, index, and new expressions (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

// Assignment tests
test("simple assignment", async () => {
  const result = await compilePhase0(`(program (let* ((x 0)) (assign x 5)))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /x = 5/);
});

test("assignment to property", async () => {
  const result = await compilePhase0(`(program (let* ((obj (obj (field "name" "Jane")))) (assign (prop obj "name") "John")))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /obj.name = "John"/);
});

test("assignment to array index", async () => {
  const result = await compilePhase0(`(program (let* ((arr (array 0))) (assign (index arr 0) 42)))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /arr[0] = 42/);
});

// For loop tests
test("simple for loop", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((i 0)
             (print (fn (x) x)))
        (for (assign i 0) (< i 10) (assign i (+ i 1))
          (print i))))
  `, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /for (/);
  assert.match(result.tsSource, /i = 0/);
  assert.match(result.tsSource, /(i < 10)/);
});

test("for loop with null init", async () => {
  const result = await compilePhase0(`(program (let* ((i 0) (foo (fn () null))) (for null (< i 10) (assign i (+ i 1)) (foo))))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /for (;/);
});

test("infinite for loop", async () => {
  const result = await compilePhase0(`(program (let* ((foo (fn () null))) (for null null null (foo))))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /for (; ; )/);
});

// Index tests
test("array index", async () => {
  const result = await compilePhase0(`(program (let* ((arr (array 1 2))) (index arr 0)))`, { enableTsc: true });
  if (nonTsc(result.errors).length > 0) { console.error(result.errors); }
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /arr[0]/);
});

test("nested index", async () => {
  const result = await compilePhase0(`(program (let* ((matrix (array (array 1 2) (array 3 4)))) (index (index matrix 0) 1)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /matrix[0][1]/);
});

test("index with expression", async () => {
  const result = await compilePhase0(`(program (let* ((arr (array 1 2 3)) (len 3)) (index arr (- len 1))))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /arr[(len - 1)]/);
});

// New tests
test("new with no args", async () => {
  const result = await compilePhase0(`(program (let* ((Date (fn () null))) (new Date)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /new Date()/);
});

test("new with args", async () => {
  const result = await compilePhase0(`(program (let* ((Error (fn (x) x))) (new Error "something went wrong")))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /new Error("something went wrong")/);
});

test("new with multiple args", async () => {
  const result = await compilePhase0(`(program (let* ((Date (fn (a b c) a))) (new Date 2024 0 1)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /new Date(2024, 0, 1)/);
});

// Combined example
test("combined usage", async () => {
  const result = await compilePhase0(`
    (program
            (let* ((Array (fn () null))
                    (console (obj (field "log" (fn (x) x))))
              (i 0))
        (const ((arr (new Array)))
          (for (assign i 0) (< i 5) (assign i (+ i 1))
            (call (prop arr "push") i))
          (call (prop console "log") (index arr 2)))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /new Array()/);
  assert.match(result.tsSource, /arr.push(i)/);
  assert.match(result.tsSource, /arr[2]/);
});
