import path from 'path';
import ts from 'typescript';
import { expect, it, vi } from 'vitest';
import { compileSource as compile } from '#stage10';
import { fromSourceEndToEnd } from './helpers';

const T = 30_000;

const CWD = path.join(__dirname, '..');

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ source: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

it('try/catch/finally runs expected blocks', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((events (array))))
    (except
      (try
        ((. events push) "try")
        (throw "boom"))
      (catch err
        ((. events push) (+ "catch:" err)))
      (finally
        ((. events push) "finally")))
    (asrt ((. events join) ",") "try,catch:boom,finally")
  )`);
}, T);

it('try/finally without catch still runs finally', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((events (array))))
    (except
      (try
        ((. events push) "start"))
      (finally
        ((. events push) "done")))
    (asrt ((. events join) ",") "start,done")
  )`);
}, T);

it('try/catch without finally runs catch path only', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((events (array))))
    (except
      (try
        ((. events push) "start")
        (throw "boom"))
      (catch err
        ((. events push) (+ "caught:" err))))
    (asrt ((. events join) ",") "start,caught:boom")
  )`);
}, T);

it('finally runs even when returning from try', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((events (array))))
    (const ((run (lambda ()
      (except
        (try
          ((. events push) "try")
          (return "value"))
        (finally
          ((. events push) "finally")))))))
    (asrt (run) "value")
    (asrt ((. events join) ",") "try,finally")
  )`);
}, T);

it('finally throwing overrides earlier throw', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((events (array))))
    (except
      (try
        (except
          (try
            (throw "inner"))
          (finally
            (throw "finally"))))
      (catch err
        ((. events push) (+ "outer:" err))))
    (asrt ((. events join) ",") "outer:finally")
  )`);
}, T);

it('rejects bare (try) — not a valid statement without (except) wrapper', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    const result = callCompiler(`(program
      (try
        ((. console log) "oops"))
    )`);
    expect(result.status).toBe(1);
  } finally {
    spy.mockRestore();
  }
}, T);

it('catch binding is scoped only to the catch body', () => {
  const result = callCompiler(`(program
    (import {asrt} "./helpers")
    (except
      (try
        (throw "boom"))
      (catch err
        ((. console log) err)))
    (asrt err "boom")
  )`);
  expect(result.status).toBe(0);
  expect(result.stderr.trim()).toBe('');

  const fileName = path.join(CWD, '__virtual__.ts');
  const options: ts.CompilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    strict: true,
    noImplicitAny: false,
    noImplicitThis: false,
    strictNullChecks: false,
    lib: ['lib.es2020.d.ts'],
  };

  const defaultHost = ts.createCompilerHost(options);
  const host: ts.CompilerHost = {
    ...defaultHost,
    getSourceFile: (file, languageVersion) => {
      if (file === fileName) {
        return ts.createSourceFile(file, result.stdout, languageVersion, true);
      }
      return defaultHost.getSourceFile(file, languageVersion);
    },
    writeFile: () => {},
    fileExists: (file) => file === fileName || defaultHost.fileExists(file),
    readFile: (file) => (file === fileName ? result.stdout : defaultHost.readFile(file)),
  };

  const program = ts.createProgram([fileName], options, host);
  const sourceFile = program.getSourceFile(fileName)!;
  const diagnostics = [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ];
  const messages = diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
  expect(messages.some((m) => /Cannot find name 'err'/.test(m))).toBe(true);
}, T);
