import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("interface declaration merging emits multiple declarations", async () => {
  const src = `
    (program
      (type-interface Box
        (interface-body
          (width (type-number))))
      (type-interface Box
        (interface-body
          (height (type-number))))
    )
  `;
  const result = await compile(src, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /interface\s+Box\s*\{[^}]*width/);
  assert.match(result.tsSource, /interface\s+Box\s*\{[^}]*height/);
});
