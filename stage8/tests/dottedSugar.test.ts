import { expect, it, vi } from 'vitest';
import { spawnSync } from 'node:child_process';
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

it('dotted sugar emits nested prop-access', () => {
  const result = compile(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    (const arr1 (array 1))
    (const arr2 (array 2))
    (const merged (Array.prototype.concat.call arr1 arr2))
    (asrt (. merged length) 2)
  )`);
  if (result.errors.length > 0) { console.error(result.errors); }
  expect(result.status).toBe(0);
  expect(result.ts).toContain('Array.prototype.concat.call(arr1, arr2)');
});

it('dotted sugar folds multiple segments and numeric keys', () => {
  const result = compile(`(program
    (const obj (object (a (object (b 1))) ("0" (object (x 5)))) )
    (const plain (obj.a.b))
    (const numeric (obj.0.x))
  )`);
  if (result.errors.length > 0) { console.error(result.errors); }
  expect(result.status).toBe(0);
  expect(result.ts).toContain('obj.a.b');
  expect(result.ts).toContain('obj["0"].x');
});

it('macro expansion sees prop-access from dotted sugar', () => {
  const result = compile(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    (defmacro identity ((x)) (return x))
    (const obj (object (x 41)))
    (asrt (identity obj.x) 41)
  )`);
  if (result.errors.length > 0) { console.error(result.errors); }
  expect(result.status).toBe(0);
  expect(result.ts).toContain('asrt(obj.x, 41)');
});

it('malformed dotted identifiers fail fast', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const result = compile(`(program (const bad foo.))`);
  if (result.errors.length > 0) { console.error(result.errors); }
  errorSpy.mockRestore();
  expect(result.status).not.toBe(0);
  expect(result.errors.join('\n')).toContain('empty segment');
});

it('desugar guard rejects unknown tag via whitelist', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const res = spawnSync('npx', ['tsx', 'tests/nonCoreRunner.ts', '-'], {
    cwd: path.join(__dirname, '..'),
    input: `(program (const x foo.bar))`,
    encoding: 'utf-8',
  });
  const errors: string[] = [];
  if (res.stderr && res.stderr.trim() !== '') {
    errors.push(res.stderr.trim());
  }
  if ((res.status ?? 0) !== 0) {
    errors.push(`exit ${res.status ?? 0}`);
  }
  if (errors.length > 0) { console.error(errors); }
  errorSpy.mockRestore();
  expect(res.status ?? 0).not.toBe(0);
  expect(errors.join('\n')).toContain('desugar produced non-core tag');
});
