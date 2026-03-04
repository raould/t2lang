import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';
import vm from 'vm';
import _ from 'lodash';

export function asrt(actual, expected) {
  console.assert(actual === expected , `value>${actual}< != expected>${expected}<`);
}

export function asrtDeep(actual, expected) {
  console.assert(_.isEqual(actual, expected), "actual != expected");
}

export function prefixLineNumbers(str: string): string {
  return str.split('\n').map(
    (line, i) => `${String(i+1).padStart(4,'0')}: ${line}`
  ).join('\n');
}

function compileT2(t2Source: string): string {
  const res = spawnSync('npx', ['tsx', 'index.ts', '-'], {
    encoding: 'utf-8',
    input: t2Source,
  });
  if (res.status !== 0 || (res.stderr && res.stderr.toString().trim() !== '')) {
    console.error(prefixLineNumbers(t2Source));
    console.error(res.stderr);
    throw new Error(`compilation failed:\n${res.stderr}`);
  }
  const tsSource = res.stdout as string;
  return tsSource;
}

function transpileTs(tsCode: string): string {
  // Place the synthetic file in tests/ so that `./helpers` resolves correctly.
  const syntheticFileName = path.join(__dirname, '__generated__.ts');

  const defaultHost = ts.createCompilerHost({});
  const customHost: ts.CompilerHost = {
    ...defaultHost,
    getSourceFile: (fileName, languageVersion) => {
      if (fileName === syntheticFileName)
        return ts.createSourceFile(fileName, tsCode, languageVersion, true);
      return defaultHost.getSourceFile(fileName, languageVersion);
    },
    writeFile: () => {},
    fileExists: (fileName) =>
      fileName === syntheticFileName || defaultHost.fileExists(fileName),
    readFile: (fileName) =>
      fileName === syntheticFileName ? tsCode : defaultHost.readFile(fileName),
  };

  const program = ts.createProgram([syntheticFileName], {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    strict: true,
    noImplicitAny: false,
    noImplicitThis: false,
    strictNullChecks: false,
    lib: ['lib.es2020.d.ts'],
  }, customHost);

  const sourceFile = program.getSourceFile(syntheticFileName)!;
  const diagnostics = [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ];

  if (diagnostics.length > 0) {
    console.error(prefixLineNumbers(tsCode));
    const msg = diagnostics
      .map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
      .join('\n');
    throw new Error(`ts type errors:\n${msg}`);
  }

  let outputText = '';
  program.emit(sourceFile, (_fileName, text) => { outputText = text; });
  return outputText;
}

function runJs(js: string) {
  // todo: warning, this export fu looks like a big freakin' hack to me & did bite me already.
  const helperExports = { asrt, asrtDeep };
  const mod = { exports: {} as any };
  const sandbox = {
    console,
    module: mod,
    exports: mod.exports,
    require: (id: string) => {
      if (id === './helpers' || id.endsWith('/helpers')) return helperExports;
      return (globalThis as any).require(id);
    },
  };
  try {
    vm.createContext(sandbox);
    vm.runInContext(js, sandbox, { filename: 'test.generated.js' });
  } catch (e) {
    console.error(prefixLineNumbers(js));
    throw new Error(`execution error: ${e}`);
  }
}

export function fromSourceEndToEnd(t2Source: string) {
  const tsCode = compileT2(t2Source);
  const jsCode = transpileTs(tsCode);
  runJs(jsCode);
}

export function fromFileEndToEnd(t2file: string) {
  const t2path = path.join(__dirname, t2file);
  const t2source = readFileSync(t2path, 'utf-8');
  fromSourceEndToEnd(t2source);
}

