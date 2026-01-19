import { Expr, GensymExpr, Identifier, CallExpr, LetStarExpr, ArrayExpr } from "../ast/nodes.js";
import { GensymGenerator, QuotedToAstConverter } from "t2lang-phase0";

export class GensymFacade {
  private gensymGen = new GensymGenerator();

  expandGensym(gensym: GensymExpr): Identifier {
    return this.gensymGen.expandGensym({ prefix: gensym.prefix, generatedName: gensym.generatedName, location: gensym.location });
  }

  expandQuotedExpr(expr: Expr): Expr {
    if (expr.kind === "gensym") {
      return this.expandGensym(expr as GensymExpr);
    }
    return this.walkAndExpandGensyms(expr);
  }

  walkAndExpandGensyms(expr: Expr): Expr {
    switch (expr.kind) {
      case "gensym":
        return this.expandGensym(expr as GensymExpr);
      case "call": {
        const call = expr as CallExpr;
        return {
          ...call,
          callee: this.walkAndExpandGensyms(call.callee) as any,
          args: call.args.map(a => this.walkAndExpandGensyms(a) as any)
        } as CallExpr as unknown as Expr;
      }
      case "let*": {
        const let_ = expr as LetStarExpr;
        return {
          ...let_,
          bindings: let_.bindings.map(b => ({ ...b, init: this.walkAndExpandGensyms(b.init) as any })),
          body: let_.body.map(e => this.walkAndExpandGensyms(e) as any)
        } as LetStarExpr as unknown as Expr;
      }
      case "array": {
        const arr = expr as ArrayExpr;
        return { ...arr, elements: arr.elements.map(e => this.walkAndExpandGensyms(e) as any) } as ArrayExpr as unknown as Expr;
      }
      default:
        return expr;
    }
  }
}
