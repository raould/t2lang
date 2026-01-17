/**
 * Test for all three comment styles (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("lisp-style semicolon comment", async () => {
  const result = await compilePhase0(`
    (program
      (function foo (x) x)
      ; this is a comment
      (foo 1))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("foo(1)"));
  assert.ok(!result.tsSource.includes("comment"));
});

test("lisp-style inline comment", async () => {
  const result = await compilePhase0(`(program (function foo (x) x) (foo 1) ; inline comment
  )`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("foo(1)"));
});

test("c-style double-slash comment", async () => {
  const result = await compilePhase0(`
    (program
      (function bar (x) x)
      // this is a C-style comment
      (bar 2))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("bar(2)"));
  assert.ok(!result.tsSource.includes("C-style"));
});

test("c-style block comment", async () => {
  const result = await compilePhase0(`
    (program
      (function baz (x) x)
      /* block comment */
      (baz 3))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("baz(3)"));
  assert.ok(!result.tsSource.includes("block"));
});

test("multi-line block comment", async () => {
  const result = await compilePhase0(`
    (program
      (function qux (x) x)
      /* this is
         a multi-line
         block comment */
      (qux 4))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("qux(4)"));
});

test("mixed comment styles", async () => {
  const result = await compilePhase0(`
    (program
      (function a (x) x)
      (function b (x) x)
      (function c (x) x)
      ; lisp comment
      (a 1)
      // c-style comment  
      (b 2)
      /* block comment */
      (c 3))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("a(1)"));
  assert.ok(result.tsSource.includes("b(2)"));
  assert.ok(result.tsSource.includes("c(3)"));
});

test("comment at end of file", async () => {
  const result = await compilePhase0(`(program (function foo (x) x) (foo 1)) ; trailing comment`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("foo(1)"));
});
