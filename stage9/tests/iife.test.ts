import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('iife basic return value', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const x (iife
      (const (y) 10)
      (return (+ y 5))))
    (asrt x 15)
  )`);
}, 30_000);

it('iife multiple statements', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const result (iife
      (const (a) 20)
      (const (b) 22)
      (return (+ a b))))
    (asrt result 42)
  )`);
}, 30_000);

it('iife-async returns a promise', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const p (iife-async
      (return 99)))
    (asrt (typeof (. p then)) "function")
  )`);
}, 30_000);
