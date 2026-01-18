import test from 'node:test';
import assert from 'node:assert/strict';

import { printSexpr } from '../src/util/sexprPrinter.js';
import { compilePhase1 } from '../src/api.js';

test('sexpr printer prints simple program', () => {
    const ast = {
        kind: 'program',
        body: [
            {
                kind: 'call',
                callee: { kind: 'identifier', name: 'foo' },
                args: [{ kind: 'literal', value: 1 }]
            }
        ]
    } as any;
    const out = printSexpr(ast);
    assert.strictEqual(out, '(program (foo 1))');
});

test('compilePhase1 emits parse and expand astDump events printable by sexpr printer', async () => {
    const src = '(program (foo 1))';
    const res = await compilePhase1(src, { dumpAstBeforeExpand: true, dumpAstAfterExpand: true, dumpAst: false });
    const parseDump = (res.events as any).find((e: any) => e.kind === 'astDump' && e.phase === 'parse');
    assert.ok(parseDump, 'parse astDump present');
    const s = printSexpr((parseDump as any).data.ast);
    assert.ok(typeof s === 'string' && s.length > 0, 'parse dump printable');

    const expandDump = (res.events as any).find((e: any) => e.kind === 'astDump' && e.phase === 'expand');
    assert.ok(expandDump, 'expand astDump present');
    const s2 = printSexpr((expandDump as any).data.ast);
    assert.ok(typeof s2 === 'string' && s2.length > 0, 'expand dump printable');
});
