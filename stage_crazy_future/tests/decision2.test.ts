/**
 * Tests for DESIGN.md Decision 2: Template literal keyword — `type-template` vs `template`.
 *
 * Decision:
 *  - Type-level template literal keyword renamed: `template` → `type-template`
 *  - Value-level template literal uses `template`
 *
 * Verifies:
 *  1. (type-template ...) works in type position and emits a TS template literal type.
 *  2. (template ...) works in value position and emits a JS template literal expression.
 *  3. Template expressions with multiple string and expression parts interleave correctly.
 *  4. No raw-template nodes appear in output (Decision 1 still holds).
 */

import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { fromSourceEndToEnd } from './helpers';

const T = 30_000;

function callCompiler(source: string) {
  return spawnSync('npx', ['tsx', 'index.ts', '-'], {
    encoding: 'utf-8',
    input: source,
    cwd: process.cwd(),
  });
}

// ── 1. type-template in type position ───────────────────────────────────────

describe('Decision 2: (type-template ...) in type position', () => {
  it('emits a TypeScript template literal type', () => {
    // (type-template "a" T) → `a${T}`
    const result = callCompiler(`(program
  (type TStr (type-params (T (extends string))) (type-template "a" T))
)`);
    expect(result.status).toBe(0);
    // Should contain a TS template literal type backtick expression
    expect(result.stdout).toContain('`');
    expect(result.stdout).not.toContain('raw-template');
  }, T);

  it('type-template end-to-end: TStr<"bc"> resolves to "abc"', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      ;; TStr<T extends string> = \`a\${T}\`
      (type TStr (type-params (T (extends string))) (type-template "a" T))
      ;; TStr<"bc"> resolves to "abc"
      (let (s : (TStr (tlit "bc"))) "abc")
      (asrt s "abc")
      (asrt (typeof s) "string")
    )`);
  }, T);
});

// ── 2. (template ...) in value position ────────────────────────────────────

describe('Decision 2: (template ...) in value position', () => {
  it('simple string-only template emits a backtick string', () => {
    const result = callCompiler(`(program
  (const s (template "hello world"))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('`hello world`');
  }, T);

  it('template with an expression hole interpolates correctly', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (const name "World")
      (const greeting (template "Hello " name "!"))
      (asrt greeting "Hello World!")
    )`);
  }, T);

  it('template with multiple holes interleaves correctly', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (const a "foo")
      (const b "bar")
      (const result (template a "-" b))
      (asrt result "foo-bar")
    )`);
  }, T);

  it('template with numeric expression', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (const n 42)
      (const msg (template "answer=" n))
      (asrt msg "answer=42")
    )`);
  }, T);

  it('template output does not contain raw-template', () => {
    const result = callCompiler(`(program
  (const s (template "hello"))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toContain('raw-template');
  }, T);
});
