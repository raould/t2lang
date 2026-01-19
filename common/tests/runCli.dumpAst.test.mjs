import test from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs';
import * as cli from '../src/cliHelper.ts';
const runCli = cli.runCli;

test('runCli --ast prints AST dump to stderr', async () => {
    const oldArgv = process.argv;
    const oldConsoleError = console.error;
    let captured = '';
    console.error = (...args) => { captured += args.join(' ') + '\n'; };
    const tmpPath = 'tmp_input_for_test.t2';
    try {
        fs.writeFileSync(tmpPath, 'program', 'utf-8');
        process.argv = ['node', 't2c', tmpPath, '--ast'];
        const compileFn = async (_source, _config) => {
            void _source; void _config;
            return {
                tsSource: '',
                errors: [],
                events: [{ phase: 'parse', kind: 'astDump', data: { ast: { test: true } } }]
            };
        };
        await runCli('Test', compileFn, { pretty: 'pretty', ugly: 'ugly' }, './package.json');
        assert.match(captured, /--- AST/);
        assert.match(captured, /\(object \(field test true\)\)/);
    } finally {
        try { fs.unlinkSync(tmpPath); } catch (e) { void e; };
        process.argv = oldArgv;
        console.error = oldConsoleError;
    }
});