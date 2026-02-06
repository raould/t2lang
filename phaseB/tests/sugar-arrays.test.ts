import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import type { PhaseBListNode, SymbolNode, LiteralNode } from "../src/reader.js";

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

test("array literal sugar ignores comma separators", () => {
  const nodes = parsePhaseBRaw("[1, 2, 3]", "array-commas.t2");
  const arrayNode = nodes[0] as PhaseBListNode;
  const values = arrayNode.elements.slice(1);
  assert.strictEqual(values.length, 3);
  assert.deepStrictEqual(values.map((node) => (node.kind === "literal" ? (node as LiteralNode).value : undefined)), [1, 2, 3]);
});

test("array literal cannot start with a comma", () => {
  assert.throws(
    () => parsePhaseBRaw("[, 1]", "array-leading-comma.t2"),
    /array literal cannot start with a comma/
  );
});
