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
  type LetStarExpr,
  type ArrayPattern,
  type ObjectPattern,
  type SpreadExpr,
  type ArrayExpr,
  type TernaryExpr,
  type ImportStmt,
  type ExportStmt,
  type TypeAliasStmt,
  type InterfaceStmt,
  type TypeField,
  type TypeParam,
  type TypeNode,
  type TypePrimitive,
  type TypeUnion,
  type FunctionExpr,
  type ReturnExpr,
  type TypeAssertExpr,
  type ClassExpr,
  type ClassBody,
  type BlockStmt,
} from '../src/phaseA1.ts';

const makeSpan = (label = 'phaseA1'): Span => ({
  start: 0,
  end: 0,
  source: `phaseA1-tests:${label}`,
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

const mkTypePrimitive = (kind: TypePrimitive['type']): TypePrimitive => ({
  type: kind,
  span: makeSpan(`type:${kind}`),
});

const mkTypeField = (key: string, fieldType: TypeNode): TypeField => ({
  type: 'type-field',
  key,
  fieldType,
  span: makeSpan(`field:${key}`),
});

function mkTypeParam(
  name: string,
  opts?: {
    variance?: 'in' | 'out';
    constraint?: TypeNode;
    defaultType?: TypeNode;
  },
): TypeParam {
  const param: TypeParam = {
    type: 'type-param',
    name: mkIdentifier(name, `type-param:${name}`),
    span: makeSpan(`type-param:${name}`),
  };
  if (opts?.variance) {
    param.variance = opts.variance;
  }
  if (opts?.constraint) {
    param.constraint = opts.constraint;
  }
  if (opts?.defaultType) {
    param.defaultType = opts.defaultType;
  }
  return param;
}

const mkTypeUnion = (types: TypeNode[]): TypeUnion => ({
  type: 'type-union',
  types,
  span: makeSpan('type-union'),
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

test('phaseA1 binds array patterns inside let*', () => {
  const arrayPattern: ArrayPattern = {
    type: 'array-pattern',
    elements: [mkIdentifier('first'), mkIdentifier('second')],
    rest: mkIdentifier('rest'),
    span: makeSpan('array-pattern'),
  };
  const binding: Binding = {
    target: arrayPattern,
    init: mkIdentifier('incoming'),
  };
  const letStar: LetStarExpr = {
    type: 'let*',
    isConst: true,
    bindings: [binding],
    body: [mkExprStmt(mkIdentifier('rest'))],
    span: makeSpan('let-array'),
  };
  const result = runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 supports object pattern bindings', () => {
  const objectPattern: ObjectPattern = {
    type: 'object-pattern',
    properties: [
      { key: 'x', target: mkIdentifier('x') },
      { key: 'y', target: mkIdentifier('y') },
    ],
    rest: mkIdentifier('restFields'),
    span: makeSpan('object-pattern'),
  };
  const binding: Binding = {
    target: objectPattern,
    init: mkIdentifier('source'),
  };
  const letStar: LetStarExpr = {
    type: 'let*',
    isConst: false,
    bindings: [binding],
    body: [mkExprStmt(mkIdentifier('restFields'))],
    span: makeSpan('let-object'),
  };
  const result = runProgram([letStar]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 visits spread expressions inside arrays', () => {
  const spread: SpreadExpr = {
    type: 'spread',
    expr: mkIdentifier('restItems'),
    kind: 'array',
    span: makeSpan('spread'),
  };
  const arrayExpr: ArrayExpr = {
    type: 'array',
    elements: [spread, mkLiteral('tail')],
    span: makeSpan('array-with-spread'),
  };
  const result = runProgram([mkExprStmt(arrayExpr)]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 evaluates ternary expressions', () => {
  const ternary: TernaryExpr = {
    type: 'ternary',
    test: mkLiteral(true),
    consequent: mkLiteral('yes'),
    alternate: mkLiteral('no'),
    span: makeSpan('ternary'),
  };
  const result = runProgram([mkExprStmt(ternary)]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 registers import bindings', () => {
  const importStmt: ImportStmt = {
    type: 'import',
    spec: {
      source: mkLiteral('./mod'),
      defaultBinding: mkIdentifier('defaultExport'),
      named: [
        { imported: 'value', local: mkIdentifier('localValue') },
      ],
    },
    span: makeSpan('import'),
  };
  const result = runProgram([importStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 processes export statements', () => {
  const exportStmt: ExportStmt = {
    type: 'export',
    spec: {
      defaultExport: mkIdentifier('defaultValue'),
      named: [
        { exported: 'Named', local: mkIdentifier('internal') },
      ],
      source: mkLiteral('./dep'),
    },
    span: makeSpan('export'),
  };
  const result = runProgram([exportStmt]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 handles type aliases with parameters', () => {
  const typeParam = mkTypeParam('T', { variance: 'out', constraint: mkTypePrimitive('type-string') });
  const alias: TypeAliasStmt = {
    type: 'type-alias',
    name: mkIdentifier('Result'),
    typeParams: [typeParam],
    typeValue: mkTypeUnion([mkTypePrimitive('type-string'), mkTypePrimitive('type-number')]),
    span: makeSpan('type-alias'),
  };
  const result = runProgram([alias]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 processes interface definitions', () => {
  const shape: InterfaceStmt = {
    type: 'type-interface',
    name: mkIdentifier('Shape'),
    body: {
      fields: [
        mkTypeField('x', mkTypePrimitive('type-number')),
        mkTypeField('y', mkTypePrimitive('type-number')),
      ],
    },
    span: makeSpan('interface'),
  };
  const result = runProgram([shape]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 accepts typed functions and asserts', () => {
  const assertExpr: TypeAssertExpr = {
    type: 'type-assert',
    expr: mkIdentifier('value'),
    assertedType: mkTypePrimitive('type-number'),
    span: makeSpan('type-assert'),
  };
  const fn: FunctionExpr = {
    type: 'fn',
    typeParams: [mkTypeParam('T', { constraint: mkTypePrimitive('type-string') })],
    signature: {
      parameters: [
        {
          name: mkIdentifier('value'),
          typeAnnotation: mkTypePrimitive('type-number'),
        },
      ],
      returnType: mkTypePrimitive('type-number'),
    },
    body: [mkExprStmt(assertExpr, 'assert'), mkReturn(mkIdentifier('value', 'return'))],
    span: makeSpan('function'),
  };
  const result = runProgram([mkExprStmt(fn, 'fn-expr')]);
  assert.strictEqual(result.diagnostics.length, 0);
});

test('phaseA1 traverses decorator-rich classes', () => {
  const classBody: ClassBody = {
    statements: [mkExprStmt(mkLiteral('member'))],
  };
  const classExpr: ClassExpr = {
    type: 'class',
    name: mkIdentifier('Custom'),
    decorators: [mkIdentifier('decorator')],
    extends: mkIdentifier('Base'),
    implements: [mkIdentifier('Interface')],
    constructor: mkExprStmt(mkLiteral('ctor')),
    body: classBody,
    staticBlocks: [mkBlock([mkExprStmt(mkLiteral('static-block'))], 'static-block')],
    span: makeSpan('class'),
  };
  const result = runProgram([mkExprStmt(classExpr, 'class-expr')]);
  assert.strictEqual(result.diagnostics.length, 0);
});
