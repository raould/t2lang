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
  CallableKind,
  ClassExpr,
  ClassMember,
  CatchClause,
  FinallyClause,
  ClassBody,
  ImportStmt,
  ExportStmt,
  TypeAliasStmt,
  InterfaceStmt,
  ImportSpec,
  ExportSpec,
  NamedImport,
  NamedExport,
  TypeParam,
  TypeField,
  TypePrimitive,
  TypeVar,
  TypeTuple,
  TypeArray,
  TypeNullable,
  TypeKeyof,
  TypeTypeof,
  TypeIndexed,
  TypeConditional,
  TypeInfer,
  TypeRef,
  TypeFunction,
  TypeObject,
  TypeUnion,
  TypeIntersection,
  TypeLiteral,
  TypeMapped,
  TypeApp,
  TypeNode,
  TypeAssertExpr,
} from "./phaseA1.js";

export type SerializedSpan = { start: number; end: number; source: string };
export type SerializedIdentifier = { kind: "identifier"; name: string; span: SerializedSpan };
export type SerializedLiteral = { kind: "literal"; value: Literal["value"]; span: SerializedSpan };

export type SerializedNamedImport = { imported: string; local: SerializedIdentifier };
export type SerializedImportSpec = {
  source: SerializedLiteral;
  defaultBinding?: SerializedIdentifier;
  namespaceBinding?: SerializedIdentifier;
  named?: SerializedNamedImport[];
};

export type SerializedNamedExport = { exported: string; local?: SerializedIdentifier };
export type SerializedExportSpec = {
  source?: SerializedLiteral;
  named?: SerializedNamedExport[];
  defaultExport?: SerializedExpression;
  namespaceExport?: SerializedIdentifier;
};

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
  | {
      kind: "type-assert";
      expr: SerializedExpression;
      assertedType: SerializedTypeNode;
      span: SerializedSpan;
    }
  | {
      kind: "fn";
      callableKind?: CallableKind;
      name?: SerializedIdentifier;
      methodName?: string;
      typeParams?: SerializedTypeParam[];
      async?: boolean;
      generator?: boolean;
      signature: { parameters: { name: SerializedIdentifier }[]; returnType?: SerializedTypeNode };
      body: SerializedStatement[];
      span: SerializedSpan;
    }
  | ({ kind: "class" } & { name?: SerializedIdentifier; extends?: SerializedExpression; implements?: SerializedExpression[]; body: SerializedStatement[]; span: SerializedSpan });

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
  | { kind: "import"; spec: SerializedImportSpec; span: SerializedSpan }
  | { kind: "export"; spec: SerializedExportSpec; span: SerializedSpan }
  | { kind: "type-alias"; name: SerializedIdentifier; typeValue: SerializedTypeNode; typeParams?: SerializedTypeParam[]; span: SerializedSpan }
  | { kind: "type-interface"; name: SerializedIdentifier; fields: SerializedTypeField[]; span: SerializedSpan }
  | {
      kind: "fn";
      callableKind?: CallableKind;
      name?: SerializedIdentifier;
      methodName?: string;
      typeParams?: SerializedTypeParam[];
      async?: boolean;
      generator?: boolean;
      signature: { parameters: { name: SerializedIdentifier }[]; returnType?: SerializedTypeNode };
      body: SerializedStatement[];
      span: SerializedSpan;
    }
  | { kind: "class"; name?: SerializedIdentifier; extends?: SerializedExpression; implements?: SerializedExpression[]; body: SerializedStatement[]; span: SerializedSpan };

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
type SerializedTypeParam = {
  name: SerializedIdentifier;
  span: SerializedSpan;
  variance?: "in" | "out";
  constraint?: SerializedTypeNode;
  defaultType?: SerializedTypeNode;
  const?: boolean;
  infer?: boolean;
};
type SerializedTypeField = {
  key: string;
  fieldType: SerializedTypeNode;
  optional?: boolean;
  readonlyFlag?: boolean;
  span: SerializedSpan;
};
type SerializedTypeAppExpr =
  | { exprMode: "expression"; expr: SerializedExpression }
  | { exprMode: "type"; typeNode: SerializedTypeNode };

export type SerializedProgram = { kind: "program"; body: SerializedStatement[]; span: SerializedSpan };
export type SerializedProgramThunk = () => Promise<SerializedProgram>;

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
  if (expr instanceof TypeAssertExpr) {
    return {
      kind: "type-assert",
      expr: await serializeExpression(expr.expr),
      assertedType: await serializeTypeNode(expr.assertedType),
      span: await serializeSpan(expr.span),
    };
  }
  if (expr instanceof FunctionExpr) {
    const parameters = await Promise.all(expr.signature.parameters.map(async (p) => ({ name: await serializeIdentifier(p.name) })));
    const signature: { parameters: { name: SerializedIdentifier }[]; returnType?: SerializedTypeNode } = {
      parameters,
    };
    if (expr.signature.returnType) {
      signature.returnType = await serializeTypeNode(expr.signature.returnType);
    }
    const body = await Promise.all(expr.body.map(serializeStatement));
    return {
      kind: "fn",
      callableKind: expr.callableKind,
      name: expr.name ? await serializeIdentifier(expr.name) : undefined,
      methodName: expr.methodName,
      typeParams: expr.typeParams ? await Promise.all(expr.typeParams.map(serializeTypeParam)) : undefined,
      async: expr.async,
      generator: expr.generator,
      signature,
      body,
      span: await serializeSpan(expr.span),
    };
  }
  if (expr instanceof ClassExpr) {
    const body = await Promise.all(expr.body.statements.map(serializeStatement));
    return {
      kind: "class",
      name: expr.name ? await serializeIdentifier(expr.name) : undefined,
      extends: expr.extends ? await serializeExpression(expr.extends) : undefined,
      implements: expr.implements ? await Promise.all(expr.implements.map(serializeExpression)) : undefined,
      body,
      span: await serializeSpan(expr.span),
    };
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
  if (stmt instanceof ImportStmt) {
    return { kind: "import", spec: await serializeImportSpec(stmt.spec), span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof ExportStmt) {
    return { kind: "export", spec: await serializeExportSpec(stmt.spec), span: await serializeSpan(stmt.span) };
  }
  if (stmt instanceof TypeAliasStmt) {
    return {
      kind: "type-alias",
      name: await serializeIdentifier(stmt.name),
      typeValue: await serializeTypeNode(stmt.typeValue),
      typeParams: stmt.typeParams ? await Promise.all(stmt.typeParams.map(serializeTypeParam)) : undefined,
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof InterfaceStmt) {
    return {
      kind: "type-interface",
      name: await serializeIdentifier(stmt.name),
      fields: await Promise.all(stmt.body.fields.map(serializeTypeField)),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof FunctionExpr) {
    const parameters = await Promise.all(stmt.signature.parameters.map(async (p) => ({ name: await serializeIdentifier(p.name) })));
    const signature: { parameters: { name: SerializedIdentifier }[]; returnType?: SerializedTypeNode } = { parameters };
    if (stmt.signature.returnType) {
      signature.returnType = await serializeTypeNode(stmt.signature.returnType);
    }
    return {
      kind: "fn",
      callableKind: stmt.callableKind,
      name: stmt.name ? await serializeIdentifier(stmt.name) : undefined,
      methodName: stmt.methodName,
      typeParams: stmt.typeParams ? await Promise.all(stmt.typeParams.map(serializeTypeParam)) : undefined,
      async: stmt.async,
      generator: stmt.generator,
      signature,
      body: await Promise.all(stmt.body.map(serializeStatement)),
      span: await serializeSpan(stmt.span),
    };
  }
  if (stmt instanceof ClassExpr) {
    return {
      kind: "class",
      name: stmt.name ? await serializeIdentifier(stmt.name) : undefined,
      extends: stmt.extends ? await serializeExpression(stmt.extends) : undefined,
      implements: stmt.implements ? await Promise.all(stmt.implements.map(serializeExpression)) : undefined,
      body: await Promise.all(stmt.body.statements.map(serializeStatement)),
      span: await serializeSpan(stmt.span),
    };
  }
  throw new Error(`Unsupported statement kind ${(stmt as any).__brand}`);
}

async function serializeTypeParam(param: TypeParam): Promise<SerializedTypeParam> {
  const serialized: SerializedTypeParam = {
    name: await serializeIdentifier(param.name),
    span: await serializeSpan(param.span),
  };
  if (param.variance) serialized.variance = param.variance;
  if (param.constraint) serialized.constraint = await serializeTypeNode(param.constraint);
  if (param.defaultType) serialized.defaultType = await serializeTypeNode(param.defaultType);
  if (param.const !== undefined) serialized.const = param.const;
  if (param.infer !== undefined) serialized.infer = param.infer;
  return serialized;
}

async function serializeTypeField(field: TypeField): Promise<SerializedTypeField> {
  return {
    key: field.key,
    fieldType: await serializeTypeNode(field.fieldType),
    optional: field.optional,
    readonlyFlag: field.readonlyFlag,
    span: await serializeSpan(field.span),
  };
}

async function serializeNamedImport(named: NamedImport): Promise<SerializedNamedImport> {
  return { imported: named.imported, local: await serializeIdentifier(named.local) };
}

async function serializeImportSpec(spec: ImportSpec): Promise<SerializedImportSpec> {
  return {
    source: await serializeLiteral(spec.source),
    defaultBinding: spec.defaultBinding ? await serializeIdentifier(spec.defaultBinding) : undefined,
    namespaceBinding: spec.namespaceBinding ? await serializeIdentifier(spec.namespaceBinding) : undefined,
    named: spec.named ? await Promise.all(spec.named.map(serializeNamedImport)) : undefined,
  };
}

async function serializeNamedExport(named: NamedExport): Promise<SerializedNamedExport> {
  return {
    exported: named.exported,
    local: named.local ? await serializeIdentifier(named.local) : undefined,
  };
}

async function serializeExportSpec(spec: ExportSpec): Promise<SerializedExportSpec> {
  return {
    source: spec.source ? await serializeLiteral(spec.source) : undefined,
    named: spec.named ? await Promise.all(spec.named.map(serializeNamedExport)) : undefined,
    defaultExport: spec.defaultExport ? await serializeExpression(spec.defaultExport) : undefined,
    namespaceExport: spec.namespaceExport ? await serializeIdentifier(spec.namespaceExport) : undefined,
  };
}

function isTypeNodeValue(value: Expression | TypeNode): value is TypeNode {
  return (
    value instanceof TypePrimitive ||
    value instanceof TypeVar ||
    value instanceof TypeTuple ||
    value instanceof TypeArray ||
    value instanceof TypeNullable ||
    value instanceof TypeKeyof ||
    value instanceof TypeTypeof ||
    value instanceof TypeIndexed ||
    value instanceof TypeConditional ||
    value instanceof TypeInfer ||
    value instanceof TypeRef ||
    value instanceof TypeFunction ||
    value instanceof TypeObject ||
    value instanceof TypeUnion ||
    value instanceof TypeIntersection ||
    value instanceof TypeLiteral ||
    value instanceof TypeMapped ||
    value instanceof TypeApp
  );
}

async function serializeTypeNode(node: TypeNode): Promise<SerializedTypeNode> {
  if (node instanceof TypePrimitive) {
    return { kind: node.kind, span: await serializeSpan(node.span) };
  }
  if (node instanceof TypeVar) {
    return {
      kind: "type-var",
      name: await serializeIdentifier(node.name),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeTuple) {
    return {
      kind: "type-tuple",
      types: await Promise.all(node.types.map(serializeTypeNode)),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeArray) {
    return {
      kind: "type-array",
      element: await serializeTypeNode(node.element),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeNullable) {
    return {
      kind: "type-nullable",
      inner: await serializeTypeNode(node.inner),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeKeyof) {
    return {
      kind: "type-keyof",
      target: await serializeTypeNode(node.target),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeTypeof) {
    return {
      kind: "type-typeof",
      expr: await serializeExpression(node.expr),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeIndexed) {
    return {
      kind: "type-indexed",
      object: await serializeTypeNode(node.object),
      index: await serializeTypeNode(node.index),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeConditional) {
    return {
      kind: "type-conditional",
      check: await serializeTypeNode(node.check),
      extends: await serializeTypeNode(node.extends),
      trueType: await serializeTypeNode(node.trueType),
      falseType: await serializeTypeNode(node.falseType),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeInfer) {
    return {
      kind: "type-infer",
      name: await serializeIdentifier(node.name),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeRef) {
    return {
      kind: "type-ref",
      identifier: await serializeIdentifier(node.identifier),
      typeArgs: node.typeArgs ? await Promise.all(node.typeArgs.map(serializeTypeNode)) : undefined,
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeFunction) {
    return {
      kind: "type-function",
      params: await Promise.all(node.params.map(serializeTypeNode)),
      returns: await serializeTypeNode(node.returns),
      typeParams: node.typeParams ? await Promise.all(node.typeParams.map(serializeTypeParam)) : undefined,
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeObject) {
    return {
      kind: "type-object-literal",
      fields: await Promise.all(node.fields.map(serializeTypeField)),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeUnion) {
    return {
      kind: "type-union",
      types: await Promise.all(node.types.map(serializeTypeNode)),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeIntersection) {
    return {
      kind: "type-intersection",
      types: await Promise.all(node.types.map(serializeTypeNode)),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeLiteral) {
    return {
      kind: "type-literal",
      value: await Promise.all(node.value.map(serializeLiteral)),
      span: await serializeSpan(node.span),
    };
  }
  if (node instanceof TypeMapped) {
    const mapped: SerializedTypeNode = {
      kind: "type-mapped",
      typeParam: await serializeTypeParam(node.typeParam),
      valueType: await serializeTypeNode(node.valueType),
      span: await serializeSpan(node.span),
    };
    if (node.nameRemap) {
      mapped.nameRemap = await serializeTypeNode(node.nameRemap);
    }
    if (node.readonlyModifier) {
      mapped.readonlyModifier = node.readonlyModifier;
    }
    if (node.optionalModifier) {
      mapped.optionalModifier = node.optionalModifier;
    }
    if (node.via) {
      mapped.via = await serializeTypeNode(node.via);
    }
    return mapped;
  }
  if (node instanceof TypeApp) {
    const serialized: SerializedTypeNode = {
      kind: "type-app",
      typeArgs: await Promise.all(node.typeArgs.map(serializeTypeNode)),
      span: await serializeSpan(node.span),
    };
    if (isTypeNodeValue(node.expr)) {
      return { ...serialized, exprMode: "type", typeNode: await serializeTypeNode(node.expr) };
    }
    return { ...serialized, exprMode: "expression", expr: await serializeExpression(node.expr) };
  }
  throw new Error("Unsupported type node");
}

export async function serializeProgram(program: Program): Promise<SerializedProgram> {
  return {
    kind: "program",
    body: await Promise.all(program.body.map(serializeStatement)),
    span: await serializeSpan(program.span),
  };
}

export function serializeLazy(program: Program): SerializedProgramThunk {
  let cached: Promise<SerializedProgram> | null = null;
  return async (): Promise<SerializedProgram> => {
    if (!cached) {
      cached = serializeProgram(program);
    }
    return cached;
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
    case "type-assert":
      return new TypeAssertExpr({
        expr: await deserializeExpression(serialized.expr),
        assertedType: await deserializeTypeNode(serialized.assertedType),
        span: await deserializeSpan(serialized.span),
      });
    case "fn": {
      const signature: { parameters: { name: Identifier }[]; returnType?: TypeNode } = {
        parameters: await Promise.all(serialized.signature.parameters.map(async (p) => ({ name: await deserializeIdentifier(p.name) }))),
      };
      if (serialized.signature.returnType) {
        signature.returnType = await deserializeTypeNode(serialized.signature.returnType);
      }
      const typeParams = serialized.typeParams ? await Promise.all(serialized.typeParams.map(deserializeTypeParam)) : undefined;
      return new FunctionExpr({
        signature,
        body: await Promise.all(serialized.body.map(deserializeStatement)),
        span: await deserializeSpan(serialized.span),
        typeParams,
        async: serialized.async,
        generator: serialized.generator,
        callableKind: serialized.callableKind,
        name: serialized.name ? await deserializeIdentifier(serialized.name) : undefined,
        methodName: serialized.methodName,
      });
    }
    case "class": {
      const classBody: ClassBody = {
        statements: await Promise.all(serialized.body.map(deserializeStatement)) as ClassMember[],
      };
      return new ClassExpr({
        body: classBody,
        span: await deserializeSpan(serialized.span),
        name: serialized.name ? await deserializeIdentifier(serialized.name) : undefined,
        extends: serialized.extends ? await deserializeExpression(serialized.extends) : undefined,
        implements: serialized.implements ? await Promise.all(serialized.implements.map(deserializeExpression)) : undefined,
      });
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
    case "import":
      return new ImportStmt({ spec: await deserializeImportSpec(serialized.spec), span });
    case "export":
      return new ExportStmt({ spec: await deserializeExportSpec(serialized.spec), span });
    case "type-alias":
      return new TypeAliasStmt({
        name: await deserializeIdentifier(serialized.name),
        typeValue: await deserializeTypeNode(serialized.typeValue),
        typeParams: serialized.typeParams ? await Promise.all(serialized.typeParams.map(deserializeTypeParam)) : undefined,
        span,
      });
    case "type-interface":
      return new InterfaceStmt({
        name: await deserializeIdentifier(serialized.name),
        body: { fields: await Promise.all(serialized.fields.map(deserializeTypeField)) },
        span,
      });
    case "fn":
      {
        const signature: { parameters: { name: Identifier }[]; returnType?: TypeNode } = {
          parameters: await Promise.all(serialized.signature.parameters.map(async (p) => ({ name: await deserializeIdentifier(p.name) }))),
        };
        if (serialized.signature.returnType) {
          signature.returnType = await deserializeTypeNode(serialized.signature.returnType);
        }
        const typeParams = serialized.typeParams ? await Promise.all(serialized.typeParams.map(deserializeTypeParam)) : undefined;
        return new FunctionExpr({
          signature,
          body: await Promise.all(serialized.body.map(deserializeStatement)),
          span,
          typeParams,
          async: serialized.async,
          generator: serialized.generator,
          callableKind: serialized.callableKind,
          name: serialized.name ? await deserializeIdentifier(serialized.name) : undefined,
          methodName: serialized.methodName,
        });
      }
    case "class": {
      const classBody: ClassBody = {
        statements: await Promise.all(serialized.body.map(deserializeStatement)) as ClassMember[],
      };
      return new ClassExpr({
        body: classBody,
        span,
        name: serialized.name ? await deserializeIdentifier(serialized.name) : undefined,
        extends: serialized.extends ? await deserializeExpression(serialized.extends) : undefined,
        implements: serialized.implements ? await Promise.all(serialized.implements.map(deserializeExpression)) : undefined,
      });
    }
    default:
      throw new Error(`Unsupported statement kind ${(serialized as SerializedStatement).kind}`);
  }
}

async function deserializeTypeParam(serialized: SerializedTypeParam): Promise<TypeParam> {
  return new TypeParam({
    name: await deserializeIdentifier(serialized.name),
    span: await deserializeSpan(serialized.span),
    variance: serialized.variance,
    constraint: serialized.constraint ? await deserializeTypeNode(serialized.constraint) : undefined,
    defaultType: serialized.defaultType ? await deserializeTypeNode(serialized.defaultType) : undefined,
    const: serialized.const,
    infer: serialized.infer,
  });
}

async function deserializeTypeField(serialized: SerializedTypeField): Promise<TypeField> {
  return new TypeField({
    key: serialized.key,
    fieldType: await deserializeTypeNode(serialized.fieldType),
    optional: serialized.optional,
    readonlyFlag: serialized.readonlyFlag,
    span: await deserializeSpan(serialized.span),
  });
}

async function deserializeNamedImport(serialized: SerializedNamedImport): Promise<NamedImport> {
  return { imported: serialized.imported, local: await deserializeIdentifier(serialized.local) };
}

async function deserializeImportSpec(serialized: SerializedImportSpec): Promise<ImportSpec> {
  return {
    source: await deserializeLiteral(serialized.source),
    defaultBinding: serialized.defaultBinding ? await deserializeIdentifier(serialized.defaultBinding) : undefined,
    namespaceBinding: serialized.namespaceBinding ? await deserializeIdentifier(serialized.namespaceBinding) : undefined,
    named: serialized.named ? await Promise.all(serialized.named.map(deserializeNamedImport)) : undefined,
  };
}

async function deserializeNamedExport(serialized: SerializedNamedExport): Promise<NamedExport> {
  return {
    exported: serialized.exported,
    local: serialized.local ? await deserializeIdentifier(serialized.local) : undefined,
  };
}

async function deserializeExportSpec(serialized: SerializedExportSpec): Promise<ExportSpec> {
  return {
    source: serialized.source ? await deserializeLiteral(serialized.source) : undefined,
    named: serialized.named ? await Promise.all(serialized.named.map(deserializeNamedExport)) : undefined,
    defaultExport: serialized.defaultExport ? await deserializeExpression(serialized.defaultExport) : undefined,
    namespaceExport: serialized.namespaceExport ? await deserializeIdentifier(serialized.namespaceExport) : undefined,
  };
}

async function deserializeTypeNode(serialized: SerializedTypeNode): Promise<TypeNode> {
  const span = await deserializeSpan(serialized.span);
  switch (serialized.kind) {
    case "type-string":
    case "type-number":
    case "type-boolean":
    case "type-null":
    case "type-undefined":
    case "type-void":
    case "type-any":
    case "type-unknown":
    case "type-never":
    case "type-object":
    case "type-symbol":
    case "type-bigint":
      return new TypePrimitive({ kind: serialized.kind as TypePrimitive["kind"], span });
    case "type-var":
      return new TypeVar({ name: await deserializeIdentifier(serialized.name), span });
    case "type-tuple":
      return new TypeTuple({ types: await Promise.all(serialized.types.map(deserializeTypeNode)), span });
    case "type-array":
      return new TypeArray({ element: await deserializeTypeNode(serialized.element), span });
    case "type-nullable":
      return new TypeNullable({ inner: await deserializeTypeNode(serialized.inner), span });
    case "type-keyof":
      return new TypeKeyof({ target: await deserializeTypeNode(serialized.target), span });
    case "type-typeof":
      return new TypeTypeof({ expr: await deserializeExpression(serialized.expr), span });
    case "type-indexed":
      return new TypeIndexed({ object: await deserializeTypeNode(serialized.object), index: await deserializeTypeNode(serialized.index), span });
    case "type-conditional":
      return new TypeConditional({
        check: await deserializeTypeNode(serialized.check),
        extendsType: await deserializeTypeNode(serialized.extends),
        trueType: await deserializeTypeNode(serialized.trueType),
        falseType: await deserializeTypeNode(serialized.falseType),
        span,
      });
    case "type-infer":
      return new TypeInfer({ name: await deserializeIdentifier(serialized.name), span });
    case "type-ref":
      return new TypeRef({
        identifier: await deserializeIdentifier(serialized.identifier),
        typeArgs: serialized.typeArgs ? await Promise.all(serialized.typeArgs.map(deserializeTypeNode)) : undefined,
        span,
      });
    case "type-function":
      return new TypeFunction({
        params: await Promise.all(serialized.params.map(deserializeTypeNode)),
        returns: await deserializeTypeNode(serialized.returns),
        typeParams: serialized.typeParams ? await Promise.all(serialized.typeParams.map(deserializeTypeParam)) : undefined,
        span,
      });
    case "type-object-literal":
      return new TypeObject({ fields: await Promise.all(serialized.fields.map(deserializeTypeField)), span });
    case "type-union":
      return new TypeUnion({ types: await Promise.all(serialized.types.map(deserializeTypeNode)), span });
    case "type-intersection":
      return new TypeIntersection({ types: await Promise.all(serialized.types.map(deserializeTypeNode)), span });
    case "type-literal":
      return new TypeLiteral({ value: await Promise.all(serialized.value.map(deserializeLiteral)), span });
    case "type-mapped":
      return new TypeMapped({
        typeParam: await deserializeTypeParam(serialized.typeParam),
        valueType: await deserializeTypeNode(serialized.valueType),
        nameRemap: serialized.nameRemap ? await deserializeTypeNode(serialized.nameRemap) : undefined,
        readonlyModifier: serialized.readonlyModifier,
        optionalModifier: serialized.optionalModifier,
        via: serialized.via ? await deserializeTypeNode(serialized.via) : undefined,
        span,
      });
    case "type-app": {
      const expr = serialized.exprMode === "expression"
        ? await deserializeExpression(serialized.expr)
        : await deserializeTypeNode(serialized.typeNode);
      return new TypeApp({ expr, typeArgs: await Promise.all(serialized.typeArgs.map(deserializeTypeNode)), span });
    }
    default:
      throw new Error(`Unsupported serialized type node ${(serialized as SerializedTypeNode).kind}`);
  }
}

export async function deserializeProgram(serialized: SerializedProgram): Promise<Program> {
  return new Program({ body: await Promise.all(serialized.body.map(deserializeStatement)), span: await deserializeSpan(serialized.span) });
}
