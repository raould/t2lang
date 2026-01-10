/**
 * Test for if expressions
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("if with then only", async () => {
  const result = await compilePhase0(`(program (function foo (x) x) (if true (foo 1)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("if (true)"));
  assert.ok(result.tsSource.includes("foo(1)"));
});

test("if with then and else", async () => {
  const result = await compilePhase0(`(program (function foo (x) x) (function bar (x) x) (if false (foo 1) (bar 2)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("if (false)"));
  assert.ok(result.tsSource.includes("foo(1)"));
  assert.ok(result.tsSource.includes("else"));
  assert.ok(result.tsSource.includes("bar(2)"));
});

test("if with identifier condition", async () => {
  const result = await compilePhase0(`
    (program
      (function foo (x) x)
      (function bar (x) x)
      (let* ((x true))
        (if x (foo 1) (bar 2))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("if (x)"));
});

test("if with call condition", async () => {
  const result = await compilePhase0(`(program (function isReady () true) (function go () null) (if (isReady) (go)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("if (isReady())"));
});

test("nested if expressions", async () => {
  const result = await compilePhase0(`
    (program
      (function a () null)
      (function b () null)
      (function c () null)
      (if true
        (if false (a) (b))
        (c)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("if (true)"));
  assert.ok(result.tsSource.includes("if (false)"));
});

test("if with block branches", async () => {
  const result = await compilePhase0(`
    (program
      (function foo (x) x)
      (function bar (x) x)
      (function baz (x) x)
      (if true
        (block
          (foo 1)
          (bar 2))
        (block
          (baz 3))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.tsSource.includes("if (true)"));
  assert.ok(result.tsSource.includes("foo(1)"));
  assert.ok(result.tsSource.includes("bar(2)"));
  assert.ok(result.tsSource.includes("baz(3)"));
});
