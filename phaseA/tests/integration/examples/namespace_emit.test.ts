import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("namespace declarations emit in TS output", async () => {
  const src = `
    (program
      (namespace Utils
        (namespace-body
          (fn helper ((x (type-number)) (type-number))
            (return x))
          (export (export-spec (named helper)))))
      (let* ((value (call (prop Utils "helper") 1)))
        (return value))
    )
  `;
  const result = await compile(src, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /namespace\s+Utils/);
  assert.match(result.tsSource, /function\s+helper/);
  assert.match(result.tsSource, /export\s*\{\s*helper\s*\}/);
  assert.match(result.tsSource, /Utils\.helper\(1\)/);
});
