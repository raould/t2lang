import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';
import vm from 'vm';
import { it } from 'vitest';

function compileT2(t2source: string): string {
  const res = spawnSync('npx', ['tsx', '../index.ts', '-'], {
    shell: true,
    encoding: 'utf-8',
    input: t2source,
  });
  if (res.status !== 0 || (res.stderr && res.stderr.toString().trim() !== '')) {
    throw new Error(`stage3 compiler failed:\n${res.stderr}`);
  }
  return res.stdout as string;
}

function transpileTs(tsCode: string): string {
  const result = ts.transpileModule(tsCode, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      strict: true,
    },
  });
  if (result.diagnostics && result.diagnostics.length > 0) {
    const msg = result.diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n');
    throw new Error(`ts transpile errors:\n${msg}`);
  }
  return result.outputText;
}

function runJs(js: string) {
  try {
    vm.runInThisContext(js, { filename: 'arrayExpr.generated.js' });
  } catch (e) {
    throw new Error(`execution error: ${e}`);
  }
}

// the test itself
it('arrayExpr.t2 compiles, type-checks, and executes', () => {
  const t2path = path.join(__dirname, 'arrayExpr.test.t2');
  const t2source = readFileSync(t2path, 'utf-8');

  const tsCode = compileT2(t2source);
  // ensure TypeScript itself parses/types
  const jsCode = transpileTs(tsCode);
  runJs(jsCode);
});
