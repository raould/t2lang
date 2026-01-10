import test from 'node:test';
import assert from 'node:assert';
import * as cli from '../src/cliHelper.ts';
const parseArgs = cli.parseArgs;

test('parseArgs validates trace phases', () => {
    let threw = false;
    try {
        parseArgs(['--trace', 'parse,badphase']);
    } catch (e) {
        threw = true;
        assert.ok(e instanceof Error);
        assert.match(e.message, /Unknown trace phase/);
    }
    assert.ok(threw, 'Expected parseArgs to throw for unknown trace phase');
});