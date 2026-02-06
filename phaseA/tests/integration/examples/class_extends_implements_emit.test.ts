import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("class extends/implements are emitted in TS output", async () => {
  const src = `
    (program
      (class Child
        (extends Parent)
        (implements Foo Bar)
        (class-body
          (method "constructor" ()
            (call super))))
    )
  `;
  const result = await compile(src, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /class\s+Child\s+extends\s+Parent\s+implements\s+Foo,\s*Bar/);
});
