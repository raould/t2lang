import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

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
