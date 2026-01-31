import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, PhaseBTypeAnnotation, SymbolNode } from "../src/reader.js";

test("fn parameter list rewrites colon annotations", () => {
  const nodes = parsePhaseBRaw("(fn (x : Number) (+ x 1))", "params.t2");
  const fnNode = nodes[0];
  assert.strictEqual(fnNode.phaseKind, "list");

  const params = (fnNode as PhaseBListNode).elements[1];
  assert.strictEqual(params.phaseKind, "list");

  const [param] = (params as PhaseBListNode).elements;
  assert.strictEqual(param.phaseKind, "type-annotation");
});

test("colon expressions outside of parameter lists stay lists", () => {
  const nodes = parsePhaseBRaw("((x : Number default))", "bindings.t2");
  const inner = ((nodes[0] as PhaseBListNode).elements[0] as PhaseBListNode);
  assert.strictEqual(inner.phaseKind, "list");
});

function getFirstAnnotation(expr: string): PhaseBTypeAnnotation {
  const nodes = parsePhaseBRaw(expr, "type.t2");
  const fnNode = nodes[0] as PhaseBListNode;
  const params = fnNode.elements[1] as PhaseBListNode;
  return params.elements[0] as PhaseBTypeAnnotation;
}

test("type annotations produce t:primitive nodes", () => {
  const annotation = getFirstAnnotation("(fn (x : Number) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:primitive");
});

test("type annotations produce t:union for unions", () => {
  const annotation = getFirstAnnotation("(fn (x : (A | B)) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:union");
});

test("type annotations emit t:apply for generics", () => {
  const annotation = getFirstAnnotation("(fn (x : Foo<Bar>) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:apply");
});

test("type annotations emit t:array for brackets", () => {
  const annotation = getFirstAnnotation("(fn (x : Foo[]) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:array");
});

test("type annotations emit t:nullable for optionals", () => {
  const annotation = getFirstAnnotation("(fn (x : Foo?) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:nullable");
});

test("type annotations emit t:tuple for bracketed tuples", () => {
  const annotation = getFirstAnnotation("(fn (x : [A,B]) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:tuple");
});
