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
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /class Box \{\s*\[key: string\]: number;/s);
  assert.match(result.tsSource, /interface Bag \{\s*\[key: string\]: number;/s);
});
