import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("index signatures emit in classes and interfaces", async () => {
  const result = await compile(`(program
  (class Box
    (class-body
      (index-signature (key (type-string)) (type-number))))
  (type-interface Bag
    (interface-body
      (index-signature (key (type-string)) (type-number)))))`);
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /class Box \{\s*\[key: string\]: number;/s);
  assert.match(result.tsSource, /interface Bag \{\s*\[key: string\]: number;/s);
});
