import test from "node:test";
import assert from "node:assert";
import { parseSexpr, parsePhaseB, ParseError } from "../src/reader.js";
import type { ListNode, SymbolNode } from "../src/reader.js";

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

test("parsePhaseB rewrites dotted property access into prop node", () => {
  const [node] = parsePhaseB("obj.prop", "dots.t2");
  assert.strictEqual(node.kind, "list");
  const [head, target, property] = node.elements;
  assert.strictEqual(head.kind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "prop");
  assert.strictEqual(target.kind, "symbol");
  assert.strictEqual((target as SymbolNode).name, "obj");
  assert.strictEqual(property.kind, "literal");
  assert.strictEqual((property as { value: unknown }).value, "prop");
});

test("parsePhaseB rewrites dotted method calls into call/prop structures", () => {
  const [node] = parsePhaseB("(obj.method 1 2)", "dots.t2");
  assert.strictEqual(node.kind, "list");
  const [head, propNode, arg1, arg2] = node.elements;
  assert.strictEqual(head.kind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "call");
  assert.strictEqual(propNode.kind, "list");
  const [propHead, target, methodName] = (propNode as ListNode).elements;
  assert.strictEqual(propHead.kind, "symbol");
  assert.strictEqual((propHead as SymbolNode).name, "prop");
  assert.strictEqual(target.kind, "symbol");
  assert.strictEqual((target as SymbolNode).name, "obj");
  assert.strictEqual(methodName.kind, "literal");
  assert.strictEqual((methodName as { value: unknown }).value, "method");
  assert.strictEqual(arg1.kind, "literal");
  assert.strictEqual(arg2.kind, "literal");
});

test("rejects malformed numeric literals", () => {
  assert.throws(
    () => parseSexpr("12.34.56", "numbers.t2"),
    (error) => error instanceof ParseError && error.code === "E007"
  );
});

test("quote reader macro wraps a symbol", () => {
  const [node] = parseSexpr("'foo", "quote.t2");
  assert.strictEqual(node.kind, "list");
  const list = node as ListNode;
  const macroSymbol = list.elements[0] as SymbolNode;
  assert.strictEqual(macroSymbol.name, "quote");
  assert.strictEqual(list.elements[1].kind, "symbol");
});

test("quasiquote reader macro wraps a symbol", () => {
  const [node] = parseSexpr("`foo", "quasi.t2");
  assert.strictEqual((node as ListNode).elements[0].kind, "symbol");
  assert.strictEqual(((node as ListNode).elements[0] as SymbolNode).name, "quasiquote");
});

test("unquote reader macro wraps a symbol", () => {
  const [node] = parseSexpr("~foo", "unquote.t2");
  assert.strictEqual((node as ListNode).elements[0].kind, "symbol");
  assert.strictEqual(((node as ListNode).elements[0] as SymbolNode).name, "unquote");
});

test("unquote-splicing reader macro wraps a symbol", () => {
  const [node] = parseSexpr("~@foo", "unquote-splice.t2");
  assert.strictEqual((node as ListNode).elements[0].kind, "symbol");
  assert.strictEqual(((node as ListNode).elements[0] as SymbolNode).name, "unquote-splicing");
});
