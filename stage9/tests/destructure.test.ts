import { it, expect } from 'vitest';
import { compileSource as t2compile } from '../index';
import { fromSourceEndToEnd } from './helpers';

const compile = (src: string): { stdout: string; stderr: string; status: number } => {
  try {
    const stdout = t2compile({ source: src });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
};

// ---- codegen shape ----

it('object destruct — emits correct JS', () => {
  const r = compile(`(program (const {x y} obj))`);
  expect(r.stdout).toContain('const { x, y } = obj;');
});

it('object destruct — single name', () => {
  const r = compile(`(program (const {x} obj))`);
  expect(r.stdout).toContain('const { x } = obj;');
});

it('array destruct — emits correct JS', () => {
  const r = compile(`(program (const [a b c] arr))`);
  expect(r.stdout).toContain('const [a, b, c] = arr;');
});

it('empty object destruct', () => {
  const r = compile(`(program (const {} obj))`);
  expect(r.stdout).toContain('const {  } = obj;');
});

it('empty array destruct', () => {
  const r = compile(`(program (const [] arr))`);
  expect(r.stdout).toContain('const [] = arr;');
});

// ---- runtime behaviour ----

it('object destruct — reads correct values', { timeout: 15000 }, () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const {x y} { x: 10, y: 20 })
    (asrt x 10)
    (asrt y 20)
  )`);
});

it('array destruct — reads correct values', { timeout: 15000 }, () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const [a b c] [1 2 3])
    (asrt a 1)
    (asrt b 2)
    (asrt c 3)
  )`);
});

it('object destruct — plain identifier binding still works', { timeout: 15000 }, () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (z) 42)
    (asrt z 42)
  )`);
});

it('object destruct — from function return value', { timeout: 15000 }, () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const getPoint (lambda () (return { x: 3, y: 4 })))
    (const {x y} (getPoint))
    (asrt x 3)
    (asrt y 4)
  )`);
});

it('array destruct — from function return value', { timeout: 15000 }, () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const getArr (lambda () (return [9 8 7])))
    (const [first second] (getArr))
    (asrt first 9)
    (asrt second 8)
  )`);
});
