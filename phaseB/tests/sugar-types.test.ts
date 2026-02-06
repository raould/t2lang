import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, PhaseBTypeAnnotation, SymbolNode } from "../src/reader.js";

function getFirstAnnotation(expr: string): PhaseBTypeAnnotation {
  const nodes = parsePhaseBRaw(expr, "type.t2");
  const fnNode = nodes[0] as PhaseBListNode;
  const params = fnNode.elements[1] as PhaseBListNode;
  const [entry] = params.elements;
  const annotationNode = entry.phaseKind === "list" ? (entry as PhaseBListNode).elements[0] : entry;
  return annotationNode as PhaseBTypeAnnotation;
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

test("type annotations emit t:keyof for keyof expressions", () => {
  const annotation = getFirstAnnotation("(fn (x : keyof Foo) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:keyof");
});

test("type annotations emit t:typeof when using typeof", () => {
  const annotation = getFirstAnnotation("(fn (x : typeof Foo) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:typeof");
});

test("type annotations emit t:indexed for indexed access", () => {
  const annotation = getFirstAnnotation("(fn (x : Foo[Bar]) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:indexed");
});

test("type annotations emit t:conditional for conditional types", () => {
  const annotation = getFirstAnnotation("(fn (x : Foo extends Bar ? Baz : Qux) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:conditional");
});

test("type annotations emit t:infer for infer declarations", () => {
  const annotation = getFirstAnnotation("(fn (x : infer Foo) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:infer");
});

test("type annotations emit t:literal for literal values", () => {
  const annotation = getFirstAnnotation("(fn (x : true) 0)");
  const rewritten = annotation.annotation as PhaseBListNode;
  const head = rewritten.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "t:literal");
});
