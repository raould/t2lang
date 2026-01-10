import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

// 1) Recursive macro expansion
test("recursive macro expansion expands nested macro calls", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkadd (n) (quote (+ ~n ~n)))
      (mkadd (mkadd 2)))
  `, {});
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  // Expect nested expansion: ((2 + 2) + (2 + 2)) or similar (infix form)
  assert(result.tsSource.includes("2 + 2"));
});

// 2) Unquote-splice should insert array elements into call args
test("unquote-splice inserts array elements into call args", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro call-with-list (lst) (quote (call (prop console "log") ~@lst)))
      (call-with-list (array 1 2 3)))
  `, {});
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  // Should produce console.log(1, 2, 3)
  assert(result.tsSource.includes("console.log(1, 2, 3)") || result.tsSource.includes("console.log(1,2,3)"));
});

// 3) Nested gensym hygiene: inner gensym should not capture outer ident with same base name
test("nested gensym hygiene prevents capture across nested scopes", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro make-temp-fn (val)
        (let* ((tmp (gensym "tmp")))
          (quote (fn f () (let* ((~tmp ~val)) ~tmp)))))
      (let* ((tmp 999))
        (make-temp-fn 42)
        tmp))
  `, {});
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  // The generated tmp should have the prefix 'tmp' but be unique (e.g., tmp1), and outer tmp should remain 999
  assert(result.tsSource.includes("tmp") && !result.tsSource.includes("tmp = 42"));
});
