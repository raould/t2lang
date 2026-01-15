import {
  Program,
  Statement,
  Expr,
  Identifier,
  CallExpr,
  LetExpr,
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
  BlockStmt,
  MacroDef
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

export class Resolver {
  private nextSymbolId = 1;
  private globalScope: Scope = { parent: null, symbols: new Map() };

  constructor(private readonly ctx: CompilerContext) {}

  resolveProgram(program: Program): void {
    this.resolveStatements(program.body, this.globalScope);
    this.ctx.eventSink.emit({
      phase: "resolve",
      kind: "resolveDump",
      data: { ast: program }
    });
  }

  private resolveStatements(stmts: Statement[], scope: Scope): void {
    for (const stmt of stmts) {
      if (stmt.kind === "exprStmt") {
        this.resolveExpr(stmt.expr, scope);
      } else if (stmt.kind === "block") {
        const child = this.createScope(scope);
        for (const expr of stmt.body) {
          this.resolveExpr(expr, child);
        }
      } else if (stmt.kind === "let") {
        this.resolveLet(stmt as LetExpr, scope);
      } else if (stmt.kind === "defmacro") {
        this.resolveMacroDef(stmt as MacroDef, scope);
      } else if (stmt.kind === "import" || stmt.kind === "export") {
        // No symbol resolution required for module declarations yet.
      }
    }
  }

  private resolveExpr(expr: Expr, scope: Scope): void {
    switch (expr.kind) {
      case "identifier":
        this.resolveIdentifier(expr as Identifier, scope);
        break;
      case "literal":
        break;
      case "call":
        this.resolveCall(expr as CallExpr, scope);
        break;
      case "let":
        this.resolveLet(expr as LetExpr, scope);
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
      case "gensym":
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

  private resolveBlock(node: BlockStmt, scope: Scope): void {
    const child = this.createScope(scope);
    for (const expr of node.body) {
      this.resolveExpr(expr, child);
    }
  }

  private resolveIdentifier(node: Identifier, scope: Scope): void {
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

  private resolveCall(node: CallExpr, scope: Scope): void {
    this.resolveExpr(node.callee, scope);
    for (const arg of node.args) {
      this.resolveExpr(arg, scope);
    }
  }

  private resolveIf(node: IfExpr, scope: Scope): void {
    this.resolveExpr(node.condition, scope);
    this.resolveExpr(node.thenBranch, scope);
    if (node.elseBranch !== null) {
      this.resolveExpr(node.elseBranch, scope);
    }
  }

  private resolveProp(node: PropExpr, scope: Scope): void {
    this.resolveExpr(node.object, scope);
    // Property name is a string literal, no resolution needed
  }

  private resolveFunction(node: FunctionExpr, scope: Scope): void {
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

  private resolveMacroDef(node: MacroDef, scope: Scope): void {
    // Create a new scope for the macro body
    const macroScope = this.createScope(scope);
    
    // Add parameters to macro scope
    for (const param of node.params) {
      const sym = this.createSymbol(param.name, macroScope);
      param.symbolId = sym.id;
    }
    
    // Resolve body in macro scope
    for (const expr of node.body) {
      this.resolveExpr(expr, macroScope);
    }
  }

  private resolveReturn(node: ReturnExpr, scope: Scope): void {
    if (node.value !== null) {
      this.resolveExpr(node.value, scope);
    }
  }

  private resolveWhile(node: WhileExpr, scope: Scope): void {
    this.resolveExpr(node.condition, scope);
    for (const expr of node.body) {
      this.resolveExpr(expr, scope);
    }
  }

  private resolveArray(node: ArrayExpr, scope: Scope): void {
    for (const elem of node.elements) {
      this.resolveExpr(elem, scope);
    }
  }

  private resolveObject(node: ObjectExpr, scope: Scope): void {
    for (const field of node.fields) {
      this.resolveExpr(field.value, scope);
    }
  }

  private resolveAssign(node: AssignExpr, scope: Scope): void {
    this.resolveExpr(node.target, scope);
    this.resolveExpr(node.value, scope);
  }

  private resolveFor(node: ForExpr, scope: Scope): void {
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

  private resolveIndex(node: IndexExpr, scope: Scope): void {
    this.resolveExpr(node.object, scope);
    this.resolveExpr(node.index, scope);
  }

  private resolveNew(node: NewExpr, scope: Scope): void {
    this.resolveExpr(node.callee, scope);
    for (const arg of node.args) {
      this.resolveExpr(arg, scope);
    }
  }

  private resolveClass(node: ClassExpr, scope: Scope): void {
    // Add class name to scope
    const sym = this.createSymbol(node.name.name, scope);
    node.name.symbolId = sym.id;
    
    // Resolve superclass if present
    if (node.superclass !== null) {
      this.resolveIdentifier(node.superclass, scope);
    }
    
    // Resolve field initializers
    for (const field of node.fields) {
      if (field.initializer !== null) {
        this.resolveExpr(field.initializer, scope);
      }
    }
    
    // Resolve method bodies
    for (const method of node.methods) {
      const methodScope = this.createScope(scope);
      for (const param of method.params) {
        const paramSym = this.createSymbol(param.name, methodScope);
        param.symbolId = paramSym.id;
      }
      for (const expr of method.body) {
        this.resolveExpr(expr, methodScope);
      }
    }
  }

  private resolveTypeAssert(node: TypeAssertExpr, scope: Scope): void {
    this.resolveExpr(node.expr, scope);
  }

  private resolveThrow(node: ThrowExpr, scope: Scope): void {
    this.resolveExpr(node.value, scope);
  }

  private resolveTryCatch(node: TryCatchExpr, scope: Scope): void {
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

  private resolveLet(node: LetExpr, scope: Scope): void {
    const child = this.createScope(scope);

    // Phase 0: all let bindings are sequential (like let*)
    // Each binding can see earlier bindings
    // Parallel let semantics can be added in Phase 1
    for (const binding of node.bindings) {
      this.resolveExpr(binding.init, child);
      const sym = this.createSymbol(binding.name.name, child);
      binding.name.symbolId = sym.id;
    }

    for (const expr of node.body) {
      this.resolveExpr(expr, child);
    }
  }

  private createScope(parent: Scope): Scope {
    return { parent, symbols: new Map() };
  }

  private createSymbol(name: string, scope: Scope): ResolvedSymbol {
    const sym: ResolvedSymbol = { id: this.nextSymbolId++, name };
    scope.symbols.set(name, sym);
    this.ctx.eventSink.emit({
      phase: "resolve",
      kind: "symbolCreated",
      data: { name, symbolId: sym.id }
    });
    return sym;
  }

  private lookup(scope: Scope, name: string): ResolvedSymbol | null {
    let s: Scope | null = scope;
    while (s) {
      const sym = s.symbols.get(name);
      if (sym) return sym;
      s = s.parent;
    }
    return null;
  }
}
