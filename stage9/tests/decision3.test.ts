/**
 * Tests for DESIGN.md Decision 3: Optional index access — `optchain-index`.
 *
 * Decision:
 *  - `foo?.[expr]` desugars to `(optchain-index foo expr)`
 *
 * Verifies:
 *  1. (optchain-index obj key) emits `obj?.[key]` syntax.
 *  2. Returns the value when the object exists.
 *  3. Returns undefined when the object is null/undefined.
 *  4. Works with a computed (non-literal) key expression.
 */

import { describe, it, expect } from 'vitest';
import { compile } from '../index';
import { fromSourceEndToEnd } from './helpers';

const T = 30_000;

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ filePath: '-', input: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

// ── 1. Emit shape ────────────────────────────────────────────────────────────

describe('Decision 3: (optchain-index ...) emit shape', () => {
  it('emits optional index access syntax ?.[...]', () => {
    const result = callCompiler(`(program
  (const obj (object (a 1)))
  (const key "a")
  (const val (optchain-index obj key))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('?.[');
  }, T);
});

// ── 2. End-to-end runtime behaviour ─────────────────────────────────────────

describe('Decision 3: (optchain-index ...) runtime', () => {
  it('returns the value when the object exists', () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const arr (array 10 20 30))
      (const idx 1)
      (const val (optchain-index arr idx))
      (asrt val 20)
    )`);
  }, T);

  it('returns undefined when the object is null', () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const arr null)
      (const idx 0)
      (const val (optchain-index arr idx))
      (asrt val undefined)
    )`);
  }, T);

  it('works with a string key on a plain object', () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const obj (object (x 42)))
      (const key "x")
      (const val (optchain-index obj key))
      (asrt val 42)
    )`);
  }, T);
});
