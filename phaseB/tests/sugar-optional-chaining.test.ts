import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { resetGensym } from "../src/gensym.js";
import { serializePhaseBNode } from "../src/typeAnnotationUtils.js";
import { expectExpression } from "./sugar_helpers.js";
import { normalizeSerialized } from "./test_utils.js";

test("optional property access rewrites into a null guard", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(prop obj? prop)", "optional-property.t2");
  const serialized = normalizeSerialized(serializePhaseBNode(nodes[0]));
  assert.strictEqual(
    serialized,
    "(let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (prop opt_tmp_1 prop)))",
  );
});

test("optional method call emits call-with-this guard", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(call (prop obj? method) 1)", "optional-method.t2");
  const serialized = normalizeSerialized(serializePhaseBNode(nodes[0]));
  assert.strictEqual(
    serialized,
    "(let* ((opt_obj_1 obj)) (if (== opt_obj_1 null) undefined (call-with-this (prop opt_obj_1 method) opt_obj_1 1)))",
  );
});

test("optional callable access guards the callee", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(call fn? 1)", "optional-callable.t2");
  const serialized = normalizeSerialized(serializePhaseBNode(nodes[0]));
  assert.strictEqual(
    serialized,
    "(let* ((opt_call_1 fn)) (if (== opt_call_1 null) undefined (call opt_call_1 1)))",
  );
});

test("surface optional property access lowers to a guard", () => {
  expectExpression(
    "obj?.prop",
    "(let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (prop opt_tmp_1 prop)))",
  );
});

test("surface optional method call preserves this guard", () => {
  expectExpression(
    "(obj?.method 1)",
    "(let* ((opt_obj_1 obj)) (if (== opt_obj_1 null) undefined (call-with-this (prop opt_obj_1 method) opt_obj_1 1)))",
  );
});

test("surface optional method call on method indicator keeps guard", () => {
  expectExpression(
    "(obj.method?. a b)",
    "(let* ((opt_obj_1 obj)) (if (== opt_obj_1 null) undefined (call-with-this (prop opt_obj_1 method) opt_obj_1 a b)))",
  );
});

test("surface callable optional invocation rewrites to guard", () => {
  expectExpression(
    "(fn?. 1)",
    "(let* ((opt_call_1 fn)) (if (== opt_call_1 null) undefined (call opt_call_1 1)))",
  );
});

test("nested optional chains short-circuit each step", () => {
  expectExpression(
    "(obj?.prop?.value)",
    "(let* ((opt_obj_2 (let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (prop opt_tmp_1 prop))))) (if (== opt_obj_2 null) undefined (call-with-this (prop opt_obj_2 value) opt_obj_2)))",
  );
});

test("surface computed property access rewrites to index", () => {
  expectExpression("(obj.[key])", "(index obj key)");
});

test("surface optional computed access guards nullish receiver", () => {
  expectExpression(
    "(obj?.[key])",
    "(let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (index opt_tmp_1 key)))",
  );
});
