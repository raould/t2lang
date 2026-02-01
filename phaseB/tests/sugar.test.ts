import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { resetGensym } from "../src/gensym.js";
import { serializePhaseBNode } from "../src/typeAnnotationUtils.js";
import type { PhaseBListNode, PhaseBTypeAnnotation, SymbolNode, LiteralNode } from "../src/reader.js";

test("fn parameter list rewrites colon annotations", () => {
  const nodes = parsePhaseBRaw("(fn (x : Number) (+ x 1))", "params.t2");
  const fnNode = nodes[0];
  assert.strictEqual(fnNode.phaseKind, "list");

  const params = (fnNode as PhaseBListNode).elements[1];
  assert.strictEqual(params.phaseKind, "list");

  const [entry] = (params as PhaseBListNode).elements;
  assert.strictEqual(entry.phaseKind, "list");
  const inner = (entry as PhaseBListNode).elements[0];
  assert.strictEqual(inner.phaseKind, "type-annotation");
});

test("bare fn parameters normalize to list entries", () => {
  const nodes = parsePhaseBRaw("(fn (x y) (+ x y))", "bare-params.t2");
  const fnNode = nodes[0] as PhaseBListNode;
  const params = fnNode.elements[1] as PhaseBListNode;
  assert.strictEqual(params.phaseKind, "list");
  assert.strictEqual(params.elements.length, 2);

  const firstParam = params.elements[0] as PhaseBListNode;
  assert.strictEqual(firstParam.phaseKind, "list");
  const firstSymbol = firstParam.elements[0];
  assert.strictEqual(firstSymbol.phaseKind, "symbol");
  assert.strictEqual((firstSymbol as SymbolNode).name, "x");

  const secondParam = params.elements[1] as PhaseBListNode;
  assert.strictEqual(secondParam.phaseKind, "list");
  const secondSymbol = secondParam.elements[0];
  assert.strictEqual(secondSymbol.phaseKind, "symbol");
  assert.strictEqual((secondSymbol as SymbolNode).name, "y");
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

test("infix addition rewrites to (call + ...)", () => {
  const nodes = parsePhaseBRaw("(1 + 2)", "infix-add.t2");
  const root = nodes[0] as PhaseBListNode;
  const [head, operator, left, right] = root.elements;
  assert.strictEqual(head.phaseKind, "symbol");
  assert.strictEqual((head as SymbolNode).name, "call");
  assert.strictEqual(operator.phaseKind, "symbol");
  assert.strictEqual((operator as SymbolNode).name, "+");
  assert.strictEqual(left.phaseKind, "literal");
  assert.strictEqual((left as LiteralNode).value, 1);
  assert.strictEqual(right.phaseKind, "literal");
  assert.strictEqual((right as LiteralNode).value, 2);
});

test("infix expressions respect operator precedence", () => {
  const nodes = parsePhaseBRaw("(1 + 2 * 3)", "infix-order.t2");
  const root = nodes[0] as PhaseBListNode;
  const [, plus, left, right] = root.elements;
  assert.strictEqual((plus as SymbolNode).name, "+");
  assert.strictEqual((left as LiteralNode).value, 1);
  assert.strictEqual(right.phaseKind, "list");
  const nested = right as PhaseBListNode;
  const [, multiply, mulLeft, mulRight] = nested.elements;
  assert.strictEqual((multiply as SymbolNode).name, "*");
  assert.strictEqual((mulLeft as LiteralNode).value, 2);
  assert.strictEqual((mulRight as LiteralNode).value, 3);
});

test("logical infix chains retain short-circuit grouping", () => {
  const nodes = parsePhaseBRaw("(a && b || c)", "infix-logical.t2");
  const root = nodes[0] as PhaseBListNode;
  const [, orSymbol, left, right] = root.elements;
  assert.strictEqual((orSymbol as SymbolNode).name, "||");
  assert.strictEqual(right.phaseKind, "symbol");
  assert.strictEqual((right as SymbolNode).name, "c");
  assert.strictEqual(left.phaseKind, "list");
  const guard = left as PhaseBListNode;
  const [, andSymbol, andLeft, andRight] = guard.elements;
  assert.strictEqual((andSymbol as SymbolNode).name, "&&");
  assert.strictEqual((andLeft as SymbolNode).name, "a");
  assert.strictEqual((andRight as SymbolNode).name, "b");
});

test("optional property access rewrites into a null guard", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(prop obj? \"prop\")", "optional-property.t2");
  const serialized = serializePhaseBNode(nodes[0]);
  assert.strictEqual(
    serialized,
    "(let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (prop opt_tmp_1 \"prop\")))",
  );
});

test("optional method call emits call-with-this guard", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(call (prop obj? \"method\") 1)", "optional-method.t2");
  const serialized = serializePhaseBNode(nodes[0]);
  assert.strictEqual(
    serialized,
    "(let* ((opt_obj_1 obj)) (if (== opt_obj_1 null) undefined (call-with-this (prop opt_obj_1 \"method\") opt_obj_1 1)))",
  );
});

test("optional callable access guards the callee", () => {
  resetGensym();
  const nodes = parsePhaseBRaw("(call fn? 1)", "optional-callable.t2");
  const serialized = serializePhaseBNode(nodes[0]);
  assert.strictEqual(
    serialized,
    "(let* ((opt_call_1 fn)) (if (== opt_call_1 null) undefined (call opt_call_1 1)))",
  );
});

function serializeSingleNode(expr: string): string {
  resetGensym();
  const nodes = parsePhaseBRaw(expr);
  assert.strictEqual(nodes.length, 1);
  return serializePhaseBNode(nodes[0]);
}

function expectExpression(expr: string, expected: string): void {
  const serialized = serializeSingleNode(expr);
  assert.strictEqual(serialized, expected);
}

test("surface optional property access lowers to a guard", () => {
  expectExpression(
    "obj?.prop",
    "(let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (prop opt_tmp_1 \"prop\")))",
  );
});

test("surface optional method call preserves this guard", () => {
  expectExpression(
    "(obj?.method 1)",
    "(let* ((opt_obj_1 obj)) (if (== opt_obj_1 null) undefined (call-with-this (prop opt_obj_1 \"method\") opt_obj_1 1)))",
  );
});

test("surface optional method call on method indicator keeps guard", () => {
  expectExpression(
    "(obj.method?. a b)",
    "(let* ((opt_obj_1 obj)) (if (== opt_obj_1 null) undefined (call-with-this (prop opt_obj_1 \"method\") opt_obj_1 a b)))",
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
    "(let* ((opt_obj_2 (let* ((opt_tmp_1 obj)) (if (== opt_tmp_1 null) undefined (prop opt_tmp_1 \"prop\"))))) (if (== opt_obj_2 null) undefined (call-with-this (prop opt_obj_2 \"value\") opt_obj_2)))",
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
