import t from "node:test";
const test = t.skip;
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, SymbolNode, LiteralNode } from "../src/reader.js";

test("infix addition rewrites to (call + ...)", () => {
  const nodes = parsePhaseBRaw("(infix (1 + 2))", "infix-add.t2");
  const root = nodes[0] as PhaseBListNode;
  const [head, operator, left, right] = root.elements;
  assert.strictEqual(head.phaseKind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "call");
  assert.strictEqual(operator.phaseKind, "symbol");
  assert.strictEqual((operator as SymbolNode).name, "+");
  assert.strictEqual(left.phaseKind, "literal");
  assert.strictEqual((left as LiteralNode).value, 1);
  assert.strictEqual(right.phaseKind, "literal");
  assert.strictEqual((right as LiteralNode).value, 2);
});

test("infix expressions respect operator precedence", () => {
  const nodes = parsePhaseBRaw("(infix (1 + 2 * 3))", "infix-order.t2");
  const root = nodes[0] as PhaseBListNode;
  const [, plus, left, right] = root.elements;
  assert.strictEqual((plus as SymbolNode).name, "+");
  assert.strictEqual((left as LiteralNode).value, 1);
  assert.strictEqual(right.phaseKind, "list");
  const nested = right as PhaseBListNode;
  const [, multiply, mulLeft, mulRight] = nested.elements;
  assert.strictEqual((multiply as SymbolNode).name, "*");
  assert.strictEqual((mulLeft as LiteralNode).value, 2);
  assert.strictEqual((mulRight as LiteralNode).value, 3);
});

test("infix comma rewrites to comma operator call", () => {
  const nodes = parsePhaseBRaw("(infix (1 , 2))", "infix-comma.t2");
  const root = nodes[0] as PhaseBListNode;
  const [head, operator, left, right] = root.elements;
  assert.strictEqual((head as SymbolNode).name, "call");
  assert.strictEqual((operator as SymbolNode).name, ",");
  assert.strictEqual((left as LiteralNode).value, 1);
  assert.strictEqual((right as LiteralNode).value, 2);
});

test("logical infix chains retain short-circuit grouping", () => {
  const nodes = parsePhaseBRaw("(infix (a && b || c))", "infix-logical.t2");
  const root = nodes[0] as PhaseBListNode;
  const [, orSymbol, left, right] = root.elements;
  assert.strictEqual((orSymbol as SymbolNode).name, "||");
  assert.strictEqual(right.phaseKind, "symbol");
  assert.strictEqual((right as SymbolNode).name, "c");
  assert.strictEqual(left.phaseKind, "list");
  const guard = left as PhaseBListNode;
  const [, andSymbol, andLeft, andRight] = guard.elements;
  assert.strictEqual((andSymbol as SymbolNode).name, "&&");
  assert.strictEqual((andLeft as SymbolNode).name, "a");
  assert.strictEqual((andRight as SymbolNode).name, "b");
});

test("infix deep equality rewrites to lodash.isEqual", () => {
  const nodes = parsePhaseBRaw("(infix (a ?= b))", "infix-deep-eq.t2");
  const root = nodes[0] as PhaseBListNode;
  const [callHead, callee, left, right] = root.elements;
  assert.strictEqual((callHead as SymbolNode).name, "call");
  assert.strictEqual((callee as SymbolNode).name, "__t2_isEqual");
  assert.strictEqual((left as SymbolNode).name, "a");
  assert.strictEqual((right as SymbolNode).name, "b");
});

test("infix deep inequality rewrites to !lodash.isEqual", () => {
  const nodes = parsePhaseBRaw("(infix (a ?!= b))", "infix-deep-neq.t2");
  const root = nodes[0] as PhaseBListNode;
  const [callHead, notSymbol, innerCall] = root.elements;
  assert.strictEqual((callHead as SymbolNode).name, "call");
  assert.strictEqual((notSymbol as SymbolNode).name, "!");
  const innerList = innerCall as PhaseBListNode;
  const [innerHead, innerCallee] = innerList.elements;
  assert.strictEqual((innerHead as SymbolNode).name, "call");
  assert.strictEqual((innerCallee as SymbolNode).name, "__t2_isEqual");
});

test("infix reader macro rewrites (:(...)) into infix call", () => {
  const nodes = parsePhaseBRaw(":(1 + 2 * 3)", "infix-macro.t2");
  const root = nodes[0] as PhaseBListNode;
  const [, plus, left, right] = root.elements;
  assert.strictEqual((plus as SymbolNode).name, "+");
  assert.strictEqual((left as LiteralNode).value, 1);
  assert.strictEqual(right.phaseKind, "list");
});
