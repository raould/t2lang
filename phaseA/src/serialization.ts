/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Statement,
  Expression,
  Program,
  Span,
  Identifier,
  Literal,
  Binding,
  BindingTarget,
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
  ClassMember,
  CatchClause,
  FinallyClause,
  ClassBody,
} from "./phaseA1.js";

export type SerializedSpan = { start: number; end: number; source: string };
export type SerializedIdentifier = { kind: "identifier"; name: string; span: SerializedSpan };
export type SerializedLiteral = { kind: "literal"; value: Literal["value"]; span: SerializedSpan };

export type SerializedCatchClause = { binding?: SerializedBinding; body: SerializedStatement[] };
export type SerializedFinallyClause = { body: SerializedStatement[] };

export type SerializedExpression =
  | SerializedLiteral
  | SerializedIdentifier
  | { kind: "call"; callee: SerializedExpression; args: SerializedExpression[]; span: SerializedSpan }
  | { kind: "prop"; object: SerializedExpression; name: string; maybeNull: boolean; span: SerializedSpan }
  | { kind: "index"; object: SerializedExpression; index: SerializedExpression; maybeNull: boolean; span: SerializedSpan }
  | { kind: "new"; callee: SerializedExpression; args: SerializedExpression[]; span: SerializedSpan }
  | ({ kind: "array" } & { elements: SerializedExpression[]; span: SerializedSpan })
  | ({ kind: "object" } & { fields: { key: string; value: SerializedExpression }[]; span: SerializedSpan })
  | { kind: "throw"; argument: SerializedExpression; span: SerializedSpan }
  | {
      kind: "try";
      body: SerializedStatement;
      catchClause?: SerializedCatchClause;
      finallyClause?: SerializedFinallyClause;
      span: SerializedSpan;
    }
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
  | { kind: "break"; label?: SerializedIdentifier; span: SerializedSpan }
  | { kind: "continue"; label?: SerializedIdentifier; span: SerializedSpan }
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

async function serializeSpan(span: Span): Promise<SerializedSpan> {
  return { start: span.start, end: span.end, source: span.source };
}

export async function serializeIdentifier(id: Identifier): Promise<SerializedIdentifier> {
  return { kind: "identifier", name: id.name, span: await serializeSpan(id.span) };
}

export async function serializeLiteral(lit: Literal): Promise<SerializedLiteral> {
  return { kind: "literal", value: lit.value, span: await serializeSpan(lit.span) };
}

export async function serializeExpression(expr: Expression): Promise<SerializedExpression> {
  if (expr instanceof Literal) {
    return serializeLiteral(expr);
  }
  if (expr instanceof Identifier) {
    return serializeIdentifier(expr);
  }
  if (expr instanceof CallExpr) {
    const callee = await serializeExpression(expr.callee);
    const args = await Promise.all(expr.args.map(serializeExpression));
    return { kind: "call", callee, args, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof PropExpr) {
    const object = await serializeExpression(expr.object);
    return { kind: "prop", object, name: expr.name, maybeNull: expr.maybeNull, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof IndexExpr) {
    const object = await serializeExpression(expr.object);
    const index = await serializeExpression(expr.index);
    return { kind: "index", object, index, maybeNull: expr.maybeNull, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof NewExpr) {
    const callee = await serializeExpression(expr.callee);
    const args = await Promise.all(expr.args.map(serializeExpression));
    return { kind: "new", callee, args, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof ArrayExpr) {
    const elements = await Promise.all(expr.elements.map(serializeExpression));
    return { kind: "array", elements, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof ObjectExpr) {
    const fields = await Promise.all(expr.fields.map(async (f) => ({ key: f.key, value: await serializeExpression(f.value) })));
    return { kind: "object", fields, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof ThrowExpr) {
    const argument = await serializeExpression(expr.argument);
    return { kind: "throw", argument, span: await serializeSpan(expr.span) };
  }
  if (expr instanceof TryCatchExpr) {
    const body = await serializeStatement(expr.body);
    const serialized: { kind: "try"; body: SerializedStatement; span: SerializedSpan; catchClause?: SerializedCatchClause; finallyClause?: SerializedFinallyClause } = {
      kind: "try",
      body,
      span: await serializeSpan(expr.span),
    };
    if (expr.catchClause) {
      serialized.catchClause = {
        binding: expr.catchClause.binding ? await serializeBindingTarget(expr.catchClause.binding) : undefined,
        body: await Promise.all(expr.catchClause.body.map(serializeStatement)),
      };
    }
    if (expr.finallyClause) {
      serialized.finallyClause = { body: await Promise.all(expr.finallyClause.body.map(serializeStatement)) };
    }
    return serialized;
  }
  if (expr instanceof FunctionExpr) {
    const parameters = await Promise.all(expr.signature.parameters.map(async (p) => ({ name: await serializeIdentifier(p.name) })));
    const body = await Promise.all(expr.body.map(serializeStatement));
    return {
      kind: "fn",
      signature: { parameters },
      body,
      span: await serializeSpan(expr.span),
    };
  }
  if (expr instanceof ClassExpr) {
    const body = await Promise.all(expr.body.statements.map(serializeStatement));
    return { kind: "class", body, span: await serializeSpan(expr.span) };
  }
  throw new Error(`Unsupported expression kind ${(expr as any).__brand}`);
}

export async function serializeBindingTarget(target: Binding): Promise<SerializedBinding> {
  return {
    target: await serializeBindingPattern(target.target),
    init: target.init ? await serializeExpression(target.init) : undefined,
  };
}

async function serializeBindingPattern(target: BindingTarget): Promise<SerializedBindingTarget> {
  if (target instanceof Identifier) return serializeIdentifier(target);
  if (target instanceof ArrayPattern) {
    return {
      kind: "array-pattern",
      elements: await Promise.all(target.elements.map(serializeBindingPattern)),
      span: await serializeSpan(target.span),
      rest: target.rest ? await serializeBindingPattern(target.rest) : undefined,
    };
  }
  if (target instanceof ObjectPattern) {
    return {
      kind: "object-pattern",
      properties: await Promise.all(target.properties.map(async (p) => ({ key: p.key, target: await serializeBindingPattern(p.target) }))),
      span: await serializeSpan(target.span),
      rest: target.rest ? await serializeBindingPattern(target.rest) : undefined,
    };
  }
  if (target instanceof RestPattern) {
    return { kind: "rest", target: await serializeBindingPattern(target.target), span: await serializeSpan(target.span) };
  }
  throw new Error(`Unsupported binding target ${(target as any).__brand}`);
}

export async function serializeStatement(stmt: Statement): Promise<SerializedStatement> {
  if (stmt instanceof BlockStmt) {
    const statements = await Promise.all(stmt.statements.map(serializeStatement));
    return { kind: "block", statements, span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof IfStmt) {
    const consequent = await serializeStatement(stmt.consequent);
    return {
      kind: "if",
      test: await serializeExpression(stmt.test),
      consequent,
      alternate: stmt.alternate ? await serializeStatement(stmt.alternate) : undefined,
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof WhileStmt) {
    return {
      kind: "while",
      condition: await serializeExpression(stmt.condition),
      body: await serializeStatement(stmt.body),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof LetStarExpr) {
    return {
      kind: "let*",
      isConst: stmt.isConst,
      bindings: await Promise.all(stmt.bindings.map(serializeBindingTarget)),
      body: await Promise.all(stmt.body.map(serializeStatement)),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ForClassic) {
    return {
      kind: "for-classic",
      init: stmt.init ? await serializeStatement(stmt.init) : undefined,
      condition: stmt.condition ? await serializeExpression(stmt.condition) : undefined,
      update: stmt.update ? await serializeExpression(stmt.update) : undefined,
      body: await serializeStatement(stmt.body),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ForOf) {
    return {
      kind: "for-of",
      binding: await serializeBindingTarget(stmt.binding),
      iterable: await serializeExpression(stmt.iterable),
      body: await serializeStatement(stmt.body),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ForAwait) {
    return {
      kind: "for-await",
      binding: await serializeBindingTarget(stmt.binding),
      iterable: await serializeExpression(stmt.iterable),
      body: await serializeStatement(stmt.body),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof SwitchStmt) {
    const cases = await Promise.all(
      stmt.cases.map(async (c) => ({
        test: c.test ? await serializeExpression(c.test) : null,
        consequent: await Promise.all(c.consequent.map(serializeStatement)),
      }))
    );
    return {
      kind: "switch",
      discriminant: await serializeExpression(stmt.discriminant),
      cases,
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof AssignExpr) {
    return {
      kind: "assign",
      target: await serializeExpression(stmt.target),
      value: await serializeExpression(stmt.value),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ReturnExpr) {
    return { kind: "return", value: stmt.value ? await serializeExpression(stmt.value) : undefined, span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof BreakStmt) {
    return { kind: "break", label: stmt.label ? await serializeIdentifier(stmt.label) : undefined, span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof ContinueStmt) {
    return { kind: "continue", label: stmt.label ? await serializeIdentifier(stmt.label) : undefined, span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof ExprStmt) {
    return { kind: "exprStmt", expr: await serializeExpression(stmt.expr), span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof FunctionExpr) {
    const parameters = await Promise.all(stmt.signature.parameters.map(async (p) => ({ name: await serializeIdentifier(p.name) })));
    return {
      kind: "fn",
      signature: { parameters },
      body: await Promise.all(stmt.body.map(serializeStatement)),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ClassExpr) {
    return { kind: "class", body: await Promise.all(stmt.body.statements.map(serializeStatement)), span: await serializeSpan(stmt.span) };
  }
  throw new Error(`Unsupported statement kind ${(stmt as any).__brand}`);
}

export async function serializeProgram(program: Program): Promise<SerializedProgram> {
  return {
    kind: "program",
    body: await Promise.all(program.body.map(serializeStatement)),
    span: await serializeSpan(program.span),
  };
}

async function deserializeSpan(serialized: SerializedSpan): Promise<Span> {
  return { start: serialized.start, end: serialized.end, source: serialized.source };
}

export async function deserializeIdentifier(serialized: SerializedIdentifier): Promise<Identifier> {
  return new Identifier({ name: serialized.name, span: await deserializeSpan(serialized.span) });
}

export async function deserializeLiteral(serialized: SerializedLiteral): Promise<Literal> {
  return new Literal({ value: serialized.value, span: await deserializeSpan(serialized.span) });
}

async function deserializeBindingPattern(serialized: SerializedBindingTarget): Promise<BindingTarget> {
  if (serialized.kind === "identifier") {
    return deserializeIdentifier(serialized);
  }
  if (serialized.kind === "array-pattern") {
    return new ArrayPattern({
      elements: await Promise.all(serialized.elements.map(deserializeBindingPattern)),
      span: await deserializeSpan(serialized.span),
      rest: serialized.rest ? await deserializeBindingPattern(serialized.rest) : undefined,
    });
  }
  if (serialized.kind === "object-pattern") {
    return new ObjectPattern({
      properties: await Promise.all(
        serialized.properties.map(async (property) => ({ key: property.key, target: await deserializeBindingPattern(property.target) }))
      ),
      span: await deserializeSpan(serialized.span),
      rest: serialized.rest ? await deserializeBindingPattern(serialized.rest) : undefined,
    });
  }
  if (serialized.kind === "rest") {
    return new RestPattern({
      target: await deserializeBindingPattern(serialized.target),
      span: await deserializeSpan(serialized.span),
    });
  }
  throw new Error("Unknown binding target kind");
}

export async function deserializeBinding(serialized: SerializedBinding): Promise<Binding> {
  return {
    target: await deserializeBindingPattern(serialized.target),
    init: serialized.init ? await deserializeExpression(serialized.init) : undefined,
  };
}

export async function deserializeExpression(serialized: SerializedExpression): Promise<Expression> {
  switch (serialized.kind) {
    case "literal":
      return deserializeLiteral(serialized);
    case "identifier":
      return deserializeIdentifier(serialized);
    case "call":
      return new CallExpr({
        callee: await deserializeExpression(serialized.callee),
        args: await Promise.all(serialized.args.map(deserializeExpression)),
        span: await deserializeSpan(serialized.span),
      });
    case "prop":
      return new PropExpr({
        object: await deserializeExpression(serialized.object),
        name: serialized.name,
        maybeNull: serialized.maybeNull,
        span: await deserializeSpan(serialized.span),
      });
    case "index":
      return new IndexExpr({
        object: await deserializeExpression(serialized.object),
        index: await deserializeExpression(serialized.index),
        maybeNull: serialized.maybeNull,
        span: await deserializeSpan(serialized.span),
      });
    case "new":
      return new NewExpr({
        callee: await deserializeExpression(serialized.callee),
        args: await Promise.all(serialized.args.map(deserializeExpression)),
        span: await deserializeSpan(serialized.span),
      });
    case "array":
      return new ArrayExpr({ elements: await Promise.all(serialized.elements.map(deserializeExpression)), span: await deserializeSpan(serialized.span) });
    case "object":
      return new ObjectExpr({
        fields: await Promise.all(serialized.fields.map(async (field) => ({ key: field.key, value: await deserializeExpression(field.value) }))),
        span: await deserializeSpan(serialized.span),
      });
    case "throw":
      return new ThrowExpr({ argument: await deserializeExpression(serialized.argument), span: await deserializeSpan(serialized.span) });
    case "try": {
      const catchClause: CatchClause | undefined = serialized.catchClause
        ? {
            binding: serialized.catchClause.binding ? await deserializeBinding(serialized.catchClause.binding) : undefined,
            body: await Promise.all(serialized.catchClause.body.map(deserializeStatement)),
          }
        : undefined;
      const finallyClause: FinallyClause | undefined = serialized.finallyClause
        ? { body: await Promise.all(serialized.finallyClause.body.map(deserializeStatement)) }
        : undefined;
      return new TryCatchExpr({
        body: await deserializeStatement(serialized.body),
        catchClause,
        finallyClause,
        span: await deserializeSpan(serialized.span),
      });
    }
    case "fn": {
      const signature = {
        parameters: await Promise.all(serialized.signature.parameters.map(async (p) => ({ name: await deserializeIdentifier(p.name) }))),
      };
      return new FunctionExpr({
        signature,
        body: await Promise.all(serialized.body.map(deserializeStatement)),
        span: await deserializeSpan(serialized.span),
      });
    }
    case "class": {
      const classBody: ClassBody = {
        statements: await Promise.all(serialized.body.map(deserializeStatement)) as ClassMember[],
      };
      return new ClassExpr({ body: classBody, span: await deserializeSpan(serialized.span) });
    }
    default:
      throw new Error(`Unsupported expression kind ${(serialized as SerializedExpression).kind}`);
  }
}

export async function deserializeStatement(serialized: SerializedStatement): Promise<Statement> {
  const span = await deserializeSpan(serialized.span);
  switch (serialized.kind) {
    case "block": {
      const statements = await Promise.all(serialized.statements.map(deserializeStatement));
      return new BlockStmt({ statements, span });
    }
    case "if": {
      const consequent = await deserializeStatement(serialized.consequent);
      return new IfStmt({
        test: await deserializeExpression(serialized.test),
        consequent,
        alternate: serialized.alternate ? await deserializeStatement(serialized.alternate) : undefined,
        span,
      });
    }
    case "while":
      return new WhileStmt({ condition: await deserializeExpression(serialized.condition), body: await deserializeStatement(serialized.body), span });
    case "let*":
      return new LetStarExpr({
        isConst: serialized.isConst,
        bindings: await Promise.all(serialized.bindings.map(deserializeBinding)),
        body: await Promise.all(serialized.body.map(deserializeStatement)),
        span,
      });
    case "for-classic":
      return new ForClassic({
        init: serialized.init ? await deserializeStatement(serialized.init) : undefined,
        condition: serialized.condition ? await deserializeExpression(serialized.condition) : undefined,
        update: serialized.update ? await deserializeExpression(serialized.update) : undefined,
        body: await deserializeStatement(serialized.body),
        span,
      });
    case "for-of":
      return new ForOf({
        binding: await deserializeBinding(serialized.binding),
        iterable: await deserializeExpression(serialized.iterable),
        body: await deserializeStatement(serialized.body),
        span,
      });
    case "for-await":
      return new ForAwait({
        binding: await deserializeBinding(serialized.binding),
        iterable: await deserializeExpression(serialized.iterable),
        body: await deserializeStatement(serialized.body),
        span,
      });
    case "switch":
      return new SwitchStmt({
        discriminant: await deserializeExpression(serialized.discriminant),
        cases: await Promise.all(
          serialized.cases.map(async (c) => ({
            test: c.test ? await deserializeExpression(c.test) : null,
            consequent: await Promise.all(c.consequent.map(deserializeStatement)),
          }))
        ),
        span,
      });
    case "assign":
      return new AssignExpr({ target: await deserializeExpression(serialized.target), value: await deserializeExpression(serialized.value), span });
    case "return":
      return new ReturnExpr({ value: serialized.value ? await deserializeExpression(serialized.value) : undefined, span });
    case "break":
      return new BreakStmt({ label: serialized.label ? await deserializeIdentifier(serialized.label) : undefined, span });
    case "continue":
      return new ContinueStmt({ label: serialized.label ? await deserializeIdentifier(serialized.label) : undefined, span });
    case "exprStmt":
      return new ExprStmt({ expr: await deserializeExpression(serialized.expr), span });
    case "fn":
      return new FunctionExpr({
        signature: { parameters: await Promise.all(serialized.signature.parameters.map(async (p) => ({ name: await deserializeIdentifier(p.name) }))) },
        body: await Promise.all(serialized.body.map(deserializeStatement)),
        span,
      });
    case "class": {
      const classBody: ClassBody = {
        statements: await Promise.all(serialized.body.map(deserializeStatement)) as ClassMember[],
      };
      return new ClassExpr({ body: classBody, span });
    }
    default:
      throw new Error(`Unsupported statement kind ${(serialized as SerializedStatement).kind}`);
  }
}

export async function deserializeProgram(serialized: SerializedProgram): Promise<Program> {
  return new Program({ body: await Promise.all(serialized.body.map(deserializeStatement)), span: await deserializeSpan(serialized.span) });
}
