/**
 * LAYERED COMPILER DESIGN - Simplified Class Pattern
 * Layer A1 - TypeScript Bridge
 */

import * as A0 from "./phaseA0.js";
import { emitPhaseATrace, PhaseACompilerContext } from "./compilerContext.js";
import type { CompilerStage } from "./events.js";

export type Span = A0.Span;
export type Diagnostic = A0.Diagnostic;
export type Scope = A0.Scope;
export type Identifier = A0.Identifier;
export type Literal = A0.Literal;
export const Identifier = A0.Identifier;
export const Literal = A0.Literal;

// --- Binding Targets ---

export class ArrayPattern {
  private readonly __brand!: "array-pattern";
  readonly elements: BindingTarget[];
  readonly span: Span;
  readonly rest?: BindingTarget;

  constructor(data: { elements: BindingTarget[]; span: Span; rest?: BindingTarget }) {
    this.elements = data.elements;
    this.span = data.span;
    this.rest = data.rest;
  }
}

export interface ObjectPatternField { key: string; target: BindingTarget; }

export class ObjectPattern {
  private readonly __brand!: "object-pattern";
  readonly properties: ObjectPatternField[];
  readonly span: Span;
  readonly rest?: BindingTarget;

  constructor(data: { properties: ObjectPatternField[]; span: Span; rest?: BindingTarget }) {
    this.properties = data.properties;
    this.span = data.span;
    this.rest = data.rest;
  }
}

export class RestPattern {
  private readonly __brand!: "rest";
  readonly target: BindingTarget;
  readonly span: Span;

  constructor(data: { target: BindingTarget; span: Span }) {
    this.target = data.target;
    this.span = data.span;
  }
}

export type BindingTarget = Identifier | ArrayPattern | ObjectPattern | RestPattern;
export interface Binding { target: BindingTarget; init?: Expression; }

// --- Statements ---

export class BlockStmt {
  private readonly __brand!: "block";
  readonly statements: Statement[];
  readonly span: Span;
  constructor(data: { statements: Statement[]; span: Span }) { this.statements = data.statements; this.span = data.span; }
}

export class IfStmt {
  private readonly __brand!: "if";
  readonly test: Expression;
  readonly consequent: Statement;
  readonly span: Span;
  readonly alternate?: Statement;
  constructor(data: { test: Expression; consequent: Statement; span: Span; alternate?: Statement }) {
    this.test = data.test; this.consequent = data.consequent; this.span = data.span; this.alternate = data.alternate;
  }
}

export class WhileStmt {
  private readonly __brand!: "while";
  readonly condition: Expression;
  readonly body: Statement;
  readonly span: Span;
  constructor(data: { condition: Expression; body: Statement; span: Span }) { this.condition = data.condition; this.body = data.body; this.span = data.span; }
}

export class LetStarExpr {
  private readonly __brand!: "let*";
  readonly isConst: boolean;
  readonly bindings: Binding[];
  readonly body: Statement[];
  readonly span: Span;
  constructor(data: { isConst: boolean; bindings: Binding[]; body: Statement[]; span: Span }) {
    this.isConst = data.isConst; this.bindings = data.bindings; this.body = data.body; this.span = data.span;
  }
}

export class ForClassic {
  private readonly __brand!: "for-classic";
  readonly body: Statement;
  readonly span: Span;
  readonly init?: Statement;
  readonly condition?: Expression;
  readonly update?: Expression;
  readonly label?: string;
  constructor(data: { body: Statement; span: Span; init?: Statement; condition?: Expression; update?: Expression; label?: string }) {
    this.body = data.body; this.span = data.span; this.init = data.init; this.condition = data.condition; this.update = data.update; this.label = data.label;
  }
}

export class ForOf {
  private readonly __brand!: "for-of";
  readonly binding: Binding;
  readonly iterable: Expression;
  readonly body: Statement;
  readonly span: Span;
  readonly label?: string;
  constructor(data: { binding: Binding; iterable: Expression; body: Statement; span: Span; label?: string }) {
    this.binding = data.binding; this.iterable = data.iterable; this.body = data.body; this.span = data.span; this.label = data.label;
  }
}

export class ForAwait {
  private readonly __brand!: "for-await";
  readonly binding: Binding;
  readonly iterable: Expression;
  readonly body: Statement;
  readonly span: Span;
  readonly label?: string;
  constructor(data: { binding: Binding; iterable: Expression; body: Statement; span: Span; label?: string }) {
    this.binding = data.binding; this.iterable = data.iterable; this.body = data.body; this.span = data.span; this.label = data.label;
  }
}

export interface SwitchCase { test?: Expression | null; consequent: Statement[]; }

export class SwitchStmt {
  private readonly __brand!: "switch";
  readonly discriminant: Expression;
  readonly cases: SwitchCase[];
  readonly span: Span;
  constructor(data: { discriminant: Expression; cases: SwitchCase[]; span: Span }) {
    this.discriminant = data.discriminant; this.cases = data.cases; this.span = data.span;
  }
}

export class AssignExpr {
  private readonly __brand!: "assign";
  readonly target: Expression;
  readonly value: Expression;
  readonly span: Span;
  constructor(data: { target: Expression; value: Expression; span: Span }) { this.target = data.target; this.value = data.value; this.span = data.span; }
}

export class ReturnExpr {
  private readonly __brand!: "return";
  readonly span: Span;
  readonly value?: Expression;
  readonly typeId?: number;
  constructor(data: { span: Span; value?: Expression; typeId?: number }) { this.span = data.span; this.value = data.value; this.typeId = data.typeId; }
}

export class BreakStmt {
  private readonly __brand!: "break";
  readonly span: Span;
  readonly label?: Identifier;
  constructor(data: { span: Span; label?: Identifier }) { this.span = data.span; this.label = data.label; }
}

export class ContinueStmt {
  private readonly __brand!: "continue";
  readonly span: Span;
  readonly label?: Identifier;
  constructor(data: { span: Span; label?: Identifier }) { this.span = data.span; this.label = data.label; }
}

export class ExprStmt {
  private readonly __brand!: "exprStmt";
  readonly expr: Expression;
  readonly span: Span;
  readonly typeId?: number;
  constructor(data: { expr: Expression; span: Span; typeId?: number }) { this.expr = data.expr; this.span = data.span; this.typeId = data.typeId; }
}

// --- Expressions ---

export class CallExpr {
  private readonly __brand!: "call";
  readonly callee: Expression;
  readonly args: Expression[];
  readonly span: Span;
  constructor(data: { callee: Expression; args: Expression[]; span: Span }) { this.callee = data.callee; this.args = data.args; this.span = data.span; }
}

export class PropExpr {
  private readonly __brand!: "prop";
  readonly object: Expression;
  readonly name: string;
  readonly maybeNull: boolean;
  readonly span: Span;
  constructor(data: { object: Expression; name: string; maybeNull: boolean; span: Span }) {
    this.object = data.object; this.name = data.name; this.maybeNull = data.maybeNull; this.span = data.span;
  }
}

export class IndexExpr {
  private readonly __brand!: "index";
  readonly object: Expression;
  readonly index: Expression;
  readonly maybeNull: boolean;
  readonly span: Span;
  constructor(data: { object: Expression; index: Expression; maybeNull: boolean; span: Span }) {
    this.object = data.object; this.index = data.index; this.maybeNull = data.maybeNull; this.span = data.span;
  }
}

export class NewExpr {
  private readonly __brand!: "new";
  readonly callee: Expression;
  readonly args: Expression[];
  readonly span: Span;
  constructor(data: { callee: Expression; args: Expression[]; span: Span }) { this.callee = data.callee; this.args = data.args; this.span = data.span; }
}

export class ArrayExpr {
  private readonly __brand!: "array";
  readonly elements: Expression[];
  readonly span: Span;
  constructor(data: { elements: Expression[]; span: Span }) { this.elements = data.elements; this.span = data.span; }
}

export class ObjectExpr {
  private readonly __brand!: "object";
  readonly fields: { key: string; value: Expression }[];
  readonly span: Span;
  constructor(data: { fields: { key: string; value: Expression }[]; span: Span }) { this.fields = data.fields; this.span = data.span; }
}

export class ThrowExpr {
  private readonly __brand!: "throw";
  readonly argument: Expression;
  readonly span: Span;
  constructor(data: { argument: Expression; span: Span }) { this.argument = data.argument; this.span = data.span; }
}

export interface CatchClause { binding?: Binding; body: Statement[]; }
export interface FinallyClause { body: Statement[]; }

export class TryCatchExpr {
  private readonly __brand!: "try";
  readonly body: Statement;
  readonly span: Span;
  readonly catchClause?: CatchClause;
  readonly finallyClause?: FinallyClause;
  constructor(data: { body: Statement; span: Span; catchClause?: CatchClause; finallyClause?: FinallyClause }) {
    this.body = data.body; this.span = data.span; this.catchClause = data.catchClause; this.finallyClause = data.finallyClause;
  }
}

export interface FnParam { name: Identifier; typeAnnotation?: TypeNode; }
export interface FnSignature { parameters: FnParam[]; returnType?: TypeNode; }

export class FunctionExpr {
  private readonly __brand!: "fn";
  readonly signature: FnSignature;
  readonly body: Statement[];
  readonly span: Span;
  readonly typeParams?: TypeParam[];
  readonly async?: boolean;
  readonly generator?: boolean;
  constructor(data: { signature: FnSignature; body: Statement[]; span: Span; typeParams?: TypeParam[]; async?: boolean; generator?: boolean }) {
    this.signature = data.signature; this.body = data.body; this.span = data.span; this.typeParams = data.typeParams; this.async = data.async; this.generator = data.generator;
  }
}

export type ClassMember = BlockStmt | IfStmt | WhileStmt | LetStarExpr | ForClassic | ForOf | ForAwait | SwitchStmt | AssignExpr | ReturnExpr | BreakStmt | ContinueStmt | ExprStmt | FunctionExpr | ClassExpr;
export interface ClassBody { statements: ClassMember[]; }

export class ClassExpr {
  private readonly __brand!: "class";
  readonly body: ClassBody;
  readonly span: Span;
  readonly name?: Identifier;
  readonly decorators?: Expression[];
  readonly extends?: Expression | null;
  readonly implements?: Expression[];
  readonly constructorStmt?: Statement | null;
  readonly staticBlocks?: Statement[];
  constructor(data: { body: ClassBody; span: Span; name?: Identifier; decorators?: Expression[]; extends?: Expression | null; implements?: Expression[]; constructorStmt?: Statement | null; staticBlocks?: Statement[] }) {
    this.body = data.body; this.span = data.span; this.name = data.name; this.decorators = data.decorators;
    this.extends = data.extends; this.implements = data.implements; this.constructorStmt = data.constructorStmt; this.staticBlocks = data.staticBlocks;
  }
}

// --- A1-only Expressions ---

export class SpreadExpr {
  private readonly __brand!: "spread";
  readonly expr: Expression;
  readonly kind: "array" | "object" | "rest";
  readonly span: Span;
  constructor(data: { expr: Expression; kind: "array" | "object" | "rest"; span: Span }) { this.expr = data.expr; this.kind = data.kind; this.span = data.span; }
}

export class TernaryExpr {
  private readonly __brand!: "ternary";
  readonly test: Expression;
  readonly consequent: Expression;
  readonly alternate: Expression;
  readonly span: Span;
  constructor(data: { test: Expression; consequent: Expression; alternate: Expression; span: Span }) {
    this.test = data.test; this.consequent = data.consequent; this.alternate = data.alternate; this.span = data.span;
  }
}

export class AwaitExpr {
  private readonly __brand!: "await";
  readonly argument: Expression;
  readonly span: Span;
  constructor(data: { argument: Expression; span: Span }) { this.argument = data.argument; this.span = data.span; }
}

export class YieldExpr {
  private readonly __brand!: "yield";
  readonly delegate: boolean;
  readonly span: Span;
  readonly argument?: Expression | null;
  constructor(data: { delegate: boolean; span: Span; argument?: Expression | null }) { this.delegate = data.delegate; this.span = data.span; this.argument = data.argument; }
}

export class TypeAssertExpr {
  private readonly __brand!: "type-assert";
  readonly expr: Expression;
  readonly assertedType: TypeNode;
  readonly span: Span;
  constructor(data: { expr: Expression; assertedType: TypeNode; span: Span }) { this.expr = data.expr; this.assertedType = data.assertedType; this.span = data.span; }
}

// --- Type System ---

export class TypeParam {
  private readonly __brand!: "type-param";
  readonly name: Identifier;
  readonly span: Span;
  readonly variance?: "in" | "out";
  readonly constraint?: TypeNode;
  readonly defaultType?: TypeNode;
  constructor(data: { name: Identifier; span: Span; variance?: "in" | "out"; constraint?: TypeNode; defaultType?: TypeNode }) {
    this.name = data.name; this.span = data.span; this.variance = data.variance; this.constraint = data.constraint; this.defaultType = data.defaultType;
  }
}

export class TypeField {
  private readonly __brand!: "type-field";
  readonly key: string;
  readonly fieldType: TypeNode;
  readonly span: Span;
  constructor(data: { key: string; fieldType: TypeNode; span: Span }) { this.key = data.key; this.fieldType = data.fieldType; this.span = data.span; }
}

export class TypePrimitive {
  private readonly __brand!: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined";
  readonly kind: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined";
  readonly span: Span;
  constructor(data: { kind: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"; span: Span }) { this.kind = data.kind; this.span = data.span; }
}

export class TypeRef {
  private readonly __brand!: "type-ref";
  readonly identifier: Identifier;
  readonly span: Span;
  readonly typeArgs?: TypeNode[];
  constructor(data: { identifier: Identifier; span: Span; typeArgs?: TypeNode[] }) { this.identifier = data.identifier; this.span = data.span; this.typeArgs = data.typeArgs; }
}

export class TypeFunction {
  private readonly __brand!: "type-function";
  readonly params: TypeNode[];
  readonly returns: TypeNode;
  readonly span: Span;
  readonly typeParams?: TypeParam[];
  constructor(data: { params: TypeNode[]; returns: TypeNode; span: Span; typeParams?: TypeParam[] }) {
    this.params = data.params; this.returns = data.returns; this.span = data.span; this.typeParams = data.typeParams;
  }
}

export class TypeObject {
  private readonly __brand!: "type-object";
  readonly fields: TypeField[];
  readonly span: Span;
  constructor(data: { fields: TypeField[]; span: Span }) { this.fields = data.fields; this.span = data.span; }
}

export class TypeUnion {
  private readonly __brand!: "type-union";
  readonly types: TypeNode[];
  readonly span: Span;
  constructor(data: { types: TypeNode[]; span: Span }) { this.types = data.types; this.span = data.span; }
}

export class TypeIntersection {
  private readonly __brand!: "type-intersection";
  readonly types: TypeNode[];
  readonly span: Span;
  constructor(data: { types: TypeNode[]; span: Span }) { this.types = data.types; this.span = data.span; }
}

export class TypeLiteral {
  private readonly __brand!: "type-literal";
  readonly value: Literal[];
  readonly span: Span;
  constructor(data: { value: Literal[]; span: Span }) { this.value = data.value; this.span = data.span; }
}

export class TypeMapped {
  private readonly __brand!: "type-mapped";
  readonly typeParam: TypeParam;
  readonly valueType: TypeNode;
  readonly span: Span;
  readonly nameRemap?: TypeNode;
  readonly readonlyModifier?: "readonly" | "-readonly";
  readonly optionalModifier?: "optional" | "-optional";
  readonly via?: TypeNode;
  constructor(data: { typeParam: TypeParam; valueType: TypeNode; span: Span; nameRemap?: TypeNode; readonlyModifier?: "readonly" | "-readonly"; optionalModifier?: "optional" | "-optional"; via?: TypeNode }) {
    this.typeParam = data.typeParam; this.valueType = data.valueType; this.span = data.span;
    this.nameRemap = data.nameRemap; this.readonlyModifier = data.readonlyModifier; this.optionalModifier = data.optionalModifier; this.via = data.via;
  }
}

export class TypeApp {
  private readonly __brand!: "type-app";
  readonly expr: Expression | TypeNode;
  readonly typeArgs: TypeNode[];
  readonly span: Span;
  constructor(data: { expr: Expression | TypeNode; typeArgs: TypeNode[]; span: Span }) { this.expr = data.expr; this.typeArgs = data.typeArgs; this.span = data.span; }
}

export type TypeNode = TypePrimitive | TypeRef | TypeFunction | TypeObject | TypeUnion | TypeIntersection | TypeLiteral | TypeMapped | TypeApp;

// --- Import/Export ---

export interface NamedImport { imported: string; local: Identifier; }
export type ModuleSpecifier = Literal;
export interface ImportSpec { source: ModuleSpecifier; defaultBinding?: Identifier; namespaceBinding?: Identifier; named?: NamedImport[]; }

export class ImportStmt {
  private readonly __brand!: "import";
  readonly spec: ImportSpec;
  readonly span: Span;
  constructor(data: { spec: ImportSpec; span: Span }) { this.spec = data.spec; this.span = data.span; }
}

export interface NamedExport { exported: string; local?: Identifier; }
export interface ExportSpec { source?: ModuleSpecifier; named?: NamedExport[]; defaultExport?: Expression; namespaceExport?: Identifier; }

export class ExportStmt {
  private readonly __brand!: "export";
  readonly spec: ExportSpec;
  readonly span: Span;
  constructor(data: { spec: ExportSpec; span: Span }) { this.spec = data.spec; this.span = data.span; }
}

export class TypeAliasStmt {
  private readonly __brand!: "type-alias";
  readonly name: Identifier;
  readonly typeValue: TypeNode;
  readonly span: Span;
  readonly typeParams?: TypeParam[];
  constructor(data: { name: Identifier; typeValue: TypeNode; span: Span; typeParams?: TypeParam[] }) {
    this.name = data.name; this.typeValue = data.typeValue; this.span = data.span; this.typeParams = data.typeParams;
  }
}

export interface InterfaceBody { fields: TypeField[]; }

export class InterfaceStmt {
  private readonly __brand!: "type-interface";
  readonly name: Identifier;
  readonly body: InterfaceBody;
  readonly span: Span;
  constructor(data: { name: Identifier; body: InterfaceBody; span: Span }) { this.name = data.name; this.body = data.body; this.span = data.span; }
}

// --- Union Types ---

export type Statement = ClassMember | ImportStmt | ExportStmt | TypeAliasStmt | InterfaceStmt;
export type Expression = Literal | Identifier | CallExpr | PropExpr | IndexExpr | NewExpr | ArrayExpr | ObjectExpr | ThrowExpr | TryCatchExpr | FunctionExpr | ClassExpr | SpreadExpr | TernaryExpr | AwaitExpr | YieldExpr | TypeAssertExpr | TypeApp;

export class Program {
  private readonly __brand!: "program";
  readonly body: Statement[];
  readonly span: Span;
  constructor(data: { body: Statement[]; span: Span }) { this.body = data.body; this.span = data.span; }
}

export interface Context { diagnostics: Diagnostic[]; scopeStack: Scope[]; typeRegistry?: Map<string, TypeNode>; compilerContext?: PhaseACompilerContext; }

export interface ProcessorMetadata {
  statementsProcessed: number;
  expressionsProcessed: number;
}

// --- Processor ---

const RESOLVE_STAGE: CompilerStage = "resolve";
const TYPECHECK_STAGE: CompilerStage = "typecheck";

export async function createProcessor(ctx: Context) {
  let statementCount = 0;
  let expressionCount = 0;

  async function emitStatementTrace(action: "start" | "end", stmt: Statement) {
    statementCount += action === "start" ? 1 : 0;
    await emitPhaseATrace(ctx.compilerContext, "resolve", `phaseA-resolve:${action}-statement`, {
      statement: stmt.constructor.name,
      action,
    });
  }

  async function emitExpressionTrace(action: "start" | "mid" | "end", expr: Expression) {
    expressionCount += action === "start" ? 1 : 0;
    await emitPhaseATrace(ctx.compilerContext, "resolve", `phaseA-resolve:${action}-expression`, {
      expression: expr.constructor.name,
      action,
    });
  }

  async function pushScope(): Promise<void> { ctx.scopeStack.push({}); }
  async function popScope(): Promise<void> { ctx.scopeStack.pop(); }
  async function withScope<T>(action: () => Promise<T>): Promise<T> {
    await pushScope();
    const result = await action();
    await popScope();
    return result;
  }

  const isTypeNodeValue = (value: unknown): value is TypeNode =>
    value instanceof TypePrimitive ||
    value instanceof TypeRef ||
    value instanceof TypeFunction ||
    value instanceof TypeObject ||
    value instanceof TypeUnion ||
    value instanceof TypeIntersection ||
    value instanceof TypeLiteral ||
    value instanceof TypeMapped ||
    value instanceof TypeApp;
  async function registerIdentifier(_id: Identifier, _isConst: boolean): Promise<void> { /* stub */ }

  async function declareBinding(binding: Binding, isConst: boolean): Promise<void> {
    await resolveBindingTarget(binding.target, isConst);
    if (binding.init) {
      await evaluateExpression(binding.init);
    }
  }

  async function resolveBindingTarget(target: BindingTarget, isConst: boolean): Promise<void> {
    if (target instanceof A0.Identifier) {
      await registerIdentifier(target, isConst);
    } else if (target instanceof ArrayPattern) {
      for (const el of target.elements) {
        await resolveBindingTarget(el, isConst);
      }
      if (target.rest) {
        await resolveBindingTarget(target.rest, isConst);
      }
    } else if (target instanceof ObjectPattern) {
      for (const prop of target.properties) {
        await resolveBindingTarget(prop.target, isConst);
      }
      if (target.rest) {
        await resolveBindingTarget(target.rest, isConst);
      }
    } else if (target instanceof RestPattern) {
      await resolveBindingTarget(target.target, isConst);
    }
  }

  async function processAssignmentTarget(target: Expression): Promise<void> {
    if (target instanceof A0.Identifier) {
      return; /* validate */
    }
    if (target instanceof PropExpr || target instanceof IndexExpr) {
      await evaluateExpression(target);
      return;
    }
    ctx.diagnostics.push(A0.createDiagnostic(RESOLVE_STAGE, "T2:0002", target.span));
  }

  async function processStatement(stmt: Statement): Promise<void> {
    await emitStatementTrace("start", stmt);
    try {
      if (stmt instanceof BlockStmt) {
        await withScope(async () => {
          for (const s of stmt.statements) {
            await processStatement(s);
          }
        });
      } else if (stmt instanceof IfStmt) {
        await evaluateExpression(stmt.test);
        await processStatement(stmt.consequent);
        if (stmt.alternate) {
          await processStatement(stmt.alternate);
        }
      } else if (stmt instanceof WhileStmt) {
        await evaluateExpression(stmt.condition);
        await withScope(async () => await processStatement(stmt.body));
      } else if (stmt instanceof LetStarExpr) {
        await withScope(async () => {
          for (const b of stmt.bindings) {
            await declareBinding(b, stmt.isConst);
          }
          for (const s of stmt.body) {
            await processStatement(s);
          }
        });
      } else if (stmt instanceof ForClassic) {
        await withScope(async () => {
          if (stmt.init) {
            await processStatement(stmt.init);
          }
          if (stmt.condition) {
            await evaluateExpression(stmt.condition);
          }
          if (stmt.update) {
            await evaluateExpression(stmt.update);
          }
          await processStatement(stmt.body);
        });
      } else if (stmt instanceof ForOf || stmt instanceof ForAwait) {
        await withScope(async () => {
          await declareBinding(stmt.binding, false);
          await evaluateExpression(stmt.iterable);
          await processStatement(stmt.body);
        });
      } else if (stmt instanceof SwitchStmt) {
        await evaluateExpression(stmt.discriminant);
        for (const c of stmt.cases) {
          if (c.test) {
            await evaluateExpression(c.test);
          }
          for (const s of c.consequent) {
            await processStatement(s);
          }
        }
      } else if (stmt instanceof AssignExpr) {
        await processAssignmentTarget(stmt.target);
        await evaluateExpression(stmt.value);
      } else if (stmt instanceof ReturnExpr) {
        if (stmt.value) {
          await evaluateExpression(stmt.value);
        }
      } else if (stmt instanceof BreakStmt || stmt instanceof ContinueStmt) {
        return; /* resolver */
      } else if (stmt instanceof ExprStmt) {
        await evaluateExpression(stmt.expr);
      } else if (stmt instanceof FunctionExpr || stmt instanceof ClassExpr) {
        await evaluateExpression(stmt);
      } else if (stmt instanceof ImportStmt) {
        await processImport(stmt);
      } else if (stmt instanceof ExportStmt) {
        await processExport(stmt);
      } else if (stmt instanceof TypeAliasStmt) {
        await processTypeAlias(stmt);
      } else if (stmt instanceof InterfaceStmt) {
        await processInterface(stmt);
      } else {
        ctx.diagnostics.push(A0.createDiagnostic(RESOLVE_STAGE, "T2:0003", (stmt as Statement).span));
      }
    } finally {
      await emitStatementTrace("end", stmt);
    }
  }

  async function evaluateExpression(expr: Expression): Promise<Expression> {
    await emitExpressionTrace("start", expr);
    try {
      if (expr instanceof A0.Literal || expr instanceof A0.Identifier) {
        return expr;
      }
      if (expr instanceof CallExpr) {
        await emitExpressionTrace("mid", expr);
        await evaluateExpression(expr.callee);
        for (const a of expr.args) {
          await evaluateExpression(a);
        }
        return expr;
      }
      if (expr instanceof PropExpr) {
        await evaluateExpression(expr.object);
        return expr;
      }
      if (expr instanceof IndexExpr) {
        await evaluateExpression(expr.object);
        await evaluateExpression(expr.index);
        return expr;
      }
      if (expr instanceof NewExpr) {
        await evaluateExpression(expr.callee);
        for (const a of expr.args) {
          await evaluateExpression(a);
        }
        return expr;
      }
      if (expr instanceof ArrayExpr) {
        for (const e of expr.elements) {
          await evaluateExpression(e);
        }
        return expr;
      }
      if (expr instanceof ObjectExpr) {
        for (const f of expr.fields) {
          await evaluateExpression(f.value);
        }
        return expr;
      }
      if (expr instanceof ThrowExpr) {
        await evaluateExpression(expr.argument);
        return expr;
      }
      if (expr instanceof TryCatchExpr) {
        await processStatement(expr.body);
        if (expr.catchClause) {
          await withScope(async () => {
            if (expr.catchClause!.binding) {
              await declareBinding(expr.catchClause!.binding, true);
            }
            for (const s of expr.catchClause!.body) {
              await processStatement(s);
            }
          });
        }
        if (expr.finallyClause) {
          for (const s of expr.finallyClause.body) {
            await processStatement(s);
          }
        }
        return expr;
      }
      if (expr instanceof FunctionExpr) {
        await withScope(async () => {
          for (const p of expr.signature.parameters) {
            await registerIdentifier(p.name, false);
            if (p.typeAnnotation) {
              await evaluateType(p.typeAnnotation);
            }
          }
          if (expr.typeParams) {
            for (const tp of expr.typeParams) {
              await evaluateTypeParam(tp);
            }
          }
          if (expr.signature.returnType) {
            await evaluateType(expr.signature.returnType);
          }
          for (const s of expr.body) {
            await processStatement(s);
          }
        });
        return expr;
      }
      if (expr instanceof ClassExpr) {
        await withScope(async () => {
          if (expr.extends) {
            await evaluateExpression(expr.extends);
          }
          if (expr.implements) {
            for (const impl of expr.implements) {
              await evaluateExpression(impl);
            }
          }
          if (expr.decorators) {
            for (const dec of expr.decorators) {
              await evaluateExpression(dec);
            }
          }
          for (const s of expr.body.statements) {
            await processStatement(s);
          }
          if (expr.staticBlocks) {
            for (const block of expr.staticBlocks) {
              await processStatement(block);
            }
          }
        });
        return expr;
      }
      if (expr instanceof SpreadExpr) {
        await evaluateExpression(expr.expr);
        return expr;
      }
      if (expr instanceof TernaryExpr) {
        await evaluateExpression(expr.test);
        await evaluateExpression(expr.consequent);
        await evaluateExpression(expr.alternate);
        return expr;
      }
      if (expr instanceof AwaitExpr) {
        await evaluateExpression(expr.argument);
        return expr;
      }
      if (expr instanceof YieldExpr) {
        if (expr.argument) {
          await evaluateExpression(expr.argument);
        }
        return expr;
      }
      if (expr instanceof TypeApp) {
        if (!isTypeNodeValue(expr.expr)) {
          await evaluateExpression(expr.expr as Expression);
        }
        for (const arg of expr.typeArgs) {
          await evaluateType(arg);
        }
        return expr;
      }
      if (expr instanceof TypeAssertExpr) {
        await evaluateExpression(expr.expr);
        await evaluateType(expr.assertedType);
        return expr;
      }
      ctx.diagnostics.push(A0.createDiagnostic(RESOLVE_STAGE, "T2:0004", (expr as Expression).span));
      return expr;
    } finally {
      await emitExpressionTrace("end", expr);
    }
  }

  async function processImport(stmt: ImportStmt): Promise<void> {
    if (stmt.spec.defaultBinding) {
      await registerIdentifier(stmt.spec.defaultBinding, false);
    }
    if (stmt.spec.namespaceBinding) {
      await registerIdentifier(stmt.spec.namespaceBinding, false);
    }
    if (stmt.spec.named) {
      for (const n of stmt.spec.named) {
        await registerIdentifier(n.local, false);
      }
    }
    await evaluateExpression(stmt.spec.source);
  }

  async function processExport(stmt: ExportStmt): Promise<void> {
    if (stmt.spec.defaultExport) {
      await evaluateExpression(stmt.spec.defaultExport);
    }
    if (stmt.spec.named) {
      for (const n of stmt.spec.named) {
        if (n.local) {
          await evaluateExpression(n.local);
        }
      }
    }
    if (stmt.spec.source) {
      await evaluateExpression(stmt.spec.source);
    }
  }

  async function processTypeAlias(stmt: TypeAliasStmt): Promise<void> {
    if (stmt.typeParams) {
      for (const p of stmt.typeParams) {
        await evaluateTypeParam(p);
      }
    }
    await evaluateType(stmt.typeValue);
  }

  async function processInterface(stmt: InterfaceStmt): Promise<void> {
    for (const f of stmt.body.fields) {
      await evaluateType(f.fieldType);
    }
  }

  async function evaluateTypeParam(param: TypeParam): Promise<void> {
    if (param.constraint) {
      await evaluateType(param.constraint);
    }
    if (param.defaultType) {
      await evaluateType(param.defaultType);
    }
  }

  async function evaluateType(typeNode: TypeNode): Promise<void> {
    if (typeNode instanceof TypePrimitive) {
      return;
    }
    if (typeNode instanceof TypeRef) {
      if (typeNode.typeArgs) {
        for (const arg of typeNode.typeArgs) {
          await evaluateType(arg);
        }
      }
      return;
    }
    if (typeNode instanceof TypeUnion || typeNode instanceof TypeIntersection) {
      for (const t of typeNode.types) {
        await evaluateType(t);
      }
      return;
    }
    if (typeNode instanceof TypeFunction) {
      if (typeNode.typeParams) {
        for (const p of typeNode.typeParams) {
          await evaluateTypeParam(p);
        }
      }
      for (const p of typeNode.params) {
        await evaluateType(p);
      }
      await evaluateType(typeNode.returns);
      return;
    }
    if (typeNode instanceof TypeObject) {
      for (const f of typeNode.fields) {
        await evaluateType(f.fieldType);
      }
      return;
    }
    if (typeNode instanceof TypeMapped) {
      await evaluateTypeParam(typeNode.typeParam);
      await evaluateType(typeNode.valueType);
      if (typeNode.nameRemap) {
        await evaluateType(typeNode.nameRemap);
      }
      if (typeNode.via) {
        await evaluateType(typeNode.via);
      }
      return;
    }
    if (typeNode instanceof TypeApp) {
      if (isTypeNodeValue(typeNode.expr)) {
        await evaluateType(typeNode.expr);
      }
      for (const a of typeNode.typeArgs) {
        await evaluateType(a);
      }
      return;
    }
      if (typeNode instanceof TypeLiteral) {
        return;
      }
      ctx.diagnostics.push(A0.createDiagnostic(TYPECHECK_STAGE, "T2:0005", (typeNode as TypeNode).span));
  }

  async function run(program: Program): Promise<{ diagnostics: Diagnostic[]; program: Program }> {
    await pushScope();
    for (const stmt of program.body) {
      await processStatement(stmt);
    }
    await popScope();
    return { diagnostics: ctx.diagnostics, program };
  }

  return { processStatement, evaluateExpression, evaluateType, declareBinding, run };
}
