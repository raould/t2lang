import { describe, it, expect } from 'vitest';
import { compileSource as t2compile } from '#stage10';
import { fromSourceEndToEnd } from './helpers';

const T = 30_000;

function compile(src: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = t2compile({ source: src });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

// ─────────────────────────────────────────────
// OBJECT DESTRUCTURING
// ─────────────────────────────────────────────

describe('object destructuring in const', () => {
  it('single property destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x} (object (x 42))))
        (asrt x 42))
    )`);
  });

  it('multiple property destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x y z} (object (x 1) (y 2) (z 3))))
        (asrt x 1)
        (asrt y 2)
        (asrt z 3))
    )`);
  });

  it('object destructuring with body', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({name age} (object (name "Alice") (age 30))))
        ((. console log) (+ "Hello " name))
        (asrt name "Alice")
        (asrt age 30))
    )`);
  });

  it('mixed destructuring and regular bindings in same const', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const ((a 10)
              ({x y} (object (x 20) (y 30)))
              (c (+ a x y)))
        (asrt a 10)
        (asrt x 20)
        (asrt y 30)
        (asrt c 60))
    )`);
  });

  it('emits const {...} = ... syntax', () => {
    const r = compile(`(program
      (const (({x y} obj)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {x, y} = obj');
  });

  it('emits const {...} = ... for single property', () => {
    const r = compile(`(program
      (const (({x} obj)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {x} = obj');
  });
});

describe('object destructuring in let', () => {
  it('let with object destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let (({a b} (object (a 1) (b 2))))
        (asrt a 1)
        (asrt b 2))
    )`);
  });

  it('emits let {...} = ... syntax', () => {
    const r = compile(`(program
      (let (({x} obj)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('let {x} = obj');
  });
});

describe('object destructuring in var', () => {
  it('var with object destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (var (({p q} (object (p 5) (q 10))))
        (asrt p 5)
        (asrt q 10))
    )`);
  });

  it('emits var {...} = ... syntax', () => {
    const r = compile(`(program
      (var (({x} obj)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('var {x} = obj');
  });
});

// ─────────────────────────────────────────────
// ARRAY DESTRUCTURING
// ─────────────────────────────────────────────

describe('array destructuring in const', () => {
  it('single element destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (([x] (array 42)))
        (asrt x 42))
    )`);
  });

  it('multiple element destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (([a b c] (array 1 2 3)))
        (asrt a 1)
        (asrt b 2)
        (asrt c 3))
    )`);
  });

  it('array destructuring with body', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (([first second] (array 10 20)))
        ((. console log) first)
        (asrt first 10)
        (asrt second 20))
    )`);
  });

  it('mixed bindings and array destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const ((x 5)
              ([a b] (array 100 200))
              (sum (+ x a b)))
        (asrt x 5)
        (asrt a 100)
        (asrt b 200)
        (asrt sum 305))
    )`);
  });

  it('emits const [...] = ... syntax', () => {
    const r = compile(`(program
      (const (([x y z] arr)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [x, y, z] = arr');
  });

  it('emits const [...] = ... for single element', () => {
    const r = compile(`(program
      (const (([x] arr)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [x] = arr');
  });
});

describe('array destructuring in let', () => {
  it('let with array destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let (([x y] (array 7 8)))
        (asrt x 7)
        (asrt y 8))
    )`);
  });

  it('emits let [...] = ... syntax', () => {
    const r = compile(`(program
      (let (([x y] arr)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('let [x, y] = arr');
  });
});

describe('array destructuring in var', () => {
  it('var with array destructuring', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (var (([m n] (array 3 4)))
        (asrt m 3)
        (asrt n 4))
    )`);
  });

  it('emits var [...] = ... syntax', () => {
    const r = compile(`(program
      (var (([x y] arr)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('var [x, y] = arr');
  });
});

// ─────────────────────────────────────────────
// MIXED OBJECT AND ARRAY DESTRUCTURING
// ─────────────────────────────────────────────

describe('mixed object and array destructuring', () => {
  it('multiple bindings with different destructuring types', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x y} (object (x 1) (y 2)))
              ([a b] (array 3 4))
              (z 5))
        (asrt x 1)
        (asrt y 2)
        (asrt a 3)
        (asrt b 4)
        (asrt z 5))
    )`);
  });

  it('object then array destructuring with body', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({name} (object (name "Bob")))
              ([age] (array 25)))
        ((. console log) (+ name " is " age " years old"))
        (asrt name "Bob")
        (asrt age 25))
    )`);
  });
});

// ─────────────────────────────────────────────
// TYPE ANNOTATIONS WITH DESTRUCTURING
// ─────────────────────────────────────────────

describe('type annotations with destructuring', () => {
  it('object destructuring with type annotation', () => {
    const r = compile(`(program
      (const (({x} : (obj (x number)) obj)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain(': { x: number }');
  });

  it('array destructuring with type annotation', () => {
    const r = compile(`(program
      (const (([x y] : (type-array number) arr)))
    )`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain(': number[]');
  });
});

// ─────────────────────────────────────────────
// SCOPING AND SEQUENTIAL BINDING
// ─────────────────────────────────────────────

describe('destructuring respects sequential binding scope', () => {
  it('later destructuring can reference earlier bindings', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const ((obj (object (x 10)))
              ({x} obj))
        (asrt x 10))
    )`);
  });

  it('array destructuring can use earlier bindings', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const ((arr (array 1 2 3))
              ([a b c] arr))
        (asrt a 1)
        (asrt b 2)
        (asrt c 3))
    )`);
  });
});

// ─────────────────────────────────────────────
// EDGE CASES AND SPECIFICS
// ─────────────────────────────────────────────

describe('destructuring edge cases', () => {
  it('empty object destructuring', { timeout: T }, () => {
    // Should not error, just binds nothing
    fromSourceEndToEnd(`(program
      (const (({} (object))))
    )`);
  });

  it('empty array destructuring', { timeout: T }, () => {
    // Should not error, just binds nothing
    fromSourceEndToEnd(`(program
      (const (([] (array))))
    )`);
  });

  it('destructuring with uninitialized variables in expression', { timeout: T }, () => {
    // Variables from destructuring available after binding
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x} (object (x 99))))
        (asrt x 99))
    )`);
  });
});

// ─────────────────────────────────────────────
// EXPECTED TYPESCRIPT OUTPUT
// ─────────────────────────────────────────────

describe('destructuring generates correct TypeScript syntax', () => {
  it('single property emits const {x} = obj', () => {
    const r = compile(`(program (const (({x} obj))))`);
    expect(r.stdout).toContain('const {x} = obj');
  });

  it('two properties emits const {x, y} = obj', () => {
    const r = compile(`(program (const (({x y} obj))))`);
    expect(r.stdout).toContain('const {x, y} = obj');
  });

  it('single array element emits const [x] = arr', () => {
    const r = compile(`(program (const (([x] arr))))`);
    expect(r.stdout).toContain('const [x] = arr');
  });

  it('two array elements emits const [x, y] = arr', () => {
    const r = compile(`(program (const (([x y] arr))))`);
    expect(r.stdout).toContain('const [x, y] = arr');
  });

  it('three array elements emits const [a, b, c] = arr', () => {
    const r = compile(`(program (const (([a b c] arr))))`);
    expect(r.stdout).toContain('const [a, b, c] = arr');
  });

  it('let emits let {x} = obj', () => {
    const r = compile(`(program (let (({x} obj))))`);
    expect(r.stdout).toContain('let {x} = obj');
  });

  it('var emits var [x] = arr', () => {
    const r = compile(`(program (var (([x] arr))))`);
    expect(r.stdout).toContain('var [x] = arr');
  });
});

// ─────────────────────────────────────────────
// SPREAD/REST SYNTAX IN DESTRUCTURING
// ─────────────────────────────────────────────

describe('object destructuring with rest element', () => {
  it('single property with rest collects remaining properties', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x ...rest} (object (x 1) (y 2) (z 3))))
        (asrt x 1)
        (asrt (. rest y) 2)
        (asrt (. rest z) 3))
    )`);
  });

  it('multiple properties with rest collects remaining', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x y ...rest} (object (x 1) (y 2) (a 10) (b 20))))
        (asrt x 1)
        (asrt y 2)
        (asrt (. rest a) 10)
        (asrt (. rest b) 20))
    )`);
  });

  it('rest element is empty when no remaining properties', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x y ...rest} (object (x 1) (y 2))))
        (asrt (. ((. Object keys) rest) length) 0))
    )`);
  });

  it('object rest in let statement', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let (({name ...rest} (object (name "Alice") (age 30) (city "NYC"))))
        (asrt name "Alice")
        (asrt (. rest age) 30))
    )`);
  });

  it('object rest in var statement', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (var (({x ...rest} (object (x 5) (y 10))))
        (asrt x 5)
        (asrt (. rest y) 10))
    )`);
  });

  it('emits const {x, ...rest} = obj syntax', () => {
    const r = compile(`(program (const (({x ...rest} obj))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {x, ...rest} = obj');
  });

  it('emits const {...rest} = obj for rest-only', () => {
    const r = compile(`(program (const (({...rest} obj))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {...rest} = obj');
  });

  it('emits const {x, y, ...rest} = obj for multiple properties', () => {
    const r = compile(`(program (const (({x y ...rest} obj))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {x, y, ...rest} = obj');
  });

  it('mixed bindings with object rest', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const ((a 1)
              ({x ...rest} (object (x 2) (y 3)))
              (b (+ a x)))
        (asrt a 1)
        (asrt x 2)
        (asrt b 3)
        (asrt (. rest y) 3))
    )`);
  });
});

describe('array destructuring with rest element', () => {
  it('single element with rest collects remaining elements', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (([x ...rest] (array 1 2 3)))
        (asrt x 1)
        (asrt (. rest 0) 2)
        (asrt (. rest 1) 3))
    )`);
  });

  it('multiple elements with rest collects remaining', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (([a b ...rest] (array 10 20 30 40 50)))
        (asrt a 10)
        (asrt b 20)
        (asrt (. rest 0) 30)
        (asrt (. rest 1) 40)
        (asrt (. rest 2) 50))
    )`);
  });

  it('rest element is empty array when no remaining elements', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (([a b ...rest] (array 1 2)))
        (asrt a 1)
        (asrt b 2)
        (asrt (. rest length) 0))
    )`);
  });

  it('array rest in let statement', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (let (([first ...rest] (array 100 200 300)))
        (asrt first 100)
        (asrt (. rest 0) 200))
    )`);
  });

  it('array rest in var statement', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (var (([x ...rest] (array 1 2 3)))
        (asrt x 1)
        (asrt (. rest length) 2))
    )`);
  });

  it('emits const [x, ...rest] = arr syntax', () => {
    const r = compile(`(program (const (([x ...rest] arr))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [x, ...rest] = arr');
  });

  it('emits const [...rest] = arr for rest-only', () => {
    const r = compile(`(program (const (([...rest] arr))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [...rest] = arr');
  });

  it('emits const [a, b, ...rest] = arr for multiple elements', () => {
    const r = compile(`(program (const (([a b ...rest] arr))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [a, b, ...rest] = arr');
  });

  it('mixed bindings with array rest', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const ((x 10)
              ([a ...rest] (array 1 2 3))
              (sum (+ x a)))
        (asrt x 10)
        (asrt a 1)
        (asrt sum 11)
        (asrt (. rest 0) 2))
    )`);
  });
});

describe('mixed object and array destructuring with rest', () => {
  it('object with rest and array with rest in same const', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x ...xrest} (object (x 1) (y 2)))
              ([a ...arest] (array 10 20)))
        (asrt x 1)
        (asrt (. xrest y) 2)
        (asrt a 10)
        (asrt (. arest 0) 20))
    )`);
  });

  it('rest-only object and element + rest array', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({...props} (object (a 5) (b 10)))
              ([first ...rest] (array 100 200)))
        (asrt (. props a) 5)
        (asrt first 100)
        (asrt (. rest 0) 200))
    )`);
  });
});

describe('rest element in different binding positions', () => {
  it('rest element available in body statements', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({x ...rest} (object (x 1) (extra 99))))
        ((. console log) rest)
        (asrt (. rest extra) 99))
    )`);
  });

  it('rest element from earlier binding used in later binding expression', { timeout: T }, () => {
    fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")
      (const (({a ...rest} (object (a 10) (b 20)))
              (merged ((. Object assign) (object) rest (object (a a)))))
        (asrt (. merged a) 10)
        (asrt (. merged b) 20))
    )`);
  });
});

describe('codegen for rest element', () => {
  it('rest-only object pattern', () => {
    const r = compile(`(program (const (({...rest} obj))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {...rest} = obj');
  });

  it('rest-only array pattern', () => {
    const r = compile(`(program (const (([...rest] arr))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [...rest] = arr');
  });

  it('object with many properties and rest', () => {
    const r = compile(`(program (const (({a b c d e ...rest} obj))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const {a, b, c, d, e, ...rest} = obj');
  });

  it('array with many elements and rest', () => {
    const r = compile(`(program (const (([a b c d e ...rest] arr))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('const [a, b, c, d, e, ...rest] = arr');
  });

  it('let with rest element', () => {
    const r = compile(`(program (let (({x ...rest} obj))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('let {x, ...rest} = obj');
  });

  it('var with rest element', () => {
    const r = compile(`(program (var (([a ...rest] arr))))`);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain('var [a, ...rest] = arr');
  });
});
