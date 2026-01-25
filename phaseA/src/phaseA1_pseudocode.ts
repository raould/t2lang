/**
 * Phase A1 pseudocode (TypeScript bridge).
 * 
 * Design principle: A1 genuinely EXTENDS A0 rather than using awkward
 * Exclude<>/replace patterns. We achieve this by:
 * 
 * 1. Re-exporting unchanged A0 types directly
 * 2. Defining A1-specific NEW types (not replacements)
 * 3. Using discriminated unions that include both A0 and A1 variants
 * 4. Extending processing logic via delegation to A0 handlers where possible
 */

import * as A0 from "./phaseA0_pseudocode_refactored";

// ============================================================================
// Re-exports from A0 (unchanged types)
// ============================================================================

export type {
  NodeId,
  Span,
  Diagnostic,
  Scope,
  TypeChecker,
  Identifier,
  Literal,
  // Statements that are unchanged
  BlockStmt,
  IfStmt,
  WhileStmt,
  ForClassic,
  SwitchStmt,
  SwitchCase,
  AssignExpr,
  BreakStmt,
  ContinueStmt,
  // Expressions that are unchanged
  CallExpr,
  NewExpr,
  ArrayExpr,
  ObjectExpr,
  ThrowExpr,
  FinallyClause,
} from "./phaseA0_pseudocode_refactored";

export {
  createGlobalScope,
  createScope,
  createUnknownNodeError,
  createInvalidAssignmentTarget,
  isIdentifier,
  isPropOrIndex,
} from "./phaseA0_pseudocode_refactored";

// ============================================================================
// A1-Specific: Destructuring Patterns
// ============================================================================

export interface ArrayPattern {
  type: "array-pattern";
  elements: BindingTarget[];
  rest?: BindingTarget;
  span: A0.Span;
}

export interface ObjectPatternField {
  key: string;
  target: BindingTarget;
}

export interface ObjectPattern {
  type: "object-pattern";
  properties: ObjectPatternField[];
  rest?: BindingTarget;
  span: A0.Span;
}

export interface RestPattern {
  type: "rest";
  target: BindingTarget;
  span: A0.Span;
}

export type BindingTarget =
  | A0.Identifier
  | ArrayPattern
  | ObjectPattern
  | RestPattern;

/**
 * A1 Binding: extends A0.Binding to support destructuring patterns.
 */
export interface Binding {
  target: BindingTarget;
  init?: Expression;
}

// ============================================================================
// A1-Specific: Extended Statements
// ============================================================================

/**
 * let*/const* with pattern support.
 */
export interface LetStarExpr {
  type: "let*";
  isConst: boolean;
  bindings: Binding[]; // Uses A1 Binding with patterns
  body: Statement[];
  span: A0.Span;
}

/**
 * for-of with pattern support.
 */
export interface ForOf {
  type: "for-of";
  binding: Binding;
  iterable: Expression;
  body: Statement;
  label?: string;
  span: A0.Span;
}

/**
 * for-await with pattern support.
 */
export interface ForAwait {
  type: "for-await";
  binding: Binding;
  iterable: Expression;
  body: Statement;
  label?: string;
  span: A0.Span;
}

export type LoopNode = A0.ForClassic | ForOf | ForAwait;

/**
 * Return with optional type annotation (for tracking).
 */
export interface ReturnExpr {
  type: "return";
  value?: Expression;
  typeId?: number;
  span: A0.Span;
}

/**
 * Expression statement with optional type annotation.
 */
export interface ExprStmt {
  type: "exprStmt";
  expr: Expression;
  typeId?: number;
  span: A0.Span;
}

// ============================================================================
// A1-Specific: Import/Export
// ============================================================================

export interface NamedImport {
  imported: string;
  local: A0.Identifier;
}

export interface ImportSpec {
  source: Expression;
  defaultBinding?: A0.Identifier;
  namespaceBinding?: A0.Identifier;
  named?: NamedImport[];
}

export interface ImportStmt {
  type: "import";
  spec: ImportSpec;
  span: A0.Span;
}

export interface NamedExport {
  exported: string;
  local?: A0.Identifier;
}

export interface ExportSpec {
  source?: Expression;
  named?: NamedExport[];
  defaultExport?: Expression;
  namespaceExport?: A0.Identifier;
}

export interface ExportStmt {
  type: "export";
  spec: ExportSpec;
  span: A0.Span;
}

// ============================================================================
// A1-Specific: Type System Nodes
// ============================================================================

export interface TypeParam {
  name: A0.Identifier;
  variance?: "in" | "out";
  constraint?: TypeNode;
  defaultType?: TypeNode;
  span: A0.Span;
}

export interface TypeField {
  key: string;
  type: TypeNode;
}

export interface TypePrimitive {
  type:
    | "type-string"
    | "type-number"
    | "type-boolean"
    | "type-null"
    | "type-undefined";
  span: A0.Span;
}

export interface TypeRef {
  type: "type-ref";
  identifier: A0.Identifier;
  typeArgs?: TypeNode[];
  span: A0.Span;
}

export interface TypeFunction {
  type: "type-function";
  typeParams?: TypeParam[];
  params: TypeNode[];
  returns: TypeNode;
  span: A0.Span;
}

export interface TypeObject {
  type: "type-object";
  fields: TypeField[];
  span: A0.Span;
}

export interface TypeUnion {
  type: "type-union";
  types: TypeNode[];
  span: A0.Span;
}

export interface TypeIntersection {
  type: "type-intersection";
  types: TypeNode[];
  span: A0.Span;
}

export interface TypeLiteral {
  type: "type-literal";
  value: A0.Literal[];
  span: A0.Span;
}

export interface TypeMapped {
  type: "type-mapped";
  typeParam: TypeParam;
  valueType: TypeNode;
  nameRemap?: TypeNode;
  readonlyModifier?: "readonly" | "-readonly";
  optionalModifier?: "optional" | "-optional";
  via?: TypeNode;
  span: A0.Span;
}

export interface TypeApp {
  type: "type-app";
  expr: TypeNode;
  typeArgs: TypeNode[];
  span: A0.Span;
}

export type TypeNode =
  | TypePrimitive
  | TypeRef
  | TypeFunction
  | TypeObject
  | TypeUnion
  | TypeIntersection
  | TypeLiteral
  | TypeMapped
  | TypeApp;

export interface TypeAliasStmt {
  type: "type-alias";
  name: A0.Identifier;
  typeParams?: TypeParam[];
  typeValue: TypeNode;
  span: A0.Span;
}

export interface InterfaceBody {
  fields: TypeField[];
}

export interface InterfaceExpr {
  type: "type-interface";
  name: A0.Identifier;
  body: InterfaceBody;
  span: A0.Span;
}

// ============================================================================
// A1-Specific: Extended Expressions
// ============================================================================

/**
 * Property access with optional chaining support.
 */
export interface PropExpr {
  type: "prop";
  object: Expression;
  name: string;
  maybeNull: boolean; // true for obj?.prop
  span: A0.Span;
}

/**
 * Index access with optional chaining support.
 */
export interface IndexExpr {
  type: "index";
  object: Expression;
  index: Expression;
  maybeNull: boolean; // true for arr?.[i]
  span: A0.Span;
}

export interface SpreadExpr {
  type: "spread";
  expr: Expression;
  kind: "array" | "object" | "rest";
  span: A0.Span;
}

export interface TernaryExpr {
  type: "ternary";
  test: Expression;
  consequent: Expression;
  alternate: Expression;
  span: A0.Span;
}

export interface AwaitExpr {
  type: "await";
  argument: Expression;
  span: A0.Span;
}

export interface YieldExpr {
  type: "yield";
  argument?: Expression | null;
  delegate: boolean;
  span: A0.Span;
}

export interface TypeAssertExpr {
  type: "type-assert";
  expr: Expression;
  assertedType: TypeNode;
  span: A0.Span;
}

export interface CatchClause {
  binding?: Binding; // A1 Binding with pattern support
  body: Statement[];
}

export interface TryCatchExpr {
  type: "try";
  body: Statement;
  catchClause?: CatchClause;
  finallyClause?: A0.FinallyClause;
  span: A0.Span;
}

// ============================================================================
// A1-Specific: Extended Function/Class
// ============================================================================

export interface Param {
  name: A0.Identifier;
  typeAnnotation?: TypeNode;
}

export interface FnSignature {
  parameters: Param[];
  returnType?: TypeNode;
}

export interface FunctionExpr {
  type: "fn";
  signature: FnSignature;
  typeParams?: TypeParam[];
  body: Statement[];
  async?: boolean;
  generator?: boolean;
  span: A0.Span;
}

export interface ClassBody {
  statements: Statement[];
}

export interface ClassExpr {
  type: "class";
  name?: A0.Identifier;
  body: ClassBody;
  decorators?: Expression[];
  extends?: Expression | null;
  implements?: Expression[];
  constructor?: Statement | null;
  staticBlocks?: Statement[];
  span: A0.Span;
}

// ============================================================================
// A1 Union Types
// ============================================================================

/**
 * A1 Statement: A0 statements + A1-specific statements.
 * Note: We list the A0 types that remain unchanged and add A1 variants.
 */
export type Statement =
  // Unchanged from A0
  | A0.BlockStmt
  | A0.IfStmt
  | A0.WhileStmt
  | A0.ForClassic
  | A0.SwitchStmt
  | A0.AssignExpr
  | A0.BreakStmt
  | A0.ContinueStmt
  // A1 variants (replace A0 versions due to Binding changes)
  | LetStarExpr
  | ForOf
  | ForAwait
  | ReturnExpr
  | ExprStmt
  | FunctionExpr
  | ClassExpr
  // A1-only
  | ImportStmt
  | ExportStmt
  | TypeAliasStmt
  | InterfaceExpr;

/**
 * A1 Expression: A0 expressions + A1-specific expressions.
 */
export type Expression =
  // Unchanged from A0
  | A0.Literal
  | A0.Identifier
  | A0.CallExpr
  | A0.NewExpr
  | A0.ArrayExpr
  | A0.ObjectExpr
  | A0.ThrowExpr
  // A1 variants (extended versions)
  | PropExpr
  | IndexExpr
  | TryCatchExpr
  | FunctionExpr
  | ClassExpr
  // A1-only
  | SpreadExpr
  | TernaryExpr
  | AwaitExpr
  | YieldExpr
  | TypeAssertExpr;

export type Node = Statement | Expression;

export interface ProgramNode {
  type: "program";
  body: Statement[];
  span: A0.Span;
  nodeId: A0.NodeId;
}

// ============================================================================
// A1 Context & Resolver
// ============================================================================

export interface Resolver extends A0.Resolver {
  noteSpreadKind(spread: SpreadExpr): void;
  recordDeclaration(declaration: Statement): void;
}

export interface PhaseA1Context {
  resolver: Resolver;
  typeChecker: A0.TypeChecker;
  diagnostics: A0.Diagnostic[];
  scopeStack: A0.Scope[];
}

// ============================================================================
// A1-Specific Helpers
// ============================================================================

function createUnknownSpreadKind(spread: SpreadExpr): A0.Diagnostic {
  return { message: "unknown spread kind", span: spread.span };
}

function registerIdentifier(
  id: A0.Identifier,
  ctx: PhaseA1Context,
  isConst: boolean
): void {
  // Delegates to implementation
}

function registerAssignmentTarget(
  target: Expression,
  ctx: PhaseA1Context
): void {
  // Delegates to implementation
}

// ============================================================================
// A1 Processing Logic
// ============================================================================

export function runPhaseA1(program: ProgramNode, ctx: PhaseA1Context) {
  ctx.scopeStack.push(A0.createGlobalScope());
  for (const stmt of program.body) {
    processStatement(stmt, ctx);
  }
  ctx.scopeStack.pop();
  return {
    diagnostics: ctx.diagnostics,
    resolvedProgram: program,
  };
}

export function withNewScope(ctx: PhaseA1Context, action: () => void): void {
  ctx.scopeStack.push(A0.createScope());
  action();
  ctx.scopeStack.pop();
}

/**
 * Resolve a binding target (handles destructuring patterns).
 */
export function resolveBindingTarget(
  target: BindingTarget,
  ctx: PhaseA1Context,
  isConst: boolean
): void {
  switch (target.type) {
    case "array-pattern":
      for (const entry of target.elements) {
        resolveBindingTarget(entry, ctx, isConst);
      }
      if (target.rest) {
        resolveBindingTarget(target.rest, ctx, isConst);
      }
      break;

    case "object-pattern":
      for (const field of target.properties) {
        resolveBindingTarget(field.target, ctx, isConst);
      }
      if (target.rest) {
        resolveBindingTarget(target.rest, ctx, isConst);
      }
      break;

    case "rest":
      resolveBindingTarget(target.target, ctx, isConst);
      break;

    case "identifier":
      registerIdentifier(target, ctx, isConst);
      break;

    default:
      // Fallback for identifier
      registerIdentifier(target as A0.Identifier, ctx, isConst);
  }
}

export function declareBindings(
  bindings: Binding[],
  ctx: PhaseA1Context,
  isConst: boolean
): void {
  for (const binding of bindings) {
    declareBinding(binding, ctx, isConst);
  }
}

export function declareBinding(
  binding: Binding,
  ctx: PhaseA1Context,
  isConst: boolean
): void {
  resolveBindingTarget(binding.target, ctx, isConst);
  if (binding.init) {
    evaluateExpression(binding.init, ctx);
  }
}

export function processExpressionForAssignment(
  target: Expression,
  ctx: PhaseA1Context
): void {
  if (A0.isIdentifier(target)) {
    registerAssignmentTarget(target, ctx);
  } else if (A0.isPropOrIndex(target)) {
    evaluateExpression(target, ctx);
  } else {
    ctx.diagnostics.push(A0.createInvalidAssignmentTarget(target));
  }
}

export function handleLoop(loop: LoopNode, ctx: PhaseA1Context): void {
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

function markSpreadKind(expr: SpreadExpr, ctx: PhaseA1Context): void {
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

// ============================================================================
// Type Evaluation (A1-specific)
// ============================================================================

export function evaluateTypeParam(
  param: TypeParam,
  ctx: PhaseA1Context
): void {
  if (param.constraint) {
    evaluateType(param.constraint, ctx);
  }
  if (param.defaultType) {
    evaluateType(param.defaultType, ctx);
  }
}

export function evaluateType(
  typeNode: TypeNode,
  ctx: PhaseA1Context
): TypeNode {
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
      for (const param of typeNode.params) {
        evaluateType(param, ctx);
      }
      evaluateType(typeNode.returns, ctx);
      return typeNode;

    case "type-object":
      for (const field of typeNode.fields) {
        evaluateType(field.type, ctx);
      }
      return typeNode;

    case "type-union":
    case "type-intersection":
      for (const member of typeNode.types) {
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

    case "type-app":
      evaluateType(typeNode.expr, ctx);
      for (const arg of typeNode.typeArgs) {
        evaluateType(arg, ctx);
      }
      return typeNode;

    default:
      ctx.diagnostics.push(
        A0.createUnknownNodeError(typeNode as unknown as Node)
      );
      return typeNode;
  }
}

// ============================================================================
// Import/Export Evaluation (A1-specific)
// ============================================================================

export function evaluateImportSpec(
  spec: ImportSpec,
  ctx: PhaseA1Context
): void {
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

export function evaluateExportSpec(
  spec: ExportSpec,
  ctx: PhaseA1Context
): void {
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

// ============================================================================
// Statement Processing
// ============================================================================

export function processStatement(stmt: Statement, ctx: PhaseA1Context): void {
  switch (stmt.type) {
    // --- A0-compatible cases (delegate similar logic) ---
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

    case "break":
    case "continue":
      if (stmt.label) {
        ctx.resolver.validateLabel(stmt.label);
      }
      break;

    case "exprStmt":
      evaluateExpression(stmt.expr, ctx);
      break;

    case "fn":
    case "class":
      evaluateExpression(stmt, ctx);
      break;

    // --- A1-specific cases ---
    case "import":
      evaluateImportSpec(stmt.spec, ctx);
      ctx.resolver.recordDeclaration(stmt);
      break;

    case "export":
      evaluateExportSpec(stmt.spec, ctx);
      ctx.resolver.recordDeclaration(stmt);
      break;

    case "type-alias":
      if (stmt.typeParams) {
        for (const param of stmt.typeParams) {
          evaluateTypeParam(param, ctx);
        }
      }
      evaluateType(stmt.typeValue, ctx);
      ctx.resolver.recordDeclaration(stmt);
      break;

    case "type-interface":
      for (const field of stmt.body.fields) {
        evaluateType(field.type, ctx);
      }
      ctx.resolver.recordDeclaration(stmt);
      break;

    default:
      ctx.diagnostics.push(A0.createUnknownNodeError(stmt));
  }
}

// ============================================================================
// Expression Evaluation
// ============================================================================

export function evaluateExpression(
  expr: Expression,
  ctx: PhaseA1Context
): Expression {
  switch (expr.type) {
    // --- A0-compatible cases ---
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
          if (param.typeAnnotation) {
            evaluateType(param.typeAnnotation, ctx);
          }
        }
        if (expr.typeParams) {
          for (const typeParam of expr.typeParams) {
            evaluateTypeParam(typeParam, ctx);
          }
        }
        if (expr.signature.returnType) {
          evaluateType(expr.signature.returnType, ctx);
        }
        for (const s of expr.body) {
          processStatement(s, ctx);
        }
      });
      return expr;

    case "class":
      withNewScope(ctx, () => {
        for (const s of expr.body.statements) {
          processStatement(s, ctx);
        }
      });
      return expr;

    // --- A1-specific cases ---
    case "spread":
      evaluateExpression(expr.expr, ctx);
      markSpreadKind(expr, ctx);
      return expr;

    case "ternary":
      evaluateExpression(expr.test, ctx);
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

    case "type-assert":
      evaluateExpression(expr.expr, ctx);
      evaluateType(expr.assertedType, ctx);
      return expr;

    default:
      ctx.diagnostics.push(A0.createUnknownNodeError(expr));
      return expr;
  }
}
