import test from 'node:test';
import assert from 'node:assert';
import { Parser } from '../../src/parse/parser.js';
import { MacroExpander } from '../../src/expand/macroExpander.js';
import { ArrayEventSink } from '../../src/events/eventSink.js';

import type { CompilerContext } from '../../src/api.js';

test('type-object edge cases: nested/quoted/mixed forms', () => {
  const src = `
    (program
      ;; parenthesized sigil with parenthesized type
      (type-alias T1 (type-object (.a: (type-ref "TypeA"))))
      ;; quoted field name with colon shorthand
      (type-alias T2 (type-object ("b" : TypeB)))
      ;; mixed whitespace and nested parentheses
      (type-alias T3 (type-object (.c: (type-union (type-ref "A") (type-ref "B")))))
    )
  `;

  const ctx: CompilerContext = { config: { logLevel: 'none', prettyOutput: 'pretty', dumpAst: false, seed: 'default', tracePhases: [], emitTypes: false }, eventSink: new ArrayEventSink() };
  const parser = new Parser('input.t2', src, ctx);
  const ast = parser.parseProgram();
  const expander = new MacroExpander(ctx);
  const out = expander.expandProgram(ast);

  function isTypeAlias(node) {
    if (typeof node !== 'object' || node === null) return false;
    const o = /** @type {Record<string, unknown>} */ (node);
    if (o.kind !== 'type-alias') return false;
    const name = o.name as Record<string, unknown> | undefined;
    return !!name && typeof name.name === 'string';
  }

  const names = out.body.filter(isTypeAlias).map(s => (s).name.name);
  assert.deepStrictEqual(names.sort(), ['T1', 'T2', 'T3'].sort());

  // Ensure each type-alias has a type-object with normalized field names
  for (const ta of out.body.filter(isTypeAlias)) {
    const t = (ta).typeAnnotation;
    assert.strictEqual(t.kind, 'type-object');
    for (const f of t.fields) {
      assert.strictEqual(typeof f.name, 'string');
      // name should not include leading dot or trailing colon
      assert(!f.name.startsWith('.'));
      assert(!f.name.endsWith(':'));
    }
  }
});
