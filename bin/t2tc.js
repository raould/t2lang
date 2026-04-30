#!/usr/bin/env tsx
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, basename, relative } from 'path';
import { Command } from 'commander';
import { checkSource } from './t2helpers.js';
import stage10 from '../stage10/index.ts';
import stage10debug from '../stage10/src/Stage10-debug.ts';
const { compile, compileSource } = stage10;
const { makeDebugContextFromOptions } = stage10debug;

const program = new Command();
program
  .name('t2tc')
  .description('Compile .t2 source files to TypeScript')
  .argument('[files...]', '.t2 input files, or - for stdin')
  .option('--stdout', 'write output to stdout instead of files')
  .option('-v, --verbose', 'show all output')
  .option('--outDir <path>', 'output directory (default: same directory as input file)')
  .option('--rootDir <path>', 'root of the source tree (used to mirror directory structure under --outDir)')
  .option('--macro-root <scope=path>', 'map @scope paths for macro-import (may be repeated)',
    (v, prev) => {
      const eq = v.indexOf('=');
      if (eq === -1) throw new Error(`--macro-root requires scope=path format: ${v}`);
      return [...prev, [v.slice(0, eq), resolve(v.slice(eq + 1))]];
    }, [])
  .option('--t2ext <ext>', 'allow additional extension for .t2 files (may be repeated)',
    (v, prev) => [...prev, v.replace(/^\\./, '')], [])
  .option('--t2mext <ext>', 'allow additional extension for .t2m files (may be repeated)',
    (v, prev) => [...prev, v.replace(/^\\./, '')], [])
  .option('--debug', 'enable debug output for all pipeline stages (written to stderr)')
  .option('--debug-stage <stage>', 'enable debug output for a specific pipeline stage (may be repeated)',
    (v, prev) => [...prev, v], []);

program.parse();

const opts = program.opts();
const inputs = program.args;
const t2exts = ['t2', ...opts.t2ext];
const t2mexts = ['t2m', ...opts.t2mext];
const outDir = opts.outDir ? resolve(opts.outDir) : undefined;
const rootDir = opts.rootDir ? resolve(opts.rootDir) : undefined;
const macroRoots = new Map(opts.macroRoot);
const debug = makeDebugContextFromOptions({
  debugAll: opts.debug,
  debugStages: opts.debugStage,
});

if (opts.verbose) {
  console.log("inputs", inputs);
  console.log("outDir", outDir);
  console.log("rootDir", rootDir);
  console.log("macroRoots", macroRoots);
}

if (inputs.length === 0) {
  program.help();
}

function ensureOutDir(dirPath) {
  if (dirPath) {
    mkdirSync(dirPath, { recursive: true });
  }
}

for (const arg of inputs) {
  try {
    if (arg === '-') {
      const stdinData = readFileSync(0, 'utf-8');
      checkSource(stdinData, '<stdin>');
      const output = compileSource({
        source: stdinData,
        t2exts,
        t2mexts,
        rootDir,
        outDir,
        macroRoots,
        debug,
      });
      process.stdout.write(output + '\n');
    } else {
      const ext = arg.split('.').pop();
      if (!t2exts.includes(ext) && !t2mexts.includes(ext)) {
        throw new Error(`Error: input file must have one of allowed extensions (${[...t2exts, ...t2mexts].join(', ')}): ${arg}`);
      }
      const absPath = resolve(arg);
      checkSource(readFileSync(absPath, 'utf-8'), absPath);
      const output = compile({
        filePath: absPath,
        t2exts,
        t2mexts,
        rootDir,
        outDir,
        macroRoots,
        debug,
      });
      const outputDir = outDir
        ? (rootDir ? resolve(outDir, relative(rootDir, dirname(absPath))) : outDir)
        : dirname(absPath);
      ensureOutDir(outputDir);
      const outPath = resolve(outputDir, `${basename(absPath, `.${ext}`)}.ts`);
      if (opts.stdout) {
        process.stdout.write(output + '\n');
      } else {
        writeFileSync(outPath, output + '\n', 'utf-8');
      }
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
