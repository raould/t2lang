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

it('+= on plain identifier', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((x 10)))
    (+= x 5)
    (asrt x 15)
  )`);
}, 30_000);

it('-= on plain identifier', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((x 20)))
    (-= x 7)
    (asrt x 13)
  )`);
}, 30_000);

it('*= on plain identifier', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((x 3)))
    (*= x 4)
    (asrt x 12)
  )`);
}, 30_000);

it('/= on plain identifier', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((x 100)))
    (/= x 4)
    (asrt x 25)
  )`);
}, 30_000);

it('%= on plain identifier', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((x 17)))
    (%= x 5)
    (asrt x 2)
  )`);
}, 30_000);

it('+= emits correct JS', () => {
  const r = compile(`(program (let ((x 0))) (+= x 1))`);
  expect(r.stdout).toContain('x += 1');
});

it('-= emits correct JS', () => {
  const r = compile(`(program (let ((x 10))) (-= x 3))`);
  expect(r.stdout).toContain('x -= 3');
});

it('*= emits correct JS', () => {
  const r = compile(`(program (let ((x 2))) (*= x 8))`);
  expect(r.stdout).toContain('x *= 8');
});

it('+= on dotted property path (set! obj.prop style)', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((obj { count: 0 })))
    (+= obj.count 10)
    (asrt obj.count 10)
  )`);
}, 30_000);

it('+= in a loop accumulates correctly', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((sum 0)))
    (for (i 0) (< i 5) (+ i 1)
      (+= sum i))
    (asrt sum 10)
  )`);
}, 30_000);
