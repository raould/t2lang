import test from 'node:test';
import assert from 'node:assert';
import * as cli from '../src/cliHelper.ts';
const showHelp = cli.showHelp;

test('showHelp lists supported trace phases', () => {
    const logs = [];
    const orig = console.log;
    console.log = (...args) => logs.push(args.join(' '));
    try {
        showHelp();
    } finally {
        console.log = orig;
    }
    const joined = logs.join('\n');
    assert.ok(joined.includes('parse, expand, resolve, typeCheck, codegen, tsc'), 'expected help to list supported trace phases');
});
