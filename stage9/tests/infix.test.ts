import { it, expect } from 'vitest';
import { compileSource as compile } from '../index';

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
    expect(emittedTs('(const x #{1 + 2})')).toContain('1 + 2');
});

it('#{{2 * 3} + 1} emits (2 * 3) + 1', () => {
    expect(emittedTs('(const x #{{2 * 3} + 1})')).toContain('(2 * 3) + 1');
});

it('#{x + y} emits x + y', () => {
    expect(emittedTs('(const x #{x + y})')).toContain('x + y');
});

it('#{-x + 1} emits (-x) + 1', () => {
    expect(emittedTs('(const x #{-x + 1})')).toContain('(-x) + 1');
});

// unary operators
it('#{!done && {count > 0}} emits (!done) && (count > 0)', () => {
    expect(emittedTs('(const x #{!done && {count > 0}})')).toContain('(!done) && (count > 0)');
});

it('#{-n * 2} emits (-n) * 2', () => {
    expect(emittedTs('(const x #{-n * 2})')).toContain('(-n) * 2');
});

it('#{~mask | flags} emits (~mask) | flags', () => {
    expect(emittedTs('(const x #{~mask | flags})')).toContain('(~mask) | flags');
});

// neoteric calls
it('#{f(x) + 1} emits f(x) + 1', () => {
    expect(emittedTs('(const x #{f(x) + 1})')).toContain('f(x) + 1');
});

it('#{f(x, y) * g(z)} emits f(x, y) * g(z)', () => {
    expect(emittedTs('(const x #{f(x, y) * g(z)})')).toContain('f(x, y) * g(z)');
});

it('#{f(a + b, c * d)} infix args without {}', () => {
    expect(emittedTs('(const x #{f(a + b, c * d)})')).toContain('f(a + b, c * d)');
});

// property access (dotted IDENTIFIER tokens)
it('#{arr.length === 0} emits arr.length === 0', () => {
    expect(emittedTs('(const x #{arr.length === 0})')).toContain('arr.length === 0');
});

it('#{a.b + c.d} emits a.b + c.d', () => {
    expect(emittedTs('(const x #{a.b + c.d})')).toContain('a.b + c.d');
});

it('#{obj.method(x) + 1} emits obj.method(x) + 1', () => {
    expect(emittedTs('(const x #{obj.method(x) + 1})')).toContain('obj.method(x) + 1');
});

// nullish coalescing
it('#{value ?? defaultVal} emits value ?? defaultVal', () => {
    expect(emittedTs('(const x #{value ?? defaultVal})')).toContain('value ?? defaultVal');
});

// weak equality (allowed)
it('#{a == b} emits a == b', () => {
    expect(emittedTs('(const x #{a == b})')).toContain('a == b');
});

it('#{a != b} emits a != b', () => {
    expect(emittedTs('(const x #{a != b})')).toContain('a != b');
});

// error: mixed operators without grouping
it('#{a + b * c} → error: mixed operators', () => {
    const r = callCompiler('(program (const x #{a + b * c}))');
    expect(r.status).not.toBe(0);
    expect(r.stderr + r.stdout).toMatch(/mixed operators/);
});
