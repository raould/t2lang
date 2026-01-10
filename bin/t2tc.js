#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stage6Dir = resolve(__dirname, '../stage6');
const compilerPath = resolve(stage6Dir, 'index.ts');
const tsxBin = resolve(stage6Dir, 'node_modules/.bin/tsx');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: t2tc - | file1.t2 [file2.t2 ...]');
  process.exit(1);
}

function runCompiler(filePath, stdinData) {
  const result = spawnSync(tsxBin, [compilerPath, filePath], {
    cwd: stage6Dir,
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

for (const arg of args) {
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
    const outPath = arg.slice(0, -3) + '.ts';
    writeFileSync(outPath, output, 'utf-8');
  }
}
