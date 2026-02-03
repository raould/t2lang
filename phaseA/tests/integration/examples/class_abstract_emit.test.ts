import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("abstract class and method emit in TS output", async () => {
  const src = `
    (program
      (class Animal
        (abstract)
        (class-body
          (method abstract "makeSound" ((type-void)))))
    )
  `;
  const result = await compile(src, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /abstract\s+class\s+Animal/);
  assert.match(result.tsSource, /abstract\s+makeSound\(\):\s*void;/);
});
