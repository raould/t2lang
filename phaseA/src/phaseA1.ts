/**
 * LAYERED COMPILER DESIGN
 *
 * Each layer (A0, A1, etc.) defines a complete, self-contained set of types.
 * No generics, no inheritance between layers. Types that appear similar across
 * layers are intentionally independent - they reference their own layer's types.
 *
 * See LAYERED_TYPE_DESIGN.md for the rationale behind this design.
 */

import * as A0 from "./phaseA0.js";

// ============================================================================
// LAYER A1 - TypeScript Bridge
// ============================================================================

// --- Infrastructure (A1's own copies, aliased for convenience) ---

export type Span = A0.Span;
export type Diagnostic = A0.Diagnostic;
export type Scope = A0.Scope;

// --- Atoms (unchanged from A0, re-exported) ---

export type Identifier = A0.Identifier;
export type Literal = A0.Literal;

// Re-export for convenience
export const Identifier = A0.Identifier;
export const Literal = A0.Literal;

// --- Binding Targets (A1 adds patterns) ---

export class ArrayPattern {
  private readonly __brand!: "array-pattern";
  constructor(
    public elements: BindingTarget[],
    public span: Span,
    public rest?: BindingTarget
  ) {}
}

export interface ObjectPatternField {
  key: string;
  target: BindingTarget;
}

export class ObjectPattern {
  private readonly __brand!: "object-pattern";
  constructor(
    public properties: ObjectPatternField[],
    public span: Span,
    public rest?: BindingTarget
  ) {}
}

export class RestPattern {
  private readonly __brand!: "rest";
  constructor(
    public target: BindingTarget,
    public span: Span
  ) {}
}

export type BindingTarget = Identifier | ArrayPattern | ObjectPattern | RestPattern;

export interface Binding {
  target: BindingTarget;
  init?: Expression;
}

// --- Statements ---

export class BlockStmt {
  private readonly __brand!: "block";
  constructor(
    public statements: Statement[],
    public span: Span
  ) {}
}

export class IfStmt {
  private readonly __brand!: "if";
  constructor(
    public test: Expression,
    public consequent: Statement,
    public span: Span,
    public alternate?: Statement
  ) {}
}

export class WhileStmt {
  private readonly __brand!: "while";
  constructor(
    public condition: Expression,
    public body: Statement,
    public span: Span
  ) {}
}

export class LetStarExpr {
  private readonly __brand!: "let*";
  constructor(
    public isConst: boolean,
    public bindings: Binding[],
    public body: Statement[],
    public span: Span
  ) {}
}

export class ForClassic {
  private readonly __brand!: "for-classic";
  constructor(
    public body: Statement,
    public span: Span,
    public init?: Statement,
    public condition?: Expression,
    public update?: Expression,
    public label?: string
  ) {}
}

export class ForOf {
  private readonly __brand!: "for-of";
  constructor(
    public binding: Binding,
    public iterable: Expression,
    public body: Statement,
    public span: Span,
    public label?: string
  ) {}
}

export class ForAwait {
  private readonly __brand!: "for-await";
  constructor(
    public binding: Binding,
    public iterable: Expression,
    public body: Statement,
    public span: Span,
    public label?: string
  ) {}
}

export interface SwitchCase {
  test?: Expression | null;
  consequent: Statement[];
}

export class SwitchStmt {
  private readonly __brand!: "switch";
  constructor(
    public discriminant: Expression,
    public cases: SwitchCase[],
    public span: Span
  ) {}
}

export class AssignExpr {
  private readonly __brand!: "assign";
  constructor(
    public target: Expression,
    public value: Expression,
    public span: Span
  ) {}
}

export class ReturnExpr {
  private readonly __brand!: "return";
  constructor(
    public span: Span,
    public value?: Expression,
    public typeId?: number
  ) {}
}

export class BreakStmt {
  private readonly __brand!: "break";
  constructor(
    public span: Span,
    public label?: Identifier
  ) {}
}

export class ContinueStmt {
  private readonly __brand!: "continue";
  constructor(
    public span: Span,
    public label?: Identifier
  ) {}
}

export class ExprStmt {
  private readonly __brand!: "exprStmt";
  constructor(
    public expr: Expression,
    public span: Span,
    public typeId?: number
  ) {}
}

// --- Expressions ---

export class CallExpr {
  private readonly __brand!: "call";
  constructor(
    public callee: Expression,
    public args: Expression[],
    public span: Span
  ) {}
}

export class PropExpr {
  private readonly __brand!: "prop";
  constructor(
    public object: Expression,
    public name: string,
    public maybeNull: boolean,
    public span: Span
  ) {}
}

export class IndexExpr {
  private readonly __brand!: "index";
  constructor(
    public object: Expression,
    public index: Expression,
    public maybeNull: boolean,
    public span: Span
  ) {}
}

export class NewExpr {
  private readonly __brand!: "new";
  constructor(
    public callee: Expression,
    public args: Expression[],
    public span: Span
  ) {}
}

export class ArrayExpr {
  private readonly __brand!: "array";
  constructor(
    public elements: Expression[],
    public span: Span
  ) {}
}

export class ObjectExpr {
  private readonly __brand!: "object";
  constructor(
    public fields: { key: string; value: Expression }[],
    public span: Span
  ) {}
}

export class ThrowExpr {
  private readonly __brand!: "throw";
  constructor(
    public argument: Expression,
    public span: Span
  ) {}
}

export interface CatchClause {
  binding?: Binding;
  body: Statement[];
}

export interface FinallyClause {
  body: Statement[];
}

export class TryCatchExpr {
  private readonly __brand!: "try";
  constructor(
    public body: Statement,
    public span: Span,
    public catchClause?: CatchClause,
    public finallyClause?: FinallyClause
  ) {}
}

export interface FnParam {
  name: Identifier;
  typeAnnotation?: TypeNode;
}

export interface FnSignature {
  parameters: FnParam[];
  returnType?: TypeNode;
}

export class FunctionExpr {
  private readonly __brand!: "fn";
  constructor(
    public signature: FnSignature,
    public body: Statement[],
    public span: Span,
    public typeParams?: TypeParam[],
    public async?: boolean,
    public generator?: boolean
  ) {}
}

export type ClassMember =
  | BlockStmt
  | IfStmt
  | WhileStmt
  | LetStarExpr
  | ForClassic
  | ForOf
  | ForAwait
  | SwitchStmt
  | AssignExpr
  | ReturnExpr
  | BreakStmt
  | ContinueStmt
  | ExprStmt
  | FunctionExpr
  | ClassExpr;

export interface ClassBody {
  statements: ClassMember[];
}

export class ClassExpr {
  private readonly __brand!: "class";
  constructor(
    public body: ClassBody,
    public span: Span,
    public name?: Identifier,
    public decorators?: Expression[],
    public extends_?: Expression | null,
    public implements_?: Expression[],
    public constructor_?: Statement | null,
    public staticBlocks?: Statement[]
  ) {}

  // Getters for cleaner access
  get extends(): Expression | null | undefined {
    return this.extends_;
  }
  get implements(): Expression[] | undefined {
    return this.implements_;
  }
  get constructorStmt(): Statement | null | undefined {
    return this.constructor_;
  }
}

// --- A1-only Expressions ---

export class SpreadExpr {
  private readonly __brand!: "spread";
  constructor(
    public expr: Expression,
    public kind: "array" | "object" | "rest",
    public span: Span
  ) {}
}

export class TernaryExpr {
  private readonly __brand!: "ternary";
  constructor(
    public test: Expression,
    public consequent: Expression,
    public alternate: Expression,
    public span: Span
  ) {}
}

export class AwaitExpr {
  private readonly __brand!: "await";
  constructor(
    public argument: Expression,
    public span: Span
  ) {}
}

export class YieldExpr {
  private readonly __brand!: "yield";
  constructor(
    public delegate: boolean,
    public span: Span,
    public argument?: Expression | null
  ) {}
}

export class TypeAssertExpr {
  private readonly __brand!: "type-assert";
  constructor(
    public expr: Expression,
    public assertedType: TypeNode,
    public span: Span
  ) {}
}

// --- A1 Type System ---

export class TypeParam {
  private readonly __brand!: "type-param";
  constructor(
    public name: Identifier,
    public span: Span,
    public variance?: "in" | "out",
    public constraint?: TypeNode,
    public defaultType?: TypeNode
  ) {}
}

export class TypeField {
  private readonly __brand!: "type-field";
  constructor(
    public key: string,
    public fieldType: TypeNode,
    public span: Span
  ) {}
}

export class TypePrimitive {
  private readonly __brand!:
    | "type-string"
    | "type-number"
    | "type-boolean"
    | "type-null"
    | "type-undefined";
  constructor(
    public kind: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined",
    public span: Span
  ) {
    // TypeScript doesn't allow dynamic assignment to __brand, so we use a getter
  }

  get __brandValue(): string {
    return this.kind;
  }
}

export class TypeRef {
  private readonly __brand!: "type-ref";
  constructor(
    public identifier: Identifier,
    public span: Span,
    public typeArgs?: TypeNode[]
  ) {}
}

export class TypeFunction {
  private readonly __brand!: "type-function";
  constructor(
    public params: TypeNode[],
    public returns: TypeNode,
    public span: Span,
    public typeParams?: TypeParam[]
  ) {}
}

export class TypeObject {
  private readonly __brand!: "type-object";
  constructor(
    public fields: TypeField[],
    public span: Span
  ) {}
}

export class TypeUnion {
  private readonly __brand!: "type-union";
  constructor(
    public types: TypeNode[],
    public span: Span
  ) {}
}

export class TypeIntersection {
  private readonly __brand!: "type-intersection";
  constructor(
    public types: TypeNode[],
    public span: Span
  ) {}
}

export class TypeLiteral {
  private readonly __brand!: "type-literal";
  constructor(
    public value: Literal[],
    public span: Span
  ) {}
}

export class TypeMapped {
  private readonly __brand!: "type-mapped";
  constructor(
    public typeParam: TypeParam,
    public valueType: TypeNode,
    public span: Span,
    public nameRemap?: TypeNode,
    public readonlyModifier?: "readonly" | "-readonly",
    public optionalModifier?: "optional" | "-optional",
    public via?: TypeNode
  ) {}
}

export class TypeApp {
  private readonly __brand!: "type-app";
  constructor(
    public expr: TypeNode,
    public typeArgs: TypeNode[],
    public span: Span
  ) {}
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

// --- A1 Import/Export ---

export interface NamedImport {
  imported: string;
  local: Identifier;
}

export type ModuleSpecifier = Literal;

export interface ImportSpec {
  source: ModuleSpecifier;
  defaultBinding?: Identifier;
  namespaceBinding?: Identifier;
  named?: NamedImport[];
}

export class ImportStmt {
  private readonly __brand!: "import";
  constructor(
    public spec: ImportSpec,
    public span: Span
  ) {}
}

export interface NamedExport {
  exported: string;
  local?: Identifier;
}

export interface ExportSpec {
  source?: ModuleSpecifier;
  named?: NamedExport[];
  defaultExport?: Expression;
  namespaceExport?: Identifier;
}

export class ExportStmt {
  private readonly __brand!: "export";
  constructor(
    public spec: ExportSpec,
    public span: Span
  ) {}
}

export class TypeAliasStmt {
  private readonly __brand!: "type-alias";
  constructor(
    public name: Identifier,
    public typeValue: TypeNode,
    public span: Span,
    public typeParams?: TypeParam[]
  ) {}
}

export interface InterfaceBody {
  fields: TypeField[];
}

export class InterfaceStmt {
  private readonly __brand!: "type-interface";
  constructor(
    public name: Identifier,
    public body: InterfaceBody,
    public span: Span
  ) {}
}

// --- Union Types ---

export type Statement =
  | ClassMember
  // A1-only
  | ImportStmt
  | ExportStmt
  | TypeAliasStmt
  | InterfaceStmt;

export type Expression =
  | Literal
  | Identifier
  | CallExpr
  | PropExpr
  | IndexExpr
  | NewExpr
  | ArrayExpr
  | ObjectExpr
  | ThrowExpr
  | TryCatchExpr
  | FunctionExpr
  | ClassExpr
  // A1-only
  | SpreadExpr
  | TernaryExpr
  | AwaitExpr
  | YieldExpr
  | TypeAssertExpr;

export class Program {
  private readonly __brand!: "program";
  constructor(
    public body: Statement[],
    public span: Span
  ) {}
}

// --- Context ---

export interface Context {
  diagnostics: Diagnostic[];
  scopeStack: Scope[];
  typeRegistry?: Map<string, TypeNode>;
}

// --- Processor ---

export function createProcessor(ctx: Context) {
  function pushScope(): void {
    ctx.scopeStack.push({});
  }

  function popScope(): void {
    ctx.scopeStack.pop();
  }

  function withScope<T>(action: () => T): T {
    pushScope();
    const result = action();
    popScope();
    return result;
  }

  function registerIdentifier(_id: Identifier, _isConst: boolean): void {
    // stub
  }

  function declareBinding(binding: Binding, isConst: boolean): void {
    resolveBindingTarget(binding.target, isConst);
    if (binding.init) {
      evaluateExpression(binding.init);
    }
  }

  function resolveBindingTarget(target: BindingTarget, isConst: boolean): void {
    if (target instanceof A0.Identifier) {
      registerIdentifier(target, isConst);
    } else if (target instanceof ArrayPattern) {
      for (const el of target.elements) resolveBindingTarget(el, isConst);
      if (target.rest) resolveBindingTarget(target.rest, isConst);
    } else if (target instanceof ObjectPattern) {
      for (const prop of target.properties) resolveBindingTarget(prop.target, isConst);
      if (target.rest) resolveBindingTarget(target.rest, isConst);
    } else if (target instanceof RestPattern) {
      resolveBindingTarget(target.target, isConst);
    }
  }

  function processAssignmentTarget(target: Expression): void {
    if (target instanceof A0.Identifier) {
      // validate assignment
    } else if (target instanceof PropExpr || target instanceof IndexExpr) {
      evaluateExpression(target);
    } else {
      ctx.diagnostics.push({
        message: "Invalid assignment target",
        span: target.span,
      });
    }
  }

  function processStatement(stmt: Statement): void {
    if (stmt instanceof BlockStmt) {
      withScope(() => {
        for (const s of stmt.statements) processStatement(s);
      });
    } else if (stmt instanceof IfStmt) {
      evaluateExpression(stmt.test);
      processStatement(stmt.consequent);
      if (stmt.alternate) processStatement(stmt.alternate);
    } else if (stmt instanceof WhileStmt) {
      evaluateExpression(stmt.condition);
      withScope(() => processStatement(stmt.body));
    } else if (stmt instanceof LetStarExpr) {
      withScope(() => {
        for (const b of stmt.bindings) {
          declareBinding(b, stmt.isConst);
        }
        for (const s of stmt.body) processStatement(s);
      });
    } else if (stmt instanceof ForClassic) {
      withScope(() => {
        if (stmt.init) processStatement(stmt.init);
        if (stmt.condition) evaluateExpression(stmt.condition);
        if (stmt.update) evaluateExpression(stmt.update);
        processStatement(stmt.body);
      });
    } else if (stmt instanceof ForOf || stmt instanceof ForAwait) {
      withScope(() => {
        declareBinding(stmt.binding, false);
        evaluateExpression(stmt.iterable);
        processStatement(stmt.body);
      });
    } else if (stmt instanceof SwitchStmt) {
      evaluateExpression(stmt.discriminant);
      for (const c of stmt.cases) {
        if (c.test) evaluateExpression(c.test);
        for (const s of c.consequent) processStatement(s);
      }
    } else if (stmt instanceof AssignExpr) {
      processAssignmentTarget(stmt.target);
      evaluateExpression(stmt.value);
    } else if (stmt instanceof ReturnExpr) {
      if (stmt.value) evaluateExpression(stmt.value);
    } else if (stmt instanceof BreakStmt || stmt instanceof ContinueStmt) {
      // handled by resolver
    } else if (stmt instanceof ExprStmt) {
      evaluateExpression(stmt.expr);
    } else if (stmt instanceof FunctionExpr || stmt instanceof ClassExpr) {
      evaluateExpression(stmt);
    } else if (stmt instanceof ImportStmt) {
      processImport(stmt);
    } else if (stmt instanceof ExportStmt) {
      processExport(stmt);
    } else if (stmt instanceof TypeAliasStmt) {
      processTypeAlias(stmt);
    } else if (stmt instanceof InterfaceStmt) {
      processInterface(stmt);
    } else {
      ctx.diagnostics.push({
        message: `Unknown statement type`,
        span: (stmt as Statement).span,
      });
    }
  }

  function evaluateExpression(expr: Expression): Expression {
    if (expr instanceof A0.Literal || expr instanceof A0.Identifier) {
      return expr;
    } else if (expr instanceof CallExpr) {
      evaluateExpression(expr.callee);
      for (const a of expr.args) evaluateExpression(a);
      return expr;
    } else if (expr instanceof PropExpr) {
      evaluateExpression(expr.object);
      return expr;
    } else if (expr instanceof IndexExpr) {
      evaluateExpression(expr.object);
      evaluateExpression(expr.index);
      return expr;
    } else if (expr instanceof NewExpr) {
      evaluateExpression(expr.callee);
      for (const a of expr.args) evaluateExpression(a);
      return expr;
    } else if (expr instanceof ArrayExpr) {
      for (const e of expr.elements) evaluateExpression(e);
      return expr;
    } else if (expr instanceof ObjectExpr) {
      for (const f of expr.fields) evaluateExpression(f.value);
      return expr;
    } else if (expr instanceof ThrowExpr) {
      evaluateExpression(expr.argument);
      return expr;
    } else if (expr instanceof TryCatchExpr) {
      processStatement(expr.body);
      if (expr.catchClause) {
        withScope(() => {
          if (expr.catchClause!.binding) {
            declareBinding(expr.catchClause!.binding, true);
          }
          for (const s of expr.catchClause!.body) processStatement(s);
        });
      }
      if (expr.finallyClause) {
        for (const s of expr.finallyClause.body) processStatement(s);
      }
      return expr;
    } else if (expr instanceof FunctionExpr) {
      withScope(() => {
        for (const p of expr.signature.parameters) {
          registerIdentifier(p.name, false);
          if (p.typeAnnotation) evaluateType(p.typeAnnotation);
        }
        if (expr.typeParams) {
          for (const tp of expr.typeParams) evaluateTypeParam(tp);
        }
        if (expr.signature.returnType) {
          evaluateType(expr.signature.returnType);
        }
        for (const s of expr.body) processStatement(s);
      });
      return expr;
    } else if (expr instanceof ClassExpr) {
      withScope(() => {
        if (expr.extends) evaluateExpression(expr.extends);
        if (expr.implements) {
          for (const impl of expr.implements) evaluateExpression(impl);
        }
        if (expr.decorators) {
          for (const dec of expr.decorators) evaluateExpression(dec);
        }
        for (const s of expr.body.statements) processStatement(s);
        if (expr.staticBlocks) {
          for (const block of expr.staticBlocks) processStatement(block);
        }
      });
      return expr;
    } else if (expr instanceof SpreadExpr) {
      evaluateExpression(expr.expr);
      return expr;
    } else if (expr instanceof TernaryExpr) {
      evaluateExpression(expr.test);
      evaluateExpression(expr.consequent);
      evaluateExpression(expr.alternate);
      return expr;
    } else if (expr instanceof AwaitExpr) {
      evaluateExpression(expr.argument);
      return expr;
    } else if (expr instanceof YieldExpr) {
      if (expr.argument) evaluateExpression(expr.argument);
      return expr;
    } else if (expr instanceof TypeAssertExpr) {
      evaluateExpression(expr.expr);
      evaluateType(expr.assertedType);
      return expr;
    } else {
      ctx.diagnostics.push({
        message: `Unknown expression type`,
        span: (expr as Expression).span,
      });
      return expr;
    }
  }

  // A1-only: Import processing
  function processImport(stmt: ImportStmt): void {
    if (stmt.spec.defaultBinding) {
      registerIdentifier(stmt.spec.defaultBinding, false);
    }
    if (stmt.spec.namespaceBinding) {
      registerIdentifier(stmt.spec.namespaceBinding, false);
    }
    if (stmt.spec.named) {
      for (const n of stmt.spec.named) {
        registerIdentifier(n.local, false);
      }
    }
    evaluateExpression(stmt.spec.source);
  }

  // A1-only: Export processing
  function processExport(stmt: ExportStmt): void {
    if (stmt.spec.defaultExport) {
      evaluateExpression(stmt.spec.defaultExport);
    }
    if (stmt.spec.named) {
      for (const n of stmt.spec.named) {
        if (n.local) evaluateExpression(n.local);
      }
    }
    if (stmt.spec.source) {
      evaluateExpression(stmt.spec.source);
    }
  }

  // A1-only: Type alias processing
  function processTypeAlias(stmt: TypeAliasStmt): void {
    if (stmt.typeParams) {
      for (const p of stmt.typeParams) evaluateTypeParam(p);
    }
    evaluateType(stmt.typeValue);
  }

  // A1-only: Interface processing
  function processInterface(stmt: InterfaceStmt): void {
    for (const f of stmt.body.fields) {
      evaluateType(f.fieldType);
    }
  }

  // A1-only: Type parameter evaluation
  function evaluateTypeParam(param: TypeParam): void {
    if (param.constraint) evaluateType(param.constraint);
    if (param.defaultType) evaluateType(param.defaultType);
  }

  // A1-only: Type evaluation
  function evaluateType(typeNode: TypeNode): void {
    if (typeNode instanceof TypePrimitive) {
      // leaf node
    } else if (typeNode instanceof TypeRef) {
      if (typeNode.typeArgs) {
        for (const arg of typeNode.typeArgs) evaluateType(arg);
      }
    } else if (typeNode instanceof TypeUnion || typeNode instanceof TypeIntersection) {
      for (const t of typeNode.types) evaluateType(t);
    } else if (typeNode instanceof TypeFunction) {
      if (typeNode.typeParams) {
        for (const p of typeNode.typeParams) evaluateTypeParam(p);
      }
      for (const p of typeNode.params) evaluateType(p);
      evaluateType(typeNode.returns);
    } else if (typeNode instanceof TypeObject) {
      for (const f of typeNode.fields) evaluateType(f.fieldType);
    } else if (typeNode instanceof TypeMapped) {
      evaluateTypeParam(typeNode.typeParam);
      evaluateType(typeNode.valueType);
      if (typeNode.nameRemap) evaluateType(typeNode.nameRemap);
      if (typeNode.via) evaluateType(typeNode.via);
    } else if (typeNode instanceof TypeApp) {
      evaluateType(typeNode.expr);
      for (const a of typeNode.typeArgs) evaluateType(a);
    } else if (typeNode instanceof TypeLiteral) {
      // leaf node
    } else {
      ctx.diagnostics.push({
        message: `Unknown type node`,
        span: (typeNode as TypeNode).span,
      });
    }
  }

  function run(program: Program): { diagnostics: Diagnostic[]; program: Program } {
    ctx.scopeStack.push({});
    for (const stmt of program.body) {
      processStatement(stmt);
    }
    ctx.scopeStack.pop();
    return { diagnostics: ctx.diagnostics, program };
  }

  return {
    processStatement,
    evaluateExpression,
    evaluateType,
    declareBinding,
    run,
  };
}
