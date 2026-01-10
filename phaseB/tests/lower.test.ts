import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { lowerPhaseB } from "../src/lower.js";
import {
  AssignExpr,
  ExprStmt,
  Identifier,
  LetStarExpr,
  Literal,
} from "../../phaseA/dist/phaseA0.js";

test("lowerPhaseB produces LetStarExpr for let bindings", () => {
  const [node] = parsePhaseBRaw("(let ((x : string 1)) x)", "lower-let.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof LetStarExpr);
  assert.ok(stmt instanceof LetStarExpr);
  assert.strictEqual(stmt.isConst, false);
  assert.ok(stmt.bindings.length > 0);
  const binding = stmt.bindings.find((entry) => entry.target instanceof Identifier && entry.target.name === "x");
  assert.ok(binding);
  const bodyExpr = stmt.body.find(
    (entry) => entry instanceof ExprStmt && entry.expr instanceof Identifier && entry.expr.name === "x"
  );
  assert.ok(bodyExpr);
});

test("lowerPhaseB emits AssignExpr for assign forms", () => {
  const [node] = parsePhaseBRaw("(assign foo 42)", "lower-assign.t2");
  const program = lowerPhaseB([node]);
  const stmt = program.body.find((entry) => entry instanceof AssignExpr);
  assert.ok(stmt instanceof AssignExpr);
  assert.ok(stmt.target instanceof Identifier);
  assert.strictEqual(stmt.target.name, "foo");
  assert.ok(stmt.value instanceof Literal);
  assert.strictEqual(stmt.value.value, 42);
});
