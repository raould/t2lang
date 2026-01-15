/**
 * Macro Expander for T2 Phase 1
 * 
 * Implements Clojure-style macros with explicit gensym for hygiene.
 * 
 * The expander:
 * 1. Collects macro definitions from the program
 * 2. Walks the AST to find macro calls
 * 3. Expands them by substituting parameters and evaluating quote/unquote
 */

import {
  Program,
  Statement,
  Expr,
  Identifier,
  CallExpr,
  LetExpr,
  LetBinding,
  IfExpr,
  PropExpr,
  FunctionExpr,
  GensymExpr,
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
  MacroDef,
  QuoteExpr,
  UnquoteExpr,
  UnquoteSpliceExpr,
  SourceLocation
} from "../ast/nodes.js";
import { CompilerContext } from "../api.js";

interface MacroRegistry {
  macros: Map<string, MacroDef>;
}

export class MacroExpander {
  private registry: MacroRegistry = { macros: new Map() };
  private gensymCounter = 0;

  constructor(private readonly ctx: CompilerContext) {}

  /**
   * Generate a unique symbol name (like Clojure's gensym)
   */
  private generateSymbol(prefix: string = "G__"): string {
    return `${prefix}${++this.gensymCounter}`;
  }

  /**
   * Main entry point: expand all macros in a program
   */
  expandProgram(program: Program): Program {
    // First pass: collect all macro definitions
    this.collectMacros(program);

    // Second pass: expand macro calls
    const expandedBody = this.expandStatements(program.body);

    // Filter out macro definitions from output
    const filteredBody = expandedBody.filter(stmt => stmt.kind !== "defmacro");

    this.ctx.eventSink.emit({
      phase: "expand",
      kind: "macroExpansionDone",
      data: { macroCount: this.registry.macros.size }
    });

    return {
      ...program,
      body: filteredBody
    };
  }

  private collectMacros(program: Program): void {
    for (const stmt of program.body) {
      if (stmt.kind === "defmacro") {
        const macro = stmt as MacroDef;
        this.registry.macros.set(macro.name.name, macro);
        this.ctx.eventSink.emit({
          phase: "expand",
          kind: "macroRegistered",
          data: { name: macro.name.name, params: macro.params.map(p => p.name) }
        });
      }
    }
  }

  private expandStatements(stmts: Statement[]): Statement[] {
    const result: Statement[] = [];
    for (const stmt of stmts) {
      result.push(this.expandStatement(stmt));
    }
    return result;
  }

  private expandStatement(stmt: Statement): Statement {
    switch (stmt.kind) {
      case "exprStmt":
        return {
          ...stmt,
          expr: this.expandExpr(stmt.expr)
        };
      case "block":
        return {
          ...stmt,
          body: stmt.body.map(e => this.expandExpr(e))
        };
      case "let":
        return this.expandLet(stmt as LetExpr);
      case "defmacro":
        return stmt; // Keep as-is, will be filtered out later
      default:
        return stmt;
    }
  }

  private expandExpr(expr: Expr): Expr {
    switch (expr.kind) {
      case "call":
        return this.expandCall(expr as CallExpr);
      case "identifier":
        return expr;
      case "literal":
        return expr;
      case "let":
        return this.expandLet(expr as LetExpr);
      case "if":
        return this.expandIf(expr as IfExpr);
      case "prop":
        return this.expandProp(expr as PropExpr);
      case "function":
        return this.expandFunction(expr as FunctionExpr);
      case "gensym":
        return this.expandGensym(expr as GensymExpr);
      case "return":
        return this.expandReturn(expr as ReturnExpr);
      case "while":
        return this.expandWhile(expr as WhileExpr);
      case "array":
        return this.expandArray(expr as ArrayExpr);
      case "object":
        return this.expandObject(expr as ObjectExpr);
      case "assign":
        return this.expandAssign(expr as AssignExpr);
      case "for":
        return this.expandFor(expr as ForExpr);
      case "index":
        return this.expandIndex(expr as IndexExpr);
      case "new":
        return this.expandNew(expr as NewExpr);
      case "class":
        return this.expandClass(expr as ClassExpr);
      case "type-assert":
        return this.expandTypeAssert(expr as TypeAssertExpr);
      case "throw":
        return this.expandThrow(expr as ThrowExpr);
      case "try-catch":
        return this.expandTryCatch(expr as TryCatchExpr);
      case "block":
        return this.expandBlock(expr as BlockStmt);
      case "quote":
        // Quote returns its contents as-is (but gensyms are expanded)
        return this.expandQuotedExpr((expr as QuoteExpr).expr);
      case "unquote":
        // Unquote outside of quote context just expands its contents
        return this.expandExpr((expr as UnquoteExpr).expr);
      case "unquote-splice":
        // Unquote-splice outside of quote context just expands its contents
        return this.expandExpr((expr as UnquoteSpliceExpr).expr);
      default:
        return expr;
    }
  }

  /**
   * Expand a call expression, checking if it's a macro call
   */
  private expandCall(call: CallExpr): Expr {
    // First expand the callee and args
    const expandedCallee = this.expandExpr(call.callee);
    const expandedArgs = call.args.map(a => this.expandExpr(a));

    // Check if this is a macro call
    if (expandedCallee.kind === "identifier") {
      const name = (expandedCallee as Identifier).name;
      const macro = this.registry.macros.get(name);
      if (macro) {
        return this.expandMacroCall(macro, expandedArgs, call.location);
      }
    }

    return {
      ...call,
      callee: expandedCallee,
      args: expandedArgs
    };
  }

  /**
   * Expand a macro call by EVALUATING the macro body at compile time
   */
  private expandMacroCall(macro: MacroDef, args: Expr[], location: SourceLocation): Expr {
    // Build parameter -> argument mapping
    // Arguments are AST nodes (unevaluated code)
    const env = new Map<string, Expr>();
    for (let i = 0; i < macro.params.length; i++) {
      const param = macro.params[i];
      const arg = args[i] || { kind: "literal", value: null, location } as Expr;
      env.set(param.name, arg);
    }

    this.ctx.eventSink.emit({
      phase: "expand",
      kind: "macroExpanding",
      location,
      data: { name: macro.name.name, argCount: args.length }
    });

    // EVALUATE the macro body at compile time
    // Multiple body expressions: evaluate each, return last
    let result: Expr = { kind: "literal", value: null, location } as Expr;
    for (const bodyExpr of macro.body) {
      result = this.evalMacroExpr(bodyExpr, env);
    }

    // Recursively expand in case the result contains more macro calls
    return this.expandExpr(result);
  }

  /**
   * Evaluate an expression in the macro at compile time.
   * This is different from runtime evaluation - we're building AST.
   * 
   * - let*: Evaluate init expressions and extend environment
   * - gensym: Generate a unique identifier
   * - quote: Return the quoted AST with unquotes evaluated
   * - Parameters: Return the bound AST
   */
  private evalMacroExpr(expr: Expr, env: Map<string, Expr>): Expr {
    switch (expr.kind) {
      case "identifier": {
        const id = expr as Identifier;
        const bound = env.get(id.name);
        if (bound) {
          // Return a COPY to avoid mutation issues
          return this.cloneExpr(bound);
        }
        // Unknown identifier - keep as-is (might be a runtime reference)
        return expr;
      }
      case "literal":
        return expr;
      case "gensym":
        return this.expandGensym(expr as GensymExpr);
      case "quote":
        // Evaluate unquotes inside the quote
        return this.evalQuote((expr as QuoteExpr).expr, env);
      case "let": {
        const let_ = expr as LetExpr;
        // Create new environment with bindings
        const newEnv = new Map(env);
        for (const binding of let_.bindings) {
          const value = this.evalMacroExpr(binding.init, newEnv);
          newEnv.set(binding.name.name, value);
        }
        // Evaluate body in new environment
        let result: Expr = { kind: "literal", value: null, location: expr.location } as Expr;
        for (const bodyExpr of let_.body) {
          result = this.evalMacroExpr(bodyExpr, newEnv);
        }
        return result;
      }
      case "if": {
        // For compile-time if, we'd need to evaluate condition
        // For now, just substitute in all branches
        const if_ = expr as IfExpr;
        return {
          ...if_,
          condition: this.evalMacroExpr(if_.condition, env),
          thenBranch: this.evalMacroExpr(if_.thenBranch, env),
          elseBranch: if_.elseBranch ? this.evalMacroExpr(if_.elseBranch, env) : null
        };
      }
      case "call": {
        // Regular call - substitute in callee and args
        const call = expr as CallExpr;
        return {
          ...call,
          callee: this.evalMacroExpr(call.callee, env),
          args: call.args.map(a => this.evalMacroExpr(a, env))
        };
      }
      default:
        // For other expressions, recursively process
        return this.substituteAndExpand(expr, env);
    }
  }

  /**
   * Evaluate a quoted expression - process unquotes
   */
  private evalQuote(expr: Expr, env: Map<string, Expr>): Expr {
    switch (expr.kind) {
      case "unquote": {
        // Evaluate the unquoted expression
        const unquote = expr as UnquoteExpr;
        return this.evalMacroExpr(unquote.expr, env);
      }
      case "identifier":
        // Identifiers in quote are literal (not evaluated)
        return expr;
      case "literal":
        return expr;
      case "gensym":
        // Gensyms are evaluated even in quote
        return this.expandGensym(expr as GensymExpr);
      case "call": {
        const call = expr as CallExpr;
        // Recursively process for unquotes
        const processedCallee = this.evalQuote(call.callee, env);
        const processedArgs = call.args.map(a => this.evalQuote(a, env));
        // Now convert back to proper AST
        return this.convertQuotedToAst({
          ...call,
          callee: processedCallee,
          args: processedArgs
        });
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return {
          ...arr,
          elements: arr.elements.map(e => this.evalQuote(e, env))
        };
      }
      default:
        return expr;
    }
  }

  /**
   * Substitute parameters and handle quote/unquote
   */
  private substituteAndExpand(expr: Expr, bindings: Map<string, Expr>): Expr {
    switch (expr.kind) {
      case "identifier": {
        const id = expr as Identifier;
        const bound = bindings.get(id.name);
        if (bound) {
          return this.cloneExpr(bound);
        }
        return expr;
      }
      case "quote": {
        // Inside quote, expand unquotes and convert to proper AST
        const quoted = this.substituteInQuote((expr as QuoteExpr).expr, bindings);
        return this.convertQuotedToAst(quoted);
      }
      case "unquote":
        // Unquote: evaluate the expression with substitutions
        return this.substituteAndExpand((expr as UnquoteExpr).expr, bindings);
      case "gensym":
        return this.expandGensym(expr as GensymExpr);
      case "call": {
        const call = expr as CallExpr;
        return {
          ...call,
          callee: this.substituteAndExpand(call.callee, bindings),
          args: call.args.map(a => this.substituteAndExpand(a, bindings))
        };
      }
      case "let": {
        const let_ = expr as LetExpr;
        return {
          ...let_,
          bindings: let_.bindings.map(b => ({
            ...b,
            init: this.substituteAndExpand(b.init, bindings)
          })),
          body: let_.body.map(e => this.substituteAndExpand(e, bindings))
        };
      }
      case "if": {
        const if_ = expr as IfExpr;
        return {
          ...if_,
          condition: this.substituteAndExpand(if_.condition, bindings),
          thenBranch: this.substituteAndExpand(if_.thenBranch, bindings),
          elseBranch: if_.elseBranch ? this.substituteAndExpand(if_.elseBranch, bindings) : null
        };
      }
      case "prop": {
        const prop = expr as PropExpr;
        return {
          ...prop,
          object: this.substituteAndExpand(prop.object, bindings)
        };
      }
      case "function": {
        const fn = expr as FunctionExpr;
        // Don't substitute inside function params, but do in body
        return {
          ...fn,
          body: fn.body.map(e => this.substituteAndExpand(e, bindings))
        };
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return {
          ...arr,
          elements: arr.elements.map(e => this.substituteAndExpand(e, bindings))
        };
      }
      case "object": {
        const obj = expr as ObjectExpr;
        return {
          ...obj,
          fields: obj.fields.map(f => ({
            ...f,
            value: this.substituteAndExpand(f.value, bindings)
          }))
        };
      }
      case "block": {
        const block = expr as BlockStmt;
        return {
          ...block,
          body: block.body.map(e => this.substituteAndExpand(e, bindings))
        };
      }
      case "return": {
        const ret = expr as ReturnExpr;
        return {
          ...ret,
          value: ret.value ? this.substituteAndExpand(ret.value, bindings) : null
        };
      }
      case "while": {
        const while_ = expr as WhileExpr;
        return {
          ...while_,
          condition: this.substituteAndExpand(while_.condition, bindings),
          body: while_.body.map(e => this.substituteAndExpand(e, bindings))
        };
      }
      case "assign": {
        const assign = expr as AssignExpr;
        return {
          ...assign,
          target: this.substituteAndExpand(assign.target, bindings),
          value: this.substituteAndExpand(assign.value, bindings)
        };
      }
      case "index": {
        const index = expr as IndexExpr;
        return {
          ...index,
          object: this.substituteAndExpand(index.object, bindings),
          index: this.substituteAndExpand(index.index, bindings)
        };
      }
      case "new": {
        const new_ = expr as NewExpr;
        return {
          ...new_,
          callee: this.substituteAndExpand(new_.callee, bindings),
          args: new_.args.map(a => this.substituteAndExpand(a, bindings))
        };
      }
      case "throw": {
        const throw_ = expr as ThrowExpr;
        return {
          ...throw_,
          value: this.substituteAndExpand(throw_.value, bindings)
        };
      }
      case "type-assert": {
        const ta = expr as TypeAssertExpr;
        return {
          ...ta,
          expr: this.substituteAndExpand(ta.expr, bindings)
        };
      }
      default:
        return expr;
    }
  }

  /**
   * Handle quote: only expand unquotes inside
   */
  private substituteInQuote(expr: Expr, bindings: Map<string, Expr>): Expr {
    switch (expr.kind) {
      case "unquote":
        // Unquote inside quote: substitute and return
        return this.substituteAndExpand((expr as UnquoteExpr).expr, bindings);
      case "gensym":
        // Gensyms are always expanded
        return this.expandGensym(expr as GensymExpr);
      case "identifier":
        // Identifiers in quote are NOT substituted (they're literal)
        return expr;
      case "call": {
        const call = expr as CallExpr;
        return {
          ...call,
          callee: this.substituteInQuote(call.callee, bindings),
          args: call.args.map(a => this.substituteInQuote(a, bindings))
        };
      }
      case "let": {
        const let_ = expr as LetExpr;
        return {
          ...let_,
          bindings: let_.bindings.map(b => ({
            ...b,
            name: b.name, // Keep name as-is in quote
            init: this.substituteInQuote(b.init, bindings)
          })),
          body: let_.body.map(e => this.substituteInQuote(e, bindings))
        };
      }
      case "if": {
        const if_ = expr as IfExpr;
        return {
          ...if_,
          condition: this.substituteInQuote(if_.condition, bindings),
          thenBranch: this.substituteInQuote(if_.thenBranch, bindings),
          elseBranch: if_.elseBranch ? this.substituteInQuote(if_.elseBranch, bindings) : null
        };
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return {
          ...arr,
          elements: arr.elements.map(e => this.substituteInQuote(e, bindings))
        };
      }
      case "block": {
        const block = expr as BlockStmt;
        return {
          ...block,
          body: block.body.map(e => this.substituteInQuote(e, bindings))
        };
      }
      default:
        return expr;
    }
  }

  /**
   * Expand gensym to produce a unique identifier
   */
  private expandGensym(gensym: GensymExpr): Identifier {
    const name = gensym.generatedName || this.generateSymbol(gensym.prefix || "G__");
    return {
      kind: "identifier",
      name,
      location: gensym.location
    };
  }

  /**
   * Deep clone an expression (for safe substitution)
   */
  private cloneExpr(expr: Expr): Expr {
    return JSON.parse(JSON.stringify(expr));
  }

  /**
   * Convert a quoted call structure back to proper T2 AST.
   * 
   * Inside quote, special forms like let* are parsed as CallExpr.
   * This method converts them back to proper AST nodes.
   */
  private convertQuotedToAst(expr: Expr): Expr {
    if (expr.kind !== "call") {
      return expr;
    }

    const call = expr as CallExpr;
    
    // Check if the callee is an identifier (special form name)
    if (call.callee.kind !== "identifier") {
      // Nested call - convert args recursively
      return {
        ...call,
        callee: this.convertQuotedToAst(call.callee),
        args: call.args.map(a => this.convertQuotedToAst(a))
      };
    }

    const name = (call.callee as Identifier).name;

    switch (name) {
      case "let*":
      case "const":
        return this.convertQuotedLet(call, name === "const");
      case "if":
        return this.convertQuotedIf(call);
      case "block":
        return this.convertQuotedBlock(call);
      case "assign":
        return this.convertQuotedAssign(call);
      case "+":
      case "-":
      case "*":
      case "/":
      case "<":
      case ">":
      case "<=":
      case ">=":
      case "==":
      case "!=":
      case "===":
      case "!==":
      case "&&":
      case "||":
        return this.convertQuotedBinaryOp(call, name);
      default:
        // Regular function call - convert args
        return {
          ...call,
          args: call.args.map(a => this.convertQuotedToAst(a))
        };
    }
  }

  private convertQuotedLet(call: CallExpr, isConst: boolean): LetExpr {
    // (let* bindings body...)
    // bindings is first arg, rest are body
    const bindingsArg = call.args[0];
    const bodyArgs = call.args.slice(1);

    // bindings should be a call-like structure: (binding1 binding2 ...)
    // Each binding is: (name init)
    const bindings: LetBinding[] = [];
    
    if (bindingsArg && bindingsArg.kind === "call") {
      const bindingsCall = bindingsArg as CallExpr;
      // First element is the first binding (as callee)
      const firstBinding = this.parseBindingFromExpr(bindingsCall.callee);
      if (firstBinding) bindings.push(firstBinding);
      // Rest are in args
      for (const arg of bindingsCall.args) {
        const binding = this.parseBindingFromExpr(arg);
        if (binding) bindings.push(binding);
      }
    } else if (bindingsArg && bindingsArg.kind === "array") {
      // Empty bindings
    }

    return {
      kind: "let",
      bindings,
      body: bodyArgs.map(a => this.convertQuotedToAst(a)),
      isConst,
      location: call.location
    };
  }

  private parseBindingFromExpr(expr: Expr): LetBinding | null {
    // A binding is represented as (name init) -> CallExpr where callee is name, args[0] is init
    if (expr.kind === "call") {
      const call = expr as CallExpr;
      if (call.callee.kind === "identifier" && call.args.length >= 1) {
        return {
          name: call.callee as Identifier,
          init: this.convertQuotedToAst(call.args[0])
        };
      }
    }
    return null;
  }

  private convertQuotedIf(call: CallExpr): IfExpr {
    // (if condition then else?)
    return {
      kind: "if",
      condition: this.convertQuotedToAst(call.args[0]),
      thenBranch: call.args[1] ? this.convertQuotedToAst(call.args[1]) : { kind: "literal", value: null, location: call.location },
      elseBranch: call.args[2] ? this.convertQuotedToAst(call.args[2]) : null,
      location: call.location
    };
  }

  private convertQuotedBlock(call: CallExpr): BlockStmt {
    return {
      kind: "block",
      body: call.args.map(a => this.convertQuotedToAst(a)),
      location: call.location
    };
  }

  private convertQuotedAssign(call: CallExpr): AssignExpr {
    return {
      kind: "assign",
      target: this.convertQuotedToAst(call.args[0]),
      value: this.convertQuotedToAst(call.args[1]),
      location: call.location
    };
  }

  private convertQuotedBinaryOp(call: CallExpr, op: string): CallExpr {
    // Binary ops are represented as (op left right)
    // Return as CallExpr with identifier callee
    return {
      kind: "call",
      callee: { kind: "identifier", name: op, location: call.location },
      args: call.args.map(a => this.convertQuotedToAst(a)),
      location: call.location
    };
  }

  /**
   * Expand quoted expression (handles gensyms)
   */
  private expandQuotedExpr(expr: Expr): Expr {
    if (expr.kind === "gensym") {
      return this.expandGensym(expr as GensymExpr);
    }
    // For other expressions, recursively check for gensyms
    return this.walkAndExpandGensyms(expr);
  }

  private walkAndExpandGensyms(expr: Expr): Expr {
    switch (expr.kind) {
      case "gensym":
        return this.expandGensym(expr as GensymExpr);
      case "call": {
        const call = expr as CallExpr;
        return {
          ...call,
          callee: this.walkAndExpandGensyms(call.callee),
          args: call.args.map(a => this.walkAndExpandGensyms(a))
        };
      }
      case "let": {
        const let_ = expr as LetExpr;
        return {
          ...let_,
          bindings: let_.bindings.map(b => ({
            ...b,
            init: this.walkAndExpandGensyms(b.init)
          })),
          body: let_.body.map(e => this.walkAndExpandGensyms(e))
        };
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return {
          ...arr,
          elements: arr.elements.map(e => this.walkAndExpandGensyms(e))
        };
      }
      default:
        return expr;
    }
  }

  // Helper methods for expanding various expression types
  private expandLet(let_: LetExpr): LetExpr {
    return {
      ...let_,
      bindings: let_.bindings.map(b => ({
        ...b,
        init: this.expandExpr(b.init)
      })),
      body: let_.body.map(e => this.expandExpr(e))
    };
  }

  private expandIf(if_: IfExpr): IfExpr {
    return {
      ...if_,
      condition: this.expandExpr(if_.condition),
      thenBranch: this.expandExpr(if_.thenBranch),
      elseBranch: if_.elseBranch ? this.expandExpr(if_.elseBranch) : null
    };
  }

  private expandProp(prop: PropExpr): PropExpr {
    return {
      ...prop,
      object: this.expandExpr(prop.object)
    };
  }

  private expandFunction(fn: FunctionExpr): FunctionExpr {
    return {
      ...fn,
      body: fn.body.map(e => this.expandExpr(e))
    };
  }

  private expandReturn(ret: ReturnExpr): ReturnExpr {
    return {
      ...ret,
      value: ret.value ? this.expandExpr(ret.value) : null
    };
  }

  private expandWhile(while_: WhileExpr): WhileExpr {
    return {
      ...while_,
      condition: this.expandExpr(while_.condition),
      body: while_.body.map(e => this.expandExpr(e))
    };
  }

  private expandArray(arr: ArrayExpr): ArrayExpr {
    return {
      ...arr,
      elements: arr.elements.map(e => this.expandExpr(e))
    };
  }

  private expandObject(obj: ObjectExpr): ObjectExpr {
    return {
      ...obj,
      fields: obj.fields.map(f => ({
        ...f,
        value: this.expandExpr(f.value)
      }))
    };
  }

  private expandAssign(assign: AssignExpr): AssignExpr {
    return {
      ...assign,
      target: this.expandExpr(assign.target),
      value: this.expandExpr(assign.value)
    };
  }

  private expandFor(for_: ForExpr): ForExpr {
    return {
      ...for_,
      init: for_.init ? this.expandExpr(for_.init) : null,
      condition: for_.condition ? this.expandExpr(for_.condition) : null,
      update: for_.update ? this.expandExpr(for_.update) : null,
      body: for_.body.map(e => this.expandExpr(e))
    };
  }

  private expandIndex(index: IndexExpr): IndexExpr {
    return {
      ...index,
      object: this.expandExpr(index.object),
      index: this.expandExpr(index.index)
    };
  }

  private expandNew(new_: NewExpr): NewExpr {
    return {
      ...new_,
      callee: this.expandExpr(new_.callee),
      args: new_.args.map(a => this.expandExpr(a))
    };
  }

  private expandClass(class_: ClassExpr): ClassExpr {
    return {
      ...class_,
      fields: class_.fields.map(f => ({
        ...f,
        initializer: f.initializer ? this.expandExpr(f.initializer) : null
      })),
      methods: class_.methods.map(m => ({
        ...m,
        body: m.body.map(e => this.expandExpr(e))
      }))
    };
  }

  private expandTypeAssert(ta: TypeAssertExpr): TypeAssertExpr {
    return {
      ...ta,
      expr: this.expandExpr(ta.expr)
    };
  }

  private expandThrow(throw_: ThrowExpr): ThrowExpr {
    return {
      ...throw_,
      value: this.expandExpr(throw_.value)
    };
  }

  private expandTryCatch(tc: TryCatchExpr): TryCatchExpr {
    return {
      ...tc,
      tryBody: tc.tryBody.map(e => this.expandExpr(e)),
      catchBody: tc.catchBody.map(e => this.expandExpr(e)),
      finallyBody: tc.finallyBody.map(e => this.expandExpr(e))
    };
  }

  private expandBlock(block: BlockStmt): BlockStmt {
    return {
      ...block,
      body: block.body.map(e => this.expandExpr(e))
    };
  }
}
