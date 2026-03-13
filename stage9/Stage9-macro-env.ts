const makeMacroEnv  = (isMacroCompilation) => {
  return ({
    macros: new Map(),
    macroNamespaces: new Map(),
    macroTimeFns: new Map(),
    varRegistry: new Map(),
    moduleVars: new Map(),
    gensymCounter: 0,
    scopeCounter: 0,
    isMacroCompilation: (isMacroCompilation ? true : false),
    currentMacroName: null,
    currentCallSite: null,
    errors: []
  });
};
const freshScope  = (env) => {
  {
    let s  = env.scopeCounter;
    env.scopeCounter = (env.scopeCounter + 1);
    return s;
  }
};
const gensym  = (env, prefix) => {
  {
    let pfx  = ((prefix !== undefined) ? prefix : "g");
    let id  = env.gensymCounter;
    env.gensymCounter = (env.gensymCounter + 1);
    return ({
      tag: "identifier",
      name: ((pfx + "_") + id),
      scopes: new Set(),
      hygiene: ({
        kind: "gensym",
        id: id,
        macro: env.currentMacroName
      })
    });
  }
};
const collectMacros  = (programNode, env) => {
  programNode.body.forEach((node) => {
    if (((node.tag === "defmacro") || (node.tag === "macro-def"))) {
      env.macros.set(node.name, ({
        name: node.name,
        params: node.params,
        rest: node.rest,
        body: node.body,
        scopeId: node.scopeId
      }));
    }
    if ((node.tag === "macro-time-fn-def")) {
      env.macroTimeFns.set(node.name, ({
        name: node.name,
        params: node.init.params,
        rest: node.init.rest,
        body: node.init.body
      }));
    }
    if (((node.tag === "let-decl") || (node.tag === "const-decl"))) {
      env.varRegistry.set(node.name, ({
        name: node.name,
        meta: node.meta
      }));
    }
  });
  return env;
};
const registerTopLevelNode  = (node, env) => {
  if (((node.tag === "defmacro") || (node.tag === "macro-def"))) {
    env.macros.set(node.name, ({
      name: node.name,
      params: node.params,
      rest: node.rest,
      body: node.body,
      scopeId: node.scopeId
    }));
  }
  if ((node.tag === "macro-time-fn-def")) {
    env.macroTimeFns.set(node.name, ({
      name: node.name,
      params: node.init.params,
      rest: node.init.rest,
      body: node.init.body
    }));
  }
  if (((node.tag === "let-decl") || (node.tag === "const-decl"))) {
    env.varRegistry.set(node.name, ({
      name: node.name,
      meta: node.meta
    }));
  }
};
export { makeMacroEnv, gensym, freshScope, collectMacros, registerTopLevelNode };
