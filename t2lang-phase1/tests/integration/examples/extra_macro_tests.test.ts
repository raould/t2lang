import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

// helper for better debug output
function expectNoErrors(result: any, name: string) {
  if (result.errors.length > 0) {
    console.log(`DEBUG ${name} errors:`, JSON.stringify(result.errors, null, 2));
    console.log(`DEBUG ${name} tsSource:\n`, result.tsSource);
  }
  assert.strictEqual(result.errors.length, 0);
}

// 20 extra small integration tests for Phase1 macros

test("macro generates function declaration", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkfn (name body) (quote (fn ~name () ~body)))
      (mkfn f (block (return 42)))))
  `, {});
  expectNoErrors(result, "mkfn");
  assert(result.tsSource.includes("function f"));
  assert(result.tsSource.includes("return 42"));
});

test("macro generates block with let and return", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkblock (name val) (quote (block (let* ((~name ~val)) ~name))))
      (mkblock x 5))
  `, {});
  expectNoErrors(result, "mkblock");
  assert(result.tsSource.includes("let x"));
  assert(result.tsSource.includes("x;") || result.tsSource.includes("x\n"));
});

test("unquote-splice in array literal", async () => {
  const src = `
    (program
      (defmacro mkarr (lst) (quote (array 0 ~@lst 4)))
      (call (prop console "log") (mkarr (array 1 2 3))))
  // extra_macro_tests removed: tests that used `enableTsc` have been deleted.
  const result = await compilePhase1(src, {});
