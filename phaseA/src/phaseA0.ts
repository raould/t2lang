/**
 * LAYERED COMPILER DESIGN
 *
 * Each layer (A0, A1, etc.) defines a complete, self-contained set of types.
 * No generics, no inheritance between layers. Types that appear similar across
 * layers are intentionally independent - they reference their own layer's types.
 *
 * See LAYERED_TYPE_DESIGN.md for the rationale behind this design.
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
  constructor(
    public name: string,
    public span: Span
  ) {}
}

export class Literal {
  private readonly __brand!: "literal";
  constructor(
    public value: string | number | boolean | null | undefined,
    public span: Span
  ) {}
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
    public value?: Expression
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
    public span: Span
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
    public span: Span
  ) {}
}

export class IndexExpr {
  private readonly __brand!: "index";
  constructor(
    public object: Expression,
    public index: Expression,
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
}

export interface FnSignature {
  parameters: FnParam[];
}

export class FunctionExpr {
  private readonly __brand!: "fn";
  constructor(
    public signature: FnSignature,
    public body: Statement[],
    public span: Span
  ) {}
}

export class ClassExpr {
  private readonly __brand!: "class";
  constructor(
    public body: Statement[],
    public span: Span,
    public name?: Identifier
  ) {}
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
  constructor(
    public body: Statement[],
    public span: Span
  ) {}
}

// --- Context ---

export interface Scope {}

export interface Context {
  diagnostics: Diagnostic[];
  scopeStack: Scope[];
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
    // A0: target is always Identifier
    registerIdentifier(target, isConst);
  }

  function processAssignmentTarget(target: Expression): void {
    if (target instanceof Identifier) {
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
    } else {
      ctx.diagnostics.push({
        message: `Unknown statement type`,
        span: (stmt as Statement).span,
      });
    }
  }

  function evaluateExpression(expr: Expression): Expression {
    if (expr instanceof Literal || expr instanceof Identifier) {
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
        }
        for (const s of expr.body) processStatement(s);
      });
      return expr;
    } else if (expr instanceof ClassExpr) {
      withScope(() => {
        for (const s of expr.body) processStatement(s);
      });
      return expr;
    } else {
      ctx.diagnostics.push({
        message: `Unknown expression type`,
        span: (expr as Expression).span,
      });
      return expr;
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
    declareBinding,
    run,
  };
}
