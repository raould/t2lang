/**
 * Identifier safety tests (INDENTIFIER_SAFETY.md Phases 3 & 4).
 *
 * Phase 3: valid identifiers pass; reserved words and bad names throw.
 * Phase 4: error messages include source span ("at <file>:<line>:<col>").
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

// ── 3a: valid identifiers pass through ──────────────────────────────────────

describe('3a: valid identifiers are accepted', () => {
  it('plain single-letter name', () => {
    const r = callCompiler(`(program (const x 1))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('x');
  }, T);

  it('underscore-prefixed name', () => {
    const r = callCompiler(`(program (const _foo 1))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('_foo');
  }, T);

  it('dollar-prefixed name', () => {
    const r = callCompiler(`(program (const $bar 1))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('$bar');
  }, T);

  it('alphanumeric name with digits after first char', () => {
    const r = callCompiler(`(program (const abc123 1))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('abc123');
  }, T);
});

// ── 3b: JS reserved words used as binding names → throws ────────────────────
// Only words that are NOT T2 grammar keywords can appear as IDENTIFIER tokens.
// (Grammar keywords like `return`, `class`, `if` fail at parse time anyway.)

describe('3b: JS reserved words as binding names are rejected', () => {
  for (const word of ['var', 'void', 'break', 'delete', 'enum', 'in', 'static', 'with']) {
    it(`rejects reserved word '${word}' as const binding`, () => {
      const r = callCompiler(`(program (const ${word} 1))`);
      expect(r.status).not.toBe(0);
      const combined = r.stderr + r.stdout;
      expect(combined).toMatch(new RegExp(`Invalid identifier '${word}'`));
    }, T);
  }
});

// ── 3c: digit-leading identifier via direct codegen call ─────────────────────
// Grammar prevents digit-leading names in source; test by calling emitTopLevel
// directly with a hand-crafted AST node.

import { emitTopLevel } from '../Stage8-codegen';

describe('3c: digit-leading identifier is rejected by checkId at codegen', () => {
  it('emitTopLevel throws for const-stmt with digit-leading name', () => {
    const node: any = {
      tag: 'const-stmt',
      name: '1bad',
      id: 0,
      typeAnnotation: undefined,
      init: { tag: 'literal', value: 0, id: 0, text: '0' },
      text: '',
    };
    expect(() => emitTopLevel(node)).toThrow(/Invalid identifier '1bad'/);
  });

  it('emitTopLevel throws for identifier expr with digit-leading name', () => {
    const node: any = {
      tag: 'expr-stmt',
      expr: { tag: 'identifier', name: '2x', id: 0, scopes: new Set(), text: '2x' },
      id: 0,
      text: '',
    };
    expect(() => emitTopLevel(node)).toThrow(/Invalid identifier '2x'/);
  });
});

// ── 3d: TS contextual keywords are allowed ───────────────────────────────────

describe('3d: TS contextual keywords are valid identifiers', () => {
  for (const word of ['of', 'from', 'async', 'target']) {
    it(`accepts TS contextual keyword '${word}'`, () => {
      const r = callCompiler(`(program (const ${word} 1))`);
      expect(r.status).toBe(0);
      expect(r.stdout).toContain(word);
    }, T);
  }
});

// ── 3e: spread params skip validation ───────────────────────────────────────

describe('3e: spread / rest params are not checked by checkId', () => {
  it('...args rest param is accepted', () => {
    const r = callCompiler(`(program (const f (lambda (...args) args)))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('...args');
  }, T);
});

// ── Phase 4: error messages include source span ──────────────────────────────

describe('Phase 4: checkId error includes source location', () => {
  it('error for reserved word contains "at <file>:<line>:<col>"', () => {
    const r = callCompiler(`(program
  (const var 1)
)`);
    expect(r.status).not.toBe(0);
    const combined = r.stderr + r.stdout;
    // Must mention the bad name and a location (file:line:col)
    expect(combined).toMatch(/Invalid identifier 'var'/);
    expect(combined).toMatch(/at .+:\d+:\d+/);
  }, T);

  it('error for identifier expr contains span', () => {
    const r = callCompiler(`(program
  (const x void)
)`);
    expect(r.status).not.toBe(0);
    const combined = r.stderr + r.stdout;
    expect(combined).toMatch(/Invalid identifier 'void'/);
    expect(combined).toMatch(/at .+:\d+:\d+/);
  }, T);
});

// ── Phase 6: private field names (#foo) ──────────────────────────────────────

describe('Phase 6: private field names', () => {
  it('(. this #count) emits this.#count (dot notation, not bracket)', () => {
    const r = callCompiler(`(program
  (class Foo (class-body
    (field #count)
    (method getCount ()
      (return (. this #count)))))
)`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('this.#count');
    expect(r.stdout).not.toContain('this["#count"]');
  }, T);

  it('#foo as a binding name is rejected by checkId', () => {
    const node: any = {
      tag: 'const-stmt',
      name: '#bad',
      id: 0,
      typeAnnotation: undefined,
      init: { tag: 'literal', value: 0, id: 0, text: '0' },
      text: '',
    };
    expect(() => emitTopLevel(node)).toThrow(/Invalid identifier '#bad'/);
  });
});
