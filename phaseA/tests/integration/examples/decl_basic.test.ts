import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";
import { Program } from "../../../src/ast/nodes";

test("let declaration as expression", async () => {
  const source = `(program (let* ((foo (lambda ((x)) x)) (x 42)) (foo x)))`;

  const result = await compile(source, {
    prettyOption: "pretty",
  });

  assert.strictEqual(result.diagnostics.length, 0);

  const ts = result.tsSource.trim();
  assert.strictEqual(ts, "{\nlet foo = (x) => {\nx;\n};\nlet x = 42;\nfoo(x);\n}");

  const resolveDump = result.events.find(e => e.kind === "resolveDump");
  const ast = (resolveDump?.data as { ast: Program })?.ast;

  const letExpr = ast.body[0];
  assert.strictEqual(letExpr.kind, "let*");
  if (letExpr.kind !== "let*") throw new Error("Expected let*");
  const bindingTarget = letExpr.bindings[0].target;
  assert.strictEqual(bindingTarget.kind, "identifier");
  assert.ok(typeof bindingTarget.name === "string");
});
