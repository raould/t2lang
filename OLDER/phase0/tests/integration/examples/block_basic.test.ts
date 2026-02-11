import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
import { Program } from "../../../src/ast/nodes";

test("block with nested let and call", async () => {
  const source = `
    (program
      (fn foo (x) x)
      (block
        (let* ((y 1))
          (foo y))
      )
    )
  `;

  const result = await compilePhase0(source, {
    prettyOutput: true,
    logLevel: "none",
    enableTsc: false
  });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);

  const ts = result.tsSource.trim();
  assert.match(ts, /foo\(y\)/);

  const resolveDump = result.events.find(e => e.kind === "resolveDump");
  const ast = (resolveDump?.data as { ast: Program })?.ast;

  const block = ast.body[1];
  assert.strictEqual(block.kind, "block");
});
