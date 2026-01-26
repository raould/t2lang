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

// --- Binding ---

export type BindingTarget = Identifier;

export interface Binding {
  target: BindingTarget;
  init?: Expression;
}

// --- Statements ---

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

export interface LetStarExpr {
  type: "let*";
  isConst: boolean;
  bindings: Binding[];
  body: Statement[];
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

export interface SwitchCase {
  test?: Expression | null;
  consequent: Statement[];
}

export interface SwitchStmt {
  type: "switch";
  discriminant: Expression;
  cases: SwitchCase[];
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

// --- Expressions ---

export interface CallExpr {
  type: "call";
  callee: Expression;
  args: Expression[];
  span: Span;
}

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

export interface FnParam {
  name: Identifier;
}

export interface FnSignature {
  parameters: FnParam[];
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

export interface Program {
  type: "program";
  body: Statement[];
  span: Span;
}

// --- Context ---

export interface Scope { }

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
    if (target.type === "identifier") {
      // validate assignment
    } else if (target.type === "prop" || target.type === "index") {
      evaluateExpression(target);
    } else {
      ctx.diagnostics.push({
        message: "Invalid assignment target",
        span: target.span,
      });
    }
  }

  function processStatement(stmt: Statement): void {
    switch (stmt.type) {
      case "block":
        withScope(() => {
          for (const s of stmt.statements) processStatement(s);
        });
        break;

      case "if":
        evaluateExpression(stmt.test);
        processStatement(stmt.consequent);
        if (stmt.alternate) processStatement(stmt.alternate);
        break;

      case "while":
        evaluateExpression(stmt.condition);
        withScope(() => processStatement(stmt.body));
        break;

      case "let*":
        withScope(() => {
          for (const b of stmt.bindings) {
            declareBinding(b, stmt.isConst);
          }
          for (const s of stmt.body) processStatement(s);
        });
        break;

      case "for-classic":
        withScope(() => {
          if (stmt.init) processStatement(stmt.init);
          if (stmt.condition) evaluateExpression(stmt.condition);
          if (stmt.update) evaluateExpression(stmt.update);
          processStatement(stmt.body);
        });
        break;

      case "for-of":
      case "for-await":
        withScope(() => {
          declareBinding(stmt.binding, false);
          evaluateExpression(stmt.iterable);
          processStatement(stmt.body);
        });
        break;

      case "switch":
        evaluateExpression(stmt.discriminant);
        for (const c of stmt.cases) {
          if (c.test) evaluateExpression(c.test);
          for (const s of c.consequent) processStatement(s);
        }
        break;

      case "assign":
        processAssignmentTarget(stmt.target);
        evaluateExpression(stmt.value);
        break;

      case "return":
        if (stmt.value) evaluateExpression(stmt.value);
        break;

      case "break":
      case "continue":
        // handled by resolver
        break;

      case "exprStmt":
        evaluateExpression(stmt.expr);
        break;

      case "fn":
      case "class":
        evaluateExpression(stmt);
        break;

      default: {
        const _exhaustive: never = stmt;
        ctx.diagnostics.push({
          message: `Unknown statement type: ${(stmt as Statement).type}`,
          span: (stmt as Statement).span,
        });
      }
    }
  }

  function evaluateExpression(expr: Expression): Expression {
    switch (expr.type) {
      case "literal":
      case "identifier":
        return expr;

      case "call":
        evaluateExpression(expr.callee);
        for (const a of expr.args) evaluateExpression(a);
        return expr;

      case "prop":
        evaluateExpression(expr.object);
        return expr;

      case "index":
        evaluateExpression(expr.object);
        evaluateExpression(expr.index);
        return expr;

      case "new":
        evaluateExpression(expr.callee);
        for (const a of expr.args) evaluateExpression(a);
        return expr;

      case "array":
        for (const e of expr.elements) evaluateExpression(e);
        return expr;

      case "object":
        for (const f of expr.fields) evaluateExpression(f.value);
        return expr;

      case "throw":
        evaluateExpression(expr.argument);
        return expr;

      case "try":
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

      case "fn":
        withScope(() => {
          for (const p of expr.signature.parameters) {
            registerIdentifier(p.name, false);
          }
          for (const s of expr.body) processStatement(s);
        });
        return expr;

      case "class":
        withScope(() => {
          for (const s of expr.body) processStatement(s);
        });
        return expr;

      default: {
        const _exhaustive: never = expr;
        ctx.diagnostics.push({
          message: `Unknown expression type: ${(expr as Expression).type}`,
          span: (expr as Expression).span,
        });
        return expr;
      }
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
