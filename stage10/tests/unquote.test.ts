import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('unquote.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let ((x 42)))
      ;; unquote inside quasiquote
      (let ((tmpl (quasi (object (val (unquote x)))))))
      (asrtDeep tmpl (object (val 42)))
  )
`);
}, 30_000);

it('~ tilde unquote sugar: same result as (unquote x)', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let ((x 42)))
      ;; ~x is sugar for (unquote x)
      (let ((tmpl (quasi (object (val ~x))))))
      (asrtDeep tmpl (object (val 42)))
  )
`);
}, 30_000);

it('~ tilde unquote sugar works inside a macro body', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (defmacro double (x)
        (return (quasi (+ ~x ~x))))
      (const ((result (double 21))))
      (asrt result 42)
  )
`);
}, 30_000);

it('~ tilde unquote sugar: multiple unquotes in one quasi', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (defmacro add (a b)
        (return (quasi (+ ~a ~b))))
      (asrt (add 10 32) 42)
      (asrt (add 1 99) 100)
  )
`);
}, 30_000);
