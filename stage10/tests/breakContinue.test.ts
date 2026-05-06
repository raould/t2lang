import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('break exits a while loop', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((i 0)))
    (while true
      (if (=== i 3) (then (break)))
      (set! i (+ i 1)))
    (asrt i 3)
  )`);
}, 30_000);

it('continue skips the rest of the loop body', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((sum 0)))
    (for-of x [1, 2, 3, 4, 5,]
      (if (=== (% x 2) 0) (then (continue)))
      (set! sum (+ sum x)))
    (asrt sum 9)
  )`);
}, 30_000);
