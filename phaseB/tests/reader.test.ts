import test from "node:test";
import assert from "node:assert";
import { parseSexpr, ParseError } from "../src/reader.js";
import { parsePhaseB } from "../src/reader.js";

test("parse simple list", () => {
  const nodes = parseSexpr("(foo 1 \"bar\")", "test.t2");
  assert.strictEqual(nodes.length, 1);
  const [list] = nodes;
  assert.strictEqual(list.kind, "list");
  assert.strictEqual(list.elements.length, 3);
  assert.strictEqual(list.loc.line, 1);
  assert.strictEqual(list.loc.column, 1);

  const [, literal] = list.elements;
  assert.strictEqual(literal.kind, "literal");
  assert.strictEqual(literal.value, 1);
});

test("throws on unterminated list", () => {
  assert.throws(
    () => parseSexpr("(foo", "test.t2"),
    (error) => error instanceof ParseError && error.code === "E001"
  );
});

test("records string literal locations", () => {
  const nodes = parseSexpr("(print \"hello\")", "strings.t2");
  const stringNode = nodes[0].elements[1];
  assert.strictEqual(stringNode.kind, "literal");
  assert.strictEqual(stringNode.value, "hello");
  assert.strictEqual(stringNode.loc.line, 1);
  assert.strictEqual(stringNode.loc.column, 8);
});

test("rejects invalid dotted identifiers", () => {
  assert.throws(
    () => parsePhaseB(".foo", "dots.t2"),
    (error) => error instanceof ParseError && error.code === "E006"
  );
});

test("rejects malformed numeric literals", () => {
  assert.throws(
    () => parseSexpr("12.34.56", "numbers.t2"),
    (error) => error instanceof ParseError && error.code === "E007"
  );
});
