/**
 * Test for property access (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("simple property access", async () => {
  const result = await compilePhase0(`(program (let* ((obj (obj (field "field" 1)))) (prop obj "field")))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /obj\.field/);
});

test("console.log via prop and call", async () => {
  const result = await compilePhase0(`(program (let* ((console (obj (field "log" (fn (x) x))))) (call (prop console "log") "hello")))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /console\.log/);
  assert.match(result.tsSource, /"hello"/);
});

test("chained property access", async () => {
  const result = await compilePhase0(`(program (let* ((a (obj (field "b" (obj (field "c" 1)))))) (prop (prop a "b") "c")))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /a\.b\.c/);
});

test("property access in let binding", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((obj (obj (field "value" 1)))
             (foo (fn (x) x))
             (x (prop obj "value")))
        (foo x)))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /obj\.value/);
});

test("method call on object", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((Math (obj (field "max" (fn (a b c) a)))))
        (call (prop Math "max") 1 2 3)))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /Math\.max\(1, 2, 3\)/);
});

test("implicit call still works", async () => {
  // Backwards compatible: (foo 1) should still work
  const result = await compilePhase0(`(program (fn foo (a b) a) (foo 1 2))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.match(result.tsSource, /foo\(1, 2\)/);
});
