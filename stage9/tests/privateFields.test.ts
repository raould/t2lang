import { describe, it, expect } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import { compile } from '../index';

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ filePath: '-', input: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

const T = 30_000;

describe('private field naming (#foo)', () => {
  it('field with # prefix is declared correctly', () => {
    const result = callCompiler(`(program
  (class Counter
    (class-body
      (field (#count : number) 0)))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('#count: number = 0;');
    expect(result.stdout).not.toContain('checkId');
  }, T);

  it('#field can be read and written via dot access', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Counter
    (class-body
      (field (#count : number) 0)
      (constructor ()
        (set! (. this #count) 0))
      (method increment ()
        (set! (. this #count) (+ (. this #count) 1)))
      (method value ()
        (return (. this #count)))))
  (const c (new Counter))
  ((. c increment))
  ((. c increment))
  ((. c increment))
  (asrt ((. c value)) 3)
)`, T);
  }, T);

  it('#field with static modifier emits correctly', () => {
    const result = callCompiler(`(program
  (class Singleton
    (class-body
      (field static (#instance) null)))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('static #instance');
  }, T);

  it('#field name is rejected as a binding identifier', () => {
    const result = callCompiler(`(program
  (const #bad 1)
)`);
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/#bad/);
  }, T);
});
