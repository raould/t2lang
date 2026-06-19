import { it, expect } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import { compileSource } from '#stage10';

it('literal.test.t2 numbers', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; number literals
      (asrt 42 42)
      (asrt 3.14 3.14)
  )
`);
}, 30_000);

it('literal.test.t2 strings', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; string literals
      (asrt "hello world" 'hello world')
      (asrt 'single quotes' "single quotes")
  )
`);
}, 30_000);

it('literal.test.t2 booleans', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; boolean literals
      (asrt true true)
      (asrt false false)
  )
`);
}, 30_000);

it('literal.test.t2 null and undefined', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; null and undefined
      (asrt null null)
      (asrt undefined undefined)
  )
`);
}, 30_000);

it('literal.test.t2 hex numbers', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; hex literals — value must equal decimal equivalent
      (asrt 0xFF 255)
      (asrt 0x1A 26)
      (asrt 0X0F 15)
  )
`);
}, 30_000);

it('literal.test.t2 octal numbers', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; octal literals — value must equal decimal equivalent
      (asrt 0o17 15)
      (asrt 0O7 7)
      (asrt 0o377 255)
  )
`);
}, 30_000);

it('literal.test.t2 hex preserves representation in output', () => {
  const out = compileSource({ source: '(program (let ((x 0xFF)) x))' });
  expect(out).toContain('0xFF');
}, 30_000);

it('literal.test.t2 octal preserves representation in output', () => {
  const out = compileSource({ source: '(program (let ((x 0o17)) x))' });
  expect(out).toContain('0o17');
}, 30_000);
