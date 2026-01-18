import { spawnSync } from 'child_process';

function usage(): never {
    console.error('Usage: t2jc <file.ts> [-- <tsc args>]');
    process.exit(1);
}

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) usage();

// Support: t2jc file.ts -- <extra tsc args>
const dashIndex = rawArgs.indexOf('--');
let fileArg: string;
let extraArgs: string[] = [];
if (dashIndex === -1) {
    fileArg = rawArgs[0];
    extraArgs = rawArgs.slice(1);
} else {
    fileArg = rawArgs[0];
    extraArgs = rawArgs.slice(dashIndex + 1);
}

const args = ['tsc', fileArg, ...extraArgs];

const res = spawnSync('npx', args, { stdio: 'inherit' });
if (res.error) {
    console.error('Failed to run tsc via npx:', res.error);
    process.exit(1);
}
process.exit(res.status ?? 1);
