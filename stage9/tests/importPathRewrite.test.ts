import { test, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { compile as t2compile } from '../index';

function compileWith(args: string[], input?: string): { stdout: string; stderr: string; status: number } {
  let filePath = '-';
  let rootDir: string | undefined;
  let outDir: string | undefined;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--root-dir' && i + 1 < args.length) { rootDir = args[++i]; }
    else if (args[i] === '--out-dir' && i + 1 < args.length) { outDir = args[++i]; }
    else if (args[i] === '-') { filePath = '-'; }
    else { filePath = args[i]; }
  }
  try {
    return { stdout: t2compile({ filePath, input, rootDir, outDir }), stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

// ── Phase 0: extension-only rewriting (no flags, stdin) ──────────────────────

test('rewrites .t2 extension to .js in named import (no flags)', () => {
  const src = `(program
    (import {foo} "./utils.t2"))`;
  const { stdout, status } = compileWith(['-'], src);
  expect(status).toBe(0);
  expect(stdout).toContain(`from "./utils.js"`);
  expect(stdout).not.toContain('.t2');
});

test('rewrites .t2 extension to .js in default import (no flags)', () => {
  const src = `(program
    (import utils "./lib/utils.t2"))`;
  const { stdout, status } = compileWith(['-'], src);
  expect(status).toBe(0);
  expect(stdout).toContain(`from "./lib/utils.js"`);
});

test('rewrites .t2 in parent-dir relative path (no flags)', () => {
  const src = `(program
    (import {add} "../src/math.t2"))`;
  const { stdout, status } = compileWith(['-'], src);
  expect(status).toBe(0);
  expect(stdout).toContain(`from "../src/math.js"`);
});

test('does not rewrite bare specifiers (no flags)', () => {
  const src = `(program
    (import fs "node:fs"))`;
  const { stdout, status } = compileWith(['-'], src);
  expect(status).toBe(0);
  expect(stdout).toContain(`from "node:fs"`);
});

test('does not rewrite relative paths without .t2 extension (no flags)', () => {
  const src = `(program
    (import {x} "./already-compiled.js"))`;
  const { stdout, status } = compileWith(['-'], src);
  expect(status).toBe(0);
  expect(stdout).toContain(`from "./already-compiled.js"`);
});

test('does not rewrite extensionless relative paths (no flags)', () => {
  const src = `(program
    (import {x} "./Stage9-spans"))`;
  const { stdout, status } = compileWith(['-'], src);
  expect(status).toBe(0);
  expect(stdout).toContain(`from "./Stage9-spans"`);
});

// ── Phase 1+2: src/ → dist/ with --root-dir / --out-dir ──────────────────────

test('src/dist: rewrites sibling import correctly', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't2-import-test-'));
  try {
    const srcDir = path.join(tmp, 'src');
    const distDir = path.join(tmp, 'dist');
    fs.mkdirSync(srcDir);
    fs.mkdirSync(distDir);

    // app.t2 imports utils.t2 from same directory
    const appPath = path.join(srcDir, 'app.t2');
    fs.writeFileSync(appPath, `(program
  (import {helper} "./utils.t2"))`);

    const { stdout, status, stderr } = compileWith(
      ['--root-dir', srcDir, '--out-dir', distDir, appPath],
    );
    if (status !== 0) console.error(stderr);
    expect(status).toBe(0);
    // utils.t2 → dist/utils.js; app.t2 → dist/app.js
    // relative from dist/ to dist/utils.js = ./utils.js
    expect(stdout).toContain(`from "./utils.js"`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('src/dist: rewrites subdirectory import correctly', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't2-import-test-'));
  try {
    const srcDir = path.join(tmp, 'src');
    const distDir = path.join(tmp, 'dist');
    fs.mkdirSync(path.join(srcDir, 'util'), { recursive: true });
    fs.mkdirSync(distDir);

    // src/app.t2 imports src/util/helper.t2
    const appPath = path.join(srcDir, 'app.t2');
    fs.writeFileSync(appPath, `(program
  (import {x} "./util/helper.t2"))`);

    const { stdout, status, stderr } = compileWith(
      ['--root-dir', srcDir, '--out-dir', distDir, appPath],
    );
    if (status !== 0) console.error(stderr);
    expect(status).toBe(0);
    // src/util/helper.t2 → dist/util/helper.js
    // relative from dist/ to dist/util/helper.js = ./util/helper.js
    expect(stdout).toContain(`from "./util/helper.js"`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

// ── Phase 2: src/ + tests/ sharing a common root ─────────────────────────────

test('src+tests: tests/ file importing from src/ gets correct path', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't2-import-test-'));
  try {
    const rootDir = tmp;
    const distDir = path.join(tmp, 'dist');
    const srcDir = path.join(tmp, 'src');
    const testsDir = path.join(tmp, 'tests');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.mkdirSync(testsDir, { recursive: true });
    fs.mkdirSync(distDir);

    // tests/math.test.t2 imports src/math.t2
    const testPath = path.join(testsDir, 'math.test.t2');
    fs.writeFileSync(testPath, `(program
  (import {add} "../src/math.t2"))`);

    const { stdout, status, stderr } = compileWith(
      ['--root-dir', rootDir, '--out-dir', distDir, testPath],
    );
    if (status !== 0) console.error(stderr);
    expect(status).toBe(0);
    // src/math.t2  → dist/src/math.js
    // tests/math.test.t2 → dist/tests/math.test.js
    // relative from dist/tests/ to dist/src/math.js = ../src/math.js
    expect(stdout).toContain(`from "../src/math.js"`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

// ── Phase 2: escape-rootDir error ────────────────────────────────────────────

test('errors when import escapes root-dir', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 't2-import-test-'));
  try {
    const srcDir = path.join(tmp, 'src');
    const distDir = path.join(tmp, 'dist');
    fs.mkdirSync(srcDir);
    fs.mkdirSync(distDir);

    const appPath = path.join(srcDir, 'app.t2');
    fs.writeFileSync(appPath, `(program
  (import {x} "../../outside.t2"))`);

    const { status, stderr } = compileWith(
      ['--root-dir', srcDir, '--out-dir', distDir, appPath],
    );
    expect(status).not.toBe(0);
    expect(stderr).toContain('escapes root-dir');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
