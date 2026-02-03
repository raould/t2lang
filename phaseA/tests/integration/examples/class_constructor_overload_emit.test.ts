import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("constructor overloads emit signatures and implementation", async () => {
  const result = await compile(`(program
  (class Box
    (class-body
      (method overload "constructor" ((value (type-string))))
      (method overload "constructor" ((value (type-number))))
      (method "constructor" ((value (type-union (type-string) (type-number))))))))`);
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /constructor\(value: string\);/);
  assert.match(result.tsSource, /constructor\(value: number\);/);
  assert.match(result.tsSource, /constructor\(value: string \| number\) \{/);
});
