import test from "node:test";
import assert from "node:assert";
import { compile } from "../src/api.ts";

test("!!! object literal parens required", async () => {
  const source = `(program (lambda (x) (return (object "a" x))))`;
  const result = await compile(source, { prettyOption: "ugly" });
  console.log(result.tsSource);
  assert.match(result.tsSource, /({.*})/);
});

test.skip("!!! object literal inline", async () => {
  const source = `(program (console.log {a: 1, b: 2}.a))`;
  const result = await compile(source, { prettyOption: "ugly" });
  console.log(result.tsSource);
  assert.match(result.tsSource, /({.*})/);
});

