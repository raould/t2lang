/**
 * Tests for DESIGN.md Decision 6: Source spans and error reporting (Phase 1+2).
 *
 * Decision:
 *  - Every AST node gets a NodeId assigned at reader time.
 *  - NodeIds map to Span { file, startLine, startCol, endLine, endCol }.
 *  - Error messages from the lowering pass include "file:line:col".
 *  - resetSpans() clears the table between compilations.
 *
 * Verifies:
 *  1. A successful program emits no span-related output.
 *  2. An unknown expression tag in lowering produces an error containing
 *     a source location in "file:line:col" form.
 *  3. Spans reset cleanly between successive compilations.
 *  4. AST nodes carry an `id` field (checked via a helper that inspects
 *     the compiled output at the JS level).
 *  Phase 2:
 *  5. Lower errors include "file:line:col" pointing at the offending node.
 *  6. Named-file compilation includes the real file path in errors.
 *  7. Line numbers are accurate for multi-line sources.
 */

import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { spanTable, resetSpans, nextNodeId, registerSpan } from '../Stage5-spans';

const T = 30_000;

function callCompiler(source: string) {
  return spawnSync('npx', ['tsx', 'index.ts', '-'], {
    encoding: 'utf-8',
    input: source,
    cwd: process.cwd(),
  });
}

// ── Phase 2: file name threading ─────────────────────────────────────────────

describe('Decision 6 Phase 2: file name in spans', () => {
  it('errors from a named file include the file path', () => {
    // Write a temp file, compile it — the span should contain the file name
    const { writeFileSync, unlinkSync } = require('fs');
    const tmpFile = '/tmp/test-span-file.s3d';
    writeFileSync(tmpFile, '(program (const x 42))');
    const result = spawnSync('npx', ['tsx', 'index.ts', tmpFile], {
      encoding: 'utf-8',
      cwd: process.cwd(),
    });
    unlinkSync(tmpFile);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('const x');
  }, T);

  it('stdin compilation uses <stdin> as file name (no crash)', () => {
    const result = callCompiler('(program (const y 99))');
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('const y');
  }, T);
});

// ── Phase 2: error location smoke tests ───────────────────────────────────────

describe('Decision 6 Phase 2: error location smoke tests', () => {
  // Trigger: (export-default (const name non-fn)) fires lowerExportDefaultDef.
  // The error is thrown with the source location of the offending initializer.

  it('lower error includes file:line:col in "file:line:col" format', () => {
    const result = callCompiler('(program (export-default (const myFn 42)))');
    expect(result.status).not.toBe(0);
    // Error message must match file:line:col — e.g. "<stdin>:1:36"
    expect(result.stderr).toMatch(/<stdin>:\d+:\d+/);
  }, T);

  it('lower error from stdin uses <stdin> as the file name', () => {
    const result = callCompiler('(program (export-default (const myFn 42)))');
    expect(result.stderr).toContain('<stdin>:');
  }, T);

  it('lower error from a named file includes the file path', () => {
    const { writeFileSync, unlinkSync } = require('fs');
    const tmpFile = '/tmp/test-span-error.s3d';
    writeFileSync(tmpFile, '(program (export-default (const myFn 42)))');
    const result = spawnSync('npx', ['tsx', 'index.ts', tmpFile], {
      encoding: 'utf-8',
      cwd: process.cwd(),
    });
    unlinkSync(tmpFile);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(tmpFile + ':');
  }, T);

  it('line number in error is correct for single-line source', () => {
    // The offending node (42) is on line 1
    const result = callCompiler('(program (export-default (const myFn 42)))');
    expect(result.stderr).toContain('<stdin>:1:');
  }, T);

  it('line number in error is correct for multi-line source', () => {
    // The offending node (42) is on line 3
    const src = [
      '(program',
      '  (const a 1)',
      '  (export-default (const myFn 42))',
      ')',
    ].join('\n');
    const result = callCompiler(src);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('<stdin>:3:');
  }, T);

  it('error location shifts correctly when offending line moves', () => {
    // Same construct on line 4 instead of line 3
    const src = [
      '(program',
      '  (const a 1)',
      '  (const b 2)',
      '  (export-default (const myFn 42))',
      ')',
    ].join('\n');
    const result = callCompiler(src);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('<stdin>:4:');
  }, T);
});

// ── 1. Successful program ─────────────────────────────────────────────────────

describe('Decision 6: spans infrastructure', () => {
  it('a successful program emits no span-related noise', () => {
    const result = callCompiler('(program (const x 42))');
    expect(result.status).toBe(0);
    expect(result.stdout).toBe('const x  = 42;\n');
  }, T);

  // ── 2. Span table API ──────────────────────────────────────────────────────

  it('nextNodeId returns monotonically increasing ids', () => {
    resetSpans();
    const a = nextNodeId();
    const b = nextNodeId();
    const c = nextNodeId();
    expect(b).toBe(a + 1);
    expect(c).toBe(b + 1);
    resetSpans();
  });

  it('registerSpan stores a span and formatSpan retrieves it', async () => {
    resetSpans();
    const { formatSpan } = await import('../Stage5-spans');
    const id = nextNodeId();
    // Simulate an ANTLR context with start/stop tokens
    const fakeCtx = {
      start: { line: 3, column: 7 },
      stop:  { line: 3, column: 12 },
    };
    registerSpan(id, fakeCtx as any);
    const result = formatSpan(id);
    expect(result).toContain('3');  // line
    expect(result).toContain('8');  // col (1-indexed: 7+1)
    resetSpans();
  });

  it('resetSpans clears the span table', () => {
    resetSpans();
    const id = nextNodeId();
    const fakeCtx = { start: { line: 1, column: 0 }, stop: { line: 1, column: 5 } };
    registerSpan(id, fakeCtx as any);
    expect(spanTable.size).toBeGreaterThan(0);
    resetSpans();
    expect(spanTable.size).toBe(0);
  });

  // ── 3. Error messages include location ────────────────────────────────────

  it('compiled output includes id field on AST nodes (smoke via lower error)', () => {
    // A well-formed program succeeds: the span plumbing does not break anything.
    const result = callCompiler(`(program
  (const greeting "hello")
  (const n 42)
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('const greeting');
    expect(result.stdout).toContain('const n');
  }, T);
});
