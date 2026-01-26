/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Statement,
  Expression,
  TypeNode,
  Program,
  Span,
  Identifier,
  Literal,
  Binding,
  ArrayPattern,
  ObjectPattern,
  RestPattern,
  BlockStmt,
  IfStmt,
  WhileStmt,
  LetStarExpr,
  ForClassic,
  ForOf,
  ForAwait,
  SwitchStmt,
  AssignExpr,
  ReturnExpr,
  BreakStmt,
  ContinueStmt,
  ExprStmt,
  CallExpr,
  PropExpr,
  IndexExpr,
  NewExpr,
  ArrayExpr,
  ObjectExpr,
  ThrowExpr,
  TryCatchExpr,
  FunctionExpr,
  ClassExpr,
} from "./phaseA1.js";

export type SerializedSpan = { start: number; end: number; source: string };
export type SerializedIdentifier = { kind: "identifier"; name: string; span: SerializedSpan };
export type SerializedLiteral = { kind: "literal"; value: Literal["value"]; span: SerializedSpan };

export type SerializedExpression =
  | SerializedLiteral
  | SerializedIdentifier
  | { kind: "call"; callee: SerializedExpression; args: SerializedExpression[]; span: SerializedSpan }
  | { kind: "prop"; object: SerializedExpression; name: string; span: SerializedSpan }
  | { kind: "index"; object: SerializedExpression; index: SerializedExpression; span: SerializedSpan }
  | { kind: "new"; callee: SerializedExpression; args: SerializedExpression[]; span: SerializedSpan }
  | ({ kind: "array" } & { elements: SerializedExpression[]; span: SerializedSpan })
  | ({ kind: "object" } & { fields: { key: string; value: SerializedExpression }[]; span: SerializedSpan })
  | { kind: "throw"; argument: SerializedExpression; span: SerializedSpan }
  | { kind: "try"; body: SerializedStatement; span: SerializedSpan }
  | { kind: "fn"; signature: { parameters: { name: SerializedIdentifier }[]; returnType?: SerializedTypeNode }; body: SerializedStatement[]; span: SerializedSpan }
  | ({ kind: "class" } & { body: SerializedStatement[]; span: SerializedSpan });

export type SerializedStatement =
  | { kind: "block"; statements: SerializedStatement[]; span: SerializedSpan }
  | { kind: "if"; test: SerializedExpression; consequent: SerializedStatement; alternate?: SerializedStatement; span: SerializedSpan }
  | { kind: "while"; condition: SerializedExpression; body: SerializedStatement; span: SerializedSpan }
  | { kind: "let*"; isConst: boolean; bindings: SerializedBinding[]; body: SerializedStatement[]; span: SerializedSpan }
  | { kind: "for-classic"; init?: SerializedStatement; condition?: SerializedExpression; update?: SerializedExpression; body: SerializedStatement; span: SerializedSpan }
  | { kind: "for-of"; binding: SerializedBinding; iterable: SerializedExpression; body: SerializedStatement; span: SerializedSpan }
  | { kind: "for-await"; binding: SerializedBinding; iterable: SerializedExpression; body: SerializedStatement; span: SerializedSpan }
  | { kind: "switch"; discriminant: SerializedExpression; cases: { test?: SerializedExpression | null; consequent: SerializedStatement[] }[]; span: SerializedSpan }
  | { kind: "assign"; target: SerializedExpression; value: SerializedExpression; span: SerializedSpan }
  | { kind: "return"; value?: SerializedExpression; span: SerializedSpan }
  | { kind: "break"; label?: string; span: SerializedSpan }
  | { kind: "continue"; label?: string; span: SerializedSpan }
  | { kind: "exprStmt"; expr: SerializedExpression; span: SerializedSpan }
  | { kind: "fn"; signature: { parameters: { name: SerializedIdentifier }[] }; body: SerializedStatement[]; span: SerializedSpan }
  | { kind: "class"; body: SerializedStatement[]; span: SerializedSpan };

export type SerializedBinding = {
  target: SerializedBindingTarget;
  init?: SerializedExpression;
};

export type SerializedBindingTarget =
  | SerializedIdentifier
  | { kind: "array-pattern"; elements: SerializedBindingTarget[]; span: SerializedSpan; rest?: SerializedBindingTarget }
  | { kind: "object-pattern"; properties: { key: string; target: SerializedBindingTarget }[]; span: SerializedSpan; rest?: SerializedBindingTarget }
  | { kind: "rest"; target: SerializedBindingTarget; span: SerializedSpan };

export type SerializedTypeNode = { kind: string; span: SerializedSpan } & Record<string, any>;

export type SerializedProgram = { kind: "program"; body: SerializedStatement[]; span: SerializedSpan };

function serializeSpan(span: Span): SerializedSpan {
  return { start: span.start, end: span.end, source: span.source };
}

export function serializeIdentifier(id: Identifier): SerializedIdentifier {
  return { kind: "identifier", name: id.name, span: serializeSpan(id.span) };
}

export function serializeLiteral(lit: Literal): SerializedLiteral {
  return { kind: "literal", value: lit.value, span: serializeSpan(lit.span) };
}

export function serializeExpression(expr: Expression): SerializedExpression {
  if (expr instanceof Literal) return serializeLiteral(expr);
  if (expr instanceof Identifier) return serializeIdentifier(expr);
  if (expr instanceof CallExpr) {
    return { kind: "call", callee: serializeExpression(expr.callee), args: expr.args.map(serializeExpression), span: serializeSpan(expr.span) };
  }
  if (expr instanceof PropExpr) {
    return { kind: "prop", object: serializeExpression(expr.object), name: expr.name, span: serializeSpan(expr.span) };
  }
  if (expr instanceof IndexExpr) {
    return { kind: "index", object: serializeExpression(expr.object), index: serializeExpression(expr.index), span: serializeSpan(expr.span) };
  }
  if (expr instanceof NewExpr) {
    return { kind: "new", callee: serializeExpression(expr.callee), args: expr.args.map(serializeExpression), span: serializeSpan(expr.span) };
  }
  if (expr instanceof ArrayExpr) {
    return { kind: "array", elements: expr.elements.map(serializeExpression), span: serializeSpan(expr.span) };
  }
  if (expr instanceof ObjectExpr) {
    return { kind: "object", fields: expr.fields.map((f) => ({ key: f.key, value: serializeExpression(f.value) })), span: serializeSpan(expr.span) };
  }
  if (expr instanceof ThrowExpr) {
    return { kind: "throw", argument: serializeExpression(expr.argument), span: serializeSpan(expr.span) };
  }
  if (expr instanceof TryCatchExpr) {
    return { kind: "try", body: serializeStatement(expr.body), span: serializeSpan(expr.span) };
  }
  if (expr instanceof FunctionExpr) {
    return {
      kind: "fn",
      signature: { parameters: expr.signature.parameters.map((p) => ({ name: serializeIdentifier(p.name) })) },
      body: expr.body.map(serializeStatement),
      span: serializeSpan(expr.span),
    };
  }
  if (expr instanceof ClassExpr) {
    return { kind: "class", body: expr.body.statements.map(serializeStatement), span: serializeSpan(expr.span) };
  }
  throw new Error(`Unsupported expression kind ${(expr as any).__brand}`);
}

export function serializeBindingTarget(target: Binding): SerializedBinding {
  return { target: serializeBindingPattern(target.target), init: target.init ? serializeExpression(target.init) : undefined };
}

function serializeBindingPattern(target: any): SerializedBindingTarget {
  if (target instanceof Identifier) return serializeIdentifier(target);
  if (target instanceof ArrayPattern) {
    return {
      kind: "array-pattern",
      elements: target.elements.map(serializeBindingPattern),
      span: serializeSpan(target.span),
      rest: target.rest ? serializeBindingPattern(target.rest) : undefined,
    };
  }
  if (target instanceof ObjectPattern) {
    return {
      kind: "object-pattern",
      properties: target.properties.map((p) => ({ key: p.key, target: serializeBindingPattern(p.target) })),
      span: serializeSpan(target.span),
      rest: target.rest ? serializeBindingPattern(target.rest) : undefined,
    };
  }
  if (target instanceof RestPattern) {
    return { kind: "rest", target: serializeBindingPattern(target.target), span: serializeSpan(target.span) };
  }
  throw new Error(`Unsupported binding target ${(target as any).__brand}`);
}

export function serializeStatement(stmt: Statement): SerializedStatement {
  if (stmt instanceof BlockStmt) {
    return { kind: "block", statements: stmt.statements.map(serializeStatement), span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof IfStmt) {
    return {
      kind: "if",
      test: serializeExpression(stmt.test),
      consequent: serializeStatement(stmt.consequent),
      alternate: stmt.alternate ? serializeStatement(stmt.alternate) : undefined,
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof WhileStmt) {
    return { kind: "while", condition: serializeExpression(stmt.condition), body: serializeStatement(stmt.body), span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof LetStarExpr) {
    return {
      kind: "let*",
      isConst: stmt.isConst,
      bindings: stmt.bindings.map(serializeBindingTarget),
      body: stmt.body.map(serializeStatement),
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ForClassic) {
    return {
      kind: "for-classic",
      init: stmt.init ? serializeStatement(stmt.init) : undefined,
      condition: stmt.condition ? serializeExpression(stmt.condition) : undefined,
      update: stmt.update ? serializeExpression(stmt.update) : undefined,
      body: serializeStatement(stmt.body),
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ForOf) {
    return {
      kind: "for-of",
      binding: serializeBindingTarget(stmt.binding),
      iterable: serializeExpression(stmt.iterable),
      body: serializeStatement(stmt.body),
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ForAwait) {
    return {
      kind: "for-await",
      binding: serializeBindingTarget(stmt.binding),
      iterable: serializeExpression(stmt.iterable),
      body: serializeStatement(stmt.body),
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof SwitchStmt) {
    return {
      kind: "switch",
      discriminant: serializeExpression(stmt.discriminant),
      cases: stmt.cases.map((c) => ({ test: c.test ? serializeExpression(c.test) : null, consequent: c.consequent.map(serializeStatement) })),
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof AssignExpr) {
    return { kind: "assign", target: serializeExpression(stmt.target), value: serializeExpression(stmt.value), span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof ReturnExpr) {
    return { kind: "return", value: stmt.value ? serializeExpression(stmt.value) : undefined, span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof BreakStmt) {
    return { kind: "break", label: stmt.label?.name, span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof ContinueStmt) {
    return { kind: "continue", label: stmt.label?.name, span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof ExprStmt) {
    return { kind: "exprStmt", expr: serializeExpression(stmt.expr), span: serializeSpan(stmt.span) };
  }
  if (stmt instanceof FunctionExpr) {
    return {
      kind: "fn",
      signature: { parameters: stmt.signature.parameters.map((p) => ({ name: serializeIdentifier(p.name) })) },
      body: stmt.body.map(serializeStatement),
      span: serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ClassExpr) {
    return { kind: "class", body: stmt.body.statements.map(serializeStatement), span: serializeSpan(stmt.span) };
  }
  throw new Error(`Unsupported statement kind ${(stmt as any).__brand}`);
}

export function serializeProgram(program: Program): SerializedProgram {
  return { kind: "program", body: program.body.map(serializeStatement), span: serializeSpan(program.span) };
}
