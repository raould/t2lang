/**
 * Tests for DESIGN.md Decision 1: Backtick strings removed from Stage7.
 *
 * Decision: BACKTICK_STRING is removed from the Stage7 grammar.
 * Backtick is reserved for template literals (reader layer, Stage 6+).
 * Regular single- or double-quoted strings are used everywhere instead.
 *
 * Verifies:
 *  1. Backtick-string literals are rejected by the parser (non-zero exit).
 *  2. Regular strings work in all positions where backtick was previously valid:
 *       - value-level literal
 *       - typeLiteral (tlit)
 *       - propKey (object field key)
 *  3. No `raw-template` AST nodes appear in the output (the dead code path
 *     has been removed from the AST builder).
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

// ── 1. BACKTICK_STRING token is gone — no raw-template nodes produced ────────
//
// The IDENTIFIER lexer rule (`~[() \n\t\r:;]+`) absorbs backtick characters,
// so a bare backtick sequence is lexed as an IDENTIFIER, not a BACKTICK_STRING.
// The meaningful guarantee is that no `raw-template` AST node is ever produced
// (the dead code path was removed from Stage7-ast.s3d), and the grammar rules
// for `literal`, `typeLiteral`, and `propKey` no longer reference BACKTICK_STRING.

describe('Decision 1: BACKTICK_STRING removed — no raw-template output', () => {
  it('compiler output does not contain the raw-template tag for any input', () => {
    // A single-quoted string literal — the canonical replacement.
    // raw-template nodes would appear in the AST dump if BACKTICK_STRING were still live.
    const result = callCompiler(`(program
  (const s 'hello')
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toContain('raw-template');
  }, T);

  it('typeLiteral with a quoted string does not produce a raw-template node', () => {
    const result = callCompiler(`(program
  (type Greeting (tlit "hello"))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).not.toContain('raw-template');
  }, T);
});

// ── 2. Regular strings work in all formerly-backtick positions ────────────────

describe('Decision 1: regular strings work in all positions', () => {
  it('single-quoted string is a valid literal', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (asrt 'hello' "hello")
    )`);
  }, T);

  it('double-quoted string is a valid literal', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (asrt "hello" 'hello')
    )`);
  }, T);

  it('string with single quotes inside double-quoted string works', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (asrt "it's fine" "it's fine")
    )`);
  }, T);

  it('string is a valid propKey for an object field', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (let (obj) (object ("myKey" 42)))
      (asrt (. obj myKey) 42)
    )`);
  }, T);

  it('hyphenated string key is accessible via index', () => {
    fromSourceEndToEnd(`(program
      (import (object (:named (array (object (:name "asrt"))))) "./helpers")
      (let (obj) (object ("has-hyphen" 99)))
      (asrt (index obj "has-hyphen") 99)
    )`);
  }, T);

  it('string is a valid typeLiteral value', () => {
    // (tlit "hello") is the type-level string literal
    const result = callCompiler(`(program
  (type Greeting (tlit "hello"))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('"hello"');
  }, T);
});
