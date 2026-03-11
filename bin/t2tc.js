#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { checkSource } from './t2helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stage8Dir = resolve(__dirname, '../stage8');
const compilerPath = resolve(stage8Dir, 'index.ts');
const tsxBin = resolve(stage8Dir, 'node_modules/.bin/tsx');

const program = new Command();
program
  .name('t2tc')
  .description('Compile .t2 source files to TypeScript')
  .argument('[files...]', '.t2 input files, or - for stdin')
  .option('--stdout', 'write output to stdout instead of files')
  .option('-v, --verbose', 'show all output')
  .option('-o, --outDir <path>', 'output directory (default: same directory as input file)')
  .option('-m, --macro-prelude <path>', 'load a .t2 macro prelude file (may be repeated)',
    (v, prev) => [...prev, resolve(v)], []);

program.parse();

const opts = program.opts();
const inputs = program.args;
const outDir = opts.outDir ? resolve(opts.outDir) : undefined;
const preludePaths = opts.macroPrelude;

if (inputs.length === 0) {
  program.help();
}

function ensureOutDir(dirPath) {
  if (dirPath) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function runCompiler(filePath, stdinData) {
  const preludeArgs = preludePaths.flatMap(p => ['--macro-prelude', p]);
  const tsxArgs = [compilerPath, ...preludeArgs, filePath];
  const result = spawnSync(tsxBin, tsxArgs, {
    cwd: stage8Dir,
    encoding: 'utf-8',
    input: stdinData,
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  if (opts.verbose) {
    console.log(result.stdout);
  }
  if (result.error) {
    console.error(`Failed to run compiler: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status);
  }
  return result.stdout;
}

// Check prelude files too, since macro authors make this mistake most often.
for (const p of preludePaths) {
  checkSource(readFileSync(p, 'utf-8'), p);
}

for (const arg of inputs) {
  if (arg === '-') {
    const stdinData = readFileSync(0, 'utf-8');
    checkSource(stdinData, '<stdin>');
    const output = runCompiler('-', stdinData);
    process.stdout.write(output);
  } else {
    if (!arg.endsWith('.t2')) {
      console.error(`Error: input file must end in .t2: ${arg}`);
      process.exit(1);
    }
    const absPath = resolve(arg);
    checkSource(readFileSync(absPath, 'utf-8'), absPath);
    const output = runCompiler(absPath, '');
    const outputDir = outDir ?? dirname(absPath);
    ensureOutDir(outputDir);
    const outPath = resolve(outputDir, `${basename(absPath, '.t2')}.ts`);
    if (opts.stdout) {
      process.stdout.write(output);
    } else {
      writeFileSync(outPath, output, 'utf-8');
    }
  }
}
