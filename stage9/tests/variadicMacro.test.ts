import { describe, it, expect } from 'vitest';
import { makeMacroEnv, collectMacros } from '../Stage9-macro-env';
import { expandAll, evalMacroExpr } from '../Stage9-macro-expand';

// ---- helpers ----

function makeIdent(name: string) {
  return { tag: 'identifier', name, scopes: new Set(), text: name };
}
function makeLit(value: any) {
  return { tag: 'literal', value, text: String(value) };
}
function makeCall(name: string, ...args: any[]) {
  return { tag: 'call', fn: makeIdent(name), args, typeArgs: [], text: '' };
}
function makeArray(...elements: any[]) {
  return { tag: 'array', elements, text: '' };
}
function makeProgram(...body: any[]) {
  return { tag: 'program', text: '', body };
}
function makeExprStmt(expr: any) {
  return { tag: 'expr-stmt', expr, text: '' };
}
function makeReturn(expr: any) {
  return { tag: 'return', expr, text: '' };
}
function makeLet(bindings: { name: string; init: any }[], ...body: any[]) {
  return {
    tag: 'let',
    bindings: bindings.map(b => ({ name: b.name, init: b.init, typeAnnotation: null })),
    body,
    text: '',
  };
}
// A defmacro node with optional rest param
function makeDefmacro(name: string, params: string[], rest: string | undefined, ...body: any[]) {
  return { tag: 'defmacro', name, params, rest, body, scopeId: 0, text: '' };
}

// ---- rest params in defmacro ----

describe('variadic macros (rest params)', () => {
  it('macro with rest param collects extra args as an array', () => {
    // (defmacro first-and-rest ((head) (rest tail)) (return head))
    const macroDef = makeDefmacro('first-and-rest', ['head'], 'tail',
      makeReturn(makeIdent('head'))
    );
    // call: (first-and-rest 1 2 3)
    const callSite = makeExprStmt(makeCall('first-and-rest', makeLit(1), makeLit(2), makeLit(3)));
    const prog = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(prog, env);
    const { ast } = expandAll(prog, env);

    // body[0] = defmacro (returned as-is), body[1] = expanded callSite
    const expanded = ast.body[1];
    expect(expanded.tag).toBe('expr-stmt');
    expect(expanded.expr.tag).toBe('literal');
    expect(expanded.expr.value).toBe(1);
  });

  it('macro with only rest param accepts any number of args', () => {
    // (defmacro count-args ((rest args)) (return (length args)))
    const macroDef = makeDefmacro('count-args', [], 'args',
      makeReturn(makeCall('length', makeIdent('args')))
    );
    const callSite0 = makeExprStmt(makeCall('count-args'));
    const callSite3 = makeExprStmt(makeCall('count-args', makeLit(1), makeLit(2), makeLit(3)));
    const prog = makeProgram(macroDef, callSite0, callSite3);

    const env = makeMacroEnv();
    collectMacros(prog, env);
    const { ast } = expandAll(prog, env);

    // body[0] = defmacro, body[1] = callSite0 expanded, body[2] = callSite3 expanded
    // (length args) returns a JS number (not an AST node), so check .expr directly
    expect(ast.body[1].expr).toBe(0);
    expect(ast.body[2].expr).toBe(3);
  });

  it('macro with rest param receives correct tail args', () => {
    // (defmacro second-arg ((head) (rest tail)) (return (nth tail 0)))
    const macroDef = makeDefmacro('second-arg', ['head'], 'tail',
      makeReturn(makeCall('nth', makeIdent('tail'), makeLit(0)))
    );
    const callSite = makeExprStmt(makeCall('second-arg', makeLit('a'), makeLit('b'), makeLit('c')));
    const prog = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(prog, env);
    const { ast } = expandAll(prog, env);

    // body[0] = defmacro, body[1] = expanded callSite
    expect(ast.body[1].expr.tag).toBe('literal');
    expect(ast.body[1].expr.value).toBe('b');
  });
});

// ---- nth built-in ----

describe('nth built-in', () => {
  it('nth on a JS array returns the element at index i', () => {
    const env = makeMacroEnv();
    const bindings = new Map([
      ['arr', [makeLit(10), makeLit(20), makeLit(30)]]
    ]);
    const result = evalMacroExpr(makeCall('nth', makeIdent('arr'), makeLit(1)), bindings, env);
    expect(result.value).toBe(20);
  });

  it('nth on an array-expr node returns elements[i]', () => {
    const env = makeMacroEnv();
    const arrNode = makeArray(makeLit('x'), makeLit('y'), makeLit('z'));
    const bindings = new Map([['arr', arrNode]]);
    const result = evalMacroExpr(makeCall('nth', makeIdent('arr'), makeLit(2)), bindings, env);
    expect(result.value).toBe('z');
  });

  it('nth on a call node returns args[i]', () => {
    const env = makeMacroEnv();
    const callNode = makeCall('foo', makeLit(1), makeLit(2), makeLit(3));
    const bindings = new Map([['c', callNode]]);
    const result = evalMacroExpr(makeCall('nth', makeIdent('c'), makeLit(0)), bindings, env);
    expect(result.value).toBe(1);
  });

  it('nth returns undefined for out-of-bounds index', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['arr', [makeLit(1)]]]);
    const result = evalMacroExpr(makeCall('nth', makeIdent('arr'), makeLit(5)), bindings, env);
    expect(result).toBeUndefined();
  });
});

// ---- node-tag built-in ----

describe('node-tag built-in', () => {
  it('returns the tag of a literal node', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['n', makeLit(42)]]);
    const result = evalMacroExpr(makeCall('node-tag', makeIdent('n')), bindings, env);
    expect(result).toBe('literal');
  });

  it('returns the tag of an identifier node', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['n', makeIdent('foo')]]);
    const result = evalMacroExpr(makeCall('node-tag', makeIdent('n')), bindings, env);
    expect(result).toBe('identifier');
  });

  it('returns the tag of a call node', () => {
    const env = makeMacroEnv();
    const callNode = makeCall('myFn', makeLit(1));
    const bindings = new Map([['n', callNode]]);
    const result = evalMacroExpr(makeCall('node-tag', makeIdent('n')), bindings, env);
    expect(result).toBe('call');
  });

  it('returns the tag of an array node', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['n', makeArray(makeLit(1), makeLit(2))]]);
    const result = evalMacroExpr(makeCall('node-tag', makeIdent('n')), bindings, env);
    expect(result).toBe('array');
  });

  it('returns undefined when node is undefined', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['n', undefined]]);
    const result = evalMacroExpr(makeCall('node-tag', makeIdent('n')), bindings, env);
    expect(result).toBeUndefined();
  });
});
