import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";
import { Program } from "../../../src/ast/nodes";

test("block with nested let and call", async () => {
  const source = `
    (program
      (fn foo ((x)) x)
      (block
        (let* ((y 1))
          (foo y))
      )
    )
  `;

  const result = await compile(source, {
    prettyOption: 'pretty',
  });
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);

  const ts = result.tsSource.trim();
  assert.match(ts, /foo\(y\)/);

  const resolveDump = result.events.find(e => e.kind === "resolveDump");
  const ast = (resolveDump?.data as { ast: Program })?.ast;

  const block = ast.body[1];
  assert.strictEqual(block.kind, "block");
});
