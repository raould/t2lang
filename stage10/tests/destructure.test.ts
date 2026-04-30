import { describe, it, expect, vi } from 'vitest';
import { compileSource as t2compile } from '#stage10';
import { fromSourceEndToEnd } from './helpers';

const compile = (src: string): { stdout: string; stderr: string; status: number } => {
  try {
    const stdout = t2compile({ source: src });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
};

describe('const destructuring is currently unsupported', () => {
  it('rejects object destructuring const', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const r = compile(`(program (const {x y} obj))`);
    errorSpy.mockRestore();
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/no viable alternative|Cannot read properties of null/);
  });

  it('rejects array destructuring const', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const r = compile(`(program (const [a b c] arr))`);
    errorSpy.mockRestore();
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/no viable alternative|Cannot read properties of null/);
  });
});

it('object destruct — plain identifier binding still works', { timeout: 15000 }, () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (z) 42)
    (asrt z 42)
  )`);
});
