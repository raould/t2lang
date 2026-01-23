import test from "node:test";
import assert from "node:assert";
import rewriteSugar, { parseToNodes } from "../../src/parse/sugarRewrite.js";
import { Parser } from "../../src/parse/parser.js";

const ctx = { config: {}, eventSink: { emit: () => {} } };

test("type-object supports parenthesized dot-sigil fields", () => {
  const src = `(type-object (.video: string))`;
  const rewritten = rewriteSugar(src);
  // ensure rewrite produced a field form (type may be separated by optional colon)
  assert.ok(rewritten.includes(`(field "video"`), `rewritten: ${rewritten}`);
  // ensure full Phase1 Parser can parse the rewritten output without throwing
  const p = new Parser("input.t2", `(program ${rewritten})`, ctx);
  assert.doesNotThrow(() => p.parseProgram());
});

test("class supports parenthesized dot-sigil field with default", () => {
  const src = `(class Thing (.video: string ""))`;
  const rewritten = rewriteSugar(src);
  assert.ok(rewritten.includes(`(field "video"`), `rewritten: ${rewritten}`);
  const p = new Parser("input.t2", `(program ${rewritten})`, ctx);
  assert.doesNotThrow(() => p.parseProgram());
});
