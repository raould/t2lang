import { describe, it, expect } from 'vitest';
import { compileSource as compile } from '../index';

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ source: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

describe('mixin form', () => {
  it('plain (mixin A M1 M2) emits Object.assign and interface merge', () => {
    const result = callCompiler(`(program
  (mixin A M1 M2)
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('type _MixinGuard<T extends MixinBase> = true');
    expect(result.stdout).toContain('declare const _mixinCheck_A: [_MixinGuard<M1>, _MixinGuard<M2>]');
    expect(result.stdout).toContain('M1.prototype instanceof MixinBase');
    expect(result.stdout).toContain('M2.prototype instanceof MixinBase');
    expect(result.stdout).toContain('Object.assign(A.prototype, M1.prototype);');
    expect(result.stdout).toContain('Object.assign(A.prototype, M2.prototype);');
    expect(result.stdout).toContain('interface A extends M1, M2 {}');
  });

  it('single mixin (mixin A M1) emits one check and one Object.assign', () => {
    const result = callCompiler(`(program
  (mixin A M1)
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('declare const _mixinCheck_A: [_MixinGuard<M1>]');
    expect(result.stdout).toContain('M1.prototype instanceof MixinBase');
    expect(result.stdout).not.toContain('M2');
    expect(result.stdout).toContain('Object.assign(A.prototype, M1.prototype);');
    expect(result.stdout).toContain('interface A extends M1 {}');
  });

  it(':only filter emits keyed loops and Pick<> interface', () => {
    const result = callCompiler(`(program
  (mixin A M1 M2 :only (foo bar))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('declare const _mixinCheck_A: [_MixinGuard<M1>, _MixinGuard<M2>]');
    expect(result.stdout).toContain('M1.prototype instanceof MixinBase');
    expect(result.stdout).toContain('M2.prototype instanceof MixinBase');
    expect(result.stdout).toContain('for (const (key) of ["foo", "bar"])');
    expect(result.stdout).toContain('if (key in M1.prototype)');
    expect(result.stdout).toContain('if (key in M2.prototype)');
    expect(result.stdout).toContain('interface A extends Pick<M1, "foo" | "bar">, Pick<M2, "foo" | "bar"> {}');
  });

  it(':except filter emits exclusion loops and Omit<> interface', () => {
    const result = callCompiler(`(program
  (mixin A M1 M2 :except (debug))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('declare const _mixinCheck_A: [_MixinGuard<M1>, _MixinGuard<M2>]');
    expect(result.stdout).toContain('Object.keys(M1.prototype)');
    expect(result.stdout).toContain('Object.keys(M2.prototype)');
    expect(result.stdout).toContain('"debug"');
    expect(result.stdout).toContain('interface A extends Omit<M1, "debug">, Omit<M2, "debug"> {}');
  });

  it('MixinBase subclass with non-declare field throws compiler error', () => {
    const result = callCompiler(`(program
  (class BadMixin (extends MixinBase)
    (class-body
      (field (x : number))))
)`);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("mixin class field 'x' must use 'declare'");
  });

  it('MixinBase subclass with declare field compiles cleanly', () => {
    const result = callCompiler(`(program
  (class GoodMixin (extends MixinBase)
    (class-body
      (field declare (x : number))
      (method getX () : number
        (return this.x))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('declare x: number;');
  });
});
