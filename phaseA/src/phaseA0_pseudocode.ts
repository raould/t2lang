/**
 * Phase A0 pseudocode (minimal calculus).
 * This is the core runtime calculus without TypeScript-specific features.
 * A1 extends this with types, generics, spreads, async/generators, etc.
 */

// ============================================================================
// Core Infrastructure Types
// ============================================================================

export type NodeId = string;

export interface Span {
  start: number;
  end: number;
  source: string;
}

export interface Diagnostic {
  message: string;
  span: Span;
}

export interface Scope {}

export interface TypeChecker {}

export interface Resolver {
  validateLabel(label: Identifier): void;
}

// ============================================================================
// AST Node Interfaces - Atoms
// ============================================================================

export interface Identifier {
  type: "identifier";
  name: string;
  span: Span;
}

export interface Literal {
  type: "literal";
  value: string | number | boolean | null | undefined;
  span: Span;
}

export interface Binding {
  target: Identifier;
  init?: Expression;
}

// ============================================================================
// AST Node Interfaces - Statements
// ============================================================================

export interface BlockStmt {
  type: "block";
  statements: Statement[];
  span: Span;
}

export interface IfStmt {
  type: "if";
  test: Expression;
  consequent: Statement;
  alternate?: Statement;
  span: Span;
}

export interface WhileStmt {
  type: "while";
  condition: Expression;
  body: Statement;
  span: Span;
}

export interface ForClassic {
  type: "for-classic";
  init?: Statement;
  condition?: Expression;
  update?: Expression;
  body: Statement;
  label?: string;
  span: Span;
}

export interface ForOf {
  type: "for-of";
  binding: Binding;
  iterable: Expression;
  body: Statement;
  label?: string;
  span: Span;
}

export interface ForAwait {
  type: "for-await";
  binding: Binding;
  iterable: Expression;
  body: Statement;
  label?: string;
  span: Span;
}

export type LoopNode = ForClassic | ForOf | ForAwait;

export interface SwitchStmt {
  type: "switch";
  discriminant: Expression;
  cases: SwitchCase[];
  span: Span;
}

export interface SwitchCase {
  test?: Expression | null;
  consequent: Statement[];
}

export interface LetStarExpr {
  type: "let*";
  isConst: boolean;
  bindings: Binding[];
  body: Statement[];
  span: Span;
}

export interface AssignExpr {
  type: "assign";
  target: Expression;
  value: Expression;
  span: Span;
}

export interface ReturnExpr {
  type: "return";
  value?: Expression;
  span: Span;
}

export interface BreakStmt {
  type: "break";
  label?: Identifier;
  span: Span;
}

export interface ContinueStmt {
  type: "continue";
  label?: Identifier;
  span: Span;
}

export interface ExprStmt {
  type: "exprStmt";
  expr: Expression;
  span: Span;
}

// ============================================================================
// AST Node Interfaces - Expressions
// ============================================================================

export interface PropExpr {
  type: "prop";
  object: Expression;
  name: string;
  span: Span;
}

export interface IndexExpr {
  type: "index";
  object: Expression;
  index: Expression;
  span: Span;
}

export interface CallExpr {
  type: "call";
  callee: Expression;
  args: Expression[];
  span: Span;
}

export interface NewExpr {
  type: "new";
  callee: Expression;
  args: Expression[];
  span: Span;
}

export interface ArrayExpr {
  type: "array";
  elements: Expression[];
  span: Span;
}

export interface ObjectExpr {
  type: "object";
  fields: { key: string; value: Expression }[];
  span: Span;
}

export interface ThrowExpr {
  type: "throw";
  argument: Expression;
  span: Span;
}

export interface CatchClause {
  binding?: Binding;
  body: Statement[];
}

export interface FinallyClause {
  body: Statement[];
}

export interface TryCatchExpr {
  type: "try";
  body: Statement;
  catchClause?: CatchClause;
  finallyClause?: FinallyClause;
  span: Span;
}

// ============================================================================
// AST Node Interfaces - Functions & Classes
// ============================================================================

export interface Param {
  name: Identifier;
}

export interface FnSignature {
  parameters: Param[];
}

export interface FunctionExpr {
  type: "fn";
  signature: FnSignature;
  body: Statement[];
  span: Span;
}

export interface ClassExpr {
  type: "class";
  name?: Identifier;
  body: Statement[];
  span: Span;
}

// ============================================================================
// Union Types
// ============================================================================

export type Statement =
  | BlockStmt
  | IfStmt
  | WhileStmt
  | ForClassic
  | ForOf
  | ForAwait
  | SwitchStmt
  | LetStarExpr
  | AssignExpr
  | ReturnExpr
  | BreakStmt
  | ContinueStmt
  | ExprStmt
  | FunctionExpr
  | ClassExpr;

export type Expression =
  | Literal
  | Identifier
  | CallExpr
  | PropExpr
  | IndexExpr
  | NewExpr
  | ThrowExpr
  | TryCatchExpr
  | ArrayExpr
  | ObjectExpr
  | FunctionExpr
  | ClassExpr;

export type Node = Statement | Expression;

export interface ProgramNode {
  type: "program";
  body: Statement[];
  span: Span;
  nodeId: NodeId;
}

// ============================================================================
// Context
// ============================================================================

export interface PhaseA0Context {
  resolver: Resolver;
  typeChecker: TypeChecker;
  diagnostics: Diagnostic[];
  scopeStack: Scope[];
}

// ============================================================================
// Stub Helpers (implementation details elsewhere)
// ============================================================================

export function createGlobalScope(): Scope {
  throw new Error("stub");
}

export function createScope(): Scope {
  throw new Error("stub");
}

export function registerIdentifier(
  id: Identifier,
  ctx: PhaseA0Context,
  isConst: boolean
): void {}

export function registerAssignmentTarget(
  target: Expression,
  ctx: PhaseA0Context
): void {}

export function createUnknownNodeError(node: Node): Diagnostic {
  return { message: "unknown node", span: node.span };
}

export function createInvalidAssignmentTarget(target: Expression): Diagnostic {
  return { message: "invalid assignment target", span: target.span };
}

// ============================================================================
// Type Guards
// ============================================================================

export function isIdentifier(expr: Expression): expr is Identifier {
  return expr.type === "identifier";
}

export function isPropOrIndex(expr: Expression): expr is PropExpr | IndexExpr {
  return expr.type === "prop" || expr.type === "index";
}

// ============================================================================
// Core Processing Logic
// ============================================================================

export function runPhaseA0(program: ProgramNode, ctx: PhaseA0Context) {
  ctx.scopeStack.push(createGlobalScope());
  for (const stmt of program.body) {
    processStatement(stmt, ctx);
  }
  ctx.scopeStack.pop();
  return {
    diagnostics: ctx.diagnostics,
    resolvedProgram: program,
  };
}

export function withNewScope(ctx: PhaseA0Context, action: () => void): void {
  ctx.scopeStack.push(createScope());
  action();
  ctx.scopeStack.pop();
}

export function declareBindings(
  bindings: Binding[],
  ctx: PhaseA0Context,
  isConst: boolean
): void {
  for (const binding of bindings) {
    declareBinding(binding, ctx, isConst);
  }
}

export function declareBinding(
  binding: Binding,
  ctx: PhaseA0Context,
  isConst: boolean
): void {
  registerIdentifier(binding.target, ctx, isConst);
  if (binding.init) {
    evaluateExpression(binding.init, ctx);
  }
}

export function processExpressionForAssignment(
  target: Expression,
  ctx: PhaseA0Context
): void {
  if (isIdentifier(target)) {
    registerAssignmentTarget(target, ctx);
  } else if (isPropOrIndex(target)) {
    evaluateExpression(target, ctx);
  } else {
    ctx.diagnostics.push(createInvalidAssignmentTarget(target));
  }
}

export function handleLoop(loop: LoopNode, ctx: PhaseA0Context): void {
  withNewScope(ctx, () => {
    if (loop.type === "for-classic") {
      if (loop.init) {
        processStatement(loop.init, ctx);
      }
      if (loop.condition) {
        evaluateExpression(loop.condition, ctx);
      }
      if (loop.update) {
        evaluateExpression(loop.update, ctx);
      }
    } else if (loop.type === "for-of" || loop.type === "for-await") {
      declareBinding(loop.binding, ctx, false);
      evaluateExpression(loop.iterable, ctx);
    }
    processStatement(loop.body, ctx);
  });
}

export function processStatement(stmt: Statement, ctx: PhaseA0Context): void {
  switch (stmt.type) {
    case "block":
      withNewScope(ctx, () => {
        for (const child of stmt.statements) {
          processStatement(child, ctx);
        }
      });
      break;

    case "if":
      evaluateExpression(stmt.test, ctx);
      processStatement(stmt.consequent, ctx);
      if (stmt.alternate) {
        processStatement(stmt.alternate, ctx);
      }
      break;

    case "while":
      evaluateExpression(stmt.condition, ctx);
      withNewScope(ctx, () => {
        processStatement(stmt.body, ctx);
      });
      break;

    case "let*":
      withNewScope(ctx, () => {
        declareBindings(stmt.bindings, ctx, stmt.isConst);
        for (const bodyStmt of stmt.body) {
          processStatement(bodyStmt, ctx);
        }
      });
      break;

    case "assign":
      processExpressionForAssignment(stmt.target, ctx);
      evaluateExpression(stmt.value, ctx);
      break;

    case "return":
      if (stmt.value) {
        evaluateExpression(stmt.value, ctx);
      }
      break;

    case "for-classic":
    case "for-of":
    case "for-await":
      handleLoop(stmt, ctx);
      break;

    case "switch":
      evaluateExpression(stmt.discriminant, ctx);
      for (const caseNode of stmt.cases) {
        if (caseNode.test) {
          evaluateExpression(caseNode.test, ctx);
        }
        for (const caseStmt of caseNode.consequent) {
          processStatement(caseStmt, ctx);
        }
      }
      break;

    case "fn":
    case "class":
      evaluateExpression(stmt, ctx);
      break;

    case "break":
    case "continue":
      if (stmt.label) {
        ctx.resolver.validateLabel(stmt.label);
      }
      break;

    case "exprStmt":
      evaluateExpression(stmt.expr, ctx);
      break;

    default:
      ctx.diagnostics.push(createUnknownNodeError(stmt));
  }
}

export function evaluateExpression(
  expr: Expression,
  ctx: PhaseA0Context
): Expression {
  switch (expr.type) {
    case "literal":
    case "identifier":
      return expr;

    case "call":
      evaluateExpression(expr.callee, ctx);
      for (const arg of expr.args) {
        evaluateExpression(arg, ctx);
      }
      return expr;

    case "prop":
      evaluateExpression(expr.object, ctx);
      return expr;

    case "index":
      evaluateExpression(expr.object, ctx);
      evaluateExpression(expr.index, ctx);
      return expr;

    case "new":
      evaluateExpression(expr.callee, ctx);
      for (const arg of expr.args) {
        evaluateExpression(arg, ctx);
      }
      return expr;

    case "throw":
      evaluateExpression(expr.argument, ctx);
      return expr;

    case "try":
      processStatement(expr.body, ctx);
      if (expr.catchClause) {
        withNewScope(ctx, () => {
          if (expr.catchClause!.binding) {
            declareBinding(expr.catchClause!.binding, ctx, true);
          }
          for (const s of expr.catchClause!.body) {
            processStatement(s, ctx);
          }
        });
      }
      if (expr.finallyClause) {
        for (const s of expr.finallyClause.body) {
          processStatement(s, ctx);
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
          registerIdentifier(param.name, ctx, false);
        }
        for (const s of expr.body) {
          processStatement(s, ctx);
        }
      });
      return expr;

    case "class":
      withNewScope(ctx, () => {
        for (const s of expr.body) {
          processStatement(s, ctx);
        }
      });
      return expr;

    default:
      ctx.diagnostics.push(createUnknownNodeError(expr));
      return expr;
  }
}
