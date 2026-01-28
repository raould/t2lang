import test from "node:test";
import assert from "node:assert";
import { parseSource } from "../src/parse.js";
import {
  LetStarExpr,
  ExprStmt,
  ArrayExpr,
  Identifier,
  ForClassic,
  ForOf,
  ForAwait,
  AssignExpr,
  CallExpr,
  ThrowExpr,
  TryCatchExpr,
  SwitchStmt,
} from "../src/phaseA1.js";

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

test("parseSource handles for loops", () => {
  const source = `(program
  (for classic
    (assign i 0)
    (< i 3)
    (+ i 1)
    (call log i))
  (for of
    ((item) items)
    (call log item))
  (for await
    ((value) (call fetchValues))
    (call log value))
)`;

  const program = parseSource(source);
  const [classicLoop, forOfLoop, forAwaitLoop] = program.body;

  assert.ok(classicLoop instanceof ForClassic);
  assert.ok(forOfLoop instanceof ForOf);
  assert.ok(forAwaitLoop instanceof ForAwait);

  assert.ok(classicLoop.init instanceof AssignExpr);
  assert.ok(classicLoop.condition instanceof CallExpr);
  assert.ok(classicLoop.update instanceof CallExpr);

  assert.ok(forOfLoop.binding.target instanceof Identifier);
  assert.strictEqual((forOfLoop.binding.target as Identifier).name, "item");
  assert.ok(forAwaitLoop.binding.target instanceof Identifier);
  assert.ok(forAwaitLoop.iterable instanceof CallExpr);
});

test("parseSource handles control-flow nesting", () => {
  const source = `(program
    (throw 42)
    (try
      (call run)
      (catch (err)
        (call handle err))
      (finally
        (call cleanup)))
    (switch x
      (case 1 (call branchOne))
      (case 2 (call branchTwo))
      (default (call fallback))))`;

  const program = parseSource(source);
  const [throwStmt, tryStmt, switchStmt] = program.body;

  assert.ok(throwStmt instanceof ExprStmt);
  assert.ok((throwStmt as ExprStmt).expr instanceof ThrowExpr);

  assert.ok(tryStmt instanceof ExprStmt);
  const tryExpr = (tryStmt as ExprStmt).expr;
  assert.ok(tryExpr instanceof TryCatchExpr);
  assert.strictEqual(tryExpr.catchClause?.body.length, 1);
  assert.strictEqual(tryExpr.finallyClause?.body.length, 1);
  assert.ok(tryExpr.catchClause?.binding?.target instanceof Identifier);

  assert.ok(switchStmt instanceof SwitchStmt);
  assert.strictEqual(switchStmt.cases.length, 3);
  assert.strictEqual(switchStmt.cases[2].test, null);
});
