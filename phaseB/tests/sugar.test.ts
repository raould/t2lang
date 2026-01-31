import test from "node:test";
import assert from "node:assert";
import { parsePhaseB } from "../src/reader.js";
import type { PhaseBListNode } from "../src/reader.js";

test("fn parameter list rewrites colon annotations", () => {
  const nodes = parsePhaseB("(fn (x : Number) (+ x 1))", "params.t2");
  const fnNode = nodes[0];
  assert.strictEqual(fnNode.phaseKind, "list");

  const params = (fnNode as PhaseBListNode).elements[1];
  assert.strictEqual(params.phaseKind, "list");

  const [param] = (params as PhaseBListNode).elements;
  assert.strictEqual(param.phaseKind, "type-annotation");
});

test("colon expressions outside of parameter lists stay lists", () => {
  const nodes = parsePhaseB("((x : Number default))", "bindings.t2");
  const inner = ((nodes[0] as PhaseBListNode).elements[0] as PhaseBListNode);
  assert.strictEqual(inner.phaseKind, "list");
});
