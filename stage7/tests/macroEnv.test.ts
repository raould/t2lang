import { describe, it, expect } from 'vitest';
import { makeMacroEnv, gensym, collectMacros } from '../Stage7-macro-env';

describe('makeMacroEnv', () => {
  it('creates empty macro and macroTimeFn maps', () => {
    const env = makeMacroEnv();
    expect(env.macros.size).toBe(0);
    expect(env.macroTimeFns.size).toBe(0);
  });

  it('initialises gensymCounter to 0', () => {
    const env = makeMacroEnv();
    expect(env.gensymCounter).toBe(0);
  });

  it('initialises currentMacroName to null', () => {
    const env = makeMacroEnv();
    expect(env.currentMacroName).toBe(null);
  });
});

describe('gensym', () => {
  it('uses "g" as the default prefix', () => {
    const env = makeMacroEnv();
    const id = gensym(env, undefined);
    expect(id.name).toBe('g_0');
  });

  it('uses the provided prefix', () => {
    const env = makeMacroEnv();
    const id = gensym(env, 'tmp');
    expect(id.name).toBe('tmp_0');
  });

  it('increments the counter on each call', () => {
    const env = makeMacroEnv();
    const a = gensym(env, 'x');
    const b = gensym(env, 'x');
    const c = gensym(env, 'x');
    expect(a.name).toBe('x_0');
    expect(b.name).toBe('x_1');
    expect(c.name).toBe('x_2');
    expect(env.gensymCounter).toBe(3);
  });

  it('produces an identifier node with tag "identifier"', () => {
    const env = makeMacroEnv();
    const id = gensym(env, 'g');
    expect(id.tag).toBe('identifier');
  });

  it('starts with an empty scopes set', () => {
    const env = makeMacroEnv();
    const id = gensym(env, 'g');
    expect(id.scopes).toBeInstanceOf(Set);
    expect(id.scopes.size).toBe(0);
  });

  it('records hygiene metadata', () => {
    const env = makeMacroEnv();
    env.currentMacroName = 'swap!';
    const id = gensym(env, 'tmp');
    expect(id.hygiene.kind).toBe('gensym');
    expect(id.hygiene.id).toBe(0);
    expect(id.hygiene.macro).toBe('swap!');
  });

  it('hygiene.macro reflects currentMacroName at call time', () => {
    const env = makeMacroEnv();
    env.currentMacroName = 'first-macro';
    const a = gensym(env, 'g');
    env.currentMacroName = 'second-macro';
    const b = gensym(env, 'g');
    expect(a.hygiene.macro).toBe('first-macro');
    expect(b.hygiene.macro).toBe('second-macro');
  });
});

describe('collectMacros', () => {
  it('registers macro-def nodes', () => {
    const program = {
      tag: 'program',
      body: [
        { tag: 'macro-def', name: 'my-macro', params: ['x', 'y'], body: [], scopeId: 7 }
      ]
    };
    const env = makeMacroEnv();
    collectMacros(program, env);
    expect(env.macros.has('my-macro')).toBe(true);
    const def = env.macros.get('my-macro');
    expect(def.name).toBe('my-macro');
    expect(def.params).toEqual(['x', 'y']);
    expect(def.scopeId).toBe(7);
    expect(def.body).toEqual([]);
  });

  it('registers macro-time-fn-def nodes', () => {
    const program = {
      tag: 'program',
      body: [
        {
          tag: 'macro-time-fn-def',
          name: 'assertArity',
          init: { tag: 'lambda', params: ['name', 'args', 'expected'], body: [] }
        }
      ]
    };
    const env = makeMacroEnv();
    collectMacros(program, env);
    expect(env.macroTimeFns.has('assertArity')).toBe(true);
    const def = env.macroTimeFns.get('assertArity');
    expect(def.name).toBe('assertArity');
    expect(def.params).toEqual(['name', 'args', 'expected']);
  });

  it('ignores non-macro top-level nodes', () => {
    const program = {
      tag: 'program',
      body: [
        { tag: 'let-stmt', name: 'x', init: { tag: 'literal', value: 42 } },
        { tag: 'type-alias', name: 'Foo', typeParams: [], type: { tag: 'type-id', name: 'number' } }
      ]
    };
    const env = makeMacroEnv();
    collectMacros(program, env);
    expect(env.macros.size).toBe(0);
    expect(env.macroTimeFns.size).toBe(0);
  });

  it('registers multiple macros from one program', () => {
    const program = {
      tag: 'program',
      body: [
        { tag: 'macro-def', name: 'mac-a', params: ['x'], body: [], scopeId: 0 },
        { tag: 'macro-def', name: 'mac-b', params: ['a', 'b'], body: [], scopeId: 1 }
      ]
    };
    const env = makeMacroEnv();
    collectMacros(program, env);
    expect(env.macros.size).toBe(2);
    expect(env.macros.has('mac-a')).toBe(true);
    expect(env.macros.has('mac-b')).toBe(true);
  });

  it('returns the same env object', () => {
    const program = { tag: 'program', body: [] };
    const env = makeMacroEnv();
    const result = collectMacros(program, env);
    expect(result).toBe(env);
  });
});
