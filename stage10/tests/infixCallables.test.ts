// Comprehensive catalog of callable forms supported (and not supported)
// inside `#{...}` infix expressions.  Reading this file is reading the
// syntax catalog — each test name describes the form it exercises.
//
// See INFIX_TESTS.md for the plan and INFIX.md for user-facing semantics.

import { it, expect, describe } from 'vitest';
import { parsePrattInfix } from '#src/Stage10-infix-parser';

const parse = (src: string): any => parsePrattInfix(src, null);

// =========================================================================
// A. Bare-identifier callees
// =========================================================================
describe('A. Bare-identifier callees', () => {
  it('f() — zero args', () => {
    expect(parse('f()')).toMatchObject({
      tag: 'call',
      fn: { tag: 'identifier', name: 'f' },
      args: [],
    });
  });

  it('f(x) — one arg', () => {
    expect(parse('f(x)')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'identifier', name: 'x' }],
    });
  });

  it('f(x, y) — two args', () => {
    const r = parse('f(x, y)');
    expect(r.tag).toBe('call');
    expect(r.args.length).toBe(2);
    expect(r.args.map((a: any) => a.name)).toEqual(['x', 'y']);
  });

  it('f(x, y, z) — variadic', () => {
    const r = parse('f(x, y, z)');
    expect(r.args.length).toBe(3);
  });

  it('f(a + b) — infix expression as arg', () => {
    expect(parse('f(a + b)')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'binary-op', op: '+' }],
    });
  });

  it('f(a + b, c * d) — multiple infix args', () => {
    const r = parse('f(a + b, c * d)');
    expect(r.args[0]).toMatchObject({ tag: 'binary-op', op: '+' });
    expect(r.args[1]).toMatchObject({ tag: 'binary-op', op: '*' });
  });

  it('f(g(x)) — nested call as arg', () => {
    expect(parse('f(g(x))')).toMatchObject({
      tag: 'call',
      fn: { name: 'f' },
      args: [{
        tag: 'call',
        fn: { name: 'g' },
        args: [{ name: 'x' }],
      }],
    });
  });

  it('f(g(x), h(y)) — multiple nested calls', () => {
    const r = parse('f(g(x), h(y))');
    expect(r.args[0]).toMatchObject({ tag: 'call', fn: { name: 'g' } });
    expect(r.args[1]).toMatchObject({ tag: 'call', fn: { name: 'h' } });
  });

  it('f(g(h(x))) — deeply nested', () => {
    const r = parse('f(g(h(x)))');
    expect(r.fn.name).toBe('f');
    expect(r.args[0].fn.name).toBe('g');
    expect(r.args[0].args[0].fn.name).toBe('h');
    expect(r.args[0].args[0].args[0].name).toBe('x');
  });
});

// =========================================================================
// B. Dotted-name callees (reader pre-transforms to (. obj method) s-form)
// =========================================================================
//
// These tests use the post-reader form directly — that's what the Pratt
// parser sees.  Integration tests in infix.test.ts exercise the user-
// written form.
describe('B. Dotted-name callees (post-reader s-form)', () => {
  it('(. obj method)() — zero args', () => {
    expect(parse('(. obj method)()')).toMatchObject({
      tag: 'call',
      fn: { tag: 'prop-access', key: 'method' },
      args: [],
    });
  });

  it('(. obj method)(x) — with arg', () => {
    expect(parse('(. obj method)(x)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'prop-access', object: { name: 'obj' }, key: 'method' },
      args: [{ name: 'x' }],
    });
  });

  it('(. arr push)(item) — common method pattern', () => {
    expect(parse('(. arr push)(item)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'prop-access', key: 'push' },
    });
  });

  it('(. Math abs)(x) — namespaced', () => {
    expect(parse('(. Math abs)(x)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'prop-access', object: { name: 'Math' }, key: 'abs' },
    });
  });

  it('(. (. (. obj a) b) method)(x) — deep prop chain (a.b.method)', () => {
    expect(parse('(. (. (. obj a) b) method)(x)')).toMatchObject({
      tag: 'call',
      fn: {
        tag: 'prop-access', key: 'method',
        object: {
          tag: 'prop-access', key: 'b',
          object: {
            tag: 'prop-access', key: 'a',
            object: { name: 'obj' },
          },
        },
      },
    });
  });
});

// =========================================================================
// C. S-expression atoms (no call) and chained s-forms
// =========================================================================
describe('C. S-expression atoms', () => {
  it('(. arr length) — prop access used as a value', () => {
    expect(parse('(. arr length)')).toMatchObject({
      tag: 'prop-access',
      object: { name: 'arr' },
      key: 'length',
    });
  });

  it('(. (. a b) c) — nested s-form (a.b.c)', () => {
    expect(parse('(. (. a b) c)')).toMatchObject({
      tag: 'prop-access', key: 'c',
      object: { tag: 'prop-access', key: 'b', object: { name: 'a' } },
    });
  });
});

// =========================================================================
// D. Chained calls (call on call result)
// =========================================================================
describe('D. Chained calls', () => {
  it('f(x)(y) — curried-style', () => {
    expect(parse('f(x)(y)')).toMatchObject({
      tag: 'call',
      fn: {
        tag: 'call',
        fn: { name: 'f' },
        args: [{ name: 'x' }],
      },
      args: [{ name: 'y' }],
    });
  });

  it('f()(y) — zero-arg first link', () => {
    expect(parse('f()(y)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'call', fn: { name: 'f' }, args: [] },
      args: [{ name: 'y' }],
    });
  });

  it('f(x)(y)(z) — three-deep chain', () => {
    const r = parse('f(x)(y)(z)');
    expect(r.tag).toBe('call');
    expect(r.fn.tag).toBe('call');
    expect(r.fn.fn.tag).toBe('call');
    expect(r.fn.fn.fn.name).toBe('f');
  });

  it('getF()(x, y) — call-result with multi-arg', () => {
    const r = parse('getF()(x, y)');
    expect(r.tag).toBe('call');
    expect(r.args.length).toBe(2);
  });

  it('(. obj method)(x)(y) — method returning fn, then call', () => {
    expect(parse('(. obj method)(x)(y)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'call', fn: { tag: 'prop-access', key: 'method' } },
    });
  });
});

// =========================================================================
// E. Sub-grouped callees
// =========================================================================
describe('E. Sub-grouped callees', () => {
  it('{f}(x) — bare grouping (semantically same as f(x))', () => {
    expect(parse('{f}(x)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'identifier', name: 'f' },
      args: [{ name: 'x' }],
    });
  });

  it('{f + g}(x) — calling result of binary op (parses cleanly)', () => {
    expect(parse('{f + g}(x)')).toMatchObject({
      tag: 'call',
      fn: { tag: 'binary-op', op: '+' },
      args: [{ name: 'x' }],
    });
  });
});

// =========================================================================
// F. Calls in operator chains
// =========================================================================
describe('F. Calls in operator chains', () => {
  it('f(x) + g(y) — calls flanking +', () => {
    expect(parse('f(x) + g(y)')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'call', fn: { name: 'f' } },
      right: { tag: 'call', fn: { name: 'g' } },
    });
  });

  it('f(x) * g(y) + h(z) — call precedence with three operators', () => {
    expect(parse('f(x) * g(y) + h(z)')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'binary-op', op: '*' },
      right: { tag: 'call', fn: { name: 'h' } },
    });
  });

  it('f(x) ** 2 — call as ** left operand', () => {
    expect(parse('f(x) ** 2')).toMatchObject({
      tag: 'binary-op', op: '**',
      left:  { tag: 'call' },
      right: { tag: 'literal', value: 2 },
    });
  });

  it('-f(x) — unary minus on call', () => {
    expect(parse('-f(x)')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'call', fn: { name: 'f' } },
    });
  });

  it('!f(x) — bang on call', () => {
    expect(parse('!f(x)')).toMatchObject({
      tag: 'unary-op', op: '!',
      operand: { tag: 'call' },
    });
  });

  it('~f(x) — tilde on call', () => {
    expect(parse('~f(x)')).toMatchObject({ tag: 'unary-op', op: '~' });
  });

  it('f(x) === g(y) — calls in equality', () => {
    expect(parse('f(x) === g(y)')).toMatchObject({
      tag: 'binary-op', op: '===',
    });
  });

  it('a + f(x) * c — call inside operator chain', () => {
    expect(parse('a + f(x) * c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { name: 'a' },
      right: {
        tag: 'binary-op', op: '*',
        left:  { tag: 'call' },
        right: { name: 'c' },
      },
    });
  });
});

// =========================================================================
// G. Unary chains
// =========================================================================
describe('G. Unary chains', () => {
  it('--x — double minus', () => {
    expect(parse('--x')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'unary-op', op: '-', operand: { name: 'x' } },
    });
  });

  it('!!x — double bang (idiomatic boolean coercion)', () => {
    expect(parse('!!x')).toMatchObject({
      tag: 'unary-op', op: '!',
      operand: { tag: 'unary-op', op: '!' },
    });
  });

  it('-!x — mixed unary', () => {
    expect(parse('-!x')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'unary-op', op: '!' },
    });
  });

  it('~~mask — double tilde', () => {
    expect(parse('~~mask')).toMatchObject({
      tag: 'unary-op', op: '~',
      operand: { tag: 'unary-op', op: '~' },
    });
  });
});

// =========================================================================
// H. DOT after call result (F1)
// =========================================================================
//
// `f(x).prop` is supported via the DOT led at bp 110 — between unary (100)
// and call (120).  Reader doesn't transform DOT here because a `)` is not
// an identifier character.
describe('H. DOT after call result', () => {
  it('f(x).prop — prop access on call', () => {
    expect(parse('f(x).prop')).toMatchObject({
      tag: 'prop-access',
      object: { tag: 'call', fn: { name: 'f' } },
      key: 'prop',
    });
  });

  it('f(x).a.b — chained DOT (left-assoc)', () => {
    expect(parse('f(x).a.b')).toMatchObject({
      tag: 'prop-access', key: 'b',
      object: {
        tag: 'prop-access', key: 'a',
        object: { tag: 'call' },
      },
    });
  });

  it('f(x).method(y) — call on prop-access on call (DOT bp 110 < call 120)', () => {
    expect(parse('f(x).method(y)')).toMatchObject({
      tag: 'call',
      fn: {
        tag: 'prop-access', key: 'method',
        object: { tag: 'call', fn: { name: 'f' } },
      },
      args: [{ name: 'y' }],
    });
  });

  it('(. obj method)(x).result — DOT after s-form call', () => {
    expect(parse('(. obj method)(x).result')).toMatchObject({
      tag: 'prop-access',
      object: { tag: 'call', fn: { tag: 'prop-access', key: 'method' } },
      key: 'result',
    });
  });

  it('f(x).a + b — DOT (110) tighter than + (80)', () => {
    expect(parse('f(x).a + b')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'prop-access', key: 'a' },
      right: { name: 'b' },
    });
  });

  it('-f(x).a → unary on prop-access on call', () => {
    expect(parse('-f(x).a')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'prop-access', key: 'a' },
    });
  });
});

// =========================================================================
// I. Spread arguments (F2)
// =========================================================================
//
// `...args` works inside call argument lists only — not as a general atom.
// AST tag is `spread`; lower converts to `spread-expr`; codegen emits `...x`.
describe('I. Spread arguments', () => {
  it('f(...args) — single spread arg', () => {
    expect(parse('f(...args)')).toMatchObject({
      tag: 'call',
      fn: { name: 'f' },
      args: [{ tag: 'spread', expr: { name: 'args' } }],
    });
  });

  it('f(x, ...rest) — mixed positional + spread', () => {
    const r = parse('f(x, ...rest)');
    expect(r.args[0]).toMatchObject({ tag: 'identifier', name: 'x' });
    expect(r.args[1]).toMatchObject({ tag: 'spread', expr: { name: 'rest' } });
  });

  it('f(...a, ...b) — multiple spreads', () => {
    const r = parse('f(...a, ...b)');
    expect(r.args[0]).toMatchObject({ tag: 'spread' });
    expect(r.args[1]).toMatchObject({ tag: 'spread' });
  });

  it('f(...arr.items) — spread of prop-access', () => {
    expect(parse('f(...(. arr items))')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'spread', expr: { tag: 'prop-access', key: 'items' } }],
    });
  });

  it('f(...g(x)) — spread of call result', () => {
    expect(parse('f(...g(x))')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'spread', expr: { tag: 'call', fn: { name: 'g' } } }],
    });
  });

  it('f(...a + b) — spread parses full expression: ...(a + b)', () => {
    expect(parse('f(...a + b)')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'spread', expr: { tag: 'binary-op', op: '+' } }],
    });
  });
});

// =========================================================================
// J. Trailing comma in call args (F3)
// =========================================================================
describe('J. Trailing comma in call args', () => {
  it('f(x,) — single arg with trailing comma', () => {
    expect(parse('f(x,)')).toMatchObject({
      tag: 'call',
      args: [{ name: 'x' }],
    });
  });

  it('f(x, y,) — multi-arg with trailing comma', () => {
    expect(parse('f(x, y,)')).toMatchObject({
      tag: 'call',
      args: [{ name: 'x' }, { name: 'y' }],
    });
  });

  it('f(...args,) — trailing comma after spread', () => {
    expect(parse('f(...args,)')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'spread' }],
    });
  });
});

// =========================================================================
// K. S-form prop access on call results
// =========================================================================
//
// `(. expr key)` accepts arbitrary expressions in obj position — calls,
// chained s-forms, and atoms.  This is what the reader produces for
// `f(x).prop` and `f(x).a.b` after the dotted-id transform fires on
// closing-delimiter prev chars.
describe('K. S-form prop access on call results', () => {
  it('(. f(x) prop) — call as obj of explicit s-form', () => {
    expect(parse('(. f(x) prop)')).toMatchObject({
      tag: 'prop-access',
      object: { tag: 'call', fn: { name: 'f' } },
      key: 'prop',
    });
  });

  it('(. (. f(x) a) b) — chained s-form on call result (post-reader f(x).a.b)', () => {
    expect(parse('(. (. f(x) a) b)')).toMatchObject({
      tag: 'prop-access', key: 'b',
      object: {
        tag: 'prop-access', key: 'a',
        object: { tag: 'call' },
      },
    });
  });
});

// =========================================================================
// L. Remaining locked-in errors (intentional design choices, not gaps)
// =========================================================================
describe('L. Remaining locked-in errors', () => {
  it('f(,) — bare comma is not a valid arg', () => {
    expect(() => parse('f(,)')).toThrow(/unexpected token in atom position: COMMA/);
  });
});
