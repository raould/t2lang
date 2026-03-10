/**
 * Unit tests for Step 6 — Error reporting.
 *
 * Covers:
 *   - Arity errors accumulate in env.errors (not thrown)
 *   - macro-error accumulates in env.errors (not thrown)
 *   - Multiple errors across different call sites are all collected
 *   - expandedFrom is set on errors from nested macro expansions
 *   - formatExpansionErrors groups by macroName and formats correctly
 */

import { describe, it, expect } from 'vitest';
import { makeMacroEnv, collectMacros } from '../Stage8-macro-env';
import { expandAll, formatExpansionErrors } from '../Stage8-macro-expand';

// ---- helpers ----

function makeIdent(name: string) {
  return { tag: 'identifier', name, scopes: new Set(), text: name };
}
function makeLit(value: any) {
  return { tag: 'literal', value, text: String(value) };
}
function makeCall(fnName: string, ...args: any[]) {
  return { tag: 'call', fn: makeIdent(fnName), args, typeArgs: [], text: `(${fnName})` };
}
function makeProgram(...body: any[]) {
  return { tag: 'program', text: '', body };
}
function makeDefmacro(name: string, params: string[], scopeId: number, ...body: any[]) {
  return { tag: 'defmacro', name, params, body, scopeId, text: '' };
}
function makeExprStmt(expr: any) {
  return { tag: 'expr-stmt', expr, text: '' };
}
function makeReturn(expr: any) {
  return { tag: 'return', expr, text: '' };
}
function makeLetStar(bindings: { name: string; init: any }[], ...body: any[]) {
  return {
    tag: 'let*',
    bindings: bindings.map(b => ({ name: b.name, init: b.init, typeAnnotation: null })),
    body,
    text: '',
  };
}
function makeQuasi(expr: any) {
  return { tag: 'quasi', expr, text: '' };
}
function makeUnquote(expr: any) {
  return { tag: 'unquote', expr, text: '' };
}

// ---- arity errors ----

describe('Step 6: arity error accumulation', () => {
  it('arity error is pushed to env.errors, not thrown', () => {
    const macroDef = makeDefmacro('takes-two', ['a', 'b'], 1,
      makeReturn(makeIdent('a'))
    );
    // called with only 1 arg — should error, not throw
    const callSite = makeExprStmt(makeCall('takes-two', makeLit(1)));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    // Must NOT throw
    expect(() => expandAll(program, env)).not.toThrow();
    // errors accumulate in env.errors
    expect(env.errors).toHaveLength(1);
    expect(env.errors[0].kind).toBe('arity');
    expect(env.errors[0].macroName).toBe('takes-two');
  });

  it('arity error includes macroName and callSite', () => {
    const macroDef = makeDefmacro('requires-one', ['x'], 2,
      makeReturn(makeIdent('x'))
    );
    const callSite = makeExprStmt(makeCall('requires-one', makeLit(1), makeLit(2)));
    callSite.expr.text = '(requires-one 1 2)';
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    expect(errors).toHaveLength(1);
    expect(errors[0].kind).toBe('arity');
    expect(errors[0].macroName).toBe('requires-one');
    expect(typeof errors[0].callSite).toBe('string');
    expect(errors[0].message).toMatch(/expects 1/);
    expect(errors[0].message).toMatch(/got 2/);
  });

  it('multiple arity errors across different call sites are all accumulated', () => {
    const macroDef = makeDefmacro('takes-one', ['x'], 3,
      makeReturn(makeIdent('x'))
    );
    const bad1 = makeExprStmt(makeCall('takes-one'));          // 0 args
    const bad2 = makeExprStmt(makeCall('takes-one', makeLit(1), makeLit(2)));  // 2 args
    const program = makeProgram(macroDef, bad1, bad2);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    expect(errors).toHaveLength(2);
    expect(errors[0].kind).toBe('arity');
    expect(errors[1].kind).toBe('arity');
  });

  it('arity error does not halt expansion — subsequent nodes still expand', () => {
    const goodMacro = makeDefmacro('const-99', [], 4,
      makeReturn(makeLit(99))
    );
    const badMacro = makeDefmacro('requires-arg', ['x'], 5,
      makeReturn(makeIdent('x'))
    );
    const good = makeExprStmt(makeCall('const-99'));            // correct
    const bad  = makeExprStmt(makeCall('requires-arg'));        // arity error — 0 args
    const good2 = makeExprStmt(makeCall('const-99'));           // correct again
    const program = makeProgram(goodMacro, badMacro, good, bad, good2);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    // One arity error
    expect(errors).toHaveLength(1);
    expect(errors[0].kind).toBe('arity');
    // The two good expansions still ran — their call sites are literals now
    expect((ast.body[2] as any).expr).toBe(99);
    expect((ast.body[4] as any).expr).toBe(99);
  });
});

// ---- macro-error accumulation ----

describe('Step 6: macro-error accumulation', () => {
  it('macro-error does not throw — it accumulates an "other" error', () => {
    // (defmacro always-err () (macro-error "deliberate"))
    const macroDef = makeDefmacro('always-err', [], 10,
      makeExprStmt(makeCall('macro-error', makeLit('deliberate')))
    );
    const callSite = makeExprStmt(makeCall('always-err'));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    expect(() => expandAll(program, env)).not.toThrow();
    const { errors } = expandAll(program, env);
    // env.errors accumulates across two expandAll calls, so check at least 1
    expect(env.errors.length).toBeGreaterThanOrEqual(1);
    const err = env.errors[0];
    expect(err.kind).toBe('other');
    expect(err.message).toBe('deliberate');
    expect(err.macroName).toBe('always-err');
  });

  it('macro-error message is included in the error', () => {
    const macroDef = makeDefmacro('bad', [], 11,
      makeExprStmt(makeCall('macro-error', makeLit('something went wrong')))
    );
    const callSite = makeExprStmt(makeCall('bad'));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].message).toBe('something went wrong');
  });

  it('macro-error sets callSite from the expansion context', () => {
    const macroDef = makeDefmacro('err-macro', [], 12,
      makeExprStmt(makeCall('macro-error', makeLit('msg')))
    );
    const callNode = makeCall('err-macro');
    callNode.text = '(err-macro)';
    const callSite = makeExprStmt(callNode);
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].callSite).toBe('(err-macro)');
  });
});

// ---- expandedFrom for nested expansions ----

describe('Step 6: expandedFrom on nested expansion errors', () => {
  it('arity error from inner macro call has expandedFrom set to outer call site', () => {
    // outer wraps inner: (defmacro outer () `(inner 1 2))
    // (defmacro inner (x) ...)  — inner takes 1 arg
    const innerMacro = makeDefmacro('inner', ['x'], 20,
      makeReturn(makeIdent('x'))
    );
    // outer's template calls inner with 2 args (arity error)
    const outerTemplate = makeCall('inner', makeLit(1), makeLit(2));
    const outerMacro = makeDefmacro('outer', [], 21,
      makeReturn(makeQuasi(outerTemplate))
    );
    const outerCall = makeCall('outer');
    outerCall.text = '(outer)';
    const callSite = makeExprStmt(outerCall);
    const program = makeProgram(innerMacro, outerMacro, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    // inner's arity error should have expandedFrom = outer's call site
    expect(errors).toHaveLength(1);
    expect(errors[0].kind).toBe('arity');
    expect(errors[0].macroName).toBe('inner');
    expect(errors[0].expandedFrom).toBe('(outer)');
  });

  it('direct arity error (not nested) does NOT have expandedFrom set', () => {
    const macroDef = makeDefmacro('m', ['x'], 22,
      makeReturn(makeIdent('x'))
    );
    const callSite = makeExprStmt(makeCall('m', makeLit(1), makeLit(2)));  // arity
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    expect(errors).toHaveLength(1);
    expect(errors[0].expandedFrom).toBeUndefined();
  });
});

// ---- formatExpansionErrors ----

describe('Step 6: formatExpansionErrors', () => {
  it('returns empty string for zero errors', () => {
    expect(formatExpansionErrors([])).toBe('');
  });

  it('formats a single arity error', () => {
    const errors = [{
      kind: 'arity' as const,
      message: 'my-macro expects 2 args, got 1',
      macroName: 'my-macro',
      callSite: '(my-macro x)',
    }];
    const output = formatExpansionErrors(errors);
    expect(output).toContain("Error in macro 'my-macro':");
    expect(output).toContain('[arity]');
    expect(output).toContain('my-macro expects 2 args, got 1');
    expect(output).toContain('(my-macro x)');
  });

  it('groups multiple errors from the same macro together', () => {
    const errors = [
      { kind: 'arity' as const, message: 'msg1', macroName: 'foo', callSite: 'site1' },
      { kind: 'arity' as const, message: 'msg2', macroName: 'foo', callSite: 'site2' },
    ];
    const output = formatExpansionErrors(errors);
    // Only ONE "Error in macro 'foo':" header
    const headerCount = (output.match(/Error in macro 'foo'/g) || []).length;
    expect(headerCount).toBe(1);
    expect(output).toContain('msg1');
    expect(output).toContain('msg2');
  });

  it('formats errors from multiple macros with separate headers', () => {
    const errors = [
      { kind: 'arity' as const, message: 'err-a', macroName: 'alpha', callSite: 'siteA' },
      { kind: 'other' as const, message: 'err-b', macroName: 'beta', callSite: 'siteB' },
    ];
    const output = formatExpansionErrors(errors);
    expect(output).toContain("Error in macro 'alpha':");
    expect(output).toContain("Error in macro 'beta':");
    expect(output).toContain('err-a');
    expect(output).toContain('err-b');
  });

  it('includes expandedFrom when present', () => {
    const errors = [{
      kind: 'arity' as const,
      message: 'inner expects 1 args, got 2',
      macroName: 'inner',
      callSite: '(inner)',
      expandedFrom: '(outer)',
    }];
    const output = formatExpansionErrors(errors);
    expect(output).toContain('expanded from');
    expect(output).toContain('(outer)');
  });

  it('does not include expandedFrom line when expandedFrom is absent', () => {
    const errors = [{
      kind: 'arity' as const,
      message: 'foo expects 1 args, got 0',
      macroName: 'foo',
      callSite: '(foo)',
    }];
    const output = formatExpansionErrors(errors);
    expect(output).not.toContain('expanded from');
  });

  it('roundtrips correctly with real expandAll errors', () => {
    const macroDef = makeDefmacro('needs-one', ['x'], 30,
      makeReturn(makeIdent('x'))
    );
    const callSite = makeExprStmt(makeCall('needs-one'));   // 0 args
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    const output = formatExpansionErrors(errors);
    expect(output).toContain("Error in macro 'needs-one':");
    expect(output).toContain('[arity]');
  });
});
