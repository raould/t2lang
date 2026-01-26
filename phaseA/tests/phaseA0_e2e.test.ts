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
  AssignExpr,
  LetStarExpr,
  BlockStmt,
  ForClassic,
  ForOf,
  SwitchStmt,
  type SwitchCase,
  TryCatchExpr,
  ReturnExpr,
  ClassExpr,
  FunctionExpr,
} from "../src/phaseA0.ts";

const makeSpan = (label = "phaseA0"): Span => ({
  start: 0,
  end: 0,
  source: `phaseA0-tests:${label}`,
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

test("phaseA0 processes literal expressions without diagnostics", async () => {
  const result = await runProgram([mkExprStmt(mkLiteral(42))]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 allows assignments to identifiers", async () => {
  const assign = new AssignExpr({
    target: mkIdentifier("target"),
    value: mkLiteral(9000),
    span: makeSpan("assign"),
  });
  const result = await runProgram([assign]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 reports diagnostics for invalid assignment targets", async () => {
  const invalidAssign = new AssignExpr({
    target: mkLiteral("not-a-target"),
    value: mkLiteral(1),
    span: makeSpan("assign-invalid"),
  });
  const result = await runProgram([invalidAssign]);
  assert.strictEqual(result.diagnostics.length, 1);
  assert.strictEqual(result.diagnostics[0].message, "Invalid assignment target");
});

test("phaseA0 runs let* bindings sequentially", async () => {
  const binding: Binding = { target: mkIdentifier("a"), init: mkLiteral(5) };
  const letStar = new LetStarExpr({
    isConst: false,
    bindings: [binding],
    body: [mkExprStmt(mkIdentifier("a", "read"))],
    span: makeSpan("let-star"),
  });
  const result = await runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 evaluates for-classic loops", async () => {
  const forClassic = new ForClassic({
    body: mkBlock([mkExprStmt(mkIdentifier("loop"))], "for-body"),
    span: makeSpan("for-classic"),
    init: mkExprStmt(mkLiteral(0), "for-init"),
    condition: mkLiteral(true, "for-cond"),
    update: mkLiteral(1, "for-update"),
  });
  const result = await runProgram([forClassic]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 handles for-of iterations", async () => {
  const forOf = new ForOf({
    binding: { target: mkIdentifier("item") },
    iterable: mkIdentifier("collection"),
    body: mkBlock([mkExprStmt(mkIdentifier("item"))], "for-of-body"),
    span: makeSpan("for-of"),
  });
  const result = await runProgram([forOf]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 inspects switch cases", async () => {
  const cases: SwitchCase[] = [
    {
      test: mkLiteral(1),
      consequent: [mkExprStmt(mkLiteral("case-1"))],
    },
  ];
  const switchStmt = new SwitchStmt({
    discriminant: mkIdentifier("selector"),
    cases,
    span: makeSpan("switch"),
  });
  const result = await runProgram([switchStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 marches through try/catch/finally", async () => {
  const tryExpr = new TryCatchExpr({
    body: mkBlock([mkExprStmt(mkLiteral("try"))], "try-body"),
    span: makeSpan("try"),
    catchClause: {
      binding: { target: mkIdentifier("err") },
      body: [mkExprStmt(mkIdentifier("err", "catch"))],
    },
    finallyClause: {
      body: [mkExprStmt(mkLiteral("cleanup"))],
    },
  });
  const result = await runProgram([mkExprStmt(tryExpr, "try-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 evaluates function bodies with returns", async () => {
  const fn = new FunctionExpr({
    signature: { parameters: [{ name: mkIdentifier("value") }] },
    body: [mkReturn(mkIdentifier("value"))],
    span: makeSpan("fn"),
  });
  const result = await runProgram([mkExprStmt(fn, "fn-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 visits class bodies", async () => {
  const cls = new ClassExpr({
    body: [mkExprStmt(mkLiteral("body"))],
    span: makeSpan("class"),
    name: mkIdentifier("Watcher"),
  });
  const result = await runProgram([mkExprStmt(cls, "class-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});
