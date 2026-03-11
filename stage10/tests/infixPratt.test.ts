import { it, expect, describe } from 'vitest';
import { tokenizeInfix, parsePrattInfix } from '#src/Stage10-infix-parser';

const parse = (src: string): any => parsePrattInfix(src, null);

const kinds = (src: string) => tokenizeInfix(src).map((t: any) => t.kind);
const texts = (src: string) => tokenizeInfix(src).map((t: any) => t.text);

describe('Pratt tokenizer', () => {
  it('basic: empty', () => {
    expect(kinds('')).toEqual(['EOF']);
  });

  it('basic: whitespace only', () => {
    expect(kinds('   \t\n')).toEqual(['EOF']);
  });

  it('basic: identifier', () => {
    expect(kinds('foo')).toEqual(['IDENT', 'EOF']);
    expect(texts('foo')).toEqual(['foo', '']);
  });

  it('numbers', () => {
    expect(kinds('1')).toEqual(['NUM', 'EOF']);
    expect(texts('1.5')).toEqual(['1.5', '']);
    expect(texts('1e10')).toEqual(['1e10', '']);
    expect(texts('1.5e-3')).toEqual(['1.5e-3', '']);
  });

  it('strings', () => {
    expect(texts('"hello"')).toEqual(['"hello"', '']);
    expect(texts("'world'")).toEqual(["'world'", '']);
    expect(texts('"a\\"b"')).toEqual(['"a\\"b"', '']);
    expect(texts('`raw`')).toEqual(['`raw`', '']);
  });

  it('simple binary op: a + b', () => {
    expect(kinds('a + b')).toEqual(['IDENT', 'PLUS', 'IDENT', 'EOF']);
    expect(texts('a + b')).toEqual(['a', '+', 'b', '']);
  });

  it('multi-char operators', () => {
    expect(kinds('a === b')).toEqual(['IDENT', 'STRICT_EQ', 'IDENT', 'EOF']);
    expect(kinds('a !== b')).toEqual(['IDENT', 'STRICT_NEQ', 'IDENT', 'EOF']);
    expect(kinds('a == b')).toEqual(['IDENT', 'EQ', 'IDENT', 'EOF']);
    expect(kinds('a != b')).toEqual(['IDENT', 'NEQ', 'IDENT', 'EOF']);
    expect(kinds('a <= b')).toEqual(['IDENT', 'LTE', 'IDENT', 'EOF']);
    expect(kinds('a >= b')).toEqual(['IDENT', 'GTE', 'IDENT', 'EOF']);
    expect(kinds('a ** b')).toEqual(['IDENT', 'STARSTAR', 'IDENT', 'EOF']);
    expect(kinds('a && b')).toEqual(['IDENT', 'AMPAMP', 'IDENT', 'EOF']);
    expect(kinds('a || b')).toEqual(['IDENT', 'PIPEPIPE', 'IDENT', 'EOF']);
    expect(kinds('a ?? b')).toEqual(['IDENT', 'NULLCOAL', 'IDENT', 'EOF']);
  });

  it('mixed operators (no precedence at this layer)', () => {
    expect(kinds('a + b * c')).toEqual(['IDENT', 'PLUS', 'IDENT', 'STAR', 'IDENT', 'EOF']);
  });

  it('nested braces', () => {
    expect(kinds('{a + b} * c')).toEqual(['LBRACE', 'IDENT', 'PLUS', 'IDENT', 'RBRACE', 'STAR', 'IDENT', 'EOF']);
  });

  // The headline test: gWidth/2 vs gWidth / 2 must tokenize differently.
  it('gWidth/2: slash absorbed into identifier (no surrounding whitespace)', () => {
    expect(kinds('gWidth/2')).toEqual(['IDENT', 'EOF']);
    expect(texts('gWidth/2')).toEqual(['gWidth/2', '']);
  });

  it('gWidth / 2: slash with surrounding whitespace becomes SLASH', () => {
    expect(kinds('gWidth / 2')).toEqual(['IDENT', 'SLASH', 'NUM', 'EOF']);
    expect(texts('gWidth / 2')).toEqual(['gWidth', '/', '2', '']);
  });

  it('s-form: (. arr length)', () => {
    expect(kinds('(. arr length) + 1')).toEqual([
      'LPAREN', 'DOT', 'IDENT', 'IDENT', 'RPAREN', 'PLUS', 'NUM', 'EOF',
    ]);
  });

  it('neoteric call: f(x, y)', () => {
    expect(kinds('f(x, y)')).toEqual([
      'IDENT', 'LPAREN', 'IDENT', 'COMMA', 'IDENT', 'RPAREN', 'EOF',
    ]);
  });

  it('unary operators', () => {
    expect(kinds('-x')).toEqual(['MINUS', 'IDENT', 'EOF']);
    expect(kinds('!done')).toEqual(['BANG', 'IDENT', 'EOF']);
    expect(kinds('~mask')).toEqual(['TILDE', 'IDENT', 'EOF']);
  });

  it('string with embedded close-paren does not unbalance', () => {
    const tokens = tokenizeInfix('f("hello)world")');
    expect(tokens.map((t: any) => t.kind)).toEqual([
      'IDENT', 'LPAREN', 'STR', 'RPAREN', 'EOF',
    ]);
    expect(tokens[2].text).toBe('"hello)world"');
  });

  it('offsets are correct', () => {
    const tokens = tokenizeInfix('a + b');
    expect(tokens[0]).toMatchObject({ kind: 'IDENT', text: 'a', offset: 0 });
    expect(tokens[1]).toMatchObject({ kind: 'PLUS',  text: '+', offset: 2 });
    expect(tokens[2]).toMatchObject({ kind: 'IDENT', text: 'b', offset: 4 });
  });

  it('rejects nested #{}', () => {
    expect(() => tokenizeInfix('a + #{b}')).toThrow(/nested/);
  });
});

describe('Pratt parser — atoms and unary', () => {
  it('single number', () => {
    expect(parse('42')).toMatchObject({ tag: 'literal', value: 42 });
  });

  it('single identifier', () => {
    expect(parse('foo')).toMatchObject({ tag: 'identifier', name: 'foo' });
  });

  it('string literal', () => {
    expect(parse('"hi"')).toMatchObject({ tag: 'literal', value: 'hi' });
  });

  it('unary minus', () => {
    expect(parse('-x')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'identifier', name: 'x' },
    });
  });

  it('unary bang', () => {
    expect(parse('!done')).toMatchObject({
      tag: 'unary-op', op: '!',
      operand: { tag: 'identifier', name: 'done' },
    });
  });

  it('unary tilde', () => {
    expect(parse('~mask')).toMatchObject({ tag: 'unary-op', op: '~' });
  });
});

describe('Pratt parser — binary operators and precedence', () => {
  it('a + b', () => {
    expect(parse('a + b')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'identifier', name: 'a' },
      right: { tag: 'identifier', name: 'b' },
    });
  });

  // The headline win: precedence replaces the uniformity check.
  it('a + b * c → a + (b * c)', () => {
    expect(parse('a + b * c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'identifier', name: 'a' },
      right: {
        tag: 'binary-op', op: '*',
        left:  { tag: 'identifier', name: 'b' },
        right: { tag: 'identifier', name: 'c' },
      },
    });
  });

  it('a * b + c → (a * b) + c', () => {
    expect(parse('a * b + c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left: {
        tag: 'binary-op', op: '*',
        left:  { tag: 'identifier', name: 'a' },
        right: { tag: 'identifier', name: 'b' },
      },
      right: { tag: 'identifier', name: 'c' },
    });
  });

  it('a + b + c → left-assoc: ((a + b) + c)', () => {
    expect(parse('a + b + c')).toMatchObject({
      tag: 'binary-op', op: '+',
      left: {
        tag: 'binary-op', op: '+',
        left:  { tag: 'identifier', name: 'a' },
        right: { tag: 'identifier', name: 'b' },
      },
      right: { tag: 'identifier', name: 'c' },
    });
  });

  it('a ** b ** c → right-assoc: a ** (b ** c)', () => {
    expect(parse('a ** b ** c')).toMatchObject({
      tag: 'binary-op', op: '**',
      left: { tag: 'identifier', name: 'a' },
      right: {
        tag: 'binary-op', op: '**',
        left:  { tag: 'identifier', name: 'b' },
        right: { tag: 'identifier', name: 'c' },
      },
    });
  });

  it('a || b && c → a || (b && c)', () => {
    expect(parse('a || b && c')).toMatchObject({
      tag: 'binary-op', op: '||',
      right: { tag: 'binary-op', op: '&&' },
    });
  });

  it('comparison chain a < b + c → a < (b + c)', () => {
    expect(parse('a < b + c')).toMatchObject({
      tag: 'binary-op', op: '<',
      left:  { tag: 'identifier', name: 'a' },
      right: { tag: 'binary-op', op: '+' },
    });
  });

  it('explicit grouping {a + b} * c', () => {
    expect(parse('{a + b} * c')).toMatchObject({
      tag: 'binary-op', op: '*',
      left:  { tag: 'binary-op', op: '+' },
      right: { tag: 'identifier', name: 'c' },
    });
  });
});

describe('Pratt parser — neoteric calls', () => {
  it('f(x)', () => {
    expect(parse('f(x)')).toMatchObject({
      tag: 'call',
      fn:   { tag: 'identifier', name: 'f' },
      args: [ { tag: 'identifier', name: 'x' } ],
    });
  });

  it('f(x, y)', () => {
    const r = parse('f(x, y)');
    expect(r.tag).toBe('call');
    expect(r.args.length).toBe(2);
  });

  it('f(a + b, c * d) — args are full infix expressions', () => {
    const r = parse('f(a + b, c * d)');
    expect(r.args[0]).toMatchObject({ tag: 'binary-op', op: '+' });
    expect(r.args[1]).toMatchObject({ tag: 'binary-op', op: '*' });
  });

  it('f(x) + 1', () => {
    expect(parse('f(x) + 1')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'call' },
      right: { tag: 'literal', value: 1 },
    });
  });
});

describe('Pratt parser — s-form prop access', () => {
  it('(. arr length)', () => {
    expect(parse('(. arr length)')).toMatchObject({
      tag: 'prop-access',
      object: { tag: 'identifier', name: 'arr' },
      key: 'length',
    });
  });

  it('nested (. (. a b) c) — chained prop access', () => {
    expect(parse('(. (. a b) c)')).toMatchObject({
      tag: 'prop-access',
      object: {
        tag: 'prop-access',
        object: { tag: 'identifier', name: 'a' },
        key: 'b',
      },
      key: 'c',
    });
  });

  it('(. arr length) + 1', () => {
    expect(parse('(. arr length) + 1')).toMatchObject({
      tag: 'binary-op', op: '+',
      left:  { tag: 'prop-access', key: 'length' },
      right: { tag: 'literal', value: 1 },
    });
  });

  it('(. obj method)(x) — neoteric call on prop-access', () => {
    expect(parse('(. obj method)(x)')).toMatchObject({
      tag: 'call',
      fn:  { tag: 'prop-access', key: 'method' },
      args: [ { tag: 'identifier', name: 'x' } ],
    });
  });
});

describe('Pratt parser — error contracts', () => {
  it('empty inner → error', () => {
    expect(() => parse('')).toThrow(/empty/i);
  });

  it('whitespace-only inner → error', () => {
    expect(() => parse('   ')).toThrow(/empty/i);
  });

  it('identifier with embedded slash → error', () => {
    expect(() => parse('gWidth/2')).toThrow(/contains '\/'/);
  });

  it('unmatched paren → error', () => {
    expect(() => parse('f(x')).toThrow();
  });

  it('bare ( for grouping → error', () => {
    expect(() => parse('(x + 1)')).toThrow(/sub-grouping/);
  });

  it('trailing junk → error', () => {
    expect(() => parse('a + b )')).toThrow();
  });
});

// =========================================================================
// Edge cases — whitespace, offsets, strings, numbers
// =========================================================================
describe('Pratt tokenizer — whitespace edge cases', () => {
  it('leading whitespace ignored', () => {
    expect(parse('   x')).toMatchObject({ tag: 'identifier', name: 'x' });
  });

  it('trailing whitespace ignored', () => {
    expect(parse('x   ')).toMatchObject({ tag: 'identifier', name: 'x' });
  });

  it('tabs and newlines treated as whitespace', () => {
    expect(parse('a\t+\nb')).toMatchObject({
      tag: 'binary-op', op: '+',
    });
  });

  it('tight spacing: "a+b*c" — operators with no spaces still tokenize', () => {
    expect(parse('a+b*c')).toMatchObject({
      tag: 'binary-op', op: '+',
      right: { tag: 'binary-op', op: '*' },
    });
  });

  it('extra whitespace inside call args', () => {
    expect(parse('f(  x  ,   y  )')).toMatchObject({
      tag: 'call',
      args: [{ name: 'x' }, { name: 'y' }],
    });
  });
});

describe('Pratt tokenizer — token offsets', () => {
  it('offsets correct for "foo + bar"', () => {
    const t = tokenizeInfix('foo + bar');
    expect(t[0]).toMatchObject({ kind: 'IDENT', text: 'foo', offset: 0 });
    expect(t[1]).toMatchObject({ kind: 'PLUS',  text: '+',   offset: 4 });
    expect(t[2]).toMatchObject({ kind: 'IDENT', text: 'bar', offset: 6 });
  });

  it('offsets correct for "f(x, y)"', () => {
    const t = tokenizeInfix('f(x, y)');
    expect(t.map((x: any) => [x.kind, x.offset])).toEqual([
      ['IDENT',  0],
      ['LPAREN', 1],
      ['IDENT',  2],
      ['COMMA',  3],
      ['IDENT',  5],
      ['RPAREN', 6],
      ['EOF',    7],
    ]);
  });

  it('multi-char ops report offset of first char', () => {
    const t = tokenizeInfix('a === b');
    expect(t[1]).toMatchObject({ kind: 'STRICT_EQ', text: '===', offset: 2 });
  });
});

describe('Pratt tokenizer — string literal edge cases', () => {
  it('string with newline escape', () => {
    expect(parse('"a\\nb"')).toMatchObject({
      tag: 'literal', value: 'a\nb',
    });
  });

  it('string with tab escape', () => {
    expect(parse('"a\\tb"')).toMatchObject({
      tag: 'literal', value: 'a\tb',
    });
  });

  it('string with embedded quote (escaped)', () => {
    expect(parse('"a\\"b"')).toMatchObject({
      tag: 'literal', value: 'a"b',
    });
  });

  it('single-quoted string', () => {
    expect(parse("'hello'")).toMatchObject({
      tag: 'literal', value: 'hello',
    });
  });

  it('backtick string preserves contents verbatim', () => {
    expect(parse('`raw text`')).toMatchObject({
      tag: 'literal', value: 'raw text',
    });
  });

  it('string containing close-paren does not unbalance', () => {
    expect(parse('f(")")')).toMatchObject({
      tag: 'call',
      fn: { name: 'f' },
      args: [{ tag: 'literal', value: ')' }],
    });
  });

  it('string containing close-brace does not unbalance', () => {
    expect(parse('f("}")')).toMatchObject({
      tag: 'call',
      args: [{ tag: 'literal', value: '}' }],
    });
  });
});

describe('Pratt tokenizer — number edge cases', () => {
  it('integer', () => {
    expect(parse('42')).toMatchObject({ tag: 'literal', value: 42 });
  });

  it('decimal', () => {
    expect(parse('3.14')).toMatchObject({ tag: 'literal', value: 3.14 });
  });

  it('exponent', () => {
    expect(parse('1e3')).toMatchObject({ tag: 'literal', value: 1000 });
  });

  it('decimal with negative exponent', () => {
    expect(parse('1.5e-2')).toMatchObject({ tag: 'literal', value: 0.015 });
  });

  it('negative number via unary minus', () => {
    expect(parse('-5')).toMatchObject({
      tag: 'unary-op', op: '-',
      operand: { tag: 'literal', value: 5 },
    });
  });

  it('subtraction vs negative number: a - 5', () => {
    expect(parse('a - 5')).toMatchObject({
      tag: 'binary-op', op: '-',
      left:  { name: 'a' },
      right: { tag: 'literal', value: 5 },
    });
  });
});

