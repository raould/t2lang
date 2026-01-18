import test from 'node:test';
import assert from 'node:assert';
import { compilePhase1 } from "../../../src/api";

test('T2_DEBUG_EXPAND prints expanded AST', async () => {
    const old = process.env.T2_DEBUG_EXPAND;
    const oldErr = console.error;
    let captured = '';
    (console as any).error = (...args: unknown[]) => { captured += args.join(' ') + '\n'; };
    try {
        process.env.T2_DEBUG_EXPAND = '1';
        const src = '(program)';
        await compilePhase1(src, { dumpAst: false });
        assert.match(captured, /\[DEBUG\] Expanded AST/, 'expected debug expanded AST output');
    } finally {
        if (old === undefined) delete process.env.T2_DEBUG_EXPAND;
        else process.env.T2_DEBUG_EXPAND = old;
        console.error = oldErr;
    }
});

test('T2_DEBUG_PARSE prints parsed AST', async () => {
    const old = process.env.T2_DEBUG_PARSE;
    const oldErr = console.error;
    let captured = '';
    (console as any).error = (...args: unknown[]) => { captured += args.join(' ') + '\n'; };
    try {
        process.env.T2_DEBUG_PARSE = '1';
        const src = '(program)';
        await compilePhase1(src, { dumpAst: false });
        assert.match(captured, /\[DEBUG\] Parsed AST/, 'expected debug parsed AST output');
    } finally {
        if (old === undefined) delete process.env.T2_DEBUG_PARSE;
        else process.env.T2_DEBUG_PARSE = old;
        console.error = oldErr;
    }
});
