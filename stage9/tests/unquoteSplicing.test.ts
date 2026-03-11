import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('unquoteSplicing.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let ((items (array 1 2 3))))
      ;; unquote-splicing inside quasiquote
      (let ((tmpl (quasi (object (vals (unquote-splicing items)))))))
      (asrtDeep tmpl (object (vals (array 1 2 3))))
    )
`);
}, 30_000);

it('~@ tilde splice sugar: same result as (unquote-splicing items)', () => {
  fromSourceEndToEnd(`(program
      (import {asrtDeep} "./helpers")
      (let ((items (array 1 2 3))))
      ;; ~@items is sugar for (unquote-splicing items)
      (let ((tmpl (quasi (object (vals ~@items))))))
      (asrtDeep tmpl (object (vals (array 1 2 3))))
    )
`);
}, 30_000);

it('~@ tilde splice sugar works inside a variadic macro', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; rest param collects extra args; ~@args splices them into an array literal
      (defmacro toArray (rest args)
        (return (quasi (array ~@args))))
      (const arr (toArray 1 2 3 4))
      (asrt ((. arr reduce) (lambda ((acc) (n)) (return (+ acc n))) 0) 10)
  )
`);
}, 30_000);

it('~ and ~@ sugar together in one macro', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      ;; wrap: returns array [tag, ...items] using ~ for tag and ~@ to splice items
      (defmacro wrap (tag rest items)
        (return (quasi (array ~tag ~@items))))
      (const result (wrap "x" 1 2 3))
      (asrt (. result length) 4)
      (asrt (index result 0) "x")
      (asrt (index result 1) 1)
      (asrt (index result 3) 3)
  )
`);
}, 30_000);
