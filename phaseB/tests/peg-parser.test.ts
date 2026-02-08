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

test("PEG parser emits type-assert for 'as' casting", () => {
  const [node] = parsePhaseBPeg("value as any", "peg-as.t2");
  assert.ok(node);
  assert.strictEqual(node.kind, "list");
  const list = node as ListNode;
  const [head, target, assertedType] = list.elements;
  assert.strictEqual(head.kind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "type-assert");
  assert.strictEqual(target.kind, "symbol");
  assert.strictEqual((target as SymbolNode).name, "value");
  assert.strictEqual(assertedType.kind, "list");
  const [typeHead] = (assertedType as ListNode).elements;
  assert.strictEqual(typeHead.kind, "symbol");
  assert.strictEqual((typeHead as SymbolNode).name, "t:primitive");
});

test("PEG parser emits import-spec for namespace import list form", () => {
  const [node] = parsePhaseBPeg("(import * as Foo from \"./mod\")", "peg-import-namespace.t2");
  assert.ok(node);
  assert.strictEqual(node.kind, "list");
  const list = node as ListNode;
  const [head, spec] = list.elements;
  assert.strictEqual(head.kind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "import");
  assert.ok(spec && spec.kind === "list");
  const specList = spec as ListNode;
  const [specHead, namespaceList, source] = specList.elements;
  assert.strictEqual(specHead.kind, "symbol");
  assert.strictEqual((specHead as SymbolNode).name, "import-spec");
  assert.ok(namespaceList && namespaceList.kind === "list");
  const [namespaceHead, alias] = (namespaceList as ListNode).elements;
  assert.strictEqual(namespaceHead.kind, "symbol");
  assert.strictEqual((namespaceHead as SymbolNode).name, "namespace");
  assert.strictEqual(alias.kind, "symbol");
  assert.strictEqual((alias as SymbolNode).name, "Foo");
  assert.strictEqual(source.kind, "literal");
  assert.strictEqual((source as { value: unknown }).value, "./mod");
});
