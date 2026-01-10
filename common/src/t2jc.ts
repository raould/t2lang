import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function usage(): never {
    console.error('Usage: t2jc <input.t2> [-- <tsc args>]');
    process.exit(1);
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) usage();

// Support `--` to pass extra args to tsc
const dashIndex = rawArgs.indexOf('--');
let input: string;
let extraTsc: string[] = [];
if (dashIndex === -1) {
    input = rawArgs[0];
    extraTsc = rawArgs.slice(1);
} else {
    input = rawArgs[0];
    extraTsc = rawArgs.slice(dashIndex + 1);
}

// Determine path to t2tc CLI (phase1 build)
const t2tc = path.join(process.cwd(), 't2lang-phase1', 'dist', 'cli.js');
if (!fs.existsSync(t2tc)) {
    console.error('t2tc CLI not found at', t2tc);
    process.exit(1);
}

// Run t2tc to emit .ts
const t2tcArgs = [input];
console.error('Running t2tc', t2tcArgs.join(' '));
let r = spawnSync(process.execPath, [t2tc, ...t2tcArgs], { stdio: 'inherit' });
if (r.error) {
    console.error('Failed to run t2tc:', r.error);
    process.exit(1);
}
if (r.status !== 0) process.exit(r.status ?? 1);

// Determine emitted .ts file path
const tsFile = input === '-' ? null : (() => {
    const p = path.parse(input);
    return path.join(p.dir || '.', p.name + '.ts');
})();

if (!tsFile) {
    console.error('t2jc does not support reading from stdin when compiling to JS');
    process.exit(1);
}

// Run tsc on the generated .ts file using several fallbacks
const tscArgs = [tsFile, ...extraTsc];
console.error('Running tsc', tscArgs.join(' '));

function tryRun(cmd: string, args: string[]) {
    try {
        return spawnSync(cmd, args, { stdio: 'inherit' });
    } catch (err) {
        return { error: err } as any;
    }
}

// 1) try npx
r = tryRun('npx', ['tsc', ...tscArgs]);
if ((r as any).error && (r as any).error.code === 'ENOENT') {
    // 2) try local node_modules typescript bin via node
    const tsBin = path.join(process.cwd(), 'node_modules', 'typescript', 'bin', 'tsc');
    if (fs.existsSync(tsBin)) {
        r = tryRun(process.execPath, [tsBin, ...tscArgs]);
    } else {
        // 3) try npm exec
        r = tryRun('npm', ['exec', '--no', 'install', 'tsc', '--', ...tscArgs]);
    }
}

if ((r as any).error) {
    console.error('Failed to run tsc:', (r as any).error);
    process.exit(1);
}
process.exit((r as any).status ?? 0);
