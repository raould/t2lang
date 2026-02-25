let makeMacroEnv  = () => {
  return ({
    macros: new Map(),
    macroTimeFns: new Map(),
    gensymCounter: 0,
    scopeCounter: 0,
    currentMacroName: null,
    currentCallSite: null,
    errors: []
  });
};
let freshScope  = (env) => {
  {
    let s  = env.scopeCounter;
    env.scopeCounter = (env.scopeCounter + 1);
    return s;
  }
};
let gensym  = (env, prefix) => {
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
let collectMacros  = (programNode, env) => {
  programNode.body.forEach((node) => {
    if (((node.tag === "defmacro") || (node.tag === "macro-def"))) {
      env.macros.set(node.name, ({
        name: node.name,
        params: node.params,
        body: node.body,
        scopeId: node.scopeId
      }));
    }
    if ((node.tag === "macro-time-fn-def")) {
      env.macroTimeFns.set(node.name, ({
        name: node.name,
        params: node.init.params,
        body: node.init.body
      }));
    }
  });
  return env;
};
export { makeMacroEnv, gensym, freshScope, collectMacros };
