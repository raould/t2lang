import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, PhaseBTypeAnnotation, SymbolNode, LiteralNode } from "../src/reader.js";

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

test("object literal sugar expands shorthand and string keys", () => {
  const nodes = parsePhaseBRaw("(object name \"age\" 30)", "object.t2");
  const objNode = nodes[0] as PhaseBListNode;
  const [, nameField, ageField] = objNode.elements;
  assert.strictEqual(nameField.phaseKind, "list");

  const nameFieldList = nameField as PhaseBListNode;
  assert.strictEqual(nameFieldList.elements.length, 2);
  const nameKey = nameFieldList.elements[0];
  const nameValue = nameFieldList.elements[1];
  assert.strictEqual(nameKey.phaseKind, "literal");
  assert.strictEqual((nameKey as LiteralNode).value, "name");
  assert.strictEqual((nameValue as SymbolNode).name, "name");

  assert.strictEqual(ageField.phaseKind, "list");
  const ageFieldList = ageField as PhaseBListNode;
  const ageKey = ageFieldList.elements[0];
  const ageValue = ageFieldList.elements[1];
  assert.strictEqual((ageKey as LiteralNode).value, "age");
  assert.strictEqual(ageValue.phaseKind, "literal");
  assert.strictEqual((ageValue as LiteralNode).value, 30);
});

test("array literal sugar rewrites to (array ...)", () => {
  const nodes = parsePhaseBRaw("[1 2 3]", "array.t2");
  const arrayNode = nodes[0] as PhaseBListNode;
  const arrayHead = arrayNode.elements[0];
  assert.strictEqual(arrayHead.phaseKind, "symbol");
  assert.strictEqual((arrayHead as SymbolNode).name, "array");
  const values = arrayNode.elements.slice(1);
  assert.strictEqual(values.length, 3);
  assert.deepStrictEqual(values.map((node) => (node.kind === "literal" ? (node as LiteralNode).value : undefined)), [1, 2, 3]);
});
