let dbglog  = (...msgs) => {
  console.error(msgs);
};
let parseString  = (tokenText) => {
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
let astProgram  = (ctx) => {
  {
    let body  = ctx.topLevel().map(astTopLevel);
    return ({
      text: ctx.getText(),
      tag: "program",
      body: body
    });
  }
};
let astTopLevel  = (ctx) => {
  if (ctx.defmacro()) {
    return astDefmacro(ctx.defmacro());
  }
  if (ctx.def()) {
    return astDef(ctx.def());
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
  return astStatement(ctx.statement());
};
let astDefmacro  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let params  = ctx.fnSignature().param().map((p) => {
      return p.IDENTIFIER().getText();
    });
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "defmacro",
      name: name,
      params: params,
      body: body
    });
  }
};
let astDef  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let init  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "def",
      name: name,
      init: init
    });
  }
};
let astTypeAlias  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
    let ty  = astTypeExpr(ctx.typeExpr());
    return ({
      text: ctx.getText(),
      tag: "type-alias",
      name: name,
      typeParams: tparams,
      type: ty
    });
  }
};
let astInterfaceDef  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
    let extendsTypes  = (ctx.interfaceExtends() ? ctx.interfaceExtends().typeExpr().map(astTypeExpr) : []);
    let body  = astTypeObject(ctx.typeObject());
    return ({
      text: ctx.getText(),
      tag: "interface-def",
      name: name,
      typeParams: tparams,
      extends: extendsTypes,
      body: body
    });
  }
};
let astModifiers  = (ctx) => {
  ctx.modifier().map((m) => {
    return m.KEYWORD().getText();
  });
};
let astTypedParam  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let optional  = (ctx.OPTIONAL() ? true : false);
    let typeAnn  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    return ({
      name: name,
      optional: optional,
      typeAnnotation: typeAnn
    });
  }
};
let astFnSignatureTyped  = (ctx) => {
  {
    let params  = ctx.typedParam().map(astTypedParam);
    let returnType  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    return ({
      params: params,
      returnType: returnType
    });
  }
};
let astFieldDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let typeAnn  = (ctx.typeExpr() ? astTypeExpr(ctx.typeExpr()) : undefined);
    let init  = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
    return ({
      text: ctx.getText(),
      tag: "field-def",
      modifiers: mods,
      name: name,
      typeAnnotation: typeAnn,
      init: init
    });
  }
};
let astConstructorDef  = (ctx) => {
  {
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "constructor-def",
      sig: sig,
      body: body
    });
  }
};
let astClassMethodDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "class-method-def",
      modifiers: mods,
      name: name,
      sig: sig,
      body: body
    });
  }
};
let astAbstractMethodDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    return ({
      text: ctx.getText(),
      tag: "abstract-method-def",
      modifiers: mods,
      name: name,
      sig: sig
    });
  }
};
let astGetterDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "getter-def",
      modifiers: mods,
      name: name,
      sig: sig,
      body: body
    });
  }
};
let astSetterDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let sig  = astFnSignatureTyped(ctx.fnSignatureTyped());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "setter-def",
      modifiers: mods,
      name: name,
      sig: sig,
      body: body
    });
  }
};
let astClassElement  = (ctx) => {
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
let astClassBody  = (ctx) => {
  {
    let elements  = ctx.classElement().map(astClassElement);
    return ({
      text: ctx.getText(),
      tag: "class-body",
      elements: elements
    });
  }
};
let astClassDef  = (ctx) => {
  {
    let mods  = astModifiers(ctx);
    let name  = ctx.IDENTIFIER().getText();
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
    let extendsType  = (ctx.classExtends() ? astTypeExpr(ctx.classExtends().typeExpr()) : undefined);
    let implementsTypes  = (ctx.classImplements() ? ctx.classImplements().typeExpr().map(astTypeExpr) : []);
    let bodyNode  = astClassBody(ctx.classBody());
    return ({
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
let astSuperConstructorCall  = (ctx) => {
  {
    let args  = ctx.expression().map(astExpression);
    return ({
      text: ctx.getText(),
      tag: "super-constructor-call",
      args: args
    });
  }
};
let astSuperMethodCall  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let args  = ctx.expression().map(astExpression);
    return ({
      text: ctx.getText(),
      tag: "super-method-call",
      name: name,
      args: args
    });
  }
};
let astStatement  = (ctx) => {
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
  {
    let expr  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "expr-stmt",
      expr: expr
    });
  }
};
let astThrow  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "throw",
      expr: expr
    });
  }
};
let astImport  = (ctx) => {
  {
    let spec  = (ctx.objectExpr() ? astObjectExpr(ctx.objectExpr()) : undefined);
    let source  = parseString(ctx.STRING().getText());
    return ({
      text: ctx.getText(),
      tag: "import",
      spec: spec,
      source: source
    });
  }
};
let astExportNamePair  = (ctx) => {
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
let astExportForm  = (ctx) => {
  if (ctx.exportBinding()) {
    {
      let b  = ctx.exportBinding();
      let name  = b.IDENTIFIER().getText();
      let init  = astExpression(b.expression());
      return ({
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
      let expr  = astExpression(d.expression());
      return ({
        text: ctx.getText(),
        tag: "export-default",
        expr: expr
      });
    }
  }
  if (ctx.exportNamed()) {
    {
      let n  = ctx.exportNamed();
      let pairs  = n.exportNamePair().map(astExportNamePair);
      return ({
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
        text: ctx.getText(),
        tag: "export-all-from",
        source: source
      });
    }
  }
  throw new Error("Unknown export form");
};
let astSwitch  = (ctx) => {
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
      text: ctx.getText(),
      tag: "switch",
      discriminant: discriminant,
      cases: cases,
      defaultCase: defaultCase
    });
  }
};
let astFor  = (ctx) => {
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
let astForIn  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let obj  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "for-in",
      name: name,
      object: obj,
      body: body
    });
  }
};
let astForOf  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let iterable  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "for-of",
      name: name,
      iterable: iterable,
      body: body
    });
  }
};
let astLetStar  = (ctx) => {
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
      text: ctx.getText(),
      tag: "let*",
      bindings: bindings,
      body: body
    });
  }
};
let astLetStmt  = (ctx) => {
  {
    let bindCtx  = ctx.singleBinding();
    let name  = bindCtx.IDENTIFIER().getText();
    let typeAnnotation  = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
    let init  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "let",
      name: name,
      typeAnnotation: typeAnnotation,
      init: init
    });
  }
};
let astConstStar  = (ctx) => {
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
      text: ctx.getText(),
      tag: "const*",
      bindings: bindings,
      body: body
    });
  }
};
let astConstStmt  = (ctx) => {
  {
    let bindCtx  = ctx.singleBinding();
    let name  = bindCtx.IDENTIFIER().getText();
    let typeAnnotation  = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
    let init  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "const",
      name: name,
      typeAnnotation: typeAnnotation,
      init: init
    });
  }
};
let astIf  = (ctx) => {
  {
    let test  = astExpression(ctx.expression());
    let ifthen  = astStatement(ctx.statement(0));
    let ctxElse  = ctx.statement(1);
    let ifelse  = (ctxElse ? astStatement(ctxElse) : undefined);
    return ({
      text: ctx.getText(),
      tag: "if",
      test: test,
      ifthen: ifthen,
      ifelse: ifelse
    });
  }
};
let astWhile  = (ctx) => {
  {
    let test  = astExpression(ctx.expression());
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "while",
      test: test,
      body: body
    });
  }
};
let astBlock  = (ctx) => {
  {
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "block",
      body: body
    });
  }
};
let astReturn  = (ctx) => {
  {
    let expr  = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
    return ({
      text: ctx.getText(),
      tag: "return",
      expr: expr
    });
  }
};
let astObjectExpr  = (ctx) => {
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
        if (f.objectMethodDef()) {
          {
            let md  = f.objectMethodDef();
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
      text: ctx.getText(),
      tag: "object",
      fields: fields
    });
  }
};
let astArrayExpr  = (ctx) => {
  {
    let elements  = ctx.expression().map(astExpression);
    return ({
      text: ctx.getText(),
      tag: "array",
      elements: elements
    });
  }
};
let astQuasiquote  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "quasi",
      expr: expr
    });
  }
};
let astUnquote  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "unquote",
      expr: expr
    });
  }
};
let astUnquoteSplicing  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "unquote-splicing",
      expr: expr
    });
  }
};
let astTernary  = (ctx) => {
  {
    let test  = astExpression(ctx.expression(0));
    let ifthen  = astExpression(ctx.expression(1));
    let ifelse  = astExpression(ctx.expression(2));
    return ({
      text: ctx.getText(),
      tag: "ternary",
      test: test,
      ifthen: ifthen,
      ifelse: ifelse
    });
  }
};
let astCondExpr  = (ctx) => {
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
      text: ctx.getText(),
      tag: "cond",
      clauses: clauses
    });
  }
};
let astNewExpr  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    let raw  = ctx.typeArgs();
    let typeArgs  = (raw ? raw.typeExpr().map(astTypeExpr) : []);
    let args  = ctx.expression().map(astExpression);
    return ({
      text: ctx.getText(),
      tag: "new",
      name: name,
      typeArgs: typeArgs,
      args: args
    });
  }
};
let astOptChain  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression());
    let rawKey  = ctx.propKey().getText();
    let key  = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
    return ({
      text: ctx.getText(),
      tag: "opt-chain",
      object: obj,
      key: key
    });
  }
};
let astNullCoalesce  = (ctx) => {
  {
    let left  = astExpression(ctx.expression(0));
    let right  = astExpression(ctx.expression(1));
    return ({
      text: ctx.getText(),
      tag: "null-coalesce",
      left: left,
      right: right
    });
  }
};
let astExpression  = (ctx) => {
  if ((ctx == undefined)) {
    {
      console.error("astExpression: ctx is undefined or null");
      return ({
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
      text: ctx.getText(),
      tag: "keyword",
      value: ctx.KEYWORD().getText()
    });
  }
  if (ctx.IDENTIFIER()) {
    {
      let text  = ctx.IDENTIFIER().getText();
      if ((text.includes(".") && (!text.startsWith("...")))) {
        throw new Error((("Invalid use of dotted identifier: " + text) + ". Use (. obj prop) syntax instead."));
      }
      return ({
        text: ctx.getText(),
        tag: "identifier",
        name: text
      });
    }
  }
  if (ctx.lambda()) {
    return astLambda(ctx.lambda());
  }
  if (ctx.fn()) {
    return astFn(ctx.fn());
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
  if (ctx.nullCoalesce()) {
    return astNullCoalesce(ctx.nullCoalesce());
  }
  if (ctx.typeofExpr()) {
    return astTypeofExpr(ctx.typeofExpr());
  }
  if (ctx.typeAssert()) {
    return astTypeAssert(ctx.typeAssert());
  }
  if (ctx.superConstructorCall()) {
    return astSuperConstructorCall(ctx.superConstructorCall());
  }
  if (ctx.superMethodCall()) {
    return astSuperMethodCall(ctx.superMethodCall());
  }
  if (ctx.thisExpr()) {
    return ({
      text: "this",
      tag: "this"
    });
  }
  if (ctx.call()) {
    return astCall(ctx.call());
  }
  throw new Error(("Unknown expression: " + (ctx.getText ? ctx.getText() : ctx)));
};
let astTypeofExpr  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    return ({
      text: ctx.getText(),
      tag: "typeof-expr",
      expr: expr
    });
  }
};
let astTypeAssert  = (ctx) => {
  {
    let expr  = astExpression(ctx.expression());
    let ty  = astTypeExpr(ctx.typeExpr());
    return ({
      text: ctx.getText(),
      tag: "type-assert",
      expr: expr,
      ty: ty
    });
  }
};
let astCall  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let raw  = ctx.typeArgs();
    let typeArgs  = (raw ? raw.typeExpr().map(astTypeExpr) : []);
    return ({
      text: ctx.getText(),
      tag: "call",
      fn: exprs[0],
      args: exprs.slice(1),
      typeArgs: typeArgs
    });
  }
};
let astPropAccess  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression());
    let rawKey  = ctx.propKey().getText();
    let key  = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
    return ({
      text: ctx.getText(),
      tag: "prop-access",
      object: obj,
      key: key
    });
  }
};
let astIndexAccess  = (ctx) => {
  {
    let obj  = astExpression(ctx.expression(0));
    let idx  = astExpression(ctx.expression(1));
    return ({
      text: ctx.getText(),
      tag: "index-access",
      object: obj,
      index: idx
    });
  }
};
let astLambda  = (ctx) => {
  {
    let params  = ctx.fnSignature().param().map((p) => {
      return p.IDENTIFIER().getText();
    });
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "lambda",
      params: params,
      body: body
    });
  }
};
let astFn  = (ctx) => {
  {
    let params  = ctx.fnSignature().param().map((p) => {
      return p.IDENTIFIER().getText();
    });
    let body  = ctx.statement().map(astStatement);
    return ({
      text: ctx.getText(),
      tag: "fn",
      params: params,
      body: body
    });
  }
};
let astBindExpr  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let fnExpr  = exprs[0];
    let thisArg  = exprs[1];
    let args  = exprs.slice(2);
    return ({
      text: ctx.getText(),
      tag: "bind-expr",
      fn: fnExpr,
      thisArg: thisArg,
      args: args
    });
  }
};
let astMethodCallExpr  = (ctx) => {
  {
    let exprs  = ctx.expression().map(astExpression);
    let obj  = exprs[0];
    let methodExpr  = exprs[1];
    let args  = exprs.slice(2);
    return ({
      text: ctx.getText(),
      tag: "method-call-expr",
      object: obj,
      method: methodExpr,
      args: args
    });
  }
};
let astAssign  = (ctx) => {
  if (ctx.IDENTIFIER()) {
    {
      let name  = ctx.IDENTIFIER().getText();
      let value  = astExpression(ctx.expression());
      return ({
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
      text: ctx.getText(),
      tag: "assign-prop",
      target: target,
      value: value
    });
  }
};
let astLiteral  = (ctx) => {
  if (ctx.NUMBER()) {
    return ({
      text: ctx.getText(),
      tag: "literal",
      value: Number(ctx.NUMBER().getText())
    });
  }
  if (ctx.STRING()) {
    return ({
      text: ctx.getText(),
      tag: "literal",
      value: parseString(ctx.STRING().getText())
    });
  }
  if (ctx.BACKTICK_STRING()) {
    return ({
      text: ctx.getText(),
      tag: "raw-template",
      content: parseString(ctx.BACKTICK_STRING().getText())
    });
  }
  if (ctx.BOOLEAN()) {
    return ({
      text: ctx.getText(),
      tag: "literal",
      value: (ctx.BOOLEAN().getText() === "true")
    });
  }
  if (ctx.NULL()) {
    return ({
      text: ctx.getText(),
      tag: "literal",
      value: null
    });
  }
  if (ctx.UNDEFINED()) {
    return ({
      text: ctx.getText(),
      tag: "literal",
      value: undefined
    });
  }
  throw new Error("Unknown literal");
};
let astTypeExpr  = (ctx) => {
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
      text: ctx.getText(),
      tag: "type-id",
      name: ctx.IDENTIFIER().getText()
    });
  }
  throw new Error(("astTypeExpr: unknown type: " + ctx.getText()));
};
let astTypeUnion  = (ctx) => {
  {
    let members  = ctx.typeExpr().map(astTypeExpr);
    return ({
      text: ctx.getText(),
      tag: "type-union",
      members: members
    });
  }
};
let astTypeIntersection  = (ctx) => {
  {
    let members  = ctx.typeExpr().map(astTypeExpr);
    return ({
      text: ctx.getText(),
      tag: "type-intersection",
      members: members
    });
  }
};
let astTypeArray  = (ctx) => {
  {
    let element  = astTypeExpr(ctx.typeExpr());
    return ({
      text: ctx.getText(),
      tag: "type-array",
      element: element
    });
  }
};
let astTypeTuple  = (ctx) => {
  {
    let elements  = ctx.typeTupleElement().map(astTypeTupleElement);
    return ({
      text: ctx.getText(),
      tag: "type-tuple",
      elements: elements
    });
  }
};
let astTypeTupleElement  = (ctx) => {
  if (ctx.REST()) {
    return ({
      text: ctx.getText(),
      tag: "rest",
      type: astTypeExpr(ctx.typeExpr())
    });
  }
  if ((ctx.IDENTIFIER() && ctx.typeExpr())) {
    return ({
      text: ctx.getText(),
      tag: "labeled",
      name: ctx.IDENTIFIER().getText(),
      type: astTypeExpr(ctx.typeExpr())
    });
  }
  return ({
    text: ctx.getText(),
    tag: "element",
    type: astTypeExpr(ctx.typeExpr())
  });
};
let astTypeFunction  = (ctx) => {
  {
    let tparams  = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map().astTypeParamDecl() : []);
    let params  = ctx.typeFnParam().map(astTypeFnParam);
    let result  = astTypeExpr(ctx.typeExpr());
    return ({
      text: ctx.getText(),
      tag: "type-fn",
      typeParams: tparams,
      params: params,
      result: result
    });
  }
};
let astTypeFnParam  = (ctx) => {
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
let astTypeObject  = (ctx) => {
  {
    let props  = ctx.typeProp().map(astTypeProp);
    return ({
      text: ctx.getText(),
      tag: "type-obj",
      props: props
    });
  }
};
let astTypeProp  = (ctx) => {
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
let astTypeLiteral  = (ctx) => {
  if (ctx.STRING()) {
    return ({
      text: ctx.getText(),
      tag: "type-literal",
      value: parseString(ctx.STRING().getText())
    });
  }
  if (ctx.BACKTICK_STRING()) {
    return ({
      text: ctx.getText(),
      tag: "type-literal",
      value: parseString(ctx.BACKTICK_STRING().getText())
    });
  }
  if (ctx.NUMBER()) {
    return ({
      text: ctx.getText(),
      tag: "type-literal",
      value: Number(ctx.NUMBER().getText())
    });
  }
  if (ctx.BOOLEAN()) {
    return ({
      text: ctx.getText(),
      tag: "type-literal",
      value: (ctx.BOOLEAN().getText() === "true")
    });
  }
  throw new Error("Unknown type literal");
};
let astTypeKeyof  = (ctx) => {
  {
    let operand  = astTypeExpr(ctx.typeExpr());
    return ({
      text: ctx.getText(),
      tag: "type-keyof",
      operand: operand
    });
  }
};
let astTypeTypeof  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    return ({
      text: ctx.getText(),
      tag: "type-typeof",
      name: name
    });
  }
};
let astTypeIndexAccess  = (ctx) => {
  {
    let obj  = astTypeExpr(ctx.typeExpr(0));
    let idx  = astTypeExpr(ctx.typeExpr(1));
    return ({
      text: ctx.getText(),
      tag: "type-index",
      object: obj,
      index: idx
    });
  }
};
let astTypeConditional  = (ctx) => {
  {
    let subject  = astTypeExpr(ctx.typeExpr(0));
    let constraint  = astTypeExpr(ctx.typeExpr(1));
    let trueBranch  = astTypeExpr(ctx.typeExpr(2));
    let falseBranch  = astTypeExpr(ctx.typeExpr(3));
    return ({
      text: ctx.getText(),
      tag: "type-cond",
      subject: subject,
      constraint: constraint,
      trueBranch: trueBranch,
      falseBranch: falseBranch
    });
  }
};
let astTypeInfer  = (ctx) => {
  {
    let name  = ctx.IDENTIFIER().getText();
    return ({
      text: ctx.getText(),
      tag: "type-infer",
      name: name
    });
  }
};
let astTypeMapped  = (ctx) => {
  {
    let binding  = ctx.IDENTIFIER().getText();
    let constraint  = astTypeExpr(ctx.typeExpr(0));
    let mapfn  = (m) => {
      return m.getText();
    };
    let mods  = (ctx.mappedModifiers() ? ctx.mappedModifiers().mappedModifier().map(mapfn) : []);
    let value  = astTypeExpr(ctx.typeExpr(1));
    return ({
      text: ctx.getText(),
      tag: "type-mapped",
      binding: binding,
      constraint: constraint,
      modifiers: mods,
      value: value
    });
  }
};
let astTypeTemplateLiteral  = (ctx) => {
  {
    let parts  = ctx.templatePart().map((p) => {
      if (p.STRING()) {
        return ({
          text: ctx.getText(),
          tag: "str",
          value: parseString(p.STRING().getText())
        });
      }
      else {
        return ({
          text: ctx.getText(),
          tag: "type",
          type: astTypeExpr(p.typeExpr())
        });
      }
    });
    return ({
      text: ctx.getText(),
      tag: "type-template",
      parts: parts
    });
  }
};
let astTypeApplication  = (ctx) => {
  {
    let allTypes  = ctx.typeExpr().map(astTypeExpr);
    let callee  = allTypes[0];
    let args  = allTypes.slice(1);
    return ({
      text: ctx.getText(),
      tag: "type-app",
      callee: callee,
      args: args
    });
  }
};
let astTypeParamDecl  = (ctx) => {
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
export { astProgram };
