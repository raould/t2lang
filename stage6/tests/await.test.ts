import { expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { transformSync } from 'esbuild';
import path from 'node:path';

const compile = (t2Source: string) => {
  const res = spawnSync('npx', ['tsx', 'index.ts', '-'], {
    cwd: path.join(__dirname, '..'),
    input: t2Source,
    encoding: 'utf-8',
  });
  const errors: string[] = [];
  if (res.stderr && res.stderr.trim() !== '') {
    errors.push(res.stderr.trim());
  }
  if ((res.status ?? 0) !== 0) {
    errors.push(`exit ${res.status ?? 0}`);
  }
  return { ts: res.stdout, status: res.status ?? 0, errors };
};

const runTs = (tsSource: string) => {
  const { code } = transformSync(tsSource, {
    loader: 'ts',
    format: 'esm',
    target: 'esnext',
  });
  return spawnSync('node', ['--input-type=module', '--eval', code], {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf-8',
  });
};

it('unary await inside async fn compiles and runs', () => {
  const result = compile(`(program
    (const run (async-fn () (return (await ((. Promise resolve) 7)))))
    (const value (await (run)))
    ((. console log) value)
  )`);
  if (result.errors.length > 0) { console.error(result.errors); }
  expect(result.status).toBe(0);
  const exec = runTs(result.ts);
  expect(exec.status ?? 0).toBe(0);
  expect(exec.stdout.trim()).toBe('7');
});

it('for-await over async generator accumulates values', () => {
  const result = compile(`(program
    (const makeGen (async-generator-fn ()
      (yield (await ((. Promise resolve) 3)))
      (yield 4)))
    (let (sum) 0)
    (for-await x (makeGen)
      (set! sum (+ sum x)))
    ((. console log) sum)
  )`);
  if (result.errors.length > 0) { console.error(result.errors); }
  expect(result.status).toBe(0);
  const exec = runTs(result.ts);
  expect(exec.status ?? 0).toBe(0);
  expect(exec.stdout.trim()).toBe('7');
});

it('top-level await works in ESM output', () => {
  const result = compile(`(program
    (const v (await ((. Promise resolve) 41)))
    ((. console log) v)
  )`);
  if (result.errors.length > 0) { console.error(result.errors); }
  expect(result.status).toBe(0);
  const exec = runTs(result.ts);
  expect(exec.status ?? 0).toBe(0);
  expect(exec.stdout.trim()).toBe('41');
});
