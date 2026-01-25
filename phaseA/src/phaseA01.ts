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

export namespace A0 {
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
}

// ============================================================================
// LAYER A1 - TypeScript Bridge
// ============================================================================

export namespace A1 {
  // --- Infrastructure (A1's own copies, aliased for convenience) ---

  export type Span = A0.Span;
  export type Diagnostic = A0.Diagnostic;
  export type Scope = A0.Scope;

  // --- Atoms (unchanged from A0, re-exported) ---

  export type Identifier = A0.Identifier;
  export type Literal = A0.Literal;

  // --- Binding Targets (A1 adds patterns) ---

  export interface ArrayPattern {
    type: "array-pattern";
    elements: BindingTarget[];
    rest?: BindingTarget;
    span: Span;
  }

  export interface ObjectPatternField {
    key: string;
    target: BindingTarget;
  }

  export interface ObjectPattern {
    type: "object-pattern";
    properties: ObjectPatternField[];
    rest?: BindingTarget;
    span: Span;
  }

  export interface RestPattern {
    type: "rest";
    target: BindingTarget;
    span: Span;
  }

  export type BindingTarget = Identifier | ArrayPattern | ObjectPattern | RestPattern;

  export interface Binding {
    target: BindingTarget;
    init?: Expression;
  }

  // --- Statements ---

  /**
   * Conceptual expansion of A0.BlockStmt.
   * - statements uses A1.Statement
   */
  export interface BlockStmt {
    type: "block";
    statements: Statement[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.IfStmt.
   * - test, consequent, alternate use A1 types
   */
  export interface IfStmt {
    type: "if";
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.WhileStmt.
   * - condition, body use A1 types
   */
  export interface WhileStmt {
    type: "while";
    condition: Expression;
    body: Statement;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.LetStarExpr.
   * - bindings uses A1.Binding (supports patterns)
   * - body uses A1.Statement
   */
  export interface LetStarExpr {
    type: "let*";
    isConst: boolean;
    bindings: Binding[];
    body: Statement[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ForClassic.
   * - init, condition, update, body use A1 types
   */
  export interface ForClassic {
    type: "for-classic";
    init?: Statement;
    condition?: Expression;
    update?: Expression;
    body: Statement;
    label?: string;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ForOf.
   * - binding uses A1.Binding (supports patterns)
   * - iterable, body use A1 types
   */
  export interface ForOf {
    type: "for-of";
    binding: Binding;
    iterable: Expression;
    body: Statement;
    label?: string;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ForAwait.
   * - binding uses A1.Binding (supports patterns)
   * - iterable, body use A1 types
   */
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

  /**
   * Conceptual expansion of A0.SwitchStmt.
   * - discriminant, cases use A1 types
   */
  export interface SwitchStmt {
    type: "switch";
    discriminant: Expression;
    cases: SwitchCase[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.AssignExpr.
   * - target, value use A1 types
   */
  export interface AssignExpr {
    type: "assign";
    target: Expression;
    value: Expression;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ReturnExpr with:
   * - typeId for type tracking
   * - value uses A1.Expression
   */
  export interface ReturnExpr {
    type: "return";
    value?: Expression;
    typeId?: number;
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

  /**
   * Conceptual expansion of A0.ExprStmt with:
   * - typeId for type tracking
   * - expr uses A1.Expression
   */
  export interface ExprStmt {
    type: "exprStmt";
    expr: Expression;
    typeId?: number;
    span: Span;
  }

  // --- Expressions ---

  /**
   * Conceptual expansion of A0.CallExpr.
   * - callee, args use A1 types
   */
  export interface CallExpr {
    type: "call";
    callee: Expression;
    args: Expression[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.PropExpr with:
   * - maybeNull for optional chaining
   * - object uses A1.Expression
   */
  export interface PropExpr {
    type: "prop";
    object: Expression;
    name: string;
    maybeNull: boolean;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.IndexExpr with:
   * - maybeNull for optional chaining
   * - object, index use A1.Expression
   */
  export interface IndexExpr {
    type: "index";
    object: Expression;
    index: Expression;
    maybeNull: boolean;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.NewExpr.
   * - callee, args use A1 types
   */
  export interface NewExpr {
    type: "new";
    callee: Expression;
    args: Expression[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ArrayExpr.
   * - elements uses A1.Expression
   */
  export interface ArrayExpr {
    type: "array";
    elements: Expression[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ObjectExpr.
   * - fields use A1.Expression
   */
  export interface ObjectExpr {
    type: "object";
    fields: { key: string; value: Expression }[];
    span: Span;
  }

  /**
   * Conceptual expansion of A0.ThrowExpr.
   * - argument uses A1.Expression
   */
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

  /**
   * Conceptual expansion of A0.TryCatchExpr.
   * - body, catchClause, finallyClause use A1 types
   * - catchClause.binding uses A1.Binding (supports patterns)
   */
  export interface TryCatchExpr {
    type: "try";
    body: Statement;
    catchClause?: CatchClause;
    finallyClause?: FinallyClause;
    span: Span;
  }

  /**
   * Conceptual expansion of A0.FnParam with:
   * - typeAnnotation for type annotations
   */
  export interface FnParam {
    name: Identifier;
    typeAnnotation?: TypeNode;
  }

  /**
   * Conceptual expansion of A0.FnSignature with:
   * - returnType for return type annotation
   * - parameters uses A1.FnParam
   */
  export interface FnSignature {
    parameters: FnParam[];
    returnType?: TypeNode;
  }

  /**
   * Conceptual expansion of A0.FunctionExpr with:
   * - typeParams for generic type parameters
   * - async, generator flags
   * - signature uses A1.FnSignature
   * - body uses A1.Statement
   */
  export interface FunctionExpr {
    type: "fn";
    signature: FnSignature;
    typeParams?: TypeParam[];
    body: Statement[];
    async?: boolean;
    generator?: boolean;
    span: Span;
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

  /**
   * Conceptual expansion of A0.ClassExpr with:
   * - decorators, extends, implements, constructor, staticBlocks
   * - body uses A1.ClassBody
   */
  export interface ClassExpr {
    type: "class";
    name?: Identifier;
    body: ClassBody;
    decorators?: Expression[];
    extends?: Expression | null;
    implements?: Expression[];
    constructor?: Statement | null;
    staticBlocks?: Statement[];
    span: Span;
  }

  // --- A1-only Expressions ---

  export interface SpreadExpr {
    type: "spread";
    expr: Expression;
    kind: "array" | "object" | "rest";
    span: Span;
  }

  export interface TernaryExpr {
    type: "ternary";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    span: Span;
  }

  export interface AwaitExpr {
    type: "await";
    argument: Expression;
    span: Span;
  }

  export interface YieldExpr {
    type: "yield";
    argument?: Expression | null;
    delegate: boolean;
    span: Span;
  }

  export interface TypeAssertExpr {
    type: "type-assert";
    expr: Expression;
    assertedType: TypeNode;
    span: Span;
  }

  // --- A1 Type System ---

  export interface TypeParam {
    type: "type-param";
    name: Identifier;
    variance?: "in" | "out";
    constraint?: TypeNode;
    defaultType?: TypeNode;
    span: Span;
  }

  export interface TypeField {
    type: "type-field";
    key: string;
    fieldType: TypeNode;
    span: Span;
  }

  export interface TypePrimitive {
    type: "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined";
    span: Span;
  }

  export interface TypeRef {
    type: "type-ref";
    identifier: Identifier;
    typeArgs?: TypeNode[];
    span: Span;
  }

  export interface TypeFunction {
    type: "type-function";
    typeParams?: TypeParam[];
    params: TypeNode[];
    returns: TypeNode;
    span: Span;
  }

  export interface TypeObject {
    type: "type-object";
    fields: TypeField[];
    span: Span;
  }

  export interface TypeUnion {
    type: "type-union";
    types: TypeNode[];
    span: Span;
  }

  export interface TypeIntersection {
    type: "type-intersection";
    types: TypeNode[];
    span: Span;
  }

  export interface TypeLiteral {
    type: "type-literal";
    value: Literal[];
    span: Span;
  }

  export interface TypeMapped {
    type: "type-mapped";
    typeParam: TypeParam;
    valueType: TypeNode;
    nameRemap?: TypeNode;
    readonlyModifier?: "readonly" | "-readonly";
    optionalModifier?: "optional" | "-optional";
    via?: TypeNode;
    span: Span;
  }

  export interface TypeApp {
    type: "type-app";
    expr: TypeNode;
    typeArgs: TypeNode[];
    span: Span;
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

  export interface ImportStmt {
    type: "import";
    spec: ImportSpec;
    span: Span;
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

  export interface ExportStmt {
    type: "export";
    spec: ExportSpec;
    span: Span;
  }

  export interface TypeAliasStmt {
    type: "type-alias";
    name: Identifier;
    typeParams?: TypeParam[];
    typeValue: TypeNode;
    span: Span;
  }

  export interface InterfaceBody {
    fields: TypeField[];
  }

  export interface InterfaceStmt {
    type: "type-interface";
    name: Identifier;
    body: InterfaceBody;
    span: Span;
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

  export interface Program {
    type: "program";
    body: Statement[];
    span: Span;
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
      switch (target.type) {
        case "identifier":
          registerIdentifier(target, isConst);
          break;
        case "array-pattern":
          for (const el of target.elements) resolveBindingTarget(el, isConst);
          if (target.rest) resolveBindingTarget(target.rest, isConst);
          break;
        case "object-pattern":
          for (const prop of target.properties) resolveBindingTarget(prop.target, isConst);
          if (target.rest) resolveBindingTarget(target.rest, isConst);
          break;
        case "rest":
          resolveBindingTarget(target.target, isConst);
          break;
      }
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

        // A1-only statements
        case "import":
          processImport(stmt);
          break;

        case "export":
          processExport(stmt);
          break;

        case "type-alias":
          processTypeAlias(stmt);
          break;

        case "type-interface":
          processInterface(stmt);
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

        case "class":
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

        // A1-only expressions
        case "spread":
          evaluateExpression(expr.expr);
          return expr;

        case "ternary":
          evaluateExpression(expr.test);
          evaluateExpression(expr.consequent);
          evaluateExpression(expr.alternate);
          return expr;

        case "await":
          evaluateExpression(expr.argument);
          return expr;

        case "yield":
          if (expr.argument) evaluateExpression(expr.argument);
          return expr;

        case "type-assert":
          evaluateExpression(expr.expr);
          evaluateType(expr.assertedType);
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
      switch (typeNode.type) {
        case "type-string":
        case "type-number":
        case "type-boolean":
        case "type-null":
        case "type-undefined":
        case "type-literal":
          // leaf nodes
          break;

        case "type-ref":
          if (typeNode.typeArgs) {
            for (const arg of typeNode.typeArgs) evaluateType(arg);
          }
          break;

        case "type-union":
        case "type-intersection":
          for (const t of typeNode.types) evaluateType(t);
          break;

        case "type-function":
          if (typeNode.typeParams) {
            for (const p of typeNode.typeParams) evaluateTypeParam(p);
          }
          for (const p of typeNode.params) evaluateType(p);
          evaluateType(typeNode.returns);
          break;

        case "type-object":
          for (const f of typeNode.fields) evaluateType(f.fieldType);
          break;

        case "type-mapped":
          evaluateTypeParam(typeNode.typeParam);
          evaluateType(typeNode.valueType);
          if (typeNode.nameRemap) evaluateType(typeNode.nameRemap);
          if (typeNode.via) evaluateType(typeNode.via);
          break;

        case "type-app":
          evaluateType(typeNode.expr);
          for (const a of typeNode.typeArgs) evaluateType(a);
          break;

        default: {
          const _exhaustive: never = typeNode;
          ctx.diagnostics.push({
            message: `Unknown type node: ${(typeNode as TypeNode).type}`,
            span: (typeNode as TypeNode).span,
          });
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
      evaluateType,
      declareBinding,
      run,
    };
  }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// A0 usage - core calculus only
const a0Ctx: A0.Context = { diagnostics: [], scopeStack: [] };
const a0Processor = A0.createProcessor(a0Ctx);
a0Processor.run(someA0Program);

// A1 usage - TypeScript features
const a1Ctx: A1.Context = { diagnostics: [], scopeStack: [] };
const a1Processor = A1.createProcessor(a1Ctx);
a1Processor.run(someA1Program);
*/
