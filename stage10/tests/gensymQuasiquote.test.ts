/**
 * Tests for Section 2, Step 4 — Gensym usage inside quasiquote.
 *
 * The canonical pattern (from DESIGN.md §2 Step 4) is:
 *
 *   (defmacro inc! ((x))
 *     (let ((tmp (gensym "t")))
 *       `(let ((,tmp ,x))
 *          (set! ,x (+ ,tmp 1)))))
 *
 * Note: Stage4 grammar constraints prevent (unquote …) in let-binding-name
 * or set! target positions in *source text*.  The full inc!/swap! pattern is
 * verified at the AST level by swapMacro.test.ts.
 *
 * Here we verify the two key invariants via callCompiler (TypeScript output):
 *
 *  1. A gensym bound ONCE outside the quasi template and unquoted N times
 *     inside the template produces the SAME identifier name at every use
 *     site (one fresh symbol per expansion, not one per unquote).
 *
 *  2. Two separate invocations of the same macro each receive a DIFFERENT
 *     fresh gensym name (the counter advances between expansions).
 *
 * Contrast with the anti-pattern: placing (gensym …) INSIDE the quasi
 * template at two separate unquote sites would call gensym twice and produce
 * two DIFFERENT names — verified by Test 3 for awareness.
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

describe('Section 2 Step 4: gensym bound outside quasi template', () => {
  it('same gensym binding unquoted twice produces the same name at both use sites', () => {
    // The macro binds s = (gensym "v") once, then unquotes s at two places
    // inside the quasi template.  Both uses must resolve to the same name
    // (e.g., "v_0 + v_0"), not two different names ("v_0 + v_1").
    const result = callCompiler(`(program
  (defmacro refTwice (x)
    (let ((s (gensym "v")))
      (return (quasi (+ (unquote s) (unquote s))))))
  (const ((r (refTwice 0))))
)`);
    expect(result.status).toBe(0);
    const matches = result.stdout.match(/v_\d+/g) ?? [];
    // At least two occurrences of a v_N name
    expect(matches.length).toBeGreaterThanOrEqual(2);
    // All occurrences must be the SAME name — one gensym per expansion
    expect(new Set(matches).size).toBe(1);
  }, T);

  it('same gensym binding unquoted three times still produces one unique name', () => {
    const result = callCompiler(`(program
  (defmacro refThree (x)
    (let ((s (gensym "k")))
      (return (quasi (+ (unquote s) (+ (unquote s) (unquote s)))))))
  (const ((r (refThree 0))))
)`);
    expect(result.status).toBe(0);
    const matches = result.stdout.match(/k_\d+/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(3);
    expect(new Set(matches).size).toBe(1);
  }, T);

  it('two expansions of the same macro produce different gensym names', () => {
    // Each call to the macro re-enters the macro body, calling (gensym "v")
    // afresh.  The counter advances, so each expansion gets a distinct name.
    const result = callCompiler(`(program
  (defmacro oneSym ()
    (let ((s (gensym "v")))
      (return (quasi (unquote s)))))
  (const ((a (oneSym))))
  (const ((b (oneSym))))
)`);
    expect(result.status).toBe(0);
    const matches = result.stdout.match(/v_\d+/g) ?? [];
    const uniqueIds = new Set(matches);
    // Each expansion must produce a distinct name
    expect(uniqueIds.size).toBeGreaterThanOrEqual(2);
  }, T);

  it('anti-pattern: gensym called inside quasi twice produces two different names', () => {
    // Contrast with Test 1: here gensym is NOT bound outside; each unquote
    // calls gensym independently → two different fresh names in the output.
    const result = callCompiler(`(program
  (defmacro twoSyms ()
    (return (quasi (+ (unquote (gensym "w")) (unquote (gensym "w"))))))
  (const ((r (twoSyms))))
)`);
    expect(result.status).toBe(0);
    const matches = result.stdout.match(/w_\d+/g) ?? [];
    const uniqueIds = new Set(matches);
    // Two independent gensym calls → two distinct names
    expect(uniqueIds.size).toBeGreaterThanOrEqual(2);
  }, T);
});
