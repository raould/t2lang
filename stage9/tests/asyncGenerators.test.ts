import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('async-lambda returns a Promise', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (asyncAdd) (async-lambda ((a) (b))
      (return (+ a b))))
    (asrt (typeof asyncAdd) "function")
    ;; calling an async function returns a Promise (has .then)
    (asrt (typeof (. (asyncAdd 1 2) then)) "function")
  )`);
}, 30_000);

it('async-fn returns a Promise', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (asyncDouble) (async-fn ((n))
      (return (* n 2))))
    (asrt (typeof asyncDouble) "function")
    (asrt (typeof (. (asyncDouble 5) then)) "function")
  )`);
}, 30_000);

it('generator-fn with yield', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (counter) (generator-fn ()
      (yield 10)
      (yield 20)
      (yield 30)))
    (const (it) (counter))
    (asrt (. ((. it next)) value) 10)
    (asrt (. ((. it next)) value) 20)
    (asrt (. ((. it next)) value) 30)
    (asrt (. ((. it next)) done) true)
  )`);
}, 30_000);

it('generator-fn with yield* (delegation)', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (inner) (generator-fn ()
      (yield 1)
      (yield 2)))
    (const (outer) (generator-fn ()
      (yield* (inner))
      (yield 3)))
    (const (it) (outer))
    (asrt (. ((. it next)) value) 1)
    (asrt (. ((. it next)) value) 2)
    (asrt (. ((. it next)) value) 3)
    (asrt (. ((. it next)) done) true)
  )`);
}, 30_000);

it('async-generator-fn is iterable', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (asyncGen) (async-generator-fn ()
      (yield 100)
      (yield 200)))
    (const (it) (asyncGen))
    ;; next() returns a Promise
    (asrt (typeof (. ((. it next)) then)) "function")
  )`);
}, 30_000);

it('rest param in lambda collects extra args', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (sum) (lambda ((first) (rest args))
      (let ((total first))
        ((. args forEach) (lambda ((n))
          (set! total (+ total n))))
        (return total))))
    (asrt (sum 1) 1)
    (asrt (sum 1 2 3 4) 10)
    (asrt (sum 0 10 20) 30)
  )`);
}, 30_000);

it('rest param in fn collects extra args', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (join) (fn ((sep) (rest parts))
      (return ((. parts join) sep))))
    (asrt (join "-" "a" "b" "c") "a-b-c")
    (asrt (join "," "x") "x")
    (asrt (join "+" "1" "2") "1+2")
  )`);
}, 30_000);

it('rest-only param in async-lambda', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (asyncAll) (async-lambda ((rest args))
      (return (. args length))))
    (asrt (typeof asyncAll) "function")
    (asrt (typeof (. (asyncAll 1 2 3) then)) "function")
  )`);
}, 30_000);
