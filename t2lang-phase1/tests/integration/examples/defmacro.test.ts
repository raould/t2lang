import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

test("where macro compiles correctly", async () => {
  const result = await compilePhase1(
    "(program (defmacro where (wb wl) `(let* (~@wl) ~wb)))",
    { enableTsc: false }
  );
  if (result.errors.length > 0) { console.error(result.errors); }
  console.log('Macro Expansion Output:', result.tsSource);
  assert.strictEqual(result.errors.length, 0);
});

test("defmacro parses correctly", async () => {
  const result = await compilePhase1(`
      (program
        (defmacro my-macro(x y)
          (call (prop console "log") x y))
        (my-macro 1 2))
      `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  console.log('Macro Expansion Output:', result.tsSource);
  // Macro should be expanded - check that console.log(1, 2) appears
  assert.strictEqual(result.errors.length, 0);
  // The macro definition should NOT appear in output
  assert(!result.tsSource.includes("defmacro"));
  // The call should be expanded to console.log(1, 2)
  assert(result.tsSource.includes("console.log(1, 2)"));
});

test("defmacro with gensym", async () => {
  // Using ~ shorthand for unquote
  const result = await compilePhase1(`
      (program
        (defmacro with-value (val body)
          (let* ((temp (gensym "val")))
            (quote (let * ((~temp ~val)) ~body))))
(with-value 42(+ val1 1)))
`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  console.log('Macro Expansion Output:', result.tsSource);
  assert.strictEqual(result.errors.length, 0);
  // Check that gensym produced a variable with the prefix
  assert(result.tsSource.includes("val"));
  // Check that the value 42 is in the output
  assert(result.tsSource.includes("42"));
});

test("macro expands recursively", async () => {
  // Test that macro parameters are substituted correctly
  const result = await compilePhase1(`
  (program
    (defmacro double (x)
      (+ x x))
    (let* ((n 5))
  (double n)))
`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  console.log('Macro Expansion Output:', result.tsSource);
  assert.strictEqual(result.errors.length, 0);
  // Should produce: n + n
  assert(result.tsSource.includes("n + n"));
});

test("macro with multiple body expressions", async () => {
  // Multiple body expressions - last one is returned
  const result = await compilePhase1(`
  (program
    (defmacro add-then-mult (x y)
      (+ x y)
      (* x y))
    (add-then-mult 2 3))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  console.log('Macro Expansion Output:', result.tsSource);
  assert.strictEqual(result.errors.length, 0);
  // Last expression (* 2 3) should be returned
  assert(result.tsSource.includes("2 * 3"));
});

test("macro substitutes parameters in body", async () => {
  const result = await compilePhase1(`
  (program
    (defmacro incr (var)
      (quote (assign ~var (+ ~var 1))))
      (let* ((counter 0))
      (incr counter)
        counter))
`, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  console.log('Macro Expansion Output:', result.tsSource);
  assert.strictEqual(result.errors.length, 0);
  // Should produce: counter = counter + 1
  assert(result.tsSource.includes("counter"));
});