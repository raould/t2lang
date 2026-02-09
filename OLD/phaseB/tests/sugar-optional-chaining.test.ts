import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { resetGensym } from "../src/gensym.js";
import { serializePhaseBNode } from "../src/typeAnnotationUtils.js";
import { expectExpression } from "./sugar_helpers.js";
import { normalizeSerialized } from "./test_utils.js";

test("optional property access preserves optional form", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(?. obj prop)", "optional-property.t2");
  const serialized = normalizeSerialized(serializePhaseBNode(nodes[0]));
  assert.strictEqual(serialized, "(?. obj prop)");
});

test("optional chain list form supports chained segments", () => {
  expectExpression("(?. user address city)", "(?. user address city)");
});

test("surface optional property access lowers to optional form", () => {
  expectExpression("obj?.prop", "(?. obj prop)");
});

test("surface optional method call keeps optional callee", () => {
  expectExpression("obj?.method(1)", "(call (?. obj method) 1)");
});

test("surface callable optional invocation lowers to optional call", () => {
  expectExpression("fn?.(1)", "(?.call fn 1)");
});

test("nested optional chains are preserved", () => {
  expectExpression("obj?.prop?.value", "(?. (?. obj prop) value)");
});

test("surface computed property access rewrites to index", () => {
  expectExpression("obj.[key]", "(index obj key)");
});

test("surface optional computed access preserves optional index", () => {
  expectExpression("obj?.[key]", "(?.[] obj key)");
});
