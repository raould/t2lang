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
  Phase0Statement,
  Phase0Expr,
  Identifier,
  CallExpr,
  LetStarExpr,
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
  LiteralExpr,
  SourceLocation
} from "../ast/nodes.js";

// Return type of the expander is a Phase0 Program (AST normalized to Phase0 shape)
import type { Phase0Program } from "../ast/nodes.js";
import { CompilerContext } from "../api.js";
import { GensymGenerator, QuotedToAstConverter, Substitutor } from "t2lang-phase0";

interface MacroRegistry {
  macros: Map<string, MacroDef>;
}

// Internal splice marker used during quote evaluation. This is not part of the
// public AST but helps the expander represent unquote-splice results until they
// are converted back into multiple AST nodes by convertQuotedToAst.
interface SpliceMarker {
  kind: "__splice";
  items: Expr[];
  location: SourceLocation;
}

export class MacroExpander {
  private registry: MacroRegistry = { macros: new Map() };
  // Use shared gensym generator from Phase0 to centralize gensym behavior
  private gensymGen = new GensymGenerator();
  private quotedConverter: QuotedToAstConverter;

  constructor(private readonly ctx: CompilerContext) {
    this.quotedConverter = new QuotedToAstConverter();
  }

  /**
   * Public helper: perform one-step macro expansion on a form.
   * If `expr` is a macro call, evaluate the macro body once and return
   * the raw expansion result (do not recursively macro-expand the result).
   */
  public macroexpand1(expr: Expr): Expr {
    if (expr.kind !== 'call') return expr;
    const call = expr as CallExpr;
    // Only consider simple identifier callees for macroexpand-1
    if (call.callee.kind !== 'identifier') return expr;
    const name = (call.callee as Identifier).name;
    const macro = this.registry.macros.get(name);
    if (!macro) return expr;

    // Build env mapping params -> raw arg ASTs (no expansion)
    const env = new Map<string, Expr>();
    for (let i = 0; i < macro.params.length; i++) {
      const param = macro.params[i];
      const arg = call.args[i] || ({ kind: 'literal', value: null, location: call.location } as Expr);
      env.set(param.name, arg);
    }

    // Evaluate macro body expressions in this env, returning the last value
    let result: Expr = { kind: 'literal', value: null, location: call.location } as Expr;
    for (const bodyExpr of macro.body) {
      result = this.evalMacroExpr(bodyExpr, env);
    }
    return result;
  }

  /**
   * Public helper: fully macro-expand a form until steady-state.
   * Delegates to the internal expander which already performs recursive expansion.
   */
  public macroexpand(expr: Expr): Expr {
    return this.expandExpr(expr);
  }


  /**
   * Generate a unique symbol name (like Clojure's gensym)
   */
  // Gensym generation delegated to Phase0's GensymGenerator


  /**
   * Main entry point: expand all macros in a program
   */
  expandProgram(program: Program): Phase0Program {
    // First pass: collect all macro definitions
    this.collectMacros(program);

    // Second pass: expand macro calls
    // First, convert legacy call-style defmacro expressions (exprStmt with a call to `defmacro`)
    // into proper MacroDef statements so subsequent passes can handle them uniformly.
    const preprocessedBody: Statement[] = program.body.map(stmt => {
      if (stmt.kind === "exprStmt" && stmt.expr.kind === "call") {
        const call = stmt.expr as CallExpr;
        if (call.callee.kind === "identifier" && (call.callee as Identifier).name === "defmacro") {
          const nameArg = call.args[0];
          const paramsArg = call.args[1];
          const bodyArgs = call.args.slice(2);
          if (nameArg && nameArg.kind === "identifier") {
            const nameId = nameArg as Identifier;
            const params: Identifier[] = [];
            if (paramsArg && paramsArg.kind === "call") {
              const paramsCall = paramsArg as CallExpr;
              if (paramsCall.callee && paramsCall.callee.kind === "identifier") params.push(paramsCall.callee as Identifier);
              for (const p of paramsCall.args) {
                if (p.kind === "identifier") params.push(p as Identifier);
              }
            }
            return { kind: "defmacro", name: nameId, params, body: bodyArgs, location: stmt.location } as MacroDef;
          }
        }
      }
      return stmt;
    });

    const expandedBody = this.expandStatements(preprocessedBody);

    // Filter out macro definitions from output. Also remove legacy-style defmacro
    // represented as an exprStmt whose expr is a call to `defmacro`.
    const filteredBody = expandedBody.filter(stmt => {
      if (stmt.kind === "defmacro") return false;
      if (stmt.kind === "exprStmt" && (stmt as any).expr && ((stmt as any).expr.kind === "defmacro")) return false;
      if (stmt.kind === "exprStmt" && stmt.expr.kind === "call") {
        const call = stmt.expr as CallExpr;
        if (call.callee.kind === "identifier" && (call.callee as Identifier).name === "defmacro") return false;
      }
      return true;
    });

    // Normalize output to Phase0-compatible nodes (remove gensym nodes)
    const normalizedBody: Phase0Statement[] = filteredBody.map(stmt => this.normalizeStatement(stmt));

    // Normalize any type nodes within the normalized body so `type-object`
    // ergonomic forms are canonicalized everywhere (not just top-level
    // type-alias statements).
    this.normalizeTypesInProgram(normalizedBody);

    this.ctx.eventSink.emit({
      phase: "expand",
      kind: "macroExpansionDone",
      data: { macroCount: this.registry.macros.size }
    });

    // The normalized body conforms to the Phase0 AST shape; cast to Phase0Program for the public API
    return ({
      ...program,
      body: normalizedBody
    } as unknown) as Phase0Program;
  }

  /**
   * Normalize statements to remove macro-only nodes (gensym -> identifier) so
   * the output Program is Phase0-compatible.
   */
  private normalizeStatement(stmt: Statement): Phase0Statement {
    switch (stmt.kind) {
      case "exprStmt":
        return { ...stmt, expr: this.normalizeExpr(stmt.expr) } as Phase0Statement;
      case "block":
        return { ...stmt, body: stmt.body.map(e => this.normalizeExpr(e)) } as Phase0Statement;
      case "let*":
        return {
          ...stmt,
          bindings: stmt.bindings.map(b => ({ ...b, init: this.normalizeExpr(b.init) })),
          body: stmt.body.map(e => this.normalizeExpr(e))
        } as Phase0Statement;
      // defmacro should already be filtered out
      default:
        return stmt as Phase0Statement;
    }
  }

  private normalizeExpr(expr: Expr): Phase0Expr {
    switch (expr.kind) {
      case "gensym":
        return this.expandGensym(expr as GensymExpr) as Phase0Expr;
      case "call": {
        const call = expr as CallExpr;
        return {
          ...call,
          callee: this.normalizeExpr(call.callee),
          args: call.args.map(a => this.normalizeExpr(a))
        } as Phase0Expr;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        return {
          ...let_,
          bindings: let_.bindings.map(b => ({ ...b, init: this.normalizeExpr(b.init) })),
          body: let_.body.map(e => this.normalizeExpr(e))
        };
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return { ...arr, elements: arr.elements.map(e => this.normalizeExpr(e)) };
      }
      case "object": {
        const obj = expr as ObjectExpr;
        return { ...obj, fields: obj.fields.map(f => ({ ...f, value: this.normalizeExpr(f.value) })) };
      }
      case "block": {
        const block = expr as BlockStmt;
        return { ...block, body: block.body.map(e => this.normalizeExpr(e)) };
      }
      case "if": {
        const if_ = expr as IfExpr;
        return {
          ...if_,
          condition: this.normalizeExpr(if_.condition),
          thenBranch: this.normalizeExpr(if_.thenBranch),
          elseBranch: if_.elseBranch ? this.normalizeExpr(if_.elseBranch) : null
        };
      }
      case "prop": {
        const prop = expr as PropExpr;
        return { ...prop, object: this.normalizeExpr(prop.object) };
      }
      case "function": {
        const fn = expr as FunctionExpr;
        return { ...fn, body: fn.body.map(e => this.normalizeExpr(e)) };
      }
      case "return": {
        const ret = expr as ReturnExpr;
        return { ...ret, value: ret.value ? this.normalizeExpr(ret.value) : null };
      }
      case "while": {
        const w = expr as WhileExpr;
        return { ...w, condition: this.normalizeExpr(w.condition), body: w.body.map(e => this.normalizeExpr(e)) };
      }
      case "assign": {
        const a = expr as AssignExpr;
        return { ...a, target: this.normalizeExpr(a.target), value: this.normalizeExpr(a.value) };
      }
      case "index": {
        const idx = expr as IndexExpr;
        return { ...idx, object: this.normalizeExpr(idx.object), index: this.normalizeExpr(idx.index) };
      }
      case "new": {
        const n = expr as NewExpr;
        return { ...n, callee: this.normalizeExpr(n.callee), args: n.args.map(a => this.normalizeExpr(a)) };
      }
      case "class": {
        const c = expr as ClassExpr;
        return {
          ...c,
          fields: c.fields.map(f => ({ ...f, initializer: f.initializer ? this.normalizeExpr(f.initializer) : null })),
          methods: c.methods.map(m => ({ ...m, body: m.body.map(e => this.normalizeExpr(e)) }))
        };
      }
      case "type-assert": {
        const ta = expr as TypeAssertExpr;
        return { ...ta, expr: this.normalizeExpr(ta.expr) };
      }
      case "throw": {
        const t = expr as ThrowExpr;
        return { ...t, value: this.normalizeExpr(t.value) };
      }
      case "try-catch": {
        const tc = expr as TryCatchExpr;
        return { ...tc, tryBody: tc.tryBody.map(e => this.normalizeExpr(e)), catchBody: tc.catchBody.map(e => this.normalizeExpr(e)), finallyBody: tc.finallyBody.map(e => this.normalizeExpr(e)) } as Phase0Expr;
      }
      case "for": {
        const f = expr as ForExpr;
        return { ...f, init: f.init ? this.normalizeExpr(f.init) : null, condition: f.condition ? this.normalizeExpr(f.condition) : null, update: f.update ? this.normalizeExpr(f.update) : null, body: f.body.map(e => this.normalizeExpr(e)) } as Phase0Expr;
      }
      case "identifier": {
        const id = expr as Identifier;
        if (id.name.indexOf('.') !== -1) {
          const parts = id.name.split('.');
          let node: Expr = { kind: 'identifier', name: parts[0], location: id.location } as Identifier;
          for (let i = 1; i < parts.length; i++) {
            node = { kind: 'prop', object: node, property: parts[i], location: id.location } as unknown as PropExpr;
          }
          return node as Phase0Expr;
        }
        return expr as Phase0Expr;
      }
      case "literal":
        return expr as Phase0Expr;
      case "quote": {
        const quoted = (expr as QuoteExpr).expr;
        const converted = this.convertQuotedToAst(quoted);
        if (this.isSplice(converted)) {
          return { kind: "array", elements: converted.items, location: quoted.location } as ArrayExpr as Phase0Expr;
        }
        return this.normalizeExpr(converted as Expr);
      }
      case "unquote":
        return this.normalizeExpr((expr as UnquoteExpr).expr);
      case "unquote-splice":
        return this.normalizeExpr((expr as UnquoteSpliceExpr).expr);
      default:
        // Defensive cast: some Phase1-only nodes (like internal splice markers)
        // may reach here; treat them as unknown when asserting Phase0 shape.
        return expr as unknown as Phase0Expr;
    }
  }

  private normalizeTypesInProgram(body: Phase0Statement[]): void {
    const walk = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        for (const e of obj) walk(e);
        return;
      }
      // If this object has a typeAnnotation, normalize it
      if (obj.typeAnnotation) {
        obj.typeAnnotation = this.normalizeTypeNode(obj.typeAnnotation as any);
      }
      // If this object is a TypeAliasStmt, ensure its typeAnnotation normalized
      if (obj.kind === 'type-alias' && obj.typeAnnotation) {
        obj.typeAnnotation = this.normalizeTypeNode(obj.typeAnnotation as any);
      }
      // Recurse into known child arrays/objects
      for (const k of Object.keys(obj)) {
        if (k === 'typeAnnotation') continue;
        const v = obj[k];
        if (Array.isArray(v)) {
          for (const it of v) walk(it);
        } else if (v && typeof v === 'object') {
          walk(v);
        }
      }
    };

    for (const stmt of body) walk(stmt as any);
  }

  private collectMacros(program: Program): void {
    for (const stmt of program.body) {
      // Handle direct defmacro statements (if parser emits them as top-level statements)
      if (stmt.kind === "defmacro") {
        const macro = stmt as MacroDef;
        this.registry.macros.set(macro.name.name, macro);
        this.ctx.eventSink.emit({
          phase: "expand",
          kind: "macroRegistered",
          data: { name: macro.name.name, params: macro.params.map(p => p.name) }
        });
        continue;
      }

      // Handle defmacro emitted INSIDE an exprStmt like: (defmacro name (params) body...)
      // Some parsers produce this as an exprStmt whose expr is a defmacro node. Support that.
      if (stmt.kind === "exprStmt" && (stmt as any).expr && ((stmt as any).expr.kind === "defmacro")) {
        const macroExpr = (stmt as any).expr as MacroDef;
        this.registry.macros.set(macroExpr.name.name, macroExpr);
        this.ctx.eventSink.emit({
          phase: "expand",
          kind: "macroRegistered",
          data: { name: macroExpr.name.name, params: macroExpr.params.map((p: Identifier) => p.name) }
        });
        continue;
      }

      // Also support legacy-style macro definitions represented as an exprStmt whose
      // expr is a call to the identifier `defmacro`. Some programs may still use this
      // form (especially during parsing re-exports), so detect and register them here.
      if (stmt.kind === "exprStmt" && stmt.expr.kind === "call") {
        const call = stmt.expr as CallExpr;
        if (call.callee.kind === "identifier" && (call.callee as Identifier).name === "defmacro") {
          // Expect: (defmacro name (params...) body...)
          const nameArg = call.args[0];
          const paramsArg = call.args[1];
          const bodyArgs = call.args.slice(2);
          if (nameArg && nameArg.kind === "identifier") {
            const nameId = nameArg as Identifier;
            const params: Identifier[] = [];
            if (paramsArg && paramsArg.kind === "call") {
              const paramsCall = paramsArg as CallExpr;
              if (paramsCall.callee && paramsCall.callee.kind === "identifier") params.push(paramsCall.callee as Identifier);
              for (const p of paramsCall.args) {
                if (p.kind === "identifier") params.push(p as Identifier);
              }
            }
            const macro: MacroDef = { kind: "defmacro", name: nameId, params, body: bodyArgs, location: stmt.location };
            this.registry.macros.set(macro.name.name, macro);
            this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macro.name.name, params: macro.params.map(p => p.name) } });
          }
        }
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
          expr: this.toPhase0(this.expandExpr(stmt.expr))
        };
      case "block":
        return {
          ...stmt,
          body: stmt.body.map(e => this.toPhase0(this.expandExpr(e)))
        };
      case "let*":
        return this.expandLet(stmt as LetStarExpr);
      case "type-alias":
        return this.expandTypeAlias(stmt as any);
      case "defmacro":
        return stmt; // Keep as-is, will be filtered out later
      default:
        return stmt;
    }
  }

  private expandTypeAlias(stmt: any): any {
    // Normalize the type annotation for TypeAlias statements so that any
    // ergonomic forms (dot-sigil names, colon shorthand) are canonicalized.
    const normalized = { ...stmt };
    if (normalized.typeAnnotation) {
      normalized.typeAnnotation = this.normalizeTypeNode(normalized.typeAnnotation);
    }
    return normalized;
  }

  private normalizeTypeNode(node: any): any {
    if (!node || typeof node !== 'object') return node;
    if (node.kind === 'type-object' && Array.isArray(node.fields)) {
      const fields = node.fields.map((f: any) => {
        // Support legacy shapes where field.name might include a leading '.' or trailing ':'
        let name = f.name;
        if (typeof name === 'string') {
          name = name.replace(/^\./, '').replace(/[:]$/, '');
        } else if (name && typeof name === 'object' && name.name) {
          name = String(name.name).replace(/^\./, '').replace(/[:]$/, '');
        }

        const typeNode = this.normalizeTypeNode(f.type || f[1] || f);
        return { name, type: typeNode };
      });
      return { ...node, fields };
    }
    // recurse into composed types
    if (node.kind === 'type-array') {
      return { ...node, element: this.normalizeTypeNode(node.element) };
    }
    if (node.kind === 'type-function') {
      return { ...node, params: node.params.map((p: any) => this.normalizeTypeNode(p)), returns: this.normalizeTypeNode(node.returns) };
    }
    if (node.kind === 'type-union' || node.kind === 'type-intersection') {
      return { ...node, types: node.types.map((t: any) => this.normalizeTypeNode(t)) };
    }
    return node;
  }

  private expandExpr(expr: Expr): Expr {
    switch (expr.kind) {
      case "call":
        return this.expandCall(expr as CallExpr);
      case "identifier":
        return expr;
      case "literal":
        return expr;
      case "let*":
        return this.expandLet(expr as LetStarExpr);
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
        return this.toPhase0(this.expandExpr((expr as UnquoteExpr).expr));
      case "unquote-splice":
        // Unquote-splice outside of quote context just expands its contents
        return this.toPhase0(this.expandExpr((expr as UnquoteSpliceExpr).expr));
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
      callee: this.toPhase0(expandedCallee),
      args: expandedArgs.map(a => this.toPhase0(a))
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

    // Expansion result (recursive expansion follows)


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
      case "unquote": {
        // Evaluate the unquoted expression
        return this.evalMacroExpr((expr as UnquoteExpr).expr, env);
      }
      case "unquote-splice": {
        const us = expr as UnquoteSpliceExpr;
        const evaluated = this.evalMacroExpr(us.expr, env);
        if (evaluated && evaluated.kind === "array") {
          return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: expr.location } as unknown as Expr;
        }
        return { kind: "__splice", items: [evaluated], location: expr.location } as unknown as Expr;
      }
      case "quote": {
        // Evaluate unquotes inside the quote
        const evaluatedQuoted = this.evalQuote((expr as QuoteExpr).expr, env);
        if (this.isSplice(evaluatedQuoted)) {
          // Convert top-level splice into an array expression
          return { kind: "array", elements: evaluatedQuoted.items, location: expr.location } as ArrayExpr;
        }
        return evaluatedQuoted as Expr;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
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
          condition: this.toPhase0(this.evalMacroExpr(if_.condition, env)),
          thenBranch: this.toPhase0(this.evalMacroExpr(if_.thenBranch, env)),
          elseBranch: if_.elseBranch ? this.toPhase0(this.evalMacroExpr(if_.elseBranch, env)) : null
        };
      }
      case "call": {
        const call = expr as CallExpr;
        const evaluatedCallee = this.evalMacroExpr(call.callee, env);
        const evaluatedArgs = call.args.map(a => this.evalMacroExpr(a, env));

        // Handle call-form gensym: (gensym "prefix") -> Identifier
        if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "gensym") {
          const prefixArg = evaluatedArgs[0];
          let prefix: string | undefined = undefined;
          if (prefixArg && prefixArg.kind === "literal" && typeof (prefixArg as LiteralExpr).value === "string") {
            prefix = (prefixArg as LiteralExpr).value as string;
          }
          return this.expandGensym({ kind: "gensym", prefix, location: expr.location } as GensymExpr);
        }

        // Handle call-form quote: (quote X)
        if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "quote") {
          const quoted = call.args[0];
          const evaluatedQuoted = this.evalQuote(quoted, env);
          if (this.isSplice(evaluatedQuoted)) {
            return { kind: "array", elements: evaluatedQuoted.items, location: expr.location } as ArrayExpr;
          }
          return evaluatedQuoted as Expr;
        }

        // If callee is the `array` constructor, evaluate to an ArrayExpr at compile time
        if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "array") {
          return {
            kind: "array",
            elements: evaluatedArgs.map(a => this.toPhase0(a)),
            location: expr.location
          } as ArrayExpr;
        }
        return {
          ...call,
          callee: this.toPhase0(evaluatedCallee),
          args: evaluatedArgs.map(a => this.toPhase0(a))
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
  private evalQuote(expr: Expr, env: Map<string, Expr>): Expr | SpliceMarker {
    switch (expr.kind) {
      case "unquote": {
        // Evaluate the unquoted expression
        const unquote = expr as UnquoteExpr;
        return this.evalMacroExpr(unquote.expr, env);
      }
      case "unquote-splice": {
        // Evaluate the spliced expression at compile time.
        // If it evaluates to an ArrayExpr, return a splice marker with its elements.
        // If it evaluates to a non-array value, treat it as a single-item splice
        // so it will be flattened as a single element in the surrounding list.
        const us = expr as UnquoteSpliceExpr;
        const evaluated = this.evalMacroExpr(us.expr, env);
        if (evaluated && evaluated.kind === "array") {
          // Return a lightweight splice marker (not part of the public AST)
          return { kind: "__splice", items: (evaluated as ArrayExpr).elements, location: expr.location };
        }
        // Wrap non-arrays in a single-item splice marker so callers flatten it
        // consistently into the surrounding list.
        return { kind: "__splice", items: [evaluated], location: expr.location } as SpliceMarker;
      }
      case "identifier": {
        // Support shorthand unquote/unquote-splice inside quotes: identifiers
        // beginning with `~` or `~@` should behave like (unquote ...) and
        // (unquote-splice ...).
        const id = expr as Identifier;
        if (typeof id.name === "string" && id.name.startsWith("~@")) {
          const remainder = id.name.slice(2);
          let inner: Expr = { kind: "identifier", name: remainder, location: id.location } as Identifier;
          // numeric shorthand (~@1) -> number literal
          if (/^-?\d+$/.test(remainder)) {
            inner = { kind: "literal", value: Number(remainder), location: id.location } as LiteralExpr;
          }
          return this.evalMacroExpr({ kind: "unquote-splice", expr: inner, location: id.location } as UnquoteSpliceExpr, env);
        }
        if (typeof id.name === "string" && id.name.startsWith("~")) {
          const remainder = id.name.slice(1);
          let inner: Expr = { kind: "identifier", name: remainder, location: id.location } as Identifier;
          if (/^-?\d+$/.test(remainder)) {
            inner = { kind: "literal", value: Number(remainder), location: id.location } as LiteralExpr;
          }
          return this.evalMacroExpr({ kind: "unquote", expr: inner, location: id.location } as UnquoteExpr, env);
        }
        // Identifiers in quote are literal unless they are macro parameters
        // bound in the environment (convenience: allow bare params without ~)
        const bound = env.get(id.name);
        if (bound) {
          return this.cloneExpr(bound);
        }
        return expr;
      }
      case "literal":
        return expr;
      case "gensym":
        // Gensyms are evaluated even in quote
        return this.expandGensym(expr as GensymExpr);
      case "function": {
        const fn = expr as FunctionExpr;
        const nameExpr = fn.name ? this.evalQuote(fn.name, env) : null;
        const nameId = nameExpr && (nameExpr as Expr).kind === "identifier" ? (nameExpr as Identifier) : null;
        const body = this.flattenQuotedArgs(fn.body.map(b => this.evalQuote(b, env)) as Array<Expr | SpliceMarker>);
        return { kind: "function", name: nameId, params: fn.params, body, isDeclaration: fn.isDeclaration, location: fn.location } as FunctionExpr;
      }
      case "call": {
        const call = expr as CallExpr;
        // Recursively process for unquotes
        const processedCallee = this.evalQuote(call.callee, env);
        const processedArgs = call.args.map(a => this.evalQuote(a, env));
        // Now convert back to proper AST
        const calleeAst = this.convertQuotedToAstSingle(processedCallee as Expr | SpliceMarker);
        const argsAst = this.flattenQuotedArgs(processedArgs as Array<Expr | SpliceMarker>);

        // Special-case: quoted `array` constructor -> ArrayExpr
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "array") {
          return { kind: "array", elements: argsAst, location: call.location } as ArrayExpr;
        }



        // Special-case: quoted `function` form: (function name (params) body...)
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "function") {
          // Use processed args (after evalQuote) so unquotes are already evaluated
          const nameArg = processedArgs[0] as Expr | SpliceMarker | undefined;
          const paramsArg = processedArgs[1] as Expr | SpliceMarker | undefined;
          let name: Identifier | null = null;
          if (nameArg && !this.isSplice(nameArg) && (nameArg as Expr).kind === "identifier") {
            name = nameArg as Identifier;
          }
          const params: Identifier[] = [];
          if (paramsArg && !this.isSplice(paramsArg) && (paramsArg as Expr).kind === "array") {
            const arr = paramsArg as ArrayExpr;
            for (const el of arr.elements) {
              if (el.kind === "identifier") params.push(el as Identifier);
            }
          }
          const body = this.flattenQuotedArgs(processedArgs.slice(2) as Array<Expr | SpliceMarker>);
          return { kind: "function", name, params, body, isDeclaration: false, location: call.location } as FunctionExpr;
        }

        // Special-case: quoted `function` form: (function name (params) body...)
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "function") {
          // Use processed args (after evalQuote) so unquotes are already evaluated
          const nameArg = processedArgs[0] as Expr | SpliceMarker | undefined;
          const paramsArg = processedArgs[1] as Expr | SpliceMarker | undefined;
          let name: Identifier | null = null;
          if (nameArg && !this.isSplice(nameArg) && (nameArg as Expr).kind === "identifier") {
            name = nameArg as Identifier;
          }
          const params: Identifier[] = [];
          if (paramsArg && !this.isSplice(paramsArg) && (paramsArg as Expr).kind === "array") {
            const arr = paramsArg as ArrayExpr;
            for (const el of arr.elements) {
              if (el.kind === "identifier") params.push(el as Identifier);
            }
          }
          const body = this.flattenQuotedArgs(processedArgs.slice(2) as Array<Expr | SpliceMarker>);
          return { kind: "function", name, params, body, isDeclaration: false, location: call.location } as FunctionExpr;
        }

        // Special-case: quoted `return` form: (return value?) -> ReturnExpr
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "return") {
          const val = argsAst[0] ? argsAst[0] : null;
          return { kind: "return", value: val, location: call.location } as ReturnExpr;
        }

        // Special-case: quoted `block` form: (block stmt1 stmt2...) -> BlockStmt
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "block") {
          return { kind: "block", body: argsAst, location: call.location } as BlockStmt;
        }

        // Special-case: assign/index/if/prop/type-assert/new forms
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "assign") {
          return { kind: "assign", target: argsAst[0], value: argsAst[1], location: call.location } as AssignExpr;
        }

        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "index") {
          return { kind: "index", object: argsAst[0], index: argsAst[1], location: call.location } as IndexExpr;
        }

        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "prop") {
          const obj = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as Expr;
          let propName = "";
          const propArg = argsAst[1];
          if (propArg && propArg.kind === "literal") {
            const lit = propArg as LiteralExpr;
            if (typeof lit.value === "string") propName = lit.value;
            else propName = String(lit.value);
          }
          return { kind: "prop", object: obj, property: propName, location: call.location } as PropExpr;
        }

        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "if") {
          return { kind: "if", condition: argsAst[0], thenBranch: argsAst[1], elseBranch: argsAst[2] || null, location: call.location } as IfExpr;
        }

        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "type-assert") {
          // Convert the second arg to a type node if possible
          const typeArg = call.args[1];
          let typeNode: any = { kind: "type-ref", name: "any", location: call.location };
          if (typeArg && typeArg.kind === "call") {
            const typeCall = typeArg as CallExpr;
            const typeCallee = typeCall.callee;
            if (typeCallee.kind === "identifier" && (typeCallee as Identifier).name === "type-ref") {
              const nameLit = typeCall.args[0];
              if (nameLit && nameLit.kind === "literal") {
                typeNode = { kind: "type-ref", name: (nameLit as LiteralExpr).value as string, location: call.location };
              }
            }
          }
          return { kind: "type-assert", expr: argsAst[0], typeAnnotation: typeNode, location: call.location } as any as TypeAssertExpr;
        }

        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "new") {
          const calleeExpr = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as Expr;
          let newArgs = argsAst.slice(1);
          if (newArgs.length === 1 && newArgs[0].kind === "array") {
            newArgs = (newArgs[0] as ArrayExpr).elements;
          }
          return { kind: "new", callee: calleeExpr, args: newArgs, location: call.location } as NewExpr;
        }

        // Special-case: (call callee arg...) in quoted code should be transformed
        // into a CallExpr whose callee is the first arg and rest are args.
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "call") {
          const calleeArg = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as Expr;
          const outArgs = argsAst.slice(1);
          return { kind: "call", callee: calleeArg, args: outArgs, location: call.location } as CallExpr;
        }

        return { kind: "call", callee: calleeAst, args: argsAst, location: call.location } as CallExpr;
      }
      case "return": {
        const ret = expr as ReturnExpr;
        if (ret.value) {
          const processed = this.evalQuote(ret.value, env);
          if (this.isSplice(processed)) {
            return { kind: "array", elements: processed.items, location: ret.location } as ArrayExpr;
          }
          return { kind: "return", value: processed as Expr, location: ret.location } as ReturnExpr;
        }
        return { kind: "return", value: null, location: ret.location } as ReturnExpr;
      }

      case "assign": {
        const assign = expr as AssignExpr;
        const target = this.evalQuote(assign.target, env);
        const value = this.evalQuote(assign.value, env);
        return { kind: "assign", target: this.convertQuotedToAstSingle(target as Expr | SpliceMarker), value: this.convertQuotedToAstSingle(value as Expr | SpliceMarker), location: assign.location } as AssignExpr;
      }

      case "index": {
        const idx = expr as IndexExpr;
        const object = this.evalQuote(idx.object, env);
        const index = this.evalQuote(idx.index, env);
        return { kind: "index", object: this.convertQuotedToAstSingle(object as Expr | SpliceMarker), index: this.convertQuotedToAstSingle(index as Expr | SpliceMarker), location: idx.location } as IndexExpr;
      }

      case "prop": {
        const prop = expr as PropExpr;
        const object = this.evalQuote(prop.object, env);
        // Property is a string in AST; leave as-is or evaluate if it came from unquote
        return { kind: "prop", object: this.convertQuotedToAstSingle(object as Expr | SpliceMarker), property: prop.property, location: prop.location } as PropExpr;
      }

      case "if": {
        const if_ = expr as IfExpr;
        const cond = this.evalQuote(if_.condition, env);
        const thenBranch = this.evalQuote(if_.thenBranch, env);
        const elseBranch = if_.elseBranch ? this.evalQuote(if_.elseBranch, env) : null;
        return { kind: "if", condition: this.convertQuotedToAstSingle(cond as Expr | SpliceMarker), thenBranch: this.convertQuotedToAstSingle(thenBranch as Expr | SpliceMarker), elseBranch: elseBranch ? this.convertQuotedToAstSingle(elseBranch as Expr | SpliceMarker) : null, location: if_.location } as IfExpr;
      }

      case "type-assert": {
        const ta = expr as TypeAssertExpr;
        const processed = this.evalQuote(ta.expr, env);
        return { kind: "type-assert", expr: this.convertQuotedToAstSingle(processed as Expr | SpliceMarker), typeAnnotation: ta.typeAnnotation, location: ta.location } as TypeAssertExpr;
      }

      case "new": {
        const n = expr as NewExpr;
        const callee = this.evalQuote(n.callee, env);
        const args = n.args.map(a => this.evalQuote(a, env) as Expr | SpliceMarker);
        let argsAst = this.flattenQuotedArgs(args);
        if (argsAst.length === 1 && argsAst[0].kind === "array") {
          argsAst = (argsAst[0] as ArrayExpr).elements;
        }
        return { kind: "new", callee: this.convertQuotedToAstSingle(callee as Expr | SpliceMarker), args: argsAst, location: n.location } as NewExpr;
      }

      case "array": {
        const arr = expr as ArrayExpr;
        const processed = arr.elements.map(e => this.evalQuote(e, env) as Expr | SpliceMarker);
        return {
          ...arr,
          elements: this.flattenQuotedArgs(processed)
        };
      }

      case "block": {
        const block = expr as BlockStmt;
        const processed = block.body.map(e => this.evalQuote(e, env) as Expr | SpliceMarker);
        const body = this.flattenQuotedArgs(processed);
        return { kind: "block", body, location: block.location } as BlockStmt;
      }

      case "let*": {
        const let_ = expr as LetStarExpr;
        const bindings: LetBinding[] = [];
        for (const b of let_.bindings) {
          const nameExpr = this.evalQuote(b.name, env);
          const nameAst = this.convertQuotedToAstSingle(nameExpr as Expr | SpliceMarker);
          const initExpr = this.evalQuote(b.init, env);
          const initAst = this.convertQuotedToAstSingle(initExpr as Expr | SpliceMarker);
          if (nameAst.kind === "identifier") {
            bindings.push({ name: nameAst as Identifier, init: initAst });
          } else {
            // Fallback: keep original name
            bindings.push({ name: b.name, init: initAst });
          }
        }
        const processed = let_.body.map(e => this.evalQuote(e, env) as Expr | SpliceMarker);
        return { kind: "let*", bindings, body: this.flattenQuotedArgs(processed), isConst: let_.isConst, location: let_.location } as LetStarExpr;
      }

      default:
        return expr;
    }
  }

  /**
   * Substitute parameters and handle quote/unquote
   */
  private substitutor = new Substitutor();

  private substituteAndExpand(expr: Expr, bindings: Map<string, Expr>): Expr {
    // Delegate to shared substitutor and cast result to Phase0-friendly form
    return (this.substitutor as any).substituteAndExpand(expr as any, bindings as any) as Expr;
  }

  /**
   * Expand gensym to produce a unique identifier
   */
  private expandGensym(gensym: GensymExpr): Identifier {
    // Delegate gensym expansion to Phase0 helper to ensure consistent naming
    return this.gensymGen.expandGensym({ prefix: gensym.prefix, generatedName: gensym.generatedName, location: gensym.location });
  }

  /**
   * Deep clone an expression (for safe substitution)
   */
  private cloneExpr(expr: Expr): Expr {
    return JSON.parse(JSON.stringify(expr));
  }

  // Helper to cast Phase1 Exprs to Phase0 Exprs when embedding into Phase0-shaped nodes.
  // Many of the expander methods produce Phase1-only nodes (gensym, quote, etc.) that will
  // be normalized later. To satisfy TypeScript's strict assignability to Phase0 types we
  // cast at the sites where a Phase0-shaped object is being constructed.
  private toPhase0(e: Expr): Phase0Expr {
    return e as unknown as Phase0Expr;
  }

  /**
   * Convert a quoted call structure back to proper T2 AST.
   * 
   * Inside quote, special forms like let* are parsed as CallExpr.
   * This method converts them back to proper AST nodes.
   */
  // Delegate quoted->AST conversion to shared helper in phase0


  private isSplice(node: unknown): node is SpliceMarker {
    return (this.quotedConverter as any).isSplice(node);
  }

  private convertQuotedToAstSingle(node: Expr | SpliceMarker): Phase0Expr {
    const r = (this.quotedConverter as any).convertQuotedToAst(node as any) as any;
    if ((this.quotedConverter as any).isSplice(r)) {
      return this.toPhase0({ kind: "array", elements: r.items, location: r.location } as ArrayExpr);
    }
    return this.toPhase0(r as Expr);
  }

  private flattenQuotedArgs(nodes: Array<Expr | SpliceMarker>): Phase0Expr[] {
    return (this.quotedConverter as any).flattenQuotedArgs(nodes as any) as Phase0Expr[];
  }

  private convertQuotedToAst(expr: Expr | SpliceMarker): Expr | SpliceMarker {
    return (this.quotedConverter as any).convertQuotedToAst(expr as any) as any;
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
          callee: this.toPhase0(this.walkAndExpandGensyms(call.callee)),
          args: call.args.map(a => this.toPhase0(this.walkAndExpandGensyms(a)))
        };
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        return {
          ...let_,
          bindings: let_.bindings.map(b => ({
            ...b,
            init: this.toPhase0(this.walkAndExpandGensyms(b.init))
          })),
          body: let_.body.map(e => this.toPhase0(this.walkAndExpandGensyms(e)))
        };
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return {
          ...arr,
          elements: arr.elements.map(e => this.toPhase0(this.walkAndExpandGensyms(e)))
        };
      }
      default:
        return expr;
    }
  }

  // Helper methods for expanding various expression types
  private expandLet(let_: LetStarExpr): LetStarExpr {
    return {
      ...let_,
      bindings: let_.bindings.map(b => ({
        ...b,
        init: this.toPhase0(this.expandExpr(b.init))
      })),
      body: let_.body.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }

  private expandIf(if_: IfExpr): IfExpr {
    return {
      ...if_,
      condition: this.toPhase0(this.expandExpr(if_.condition)),
      thenBranch: this.toPhase0(this.expandExpr(if_.thenBranch)),
      elseBranch: if_.elseBranch ? this.toPhase0(this.expandExpr(if_.elseBranch)) : null
    };
  }

  private expandProp(prop: PropExpr): PropExpr {
    return {
      ...prop,
      object: this.toPhase0(this.expandExpr(prop.object))
    };
  }

  private expandFunction(fn: FunctionExpr): FunctionExpr {
    return {
      ...fn,
      body: fn.body.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }

  private expandReturn(ret: ReturnExpr): ReturnExpr {
    return {
      ...ret,
      value: ret.value ? this.toPhase0(this.expandExpr(ret.value)) : null
    };
  }

  private expandWhile(while_: WhileExpr): WhileExpr {
    return {
      ...while_,
      condition: this.toPhase0(this.expandExpr(while_.condition)),
      body: while_.body.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }

  private expandArray(arr: ArrayExpr): ArrayExpr {
    return {
      ...arr,
      elements: arr.elements.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }

  private expandObject(obj: ObjectExpr): ObjectExpr {
    return {
      ...obj,
      fields: obj.fields.map(f => ({
        ...f,
        value: this.toPhase0(this.expandExpr(f.value))
      }))
    };
  }

  private expandAssign(assign: AssignExpr): AssignExpr {
    return {
      ...assign,
      target: this.toPhase0(this.expandExpr(assign.target)),
      value: this.toPhase0(this.expandExpr(assign.value))
    };
  }

  private expandFor(for_: ForExpr): ForExpr {
    return {
      ...for_,
      init: for_.init ? this.toPhase0(this.expandExpr(for_.init)) : null,
      condition: for_.condition ? this.toPhase0(this.expandExpr(for_.condition)) : null,
      update: for_.update ? this.toPhase0(this.expandExpr(for_.update)) : null,
      body: for_.body.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }

  private expandIndex(index: IndexExpr): IndexExpr {
    return {
      ...index,
      object: this.toPhase0(this.expandExpr(index.object)),
      index: this.toPhase0(this.expandExpr(index.index))
    };
  }

  private expandNew(new_: NewExpr): NewExpr {
    return {
      ...new_,
      callee: this.toPhase0(this.expandExpr(new_.callee)),
      args: new_.args.map(a => this.toPhase0(this.expandExpr(a)))
    };
  }

  private expandClass(class_: ClassExpr): ClassExpr {
    return {
      ...class_,
      fields: class_.fields.map(f => ({
        ...f,
        initializer: f.initializer ? this.toPhase0(this.expandExpr(f.initializer)) : null
      })),
      methods: class_.methods.map(m => ({
        ...m,
        body: m.body.map(e => this.toPhase0(this.expandExpr(e)))
      }))
    };
  }

  private expandTypeAssert(ta: TypeAssertExpr): TypeAssertExpr {
    return {
      ...ta,
      expr: this.toPhase0(this.expandExpr(ta.expr))
    };
  }

  private expandThrow(throw_: ThrowExpr): ThrowExpr {
    return {
      ...throw_,
      value: this.toPhase0(this.expandExpr(throw_.value))
    };
  }

  private expandTryCatch(tc: TryCatchExpr): TryCatchExpr {
    return {
      ...tc,
      tryBody: tc.tryBody.map(e => this.toPhase0(this.expandExpr(e))),
      catchBody: tc.catchBody.map(e => this.toPhase0(this.expandExpr(e))),
      finallyBody: tc.finallyBody.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }

  private expandBlock(block: BlockStmt): BlockStmt {
    return {
      ...block,
      body: block.body.map(e => this.toPhase0(this.expandExpr(e)))
    };
  }
}
