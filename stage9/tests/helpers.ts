/// <reference types="node" />
import { readFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';
import vm from 'vm';
import _ from 'lodash';
import { createRequire } from 'node:module';
const _nodeRequire = createRequire(import.meta.url);
import { diff } from 'deep-object-diff';
import { compileSource } from '../index';

export function asrt(actual, expected) {
  console.assert(actual === expected , `value>${actual}< != expected>${expected}<`);
}

export function asrtDeep(actual, expected) {
  const ok = _.isEqual(actual, expected);
  if (!ok) {
    console.log("diff:", diff(actual, expected));
    console.assert(ok, "value != expected");
  }
}

export function prefixLineNumbers(str: string): string {
  return str.split('\n').map(
    (line, i) => `${String(i+1).padStart(4,'0')}: ${line}`
  ).join('\n');
}

function compileT2(t2Source: string): string {
  try {
    return compileSource({ source: t2Source });
  } catch (e: any) {
    console.error(prefixLineNumbers(t2Source));
    console.error(e.message);
    throw new Error(`compilation failed:\n${e.message}`);
  }
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
      return _nodeRequire(id);
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
  const t2Path = path.join(__dirname, t2file);
  const t2Source = readFileSync(t2Path, 'utf-8');
  fromSourceEndToEnd(t2Source);
}

