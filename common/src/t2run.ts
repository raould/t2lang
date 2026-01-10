import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function usage(): never {
    console.error('Usage: t2run <input.t2> [-- <tsc args>] [--node-args ...]');
    process.exit(1);
}

const raw = process.argv.slice(2);
if (raw.length === 0) usage();

const input = raw[0];
const rest = raw.slice(1);

const firstSep = rest.indexOf('--');
let tscArgs: string[] = [];
let nodeArgs: string[] = [];
if (firstSep === -1) {
    tscArgs = rest;
} else {
    tscArgs = rest.slice(0, firstSep);
    const after = rest.slice(firstSep + 1);
    const nodeSep = after.indexOf('--');
    if (nodeSep === -1) {
        nodeArgs = after;
    } else {
        nodeArgs = after.slice(nodeSep + 1);
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const t2jc = path.join(__dirname, '..', 'dist', 't2jc.js');
if (!fs.existsSync(t2jc)) {
    console.error('t2jc CLI not found at', t2jc);
    process.exit(1);
}

const t2jcArgs = [input, '--', ...tscArgs].filter(Boolean);
console.error('Running t2jc', t2jcArgs.join(' '));
let r = spawnSync(process.execPath, [t2jc, ...t2jcArgs], { stdio: 'inherit' });
if (r.error) {
    console.error('Failed to run t2jc:', r.error);
    process.exit(1);
}
if (r.status !== 0) process.exit(r.status ?? 1);

const p = path.parse(input);
const jsFile = path.join(p.dir || '.', p.name + '.js');
if (!fs.existsSync(jsFile)) {
    console.error('Expected JS output not found:', jsFile);
    process.exit(1);
}

const nodeCmdArgs = [jsFile, ...nodeArgs];
console.error('Running node', nodeCmdArgs.join(' '));
r = spawnSync('node', nodeCmdArgs, { stdio: 'inherit' });
if (r.error) {
    console.error('Failed to run node:', r.error);
    process.exit(1);
}
process.exit(r.status ?? 0);
