import test from "node:test";
import assert from "node:assert";
import { gensym, resetGensym } from "../src/gensym.js";

test.beforeEach(() => {
  resetGensym();
});

test("gensym produces unique names", () => {
  const first = gensym();
  const second = gensym();
  assert.notStrictEqual(first, second);
  assert.match(first, /^G__\d+$/);
  assert.match(second, /^G__\d+$/);
});

test("gensym respects custom prefixes", () => {
  const sym = gensym("user_");
  assert.strictEqual(sym.startsWith("user_"), true);
  assert.notStrictEqual(sym, gensym("user_"));
});