import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("static blocks emit in TS output", async () => {
  const src = `
    (program
      (class Box
        (class-body
          (static-block
            (assign x 1)))))
  `;
  const result = await compile(src);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /static\s*\{[\s\S]*x\s*=\s*1;[\s\S]*\}/);
});
