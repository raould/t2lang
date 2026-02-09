/**
 * Parser coverage for full type AST forms
 */

import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("parse full type AST forms", async () => {
  const result = await compile(`
    (program
      (type-alias Num (type-number))
      (type-alias Str (type-string))
      (type-alias Bool (type-boolean))
      (type-alias Nil (type-null))
      (type-alias Undef (type-undefined))
      (type-alias Lit (type-literal 1))
      (type-alias Arr (type-ref Array))
      (type-alias Obj (type-object ("x" (type-number))))
      (type-alias Fn (type-function (type-number) (type-string) (type-boolean)))
      (type-alias Uni (type-union (type-number) (type-string)))
      (type-alias Int (type-intersection (type-number) (type-string)))
      (type-assert 1 (type-ref Num)))
  `, );

  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: any })?.ast;

  const aliases = ast.body.filter((s: any) => s.kind === "type-alias");
  assert.strictEqual(aliases.length, 11);
  assert.strictEqual(aliases[0].typeValue.kind, "type-number");
  assert.strictEqual(aliases[1].typeValue.kind, "type-string");
  assert.strictEqual(aliases[2].typeValue.kind, "type-boolean");
  assert.strictEqual(aliases[3].typeValue.kind, "type-null");
  assert.strictEqual(aliases[4].typeValue.kind, "type-undefined");
  assert.strictEqual(aliases[5].typeValue.kind, "type-literal");
  assert.strictEqual(aliases[6].typeValue.kind, "type-ref");
  assert.strictEqual(aliases[7].typeValue.kind, "type-object-literal");
  assert.strictEqual(aliases[8].typeValue.kind, "type-function");
  assert.strictEqual(aliases[9].typeValue.kind, "type-union");
  assert.strictEqual(aliases[10].typeValue.kind, "type-intersection");

  const lastStmt = ast.body[ast.body.length - 1];
  assert.strictEqual(lastStmt.kind, "exprStmt");
  const typeAssert = lastStmt.expr;
  assert.strictEqual(typeAssert.kind, "type-assert");
  assert.strictEqual(typeAssert.assertedType.kind, "type-ref");
});
