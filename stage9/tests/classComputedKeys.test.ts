import { expect, it, vi } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('class computed method key uses expression value', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((calls 0)))
    (let ((key ((fn () (set! calls (+ calls 1)) (return "run"))))))
    (class Runner
      (class-body
        (method [key] ()
          (return "ok"))))
    (let ((r (new Runner))))
    (asrt ((. r run)) "ok")
    (asrt calls 1)
  )`);
}, 30_000);

it('computed setter/getter share outer key expression', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((key "value")))
    (class Box
      (class-body
        (field (data : number))
        (get [key] () : number
          (return (. this data)))
        (set [key] ((v : number))
          (set! (. this data) v))))
    (let ((b (new Box))))
    (set! (. b value) 41)
    (asrt (. b data) 41)
    (asrt (. b value) 41)
  )`);
}, 30_000);

it('static computed method key evaluates expression once', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((calls 0)))
    (let ((name : (tlit "ignite") "ignite")))
    (let ((computeKey (lambda () : (tlit "ignite")
      (set! calls (+ calls 1))
      (return name)))))
    (class Engine
      (class-body
        (method static [(computeKey)] ()
          (return "lit"))))
    (asrt calls 1)
    (asrt ((index Engine name)) "lit")
    (asrt calls 1)
  )`);
}, 30_000);

it('async generator computed method returns async iterator', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (let ((key : (tlit "drain") "drain")))
    (class Pump
      (class-body
        (method static async generator [key] ()
          (yield 10)
          (yield 20))))
    (let ((it ((index Pump key)))))
    (asrt (typeof (. ((. it next)) then)) "function")
  )`);
}, 30_000);

it('computed symbol method key works with method-call', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (class Cleaner
      (class-body
        (method [(. Symbol asyncDispose)] ()
          (return "done"))))
    (let ((c (new Cleaner))))
    (asrt (method-call c (. Symbol asyncDispose)) "done")
  )`);
}, 30_000);

it('rejects this/super in computed method keys', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    expect(() => fromSourceEndToEnd(`(program
      (class Base
        (class-body))
      (class Child (extends Base)
        (class-body
          (method [(. this x)] ()
            (return 0))
          (method [super] ()
            (return 1))))
    )`)).toThrow(/computed method key/);
  } finally {
    spy.mockRestore();
  }
}, 30_000);
