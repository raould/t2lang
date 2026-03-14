/**
 * Tests for DESIGN.md Decision 6 Phase 3 Group D:
 * Macro expansion errors carry nodeId for source location reporting.
 *
 * Verifies:
 *  1. Arity errors pushed by expandMacroCall carry nodeId = callNode.id.
 *  2. macro-error errors carry nodeId = env.currentCallNodeId.
 *  3. formatExpansionErrors uses formatSpan(err.nodeId) when nodeId is present.
 *  4. CLI: arity mismatch error message contains file~line~col.
 *  5. CLI: macro-error message contains file~line~col.
 *  6. CLI: line number is accurate for multi-line source.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { compile } from '../index';
import { makeMacroEnv, collectMacros } from '../Stage9-macro-env';
import { expandAll, formatExpansionErrors } from '../Stage9-macro-expand';
import { spanTable, resetSpans, nextNodeId, registerSpan } from '../Stage9-spans';

const T = 30_000;

// ── helpers ───────────────────────────────────────────────────────────────────

function makeIdent(name: string, id = 0) {
  return { tag: 'identifier', name, scopes: new Set(), text: name, id };
}
function makeLit(value: any, id = 0) {
  return { tag: 'literal', value, text: String(value), id };
}
function makeCall(fn: any, args: any[], id = 0): any {
  return { tag: 'call', fn, args, typeArgs: [], text: '', id };
}
function makeExprStmt(expr: any) {
  return { tag: 'expr-stmt', expr, text: '', id: 0 };
}
function makeDefmacro(name: string, params: string[], ...body: any[]) {
  return { tag: 'defmacro', name, params, body, scopeId: 0, text: '', id: 0 };
}
function makeProgram(...body: any[]) {
  return { tag: 'program', text: '', body, id: 0 };
}

function callCompiler(source: string): { stdout: string; stderr: string; status: number } {
  try {
    const stdout = compile({ filePath: '-', input: source });
    return { stdout, stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

// ── Unit tests: nodeId on errors ──────────────────────────────────────────────

describe('Decision 6 Phase 3D: nodeId on expansion errors', () => {
  beforeEach(() => resetSpans());

  it('arity error carries callNode.id', () => {
    // Register a fake span for the call node
    const callId = nextNodeId();
    registerSpan(callId, { start: { line: 5, column: 2 }, stop: { line: 5, column: 20 } } as any);

    // Build: (defmacro m (x) x)  then call (m 1 2) with wrong arity
    const defm = makeDefmacro('m', ['x'], { tag: 'expr-stmt', expr: makeIdent('x'), text: '', id: 0 });
    const callNode = makeCall(makeIdent('m'), [makeLit(1), makeLit(2)], callId);
    const prog = makeProgram(defm, makeExprStmt(callNode));

    const env = makeMacroEnv();
    collectMacros(prog, env);
    expandAll(prog, env);

    expect(env.errors).toHaveLength(1);
    expect(env.errors[0].kind).toBe('arity');
    expect(env.errors[0].nodeId).toBe(callId);
  });

  it('macro-error carries env.currentCallNodeId', () => {
    // Register a fake span for the call node
    const callId = nextNodeId();
    registerSpan(callId, { start: { line: 7, column: 4 }, stop: { line: 7, column: 25 } } as any);

    // Build: (defmacro boom (x) (macro-error "oops"))  then (boom 1)
    const macroErrorCall = makeCall(makeIdent('macro-error'), [makeLit('oops')]);
    const defm = makeDefmacro('boom', ['x'], makeExprStmt(macroErrorCall));
    const callNode = makeCall(makeIdent('boom'), [makeLit(1)], callId);
    const prog = makeProgram(defm, makeExprStmt(callNode));

    const env = makeMacroEnv();
    collectMacros(prog, env);
    expandAll(prog, env);

    expect(env.errors).toHaveLength(1);
    expect(env.errors[0].kind).toBe('other');
    expect(env.errors[0].nodeId).toBe(callId);
  });

  it('formatExpansionErrors uses formatSpan when nodeId is present', () => {
    const callId = nextNodeId();
    registerSpan(callId, { start: { line: 3, column: 7 }, stop: { line: 3, column: 20 } } as any);

    const defm = makeDefmacro('m', ['x'], makeExprStmt(makeIdent('x')));
    const callNode = makeCall(makeIdent('m'), [makeLit(1), makeLit(2)], callId);
    const prog = makeProgram(defm, makeExprStmt(callNode));

    const env = makeMacroEnv();
    collectMacros(prog, env);
    expandAll(prog, env);

    const msg = formatExpansionErrors(env.errors);
    // Should contain the file~line~col from formatSpan, not raw callSite text
    expect(msg).toContain('<stdin>:3:8');  // col is 1-indexed: 7+1=8
  });

  it('formatExpansionErrors falls back to callSite text when nodeId is absent', () => {
    // Manually push an error without nodeId to test the fallback path
    const env = makeMacroEnv();
    env.errors.push({
      kind: 'other',
      message: 'manual error',
      macroName: 'test-macro',
      callSite: 'fake-call-text',
    } as any);

    const msg = formatExpansionErrors(env.errors);
    expect(msg).toContain('fake-call-text');
    expect(msg).not.toContain('<stdin>');
  });
});

// ── CLI smoke tests ───────────────────────────────────────────────────────────

describe('Decision 6 Phase 3D: CLI error location smoke tests', () => {
  it('arity mismatch error contains file~line~col', () => {
    // (defmacro incX (x) x) called with 2 args
    const result = callCompiler('(program (defmacro incX (x) x) (incX 1 2))');
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/<stdin>:\d+:\d+/);
  }, T);

  it('macro-error contains file~line~col', () => {
    const result = callCompiler(
      '(program (defmacro boom (x) (macro-error "oops")) (boom 1))'
    );
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/<stdin>:\d+:\d+/);
  }, T);

  it('arity mismatch on line 3 reports line 3', () => {
    const src = [
      '(program',
      '  (defmacro incX (x) x)',
      '  (incX 1 2)',
      ')',
    ].join('\n');
    const result = callCompiler(src);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('<stdin>:3:');
  }, T);

  it('macro-error on line 4 reports line 4', () => {
    const src = [
      '(program',
      '  (defmacro boom (x) (macro-error "bad"))',
      '  (const a 1)',
      '  (boom a)',
      ')',
    ].join('\n');
    const result = callCompiler(src);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('<stdin>:4:');
  }, T);
});
