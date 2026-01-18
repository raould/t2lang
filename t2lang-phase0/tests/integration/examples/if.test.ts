/**
 * Test for if expressions
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("if with then only", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (if true (foo 1)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /if (true)/);
  assert.match(result.tsSource, /foo(1)/);
});

test("if with then and else", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (fn bar (x) x) (if false (foo 1) (bar 2)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /if (false)/);
  assert.match(result.tsSource, /foo(1)/);
  assert.match(result.tsSource, /else/);
  assert.match(result.tsSource, /bar(2)/);
});

test("if with identifier condition", async () => {
  const result = await compilePhase0(`
    (program
      (fn foo (x) x)
      (fn bar (x) x)
      (let* ((x true))
        (if x (foo 1) (bar 2))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /if (x)/);
});

test("if with call condition", async () => {
  const result = await compilePhase0(`(program (fn isReady () true) (fn go () null) (if (isReady) (go)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /if (isReady())/);
});

test("nested if expressions", async () => {
  const result = await compilePhase0(`
    (program
      (fn a () null)
      (fn b () null)
      (fn c () null)
      (if true
        (if false (a) (b))
        (c)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /if (true)/);
  assert.match(result.tsSource, /if (false)/);
});

test("if with block branches", async () => {
  const result = await compilePhase0(`
    (program
      (fn foo (x) x)
      (fn bar (x) x)
      (fn baz (x) x)
      (if true
        (block
          (foo 1)
          (bar 2))
        (block
          (baz 3))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /if (true)/);
  assert.match(result.tsSource, /foo(1)/);
  assert.match(result.tsSource, /bar(2)/);
  assert.match(result.tsSource, /baz(3)/);
});
