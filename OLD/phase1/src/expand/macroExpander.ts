import { GensymGenerator, QuotedToAstConverter, Substitutor } from "phase0";
import type { Program, Expr, Statement, Phase0Program, LetBinding, ArrayExpr } from "../ast/nodes.js";
import { SpliceMarker, isSplice as isSpliceGuard } from "./types.js";
import { MacroRegistryManager } from "./macroRegistry.js";
import { GensymFacade } from "./gensym.js";
import { QuoteEvaluator } from "./quoteEval.js";
import type { CompilerContext } from "../api.js";

export class MacroExpander {
  ctx: CompilerContext;
  registryManager: MacroRegistryManager | null = null;
  gensymGen: GensymGenerator;
  quotedConverter: QuotedToAstConverter;
  substitutor: Substitutor;

  constructor(ctx: CompilerContext) {
    this.ctx = ctx;
    this.gensymGen = new GensymGenerator();
    this.quotedConverter = new QuotedToAstConverter();
    this.substitutor = new Substitutor();
  }

  expandProgram(program: Program): Phase0Program {
    // Collect macros
    this.registryManager = new MacroRegistryManager(this.ctx);
    this.registryManager.collectMacros(program);

    const gensymFacade = new GensymFacade();
    const quoteEval = new QuoteEvaluator(this.quotedConverter, gensymFacade, this.substitutor, this.substitutor.cloneExpr.bind(this.substitutor), (e: Expr) => e);

    // Walk and expand
    const expandedBody = program.body.map(stmt => this.walkAndExpand(stmt, quoteEval)) as Statement[];

    // Return a program-shaped object (Phase0 conversion happens inside quoteEval as needed)
    return { ...program, body: expandedBody as Statement[] } as unknown as Phase0Program;
  }
  macroexpand(expr: Expr): Expr { return this.expandExpr(expr); }
  macroexpand1(expr: Expr): Expr { return expr; }

  collectMacros(): void { }

  expandStatements(stmts: Statement[]): Statement[] { return stmts.map(s => this.expandStatement(s)); }
  expandStatement(stmt: Statement): Statement { return stmt; }
  expandExpr(expr: Expr): Expr { return expr; }

  toPhase0(e: Expr): Expr { return e; }
  isSplice(node: unknown): node is SpliceMarker { return isSpliceGuard(node); }

  private walkAndExpand(node: unknown, quoteEval: QuoteEvaluator): unknown {
    if (!node || typeof node !== "object") return node;
    const obj = node as unknown as Record<string, unknown>;

    // Expand expression statements
    if (obj.kind === "exprStmt") {
      return { ...(obj as unknown as Record<string, unknown>), expr: this.walkAndExpand((obj as unknown as Record<string, unknown>).expr, quoteEval) } as Statement;
    }

    // Expand calls
    if (obj.kind === "call") {
      const callNode = node as unknown as Record<string, unknown>;
      const callee = (callNode.callee as unknown) as Record<string, unknown> | undefined;
      // If callee is identifier and matches a macro, perform macro expansion
      if (callee && callee.kind === "identifier" && this.registryManager) {
        const name = typeof callee.name === 'string' ? callee.name : String((callee as unknown as Record<string, unknown>).name);
        const macro = this.registryManager.get(name);
        if (macro) {
          const env = new Map<string, Expr>();
          for (let i = 0; i < (macro.params || []).length; i++) {
            const p = macro.params[i];
            const arg = Array.isArray(callNode.args) && callNode.args[i] ? this.walkAndExpand(callNode.args[i], quoteEval) as Expr : ({ kind: "literal", value: null } as Expr);
            env.set(p.name, arg as Expr);
          }

          const bodyExpr = (macro.body && macro.body.length > 0) ? macro.body[macro.body.length - 1] : null;
          if (!bodyExpr) return node;

          // First, evaluate macro-time expressions (let*, gensym, unquote, splice)
          const evaluated = quoteEval.evalMacroExpr(bodyExpr, env);
          // Then convert quoted structures to Phase0 AST
          let substituted: Expr | SpliceMarker;
          try {
            substituted = this.quotedConverter.convertQuotedToAst(evaluated as Expr);
          } catch {
            // Fallback to substitutor-based substitution if conversion fails
            substituted = this.substitutor.substituteAndExpand(bodyExpr as unknown as Expr, env) as Expr;
          }


          // If substitution produced a let* but bindings are empty, and the
          // macro had a spliced binding parameter, synthesize bindings from
          // the provided array argument.
          if (substituted && ((substituted as unknown as Record<string, unknown>).kind === "let*") && Array.isArray(((substituted as unknown as Record<string, unknown>).bindings))) {
            const bindingsArr = ((substituted as unknown as Record<string, unknown>).bindings) as unknown[];
            if (bindingsArr.length === 0) {
              for (const p of (macro.params || [])) {
                const val = env.get(p.name);
                if (val && (val as Expr).kind === "array" && Array.isArray((val as ArrayExpr).elements)) {
                  for (const el of (val as ArrayExpr).elements) {
                    const parsed = this.quotedConverter.parseBindingFromExpr(el as Expr);
                    if (parsed) (substituted as unknown as Record<string, unknown>).bindings = [...bindingsArr, parsed as LetBinding];
                  }
                }
              }
            }
          }

          return substituted as unknown as Statement | Expr;
        }
      }

      // Otherwise, recursively expand callee and args
      return { ...(callNode as unknown as Record<string, unknown>), callee: this.walkAndExpand(callNode.callee, quoteEval), args: Array.isArray(callNode.args) ? (callNode.args as unknown[]).map(a => this.walkAndExpand(a, quoteEval)) : [] } as unknown as Expr;
    }

    // Recurse into common container shapes
    const res: Record<string, unknown> = Array.isArray(node) ? [] as unknown as Record<string, unknown> : { ...((node as unknown) as Record<string, unknown>) };
    for (const k of Object.keys(node as object)) {
      if (k === "kind") continue;
      // dynamic traversal of AST-like objects
      const v = ((node as unknown) as Record<string, unknown>)[k];
      if (Array.isArray(v)) res[k] = (v as unknown[]).map(it => this.walkAndExpand(it, quoteEval));
      else if (typeof v === "object" && v !== null) res[k] = this.walkAndExpand(v, quoteEval);
      else res[k] = v;
    }
    return res as unknown as Statement | Expr | null;
  }

}

