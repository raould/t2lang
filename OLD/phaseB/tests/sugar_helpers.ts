import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { resetGensym } from "../src/gensym.js";
import { serializePhaseBNode } from "../src/typeAnnotationUtils.js";
import { normalizeSerialized } from "./test_utils.js";

export function serializeSingleNode(expr: string): string {
  resetGensym();
  const nodes = parsePhaseBRaw(expr);
  assert.strictEqual(nodes.length, 1);
  return serializePhaseBNode(nodes[0]);
}

export function expectExpression(expr: string, expected: string): void {
  const serialized = serializeSingleNode(expr);
  const normalized = normalizeSerialized(serialized);
  assert.strictEqual(normalized, expected);
}