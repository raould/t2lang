/**
 * Unit tests for evalQuasi handling of statement-level AST nodes.
 *
 * Step 5 of the macro implementation plan extends evalQuasi to recurse into
 * let*, const*, assign, return, if, while, block, throw, and expr-stmt nodes
 * so that quasiquote templates can generate any form, not just expressions.
 */

import { describe, it, expect } from 'vitest';
import { makeMacroEnv } from '../Stage6-macro-env';
import { evalQuasi, extractBindingName } from '../Stage6-macro-expand';

// ---- helpers ----

function makeIdent(name: string) {
  return { tag: 'identifier', name, scopes: new Set(), text: name };
}
function makeLit(value: any) {
  return { tag: 'literal', value, text: String(value) };
}
function makeCall(fn: string, ...args: any[]) {
  return { tag: 'call', fn: makeIdent(fn), args, typeArgs: [], text: '' };
}
function makeUnquote(expr: any) {
  return { tag: 'unquote', expr, text: '' };
}
function makeUnquoteSplicing(expr: any) {
  return { tag: 'unquote-splicing', expr, text: '' };
}

// ---- extractBindingName ----

describe('extractBindingName', () => {
  it('returns a string unchanged', () => {
    expect(extractBindingName('foo')).toBe('foo');
  });

  it('extracts .name from an identifier node', () => {
    expect(extractBindingName(makeIdent('myVar'))).toBe('myVar');
  });

  it('coerces unknown values to string via fallback', () => {
    const result = extractBindingName(42 as any);
    expect(typeof result).toBe('string');
  });
});

// ---- evalQuasi: let* ----

describe('evalQuasi: let* node', () => {
  it('passes through a let* with string name at depth 1 (no unquotes)', () => {
    const env = makeMacroEnv();
    const bindings = new Map<string, any>();
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: 'x', init: makeLit(1), typeAnnotation: null }],
      body: [{ tag: 'return', expr: makeIdent('x'), text: '' }],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('let*');
    expect(result.bindings[0].name).toBe('x');
    expect(result.bindings[0].init.value).toBe(1);
  });

  it('substitutes unquote in binding init', () => {
    const env = makeMacroEnv();
    const argNode = makeLit(42);
    const bindings = new Map([['v', argNode]]);
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: 'x', init: makeUnquote(makeIdent('v')), typeAnnotation: null }],
      body: [],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.bindings[0].init).toBe(argNode);   // ,v → argNode
  });

  it('substitutes unquote in binding name (dynamic name → gensym\'d string)', () => {
    // Template: (let* ((,g ,v)) ...)  where g is a gensym'd identifier
    const env = makeMacroEnv();
    const gensymIdent = makeIdent('tmp_0');
    const valNode = makeLit(99);
    const bindings = new Map([['g', gensymIdent], ['v', valNode]]);
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: makeUnquote(makeIdent('g')), init: makeUnquote(makeIdent('v')), typeAnnotation: null }],
      body: [],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.bindings[0].name).toBe('tmp_0');    // identifier → string name
    expect(result.bindings[0].init).toBe(valNode);    // ,v substituted
  });

  it('substitutes unquotes in body statements', () => {
    const env = makeMacroEnv();
    const ident = makeIdent('foo');
    const bindings = new Map([['x', ident]]);
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: 'unused', init: makeLit(0), typeAnnotation: null }],
      body: [{ tag: 'return', expr: makeUnquote(makeIdent('x')), text: '' }],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.body[0].expr).toBe(ident);   // ,x in return substituted
  });

  it('handles unquote-splicing in body (splice multiple stmts)', () => {
    const env = makeMacroEnv();
    const s1 = { tag: 'return', expr: makeLit(1), text: '' };
    const s2 = { tag: 'return', expr: makeLit(2), text: '' };
    const bindings = new Map([['stmts', [s1, s2]]]);
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: 'x', init: makeLit(0), typeAnnotation: null }],
      body: [makeUnquoteSplicing(makeIdent('stmts'))],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.body).toHaveLength(2);
    expect(result.body[0]).toBe(s1);
    expect(result.body[1]).toBe(s2);
  });

  it('does NOT substitute unquotes at depth > 1 (nested quasi)', () => {
    // Inside a `\`\`...` — depth starts at 2; unquotes fire at depth 1 only
    const env = makeMacroEnv();
    const argNode = makeLit(42);
    const bindings = new Map([['v', argNode]]);
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: 'x', init: makeUnquote(makeIdent('v')), typeAnnotation: null }],
      body: [],
    };
    const result = evalQuasi(node, bindings, env, 2);
    // At depth 2 the unquote is decremented to 1 and left as a quasi-literal
    expect(result.bindings[0].init.tag).toBe('unquote');
  });
});

// ---- evalQuasi: assign ----

describe('evalQuasi: assign node', () => {
  it('substitutes unquote in assign value', () => {
    const env = makeMacroEnv();
    const valNode = makeLit(7);
    const bindings = new Map([['v', valNode]]);
    const node = { tag: 'assign', name: 'x', value: makeUnquote(makeIdent('v')), text: '' };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('assign');
    expect(result.name).toBe('x');        // string name unchanged
    expect(result.value).toBe(valNode);   // ,v substituted
  });

  it('substitutes unquote in assign name (dynamic target)', () => {
    // (set! ,a ,b) — both name and value are dynamic
    const env = makeMacroEnv();
    const targetIdent = makeIdent('myVar');
    const valueNode = makeLit(99);
    const bindings = new Map([['a', targetIdent], ['b', valueNode]]);
    const node = {
      tag: 'assign',
      name: makeUnquote(makeIdent('a')),    // ← non-string name
      value: makeUnquote(makeIdent('b')),
      text: '',
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.name).toBe('myVar');    // identifier → string name extracted
    expect(result.value).toBe(valueNode);
  });

  it('passes string name through unchanged', () => {
    const env = makeMacroEnv();
    const bindings = new Map<string, any>();
    const node = { tag: 'assign', name: 'counter', value: makeLit(0), text: '' };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.name).toBe('counter');
  });
});

// ---- evalQuasi: return ----

describe('evalQuasi: return node', () => {
  it('substitutes unquote in return expr', () => {
    const env = makeMacroEnv();
    const retVal = makeLit(42);
    const bindings = new Map([['x', retVal]]);
    const node = { tag: 'return', expr: makeUnquote(makeIdent('x')), text: '' };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('return');
    expect(result.expr).toBe(retVal);
  });

  it('handles return with no expr', () => {
    const env = makeMacroEnv();
    const bindings = new Map<string, any>();
    const node = { tag: 'return', expr: undefined, text: '' };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('return');
    expect(result.expr).toBeUndefined();
  });
});

// ---- evalQuasi: if ----

describe('evalQuasi: if node', () => {
  it('substitutes unquote in if test', () => {
    const env = makeMacroEnv();
    const cond = makeIdent('flag');
    const bindings = new Map([['c', cond]]);
    const node = {
      tag: 'if', text: '',
      test: makeUnquote(makeIdent('c')),
      ifthen: makeLit(1),
      ifelse: undefined,
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('if');
    expect(result.test).toBe(cond);
  });

  it('substitutes unquote in ifthen and ifelse', () => {
    const env = makeMacroEnv();
    const thenNode = makeLit('yes');
    const elseNode = makeLit('no');
    const bindings = new Map([['t', thenNode], ['e', elseNode]]);
    const node = {
      tag: 'if', text: '',
      test: makeLit(true),
      ifthen: makeUnquote(makeIdent('t')),
      ifelse: makeUnquote(makeIdent('e')),
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.ifthen).toBe(thenNode);
    expect(result.ifelse).toBe(elseNode);
  });

  it('handles missing ifelse', () => {
    const env = makeMacroEnv();
    const bindings = new Map<string, any>();
    const node = { tag: 'if', text: '', test: makeLit(true), ifthen: makeLit(1), ifelse: undefined };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.ifelse).toBeUndefined();
  });
});

// ---- evalQuasi: while ----

describe('evalQuasi: while node', () => {
  it('substitutes unquote in while test and body', () => {
    const env = makeMacroEnv();
    const cond = makeIdent('running');
    const stmt = { tag: 'return', expr: makeLit(0), text: '' };
    const bindings = new Map([['c', cond], ['s', stmt]]);
    const node = {
      tag: 'while', text: '',
      test: makeUnquote(makeIdent('c')),
      body: [makeUnquote(makeIdent('s'))],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.test).toBe(cond);
    expect(result.body[0]).toBe(stmt);
  });

  it('supports unquote-splicing in while body', () => {
    const env = makeMacroEnv();
    const s1 = { tag: 'expr-stmt', expr: makeLit(1), text: '' };
    const s2 = { tag: 'expr-stmt', expr: makeLit(2), text: '' };
    const bindings = new Map([['stmts', [s1, s2]]]);
    const node = {
      tag: 'while', text: '',
      test: makeLit(true),
      body: [makeUnquoteSplicing(makeIdent('stmts'))],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.body).toHaveLength(2);
    expect(result.body[0]).toBe(s1);
    expect(result.body[1]).toBe(s2);
  });
});

// ---- evalQuasi: block ----

describe('evalQuasi: block node', () => {
  it('substitutes unquote-splicing in block body', () => {
    const env = makeMacroEnv();
    const s1 = { tag: 'return', expr: makeLit(1), text: '' };
    const s2 = { tag: 'return', expr: makeLit(2), text: '' };
    const bindings = new Map([['ss', [s1, s2]]]);
    const node = {
      tag: 'block', text: '',
      body: [makeUnquoteSplicing(makeIdent('ss'))],
    };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('block');
    expect(result.body).toHaveLength(2);
  });
});

// ---- evalQuasi: throw ----

describe('evalQuasi: throw node', () => {
  it('substitutes unquote in throw expr', () => {
    const env = makeMacroEnv();
    const errNode = makeCall('new Error', makeLit('oops'));
    const bindings = new Map([['e', errNode]]);
    const node = { tag: 'throw', expr: makeUnquote(makeIdent('e')), text: '' };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('throw');
    expect(result.expr).toBe(errNode);
  });
});

// ---- evalQuasi: expr-stmt ----

describe('evalQuasi: expr-stmt node', () => {
  it('substitutes unquote in expr-stmt expr', () => {
    const env = makeMacroEnv();
    const callNode = makeCall('console.log', makeLit('hi'));
    const bindings = new Map([['e', callNode]]);
    const node = { tag: 'expr-stmt', expr: makeUnquote(makeIdent('e')), text: '' };
    const result = evalQuasi(node, bindings, env, 1);
    expect(result.tag).toBe('expr-stmt');
    expect(result.expr).toBe(callNode);
  });
});

// ---- evalQuasi: nested quasi inside statement forms ----

describe('evalQuasi: nested quasiquote inside statement forms', () => {
  it('nested quasi bumps depth — inner unquote does not fire at depth 1', () => {
    // `(let* ((x `(,y))) ...) at depth 1:
    //  outer quasi → depth 1
    //  inner quasi → depth 2 for the inner unquote
    const env = makeMacroEnv();
    const val = makeLit(42);
    const bindings = new Map([['y', val]]);
    const innerQuasi = { tag: 'quasi', expr: makeUnquote(makeIdent('y')), text: '' };
    const node = {
      tag: 'let*', text: '',
      bindings: [{ name: 'x', init: innerQuasi, typeAnnotation: null }],
      body: [],
    };
    const result = evalQuasi(node, bindings, env, 1);
    // The inner quasi is processed by evalQuasi at depth 1 → increments to 2
    // At depth 2 the inner unquote does NOT fire, it decrements to 1
    expect(result.bindings[0].init.tag).toBe('quasi');
    expect(result.bindings[0].init.expr.tag).toBe('unquote');  // still present
  });
});
