#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stage8Dir = resolve(__dirname, '../stage8');
const compilerPath = resolve(stage8Dir, 'index.ts');
const tsxBin = resolve(stage8Dir, 'node_modules/.bin/tsx');

const args = process.argv.slice(2);
let outDir;
const inputs = [];
const preludePaths = [];

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  const equalsForm = arg.startsWith('--outDir=');
  if (arg === '--outDir' || equalsForm) {
    const next = equalsForm ? arg.slice('--outDir='.length) : args[i + 1];
    if (!next) {
      console.error('Error: --outDir requires a path');
      process.exit(1);
    }
    outDir = resolve(next);
    if (!equalsForm) {
      i += 1;
    }
    continue;
  }
  if (arg === '--macro-prelude') {
    const next = args[i + 1];
    if (!next) {
      console.error('Error: --macro-prelude requires a file path argument');
      process.exit(1);
    }
    preludePaths.push(resolve(next));
    i += 1;
    continue;
  }
  inputs.push(arg);
}

if (inputs.length === 0) {
  console.error('Usage: t2tc [--outDir <path>] - | file1.t2 [file2.t2 ...]');
  process.exit(1);
}

function ensureOutDir(dirPath) {
  if (dirPath) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function runCompiler(filePath, stdinData) {
  const preludeArgs = preludePaths.flatMap(p => ['--macro-prelude', p]);
  const result = spawnSync(tsxBin, [compilerPath, ...preludeArgs, filePath], {
    cwd: stage8Dir,
    encoding: 'utf-8',
    input: stdinData,
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  if (result.error) {
    console.error(`Failed to run compiler: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status);
  }
  return result.stdout;
}

for (const arg of inputs) {
  if (arg === '-') {
    const stdinData = readFileSync(0, 'utf-8');
    const output = runCompiler('-', stdinData);
    process.stdout.write(output);
  } else {
    if (!arg.endsWith('.t2')) {
      console.error(`Error: input file must end in .t2: ${arg}`);
      process.exit(1);
    }
    const absPath = resolve(arg);
    const output = runCompiler(absPath, '');
    const outputDir = outDir ?? dirname(absPath);
    ensureOutDir(outputDir);
    const outPath = resolve(outputDir, `${basename(absPath, '.t2')}.ts`);
    writeFileSync(outPath, output, 'utf-8');
  }
}
