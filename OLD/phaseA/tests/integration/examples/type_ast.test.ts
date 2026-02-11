/**
 * Tests for extended type AST forms and type-alias
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("extended type nodes and type-alias", async () => {
  const result = await compile(`
    (program
      (type-alias Foo (type-object ("x" (type-number)) ("y" (type-string))))
      (type-alias Fn (type-function (type-number) (type-string) (type-boolean)))
      (let* ((v (object ("x" 1) ("y" "ok"))))
        (type-assert v (type-ref Foo))
        (type-assert true (type-boolean))
        (type-assert null (type-null))
        (type-assert undefined (type-undefined))
        (type-assert "hi" (type-literal "hi"))))
  `, );

  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /type Foo = \{ x: number; y: string \}/);
  assert.match(result.tsSource, /type Fn = \(arg0: number, arg1: string\) => boolean/);
  assert.match(result.tsSource, /\(v as Foo\)/);
  assert.match(result.tsSource, /\(true as boolean\)/);
  assert.match(result.tsSource, /\(null as null\)/);
  assert.match(result.tsSource, /\(undefined as undefined\)/);
  assert.match(result.tsSource, /\("hi" as "hi"\)/);
});
