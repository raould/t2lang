import { formatSpan } from "./Stage10-spans";
import { parseForm } from "./Stage10-parse-form";
const isOperator  = (name) => {
  {
    let ops  = ["<", ">", "<=", ">=", "&&", "||", "!=", "!==", "==", "===", "+", "-", "*", "/", "%", "^", "!"];
    return ops.includes(name);
  }
};
const lowerProgram  = (node) => {
  {
    let body  = node.body.map(lowerTopLevel);
    return {
      node: node,
      id: node.id,
      tag: "program",
      body: body
    };
  }
};
const lowerTopLevel  = (node, isMacroMode) => {
  if ((node.tag === "defmacro")) {
    return lowerDefmacro(node, isMacroMode);
  }
  if ((node.tag === "macro-time-fn-def")) {
    return lowerMacroTimeFnDef(node);
  }
  if ((node.tag === "macro-import")) {
    return lowerMacroImport(node);
  }
  if ((node.tag === "macro-export")) {
    return lowerMacroExport(node);
  }
  if ((node.tag === "let-decl")) {
    return lowerLetDecl(node);
  }
  if ((node.tag === "var-decl")) {
    return lowerVarDecl(node);
  }
  if ((node.tag === "const-decl")) {
    return lowerConstDecl(node);
  }
  if ((node.tag === "fn-decl")) {
    return lowerFnDecl(node);
  }
  if ((node.tag === "fn-o-decl")) {
    return lowerFnODecl(node);
  }
  if ((node.tag === "type-alias")) {
    return lowerTypeAlias(node);
  }
  if ((node.tag === "interface-def")) {
    return lowerInterfaceDef(node);
  }
  if ((node.tag === "enum-def")) {
    return lowerEnumDef(node);
  }
  if ((node.tag === "class-def")) {
    return lowerClassDef(node);
  }
  if ((node.tag === "mixin-form")) {
    return {
      node: node,
      id: node.id,
      tag: "mixin-stmt",
      target: node.target,
      mixins: node.mixins,
      filter: node.filter
    };
  }
  if ((node.tag === "export-decl")) {
    return lowerExportDecl(node);
  }
  return lowerStmt(node);
};
const lowerTypeAlias  = (node) => {
  return {
    node: node,
    id: node.id,
    tag: "type-alias",
    name: node.name,
    typeParams: ((node.typeParams && (node.typeParams.length > 0)) ? node.typeParams.map((p) => {
      return {
        name: p.name,
        constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
        default: (p.default ? lowerTypeExpr(p.default) : undefined)
      };
    }) : []),
    type: lowerTypeExpr(node.type)
  };
};
const lowerInterfaceDef  = (node) => {
  return {
    node: node,
    id: node.id,
    tag: "interface-def",
    name: node.name,
    typeParams: ((node.typeParams && (node.typeParams.length > 0)) ? node.typeParams.map((p) => {
      return {
        name: p.name,
        constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
        default: (p.default ? lowerTypeExpr(p.default) : undefined)
      };
    }) : []),
    extends: node.extends.map(lowerTypeExpr),
    body: lowerTypeExpr(node.body)
  };
};
const lowerEnumDef  = (node) => {
  return {
    node: node,
    id: node.id,
    tag: "enum-def",
    name: node.name,
    members: node.members
  };
};
const lowerTypedParam  = (node) => {
  return {
    name: node.name,
    optional: node.optional,
    typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined)
  };
};
const lowerFnoParam  = (param) => {
  return {
    modifiers: param.modifiers,
    name: param.name,
    optional: param.optional,
    typeAnnotation: (param.typeAnnotation ? lowerTypeExpr(param.typeAnnotation) : undefined),
    defaultExpr: (param.defaultExpr ? lowerExpr(param.defaultExpr) : undefined)
  };
};
const lowerFieldDef  = (node) => {
  return {
    node: node,
    id: node.id,
    tag: "field-def",
    modifiers: node.modifiers,
    name: node.name,
    typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined),
    init: (node.init ? lowerExpr(node.init) : undefined)
  };
};
const lowerConstructorParam  = (node) => {
  return {
    id: node.id,
    name: node.name,
    optional: node.optional,
    typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined),
    modifiers: node.modifiers
  };
};
const lowerConstructorDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerConstructorParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "constructor-def",
      sig: {
        params: params,
        returnType: returnType
      },
      body: body
    };
  }
};
const lowerClassMethodDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "class-method-def",
      modifiers: node.modifiers,
      computed: (node.computed ? true : false),
      name: node.name,
      key: (node.key ? lowerExpr(node.key) : undefined),
      sig: {
        params: params,
        returnType: returnType
      },
      body: body
    };
  }
};
const lowerAbstractMethodDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    return {
      node: node,
      id: node.id,
      tag: "abstract-method-def",
      modifiers: node.modifiers,
      computed: (node.computed ? true : false),
      name: node.name,
      key: (node.key ? lowerExpr(node.key) : undefined),
      sig: {
        params: params,
        returnType: returnType
      }
    };
  }
};
const lowerGetterDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "getter-def",
      modifiers: node.modifiers,
      computed: (node.computed ? true : false),
      name: node.name,
      key: (node.key ? lowerExpr(node.key) : undefined),
      sig: {
        params: params,
        returnType: returnType
      },
      body: body
    };
  }
};
const lowerSetterDef  = (node) => {
  {
    let params  = node.sig.params.map(lowerTypedParam);
    let returnType  = (node.sig.returnType ? lowerTypeExpr(node.sig.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "setter-def",
      modifiers: node.modifiers,
      computed: (node.computed ? true : false),
      name: node.name,
      key: (node.key ? lowerExpr(node.key) : undefined),
      sig: {
        params: params,
        returnType: returnType
      },
      body: body
    };
  }
};
const lowerMethodODef  = (node) => {
  {
    let params  = node.params.map(lowerFnoParam);
    let restType  = (node.restType ? lowerTypeExpr(node.restType) : undefined);
    let returnType  = (node.returnType ? lowerTypeExpr(node.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "method-o-def",
      modifiers: node.modifiers,
      computed: (node.computed ? true : false),
      name: node.name,
      key: (node.key ? lowerExpr(node.key) : undefined),
      params: params,
      rest: node.rest,
      restType: restType,
      returnType: returnType,
      body: body
    };
  }
};
const lowerAbstractMethodODef  = (node) => {
  {
    let params  = node.params.map(lowerFnoParam);
    let restType  = (node.restType ? lowerTypeExpr(node.restType) : undefined);
    let returnType  = (node.returnType ? lowerTypeExpr(node.returnType) : undefined);
    return {
      node: node,
      id: node.id,
      tag: "abstract-method-o-def",
      modifiers: node.modifiers,
      computed: (node.computed ? true : false),
      name: node.name,
      key: (node.key ? lowerExpr(node.key) : undefined),
      params: params,
      rest: node.rest,
      restType: restType,
      returnType: returnType
    };
  }
};
const lowerConstructorODef  = (node) => {
  {
    let params  = node.params.map(lowerFnoParam);
    let restType  = (node.restType ? lowerTypeExpr(node.restType) : undefined);
    let returnType  = (node.returnType ? lowerTypeExpr(node.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "constructor-o-def",
      params: params,
      rest: node.rest,
      restType: restType,
      returnType: returnType,
      body: body
    };
  }
};
const lowerClassElement  = (node) => {
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
  if ((node.tag === "method-o-def")) {
    return lowerMethodODef(node);
  }
  if ((node.tag === "abstract-method-o-def")) {
    return lowerAbstractMethodODef(node);
  }
  if ((node.tag === "constructor-o-def")) {
    return lowerConstructorODef(node);
  }
  throw new Error(((("lowerClassElement: unexpected tag >" + node.tag) + "< at ") + formatSpan(node.id)));
};
const expandConstructorOModifiers  = (elements, spanId) => {
  {
    let result  = [];
    elements.forEach((el) => {
      if ((el.tag !== "constructor-o-def")) {
        result.push(el);
        return;
      }
      {
        let modifiedParams  = el.params.filter((p) => {
          return (p.modifiers && (p.modifiers.length > 0));
        });
        if ((modifiedParams.length === 0)) {
          result.push(el);
          return;
        }
        modifiedParams.forEach((p) => {
          result.push({
            tag: "field-def",
            id: spanId,
            modifiers: p.modifiers,
            name: p.name,
            typeAnnotation: p.typeAnnotation,
            init: undefined
          });
        });
        {
          let syntheticStmts  = modifiedParams.map((p) => {
            return {
              tag: "assign-prop-stmt",
              id: spanId,
              target: {
                tag: "prop-access-expr",
                object: {
                  tag: "this",
                  id: spanId
                },
                key: p.name
              },
              value: {
                tag: "identifier",
                name: p.name,
                id: spanId
              }
            };
          });
          let cleanParams  = el.params.map((p) => {
            return {
              modifiers: [],
              name: p.name,
              optional: p.optional,
              typeAnnotation: p.typeAnnotation,
              defaultExpr: p.defaultExpr
            };
          });
          result.push({
            tag: "constructor-o-def",
            id: el.id,
            params: cleanParams,
            rest: el.rest,
            restType: el.restType,
            returnType: el.returnType,
            body: syntheticStmts.concat(el.body)
          });
        }
      }
    });
    return result;
  }
};
const lowerClassDef  = (node) => {
  if ((node.extendsType && (node.extendsType.name === "MixinBase"))) {
    node.body.elements.forEach((member) => {
      if (((member.tag === "field-def") && (!member.modifiers.includes("declare")))) {
        throw new Error(((((("mixin class field '" + member.name) + "' must use 'declare' — mixin classes cannot own fields, only declare requirements") + " (at ") + formatSpan(member.id)) + ")"));
      }
    });
  }
  {
    let tparams  = node.typeParams.map((p) => {
      return {
        name: p.name,
        constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
        default: (p.default ? lowerTypeExpr(p.default) : undefined)
      };
    });
    let extendsType  = (node.extendsType ? lowerTypeExpr(node.extendsType) : undefined);
    let implementsTypes  = node.implementsTypes.map(lowerTypeExpr);
    let elements  = expandConstructorOModifiers(node.body.elements.map(lowerClassElement), node.id);
    return {
      node: node,
      id: node.id,
      tag: "class-def",
      modifiers: node.modifiers,
      name: node.name,
      typeParams: tparams,
      extendsType: extendsType,
      implementsTypes: implementsTypes,
      body: {
        tag: "class-body",
        elements: elements
      }
    };
  }
};
const lowerAnonClassDef  = (node) => {
  {
    let extendsType  = (node.extendsType ? lowerTypeExpr(node.extendsType) : undefined);
    let implementsTypes  = node.implementsTypes.map(lowerTypeExpr);
    let elements  = expandConstructorOModifiers(node.body.elements.map(lowerClassElement), node.id);
    return {
      node: node,
      id: node.id,
      tag: "anon-class-def",
      modifiers: node.modifiers,
      extendsType: extendsType,
      implementsTypes: implementsTypes,
      body: {
        tag: "class-body",
        elements: elements
      }
    };
  }
};
const lowerExportDefaultClass  = (node) => {
  {
    let classNode  = node.classNode;
    if ((classNode.tag === "class-def")) {
      return {
        node: node,
        id: node.id,
        tag: "export-default-class-stmt",
        classNode: lowerClassDef(classNode)
      };
    }
    if ((classNode.tag === "anon-class-def")) {
      return {
        node: node,
        id: node.id,
        tag: "export-default-class-stmt",
        classNode: lowerAnonClassDef(classNode)
      };
    }
    throw new Error(((("lowerExportDefaultClass: unexpected tag >" + classNode.tag) + "< at ") + formatSpan(classNode.id)));
  }
};
const lowerExportDefaultDef  = (node) => {
  {
    let defNode  = node.defNode;
    let init  = defNode.init;
    if (((init.tag !== "lambda") && (init.tag !== "fn"))) {
      throw new Error(("export-default: initializer must be a function at " + formatSpan(init.id)));
    }
    {
      let body  = init.body.map(lowerStmt);
      let defName  = (defNode.name ? defNode.name : ((defNode.nameOrPattern && (defNode.nameOrPattern.tag === "plain")) ? defNode.nameOrPattern.name : undefined));
      return {
        node: node,
        id: node.id,
        tag: "export-default-fn-decl",
        name: defName,
        params: init.params.map(lowerTypedParam),
        rest: init.rest,
        restType: (init.restType ? lowerTypeExpr(init.restType) : undefined),
        returnType: (init.returnType ? lowerTypeExpr(init.returnType) : undefined),
        body: body
      };
    }
  }
};
const lowerMacroImport  = (node) => {
  return {
    node: node,
    id: node.id,
    tag: "macro-import-decl",
    path: node.path
  };
};
const lowerMacroExport  = (node) => {
  return {
    node: node,
    id: node.id,
    tag: "macro-export-decl",
    specs: node.specs
  };
};
const lowerDefmacro  = (node, isMacroMode) => {
  return {
    node: node,
    id: node.id,
    tag: "macro-def",
    name: node.name,
    params: node.params,
    rest: node.rest,
    scopeId: node.scopeId,
    body: []
  };
};
const lowerMacroTimeFnDef  = (node) => {
  {
    let init  = lowerExpr(node.init);
    return {
      node: node,
      id: node.id,
      tag: "macro-time-fn-def",
      name: node.name,
      init: init
    };
  }
};
const lowerLetDecl  = (node) => {
  {
    let init  = lowerExpr(node.init);
    let typeAnnotation  = (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined);
    let nop  = (node.nameOrPattern ? node.nameOrPattern : (node.name ? {
      tag: "plain",
      name: node.name
    } : undefined));
    return {
      node: node,
      id: node.id,
      tag: "let-stmt",
      nameOrPattern: nop,
      typeAnnotation: typeAnnotation,
      init: init,
      meta: node.meta
    };
  }
};
const lowerVarDecl  = (node) => {
  {
    let init  = lowerExpr(node.init);
    let typeAnnotation  = (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined);
    let nop  = (node.nameOrPattern ? node.nameOrPattern : (node.name ? {
      tag: "plain",
      name: node.name
    } : undefined));
    return {
      node: node,
      id: node.id,
      tag: "var-stmt",
      nameOrPattern: nop,
      typeAnnotation: typeAnnotation,
      init: init,
      meta: node.meta
    };
  }
};
const lowerConstDecl  = (node) => {
  {
    let init  = lowerExpr(node.init);
    let typeAnnotation  = (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined);
    let nop  = (node.nameOrPattern ? node.nameOrPattern : (node.name ? {
      tag: "plain",
      name: node.name
    } : undefined));
    return {
      node: node,
      id: node.id,
      tag: "const-stmt",
      nameOrPattern: nop,
      typeAnnotation: typeAnnotation,
      init: init,
      meta: node.meta
    };
  }
};
const lowerFnDecl  = (node) => {
  {
    let params  = node.params.map(lowerTypedParam);
    let restType  = (node.restType ? lowerTypeExpr(node.restType) : undefined);
    let returnType  = (node.returnType ? lowerTypeExpr(node.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "fn-decl-stmt",
      name: node.name,
      meta: node.meta,
      params: params,
      rest: node.rest,
      restType: restType,
      returnType: returnType,
      body: body
    };
  }
};
const lowerFnODecl  = (node) => {
  {
    let params  = node.params.map(lowerFnoParam);
    let restType  = (node.restType ? lowerTypeExpr(node.restType) : undefined);
    let returnType  = (node.returnType ? lowerTypeExpr(node.returnType) : undefined);
    let body  = node.body.map(lowerStmt);
    return {
      node: node,
      id: node.id,
      tag: "fn-o-decl-stmt",
      name: node.name,
      params: params,
      rest: node.rest,
      restType: restType,
      returnType: returnType,
      body: body
    };
  }
};
const lowerExportDecl  = (node) => {
  {
    let inner  = node.decl;
    if ((inner.tag === "let-decl")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerLetDecl(inner)
      };
    }
    if ((inner.tag === "const-decl")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerConstDecl(inner)
      };
    }
    if ((inner.tag === "fn-decl")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerFnDecl(inner)
      };
    }
    if ((inner.tag === "class-def")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerClassDef(inner)
      };
    }
    if ((inner.tag === "interface-def")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerInterfaceDef(inner)
      };
    }
    if ((inner.tag === "enum-def")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerEnumDef(inner)
      };
    }
    if ((inner.tag === "type-alias")) {
      return {
        node: node,
        id: node.id,
        tag: "export-decl-stmt",
        decl: lowerTypeAlias(inner)
      };
    }
    throw new Error(((("lowerExportDecl: unknown inner tag >" + inner.tag) + "< at ") + formatSpan(inner.id)));
  }
};
const lowerStmt  = (node) => {
  if ((node.tag === "let")) {
    return lowerLetStar(node);
  }
  if ((node.tag === "var")) {
    return lowerVarStar(node);
  }
  if ((node.tag === "const*")) {
    return lowerConstStar(node);
  }
  if ((node.tag === "const")) {
    if (node.pattern) {
      return {
        node: node,
        id: node.id,
        tag: "const-stmt",
        pattern: node.pattern,
        init: lowerExpr(node.init)
      };
    }
    else {
      return {
        node: node,
        id: node.id,
        tag: "const-stmt",
        name: node.name,
        typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined),
        init: lowerExpr(node.init)
      };
    }
  }
  if ((node.tag === "if")) {
    return {
      node: node,
      id: node.id,
      tag: "if-stmt",
      test: lowerExpr(node.test),
      ifthen: node.ifthen.map(lowerStmt),
      ifelse: (node.ifelse ? node.ifelse.map(lowerStmt) : undefined)
    };
  }
  if ((node.tag === "while")) {
    return {
      node: node,
      id: node.id,
      tag: "while-stmt",
      test: lowerExpr(node.test),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "try")) {
    return {
      node: node,
      id: node.id,
      tag: "try-stmt",
      body: node.body.map(lowerStmt),
      catchClause: (node.catchClause ? {
        param: node.catchClause.param,
        body: node.catchClause.body.map(lowerStmt)
      } : undefined),
      finallyBody: (node.finallyBody ? node.finallyBody.map(lowerStmt) : undefined)
    };
  }
  if ((node.tag === "return")) {
    return {
      node: node,
      id: node.id,
      tag: "return-stmt",
      expr: (node.expr ? lowerExpr(node.expr) : undefined)
    };
  }
  if ((node.tag === "break")) {
    return {
      node: node,
      id: node.id,
      tag: "break-stmt"
    };
  }
  if ((node.tag === "continue")) {
    return {
      node: node,
      id: node.id,
      tag: "continue-stmt"
    };
  }
  if ((node.tag === "assign")) {
    return {
      node: node,
      id: node.id,
      tag: "assign-stmt",
      name: node.name,
      value: lowerExpr(node.value)
    };
  }
  if ((node.tag === "assign-prop")) {
    return {
      node: node,
      id: node.id,
      tag: "assign-prop-stmt",
      target: lowerExpr(node.target),
      value: lowerExpr(node.value)
    };
  }
  if ((node.tag === "compound-assign")) {
    if (node.target) {
      return {
        node: node,
        id: node.id,
        tag: "compound-assign-stmt",
        op: node.op,
        target: lowerExpr(node.target),
        value: lowerExpr(node.value)
      };
    }
    else {
      return {
        node: node,
        id: node.id,
        tag: "compound-assign-stmt",
        op: node.op,
        name: node.name,
        value: lowerExpr(node.value)
      };
    }
  }
  if ((node.tag === "throw")) {
    return {
      node: node,
      id: node.id,
      tag: "throw-stmt",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "import")) {
    return lowerImport(node);
  }
  if ((node.tag === "export-binding")) {
    return {
      node: node,
      id: node.id,
      tag: "export-binding-stmt",
      name: node.name,
      init: lowerExpr(node.init)
    };
  }
  if ((node.tag === "export-default")) {
    return {
      node: node,
      id: node.id,
      tag: "export-default-stmt",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "export-default-class")) {
    return lowerExportDefaultClass(node);
  }
  if ((node.tag === "export-default-def")) {
    return lowerExportDefaultDef(node);
  }
  if ((node.tag === "export-named")) {
    return {
      node: node,
      id: node.id,
      tag: "export-named-stmt",
      pairs: node.pairs
    };
  }
  if ((node.tag === "export-from")) {
    return {
      node: node,
      id: node.id,
      tag: "export-from-stmt",
      source: node.source,
      pairs: node.pairs
    };
  }
  if ((node.tag === "export-all-from")) {
    return {
      node: node,
      id: node.id,
      tag: "export-all-from-stmt",
      source: node.source
    };
  }
  if ((node.tag === "import-type")) {
    return {
      node: node,
      id: node.id,
      tag: "import-type-stmt",
      kind: node.kind,
      names: node.names,
      source: node.source
    };
  }
  if ((node.tag === "export-type")) {
    return {
      node: node,
      id: node.id,
      tag: "export-type-stmt",
      pairs: node.pairs
    };
  }
  if ((node.tag === "export-type-from")) {
    return {
      node: node,
      id: node.id,
      tag: "export-type-from-stmt",
      source: node.source,
      pairs: node.pairs
    };
  }
  if ((node.tag === "export-type-all-from")) {
    return {
      node: node,
      id: node.id,
      tag: "export-type-all-from-stmt",
      source: node.source
    };
  }
  if ((node.tag === "export-ns-from")) {
    return {
      node: node,
      id: node.id,
      tag: "export-ns-from-stmt",
      ns: node.ns,
      source: node.source
    };
  }
  if ((node.tag === "switch")) {
    return lowerSwitch(node);
  }
  if ((node.tag === "for")) {
    return {
      node: node,
      id: node.id,
      tag: "for-stmt",
      initName: node.initName,
      initExpr: lowerExpr(node.initExpr),
      test: lowerExpr(node.test),
      updateName: node.updateName,
      updateExpr: lowerExpr(node.updateExpr),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "for-in")) {
    return {
      node: node,
      id: node.id,
      tag: "for-in-stmt",
      name: node.name,
      object: lowerExpr(node.object),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "for-of")) {
    return {
      node: node,
      id: node.id,
      tag: "for-of-stmt",
      name: node.name,
      iterable: lowerExpr(node.iterable),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "for-await")) {
    return {
      node: node,
      id: node.id,
      tag: "for-await-stmt",
      name: node.name,
      iterable: lowerExpr(node.iterable),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "fn-o-decl")) {
    return lowerFnODecl(node);
  }
  if ((node.tag === "expr-stmt")) {
    return {
      node: node,
      id: node.id,
      tag: "expr-stmt",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "quasi")) {
    {
      let formatted  = formatSpan(node.id);
      let check  = ((undefined == formatted) ? "" : (" — check macro that generates this form at " + formatted));
      throw new Error(("unevaluated quasi template in statement position" + check));
    }
  }
  if ((node.tag === "block")) {
    return {
      node: node,
      id: node.id,
      tag: "block-stmt",
      body: node.body.map(lowerStmt)
    };
  }
  if (((node.tag === "identifier") || ((node.tag === "call") || ((node.tag === "new") || ((node.tag === "literal") || ((node.tag === "prop-access") || ((node.tag === "binary-op") || (node.tag === "unary-op")))))))) {
    return {
      node: node,
      id: node.id,
      tag: "expr-stmt",
      expr: lowerExpr(node)
    };
  }
  if ((node.tag === "macro-expr-call")) {
    throw new Error(("macro-expr-call (=>) used in statement position — did you mean =& ? at " + formatSpan(node.id)));
  }
  if ((node.tag === "macro-body-call")) {
    throw new Error(("macro-body-call (=&) was not expanded at " + formatSpan(node.id)));
  }
  throw new Error(((("lowerStmt: unexpected tag >" + node.tag) + "< at ") + formatSpan(node.id)));
};
const lowerLetStar  = (node) => {
  {
    let stmts  = [];
    node.bindings.forEach((b) => {
      {
        let nop  = (b.nameOrPattern ? b.nameOrPattern : (b.name ? {
          tag: "plain",
          name: b.name
        } : undefined));
        stmts.push({
          node: node,
          id: node.id,
          tag: "let-stmt",
          nameOrPattern: nop,
          typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined),
          init: (b.init ? lowerExpr(b.init) : undefined)
        });
      }
    });
    node.body.forEach((s) => {
      stmts.push(lowerStmt(s));
    });
    if (((node.body.length === 0) && (stmts.length === 1))) {
      return stmts[0];
    }
    if ((node.body.length === 0)) {
      return {
        node: node,
        id: node.id,
        tag: "block-stmt",
        body: stmts,
        noBody: true
      };
    }
    return {
      node: node,
      id: node.id,
      tag: "block-stmt",
      body: stmts
    };
  }
};
const lowerVarStar  = (node) => {
  {
    let stmts  = [];
    node.bindings.forEach((b) => {
      {
        let nop  = (b.nameOrPattern ? b.nameOrPattern : (b.name ? {
          tag: "plain",
          name: b.name
        } : undefined));
        stmts.push({
          node: node,
          id: node.id,
          tag: "var-stmt",
          nameOrPattern: nop,
          typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined),
          init: (b.init ? lowerExpr(b.init) : undefined)
        });
      }
    });
    node.body.forEach((s) => {
      stmts.push(lowerStmt(s));
    });
    if (((node.body.length === 0) && (stmts.length === 1))) {
      return stmts[0];
    }
    if ((node.body.length === 0)) {
      return {
        node: node,
        id: node.id,
        tag: "block-stmt",
        body: stmts,
        noBody: true
      };
    }
    return {
      node: node,
      id: node.id,
      tag: "block-stmt",
      body: stmts
    };
  }
};
const lowerConstStar  = (node) => {
  {
    let stmts  = [];
    node.bindings.forEach((b) => {
      {
        let nop  = (b.nameOrPattern ? b.nameOrPattern : (b.name ? {
          tag: "plain",
          name: b.name
        } : undefined));
        stmts.push({
          node: node,
          id: node.id,
          tag: "const-stmt",
          nameOrPattern: nop,
          typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined),
          init: (b.init ? lowerExpr(b.init) : undefined)
        });
      }
    });
    node.body.forEach((s) => {
      stmts.push(lowerStmt(s));
    });
    if ((node.body.length === 0)) {
      return {
        node: node,
        id: node.id,
        tag: "block-stmt",
        body: stmts,
        noBody: true
      };
    }
    return {
      node: node,
      id: node.id,
      tag: "block-stmt",
      body: stmts
    };
  }
};
const lowerImport  = (node) => {
  if ((!node.spec)) {
    return {
      node: node,
      id: node.id,
      tag: "import-stmt",
      defaultName: node.defaultName,
      namespaceName: node.namespaceName,
      named: node.named,
      source: node.source
    };
  }
  {
    let spec  = node.spec;
    let defaultName  = undefined;
    let namespaceName  = undefined;
    let named  = undefined;
    if (spec) {
      spec.fields.forEach((f) => {
        if ((f.key === "default")) {
          defaultName = f.value.value;
        }
        if ((f.key === "namespace")) {
          namespaceName = f.value.value;
        }
        if ((f.key === "named")) {
          named = f.value.elements.map((el) => {
            {
              let nm  = undefined;
              let al  = undefined;
              el.fields.forEach((ff) => {
                if ((ff.key === "name")) {
                  nm = ff.value.value;
                }
                if ((ff.key === "as")) {
                  al = ff.value.value;
                }
              });
              return {
                name: nm,
                alias: al
              };
            }
          });
        }
      });
    }
    return {
      node: node,
      id: node.id,
      tag: "import-stmt",
      defaultName: defaultName,
      namespaceName: namespaceName,
      named: named,
      source: node.source
    };
  }
};
const lowerSwitch  = (node) => {
  {
    let discriminant  = lowerExpr(node.discriminant);
    let cases  = node.cases.map((c) => {
      return {
        test: lowerExpr(c.test),
        body: c.body.map(lowerStmt)
      };
    });
    let defaultCase  = (node.defaultCase ? {
      body: node.defaultCase.body.map(lowerStmt)
    } : undefined);
    return {
      node: node,
      id: node.id,
      tag: "switch-stmt",
      discriminant: discriminant,
      cases: cases,
      defaultCase: defaultCase
    };
  }
};
const lowerExpr  = (node) => {
  if ((node.tag === "prop-access")) {
    return {
      node: node,
      id: node.id,
      tag: "prop-access-expr",
      object: lowerExpr(node.object),
      key: node.key
    };
  }
  if ((node.tag === "index-access")) {
    return {
      node: node,
      id: node.id,
      tag: "index-access-expr",
      object: lowerExpr(node.object),
      index: lowerExpr(node.index)
    };
  }
  if ((node.tag === "subscript-access")) {
    return {
      node: node,
      id: node.id,
      tag: "subscript-access-expr",
      object: lowerExpr(node.object),
      rawIndex: node.rawIndex
    };
  }
  if ((node.tag === "literal")) {
    return node;
  }
  if ((node.tag === "raw-template")) {
    return node;
  }
  if ((node.tag === "template-expr")) {
    return {
      node: node,
      id: node.id,
      tag: "template-expr",
      parts: node.parts.map((p) => {
        if ((p.tag === "str")) {
          return p;
        }
        return {
          node: node,
          id: node.id,
          tag: "hole",
          expr: lowerExpr(p.expr)
        };
      })
    };
  }
  if ((node.tag === "identifier")) {
    return node;
  }
  if ((node.tag === "lambda")) {
    return {
      node: node,
      id: node.id,
      tag: "lambda",
      params: node.params.map(lowerTypedParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "fn")) {
    return {
      node: node,
      id: node.id,
      tag: "fn",
      params: node.params.map(lowerTypedParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "async-lambda")) {
    return {
      node: node,
      id: node.id,
      tag: "async-lambda",
      params: node.params.map(lowerTypedParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "iife")) {
    return {
      node: node,
      id: node.id,
      tag: "iife",
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "iife-async")) {
    return {
      node: node,
      id: node.id,
      tag: "iife-async",
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "async-fn")) {
    return {
      node: node,
      id: node.id,
      tag: "async-fn",
      params: node.params.map(lowerTypedParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "generator-fn")) {
    return {
      node: node,
      id: node.id,
      tag: "generator-fn",
      params: node.params.map(lowerTypedParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "async-generator-fn")) {
    return {
      node: node,
      id: node.id,
      tag: "async-generator-fn",
      params: node.params.map(lowerTypedParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "fn-o")) {
    return {
      node: node,
      id: node.id,
      tag: "fn-o",
      params: node.params.map(lowerFnoParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "lambda-o")) {
    return {
      node: node,
      id: node.id,
      tag: "lambda-o",
      params: node.params.map(lowerFnoParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "async-fn-o")) {
    return {
      node: node,
      id: node.id,
      tag: "async-fn-o",
      params: node.params.map(lowerFnoParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "async-lambda-o")) {
    return {
      node: node,
      id: node.id,
      tag: "async-lambda-o",
      params: node.params.map(lowerFnoParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "generator-fn-o")) {
    return {
      node: node,
      id: node.id,
      tag: "generator-fn-o",
      params: node.params.map(lowerFnoParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "async-generator-fn-o")) {
    return {
      node: node,
      id: node.id,
      tag: "async-generator-fn-o",
      params: node.params.map(lowerFnoParam),
      rest: node.rest,
      restType: (node.restType ? lowerTypeExpr(node.restType) : undefined),
      returnType: (node.returnType ? lowerTypeExpr(node.returnType) : undefined),
      body: node.body.map(lowerStmt)
    };
  }
  if ((node.tag === "await")) {
    return {
      node: node,
      id: node.id,
      tag: "await-expr",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "yield")) {
    return {
      node: node,
      id: node.id,
      tag: "yield-expr",
      expr: (node.expr ? lowerExpr(node.expr) : undefined)
    };
  }
  if ((node.tag === "yield*")) {
    return {
      node: node,
      id: node.id,
      tag: "yield-star-expr",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "bind-expr")) {
    return {
      node: node,
      id: node.id,
      tag: "bind-expr",
      fn: lowerExpr(node.fn),
      thisArg: lowerExpr(node.thisArg),
      args: node.args.map(lowerExpr)
    };
  }
  if ((node.tag === "method-call-expr")) {
    return {
      node: node,
      id: node.id,
      tag: "method-call-expr",
      object: lowerExpr(node.object),
      method: lowerExpr(node.method),
      args: node.args.map(lowerExpr)
    };
  }
  if ((node.tag === "object")) {
    return {
      node: node,
      id: node.id,
      tag: "object-expr",
      fields: node.fields.map((f) => {
        if (f.computed) {
          if (f.isMethod) {
            return {
              computed: true,
              keyExpr: lowerExpr(f.keyExpr),
              isMethod: true,
              params: f.params,
              body: f.body.map(lowerStmt)
            };
          }
          return {
            computed: true,
            keyExpr: lowerExpr(f.keyExpr),
            isMethod: false,
            isShorthand: false,
            value: lowerExpr(f.value)
          };
        }
        if (f.isMethod) {
          return {
            computed: false,
            key: f.key,
            isMethod: true,
            params: f.params,
            body: f.body.map(lowerStmt)
          };
        }
        if (f.isShorthand) {
          return {
            computed: false,
            key: f.key,
            isShorthand: true
          };
        }
        return {
          computed: false,
          key: f.key,
          isMethod: false,
          isShorthand: false,
          value: lowerExpr(f.value)
        };
      })
    };
  }
  if ((node.tag === "array")) {
    return {
      node: node,
      id: node.id,
      tag: "array-expr",
      elements: node.elements.map(lowerExpr)
    };
  }
  if ((node.tag === "spread")) {
    return {
      node: node,
      id: node.id,
      tag: "spread-expr",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "quasi")) {
    {
      let parsedExpr  = parseForm(node.sform, node.id, null);
      return {
        node: node,
        id: node.id,
        tag: "quasi-expr",
        expr: lowerExpr(parsedExpr)
      };
    }
  }
  if ((node.tag === "unquote")) {
    return {
      node: node,
      id: node.id,
      tag: "unquote-expr",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "unquote-splicing")) {
    return {
      node: node,
      id: node.id,
      tag: "unquote-splicing-expr",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "ternary")) {
    return {
      node: node,
      id: node.id,
      tag: "ternary-expr",
      test: lowerExpr(node.test),
      ifthen: lowerExpr(node.ifthen),
      ifelse: lowerExpr(node.ifelse)
    };
  }
  if ((node.tag === "cond")) {
    return lowerCond(node);
  }
  if ((node.tag === "typeof-expr")) {
    return {
      node: node,
      id: node.id,
      tag: "typeof-expr",
      expr: lowerExpr(node.expr)
    };
  }
  if ((node.tag === "type-assert")) {
    return {
      node: node,
      id: node.id,
      tag: "type-assert",
      expr: lowerExpr(node.expr),
      ty: lowerTypeExpr(node.ty)
    };
  }
  if ((node.tag === "this")) {
    return node;
  }
  if ((node.tag === "super")) {
    return node;
  }
  if ((node.tag === "super-constructor-call")) {
    return {
      node: node,
      id: node.id,
      tag: "super-constructor-call",
      args: node.args.map(lowerExpr)
    };
  }
  if ((node.tag === "super-method-call")) {
    return {
      node: node,
      id: node.id,
      tag: "super-method-call",
      name: node.name,
      args: node.args.map(lowerExpr)
    };
  }
  if ((node.tag === "new")) {
    {
      let typeArgs  = (node.typeArgs ? node.typeArgs.map(lowerTypeExpr) : []);
      let args  = node.args.map(lowerExpr);
      return {
        node: node,
        id: node.id,
        tag: "new-expr",
        name: node.name,
        typeArgs: typeArgs,
        args: args
      };
    }
  }
  if ((node.tag === "opt-chain")) {
    return {
      node: node,
      id: node.id,
      tag: "opt-chain-expr",
      object: lowerExpr(node.object),
      key: node.key
    };
  }
  if ((node.tag === "opt-chain-index")) {
    return {
      node: node,
      id: node.id,
      tag: "opt-chain-index-expr",
      object: lowerExpr(node.object),
      index: lowerExpr(node.index)
    };
  }
  if ((node.tag === "null-coalesce")) {
    return {
      node: node,
      id: node.id,
      tag: "null-coalesce-expr",
      left: lowerExpr(node.left),
      right: lowerExpr(node.right)
    };
  }
  if ((node.tag === "call")) {
    return lowerCall(node);
  }
  if ((node.tag === "binary-op")) {
    return {
      node: node,
      id: node.id,
      tag: "binary-op",
      op: node.op,
      left: lowerExpr(node.left),
      right: lowerExpr(node.right)
    };
  }
  if ((node.tag === "unary-op")) {
    return {
      node: node,
      id: node.id,
      tag: "unary-op",
      op: node.op,
      operand: lowerExpr(node.operand)
    };
  }
  if ((node.tag === "macro-expr-call")) {
    throw new Error(("macro-expr-call (=>) was not expanded at " + formatSpan(node.id)));
  }
  throw new Error(((("lowerExpr: unexpected tag >" + node.tag) + "< at ") + formatSpan(node.id)));
};
const lowerCall  = (node) => {
  if (((node.fn.tag === "identifier") && isOperator(node.fn.name))) {
    {
      let op  = node.fn.name;
      let args  = node.args.map(lowerExpr);
      if ((args.length === 1)) {
        return {
          node: node,
          id: node.id,
          tag: "operator-expr",
          op: op,
          args: args
        };
      }
      {
        let result  = {
          node: node,
          tag: "operator-expr",
          op: op,
          args: [args[0], args[1]]
        };
        let i  = 2;
        while ((i < args.length)) {
          result = {
            node: node,
            tag: "operator-expr",
            op: op,
            args: [result, args[i]]
          };
          i = (i + 1);
        }
        return result;
      }
    }
  }
  {
    let typeArgs  = (node.typeArgs ? node.typeArgs.map(lowerTypeExpr) : []);
    let args  = node.args.map(lowerExpr);
    return {
      node: node,
      id: node.id,
      tag: "call",
      fn: lowerExpr(node.fn),
      args: args,
      typeArgs: typeArgs
    };
  }
};
const lowerCond  = (node) => {
  {
    let clauses  = node.clauses;
    let i  = (clauses.length - 1);
    let result  = ((node.elseExpr !== undefined) ? lowerExpr(node.elseExpr) : {
      tag: "literal",
      value: undefined
    });
    while ((i >= 0)) {
      {
        let c  = clauses[i];
        result = {
          node: node,
          tag: "ternary-expr",
          test: lowerExpr(c.test),
          ifthen: lowerExpr(c.expr),
          ifelse: result
        };
      }
      i = (i - 1);
    }
    return result;
  }
};
const lowerTypeExpr  = (node) => {
  if ((node.tag === "type-id")) {
    return node;
  }
  if ((node.tag === "type-union")) {
    return {
      node: node,
      id: node.id,
      tag: "type-union",
      members: node.members.map(lowerTypeExpr)
    };
  }
  if ((node.tag === "type-intersection")) {
    return {
      node: node,
      id: node.id,
      tag: "type-intersection",
      members: node.members.map(lowerTypeExpr)
    };
  }
  if ((node.tag === "type-array")) {
    return {
      node: node,
      id: node.id,
      tag: "type-array",
      element: lowerTypeExpr(node.element)
    };
  }
  if ((node.tag === "type-app")) {
    {
      let lowerCallee  = lowerTypeExpr(node.callee);
      let reserved  = ["union", "intersect", "array", "tuple", "tfn", "tlit", "keyof", "typeof", "index", "cond", "infer", "mapped", "template", "rest", "readonly", "type-params", "type-args", "extends", "default", "modifiers"];
      if (((lowerCallee.tag === "type-id") && reserved.includes(lowerCallee.name))) {
        throw new Error(((("Invalid type application: reserved keyword used as constructor: " + lowerCallee.name) + " at ") + formatSpan(lowerCallee.id)));
      }
      return {
        node: node,
        id: node.id,
        tag: "type-app",
        callee: lowerCallee,
        args: node.args.map(lowerTypeExpr)
      };
    }
  }
  if ((node.tag === "type-tuple")) {
    return {
      node: node,
      id: node.id,
      tag: "type-tuple",
      elements: node.elements.map((el) => {
        return {
          node: node,
          id: node.id,
          tag: el.tag,
          name: el.name,
          type: lowerTypeExpr(el.type)
        };
      })
    };
  }
  if ((node.tag === "type-fn")) {
    return {
      node: node,
      id: node.id,
      tag: "type-fn",
      typeParams: node.typeParams.map((p) => {
        return {
          name: p.name,
          constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined),
          default: (p.default ? lowerTypeExpr(p.default) : undefined)
        };
      }),
      params: node.params.map((p) => {
        return {
          name: p.name,
          optional: p.optional,
          type: lowerTypeExpr(p.type)
        };
      }),
      result: lowerTypeExpr(node.result)
    };
  }
  if ((node.tag === "type-obj")) {
    return {
      node: node,
      id: node.id,
      tag: "type-obj",
      props: node.props.map((p) => {
        return {
          readonly: p.readonly,
          name: p.name,
          optional: p.optional,
          type: lowerTypeExpr(p.type)
        };
      })
    };
  }
  if ((node.tag === "type-literal")) {
    return node;
  }
  if ((node.tag === "type-keyof")) {
    return {
      node: node,
      id: node.id,
      tag: "type-keyof",
      operand: lowerTypeExpr(node.operand)
    };
  }
  if ((node.tag === "type-typeof")) {
    return node;
  }
  if ((node.tag === "type-index")) {
    return {
      node: node,
      id: node.id,
      tag: "type-index",
      object: lowerTypeExpr(node.object),
      index: lowerTypeExpr(node.index)
    };
  }
  if ((node.tag === "type-cond")) {
    return {
      node: node,
      id: node.id,
      tag: "type-cond",
      subject: lowerTypeExpr(node.subject),
      constraint: lowerTypeExpr(node.constraint),
      trueBranch: lowerTypeExpr(node.trueBranch),
      falseBranch: lowerTypeExpr(node.falseBranch)
    };
  }
  if ((node.tag === "type-infer")) {
    return node;
  }
  if ((node.tag === "type-mapped")) {
    return {
      node: node,
      id: node.id,
      tag: "type-mapped",
      binding: node.binding,
      constraint: lowerTypeExpr(node.constraint),
      modifiers: node.modifiers,
      value: lowerTypeExpr(node.value)
    };
  }
  if ((node.tag === "type-template")) {
    return {
      node: node,
      id: node.id,
      tag: "type-template",
      parts: node.parts.map((p) => {
        if ((p.tag === "str")) {
          return p;
        }
        return {
          node: node,
          id: node.id,
          tag: "type",
          type: lowerTypeExpr(p.type)
        };
      })
    };
  }
  throw new Error(((("lowerTypeExpr: unexpected tag >" + node.tag) + "< at ") + formatSpan(node.id)));
};
export { lowerProgram, lowerTopLevel };
