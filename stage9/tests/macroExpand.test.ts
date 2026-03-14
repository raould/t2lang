import { describe, it, expect } from 'vitest';
import { makeMacroEnv, collectMacros } from '../Stage9-macro-env';
import { expandAll, expandExpr, evalMacroExpr, evalQuasi } from '../Stage9-macro-expand';

// ---- helpers ----

function makeIdent(name: string) {
  return { tag: 'identifier', name, scopes: new Set(), text: name };
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
function makeDefmacro(name: string, params: string[], ...body: any[]) {
  return { tag: 'defmacro', name, params, body, scopeId: 0, text: '' };
}
function makeExprStmt(expr: any) {
  return { tag: 'expr-stmt', expr, text: '' };
}
function makeReturn(expr: any) {
  return { tag: 'return', expr, text: '' };
}
function makeLetStar(bindings: { name: string; init: any }[], ...body: any[]) {
  return { tag: 'let*', bindings: bindings.map(b => ({ name: b.name, init: b.init, typeAnnotation: null })), body, text: '' };
}
function makeQuasi(expr: any) {
  return { tag: 'quasi', expr, text: '' };
}
function makeUnquote(expr: any) {
  return { tag: 'unquote', expr, text: '' };
}
function makeUnquoteSplicing(expr: any) {
  return { tag: 'unquote-splicing', expr, text: '' };
}
function makeArray(...elements: any[]) {
  return { tag: 'array', elements, text: '' };
}

// ---- evalMacroExpr ----

describe('evalMacroExpr', () => {
  it('returns the JS value for a literal node', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    expect(evalMacroExpr(makeLit(42), bindings, env)).toBe(42);
    expect(evalMacroExpr(makeLit('hello'), bindings, env)).toBe('hello');
    expect(evalMacroExpr(makeLit(true), bindings, env)).toBe(true);
  });

  it('looks up identifiers in bindings', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['x', makeLit(99)]]);
    expect(evalMacroExpr(makeIdent('x'), bindings, env)).toEqual(makeLit(99));
  });

  it('returns the identifier node when not in bindings', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const node = makeIdent('foo');
    expect(evalMacroExpr(node, bindings, env)).toBe(node);
  });

  it('evaluates operator call (+)', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const node = makeCall('+', makeLit(3), makeLit(4));
    expect(evalMacroExpr(node, bindings, env)).toBe(7);
  });

  it('evaluates operator call (===)', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    expect(evalMacroExpr(makeCall('===', makeLit(1), makeLit(1)), bindings, env)).toBe(true);
    expect(evalMacroExpr(makeCall('===', makeLit(1), makeLit(2)), bindings, env)).toBe(false);
  });

  it('evaluates (length arr) on JS array', () => {
    const env = makeMacroEnv();
    const bindings = new Map([['xs', [makeLit(1), makeLit(2), makeLit(3)]]]);
    const node = makeCall('length', makeIdent('xs'));
    expect(evalMacroExpr(node, bindings, env)).toBe(3);
  });

  it('evaluates (str ...) concatenation', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const node = makeCall('str', makeLit('hello'), makeLit('-'), makeLit('world'));
    expect(evalMacroExpr(node, bindings, env)).toBe('hello-world');
  });

  it('gensym built-in returns an identifier node', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const node = makeCall('gensym', makeLit('tmp'));
    const result = evalMacroExpr(node, bindings, env);
    expect(result.tag).toBe('identifier');
    expect(result.name).toBe('tmp_0');
  });

  it('evaluates array expression', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const node = makeArray(makeLit(1), makeLit(2));
    const result = evalMacroExpr(node, bindings, env);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([1, 2]);
  });
});

// ---- evalQuasi ----

describe('evalQuasi', () => {
  it('passes through a literal node unchanged', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const node = makeLit(42);
    expect(evalQuasi(node, bindings, env, 1)).toBe(node);
  });

  it('substitutes (unquote x) with the binding value at depth 1', () => {
    const env = makeMacroEnv();
    const ident = makeIdent('foo');
    const bindings = new Map([['foo', ident]]);
    const node = makeUnquote(makeIdent('foo'));
    expect(evalQuasi(node, bindings, env, 1)).toBe(ident);
  });

  it('handles nested (quasi (unquote x)) by incrementing depth', () => {
    const env = makeMacroEnv();
    const bindings = new Map();
    const inner = makeUnquote(makeIdent('x'));
    const outer = makeQuasi(inner);
    // depth starts at 1 → nested quasi bumps to 2 → unquote at depth 2 decrements to 1
    const result = evalQuasi(outer, bindings, env, 1);
    expect(result.tag).toBe('quasi');
    // inner unquote should be returned with depth decremented (becomes depth=1 unquote with depth 1 expr)
    // but since x is not in bindings, just check structure
    expect(result.expr.tag).toBe('unquote');
  });

  it('splices (unquote-splicing xs) in call args via quasiArgs', () => {
    const env = makeMacroEnv();
    const a = makeLit(1);
    const b = makeLit(2);
    const bindings = new Map([['xs', [a, b]]]);
    // Build a call node: (myFn ,@xs)
    const callNode = {
      tag: 'call',
      fn: makeIdent('myFn'),
      args: [makeUnquoteSplicing(makeIdent('xs'))],
      typeArgs: [],
      text: '',
    };
    const result = evalQuasi(callNode, bindings, env, 1);
    expect(result.tag).toBe('call');
    expect(result.args).toHaveLength(2);
    expect(result.args[0]).toBe(a);
    expect(result.args[1]).toBe(b);
  });
});

// ---- expandAll ----

describe('expandAll: basic macro expansion', () => {
  it('expands a zero-arg macro returning a literal', () => {
    // (defmacro const-42 () (return 42))
    const macroDef = makeDefmacro('const-42', [],
      makeExprStmt(makeLit(42))
    );
    const callSite = makeExprStmt(makeCall('const-42'));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    // The call site should be replaced by the literal 42
    const expandedStmt = ast.body[1] as any;
    expect(expandedStmt.tag).toBe('expr-stmt');
    expect(expandedStmt.expr).toBe(42);
  });

  it('expands a macro that returns its argument unchanged', () => {
    // (defmacro identity (x) (return x))
    const macroDef = makeDefmacro('identity', ['x'],
      makeReturn(makeIdent('x'))
    );
    const argNode = makeLit(99);
    const callSite = makeExprStmt(makeCall('identity', argNode));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expandedStmt = ast.body[1] as any;
    expect(expandedStmt.expr).toBe(argNode);
  });

  it('expands a macro using quasiquote', () => {
    // (defmacro my-not (x) (return (quasi (=== (unquote x) false))))
    const macroDef = makeDefmacro('my-not', ['x'],
      makeReturn(
        makeQuasi(makeCall('===', makeUnquote(makeIdent('x')), makeLit(false)))
      )
    );
    const arg = makeLit(true);
    const callSite = makeExprStmt(makeCall('my-not', arg));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    expect(expanded.expr.tag).toBe('call');
    expect(expanded.expr.fn.name).toBe('===');
    expect(expanded.expr.args[0]).toBe(arg);
    expect(expanded.expr.args[1].value).toBe(false);
  });

  it('reports an arity error when argument count is wrong', () => {
    // (defmacro takes-one (x) (return x)) — called with 2 args
    const macroDef = makeDefmacro('takes-one', ['x'],
      makeReturn(makeIdent('x'))
    );
    const callSite = makeExprStmt(makeCall('takes-one', makeLit(1), makeLit(2)));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { errors } = expandAll(program, env);

    expect(errors).toHaveLength(1);
    expect(errors[0].kind).toBe('arity');
    expect(errors[0].macroName).toBe('takes-one');
  });

  it('leaves non-macro calls untouched', () => {
    const program = makeProgram(
      makeExprStmt(makeCall('console.log', makeLit('hi')))
    );
    const env = makeMacroEnv();
    const { ast, errors } = expandAll(program, env);
    expect(errors).toHaveLength(0);
    expect(ast.body[0]).toEqual(program.body[0]);
  });

  it('keeps the defmacro node in the expanded AST', () => {
    const macroDef = makeDefmacro('noop', [], makeReturn(makeIdent('undefined')));
    const program = makeProgram(macroDef);
    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast } = expandAll(program, env);
    expect(ast.body[0]).toBe(macroDef);
  });
});

describe('expandAll: recursive expansion', () => {
  it('expands macro calls inside the result of expansion', () => {
    // (defmacro wrap (x) (return (quasi (identity (unquote x)))))
    // (defmacro identity (x) (return x))
    // call: (wrap 42) → should expand to 42
    const macroIdentity = makeDefmacro('identity', ['x'], makeReturn(makeIdent('x')));
    const macroWrap = makeDefmacro('wrap', ['x'],
      makeReturn(makeQuasi(makeCall('identity', makeUnquote(makeIdent('x')))))
    );
    const callSite = makeExprStmt(makeCall('wrap', makeLit(42)));
    const program = makeProgram(macroIdentity, macroWrap, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    // wrap(42) → (identity 42) → literal node {tag:'literal', value:42}
    const expanded = ast.body[2] as any;
    expect(expanded.expr).toEqual(expect.objectContaining({ tag: 'literal', value: 42 }));
  });
});

describe('expandAll: gensym hygiene', () => {
  it('gensym inside a macro body produces a fresh identifier', () => {
    // (defmacro make-tmp () (let* ((tmp (gensym 'tmp'))) (return tmp)))
    const macroDef = makeDefmacro('make-tmp', [],
      makeLetStar(
        [{ name: 'tmp', init: makeCall('gensym', makeLit('tmp')) }],
        makeReturn(makeIdent('tmp'))
      )
    );
    const callA = makeExprStmt(makeCall('make-tmp'));
    const callB = makeExprStmt(makeCall('make-tmp'));
    const program = makeProgram(macroDef, callA, callB);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const nameA = (ast.body[1] as any).expr.name;
    const nameB = (ast.body[2] as any).expr.name;
    // Both should be identifier nodes with tmp_ prefix
    expect(nameA).toMatch(/^tmp_/);
    expect(nameB).toMatch(/^tmp_/);
    // They must be distinct
    expect(nameA).not.toBe(nameB);
  });
});
