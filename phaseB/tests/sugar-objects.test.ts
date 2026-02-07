import t from "node:test";
const test = t.skip;
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, SymbolNode, LiteralNode } from "../src/reader.js";

test("object literal sugar expands shorthand and string keys", () => {
  const nodes = parsePhaseBRaw("(object name \"age\" 30)", "object.t2");
  const objNode = nodes[0] as PhaseBListNode;
  const [, nameField, ageField] = objNode.elements;
  assert.strictEqual(nameField.phaseKind, "list");

  const nameFieldList = nameField as PhaseBListNode;
  assert.strictEqual(nameFieldList.elements.length, 2);
  const nameKey = nameFieldList.elements[0];
  const nameValue = nameFieldList.elements[1];
  assert.strictEqual(nameKey.phaseKind, "symbol");
  assert.strictEqual((nameKey as SymbolNode).name, "name");
  assert.strictEqual((nameValue as SymbolNode).name, "name");

  assert.strictEqual(ageField.phaseKind, "list");
  const ageFieldList = ageField as PhaseBListNode;
  const ageKey = ageFieldList.elements[0];
  const ageValue = ageFieldList.elements[1];
  assert.strictEqual((ageKey as LiteralNode).value, "age");
  assert.strictEqual(ageValue.phaseKind, "literal");
  assert.strictEqual((ageValue as LiteralNode).value, 30);
});

test("object literal sugar ignores comma separators", () => {
  const nodes = parsePhaseBRaw("{name, \"age\" 30}", "object-commas.t2");
  const objNode = nodes[0] as PhaseBListNode;
  const fields = objNode.elements.slice(1);
  assert.strictEqual(fields.length, 2);
  const nameField = fields[0] as PhaseBListNode;
  const nameKey = nameField.elements[0] as SymbolNode;
  assert.strictEqual(nameKey.name, "name");
  const ageField = fields[1] as PhaseBListNode;
  const ageKey = ageField.elements[0] as LiteralNode;
  assert.strictEqual(ageKey.value, "age");
});

test("object literal comma between optional key and entry is invalid", () => {
  assert.throws(
    () => parsePhaseBRaw("{name, role?, role}", "object-optional-comma.t2"),
    /optional key cannot be followed by a comma/
  );
});

test("object literal comma between key and value is invalid", () => {
  assert.throws(
    () => parsePhaseBRaw("{\"age\", 30}", "object-key-comma.t2"),
    /object literal key requires a value/
  );
});

test("object literal supports key: value syntax", () => {
  const nodes = parsePhaseBRaw("{name: \"Alice\"}", "object-colon.t2");
  const objNode = nodes[0] as PhaseBListNode;
  const field = objNode.elements[1] as PhaseBListNode;
  const key = field.elements[0] as LiteralNode;
  const value = field.elements[1] as LiteralNode;
  assert.strictEqual(key.value, "name");
  assert.strictEqual(value.value, "Alice");
});

test("object literal supports computed keys", () => {
  const nodes = parsePhaseBRaw("{[Symbol.iterator] 0}", "object-computed.t2");
  const objNode = nodes[0] as PhaseBListNode;
  const field = objNode.elements[1] as PhaseBListNode;
  const head = field.elements[0] as SymbolNode;
  assert.strictEqual(head.name, "computed");
  const keyExpr = field.elements[1] as PhaseBListNode;
  const keyHead = keyExpr.elements[0] as SymbolNode;
  assert.strictEqual(keyHead.name, "prop");
  const value = field.elements[2] as LiteralNode;
  assert.strictEqual(value.value, 0);
});
