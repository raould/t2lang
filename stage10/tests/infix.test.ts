import { it, expect } from 'vitest';
import { compileSource as compile } from '#stage10';
import { fromSourceEndToEnd } from './helpers';

it('infix spacing', () => {
  fromSourceEndToEnd(`(program
    (import {asrt} "./helpers")
    (const ((gFoo 10)))
    (const ((y 2)))
    (const ((f (lambda ((x)) x))))
    ;; this will fail as #{gFoo/y}, spaces are required.
    (asrt (f (/ gFoo y)) (f #{gFoo / y}))
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
    expect(emittedTs('(const ((x #{1 + 2})))')).toContain('1 + 2');
});

it('#{{2 * 3} + 1} emits (2 * 3) + 1', () => {
    expect(emittedTs('(const ((x #{{2 * 3} + 1})))')).toContain('(2 * 3) + 1');
});

it('#{x + y} emits x + y', () => {
    expect(emittedTs('(const ((x #{x + y})))')).toContain('x + y');
});

it('#{-x + 1} emits (-x) + 1', () => {
    expect(emittedTs('(const ((x #{-x + 1})))')).toContain('(-x) + 1');
});

// unary operators
it('#{!done && {count > 0}} emits (!done) && (count > 0)', () => {
    expect(emittedTs('(const ((x #{!done && {count > 0}})))')).toContain('(!done) && (count > 0)');
});

it('#{-n * 2} emits (-n) * 2', () => {
    expect(emittedTs('(const ((x #{-n * 2})))')).toContain('(-n) * 2');
});

it('#{~mask | flags} emits (~mask) | flags', () => {
    expect(emittedTs('(const ((x #{~mask | flags})))')).toContain('(~mask) | flags');
});

// neoteric calls
it('#{f(x) + 1} emits f(x) + 1', () => {
    expect(emittedTs('(const ((x #{f(x) + 1})))')).toContain('f(x) + 1');
});

it('#{f(x, y) * g(z)} emits f(x, y) * g(z)', () => {
    expect(emittedTs('(const ((x #{f(x, y) * g(z)})))')).toContain('f(x, y) * g(z)');
});

it('#{f(a + b, c * d)} infix args without {}', () => {
    expect(emittedTs('(const ((x #{f(a + b, c * d)})))')).toContain('f(a + b, c * d)');
});

// property access (dotted IDENTIFIER tokens)
it('#{arr.length === 0} emits arr.length === 0', () => {
    expect(emittedTs('(const ((x #{arr.length === 0})))')).toContain('arr.length === 0');
});

it('#{a.b + c.d} emits a.b + c.d', () => {
    expect(emittedTs('(const ((x #{a.b + c.d})))')).toContain('a.b + c.d');
});

it('#{obj.method(x) + 1} emits obj.method(x) + 1', () => {
    expect(emittedTs('(const ((x #{obj.method(x) + 1})))')).toContain('obj.method(x) + 1');
});

// nullish coalescing
it('#{value ?? defaultVal} emits value ?? defaultVal', () => {
    expect(emittedTs('(const ((x #{value ?? defaultVal})))')).toContain('value ?? defaultVal');
});

// weak equality (allowed)
it('#{a == b} emits a == b', () => {
    expect(emittedTs('(const ((x #{a == b})))')).toContain('a == b');
});

it('#{a != b} emits a != b', () => {
    expect(emittedTs('(const ((x #{a != b})))')).toContain('a != b');
});

// precedence: mixed operators are now valid (was an error pre-Pratt)
it('#{a + b * c} emits a + (b * c) — precedence', () => {
    expect(emittedTs('(const ((x #{a + b * c})))')).toContain('a + (b * c)');
});

it('#{a * b + c} emits (a * b) + c — precedence', () => {
    expect(emittedTs('(const ((x #{a * b + c})))')).toContain('(a * b) + c');
});

it('#{a || b && c} emits a || (b && c) — precedence', () => {
    expect(emittedTs('(const ((x #{a || b && c})))')).toContain('a || (b && c)');
});

it('#{a ** b ** c} emits a ** (b ** c) — right-assoc', () => {
    expect(emittedTs('(const ((x #{a ** b ** c})))')).toContain('a ** (b ** c)');
});

it('#{gWidth/2} → error: identifier contains slash', () => {
    const r = callCompiler('(program (const ((x #{gWidth/2}))))');
    expect(r.status).not.toBe(0);
    expect(r.stderr + r.stdout).toMatch(/contains '\/'/);
});

// =========================================================================
// Integration: callable forms (mirrors of unit tests in infixCallables.test.ts)
// =========================================================================
// These verify the full compile pipeline (reader → ANTLR → Pratt → AST →
// macro-expand → scope-resolve → lower → codegen) for the most important
// callable shapes.  Comprehensive parser-level coverage lives in
// infixCallables.test.ts.

// A — bare identifier callees
it('#{f()} compiles to f()', () => {
    expect(emittedTs('(const ((x #{f()})))')).toContain('f()');
});

it('#{f(g(h(x)))} compiles with deep nesting', () => {
    expect(emittedTs('(const ((x #{f(g(h(x)))})))')).toContain('f(g(h(x)))');
});

// B — dotted method calls (reader-transformed into s-form)
it('#{arr.push(item)} compiles to arr.push(item)', () => {
    expect(emittedTs('(const ((x #{arr.push(item)})))')).toContain('arr.push(item)');
});

it('#{Math.abs(n) + 1} compiles', () => {
    expect(emittedTs('(const ((x #{Math.abs(n) + 1})))')).toContain('Math.abs(n) + 1');
});

it('#{obj.a.b.method(x)} compiles deep prop chain', () => {
    expect(emittedTs('(const ((x #{obj.a.b.method(x)})))')).toContain('obj.a.b.method(x)');
});

// D — chained calls
it('#{f(x)(y)} compiles to f(x)(y)', () => {
    expect(emittedTs('(const ((x #{f(x)(y)})))')).toContain('f(x)(y)');
});

it('#{f(x)(y)(z)} compiles to f(x)(y)(z)', () => {
    expect(emittedTs('(const ((x #{f(x)(y)(z)})))')).toContain('f(x)(y)(z)');
});

it('#{obj.method(x)(y)} compiles', () => {
    expect(emittedTs('(const ((x #{obj.method(x)(y)})))')).toContain('obj.method(x)(y)');
});

// E — sub-grouped callee
it('#{{f}(x)} compiles to f(x) — sub-group is transparent', () => {
    expect(emittedTs('(const ((x #{{f}(x)})))')).toContain('f(x)');
});

// F — calls in operator chains
it('#{-f(x)} compiles to -(f(x))', () => {
    expect(emittedTs('(const ((x #{-f(x)})))')).toMatch(/\(?-f\(x\)\)?/);
});

it('#{f(x) ** 2} compiles', () => {
    expect(emittedTs('(const ((x #{f(x) ** 2})))')).toContain('f(x) ** 2');
});

it('#{a + f(x) * c} compiles with precedence', () => {
    expect(emittedTs('(const ((x #{a + f(x) * c})))')).toContain('a + (f(x) * c)');
});

// G — unary chains
it('#{!!x} compiles to double bang', () => {
    expect(emittedTs('(const ((x #{!!x})))')).toMatch(/!\(?!x\)?/);
});

// =========================================================================
// Integration: F1 — DOT after call result
// =========================================================================

it('#{f(x).prop} compiles to f(x).prop', () => {
    expect(emittedTs('(const ((x #{f(x).prop})))')).toContain('f(x).prop');
});

it('#{f(x).a.b} compiles with chained DOT after call (reader fix)', () => {
    expect(emittedTs('(const ((x #{f(x).a.b})))')).toContain('f(x).a.b');
});

it('#{f(x).method(y)} compiles with call after DOT', () => {
    expect(emittedTs('(const ((x #{f(x).method(y)})))')).toContain('f(x).method(y)');
});

it('#{arr[0].length} compiles — chained DOT after subscript', () => {
    expect(emittedTs('(const ((x #{arr[0].length})))')).toContain('arr[0].length');
});

// =========================================================================
// Integration: F2 — spread arguments
// =========================================================================

it('#{f(...args)} compiles to f(...args)', () => {
    expect(emittedTs('(const ((x #{f(...args)})))')).toContain('f(...args)');
});

it('#{f(x, ...rest)} compiles with mixed args', () => {
    expect(emittedTs('(const ((x #{f(x, ...rest)})))')).toContain('f(x, ...rest)');
});

it('#{arr.push(...newItems)} compiles spread on method call', () => {
    expect(emittedTs('(const ((x #{arr.push(...newItems)})))')).toContain('arr.push(...newItems)');
});

// =========================================================================
// Integration: F3 — trailing comma
// =========================================================================

it('#{f(x,)} compiles to f(x)', () => {
    // Trailing comma is allowed but doesn't appear in emitted output.
    expect(emittedTs('(const ((x #{f(x,)})))')).toContain('f(x)');
});

it('#{f(x, y,)} compiles with trailing comma after multi-arg', () => {
    expect(emittedTs('(const ((x #{f(x, y,)})))')).toContain('f(x, y)');
});

// =========================================================================
// Integration: remaining errors (intentional design choices)
// =========================================================================

it('#{f(,)} → error: bare comma not valid', () => {
    const r = callCompiler('(program (const ((x #{f(,)}))))');
    expect(r.status).not.toBe(0);
});
