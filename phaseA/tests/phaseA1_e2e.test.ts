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
} from "./src/phaseA1.ts";

const makeSpan = (label = "phaseA1"): Span => ({
  start: 0,
  end: 0,
  source: `phaseA1-tests:${label}`,
});

const mkIdentifier = (name: string, label = name): Identifier =>
  new Identifier(name, makeSpan(`ident:${label}`));

const mkLiteral = (
  value: string | number | boolean | null | undefined,
  label = "lit"
): Literal => new Literal(value, makeSpan(`lit:${label}`));

const mkExprStmt = (expr: Expression, label = "expr"): ExprStmt =>
  new ExprStmt(expr, makeSpan(`expr:${label}`));

const mkBlock = (statements: Statement[], label = "block"): BlockStmt =>
  new BlockStmt(statements, makeSpan(`block:${label}`));

const mkReturn = (value?: Expression): ReturnExpr =>
  new ReturnExpr(makeSpan("return"), value);

const mkTypePrimitive = (
  kind: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"
): TypePrimitive => new TypePrimitive(kind, makeSpan(`type:${kind}`));

const mkTypeField = (key: string, fieldType: TypeNode): TypeField =>
  new TypeField(key, fieldType, makeSpan(`field:${key}`));

function mkTypeParam(
  name: string,
  opts?: {
    variance?: "in" | "out";
    constraint?: TypeNode;
    defaultType?: TypeNode;
  }
): TypeParam {
  return new TypeParam(
    mkIdentifier(name, `type-param:${name}`),
    makeSpan(`type-param:${name}`),
    opts?.variance,
    opts?.constraint,
    opts?.defaultType
  );
}

const mkTypeUnion = (types: TypeNode[]): TypeUnion =>
  new TypeUnion(types, makeSpan("type-union"));

function runProgram(body: Statement[]) {
  const ctx: Context = { diagnostics: [], scopeStack: [] };
  const processor = createProcessor(ctx);
  const program = new Program(body, makeSpan("program"));
  const result = processor.run(program);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  return result;
}

test("phaseA1 binds array patterns inside let*", () => {
  const arrayPattern = new ArrayPattern(
    [mkIdentifier("first"), mkIdentifier("second")],
    makeSpan("array-pattern"),
    mkIdentifier("rest")
  );
  const binding: Binding = {
    target: arrayPattern,
    init: mkIdentifier("incoming"),
  };
  const letStar = new LetStarExpr(
    true,
    [binding],
    [mkExprStmt(mkIdentifier("rest"))],
    makeSpan("let-array")
  );
  const result = runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 supports object pattern bindings", () => {
  const objectPattern = new ObjectPattern(
    [
      { key: "x", target: mkIdentifier("x") },
      { key: "y", target: mkIdentifier("y") },
    ],
    makeSpan("object-pattern"),
    mkIdentifier("restFields")
  );
  const binding: Binding = {
    target: objectPattern,
    init: mkIdentifier("source"),
  };
  const letStar = new LetStarExpr(
    false,
    [binding],
    [mkExprStmt(mkIdentifier("restFields"))],
    makeSpan("let-object")
  );
  const result = runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 visits spread expressions inside arrays", () => {
  const spread = new SpreadExpr(
    mkIdentifier("restItems"),
    "array",
    makeSpan("spread")
  );
  const arrayExpr = new ArrayExpr(
    [spread, mkLiteral("tail")],
    makeSpan("array-with-spread")
  );
  const result = runProgram([mkExprStmt(arrayExpr)]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 evaluates ternary expressions", () => {
  const ternary = new TernaryExpr(
    mkLiteral(true),
    mkLiteral("yes"),
    mkLiteral("no"),
    makeSpan("ternary")
  );
  const result = runProgram([mkExprStmt(ternary)]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 registers import bindings", () => {
  const importStmt = new ImportStmt(
    {
      source: mkLiteral("./mod"),
      defaultBinding: mkIdentifier("defaultExport"),
      named: [{ imported: "value", local: mkIdentifier("localValue") }],
    },
    makeSpan("import")
  );
  const result = runProgram([importStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 processes export statements", () => {
  const exportStmt = new ExportStmt(
    {
      defaultExport: mkIdentifier("defaultValue"),
      named: [{ exported: "Named", local: mkIdentifier("internal") }],
      source: mkLiteral("./dep"),
    },
    makeSpan("export")
  );
  const result = runProgram([exportStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 handles type aliases with parameters", () => {
  const typeParam = mkTypeParam("T", {
    variance: "out",
    constraint: mkTypePrimitive("type-string"),
  });
  const alias = new TypeAliasStmt(
    mkIdentifier("Result"),
    mkTypeUnion([mkTypePrimitive("type-string"), mkTypePrimitive("type-number")]),
    makeSpan("type-alias"),
    [typeParam]
  );
  const result = runProgram([alias]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 processes interface definitions", () => {
  const shape = new InterfaceStmt(
    mkIdentifier("Shape"),
    {
      fields: [
        mkTypeField("x", mkTypePrimitive("type-number")),
        mkTypeField("y", mkTypePrimitive("type-number")),
      ],
    },
    makeSpan("interface")
  );
  const result = runProgram([shape]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 accepts typed functions and asserts", () => {
  const assertExpr = new TypeAssertExpr(
    mkIdentifier("value"),
    mkTypePrimitive("type-number"),
    makeSpan("type-assert")
  );
  const fn = new FunctionExpr(
    {
      parameters: [
        {
          name: mkIdentifier("value"),
          typeAnnotation: mkTypePrimitive("type-number"),
        },
      ],
      returnType: mkTypePrimitive("type-number"),
    },
    [mkExprStmt(assertExpr, "assert"), mkReturn(mkIdentifier("value", "return"))],
    makeSpan("function"),
    [mkTypeParam("T", { constraint: mkTypePrimitive("type-string") })]
  );
  const result = runProgram([mkExprStmt(fn, "fn-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA1 traverses decorator-rich classes", () => {
  const classBody: ClassBody = {
    statements: [mkExprStmt(mkLiteral("member"))],
  };
  const classExpr = new ClassExpr(
    classBody,
    makeSpan("class"),
    mkIdentifier("Custom"),
    [mkIdentifier("decorator")],
    mkIdentifier("Base"),
    [mkIdentifier("Interface")],
    mkExprStmt(mkLiteral("ctor")),
    [mkBlock([mkExprStmt(mkLiteral("static-block"))], "static-block")]
  );
  const result = runProgram([mkExprStmt(classExpr, "class-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});
