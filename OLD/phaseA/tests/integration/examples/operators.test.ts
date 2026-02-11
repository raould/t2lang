/**
 * Test for operators (binary and unary)
 * 
 * In Phase 0, operators are just regular function calls like (+ 1 2)
 * but the codegen emits them as infix operators: (1 + 2)
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("arithmetic calls", async () => {
  const add = await compile(`(program (call add 1 2))`, );
  if (add.diagnostics.length > 0) { console.error(add.diagnostics); }
  assert.match(add.tsSource, /add\(1, 2\)/);

  const sub = await compile(`(program (call sub 5 3))`, );
  if (sub.diagnostics.length > 0) { console.error(sub.diagnostics); }
  assert.match(sub.tsSource, /sub\(5, 3\)/);

  const mul = await compile(`(program (call mul 4 5))`, );
  if (mul.diagnostics.length > 0) { console.error(mul.diagnostics); }
  assert.match(mul.tsSource, /mul\(4, 5\)/);

  const div = await compile(`(program (call div 10 2))`, );
  if (div.diagnostics.length > 0) { console.error(div.diagnostics); }
  assert.match(div.tsSource, /div\(10, 2\)/);

  const mod = await compile(`(program (call mod 7 3))`, );
  if (mod.diagnostics.length > 0) { console.error(mod.diagnostics); }
  assert.match(mod.tsSource, /mod\(7, 3\)/);
});

test("comparison calls", async () => {
  const lt = await compile(`(program (call lt 1 2))`, );
  if (lt.diagnostics.length > 0) { console.error(lt.diagnostics); }
  assert.match(lt.tsSource, /lt\(1, 2\)/);

  const gt = await compile(`(program (call gt 5 3))`, );
  if (gt.diagnostics.length > 0) { console.error(gt.diagnostics); }
  assert.match(gt.tsSource, /gt\(5, 3\)/);

  const eq = await compile(`(program (let* ((a 1) (b 2)) (call eq a b)))`, );
  if (eq.diagnostics.length > 0) { console.error(eq.diagnostics); }
  assert.match(eq.tsSource, /eq\(a, b\)/);

  const seq = await compile(`(program (let* ((a 1) (b 2)) (call seq a b)))`, );
  if (seq.diagnostics.length > 0) { console.error(seq.diagnostics); }
  assert.match(seq.tsSource, /seq\(a, b\)/);
});

test("logical calls", async () => {
  const and = await compile(`(program (call and true false))`, );
  if (and.diagnostics.length > 0) { console.error(and.diagnostics); }
  assert.match(and.tsSource, /and\(true, false\)/);

  const or = await compile(`(program (call or true false))`, );
  if (or.diagnostics.length > 0) { console.error(or.diagnostics); }
  assert.match(or.tsSource, /or\(true, false\)/);

  const not = await compile(`(program (call not true))`, );
  if (not.diagnostics.length > 0) { console.error(not.diagnostics); }
  assert.match(not.tsSource, /not\(true\)/);
});

test("unary typeof", async () => {
  const result = await compile(`(program (let* ((x 1)) (call typeof x)))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.match(result.tsSource, /typeof\(x\)/);
});

test("nested calls", async () => {
  const result = await compile(`(program (call mul (call add 1 2) (call sub 4 3)))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.match(result.tsSource, /mul\(add\(1, 2\), sub\(4, 3\)\)/);
});

test("calls in function", async () => {
  const result = await compile(`
    (program
      (fn add ((a) (b))
        (return (call addOp a b))))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.match(result.tsSource, /return addOp\(a, b\)/);
});

test("call with multiple args emits standard call", async () => {
  const result = await compile(`(program (call add 1 2 3))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.match(result.tsSource, /add\(1, 2, 3\)/);
});
