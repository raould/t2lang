import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('dist t2 wrappers exist and contain expected markers', async () => {
    const dist = path.join(__dirname, '..', 'dist');
    const t2jc = path.join(dist, 't2jc.js');
    const t2run = path.join(dist, 't2run.js');

    assert.ok(fs.existsSync(t2jc), 't2jc.js should exist in dist');
    assert.ok(fs.existsSync(t2run), 't2run.js should exist in dist');

    const jc = fs.readFileSync(t2jc, 'utf-8');
    const run = fs.readFileSync(t2run, 'utf-8');

    // Simple content checks to ensure the wrappers were built from the TS sources
    assert.match(jc, /Running t2tc/);
    assert.match(run, /Running t2jc|Running node/);
});
