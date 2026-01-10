/**
 * LAYERED COMPILER DESIGN - Simplified Class Pattern
 * 
 * Each class takes a single data object in its constructor.
 * This avoids overload complexity while still providing:
 * - Readonly fields
 * - Nominal typing via __brand
 * - Easy copying via spread: new IfStmt({ ...existing, test: newTest })
 */

// ============================================================================
// LAYER A0 - Core Runtime Calculus
// ============================================================================

// --- Infrastructure ---

export interface Span {
  start: number;
  end: number;
  source: string;
}

export interface Diagnostic {
  message: string;
  span: Span;
}

// --- Atoms ---

export class Identifier {
  private readonly __brand!: "identifier";
  readonly name: string;
  readonly span: Span;

  constructor(data: { name: string; span: Span }) {
    this.name = data.name;
    this.span = data.span;
  }
}

export class Literal {
  private readonly __brand!: "literal";
  readonly value: string | number | boolean | null | undefined;
  readonly span: Span;

  constructor(data: { value: string | number | boolean | null | undefined; span: Span }) {
    this.value = data.value;
    this.span = data.span;
  }
}

// --- Binding ---

export type BindingTarget = Identifier;

export interface Binding {
  target: BindingTarget;
  init?: Expression;
}

// --- Statements ---

export class BlockStmt {
  private readonly __brand!: "block";
  readonly statements: Statement[];
  readonly span: Span;

  constructor(data: { statements: Statement[]; span: Span }) {
    this.statements = data.statements;
    this.span = data.span;
  }
}

export class IfStmt {
  private readonly __brand!: "if";
  readonly test: Expression;
  readonly consequent: Statement;
  readonly span: Span;
  readonly alternate?: Statement;

  constructor(data: { test: Expression; consequent: Statement; span: Span; alternate?: Statement }) {
    this.test = data.test;
    this.consequent = data.consequent;
    this.span = data.span;
    this.alternate = data.alternate;
  }
}

export class WhileStmt {
  private readonly __brand!: "while";
  readonly condition: Expression;
  readonly body: Statement;
  readonly span: Span;

  constructor(data: { condition: Expression; body: Statement; span: Span }) {
    this.condition = data.condition;
    this.body = data.body;
    this.span = data.span;
  }
}

export class LetStarExpr {
  private readonly __brand!: "let*";
  readonly isConst: boolean;
  readonly bindings: Binding[];
  readonly body: Statement[];
  readonly span: Span;

  constructor(data: { isConst: boolean; bindings: Binding[]; body: Statement[]; span: Span }) {
    this.isConst = data.isConst;
    this.bindings = data.bindings;
    this.body = data.body;
    this.span = data.span;
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

  constructor(data: {
    body: Statement;
    span: Span;
    init?: Statement;
    condition?: Expression;
    update?: Expression;
    label?: string;
  }) {
    this.body = data.body;
    this.span = data.span;
    this.init = data.init;
    this.condition = data.condition;
    this.update = data.update;
    this.label = data.label;
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
    this.binding = data.binding;
    this.iterable = data.iterable;
    this.body = data.body;
    this.span = data.span;
    this.label = data.label;
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
    this.binding = data.binding;
    this.iterable = data.iterable;
    this.body = data.body;
    this.span = data.span;
    this.label = data.label;
  }
}

export interface SwitchCase {
  test?: Expression | null;
  consequent: Statement[];
}

export class SwitchStmt {
  private readonly __brand!: "switch";
  readonly discriminant: Expression;
  readonly cases: SwitchCase[];
  readonly span: Span;

  constructor(data: { discriminant: Expression; cases: SwitchCase[]; span: Span }) {
    this.discriminant = data.discriminant;
    this.cases = data.cases;
    this.span = data.span;
  }
}

export class AssignExpr {
  private readonly __brand!: "assign";
  readonly target: Expression;
  readonly value: Expression;
  readonly span: Span;

  constructor(data: { target: Expression; value: Expression; span: Span }) {
    this.target = data.target;
    this.value = data.value;
    this.span = data.span;
  }
}

export class ReturnExpr {
  private readonly __brand!: "return";
  readonly span: Span;
  readonly value?: Expression;

  constructor(data: { span: Span; value?: Expression }) {
    this.span = data.span;
    this.value = data.value;
  }
}

export class BreakStmt {
  private readonly __brand!: "break";
  readonly span: Span;
  readonly label?: Identifier;

  constructor(data: { span: Span; label?: Identifier }) {
    this.span = data.span;
    this.label = data.label;
  }
}

export class ContinueStmt {
  private readonly __brand!: "continue";
  readonly span: Span;
  readonly label?: Identifier;

  constructor(data: { span: Span; label?: Identifier }) {
    this.span = data.span;
    this.label = data.label;
  }
}

export class ExprStmt {
  private readonly __brand!: "exprStmt";
  readonly expr: Expression;
  readonly span: Span;

  constructor(data: { expr: Expression; span: Span }) {
    this.expr = data.expr;
    this.span = data.span;
  }
}

// --- Expressions ---

export class CallExpr {
  private readonly __brand!: "call";
  readonly callee: Expression;
  readonly args: Expression[];
  readonly span: Span;

  constructor(data: { callee: Expression; args: Expression[]; span: Span }) {
    this.callee = data.callee;
    this.args = data.args;
    this.span = data.span;
  }
}

export class PropExpr {
  private readonly __brand!: "prop";
  readonly object: Expression;
  readonly name: string;
  readonly span: Span;

  constructor(data: { object: Expression; name: string; span: Span }) {
    this.object = data.object;
    this.name = data.name;
    this.span = data.span;
  }
}

export class IndexExpr {
  private readonly __brand!: "index";
  readonly object: Expression;
  readonly index: Expression;
  readonly span: Span;

  constructor(data: { object: Expression; index: Expression; span: Span }) {
    this.object = data.object;
    this.index = data.index;
    this.span = data.span;
  }
}

export class NewExpr {
  private readonly __brand!: "new";
  readonly callee: Expression;
  readonly args: Expression[];
  readonly span: Span;

  constructor(data: { callee: Expression; args: Expression[]; span: Span }) {
    this.callee = data.callee;
    this.args = data.args;
    this.span = data.span;
  }
}

export class ArrayExpr {
  private readonly __brand!: "array";
  readonly elements: Expression[];
  readonly span: Span;

  constructor(data: { elements: Expression[]; span: Span }) {
    this.elements = data.elements;
    this.span = data.span;
  }
}

export class ObjectExpr {
  private readonly __brand!: "object";
  readonly fields: { key: string; value: Expression }[];
  readonly span: Span;

  constructor(data: { fields: { key: string; value: Expression }[]; span: Span }) {
    this.fields = data.fields;
    this.span = data.span;
  }
}

export class ThrowExpr {
  private readonly __brand!: "throw";
  readonly argument: Expression;
  readonly span: Span;

  constructor(data: { argument: Expression; span: Span }) {
    this.argument = data.argument;
    this.span = data.span;
  }
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
  readonly body: Statement;
  readonly span: Span;
  readonly catchClause?: CatchClause;
  readonly finallyClause?: FinallyClause;

  constructor(data: { body: Statement; span: Span; catchClause?: CatchClause; finallyClause?: FinallyClause }) {
    this.body = data.body;
    this.span = data.span;
    this.catchClause = data.catchClause;
    this.finallyClause = data.finallyClause;
  }
}

export interface FnParam {
  name: Identifier;
}

export interface FnSignature {
  parameters: FnParam[];
}

export class FunctionExpr {
  private readonly __brand!: "fn";
  readonly signature: FnSignature;
  readonly body: Statement[];
  readonly span: Span;

  constructor(data: { signature: FnSignature; body: Statement[]; span: Span }) {
    this.signature = data.signature;
    this.body = data.body;
    this.span = data.span;
  }
}

export class ClassExpr {
  private readonly __brand!: "class";
  readonly body: Statement[];
  readonly span: Span;
  readonly name?: Identifier;

  constructor(data: { body: Statement[]; span: Span; name?: Identifier }) {
    this.body = data.body;
    this.span = data.span;
    this.name = data.name;
  }
}

// --- Union Types ---

export type Statement =
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
  | ClassExpr;

export class Program {
  private readonly __brand!: "program";
  readonly body: Statement[];
  readonly span: Span;

  constructor(data: { body: Statement[]; span: Span }) {
    this.body = data.body;
    this.span = data.span;
  }
}

// --- Context ---

export interface Scope {}

export interface Context {
  diagnostics: Diagnostic[];
  scopeStack: Scope[];
}

// --- Processor ---

export function createProcessor(ctx: Context) {
  function pushScope(): void { ctx.scopeStack.push({}); }
  function popScope(): void { ctx.scopeStack.pop(); }
  function withScope<T>(action: () => T): T { pushScope(); const result = action(); popScope(); return result; }
  function registerIdentifier(_id: Identifier, _isConst: boolean): void { /* stub */ }

  function declareBinding(binding: Binding, isConst: boolean): void {
    resolveBindingTarget(binding.target, isConst);
    if (binding.init) evaluateExpression(binding.init);
  }

  function resolveBindingTarget(target: BindingTarget, isConst: boolean): void {
    registerIdentifier(target, isConst);
  }

  function processAssignmentTarget(target: Expression): void {
    if (target instanceof Identifier) { /* validate */ }
    else if (target instanceof PropExpr || target instanceof IndexExpr) { evaluateExpression(target); }
    else { ctx.diagnostics.push({ message: "Invalid assignment target", span: target.span }); }
  }

  function processStatement(stmt: Statement): void {
    if (stmt instanceof BlockStmt) { withScope(() => { for (const s of stmt.statements) processStatement(s); }); }
    else if (stmt instanceof IfStmt) { evaluateExpression(stmt.test); processStatement(stmt.consequent); if (stmt.alternate) processStatement(stmt.alternate); }
    else if (stmt instanceof WhileStmt) { evaluateExpression(stmt.condition); withScope(() => processStatement(stmt.body)); }
    else if (stmt instanceof LetStarExpr) { withScope(() => { for (const b of stmt.bindings) declareBinding(b, stmt.isConst); for (const s of stmt.body) processStatement(s); }); }
    else if (stmt instanceof ForClassic) { withScope(() => { if (stmt.init) processStatement(stmt.init); if (stmt.condition) evaluateExpression(stmt.condition); if (stmt.update) evaluateExpression(stmt.update); processStatement(stmt.body); }); }
    else if (stmt instanceof ForOf || stmt instanceof ForAwait) { withScope(() => { declareBinding(stmt.binding, false); evaluateExpression(stmt.iterable); processStatement(stmt.body); }); }
    else if (stmt instanceof SwitchStmt) { evaluateExpression(stmt.discriminant); for (const c of stmt.cases) { if (c.test) evaluateExpression(c.test); for (const s of c.consequent) processStatement(s); } }
    else if (stmt instanceof AssignExpr) { processAssignmentTarget(stmt.target); evaluateExpression(stmt.value); }
    else if (stmt instanceof ReturnExpr) { if (stmt.value) evaluateExpression(stmt.value); }
    else if (stmt instanceof BreakStmt || stmt instanceof ContinueStmt) { /* handled by resolver */ }
    else if (stmt instanceof ExprStmt) { evaluateExpression(stmt.expr); }
    else if (stmt instanceof FunctionExpr || stmt instanceof ClassExpr) { evaluateExpression(stmt); }
    else { ctx.diagnostics.push({ message: `Unknown statement type`, span: (stmt as Statement).span }); }
  }

  function evaluateExpression(expr: Expression): Expression {
    if (expr instanceof Literal || expr instanceof Identifier) { return expr; }
    else if (expr instanceof CallExpr) { evaluateExpression(expr.callee); for (const a of expr.args) evaluateExpression(a); return expr; }
    else if (expr instanceof PropExpr) { evaluateExpression(expr.object); return expr; }
    else if (expr instanceof IndexExpr) { evaluateExpression(expr.object); evaluateExpression(expr.index); return expr; }
    else if (expr instanceof NewExpr) { evaluateExpression(expr.callee); for (const a of expr.args) evaluateExpression(a); return expr; }
    else if (expr instanceof ArrayExpr) { for (const e of expr.elements) evaluateExpression(e); return expr; }
    else if (expr instanceof ObjectExpr) { for (const f of expr.fields) evaluateExpression(f.value); return expr; }
    else if (expr instanceof ThrowExpr) { evaluateExpression(expr.argument); return expr; }
    else if (expr instanceof TryCatchExpr) {
      processStatement(expr.body);
      if (expr.catchClause) { withScope(() => { if (expr.catchClause!.binding) declareBinding(expr.catchClause!.binding, true); for (const s of expr.catchClause!.body) processStatement(s); }); }
      if (expr.finallyClause) { for (const s of expr.finallyClause.body) processStatement(s); }
      return expr;
    }
    else if (expr instanceof FunctionExpr) { withScope(() => { for (const p of expr.signature.parameters) registerIdentifier(p.name, false); for (const s of expr.body) processStatement(s); }); return expr; }
    else if (expr instanceof ClassExpr) { withScope(() => { for (const s of expr.body) processStatement(s); }); return expr; }
    else { ctx.diagnostics.push({ message: `Unknown expression type`, span: (expr as Expression).span }); return expr; }
  }

  function run(program: Program): { diagnostics: Diagnostic[]; program: Program } {
    ctx.scopeStack.push({});
    for (const stmt of program.body) processStatement(stmt);
    ctx.scopeStack.pop();
    return { diagnostics: ctx.diagnostics, program };
  }

  return { processStatement, evaluateExpression, declareBinding, run };
}
