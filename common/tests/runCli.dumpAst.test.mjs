import test from 'node:test';
import assert from 'node:assert';
import { runCli } from '../src/cliHelper.js';

test('runCli --ast prints AST dump to stderr', async () => {
    const oldArgv = process.argv;
    const oldConsoleError = console.error;
    let captured = '';
    console.error = (...args) => { captured += args.join(' ') + '\n'; };
    try {
        process.argv = ['node', 't2c', 'input.t2', '--ast'];
        const compileFn = async (source, config) => {
            return {
                tsSource: '',
                errors: [],
                events: [{ phase: 'parse', kind: 'astDump', data: { ast: { test: true } } }]
            };
        };
        await runCli('Test', compileFn, { pretty: 'newlines', newlines: 'newlines', ugly: 'ugly' }, './package.json');
        assert.ok(captured.includes('--- AST ---'));
        assert.ok(captured.includes('"test": true'));
    } finally {
        process.argv = oldArgv;
        console.error = oldConsoleError;
    }
});