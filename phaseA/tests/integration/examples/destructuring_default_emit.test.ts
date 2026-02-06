import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("destructuring defaults emit in TS output", async () => {
  const src = `
    (program
      (let* (((array-pattern (default x 1) y) (array 1 2))))
      (let* (((object-pattern ("a" (default a 1)) ("b" b)) obj))))
  `;
  const result = await compile(src);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /let \[x = 1, y\] = \[1, 2\];/);
  assert.match(result.tsSource, /let \{ a = 1, b \} = obj;/);
});
