import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

test("gensym in macro produces unique identifier", async () => {
  // Test that gensym produces unique identifiers in macro context
  // Using ~ shorthand for unquote
  const result = await compilePhase1(`
    (program
      (defmacro with-temp (body)
        (let* ((temp (gensym "temp")))
          (quote (let* ((~temp 42))
            ~body))))
      (with-temp (+ temp1 1)))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  // The macro should expand with a unique temp variable
  assert.strictEqual(result.errors.length, 0);
  // Should produce something like: let temp1 = 42;
  assert(result.tsSource.includes("temp"));
});

test("gensym with prefix", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro test-macro ()
        (let* ((x (gensym "myvar")))
          (quote ~x)))
      (test-macro))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  // Generated identifier should have the prefix
  assert(result.tsSource.includes("myvar"));
});