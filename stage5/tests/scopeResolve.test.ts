import { describe, it, expect } from 'vitest';
import { isSubsetOf, addBinding, resolveIdent, resolveExpr, resolveNames } from '../Stage5-scope-resolve';

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
function makeLetStar(bindings: { name: string; init: any }[], ...body: any[]) {
  return {
    tag: 'let*',
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

// ---- isSubsetOf ----

describe('isSubsetOf', () => {
  it('empty set is a subset of empty set', () => {
    expect(isSubsetOf(new Set(), new Set())).toBe(true);
  });

  it('empty set is a subset of any set', () => {
    expect(isSubsetOf(new Set(), new Set([1, 2, 3]))).toBe(true);
  });

  it('{1} is a subset of {1, 2}', () => {
    expect(isSubsetOf(new Set([1]), new Set([1, 2]))).toBe(true);
  });

  it('{1, 2} is NOT a subset of {1}', () => {
    expect(isSubsetOf(new Set([1, 2]), new Set([1]))).toBe(false);
  });

  it('{3} is NOT a subset of {1, 2}', () => {
    expect(isSubsetOf(new Set([3]), new Set([1, 2]))).toBe(false);
  });

  it('{5, 0} is NOT a subset of {} (template binding not visible to user ref)', () => {
    expect(isSubsetOf(new Set([5, 0]), new Set())).toBe(false);
  });

  it('{} is a subset of {5, 0} (user binding IS visible to template ref)', () => {
    expect(isSubsetOf(new Set(), new Set([5, 0]))).toBe(true);
  });
});

// ---- addBinding ----

describe('addBinding', () => {
  it('returns a new array with the binding appended', () => {
    const chain: any[] = [];
    const result = addBinding(chain, 'x', new Set());
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('x');
  });

  it('does not mutate the original chain', () => {
    const chain: any[] = [{ name: 'a', scopes: new Set() }];
    const result = addBinding(chain, 'b', new Set());
    expect(chain).toHaveLength(1);
    expect(result).toHaveLength(2);
  });

  it('appended binding is last (innermost)', () => {
    let chain: any[] = [];
    chain = addBinding(chain, 'x', new Set());
    chain = addBinding(chain, 'x', new Set([1]));
    expect(chain[chain.length - 1].scopes.has(1)).toBe(true);
  });
});

// ---- resolveIdent ----

describe('resolveIdent', () => {
  it('returns null when the chain is empty', () => {
    const ident = makeIdent('x');
    expect(resolveIdent(ident, [])).toBeNull();
  });

  it('returns null when no binding has the right name', () => {
    const chain = [{ name: 'y', scopes: new Set() }];
    const ident = makeIdent('x');
    expect(resolveIdent(ident, chain)).toBeNull();
  });

  it('resolves to a matching binding (user code: all empty scope sets)', () => {
    const chain = [{ name: 'x', scopes: new Set() }];
    const ident = makeIdent('x');
    const result = resolveIdent(ident, chain);
    expect(result).not.toBeNull();
    expect(result!.name).toBe('x');
  });

  it('returns the innermost binding when multiple bindings match', () => {
    // Outer x has scopes {}, inner x has scopes {} — both match;
    // addBinding appends so innermost is last.  resolveIdent uses >= so the
    // last match (innermost) wins on ties.
    let chain: any[] = [];
    chain = addBinding(chain, 'x', new Set());           // outer
    chain = addBinding(chain, 'x', new Set([99]));       // inner (distinct marker)
    const ident = makeIdent('x', [99]);  // ref with useScope 99
    const result = resolveIdent(ident, chain);
    expect(result).not.toBeNull();
    expect(result!.scopes.has(99)).toBe(true);  // innermost binding won
  });

  // KFFD hygiene: template-introduced binding vs user reference
  it('template binding with {defScope} is NOT visible to user ref with {}', () => {
    // KFFD rule: binding.scopes ⊆ ref.scopes required.
    // {defScope=5} is NOT ⊆ {} → template binding invisible to user ref.
    const chain = [{ name: 'x', scopes: new Set([5]) }];
    const userRef = makeIdent('x', []);  // user reference — no scopes
    const result = resolveIdent(userRef, chain);
    expect(result).toBeNull();
  });

  it('user binding {} IS visible to template ref with {defScope, useScope}', () => {
    // {} ⊆ {5, 0} → user binding is visible to template reference
    const chain = [{ name: 'x', scopes: new Set() }];
    const templateRef = makeIdent('x', [5, 0]);
    const result = resolveIdent(templateRef, chain);
    expect(result).not.toBeNull();
  });

  it('most-specific binding wins (largest scope set)', () => {
    // Two bindings for 'x': {} and {1}.  Template ref has {1}.
    // {} ⊆ {1} and {1} ⊆ {1} — both match; {1} is more specific.
    let chain: any[] = [];
    chain = addBinding(chain, 'x', new Set());     // size 0
    chain = addBinding(chain, 'x', new Set([1]));  // size 1 — more specific
    const ref = makeIdent('x', [1]);
    const result = resolveIdent(ref, chain);
    expect(result).not.toBeNull();
    expect(result!.scopes.has(1)).toBe(true);
  });
});

// ---- resolveNames: basic cases ----

describe('resolveNames: basic cases', () => {
  it('returns an empty-error result', () => {
    const program = makeProgram();
    const { ast, errors } = resolveNames(program);
    expect(errors).toHaveLength(0);
    expect(ast.tag).toBe('program');
  });

  it('free identifiers are returned unchanged (no resolvedScopes)', () => {
    // (x) — free reference, no binding
    const program = makeProgram(makeExprStmt(makeIdent('x')));
    const { ast } = resolveNames(program);
    const ident = (ast.body[0] as any).expr;
    expect(ident.tag).toBe('identifier');
    expect(ident.name).toBe('x');
    expect(ident.resolvedScopes).toBeUndefined();
  });

  it('bound identifier gets resolvedScopes annotation', () => {
    // (let* ((x 1)) (return x))
    const program = makeProgram(
      makeLetStar([{ name: 'x', init: makeLit(1) }],
        makeReturn(makeIdent('x')))
    );
    const { ast } = resolveNames(program);
    const letNode = ast.body[0] as any;
    const retExpr = letNode.body[0].expr;
    expect(retExpr.tag).toBe('identifier');
    expect(retExpr.name).toBe('x');
    expect(retExpr.resolvedScopes).toBeDefined();
  });

  it('inner binding shadows outer binding', () => {
    // (let* ((x 1))
    //   (let* ((x 2))
    //     (return x)))
    // The inner `x` should resolve, and its reference should have resolvedScopes
    const inner = makeLetStar([{ name: 'x', init: makeLit(2) }],
      makeReturn(makeIdent('x')));
    const outer = makeLetStar([{ name: 'x', init: makeLit(1) }], inner);
    const program = makeProgram(outer);
    const { ast } = resolveNames(program);
    const outerLet = ast.body[0] as any;
    const innerLet = outerLet.body[0];
    const retExpr = innerLet.body[0].expr;
    expect(retExpr.resolvedScopes).toBeDefined();
  });

  it('let* init can reference outer binding', () => {
    // (let* ((a 1) (b a)) (return b))
    // When resolving `a` in the init of `b`, only `a` is in scope (sequential)
    const program = makeProgram(
      makeLetStar(
        [{ name: 'a', init: makeLit(1) }, { name: 'b', init: makeIdent('a') }],
        makeReturn(makeIdent('b'))
      )
    );
    const { ast } = resolveNames(program);
    const letNode = ast.body[0] as any;
    // The init of `b` is `a` — should have resolvedScopes
    const bInit = letNode.bindings[1].init;
    expect(bInit.resolvedScopes).toBeDefined();
  });

  it('let* init cannot reference its own binding (sequential)', () => {
    // (let* ((x x)) ...) — `x` in init is free (x not yet in chain)
    const program = makeProgram(
      makeLetStar([{ name: 'x', init: makeIdent('x') }],
        makeReturn(makeLit(0)))
    );
    const { ast } = resolveNames(program);
    const letNode = ast.body[0] as any;
    const xInit = letNode.bindings[0].init;
    // `x` has no binding in scope when its own init is resolved
    expect(xInit.resolvedScopes).toBeUndefined();
  });

  it('non-macro call args are resolved', () => {
    // (console.log x) where x is in a binding
    const program = makeProgram(
      makeLetStar([{ name: 'x', init: makeLit(1) }],
        makeExprStmt(makeCall('console.log', makeIdent('x'))))
    );
    const { ast } = resolveNames(program);
    const letNode = ast.body[0] as any;
    const callExpr = letNode.body[0].expr;
    expect(callExpr.tag).toBe('call');
    expect(callExpr.args[0].resolvedScopes).toBeDefined();
  });

  it('leaves literal nodes unchanged', () => {
    const lit = makeLit(42);
    const program = makeProgram(makeExprStmt(lit));
    const { ast } = resolveNames(program);
    const result = (ast.body[0] as any).expr;
    expect(result.tag).toBe('literal');
    expect(result.value).toBe(42);
  });
});

// ---- KFFD hygiene with resolveNames ----

describe('resolveNames: KFFD hygiene', () => {
  it('template ref {defScope} resolves to user binding {}', () => {
    // Simulate: outer let* binds `x` with empty scopes (user code);
    // inside, we have a template reference `x` with scopes {defScope=5, useScope=0}.
    // The user binding {} IS visible to the template ref (since {} ⊆ {5,0}).
    const templateRef = makeIdent('x', [5, 0]);
    const program = makeProgram(
      makeLetStar([{ name: 'x', init: makeLit(1) }],
        makeReturn(templateRef))
    );
    const { ast } = resolveNames(program);
    const letNode = ast.body[0] as any;
    const retExpr = letNode.body[0].expr;
    expect(retExpr.tag).toBe('identifier');
    expect(retExpr.name).toBe('x');
    expect(retExpr.resolvedScopes).toBeDefined();
  });

  it('user ref {} does NOT resolve to a template-scoped binding {defScope}', () => {
    // We manually construct a chain entry with scopes {5} (template binding).
    // A user reference `x` with {} cannot see it (since {5} ⊄ {}).
    // We verify via resolveIdent directly (resolveNames doesn't currently produce
    // template-scoped bindings from let* nodes, so we use the lower-level API).
    const chain = [{ name: 'x', scopes: new Set([5]) }];
    const userRef = makeIdent('x', []);
    const result = resolveIdent(userRef, chain);
    expect(result).toBeNull();  // invisible to user reference
  });

  it('resolveExpr on identifier in empty chain returns node unchanged', () => {
    const ident = makeIdent('free');
    const result = resolveExpr(ident, []);
    expect(result).toBe(ident);
  });

  it('resolveExpr on identifier in matching chain annotates resolvedScopes', () => {
    const ident = makeIdent('y');
    const chain = [{ name: 'y', scopes: new Set() }];
    const result = resolveExpr(ident, chain) as any;
    expect(result.resolvedScopes).toBeDefined();
  });

  it('resolveExpr preserves non-identifier nodes', () => {
    const lit = makeLit(99);
    const result = resolveExpr(lit, []);
    expect(result).toBe(lit);
  });
});
