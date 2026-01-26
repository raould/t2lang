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
} from "./src/phaseA0.ts";

const makeSpan = (label = "phaseA0"): Span => ({
  start: 0,
  end: 0,
  source: `phaseA0-tests:${label}`,
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

test("phaseA0 processes literal expressions without diagnostics", () => {
  const result = runProgram([mkExprStmt(mkLiteral(42))]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 allows assignments to identifiers", () => {
  const assign = new AssignExpr(
    mkIdentifier("target"),
    mkLiteral(9000),
    makeSpan("assign")
  );
  const result = runProgram([assign]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 reports diagnostics for invalid assignment targets", () => {
  const invalidAssign = new AssignExpr(
    mkLiteral("not-a-target"),
    mkLiteral(1),
    makeSpan("assign-invalid")
  );
  const result = runProgram([invalidAssign]);
  assert.strictEqual(result.diagnostics.length, 1);
  assert.strictEqual(result.diagnostics[0].message, "Invalid assignment target");
});

test("phaseA0 runs let* bindings sequentially", () => {
  const binding: Binding = { target: mkIdentifier("a"), init: mkLiteral(5) };
  const letStar = new LetStarExpr(
    false,
    [binding],
    [mkExprStmt(mkIdentifier("a", "read"))],
    makeSpan("let-star")
  );
  const result = runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 evaluates for-classic loops", () => {
  const forClassic = new ForClassic(
    mkBlock([mkExprStmt(mkIdentifier("loop"))], "for-body"),
    makeSpan("for-classic"),
    mkExprStmt(mkLiteral(0), "for-init"),
    mkLiteral(true, "for-cond"),
    mkLiteral(1, "for-update")
  );
  const result = runProgram([forClassic]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 handles for-of iterations", () => {
  const forOf = new ForOf(
    { target: mkIdentifier("item") },
    mkIdentifier("collection"),
    mkBlock([mkExprStmt(mkIdentifier("item"))], "for-of-body"),
    makeSpan("for-of")
  );
  const result = runProgram([forOf]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 inspects switch cases", () => {
  const cases: SwitchCase[] = [
    {
      test: mkLiteral(1),
      consequent: [mkExprStmt(mkLiteral("case-1"))],
    },
  ];
  const switchStmt = new SwitchStmt(
    mkIdentifier("selector"),
    cases,
    makeSpan("switch")
  );
  const result = runProgram([switchStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 marches through try/catch/finally", () => {
  const tryExpr = new TryCatchExpr(
    mkBlock([mkExprStmt(mkLiteral("try"))], "try-body"),
    makeSpan("try"),
    {
      binding: { target: mkIdentifier("err") },
      body: [mkExprStmt(mkIdentifier("err", "catch"))],
    },
    {
      body: [mkExprStmt(mkLiteral("cleanup"))],
    }
  );
  const result = runProgram([mkExprStmt(tryExpr, "try-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 evaluates function bodies with returns", () => {
  const fn = new FunctionExpr(
    { parameters: [{ name: mkIdentifier("value") }] },
    [mkReturn(mkIdentifier("value"))],
    makeSpan("fn")
  );
  const result = runProgram([mkExprStmt(fn, "fn-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test("phaseA0 visits class bodies", () => {
  const cls = new ClassExpr(
    [mkExprStmt(mkLiteral("body"))],
    makeSpan("class"),
    mkIdentifier("Watcher")
  );
  const result = runProgram([mkExprStmt(cls, "class-expr")]);
  assert.strictEqual(result.diagnostics.length, 0);
});
