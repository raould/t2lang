import { readFileSync } from 'fs';
import ts from 'typescript';
import vm from 'vm';
import _ from 'lodash';

const tsCode = readFileSync('/dev/stdin', 'utf-8');

function ass(actual: unknown, expected: unknown) {
  console.assert(actual === expected, `value>${actual}< != expected>${expected}<`);
}

function assO(actual: object, expected: object) {
  console.assert(_.isEqual(actual, expected), 'actual != expected');
}

const jsCode = ts.transpileModule(tsCode, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const helperExports = { ass, assO };
const mod = { exports: {} as any };
const sandbox = {
  console,
  module: mod,
  exports: mod.exports,
  require: (id: string) => {
    if (id === './helpers' || id.endsWith('/helpers')) return helperExports;
    return require(id);
  },
};

vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox, { filename: 'test.generated.js' });
