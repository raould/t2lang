/**
 * Test for property access (prop)
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("simple property access", async () => {
  const result = await compile(`(program (let* ((obj (obj (field "field" 1)))) (prop obj "field")))`, );
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /obj\.field/);
});

test("console.log via prop and call", async () => {
  const result = await compile(`(program (let* ((console (obj (field "log" (fn ((x)) x))))) (call (prop console "log") "hello")))`, );
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /console\.log/);
  assert.match(result.tsSource, /"hello"/);
});

test("chained property access", async () => {
  const result = await compile(`(program (let* ((a (obj (field "b" (obj (field "c" 1)))))) (prop (prop a "b") "c")))`, );
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /a\.b\.c/);
});

test("property access in let binding", async () => {
  const result = await compile(`
    (program
      (let* ((obj (obj (field "value" 1)))
            (foo (fn ((x)) x))
             (x (prop obj "value")))
        (foo x)))
  `, );
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /obj\.value/);
});

test("method call on object", async () => {
  const result = await compile(`
    (program
      (let* ((Math (obj (field "max" (fn ((a) (b) (c)) a)))))
        (call (prop Math "max") 1 2 3)))
  `, );
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /Math\.max\(1, 2, 3\)/);
});

test("implicit call still works", async () => {
  // Backwards compatible: (foo 1) should still work
  const result = await compile(`(program (fn foo ((a) (b)) a) (foo 1 2))`, );
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(1, 2\)/);
});
