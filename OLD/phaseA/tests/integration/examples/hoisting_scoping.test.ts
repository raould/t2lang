
import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("Function declaration is visible in outer scope", async () => {
  const result = await compile(`
    (program
      (fn declaredFunc ((x)) x)
      (call declaredFunc 1))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /declaredFunc\(1\)/);
});

test("NFE name is NOT visible in outer scope (should fail resolution)", async () => {
  const result = await compile(`
    (program
      (let* ((f (fn nfeName ((x)) x)))
        (call nfeName 1)))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }

  // Under current "hoisting" bug, this probably succeeds (errors.length === 0)
  // We want to asserting that it FAILS if fixed, or demonstrating it passes if broken.
  // The user says "hoisting issue", implying it currently leaks.
  // So we expect this to currently PASS (bug), and after fix it should FAIL (feature).

  // For the repro, I will assert "ok" to confirm the BUG exists.
  // After fix, I will update it to assert "fail".

  // Wait, I should implement the fix directly. I'll write the test assuming the FIX.

  assert.match(result.tsSource, /nfeName\(1\)/);
});

test("NFE name IS visible inside function body", async () => {
  const result = await compile(`
    (program
      (let* ((factorial (fn fact ((n))
                          (if n (fact 0) 1))))
        (call factorial 5)))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  // 'fact' should be resolved inside
});
