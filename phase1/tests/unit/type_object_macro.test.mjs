import test from 'node:test';
import assert from 'node:assert';
import { Parser } from '../../src/parse/parser.js';
import { MacroExpander } from '../../src/expand/macroExpander.js';
import { ArrayEventSink } from '../../src/events/eventSink.js';

import type { CompilerContext } from '../../src/api.js';

test('type-object macro canonicalizes dot-sigil and colon shorthand', () => {
  const src = `
    (program
      (type-alias AllowedElements (type-object (.video: TypeA) ("audio" : TypeB) ("canvas" (type-ref "TypeC"))))
    )
  `;

  const ctx: CompilerContext = { config: { logLevel: 'none', prettyOutput: 'pretty', dumpAst: false, seed: 'default', tracePhases: [], emitTypes: false }, eventSink: new ArrayEventSink() };
  const parser = new Parser('input.t2', src, ctx);
  const ast = parser.parseProgram();
  const expander = new MacroExpander(ctx);
  const out = expander.expandProgram(ast);

  // Find AllowedElements type-alias
  function isTypeAlias(node) {
    if (typeof node !== 'object' || node === null) return false;
    const o = /** @type {Record<string, unknown>} */ (node);
    if (o.kind !== 'type-alias') return false;
    const name = o.name as Record<string, unknown> | undefined;
    return !!name && typeof name.name === 'string';
  }

  const ta = out.body.find(isTypeAlias);
  assert(ta, 'type-alias AllowedElements exists');
  const t = (ta).typeAnnotation;
  assert(t.kind === 'type-object', 'type is object');
  const names = (t.fields.map(f => f.name)).sort();
  assert.deepStrictEqual(names, ['audio', 'canvas', 'video']);
});
