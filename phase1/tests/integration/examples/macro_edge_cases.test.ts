import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

test("nested macro calls", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro inc (x) (+ x 1))
      (defmacro double (x) (* x 2))
      (double (inc 5)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // Should expand to ((5 + 1) * 2)
  assert(result.tsSource.includes("(5 + 1)"));
  assert(result.tsSource.includes("* 2"));
});

test("macro hygiene - gensym prevents capture", async () => {
  // This test verifies that gensym creates unique names that don't
  // capture variables from the call site
  // Using ~ shorthand for unquote
  const result = await compilePhase1(`
    (program
      (defmacro swap (a b)
        (let* ((tmp (gensym "tmp")))
          (quote (let* ((~tmp ~a))
            (assign ~a ~b)
            (assign ~b ~tmp)))))
      (let* ((x 1) (y 2) (tmp 999))
        (swap x y)
        (array x y tmp)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // The macro should use tmp1 (or similar), not capture the outer tmp
  assert(result.tsSource.includes("tmp1"));
  // The outer tmp should still be referenced
  assert(result.tsSource.includes("tmp"));
});

test("macro with empty body returns null", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro noop ())
      (noop))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // Empty macro returns null literal
  assert(result.tsSource.includes("null"));
});

test("macro parameter shadowing", async () => {
  // Test that macro parameters shadow outer bindings during expansion
  // Note: defmacro must be at top level, so we test with a simple substitution
  const result = await compilePhase1(`
    (program
      (defmacro use-param (x) (+ x 1))
      (let* ((x 100))
        (use-param 5)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // Should expand to (5 + 1), the macro parameter x shadows the let-bound x
  assert(result.tsSource.includes("5 + 1"));
});

test("macro with if expression", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro unless (cond body)
        (quote (if ~cond null ~body)))
      (unless (== x 0) (/ 1 x)))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // Should produce if with inverted logic
  assert(result.tsSource.includes("if"));
  assert(result.tsSource.includes("null"));
  assert(result.tsSource.includes("1 / x"));
});

test("multiple gensyms produce unique names", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro multi-temp ()
        (let* ((a (gensym "t"))
               (b (gensym "t"))
               (c (gensym "t")))
          (quote (let* ((~a 1)
                        (~b 2)
                        (~c 3))
            (+ ~a (+ ~b ~c))))))
      (multi-temp))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // Should have three unique temp names
  assert(result.tsSource.includes("t1"));
  assert(result.tsSource.includes("t2"));
  assert(result.tsSource.includes("t3"));
});

test("macro preserves operators in quote", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro math (a b)
        (quote (+ ~a (* ~b 2))))
      (math 1 3))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  // Should preserve the + and * operators
  assert(result.tsSource.includes("1 + "));
  assert(result.tsSource.includes("3 * 2"));
});

test("unquote-splice with ~@ syntax", async () => {
  // Test that ~@ is lexed correctly (even if not fully implemented)
  const result = await compilePhase1(`
    (program
      (defmacro test-splice (items)
        (quote ~@items))
      (test-splice (array 1 2 3)))
  `, { enableTsc: false });
  // For now, just verify it parses without error
  assert.strictEqual(result.errors.length, 0);
});
