import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../src/api.js";

test("arithmetic operators emit infix and typecheck", async () => {
    const src = `
  (program
    (expr (+ 1 2))
    (expr (** 2 3))
    (expr (- 5 3))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    // Ensure emitted TS contains infix operators
    assert.ok(res.tsSource.includes("(1 + 2)") || res.tsSource.includes("1 + 2"));
    assert.ok(res.tsSource.includes("(2 ** 3)") || res.tsSource.includes("2 ** 3"));
    assert.strictEqual(res.errors.length, 0);
});

test("boolean logic and/or/not/xor", async () => {
    const src = `
  (program
    (expr (and true false))
    (expr (or true false))
    (expr (not false))
    (expr (xor true false))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    assert.strictEqual(res.errors.length, 0);
    assert.ok(res.tsSource.includes("&&") || res.tsSource.includes("and"));
});
