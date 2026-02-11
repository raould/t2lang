import test from "node:test";
import assert from "node:assert";
import {
  createProcessor,
  Program,
  type Context,
  type Span,
  Identifier,
  Literal,
  type Expression,
  type Statement,
  type Binding,
  ExprStmt,
  LetStarExpr,
  ArrayPattern,
  ObjectPattern,
  SpreadExpr,
  ArrayExpr,
  TernaryExpr,
  ImportStmt,
  ExportStmt,
  TypeAliasStmt,
  InterfaceStmt,
  TypeField,
  TypeParam,
  type TypeNode,
  TypePrimitive,
  TypeUnion,
  FunctionExpr,
  ReturnExpr,
  TypeAssertExpr,
  ClassExpr,
  type ClassBody,
  BlockStmt,
} from "../src/phaseA1.ts";

const makeSpan = (label = "phaseA1"): Span => ({
  start: 0,
  end: 0,
  source: `phaseA1-tests:${label}`,
});

const mkIdentifier = (name: string, label = name): Identifier =>
  new Identifier({ name, span: makeSpan(`ident:${label}`) });

const mkLiteral = (
  value: string | number | boolean | null | undefined,
  label = "lit"
): Literal => new Literal({ value, span: makeSpan(`lit:${label}`) });

const mkExprStmt = (expr: Expression, label = "expr"): ExprStmt =>
  new ExprStmt({ expr, span: makeSpan(`expr:${label}`) });

const mkBlock = (statements: Statement[], label = "block"): BlockStmt =>
  new BlockStmt({ statements, span: makeSpan(`block:${label}`) });

const mkReturn = (value?: Expression): ReturnExpr =>
  new ReturnExpr({ span: makeSpan("return"), value });

const mkTypePrimitive = (
  kind: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"
): TypePrimitive => new TypePrimitive({ kind, span: makeSpan(`type:${kind}`) });

const mkTypeField = (key: string, fieldType: TypeNode): TypeField =>
  new TypeField({ key, fieldType, span: makeSpan(`field:${key}`) });

function mkTypeParam(
  name: string,
  opts?: {
    variance?: "in" | "out";
    constraint?: TypeNode;
    defaultType?: TypeNode;
  }
): TypeParam {
  return new TypeParam({
    name: mkIdentifier(name, `type-param:${name}`),
    span: makeSpan(`type-param:${name}`),
    variance: opts?.variance,
    constraint: opts?.constraint,
    defaultType: opts?.defaultType,
  });
}

const mkTypeUnion = (types: TypeNode[]): TypeUnion =>
  new TypeUnion({ types, span: makeSpan("type-union") });

async function runProgram(body: Statement[]) {
  const ctx: Context = { diagnostics: [], scopeStack: [] };
  const processor = await createProcessor(ctx);
  const program = new Program({ body, span: makeSpan("program") });
  const result = await processor.run(program);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  return result;
}

test("phaseA1 binds array patterns inside let*", async () => {
  const arrayPattern = new ArrayPattern({
    elements: [mkIdentifier("first"), mkIdentifier("second")],
    span: makeSpan("array-pattern"),
    rest: mkIdentifier("rest"),
  });
  const binding: Binding = {
    target: arrayPattern,
    init: mkIdentifier("incoming"),
  };
  const letStar = new LetStarExpr({
    isConst: true,
    bindings: [binding],
    body: [mkExprStmt(mkIdentifier("rest"))],
    span: makeSpan("let-array"),
  });
  const result = await runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 supports object pattern bindings", async () => {
  const objectPattern = new ObjectPattern({
    properties: [
      { key: "x", target: mkIdentifier("x") },
      { key: "y", target: mkIdentifier("y") },
    ],
    span: makeSpan("object-pattern"),
    rest: mkIdentifier("restFields"),
  });
  const binding: Binding = {
    target: objectPattern,
    init: mkIdentifier("source"),
  };
  const letStar = new LetStarExpr({
    isConst: false,
    bindings: [binding],
    body: [mkExprStmt(mkIdentifier("restFields"))],
    span: makeSpan("let-object"),
  });
  const result = await runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 visits spread expressions inside arrays", async () => {
  const spread = new SpreadExpr({
    expr: mkIdentifier("restItems"),
    kind: "array",
    span: makeSpan("spread"),
  });
  const arrayExpr = new ArrayExpr({
    elements: [spread, mkLiteral("tail")],
    span: makeSpan("array-with-spread"),
  });
  const result = await runProgram([mkExprStmt(arrayExpr)]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 evaluates ternary expressions", async () => {
  const ternary = new TernaryExpr({
    test: mkLiteral(true),
    consequent: mkLiteral("yes"),
    alternate: mkLiteral("no"),
    span: makeSpan("ternary"),
  });
  const result = await runProgram([mkExprStmt(ternary)]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 registers import bindings", async () => {
  const importStmt = new ImportStmt({
    spec: {
      source: mkLiteral("./mod"),
      defaultBinding: mkIdentifier("defaultExport"),
      named: [{ imported: "value", local: mkIdentifier("localValue") }],
    },
    span: makeSpan("import"),
  });
  const result = await runProgram([importStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 processes export statements", async () => {
  const exportStmt = new ExportStmt({
    spec: {
      defaultExport: mkIdentifier("defaultValue"),
      named: [{ exported: "Named", local: mkIdentifier("internal") }],
      source: mkLiteral("./dep"),
    },
    span: makeSpan("export"),
  });
  const result = await runProgram([exportStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 handles type aliases with parameters", async () => {
  const typeParam = mkTypeParam("T", {
    variance: "out",
    constraint: mkTypePrimitive("type-string"),
  });
  const alias = new TypeAliasStmt({
    name: mkIdentifier("Result"),
    typeValue: mkTypeUnion([mkTypePrimitive("type-string"), mkTypePrimitive("type-number")]),
    span: makeSpan("type-alias"),
    typeParams: [typeParam],
  });
  const result = await runProgram([alias]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 processes interface definitions", async () => {
  const shape = new InterfaceStmt({
    name: mkIdentifier("Shape"),
    body: {
      fields: [
        mkTypeField("x", mkTypePrimitive("type-number")),
        mkTypeField("y", mkTypePrimitive("type-number")),
      ],
    },
    span: makeSpan("interface"),
  });
  const result = await runProgram([shape]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 accepts typed functions and asserts", async () => {
  const assertExpr = new TypeAssertExpr({
    expr: mkIdentifier("value"),
    assertedType: mkTypePrimitive("type-number"),
    span: makeSpan("type-assert"),
  });
  const fn = new FunctionExpr({
    signature: {
      parameters: [
        {
          name: mkIdentifier("value"),
          typeAnnotation: mkTypePrimitive("type-number"),
        },
      ],
      returnType: mkTypePrimitive("type-number"),
    },
    body: [mkExprStmt(assertExpr, "assert"), mkReturn(mkIdentifier("value", "return"))],
    span: makeSpan("function"),
    typeParams: [mkTypeParam("T", { constraint: mkTypePrimitive("type-string") })],
  });
  const result = await runProgram([mkExprStmt(fn, "fn-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 traverses decorator-rich classes", async () => {
  const classBody: ClassBody = {
    statements: [mkExprStmt(mkLiteral("member"))],
  };
  const classExpr = new ClassExpr({
    body: classBody,
    span: makeSpan("class"),
    name: mkIdentifier("Custom"),
    decorators: [mkIdentifier("decorator")],
    extends: mkIdentifier("Base"),
    implements: [mkIdentifier("Interface")],
    constructorStmt: mkExprStmt(mkLiteral("ctor")),
    staticBlocks: [mkBlock([mkExprStmt(mkLiteral("static-block"))], "static-block")],
  });
  const result = await runProgram([mkExprStmt(classExpr, "class-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});
