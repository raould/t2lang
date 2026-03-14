import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('braceObjectLiteral end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")

      ;; string keys
      (let* ((o { "name": "Alice", "age": 30 }))
        (asrt ((. JSON stringify) o) '{"name":"Alice","age":30}'))

      ;; identifier keys
      (let* ((o { x: 1, y: 2 }))
        (asrt (. o x) 1)
        (asrt (. o y) 2))

      ;; shorthand { x }
      (let* ((x 42) (o { x }))
        (asrt (. o x) 42))

      ;; computed key [expr]
      (let* ((k "hello") (o { [k]: "world" }))
        (asrt (. o hello) "world"))

      ;; empty object
      (asrt ((. JSON stringify) {}) "{}")

      ;; mixed keys
      (let* ((tag "t") (o { "a": 1, b: 2, [tag]: 3 }))
        (asrt (. o a) 1)
        (asrt (. o b) 2)
        (asrt (. o t) 3))
)
`);
}, 30_000);
