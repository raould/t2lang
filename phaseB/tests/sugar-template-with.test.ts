import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { resetGensym } from "../src/gensym.js";
import type { PhaseBListNode, SymbolNode, LiteralNode } from "../src/reader.js";
import { normalizeGensymName } from "./test_utils.js";

test("template-with rewrites to an IIFE with template parts", () => {
  resetGensym();
  const nodes = parsePhaseBRaw(
    "(template-with \"Hello ${name}!\" (name \"Ada\"))",
    "template-with.t2"
  );
  const callNode = nodes[0] as PhaseBListNode;
  const callHead = callNode.elements[0] as SymbolNode;
  assert.strictEqual(callHead.name, "call");

  const lambdaNode = callNode.elements[1] as PhaseBListNode;
  const lambdaHead = lambdaNode.elements[0] as SymbolNode;
  assert.strictEqual(lambdaHead.name, "lambda");

  const signature = lambdaNode.elements[1] as PhaseBListNode;
  const firstParam = signature.elements[0] as PhaseBListNode;
  const paramSymbol = firstParam.elements[0] as SymbolNode;
  assert.strictEqual(normalizeGensymName(paramSymbol.name), "tmpl_1");

  const returnNode = lambdaNode.elements[2] as PhaseBListNode;
  const returnHead = returnNode.elements[0] as SymbolNode;
  assert.strictEqual(returnHead.name, "return");

  const templateNode = returnNode.elements[1] as PhaseBListNode;
  const templateHead = templateNode.elements[0] as SymbolNode;
  assert.strictEqual(templateHead.name, "template");
  const [helloPart, valuePart, bangPart] = templateNode.elements.slice(1);
  assert.strictEqual((helloPart as LiteralNode).value, "Hello ");
  assert.strictEqual(normalizeGensymName((valuePart as SymbolNode).name), "tmpl_1");
  assert.strictEqual((bangPart as LiteralNode).value, "!");

  const argNode = callNode.elements[2] as LiteralNode;
  assert.strictEqual(argNode.value, "Ada");
});

test("template-with rejects non-literal values", () => {
  assert.throws(
    () => parsePhaseBRaw("(template-with \"Hello ${name}\" (name (call foo)))", "template-bad.t2"),
    /values must be literals/i
  );
});

test("template-with rejects non-identifier placeholders", () => {
  assert.throws(
    () => parsePhaseBRaw("(template-with \"Hello ${name + 1}\" (name 1))", "template-bad-placeholder.t2"),
    /placeholder .* identifier/i
  );
});
