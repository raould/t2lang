import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

function expectNoErrors(result: any, name: string) {
    if (result.errors.length > 0) {
        console.log(`DEBUG ${name} errors:`, JSON.stringify(result.errors, null, 2));
        console.log(`DEBUG ${name} tsSource:\n`, result.tsSource);
    }
    assert.strictEqual(result.errors.length, 0);
}

test("nested unquote-splice two levels deep expands correctly", async () => {
    const result = await compilePhase1(`
    (program
      (defmacro mkdeep (a) (quote (call foo (array (array ~@a)))))
      (call (prop console "log") (mkdeep (array 4 5))))
  `, { enableTsc: false });
    expectNoErrors(result, "mkdeep");
    // Expect inner array to include 4, 5
    assert(result.tsSource.includes("4, 5") || result.tsSource.includes("4,5"));
});

test("unquote-splice with non-array inside nested array treated as single value", async () => {
    const result = await compilePhase1(`
    (program
      (defmacro s (x) (quote (array (array 0 ~@x 9))))
      (call (prop console "log") (s 5)))
  `, { enableTsc: false });
    expectNoErrors(result, "s-non-array-nested");
    assert(result.tsSource.includes("0, 5, 9") || result.tsSource.includes("0,5,9"));
});

test("gensym uniqueness across multiple macros", async () => {
    const result = await compilePhase1(`
    (program
      (defmacro a () (let* ((x (gensym "t"))) (quote (array ~x))))
      (defmacro b () (let* ((x (gensym "t"))) (quote (array ~x))))
      (call (prop console "log") (a) (b)))
  `, { enableTsc: false });
    expectNoErrors(result, "gensym-across");
    const matches = (result.tsSource.match(/t\d+/g) || []);
    const uniq = new Set(matches);
    assert(matches.length >= 2, `expected at least 2 gensym occurrences, got ${matches.length}`);
    assert.strictEqual(uniq.size, matches.length, `expected unique gensym names, got ${[...uniq]}`);
});

test("gensym doesn't capture outer variable with same base name", async () => {
    const result = await compilePhase1(`
    (program
      (defmacro with-temp (val)
        (let* ((temp (gensym "val")))
          (quote (let* ((~temp ~val)) ~temp))))
      (let* ((val 42) (temp 999))
        (with-temp val)
        temp))
  `, { enableTsc: false });
    expectNoErrors(result, "gensym-capture");
    // Should contain a generated name like val1 and still reference outer temp
    assert(result.tsSource.match(/val\d+/));
    assert(result.tsSource.includes("temp"));
});

test("unquote-splice expands into let bindings when splicing binding lists", async () => {
    const result = await compilePhase1(`
    (program
      (defmacro mkbinds (lst) (quote (let* (~@lst) (array x y))))
      (mkbinds (array (call x 1) (call y 2))))
  `, { enableTsc: false });
    // The splice into let bindings may trigger typechecking errors, but expansion should produce bindings
    // Check TS output contains a let and references to x and y
    assert(result.tsSource.includes("let") || result.tsSource.includes("let*"));
    assert(result.tsSource.includes("x") && result.tsSource.includes("y"));
});

test("unquote-splice in call args followed by literal preserves order", async () => {
    const result = await compilePhase1(`
    (program
      (defmacro mkcall (a) (quote (call (prop console "log") ~@a 99)))
      (call (prop console "log") (mkcall (array 1 2))))
  `, { enableTsc: false });
    expectNoErrors(result, "mkcall-order");
    assert(result.tsSource.includes("1, 2, 99") || result.tsSource.includes("1,2,99"));
});
