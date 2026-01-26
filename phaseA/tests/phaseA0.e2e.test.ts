import test from 'node:test';
import assert from 'node:assert';
import {
  createProcessor,
  type Program,
  type Context,
  type Span,
  type Identifier,
  type Literal,
  type Expression,
  type Statement,
  type Binding,
  type ExprStmt,
  type AssignExpr,
  type LetStarExpr,
  type BlockStmt,
  type ForClassic,
  type ForOf,
  type SwitchStmt,
  type SwitchCase,
  type TryCatchExpr,
  type ReturnExpr,
  type ClassExpr,
} from '../src/phaseA0.ts';

const makeSpan = (label = 'phaseA0'): Span => ({
  start: 0,
  end: 0,
  source: `phaseA0-tests:${label}`,
});

const mkIdentifier = (name: string, label = name): Identifier => ({
  type: 'identifier',
  name,
  span: makeSpan(`ident:${label}`),
});

const mkLiteral = (
  value: string | number | boolean | null | undefined,
  label = 'lit',
): Literal => ({
  type: 'literal',
  value,
  span: makeSpan(`lit:${label}`),
});

const mkExprStmt = (expr: Expression, label = 'expr'): ExprStmt => ({
  type: 'exprStmt',
  expr,
  span: makeSpan(`expr:${label}`),
});

const mkBlock = (statements: Statement[], label = 'block'): BlockStmt => ({
  type: 'block',
  statements,
  span: makeSpan(`block:${label}`),
});

const mkReturn = (value?: Expression): ReturnExpr => ({
  type: 'return',
  value,
  span: makeSpan('return'),
});

function runProgram(body: Statement[]) {
  const ctx: Context = { diagnostics: [], scopeStack: [] };
  const processor = createProcessor(ctx);
  const program: Program = {
    type: 'program',
    body,
    span: makeSpan('program'),
  };
  const result = processor.run(program);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  return result;
}

test('phaseA0 processes literal expressions without diagnostics', () => {
  const result = runProgram([mkExprStmt(mkLiteral(42))]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 allows assignments to identifiers', () => {
  const assign: AssignExpr = {
    type: 'assign',
    target: mkIdentifier('target'),
    value: mkLiteral(9000),
    span: makeSpan('assign'),
  };
  const result = runProgram([assign]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 reports diagnostics for invalid assignment targets', () => {
  const invalidAssign: AssignExpr = {
    type: 'assign',
    target: mkLiteral('not-a-target'),
    value: mkLiteral(1),
    span: makeSpan('assign-invalid'),
  };
  const result = runProgram([invalidAssign]);
  assert.strictEqual(result.diagnostics.length, 1);
  assert.strictEqual(result.diagnostics[0].message, 'Invalid assignment target');
});

test('phaseA0 runs let* bindings sequentially', () => {
  const binding: Binding = { target: mkIdentifier('a'), init: mkLiteral(5) };
  const letStar: LetStarExpr = {
    type: 'let*',
    isConst: false,
    bindings: [binding],
    body: [mkExprStmt(mkIdentifier('a', 'read'))],
    span: makeSpan('let-star'),
  };
  const result = runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 evaluates for-classic loops', () => {
  const forClassic: ForClassic = {
    type: 'for-classic',
    init: mkExprStmt(mkLiteral(0), 'for-init'),
    condition: mkLiteral(true, 'for-cond'),
    update: mkLiteral(1, 'for-update'),
    body: mkBlock([mkExprStmt(mkIdentifier('loop'))], 'for-body'),
    span: makeSpan('for-classic'),
  };
  const result = runProgram([forClassic]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 handles for-of iterations', () => {
  const forOf: ForOf = {
    type: 'for-of',
    binding: { target: mkIdentifier('item') },
    iterable: mkIdentifier('collection'),
    body: mkBlock([mkExprStmt(mkIdentifier('item'))], 'for-of-body'),
    span: makeSpan('for-of'),
  };
  const result = runProgram([forOf]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 inspects switch cases', () => {
  const switchStmt: SwitchStmt = {
    type: 'switch',
    discriminant: mkIdentifier('selector'),
    cases: [
      {
        test: mkLiteral(1),
        consequent: [mkExprStmt(mkLiteral('case-1'))],
      } as SwitchCase,
    ],
    span: makeSpan('switch'),
  };
  const result = runProgram([switchStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 marches through try/catch/finally', () => {
  const tryExpr: TryCatchExpr = {
    type: 'try',
    body: mkBlock([mkExprStmt(mkLiteral('try'))], 'try-body'),
    catchClause: {
      binding: { target: mkIdentifier('err') },
      body: [mkExprStmt(mkIdentifier('err', 'catch'))],
    },
    finallyClause: {
      body: [mkExprStmt(mkLiteral('cleanup'))],
    },
    span: makeSpan('try'),
  };
  const result = runProgram([mkExprStmt(tryExpr, 'try-expr')]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 evaluates function bodies with returns', () => {
  const fn: Expression = {
    type: 'fn',
    signature: { parameters: [{ name: mkIdentifier('value') }] },
    body: [mkReturn(mkIdentifier('value'))],
    span: makeSpan('fn'),
  };
  const result = runProgram([mkExprStmt(fn, 'fn-expr')]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA0 visits class bodies', () => {
  const cls: ClassExpr = {
    type: 'class',
    name: mkIdentifier('Watcher'),
    body: [mkExprStmt(mkLiteral('body'))],
    span: makeSpan('class'),
  };
  const result = runProgram([mkExprStmt(cls, 'class-expr')]);
  assert.strictEqual(result.diagnostics.length, 0);
});
