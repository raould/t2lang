import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("private class fields emit with # prefix", async () => {
  const src = `
    (program
      (class C
        (class-body
          (field "#secret" 42)))
    )
  `;
  const result = await compile(src, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /#secret\s*=\s*42/);
});
