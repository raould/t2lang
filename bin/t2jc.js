#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stage8Dir = resolve(__dirname, '../stage8');
const compilerPath = resolve(stage8Dir, 'index.ts');
const tsxBin = resolve(stage8Dir, 'node_modules/.bin/tsx');
const tscBin = resolve(stage8Dir, 'node_modules/.bin/tsc');

const args = process.argv.slice(2);
let outDir;
const inputs = [];

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
  inputs.push(arg);
}

if (inputs.length === 0) {
  console.error('Usage: t2jc [--outDir <path>] - | file1.t2 [file2.t2 ...]');
  process.exit(1);
}

function ensureOutDir(dirPath) {
  if (dirPath) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function runCompiler(filePath, stdinData) {
  const result = spawnSync(tsxBin, [compilerPath, filePath], {
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

for (const arg of inputs) {
  if (arg === '-') {
    const stdinData = readFileSync(0, 'utf-8');
    const tsCode = runCompiler('-', stdinData);
    const outputDir = outDir ?? '/tmp';
    ensureOutDir(outputDir);
    const tsPath = resolve(outputDir, 'stdin.ts');
    const jsPath = resolve(outputDir, 'stdin.js');
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
    const outputDir = outDir ?? dirname(absPath);
    ensureOutDir(outputDir);
    const tsPath = resolve(outputDir, `${basename(absPath, '.t2')}.ts`);
    const jsPath = resolve(outputDir, `${basename(absPath, '.t2')}.js`);
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
