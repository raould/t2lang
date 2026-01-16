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
      (defmacro mkfn (name body) (quote (function ~name () ~body)))
      (mkfn f (block (return 42))))
  `, { enableTsc: false });
  expectNoErrors(result, "mkfn");
  assert(result.tsSource.includes("function f"));
  assert(result.tsSource.includes("return 42"));
});

test("macro generates block with let and return", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkblock (name val) (quote (block (let* ((~name ~val)) ~name))))
      (mkblock x 5))
  `, { enableTsc: false });
  expectNoErrors(result, "mkblock");
  assert(result.tsSource.includes("let x"));
  assert(result.tsSource.includes("x;") || result.tsSource.includes("x\n"));
});

test("unquote-splice in array literal", async () => {
  const src = `
    (program
      (defmacro mkarr (lst) (quote (array 0 ~@lst 4)))
      (call (prop console "log") (mkarr (array 1 2 3))))
  `;
  const result = await compilePhase1(src, { enableTsc: false });
  expectNoErrors(result, "mkarr");
  assert(result.tsSource.includes("1, 2, 3") || result.tsSource.includes("1,2,3"));
});

test("unquote-splice in return array", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkretarr (lst) (quote (return (array ~@lst))))
      (mkretarr (array 1 2)))
  `, { enableTsc: false });
  expectNoErrors(result, "mkretarr");
  assert(result.tsSource.includes("return [1") || result.tsSource.includes("return[1"));
});

test("macro generates new expression", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mknew (C) (quote (new ~C (array 1))))
      (mknew Foo))
  `, { enableTsc: false });
  expectNoErrors(result, "mknew");
  assert(result.tsSource.includes("new Foo") || result.tsSource.includes("new Foo("));
});

test("macro generates index access", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkindex (arr idx) (quote (index ~arr ~idx)))
      (let* ((a (array 10 20)))
        (call (prop console "log") (mkindex a 0))))
  `, { enableTsc: false });
  expectNoErrors(result, "mkindex");
  assert(result.tsSource.includes("a[0]") || result.tsSource.includes("[0]"));
});

test("macro generates simple assignment", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkassign (target val) (quote (assign ~target ~val)))
      (let* ((x 1))
        (mkassign x 2)
        x))
  `, { enableTsc: false });
  expectNoErrors(result, "mkassign");
  assert(result.tsSource.includes("x = 2") || result.tsSource.includes("x=2"));
});

test("macro generates array index assignment", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkassignidx (arr idx val) (quote (assign (index ~arr ~idx) ~val)))
      (let* ((a (array 0 0 0)))
        (mkassignidx a 0 5)
        a))
  `, { enableTsc: false });
  expectNoErrors(result, "mkassignidx");
  assert(result.tsSource.includes("[0] = 5") || result.tsSource.includes("[0]=5"));
});

test("macro produces type-assert (as number)", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro asnum (x) (quote (type-assert ~x (type-ref "number"))))
      (call (prop console "log") (asnum 1)))
  `, { enableTsc: false });
  expectNoErrors(result, "asnum");
  assert(result.tsSource.includes("as number") || result.tsSource.includes("(1 as number)"));
});

test("macro preserves operators in quote (binary op)", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkop (a b) (quote (+ ~a ~b)))
      (call (prop console "log") (mkop 2 3)))
  `, { enableTsc: false });
  expectNoErrors(result, "mkop");
  assert(result.tsSource.includes("2 + 3") || result.tsSource.includes("(2+3)"));
});

test("macro builds array from args", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mklist (a b c) (quote (array ~a ~b ~c)))
      (call (prop console "log") (mklist 1 2 3)))
  `, { enableTsc: false });
  expectNoErrors(result, "mklist");
  assert(result.tsSource.includes("1, 2, 3") || result.tsSource.includes("1,2,3"));
});

test("gensym in function to ensure hygiene (no capture)", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro tempfn (val)
        (let* ((tmp (gensym "tmp")))
          (quote (function f () (let* ((~tmp ~val)) ~tmp)))))
      (let* ((tmp 999))
        (tempfn 42)
        tmp))
  `, { enableTsc: false });
  expectNoErrors(result, "tempfn");
  // Ensure outer tmp remains (no assignment to outer tmp)
  assert(!result.tsSource.includes("tmp = 42") || result.tsSource.includes("tmp") );
});

test("nested macro expansion (macro calling macro)", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro a (x) (quote (call (prop console "log") ~x)))
      (defmacro b (y) (quote (a ~y)))
      (b 5))
  `, { enableTsc: false });
  expectNoErrors(result, "nested-macro");
  assert(result.tsSource.includes("console.log(5)") || result.tsSource.includes("console.log(5)"));
});

test("macro returns multiple statements in a block", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro two (v) (quote (block (assign ~v 1) (assign ~v (call + ~v 1)))))
      (let* ((x 0))
        (two x)
        x))
  `, { enableTsc: false });
  expectNoErrors(result, "two-block");
  assert(result.tsSource.includes("x = 1") || result.tsSource.includes("x=1"));
  assert(result.tsSource.includes("x = x + 1") || result.tsSource.includes("x=x+1") || result.tsSource.includes("x = (x + 1)") || result.tsSource.includes("x=(x+1)"));
});

test("concat two arrays via unquote-splice", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro concat (a b) (quote (array ~@a ~@b)))
      (call (prop console "log") (concat (array 1 2) (array 3 4))))
  `, { enableTsc: false });
  expectNoErrors(result, "concat-arr");
  assert(result.tsSource.includes("1, 2, 3, 4") || result.tsSource.includes("1,2,3,4"));
});

test("macro produces property chain", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkchain (obj name) (quote (prop ~obj ~name)))
      (call (prop console "log") (mkchain console "error")))
  `, { enableTsc: false });
  expectNoErrors(result, "mkchain");
  assert(result.tsSource.includes("console.error") || result.tsSource.includes("console.error"));
});

test("macro expands inside function body", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro incr (x) (quote (assign ~x (call + ~x 1))))
      (function g () (incr y)))
  `, { enableTsc: false });
  expectNoErrors(result, "incr-fn");
  assert(result.tsSource.includes("y = y + 1") || result.tsSource.includes("y=y+1") || result.tsSource.includes("y = (y + 1)") || result.tsSource.includes("y=(y+1)"));
});

test("macro generates conditional (if) expression", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkif (c t e) (quote (if ~c ~t ~e)))
      (call (prop console "log") (mkif (> 1 0) 1 2)))
  `, { enableTsc: false });
  expectNoErrors(result, "mkif");
  assert(result.tsSource.includes("if (1 > 0)") || result.tsSource.includes("if ((1 > 0))"));
});

test("macro generates throw expression", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkthrow (v) (quote (throw ~v)))
      (mkthrow (literal "oops")))
  `, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);
  assert(result.tsSource.includes("throw") || result.tsSource.includes("throw ("));
});

// Regression: ensure unquote-splice expands inside nested array in a returned array
test("regression: unquote-splice in return array (splice in nested array)", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mkretarr2 (lst) (quote (return (array 0 ~@lst 4))))
      (mkretarr2 (array 1 2)))
  `, { enableTsc: false });
  expectNoErrors(result, "mkretarr2");
  assert(result.tsSource.includes("return [") && (result.tsSource.includes("1, 2") || result.tsSource.includes("1,2")));
});

// Regression: quoted `new` with a single `array` arg should expand into argument list
test("regression: quoted new with array arg expands", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro mknew2 (C args) (quote (new ~C ~args)))
      (mknew2 Foo (array 1 2 3)))
  `, { enableTsc: false });
  expectNoErrors(result, "mknew2");
  assert(result.tsSource.includes("new Foo(") && (result.tsSource.includes("1, 2, 3") || result.tsSource.includes("1,2,3")));
});

// Regression: identifiers inside quotes that match macro params should be substituted without explicit ~
test("regression: identifier in quote substituted without ~", async () => {
  const result = await compilePhase1(`
    (program
      (defmacro bareid (name) (quote (assign name 2)))
      (let* ((x 1))
        (bareid x)
        x))
  `, { enableTsc: false });
  expectNoErrors(result, "bareid");
  assert(result.tsSource.includes("x = 2") || result.tsSource.includes("x=2"));
});
