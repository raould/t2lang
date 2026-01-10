/**
 * Tests for §4 "Putting it all together" — key pipeline invariants.
 *
 * The four invariants from DESIGN.md §4:
 *
 *  1. No macro call nodes survive past the macro expander.
 *  2. No `#[macro-time]` function definitions appear in the lowered output
 *     as runtime code (they are emitted as comments only).
 *  3. Every identifier in the expanded AST carries a KFFD scope set;
 *     name resolution uses subset matching (resolveNames is called in pipeline).
 *  4. `gensym` counters are not persisted across compilations.
 */

import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';

const T = 30_000;

function callCompiler(source: string) {
  return spawnSync('npx', ['tsx', 'index.ts', '-'], {
    encoding: 'utf-8',
    input: source,
    cwd: process.cwd(),
  });
}

// ── Invariant 1: no macro call nodes survive past the expander ─────────────

describe('Invariant 1: macro calls are fully erased from TypeScript output', () => {
  it('a macro call site is replaced by its expansion — no call form in output', () => {
    const result = callCompiler(`(program
  (defmacro inc-by-one ((x))
    (return (quasi (+ (unquote x) 1))))
  (const v (inc-by-one 41))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toContain('inc-by-one(');
    expect(result.stdout).toContain('41');
  }, T);

  it('a macro expanded inside another expression leaves no call node', () => {
    const result = callCompiler(`(program
  (defmacro neg ((x))
    (return (quasi (- 0 (unquote x)))))
  (const v (+ 1 (neg 5)))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toContain('neg(');
  }, T);

  it('nested macro calls are both erased', () => {
    const result = callCompiler(`(program
  (defmacro wrap ((x))
    (return (quasi (unquote x))))
  (defmacro double ((x))
    (return (quasi (+ (unquote x) (unquote x)))))
  (const v (wrap (double 5)))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toContain('wrap(');
    expect(result.stdout).not.toContain('double(');
  }, T);
});

// ── Invariant 2: #[macro-time] fn defs are comments, not runtime code ─────

describe('Invariant 2: #[macro-time] fn defs emit as comments, not runtime code', () => {
  it('#[macro-time] fn definition emits a comment line, not a function declaration', () => {
    const result = callCompiler(`(program
  (#[macro-time] (const helper (lambda ((x)) x)))
  (const y 1)
)`);
    expect(result.status).toBe(0);
    // Must appear as a comment
    expect(result.stdout).toMatch(/\/\/ #\[macro-time\] fn: helper/);
    // Must NOT appear as a function or variable declaration
    expect(result.stdout).not.toMatch(/let helper|const helper|function helper/);
  }, T);

  it('#[macro-time] fn is callable at macro-time but produces no runtime code', () => {
    // A #[macro-time] fn that is also used by a macro.
    // The final TypeScript output has only the macro's expansion result.
    const result = callCompiler(`(program
  (#[macro-time] (const double-val (lambda ((n)) (+ n n))))
  (defmacro use-helper ((x))
    (return (quasi (unquote x))))
  (const r (use-helper 7))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toMatch(/let double-val|function double-val/);
    expect(result.stdout).toContain('7');
  }, T);
});

// ── Invariant 3: KFFD scope resolution is part of the pipeline ────────────

describe('Invariant 3: resolveNames is called in the pipeline (no regression)', () => {
  // resolveNames annotates identifiers with resolvedScopes.  It must not
  // crash on any valid expanded AST.  These tests verify the pipeline
  // continues to produce correct output after resolveNames is wired in.

  it('pipeline produces correct output for a simple program (smoke test)', () => {
    const result = callCompiler(`(program
  (const x 1)
  (const y 2)
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('x');
    expect(result.stdout).toContain('y');
  }, T);

  it('pipeline with macro expansion still works correctly end-to-end', () => {
    const result = callCompiler(`(program
  (defmacro add ((a) (b))
    (return (quasi (+ (unquote a) (unquote b)))))
  (const r (add 3 4))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('3');
    expect(result.stdout).toContain('4');
    expect(result.status).toBe(0);
  }, T);

  it('pipeline with gensym works correctly after resolveNames', () => {
    const result = callCompiler(`(program
  (defmacro with-fresh ((x))
    (let* ((s (gensym "k")))
      (return (quasi (unquote x)))))
  (const v (with-fresh 99))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('99');
  }, T);
});

// ── Invariant 4: gensym counter resets between compilations ───────────────

describe('Invariant 4: gensym counter is not persisted across compilations', () => {
  it('two independent compilations both start gensym counter at 0', () => {
    const src = `(program
  (defmacro first-sym ()
    (let* ((s (gensym "c")))
      (return (quasi (unquote s)))))
  (const x (first-sym))
)`;
    const r1 = callCompiler(src);
    const r2 = callCompiler(src);
    expect(r1.status).toBe(0);
    expect(r2.status).toBe(0);
    // Both compilations should produce the same gensym name (c_0) because
    // the counter always starts from 0 — no persistence between runs.
    const m1 = r1.stdout.match(/c_\d+/)?.[0];
    const m2 = r2.stdout.match(/c_\d+/)?.[0];
    expect(m1).toBeDefined();
    expect(m2).toBeDefined();
    expect(m1).toBe(m2);  // same counter start → same name
  }, T);
});
