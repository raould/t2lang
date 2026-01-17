/**
 * Test for operators (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("arithmetic operators", async () => {
  const add = await compilePhase0(`(program (+ 1 2))`, { enableTsc: true });
  assert.strictEqual(nonTsc(add.errors).length, 0);
  assert.ok(add.tsSource.includes("(1 + 2)"));
  
  const sub = await compilePhase0(`(program (- 5 3))`, { enableTsc: true });
  assert.strictEqual(nonTsc(sub.errors).length, 0);
  assert.ok(sub.tsSource.includes("(5 - 3)"));
  
  const mul = await compilePhase0(`(program (* 4 5))`, { enableTsc: true });
  assert.strictEqual(nonTsc(mul.errors).length, 0);
  assert.ok(mul.tsSource.includes("(4 * 5)"));
  
  const div = await compilePhase0(`(program (/ 10 2))`, { enableTsc: true });
  assert.strictEqual(nonTsc(div.errors).length, 0);
  assert.ok(div.tsSource.includes("(10 / 2)"));
  
  const mod = await compilePhase0(`(program (% 7 3))`, { enableTsc: true });
  assert.strictEqual(nonTsc(mod.errors).length, 0);
  assert.ok(mod.tsSource.includes("(7 % 3)"));
});

test("comparison operators", async () => {
  const lt = await compilePhase0(`(program (< 1 2))`, { enableTsc: true });
  assert.strictEqual(nonTsc(lt.errors).length, 0);
  assert.ok(lt.tsSource.includes("(1 < 2)"));
  
  const gt = await compilePhase0(`(program (> 5 3))`, { enableTsc: true });
  assert.strictEqual(nonTsc(gt.errors).length, 0);
  assert.ok(gt.tsSource.includes("(5 > 3)"));
  
  const eq = await compilePhase0(`(program (let* ((a 1) (b 2)) (== a b)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(eq.errors).length, 0);
  assert.ok(eq.tsSource.includes("(a == b)"));
  
  const seq = await compilePhase0(`(program (let* ((a 1) (b 2)) (=== a b)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(seq.errors).length, 0);
  assert.ok(seq.tsSource.includes("(a === b)"));
});

test("logical operators", async () => {
  const and = await compilePhase0(`(program (&& true false))`, { enableTsc: true });
  assert.strictEqual(nonTsc(and.errors).length, 0);
  assert.ok(and.tsSource.includes("(true && false)"));
  
  const or = await compilePhase0(`(program (|| true false))`, { enableTsc: true });
  assert.strictEqual(nonTsc(or.errors).length, 0);
  assert.ok(or.tsSource.includes("(true || false)"));
  
  const not = await compilePhase0(`(program (! true))`, { enableTsc: true });
  assert.strictEqual(nonTsc(not.errors).length, 0);
  assert.ok(not.tsSource.includes("(!true)"));
});

test("unary typeof", async () => {
  const result = await compilePhase0(`(program (let* ((x 1)) (typeof x)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("typeof x"));
});

test("nested operators", async () => {
  const result = await compilePhase0(`(program (* (+ 1 2) (- 4 3)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("((1 + 2) * (4 - 3))"));
});

test("operators in function", async () => {
  const result = await compilePhase0(`
    (program
      (function add (a b)
        (return (+ a b))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("return (a + b)"));
});

test("operator with wrong arity becomes regular call", async () => {
  const result = await compilePhase0(`(program (+ 1 2 3))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  // 3 args means it's treated as a regular function call
  assert.ok(result.tsSource.includes("+(1, 2, 3)"));
});
