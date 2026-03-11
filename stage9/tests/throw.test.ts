import { it, expect, vi } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('throw form end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")

    ;; (throw expr) compiles to a throw statement.
    ;; This tests that throw is correctly emitted by placing it on a branch that
    ;; is never reached — the non-throwing path is exercised and asserted.
    (const safeDivide
      (lambda ((a) (b))
        (if (=== b 0)
          (then (throw (new Error "division by zero"))))
        (return (/ a b))))

    (asrt (safeDivide 10 2) 5)
    (asrt (safeDivide 9 3) 3)
    (asrt (safeDivide 0 5) 0)

    ;; throw inside a nested block — smoke test
    (const validate
      (lambda ((x))
        (if (< x 0)
          (then (throw (new Error (+ "negative: " x)))))
        (return x)))

    (asrt (validate 7) 7)
    (asrt (validate 0) 0)
  )`);
}, 30_000);

it('throw actually throws', () => {
  // runJs calls console.error before re-throwing; suppress it so vitest-fail-on-console
  // does not fail the test — the throw is the intended, expected behavior here.
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    expect(() => {
      fromSourceEndToEnd(`(program
        (throw (new Error "deliberate"))
      )`);
    }).toThrow('execution error');
  } finally {
    spy.mockRestore();
  }
}, 30_000);
