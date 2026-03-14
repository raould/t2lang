import { it, expect, vi } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('fn-o basic: named function with default and optional params', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    ;; named fn-o with type annotations and default
    (fn-o greet
      ((name : string)
       (greeting? : string (default "Hello")))
      : string
      (return (+ greeting ", " name "!")))

    (asrt (greet { name: "World" }) "Hello, World!")
    (asrt (greet { name: "Alice", greeting: "Hi" }) "Hi, Alice!")
)`);
}, 30_000);

it('fn-o: no type annotations, default value', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    (fn-o add
      ((a) (b (default 0)))
      (return (+ a b)))

    (asrt (add { a: 5 }) 5)
    (asrt (add { a: 3, b: 4 }) 7)
    (asrt (add { a: 10, b: -2 }) 8)
)`);
}, 30_000);

it('fn-o: optional param without default', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    (fn-o wrap
      ((val : string)
       (prefix? : string)
       (suffix? : string))
      : string
      (return (+ (ternary prefix prefix "") val (ternary suffix suffix ""))))

    (asrt (wrap { val: "hi" }) "hi")
    (asrt (wrap { val: "hi", prefix: "[" }) "[hi")
    (asrt (wrap { val: "hi", prefix: "[", suffix: "]" }) "[hi]")
)`);
}, 30_000);

it('fn-o: rest param', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    (fn-o forward
      ((target : string)
       (rest opts : Record<string, unknown>))
      (return target))

    (asrt (forward { target: "x" }) "x")
    (asrt (forward { target: "y", extra: 1, other: true }) "y")
)`);
}, 30_000);

it('lambda-o: anonymous named-args callable', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    (let* ((mul (lambda-o
                  ((x) (y (default 2)))
                  (return (* x y)))))
      (asrt (mul { x: 5 }) 10)
      (asrt (mul { x: 3, y: 4 }) 12)
      (asrt (mul { x: 0 }) 0))
)`);
}, 30_000);

it('fn-o: duplicate key error at compile time', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    expect(() => fromSourceEndToEnd(`(program
    (fn-o bad
      ((a : string) (a : number))
      (return a))
)`)).toThrow(/duplicate named arg key/);
  } finally {
    spy.mockRestore();
  }
}, 30_000);

it('fn-o: class method-o', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    (class Greeter
      (class-body
        (method-o greet
          ((name : string)
           (loud? : boolean (default false)))
          : string
          (let* ((msg (+ "Hello, " name)))
            (return (ternary loud ((. msg toUpperCase)) msg))))))

    (let* ((g (new Greeter)))
      (asrt ((. g greet) { name: "World" }) "Hello, World")
      (asrt ((. g greet) { name: "World", loud: true }) "HELLO, WORLD"))
)`);
}, 30_000);
