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

  const ctx: CompilerContext = { config: { logLevel: "none", prettyOutput: "pretty", dumpAst: false, seed: "default", tracePhases: [], emitTypes: false }, eventSink: new ArrayEventSink() };
  const parser = new Parser("input.t2", src, ctx);
  const ast = parser.parseProgram();
  const expander = new MacroExpander(ctx);
  const out = expander.expandProgram(ast);

  // Ensure no defmacro statements
  assert(out.body.every(s => s.kind !== "defmacro"));

  // Traverse AST to check no gensym nodes
  const hasGensym = (function walkStmtArray(stmts: unknown[]): boolean {
    for (const s of stmts) {
      if (walkStmt(s)) return true;
    }
    return false;
  })(out.body);

  function isObject(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object' && x !== null;
  }

  function walkStmt(stmt: unknown): boolean {
    if (!isObject(stmt)) return false;
    const o = stmt as Record<string, unknown>;
    const kind = typeof o.kind === 'string' ? o.kind : undefined;
    if (kind === 'exprStmt') return walkExpr(o.expr);
    if (kind === 'block') return Array.isArray(o.body) && (o.body as unknown[]).some(e => walkExpr(e));
    if (kind === 'let*') {
      const bindings = Array.isArray(o.bindings) ? (o.bindings as unknown[]) : [];
      if (bindings.some(b => isObject(b) && walkExpr((b as Record<string, unknown>).init))) return true;
      return Array.isArray(o.body) && (o.body as unknown[]).some(e => walkExpr(e));
    }
    return false;
  }

  function walkExpr(expr: unknown): boolean {
    if (!isObject(expr)) return false;
    const o = expr as Record<string, unknown>;
    const kind = typeof o.kind === 'string' ? o.kind : undefined;
    if (kind === 'gensym') return true;
    switch (kind) {
      case 'call':
        return walkExpr(o.callee) || (Array.isArray(o.args) && (o.args as unknown[]).some(a => walkExpr(a)));
      case 'let*':
        return (Array.isArray(o.bindings) && (o.bindings as unknown[]).some(b => isObject(b) && walkExpr((b as Record<string, unknown>).init))) || (Array.isArray(o.body) && (o.body as unknown[]).some(e => walkExpr(e)));
      case 'block':
        return Array.isArray(o.body) && (o.body as unknown[]).some(e => walkExpr(e));
      case 'array':
        return Array.isArray(o.elements) && (o.elements as unknown[]).some(e => walkExpr(e));
      case 'object':
        return Array.isArray(o.fields) && (o.fields as unknown[]).some(f => isObject(f) && walkExpr((f as Record<string, unknown>).value));
      case 'function':
        return Array.isArray(o.body) && (o.body as unknown[]).some(e => walkExpr(e));
      case 'if':
        return walkExpr(o.condition) || walkExpr(o.thenBranch) || (o.elseBranch && walkExpr(o.elseBranch));
      case 'return':
        return !!o.value && walkExpr(o.value);
      case 'while':
        return walkExpr(o.condition) || (Array.isArray(o.body) && (o.body as unknown[]).some(e => walkExpr(e)));
      case 'assign':
        return walkExpr(o.target) || walkExpr(o.value);
      case 'index':
        return walkExpr(o.object) || walkExpr(o.index);
      case 'new':
        return walkExpr(o.callee) || (Array.isArray(o.args) && (o.args as unknown[]).some(a => walkExpr(a)));
      case 'class':
        return (Array.isArray(o.fields) && (o.fields as unknown[]).some(f => isObject(f) && (f as Record<string, unknown>).initializer && walkExpr((f as Record<string, unknown>).initializer))) || (Array.isArray(o.methods) && (o.methods as unknown[]).some(m => Array.isArray((m as Record<string, unknown>).body) && ((m as Record<string, unknown>).body as unknown[]).some(e => walkExpr(e))));
      case 'type-assert':
        return walkExpr(o.expr);
      case 'throw':
        return walkExpr(o.value);
      case 'try-catch':
        return (Array.isArray(o.tryBody) && (o.tryBody as unknown[]).some(e => walkExpr(e))) || (Array.isArray(o.catchBody) && (o.catchBody as unknown[]).some(e => walkExpr(e))) || (Array.isArray(o.finallyBody) && (o.finallyBody as unknown[]).some(e => walkExpr(e)));
      default:
        return false;
    }
  }

  assert.strictEqual(hasGensym, false);
});
