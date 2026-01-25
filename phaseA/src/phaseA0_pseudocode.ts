/**
 * Pseudocode sketch of Phase A0 as described in the Phase A documents.
 * The goal is a deterministic, minimal sexpr calculus that only accepts the
 * canonical nodes Phase B emits (program, block, statements, expressions, and
 * the small type vocabulary). Nothing in Phase A0 performs sugar rewriting;
 * optional chaining, spreads, macros, and TypeScript conveniences have already
 * been normalized to the structures below.
 */

type NodeId = string;

interface ProgramNode {
  type: "program";
  statements: Statement[];
  span: Span;
  nodeId: NodeId;
}

type Statement =
  | BlockStmt
  | IfStmt
  | ScopeLoop
  | ForClassic
  | ForOf
  | ForAwait
  | ReturnExpr
  | BreakStmt
  | ContinueStmt
  | SwitchStmt
  | LetStarExpr
  | AssignExpr
  | ExprStmt
  | FunctionExpr
  | ClassExpr
  | ImportStmt
  | ExportStmt
  | TypeAliasStmt
  | InterfaceExpr;

type Expression = Literal | Identifier | CallExpr | PropExpr | IndexExpr | SpreadExpr | TernaryExpr | ThrowExpr | TryCatchExpr | AwaitExpr | YieldExpr | ArrayExpr | ObjectExpr | FunctionExpr | ClassExpr;
type Node = Statement | Expression;

interface PhaseA0Context {
  resolver: Resolver;
  typeChecker: TypeChecker;
  diagnostics: Diagnostic[];
  scopeStack: Scope[];
}

function runPhaseA0(program: ProgramNode, ctx: PhaseA0Context) {
  ctx.scopeStack.push(createGlobalScope());
  for (const stmt of program.statements) {
    processStatement(stmt, ctx);
  }
  ctx.scopeStack.pop();
  return {
    diagnostics: ctx.diagnostics,
    resolvedProgram: program,
  };
}

function processStatement(statement: Statement, ctx: PhaseA0Context) {
  switch (statement.type) {
    case "block":
      withNewScope(ctx, () => {
        for (const child of statement.body) {
          processStatement(child, ctx);
        }
      });
      break;
    case "if":
      evaluateExpression(statement.condition, ctx);
      processStatement(statement.thenBranch, ctx);
      if (statement.elseBranch) {
        processStatement(statement.elseBranch, ctx);
      }
      break;
    case "while":
      evaluateExpression(statement.condition, ctx);
      withNewScope(ctx, () => {
        processStatement(statement.body, ctx);
      });
      break;
    case "let*":
      withNewScope(ctx, () => {
        declareBindings(statement.bindings, ctx, statement.isConst);
        for (const bodyStmt of statement.body) {
          processStatement(bodyStmt, ctx);
        }
      });
      break;
    case "assign":
      processExpressionForAssignment(statement.target, ctx);
      evaluateExpression(statement.value, ctx);
      break;
    case "return":
      if (statement.argument) {
        evaluateExpression(statement.argument, ctx);
      }
      break;
    case "for-classic":
    case "for-of":
    case "for-await":
      handleLoop(statement, ctx);
      break;
    case "switch":
        evaluateExpression(statement.discriminant, ctx);
      for (const caseNode of statement.cases) {
        if (caseNode.test) {
          evaluateExpression(caseNode.test, ctx);
        }
        for (const caseStmt of caseNode.body) {
          processStatement(caseStmt, ctx);
        }
      }
      break;
    case "import":
      evaluateImportSpec(statement.spec, ctx);
      ctx.resolver.recordDeclaration(statement);
      break;
    case "export":
      evaluateExportSpec(statement.spec, ctx);
      ctx.resolver.recordDeclaration(statement);
      break;
    case "type-alias":
        if (statement.typeParams) {
          for (const param of statement.typeParams) {
            evaluateTypeParam(param, ctx);
          }
        }
        evaluateType(statement.type, ctx);
        ctx.resolver.recordDeclaration(statement);
      break;
    case "type-interface":
        for (const member of statement.body) {
          evaluateType(member.type, ctx);
        }
        ctx.resolver.recordDeclaration(statement);
      break;
    case "fn":
    case "class":
      evaluateExpression(statement, ctx);
      break;
    case "break":
    case "continue":
      if (statement.label) {
        ctx.resolver.validateLabel(statement.label);
      }
      break;
    default:
      if (isExpressionStatement(statement)) {
        evaluateExpression(statement.expression, ctx);
      } else {
        ctx.diagnostics.push(createUnknownNodeError(statement));
      }
  }
}

function evaluateExpression(expr: Expression, ctx: PhaseA0Context) {
  switch (expr.type) {
    case "literal":
    case "identifier":
      return expr;
    case "call":
      evaluateExpression(expr.callee, ctx);
      for (const arg of expr.arguments) {
        evaluateExpression(arg, ctx);
      }
      return expr;
    case "prop":
      evaluateExpression(expr.receiver, ctx);
      return expr;
    case "index":
      evaluateExpression(expr.receiver, ctx);
      evaluateExpression(expr.property, ctx);
      return expr;
    case "spread":
      evaluateExpression(expr.expr, ctx);
      markSpreadKind(expr, ctx);
      return expr;
    case "ternary":
      evaluateExpression(expr.condition, ctx);
      evaluateExpression(expr.consequent, ctx);
      evaluateExpression(expr.alternate, ctx);
      return expr;
    case "await":
      evaluateExpression(expr.argument, ctx);
      return expr;
    case "yield":
      if (expr.argument) {
        evaluateExpression(expr.argument, ctx);
      }
      return expr;
    case "throw":
      evaluateExpression(expr.expression, ctx);
      return expr;
    case "try":
      for (const stmt of expr.tryBlock) {
        processStatement(stmt, ctx);
      }
      if (expr.catchClause) {
        withNewScope(ctx, () => {
          if (expr.catchClause.binding) {
            declareBinding(expr.catchClause.binding, ctx, true);
          }
          for (const stmt of expr.catchClause.body) {
            processStatement(stmt, ctx);
          }
        });
      }
      if (expr.finallyBlock) {
        for (const stmt of expr.finallyBlock) {
          processStatement(stmt, ctx);
        }
      }
      return expr;
    case "array":
      for (const elem of expr.elements) {
        evaluateExpression(elem, ctx);
      }
      return expr;
    case "object":
      for (const field of expr.fields) {
        evaluateExpression(field.value, ctx);
      }
      return expr;
    case "fn":
      withNewScope(ctx, () => {
        for (const param of expr.signature.parameters) {
          declareBinding(param.target, ctx, false);
          if (param.typeAnnotation) {
            evaluateType(param.typeAnnotation, ctx);
          }
        }
        for (const stmt of expr.body) {
          processStatement(stmt, ctx);
        }
      });
      return expr;
    case "class":
      withNewScope(ctx, () => {
        for (const stmt of expr.body) {
          processStatement(stmt, ctx);
        }
      });
      return expr;
    default:
      ctx.diagnostics.push(createUnknownNodeError(expr));
      return expr;
  }
}

function evaluateType(typeNode: TypeNode, ctx: PhaseA0Context): TypeNode {
  switch (typeNode.type) {
    case "type-string":
    case "type-number":
    case "type-boolean":
    case "type-null":
    case "type-undefined":
      return typeNode;
    case "type-ref":
      if (typeNode.typeArgs) {
        for (const arg of typeNode.typeArgs) {
          evaluateType(arg, ctx);
        }
      }
      return typeNode;
    case "type-function":
      if (typeNode.typeParams) {
        for (const param of typeNode.typeParams) {
          evaluateTypeParam(param, ctx);
        }
      }
      for (const param of typeNode.parameters) {
        evaluateType(param, ctx);
      }
      evaluateType(typeNode.returnType, ctx);
      return typeNode;
    case "type-object":
      for (const field of typeNode.fields) {
        evaluateType(field.type, ctx);
      }
      return typeNode;
    case "type-union":
    case "type-intersection":
      for (const member of typeNode.members) {
        evaluateType(member, ctx);
      }
      return typeNode;
    case "type-literal":
      return typeNode;
    case "type-mapped":
      evaluateTypeParam(typeNode.typeParam, ctx);
      evaluateType(typeNode.valueType, ctx);
      if (typeNode.nameRemap) {
        evaluateType(typeNode.nameRemap, ctx);
      }
      if (typeNode.via) {
        evaluateType(typeNode.via, ctx);
      }
      return typeNode;
    default:
      ctx.diagnostics.push(createUnknownNodeError(typeNode));
      return typeNode;
  }
}

function evaluateTypeParam(param: TypeParam, ctx: PhaseA0Context) {
  if (param.constraint) {
    evaluateType(param.constraint, ctx);
  }
  if (param.defaultType) {
    evaluateType(param.defaultType, ctx);
  }
}

function evaluateImportSpec(spec: ImportSpec, ctx: PhaseA0Context) {
  if (spec.defaultBinding) {
    registerIdentifier(spec.defaultBinding, ctx, false);
  }
  if (spec.namespaceBinding) {
    registerIdentifier(spec.namespaceBinding, ctx, false);
  }
  if (spec.named) {
    for (const entry of spec.named) {
      registerIdentifier(entry.local, ctx, false);
    }
  }
  evaluateExpression(spec.source, ctx);
}

function evaluateExportSpec(spec: ExportSpec, ctx: PhaseA0Context) {
  if (spec.defaultExport) {
    evaluateExpression(spec.defaultExport, ctx);
  }
  if (spec.named) {
    for (const entry of spec.named) {
      if (entry.local) {
        evaluateExpression(entry.local, ctx);
      }
    }
  }
  if (spec.source) {
    evaluateExpression(spec.source, ctx);
  }
  if (spec.namespaceExport) {
    registerIdentifier(spec.namespaceExport, ctx, false);
  }
}

function withNewScope(ctx: PhaseA0Context, action: () => void) {
  ctx.scopeStack.push(createScope());
  action();
  ctx.scopeStack.pop();
}

function declareBindings(bindings: Binding[], ctx: PhaseA0Context, isConst: boolean) {
  for (const binding of bindings) {
    declareBinding(binding, ctx, isConst);
  }
}

function declareBinding(binding: Binding, ctx: PhaseA0Context, isConst: boolean) {
  if (binding.pattern) {
    resolvePattern(binding.pattern, ctx);
  } else if (binding.name) {
    registerIdentifier(binding.name, ctx, isConst);
  }
  if (binding.init) {
    evaluateExpression(binding.init, ctx);
  }
}

function resolvePattern(pattern: PatternNode, ctx: PhaseA0Context) {
  switch (pattern.type) {
    case "array-pattern":
      for (const entry of pattern.elements) {
        resolvePattern(entry, ctx);
      }
      if (pattern.rest) {
        resolvePattern(pattern.rest, ctx);
      }
      break;
    case "object-pattern":
      for (const field of pattern.fields) {
        resolvePattern(field.target, ctx);
      }
      if (pattern.rest) {
        resolvePattern(pattern.rest, ctx);
      }
      break;
    case "rest":
      if (pattern.target) {
        resolvePattern(pattern.target, ctx);
      }
      break;
    default:
      registerIdentifier(pattern.name, ctx, false);
  }
}

function markSpreadKind(expr: SpreadExpr, ctx: PhaseA0Context) {
  switch (expr.kind) {
    case "array":
    case "object":
    case "rest":
      ctx.resolver.noteSpreadKind(expr);
      break;
    default:
      ctx.diagnostics.push(createUnknownSpreadKind(expr));
  }
}

function processExpressionForAssignment(target: Expression, ctx: PhaseA0Context) {
  if (isIdentifier(target)) {
    registerAssignmentTarget(target, ctx);
  } else if (isPropOrIndex(target)) {
    evaluateExpression(target, ctx);
  } else {
    ctx.diagnostics.push(createInvalidAssignmentTarget(target));
  }
}

function handleLoop(loop: LoopNode, ctx: PhaseA0Context) {
  withNewScope(ctx, () => {
    if (loop.type === "for-classic") {
      if (loop.init) {
        processStatement(loop.init, ctx);
      }
      if (loop.test) {
        evaluateExpression(loop.test, ctx);
      }
      if (loop.update) {
        evaluateExpression(loop.update, ctx);
      }
    } else if (loop.type === "for-of" || loop.type === "for-await") {
      declareBinding(loop.binding, ctx, loop.binding.isConst ?? true);
      evaluateExpression(loop.collection, ctx);
    }
    processStatement(loop.body, ctx);
  });
}

// Placeholder helpers to keep the pseudocode focused on structure.
function createGlobalScope(): Scope { throw new Error("stub"); }
function createScope(): Scope { throw new Error("stub"); }
function registerIdentifier(id: Identifier, ctx: PhaseA0Context, isConst: boolean) {}
function registerAssignmentTarget(target: Expression, ctx: PhaseA0Context) {}
function createUnknownNodeError(node: Node): Diagnostic { return { message: "unknown node", span: node.span }; }
function createInvalidAssignmentTarget(target: Expression): Diagnostic { return { message: "invalid assignment target", span: target.span }; }
function createUnknownSpreadKind(spread: SpreadExpr): Diagnostic { return { message: "unknown spread kind", span: spread.span }; }
function isExpressionStatement(stmt: Statement): stmt is ExprStmt { return stmt.type === "exprStmt"; }
function isIdentifier(expr: Expression): expr is Identifier { return expr.type === "identifier"; }
function isPropOrIndex(expr: Expression): expr is PropExpr | IndexExpr { return expr.type === "prop" || expr.type === "index"; }

// The resolver/typechecker/codegen referenced here obeys the Phase A docs: it only sees the canonical nodes.
interface Resolver {
  noteSpreadKind(spread: SpreadExpr): void;
  recordDeclaration(declaration: Statement): void;
  validateLabel(label: Identifier): void;
}

interface TypeChecker {}
interface Scope {}
interface Span { start: number; end: number; source: string; }
interface Diagnostic { message: string; span: Span; }
interface Binding { pattern?: PatternNode; name?: Identifier; init?: Expression; isConst?: boolean; }
interface PatternNode { type: string; elements?: PatternNode[]; fields?: { target: PatternNode }[]; rest?: PatternNode; target?: PatternNode; name?: Identifier; }
interface Identifier { type: "identifier"; name: string; span: Span; }
interface Literal { type: "literal"; value: string | number | boolean | null; span: Span; }
interface SpreadExpr { type: "spread"; expr: Expression; kind: "array" | "object" | "rest"; span: Span; }
interface BlockStmt { type: "block"; body: Statement[]; span: Span; }
interface IfStmt { type: "if"; condition: Expression; thenBranch: Statement; elseBranch?: Statement; span: Span; }
interface ScopeLoop { type: "while"; condition: Expression; body: Statement; span: Span; }
interface ForClassic { type: "for-classic"; init?: Statement; test?: Expression; update?: Expression; body: Statement; span: Span; }
interface ForOf { type: "for-of"; binding: Binding; collection: Expression; body: Statement; span: Span; }
interface ForAwait { type: "for-await"; binding: Binding; collection: Expression; body: Statement; span: Span; }
type LoopNode = ForClassic | ForOf | ForAwait;
interface ReturnExpr { type: "return"; argument?: Expression; span: Span; }
interface BreakStmt { type: "break"; label?: Identifier; span: Span; }
interface ContinueStmt { type: "continue"; label?: Identifier; span: Span; }
interface SwitchStmt { type: "switch"; discriminant: Expression; cases: SwitchCase[]; span: Span; }
interface SwitchCase { test?: Expression | null; body: Statement[]; }
interface LetStarExpr { type: "let*"; isConst: boolean; bindings: Binding[]; body: Statement[]; span: Span; }
interface AssignExpr { type: "assign"; target: Expression; value: Expression; span: Span; }
interface ExprStmt { type: "exprStmt"; expression: Expression; span: Span; }
interface FunctionExpr { type: "fn"; signature: FnSignature; body: Statement[]; span: Span; }
interface FnSignature { parameters: Param[]; returnType?: TypeNode; }
interface Param { target: Binding; typeAnnotation?: TypeNode; }
interface ClassExpr { type: "class"; name: Identifier; body: Statement[]; span: Span; }
interface ImportStmt { type: "import"; spec: ImportSpec; span: Span; }
interface ExportStmt { type: "export"; spec: ExportSpec; span: Span; }
interface TypeAliasStmt { type: "type-alias"; identifier: Identifier; typeParams?: TypeParam[]; type: TypeNode; span: Span; }
interface InterfaceExpr { type: "type-interface"; identifier: Identifier; body: TypeField[]; span: Span; }
interface ImportSpec { source: Expression; defaultBinding?: Identifier; namespaceBinding?: Identifier; named?: NamedImport[]; }
interface ExportSpec { source?: Expression; named?: NamedExport[]; defaultExport?: Expression; namespaceExport?: Identifier; }
interface NamedImport { imported: string; local: Identifier; }
interface NamedExport { exported: string; local?: Identifier; }
interface PropExpr { type: "prop"; receiver: Expression; name: string; span: Span; }
interface IndexExpr { type: "index"; receiver: Expression; property: Expression; span: Span; }
interface CallExpr { type: "call"; callee: Expression; arguments: Expression[]; span: Span; }
interface ArrayExpr { type: "array"; elements: Expression[]; span: Span; }
interface ObjectExpr { type: "object"; fields: { key: string; value: Expression }[]; span: Span; }
interface TernaryExpr { type: "ternary"; condition: Expression; consequent: Expression; alternate: Expression; span: Span; }
interface ThrowExpr { type: "throw"; expression: Expression; span: Span; }
interface TryCatchExpr { type: "try"; tryBlock: Statement[]; catchClause?: CatchClause; finallyBlock?: Statement[]; span: Span; }
interface AwaitExpr { type: "await"; argument: Expression; span: Span; }
interface YieldExpr { type: "yield"; argument?: Expression; delegate: boolean; span: Span; }
interface CatchClause { binding?: Binding; body: Statement[]; }
interface TypeParam { name: Identifier; variance?: "in" | "out"; constraint?: TypeNode; defaultType?: TypeNode; span: Span; }
interface TypeField { key: string; type: TypeNode; }
interface TypePrimitive { type: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"; span: Span; }
interface TypeRef { type: "type-ref"; target: Identifier; typeArgs?: TypeNode[]; span: Span; }
interface TypeFunction { type: "type-function"; typeParams?: TypeParam[]; parameters: TypeNode[]; returnType: TypeNode; span: Span; }
interface TypeObject { type: "type-object"; fields: TypeField[]; span: Span; }
interface TypeUnion { type: "type-union"; members: TypeNode[]; span: Span; }
interface TypeIntersection { type: "type-intersection"; members: TypeNode[]; span: Span; }
interface TypeLiteral { type: "type-literal"; elements: Literal[]; span: Span; }
interface TypeMapped { type: "type-mapped"; typeParam: TypeParam; valueType: TypeNode; nameRemap?: TypeNode; readonlyModifier?: "readonly" | "-readonly"; optionalModifier?: "optional" | "-optional"; via?: TypeNode; span: Span; }
type TypeNode = TypePrimitive | TypeRef | TypeFunction | TypeObject | TypeUnion | TypeIntersection | TypeLiteral | TypeMapped;