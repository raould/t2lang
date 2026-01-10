import test from 'node:test';
import assert from 'node:assert';
import { Parser } from '../../src/parse/parser.js';
import { MacroExpander } from '../../src/expand/macroExpander.js';
import { ArrayEventSink } from '../../src/events/eventSink.js';
import type { CompilerContext } from '../../src/api.js';
import type { Statement, Phase0Program } from '../../src/ast/nodes.js';

// Unit-level test that exercises MacroExpander over a small parsed program.
// This focuses on macro expansion behavior (splicing, gensym) without running full compilation.

test('MacroExpander expands spliced let* bindings and gensym hygiene', async () => {
    const source = `
    (program
      (defmacro mkbinds (lst) (quote (let* (~@lst) (array x y))))
      (mkbinds (array (call x 1) (call y 2))))
  `;

    const ctx: CompilerContext = { config: { dumpAst: false, seed: 'test' }, eventSink: new ArrayEventSink() };
    const parser = new Parser('input.t2', source, ctx);
    const parsed = parser.parseProgram();

    const expander = new MacroExpander(ctx);
    const expanded = expander.expandProgram(parsed) as Phase0Program;

    // Basic sanity
    assert.ok(expanded && Array.isArray(expanded.body));

    // Ensure macro call was expanded (no defmacro left)
    const hasDefmacro = expanded.body.some((s: Statement) => s.kind === 'defmacro');
    assert.strictEqual(hasDefmacro, false, 'defmacro should be removed by expansion');

    // Expect let bindings to be present because mkbinds splices bindings into let*
    function isExprStmtWithLet(s: unknown) {
        if (typeof s !== 'object' || s === null) return false;
        const o = /** @type {Record<string, unknown>} */ (s);
        if (o.kind === 'let*') return true;
        if (o.kind === 'exprStmt' && typeof o.expr === 'object' && o.expr !== null) {
            const expr = /** @type {Record<string, unknown>} */ (o.expr);
            return expr.kind === 'let*';
        }
        return false;
    }

    const hasLet = expanded.body.some(isExprStmtWithLet);
    assert.strictEqual(hasLet, true, 'expected a let* to be produced by spliced bindings');

    // Ensure there are no raw gensym nodes in the expanded output
    const containsGensym = JSON.stringify(expanded).includes('gensym');
    assert.strictEqual(containsGensym, false, 'expanded output should not contain gensym nodes');
});
