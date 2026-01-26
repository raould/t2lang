import {
  Program,
  Statement,
  Expr,
  Identifier,
  CallExpr,
  LetStarExpr,
  IfExpr,
  PropExpr,
  FunctionExpr,
  ReturnExpr,
  WhileExpr,
  ArrayExpr,
  ObjectExpr,
  AssignExpr,
  ForExpr,
  IndexExpr,
  NewExpr,
  ClassExpr,
  TypeAssertExpr,
  ThrowExpr,
  TryCatchExpr,
  BlockStmt
} from "../ast/nodes.js";
import { CompilerContext } from "../api.js";

interface ResolvedSymbol {
  id: number;
  name: string;
}

interface Scope {
  parent: Scope | null;
  symbols: Map<string, ResolvedSymbol>;
}

export class ResolverBase {
  protected nextSymbolId = 1;
  protected globalScope: Scope = { parent: null, symbols: new Map() };

  constructor(protected readonly ctx: CompilerContext) { }

  resolveProgram(program: Program): void {
    this.resolveStatements(program.body, this.globalScope);
    this.ctx.eventSink.emit({
      phase: "resolve",
      kind: "resolveDump",
      data: { ast: program }
    });
  }

  protected resolveStatements(stmts: Statement[], scope: Scope): void {
    for (const stmt of stmts) {
      if (stmt.kind === "exprStmt") {
        this.resolveExpr(stmt.expr, scope);
      } else if (stmt.kind === "block") {
        const child = this.createScope(scope);
        for (const expr of stmt.body) {
          this.resolveExpr(expr, child);
        }
      } else if (stmt.kind === "let*") {
        this.resolveLetStar(stmt as LetStarExpr, scope);
      } else if (stmt.kind === "import" || stmt.kind === "export") {
        // No symbol resolution required for module declarations yet.
      }
    }
  }

  protected resolveExpr(expr: Expr, scope: Scope): void {
    switch (expr.kind) {
      case "identifier":
        this.resolveIdentifier(expr as Identifier, scope);
        break;
      case "literal":
        break;
      case "call":
        this.resolveCall(expr as CallExpr, scope);
        break;
      case "let*":
        this.resolveLetStar(expr as LetStarExpr, scope);
        break;
      case "if":
        this.resolveIf(expr as IfExpr, scope);
        break;
      case "prop":
        this.resolveProp(expr as PropExpr, scope);
        break;
      case "function":
        this.resolveFunction(expr as FunctionExpr, scope);
        break;
      case "return":
        this.resolveReturn(expr as ReturnExpr, scope);
        break;
      case "while":
        this.resolveWhile(expr as WhileExpr, scope);
        break;
      case "array":
        this.resolveArray(expr as ArrayExpr, scope);
        break;
      case "object":
        this.resolveObject(expr as ObjectExpr, scope);
        break;
      case "assign":
        this.resolveAssign(expr as AssignExpr, scope);
        break;
      case "for":
        this.resolveFor(expr as ForExpr, scope);
        break;
      case "index":
        this.resolveIndex(expr as IndexExpr, scope);
        break;
      case "new":
        this.resolveNew(expr as NewExpr, scope);
        break;
      case "class":
        this.resolveClass(expr as ClassExpr, scope);
        break;
      case "type-assert":
        this.resolveTypeAssert(expr as TypeAssertExpr, scope);
        break;
      case "throw":
        this.resolveThrow(expr as ThrowExpr, scope);
        break;
      case "try-catch":
        this.resolveTryCatch(expr as TryCatchExpr, scope);
        break;
      case "block":
        this.resolveBlock(expr as BlockStmt, scope);
        break;
    }
  }

  protected resolveBlock(node: BlockStmt, scope: Scope): void {
    const child = this.createScope(scope);
    for (const expr of node.body) {
      this.resolveExpr(expr, child);
    }
  }

  protected resolveIdentifier(node: Identifier, scope: Scope): void {
    if (node.name === "this") {
      return;
    }
    let sym = this.lookup(scope, node.name);
    if (!sym) {
      this.ctx.eventSink.emit({
        phase: "resolve",
        kind: "unresolvedIdentifier",
        location: node.location,
        data: { name: node.name }
      });
      sym = this.createSymbol(node.name, scope);
    }
    node.symbolId = sym.id;
    this.ctx.eventSink.emit({
      phase: "resolve",
      kind: "identifierResolved",
      location: node.location,
      data: { name: node.name, symbolId: sym.id }
    });
  }

  protected resolveCall(node: CallExpr, scope: Scope): void {
    this.resolveExpr(node.callee, scope);
    for (const arg of node.args) {
      this.resolveExpr(arg, scope);
    }
  }

  protected resolveIf(node: IfExpr, scope: Scope): void {
    this.resolveExpr(node.condition, scope);
    this.resolveExpr(node.thenBranch, scope);
    if (node.elseBranch !== null) {
      this.resolveExpr(node.elseBranch, scope);
    }
  }

  protected resolveProp(node: PropExpr, scope: Scope): void {
    this.resolveExpr(node.object, scope);
    // Property name is a string literal, no resolution needed
  }

  protected resolveFunction(node: FunctionExpr, scope: Scope): void {
    // Create a new scope for the function body
    const fnScope = this.createScope(scope);

    // If named function, add name to appropriate scope
    if (node.name !== null) {
      if (node.isDeclaration) {
        // Function declaration: hoist to outer scope
        const sym = this.createSymbol(node.name.name, scope);
        node.name.symbolId = sym.id;
      } else {
        // Named function expression: add to inner scope
        const sym = this.createSymbol(node.name.name, fnScope);
        node.name.symbolId = sym.id;
      }
    }

    // Add parameters to function scope
    for (const param of node.params) {
      const sym = this.createSymbol(param.name, fnScope);
      param.symbolId = sym.id;
    }

    // Resolve body in function scope
    for (const expr of node.body) {
      this.resolveExpr(expr, fnScope);
    }
  }

  protected resolveReturn(node: ReturnExpr, scope: Scope): void {
    if (node.value !== null) {
      this.resolveExpr(node.value, scope);
    }
  }

  protected resolveWhile(node: WhileExpr, scope: Scope): void {
    this.resolveExpr(node.condition, scope);
    for (const expr of node.body) {
      this.resolveExpr(expr, scope);
    }
  }

  protected resolveArray(node: ArrayExpr, scope: Scope): void {
    for (const elem of node.elements) {
      this.resolveExpr(elem, scope);
    }
  }

  protected resolveObject(node: ObjectExpr, scope: Scope): void {
    for (const field of node.fields) {
      this.resolveExpr(field.value, scope);
    }
  }

  protected resolveAssign(node: AssignExpr, scope: Scope): void {
    this.resolveExpr(node.target, scope);
    this.resolveExpr(node.value, scope);
  }

  protected resolveFor(node: ForExpr, scope: Scope): void {
    if (node.init !== null) {
      this.resolveExpr(node.init, scope);
    }
    if (node.condition !== null) {
      this.resolveExpr(node.condition, scope);
    }
    if (node.update !== null) {
      this.resolveExpr(node.update, scope);
    }
    for (const expr of node.body) {
      this.resolveExpr(expr, scope);
    }
  }

  protected resolveIndex(node: IndexExpr, scope: Scope): void {
    this.resolveExpr(node.object, scope);
    this.resolveExpr(node.index, scope);
  }

  protected resolveNew(node: NewExpr, scope: Scope): void {
    this.resolveExpr(node.callee, scope);
    for (const arg of node.args) {
      this.resolveExpr(arg, scope);
    }
  }

  protected resolveClass(node: ClassExpr, scope: Scope): void {
    // Add class name to scope
    const sym = this.createSymbol(node.name.name, scope);
    node.name.symbolId = sym.id;

    // Resolve superclass if present
    if (node.superclass !== null) {
      this.resolveIdentifier(node.superclass, scope);
    }
    // Create a class-local scope so that fields and static members
    // can be referenced from method bodies and static initializers.
    const classScope = this.createScope(scope);

    // Register field names in class scope and resolve initializers.
    for (const field of node.fields) {
      this.createSymbol(field.name, classScope);
      // Resolve initializer: static initializers resolve in class scope,
      // instance initializers resolve in outer scope (they may reference
      // constructor params or outer bindings).
      if (field.initializer !== null) {
        if ((field as any).isStatic) {
          this.resolveExpr(field.initializer, classScope);
        } else {
          this.resolveExpr(field.initializer, scope);
        }
      }
    }

    // Resolve method bodies with classScope as their parent so methods can
    // see class-level symbols (including static fields) if needed.
    for (const method of node.methods) {
      const methodScope = this.createScope(classScope);
      for (const param of method.params) {
        const paramSym = this.createSymbol(param.name, methodScope);
        param.symbolId = paramSym.id;
      }
      for (const expr of method.body) {
        this.resolveExpr(expr, methodScope);
      }
    }
  }

  protected resolveTypeAssert(node: TypeAssertExpr, scope: Scope): void {
    this.resolveExpr(node.expr, scope);
  }

  protected resolveThrow(node: ThrowExpr, scope: Scope): void {
    this.resolveExpr(node.value, scope);
  }

  protected resolveTryCatch(node: TryCatchExpr, scope: Scope): void {
    for (const expr of node.tryBody) {
      this.resolveExpr(expr, scope);
    }

    const catchScope = this.createScope(scope);
    if (node.catchParam !== null) {
      const sym = this.createSymbol(node.catchParam.name, catchScope);
      node.catchParam.symbolId = sym.id;
    }
    for (const expr of node.catchBody) {
      this.resolveExpr(expr, catchScope);
    }

    for (const expr of node.finallyBody) {
      this.resolveExpr(expr, scope);
    }
  }

  protected resolveLetStar(node: LetStarExpr, scope: Scope): void {
    const child = this.createScope(scope);
    // Phase 0: all let* bindings are sequential
    for (const binding of node.bindings) {
      this.resolveExpr(binding.init, child);
      const sym = this.createSymbol(binding.name.name, child);
      binding.name.symbolId = sym.id;
    }
    for (const expr of node.body) {
      this.resolveExpr(expr, child);
    }
  }

  protected createScope(parent: Scope): Scope {
    return { parent, symbols: new Map() };
  }

  protected createSymbol(name: string, scope: Scope): ResolvedSymbol {
    const sym: ResolvedSymbol = { id: this.nextSymbolId++, name };
    scope.symbols.set(name, sym);
    this.ctx.eventSink.emit({
      phase: "resolve",
      kind: "symbolCreated",
      data: { name, symbolId: sym.id }
    });
    return sym;
  }

  protected lookup(scope: Scope, name: string): ResolvedSymbol | null {
    let s: Scope | null = scope;
    while (s) {
      const sym = s.symbols.get(name);
      if (sym) return sym;
      s = s.parent;
    }
    return null;
  }
}

// Keep default Resolver export for Phase0 compatibility
export class Resolver extends ResolverBase { }
