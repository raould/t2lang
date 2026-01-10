/**
 * Test for class, type-assert, throw, try-catch (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

// Class tests
test("simple class with field", async () => {
  const result = await compilePhase0(`
    (program
      (class Person
        (field "name" "John")))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("class Person"));
  assert.ok(result.tsSource.includes('name = "John"'));
});

test("class with method", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((console (obj (field "log" (fn (x) x)))))
        (class Greeter
          (method "greet" ()
            (call (prop console "log") "Hello"))))
    )
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("class Greeter"));
  assert.ok(result.tsSource.includes("greet()"));
  assert.ok(result.tsSource.includes("console.log"));
});

test("class with method params", async () => {
  const result = await compilePhase0(`
    (program
      (class Calculator
        (method "add" (a b)
          (return (+ a b))))
    )
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("add(a, b)"));
  assert.ok(result.tsSource.includes("return (a + b)"));
});

test("class with field and method", async () => {
  const result = await compilePhase0(`
    (program
      (class Counter
        (field "count" 0)
        (method "increment" ()
          (assign (prop this "count") (+ (prop this "count") 1)))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("count = 0"));
  assert.ok(result.tsSource.includes("increment()"));
});

// Type assert tests
test("simple type assert", async () => {
  const result = await compilePhase0(`(program (let* ((x 1)) (type-assert x "number")))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("(x as number)"));
});

test("type assert on expression", async () => {
  const result = await compilePhase0(`(program (function getValue () "ok") (type-assert (getValue) "string"))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("(getValue() as string)"));
});

// Throw tests
test("throw error", async () => {
  const result = await compilePhase0(`(program (let* ((Error (fn (x) x))) (throw (new Error "oops"))))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes('throw new Error("oops")'));
});

test("throw variable", async () => {
  const result = await compilePhase0(`(program (let* ((e "oops")) (throw e)))`, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("throw e"));
});

// Try-catch tests
test("simple try-catch", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((riskyOp (fn () null))
             (log (fn (x) x)))
        (try
          (riskyOp)
          (catch e
            (log e)))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("try {"));
  assert.ok(result.tsSource.includes("riskyOp()"));
  assert.ok(result.tsSource.includes("catch (e)"));
  assert.ok(result.tsSource.includes("log(e)"));
});

test("try-catch with finally", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((open (fn () null))
             (close (fn () null))
             (log (fn (x) x)))
        (try
          (open)
          (catch e
            (log e))
          (finally
            (close)))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("try {"));
  assert.ok(result.tsSource.includes("catch (e)"));
  assert.ok(result.tsSource.includes("finally {"));
  assert.ok(result.tsSource.includes("close()"));
});

test("try-catch with multiple statements", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((step1 (fn () null))
             (step2 (fn () null))
             (log (fn (x) x))
             (recover (fn () null)))
        (try
          (step1)
          (step2)
          (catch err
            (log err)
            (recover)))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("step1()"));
  assert.ok(result.tsSource.includes("step2()"));
  assert.ok(result.tsSource.includes("log(err)"));
  assert.ok(result.tsSource.includes("recover()"));
});

test("try-catch with empty catch body still emits catch", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((risky (fn () null)))
        (try
          (risky)
          (catch e))))
  `, { enableTsc: true });
  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("try {"));
  assert.ok(result.tsSource.includes("catch (e)"));
});
