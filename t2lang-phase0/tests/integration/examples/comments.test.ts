/**
 * Test for all three comment styles
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("lisp-style semicolon comment", async () => {
  const result = await compilePhase0(`
    (program
      (fn foo (x) x)
      ; this is a comment
      (foo 1))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(1\)/);
  assert.doesNotMatch(result.tsSource, /comment/);
});

test("lisp-style inline comment", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (foo 1) ; inline comment
  )`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(1\)/);
});

test("c-style double-slash comment", async () => {
  const result = await compilePhase0(`
    (program
      (fn bar (x) x)
      // this is a C-style comment
      (bar 2))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /bar\(2\)/);
  assert.doesNotMatch(result.tsSource, /C-style/);
});

test("c-style block comment", async () => {
  const result = await compilePhase0(`
    (program
      (fn baz (x) x)
      /* block comment */
      (baz 3))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /baz\(3\)/);
  assert.doesNotMatch(result.tsSource, /block/);
});

test("multi-line block comment", async () => {
  const result = await compilePhase0(`
    (program
      (fn qux (x) x)
      /* this is
         a multi-line
         block comment */
      (qux 4))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /qux\(4\)/);
});

test("mixed comment styles", async () => {
  const result = await compilePhase0(`
    (program
      (fn a (x) x)
      (fn b (x) x)
      (fn c (x) x)
      ; lisp comment
      (a 1)
      // c-style comment  
      (b 2)
      /* block comment */
      (c 3))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /a\(1\)/);
  assert.match(result.tsSource, /b\(2\)/);
  assert.match(result.tsSource, /c\(3\)/);
});

test("comment at end of file", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (foo 1)) ; trailing comment`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(1\)/);
});
