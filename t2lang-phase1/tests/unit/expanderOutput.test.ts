import test from "node:test";
import assert from "node:assert";
import { Parser } from "../../src/parse/parser.js";
import { MacroExpander } from "../../src/expand/macroExpander.js";
import { ArrayEventSink } from "../../src/events/eventSink.js";

import type { CompilerContext } from "../../src/api.js";

test("MacroExpander output contains no defmacro or gensym nodes", () => {
  const src = `
    (program
      (defmacro with-temp (val body)
        (let* ((temp (gensym "tmp")))
          (quote (let* ((~temp ~val)) ~body))))
      (with-temp 42 (call (prop console "log") temp)))
  `;

  const ctx: CompilerContext = { config: { logLevel: "none", prettyOutput: "newlines", dumpAst: false, seed: "default", tracePhases: [], emitTypes: false, enableTsc: false }, eventSink: new ArrayEventSink() };
  const parser = new Parser("input.t2", src, ctx as any);
  const ast = parser.parseProgram();
  const expander = new MacroExpander(ctx as any);
  const out = expander.expandProgram(ast);

  // Ensure no defmacro statements
  assert(out.body.every(s => s.kind !== "defmacro"));

  // Traverse AST to check no gensym nodes
  const hasGensym = (function walkStmtArray(stmts: any[]): boolean {
    for (const s of stmts) {
      if (walkStmt(s)) return true;
    }
    return false;
  })(out.body as any[]);

  function walkStmt(stmt: any): boolean {
    if (stmt.kind === "exprStmt") return walkExpr(stmt.expr);
    if (stmt.kind === "block") return stmt.body.some((e: any) => walkExpr(e));
    if (stmt.kind === "let*") return stmt.bindings.some((b: any) => walkExpr(b.init)) || stmt.body.some((e: any) => walkExpr(e));
    return false;
  }

  function walkExpr(expr: any): boolean {
    if (!expr) return false;
    if (expr.kind === "gensym") return true;
    switch (expr.kind) {
      case "call":
        return walkExpr(expr.callee) || expr.args.some((a: any) => walkExpr(a));
      case "let*":
        return expr.bindings.some((b: any) => walkExpr(b.init)) || expr.body.some((e: any) => walkExpr(e));
      case "block":
        return expr.body.some((e: any) => walkExpr(e));
      case "array":
        return expr.elements.some((e: any) => walkExpr(e));
      case "object":
        return expr.fields.some((f: any) => walkExpr(f.value));
      case "function":
        return expr.body.some((e: any) => walkExpr(e));
      case "if":
        return walkExpr(expr.condition) || walkExpr(expr.thenBranch) || (expr.elseBranch && walkExpr(expr.elseBranch));
      case "return":
        return expr.value ? walkExpr(expr.value) : false;
      case "while":
        return walkExpr(expr.condition) || expr.body.some((e: any) => walkExpr(e));
      case "assign":
        return walkExpr(expr.target) || walkExpr(expr.value);
      case "index":
        return walkExpr(expr.object) || walkExpr(expr.index);
      case "new":
        return walkExpr(expr.callee) || expr.args.some((a: any) => walkExpr(a));
      case "class":
        return expr.fields.some((f: any) => f.initializer && walkExpr(f.initializer)) || expr.methods.some((m: any) => m.body.some((e: any) => walkExpr(e)));
      case "type-assert":
        return walkExpr(expr.expr);
      case "throw":
        return walkExpr(expr.value);
      case "try-catch":
        return expr.tryBody.some((e: any) => walkExpr(e)) || expr.catchBody.some((e: any) => walkExpr(e)) || expr.finallyBody.some((e: any) => walkExpr(e));
      default:
        return false;
    }
  }

  assert.strictEqual(hasGensym, false);
});
