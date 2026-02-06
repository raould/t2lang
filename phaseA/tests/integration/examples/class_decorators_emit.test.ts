import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("class decorators emit in TS output", async () => {
  const src = `
    (program
      (class C
        (decorators sealed)
        (class-body
          (method "constructor" ()
            (return this))))
    )
  `;
  const result = await compile(src, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /@sealed\s*\nclass\s+C/);
});
