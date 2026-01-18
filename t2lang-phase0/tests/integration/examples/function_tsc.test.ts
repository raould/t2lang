/**
 * Test for function definitions (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("named function with no params", async () => {
  const result = await compilePhase0(`(program (fn print (x) x) (fn sayHello () (print "hello")))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("function sayHello()"));
  assert.ok(result.tsSource.includes('print("hello")'));
});

test("named function with params", async () => {
  const result = await compilePhase0(`(program (fn foo (a b) a) (fn add (a b) (foo a b)))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("function add(a, b)"));
});

test("function with return", async () => {
  const result = await compilePhase0(`(program (fn double (x) (return x)))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("return x"));
});

test("function with empty return", async () => {
  const result = await compilePhase0(`(program (fn doNothing () (return)))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("return;"));
});

test("anonymous function (lambda)", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (fn (x) (foo x)))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("(x) =>"));
});

test("lambda as callback", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((arr (array 1 2 3))
             (foo (fn (x) x)))
        (call (prop arr "map") (fn (x) (foo x)))))
  `, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("arr.map"));
  assert.ok(result.tsSource.includes("(x) =>"));
});

test("function with multiple statements in body", async () => {
  const result = await compilePhase0(`
    (program
      (fn foo (x) x)
      (fn bar (x) x)
      (fn process (x)
        (foo x)
        (bar x)
        (return x)))
  `, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("foo(x)"));
  assert.ok(result.tsSource.includes("bar(x)"));
  assert.ok(result.tsSource.includes("return x"));
});