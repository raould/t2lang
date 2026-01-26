import test from "node:test";
import assert from "node:assert";
import { parseSource } from "../src/parse.js";
import { LetStarExpr, ExprStmt, ArrayExpr, Identifier } from "../src/phaseA1.js";

test("parseSource skips comments and preserves original line numbers", () => {
  const source = `(program
; line comment
(let* ((x 1)) x) // trailing comment
/* block
comment */
(array 1 2)
)`;

  const program = parseSource(source, "comments.t2");
  const letStar = program.body[0];
  assert.ok(letStar instanceof LetStarExpr);
  assert.strictEqual(letStar.span.startLine, 3);

  const bindingTarget = letStar.bindings[0].target;
  assert.ok(bindingTarget instanceof Identifier);
  assert.strictEqual(bindingTarget.span.startLine, 3);

  const arrayStmt = program.body[1];
  assert.ok(arrayStmt instanceof ExprStmt);
  assert.ok(arrayStmt.expr instanceof ArrayExpr);
  assert.strictEqual(arrayStmt.span.startLine, 6);
});
