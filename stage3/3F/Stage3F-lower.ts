let isOperator  = (name) => {
  {
    let ops  = ["<", ">", "<=", ">=", "&&", "||", "!=", "!==", "==", "===", "+", "-", "*", "/", "%", "^", "!"];
    return ops.includes(name);
  }
};
let lowerProgram  = (node) => {
  {
    let body  = node.body.map(lowerTopLevel);
    return ({
      node: node,
      tag: "program",
      body: body
    });
  }
};
let lowerTopLevel  = (node) => {
  if ((node.tag === "defmacro")) {
    return lowerDefmacro(node);
  }
  if ((node.tag === "def")) {
    return lowerDef(node);
  }
  if ((node.tag === "type-alias")) {
    return lowerTypeAlias(node);
  }
  if ((node.tag === "interface-def")) {
    return lowerInterfaceDef(node);
  }
  if ((node.tag === "class-def")) {
    return lowerClassDef(node);
  }
  if ((node.tag === "export-decl")) {
    return lowerExportDecl(node);
  }
  return lowerStmt(node);
};
let lowerTypeAlias  = (node) => {
  return ({
    node: node,
    tag: "type-alias",
    name: node.name,
    typeParams: ((node.typeParams && (node.typeParams.length > 0)) ? node.typeParams.map((p) => {
      return ({
        name: p.name,
        constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
        default: (p.default ? lowerTypeExpr(p.default) : undefined)
      });
    }) : []),
    type: lowerTypeExpr(node.type)
  });
};
let lowerInterfaceDef  = (node) => {
  return ({
    node: node,
    tag: "interface-def",
    name: node.name,
    typeParams: ((node.typeParams && (node.typeParams.length > 0)) ? node.typeParams.map((p) => {
      return ({
        name: p.name,
        constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
        default: (p.default ? lowerTypeExpr(p.default) : undefined)
      });
    }) : []),
    extends: node.extends.map(lowerTypeExpr),
    body: lowerTypeExpr(node.body)
  });
};
let lowerTypedParam  = (node) => {
  return ({
    name: node.name,
    optional: node.optional,
    typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined)
  });
};
let lowerFieldDef  = (node) => {
  return ({
    node: node,
    tag: "field-def",
    modifiers: node.modifiers,
    name: node.name,
    typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined),
    init: (node.init ? lowerExpr(node.init) : undefined)
  });
};
let lowerConstructorDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return ({
      node: node,
      tag: "constructor-def",
      sig: ({
        params: params,
        returnType: returnType
      }),
      body: body
    });
  }
};
let lowerClassMethodDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return ({
      node: node,
      tag: "class-method-def",
      modifiers: node.modifiers,
      name: node.name,
      sig: ({
        params: params,
        returnType: returnType
      }),
      body: body
    });
  }
};
let lowerAbstractMethodDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    return ({
      node: node,
      tag: "abstract-method-def",
      modifiers: node.modifiers,
      name: node.name,
      sig: ({
        params: params,
        returnType: returnType
      })
    });
  }
};
let lowerGetterDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return ({
      node: node,
      tag: "getter-def",
      modifiers: node.modifiers,
      name: node.name,
      sig: ({
        params: params,
        returnType: returnType
      }),
      body: body
    });
  }
};
let lowerSetterDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return ({
      node: node,
      tag: "setter-def",
      modifiers: node.modifiers,
      name: node.name,
      sig: ({
        params: params,
        returnType: returnType
      }),
      body: body
    });
  }
};
let lowerClassElement  = (node) => {
  if ((node.tag === "field-def")) {
    return lowerFieldDef(node);
  }
  if ((node.tag === "constructor-def")) {
    return lowerConstructorDef(node);
  }
  if ((node.tag === "class-method-def")) {
    return lowerClassMethodDef(node);
  }
  if ((node.tag === "abstract-method-def")) {
    return lowerAbstractMethodDef(node);
  }
  if ((node.tag === "getter-def")) {
    return lowerGetterDef(node);
  }
  if ((node.tag === "setter-def")) {
    return lowerSetterDef(node);
  }
  throw new Error((("lowerClassElement: unexpected tag >" + node.tag) + "<"));
};
let lowerClassDef  = (node) => {
  {
    let tparams  = node.typeParams.map((p) => {
      return ({
        name: p.name,
        constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
        default: (p.default ? lowerTypeExpr(p.default) : undefined)
      });
    });
    let extendsType  = (node.extendsType ? lowerTypeExpr(node.extendsType) : undefined);
    let implementsTypes  = node.implementsTypes.map(lowerTypeExpr);
    let elements  = node.body.elements.map(lowerClassElement);
    return ({
      node: node,
      tag: "class-def",
      modifiers: node.modifiers,
      name: node.name,
      typeParams: tparams,
      extendsType: extendsType,
      implementsTypes: implementsTypes,
      body: ({
        tag: "class-body",
        elements: elements
      })
    });
  }
};
let lowerAnonClassDef  = (node) => {
  {
    let extendsType  = (node.extendsType ? lowerTypeExpr(node.extendsType) : undefined);
    let implementsTypes  = node.implementsTypes.map(lowerTypeExpr);
    let elements  = node.body.elements.map(lowerClassElement);
    return ({
      node: node,
      tag: "anon-class-def",
      modifiers: node.modifiers,
      extendsType: extendsType,
      implementsTypes: implementsTypes,
      body: ({
        tag: "class-body",
        elements: elements
      })
    });
  }
};
let lowerExportDefaultClass  = (node) => {
  {
    let classNode  = node.classNode;
    if ((classNode.tag === "class-def")) {
      return ({
        node: node,
        tag: "export-default-class-stmt",
        classNode: lowerClassDef(classNode)
      });
    }
    if ((classNode.tag === "anon-class-def")) {
      return ({
        node: node,
        tag: "export-default-class-stmt",
        classNode: lowerAnonClassDef(classNode)
      });
    }
    throw new Error((("lowerExportDefaultClass: unexpected tag >" + classNode.tag) + "<"));
  }
};
let lowerExportDefaultDef  = (node) => {
  {
    let defNode  = node.defNode;
    let init  = defNode.init;
    if (((init.tag !== "lambda") && (init.tag !== "fn"))) {
      throw new Error("export-default: initializer must be a function");
    }
    {
      let body  = init.body.map(lowerStmt);
      return ({
        node: node,
        tag: "export-default-fn-decl",
        name: defNode.name,
        params: init.params,
        body: body
      });
    }
  }
};
let lowerDefmacro  = (node) => {
  {
    let body  = node.body.map(lowerStmt);
    return ({
      node: node,
      tag: "defmacro",
      name: node.name,
      params: node.params,
      body: body
    });
  }
};
let lowerDef  = (node) => {
  {
    let init  = lowerExpr(node.init);
    return ({
      node: node,
      tag: "let-stmt",
      name: node.name,
      init: init
    });
  }
};
let lowerExportDecl  = (node) => {
  {
    let inner  = node.decl;
    if ((inner.tag === "def")) {
      return ({
        node: node,
        tag: "export-decl-stmt",
        decl: lowerDef(inner)
      });
    }
    if ((inner.tag === "class-def")) {
      return ({
        node: node,
        tag: "export-decl-stmt",
        decl: lowerClassDef(inner)
      });
    }
    if ((inner.tag === "interface-def")) {
      return ({
        node: node,
        tag: "export-decl-stmt",
        decl: lowerInterfaceDef(inner)
      });
    }
    if ((inner.tag === "type-alias")) {
      return ({
        node: node,
        tag: "export-decl-stmt",
        decl: lowerTypeAlias(inner)
      });
    }
    throw new Error((("lowerExportDecl: unknown inner tag >" + inner.tag) + "<"));
  }
};
let lowerStmt  = (node) => {
  if ((node.tag === "let*")) {
    return lowerLetStar(node);
  }
  if ((node.tag === "let")) {
    return ({
      node: node,
      tag: "let-stmt",
      name: node.name,
      typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined),
      init: lowerExpr(node.init)
    });
  }
  if ((node.tag === "const*")) {
    return lowerConstStar(node);
  }
  if ((node.tag === "const")) {
    return ({
      node: node,
      tag: "const-stmt",
      name: node.name,
      typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined),
      init: lowerExpr(node.init)
    });
  }
  if ((node.tag === "if")) {
    return ({
      node: node,
      tag: "if-stmt",
      test: lowerExpr(node.test),
      ifthen: lowerStmt(node.ifthen),
      ifelse: (node.ifelse ? lowerStmt(node.ifelse) : undefined)
    });
  }
  if ((node.tag === "while")) {
    return ({
      node: node,
      tag: "while-stmt",
      test: lowerExpr(node.test),
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "block")) {
    return ({
      node: node,
      tag: "block-stmt",
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "return")) {
    return ({
      node: node,
      tag: "return-stmt",
      expr: (node.expr ? lowerExpr(node.expr) : undefined)
    });
  }
  if ((node.tag === "assign")) {
    return ({
      node: node,
      tag: "assign-stmt",
      name: node.name,
      value: lowerExpr(node.value)
    });
  }
  if ((node.tag === "assign-prop")) {
    return ({
      node: node,
      tag: "assign-prop-stmt",
      target: lowerExpr(node.target),
      value: lowerExpr(node.value)
    });
  }
  if ((node.tag === "throw")) {
    return ({
      node: node,
      tag: "throw-stmt",
      expr: lowerExpr(node.expr)
    });
  }
  if ((node.tag === "import")) {
    return lowerImport(node);
  }
  if ((node.tag === "export-binding")) {
    return ({
      node: node,
      tag: "export-binding-stmt",
      name: node.name,
      init: lowerExpr(node.init)
    });
  }
  if ((node.tag === "export-default")) {
    return ({
      node: node,
      tag: "export-default-stmt",
      expr: lowerExpr(node.expr)
    });
  }
  if ((node.tag === "export-default-class")) {
    return lowerExportDefaultClass(node);
  }
  if ((node.tag === "export-default-def")) {
    return lowerExportDefaultDef(node);
  }
  if ((node.tag === "export-named")) {
    return ({
      node: node,
      tag: "export-named-stmt",
      pairs: node.pairs
    });
  }
  if ((node.tag === "export-from")) {
    return ({
      node: node,
      tag: "export-from-stmt",
      source: node.source,
      pairs: node.pairs
    });
  }
  if ((node.tag === "export-all-from")) {
    return ({
      node: node,
      tag: "export-all-from-stmt",
      source: node.source
    });
  }
  if ((node.tag === "import-type")) {
    return ({
      node: node,
      tag: "import-type-stmt",
      kind: node.kind,
      names: node.names,
      source: node.source
    });
  }
  if ((node.tag === "export-type")) {
    return ({
      node: node,
      tag: "export-type-stmt",
      pairs: node.pairs
    });
  }
  if ((node.tag === "export-type-from")) {
    return ({
      node: node,
      tag: "export-type-from-stmt",
      source: node.source,
      pairs: node.pairs
    });
  }
  if ((node.tag === "export-type-all-from")) {
    return ({
      node: node,
      tag: "export-type-all-from-stmt",
      source: node.source
    });
  }
  if ((node.tag === "export-ns-from")) {
    return ({
      node: node,
      tag: "export-ns-from-stmt",
      ns: node.ns,
      source: node.source
    });
  }
  if ((node.tag === "switch")) {
    return lowerSwitch(node);
  }
  if ((node.tag === "for")) {
    return ({
      node: node,
      tag: "for-stmt",
      initName: node.initName,
      initExpr: lowerExpr(node.initExpr),
      test: lowerExpr(node.test),
      updateName: node.updateName,
      updateExpr: lowerExpr(node.updateExpr),
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "for-in")) {
    return ({
      node: node,
      tag: "for-in-stmt",
      name: node.name,
      object: lowerExpr(node.object),
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "for-of")) {
    return ({
      node: node,
      tag: "for-of-stmt",
      name: node.name,
      iterable: lowerExpr(node.iterable),
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "expr-stmt")) {
    return ({
      node: node,
      tag: "expr-stmt",
      expr: lowerExpr(node.expr)
    });
  }
  throw new Error((("lowerStmt: unexpected tag >" + node.tag) + "<"));
};
let lowerLetStar  = (node) => {
  {
    let stmts  = [];
    node.bindings.forEach((b) => {
      stmts.push(({
        node: node,
        tag: "let-stmt",
        name: b.name,
        typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined),
        init: (b.init ? lowerExpr(b.init) : undefined)
      }));
    });
    node.body.forEach((s) => {
      stmts.push(lowerStmt(s));
    });
    return ({
      node: node,
      tag: "block-stmt",
      body: stmts
    });
  }
};
let lowerConstStar  = (node) => {
  {
    let stmts  = [];
    node.bindings.forEach((b) => {
      stmts.push(({
        node: node,
        tag: "const-stmt",
        name: b.name,
        typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined),
        init: (b.init ? lowerExpr(b.init) : undefined)
      }));
    });
    node.body.forEach((s) => {
      stmts.push(lowerStmt(s));
    });
    return ({
      node: node,
      tag: "block-stmt",
      body: stmts
    });
  }
};
let lowerImport  = (node) => {
  {
    let spec  = node.spec;
    let defaultName  = undefined;
    let namespaceName  = undefined;
    let named  = undefined;
    if (spec) {
      spec.fields.forEach((f) => {
        if ((f.key === ":default")) {
          defaultName = f.value.value;
        }
        if ((f.key === ":namespace")) {
          namespaceName = f.value.value;
        }
        if ((f.key === ":named")) {
          named = f.value.elements.map((el) => {
            {
              let nm  = undefined;
              let al  = undefined;
              el.fields.forEach((ff) => {
                if ((ff.key === ":name")) {
                  nm = ff.value.value;
                }
                if ((ff.key === ":as")) {
                  al = ff.value.value;
                }
              });
              return ({
                name: nm,
                alias: al
              });
            }
          });
        }
      });
    }
    return ({
      node: node,
      tag: "import-stmt",
      defaultName: defaultName,
      namespaceName: namespaceName,
      named: named,
      source: node.source
    });
  }
};
let lowerSwitch  = (node) => {
  {
    let discriminant  = lowerExpr(node.discriminant);
    let cases  = node.cases.map((c) => {
      return ({
        test: lowerExpr(c.test),
        body: c.body.map(lowerStmt)
      });
    });
    let defaultCase  = (node.defaultCase ? ({
      body: node.defaultCase.body.map(lowerStmt)
    }) : undefined);
    return ({
      node: node,
      tag: "switch-stmt",
      discriminant: discriminant,
      cases: cases,
      defaultCase: defaultCase
    });
  }
};
let lowerExpr  = (node) => {
  if ((node.tag === "prop-access")) {
    return ({
      node: node,
      tag: "prop-access-expr",
      object: lowerExpr(node.object),
      key: node.key
    });
  }
  if ((node.tag === "index-access")) {
    return ({
      node: node,
      tag: "index-access-expr",
      object: lowerExpr(node.object),
      index: lowerExpr(node.index)
    });
  }
  if ((node.tag === "literal")) {
    return node;
  }
  if ((node.tag === "raw-template")) {
    return node;
  }
  if ((node.tag === "keyword")) {
    return node;
  }
  if ((node.tag === "identifier")) {
    return node;
  }
  if ((node.tag === "lambda")) {
    return ({
      node: node,
      tag: "lambda",
      params: node.params,
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "fn")) {
    return ({
      node: node,
      tag: "fn",
      params: node.params,
      body: node.body.map(lowerStmt)
    });
  }
  if ((node.tag === "bind-expr")) {
    return ({
      node: node,
      tag: "bind-expr",
      fn: lowerExpr(node.fn),
      thisArg: lowerExpr(node.thisArg),
      args: node.args.map(lowerExpr)
    });
  }
  if ((node.tag === "method-call-expr")) {
    return ({
      node: node,
      tag: "method-call-expr",
      object: lowerExpr(node.object),
      method: lowerExpr(node.method),
      args: node.args.map(lowerExpr)
    });
  }
  if ((node.tag === "object")) {
    return ({
      node: node,
      tag: "object-expr",
      fields: node.fields.map((f) => {
        if (f.isMethod) {
          return ({
            key: f.key,
            isMethod: true,
            params: f.params,
            body: f.body.map(lowerStmt)
          });
        }
        if (f.isShorthand) {
          return ({
            key: f.key,
            isShorthand: true
          });
        }
        return ({
          key: f.key,
          isMethod: false,
          isShorthand: false,
          value: lowerExpr(f.value)
        });
      })
    });
  }
  if ((node.tag === "array")) {
    return ({
      node: node,
      tag: "array-expr",
      elements: node.elements.map(lowerExpr)
    });
  }
  if ((node.tag === "quasi")) {
    return ({
      node: node,
      tag: "quasi-expr",
      expr: lowerExpr(node.expr)
    });
  }
  if ((node.tag === "unquote")) {
    return ({
      node: node,
      tag: "unquote-expr",
      expr: lowerExpr(node.expr)
    });
  }
  if ((node.tag === "unquote-splicing")) {
    return ({
      node: node,
      tag: "unquote-splicing-expr",
      expr: lowerExpr(node.expr)
    });
  }
  if ((node.tag === "ternary")) {
    return ({
      node: node,
      tag: "ternary-expr",
      test: lowerExpr(node.test),
      ifthen: lowerExpr(node.ifthen),
      ifelse: lowerExpr(node.ifelse)
    });
  }
  if ((node.tag === "cond")) {
    return lowerCond(node);
  }
  if ((node.tag === "typeof-expr")) {
    return ({
      node: node,
      tag: "typeof-expr",
      expr: lowerExpr(node.expr)
    });
  }
  if ((node.tag === "type-assert")) {
    return ({
      node: node,
      tag: "type-assert",
      expr: lowerExpr(node.expr),
      ty: lowerTypeExpr(node.ty)
    });
  }
  if ((node.tag === "this")) {
    return node;
  }
  if ((node.tag === "super")) {
    return node;
  }
  if ((node.tag === "super-constructor-call")) {
    return ({
      node: node,
      tag: "super-constructor-call",
      args: node.args.map(lowerExpr)
    });
  }
  if ((node.tag === "super-method-call")) {
    return ({
      node: node,
      tag: "super-method-call",
      name: node.name,
      args: node.args.map(lowerExpr)
    });
  }
  if ((node.tag === "new")) {
    {
      let typeArgs  = (node.typeArgs ? node.typeArgs.map(lowerTypeExpr) : []);
      let args  = node.args.map(lowerExpr);
      return ({
        node: node,
        tag: "new-expr",
        name: node.name,
        typeArgs: typeArgs,
        args: args
      });
    }
  }
  if ((node.tag === "opt-chain")) {
    return ({
      node: node,
      tag: "opt-chain-expr",
      object: lowerExpr(node.object),
      key: node.key
    });
  }
  if ((node.tag === "null-coalesce")) {
    return ({
      node: node,
      tag: "null-coalesce-expr",
      left: lowerExpr(node.left),
      right: lowerExpr(node.right)
    });
  }
  if ((node.tag === "call")) {
    return lowerCall(node);
  }
  throw new Error((("lowerExpr: unexpected tag >" + node.tag) + "<"));
};
let lowerCall  = (node) => {
  if (((node.fn.tag === "identifier") && isOperator(node.fn.name))) {
    {
      let op  = node.fn.name;
      let args  = node.args.map(lowerExpr);
      if ((args.length === 1)) {
        return ({
          node: node,
          tag: "operator-expr",
          op: op,
          args: args
        });
      }
      {
        let result  = ({
          node: node,
          tag: "operator-expr",
          op: op,
          args: [args[0], args[1]]
        });
        let i  = 2;
        while ((i < args.length)) {
          result = ({
            node: node,
            tag: "operator-expr",
            op: op,
            args: [result, args[i]]
          });
          i = (i + 1);
        }
        return result;
      }
    }
  }
  {
    let typeArgs  = (node.typeArgs ? node.typeArgs.map(lowerTypeExpr) : []);
    let args  = node.args.map(lowerExpr);
    return ({
      node: node,
      tag: "call",
      fn: lowerExpr(node.fn),
      args: args,
      typeArgs: typeArgs
    });
  }
};
let lowerCond  = (node) => {
  {
    let clauses  = node.clauses;
    let i  = (clauses.length - 1);
    let last  = clauses[i];
    let isElse  = ((last.test.tag === "keyword") && (last.test.value === ":else"));
    let result  = (isElse ? lowerExpr(last.expr) : ({
      node: node,
      tag: "ternary-expr",
      test: lowerExpr(last.test),
      ifthen: lowerExpr(last.expr),
      ifelse: ({
        tag: "literal",
        value: undefined
      })
    }));
    i = (i - 1);
    while ((i >= 0)) {
      {
        let c  = clauses[i];
        result = ({
          node: node,
          tag: "ternary-expr",
          test: lowerExpr(c.test),
          ifthen: lowerExpr(c.expr),
          ifelse: result
        });
      }
      i = (i - 1);
    }
    return result;
  }
};
let lowerTypeExpr  = (node) => {
  if ((node.tag === "type-id")) {
    return node;
  }
  if ((node.tag === "type-union")) {
    return ({
      node: node,
      tag: "type-union",
      members: node.members.map(lowerTypeExpr)
    });
  }
  if ((node.tag === "type-intersection")) {
    return ({
      node: node,
      tag: "type-intersection",
      members: node.members.map(lowerTypeExpr)
    });
  }
  if ((node.tag === "type-array")) {
    return ({
      node: node,
      tag: "type-array",
      element: lowerTypeExpr(node.element)
    });
  }
  if ((node.tag === "type-app")) {
    {
      let lowerCallee  = lowerTypeExpr(node.callee);
      let reserved  = ["union", "intersect", "array", "tuple", "tfn", "tlit", "keyof", "typeof", "index", "cond", "infer", "mapped", "template", "rest", "readonly", "type-params", "type-args", "extends", "default", "modifiers"];
      if (((lowerCallee.tag === "type-id") && reserved.includes(lowerCallee.name))) {
        throw new Error(("Invalid type application: reserved keyword used as constructor: " + lowerCallee.name));
      }
      return ({
        node: node,
        tag: "type-app",
        callee: lowerCallee,
        args: node.args.map(lowerTypeExpr)
      });
    }
  }
  if ((node.tag === "type-tuple")) {
    return ({
      node: node,
      tag: "type-tuple",
      elements: node.elements.map((el) => {
        return ({
          node: node,
          tag: el.tag,
          name: el.name,
          type: lowerTypeExpr(el.type)
        });
      })
    });
  }
  if ((node.tag === "type-fn")) {
    return ({
      node: node,
      tag: "type-fn",
      typeParams: node.typeParams.map((p) => {
        return ({
          name: p.name,
          constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
          default: (p.default ? lowerTypeExpr(p.default) : undefined)
        });
      }),
      params: node.params.map((p) => {
        return ({
          name: p.name,
          optional: p.optional,
          type: lowerTypeExpr(p.type)
        });
      }),
      result: lowerTypeExpr(node.result)
    });
  }
  if ((node.tag === "type-obj")) {
    return ({
      node: node,
      tag: "type-obj",
      props: node.props.map((p) => {
        return ({
          readonly: p.readonly,
          name: p.name,
          optional: p.optional,
          type: lowerTypeExpr(p.type)
        });
      })
    });
  }
  if ((node.tag === "type-literal")) {
    return node;
  }
  if ((node.tag === "type-keyof")) {
    return ({
      node: node,
      tag: "type-keyof",
      operand: lowerTypeExpr(node.operand)
    });
  }
  if ((node.tag === "type-typeof")) {
    return node;
  }
  if ((node.tag === "type-index")) {
    return ({
      node: node,
      tag: "type-index",
      object: lowerTypeExpr(node.object),
      index: lowerTypeExpr(node.index)
    });
  }
  if ((node.tag === "type-cond")) {
    return ({
      node: node,
      tag: "type-cond",
      subject: lowerTypeExpr(node.subject),
      constraint: lowerTypeExpr(node.constraint),
      trueBranch: lowerTypeExpr(node.trueBranch),
      falseBranch: lowerTypeExpr(node.falseBranch)
    });
  }
  if ((node.tag === "type-infer")) {
    return node;
  }
  if ((node.tag === "type-mapped")) {
    return ({
      node: node,
      tag: "type-mapped",
      binding: node.binding,
      constraint: lowerTypeExpr(node.constraint),
      modifiers: node.modifiers,
      value: lowerTypeExpr(node.value)
    });
  }
  if ((node.tag === "type-template")) {
    return ({
      node: node,
      tag: "type-template",
      parts: node.parts.map((p) => {
        if ((p.tag === "str")) {
          return p;
        }
        return ({
          node: node,
          tag: "type",
          type: lowerTypeExpr(p.type)
        });
      })
    });
  }
  throw new Error((("lowerTypeExpr: unexpected tag >" + node.tag) + "<"));
};
export { lowerProgram };
