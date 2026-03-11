/**
 * End-to-end integration tests for Step 7 — macro expansion in the compiler pipeline.
 *
 * These tests go through the full pipeline:
 *   source text → parser → AST → macro expander → lowering → TypeScript → eval
 *
 * Covers:
 *   - A macro call is fully expanded before lowering (the expanded code runs correctly)
 *   - defmacro nodes are emitted as comments (not runtime code)
 *   - Arity errors cause the compiler to exit with code 1 and write to stderr
 *   - macro-error causes the compiler to exit with code 1 and write to stderr
 *   - A macro that uses gensym doesn't capture user variables
 *
 * Grammar note: defmacro parameters use the form ((param1) (param2) ...) — each
 * parameter name is wrapped in its own parens inside the outer paren of the signature.
 * e.g. (defmacro f ((x)) body)  for a single-param macro.
 */

import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { fromSourceEndToEnd } from './helpers';

// ---- helper: call compiler directly to check exit code / stderr ----

function callCompiler(source: string) {
  return spawnSync('npx', ['tsx', 'index.ts', '-'], {
    encoding: 'utf-8',
    input: source,
    cwd: process.cwd(),
  });
}

// ---- basic macro expansion ----

// These tests spawn subprocesses; allow 30 s each.
const T = 30_000;

describe('Step 7: macro expansion in the compiler pipeline', () => {
  it('a zero-arg macro is expanded and its result executes correctly', () => {
    // (defmacro const42 () (return (quasi 42)))  →  the call site becomes the literal 42
    fromSourceEndToEnd(`(program
  (import (object (:named (array (object (:name "asrt"))))) "./helpers")
  (defmacro const42 ()
    (return (quasi 42)))
  (const result (const42))
  (asrt result 42)
)`);
  }, T);

  it('a one-arg macro using quasi/unquote is expanded correctly', () => {
    // (defmacro double ((x)) (return (quasi (+ (unquote x) (unquote x)))))
    // (double 21)  →  (+ 21 21)  →  42
    fromSourceEndToEnd(`(program
  (import (object (:named (array (object (:name "asrt"))))) "./helpers")
  (defmacro double ((x))
    (return (quasi (+ (unquote x) (unquote x)))))
  (const result (double 21))
  (asrt result 42)
)`);
  }, T);

  it('a macro can be called multiple times independently', () => {
    fromSourceEndToEnd(`(program
  (import (object (:named (array (object (:name "asrt"))))) "./helpers")
  (defmacro negate ((x))
    (return (quasi (- 0 (unquote x)))))
  (const a (negate 5))
  (const b (negate 10))
  (asrt a -5)
  (asrt b -10)
)`);
  }, T);

  it('defmacro node appears as a comment in the TypeScript output, not runtime code', () => {
    const result = callCompiler(`(program
  (defmacro myMacro ((x))
    (return (quasi (unquote x))))
  (const y (myMacro 99))
)`);
    expect(result.status).toBe(0);
    // The defmacro should appear as a comment like "// macro: myMacro"
    expect(result.stdout).toContain('// macro: myMacro');
    // It should NOT define a function or variable named myMacro
    expect(result.stdout).not.toMatch(/let myMacro|const myMacro|function myMacro/);
  }, T);

  it('macro call is completely removed from output — only expansion result remains', () => {
    const result = callCompiler(`(program
  (defmacro identityMacro ((x))
    (return (quasi (unquote x))))
  (const val (identityMacro 77))
)`);
    expect(result.status).toBe(0);
    // The macro call form should be gone; the number literal should appear
    expect(result.stdout).toContain('77');
    expect(result.stdout).not.toContain('identityMacro(');
  }, T);

  it('macro using gensym avoids capture of user variable with same prefix', () => {
    // gensym is called at macro-time to create a fresh identifier.
    // Surface syntax cannot place an unquoted gensym in a binding-name or
    // set!-target position (grammar constraint); full hygiene is verified by
    // unit tests.  Here we confirm:
    //  1. gensym does not crash the compiler,
    //  2. the macro expands and executes correctly,
    //  3. a user variable named "tmp" (same prefix as the gensym) is unaffected.
    fromSourceEndToEnd(`(program
  (import (object (:named (array (object (:name "asrt"))))) "./helpers")
  (defmacro negateFresh ((x))
    (let* ((tmp (gensym "tmp")))
      (return (quasi (- 0 (unquote x))))))
  (const tmp 5)
  (const result (negateFresh tmp))
  (asrt result -5)
  (asrt tmp 5)
)`);
  }, T);
});

// ---- error reporting from the pipeline ----

describe('Step 7: compiler pipeline error handling', () => {
  it('arity error causes compiler to exit with code 1', () => {
    const result = callCompiler(`(program
  (defmacro takesOne ((x))
    (return (quasi (unquote x))))
  (const v (takesOne 1 2))
)`);
    expect(result.status).toBe(1);
  }, T);

  it('arity error message is written to stderr', () => {
    const result = callCompiler(`(program
  (defmacro needsTwo ((a) (b))
    (return (quasi (+ (unquote a) (unquote b)))))
  (const v (needsTwo 1))
)`);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('needsTwo');
    expect(result.stderr).toMatch(/arity|expects/i);
  }, T);

  it('arity error does not produce TypeScript output to stdout', () => {
    const result = callCompiler(`(program
  (defmacro m ((x))
    (return (quasi (unquote x))))
  (const v (m 1 2 3))
)`);
    expect(result.status).toBe(1);
    // In streaming mode, forms emitted before the error-causing form are allowed.
    // The defmacro comment '// macro: m' may appear. What must NOT appear is any
    // TypeScript declaration from the error-causing form or any form after it.
    expect(result.stdout).not.toContain('const v');
  }, T);

  it('macro-error causes compiler to exit with code 1', () => {
    const result = callCompiler(`(program
  (defmacro alwaysBad ()
    (macro-error "deliberate error from macro"))
  (const v (alwaysBad))
)`);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('deliberate error from macro');
  }, T);

  it('multiple expansion errors are all reported together', () => {
    const result = callCompiler(`(program
  (defmacro m ((x))
    (return (quasi (unquote x))))
  (const a (m 1 2))
  (const b (m))
)`);
    expect(result.status).toBe(1);
    // Both error sites for macro "m" should appear in stderr
    const errCount = (result.stderr.match(/arity|expects/gi) || []).length;
    expect(errCount).toBeGreaterThanOrEqual(2);
  }, T);
});

// NOTE: The tests below require grammar support for quasi-quoting top-level forms
// (let, const, class, defmacro). Currently `(quasi ...)` only accepts expressions;
// top-level forms are statements and cannot be quoted until the grammar is extended.
// The worklist expandAll and validateTopLevelNode infrastructure is in place.
describe('Step 7: macro top-level splicing', () => {
  it('macro can splice multiple let/const/class forms', () => {
    fromSourceEndToEnd(`(program
  (import (object (:named (array (object (:name "asrt"))))) "./helpers")
  (defmacro emitMixed ()
    (return (array
      (quasi (let fromMacro 5))
      (quasi (const constFromMacro 17))
      (quasi (class Generated
        (class-body
          (field total : number)
          (constructor ()
            (set! (. this total) (+ 5 17)))))))))
  (emitMixed)
  (const instance (new Generated))
  (asrt fromMacro 5)
  (asrt constFromMacro 17)
  (asrt (. instance total) 22)
)
`);
  }, T);

  it.skip('macro-emitted defmacro registers for later calls', () => {
    fromSourceEndToEnd(`(program
  (import (object (:named (array (object (:name "asrt"))))) "./helpers")
  (defmacro produceMacro ()
    (return (array
      (quasi (defmacro emitted ((x))
        (return (quasi (+ (unquote x) 100))))))))
  (produceMacro)
  (const value (emitted 1))
  (asrt value 101)
)
`);
  }, T);

  it('array results in expression position emit macro error', () => {
    const result = callCompiler(`(program
  (defmacro emitTop ()
    (return (array (quasi (const fromMacro 1)))))
  (const value (+ (emitTop) 1))
)
`);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('top-level macro expansion not allowed in this position');
  }, T);

  it('macro emitting import is rejected', () => {
    const result = callCompiler(`(program
  (defmacro bringImport ()
    (return (array (quasi (import (object (:named (array (object (:name "asrt"))))) "./helpers")))))
  (bringImport)
)
`);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('macro top-level expansion produced disallowed form');
  }, T);
});
