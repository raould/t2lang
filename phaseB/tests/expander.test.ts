import test from "node:test";
import assert from "node:assert";
import { parseSexpr, ListNode, SymbolNode } from "../src/reader.js";
import { MacroRegistry } from "../src/macroRegistry.js";
import { expand } from "../src/expander.js";

test("expander removes defmacro definitions and registers them", () => {
  const registry = new MacroRegistry();
  const nodes = parseSexpr("(defmacro echo (x) x) (echo foo)", "expander.t2");
  const expanded = expand(nodes, registry);
  assert.strictEqual(expanded.length, 1, "only the invocation should remain");
  const symbol = expanded[0] as SymbolNode;
  assert.strictEqual(symbol.kind, "symbol");
  assert.strictEqual(symbol.name, "foo");
});

test("expander substitutes arguments into macro bodies", () => {
  const registry = new MacroRegistry();
  const nodes = parseSexpr("(defmacro pair (a b) (list a b)) (pair foo bar)", "expander.t2");
  const expanded = expand(nodes, registry);
  assert.strictEqual(expanded.length, 1);
  const list = expanded[0] as ListNode;
  assert.strictEqual(list.kind, "list");
  assert.strictEqual(list.elements.length, 3);
  const [listSymbol, firstArg, secondArg] = list.elements;
  assert.strictEqual(listSymbol.kind, "symbol");
  assert.strictEqual((listSymbol as SymbolNode).name, "list");
  assert.strictEqual(firstArg.kind, "symbol");
  assert.strictEqual((firstArg as SymbolNode).name, "foo");
  assert.strictEqual(secondArg.kind, "symbol");
  assert.strictEqual((secondArg as SymbolNode).name, "bar");
});

test("expander rewrites quasiquote into list construction", () => {
  const registry = new MacroRegistry();
  const nodes = parseSexpr("`(a ~b)", "quasi.t2");
  const expanded = expand(nodes, registry);
  assert.strictEqual(expanded.length, 1);
  const list = expanded[0] as ListNode;
  assert.strictEqual(list.kind, "list");
  assert.strictEqual(list.elements[0].kind, "symbol");
  assert.strictEqual((list.elements[0] as SymbolNode).name, "list");
  assert.strictEqual(list.elements[1].kind, "list");
  assert.strictEqual(((list.elements[1] as ListNode).elements[0] as SymbolNode).name, "quote");
  assert.strictEqual(((list.elements[2] as SymbolNode).name), "b");
});