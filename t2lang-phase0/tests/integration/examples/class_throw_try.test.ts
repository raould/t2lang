/**
 * Test for class, type-assert, throw, try-catch
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

// Class tests
test("simple class with field", async () => {
  const result = await compilePhase0(`
    (program
      (class Person
        (field "name" "John")))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /class Person/);
  assert.match(result.tsSource, /name = "John"/);
});

test("class with method", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((console (obj (field "log" (fn (x) x)))))
        (class Greeter
          (method "greet" ()
            (call (prop console "log") "Hello"))))
    )
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /class Greeter/);
  assert.match(result.tsSource, /greet()/);
  assert.match(result.tsSource, /console.log/);
});

test("class with method params", async () => {
  const result = await compilePhase0(`
    (program
      (class Calculator
        (method "add" (a b)
          (return (+ a b))))
    )
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /add(a, b)/);
  assert.match(result.tsSource, /return (a + b)/);
});

test("class with field and method", async () => {
  const result = await compilePhase0(`
    (program
      (class Counter
        (field "count" 0)
        (method "increment" ()
          (assign (prop this "count") (+ (prop this "count") 1)))))
  `, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /count = 0/);
  assert.match(result.tsSource, /increment()/);
});

// Type assert tests
test("simple type assert", async () => {
  const result = await compilePhase0(`(program (let* ((x 1)) (type-assert x "number")))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /(x as number)/);
});

test("type assert on expression", async () => {
  const result = await compilePhase0(`(program (fn getValue () "ok") (type-assert (getValue) "string"))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /(getValue() as string)/);
});

// Throw tests
test("throw error", async () => {
  const result = await compilePhase0(`(program (let* ((Error (fn (x) x))) (throw (new Error "oops"))))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /throw new Error("oops")/);
});

test("throw variable", async () => {
  const result = await compilePhase0(`(program (let* ((e "oops")) (throw e)))`, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /throw e/);
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
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /try {/);
  assert.match(result.tsSource, /riskyOp()/);
  assert.match(result.tsSource, /catch (e)/);
  assert.match(result.tsSource, /log(e)/);
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
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /try {/);
  assert.match(result.tsSource, /catch (e)/);
  assert.match(result.tsSource, /finally {/);
  assert.match(result.tsSource, /close()/);
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
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /step1()/);
  assert.match(result.tsSource, /step2()/);
  assert.match(result.tsSource, /log(err)/);
  assert.match(result.tsSource, /recover()/);
});

test("try-catch with empty catch body still emits catch", async () => {
  const result = await compilePhase0(`
    (program
      (let* ((risky (fn () null)))
        (try
          (risky)
          (catch e))))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /try {/);
  assert.match(result.tsSource, /catch (e)/);
});
