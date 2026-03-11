import { expect, it, vi } from 'vitest';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fromSourceEndToEnd } from './helpers';
import { compileSource as t2compile } from '../index';

const compile = (t2Source: string) => {
  try {
    const ts = t2compile({ source: t2Source });
    return { ts, status: 0, errors: [] as string[] };
  } catch (e: any) {
    const errors: string[] = [e.message];
    errors.push(`exit 1`);
    return { ts: '', status: 1, errors };
  }
};

it('dotted sugar emits nested prop-access', () => {
  const result = compile(`(program
    (import {asrt} "./helpers")
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
    (import {asrt} "./helpers")
    (defmacro identity (x) (return x))
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

it('zero-arg chained method call runs end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const s "hello")
    (asrt (s.toUpperCase) "HELLO")
  )`);
}, 30_000);

it('chained method call with args runs end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const arr (array 1 2 3))
    (asrt (arr.join ", ") "1, 2, 3")
  )`);
}, 30_000);

it('three-segment chain with args runs end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const arr (array 1 2 3))
    (asrt (Array.prototype.join.call arr "-") "1-2-3")
  )`);
}, 30_000);

it('chained property access as value (not call) runs end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const arr (array 10 20 30))
    (asrt arr.length 3)
  )`);
}, 30_000);

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
