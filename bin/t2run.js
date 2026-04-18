#!/usr/bin/env tsx
import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename, relative } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { checkSource } from './t2helpers.js';
import stage9 from '../stage9/index.ts';
import stage9debug from '../stage9/Stage9-debug.ts';
const { compile, compileSource } = stage9;
const { makeDebugContextFromOptions } = stage9debug;

const __dirname = dirname(fileURLToPath(import.meta.url));

const program = new Command();
program
  .name('t2run')
  .description('Compile and run .t2 source files')
  .argument('[files...]', '.t2 input files, or - for stdin')
  .option('-v, --verbose', 'show all output')
  .option('--outDir <path>', 'output directory for intermediate files (default: same directory as input file)')
  .option('--rootDir <path>', 'root of the source tree (used to mirror directory structure under --outDir)')
  .option('--macro-root <scope=path>', 'map @scope paths for macro-import (may be repeated)',
    (v, prev) => {
      const eq = v.indexOf('=');
      if (eq === -1) throw new Error(`--macro-root requires scope=path format: ${v}`);
      return [...prev, [v.slice(0, eq), resolve(v.slice(eq + 1))]];
    }, [])
  .option('--t2ext <ext>', 'allow additional extension for .t2 files (may be repeated)',
    (v, prev) => [...prev, v.replace(/^\./, '')], [])
  .option('--t2mext <ext>', 'allow additional extension for .t2m files (may be repeated)',
    (v, prev) => [...prev, v.replace(/^\./, '')], [])
  .option('--debug', 'enable debug output for all pipeline stages (written to stderr)')
  .option('--debug-stage <stage>', 'enable debug output for a specific pipeline stage (may be repeated)',
    (v, prev) => [...prev, v], [])
  .option('--tsconfig <path>', 'path to a tsconfig.json to pass to the TypeScript compiler');

program.parse();

const opts = program.opts();
const inputs = program.args;
const t2exts = ['t2', ...opts.t2ext];
const t2mexts = ['t2m', ...opts.t2mext];
const outDir = opts.outDir ? resolve(opts.outDir) : undefined;
const rootDir = opts.rootDir ? resolve(opts.rootDir) : undefined;
const macroRoots = new Map(opts.macroRoot);
const tsconfig = opts.tsconfig ? resolve(opts.tsconfig) : undefined;
const debug = makeDebugContextFromOptions({
  debugAll: opts.debug,
  debugStages: opts.debugStage,
});

if (inputs.length === 0) {
  program.help();
}

function ensureOutDir(dirPath) {
  if (dirPath) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function runTsc(tsPath) {
  let tscArgs;
  let tempTsconfig;
  if (tsconfig) {
    tempTsconfig = resolve(tmpdir(), `t2run_${Date.now()}.tsconfig.json`);
    writeFileSync(tempTsconfig, JSON.stringify({
      extends: tsconfig,
      files: [tsPath],
      compilerOptions: { outDir: dirname(tsPath) },
    }), 'utf-8');
    tscArgs = ['tsc', '--project', tempTsconfig];
  } else {
    tscArgs = ['tsc', '--skipLibCheck', '--module', 'ESNext', '--target', 'ES2022', tsPath];
  }
  const result = spawnSync('npx', tscArgs, {
    encoding: 'utf-8',
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  if (tempTsconfig && existsSync(tempTsconfig)) unlinkSync(tempTsconfig);
  if (opts.verbose) {
    console.log(result.stdout);
  }
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
  if (opts.verbose) {
    console.log(result.stdout);
  }
  if (result.error) {
    console.error(`Failed to run node: ${result.error.message}`);
    process.exit(1);
  }
  return result.status ?? 1;
}

for (const arg of inputs) {
  try {
    if (arg === '-') {
      const stdinData = readFileSync(0, 'utf-8');
      checkSource(stdinData, '<stdin>');
      const tsCode = compileSource({
        source: stdinData,
        t2exts,
        t2mexts,
        rootDir,
        outDir,
        macroRoots,
        debug,
      });
      const outputDir = outDir ?? '/tmp';
      ensureOutDir(outputDir);
      const tsPath = resolve(outputDir, 't2run_stdin.ts');
      const jsPath = resolve(outputDir, 't2run_stdin.js');
      writeFileSync(tsPath, tsCode + '\n', 'utf-8');
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
      const ext = arg.split('.').pop();
      if (!t2exts.includes(ext) && !t2mexts.includes(ext)) {
        throw new Error(`Error: input file must have one of allowed extensions (${[...t2exts, ...t2mexts].join(', ')}): ${arg}`);
      }
      const absPath = resolve(arg);
      checkSource(readFileSync(absPath, 'utf-8'), absPath);
      const tsCode = compile({
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
      const tsPath = resolve(outputDir, `${basename(absPath, `.${ext}`)}.ts`);
      const jsPath = resolve(outputDir, `${basename(absPath, `.${ext}`)}.js`);
      writeFileSync(tsPath, tsCode + '\n', 'utf-8');
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
  } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
}
