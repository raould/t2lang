import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("function this parameter emits in TS output", async () => {
  const src = `
    (program
      (fn handler ((this (type-ref HTMLElement)) (e (type-ref Event)))
        (return e))
    )
  `;
  const result = await compile(src, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /function\s+handler\(this:\s*HTMLElement,\s*e:\s*Event\)/);
});
