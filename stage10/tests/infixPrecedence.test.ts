// Exhaustive precedence matrix for `#{...}` infix expressions.
//
// The Pratt rewrite gave us full operator precedence — the prior
// "uniformity check" approach made this kind of test impossible.
// Reading this file documents the full operator table.
//
// Conventions:
//   - "left-assoc"  → ((a op b) op c)
//   - "right-assoc" → (a op (b op c))
//   - lower bp binds looser; higher bp binds tighter
//
// See INFIX.md for the bp table; INFIX_TESTS.md for the plan.

import { it, expect, describe } from 'vitest';
import { parsePrattInfix } from '#src/Stage10-infix-parser';

const parse = (src: string): any => parsePrattInfix(src, null);

// =========================================================================
// Arithmetic — bp 80 (+ -), bp 90 (* / %)
// =========================================================================
describe('Arithmetic precedence', () => {
  it('a + b * c → a + (b * c)', () => {
    expect(parse('a + b * c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { name: 'a' },
      right: { tag: 'binary-op', op: '*' },
    });
  });

  it('a * b + c → (a * b) + c', () => {
    expect(parse('a * b + c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'binary-op', op: '*' },
      right: { name: 'c' },
    });
  });

  it('a + b - c → (a + b) - c (left-assoc, same bp)', () => {
    expect(parse('a + b - c')).toMatchObject({
      tag: 'binary-op', op: '-',
      left:  { tag: 'binary-op', op: '+' },
      right: { name: 'c' },
    });
  });

  it('a * b / c → (a * b) / c (left-assoc, same bp)', () => {
    expect(parse('a * b / c')).toMatchObject({
      tag: 'binary-op', op: '/',
      left:  { tag: 'binary-op', op: '*' },
    });
  });

  it('a + b * c - d / e → (a + (b * c)) - (d / e)', () => {
    expect(parse('a + b * c - d / e')).toMatchObject({
      tag: 'binary-op', op: '-',
      left: {
        tag: 'binary-op', op: '+',
        left: { name: 'a' },
        right: { tag: 'binary-op', op: '*' },
      },
      right: { tag: 'binary-op', op: '/' },
    });
  });

  it('a % b + c → (a % b) + c', () => {
    expect(parse('a % b + c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'binary-op', op: '%' },
    });
  });
});

// =========================================================================
// Power — bp 100, right-associative
// =========================================================================
describe('Power precedence (** is right-assoc)', () => {
  it('a ** b ** c → a ** (b ** c)', () => {
    expect(parse('a ** b ** c')).toMatchObject({
      tag: 'binary-op', op: '**',
      left:  { name: 'a' },
      right: { tag: 'binary-op', op: '**' },
    });
  });

  it('a ** b * c → (a ** b) * c (** binds tighter than *)', () => {
    expect(parse('a ** b * c')).toMatchObject({
      tag: 'binary-op', op: '*',
      left:  { tag: 'binary-op', op: '**' },
      right: { name: 'c' },
    });
  });

  it('a * b ** c → a * (b ** c)', () => {
    expect(parse('a * b ** c')).toMatchObject({
      tag: 'binary-op', op: '*',
      left:  { name: 'a' },
      right: { tag: 'binary-op', op: '**' },
    });
  });

  it('-a ** b → (-a) ** b (unary 100+ wins over ** right-bp 99)', () => {
    expect(parse('-a ** b')).toMatchObject({
      tag: 'binary-op', op: '**',
      left:  { tag: 'unary-op', op: '-' },
      right: { name: 'b' },
    });
  });
});

// =========================================================================
// Logical — bp 10 (|| ??), bp 20 (&&)
// =========================================================================
describe('Logical precedence', () => {
  it('a || b && c → a || (b && c)', () => {
    expect(parse('a || b && c')).toMatchObject({
      tag: 'binary-op', op: '||',
      right: { tag: 'binary-op', op: '&&' },
    });
  });

  it('a && b || c → (a && b) || c', () => {
    expect(parse('a && b || c')).toMatchObject({
      tag: 'binary-op', op: '||',
      left: { tag: 'binary-op', op: '&&' },
    });
  });

  it('a ?? b && c → a ?? (b && c)', () => {
    expect(parse('a ?? b && c')).toMatchObject({
      tag: 'binary-op', op: '??',
      right: { tag: 'binary-op', op: '&&' },
    });
  });

  it('a || b ?? c → (a || b) ?? c (same bp 10, left-assoc)', () => {
    expect(parse('a || b ?? c')).toMatchObject({
      tag: 'binary-op', op: '??',
      left: { tag: 'binary-op', op: '||' },
    });
  });

  it('a && b && c → (a && b) && c (left-assoc)', () => {
    expect(parse('a && b && c')).toMatchObject({
      tag: 'binary-op', op: '&&',
      left: { tag: 'binary-op', op: '&&' },
      right: { name: 'c' },
    });
  });
});

// =========================================================================
// Comparison — bp 60 (=== !== == !=), bp 70 (< > <= >=)
// =========================================================================
describe('Comparison precedence', () => {
  it('a < b + c → a < (b + c)', () => {
    expect(parse('a < b + c')).toMatchObject({
      tag: 'binary-op', op: '<',
      right: { tag: 'binary-op', op: '+' },
    });
  });

  it('a + b < c → (a + b) < c', () => {
    expect(parse('a + b < c')).toMatchObject({
      tag: 'binary-op', op: '<',
      left: { tag: 'binary-op', op: '+' },
    });
  });

  it('a < b && c < d → (a < b) && (c < d)', () => {
    expect(parse('a < b && c < d')).toMatchObject({
      tag: 'binary-op', op: '&&',
      left:  { tag: 'binary-op', op: '<' },
      right: { tag: 'binary-op', op: '<' },
    });
  });

  it('a === b + c → a === (b + c)', () => {
    expect(parse('a === b + c')).toMatchObject({
      tag: 'binary-op', op: '===',
      right: { tag: 'binary-op', op: '+' },
    });
  });

  it('a == b !== c → (a == b) !== c (same bp 60, left-assoc)', () => {
    expect(parse('a == b !== c')).toMatchObject({
      tag: 'binary-op', op: '!==',
      left: { tag: 'binary-op', op: '==' },
    });
  });

  it('a < b <= c → (a < b) <= c (same bp 70, left-assoc)', () => {
    expect(parse('a < b <= c')).toMatchObject({
      tag: 'binary-op', op: '<=',
      left: { tag: 'binary-op', op: '<' },
    });
  });
});

// =========================================================================
// Bitwise — bp 30 (|), bp 40 (^), bp 50 (&)
// =========================================================================
describe('Bitwise precedence (& > ^ > |)', () => {
  it('a | b & c → a | (b & c)', () => {
    expect(parse('a | b & c')).toMatchObject({
      tag: 'binary-op', op: '|',
      right: { tag: 'binary-op', op: '&' },
    });
  });

  it('a ^ b | c → (a ^ b) | c', () => {
    expect(parse('a ^ b | c')).toMatchObject({
      tag: 'binary-op', op: '|',
      left: { tag: 'binary-op', op: '^' },
    });
  });

  it('a & b ^ c → (a & b) ^ c', () => {
    expect(parse('a & b ^ c')).toMatchObject({
      tag: 'binary-op', op: '^',
      left: { tag: 'binary-op', op: '&' },
    });
  });

  it('a | b ^ c & d → a | (b ^ (c & d))', () => {
    expect(parse('a | b ^ c & d')).toMatchObject({
      tag: 'binary-op', op: '|',
      right: {
        tag: 'binary-op', op: '^',
        right: { tag: 'binary-op', op: '&' },
      },
    });
  });
});

// =========================================================================
// Unary — bp 100 (prefix); tighter than every binary except call
// =========================================================================
describe('Unary precedence (tighter than binary)', () => {
  it('!a && b → (!a) && b', () => {
    expect(parse('!a && b')).toMatchObject({
      tag: 'binary-op', op: '&&',
      left: { tag: 'unary-op', op: '!' },
    });
  });

  it('-a + b → (-a) + b', () => {
    expect(parse('-a + b')).toMatchObject({
      tag: 'binary-op', op: '+',
      left: { tag: 'unary-op', op: '-' },
    });
  });

  it('~a | b → (~a) | b', () => {
    expect(parse('~a | b')).toMatchObject({
      tag: 'binary-op', op: '|',
      left: { tag: 'unary-op', op: '~' },
    });
  });

  it('!a == b → (!a) == b', () => {
    expect(parse('!a == b')).toMatchObject({
      tag: 'binary-op', op: '==',
      left: { tag: 'unary-op', op: '!' },
    });
  });

  it('-a ** b → (-a) ** b (unary wins over **)', () => {
    expect(parse('-a ** b')).toMatchObject({
      tag: 'binary-op', op: '**',
      left: { tag: 'unary-op', op: '-' },
    });
  });
});

// =========================================================================
// Calls — bp 120; tighter than everything
// =========================================================================
describe('Call precedence (tightest)', () => {
  it('-f(x) → unary-op(-, call(f, x))', () => {
    expect(parse('-f(x)')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'call' },
    });
  });

  it('f(x) ** 2 → binary-op(**, call(f, x), 2)', () => {
    expect(parse('f(x) ** 2')).toMatchObject({
      tag: 'binary-op', op: '**',
      left:  { tag: 'call' },
      right: { tag: 'literal', value: 2 },
    });
  });

  it('f(x) + g(y) * h(z) → f(x) + (g(y) * h(z))', () => {
    expect(parse('f(x) + g(y) * h(z)')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'call', fn: { name: 'f' } },
      right: {
        tag: 'binary-op', op: '*',
        left:  { tag: 'call', fn: { name: 'g' } },
        right: { tag: 'call', fn: { name: 'h' } },
      },
    });
  });
});

// =========================================================================
// Explicit grouping with {...} overrides precedence
// =========================================================================
describe('Explicit grouping overrides precedence', () => {
  it('{a + b} * c → (a + b) * c', () => {
    expect(parse('{a + b} * c')).toMatchObject({
      tag: 'binary-op', op: '*',
      left:  { tag: 'binary-op', op: '+' },
      right: { name: 'c' },
    });
  });

  it('{a + b} * {c + d} → (a + b) * (c + d)', () => {
    expect(parse('{a + b} * {c + d}')).toMatchObject({
      tag: 'binary-op', op: '*',
      left:  { tag: 'binary-op', op: '+' },
      right: { tag: 'binary-op', op: '+' },
    });
  });

  it('a * {b + c} → a * (b + c)', () => {
    expect(parse('a * {b + c}')).toMatchObject({
      tag: 'binary-op', op: '*',
      left: { name: 'a' },
      right: { tag: 'binary-op', op: '+' },
    });
  });

  it('{a} → a (single-atom sub-group is transparent)', () => {
    expect(parse('{a}')).toMatchObject({ tag: 'identifier', name: 'a' });
  });
});
