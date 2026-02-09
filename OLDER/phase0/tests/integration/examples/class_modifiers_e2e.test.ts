import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import child_process from 'node:child_process';
import ts from 'typescript';
import { compilePhase0 } from '../../../src/api';

function writeTempFile(contents: string, suffix = '.js'): string {
  const name = `t2-e2e-${Date.now()}-${Math.floor(Math.random()*10000)}${suffix}`;
  const filePath = path.join(os.tmpdir(), name);
  fs.writeFileSync(filePath, contents, { encoding: 'utf8' });
  return filePath;
}

test('class modifiers end-to-end: compile to JS and run', async () => {
  const src = `
    (program
      (class C
        (field public static readonly "X" 42)
        (field private "_y" 7)
        (method "getY" () (prop this "_y"))
      )

      (let* ((c (new C)))
        (call (prop console "log") (prop C "X"))
        (call (prop console "log") (call (prop c "getY"))))
    )
  `;

  // We don't require running the TypeScript compiler here; transpile and
  // run the emitted JS with node to exercise end-to-end behavior.
  const result = await compilePhase0(src, { enableTsc: false, emitTypes: false });
  const nonTsc = result.errors.filter(e => e.phase !== 'tsc');
  if (nonTsc.length > 0) { console.error(nonTsc); }
  assert.strictEqual(nonTsc.length, 0, 'non-tsc compile errors');

  // tsc errors (phase === 'tsc') should be empty as well
  const tscErrors = result.errors.filter(e => e.phase === 'tsc');
  if (tscErrors.length > 0) { console.error(tscErrors); }
  assert.strictEqual(tscErrors.length, 0, 'TypeScript reported errors');

  // Transpile TS source to JS and run with node to verify console output
  const transpiled = ts.transpileModule(result.tsSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const tmp = writeTempFile(transpiled, '.js');
  try {
    const out = child_process.execFileSync('node', [tmp], { encoding: 'utf8' });
    // Expect two lines: 42 and 7
    const stripAnsi = (s: string) => s.replace(/\x1B\[[0-9;]*m/g, '');
    const lines = out.trim().split('\n').map(s => stripAnsi(s.trim()));
    assert.strictEqual(lines[0], '42');
    assert.strictEqual(lines[1], '7');
  } finally {
    try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
  }
});
