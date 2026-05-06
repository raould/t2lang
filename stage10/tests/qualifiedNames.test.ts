// Dotted names in type positions and after `new` — the reader transforms
// `Phaser.GameObjects.Sprite` to `(. (. Phaser GameObjects) Sprite)`, and
// the `qualifiedName` grammar rule + flattenQualifiedName AST helper put
// it back together as a single dotted-string `name` for codegen.

import { it, expect, describe } from 'vitest';
import { compileSource as compile } from '#stage10';

const callCompiler = (src: string): { stdout: string; stderr: string; status: number } => {
  try {
    return { stdout: compile({ source: src }), stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
};

const emit = (t2src: string): string => {
  const r = callCompiler(`(program ${t2src})`);
  if (r.status !== 0) throw new Error(`Compilation failed: ${r.stderr}`);
  return r.stdout;
};

describe('Dotted type names', () => {
  it('two-segment type as parameter type', () => {
    expect(emit(`
      (const ((f (lambda ((x : Phaser.Scene)) x))))
    `)).toContain('x: Phaser.Scene');
  });

  it('three-segment type as field type', () => {
    expect(emit(`
      (class C (class-body (field (gem : Phaser.GameObjects.Sprite))))
    `)).toContain('gem: Phaser.GameObjects.Sprite');
  });

  it('extends with dotted type', () => {
    expect(emit(`
      (class S (extends Phaser.Scene) (class-body (constructor () (super "S"))))
    `)).toContain('extends Phaser.Scene');
  });

  it('extends with three-segment dotted type', () => {
    expect(emit(`
      (class P (extends Phaser.GameObjects.Sprite) (class-body))
    `)).toContain('extends Phaser.GameObjects.Sprite');
  });
});

describe('Dotted constructors via `new`', () => {
  it('two-segment new', () => {
    expect(emit(`(const ((g (new Phaser.Game))))`))
      .toContain('new Phaser.Game()');
  });

  it('two-segment new with arg', () => {
    expect(emit(`(const ((g (new Phaser.Game cfg))))`))
      .toContain('new Phaser.Game(cfg)');
  });

  it('three-segment new', () => {
    expect(emit(`(const ((s (new Phaser.GameObjects.Sprite scene))))`))
      .toContain('new Phaser.GameObjects.Sprite(scene)');
  });
});

describe('Single-segment names still work', () => {
  it('non-dotted type', () => {
    expect(emit(`(const ((f (lambda ((x : Foo)) x))))`)).toContain('x: Foo');
  });

  it('non-dotted new', () => {
    expect(emit(`(const ((g (new Foo))))`)).toContain('new Foo()');
  });
});
