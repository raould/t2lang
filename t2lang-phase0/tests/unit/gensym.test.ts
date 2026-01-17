import test from "node:test";
import assert from "node:assert";
import { GensymGenerator } from "../../src/lib/gensym.js";

const dummyLoc = { file: "test", start: 0, end: 0, line: 1, column: 1 };

test("GensymGenerator produces unique names with prefix", () => {
  const g = new GensymGenerator();
  const a = g.expandGensym({ prefix: "t", location: dummyLoc });
  const b = g.expandGensym({ prefix: "t", location: dummyLoc });
  assert(a.name.startsWith("t"));
  assert(b.name.startsWith("t"));
  assert.notStrictEqual(a.name, b.name);
});

test("GensymGenerator honors provided generatedName", () => {
  const g = new GensymGenerator();
  const id = g.expandGensym({ generatedName: "explicitName", location: dummyLoc });
  assert.strictEqual(id.name, "explicitName");
});
