import {it, expect, describe} from 'vitest';
import {spawnSync} from 'child_process';
import {fromSourceEndToEnd} from './helpers';

const T = 30_000;

function callCompiler(source: string) {
  return spawnSync('npx', ['tsx', 'index.ts', '-'], {
    encoding: 'utf-8',
    input: source,
    cwd: process.cwd(),
  });
}

it('assign.t2 end-to-end', () => {
    fromSourceEndToEnd(`
        (program
            (import (object (:named (array (object (:name "asrt"))))) "./helpers")

            (let (x) 1)
            (asrt x 1)

            ;; set! mutates a binding
            (set! x 99)
            (asrt x 99)

            ;; set! in nested context
            (if true
                (set! x 200))
            (asrt x 200)
        )
  `);
}, 30_000);

describe('= operator is rejected as a syntax error', () => {
  it('rejects (= a 2) and suggests == or set!', () => {
    const r = callCompiler(`(program (let (x) 1) (= x 2))`);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/syntax error/);
    expect(r.stderr).toMatch(/==/);
    expect(r.stderr).toMatch(/set!/);
  }, T);

  it('rejects (= a b) in expression position', () => {
    const r = callCompiler(`(program (const x (= 1 2)))`);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/syntax error/);
  }, T);
});
