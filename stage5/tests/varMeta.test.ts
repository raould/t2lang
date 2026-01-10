import { describe, it, expect } from 'vitest';
import { makeMacroEnv, collectMacros } from '../Stage5-macro-env';
import { evalMacroExpr } from '../Stage5-macro-expand';

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
function makeLetDecl(name: string, init: any, meta?: any) {
  return { tag: 'let-decl', name, init, meta, text: '' };
}
function makeConstDecl(name: string, init: any, meta?: any) {
  return { tag: 'const-decl', name, init, meta, text: '' };
}
function makeLambda(params: string[], ...body: any[]) {
  return { tag: 'lambda', params, rest: undefined, body, text: '' };
}
function makeProgram(...body: any[]) {
  return { tag: 'program', text: '', body };
}

// ---- varRegistry population ----

describe('collectMacros populates varRegistry', () => {
  it('registers a const-decl with no meta', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('myFn', makeLambda(['x']))
    );
    collectMacros(prog, env);
    expect(env.varRegistry.has('myFn')).toBe(true);
    expect(env.varRegistry.get('myFn')!.name).toBe('myFn');
    expect(env.varRegistry.get('myFn')!.meta).toBeUndefined();
  });

  it('registers a const-decl with ^:pure meta', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('myFn', makeLambda(['x']), { pure: true })
    );
    collectMacros(prog, env);
    const entry = env.varRegistry.get('myFn');
    expect(entry).toBeDefined();
    expect(entry!.meta).toEqual({ pure: true });
  });

  it('registers a const-decl with multiple meta flags', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('asyncPureFn', makeLambda(['x']), { pure: true, async: true })
    );
    collectMacros(prog, env);
    const entry = env.varRegistry.get('asyncPureFn');
    expect(entry).toBeDefined();
    expect(entry!.meta!.pure).toBe(true);
    expect(entry!.meta!.async).toBe(true);
  });

  it('registers a let-decl with meta', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeLetDecl('mutableFn', makeLambda(['x']), { effectful: true })
    );
    collectMacros(prog, env);
    expect(env.varRegistry.get('mutableFn')!.meta).toEqual({ effectful: true });
  });

  it('registers multiple declarations', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('fn1', makeLambda(['x']), { pure: true }),
      makeConstDecl('fn2', makeLambda(['y'])),
      makeConstDecl('fn3', makeLambda(['z']), { async: true })
    );
    collectMacros(prog, env);
    expect(env.varRegistry.size).toBe(3);
    expect(env.varRegistry.get('fn1')!.meta!.pure).toBe(true);
    expect(env.varRegistry.get('fn2')!.meta).toBeUndefined();
    expect(env.varRegistry.get('fn3')!.meta!.async).toBe(true);
  });
});

// ---- resolve built-in ----

describe('resolve built-in at macro-expansion time', () => {
  it('resolve returns the registry entry for a registered var', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('myFn', makeLambda(['x']), { pure: true })
    );
    collectMacros(prog, env);

    const bindings = new Map();
    // (resolve "myFn") — string literal
    const result = evalMacroExpr(makeCall('resolve', makeLit('myFn')), bindings, env);
    expect(result).toBeDefined();
    expect(result.name).toBe('myFn');
    expect(result.meta).toEqual({ pure: true });
  });

  it('resolve accepts an identifier node', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('fn2', makeLambda(['a']), { async: true })
    );
    collectMacros(prog, env);

    // bind a macro param 'f' to an identifier node for 'fn2'
    const bindings = new Map([['f', makeIdent('fn2')]]);
    const result = evalMacroExpr(makeCall('resolve', makeIdent('f')), bindings, env);
    expect(result).toBeDefined();
    expect(result.name).toBe('fn2');
    expect(result.meta!.async).toBe(true);
  });

  it('resolve returns undefined for unregistered var', () => {
    const env = makeMacroEnv();
    collectMacros(makeProgram(), env);
    const bindings = new Map();
    const result = evalMacroExpr(makeCall('resolve', makeLit('unknown')), bindings, env);
    expect(result).toBeUndefined();
  });

  it('resolve entry .meta is undefined when no annotations', () => {
    const env = makeMacroEnv();
    const prog = makeProgram(
      makeConstDecl('plainFn', makeLambda(['x']))
    );
    collectMacros(prog, env);
    const bindings = new Map();
    const result = evalMacroExpr(makeCall('resolve', makeLit('plainFn')), bindings, env);
    expect(result).toBeDefined();
    expect(result.meta).toBeUndefined();
  });
});
