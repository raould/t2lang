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

import { GensymGenerator, QuotedToAstConverter, Substitutor } from "t2lang-phase0";
import type {
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
  MacroDef
} from "../ast/nodes.js";

export class MacroExpander {
  ctx: any;
  registry: { macros: Map<string, MacroDef> } = { macros: new Map() };
  gensymGen = new GensymGenerator();
  quotedConverter: QuotedToAstConverter;
  substitutor = new Substitutor();

  constructor(ctx: any) {
    this.ctx = ctx;
    this.quotedConverter = new QuotedToAstConverter();
  }

  macroexpand1(expr: Expr): Expr {
    if (expr.kind !== 'call') return expr;
    const call = expr as CallExpr;
    if (call.callee.kind !== 'identifier') return expr;
    const name = (call.callee as Identifier).name;
    const macro = this.registry.macros.get(name);
    if (!macro) return expr;
    const env = new Map<string, Expr>();
    for (let i = 0; i < macro.params.length; i++) {
      const param = macro.params[i];
      const arg = call.args[i] || ({ kind: 'literal', value: null, location: call.location } as any);
      env.set(param.name, arg as Expr);
    }
    let result: Expr = { kind: 'literal', value: null, location: call.location } as any;
    for (const bodyExpr of macro.body) {
      result = this.evalMacroExpr(bodyExpr, env) as Expr;
    }
    return result;
  }

  macroexpand(expr: Expr): Expr {
    return this.expandExpr(expr);
  }

  expandProgram(program: Program) {
    this.collectMacros(program);
    const preprocessedBody = program.body.map((stmt: Statement) => {
      if (stmt.kind === "exprStmt" && (stmt as any).expr && (stmt as any).expr.kind === "call") {
        const call = (stmt as any).expr as CallExpr;
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
              for (const p of paramsCall.args) if (p.kind === "identifier") params.push(p as Identifier);
            }
            return { kind: "defmacro", name: nameId, params, body: bodyArgs, location: (stmt as any).location } as MacroDef;
          }
        }
      }
      return stmt;
    });

    const expandedBody = this.expandStatements(preprocessedBody as Statement[]);
    const filteredBody = expandedBody.filter((stmt: Statement) => {
      if (stmt.kind === "defmacro") return false;
      if (stmt.kind === "exprStmt" && (stmt as any).expr) {
        const inner = (stmt as any).expr;
        if (inner.kind === "defmacro") return false;
      }
      if (stmt.kind === "exprStmt" && (stmt as any).expr && (stmt as any).expr.kind === "call") {
        const call = (stmt as any).expr as CallExpr;
        if (call.callee.kind === "identifier" && (call.callee as Identifier).name === "defmacro") return false;
      }
      return true;
    });

    const normalizedBody = filteredBody.map((stmt: Statement) => this.normalizeStatement(stmt as any));
    this.normalizeTypesInProgram(normalizedBody as any[]);
    this.ctx.eventSink.emit({ phase: "expand", kind: "macroExpansionDone", data: { macroCount: this.registry.macros.size } });
    return { ...program, body: normalizedBody as Phase0Statement[] } as any;
  }

  normalizeStatement(stmt: Statement): Phase0Statement {
    switch (stmt.kind) {
      case "exprStmt":
        return { ...stmt, expr: this.normalizeExpr((stmt as any).expr) } as any;
      case "block":
        return { ...stmt, body: (stmt as any).body.map((e: Expr) => this.normalizeExpr(e)) } as any;
      case "let*":
        return { ...(stmt as any), bindings: (stmt as any).bindings.map((b: any) => ({ ...b, init: this.normalizeExpr(b.init) })), body: (stmt as any).body.map((e: Expr) => this.normalizeExpr(e)) } as any;
      default:
        return stmt as any;
    }
  }

  normalizeExpr(expr: Expr): Phase0Expr {
    switch (expr.kind) {
      case "gensym":
        return this.expandGensym(expr as GensymExpr) as any;
      case "call": {
        const call = expr as CallExpr;
        return { ...call, callee: this.normalizeExpr(call.callee) as any, args: call.args.map(a => this.normalizeExpr(a) as any) } as any;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        return { ...let_, bindings: let_.bindings.map(b => ({ ...b, init: this.normalizeExpr(b.init) })), body: let_.body.map(e => this.normalizeExpr(e)) } as any;
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return { ...arr, elements: arr.elements.map(e => this.normalizeExpr(e)) } as any;
      }
      case "object": {
        const obj = expr as ObjectExpr;
        return { ...obj, fields: obj.fields.map(f => ({ ...f, value: this.normalizeExpr(f.value) })) } as any;
      }
      case "block": {
        const block = expr as BlockStmt;
        return { ...block, body: block.body.map(e => this.normalizeExpr(e)) } as any;
      }
      case "if": {
        const if_ = expr as IfExpr;
        return { ...if_, condition: this.normalizeExpr(if_.condition) as any, thenBranch: this.normalizeExpr(if_.thenBranch) as any, elseBranch: if_.elseBranch ? this.normalizeExpr(if_.elseBranch) as any : null } as any;
      }
      case "prop": {
        const prop = expr as PropExpr;
        return { ...prop, object: this.normalizeExpr(prop.object) } as any;
      }
      case "function": {
        const fn = expr as FunctionExpr;
        return { ...fn, body: fn.body.map(e => this.normalizeExpr(e)) } as any;
      }
      case "return": {
        const ret = expr as ReturnExpr;
        return { ...ret, value: ret.value ? this.normalizeExpr(ret.value as any) : null } as any;
      }
      case "while": {
        const w = expr as WhileExpr;
        return { ...w, condition: this.normalizeExpr(w.condition) as any, body: w.body.map(e => this.normalizeExpr(e)) } as any;
      }
      case "assign": {
        const a = expr as AssignExpr;
        return { ...a, target: this.normalizeExpr(a.target), value: this.normalizeExpr(a.value) } as any;
      }
      case "index": {
        const idx = expr as IndexExpr;
        return { ...idx, object: this.normalizeExpr(idx.object), index: this.normalizeExpr(idx.index) } as any;
      }
      case "new": {
        const n = expr as NewExpr;
        return { ...n, callee: this.normalizeExpr(n.callee), args: n.args.map(a => this.normalizeExpr(a)) } as any;
      }
      case "class": {
        const c = expr as ClassExpr;
        return { ...c, fields: c.fields.map(f => ({ ...f, initializer: f.initializer ? this.normalizeExpr(f.initializer) : null })), methods: c.methods.map(m => ({ ...m, body: m.body.map(e => this.normalizeExpr(e)) })) } as any;
      }
      case "type-assert": {
        const ta = expr as TypeAssertExpr;
        return { ...ta, expr: this.normalizeExpr(ta.expr) } as any;
      }
      case "throw": {
        const t = expr as ThrowExpr;
        return { ...t, value: this.normalizeExpr(t.value) } as any;
      }
      case "try-catch": {
        const tc = expr as TryCatchExpr;
        return { ...tc, tryBody: tc.tryBody.map(e => this.normalizeExpr(e)), catchBody: tc.catchBody.map(e => this.normalizeExpr(e)), finallyBody: tc.finallyBody.map(e => this.normalizeExpr(e)) } as any;
      }
      case "for": {
        const f = expr as ForExpr;
        return { ...f, init: f.init ? this.normalizeExpr(f.init) : null, condition: f.condition ? this.normalizeExpr(f.condition) : null, update: f.update ? this.normalizeExpr(f.update) : null, body: f.body.map(e => this.normalizeExpr(e)) } as any;
      }
      case "identifier": {
        const id = expr as Identifier;
        if (id.name.indexOf('.') !== -1) {
          const parts = id.name.split('.');
          let node: any = { kind: 'identifier', name: parts[0], location: id.location };
          for (let i = 1; i < parts.length; i++) node = { kind: 'prop', object: node, property: parts[i], location: id.location };
          return node as any;
        }
        return expr as any;
      }
      case "literal":
        return expr as any;
      case "quote": {
        const quoted = (expr as any).expr;
        const converted = this.convertQuotedToAst(quoted as any);
        if (this.isSplice(converted)) return { kind: "array", elements: (converted as any).items, location: quoted.location } as any;
        return this.normalizeExpr(converted as any);
      }
      case "unquote":
        return this.normalizeExpr((expr as any).expr as any);
      case "unquote-splice":
        return this.normalizeExpr((expr as any).expr as any);
      default:
        return expr as any;
    }
  }

  normalizeTypesInProgram(body: any[]) {
    const walk = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) { for (const e of obj) walk(e); return; }
      if (obj.typeAnnotation) obj.typeAnnotation = this.normalizeTypeNode(obj.typeAnnotation);
      if (obj.kind === 'type-alias' && obj.typeAnnotation) obj.typeAnnotation = this.normalizeTypeNode(obj.typeAnnotation);
      for (const k of Object.keys(obj)) {
        if (k === 'typeAnnotation') continue;
        const v = obj[k];
        if (Array.isArray(v)) for (const it of v) walk(it); else if (v && typeof v === 'object') walk(v);
      }
    };
    for (const stmt of body) walk(stmt);
  }

  collectMacros(program: Program) {
    for (const stmt of program.body) {
      if (stmt.kind === "defmacro") {
        const macro = stmt as MacroDef;
        this.registry.macros.set(macro.name.name, macro);
        this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macro.name.name, params: macro.params.map(p => p.name) } });
        continue;
      }
      if (stmt.kind === "exprStmt" && (stmt as any).expr) {
        const inner = (stmt as any).expr;
        if (inner.kind === "defmacro") {
          const macroExpr = (stmt as any).expr as MacroDef;
          this.registry.macros.set(macroExpr.name.name, macroExpr);
          this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macroExpr.name.name, params: macroExpr.params.map((p: Identifier) => p.name) } });
          continue;
        }
      }
      if (stmt.kind === "exprStmt" && (stmt as any).expr && (stmt as any).expr.kind === "call") {
        const call = (stmt as any).expr as CallExpr;
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
              for (const p of paramsCall.args) if (p.kind === "identifier") params.push(p as Identifier);
            }
            const macro = { kind: "defmacro", name: nameId, params, body: bodyArgs, location: (stmt as any).location } as MacroDef;
            this.registry.macros.set(macro.name.name, macro);
            this.ctx.eventSink.emit({ phase: "expand", kind: "macroRegistered", data: { name: macro.name.name, params: macro.params.map(p => p.name) } });
          }
        }
      }
    }
  }

  expandStatements(stmts: Statement[]): Statement[] { const result: Statement[] = []; for (const stmt of stmts) result.push(this.expandStatement(stmt)); return result; }

  expandStatement(stmt: Statement): Statement {
    switch (stmt.kind) {
      case "exprStmt": return { ...stmt, expr: this.toPhase0(this.expandExpr((stmt as any).expr)) } as any;
      case "block": return { ...stmt, body: (stmt as any).body.map((e: Expr) => this.toPhase0(this.expandExpr(e))) } as any;
      case "let*": return this.expandLet(stmt as any);
      case "type-alias": return this.expandTypeAlias(stmt as any);
      case "defmacro": return stmt;
      default: return stmt;
    }
  }

  expandTypeAlias(stmt: any) { const normalized = { ...stmt }; if (normalized.typeAnnotation) normalized.typeAnnotation = this.normalizeTypeNode(normalized.typeAnnotation); return normalized; }

  normalizeTypeNode(node: any) {
    if (!node || typeof node !== 'object') return node;
    if (node.kind === 'type-object' && Array.isArray(node.fields)) {
      const fields = node.fields.map((f: any) => {
        let name = f.name;
        if (typeof name === 'string') name = name.replace(/^\./, '').replace(/[:]$/, '');
        else if (name && typeof name === 'object' && name.name) name = String(name.name).replace(/^\./, '').replace(/[:]$/, '');
        const typeNode = this.normalizeTypeNode(f.type || f[1] || f);
        return { name, type: typeNode };
      });
      return { ...node, fields };
    }
    if (node.kind === 'type-array') return { ...node, element: this.normalizeTypeNode(node.element) };
    if (node.kind === 'type-function') return { ...node, params: node.params.map((p: any) => this.normalizeTypeNode(p)), returns: this.normalizeTypeNode(node.returns) };
    if (node.kind === 'type-union' || node.kind === 'type-intersection') return { ...node, types: node.types.map((t: any) => this.normalizeTypeNode(t)) };
    return node;
  }

  expandExpr(expr: Expr): Expr {
    switch (expr.kind) {
      case "call": return this.expandCall(expr as CallExpr);
      case "identifier": return expr;
      case "literal": return expr;
      case "let*": return this.expandLet(expr as any) as any;
      case "if": return this.expandIf(expr as any) as any;
      case "prop": return this.expandProp(expr as any) as any;
      case "function": return this.expandFunction(expr as any) as any;
      case "gensym": return this.expandGensym(expr as any) as any;
      case "return": return this.expandReturn(expr as any) as any;
      case "while": return this.expandWhile(expr as any) as any;
      case "array": return this.expandArray(expr as any) as any;
      case "object": return this.expandObject(expr as any) as any;
      case "assign": return this.expandAssign(expr as any) as any;
      case "for": return this.expandFor(expr as any) as any;
      case "index": return this.expandIndex(expr as any) as any;
      case "new": return this.expandNew(expr as any) as any;
      case "class": return this.expandClass(expr as any) as any;
      case "type-assert": return this.expandTypeAssert(expr as any) as any;
      case "throw": return this.expandThrow(expr as any) as any;
      case "try-catch": return this.expandTryCatch(expr as any) as any;
      case "block": return this.expandBlock(expr as any) as any;
      case "quote": return this.expandQuotedExpr((expr as any).expr as Expr) as any;
      case "unquote": return this.toPhase0(this.expandExpr((expr as any).expr as Expr));
      case "unquote-splice": return this.toPhase0(this.expandExpr((expr as any).expr as Expr));
      default: return expr;
    }
  }

  expandCall(call: CallExpr): Expr {
    const expandedCallee = this.expandExpr(call.callee);
    const expandedArgs = call.args.map(a => this.expandExpr(a));
    if (expandedCallee.kind === "identifier") {
      const name = (expandedCallee as Identifier).name;
      const macro = this.registry.macros.get(name);
      if (macro) return this.expandMacroCall(macro, expandedArgs, call.location);
    }
    return { ...call, callee: this.toPhase0(expandedCallee), args: expandedArgs.map(a => this.toPhase0(a)) } as any;
  }

  expandMacroCall(macro: MacroDef, args: Expr[], location: any): Expr {
    const env = new Map<string, Expr>();
    for (let i = 0; i < macro.params.length; i++) {
      const param = macro.params[i];
      const arg = args[i] || ({ kind: "literal", value: null, location } as any);
      env.set(param.name, arg as Expr);
    }
    this.ctx.eventSink.emit({ phase: "expand", kind: "macroExpanding", location, data: { name: macro.name.name, argCount: args.length } });
    let result: Expr = { kind: "literal", value: null, location } as any;
    for (const bodyExpr of macro.body) result = this.evalMacroExpr(bodyExpr, env) as Expr;
    return this.expandExpr(result);
  }

  evalMacroExpr(expr: Expr, env: Map<string, Expr>): Expr | any {
    switch (expr.kind) {
      case "identifier": {
        const id = expr as Identifier;
        const bound = env.get(id.name);
        if (bound) return this.cloneExpr(bound) as Expr;
        return expr;
      }
      case "literal": return expr;
      case "gensym": return this.expandGensym(expr as GensymExpr);
      case "unquote": return this.evalMacroExpr((expr as any).expr, env);
      case "unquote-splice": {
        const us = expr as any;
        const evaluated = this.evalMacroExpr(us.expr, env);
        if (evaluated && (evaluated as any).kind === "array") return { kind: "__splice", items: (evaluated as any).elements, location: expr.location } as any;
        return { kind: "__splice", items: [evaluated], location: expr.location } as any;
      }
      case "quote": {
        const evaluatedQuoted = this.evalQuote((expr as any).expr, env);
        if (this.isSplice(evaluatedQuoted)) return { kind: "array", elements: (evaluatedQuoted as any).items, location: expr.location } as any;
        return evaluatedQuoted;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        const newEnv = new Map(env);
        for (const binding of let_.bindings) {
          const value = this.evalMacroExpr(binding.init as any, newEnv);
          newEnv.set(binding.name.name, value as Expr);
        }
        let result: Expr = { kind: "literal", value: null, location: expr.location } as any;
        for (const bodyExpr of let_.body) result = this.evalMacroExpr(bodyExpr, newEnv) as Expr;
        return result;
      }
      case "if": {
        const if_ = expr as IfExpr;
        return { ...if_, condition: this.toPhase0(this.evalMacroExpr(if_.condition as any, env)), thenBranch: this.toPhase0(this.evalMacroExpr(if_.thenBranch as any, env)), elseBranch: if_.elseBranch ? this.toPhase0(this.evalMacroExpr(if_.elseBranch as any, env)) : null } as any;
      }
      case "call": {
        const call = expr as CallExpr;
        const evaluatedCallee = this.evalMacroExpr(call.callee as any, env);
        const evaluatedArgs = call.args.map(a => this.evalMacroExpr(a as any, env));
        if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "gensym") {
          const prefixArg = evaluatedArgs[0];
          let prefix = undefined;
          if (prefixArg && prefixArg.kind === "literal" && typeof (prefixArg as any).value === "string") prefix = (prefixArg as any).value;
          return this.expandGensym({ kind: "gensym", prefix, location: expr.location } as any);
        }
        if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "quote") {
          const quoted = call.args[0];
          const evaluatedQuoted = this.evalQuote(quoted as any, env);
          if (this.isSplice(evaluatedQuoted)) return { kind: "array", elements: (evaluatedQuoted as any).items, location: expr.location } as any;
          return evaluatedQuoted;
        }
        if (evaluatedCallee.kind === "identifier" && (evaluatedCallee as Identifier).name === "array") {
          return { kind: "array", elements: evaluatedArgs.map(a => this.toPhase0(a)), location: expr.location } as any;
        }
        return { ...call, callee: this.toPhase0(evaluatedCallee), args: evaluatedArgs.map(a => this.toPhase0(a)) } as any;
      }
      default:
        return this.substituteAndExpand(expr as any, env) as any;
    }
  }

  evalQuote(expr: Expr, env: Map<string, Expr>): Expr | any {
    switch ((expr as any).kind) {
      case "unquote": return this.evalMacroExpr((expr as any).expr, env);
      case "unquote-splice": {
        const us = expr as any;
        const evaluated = this.evalMacroExpr(us.expr, env);
        if (evaluated && (evaluated as any).kind === "array") return { kind: "__splice", items: (evaluated as any).elements, location: expr.location } as any;
        return { kind: "__splice", items: [evaluated], location: expr.location } as any;
      }
      case "identifier": {
        const id = expr as Identifier;
        if (typeof id.name === "string" && id.name.startsWith("~@")) {
          const remainder = id.name.slice(2);
          let inner: any = { kind: "identifier", name: remainder, location: id.location };
          if (/^-?\d+$/.test(remainder)) inner = { kind: "literal", value: Number(remainder), location: id.location };
          return this.evalMacroExpr({ kind: "unquote-splice", expr: inner, location: id.location } as any, env);
        }
        if (typeof id.name === "string" && id.name.startsWith("~")) {
          const remainder = id.name.slice(1);
          let inner: any = { kind: "identifier", name: remainder, location: id.location };
          if (/^-?\d+$/.test(remainder)) inner = { kind: "literal", value: Number(remainder), location: id.location };
          return this.evalMacroExpr({ kind: "unquote", expr: inner, location: id.location } as any, env);
        }
        const bound = env.get(id.name);
        if (bound) return this.cloneExpr(bound) as Expr;
        return expr;
      }
      case "literal": return expr;
      case "gensym": return this.expandGensym(expr as any);
      case "function": {
        const fn = expr as FunctionExpr;
        const nameExpr = fn.name ? this.evalQuote(fn.name as any, env) : null;
        const nameId = nameExpr && (nameExpr as any).kind === "identifier" ? nameExpr as Identifier : null;
        const body = this.flattenQuotedArgs(fn.body.map(b => this.evalQuote(b as any, env)) as any);
        return { kind: "function", name: nameId, params: fn.params, body, isDeclaration: fn.isDeclaration, location: fn.location } as any;
      }
      case "call": {
        const call = expr as CallExpr;
        const processedCallee = this.evalQuote(call.callee as any, env);
        const processedArgs = call.args.map(a => this.evalQuote(a as any, env));
        const calleeAst = this.convertQuotedToAstSingle(processedCallee);
        const argsAst = this.flattenQuotedArgs(processedArgs as any);
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "array") return { kind: "array", elements: argsAst, location: call.location } as any;
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === 'fn') {
          const nameArg = processedArgs[0] as any | undefined;
          const paramsArg = processedArgs[1] as any | undefined;
          let name: Identifier | null = null;
          if (nameArg && !this.isSplice(nameArg) && (nameArg as any).kind === "identifier") name = nameArg as Identifier;
          const params: Identifier[] = [];
          if (paramsArg && !this.isSplice(paramsArg) && (paramsArg as any).kind === "array") {
            const arr = paramsArg as ArrayExpr;
            for (const el of arr.elements) if (el.kind === "identifier") params.push(el as Identifier);
          }
          const body = this.flattenQuotedArgs((processedArgs as any[]).slice(2) as any);
          return { kind: "function", name, params, body, isDeclaration: false, location: call.location } as any;
        }
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "return") return { kind: "return", value: argsAst[0] ? argsAst[0] : null, location: call.location } as any;
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "block") return { kind: "block", body: argsAst, location: call.location } as any;
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "assign") return { kind: "assign", target: argsAst[0], value: argsAst[1], location: call.location } as any;
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "index") return { kind: "index", object: argsAst[0], index: argsAst[1], location: call.location } as any;
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "prop") {
          const obj = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as any;
          let propName = "";
          const propArg = argsAst[1];
          if (propArg && (propArg as any).kind === "literal") {
            const lit = propArg as any;
            if (typeof lit.value === "string") propName = lit.value; else propName = String(lit.value);
          }
          return { kind: "prop", object: obj, property: propName, location: call.location } as any;
        }
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "if") return { kind: "if", condition: argsAst[0], thenBranch: argsAst[1], elseBranch: argsAst[2] || null, location: call.location } as any;
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "type-assert") {
          const typeArg = call.args[1];
          let typeNode: any = { kind: "type-ref", name: "any", location: call.location };
          if (typeArg && (typeArg as any).kind === "call") {
            const typeCall = typeArg as CallExpr;
            const typeCallee = typeCall.callee;
            if (typeCallee.kind === "identifier" && (typeCallee as Identifier).name === "type-ref") {
              const nameLit = typeCall.args[0];
              if (nameLit && (nameLit as any).kind === "literal") typeNode = { kind: "type-ref", name: (nameLit as any).value as string, location: call.location };
            }
          }
          return { kind: "type-assert", expr: argsAst[0], typeAnnotation: typeNode, location: call.location } as any;
        }
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "new") {
          const calleeExpr = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as any;
          let newArgs = argsAst.slice(1);
          if (newArgs.length === 1 && (newArgs[0] as any).kind === "array") newArgs = (newArgs[0] as ArrayExpr).elements;
          return { kind: "new", callee: calleeExpr, args: newArgs, location: call.location } as any;
        }
        if (calleeAst.kind === "identifier" && (calleeAst as Identifier).name === "call") {
          const calleeArg = argsAst[0] ? argsAst[0] : { kind: "identifier", name: "undefined", location: call.location } as any;
          const outArgs = argsAst.slice(1);
          return { kind: "call", callee: calleeArg, args: outArgs, location: call.location } as any;
        }
        return { kind: "call", callee: calleeAst, args: argsAst, location: call.location } as any;
      }
      case "return": {
        const ret = expr as ReturnExpr;
        if (ret.value) {
          const processed = this.evalQuote(ret.value as any, env as any);
          if (this.isSplice(processed)) return { kind: "array", elements: (processed as any).items, location: ret.location } as any;
          return { kind: "return", value: processed as any, location: ret.location } as any;
        }
        return { kind: "return", value: null, location: ret.location } as any;
      }
      case "assign": {
        const assign = expr as AssignExpr;
        const target = this.evalQuote(assign.target as any, env as any);
        const value = this.evalQuote(assign.value as any, env as any);
        return { kind: "assign", target: this.convertQuotedToAstSingle(target), value: this.convertQuotedToAstSingle(value), location: assign.location } as any;
      }
      case "index": {
        const idx = expr as IndexExpr;
        const object = this.evalQuote(idx.object as any, env as any);
        const index = this.evalQuote(idx.index as any, env as any);
        return { kind: "index", object: this.convertQuotedToAstSingle(object), index: this.convertQuotedToAstSingle(index), location: idx.location } as any;
      }
      case "prop": {
        const prop = expr as PropExpr;
        const object = this.evalQuote(prop.object as any, env as any);
        return { kind: "prop", object: this.convertQuotedToAstSingle(object), property: prop.property, location: prop.location } as any;
      }
      case "if": {
        const if_ = expr as IfExpr;
        const cond = this.evalQuote(if_.condition as any, env as any);
        const thenBranch = this.evalQuote(if_.thenBranch as any, env as any);
        const elseBranch = if_.elseBranch ? this.evalQuote(if_.elseBranch as any, env as any) : null;
        return { kind: "if", condition: this.convertQuotedToAstSingle(cond), thenBranch: this.convertQuotedToAstSingle(thenBranch), elseBranch: elseBranch ? this.convertQuotedToAstSingle(elseBranch) : null, location: if_.location } as any;
      }
      case "type-assert": {
        const ta = expr as TypeAssertExpr;
        const processed = this.evalQuote(ta.expr as any, env as any);
        return { kind: "type-assert", expr: this.convertQuotedToAstSingle(processed), typeAnnotation: ta.typeAnnotation, location: ta.location } as any;
      }
      case "new": {
        const n = expr as NewExpr;
        const callee = this.evalQuote(n.callee as any, env as any);
        const args = n.args.map(a => this.evalQuote(a as any, env as any));
        let argsAst = this.flattenQuotedArgs(args as any);
        if (argsAst.length === 1 && (argsAst[0] as any).kind === "array") argsAst = (argsAst[0] as ArrayExpr).elements;
        return { kind: "new", callee: this.convertQuotedToAstSingle(callee), args: argsAst, location: n.location } as any;
      }
      case "array": {
        const arr = expr as ArrayExpr;
        const processed = arr.elements.map(e => this.evalQuote(e as any, env as any));
        return { ...arr, elements: this.flattenQuotedArgs(processed as any) } as any;
      }
      case "block": {
        const block = expr as BlockStmt;
        const processed = block.body.map(e => this.evalQuote(e as any, env as any));
        const body = this.flattenQuotedArgs(processed as any);
        return { kind: "block", body, location: block.location } as any;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        const bindings: LetBinding[] = [] as any;
        for (const b of let_.bindings) {
          const nameExpr = this.evalQuote(b.name as any, env as any);
          const nameAst = this.convertQuotedToAstSingle(nameExpr);
          const initExpr = this.evalQuote(b.init as any, env as any);
          const initAst = this.convertQuotedToAstSingle(initExpr);
          if (nameAst && (nameAst as any).kind === "identifier") bindings.push({ name: nameAst as Identifier, init: initAst } as any);
          else bindings.push({ name: b.name, init: initAst } as any);
        }
        const processed = let_.body.map(e => this.evalQuote(e as any, env as any));
        return { kind: "let*", bindings, body: this.flattenQuotedArgs(processed as any), isConst: let_.isConst, location: let_.location } as any;
      }
      default: return expr as any;
    }
  }

  substituteAndExpand(expr: Expr, bindings: Map<string, Expr>) { return this.substitutor.substituteAndExpand(expr as any, bindings as any) as any; }

  expandGensym(gensym: GensymExpr) { return this.gensymGen.expandGensym({ prefix: (gensym as any).prefix, generatedName: (gensym as any).generatedName, location: gensym.location } as any) as any; }

  cloneExpr(expr: any) { return JSON.parse(JSON.stringify(expr)); }

  toPhase0<T>(e: T): T { return e; }

  isSplice(node: any) { return this.quotedConverter.isSplice(node); }
  convertQuotedToAstSingle(node: any) { const r = this.quotedConverter.convertQuotedToAst(node); if (this.quotedConverter.isSplice(r)) return this.toPhase0({ kind: "array", elements: (r as any).items, location: (r as any).location } as any); return this.toPhase0(r as any); }
  flattenQuotedArgs(nodes: any[]) { return this.quotedConverter.flattenQuotedArgs(nodes); }
  convertQuotedToAst(expr: any) { return this.quotedConverter.convertQuotedToAst(expr); }

  expandQuotedExpr(expr: Expr) { if ((expr as any).kind === "gensym") return this.expandGensym(expr as any); return this.walkAndExpandGensyms(expr as any); }

  walkAndExpandGensyms(expr: any) {
    switch (expr.kind) {
      case "gensym": return this.expandGensym(expr as any);
      case "call": {
        const call = expr as CallExpr;
        return { ...call, callee: this.toPhase0(this.walkAndExpandGensyms(call.callee)), args: call.args.map(a => this.toPhase0(this.walkAndExpandGensyms(a))) } as any;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        return { ...let_, bindings: let_.bindings.map(b => ({ ...b, init: this.toPhase0(this.walkAndExpandGensyms(b.init)) })), body: let_.body.map(e => this.toPhase0(this.walkAndExpandGensyms(e))) } as any;
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return { ...arr, elements: arr.elements.map(e => this.toPhase0(this.walkAndExpandGensyms(e))) } as any;
      }
      default: return expr;
    }
  }

  expandLet(let_: LetStarExpr) { return { ...let_, bindings: let_.bindings.map(b => ({ ...b, init: this.toPhase0(this.expandExpr(b.init)) })), body: let_.body.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
  expandIf(if_: IfExpr) { return { ...if_, condition: this.toPhase0(this.expandExpr(if_.condition)), thenBranch: this.toPhase0(this.expandExpr(if_.thenBranch)), elseBranch: if_.elseBranch ? this.toPhase0(this.expandExpr(if_.elseBranch)) : null } as any; }
  expandProp(prop: PropExpr) { return { ...prop, object: this.toPhase0(this.expandExpr(prop.object)) } as any; }
  expandFunction(fn: FunctionExpr) { return { ...fn, body: fn.body.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
  expandReturn(ret: ReturnExpr) { return { ...ret, value: ret.value ? this.toPhase0(this.expandExpr(ret.value)) : null } as any; }
  expandWhile(w: WhileExpr) { return { ...w, condition: this.toPhase0(this.expandExpr(w.condition)), body: w.body.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
  expandArray(arr: ArrayExpr) { return { ...arr, elements: arr.elements.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
  expandObject(obj: ObjectExpr) { return { ...obj, fields: obj.fields.map(f => ({ ...f, value: this.toPhase0(this.expandExpr(f.value)) })) } as any; }
  expandAssign(assign: AssignExpr) { return { ...assign, target: this.toPhase0(this.expandExpr(assign.target)), value: this.toPhase0(this.expandExpr(assign.value)) } as any; }
  expandFor(for_: ForExpr) { return { ...for_, init: for_.init ? this.toPhase0(this.expandExpr(for_.init)) : null, condition: for_.condition ? this.toPhase0(this.expandExpr(for_.condition)) : null, update: for_.update ? this.toPhase0(this.expandExpr(for_.update)) : null, body: for_.body.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
  expandIndex(index: IndexExpr) { return { ...index, object: this.toPhase0(this.expandExpr(index.object)), index: this.toPhase0(this.expandExpr(index.index)) } as any; }
  expandNew(n: NewExpr) { return { ...n, callee: this.toPhase0(this.expandExpr(n.callee)), args: n.args.map(a => this.toPhase0(this.expandExpr(a))) } as any; }
  expandClass(c: ClassExpr) { return { ...c, fields: c.fields.map(f => ({ ...f, initializer: f.initializer ? this.toPhase0(this.expandExpr(f.initializer)) : null })), methods: c.methods.map(m => ({ ...m, body: m.body.map(e => this.toPhase0(this.expandExpr(e))) })) } as any; }
  expandTypeAssert(ta: TypeAssertExpr) { return { ...ta, expr: this.toPhase0(this.expandExpr(ta.expr)) } as any; }
  expandThrow(t: ThrowExpr) { return { ...t, value: this.toPhase0(this.expandExpr(t.value)) } as any; }
  expandTryCatch(tc: TryCatchExpr) { return { ...tc, tryBody: tc.tryBody.map(e => this.toPhase0(this.expandExpr(e))), catchBody: tc.catchBody.map(e => this.toPhase0(this.expandExpr(e))), finallyBody: tc.finallyBody.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
  expandBlock(block: BlockStmt) { return { ...block, body: block.body.map(e => this.toPhase0(this.expandExpr(e))) } as any; }
          const paramsArg = processedArgs[1] as Expr | SpliceMarker | undefined;
          let name: Identifier | null = null;
          if (nameArg && !this.quoteEvaluator.isSplice(nameArg) && (nameArg as Expr).kind === "identifier") {
            name = nameArg as Identifier;
          }
          const params: Identifier[] = [];
          if (paramsArg && !this.quoteEvaluator.isSplice(paramsArg) && (paramsArg as Expr).kind === "array") {
            const arr = paramsArg as ArrayExpr;
            for (const el of arr.elements) {
              if (el.kind === "identifier") params.push(el as Identifier);
            }
          }
          const body = this.quoteEvaluator.flattenQuotedArgs(processedArgs.slice(2) as Array<Expr | SpliceMarker>);
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
          return { kind: "type-assert", expr: argsAst[0], typeAnnotation: typeNode, location: call.location } as TypeAssertExpr;
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
          const processed = this.quoteEvaluator.evalQuote(ret.value, env);
          if (this.quoteEvaluator.isSplice(processed)) {
            return { kind: "array", elements: processed.items, location: ret.location } as ArrayExpr;
          }
          return { kind: "return", value: processed as Expr, location: ret.location } as ReturnExpr;
        }
        return { kind: "return", value: null, location: ret.location } as ReturnExpr;
      }

      case "assign": {
        const assign = expr as AssignExpr;
        const target = this.quoteEvaluator.evalQuote(assign.target, env);
        const value = this.quoteEvaluator.evalQuote(assign.value, env);
        return { kind: "assign", target: this.quoteEvaluator.convertQuotedToAstSingle(target as Expr | SpliceMarker), value: this.quoteEvaluator.convertQuotedToAstSingle(value as Expr | SpliceMarker), location: assign.location } as AssignExpr;
      }

      case "index": {
        const idx = expr as IndexExpr;
        const object = this.quoteEvaluator.evalQuote(idx.object, env);
        const index = this.quoteEvaluator.evalQuote(idx.index, env);
        return { kind: "index", object: this.quoteEvaluator.convertQuotedToAstSingle(object as Expr | SpliceMarker), index: this.quoteEvaluator.convertQuotedToAstSingle(index as Expr | SpliceMarker), location: idx.location } as IndexExpr;
      }

      case "prop": {
        const prop = expr as PropExpr;
        const object = this.quoteEvaluator.evalQuote(prop.object, env);
        // Property is a string in AST; leave as-is or evaluate if it came from unquote
        return { kind: "prop", object: this.quoteEvaluator.convertQuotedToAstSingle(object as Expr | SpliceMarker), property: prop.property, location: prop.location } as PropExpr;
      }

      case "if": {
        const if_ = expr as IfExpr;
        const cond = this.quoteEvaluator.evalQuote(if_.condition, env);
        const thenBranch = this.quoteEvaluator.evalQuote(if_.thenBranch, env);
        const elseBranch = if_.elseBranch ? this.quoteEvaluator.evalQuote(if_.elseBranch, env) : null;
        return { kind: "if", condition: this.quoteEvaluator.convertQuotedToAstSingle(cond as Expr | SpliceMarker), thenBranch: this.quoteEvaluator.convertQuotedToAstSingle(thenBranch as Expr | SpliceMarker), elseBranch: elseBranch ? this.quoteEvaluator.convertQuotedToAstSingle(elseBranch as Expr | SpliceMarker) : null, location: if_.location } as IfExpr;
      }

      case "type-assert": {
        const ta = expr as TypeAssertExpr;
        const processed = this.quoteEvaluator.evalQuote(ta.expr, env);
        return { kind: "type-assert", expr: this.quoteEvaluator.convertQuotedToAstSingle(processed as Expr | SpliceMarker), typeAnnotation: ta.typeAnnotation, location: ta.location } as TypeAssertExpr;
      }

      case "new": {
        const n = expr as NewExpr;
        const callee = this.quoteEvaluator.evalQuote(n.callee, env);
        const args = n.args.map(a => this.quoteEvaluator.evalQuote(a, env) as Expr | SpliceMarker);
        let argsAst = this.quoteEvaluator.flattenQuotedArgs(args as any);
        if (argsAst.length === 1 && argsAst[0].kind === "array") {
          argsAst = (argsAst[0] as ArrayExpr).elements;
        }
        return { kind: "new", callee: this.convertQuotedToAstSingle(callee as Expr | SpliceMarker), args: argsAst, location: n.location } as NewExpr;
      }

      case "array": {
        const arr = expr as ArrayExpr;
        const processed = arr.elements.map(e => this.quoteEvaluator.evalQuote(e, env) as Expr | SpliceMarker);
        return {
          ...arr,
          elements: this.quoteEvaluator.flattenQuotedArgs(processed as any)
        };
      }

      case "block": {
        const block = expr as BlockStmt;
        const processed = block.body.map(e => this.quoteEvaluator.evalQuote(e, env) as Expr | SpliceMarker);
        const body = this.quoteEvaluator.flattenQuotedArgs(processed as any);
        return { kind: "block", body, location: block.location } as BlockStmt;
      }

      case "let*": {
        const let_ = expr as LetStarExpr;
        const bindings: LetBinding[] = [];
        for (const b of let_.bindings) {
          const nameExpr = this.quoteEvaluator.evalQuote(b.name, env);
            const nameAst = this.quoteEvaluator.convertQuotedToAstSingle(nameExpr as Expr | SpliceMarker);
            const initExpr = this.quoteEvaluator.evalQuote(b.init, env);
            const initAst = this.quoteEvaluator.convertQuotedToAstSingle(initExpr as Expr | SpliceMarker);
          if (nameAst.kind === "identifier") {
            bindings.push({ name: nameAst as Identifier, init: initAst });
          } else {
            // Fallback: keep original name
            bindings.push({ name: b.name, init: initAst });
          }
        }
        const processed = let_.body.map(e => this.quoteEvaluator.evalQuote(e, env) as Expr | SpliceMarker);
        return { kind: "let*", bindings, body: this.quoteEvaluator.flattenQuotedArgs(processed as any), isConst: let_.isConst, location: let_.location } as LetStarExpr;
      }

      default:
        return expr;
    }
  }

  private substituteAndExpand(expr: Expr, bindings: Map<string, Expr>): Expr {
    return this.substitutor.substituteAndExpand(expr as any, bindings) as Expr;
  }

  /**
   * Expand gensym to produce a unique identifier
   */
  private expandGensym(gensym: GensymExpr): Identifier {
    return this.gensymFacade.expandGensym(gensym);
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
    return this.quoteEvaluator.isSplice(node);
  }

  private convertQuotedToAstSingle(node: Expr | SpliceMarker): Phase0Expr {
    return this.quoteEvaluator.convertQuotedToAstSingle(node as any);
  }

  private flattenQuotedArgs(nodes: Array<Expr | SpliceMarker>): Phase0Expr[] {
    return this.quoteEvaluator.flattenQuotedArgs(nodes as any) as Phase0Expr[];
  }

  private convertQuotedToAst(expr: Expr | SpliceMarker): Expr | SpliceMarker {
    return this.quoteEvaluator.convertQuotedToAst(expr as any) as any;
  }



  /**
   * Expand quoted expression (handles gensyms)
   */
  private expandQuotedExpr(expr: Expr): Expr {
    return this.gensymFacade.expandQuotedExpr(expr);
  }

  private walkAndExpandGensyms(expr: Expr): Expr {
    return this.gensymFacade.walkAndExpandGensyms(expr);
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
