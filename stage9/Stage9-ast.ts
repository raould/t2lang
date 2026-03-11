import { nextNodeId, registerSpan } from "./Stage9-spans";
import { assertAstTag } from "./Stage9-tags";
import { nullDebugContext } from "./Stage9-debug";
let _astDbg  = nullDebugContext;
const setAstDebugContext  = (dbg) => {
  _astDbg = dbg;
};
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
  _astDbg.log_msg("ast", (("desugar dotted-identifier: " + text) + " → prop-access chain"));
  {
    let parts  = text.split(".");
    if (parts.some((p) => {
      return (p.length === 0);
    })) {
      throw new Error((("Invalid dotted identifier: " + text) + " has an empty segment"));
    }
    {
      let root  = parts[0];
      let current  = ((root === "this") ? ({
        id: registerSpan(nextNodeId(), ctx),
        text: "this",
        tag: "this"
      }) : ((root === "super") ? ({
        id: registerSpan(nextNodeId(), ctx),
        text: "super",
        tag: "super"
      }) : makeIdentifierNode(root, ctx, root)));
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
  if (ctx.macroImport()) {
    return astMacroImport(ctx.macroImport());
  }
  if (ctx.macroExport()) {
    return astMacroExport(ctx.macroExport());
  }
  if (ctx.macroReexport()) {
    return astMacroReexport(ctx.macroReexport());
  }
  if (ctx.topLevelLet()) {
    return astTopLevelLet(ctx.topLevelLet());
  }
  if (ctx.topLevelVar()) {
    return astTopLevelVar(ctx.topLevelVar());
  }
  if (ctx.topLevelConst()) {
    return astTopLevelConst(ctx.topLevelConst());
  }
  if (ctx.fn()) {
    return astFn(ctx.fn());
  }
  if (ctx.fnO()) {
    return astFnO(ctx.fnO());
  }
  if (ctx.typeAlias()) {
    return astTypeAlias(ctx.typeAlias());
  }
  if (ctx.interfaceDef()) {
    return astInterfaceDef(ctx.interfaceDef());
  }
  if (ctx.enumDef()) {
    return astEnumDef(ctx.enumDef());
  }
  if (ctx.classDef()) {
    return astClassDef(ctx.classDef());
  }
  if (ctx.mixinForm()) {
    return astMixinForm(ctx.mixinForm());
  }
  if (ctx.exportDeclForm()) {
    return astExportDecl(ctx.exportDeclForm());
  }
  return astStatement(ctx.statement());
};
const astMacroImport  = (ctx) => {
  {
    let nsNode  = ctx.IDENTIFIER();
    let namespace  = nsNode.getText();
    let stringNode  = ctx.STRING();
    let path  = parseString(stringNode.getText());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "macro-import",
      namespace: namespace,
      path: path
    });
  }
};
const astMacroExport  = (ctx) => {
  {
    let specs  = ctx.macroExportSpec().map((s) => {
      return s.getText();
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "macro-export",
      specs: specs
    });
  }
};
const astMacroReexport  = (ctx) => {
  {
    let idents  = ctx.IDENTIFIER().map((t) => {
      return t.getText();
    });
    let namespace  = idents[0];
    let names  = idents.slice(1);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "macro-reexport",
      namespace: namespace,
      names: names
    });
  }
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
          let key  = ann.IDENTIFIER().getText();
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
    let sig  = ctx.macroSignature();
    let allIds  = (sig.IDENTIFIER() || []);
    let hasRest  = sig.REST();
    let paramIds  = (hasRest ? allIds.slice(0, -1) : allIds);
    let params  = paramIds.map((tok) => {
      return tok.getText();
    });
    let restN  = (hasRest ? allIds[(allIds.length - 1)].getText() : null);
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
    let b  = ctx.starBinding()[0];
    let meta  = astParseMeta(ctx);
    {
      let name  = b.IDENTIFIER().getText();
      let init  = astExpression(b.expression());
      let typeAnnotation  = (b.typeExpr() ? astTypeExpr(b.typeExpr()) : undefined);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "let-decl",
        name: name,
        init: init,
        typeAnnotation: typeAnnotation,
        meta: meta
      });
    }
  }
};
const astTopLevelVar  = (ctx) => {
  {
    let b  = ctx.starBinding()[0];
    let meta  = astParseMeta(ctx);
    {
      let name  = b.IDENTIFIER().getText();
      let init  = astExpression(b.expression());
      let typeAnnotation  = (b.typeExpr() ? astTypeExpr(b.typeExpr()) : undefined);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "var-decl",
        name: name,
        init: init,
        typeAnnotation: typeAnnotation,
        meta: meta
      });
    }
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
const astEnumMember  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let valueCtx  = (ctx.NUMBER() ? ctx.NUMBER() : (ctx.NEG_NUMBER() ? ctx.NEG_NUMBER() : (ctx.STRING() ? ctx.STRING() : undefined)));
    let value  = (valueCtx ? valueCtx.getText() : undefined);
    return ({
      name: name,
      value: value
    });
  }
};
const astEnumDef  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let members  = ctx.enumMember().map(astEnumMember);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "enum-def",
      name: name,
      members: members
    });
  }
};
const astModifiers  = (ctx) => {
  return ctx.modifier().map((m) => {
    return m.start.text;
  });
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
  if (ctx.GET()) {
    return ({
      computed: false,
      name: "get"
    });
  }
  if (ctx.SETPROP()) {
    return ({
      computed: false,
      name: "set"
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
const astConstructorParam  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let optional  = (ctx.OPTIONAL() ? true : false);
    let typeAnn  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      name: name,
      optional: optional,
      typeAnnotation: typeAnn,
      modifiers: mods
    });
  }
};
const astConstructorSignature  = (ctx) => {
  {
    let params  = ctx.constructorParam().map(astConstructorParam);
    let returnType  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    return ({
      params: params,
      returnType: returnType
    });
  }
};
const astConstructorDef  = (ctx) => {
  {
    let sig  = astConstructorSignature(ctx.constructorSignature());
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
    let sig  = astParseFnSig(ctx.fnSignature());
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
    let sig  = astParseFnSig(ctx.fnSignature());
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
    let sig  = astParseFnSig(ctx.fnSignature());
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
    let sig  = astParseFnSig(ctx.fnSignature());
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
  if (ctx.methodO()) {
    return astMethodO(ctx.methodO());
  }
  if (ctx.abstractMethodO()) {
    return astAbstractMethodO(ctx.abstractMethodO());
  }
  if (ctx.constructorO()) {
    return astConstructorO(ctx.constructorO());
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
const astExcept  = (ctx) => {
  {
    let tryCtx  = ctx.tryClause();
    let body  = tryCtx.statement().map(astStatement);
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
  if (ctx.letStmt()) {
    return astLetStar(ctx.letStmt());
  }
  if (ctx.varStmt()) {
    return astVarStar(ctx.varStmt());
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
  if (ctx.exceptForm()) {
    return astExcept(ctx.exceptForm());
  }
  if (ctx.assign()) {
    return astAssign(ctx.assign());
  }
  if (ctx.compoundAssign()) {
    return astCompoundAssign(ctx.compoundAssign());
  }
  if (ctx.subscriptAssign()) {
    return astSubscriptAssign(ctx.subscriptAssign());
  }
  if (ctx.returnForm()) {
    return astReturn(ctx.returnForm());
  }
  if (ctx.throwForm()) {
    return astThrow(ctx.throwForm());
  }
  if (ctx.breakForm()) {
    return astBreak(ctx.breakForm());
  }
  if (ctx.continueForm()) {
    return astContinue(ctx.continueForm());
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
  if (ctx.macroBodyCall()) {
    return astMacroBodyCall(ctx.macroBodyCall());
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
    let source  = parseString(ctx.STRING().getText());
    if (ctx.objectDestructPat()) {
      {
        let destructCtx  = ctx.objectDestructPat();
        let named  = destructCtx.IDENTIFIER().map((id) => {
          return ({
            name: id.getText()
          });
        });
        let idTok  = ctx.IDENTIFIER();
        let defaultName  = (idTok ? idTok.getText() : undefined);
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "import",
          named: named,
          defaultName: defaultName,
          source: source
        });
      }
    }
    if (ctx.STAR()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "import",
        namespaceName: ctx.IDENTIFIER().getText(),
        source: source
      });
    }
    if (ctx.IDENTIFIER()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "import",
        defaultName: ctx.IDENTIFIER().getText(),
        source: source
      });
    }
    {
      let spec  = (ctx.objectExpr() ? astObjectExpr(ctx.objectExpr()) : undefined);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "import",
        spec: spec,
        source: source
      });
    }
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
const astMixinForm  = (ctx) => {
  {
    let ids  = ctx.IDENTIFIER();
    let target  = ids["0"].getText();
    let mixinIds  = ids.slice(1);
    let mixins  = mixinIds.map((id) => {
      return id.getText();
    });
    let fctx  = ctx.mixinFilter();
    let filter  = null;
    if (fctx) {
      if (fctx.EXCEPT()) {
        {
          let names  = fctx.IDENTIFIER().map((id) => {
            return id.getText();
          });
          filter = ({
            kind: "except",
            names: names
          });
        }
      }
      else {
        {
          let allIds  = fctx.IDENTIFIER();
          let keyword  = allIds["0"].getText();
          let filterNames  = allIds.slice(1).map((id) => {
            return id.getText();
          });
          if ((keyword !== "only")) {
            throw new Error(("mixin: expected :only or :except, got :" + keyword));
          }
          filter = ({
            kind: "only",
            names: filterNames
          });
        }
      }
    }
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "mixin-form",
      target: target,
      mixins: mixins,
      filter: filter
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
    if (d.fn()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astFn(d.fn())
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
    if (d.enumDef()) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "export-decl",
        decl: astEnumDef(d.enumDef())
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
  if (ctx.IDENTIFIER()) {
    {
      let initName  = ctx.IDENTIFIER().getText();
      let initExpr  = astExpression(ctx.expression(0));
      let test  = astExpression(ctx.expression(1));
      let updateExpr  = astExpression(ctx.expression(2));
      let body  = ctx.statement().map(astStatement);
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "for",
        initName: initName,
        initExpr: initExpr,
        test: test,
        updateName: initName,
        updateExpr: updateExpr,
        body: body
      });
    }
  }
  {
    let initCtx  = ctx.letStmt();
    let bindCtx  = initCtx.starBinding()[0];
    let initName  = bindCtx.IDENTIFIER().getText();
    let initExpr  = astExpression(bindCtx.expression());
    let test  = astExpression(ctx.expression(0));
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
const astObjectDestructPat  = (ctx) => {
  {
    let fields  = ctx.IDENTIFIER().map((id) => {
      return id.getText();
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "destruct-object",
      fields: fields
    });
  }
};
const astArrayDestructPat  = (ctx) => {
  {
    let elements  = ctx.IDENTIFIER().map((id) => {
      return id.getText();
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "destruct-array",
      elements: elements
    });
  }
};
const astSingleBindingPattern  = (bindCtx) => {
  if (bindCtx.objectDestructPat()) {
    return ({
      isDestruct: true,
      pattern: astObjectDestructPat(bindCtx.objectDestructPat())
    });
  }
  if (bindCtx.arrayDestructPat()) {
    return ({
      isDestruct: true,
      pattern: astArrayDestructPat(bindCtx.arrayDestructPat())
    });
  }
  {
    let name  = bindCtx.IDENTIFIER().getText();
    let typeAnnotation  = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
    return ({
      isDestruct: false,
      name: name,
      typeAnnotation: typeAnnotation
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
      tag: "let",
      bindings: bindings,
      body: body
    });
  }
};
const astVarStar  = (ctx) => {
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
      tag: "var",
      bindings: bindings,
      body: body
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
    let parsed  = astSingleBindingPattern(bindCtx);
    let init  = astExpression(ctx.expression());
    if (parsed.isDestruct) {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "const",
        pattern: parsed.pattern,
        init: init
      });
    }
    else {
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "const",
        name: parsed.name,
        typeAnnotation: parsed.typeAnnotation,
        init: init
      });
    }
  }
};
const astIf  = (ctx) => {
  {
    let test  = astExpression(ctx.expression());
    let ifthen  = ctx.thenBlock().statement().map(astStatement);
    let elseCtx  = ctx.elseBlock();
    let ifelse  = (elseCtx ? elseCtx.statement().map(astStatement) : undefined);
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
const astBreak  = (ctx) => {
  return ({
    id: registerSpan(nextNodeId(), ctx),
    text: ctx.getText(),
    tag: "break"
  });
};
const astContinue  = (ctx) => {
  return ({
    id: registerSpan(nextNodeId(), ctx),
    text: ctx.getText(),
    tag: "continue"
  });
};
const astObjectExpr  = (ctx) => {
  {
    let fields  = ctx.objectField().map((f) => {
      if (f.LBRACK()) {
        {
          let keyExpr  = astExpression(f.expression(0));
          if (f.methodDef()) {
            {
              let md  = f.methodDef();
              let params  = md.fnSignature().param().map((p) => {
                return p.IDENTIFIER().getText();
              });
              let body  = md.statement().map(astStatement);
              return ({
                computed: true,
                keyExpr: keyExpr,
                isMethod: true,
                params: params,
                body: body
              });
            }
          }
          {
            let value  = astExpression(f.expression(1));
            return ({
              computed: true,
              keyExpr: keyExpr,
              isMethod: false,
              isShorthand: false,
              value: value
            });
          }
        }
      }
      if ((f.IDENTIFIER() && (!f.propKey()))) {
        {
          let name  = f.IDENTIFIER().getText();
          if ((f.expression().length > 0)) {
            throw new Error(("shorthand property field must not have an expression: " + name));
          }
          return ({
            computed: false,
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
            if ((f.expression().length > 0)) {
              throw new Error(("method field must not have an expression: " + key));
            }
            return ({
              computed: false,
              key: key,
              isMethod: true,
              params: params,
              body: body
            });
          }
        }
        if ((f.expression().length === 0)) {
          throw new Error(("complete property field must have an expression: " + key));
        }
        {
          let value  = astExpression(f.expression(0));
          return ({
            computed: false,
            key: key,
            isMethod: false,
            isShorthand: false,
            value: value
          });
        }
      }
    });
    {
      let seen_  = new Set();
      fields.forEach((f) => {
        if ((!f.computed)) {
          {
            if (seen_.has(f.key)) {
              throw new Error((("duplicate object key '" + f.key) + "'"));
            }
            seen_.add(f.key);
          }
        }
      });
    }
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
const astBracketArrayExpr  = (ctx) => {
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
const astBraceObjectExpr  = (ctx) => {
  {
    let fields  = ctx.braceObjectField().map((f) => {
      if (f.LBRACK()) {
        {
          let keyExpr  = astExpression(f.expression(0));
          let value  = astExpression(f.expression(1));
          return ({
            computed: true,
            keyExpr: keyExpr,
            isMethod: false,
            isShorthand: false,
            value: value
          });
        }
      }
      if (f.COLON()) {
        {
          let rawKey  = f.propKey().getText();
          let key  = ((rawKey.startsWith("\"") || rawKey.startsWith("'")) ? parseString(rawKey) : rawKey);
          let value  = astExpression(f.expression(0));
          return ({
            computed: false,
            key: key,
            isMethod: false,
            isShorthand: false,
            value: value
          });
        }
      }
      {
        let name  = f.IDENTIFIER().getText();
        return ({
          computed: false,
          key: name,
          isShorthand: true
        });
      }
    });
    {
      let seen_  = new Set();
      fields.forEach((f) => {
        if ((!f.computed)) {
          {
            if (seen_.has(f.key)) {
              throw new Error((("duplicate object key '" + f.key) + "'"));
            }
            seen_.add(f.key);
          }
        }
      });
    }
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "object",
      fields: fields
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
  if (ctx.TILDE()) {
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
  if (ctx.TILDE_AT()) {
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
const astTildeUnquote  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "tilde-unquote",
      expr: expr
    });
  }
};
const astTildeUnquoteSplice  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "tilde-splice",
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
  _astDbg.log_msg("ast", "desugar cond → cond node");
  {
    let clauses  = ctx.condClause().map((c) => {
      return ({
        test: astExpression(c.expression()[0]),
        expr: astExpression(c.expression()[1])
      });
    });
    let elseExpr  = (ctx.condElseClause() ? astExpression(ctx.condElseClause().expression()) : undefined);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "cond",
      clauses: clauses,
      elseExpr: elseExpr
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
  if (ctx.opSymbol()) {
    {
      let name  = ctx.getText();
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: name,
        tag: "identifier",
        name: name
      });
    }
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
  if (ctx.iifeForm()) {
    return astIifeForm(ctx.iifeForm());
  }
  if (ctx.iifeAsyncForm()) {
    return astIifeAsyncForm(ctx.iifeAsyncForm());
  }
  if (ctx.asyncGeneratorFn()) {
    return astAsyncGeneratorFn(ctx.asyncGeneratorFn());
  }
  if (ctx.fnO()) {
    return astFnO(ctx.fnO());
  }
  if (ctx.lambdaO()) {
    return astLambdaO(ctx.lambdaO());
  }
  if (ctx.asyncFnO()) {
    return astAsyncFnO(ctx.asyncFnO());
  }
  if (ctx.asyncLambdaO()) {
    return astAsyncLambdaO(ctx.asyncLambdaO());
  }
  if (ctx.generatorFnO()) {
    return astGeneratorFnO(ctx.generatorFnO());
  }
  if (ctx.asyncGeneratorFnO()) {
    return astAsyncGeneratorFnO(ctx.asyncGeneratorFnO());
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
  if (ctx.braceObjectExpr()) {
    return astBraceObjectExpr(ctx.braceObjectExpr());
  }
  if (ctx.arrayExpr()) {
    return astArrayExpr(ctx.arrayExpr());
  }
  if (ctx.bracketArrayExpr()) {
    return astBracketArrayExpr(ctx.bracketArrayExpr());
  }
  if (ctx.propAccess()) {
    return astPropAccess(ctx.propAccess());
  }
  if (ctx.indexAccess()) {
    return astIndexAccess(ctx.indexAccess());
  }
  if (ctx.subscriptAccess()) {
    return astSubscriptAccess(ctx.subscriptAccess());
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
  if (ctx.tildeUnquote()) {
    return astTildeUnquote(ctx.tildeUnquote());
  }
  if (ctx.tildeUnquoteSplice()) {
    return astTildeUnquoteSplice(ctx.tildeUnquoteSplice());
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
  if (ctx.infixExpr()) {
    return astInfixExpr(ctx.infixExpr());
  }
  if (ctx.macroExprCall()) {
    return astMacroExprCall(ctx.macroExprCall());
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
    let callee  = exprs[0];
    let raw  = ctx.typeArgs();
    let typeArgs  = (raw ? raw.typeExpr().map(astTypeExpr) : []);
    if (((callee.tag == "identifier") && (callee.name == "="))) {
      throw new Error((("syntax error: '=' is not a valid operator at " + ctx.getText()) + "; use '==' for equality or 'set!' for assignment"));
    }
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "call",
      fn: callee,
      args: exprs.slice(1),
      typeArgs: typeArgs
    });
  }
};
const astPropAccess  = (ctx) => {
  if ((!ctx.propKey())) {
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
  }
  {
    let obj  = astExpression(ctx.expression(0));
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
const astSubscriptAccess  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression());
    let rawIndex  = parseString(ctx.STRING().getText());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "subscript-access",
      object: obj,
      rawIndex: rawIndex
    });
  }
};
const astParseFnSig  = (sig) => {
  {
    let params  = sig.param().map((p) => {
      {
        let name  = p.IDENTIFIER().getText();
        let optional  = (p.OPTIONAL() ? true : false);
        let typeAnn  = (p.typeExpr() ? astTypeExpr(p.typeExpr()) : undefined);
        return ({
          name: name,
          optional: optional,
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
    if (ctx.IDENTIFIER()) {
      {
        let name  = ctx.IDENTIFIER().getText();
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "fn-decl",
          name: name,
          params: sig.params,
          rest: sig.rest,
          restType: sig.restType,
          returnType: sig.returnType,
          body: body,
          meta: undefined
        });
      }
    }
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
const astIifeForm  = (ctx) => {
  {
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "iife",
      body: body
    });
  }
};
const astIifeAsyncForm  = (ctx) => {
  {
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "iife-async",
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
const astParseFnoSig  = (sig) => {
  {
    let params  = sig.fnoParam().map((p) => {
      {
        let mods  = p.modifier().map((m) => {
          return m.getText();
        });
        let name  = p.IDENTIFIER().getText();
        let optional  = (p.OPTIONAL() !== null);
        let typeAnn  = (p.typeExpr() ? astTypeExpr(p.typeExpr()) : undefined);
        let defaultExpr  = (p.expression() ? astExpression(p.expression()) : undefined);
        return ({
          modifiers: mods,
          name: name,
          optional: optional,
          typeAnnotation: typeAnn,
          defaultExpr: defaultExpr
        });
      }
    });
    let rp  = sig.fnoRestParam();
    let restName  = (rp ? rp.IDENTIFIER().getText() : undefined);
    let restType  = (rp ? (rp.typeExpr() ? astTypeExpr(rp.typeExpr()) : undefined) : undefined);
    let returnType  = (sig.typeExpr() ? astTypeExpr(sig.typeExpr()) : undefined);
    let seen_  = new Set();
    params.forEach((p) => {
      if (seen_.has(p.name)) {
        throw new Error((("duplicate named arg key '" + p.name) + "'"));
      }
      seen_.add(p.name);
    });
    return ({
      params: params,
      rest: restName,
      restType: restType,
      returnType: returnType
    });
  }
};
const astFnO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    if (ctx.IDENTIFIER()) {
      {
        let name  = ctx.IDENTIFIER().getText();
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "fn-o-decl",
          name: name,
          params: sig.params,
          rest: sig.rest,
          restType: sig.restType,
          returnType: sig.returnType,
          body: body
        });
      }
    }
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "fn-o",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astLambdaO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "lambda-o",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAsyncFnO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "async-fn-o",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAsyncLambdaO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "async-lambda-o",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astGeneratorFnO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "generator-fn-o",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAsyncGeneratorFnO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "async-generator-fn-o",
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astMethodO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let mods  = ctx.modifier().map((m) => {
      return m.getText();
    });
    let key  = astMethodKey(ctx.methodKey());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "method-o-def",
      modifiers: mods,
      computed: key.computed,
      name: key.name,
      key: (key.computed ? key.keyExpr : undefined),
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType,
      body: body
    });
  }
};
const astAbstractMethodO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let mods  = ctx.modifier().map((m) => {
      return m.getText();
    });
    let key  = astMethodKey(ctx.methodKey());
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "abstract-method-o-def",
      modifiers: mods,
      computed: key.computed,
      name: key.name,
      key: (key.computed ? key.keyExpr : undefined),
      params: sig.params,
      rest: sig.rest,
      restType: sig.restType,
      returnType: sig.returnType
    });
  }
};
const astConstructorO  = (ctx) => {
  {
    let sig  = astParseFnoSig(ctx.fnoSignature());
    let body  = ctx.statement().map(astStatement);
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "constructor-o-def",
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
      if ((name.includes(".") && (!name.startsWith("...")))) {
        {
          let target  = desugarDottedIdentifier(name, ctx);
          return ({
            id: registerSpan(nextNodeId(), ctx),
            text: ctx.getText(),
            tag: "assign-prop",
            target: target,
            value: value
          });
        }
      }
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "assign",
        name: name,
        value: value
      });
    }
  }
  if (ctx.indexAccess()) {
    {
      let target  = astIndexAccess(ctx.indexAccess());
      let value  = astExpression(ctx.expression());
      return ({
        id: registerSpan(nextNodeId(), ctx),
        text: ctx.getText(),
        tag: "assign-prop",
        target: target,
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
const astCompoundAssign  = (ctx) => {
  {
    let rawName  = ctx.IDENTIFIER().getText();
    let op  = ctx.getText();
    let opStr  = (ctx.PLUS_ASSIGN() ? "+=" : (ctx.MINUS_ASSIGN() ? "-=" : (ctx.TIMES_ASSIGN() ? "*=" : (ctx.DIV_ASSIGN() ? "/=" : "%="))));
    let value  = astExpression(ctx.expression());
    if ((rawName.includes(".") && (!rawName.startsWith("...")))) {
      {
        let target  = desugarDottedIdentifier(rawName, ctx);
        return ({
          id: registerSpan(nextNodeId(), ctx),
          text: ctx.getText(),
          tag: "compound-assign",
          op: opStr,
          target: target,
          value: value
        });
      }
    }
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "compound-assign",
      op: opStr,
      name: rawName,
      value: value
    });
  }
};
const astSubscriptAssign  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let arrExpr  = exprs[0];
    let idxExpr  = exprs[1];
    let valExpr  = exprs[2];
    let target  = ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "index-access",
      object: arrExpr,
      index: idxExpr
    });
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "assign-prop",
      target: target,
      value: valExpr
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
  if (ctx.NULL()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-id",
      name: "null"
    });
  }
  if (ctx.UNDEFINED()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-id",
      name: "undefined"
    });
  }
  if (ctx.OBJECT()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-id",
      name: "object"
    });
  }
  if (ctx.LBRACE()) {
    return ({
      id: registerSpan(nextNodeId(), ctx),
      text: ctx.getText(),
      tag: "type-id",
      name: "{}"
    });
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
const astUnaryOp  = (ctx) => {
  {
    let id  = registerSpan(nextNodeId(), ctx);
    let op  = ctx.infixUnaryOp().getText();
    let operand  = astInfixAtom(ctx.infixAtom());
    return ({
      id: id,
      tag: "unary-op",
      op: op,
      operand: operand
    });
  }
};
const astInfixAtom  = (ctx) => {
  if (ctx.infixUnaryOp()) {
    return astUnaryOp(ctx);
  }
  if (ctx.literal()) {
    return astLiteral(ctx.literal());
  }
  if (ctx.LBRACE()) {
    return astInfixBody(ctx.infixBody());
  }
  {
    let argsFromCtx  = (c) => {
      {
        let argsCtx  = c.infixArgs();
        if (argsCtx) {
          return argsCtx.infixBody().map(astInfixBody);
        }
        else {
          return [];
        }
      }
    };
    let id  = registerSpan(nextNodeId(), ctx);
    if (ctx.infixAtom()) {
      {
        let callee  = astInfixAtom(ctx.infixAtom());
        let args  = argsFromCtx(ctx);
        return ({
          id: id,
          tag: "call",
          fn: callee,
          args: args,
          typeArgs: []
        });
      }
    }
    if (ctx.LPAREN()) {
      {
        let rawName  = ctx.IDENTIFIER().getText();
        let callee  = ((rawName.includes(".") && (!rawName.startsWith("..."))) ? desugarDottedIdentifier(rawName, ctx) : ({
          id: registerSpan(nextNodeId(), ctx),
          tag: "identifier",
          name: rawName
        }));
        let args  = argsFromCtx(ctx);
        return ({
          id: id,
          tag: "call",
          fn: callee,
          args: args,
          typeArgs: []
        });
      }
    }
    {
      let rawName  = ctx.IDENTIFIER().getText();
      if ((rawName.includes(".") && (!rawName.startsWith("...")))) {
        return desugarDottedIdentifier(rawName, ctx);
      }
      return ({
        id: id,
        tag: "identifier",
        name: rawName
      });
    }
  }
};
const astInfixBody  = (ctx) => {
  {
    let atoms  = ctx.infixAtom().map(astInfixAtom);
    let ops  = ctx.infixBinOp().map((op) => {
      return op.getText();
    });
    if ((atoms.length === 1)) {
      return atoms[0];
    }
    {
      let firstOp  = ops[0];
      ops.forEach((op) => {
        if ((op !== firstOp)) {
          throw new Error(((((("mixed operators in #{}: '" + firstOp) + "' and '") + op) + "' at ") + ctx.getText()));
        }
      });
      return atoms.reduce((acc, cur, i) => {
        {
          let id  = registerSpan(nextNodeId(), ctx);
          return ({
            id: id,
            tag: "binary-op",
            op: ops[(i - 1)],
            left: acc,
            right: cur
          });
        }
      });
    }
  }
};
const astInfixExpr  = (ctx) => {
  _astDbg.log_msg("ast", ("desugar infix: " + ctx.getText().slice(0, 60)));
  return astInfixBody(ctx.infixBody());
};
const astMacroBlockCallHelper  = (ctx, tag) => {
  _astDbg.log_msg("ast", ((("desugar " + tag) + ": ") + ctx.IDENTIFIER().getText()));
  {
    let id  = registerSpan(nextNodeId(), ctx);
    let macroFn  = makeIdentifierNode(ctx.IDENTIFIER().getText(), ctx);
    let headerArgs  = ctx.expression().map(astExpression);
    let body  = ctx.statement().map(astStatement);
    return ({
      id: id,
      tag: tag,
      fn: macroFn,
      headerArgs: headerArgs,
      body: body
    });
  }
};
const astMacroExprCall  = (ctx) => {
  return astMacroBlockCallHelper(ctx, "macro-expr-call");
};
const astMacroBodyCall  = (ctx) => {
  return astMacroBlockCallHelper(ctx, "macro-body-call");
};
export { astProgram, astTopLevel, setAstDebugContext };
