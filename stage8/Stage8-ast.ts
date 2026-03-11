import { nextNodeId, registerSpan } from "./Stage8-spans";
import { assertAstTag } from "./Stage8-tags";
const dbglog  = (...msgs) => {
  console.error(msgs);
};
const parseString  = (tokenText) => {
  if (tokenText.startsWith("`")) {
    return tokenText.slice(1, -1);
  }
  if (tokenText.startsWith("\"\"\"")) {
    return tokenText.slice(3, -3);
  }
  {
    let inner  = tokenText.slice(1, -1);
    let result  = "";
    let i  = 0;
    while ((i < inner.length)) {
      {
        let ch  = inner.charAt(i);
        if ((ch === "\\")) {
          {
            let next  = inner.charAt((i + 1));
            i = (i + 1);
            result = (result + ((next === "n") ? "\n" : ((next === "r") ? "\r" : ((next === "t") ? "\t" : ((next === "0") ? String.fromCharCode(0) : next)))));
          }
        }
        else {
          result = (result + ch);
        }
      }
      i = (i + 1);
    }
    return result;
  }
};
const ensureNoThisSuperInKey  = (node, ctx) => {
  if (((node === null) || (node === undefined))) {
    return undefined;
  }
  if ((typeof node === "object")) {
    {
      if ((node.tag && ((node.tag === "this") || ((node.tag === "super") || ((node.tag === "super-constructor-call") || (node.tag === "super-method-call")))))) {
        throw new Error(("computed method key cannot reference this/super at " + ctx.getText()));
      }
      if (Array.isArray(node)) {
        node.forEach((child) => {
          ensureNoThisSuperInKey(child, ctx);
        });
      }
      else {
        Object.values(node).forEach((v) => {
          ensureNoThisSuperInKey(v, ctx);
        });
      }
    }
  }
};
const makeIdentifierNode  = (name, ctx, textOverride) => {
  {
    let node  = ({
      id: registerSpan(nextNodeId(), ctx),
      text: (textOverride ? textOverride : ctx.getText()),
      tag: "identifier",
      name: name
    });
    assertAstTag(node.tag, ctx);
    return node;
  }
};
const makePropAccessNode  = (obj, key, ctx, textOverride) => {
  {
    let node  = ({
      id: registerSpan(nextNodeId(), ctx),
      text: (textOverride ? textOverride : ctx.getText()),
      tag: "prop-access",
      object: obj,
      key: key
    });
    assertAstTag(node.tag, ctx);
    return node;
  }
};
const desugarDottedIdentifier  = (text, ctx) => {
  {
    let parts  = text.split(".");
    if (parts.some((p) => {
      return (p.length === 0);
    })) {
      throw new Error((("Invalid dotted identifier: " + text) + " has an empty segment"));
    }
    {
      let current  = makeIdentifierNode(parts[0], ctx, parts[0]);
      let i  = 1;
      while ((i < parts.length)) {
        {
          let isOuter  = (i === 1);
          let nodeText  = (isOuter ? ctx.getText() : parts[i]);
          current = makePropAccessNode(current, parts[i], ctx, nodeText);
        }
        i = (i + 1);
      }
      return current;
    }
  }
};
let macroScopeCounter_  = 0;
const astProgram  = (ctx) => {
  {
    let body  = ctx.topLevel().map(astTopLevel);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "program",
      body: body
    });
  }
};
const astTopLevel  = (ctx) => {
  if (ctx.defmacro()) {
    return astDefmacro(ctx.defmacro());
  }
  if (ctx.macroTimeFnDef()) {
    return astMacroTimeFnDef(ctx.macroTimeFnDef());
  }
  if (ctx.topLevelLet()) {
    return astTopLevelLet(ctx.topLevelLet());
  }
  if (ctx.topLevelConst()) {
    return astTopLevelConst(ctx.topLevelConst());
  }
  if (ctx.typeAlias()) {
    return astTypeAlias(ctx.typeAlias());
  }
  if (ctx.interfaceDef()) {
    return astInterfaceDef(ctx.interfaceDef());
  }
  if (ctx.classDef()) {
    return astClassDef(ctx.classDef());
  }
  if (ctx.exportDeclForm()) {
    return astExportDecl(ctx.exportDeclForm());
  }
  return astStatement(ctx.statement());
};
const astParseMeta  = (ctx) => {
  {
    let anns  = ctx.metaAnnotation();
    if ((anns.length === 0)) {
      return undefined;
    }
    {
      let entries  = anns.map((ann) => {
        {
          let kw  = ann.KEYWORD().getText();
          let key  = kw.slice(1);
          return [key, true];
        }
      });
      return Object.fromEntries(entries);
    }
  }
};
const astParseRestParam  = (sig) => {
  {
    let rp  = sig.restParam();
    if (rp) {
      return rp.IDENTIFIER().getText();
    }
    else {
      return undefined;
    }
  }
};
const astDefmacro  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let sig  = ctx.fnSignature();
    let params  = sig.param().map((p) => {
      return p.IDENTIFIER().getText();
    });
    let restN  = astParseRestParam(sig);
    let body  = ctx.statement().map(astStatement);
    let scopeId  = macroScopeCounter_;
    macroScopeCounter_ = (macroScopeCounter_ + 1);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "defmacro",
      name: name,
      params: params,
      rest: restN,
      body: body,
      scopeId: scopeId
    });
  }
};
const astMacroTimeFnDef  = (ctx) => {
  {
    let inner  = (ctx.topLevelLet() ? astTopLevelLet(ctx.topLevelLet()) : astTopLevelConst(ctx.topLevelConst()));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "macro-time-fn-def",
      name: inner.name,
      init: inner.init
    });
  }
};
const astTopLevelLet  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let init  = astExpression(ctx.expression());
    let meta  = astParseMeta(ctx);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "let-decl",
      name: name,
      init: init,
      meta: meta
    });
  }
};
const astTopLevelConst  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let init  = astExpression(ctx.expression());
    let meta  = astParseMeta(ctx);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "const-decl",
      name: name,
      init: init,
      meta: meta
    });
  }
};
const astTypeAlias  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
    let ty  = astTypeExpr(ctx.typeExpr());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-alias",
      name: name,
      typeParams: tparams,
      type: ty
    });
  }
};
const astInterfaceDef  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
    let extendsTypes  = (ctx.interfaceExtends() ? ctx.interfaceExtends().typeExpr().map(astTypeExpr) : []);
    let body  = astTypeObject(ctx.typeObject());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "interface-def",
      name: name,
      typeParams: tparams,
      extends: extendsTypes,
      body: body
    });
  }
};
const astModifiers  = (ctx) => {
  return ctx.modifier().map((m) => {
    return m.KEYWORD().getText();
  });
};
const astTypedParam  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let optional  = (ctx.OPTIONAL() ? true : false);
    let typeAnn  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      name: name,
      optional: optional,
      typeAnnotation: typeAnn
    });
  }
};
const astFnSignatureTyped  = (ctx) => {
  {
    let params  = ctx.typedParam().map(astTypedParam);
    let returnType  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    return ({
      params: params,
      returnType: returnType
    });
  }
};
const astFieldDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let typeAnn  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    let init  = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "field-def",
      modifiers: mods,
      name: name,
      typeAnnotation: typeAnn,
      init: init
    });
  }
};
const astMethodKey  = (ctx) => {
  if (ctx.IDENTIFIER()) {
    return ({
      computed: false,
      name: ctx.IDENTIFIER().getText()
    });
  }
  {
    let expr  = astExpression(ctx.expression());
    ensureNoThisSuperInKey(expr, ctx);
    return ({
      computed: true,
      key: expr
    });
  }
};
const astConstructorDef  = (ctx) => {
  {
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "constructor-def",
      sig: sig,
      body: body
    });
  }
};
const astClassMethodDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let keyInfo  = astMethodKey(ctx.methodKey());
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "class-method-def",
      modifiers: mods,
      computed: keyInfo.computed,
      name: (keyInfo.name ? keyInfo.name : undefined),
      key: (keyInfo.key ? keyInfo.key : undefined),
      sig: sig,
      body: body
    });
  }
};
const astAbstractMethodDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let keyInfo  = astMethodKey(ctx.methodKey());
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "abstract-method-def",
      modifiers: mods,
      computed: keyInfo.computed,
      name: (keyInfo.name ? keyInfo.name : undefined),
      key: (keyInfo.key ? keyInfo.key : undefined),
      sig: sig
    });
  }
};
const astGetterDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let keyInfo  = astMethodKey(ctx.methodKey());
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "getter-def",
      modifiers: mods,
      computed: keyInfo.computed,
      name: (keyInfo.name ? keyInfo.name : undefined),
      key: (keyInfo.key ? keyInfo.key : undefined),
      sig: sig,
      body: body
    });
  }
};
const astSetterDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let keyInfo  = astMethodKey(ctx.methodKey());
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "setter-def",
      modifiers: mods,
      computed: keyInfo.computed,
      name: (keyInfo.name ? keyInfo.name : undefined),
      key: (keyInfo.key ? keyInfo.key : undefined),
      sig: sig,
      body: body
    });
  }
};
const astClassElement  = (ctx) => {
  if (ctx.fieldDef()) {
    return astFieldDef(ctx.fieldDef());
  }
  if (ctx.constructorDef()) {
    return astConstructorDef(ctx.constructorDef());
  }
  if (ctx.classMethodDef()) {
    return astClassMethodDef(ctx.classMethodDef());
  }
  if (ctx.abstractMethodDef()) {
    return astAbstractMethodDef(ctx.abstractMethodDef());
  }
  if (ctx.getterDef()) {
    return astGetterDef(ctx.getterDef());
  }
  if (ctx.setterDef()) {
    return astSetterDef(ctx.setterDef());
  }
  throw new Error("Unknown classElement");
};
const astClassBody  = (ctx) => {
  {
    let elements  = ctx.classElement().map(astClassElement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "class-body",
      elements: elements
    });
  }
};
const astClassDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
    let extendsType  = (ctx.classExtends() ? astTypeExpr(ctx.classExtends().typeExpr()) : undefined);
    let implementsTypes  = (ctx.classImplements() ? ctx.classImplements().typeExpr().map(astTypeExpr) : []);
    let bodyNode  = astClassBody(ctx.classBody());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "class-def",
      modifiers: mods,
      name: name,
      typeParams: tparams,
      extendsType: extendsType,
      implementsTypes: implementsTypes,
      body: bodyNode
    });
  }
};
const astAnonClassDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let extendsType  = (ctx.classExtends() ? astTypeExpr(ctx.classExtends().typeExpr()) : undefined);
    let implementsTypes  = (ctx.classImplements() ? ctx.classImplements().typeExpr().map(astTypeExpr) : []);
    let bodyNode  = astClassBody(ctx.classBody());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "anon-class-def",
      modifiers: mods,
      extendsType: extendsType,
      implementsTypes: implementsTypes,
      body: bodyNode
    });
  }
};
const astSuperConstructorCall  = (ctx) => {
  {
    let args  = ctx.expression().map(astExpression);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "super-constructor-call",
      args: args
    });
  }
};
const astSuperMethodCall  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let args  = ctx.expression().map(astExpression);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "super-method-call",
      name: name,
      args: args
    });
  }
};
const astCatchClause  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      param: name,
      body: body
    });
  }
};
const astTry  = (ctx) => {
  {
    let body  = ctx.statement().map(astStatement);
    let catchCtx  = ctx.catchClause();
    let catchNode  = (catchCtx ? astCatchClause(catchCtx) : undefined);
    let finallyCtx  = ctx.finallyClause();
    let finallyBody  = (finallyCtx ? finallyCtx.statement().map(astStatement) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "try",
      body: body,
      catchClause: catchNode,
      finallyBody: finallyBody
    });
  }
};
const astStatement  = (ctx) => {
  if (ctx.letStar()) {
    return astLetStar(ctx.letStar());
  }
  if (ctx.letStmt()) {
    return astLetStmt(ctx.letStmt());
  }
  if (ctx.constStar()) {
    return astConstStar(ctx.constStar());
  }
  if (ctx.constStmt()) {
    return astConstStmt(ctx.constStmt());
  }
  if (ctx.ifForm()) {
    return astIf(ctx.ifForm());
  }
  if (ctx.whileForm()) {
    return astWhile(ctx.whileForm());
  }
  if (ctx.tryForm()) {
    return astTry(ctx.tryForm());
  }
  if (ctx.block()) {
    return astBlock(ctx.block());
  }
  if (ctx.assign()) {
    return astAssign(ctx.assign());
  }
  if (ctx.returnForm()) {
    return astReturn(ctx.returnForm());
  }
  if (ctx.throwForm()) {
    return astThrow(ctx.throwForm());
  }
  if (ctx.importForm()) {
    return astImport(ctx.importForm());
  }
  if (ctx.importTypeForm()) {
    return astImportType(ctx.importTypeForm());
  }
  if (ctx.exportForm()) {
    return astExportForm(ctx.exportForm());
  }
  if (ctx.switchForm()) {
    return astSwitch(ctx.switchForm());
  }
  if (ctx.forForm()) {
    return astFor(ctx.forForm());
  }
  if (ctx.forInForm()) {
    return astForIn(ctx.forInForm());
  }
  if (ctx.forOfForm()) {
    return astForOf(ctx.forOfForm());
  }
  if (ctx.forAwaitForm()) {
    return astForAwait(ctx.forAwaitForm());
  }
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "expr-stmt",
      expr: expr
    });
  }
};
const astThrow  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "throw",
      expr: expr
    });
  }
};
const astImport  = (ctx) => {
  {
    let spec  = (ctx.objectExpr() ? astObjectExpr(ctx.objectExpr()) : undefined);
    let source  = parseString(ctx.STRING().getText());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "import",
      spec: spec,
      source: source
    });
  }
};
const astImportTypeName  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER(0).getText();
    let aliasNode  = ctx.IDENTIFIER(1);
    let alias  = (aliasNode ? aliasNode.getText() : undefined);
    return ({
      name: name,
      alias: alias
    });
  }
};
const astImportType  = (ctx) => {
  {
    let spec  = ctx.importTypeSpec();
    let kind  = spec.IDENTIFIER().getText();
    let names  = spec.importTypeName().map(astImportTypeName);
    let source  = parseString(ctx.STRING().getText());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "import-type",
      kind: kind,
      names: names,
      source: source
    });
  }
};
const astExportNamePair  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER(0).getText();
    let aliasNode  = ctx.IDENTIFIER(1);
    let alias  = (aliasNode ? aliasNode.getText() : undefined);
    return ({
      name: name,
      alias: alias
    });
  }
};
const astExportType  = (ctx) => {
  {
    let pairs  = ctx.exportNamePair().map(astExportNamePair);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "export-type",
      pairs: pairs
    });
  }
};
const astExportTypeFrom  = (ctx) => {
  {
    let source  = parseString(ctx.STRING().getText());
    let pairs  = ctx.exportNamePair().map(astExportNamePair);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "export-type-from",
      source: source,
      pairs: pairs
    });
  }
};
const astExportTypeAllFrom  = (ctx) => {
  {
    let source  = parseString(ctx.STRING().getText());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "export-type-all-from",
      source: source
    });
  }
};
const astExportNsFrom  = (ctx) => {
  {
    let ns  = parseString(ctx.STRING(0).getText());
    let source  = parseString(ctx.STRING(1).getText());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "export-ns-from",
      ns: ns,
      source: source
    });
  }
};
const astExportDecl  = (ctx) => {
  {
    let d  = ctx.decl();
    if (d.topLevelLet()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astTopLevelLet(d.topLevelLet())
      });
    }
    if (d.topLevelConst()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astTopLevelConst(d.topLevelConst())
      });
    }
    if (d.classDef()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astClassDef(d.classDef())
      });
    }
    if (d.interfaceDef()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astInterfaceDef(d.interfaceDef())
      });
    }
    if (d.typeAlias()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astTypeAlias(d.typeAlias())
      });
    }
    throw new Error("astExportDecl: unknown decl form");
  }
};
const astExportForm  = (ctx) => {
  if (ctx.exportBinding()) {
    {
      let b  = ctx.exportBinding();
      let name  = b.IDENTIFIER().getText();
      let init  = astExpression(b.expression());
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-binding",
        name: name,
        init: init
      });
    }
  }
  if (ctx.exportDefault()) {
    {
      let d  = ctx.exportDefault();
      if (d.classDef()) {
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "export-default-class",
          classNode: astClassDef(d.classDef())
        });
      }
      if (d.anonClassDef()) {
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "export-default-class",
          classNode: astAnonClassDef(d.anonClassDef())
        });
      }
      if (d.topLevelLet()) {
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "export-default-def",
          defNode: astTopLevelLet(d.topLevelLet())
        });
      }
      if (d.topLevelConst()) {
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "export-default-def",
          defNode: astTopLevelConst(d.topLevelConst())
        });
      }
      {
        let expr  = astExpression(d.expression());
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "export-default",
          expr: expr
        });
      }
    }
  }
  if (ctx.exportNamed()) {
    {
      let n  = ctx.exportNamed();
      let pairs  = n.exportNamePair().map(astExportNamePair);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-named",
        pairs: pairs
      });
    }
  }
  if (ctx.exportFrom()) {
    {
      let f  = ctx.exportFrom();
      let source  = parseString(f.STRING().getText());
      let pairs  = f.exportNamePair().map(astExportNamePair);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-from",
        source: source,
        pairs: pairs
      });
    }
  }
  if (ctx.exportAllFrom()) {
    {
      let a  = ctx.exportAllFrom();
      let source  = parseString(a.STRING().getText());
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-all-from",
        source: source
      });
    }
  }
  if (ctx.exportTypeForm()) {
    return astExportType(ctx.exportTypeForm());
  }
  if (ctx.exportTypeFromForm()) {
    return astExportTypeFrom(ctx.exportTypeFromForm());
  }
  if (ctx.exportTypeAllFromForm()) {
    return astExportTypeAllFrom(ctx.exportTypeAllFromForm());
  }
  if (ctx.exportNsFromForm()) {
    return astExportNsFrom(ctx.exportNsFromForm());
  }
  throw new Error("Unknown export form");
};
const astSwitch  = (ctx) => {
  {
    let discriminant  = astExpression(ctx.expression());
    let cases  = ctx.caseClause().map((c) => {
      {
        let test  = astExpression(c.expression());
        let body  = c.statement().map(astStatement);
        return ({
          test: test,
          body: body
        });
      }
    });
    let defCtx  = ctx.defaultClause();
    let defaultCase  = (defCtx ? ({
      body: defCtx.statement().map(astStatement)
    }) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "switch",
      discriminant: discriminant,
      cases: cases,
      defaultCase: defaultCase
    });
  }
};
const astFor  = (ctx) => {
  {
    let initCtx  = ctx.letStmt();
    let bindCtx  = initCtx.singleBinding();
    let initName  = bindCtx.IDENTIFIER().getText();
    let initExpr  = astExpression(initCtx.expression());
    let test  = astExpression(ctx.expression());
    let updateCtx  = ctx.assign();
    let updateName  = updateCtx.IDENTIFIER().getText();
    let updateExpr  = astExpression(updateCtx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "for",
      initName: initName,
      initExpr: initExpr,
      test: test,
      updateName: updateName,
      updateExpr: updateExpr,
      body: body
    });
  }
};
const astForIn  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let obj  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "for-in",
      name: name,
      object: obj,
      body: body
    });
  }
};
const astForOf  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let iterable  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "for-of",
      name: name,
      iterable: iterable,
      body: body
    });
  }
};
const astForAwait  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let iterable  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "for-await",
      name: name,
      iterable: iterable,
      body: body
    });
  }
};
const astLetStar  = (ctx) => {
  {
    let bindings  = ctx.starBinding().map((b) => {
      {
        let id  = b.IDENTIFIER().getText();
        let init  = astExpression(b.expression());
        let typeAnnotation  = (b.typeExpr() ? astTypeExpr(b.typeExpr()) : undefined);
        return ({
          name: id,
          init: init,
          typeAnnotation: typeAnnotation
        });
      }
    });
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "let*",
      bindings: bindings,
      body: body
    });
  }
};
const astLetStmt  = (ctx) => {
  {
    let bindCtx  = ctx.singleBinding();
    let name  = bindCtx.IDENTIFIER().getText();
    let typeAnnotation  = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
    let init  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "let",
      name: name,
      typeAnnotation: typeAnnotation,
      init: init
    });
  }
};
const astConstStar  = (ctx) => {
  {
    let bindings  = ctx.starBinding().map((b) => {
      {
        let id  = b.IDENTIFIER().getText();
        let init  = astExpression(b.expression());
        let typeAnnotation  = (b.typeExpr() ? astTypeExpr(b.typeExpr()) : undefined);
        return ({
          name: id,
          init: init,
          typeAnnotation: typeAnnotation
        });
      }
    });
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "const*",
      bindings: bindings,
      body: body
    });
  }
};
const astConstStmt  = (ctx) => {
  {
    let bindCtx  = ctx.singleBinding();
    let name  = bindCtx.IDENTIFIER().getText();
    let typeAnnotation  = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
    let init  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "const",
      name: name,
      typeAnnotation: typeAnnotation,
      init: init
    });
  }
};
const astIf  = (ctx) => {
  {
    let test  = astExpression(ctx.expression());
    let ifthen  = astStatement(ctx.statement(0));
    let ctxElse  = ctx.statement(1);
    let ifelse  = (ctxElse ? astStatement(ctxElse) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "if",
      test: test,
      ifthen: ifthen,
      ifelse: ifelse
    });
  }
};
const astWhile  = (ctx) => {
  {
    let test  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "while",
      test: test,
      body: body
    });
  }
};
const astBlock  = (ctx) => {
  {
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "block",
      body: body
    });
  }
};
const astReturn  = (ctx) => {
  {
    let expr  = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "return",
      expr: expr
    });
  }
};
const astObjectExpr  = (ctx) => {
  {
    let fields  = ctx.objectField().map((f) => {
      if ((f.IDENTIFIER() && (!f.propKey()))) {
        {
          let name  = f.IDENTIFIER().getText();
          if (f.expression()) {
            throw new Error(("shorthand property field must not have an expression: " + name));
          }
          return ({
            key: name,
            isShorthand: true
          });
        }
      }
      if ((!f.propKey())) {
        throw new Error("objectField: unexpected shape — no propKey and no standalone IDENTIFIER");
      }
      {
        let rawKey  = f.propKey().getText();
        let key  = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
        if (f.methodDef()) {
          {
            let md  = f.methodDef();
            let params  = md.fnSignature().param().map((p) => {
              return p.IDENTIFIER().getText();
            });
            let body  = md.statement().map(astStatement);
            if (f.expression()) {
              throw new Error(("method field must not have an expression: " + key));
            }
            return ({
              key: key,
              isMethod: true,
              params: params,
              body: body
            });
          }
        }
        if ((!f.expression())) {
          throw new Error(("complete property field must have an expression: " + key));
        }
        {
          let value  = astExpression(f.expression());
          return ({
            key: key,
            isMethod: false,
            isShorthand: false,
            value: value
          });
        }
      }
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "object",
      fields: fields
    });
  }
};
const astArrayExpr  = (ctx) => {
  {
    let elements  = ctx.expression().map(astExpression);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "array",
      elements: elements
    });
  }
};
const astTemplateExpr  = (ctx) => {
  {
    let children  = ctx.children;
    let contentChildren  = children.slice(2, (children.length - 1));
    let parts  = contentChildren.map((child) => {
      if (child.symbol) {
        return ({
          tag: "str",
          value: parseString(child.getText())
        });
      }
      else {
        return ({
          tag: "hole",
          expr: astExpression(child)
        });
      }
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "template-expr",
      parts: parts
    });
  }
};
const astSForm  = (ctx) => {
  if (ctx.UNQUOTE()) {
    {
      let expr  = astExpression(ctx.expression());
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "sf-hole",
        expr: expr
      });
    }
  }
  if (ctx.UNQUOTE_SPLICING()) {
    {
      let expr  = astExpression(ctx.expression());
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "sf-splice",
        expr: expr
      });
    }
  }
  if (ctx.LPAREN()) {
    {
      let items  = ctx.sForm().map(astSForm);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "sf-list",
        items: items
      });
    }
  }
  return ({
    id: registerSpan(nextNodeId(), ctx),
    text: ctx.getText(),
    tag: "sf-atom",
    value: ctx.getText()
  });
};
const astQuasiquote  = (ctx) => {
  {
    let sformCtx  = ctx.quasiForm().sForm();
    let sform  = astSForm(sformCtx);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "quasi",
      sform: sform
    });
  }
};
const astUnquote  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "unquote",
      expr: expr
    });
  }
};
const astUnquoteSplicing  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "unquote-splicing",
      expr: expr
    });
  }
};
const astTernary  = (ctx) => {
  {
    let test  = astExpression(ctx.expression(0));
    let ifthen  = astExpression(ctx.expression(1));
    let ifelse  = astExpression(ctx.expression(2));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "ternary",
      test: test,
      ifthen: ifthen,
      ifelse: ifelse
    });
  }
};
const astCondExpr  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let clauses  = [];
    let i  = 0;
    while ((i < exprs.length)) {
      clauses.push(({
        test: exprs[i],
        expr: exprs[(i + 1)]
      }));
      i = (i + 2);
    }
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "cond",
      clauses: clauses
    });
  }
};
const astNewExpr  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let raw  = ctx.typeArgs();
    let typeArgs  = (raw ? raw.typeExpr().map(astTypeExpr) : []);
    let args  = ctx.expression().map(astExpression);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "new",
      name: name,
      typeArgs: typeArgs,
      args: args
    });
  }
};
const astOptChain  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression());
    let rawKey  = ctx.propKey().getText();
    let key  = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "opt-chain",
      object: obj,
      key: key
    });
  }
};
const astOptChainIndex  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression(0));
    let idx  = astExpression(ctx.expression(1));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "opt-chain-index",
      object: obj,
      index: idx
    });
  }
};
const astNullCoalesce  = (ctx) => {
  {
    let left  = astExpression(ctx.expression(0));
    let right  = astExpression(ctx.expression(1));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "null-coalesce",
      left: left,
      right: right
    });
  }
};
const astExpression  = (ctx) => {
  if ((ctx == undefined)) {
    {
      console.error("astExpression: ctx is undefined or null");
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "error",
        reason: "ctx undefined"
      });
    }
  }
  if (ctx.literal()) {
    return astLiteral(ctx.literal());
  }
  if (ctx.KEYWORD()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "keyword",
      value: ctx.KEYWORD().getText()
    });
  }
  if (ctx.IDENTIFIER()) {
    {
      let text  = ctx.IDENTIFIER().getText();
      if ((text.includes(".") && (!text.startsWith("...")))) {
        return desugarDottedIdentifier(text, ctx);
      }
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "identifier",
        name: text
      });
    }
  }
  if (ctx.MACRO_ERROR()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "identifier",
      name: "macro-error"
    });
  }
  if (ctx.MINUS()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "identifier",
      name: "-"
    });
  }
  if (ctx.lambda()) {
    return astLambda(ctx.lambda());
  }
  if (ctx.fn()) {
    return astFn(ctx.fn());
  }
  if (ctx.asyncLambda()) {
    return astAsyncLambda(ctx.asyncLambda());
  }
  if (ctx.asyncFn()) {
    return astAsyncFn(ctx.asyncFn());
  }
  if (ctx.generatorFn()) {
    return astGeneratorFn(ctx.generatorFn());
  }
  if (ctx.asyncGeneratorFn()) {
    return astAsyncGeneratorFn(ctx.asyncGeneratorFn());
  }
  if (ctx.awaitExpr()) {
    return astAwaitExpr(ctx.awaitExpr());
  }
  if (ctx.yieldExpr()) {
    return astYieldExpr(ctx.yieldExpr());
  }
  if (ctx.yieldStarExpr()) {
    return astYieldStarExpr(ctx.yieldStarExpr());
  }
  if (ctx.bindExpr()) {
    return astBindExpr(ctx.bindExpr());
  }
  if (ctx.methodCallExpr()) {
    return astMethodCallExpr(ctx.methodCallExpr());
  }
  if (ctx.objectExpr()) {
    return astObjectExpr(ctx.objectExpr());
  }
  if (ctx.arrayExpr()) {
    return astArrayExpr(ctx.arrayExpr());
  }
  if (ctx.propAccess()) {
    return astPropAccess(ctx.propAccess());
  }
  if (ctx.indexAccess()) {
    return astIndexAccess(ctx.indexAccess());
  }
  if (ctx.quasiquote()) {
    return astQuasiquote(ctx.quasiquote());
  }
  if (ctx.unquote()) {
    return astUnquote(ctx.unquote());
  }
  if (ctx.unquoteSplicing()) {
    return astUnquoteSplicing(ctx.unquoteSplicing());
  }
  if (ctx.ternary()) {
    return astTernary(ctx.ternary());
  }
  if (ctx.condExpr()) {
    return astCondExpr(ctx.condExpr());
  }
  if (ctx.newForm()) {
    return astNewExpr(ctx.newForm());
  }
  if (ctx.optChain()) {
    return astOptChain(ctx.optChain());
  }
  if (ctx.optChainIndex()) {
    return astOptChainIndex(ctx.optChainIndex());
  }
  if (ctx.nullCoalesce()) {
    return astNullCoalesce(ctx.nullCoalesce());
  }
  if (ctx.typeofExpr()) {
    return astTypeofExpr(ctx.typeofExpr());
  }
  if (ctx.typeAssert()) {
    return astTypeAssert(ctx.typeAssert());
  }
  if (ctx.templateExpr()) {
    return astTemplateExpr(ctx.templateExpr());
  }
  if (ctx.superConstructorCall()) {
    return astSuperConstructorCall(ctx.superConstructorCall());
  }
  if (ctx.superMethodCall()) {
    return astSuperMethodCall(ctx.superMethodCall());
  }
  if (ctx.thisExpr()) {
    return ({
      id: registerSpan(nextNodeId(), ctx.thisExpr()),
      text: "this",
      tag: "this"
    });
  }
  if (ctx.superExpr()) {
    return ({
      id: registerSpan(nextNodeId(), ctx.superExpr()),
      text: "super",
      tag: "super"
    });
  }
  if (ctx.call()) {
    return astCall(ctx.call());
  }
  throw new Error(("Unknown expression: " + (ctx.getText ? ctx.getText() : ctx)));
};
const astTypeofExpr  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "typeof-expr",
      expr: expr
    });
  }
};
const astTypeAssert  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    let ty  = astTypeExpr(ctx.typeExpr());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-assert",
      expr: expr,
      ty: ty
    });
  }
};
const astCall  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let raw  = ctx.typeArgs();
    let typeArgs  = (raw ? raw.typeExpr().map(astTypeExpr) : []);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "call",
      fn: exprs[0],
      args: exprs.slice(1),
      typeArgs: typeArgs
    });
  }
};
const astPropAccess  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression());
    let rawKey  = ctx.propKey().getText();
    let key  = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "prop-access",
      object: obj,
      key: key
    });
  }
};
const astIndexAccess  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression(0));
    let idx  = astExpression(ctx.expression(1));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "index-access",
      object: obj,
      index: idx
    });
  }
};
const astParseFnSig  = (sig) => {
  {
    let params  = sig.param().map((p) => {
      {
        let name  = p.IDENTIFIER().getText();
        let typeAnn  = (p.typeExpr() ? astTypeExpr(p.typeExpr()) : undefined);
        return ({
          name: name,
          optional: false,
          typeAnnotation: typeAnn
        });
      }
    });
    let rp  = sig.restParam();
    let restName  = (rp ? rp.IDENTIFIER().getText() : undefined);
    let restType  = (rp ? (rp.typeExpr() ? astTypeExpr(rp.typeExpr()) : undefined) : undefined);
    let returnType  = (sig.typeExpr() ? astTypeExpr(sig.typeExpr()) : undefined);
    return ({
      params: params,
      rest: restName,
      restType: restType,
      returnType: returnType
    });
  }
};
const astLambda  = (ctx) => {
  {
    let sig  = astParseFnSig(ctx.fnSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "lambda",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astFn  = (ctx) => {
  {
    let sig  = astParseFnSig(ctx.fnSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "fn",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAsyncLambda  = (ctx) => {
  {
    let sig  = astParseFnSig(ctx.fnSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "async-lambda",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAsyncFn  = (ctx) => {
  {
    let sig  = astParseFnSig(ctx.fnSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "async-fn",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astGeneratorFn  = (ctx) => {
  {
    let sig  = astParseFnSig(ctx.fnSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "generator-fn",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAsyncGeneratorFn  = (ctx) => {
  {
    let sig  = astParseFnSig(ctx.fnSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "async-generator-fn",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAwaitExpr  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "await",
      expr: expr
    });
  }
};
const astYieldExpr  = (ctx) => {
  {
    let expr  = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "yield",
      expr: expr
    });
  }
};
const astYieldStarExpr  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "yield*",
      expr: expr
    });
  }
};
const astBindExpr  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let fnExpr  = exprs[0];
    let thisArg  = exprs[1];
    let args  = exprs.slice(2);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "bind-expr",
      fn: fnExpr,
      thisArg: thisArg,
      args: args
    });
  }
};
const astMethodCallExpr  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let obj  = exprs[0];
    let methodExpr  = exprs[1];
    let args  = exprs.slice(2);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "method-call-expr",
      object: obj,
      method: methodExpr,
      args: args
    });
  }
};
const astAssign  = (ctx) => {
  if (ctx.IDENTIFIER()) {
    {
      let name  = ctx.IDENTIFIER().getText();
      let value  = astExpression(ctx.expression());
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "assign",
        name: name,
        value: value
      });
    }
  }
  {
    let target  = astPropAccess(ctx.propAccess());
    let value  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "assign-prop",
      target: target,
      value: value
    });
  }
};
const astLiteral  = (ctx) => {
  if (ctx.NEG_NUMBER()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "literal",
      value: Number(ctx.NEG_NUMBER().getText())
    });
  }
  if (ctx.NUMBER()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "literal",
      value: Number(ctx.NUMBER().getText())
    });
  }
  if (ctx.STRING()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "literal",
      value: parseString(ctx.STRING().getText())
    });
  }
  if (ctx.BOOLEAN()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "literal",
      value: (ctx.BOOLEAN().getText() === "true")
    });
  }
  if (ctx.NULL()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "literal",
      value: null
    });
  }
  if (ctx.UNDEFINED()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "literal",
      value: undefined
    });
  }
  throw new Error("Unknown literal");
};
const astTypeExpr  = (ctx) => {
  if (ctx.typeUnion()) {
    return astTypeUnion(ctx.typeUnion());
  }
  if (ctx.typeIntersection()) {
    return astTypeIntersection(ctx.typeIntersection());
  }
  if (ctx.typeArray()) {
    return astTypeArray(ctx.typeArray());
  }
  if (ctx.typeTuple()) {
    return astTypeTuple(ctx.typeTuple());
  }
  if (ctx.typeFunction()) {
    return astTypeFunction(ctx.typeFunction());
  }
  if (ctx.typeObject()) {
    return astTypeObject(ctx.typeObject());
  }
  if (ctx.typeLiteral()) {
    return astTypeLiteral(ctx.typeLiteral());
  }
  if (ctx.typeKeyof()) {
    return astTypeKeyof(ctx.typeKeyof());
  }
  if (ctx.typeTypeof()) {
    return astTypeTypeof(ctx.typeTypeof());
  }
  if (ctx.typeIndexAccess()) {
    return astTypeIndexAccess(ctx.typeIndexAccess());
  }
  if (ctx.typeConditional()) {
    return astTypeConditional(ctx.typeConditional());
  }
  if (ctx.typeInfer()) {
    return astTypeInfer(ctx.typeInfer());
  }
  if (ctx.typeMapped()) {
    return astTypeMapped(ctx.typeMapped());
  }
  if (ctx.typeTemplateLiteral()) {
    return astTypeTemplateLiteral(ctx.typeTemplateLiteral());
  }
  if (ctx.typeApplication()) {
    return astTypeApplication(ctx.typeApplication());
  }
  if (ctx.IDENTIFIER()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-id",
      name: ctx.IDENTIFIER().getText()
    });
  }
  throw new Error(("astTypeExpr: unknown type: " + ctx.getText()));
};
const astTypeUnion  = (ctx) => {
  {
    let members  = ctx.typeExpr().map(astTypeExpr);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-union",
      members: members
    });
  }
};
const astTypeIntersection  = (ctx) => {
  {
    let members  = ctx.typeExpr().map(astTypeExpr);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-intersection",
      members: members
    });
  }
};
const astTypeArray  = (ctx) => {
  {
    let element  = astTypeExpr(ctx.typeExpr());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-array",
      element: element
    });
  }
};
const astTypeTuple  = (ctx) => {
  {
    let elements  = ctx.typeTupleElement().map(astTypeTupleElement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-tuple",
      elements: elements
    });
  }
};
const astTypeTupleElement  = (ctx) => {
  if (ctx.REST()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "rest",
      type: astTypeExpr(ctx.typeExpr())
    });
  }
  if ((ctx.IDENTIFIER() && ctx.typeExpr())) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "labeled",
      name: ctx.IDENTIFIER().getText(),
      type: astTypeExpr(ctx.typeExpr())
    });
  }
  return ({
    id: registerSpan(nextNodeId(), ctx),
    text: ctx.getText(),
    tag: "element",
    type: astTypeExpr(ctx.typeExpr())
  });
};
const astTypeFunction  = (ctx) => {
  {
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map().astTypeParamDecl() : []);
    let params  = ctx.typeFnParam().map(astTypeFnParam);
    let result  = astTypeExpr(ctx.typeExpr());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-fn",
      typeParams: tparams,
      params: params,
      result: result
    });
  }
};
const astTypeFnParam  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let optional  = (ctx.OPTIONAL() !== null);
    let ty  = astTypeExpr(ctx.typeExpr());
    return ({
      name: name,
      optional: optional,
      type: ty
    });
  }
};
const astTypeObject  = (ctx) => {
  {
    let props  = ctx.typeProp().map(astTypeProp);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-obj",
      props: props
    });
  }
};
const astTypeProp  = (ctx) => {
  {
    let isReadonly  = (ctx.propModifier().length > 0);
    let name  = ctx.IDENTIFIER().getText();
    let optional  = (ctx.OPTIONAL() !== null);
    let ty  = astTypeExpr(ctx.typeExpr());
    return ({
      readonly: isReadonly,
      name: name,
      optional: optional,
      type: ty
    });
  }
};
const astTypeLiteral  = (ctx) => {
  if (ctx.STRING()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-literal",
      value: parseString(ctx.STRING().getText())
    });
  }
  if (ctx.NUMBER()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-literal",
      value: Number(ctx.NUMBER().getText())
    });
  }
  if (ctx.BOOLEAN()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-literal",
      value: (ctx.BOOLEAN().getText() === "true")
    });
  }
  throw new Error("Unknown type literal");
};
const astTypeKeyof  = (ctx) => {
  {
    let operand  = astTypeExpr(ctx.typeExpr());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-keyof",
      operand: operand
    });
  }
};
const astTypeTypeof  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-typeof",
      name: name
    });
  }
};
const astTypeIndexAccess  = (ctx) => {
  {
    let obj  = astTypeExpr(ctx.typeExpr(0));
    let idx  = astTypeExpr(ctx.typeExpr(1));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-index",
      object: obj,
      index: idx
    });
  }
};
const astTypeConditional  = (ctx) => {
  {
    let subject  = astTypeExpr(ctx.typeExpr(0));
    let constraint  = astTypeExpr(ctx.typeExpr(1));
    let trueBranch  = astTypeExpr(ctx.typeExpr(2));
    let falseBranch  = astTypeExpr(ctx.typeExpr(3));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-cond",
      subject: subject,
      constraint: constraint,
      trueBranch: trueBranch,
      falseBranch: falseBranch
    });
  }
};
const astTypeInfer  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-infer",
      name: name
    });
  }
};
const astTypeMapped  = (ctx) => {
  {
    let binding  = ctx.IDENTIFIER().getText();
    let constraint  = astTypeExpr(ctx.typeExpr(0));
    let mapfn  = (m) => {
      return m.getText();
    };
    let mods  = (ctx.mappedModifiers() ? ctx.mappedModifiers().mappedModifier().map(mapfn) : []);
    let value  = astTypeExpr(ctx.typeExpr(1));
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-mapped",
      binding: binding,
      constraint: constraint,
      modifiers: mods,
      value: value
    });
  }
};
const astTypeTemplateLiteral  = (ctx) => {
  {
    let parts  = ctx.templatePart().map((p) => {
      if (p.STRING()) {
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "str",
          value: parseString(p.STRING().getText())
        });
      }
      else {
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "type",
          type: astTypeExpr(p.typeExpr())
        });
      }
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-template",
      parts: parts
    });
  }
};
const astTypeApplication  = (ctx) => {
  {
    let allTypes  = ctx.typeExpr().map(astTypeExpr);
    let callee  = allTypes[0];
    let args  = allTypes.slice(1);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-app",
      callee: callee,
      args: args
    });
  }
};
const astTypeParamDecl  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let constraint  = (ctx.typeParamConstraint() ? astTypeExpr(ctx.typeParamConstraint().typeExpr()) : undefined);
    let defaultType  = (ctx.typeParamDefault() ? astTypeExpr(ctx.typeParamDefault().typeExpr()) : undefined);
    return ({
      name: name,
      constraint: constraint,
      default: defaultType
    });
  }
};
export { astProgram, astTopLevel };
