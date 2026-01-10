let isSubsetOf  = (a, b) => {
  {
    let result  = true;
    a.forEach((x) => {
      if ((!b.has(x))) {
        result = false;
      }
    });
    return result;
  }
};
let addBinding  = (chain, name, scopes) => {
  return chain.concat([({
    name: name,
    scopes: scopes
  })]);
};
let resolveIdent  = (ident, chain) => {
  {
    let identScopes  = ident.scopes;
    let name  = ident.name;
    let best  = null;
    chain.forEach((b) => {
      if ((b.name === name)) {
        if (isSubsetOf(b.scopes, identScopes)) {
          if (((best === null) || (b.scopes.size >= best.scopes.size))) {
            best = b;
          }
        }
      }
    });
    return best;
  }
};
let resolveExpr  = (node, chain) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if ((node.tag === "identifier")) {
    {
      {
        let binding  = resolveIdent(node, chain);
        if (binding) {
          return ({
            tag: "identifier",
            name: node.name,
            text: node.text,
            scopes: node.scopes,
            hygiene: node.hygiene,
            resolvedScopes: binding.scopes
          });
        }
        else {
          return node;
        }
      }
    }
  }
  if ((node.tag === "call")) {
    return ({
      tag: "call",
      text: node.text,
      fn: resolveExpr(node.fn, chain),
      args: node.args.map((a) => {
        return resolveExpr(a, chain);
      }),
      typeArgs: node.typeArgs
    });
  }
  if ((node.tag === "array")) {
    return ({
      tag: "array",
      text: node.text,
      elements: node.elements.map((e) => {
        return resolveExpr(e, chain);
      })
    });
  }
  if ((node.tag === "object")) {
    return ({
      tag: "object",
      text: node.text,
      fields: node.fields.map((f) => {
        if (f.isShorthand) {
          return f;
        }
        return ({
          key: f.key,
          isMethod: f.isMethod,
          isShorthand: f.isShorthand,
          value: resolveExpr(f.value, chain)
        });
      })
    });
  }
  if (((node.tag === "lambda") || (node.tag === "fn"))) {
    {
      {
        let extChain  = chain;
        node.params.forEach((p) => {
          {
            let pName  = ((typeof p === "string") ? p : (p.name ? p.name : (p + "")));
            let pScopes  = (((typeof p !== "string") && p.scopes) ? p.scopes : new Set());
            extChain = addBinding(extChain, pName, pScopes);
          }
        });
        return ({
          tag: node.tag,
          text: node.text,
          params: node.params,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  if ((node.tag === "ternary")) {
    return ({
      tag: "ternary",
      text: node.text,
      test: resolveExpr(node.test, chain),
      ifthen: resolveExpr(node.ifthen, chain),
      ifelse: resolveExpr(node.ifelse, chain)
    });
  }
  if ((node.tag === "prop-access")) {
    return ({
      tag: "prop-access",
      text: node.text,
      object: resolveExpr(node.object, chain),
      key: node.key
    });
  }
  if ((node.tag === "index-access")) {
    return ({
      tag: "index-access",
      text: node.text,
      object: resolveExpr(node.object, chain),
      index: resolveExpr(node.index, chain)
    });
  }
  if ((node.tag === "cond")) {
    return ({
      tag: "cond",
      text: node.text,
      clauses: node.clauses.map((c) => {
        return ({
          test: resolveExpr(c.test, chain),
          expr: resolveExpr(c.expr, chain)
        });
      })
    });
  }
  return node;
};
let resolveStmt  = (node, chain) => {
  if (((node === null) || (node === undefined))) {
    return node;
  }
  if ((node.tag === "expr-stmt")) {
    return ({
      tag: "expr-stmt",
      text: node.text,
      expr: resolveExpr(node.expr, chain)
    });
  }
  if ((node.tag === "return")) {
    return ({
      tag: "return",
      text: node.text,
      expr: (node.expr ? resolveExpr(node.expr, chain) : undefined)
    });
  }
  if ((node.tag === "throw")) {
    return ({
      tag: "throw",
      text: node.text,
      expr: resolveExpr(node.expr, chain)
    });
  }
  if ((node.tag === "let*")) {
    {
      {
        let extChain  = chain;
        let resolvedBindings  = [];
        node.bindings.forEach((b) => {
          {
            let resolvedInit  = resolveExpr(b.init, extChain);
            let bindScopes  = (b.scopes ? b.scopes : new Set());
            resolvedBindings.push(({
              name: b.name,
              init: resolvedInit,
              typeAnnotation: b.typeAnnotation
            }));
            extChain = addBinding(extChain, b.name, bindScopes);
          }
        });
        return ({
          tag: "let*",
          text: node.text,
          bindings: resolvedBindings,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  if ((node.tag === "const*")) {
    {
      {
        let extChain  = chain;
        let resolvedBindings  = [];
        node.bindings.forEach((b) => {
          {
            let resolvedInit  = resolveExpr(b.init, extChain);
            let bindScopes  = (b.scopes ? b.scopes : new Set());
            resolvedBindings.push(({
              name: b.name,
              init: resolvedInit,
              typeAnnotation: b.typeAnnotation
            }));
            extChain = addBinding(extChain, b.name, bindScopes);
          }
        });
        return ({
          tag: "const*",
          text: node.text,
          bindings: resolvedBindings,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  if ((node.tag === "if")) {
    return ({
      tag: "if",
      text: node.text,
      test: resolveExpr(node.test, chain),
      ifthen: resolveStmt(node.ifthen, chain),
      ifelse: (node.ifelse ? resolveStmt(node.ifelse, chain) : undefined)
    });
  }
  if ((node.tag === "while")) {
    return ({
      tag: "while",
      text: node.text,
      test: resolveExpr(node.test, chain),
      body: node.body.map((s) => {
        return resolveStmt(s, chain);
      })
    });
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      text: node.text,
      body: node.body.map((s) => {
        return resolveStmt(s, chain);
      })
    });
  }
  if ((node.tag === "assign")) {
    return ({
      tag: "assign",
      text: node.text,
      name: node.name,
      value: resolveExpr(node.value, chain)
    });
  }
  return node;
};
let resolveTopLevel  = (node, chain) => {
  if (((node.tag === "defmacro") || (node.tag === "macro-time-fn-def"))) {
    return node;
  }
  if ((node.tag === "def")) {
    return ({
      tag: "def",
      text: node.text,
      name: node.name,
      init: resolveExpr(node.init, chain)
    });
  }
  return resolveStmt(node, chain);
};
let resolveNames  = (programNode) => {
  {
    let chain  = [];
    let resolvedBody  = [];
    programNode.body.forEach((node) => {
      resolvedBody.push(resolveTopLevel(node, chain));
      if ((node.tag === "def")) {
        chain = addBinding(chain, node.name, new Set());
      }
    });
    {
      let resolved  = ({
        tag: "program",
        text: programNode.text,
        body: resolvedBody
      });
      return ({
        ast: resolved,
        errors: []
      });
    }
  }
};
export { resolveNames, resolveIdent, resolveExpr, resolveStmt, isSubsetOf, addBinding };
