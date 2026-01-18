/**
 * Test for boolean, null, and undefined literals (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("boolean literal true", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (foo true))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("foo(true)"));
});

test("boolean literal false", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (foo false))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("foo(false)"));
});

test("null literal", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (foo null))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("foo(null)"));
});

test("undefined literal", async () => {
  const result = await compilePhase0(`(program (fn foo (x) x) (foo undefined))`, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("foo(undefined)"));
});

test("mixed literals in let binding", async () => {
  const result = await compilePhase0(`
    (program
      (fn foo (a b c d) a)
      (let* ((a true)
            (b false)
            (c null)
            (d undefined))
        (foo a b c d)))
  `, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("let a = true"));
  assert.ok(result.tsSource.includes("let b = false"));
  assert.ok(result.tsSource.includes("let c = null"));
  assert.ok(result.tsSource.includes("let d = undefined"));
});

test("string literal escapes", async () => {
  const result = await compilePhase0(String.raw`
    (program
      (fn foo (x) x)
      (foo "line1\n\"line2\"")
    )
  `, { enableTsc: true });
  const nonTscErrors = result.errors.filter(e => e.phase !== "tsc");
  assert.strictEqual(nonTscErrors.length, 0);
  assert.ok(result.tsSource.includes("\\n"));
  assert.ok(result.tsSource.includes("\\\"line2\\\""));
});