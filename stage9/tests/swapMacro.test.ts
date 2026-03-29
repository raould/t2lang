/**
 * Acceptance tests for the swap! macro worked example (DESIGN.md §1, Step 4).
 *
 * The full swap! macro is:
 *
 *   (defmacro swap! (a b)
 *     (let ((tmp (gensym "tmp")))
 *       `(let ((,tmp ,a))
 *          (set! ,a ,b)
 *          (set! ,b ,tmp))))
 *
 *   (let ((tmp 1) (y 2))
 *     (swap! tmp y))
 *
 * Expected expansion:
 *
 *   (let ((tmp 1) (y 2))
 *     (let ((tmp_42 tmp))   ; gensym'd name — not 'tmp'
 *       (set! tmp y)
 *       (set! y tmp_42)))
 */

import { describe, it, expect } from 'vitest';
import { makeMacroEnv, collectMacros } from '../Stage9-macro-env';
import { expandAll } from '../Stage9-macro-expand';

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
function makeLet(bindings: { name: any; init: any }[], ...body: any[]) {
  return {
    tag: 'let',
    bindings: bindings.map(b => ({ name: b.name, init: b.init, typeAnnotation: null })),
    body,
    text: '',
  };
}
function makeReturn(expr: any) {
  return { tag: 'return', expr, text: '' };
}
function makeExprStmt(expr: any) {
  return { tag: 'expr-stmt', expr, text: '' };
}
function makeQuasi(expr: any) {
  return { tag: 'quasi', expr, text: '' };
}
function makeUnquote(expr: any) {
  return { tag: 'unquote', expr, text: '' };
}
// Construct a let node whose binding name may be a non-string (for quasiquote templates).
function makeLetTemplate(bindings: { name: any; init: any }[], ...body: any[]) {
  return {
    tag: 'let',
    bindings: bindings.map(b => ({ name: b.name, init: b.init, typeAnnotation: null })),
    body,
    text: '',
  };
}
function makeAssignTemplate(name: any, value: any) {
  return { tag: 'assign', name, value, text: '' };
}

// ---- Build the swap! macro AST ----
//
// (defmacro swap! (a b)
//   (let ((tmp (gensym "tmp")))
//     (return
//       `(let ((,tmp ,a))
//          (set! ,a ,b)
//          (set! ,b ,tmp)))))
//
// Template node for the quasiquote body — binding name and assign targets
// are unquote nodes (dynamic) so evalQuasi can substitute them.
function makeSwapMacroDef() {
  const template = makeLetTemplate(
    [{ name: makeUnquote(makeIdent('tmp')), init: makeUnquote(makeIdent('a')) }],
    makeAssignTemplate(makeUnquote(makeIdent('a')), makeUnquote(makeIdent('b'))),
    makeAssignTemplate(makeUnquote(makeIdent('b')), makeUnquote(makeIdent('tmp')))
  );
  return makeDefmacro('swap!', ['a', 'b'], /* scopeId= */ 1,
    makeLet(
      [{ name: 'tmp', init: makeCall('gensym', makeLit('tmp')) }],
      makeReturn(makeQuasi(template))
    )
  );
}

// ============================================================
// Building-block tests — currently PASSING
// ============================================================

describe('swap! building blocks', () => {
  it('gensym in macro body produces tmp_N, distinct from user variable named tmp', () => {
    // (defmacro swap-id (a b) (let ((g (gensym "tmp"))) (return g)))
    // Call: (swap-id tmp y)  → result is the gensym'd ident (tmp_0), not 'tmp'
    const macroDef = makeDefmacro('swap-id', ['a', 'b'], 1,
      makeLet(
        [{ name: 'g', init: makeCall('gensym', makeLit('tmp')) }],
        makeReturn(makeIdent('g'))
      )
    );
    const callSite = makeExprStmt(makeCall('swap-id', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const result = (ast.body[1] as any).expr as any;
    expect(result.tag).toBe('identifier');
    expect(result.name).toMatch(/^tmp_\d+$/);     // gensym prefix
    expect(result.name).not.toBe('tmp');           // NOT the user's variable name
  });

  it('two invocations of swap! each get a distinct gensym\'d name', () => {
    const macroDef = makeDefmacro('mk-g', ['a', 'b'], 2,
      makeLet(
        [{ name: 'g', init: makeCall('gensym', makeLit('tmp')) }],
        makeReturn(makeIdent('g'))
      )
    );
    const call1 = makeExprStmt(makeCall('mk-g', makeIdent('tmp'), makeIdent('y')));
    const call2 = makeExprStmt(makeCall('mk-g', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, call1, call2);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const name1 = (ast.body[1] as any).expr.name;
    const name2 = (ast.body[2] as any).expr.name;
    expect(name1).toMatch(/^tmp_/);
    expect(name2).toMatch(/^tmp_/);
    expect(name1).not.toBe(name2);
  });

  it('gensym\'d identifier carries the use-site scope after expansion', () => {
    const macroDef = makeDefmacro('mk-gsym', ['a', 'b'], 3,
      makeLet(
        [{ name: 'g', init: makeCall('gensym', makeLit('tmp')) }],
        makeReturn(makeIdent('g'))
      )
    );
    const callSite = makeExprStmt(makeCall('mk-gsym', makeIdent('x'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const gensymNode = (ast.body[1] as any).expr as any;
    expect(gensymNode.scopes.size).toBeGreaterThanOrEqual(1);
  });

  it('user arg named tmp carries its original scopes plus the use-site scope', () => {
    const macroDef = makeDefmacro('echo-a', ['a', 'b'], 4,
      makeReturn(makeIdent('a'))
    );
    const userTmp = makeIdent('tmp', []);
    const callSite = makeExprStmt(makeCall('echo-a', userTmp, makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const returned = (ast.body[1] as any).expr as any;
    expect(returned.tag).toBe('identifier');
    expect(returned.name).toBe('tmp');
    expect(returned.scopes.size).toBeGreaterThanOrEqual(1);
  });
});

// ============================================================
// Full swap! integration — evalQuasi now handles let/assign
// ============================================================

describe('swap! full integration', () => {
  it('full swap! expansion produces a let node', () => {
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    expect(expanded.tag).toBe('let');
  });

  it('full swap! expansion: let binding name is the gensym\'d identifier (tmp_N, not tmp)', () => {
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    const bindingName = expanded.bindings[0].name;
    expect(typeof bindingName).toBe('string');
    expect(bindingName).toMatch(/^tmp_\d+$/);   // gensym'd name
    expect(bindingName).not.toBe('tmp');         // NOT the user variable name
  });

  it('full swap! expansion: let binding init is the first arg (user\'s tmp)', () => {
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    const bindingInit = expanded.bindings[0].init;
    expect(bindingInit.tag).toBe('identifier');
    expect(bindingInit.name).toBe('tmp');   // user's 'tmp' arg
  });

  it('full swap! expansion: body has exactly two assign statements', () => {
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    expect(expanded.body).toHaveLength(2);
    expect(expanded.body[0].tag).toBe('assign');
    expect(expanded.body[1].tag).toBe('assign');
  });

  it('full swap! expansion: body[0] assigns second arg (y) to first arg target (tmp)', () => {
    // (set! ,a ,b) → assign tmp = y
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    const stmt0 = expanded.body[0];
    expect(stmt0.name).toBe('tmp');             // target is user's 'tmp'
    expect(stmt0.value.name).toBe('y');         // value is user's 'y'
  });

  it('full swap! expansion: body[1] assigns gensym\'d tmp to second arg target (y)', () => {
    // (set! ,b ,tmp) → assign y = tmp_N
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    const bindingName = expanded.bindings[0].name;  // the gensym'd name, e.g. 'tmp_0'
    const stmt1 = expanded.body[1];
    expect(stmt1.name).toBe('y');                      // target is 'y'
    expect(stmt1.value.name).toBe(bindingName);        // value is the gensym'd identifier
  });

  it('user tmp (name=\'tmp\') and gensym tmp_N have distinct names — no capture', () => {
    // The gensym'd binding name is tmp_N (never 'tmp'), so even when the user
    // passes a variable named 'tmp' as an argument, there is no shadowing.
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    const gensymName = expanded.bindings[0].name;
    expect(gensymName).not.toBe('tmp');   // gensym'd name ≠ user arg name
    expect(gensymName).toMatch(/^tmp_/);  // but shares the user-readable prefix
    // The init uses the user's tmp (not the gensym'd one)
    expect(expanded.bindings[0].init.name).toBe('tmp');
  });

  it('gensym\'d binding and user arg have different names even when both carry the use-site scope', () => {
    const macroDef = makeSwapMacroDef();
    const callSite = makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')));
    const program = makeProgram(macroDef, callSite);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const expanded = ast.body[1] as any;
    const gensymName  = expanded.bindings[0].name;         // 'tmp_0'
    const initName    = expanded.bindings[0].init.name;    // 'tmp'
    expect(gensymName).not.toBe(initName);
  });

  it('outer let with user tmp is preserved unchanged; swap! call site is replaced', () => {
    // (let ((tmp 1) (y 2)) (swap! tmp y))
    // The outer let should survive unchanged; its body contains the expanded swap!
    const macroDef = makeSwapMacroDef();
    const outerLet = makeLet(
      [{ name: 'tmp', init: makeLit(1) }, { name: 'y', init: makeLit(2) }],
      makeExprStmt(makeCall('swap!', makeIdent('tmp'), makeIdent('y')))
    );
    const program = makeProgram(macroDef, outerLet);

    const env = makeMacroEnv();
    collectMacros(program, env);
    const { ast, errors } = expandAll(program, env);

    expect(errors).toHaveLength(0);
    const outerNode = ast.body[1] as any;
    expect(outerNode.tag).toBe('let');
    // Outer bindings are intact
    expect(outerNode.bindings[0].name).toBe('tmp');
    expect(outerNode.bindings[1].name).toBe('y');
    // Body[0] is the expanded swap! — a let with gensym'd binding
    const swapExpanded = outerNode.body[0].expr;
    expect(swapExpanded.tag).toBe('let');
    expect(swapExpanded.bindings[0].name).toMatch(/^tmp_\d+$/);
    expect(swapExpanded.bindings[0].name).not.toBe('tmp');
  });
});
