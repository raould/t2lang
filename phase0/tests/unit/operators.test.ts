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
    assert.match(res.tsSource, /\(1 \+ 2\)/);
    assert.match(res.tsSource, /\(2 \*\* 3\)/);
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
    assert.match(res.tsSource, /&&/);
});

test("plus should concatenate strings when string operands present", async () => {
    const src = `
  (program
    (expr (+ "a" "b"))
    (expr (+ "A" "B" "C"))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    // Expect no type errors and emitted TS uses + for concatenation
    assert.strictEqual(res.errors.length, 0, `Unexpected type errors: ${JSON.stringify(res.errors)}`);
    assert.match(res.tsSource, /\("a" \+ "b"\)/);
    assert.match(res.tsSource, /\("A" \+ "B" \+ "C"\)/);
});

test("double-bang (!!) coerces to boolean and emits !!", async () => {
    const src = `
  (program
    (expr (!! 0))
    (expr (!! ""))
    (expr (!! true))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    assert.strictEqual(res.errors.length, 0);
    assert.match(res.tsSource, /!!/);
});
