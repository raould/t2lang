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
        if ((f.computed && f.isMethod)) {
          {
            let extChain  = chain;
            f.params.forEach((p) => {
              extChain = addBinding(extChain, p, new Set());
            });
            return ({
              computed: true,
              keyExpr: resolveExpr(f.keyExpr, chain),
              isMethod: true,
              params: f.params,
              body: f.body.map((s) => {
                return resolveStmt(s, extChain);
              })
            });
          }
        }
        if (f.computed) {
          return ({
            computed: true,
            keyExpr: resolveExpr(f.keyExpr, chain),
            isMethod: false,
            isShorthand: false,
            value: resolveExpr(f.value, chain)
          });
        }
        if (f.isMethod) {
          {
            let extChain  = chain;
            f.params.forEach((p) => {
              extChain = addBinding(extChain, p, new Set());
            });
            return ({
              key: f.key,
              isMethod: true,
              params: f.params,
              body: f.body.map((s) => {
                return resolveStmt(s, extChain);
              })
            });
          }
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
  if (((node.tag === "fn-o") || ((node.tag === "lambda-o") || ((node.tag === "async-fn-o") || ((node.tag === "async-lambda-o") || ((node.tag === "generator-fn-o") || (node.tag === "async-generator-fn-o"))))))) {
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
      }),
      elseExpr: ((node.elseExpr !== undefined) ? resolveExpr(node.elseExpr, chain) : undefined)
    });
  }
  if ((node.tag === "macro-expr-call")) {
    return ({
      tag: "macro-expr-call",
      id: node.id,
      fn: node.fn,
      headerArgs: node.headerArgs.map((a) => {
        return resolveExpr(a, chain);
      }),
      body: node.body
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
  if ((node.tag === "method-o-def")) {
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
          tag: "method-o-def",
          text: node.text,
          modifiers: node.modifiers,
          computed: node.computed,
          name: node.name,
          key: (node.key ? resolveExpr(node.key, chain) : undefined),
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
  if ((node.tag === "abstract-method-o-def")) {
    return ({
      tag: "abstract-method-o-def",
      text: node.text,
      modifiers: node.modifiers,
      computed: node.computed,
      name: node.name,
      key: (node.key ? resolveExpr(node.key, chain) : undefined),
      params: node.params,
      rest: node.rest,
      restType: node.restType,
      returnType: node.returnType
    });
  }
  if ((node.tag === "constructor-o-def")) {
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
          tag: "constructor-o-def",
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
  if ((node.tag === "let")) {
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
          tag: "let",
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
      ifthen: node.ifthen.map((s) => {
        return resolveStmt(s, chain);
      }),
      ifelse: (node.ifelse ? node.ifelse.map((s) => {
        return resolveStmt(s, chain);
      }) : undefined)
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
  if ((node.tag === "assign")) {
    return ({
      tag: "assign",
      text: node.text,
      name: node.name,
      value: resolveExpr(node.value, chain)
    });
  }
  if ((node.tag === "let")) {
    return ({
      tag: "let",
      text: node.text,
      name: node.name,
      typeAnnotation: node.typeAnnotation,
      init: resolveExpr(node.init, chain)
    });
  }
  if ((node.tag === "const")) {
    if (node.pattern) {
      return ({
        tag: "const",
        text: node.text,
        pattern: node.pattern,
        init: resolveExpr(node.init, chain)
      });
    }
    else {
      return ({
        tag: "const",
        text: node.text,
        name: node.name,
        typeAnnotation: node.typeAnnotation,
        init: resolveExpr(node.init, chain)
      });
    }
  }
  if ((node.tag === "class-def")) {
    return resolveClassDef(node, chain);
  }
  if ((node.tag === "anon-class-def")) {
    return resolveAnonClassDef(node, chain);
  }
  if ((node.tag === "macro-body-call")) {
    return ({
      tag: "macro-body-call",
      id: node.id,
      fn: node.fn,
      headerArgs: node.headerArgs.map((a) => {
        return resolveExpr(a, chain);
      }),
      body: node.body
    });
  }
  if ((node.tag === "binary-op")) {
    return ({
      tag: "binary-op",
      id: node.id,
      op: node.op,
      left: resolveExpr(node.left, chain),
      right: resolveExpr(node.right, chain)
    });
  }
  if ((node.tag === "unary-op")) {
    return ({
      tag: "unary-op",
      id: node.id,
      op: node.op,
      operand: resolveExpr(node.operand, chain)
    });
  }
  if ((node.tag === "macro-expr-call")) {
    return ({
      tag: "macro-expr-call",
      id: node.id,
      fn: node.fn,
      headerArgs: node.headerArgs.map((a) => {
        return resolveExpr(a, chain);
      }),
      body: node.body
    });
  }
  if ((node.tag === "block")) {
    return ({
      tag: "block",
      id: node.id,
      text: node.text,
      body: node.body.map((s) => {
        return resolveStmt(s, chain);
      })
    });
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
      id: node.id,
      text: node.text,
      name: node.name,
      meta: node.meta,
      typeAnnotation: node.typeAnnotation,
      init: resolveExpr(node.init, chain)
    });
  }
  if ((node.tag === "const-decl")) {
    return ({
      tag: "const-decl",
      id: node.id,
      text: node.text,
      name: node.name,
      meta: node.meta,
      typeAnnotation: node.typeAnnotation,
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
  if ((node.tag === "fn-o-decl")) {
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
          tag: "fn-o-decl",
          text: node.text,
          name: node.name,
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
      if (((node.tag === "let-decl") || ((node.tag === "const-decl") || ((node.tag === "fn-decl") || (node.tag === "fn-o-decl"))))) {
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
