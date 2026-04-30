/**
 * Tests for Section 2, Step 3 — Gensym name emission.
 *
 * Verifies that gensym'd identifiers are emitted as their `name` field
 * (i.e., `prefix_N`) in the TypeScript output.  The counter-based uniqueness
 * guarantee is structural: two gensym calls in the same compilation always
 * produce distinct names because the counter only increments.
 *
 * We cannot easily unit-test lowerExpr / emitExpr directly (they are not
 * individually exported), so these tests drive the full pipeline via
 * callCompiler and inspect stdout.
 */

import { describe, it, expect } from 'vitest';
import { compileSource as compile } from '#stage10';

const T = 30_000;

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ source: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

describe('Section 2 Step 3: gensym identifier emission', () => {
  it('a gensym\'d identifier is emitted as prefix_N in TypeScript output', () => {
    // The macro calls (gensym "g") and returns the resulting identifier node
    // via (quasi (unquote s)).  After expansion the call site becomes the
    // raw identifier g_0, which the emitter must write as exactly "g_0".
    const result = callCompiler(`(program
  (defmacro makeSym ()
    (let ((s (gensym "g")))
      (return (quasi (unquote s)))))
  (const (x) (makeSym))
)`);
    expect(result.status).toBe(0);
    // The TypeScript output must contain the gensym name in the form g_<digits>
    expect(result.stdout).toMatch(/g_\d+/);
    // The raw call form must not appear — the macro call is fully erased
    expect(result.stdout).not.toContain('makeSym(');
  }, T);

  it('two gensym calls in one compilation produce distinct names', () => {
    // Each expansion of makeSym generates a fresh counter value, so two
    // invocations produce g_0 and g_1 (different suffixes).
    const result = callCompiler(`(program
  (defmacro makeSym ()
    (let ((s (gensym "g")))
      (return (quasi (unquote s)))))
  (const (a) (makeSym))
  (const (b) (makeSym))
)`);
    expect(result.status).toBe(0);
    // Both distinct gensym names must appear
    const matches = result.stdout.match(/g_(\d+)/g) ?? [];
    const ids = new Set(matches);
    expect(ids.size).toBeGreaterThanOrEqual(2);
  }, T);

  it('gensym prefix is preserved verbatim in the emitted name', () => {
    const result = callCompiler(`(program
  (defmacro useTmp ()
    (let ((s (gensym "myprefix")))
      (return (quasi (unquote s)))))
  (const (x) (useTmp))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/myprefix_\d+/);
  }, T);

  it('a macro that uses gensym internally emits no gensym call in output', () => {
    // gensym is purely compile-time; the runtime output contains only the
    // expanded result, not any reference to gensym itself.
    const result = callCompiler(`(program
  (defmacro passthru (x)
    (let ((tmp (gensym "tmp")))
      (return (quasi (unquote x)))))
  (const (val) (passthru 99))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('99');
    // The compile-time gensym call must not appear in the TypeScript output
    expect(result.stdout).not.toContain('gensym');
  }, T);
});
