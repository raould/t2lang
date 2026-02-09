import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("parameter properties emit in constructor signature", async () => {
  const src = `
    (program
      (class Person
        (class-body
          (method "constructor" ((public name (type-string)) (readonly age (type-number)))
            (return)))))
  `;
  const result = await compile(src);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /constructor\(public name: string, readonly age: number\)/);
});
