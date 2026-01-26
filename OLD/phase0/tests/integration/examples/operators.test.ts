/**
 * Test for operators (binary and unary)
 * 
 * In Phase 0, operators are just regular function calls like (+ 1 2)
 * but the codegen emits them as infix operators: (1 + 2)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("arithmetic operators", async () => {
  const add = await compilePhase0(`(program (+ 1 2))`, { enableTsc: false });
  assert.match(add.tsSource, /\(1 \+ 2\)/);

  const sub = await compilePhase0(`(program (- 5 3))`, { enableTsc: false });
  assert.match(sub.tsSource, /\(5 - 3\)/);

  const mul = await compilePhase0(`(program (* 4 5))`, { enableTsc: false });
  assert.match(mul.tsSource, /\(4 \* 5\)/);

  const div = await compilePhase0(`(program (/ 10 2))`, { enableTsc: false });
  assert.match(div.tsSource, /\(10 \/ 2\)/);

  const mod = await compilePhase0(`(program (% 7 3))`, { enableTsc: false });
  assert.match(mod.tsSource, /\(7 % 3\)/);
});

test("comparison operators", async () => {
  const lt = await compilePhase0(`(program (< 1 2))`, { enableTsc: false });
  assert.match(lt.tsSource, /\(1 < 2\)/);

  const gt = await compilePhase0(`(program (> 5 3))`, { enableTsc: false });
  assert.match(gt.tsSource, /\(5 > 3\)/);

  const eq = await compilePhase0(`(program (let* ((a 1) (b 2)) (== a b)))`, { enableTsc: false });
  assert.match(eq.tsSource, /\(a == b\)/);

  const seq = await compilePhase0(`(program (let* ((a 1) (b 2)) (=== a b)))`, { enableTsc: false });
  assert.match(seq.tsSource, /\(a === b\)/);
});

test("logical operators", async () => {
  const and = await compilePhase0(`(program (&& true false))`, { enableTsc: false });
  assert.match(and.tsSource, /\(true && false\)/);

  const or = await compilePhase0(`(program (|| true false))`, { enableTsc: false });
  assert.match(or.tsSource, /\(true \|\| false\)/);

  const not = await compilePhase0(`(program (! true))`, { enableTsc: false });
  assert.match(not.tsSource, /\(!\(?\s*true\s*\)?\)/);
});

test("unary typeof", async () => {
  const result = await compilePhase0(`(program (let* ((x 1)) (typeof x)))`, { enableTsc: false });
  assert.match(result.tsSource, /typeof\s*\(?\s*x\s*\)?/);
});

test("nested operators", async () => {
  const result = await compilePhase0(`(program (* (+ 1 2) (- 4 3)))`, { enableTsc: false });
  assert.match(result.tsSource, /\(\(1 \+ 2\) \* \(4 - 3\)\)/);
});

test("operators in function", async () => {
  const result = await compilePhase0(`
    (program
      (fn add (a b)
        (return (+ a b))))
  `, { enableTsc: false });
  assert.match(result.tsSource, /return \(a \+ b\)/);
});

test("operator with wrong arity becomes regular call", async () => {
  const result = await compilePhase0(`(program (+ 1 2 3))`, { enableTsc: false });
  // 3 args should now be emitted as chained infix: (1 + 2 + 3)
  assert.match(result.tsSource, /\(1 \+ 2 \+ 3\)/);
});
