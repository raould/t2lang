/**
 * Test for class, type-assert, throw, try-catch
 */

import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

// Class tests
test("simple class with field", async () => {
  const result = await compile(`
    (program
      (class Person
        (class-body
          (field "name" "John"))))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /class Person/);
  assert.match(result.tsSource, /name = "John"/);
});

test("class with method", async () => {
  const result = await compile(`
    (program
      (let* ((console (obj (field "log" (fn ((x)) x)))))
        (class Greeter
          (class-body
            (method "greet" ()
              (call (prop console "log") "Hello")))))
    )
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /class Greeter/);
  assert.match(result.tsSource, /greet\(\)/);
  assert.match(result.tsSource, /console\.log/);
});

test("class with method params", async () => {
  const result = await compile(`
    (program
      (class Calculator
        (class-body
          (method "add" ((a) (b))
            (return (+ a b)))))
    )
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /add\(a, b\)/);
  assert.match(result.tsSource, /return \(a \+ b\)/);
});

test("class with field and method", async () => {
  const result = await compile(`
    (program
      (class Counter
        (class-body
          (field "count" 0)
          (method "increment" ()
            (assign (prop this "count") (+ (prop this "count") 1))))))
  `, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /count = 0/);
  assert.match(result.tsSource, /increment\(\)/);
});

// Type assert tests
test("simple type assert", async () => {
  const result = await compile(`(program (let* ((x 1)) (type-assert x (type-number))))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\(x as number\)/);
});

test("type assert on expression", async () => {
  const result = await compile(`(program (fn getValue () "ok") (type-assert (getValue) (type-string)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\(getValue\(\) as string\)/);
});

// Throw tests
test("throw error", async () => {
  const result = await compile(`(program (let* ((Error (fn ((x)) x))) (throw (new Error "oops"))))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /throw new Error\("oops"\)/);
});

test("throw variable", async () => {
  const result = await compile(`(program (let* ((e "oops")) (throw e)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /throw e/);
});

// Try-catch tests
test("simple try-catch", async () => {
  const result = await compile(`
    (program
      (let* ((riskyOp (fn () null))
            (log (fn ((x)) x)))
        (try
          (riskyOp)
          (catch e
            (log e)))))
  `, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /try \{/);
  assert.match(result.tsSource, /riskyOp\(\)/);
  assert.match(result.tsSource, /catch \(e\)/);
  assert.match(result.tsSource, /log\(e\)/);
});

test("try-catch with finally", async () => {
  const result = await compile(`
    (program
      (let* ((open (fn () null))
             (close (fn () null))
                 (log (fn ((x)) x)))
        (try
          (open)
          (catch e
            (log e))
          (finally
            (close)))))
  `, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /try \{/);
  assert.match(result.tsSource, /catch \(e\)/);
  assert.match(result.tsSource, /finally \{/);
  assert.match(result.tsSource, /close\(\)/);
});

test("try-catch with multiple statements", async () => {
  const result = await compile(`
    (program
      (let* ((step1 (fn () null))
             (step2 (fn () null))
               (log (fn ((x)) x))
             (recover (fn () null)))
        (try
          (step1)
          (step2)
          (catch err
            (log err)
            (recover)))))
  `, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /step1\(\)/);
  assert.match(result.tsSource, /step2\(\)/);
  assert.match(result.tsSource, /log\(err\)/);
  assert.match(result.tsSource, /recover\(\)/);
});

test("try-catch with empty catch body still emits catch", async () => {
  const result = await compile(`
    (program
      (let* ((risky (fn () null)))
        (try
          (risky)
          (catch e))))
  `, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /try \{/);
  assert.match(result.tsSource, /catch \(e\)/);
});
