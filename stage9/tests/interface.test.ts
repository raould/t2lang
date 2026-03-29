import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('interface definition end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    ;; basic interface — fields are type-checked by TypeScript, values verified at runtime
    (interface Point (Object (x number) (y number)))
    (let ((p : Point (object (x 3) (y 4)))))
    (asrt (. p x) 3)
    (asrt (. p y) 4)

    ;; interface with a method type — TypeScript verifies the lambda matches the signature
    (interface Greeter (Object (greet (tfn () string))))
    (let ((g : Greeter (object (greet (lambda () (return "hello")))))))
    (asrt ((. g greet)) "hello")

    ;; interface with an optional field — object missing the optional field must still type-check
    (interface Config (Object (timeout? number) (retries number)))
    (let ((c : Config (object (retries 3)))))
    (asrt (. c retries) 3)

    ;; interface with generic type parameter
    (interface Box (type-params (T)) (Object (value T)))
    (let ((b : (type-app Box number) (object (value 99)))))
    (asrt (. b value) 99)

    ;; interface extending another interface
    (interface Named (Object (name string)))
    (interface NamedPoint (extends Named) (Object (x number) (y number)))
    (let ((np : NamedPoint (object (name "origin") (x 0) (y 0)))))
    (asrt (. np name) "origin")
    (asrt (. np x) 0)
  )`);
}, 30_000);
