import { describe, it, expect } from 'vitest';
import { makeMacroEnv, freshScope, collectMacros } from '../Stage8-macro-env';
import { addScopeToNode, expandAll } from '../Stage8-macro-expand';

// ---- helpers ----

function makeIdent(name: string, scopes: number[] = []) {
  return { tag: 'identifier', name, scopes: new Set(scopes), text: name, hygiene: undefined };
}
function makeLit(value: any) {
  return { tag: 'literal', value, text: String(value) };
}
function makeCall(fnName: string, ...args: any[]) {
  return { tag: 'call', fn: makeIdent(fnName), args, typeArgs: [], text: '' };
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
function makeQuasi(expr: any) {
  return { tag: 'quasi', expr, text: '' };
}
function makeUnquote(expr: any) {
  return { tag: 'unquote', expr, text: '' };
}

// ---- freshScope ----

describe('freshScope', () => {
  it('returns 0 on first call', () => {
    const env = makeMacroEnv();
    expect(freshScope(env)).toBe(0);
  });

  it('increments on each call', () => {
    const env = makeMacroEnv();
    expect(freshScope(env)).toBe(0);
    expect(freshScope(env)).toBe(1);
    expect(freshScope(env)).toBe(2);
  });

  it('scopeCounter is independent from gensymCounter', () => {
    const env = makeMacroEnv();
    freshScope(env);
    freshScope(env);
    expect(env.scopeCounter).toBe(2);
    expect(env.gensymCounter).toBe(0);
  });
});

// ---- addScopeToNode ----

describe('addScopeToNode', () => {
  it('adds scope to an identifier node', () => {
    const ident = makeIdent('x', [1, 2]);
    const result = addScopeToNode(ident, 5);
    expect(result.tag).toBe('identifier');
    expect(result.name).toBe('x');
    expect(result.scopes.has(1)).toBe(true);
    expect(result.scopes.has(2)).toBe(true);
    expect(result.scopes.has(5)).toBe(true);
    // original is not mutated
    expect(ident.scopes.has(5)).toBe(false);
  });

  it('returns a new identifier node (not the same reference)', () => {
    const ident = makeIdent('x');
    const result = addScopeToNode(ident, 3);
    expect(result).not.toBe(ident);
  });

  it('passes through null', () => {
    expect(addScopeToNode(null, 0)).toBeNull();
  });

  it('passes through undefined', () => {
    expect(addScopeToNode(undefined, 0)).toBeUndefined();
  });

  it('passes through a literal node unchanged', () => {
    const lit = makeLit(42);
    expect(addScopeToNode(lit, 5)).toBe(lit);
  });

  it('passes through a primitive number', () => {
    expect(addScopeToNode(42 as any, 5)).toBe(42);
  });

  it('passes through a primitive string', () => {
    expect(addScopeToNode('hello' as any, 5)).toBe('hello');
  });

  it('recurses into call fn and args', () => {
    const lit = makeLit(1);
    const call = {
      tag: 'call',
      fn: makeIdent('foo'),
      args: [makeIdent('x'), lit],
      typeArgs: [],
      text: '',
    };
    const result = addScopeToNode(call, 7);
    expect(result.tag).toBe('call');
    expect(result.fn.scopes.has(7)).toBe(true);
    expect(result.args[0].scopes.has(7)).toBe(true);
    expect(result.args[1]).toBe(lit); // literal passes through (same reference)
  });

  it('recurses into array elements', () => {
    const arr = { tag: 'array', elements: [makeIdent('a'), makeIdent('b')], text: '' };
    const result = addScopeToNode(arr, 3);
    expect(result.tag).toBe('array');
    expect(result.elements[0].scopes.has(3)).toBe(true);
    expect(result.elements[1].scopes.has(3)).toBe(true);
  });

  it('handles a JS array (from unquote-splicing result)', () => {
    const nodes = [makeIdent('a'), makeIdent('b')];
    const result = addScopeToNode(nodes as any, 9);
    expect(Array.isArray(result)).toBe(true);
    expect((result as any[])[0].scopes.has(9)).toBe(true);
    expect((result as any[])[1].scopes.has(9)).toBe(true);
  });

  it('recurses into return expr', () => {
    const ret = { tag: 'return', expr: makeIdent('x'), text: '' };
    const result = addScopeToNode(ret, 4);
    expect(result.expr.scopes.has(4)).toBe(true);
  });

  it('handles return with no expr', () => {
    const ret = { tag: 'return', expr: undefined, text: '' };
    const result = addScopeToNode(ret, 4);
    expect(result.expr).toBeUndefined();
  });

  it('recurses into expr-stmt', () => {
    const stmt = { tag: 'expr-stmt', expr: makeIdent('x'), text: '' };
    const result = addScopeToNode(stmt, 2);
    expect(result.expr.scopes.has(2)).toBe(true);
  });
});

// ---- KFFD scope stamping in expandAll ----

describe('KFFD scope stamping', () => {
  it('template identifiers get the definition scope', () => {
    // (defmacro mk-foo () (return foo))
    // where `foo` is a free identifier in the template (scopeId=10)
    const freeIdent = makeIdent('foo');
    const macroDef = makeDefmacro('mk-foo', [], 10,
      makeReturn(freeIdent)
    );
    const callSite = makeExprStmt(makeCall('mk-foo'));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = (ast.body[1] as any).expr;
    // The free identifier `foo` in the template got the def scope (10) stamped
    expect(expanded.tag).toBe('identifier');
    expect(expanded.name).toBe('foo');
    expect(expanded.scopes.has(10)).toBe(true);
  });

  it('template identifiers also get the use-site scope', () => {
    // Each expansion gets a fresh use-site scope; template identifiers get both
    const freeIdent = makeIdent('bar');
    const macroDef = makeDefmacro('mk-bar', [], 5,
      makeReturn(freeIdent)
    );
    const callSite = makeExprStmt(makeCall('mk-bar'));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = (ast.body[1] as any).expr;
    // Scopes: {defScope=5, useSiteScope=0}
    expect(expanded.scopes.has(5)).toBe(true);   // definition scope
    expect(expanded.scopes.size).toBe(2);          // defScope + useScope
  });

  it('argument identifiers get their original scopes + the use-site scope', () => {
    // (defmacro identity (x) (return x))
    // Argument node has scope {99} already
    const macroDef = makeDefmacro('identity', [], 3,
      makeReturn(makeIdent('x'))
    );
    // Override params
    (macroDef as any).params = ['x'];
    const argIdent = makeIdent('myVar', [99]);
    const callSite = makeExprStmt(makeCall('identity', argIdent));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = (ast.body[1] as any).expr;
    // The arg identifier had {99}; after stamping with useScope it has {99, useScope}
    expect(expanded.tag).toBe('identifier');
    expect(expanded.name).toBe('myVar');
    expect(expanded.scopes.has(99)).toBe(true);    // original scope preserved
    expect(expanded.scopes.size).toBe(2);           // plus use-site scope
  });

  it('two expansions of the same macro get different use-site scopes', () => {
    // (defmacro mk-x () (return x))
    const freeIdent = makeIdent('x');
    const macroDef = makeDefmacro('mk-x', [], 7,
      makeReturn(freeIdent)
    );
    const call1 = makeExprStmt(makeCall('mk-x'));
    const call2 = makeExprStmt(makeCall('mk-x'));
    const program = makeProgram(macroDef, call1, call2);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const first = (ast.body[1] as any).expr;
    const second = (ast.body[2] as any).expr;

    // Both get the same defScope
    expect(first.scopes.has(7)).toBe(true);
    expect(second.scopes.has(7)).toBe(true);

    // But different use-site scopes — so total scope sets differ
    expect([...first.scopes]).not.toEqual([...second.scopes]);
  });

  it('no accidental capture: template x and arg x have different scope sets', () => {
    // (defmacro shadow-test (a)
    //   `(x ,a))   ; `x` is a free template identifier, `a` is a param
    // Call: (shadow-test x)  ; where call-site `x` might normally shadow
    const macroDef = makeDefmacro('shadow-test', [], 42,
      makeReturn(makeQuasi(makeCall('x', makeUnquote(makeIdent('a')))))
    );
    (macroDef as any).params = ['a'];
    const callArg = makeIdent('x');  // same NAME as template x!
    const callSite = makeExprStmt(makeCall('shadow-test', callArg));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    // The result is a call to `x` (from template) with arg `x` (from call site)
    const resultCall = (ast.body[1] as any).expr;
    expect(resultCall.tag).toBe('call');

    const templateX = resultCall.fn;       // the template's `x`
    const argX = resultCall.args[0];       // the call-site's `x`

    expect(templateX.name).toBe('x');
    expect(argX.name).toBe('x');

    // They have the same NAME but different scope sets — no collision
    const templateScopes = [...templateX.scopes].sort();
    const argScopes = [...argX.scopes].sort();
    expect(templateScopes).not.toEqual(argScopes);

    // Template x has definition scope (42); arg x does not
    expect(templateX.scopes.has(42)).toBe(true);
    expect(argX.scopes.has(42)).toBe(false);
  });

  it('gensym identifiers get the use-site scope after expansion', () => {
    // (defmacro make-g () (let* ((g (gensym))) (return g)))
    const macroDef = makeDefmacro('make-g', [], 0,
      {
        tag: 'let*',
        bindings: [{ name: 'g', init: makeCall('gensym'), typeAnnotation: null }],
        body: [makeReturn(makeIdent('g'))],
        text: '',
      }
    );
    const callSite = makeExprStmt(makeCall('make-g'));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const gsym = (ast.body[1] as any).expr;
    expect(gsym.tag).toBe('identifier');
    expect(gsym.name).toMatch(/^g_/);
    // The gensym result gets the use-site scope stamped on it
    expect(gsym.scopes.size).toBeGreaterThanOrEqual(1);
  });
});
