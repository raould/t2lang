import { it, expect } from 'vitest';
import { compileSource as compile } from '../index';
import { fromSourceEndToEnd } from './helpers';

it('infix spacing', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const (gFoo) 10)
    (const (y) 2)
    (const (f) (lambda ((x)) x))
    (asrt (f (/ gFoo y)) (f #{gFoo / y}))
    (asrt (f (/ gFoo y)) (f #{gFoo/y}))
  )
`);
}, 30_000);


function callCompiler(src: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ source: src });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

function emittedTs(t2src: string): string {
    const r = callCompiler(`(program ${t2src})`);
    if (r.status !== 0) throw new Error(`Compilation failed: ${r.stderr}`);
    return r.stdout;
}

// basic arithmetic
it('#{1 + 2} emits 1 + 2', () => {
    expect(emittedTs('(const (x) #{1 + 2})')).toContain('1 + 2');
});

it('#{{2 * 3} + 1} emits (2 * 3) + 1', () => {
    expect(emittedTs('(const (x) #{{2 * 3} + 1})')).toContain('(2 * 3) + 1');
});

it('#{x + y} emits x + y', () => {
    expect(emittedTs('(const (x) #{x + y})')).toContain('x + y');
});

// no-spaces variants: all infix operator characters (except /) are already
// excluded from IDENTIFIER, so spacing is optional for all of them.
// '/' was the only exception (needed for macro namespace m/identity) and is
// now handled by the qualifiedIdent grammar rule.
// '-' followed by digits is lexed as NEG_NUMBER; infixBodyTail handles it.
it('#{w-2} parses as w - 2 (no spaces)', () => {
    expect(emittedTs('(const (x) #{w-2})')).toContain('w - 2');
});
it('#{w*2} parses as w * 2 (no spaces)', () => {
    expect(emittedTs('(const (x) #{w*2})')).toContain('w * 2');
});
it('#{w/2} parses as w / 2 (no spaces)', () => {
    expect(emittedTs('(const (x) #{w/2})')).toContain('w / 2');
});
it('#{w%2} parses as w % 2 (no spaces)', () => {
    expect(emittedTs('(const (x) #{w%2})')).toContain('w % 2');
});
it('#{w-2-3} left-associative subtraction (no spaces)', () => {
    expect(emittedTs('(const (x) #{w-2-3})')).toContain('(w - 2) - 3');
});

it('#{-x + 1} emits (-x) + 1', () => {
    expect(emittedTs('(const (x) #{-x + 1})')).toContain('(-x) + 1');
});

// unary operators
it('#{!done && {count > 0}} emits (!done) && (count > 0)', () => {
    expect(emittedTs('(const (x) #{!done && {count > 0}})')).toContain('(!done) && (count > 0)');
});

it('#{-n * 2} emits (-n) * 2', () => {
    expect(emittedTs('(const (x) #{-n * 2})')).toContain('(-n) * 2');
});

it('#{~mask | flags} emits (~mask) | flags', () => {
    expect(emittedTs('(const (x) #{~mask | flags})')).toContain('(~mask) | flags');
});

// neoteric calls
it('#{f(x) + 1} emits f(x) + 1', () => {
    expect(emittedTs('(const (x) #{f(x) + 1})')).toContain('f(x) + 1');
});

it('#{f(x, y) * g(z)} emits f(x, y) * g(z)', () => {
    expect(emittedTs('(const (x) #{f(x, y) * g(z)})')).toContain('f(x, y) * g(z)');
});

it('#{f(a + b, c * d)} infix args without {}', () => {
    expect(emittedTs('(const (x) #{f(a + b, c * d)})')).toContain('f(a + b, c * d)');
});

// property access (dotted IDENTIFIER tokens)
it('#{arr.length === 0} emits arr.length === 0', () => {
    expect(emittedTs('(const (x) #{arr.length === 0})')).toContain('arr.length === 0');
});

it('#{a.b + c.d} emits a.b + c.d', () => {
    expect(emittedTs('(const (x) #{a.b + c.d})')).toContain('a.b + c.d');
});

it('#{obj.method(x) + 1} emits obj.method(x) + 1', () => {
    expect(emittedTs('(const (x) #{obj.method(x) + 1})')).toContain('obj.method(x) + 1');
});

// nullish coalescing
it('#{value ?? defaultVal} emits value ?? defaultVal', () => {
    expect(emittedTs('(const (x) #{value ?? defaultVal})')).toContain('value ?? defaultVal');
});

// weak equality (allowed)
it('#{a == b} emits a == b', () => {
    expect(emittedTs('(const (x) #{a == b})')).toContain('a == b');
});

it('#{a != b} emits a != b', () => {
    expect(emittedTs('(const (x) #{a != b})')).toContain('a != b');
});

// error: mixed operators without grouping
it('#{a + b * c} → error: mixed operators', () => {
    const r = callCompiler('(program (const (x) #{a + b * c}))');
    expect(r.status).not.toBe(0);
    expect(r.stderr + r.stdout).toMatch(/mixed operators/);
});
