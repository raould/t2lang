import { describe, it, expect } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import { compileSource as compile } from '#stage10';

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ source: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

const T = 30_000;

describe('computed object keys ([expr]: value)', () => {
  it('emits [expr]: value for computed key', () => {
    const result = callCompiler(`(program
  (const ((key "foo")))
  (const ((obj (object ([key] 42)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('[key]: 42');
  }, T);

  it('computed key works at runtime', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (const ((key "foo")))
  (const ((obj (object ([key] 42)))))
  (asrt ((. JSON stringify) obj) '{"foo":42}')
)`, T);
  }, T);

  it('multiple computed and static keys together', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (const ((k "b")))
  (const ((obj (object (a 1) ([k] 2) (c 3)))))
  (asrt (. obj a) 1)
  (asrt (. obj b) 2)
  (asrt (. obj c) 3)
)`, T);
  }, T);

  it('computed key with expression (not just identifier)', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (const ((prefix "my_")))
  (const ((obj (object ([(+ prefix "key")] 99)))))
  (asrt (. obj my_key) 99)
)`, T);
  }, T);
});
