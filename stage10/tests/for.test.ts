import { it, expect } from 'vitest';
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

it('for sugar — forwards (+ i 1)', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((sum 0)))
    (for (i 0) (< i 5) (+ i 1)
      (set! sum (+ sum i)))
    (asrt sum 10)
  )`);
}, 30_000);

it('for sugar — backwards (- i 1)', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((acc 0)))
    (for (i 4) (>= i 0) (- i 1)
      (set! acc (+ acc i)))
    (asrt acc 10)   ;; 4+3+2+1+0
  )`);
}, 30_000);

it('for sugar — complex step emits correct codegen', () => {
  // % (+ i 1) 5 would loop forever at runtime — check codegen only
  const r = compile(`(program (for (i 0) (< i 5) (% (+ i 1) 5) (console.log i)))`);
  expect(r.status).toBe(0);
  expect(r.stdout).toContain('i = ((i + 1) % 5)');
});

it('for sugar — step by 2 (+ i 2)', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((count 0)))
    (for (i 0) (< i 10) (+ i 2)
      (+= count 1))
    (asrt count 5)
  )`);
}, 30_000);

it('for.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; basic for loop
    (let ((sum 0)))
    (for (let ((i 0))) (< i 5) (set! i (+ i 1))
      (set! sum (+ sum i)))
    (asrt sum 10)
  )
`);
}, 30_000);
