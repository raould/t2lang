import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
import { Program } from "../../../src/ast/nodes";

test("let declaration as expression", async () => {
  const source = `(program (let* ((foo (fn (x) x)) (x 42)) (foo x)))`;

  const result = await compilePhase0(source, {
    prettyOutput: true,
    logLevel: "none",
    enableTsc: false
  });

  assert.strictEqual(result.errors.length, 0);

  const ts = result.tsSource.trim();
  assert.strictEqual(ts, "{\nlet foo = (x) => {\nx;\n};\nlet x = 42;\nfoo(x);\n}");

  const resolveDump = result.events.find(e => e.kind === "resolveDump");
  const ast = (resolveDump?.data as { ast: Program })?.ast;

  const letExpr = ast.body[0];
  assert.strictEqual(letExpr.kind, "let");
  if (letExpr.kind !== "let") throw new Error("Expected let");
  assert.ok(letExpr.bindings[0].name.symbolId);
});
