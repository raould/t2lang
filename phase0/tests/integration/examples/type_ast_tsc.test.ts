/**
 * Tests for extended type AST forms and type-alias (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("extended type nodes and type-alias", async () => {
  const result = await compilePhase0(`
    (program
      (type-alias Foo (type-object ("x" (type-number)) ("y" (type-string))))
      (type-alias Fn (type-function ((type-number) (type-string)) (type-boolean)))
      (let* ((v (obj (field "x" 1) (field "y" "ok"))))
        (type-assert v (type-ref "Foo"))
        (type-assert true (type-boolean))
        (type-assert null (type-null))
        (type-assert undefined (type-undefined))
        (type-assert "hi" (type-literal "hi"))))
  `, { enableTsc: true });

  assert.strictEqual(nonTsc(result.errors).length, 0);
  assert.ok(result.tsSource.includes("type Foo = { x: number, y: string }"));
  assert.ok(result.tsSource.includes("type Fn = (number, string) => boolean"));
  assert.ok(result.tsSource.includes("(v as Foo)"));
  assert.ok(result.tsSource.includes("(true as boolean)"));
  assert.ok(result.tsSource.includes("(null as null)"));
  assert.ok(result.tsSource.includes("(undefined as undefined)"));
    assert.ok(result.tsSource.includes('("hi" as "hi")'));
});
