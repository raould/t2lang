import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('array index with computed key', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let ((arr [1, 2, 3,])))
      (asrt arr[0+1] 2)
  )`);
}, 30_000);

it('array literal trailing comma', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let ((arr [1, 2, 3,])))
      (asrtDeep arr [1, 2, 3])
  )`);
}, 30_000);

it('arrayExpr.t2 test A', () => {
  fromSourceEndToEnd(`
    (program
        (import {asrt} "./helpers")
        ;; array with elements
        (let ((arr (array 1 2 3))))
        (let ((astr ((. arr toString)))))
        (asrt astr "1,2,3")
    )`);
}, 30_000);

it('arrayExpr.t2 test B', () => {
  fromSourceEndToEnd(`
    (program
        (import {asrt} "./helpers")
        ;; array with mixed types
        (let ((mixed (array "a" 1 true null))))
        (let ((mstr ((. mixed toString)))))
        (asrt mstr "a,1,true,")
    )`);
}, 30_000);

it('arrayExpr.t2 test C', () => {
  fromSourceEndToEnd(`
    (program
        (import {asrt} "./helpers")
        ;; empty array
        (let ((empty (array))))
        (let ((estr ((. empty toString)))))
        (asrt estr "")
    )`);
}, 30_000);
