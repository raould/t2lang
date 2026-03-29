import { describe, it, expect } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import { compileSource as compile } from '../index';

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ source: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

const T = 30_000;

describe('constructor parameter shorthand', () => {
  it('emits public modifier on constructor param', () => {
    const result = callCompiler(`(program
  (class Point
    (class-body
      (constructor ((public x : number) (public y : number)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('public x: number');
    expect(result.stdout).toContain('public y: number');
  }, T);

  it('constructor shorthand declares and initializes fields', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Point
    (class-body
      (constructor ((public x : number) (public y : number)))))
  (const p (new Point 3 4))
  (asrt (. p x) 3)
  (asrt (. p y) 4)
)`, T);
  }, T);

  it('private modifier on constructor param', () => {
    const result = callCompiler(`(program
  (class Counter
    (class-body
      (constructor ((private count : number)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('private count: number');
  }, T);

  it('readonly modifier on constructor param', () => {
    const result = callCompiler(`(program
  (class Config
    (class-body
      (constructor ((readonly name : string)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('readonly name: string');
  }, T);

  it('multiple modifiers work together', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Box
    (class-body
      (constructor ((public width : number) (public height : number)))))
  (const b (new Box 10 20))
  (asrt (. b width) 10)
  (asrt (. b height) 20)
)`, T);
  }, T);
});
