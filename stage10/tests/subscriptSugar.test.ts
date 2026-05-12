import { it, expect } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import { compileSource } from '#stage10';

it('subscript sugar: foo[i] compiles to foo[i]', () => {
  fromSourceEndToEnd(`
    (program
      (import {asrt} "./helpers")
      (const ((arr (array 10 20 30))))
      (const ((v arr[1])))
      (asrt v 20)
    )`);
}, 30_000);

it('subscript sugar: chained foo[i][j]', () => {
  fromSourceEndToEnd(`
    (program
      (import {asrt} "./helpers")
      (const ((m (array (array 1 2) (array 3 4)))))
      (const ((v m[1][0])))
      (asrt v 3)
    )`);
}, 30_000);

it('subscript sugar: after call expr (foo())[i]', () => {
  const out = compileSource({ source: `(program
    (const ((f (lambda () (return (array 10 20 30))))))
    (const ((v (f)[1])))
  )` });
  expect(out).toContain('f()[1]');
}, 30_000);

it('subscript sugar: #[macro-time] not affected', () => {
  // Ensures # before [ does not trigger subscript transform
  const out = compileSource({ source: `(program
    (#[macro-time] (const ((x 1))))
  )` });
  expect(out).not.toContain('(. #');
}, 30_000);

it('subscript sugar: space before [ is subscript', () => {
  fromSourceEndToEnd(`
    (program
      (import {asrt} "./helpers")
      (const ((arr (array 10 20 30))))
      (const ((v arr [1])))
      (asrt v 20)
    )`);
}, 30_000);

it('subscript sugar: let binding name not affected by whitespace', () => {
  // (let ((arr [1 2 3]))) — arr is a binding name, not subscripted
  const out = compileSource({ source: `(program
    (let ((arr [1 2 3]))
      ((. console log) arr))
  )` });
  expect(out).toContain('let arr');
  expect(out).not.toContain('(. arr');
}, 30_000);
