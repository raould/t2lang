
import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("Function declaration is visible in outer scope", async () => {
  const result = await compilePhase0(`
    (program
      (fn declaredFunc (x) x)
      (declaredFunc 1))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.ok(result.events.find(e => e.kind === "identifierResolved" && e.data.name === "declaredFunc"));
});

test("NFE name is NOT visible in outer scope (should fail resolution)", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((f (fn nfeName (x) x)))
        (nfeName 1)))
  `, { enableTsc: false });

  // Under current "hoisting" bug, this probably succeeds (errors.length === 0)
  // We want to asserting that it FAILS if fixed, or demonstrating it passes if broken.
  // The user says "hoisting issue", implying it currently leaks.
  // So we expect this to currently PASS (bug), and after fix it should FAIL (feature).

  // For the repro, I will assert "ok" to confirm the BUG exists.
  // After fix, I will update it to assert "fail".

  // Wait, I should implement the fix directly. I'll write the test assuming the FIX.

  const unresolved = result.events.find(e => e.kind === "unresolvedIdentifier" && e.data.name === "nfeName");
  assert.ok(unresolved, "nfeName should be unresolved in outer scope");
});

test("NFE name IS visible inside function body", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((factorial (fn fact (n)
                          (if n (fact 0) 1))))
        (factorial 5)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // 'fact' should be resolved inside
});
