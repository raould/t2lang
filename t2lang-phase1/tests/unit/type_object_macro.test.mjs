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

    const ctx: CompilerContext = { config: { logLevel: 'none', prettyOutput: 'newlines', dumpAst: false, seed: 'default', tracePhases: [], emitTypes: false, enableTsc: false }, eventSink: new ArrayEventSink() };
    const parser = new Parser('input.t2', src, ctx as any);
    const ast = parser.parseProgram();
    const expander = new MacroExpander(ctx as any);
    const out = expander.expandProgram(ast as any);

    // Find AllowedElements type-alias
    const ta = out.body.find((s: any) => s.kind === 'type-alias' && s.name && s.name.name === 'AllowedElements');
    assert(ta, 'type-alias AllowedElements exists');
    const t = ta.typeAnnotation;
    assert(t.kind === 'type-object', 'type is object');
    const names = t.fields.map((f: any) => f.name).sort();
    assert.deepStrictEqual(names, ['audio', 'canvas', 'video']);
});
