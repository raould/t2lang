/**
 * Test for const bindings (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("const binding", async () => {
  const result = await compilePhase0(`(program (const ((foo (fn (x) x)) (x 42)) (foo x)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("const x = 42"));
});

test("const sequential binding - later can reference earlier", async () => {
  const result = await compilePhase0(`(program (const ((foo (fn (x) x)) (x 1) (y x)) (foo y)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("const x = 1"));
  assert.ok(result.tsSource.includes("const y = x"));
});

test("const with multiple bindings", async () => {
  const result = await compilePhase0(`
    (program
      (const ((foo (fn (a b c) a)) (a 1) (b 2) (c 3))
        (foo a b c)))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("const a = 1"));
  assert.ok(result.tsSource.includes("const b = 2"));
  assert.ok(result.tsSource.includes("const c = 3"));
});

test("let still produces let keyword", async () => {
  const result = await compilePhase0(`(program (let* ((foo (fn (x) x)) (x 42)) (foo x)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("let x = 42"));
  assert.ok(!result.tsSource.includes("const x"));
});
