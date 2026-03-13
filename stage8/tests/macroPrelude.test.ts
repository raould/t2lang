/**
 * Tests for --macro-prelude compiler flag (MACRO_INCLUDE.md).
 *
 * The flag lets callers inject one or more .t2 prelude files whose macros
 * become available to the main compilation unit without being emitted as
 * runtime output.
 */

import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import path from 'path';
import { fromSourceEndToEnd } from './helpers';

const stageDir = path.resolve(__dirname, '..');
const fixturesDir = path.join(__dirname, 'fixtures');

function compileWithPreludes(
  t2Source: string,
  preludePaths: string[]
): { stdout: string; stderr: string; status: number } {
  const preludeArgs = preludePaths.flatMap(p => ['--macro-prelude', p]);
  const res = spawnSync('npx', ['tsx', 'index.ts', ...preludeArgs, '-'], {
    encoding: 'utf-8',
    input: t2Source,
    cwd: stageDir,
  });
  return {
    stdout: (res.stdout as string) ?? '',
    stderr: (res.stderr as string) ?? '',
    status: res.status ?? 1,
  };
}

// ---- positive: macro from prelude is available in main file ----

describe('--macro-prelude: basic usage', () => {
  it('macro defined in prelude expands in main file', () => {
    const { stdout, stderr, status } = compileWithPreludes(
      `(program (let r (double 21)))`,
      [path.join(fixturesDir, 'prelude-double.t2')]
    );
    expect(status).toBe(0);
    expect(stderr.trim()).toBe('');
    // double(21) → 2 * 21
    expect(stdout).toContain('(2 * 21)');
  });

  it('prelude macros do not emit runtime output', () => {
    const { stdout, status } = compileWithPreludes(
      `(program (let r (double 5)))`,
      [path.join(fixturesDir, 'prelude-double.t2')]
    );
    expect(status).toBe(0);
    // Only the main file's output appears; no code from prelude itself
    expect(stdout).not.toContain('prelude');
    // Prelude defmacro should appear only as a comment, not as runtime code
    const lines = stdout.split('\n').filter(l => l.trim() !== '');
    // The only non-comment line should be the let binding
    const codeLines = lines.filter(l => !l.trim().startsWith('//'));
    expect(codeLines).toHaveLength(1);
    expect(codeLines[0]).toContain('(2 * 5)');
  });

  it('multiple preludes: all macros available', () => {
    // alpha defines greet, double-prelude defines double — both usable
    const { stdout, status } = compileWithPreludes(
      `(program (let a (greet "world")) (let b (double 3)))`,
      [
        path.join(fixturesDir, 'prelude-alpha.t2'),
        path.join(fixturesDir, 'prelude-double.t2'),
      ]
    );
    expect(status).toBe(0);
    expect(stdout).toContain('"hello-"');
    expect(stdout).toContain('(2 * 3)');
  });

  it('ordering: later prelude shadows earlier for same macro name', () => {
    // alpha: greet → "hello-", beta: greet → "goodbye-"; beta loaded last
    const { stdout, status } = compileWithPreludes(
      `(program (let r (greet "world")))`,
      [
        path.join(fixturesDir, 'prelude-alpha.t2'),
        path.join(fixturesDir, 'prelude-beta.t2'),
      ]
    );
    expect(status).toBe(0);
    // beta loaded after alpha, so "goodbye-" wins
    expect(stdout).toContain('"goodbye-"');
    expect(stdout).not.toContain('"hello-"');
  });

  it('main file macros still work when no prelude is given', () => {
    // Ensure existing behaviour is unaffected
    fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (defmacro inc ((n)) (return (quasi (+ 1 (unquote n)))))
      (let r (inc 41))
      (asrt r 42)
    )`);
  });
});

// ---- error cases ----

describe('--macro-prelude: error cases', () => {
  it('exits with error when prelude file is missing', () => {
    const { stderr, status } = compileWithPreludes(
      `(program (let x 1))`,
      [path.join(fixturesDir, 'does-not-exist.t2')]
    );
    expect(status).not.toBe(0);
    expect(stderr).toMatch(/prelude file not found/i);
  });

  it('exits with error when prelude has a non-.t2 extension', () => {
    // Use an existing non-.t2 file path
    const { stderr, status } = compileWithPreludes(
      `(program (let x 1))`,
      [path.join(stageDir, 'package.json')]
    );
    expect(status).not.toBe(0);
    expect(stderr).toMatch(/\.t2 extension/i);
  });

  it('macro from prelude used without loading prelude → arity/unknown error', () => {
    // Compiling without the prelude: double is not defined; the compiler
    // should either report an arity error or leave it as an unexpanded call
    // (not crash). Either way, it should not silently emit wrong output.
    const { stdout } = compileWithPreludes(
      `(program (let r (double 21)))`,
      [] // no prelude
    );
    // double is not a macro, so it compiles as a plain function call
    expect(stdout).not.toContain('(2 * 21)');
    expect(stdout).toContain('double(21)');
  });
});
