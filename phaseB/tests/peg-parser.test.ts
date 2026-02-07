import test from "node:test";
import assert from "node:assert";
import { parsePhaseBPeg } from "../src/pegParser.js";
import type { ListNode, SymbolNode } from "../src/reader.js";

test("PEG parser emits prop for dotted access", () => {
  const [node] = parsePhaseBPeg("obj.prop", "peg-dots.t2");
  assert.ok(node);
  assert.strictEqual(node.kind, "list");
  const list = node as ListNode;
  const [head, target, property] = list.elements;
  assert.strictEqual(head.kind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "prop");
  assert.strictEqual(target.kind, "symbol");
  assert.strictEqual((target as SymbolNode).name, "obj");
  assert.strictEqual(property.kind, "symbol");
  assert.strictEqual((property as SymbolNode).name, "prop");
});

test("PEG parser emits call/prop for dotted method calls", () => {
  const [node] = parsePhaseBPeg("obj.method(1, 2)", "peg-dots.t2");
  assert.ok(node);
  assert.strictEqual(node.kind, "list");
  const list = node as ListNode;
  const [head, propNode, arg1, arg2] = list.elements;
  assert.strictEqual(head.kind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "call");
  assert.strictEqual(propNode.kind, "list");
  const [propHead, target, methodName] = (propNode as ListNode).elements;
  assert.strictEqual(propHead.kind, "symbol");
  assert.strictEqual((propHead as SymbolNode).name, "prop");
  assert.strictEqual(target.kind, "symbol");
  assert.strictEqual((target as SymbolNode).name, "obj");
  assert.strictEqual(methodName.kind, "symbol");
  assert.strictEqual((methodName as SymbolNode).name, "method");
  assert.strictEqual(arg1.kind, "literal");
  assert.strictEqual(arg2.kind, "literal");
});
