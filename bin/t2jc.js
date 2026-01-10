#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stage6Dir = resolve(__dirname, '../stage6');
const compilerPath = resolve(stage6Dir, 'index.ts');
const tsxBin = resolve(stage6Dir, 'node_modules/.bin/tsx');
const tscBin = resolve(stage6Dir, 'node_modules/.bin/tsc');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: t2jc - | file1.t2 [file2.t2 ...]');
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

function runTsc(tsPath) {
  const result = spawnSync(tscBin, [
    '--skipLibCheck',
    '--module', 'ESNext',
    '--target', 'ES2022',
    tsPath,
  ], {
    encoding: 'utf-8',
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  if (result.error) {
    console.error(`Failed to run tsc: ${result.error.message}`);
    process.exit(1);
  }
  return result.status === 0;
}

for (const arg of args) {
  if (arg === '-') {
    const stdinData = readFileSync(0, 'utf-8');
    const tsCode = runCompiler('-', stdinData);
    const tsPath = '/tmp/stdin.ts';
    const jsPath = '/tmp/stdin.js';
    writeFileSync(tsPath, tsCode, 'utf-8');
    const ok = runTsc(tsPath);
    if (ok) {
      const jsCode = readFileSync(jsPath, 'utf-8');
      process.stdout.write(jsCode);
      unlinkSync(tsPath);
      if (existsSync(jsPath)) unlinkSync(jsPath);
    } else {
      console.error(`tsc failed; leaving ${tsPath} for investigation`);
      process.exit(1);
    }
  } else {
    if (!arg.endsWith('.t2')) {
      console.error(`Error: input file must end in .t2: ${arg}`);
      process.exit(1);
    }
    const absPath = resolve(arg);
    const tsCode = runCompiler(absPath, '');
    const tsPath = absPath.slice(0, -3) + '.ts';
    const jsPath = absPath.slice(0, -3) + '.js';
    writeFileSync(tsPath, tsCode, 'utf-8');
    const ok = runTsc(tsPath);
    if (ok) {
      unlinkSync(tsPath);
    } else {
      console.error(`tsc failed; leaving ${tsPath} for investigation`);
      process.exit(1);
    }
  }
}
