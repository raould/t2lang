#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stage8Dir = resolve(__dirname, '../stage8');
const compilerPath = resolve(stage8Dir, 'index.ts');
const tsxBin = resolve(stage8Dir, 'node_modules/.bin/tsx');
const tscBin = resolve(stage8Dir, 'node_modules/.bin/tsc');

const program = new Command();
program
  .name('t2run')
  .description('Compile and run .t2 source files')
  .argument('[files...]', '.t2 input files, or - for stdin')
  .option('-o, --outDir <path>', 'output directory for intermediate files (default: same directory as input file)');

program.parse();

const opts = program.opts();
const inputs = program.args;
const outDir = opts.outDir ? resolve(opts.outDir) : undefined;

if (inputs.length === 0) {
  program.help();
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

function runNode(jsPath) {
  const result = spawnSync(process.execPath, [jsPath], {
    encoding: 'utf-8',
    stdio: 'inherit',
  });
  if (result.error) {
    console.error(`Failed to run node: ${result.error.message}`);
    process.exit(1);
  }
  return result.status ?? 1;
}

for (const arg of inputs) {
  if (arg === '-') {
    const stdinData = readFileSync(0, 'utf-8');
    const tsCode = runCompiler('-', stdinData);
    const outputDir = outDir ?? '/tmp';
    ensureOutDir(outputDir);
    const tsPath = resolve(outputDir, 't2run_stdin.ts');
    const jsPath = resolve(outputDir, 't2run_stdin.js');
    writeFileSync(tsPath, tsCode, 'utf-8');
    const ok = runTsc(tsPath);
    if (!ok) {
      console.error(`tsc failed; leaving ${tsPath} for investigation`);
      process.exit(1);
    }
    const exitCode = runNode(jsPath);
    unlinkSync(tsPath);
    if (existsSync(jsPath)) unlinkSync(jsPath);
    if (exitCode !== 0) process.exit(exitCode);
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
    if (!ok) {
      console.error(`tsc failed; leaving ${tsPath} for investigation`);
      process.exit(1);
    }
    const exitCode = runNode(jsPath);
    if (existsSync(tsPath)) unlinkSync(tsPath);
    if (existsSync(jsPath)) unlinkSync(jsPath);
    if (exitCode !== 0) process.exit(exitCode);
  }
}
