const isSubsetOf  = (a, b) => {
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
const addBinding  = (chain, name, scopes) => {
  return chain.concat([({
    name: name,
    scopes: scopes
  })]);
};
const resolveIdent  = (ident, chain) => {
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
const resolveExpr  = (node, chain) => {
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
  if (((node.tag === "lambda") || ((node.tag === "fn") || ((node.tag === "async-lambda") || ((node.tag === "async-fn") || ((node.tag === "generator-fn") || (node.tag === "async-generator-fn"))))))) {
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
        if (node.rest) {
          extChain = addBinding(extChain, node.rest, new Set());
        }
        return ({
          tag: node.tag,
          text: node.text,
          params: node.params,
          rest: node.rest,
          restType: node.restType,
          returnType: node.returnType,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  if (((node.tag === "await") || ((node.tag === "yield") || (node.tag === "yield*")))) {
    return ({
      tag: node.tag,
      text: node.text,
      expr: (node.expr ? resolveExpr(node.expr, chain) : undefined)
    });
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
const resolveClassElement  = (node, chain) => {
  if ((node.tag === "field-def")) {
    return ({
      tag: "field-def",
      text: node.text,
      modifiers: node.modifiers,
      name: node.name,
      typeAnnotation: node.typeAnnotation,
      init: (node.init ? resolveExpr(node.init, chain) : undefined)
    });
  }
  if ((node.tag === "constructor-def")) {
    {
      {
        let extChain  = chain;
        node.sig.params.forEach((p) => {
          extChain = addBinding(extChain, p.name, new Set());
        });
        return ({
          tag: "constructor-def",
          text: node.text,
          sig: node.sig,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  if ((node.tag === "class-method-def")) {
    {
      {
        let extChain  = chain;
        node.sig.params.forEach((p) => {
          extChain = addBinding(extChain, p.name, new Set());
        });
        return ({
          tag: "class-method-def",
          text: node.text,
          modifiers: node.modifiers,
          computed: node.computed,
          name: node.name,
          key: (node.key ? resolveExpr(node.key, chain) : undefined),
          sig: node.sig,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  if ((node.tag === "abstract-method-def")) {
    return ({
      tag: "abstract-method-def",
      text: node.text,
      modifiers: node.modifiers,
      computed: node.computed,
      name: node.name,
      key: (node.key ? resolveExpr(node.key, chain) : undefined),
      sig: node.sig
    });
  }
  if ((node.tag === "getter-def")) {
    return ({
      tag: "getter-def",
      text: node.text,
      modifiers: node.modifiers,
      computed: node.computed,
      name: node.name,
      key: (node.key ? resolveExpr(node.key, chain) : undefined),
      sig: node.sig,
      body: node.body.map((s) => {
        return resolveStmt(s, chain);
      })
    });
  }
  if ((node.tag === "setter-def")) {
    {
      {
        let extChain  = chain;
        node.sig.params.forEach((p) => {
          extChain = addBinding(extChain, p.name, new Set());
        });
        return ({
          tag: "setter-def",
          text: node.text,
          modifiers: node.modifiers,
          computed: node.computed,
          name: node.name,
          key: (node.key ? resolveExpr(node.key, chain) : undefined),
          sig: node.sig,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  throw new Error((("resolveClassElement: unexpected tag >" + node.tag) + "<"));
};
const resolveClassBody  = (node, chain) => {
  return ({
    tag: "class-body",
    text: node.text,
    elements: node.elements.map((el) => {
      return resolveClassElement(el, chain);
    })
  });
};
const resolveClassDef  = (node, chain) => {
  return ({
    tag: "class-def",
    text: node.text,
    modifiers: node.modifiers,
    name: node.name,
    typeParams: node.typeParams,
    extendsType: node.extendsType,
    implementsTypes: node.implementsTypes,
    body: resolveClassBody(node.body, chain)
  });
};
const resolveAnonClassDef  = (node, chain) => {
  return ({
    tag: "anon-class-def",
    text: node.text,
    modifiers: node.modifiers,
    extendsType: node.extendsType,
    implementsTypes: node.implementsTypes,
    body: resolveClassBody(node.body, chain)
  });
};
const resolveStmt  = (node, chain) => {
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
  if ((node.tag === "try")) {
    return ({
      tag: "try",
      text: node.text,
      body: node.body.map((s) => {
        return resolveStmt(s, chain);
      }),
      catchClause: (node.catchClause ? ({
        param: node.catchClause.param,
        body: node.catchClause.body.map((s) => {
          return resolveStmt(s, addBinding(chain, node.catchClause.param, new Set()));
        })
      }) : undefined),
      finallyBody: (node.finallyBody ? node.finallyBody.map((s) => {
        return resolveStmt(s, chain);
      }) : undefined)
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
  if ((node.tag === "class-def")) {
    return resolveClassDef(node, chain);
  }
  if ((node.tag === "anon-class-def")) {
    return resolveAnonClassDef(node, chain);
  }
  return node;
};
const resolveTopLevel  = (node, chain) => {
  if (((node.tag === "defmacro") || (node.tag === "macro-time-fn-def"))) {
    return node;
  }
  if ((node.tag === "let-decl")) {
    return ({
      tag: "let-decl",
      text: node.text,
      name: node.name,
      meta: node.meta,
      init: resolveExpr(node.init, chain)
    });
  }
  if ((node.tag === "const-decl")) {
    return ({
      tag: "const-decl",
      text: node.text,
      name: node.name,
      meta: node.meta,
      init: resolveExpr(node.init, chain)
    });
  }
  if ((node.tag === "fn-decl")) {
    {
      {
        let extChain  = chain;
        node.params.forEach((p) => {
          extChain = addBinding(extChain, p.name, new Set());
        });
        if (node.rest) {
          extChain = addBinding(extChain, node.rest, new Set());
        }
        return ({
          tag: "fn-decl",
          text: node.text,
          name: node.name,
          meta: node.meta,
          params: node.params,
          rest: node.rest,
          restType: node.restType,
          returnType: node.returnType,
          body: node.body.map((s) => {
            return resolveStmt(s, extChain);
          })
        });
      }
    }
  }
  return resolveStmt(node, chain);
};
const resolveNames  = (programNode) => {
  {
    let chain  = [];
    let resolvedBody  = [];
    programNode.body.forEach((node) => {
      resolvedBody.push(resolveTopLevel(node, chain));
      if (((node.tag === "let-decl") || ((node.tag === "const-decl") || (node.tag === "fn-decl")))) {
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
export { resolveNames, resolveTopLevel, resolveIdent, resolveExpr, resolveStmt, isSubsetOf, addBinding };
