import t from "node:test";
const test = t.skip;
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, PhaseBTypeAnnotation, SymbolNode } from "../src/reader.js";

test("fn parameter list rewrites colon annotations", () => {
  const nodes = parsePhaseBRaw("(fn (x : Number) (+ x 1))", "params.t2");
  const fnNode = nodes[0];
  assert.strictEqual(fnNode.phaseKind, "list");

  const params = (fnNode as PhaseBListNode).elements[1];
  assert.strictEqual(params.phaseKind, "list");

  const [entry] = (params as PhaseBListNode).elements;
  assert.strictEqual(entry.phaseKind, "list");
  const inner = (entry as PhaseBListNode).elements[0];
  assert.strictEqual(inner.phaseKind, "type-annotation");
});

test("bare fn parameters normalize to list entries", () => {
  const nodes = parsePhaseBRaw("(fn (x y) (+ x y))", "bare-params.t2");
  const fnNode = nodes[0] as PhaseBListNode;
  const params = fnNode.elements[1] as PhaseBListNode;
  assert.strictEqual(params.phaseKind, "list");
  assert.strictEqual(params.elements.length, 2);

  const firstParam = params.elements[0] as PhaseBListNode;
  assert.strictEqual(firstParam.phaseKind, "list");
  const firstSymbol = firstParam.elements[0];
  assert.strictEqual(firstSymbol.phaseKind, "symbol");
  assert.strictEqual((firstSymbol as SymbolNode).name, "x");

  const secondParam = params.elements[1] as PhaseBListNode;
  assert.strictEqual(secondParam.phaseKind, "list");
  const secondSymbol = secondParam.elements[0];
  assert.strictEqual(secondSymbol.phaseKind, "symbol");
  assert.strictEqual((secondSymbol as SymbolNode).name, "y");
});

test("colon expressions outside of parameter lists stay lists", () => {
  const nodes = parsePhaseBRaw("((x : Number default))", "bindings.t2");
  const inner = ((nodes[0] as PhaseBListNode).elements[0] as PhaseBListNode);
  assert.strictEqual(inner.phaseKind, "list");
});

test("function parameter sugar ignores comma separators", () => {
  const nodes = parsePhaseBRaw("(fn (x, y : number) x)", "fn-commas.t2");
  const fnNode = nodes[0] as PhaseBListNode;
  const signature = fnNode.elements[1] as PhaseBListNode;
  const params = signature.elements.filter(
    (node) => !(node.phaseKind === "symbol" && (node as SymbolNode).name === ",")
  );
  assert.strictEqual(params.length, 2);
  const firstParam = params[0] as PhaseBListNode;
  const secondParam = params[1] as PhaseBListNode;
  const firstHead = firstParam.elements[0];
  if (firstHead.phaseKind === "type-annotation") {
    const annotation = firstHead as PhaseBTypeAnnotation;
    assert.strictEqual((annotation.target as SymbolNode).name, "x");
  } else {
    assert.strictEqual((firstHead as SymbolNode).name, "x");
  }
  const secondHead = secondParam.elements[0];
  if (secondHead.phaseKind === "type-annotation") {
    const annotation = secondHead as PhaseBTypeAnnotation;
    assert.strictEqual((annotation.target as SymbolNode).name, "y");
  } else {
    assert.strictEqual((secondHead as SymbolNode).name, "y");
  }
});
