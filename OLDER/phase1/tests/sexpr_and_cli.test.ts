import test from 'node:test';
import assert from 'node:assert/strict';

import { compilePhase1 } from '../src/api.js';

const { printSexpr } = await import('../src/util/sexprPrinter.js');

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
    } as unknown;
    const out = printSexpr(ast);
    assert.strictEqual(out, '(program (foo 1))');
});

test('compilePhase1 emits parse and expand astDump events printable by sexpr printer', async () => {
    const src = '(program (foo 1))';
    const res = await compilePhase1(src, { dumpAstBeforeExpand: true, dumpAstAfterExpand: true, dumpAst: false });
    const parseDump = (res.events).find((e: unknown) => isAstDump(e) && (e).phase === 'parse');
    assert.ok(parseDump, 'parse astDump present');
    const s = printSexpr((parseDump).data.ast);
    assert.ok(typeof s === 'string' && s.length > 0, 'parse dump printable');
    const expandDump = (res.events).find((e: unknown) => isAstDump(e) && (e).phase === 'expand');
    assert.ok(expandDump, 'expand astDump present');
    const s2 = printSexpr((expandDump).data.ast);
    assert.ok(typeof s2 === 'string' && s2.length > 0, 'expand dump printable');
});

function isAstDump(e: unknown): e is { kind: string; phase: string; data: Record<string, unknown> } {
    if (typeof e !== 'object' || e === null) return false;
    const o = e as Record<string, unknown>;
    return o.kind === 'astDump' && typeof o.phase === 'string' && isObject(o.data);
}

function isObject(x: unknown): x is Record<string, unknown> { return typeof x === 'object' && x !== null; }
