import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('this — passed as argument to a helper fn', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; this passed explicitly to a plain fn — the fn receives the object
    (const (getName) (fn ((obj)) (return (. obj name))))
    (let ((person (object
        (name "Alice")
        (greet (method () (return (getName this))))))))
    (asrt ((. person greet)) "Alice")
  )`);
}, 30_000);

it('this — in ternary inside method body', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; ternary that reads this.value — typical in a guarded getter
    (let ((box (object
        (value 0)
        (get (method () (return (ternary (> (. this value) 0) (. this value) 0))))
        (set (method ((n)) (set! (. this value) n)))))))
    ((. box set) -5)
    (asrt ((. box get)) 0)
    ((. box set) 10)
    (asrt ((. box get)) 10)
  )`);
}, 30_000);

it('this — method calling another method on this', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; quadruple calls double via (. this double) — this is preserved in property-call position
    (let ((obj (object
        (x 5)
        (double (method () (return (* (. this x) 2))))
        (quadruple (method () (return (* ((. this double)) 2))))))))
    (asrt ((. obj quadruple)) 20)
  )`);
}, 30_000);

it('this — fn constructor with multiple this assignments', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; fn with two set! statements — exercises multi-statement fn body
    (const (Point) (fn ((x) (y))
      (set! (. this x) x)
      (set! (. this y) y)))
    (let ((p (new Point 3 4))))
    (asrt (. p x) 3)
    (asrt (. p y) 4)
  )`);
}, 30_000);

it('this — fn constructor with computed method on prototype', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; attach a method to fn prototype via assignment
    (const (Counter) (fn ()
      (set! (. this count) 0)))
    (set! (. (. Counter prototype) inc) (fn ()
      (set! (. this count) (+ (. this count) 1))))
    (set! (. (. Counter prototype) get) (fn ()
      (return (. this count))))
    (let ((c (new Counter))))
    ((. c inc))
    ((. c inc))
    ((. c inc))
    (asrt ((. c get)) 3)
  )`);
}, 30_000);

it('this — bind fixes this for a method extracted from object', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    ;; extracting a method loses this; bind restores it
    (let ((obj (object (val 42) (get (method () (return (. this val))))))))
    (let ((extracted (. obj get))))
    (let ((bound (bind extracted obj))))
    (asrt (bound) 42)
  )`);
}, 30_000);
