import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from "../../../src/api";

test('T2_DEBUG_PARSE prints parsed AST in phase0', async () => {
    const old = process.env.T2_DEBUG_PARSE;
    const oldErr = console.error;
    let captured = '';
    (console as any).error = (...args: unknown[]) => { captured += args.join(' ') + '\n'; };
    // sanity check the override works
    console.error('SANITY');
    assert.ok(captured.includes('SANITY'));
    try {
        process.env.T2_DEBUG_PARSE = '1';
        oldErr('ENV_PARSE=' + process.env.T2_DEBUG_PARSE);
        await compilePhase0('(program)', { dumpAst: false });
        // print captured for diagnosis using original console
        oldErr('DEBUGOUTPUT_PARSED:' + captured);
        assert.ok(captured.includes('[DEBUG] Parsed AST'), 'expected debug parsed AST output');
    } finally {
        if (old === undefined) delete process.env.T2_DEBUG_PARSE;
        else process.env.T2_DEBUG_PARSE = old;
        console.error = oldErr;
    }
});

test('T2_DEBUG_CODEGEN prints codegen output in phase0', async () => {
    const old = process.env.T2_DEBUG_CODEGEN;
    const oldErr = console.error;
    let captured = '';
    (console as any).error = (...args: unknown[]) => { captured += args.join(' ') + '\n'; };
    // sanity check the override works
    console.error('SANITY');
    assert.ok(captured.includes('SANITY'));
    try {
        process.env.T2_DEBUG_CODEGEN = '1';
        await compilePhase0('(program)', { dumpAst: false });
        oldErr('DEBUGOUTPUT_CODEGEN:' + captured);
        // codegen runs but we only assert debug log happened
        assert.ok(captured.includes('[DEBUG] Codegen output'), 'expected debug codegen output');
    } finally {
        if (old === undefined) delete process.env.T2_DEBUG_CODEGEN;
        else process.env.T2_DEBUG_CODEGEN = old;
        console.error = oldErr;
    }
});
