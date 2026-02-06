import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("function overload signatures emit in TS output", async () => {
  const src = `
    (program
      (fn overload process ((x (type-string)) (type-string)))
      (fn overload process ((x (type-number)) (type-number)))
      (fn process ((x (type-union (type-string) (type-number))) (type-string))
        (return x))
    )
  `;
  const result = await compile(src, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function\s+process\(x:\s*string\):\s*string;/);
  assert.match(result.tsSource, /function\s+process\(x:\s*number\):\s*number;/);
  assert.match(result.tsSource, /function\s+process\(x:\s*string\s*\|\s*number\):\s*string\s*\{/);
});
