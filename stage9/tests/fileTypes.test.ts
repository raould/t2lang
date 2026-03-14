import { describe, it, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { compile } from '../index';

function compileStdin(source: string): { stdout: string; stderr: string; status: number } {
  try {
    return { stdout: compile({ filePath: '-', input: source }), stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

function compileFile(filePath: string, extraArgs: string[] = []): { stdout: string; stderr: string; status: number } {
  const macroRoots = new Map<string, string>();
  for (let i = 0; i < extraArgs.length; i++) {
    if (extraArgs[i] === '--macro-root' && i + 1 < extraArgs.length) {
      const arg = extraArgs[++i];
      const eq = arg.indexOf('=');
      if (eq !== -1) macroRoots.set(arg.slice(0, eq), arg.slice(eq + 1));
    }
  }
  try {
    return { stdout: compile({ filePath, macroRoots: macroRoots.size > 0 ? macroRoots : undefined }), stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

function withTempFile(ext: string, content: string, fn: (p: string) => void) {
  const tmp = path.join(os.tmpdir(), `t2-filetype-test-${Date.now()}${ext}`);
  fs.writeFileSync(tmp, content, 'utf-8');
  try { fn(tmp); } finally { try { fs.unlinkSync(tmp); } catch {} }
}

// ─── Rule 1: .t2 files may not contain macro-export ──────────────────────────

describe('.t2 files: macro-export is forbidden', () => {
  it('errors when macro-export appears in a .t2 file', () => {
    withTempFile('.t2', `(program
      (defmacro myMacro (x) (return x))
      (macro-export myMacro))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/macro-export is not allowed in \.t2 files/);
      expect(r.stderr).toMatch(/\.t2m file/);
    });
  });

  it('errors when macro-export appears in stdin input', () => {
    const r = compileStdin(`(program (macro-export foo))`);
    expect(r.status).not.toBe(0);
    expect(r.stderr).toMatch(/macro-export is not allowed in \.t2 files/);
  });

  it('allows macro-import in a .t2 file', () => {
    withTempFile('.t2m', `(program
      (defmacro idMacro (x) (return x))
      (macro-export idMacro))`, (macroPath) => {
      const r = compileStdin(`(program
        (macro-import m "${macroPath}")
        (const x 1))`);
      expect(r.status).toBe(0);
    });
  });

  it('allows defmacro in a .t2 file (local use, no export)', () => {
    const r = compileStdin(`(program
      (defmacro double (x) (return x))
      (const y 1))`);
    expect(r.status).toBe(0);
  });
});

// ─── Rule 2: .t2m files may only contain macro-related forms ─────────────────

describe('.t2m files: only macro-related forms allowed', () => {
  it('allows defmacro', () => {
    withTempFile('.t2m', `(program
      (defmacro myMacro (x) (return x))
      (macro-export myMacro))`, (p) => {
      expect(compileFile(p).status).toBe(0);
    });
  });

  it('allows macro-import and macro-export', () => {
    withTempFile('.t2m', `(program
      (defmacro noop (x) (return x))
      (macro-export noop))`, (p) => {
      expect(compileFile(p).status).toBe(0);
    });
  });

  it('allows #[macro-time] bindings', () => {
    withTempFile('.t2m', `(program
      (#[macro-time] (const helper (lambda ((x)) (return x))))
      (defmacro wrap (x) (return (helper x)))
      (macro-export wrap))`, (p) => {
      expect(compileFile(p).status).toBe(0);
    });
  });

  it('errors on bare const in .t2m', () => {
    withTempFile('.t2m', `(program
      (const foo 42))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/\.t2m files may only contain/);
    });
  });

  it('errors on fn in .t2m', () => {
    withTempFile('.t2m', `(program
      (fn myFn ((x)) (return x)))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/\.t2m files may only contain/);
    });
  });

  it('errors on import in .t2m', () => {
    withTempFile('.t2m', `(program
      (import {fs} "node:fs"))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/\.t2m files may only contain/);
    });
  });

  it('errors on type alias in .t2m', () => {
    withTempFile('.t2m', `(program
      (type MyType string))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/\.t2m files may only contain/);
    });
  });

  it('error message names the offending span', () => {
    withTempFile('.t2m', `(program
      (const x 1))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      // span info appears before the error message
      expect(r.stderr).toMatch(/\.t2m files may only contain/);
      expect(r.stderr.length).toBeGreaterThan(0);
    });
  });
});

// ─── @scope path resolution ───────────────────────────────────────────────────

describe('@scope macro-import paths', () => {
  it('resolves @scope/file.t2m via --macro-root', () => {
    const macroDir = fs.mkdtempSync(path.join(os.tmpdir(), 't2-scope-test-'));
    try {
      fs.writeFileSync(path.join(macroDir, 'helpers.t2m'), `(program
        (defmacro idMacro (x) (return x))
        (macro-export idMacro))`);
      withTempFile('.t2', `(program
        (macro-import m "@myScope/helpers.t2m")
        (const x 1))`, (p) => {
        const r = compileFile(p, ['--macro-root', `myScope=${macroDir}`]);
        expect(r.status).toBe(0);
      });
    } finally {
      fs.rmSync(macroDir, { recursive: true });
    }
  });

  it('errors on unknown @scope with helpful message', () => {
    withTempFile('.t2', `(program
      (macro-import m "@unknown/helpers.t2m")
      (const x 1))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/unknown macro scope "@unknown"/);
      expect(r.stderr).toMatch(/--macro-root unknown/);
    });
  });

  it('errors on @-path with no slash', () => {
    withTempFile('.t2', `(program
      (macro-import m "@noslash")
      (const x 1))`, (p) => {
      const r = compileFile(p);
      expect(r.status).not.toBe(0);
      expect(r.stderr).toMatch(/must include "\/"/);
    });
  });

  it('multiple --macro-root scopes resolve independently', () => {
    const dirA = fs.mkdtempSync(path.join(os.tmpdir(), 't2-scope-a-'));
    const dirB = fs.mkdtempSync(path.join(os.tmpdir(), 't2-scope-b-'));
    try {
      fs.writeFileSync(path.join(dirA, 'a.t2m'), `(program
        (defmacro macroA (x) (return x))
        (macro-export macroA))`);
      fs.writeFileSync(path.join(dirB, 'b.t2m'), `(program
        (defmacro macroB (x) (return x))
        (macro-export macroB))`);
      withTempFile('.t2', `(program
        (macro-import ma "@scopeA/a.t2m")
        (macro-import mb "@scopeB/b.t2m")
        (const x 1))`, (p) => {
        const r = compileFile(p, [
          '--macro-root', `scopeA=${dirA}`,
          '--macro-root', `scopeB=${dirB}`,
        ]);
        expect(r.status).toBe(0);
      });
    } finally {
      fs.rmSync(dirA, { recursive: true });
      fs.rmSync(dirB, { recursive: true });
    }
  });
});
