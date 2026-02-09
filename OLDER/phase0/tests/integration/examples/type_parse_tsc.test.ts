/**
 * Parser coverage for full type AST forms (with TSC enabled)
 */

import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
import { Program, TypeAliasStmt, TypeAssertExpr } from "../../../src/ast/nodes";

const nonTsc = (errors: any[]) => errors.filter(e => e.phase !== "tsc");

test("parse full type AST forms", async () => {
  const result = await compilePhase0(`
    (program
      (type-alias Num (type-number))
      (type-alias Str (type-string))
      (type-alias Bool (type-boolean))
      (type-alias Nil (type-null))
      (type-alias Undef (type-undefined))
      (type-alias Lit (type-literal 1))
      (type-alias Arr (type-array (type-number)))
      (type-alias Obj (type-object ("x" (type-number))))
      (type-alias Fn (type-function ((type-number) (type-string)) (type-boolean)))
      (type-alias Uni (type-union (type-number) (type-string)))
      (type-alias Int (type-intersection (type-number) (type-string)))
      (type-assert 1 (type-ref "Num")))
  `, { enableTsc: true });

  assert.strictEqual(nonTsc(result.errors).length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const aliases = ast.body.filter((s): s is TypeAliasStmt => s.kind === "type-alias");
  assert.strictEqual(aliases.length, 11);
  assert.strictEqual(aliases[0].typeAnnotation.kind, "type-number");
  assert.strictEqual(aliases[1].typeAnnotation.kind, "type-string");
  assert.strictEqual(aliases[2].typeAnnotation.kind, "type-boolean");
  assert.strictEqual(aliases[3].typeAnnotation.kind, "type-null");
  assert.strictEqual(aliases[4].typeAnnotation.kind, "type-undefined");
  assert.strictEqual(aliases[5].typeAnnotation.kind, "type-literal");
  assert.strictEqual(aliases[6].typeAnnotation.kind, "type-array");
  assert.strictEqual(aliases[7].typeAnnotation.kind, "type-object");
  assert.strictEqual(aliases[8].typeAnnotation.kind, "type-function");
  assert.strictEqual(aliases[9].typeAnnotation.kind, "type-union");
  assert.strictEqual(aliases[10].typeAnnotation.kind, "type-intersection");

  const lastStmt = ast.body[ast.body.length - 1];
  assert.strictEqual(lastStmt.kind, "exprStmt");
  const typeAssert = (lastStmt.expr as TypeAssertExpr);
  assert.strictEqual(typeAssert.kind, "type-assert");
  assert.strictEqual(typeAssert.typeAnnotation.kind, "type-ref");
});
