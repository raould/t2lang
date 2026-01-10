import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage3DLexer } from "./Stage3DLexer";
import { StarBindingContext, SingleBindingContext, ParamContext, Stage3DParser } from "./Stage3DParser";
import fs from "node:fs";
{
  let dbglog = (...msgs) => {
    console.error(msgs);
  };
  let parseString = (tokenText) => {
    if (tokenText.startsWith("`")) {
      return tokenText.slice(1, -1);
    }
    if (tokenText.startsWith("\"\"\"")) {
      return tokenText.slice(3, -3);
    }
    {
      let inner = tokenText.slice(1, -1);
      let result = "";
      let i = 0;
      while ((i < inner.length)) {
        {
          let ch = inner.charAt(i);
          if ((ch === "\\")) {
            {
              let next = inner.charAt((i + 1));
              i = (i + 1);
              result = (result + ((next === "n") ? "\n" : ((next === "r") ? "\r" : ((next === "t") ? "\t" : ((next === "0") ? String.fromCharCode(0) : (":else" ? next : undefined))))));
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
  let indent = (text) => {
    return text.split("\n").map((line) => {
      return ("  " + line);
    }).join("\n");
  };
  let isDefined = (val) => {
    return (val !== undefined);
  };
  let isOperator = (name) => {
    {
      let ops = ["<", ">", "<=", ">=", "&&", "||", "!=", "!==", "==", "===", "+", "-", "*", "/", "%", "^", "!"];
      return ops.includes(name);
    }
  };
  let isValidId = (key) => {
    return new RegExp("^[a-zA-Z_$][a-zA-Z0-9_$]*$").test(key);
  };
  let astProgram = (ctx) => {
    {
      let body = ctx.topLevel().map(astTopLevel);
      return ({text: ctx.getText(), tag: "program", body: body});
    }
  };
  let astTopLevel = (ctx) => {
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
    return astStatement(ctx.statement());
  };
  let astDefmacro = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let params = ctx.fnSignature().param().map((p) => {
        return p.IDENTIFIER().getText();
      });
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "defmacro", name: name, params: params, body: body});
    }
  };
  let astDef = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let init = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "def", name: name, init: init});
    }
  };
  let astTypeAlias = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let tparams = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
      let ty = astTypeExpr(ctx.typeExpr());
      return ({text: ctx.getText(), tag: "type-alias", name: name, typeParams: tparams, type: ty});
    }
  };
  let astInterfaceDef = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let tparams = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map(astTypeParamDecl) : []);
      let extendsTypes = (ctx.interfaceExtends() ? ctx.interfaceExtends().typeExpr().map(astTypeExpr) : []);
      let body = astTypeObject(ctx.typeObject());
      return ({text: ctx.getText(), tag: "interface-def", name: name, typeParams: tparams, extends: extendsTypes, body: body});
    }
  };
  let astStatement = (ctx) => {
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
      let expr = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "expr-stmt", expr: expr});
    }
  };
  let astThrow = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "throw", expr: expr});
    }
  };
  let astImport = (ctx) => {
    {
      let spec = (ctx.objectExpr() ? astObjectExpr(ctx.objectExpr()) : undefined);
      let source = parseString(ctx.STRING().getText());
      return ({text: ctx.getText(), tag: "import", spec: spec, source: source});
    }
  };
  let astExportNamePair = (ctx) => {
    {
      let name = ctx.IDENTIFIER(0).getText();
      let aliasNode = ctx.IDENTIFIER(1);
      let alias = (aliasNode ? aliasNode.getText() : undefined);
      return ({name: name, alias: alias});
    }
  };
  let astExportForm = (ctx) => {
    if (ctx.exportBinding()) {
      {
        let b = ctx.exportBinding();
        let name = b.IDENTIFIER().getText();
        let init = astExpression(b.expression());
        return ({text: ctx.getText(), tag: "export-binding", name: name, init: init});
      }
    }
    if (ctx.exportDefault()) {
      {
        let d = ctx.exportDefault();
        let expr = astExpression(d.expression());
        return ({text: ctx.getText(), tag: "export-default", expr: expr});
      }
    }
    if (ctx.exportNamed()) {
      {
        let n = ctx.exportNamed();
        let pairs = n.exportNamePair().map(astExportNamePair);
        return ({text: ctx.getText(), tag: "export-named", pairs: pairs});
      }
    }
    if (ctx.exportFrom()) {
      {
        let f = ctx.exportFrom();
        let source = parseString(f.STRING().getText());
        let pairs = f.exportNamePair().map(astExportNamePair);
        return ({text: ctx.getText(), tag: "export-from", source: source, pairs: pairs});
      }
    }
    if (ctx.exportAllFrom()) {
      {
        let a = ctx.exportAllFrom();
        let source = parseString(a.STRING().getText());
        return ({text: ctx.getText(), tag: "export-all-from", source: source});
      }
    }
    throw new Error("Unknown export form");
  };
  let astSwitch = (ctx) => {
    {
      let discriminant = astExpression(ctx.expression());
      let cases = ctx.caseClause().map((c) => {
        {
          let test = astExpression(c.expression());
          let body = c.statement().map(astStatement);
          return ({test: test, body: body});
        }
      });
      let defCtx = ctx.defaultClause();
      let defaultCase = (defCtx ? ({body: defCtx.statement().map(astStatement)}) : undefined);
      return ({text: ctx.getText(), tag: "switch", discriminant: discriminant, cases: cases, defaultCase: defaultCase});
    }
  };
  let astFor = (ctx) => {
    {
      let initCtx = ctx.letStmt();
      let bindCtx = initCtx.singleBinding();
      let initName = bindCtx.IDENTIFIER().getText();
      let initExpr = astExpression(initCtx.expression());
      let test = astExpression(ctx.expression());
      let updateCtx = ctx.assign();
      let updateName = updateCtx.IDENTIFIER().getText();
      let updateExpr = astExpression(updateCtx.expression());
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "for", initName: initName, initExpr: initExpr, test: test, updateName: updateName, updateExpr: updateExpr, body: body});
    }
  };
  let astForIn = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let obj = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "for-in", name: name, object: obj, body: body});
    }
  };
  let astForOf = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let iterable = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "for-of", name: name, iterable: iterable, body: body});
    }
  };
  let astLetStar = (ctx) => {
    {
      let bindings = ctx.starBinding().map((b) => {
        {
          let id = b.IDENTIFIER().getText();
          let init = astExpression(b.expression());
          let typeAnnotation = (b.typeExpr() ? astTypeExpr(b.typeExpr()) : undefined);
          return ({name: id, init: init, typeAnnotation: typeAnnotation});
        }
      });
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "let*", bindings: bindings, body: body});
    }
  };
  let astLetStmt = (ctx) => {
    {
      let bindCtx = ctx.singleBinding();
      let name = bindCtx.IDENTIFIER().getText();
      let typeAnnotation = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
      let init = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "let", name: name, typeAnnotation: typeAnnotation, init: init});
    }
  };
  let astConstStar = (ctx) => {
    {
      let bindings = ctx.starBinding().map((b) => {
        {
          let id = b.IDENTIFIER().getText();
          let init = astExpression(b.expression());
          let typeAnnotation = (b.typeExpr() ? astTypeExpr(b.typeExpr()) : undefined);
          return ({name: id, init: init, typeAnnotation: typeAnnotation});
        }
      });
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "const*", bindings: bindings, body: body});
    }
  };
  let astConstStmt = (ctx) => {
    {
      let bindCtx = ctx.singleBinding();
      let name = bindCtx.IDENTIFIER().getText();
      let typeAnnotation = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
      let init = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "const", name: name, typeAnnotation: typeAnnotation, init: init});
    }
  };
  let astIf = (ctx) => {
    {
      let test = astExpression(ctx.expression());
      let ifthen = astStatement(ctx.statement(0));
      let ctxElse = ctx.statement(1);
      let ifelse = (ctxElse ? astStatement(ctxElse) : undefined);
      return ({text: ctx.getText(), tag: "if", test: test, ifthen: ifthen, ifelse: ifelse});
    }
  };
  let astWhile = (ctx) => {
    {
      let test = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "while", test: test, body: body});
    }
  };
  let astBlock = (ctx) => {
    {
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "block", body: body});
    }
  };
  let astReturn = (ctx) => {
    {
      let expr = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
      return ({text: ctx.getText(), tag: "return", expr: expr});
    }
  };
  let astObjectExpr = (ctx) => {
    {
      let fields = ctx.objectField().map((f) => {
        if ((f.IDENTIFIER() && (!f.propKey()))) {
          {
            let name = f.IDENTIFIER().getText();
            if (f.expression()) {
              throw new Error(("shorthand property field must not have an expression: " + name));
            }
            return ({key: name, isShorthand: true});
          }
        }
        if ((!f.propKey())) {
          throw new Error("objectField: unexpected shape — no propKey and no standalone IDENTIFIER");
        }
        {
          let rawKey = f.propKey().getText();
          let key = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
          if (f.methodDef()) {
            {
              let md = f.methodDef();
              let params = md.fnSignature().param().map((p) => {
                return p.IDENTIFIER().getText();
              });
              let body = md.statement().map(astStatement);
              if (f.expression()) {
                throw new Error(("method field must not have an expression: " + key));
              }
              return ({key: key, isMethod: true, params: params, body: body});
            }
          }
          if ((!f.expression())) {
            throw new Error(("complete property field must have an expression: " + key));
          }
          {
            let value = astExpression(f.expression());
            return ({key: key, isMethod: false, isShorthand: false, value: value});
          }
        }
      });
      return ({text: ctx.getText(), tag: "object", fields: fields});
    }
  };
  let astArrayExpr = (ctx) => {
    {
      let elements = ctx.expression().map(astExpression);
      return ({text: ctx.getText(), tag: "array", elements: elements});
    }
  };
  let astQuasiquote = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "quasi", expr: expr});
    }
  };
  let astUnquote = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "unquote", expr: expr});
    }
  };
  let astUnquoteSplicing = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "unquote-splicing", expr: expr});
    }
  };
  let astTernary = (ctx) => {
    {
      let test = astExpression(ctx.expression(0));
      let ifthen = astExpression(ctx.expression(1));
      let ifelse = astExpression(ctx.expression(2));
      return ({text: ctx.getText(), tag: "ternary", test: test, ifthen: ifthen, ifelse: ifelse});
    }
  };
  let astCondExpr = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      let clauses = [];
      let i = 0;
      while ((i < exprs.length)) {
        clauses.push(({test: exprs[i], expr: exprs[(i + 1)]}));
        i = (i + 2);
      }
      return ({text: ctx.getText(), tag: "cond", clauses: clauses});
    }
  };
  let astNewExpr = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let raw = ctx.typeArgs();
      let typeArgs = (raw ? raw.typeExpr().map(astTypeExpr) : []);
      let args = ctx.expression().map(astExpression);
      return ({text: ctx.getText(), tag: "new", name: name, typeArgs: typeArgs, args: args});
    }
  };
  let astOptChain = (ctx) => {
    {
      let obj = astExpression(ctx.expression());
      let rawKey = ctx.propKey().getText();
      let key = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
      return ({text: ctx.getText(), tag: "opt-chain", object: obj, key: key});
    }
  };
  let astNullCoalesce = (ctx) => {
    {
      let left = astExpression(ctx.expression(0));
      let right = astExpression(ctx.expression(1));
      return ({text: ctx.getText(), tag: "null-coalesce", left: left, right: right});
    }
  };
  let astExpression = (ctx) => {
    if ((ctx == undefined)) {
      {
        console.error("astExpression: ctx is undefined or null");
        return ({text: ctx.getText(), tag: "error", reason: "ctx undefined"});
      }
    }
    if (ctx.literal()) {
      return astLiteral(ctx.literal());
    }
    if (ctx.KEYWORD()) {
      return ({text: ctx.getText(), tag: "keyword", value: ctx.KEYWORD().getText()});
    }
    if (ctx.IDENTIFIER()) {
      {
        let text = ctx.IDENTIFIER().getText();
        if ((text.includes(".") && (!text.startsWith("...")))) {
          throw new Error((("Invalid use of dotted identifier: " + text) + ". Use (. obj prop) syntax instead."));
        }
        return ({text: ctx.getText(), tag: "identifier", name: text});
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
    if (ctx.call()) {
      return astCall(ctx.call());
    }
    throw new Error(("Unknown expression: " + (ctx.getText ? ctx.getText() : ctx)));
  };
  let astTypeofExpr = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "typeof-expr", expr: expr});
    }
  };
  let astCall = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      let raw = ctx.typeArgs();
      let typeArgs = (raw ? raw.typeExpr().map(astTypeExpr) : []);
      return ({text: ctx.getText(), tag: "call", fn: exprs[0], args: exprs.slice(1), typeArgs: typeArgs});
    }
  };
  let astPropAccess = (ctx) => {
    {
      let obj = astExpression(ctx.expression());
      let rawKey = ctx.propKey().getText();
      let key = ((rawKey.startsWith("\"") || (rawKey.startsWith("'") || rawKey.startsWith("`"))) ? parseString(rawKey) : rawKey);
      return ({text: ctx.getText(), tag: "prop-access", object: obj, key: key});
    }
  };
  let astIndexAccess = (ctx) => {
    {
      let obj = astExpression(ctx.expression(0));
      let idx = astExpression(ctx.expression(1));
      return ({text: ctx.getText(), tag: "index-access", object: obj, index: idx});
    }
  };
  let astLambda = (ctx) => {
    {
      let params = ctx.fnSignature().param().map((p) => {
        return p.IDENTIFIER().getText();
      });
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "lambda", params: params, body: body});
    }
  };
  let astFn = (ctx) => {
    {
      let params = ctx.fnSignature().param().map((p) => {
        return p.IDENTIFIER().getText();
      });
      let body = ctx.statement().map(astStatement);
      return ({text: ctx.getText(), tag: "fn", params: params, body: body});
    }
  };
  let astBindExpr = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      let fn = exprs[0];
      let thisArg = exprs[1];
      let args = exprs.slice(2);
      return ({text: ctx.getText(), tag: "bind-expr", fn: fn, thisArg: thisArg, args: args});
    }
  };
  let astMethodCallExpr = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      let obj = exprs[0];
      let method = exprs[1];
      let args = exprs.slice(2);
      return ({text: ctx.getText(), tag: "method-call-expr", object: obj, method: method, args: args});
    }
  };
  let astAssign = (ctx) => {
    if (ctx.IDENTIFIER()) {
      {
        let name = ctx.IDENTIFIER().getText();
        let value = astExpression(ctx.expression());
        return ({text: ctx.getText(), tag: "assign", name: name, value: value});
      }
    }
    {
      let target = astPropAccess(ctx.propAccess());
      let value = astExpression(ctx.expression());
      return ({text: ctx.getText(), tag: "assign-prop", target: target, value: value});
    }
  };
  let astLiteral = (ctx) => {
    if (ctx.NUMBER()) {
      return ({text: ctx.getText(), tag: "literal", value: Number(ctx.NUMBER().getText())});
    }
    if (ctx.STRING()) {
      return ({text: ctx.getText(), tag: "literal", value: parseString(ctx.STRING().getText())});
    }
    if (ctx.BACKTICK_STRING()) {
      return ({text: ctx.getText(), tag: "raw-template", content: parseString(ctx.BACKTICK_STRING().getText())});
    }
    if (ctx.BOOLEAN()) {
      return ({text: ctx.getText(), tag: "literal", value: (ctx.BOOLEAN().getText() === "true")});
    }
    if (ctx.NULL()) {
      return ({text: ctx.getText(), tag: "literal", value: null});
    }
    if (ctx.UNDEFINED()) {
      return ({text: ctx.getText(), tag: "literal", value: undefined});
    }
    throw new Error("Unknown literal");
  };
  let astTypeExpr = (ctx) => {
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
      return ({text: ctx.getText(), tag: "type-id", name: ctx.IDENTIFIER().getText()});
    }
    throw new Error(("astTypeExpr: unknown type: " + ctx.getText()));
  };
  let astTypeUnion = (ctx) => {
    {
      let members = ctx.typeExpr().map(astTypeExpr);
      return ({text: ctx.getText(), tag: "type-union", members: members});
    }
  };
  let astTypeIntersection = (ctx) => {
    {
      let members = ctx.typeExpr().map(astTypeExpr);
      return ({text: ctx.getText(), tag: "type-intersection", members: members});
    }
  };
  let astTypeArray = (ctx) => {
    {
      let element = astTypeExpr(ctx.typeExpr());
      return ({text: ctx.getText(), tag: "type-array", element: element});
    }
  };
  let astTypeTuple = (ctx) => {
    {
      let elements = ctx.typeTupleElement().map(astTypeTupleElement);
      return ({text: ctx.getText(), tag: "type-tuple", elements: elements});
    }
  };
  let astTypeTupleElement = (ctx) => {
    if (ctx.REST()) {
      return ({text: ctx.getText(), tag: "rest", type: astTypeExpr(ctx.typeExpr())});
    }
    if ((ctx.IDENTIFIER() && ctx.typeExpr())) {
      return ({text: ctx.getText(), tag: "labeled", name: ctx.IDENTIFIER().getText(), type: astTypeExpr(ctx.typeExpr())});
    }
    return ({text: ctx.getText(), tag: "element", type: astTypeExpr(ctx.typeExpr())});
  };
  let astTypeFunction = (ctx) => {
    {
      let tparams = (ctx.typeParams() ? ctx.typeParams().typeParamDecl().map().astTypeParamDecl() : []);
      let params = ctx.typeFnParam().map(astTypeFnParam);
      let result = astTypeExpr(ctx.typeExpr());
      return ({text: ctx.getText(), tag: "type-fn", typeParams: tparams, params: params, result: result});
    }
  };
  let astTypeFnParam = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let optional = (ctx.OPTIONAL() !== null);
      let ty = astTypeExpr(ctx.typeExpr());
      return ({name: name, optional: optional, type: ty});
    }
  };
  let astTypeObject = (ctx) => {
    {
      let props = ctx.typeProp().map(astTypeProp);
      return ({text: ctx.getText(), tag: "type-obj", props: props});
    }
  };
  let astTypeProp = (ctx) => {
    {
      let isReadonly = (ctx.propModifier().length > 0);
      let name = ctx.IDENTIFIER().getText();
      let optional = (ctx.OPTIONAL() !== null);
      let ty = astTypeExpr(ctx.typeExpr());
      return ({readonly: isReadonly, name: name, optional: optional, type: ty});
    }
  };
  let astTypeLiteral = (ctx) => {
    if (ctx.STRING()) {
      return ({text: ctx.getText(), tag: "type-literal", value: parseString(ctx.STRING().getText())});
    }
    if (ctx.BACKTICK_STRING()) {
      return ({text: ctx.getText(), tag: "type-literal", value: parseString(ctx.BACKTICK_STRING().getText())});
    }
    if (ctx.NUMBER()) {
      return ({text: ctx.getText(), tag: "type-literal", value: Number(ctx.NUMBER().getText())});
    }
    if (ctx.BOOLEAN()) {
      return ({text: ctx.getText(), tag: "type-literal", value: (ctx.BOOLEAN().getText() === "true")});
    }
    throw new Error("Unknown type literal");
  };
  let astTypeKeyof = (ctx) => {
    {
      let operand = astTypeExpr(ctx.typeExpr());
      return ({text: ctx.getText(), tag: "type-keyof", operand: operand});
    }
  };
  let astTypeTypeof = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      return ({text: ctx.getText(), tag: "type-typeof", name: name});
    }
  };
  let astTypeIndexAccess = (ctx) => {
    {
      let obj = astTypeExpr(ctx.typeExpr(0));
      let idx = astTypeExpr(ctx.typeExpr(1));
      return ({text: ctx.getText(), tag: "type-index", object: obj, index: idx});
    }
  };
  let astTypeConditional = (ctx) => {
    {
      let subject = astTypeExpr(ctx.typeExpr(0));
      let constraint = astTypeExpr(ctx.typeExpr(1));
      let trueBranch = astTypeExpr(ctx.typeExpr(2));
      let falseBranch = astTypeExpr(ctx.typeExpr(3));
      return ({text: ctx.getText(), tag: "type-cond", subject: subject, constraint: constraint, trueBranch: trueBranch, falseBranch: falseBranch});
    }
  };
  let astTypeInfer = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      return ({text: ctx.getText(), tag: "type-infer", name: name});
    }
  };
  let astTypeMapped = (ctx) => {
    {
      let binding = ctx.IDENTIFIER().getText();
      let constraint = astTypeExpr(ctx.typeExpr(0));
      let mapfn = (m) => {
        return m.getText();
      };
      let modifiers = (ctx.mappedModifiers() ? ctx.mappedModifiers().mappedModifier().map(mapfn) : []);
      let value = astTypeExpr(ctx.typeExpr(1));
      return ({text: ctx.getText(), tag: "type-mapped", binding: binding, constraint: constraint, modifiers: modifiers, value: value});
    }
  };
  let astTypeTemplateLiteral = (ctx) => {
    {
      let parts = ctx.templatePart().map((p) => {
        if (p.STRING()) {
          return ({text: ctx.getText(), tag: "str", value: parseString(p.STRING().getText())});
        }
        else {
          return ({text: ctx.getText(), tag: "type", type: astTypeExpr(p.typeExpr())});
        }
      });
      return ({text: ctx.getText(), tag: "type-template", parts: parts});
    }
  };
  let astTypeApplication = (ctx) => {
    {
      let allTypes = ctx.typeExpr().map(astTypeExpr);
      let callee = allTypes[0];
      let args = allTypes.slice(1);
      return ({text: ctx.getText(), tag: "type-app", callee: callee, args: args});
    }
  };
  let astTypeParamDecl = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let constraint = (ctx.typeParamConstraint() ? astTypeExpr(ctx.typeParamConstraint().typeExpr()) : undefined);
      let defaultType = (ctx.typeParamDefault() ? astTypeExpr(ctx.typeParamDefault().typeExpr()) : undefined);
      return ({name: name, constraint: constraint, default: defaultType});
    }
  };
  let lowerProgram = (node) => {
    {
      let body = node.body.map(lowerTopLevel);
      return ({node: node, tag: "program", body: body});
    }
  };
  let lowerTopLevel = (node) => {
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
    return lowerStmt(node);
  };
  let lowerTypeAlias = (node) => {
    return ({node: node, tag: "type-alias", name: node.name, typeParams: ((node.typeParams && (node.typeParams.length > 0)) ? node.typeParams.map((p) => {
      return ({name: p.name, constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined), default: (p.default ? lowerTypeExpr(p.default) : undefined)});
    }) : []), type: lowerTypeExpr(node.type)});
  };
  let lowerInterfaceDef = (node) => {
    return ({node: node, tag: "interface-def", name: node.name, typeParams: ((node.typeParams && (node.typeParams.length > 0)) ? node.typeParams.map((p) => {
      return ({name: p.name, constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined), default: (p.default ? lowerTypeExpr(p.default) : undefined)});
    }) : []), extends: node.extends.map(lowerTypeExpr), body: lowerTypeExpr(node.body)});
  };
  let lowerDefmacro = (node) => {
    {
      let body = node.body.map(lowerStmt);
      return ({node: node, tag: "defmacro", name: node.name, params: node.params, body: body});
    }
  };
  let lowerDef = (node) => {
    {
      let init = lowerExpr(node.init);
      return ({node: node, tag: "let-stmt", name: node.name, init: init});
    }
  };
  let lowerStmt = (node) => {
    if ((node.tag === "let*")) {
      return lowerLetStar(node);
    }
    if ((node.tag === "let")) {
      return ({node: node, tag: "let-stmt", name: node.name, typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined), init: lowerExpr(node.init)});
    }
    if ((node.tag === "const*")) {
      return lowerConstStar(node);
    }
    if ((node.tag === "const")) {
      return ({node: node, tag: "const-stmt", name: node.name, typeAnnotation: (node.typeAnnotation ? lowerTypeExpr(node.typeAnnotation) : undefined), init: lowerExpr(node.init)});
    }
    if ((node.tag === "if")) {
      return ({node: node, tag: "if-stmt", test: lowerExpr(node.test), ifthen: lowerStmt(node.ifthen), ifelse: (node.ifelse ? lowerStmt(node.ifelse) : undefined)});
    }
    if ((node.tag === "while")) {
      return ({node: node, tag: "while-stmt", test: lowerExpr(node.test), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "block")) {
      return ({node: node, tag: "block-stmt", body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "return")) {
      return ({node: node, tag: "return-stmt", expr: (node.expr ? lowerExpr(node.expr) : undefined)});
    }
    if ((node.tag === "assign")) {
      return ({node: node, tag: "assign-stmt", name: node.name, value: lowerExpr(node.value)});
    }
    if ((node.tag === "assign-prop")) {
      return ({node: node, tag: "assign-prop-stmt", target: lowerExpr(node.target), value: lowerExpr(node.value)});
    }
    if ((node.tag === "throw")) {
      return ({node: node, tag: "throw-stmt", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "import")) {
      return lowerImport(node);
    }
    if ((node.tag === "export-binding")) {
      return ({node: node, tag: "export-binding-stmt", name: node.name, init: lowerExpr(node.init)});
    }
    if ((node.tag === "export-default")) {
      return ({node: node, tag: "export-default-stmt", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "export-named")) {
      return ({node: node, tag: "export-named-stmt", pairs: node.pairs});
    }
    if ((node.tag === "export-from")) {
      return ({node: node, tag: "export-from-stmt", source: node.source, pairs: node.pairs});
    }
    if ((node.tag === "export-all-from")) {
      return ({node: node, tag: "export-all-from-stmt", source: node.source});
    }
    if ((node.tag === "switch")) {
      return lowerSwitch(node);
    }
    if ((node.tag === "for")) {
      return ({node: node, tag: "for-stmt", initName: node.initName, initExpr: lowerExpr(node.initExpr), test: lowerExpr(node.test), updateName: node.updateName, updateExpr: lowerExpr(node.updateExpr), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "for-in")) {
      return ({node: node, tag: "for-in-stmt", name: node.name, object: lowerExpr(node.object), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "for-of")) {
      return ({node: node, tag: "for-of-stmt", name: node.name, iterable: lowerExpr(node.iterable), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "expr-stmt")) {
      return ({node: node, tag: "expr-stmt", expr: lowerExpr(node.expr)});
    }
    throw new Error((("lowerStmt: unexpected tag >" + node.tag) + "<"));
  };
  let lowerLetStar = (node) => {
    {
      let stmts = [];
      node.bindings.forEach((b) => {
        stmts.push(({node: node, tag: "let-stmt", name: b.name, typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined), init: (b.init ? lowerExpr(b.init) : (":else" ? undefined : undefined))}));
      });
      node.body.forEach((s) => {
        stmts.push(lowerStmt(s));
      });
      return ({node: node, tag: "block-stmt", body: stmts});
    }
  };
  let lowerConstStar = (node) => {
    {
      let stmts = [];
      node.bindings.forEach((b) => {
        stmts.push(({node: node, tag: "const-stmt", name: b.name, typeAnnotation: (b.typeAnnotation ? lowerTypeExpr(b.typeAnnotation) : undefined), init: (b.init ? lowerExpr(b.init) : (":else" ? undefined : undefined))}));
      });
      node.body.forEach((s) => {
        stmts.push(lowerStmt(s));
      });
      return ({node: node, tag: "block-stmt", body: stmts});
    }
  };
  let lowerImport = (node) => {
    {
      let spec = node.spec;
      let defaultName = undefined;
      let namespaceName = undefined;
      let named = undefined;
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
                let nm = undefined;
                let al = undefined;
                el.fields.forEach((ff) => {
                  if ((ff.key === ":name")) {
                    nm = ff.value.value;
                  }
                  if ((ff.key === ":as")) {
                    al = ff.value.value;
                  }
                });
                return ({name: nm, alias: al});
              }
            });
          }
        });
      }
      return ({node: node, tag: "import-stmt", defaultName: defaultName, namespaceName: namespaceName, named: named, source: node.source});
    }
  };
  let lowerSwitch = (node) => {
    {
      let discriminant = lowerExpr(node.discriminant);
      let cases = node.cases.map((c) => {
        return ({test: lowerExpr(c.test), body: c.body.map(lowerStmt)});
      });
      let defaultCase = (node.defaultCase ? ({body: node.defaultCase.body.map(lowerStmt)}) : undefined);
      return ({node: node, tag: "switch-stmt", discriminant: discriminant, cases: cases, defaultCase: defaultCase});
    }
  };
  let lowerExpr = (node) => {
    if ((node.tag === "prop-access")) {
      return ({node: node, tag: "prop-access-expr", object: lowerExpr(node.object), key: node.key});
    }
    if ((node.tag === "index-access")) {
      return ({node: node, tag: "index-access-expr", object: lowerExpr(node.object), index: lowerExpr(node.index)});
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
      return ({node: node, tag: "lambda", params: node.params, body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "fn")) {
      return ({node: node, tag: "fn", params: node.params, body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "bind-expr")) {
      return ({node: node, tag: "bind-expr", fn: lowerExpr(node.fn), thisArg: lowerExpr(node.thisArg), args: node.args.map(lowerExpr)});
    }
    if ((node.tag === "method-call-expr")) {
      return ({node: node, tag: "method-call-expr", object: lowerExpr(node.object), method: lowerExpr(node.method), args: node.args.map(lowerExpr)});
    }
    if ((node.tag === "object")) {
      return ({node: node, tag: "object-expr", fields: node.fields.map((f) => {
        if (f.isMethod) {
          return ({key: f.key, isMethod: true, params: f.params, body: f.body.map(lowerStmt)});
        }
        if (f.isShorthand) {
          return ({key: f.key, isShorthand: true});
        }
        return ({key: f.key, isMethod: false, isShorthand: false, value: lowerExpr(f.value)});
      })});
    }
    if ((node.tag === "array")) {
      return ({node: node, tag: "array-expr", elements: node.elements.map(lowerExpr)});
    }
    if ((node.tag === "quasi")) {
      return ({node: node, tag: "quasi-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "unquote")) {
      return ({node: node, tag: "unquote-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "unquote-splicing")) {
      return ({node: node, tag: "unquote-splicing-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "ternary")) {
      return ({node: node, tag: "ternary-expr", test: lowerExpr(node.test), ifthen: lowerExpr(node.ifthen), ifelse: lowerExpr(node.ifelse)});
    }
    if ((node.tag === "cond")) {
      return lowerCond(node);
    }
    if ((node.tag === "typeof-expr")) {
      return ({node: node, tag: "typeof-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "new")) {
      {
        let typeArgs = (node.typeArgs ? node.typeArgs.map(lowerTypeExpr) : []);
        let args = node.args.map(lowerExpr);
        return ({node: node, tag: "new-expr", name: node.name, typeArgs: typeArgs, args: args});
      }
    }
    if ((node.tag === "opt-chain")) {
      return ({node: node, tag: "opt-chain-expr", object: lowerExpr(node.object), key: node.key});
    }
    if ((node.tag === "null-coalesce")) {
      return ({node: node, tag: "null-coalesce-expr", left: lowerExpr(node.left), right: lowerExpr(node.right)});
    }
    if ((node.tag === "call")) {
      return lowerCall(node);
    }
    throw new Error((("lowerExpr: unexpected tag >" + node.tag) + "<"));
  };
  let lowerCall = (node) => {
    if (((node.fn.tag === "identifier") && isOperator(node.fn.name))) {
      {
        let op = node.fn.name;
        let args = node.args.map(lowerExpr);
        if ((args.length === 1)) {
          return ({node: node, tag: "operator-expr", op: op, args: args});
        }
        {
          let result = ({node: node, tag: "operator-expr", op: op, args: [args[0], args[1]]});
          let i = 2;
          while ((i < args.length)) {
            result = ({node: node, tag: "operator-expr", op: op, args: [result, args[i]]});
            i = (i + 1);
          }
          return result;
        }
      }
    }
    {
      let typeArgs = (node.typeArgs ? node.typeArgs.map(lowerTypeExpr) : []);
      let args = node.args.map(lowerExpr);
      return ({node: node, tag: "call", fn: lowerExpr(node.fn), args: args, typeArgs: typeArgs});
    }
  };
  let lowerCond = (node) => {
    {
      let clauses = node.clauses;
      let i = (clauses.length - 1);
      let last = clauses[i];
      let isElse = ((last.test.tag === "keyword") && (last.test.value === ":else"));
      let result = (isElse ? lowerExpr(last.expr) : ({node: node, tag: "ternary-expr", test: lowerExpr(last.test), ifthen: lowerExpr(last.expr), ifelse: ({tag: "literal", value: undefined})}));
      i = (i - 1);
      while ((i >= 0)) {
        {
          let c = clauses[i];
          result = ({node: node, tag: "ternary-expr", test: lowerExpr(c.test), ifthen: lowerExpr(c.expr), ifelse: result});
        }
        i = (i - 1);
      }
      return result;
    }
  };
  let lowerTypeExpr = (node) => {
    if ((node.tag === "type-id")) {
      return node;
    }
    if ((node.tag === "type-union")) {
      return ({node: node, tag: "type-union", members: node.members.map(lowerTypeExpr)});
    }
    if ((node.tag === "type-intersection")) {
      return ({node: node, tag: "type-intersection", members: node.members.map(lowerTypeExpr)});
    }
    if ((node.tag === "type-array")) {
      return ({node: node, tag: "type-array", element: lowerTypeExpr(node.element)});
    }
    if ((node.tag === "type-app")) {
      {
        let lowerCallee = lowerTypeExpr(node.callee);
        let reserved = ["union", "intersect", "array", "tuple", "tfn", "tlit", "keyof", "typeof", "index", "cond", "infer", "mapped", "template", "rest", "readonly", "type-params", "type-args", "extends", "default", "modifiers"];
        if (((lowerCallee.tag === "type-id") && reserved.includes(lowerCallee.name))) {
          throw new Error(("Invalid type application: reserved keyword used as constructor: " + lowerCallee.name));
        }
        return ({node: node, tag: "type-app", callee: lowerCallee, args: node.args.map(lowerTypeExpr)});
      }
    }
    if ((node.tag === "type-tuple")) {
      return ({node: node, tag: "type-tuple", elements: node.elements.map((el) => {
        return ({node: node, tag: el.tag, name: el.name, type: lowerTypeExpr(el.type)});
      })});
    }
    if ((node.tag === "type-fn")) {
      return ({node: node, tag: "type-fn", typeParams: node.typeParams.map((p) => {
        return ({name: p.name, constraint: (p.constraint ? lowerTypeExpr(p.constraint) : undefined), default: (p.default ? lowerTypeExpr(p.default) : undefined)});
      }), params: node.params.map((p) => {
        return ({name: p.name, optional: p.optional, type: lowerTypeExpr(p.type)});
      }), result: lowerTypeExpr(node.result)});
    }
    if ((node.tag === "type-obj")) {
      return ({node: node, tag: "type-obj", props: node.props.map((p) => {
        return ({readonly: p.readonly, name: p.name, optional: p.optional, type: lowerTypeExpr(p.type)});
      })});
    }
    if ((node.tag === "type-literal")) {
      return node;
    }
    if ((node.tag === "type-keyof")) {
      return ({node: node, tag: "type-keyof", operand: lowerTypeExpr(node.operand)});
    }
    if ((node.tag === "type-typeof")) {
      return node;
    }
    if ((node.tag === "type-index")) {
      return ({node: node, tag: "type-index", object: lowerTypeExpr(node.object), index: lowerTypeExpr(node.index)});
    }
    if ((node.tag === "type-cond")) {
      return ({node: node, tag: "type-cond", subject: lowerTypeExpr(node.subject), constraint: lowerTypeExpr(node.constraint), trueBranch: lowerTypeExpr(node.trueBranch), falseBranch: lowerTypeExpr(node.falseBranch)});
    }
    if ((node.tag === "type-infer")) {
      return node;
    }
    if ((node.tag === "type-mapped")) {
      return ({node: node, tag: "type-mapped", binding: node.binding, constraint: lowerTypeExpr(node.constraint), modifiers: node.modifiers, value: lowerTypeExpr(node.value)});
    }
    if ((node.tag === "type-template")) {
      return ({node: node, tag: "type-template", parts: node.parts.map((p) => {
        if ((p.tag === "str")) {
          return p;
        }
        return ({node: node, tag: "type", type: lowerTypeExpr(p.type)});
      })});
    }
    throw new Error((("lowerTypeExpr: unexpected tag >" + node.tag) + "<"));
  };
  let emitProgram = (node) => {
    return node.body.map(emitTopLevel).join("\n");
  };
  let emitTopLevel = (node) => {
    if ((node.tag === "defmacro")) {
      return ("// macro: " + node.name);
    }
    return emitStmt(node);
  };
  let emitStmt = (stmt) => {
    if ((stmt.tag === "type-alias")) {
      {
        let tparams = ((stmt.typeParams && (stmt.typeParams.length > 0)) ? (("<" + stmt.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : " ");
        let ty = emitTypeExpr(stmt.type);
        return ((((("type " + stmt.name) + tparams) + " = ") + ty) + ";");
      }
    }
    if ((stmt.tag === "interface-def")) {
      {
        let tparams = ((stmt.typeParams && (stmt.typeParams.length > 0)) ? (("<" + stmt.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : " ");
        let extendsStr = ((stmt.extends.length > 0) ? (" extends " + stmt.extends.map(emitTypeExpr).join(", ")) : "");
        let body = emitTypeExpr(stmt.body);
        return ((((("interface " + stmt.name) + tparams) + extendsStr) + " ") + body);
      }
    }
    if ((stmt.tag === "let-stmt")) {
      {
        let typeStr = (stmt.typeAnnotation ? (": " + emitTypeExpr(stmt.typeAnnotation)) : " ");
        if (isDefined(stmt.init)) {
          return ((((("let " + stmt.name) + typeStr) + " = ") + emitExpr(stmt.init)) + ";");
        }
        else {
          return ((("let " + stmt.name) + typeStr) + ";");
        }
      }
    }
    if ((stmt.tag === "const-stmt")) {
      {
        let typeStr = (stmt.typeAnnotation ? (": " + emitTypeExpr(stmt.typeAnnotation)) : " ");
        if (isDefined(stmt.init)) {
          return ((((("const " + stmt.name) + typeStr) + " = ") + emitExpr(stmt.init)) + ";");
        }
        else {
          return ((("const " + stmt.name) + typeStr) + ";");
        }
      }
    }
    if ((stmt.tag === "if-stmt")) {
      return emitIf(stmt);
    }
    if ((stmt.tag === "while-stmt")) {
      return emitWhile(stmt);
    }
    if ((stmt.tag === "block-stmt")) {
      return emitBlock(stmt);
    }
    if ((stmt.tag === "assign-stmt")) {
      return (((stmt.name + " = ") + emitExpr(stmt.value)) + ";");
    }
    if ((stmt.tag === "assign-prop-stmt")) {
      return (((emitExpr(stmt.target) + " = ") + emitExpr(stmt.value)) + ";");
    }
    if ((stmt.tag === "return-stmt")) {
      if (stmt.expr) {
        return (("return " + emitExpr(stmt.expr)) + ";");
      }
      else {
        return "return;";
      }
    }
    if ((stmt.tag === "throw-stmt")) {
      return (("throw " + emitExpr(stmt.expr)) + ";");
    }
    if ((stmt.tag === "import-stmt")) {
      return emitImport(stmt);
    }
    if ((stmt.tag === "export-binding-stmt")) {
      return (((("export const " + stmt.name) + " = ") + emitExpr(stmt.init)) + ";");
    }
    if ((stmt.tag === "export-default-stmt")) {
      return (("export default " + emitExpr(stmt.expr)) + ";");
    }
    if ((stmt.tag === "export-named-stmt")) {
      {
        let specs = stmt.pairs.map((p) => {
          if (p.alias) {
            return ((p.name + " as ") + p.alias);
          }
          else {
            return p.name;
          }
        }).join(", ");
        return (("export { " + specs) + " };");
      }
    }
    if ((stmt.tag === "export-from-stmt")) {
      {
        let specs = stmt.pairs.map((p) => {
          if (p.alias) {
            return ((p.name + " as ") + p.alias);
          }
          else {
            return p.name;
          }
        }).join(", ");
        return (((("export { " + specs) + " } from ") + JSON.stringify(stmt.source)) + ";");
      }
    }
    if ((stmt.tag === "export-all-from-stmt")) {
      return (("export * from " + JSON.stringify(stmt.source)) + ";");
    }
    if ((stmt.tag === "switch-stmt")) {
      return emitSwitch(stmt);
    }
    if ((stmt.tag === "for-stmt")) {
      return emitFor(stmt);
    }
    if ((stmt.tag === "for-in-stmt")) {
      return emitForIn(stmt);
    }
    if ((stmt.tag === "for-of-stmt")) {
      return emitForOf(stmt);
    }
    if ((stmt.tag === "expr-stmt")) {
      return (emitExpr(stmt.expr) + ";");
    }
    throw new Error((("emitStmt: unexpected tag >" + stmt.tag) + "<"));
  };
  let emitIf = (node) => {
    {
      let lines = [];
      lines.push((("if (" + emitExpr(node.test)) + ") {"));
      lines.push(indent(emitStmt(node.ifthen)));
      lines.push("}");
      if (isDefined(node.ifelse)) {
        {
          lines.push("else {");
          lines.push(indent(emitStmt(node.ifelse)));
          lines.push("}");
        }
      }
      return lines.join("\n");
    }
  };
  let emitWhile = (node) => {
    {
      let lines = [];
      lines.push((("while (" + emitExpr(node.test)) + ") {"));
      node.body.forEach((s) => {
        lines.push(indent(emitStmt(s)));
      });
      lines.push("}");
      return lines.join("\n");
    }
  };
  let emitBlock = (node) => {
    {
      let lines = ["{"];
      node.body.forEach((s) => {
        lines.push(indent(emitStmt(s)));
      });
      lines.push("}");
      return lines.join("\n");
    }
  };
  let emitImport = (node) => {
    {
      let parts = [];
      if (node.defaultName) {
        parts.push(node.defaultName);
      }
      if (node.namespaceName) {
        parts.push(("* as " + node.namespaceName));
      }
      if (node.named) {
        {
          let specs = node.named.map((n) => {
            if (n.alias) {
              return ((n.name + " as ") + n.alias);
            }
            else {
              return n.name;
            }
          });
          parts.push((("{ " + specs.join(", ")) + " }"));
        }
      }
      if ((parts.length > 0)) {
        return (((("import " + parts.join(", ")) + " from ") + JSON.stringify(node.source)) + ";");
      }
      return (("import " + JSON.stringify(node.source)) + ";");
    }
  };
  let emitSwitch = (node) => {
    {
      let lines = [];
      lines.push((("switch (" + emitExpr(node.discriminant)) + ") {"));
      node.cases.forEach((c) => {
        lines.push((("  case " + emitExpr(c.test)) + ":"));
        c.body.forEach((s) => {
          lines.push(indent(indent(emitStmt(s))));
        });
        lines.push("    break;");
      });
      if (node.defaultCase) {
        {
          lines.push("  default:");
          node.defaultCase.body.forEach((s) => {
            lines.push(indent(indent(emitStmt(s))));
          });
        }
      }
      lines.push("}");
      return lines.join("\n");
    }
  };
  let emitFor = (node) => {
    {
      let lines = [];
      let init = ((("let " + node.initName) + " = ") + emitExpr(node.initExpr));
      let test = emitExpr(node.test);
      let update = ((node.updateName + " = ") + emitExpr(node.updateExpr));
      lines.push((((((("for (" + init) + "; ") + test) + "; ") + update) + ") {"));
      node.body.forEach((s) => {
        lines.push(indent(emitStmt(s)));
      });
      lines.push("}");
      return lines.join("\n");
    }
  };
  let emitForIn = (node) => {
    {
      let lines = [];
      lines.push((((("for (const " + node.name) + " in ") + emitExpr(node.object)) + ") {"));
      node.body.forEach((s) => {
        lines.push(indent(emitStmt(s)));
      });
      lines.push("}");
      return lines.join("\n");
    }
  };
  let emitForOf = (node) => {
    {
      let lines = [];
      lines.push((((("for (const " + node.name) + " of ") + emitExpr(node.iterable)) + ") {"));
      node.body.forEach((s) => {
        lines.push(indent(emitStmt(s)));
      });
      lines.push("}");
      return lines.join("\n");
    }
  };
  let emitExpr = (expr) => {
    if ((expr.tag === "prop-access-expr")) {
      return (emitExpr(expr.object) + (isValidId(expr.key) ? ("." + expr.key) : (("[\"" + expr.key) + "\"]")));
    }
    if ((expr.tag === "index-access-expr")) {
      return (((emitExpr(expr.object) + "[") + emitExpr(expr.index)) + "]");
    }
    if ((expr.tag === "raw-template")) {
      return (("`" + expr.content) + "`");
    }
    if ((expr.tag === "literal")) {
      return ((expr.value === undefined) ? "undefined" : JSON.stringify(expr.value));
    }
    if ((expr.tag === "keyword")) {
      return JSON.stringify(expr.value);
    }
    if ((expr.tag === "identifier")) {
      return expr.name;
    }
    if ((expr.tag === "object-expr")) {
      return (("({\n" + indent(expr.fields.map((f) => {
        if (f.isMethod) {
          {
            let params = f.params.join(", ");
            let body = f.body.map(emitStmt);
            let keyStr = (isValidId(f.key) ? f.key : (("\"" + f.key) + "\""));
            return (((((keyStr + "(") + params) + ") {\n") + indent(body.join("\n"))) + "\n}");
          }
        }
        if (f.isShorthand) {
          return f.key;
        }
        {
          let keyStr = (isValidId(f.key) ? f.key : (("\"" + f.key) + "\""));
          return ((keyStr + ": ") + emitExpr(f.value));
        }
      }).join(",\n"))) + "\n})");
    }
    if ((expr.tag === "array-expr")) {
      return (("[" + expr.elements.map(emitExpr).join(", ")) + "]");
    }
    if ((expr.tag === "quasi-expr")) {
      return ("/* quasiquote */ " + emitExpr(expr.expr));
    }
    if ((expr.tag === "unquote-expr")) {
      return ("/* unquote */ " + emitExpr(expr.expr));
    }
    if ((expr.tag === "unquote-splicing-expr")) {
      return ("/* unquote-splicing */ " + emitExpr(expr.expr));
    }
    if ((expr.tag === "ternary-expr")) {
      return (((((("(" + emitExpr(expr.test)) + " ? ") + emitExpr(expr.ifthen)) + " : ") + emitExpr(expr.ifelse)) + ")");
    }
    if ((expr.tag === "call")) {
      return emitCall(expr);
    }
    if ((expr.tag === "lambda")) {
      return emitLambda(expr);
    }
    if ((expr.tag === "fn")) {
      return emitFn(expr);
    }
    if ((expr.tag === "bind-expr")) {
      return emitBindExpr(expr);
    }
    if ((expr.tag === "method-call-expr")) {
      return emitMethodCall(expr);
    }
    if ((expr.tag === "typeof-expr")) {
      return ("typeof " + emitExpr(expr.expr));
    }
    if ((expr.tag === "new-expr")) {
      {
        let tstr = ((expr.typeArgs && (expr.typeArgs.length > 0)) ? (("<" + expr.typeArgs.map(emitTypeExpr).join(", ")) + ">") : "");
        let argsStr = expr.args.map(emitExpr).join(", ");
        return ((((("new " + expr.name) + tstr) + "(") + argsStr) + ")");
      }
    }
    if ((expr.tag === "opt-chain-expr")) {
      return ((emitExpr(expr.object) + "?.") + expr.key);
    }
    if ((expr.tag === "null-coalesce-expr")) {
      return (((("(" + emitExpr(expr.left)) + " ?? ") + emitExpr(expr.right)) + ")");
    }
    if ((expr.tag === "operator-expr")) {
      return emitOperator(expr);
    }
    throw new Error((("emitExpr: unexpected tag >" + expr.tag) + "<"));
  };
  let emitLambda = (node) => {
    {
      let params = node.params.join(", ");
      let body = node.body.map(emitStmt);
      return (((("(" + params) + ") => {\n") + indent(body.join("\n"))) + "\n}");
    }
  };
  let emitFn = (node) => {
    {
      let params = node.params.join(", ");
      let body = node.body.map(emitStmt);
      return (((("function(" + params) + ") {\n") + indent(body.join("\n"))) + "\n}");
    }
  };
  let emitBindExpr = (node) => {
    {
      let fn = emitExpr(node.fn);
      let thisArg = emitExpr(node.thisArg);
      let extraArgs = node.args.map(emitExpr);
      let allArgs = [thisArg].concat(extraArgs);
      return (((fn + ".bind(") + allArgs.join(", ")) + ")");
    }
  };
  let emitMethodCall = (node) => {
    {
      let obj = emitExpr(node.object);
      let method = node.method;
      let args = node.args.map(emitExpr);
      if ((method.tag === "identifier")) {
        return (((((obj + ".") + method.name) + "(") + args.join(", ")) + ")");
      }
      if ((method.tag === "literal")) {
        return (((((obj + ".") + method.value) + "(") + args.join(", ")) + ")");
      }
      return (((((obj + "[") + emitExpr(method)) + "](") + args.join(", ")) + ")");
    }
  };
  let emitCall = (node) => {
    {
      let fn = emitExpr(node.fn);
      let typeStr = ((node.typeArgs && (node.typeArgs.length > 0)) ? (("<" + node.typeArgs.map(emitTypeExpr).join(", ")) + ">") : "");
      let args = node.args.map(emitExpr);
      if (((node.fn.tag === "lambda") || (node.fn.tag === "fn"))) {
        return (((((("(" + fn) + ")") + typeStr) + "(") + args.join(", ")) + ")");
      }
      return ((((fn + typeStr) + "(") + args.join(", ")) + ")");
    }
  };
  let emitOperator = (node) => {
    {
      let args = node.args.map(emitExpr);
      if ((args.length === 1)) {
        return ((("(" + node.op) + args[0]) + ")");
      }
      return (((((("(" + args[0]) + " ") + node.op) + " ") + args[1]) + ")");
    }
  };
  let typePrecedence = (tag) => {
    if ((tag === "type-cond")) {
      return 1;
    }
    if ((tag === "type-union")) {
      return 2;
    }
    if ((tag === "type-intersection")) {
      return 3;
    }
    if ((tag === "type-keyof")) {
      return 4;
    }
    if ((tag === "type-typeof")) {
      return 4;
    }
    if ((tag === "type-infer")) {
      return 4;
    }
    if ((tag === "type-array")) {
      return 4;
    }
    if ((tag === "type-index")) {
      return 5;
    }
    return 6;
  };
  let typeWrapIf = (node, contextPrec) => {
    {
      let s = emitTypeExpr(node);
      let innerPrec = typePrecedence(node.tag);
      if ((innerPrec < contextPrec)) {
        return (("(" + s) + ")");
      }
      return s;
    }
  };
  let emitTypeExpr = (node) => {
    if ((node.tag === "type-id")) {
      return node.name;
    }
    if ((node.tag === "type-app")) {
      {
        let callee = emitTypeExpr(node.callee);
        let args = node.args.map(emitTypeExpr).join(", ");
        return (((callee + "<") + args) + ">");
      }
    }
    if ((node.tag === "type-union")) {
      return node.members.map((m) => {
        return typeWrapIf(m, 2);
      }).join(" | ");
    }
    if ((node.tag === "type-intersection")) {
      return node.members.map((m) => {
        return typeWrapIf(m, 3);
      }).join(" & ");
    }
    if ((node.tag === "type-array")) {
      {
        let inner = emitTypeExpr(node.element);
        let needsWrap = (typePrecedence(node.element.tag) < 4);
        if (needsWrap) {
          return (("(" + inner) + ")[]");
        }
        return (inner + "[]");
      }
    }
    if ((node.tag === "type-tuple")) {
      {
        let parts = node.elements.map(emitTupleElement).join(", ");
        return (("[" + parts) + "]");
      }
    }
    if ((node.tag === "type-fn")) {
      return emitFnType(node);
    }
    if ((node.tag === "type-obj")) {
      return emitObjType(node);
    }
    if ((node.tag === "type-literal")) {
      return emitTypeLiteral(node);
    }
    if ((node.tag === "type-keyof")) {
      return ("keyof " + typeWrapIf(node.operand, 4));
    }
    if ((node.tag === "type-typeof")) {
      return ("typeof " + node.name);
    }
    if ((node.tag === "type-index")) {
      return (((emitTypeExpr(node.object) + "[") + emitTypeExpr(node.index)) + "]");
    }
    if ((node.tag === "type-cond")) {
      return ((((((emitTypeExpr(node.subject) + " extends ") + emitTypeExpr(node.constraint)) + " ? ") + emitTypeExpr(node.trueBranch)) + " : ") + emitTypeExpr(node.falseBranch));
    }
    if ((node.tag === "type-infer")) {
      return ("infer " + node.name);
    }
    if ((node.tag === "type-mapped")) {
      return emitMappedType(node);
    }
    if ((node.tag === "type-template")) {
      return emitTemplateType(node);
    }
    throw new Error((("emitTypeExpr: unexpected tag >" + node.tag) + "<"));
  };
  let emitTupleElement = (el) => {
    if ((el.tag === "element")) {
      return emitTypeExpr(el.type);
    }
    if ((el.tag === "rest")) {
      return ("..." + emitTypeExpr(el.type));
    }
    if ((el.tag === "labeled")) {
      return ((el.name + ": ") + emitTypeExpr(el.type));
    }
    throw new Error("Unknown tuple element");
  };
  let emitFnType = (node) => {
    {
      let tparams = ((node.typeParams && (node.typeParams.length > 0)) ? (("<" + node.typeParams.map(emitTypeParamDecl).join(", ")) + ">") : "");
      let params = node.params.map((p) => {
        {
          let opt = (p.optional ? "?" : "");
          let ty = emitTypeExpr(p.type);
          return (((p.name + opt) + ": ") + ty);
        }
      }).join(", ");
      let ret = emitTypeExpr(node.result);
      return ((((tparams + "(") + params) + ") => ") + ret);
    }
  };
  let emitObjType = (node) => {
    if ((node.props.length === 0)) {
      return "{}";
    }
    {
      let props = node.props.map((p) => {
        {
          let ro = (p.readonly ? "readonly " : "");
          let opt = (p.optional ? "?" : "");
          let ty = emitTypeExpr(p.type);
          return ((((ro + p.name) + opt) + ": ") + ty);
        }
      }).join("; ");
      return (("{ " + props) + " }");
    }
  };
  let emitTypeLiteral = (node) => {
    if ((typeof(node.value) === "string")) {
      return JSON.stringify(node.value);
    }
    return String(node.value);
  };
  let emitMappedType = (node) => {
    {
      let constraint = emitTypeExpr(node.constraint);
      let value = emitTypeExpr(node.value);
      let modStr = " ";
      let optSuffix = " ";
      if (node.modifiers) {
        node.modifiers.forEach((m) => {
          if (((m === "readonly") || ((m === "+readonly") || (m === "-readonly")))) {
            modStr = (m + " ");
          }
          if (((m === "?") || ((m === "+?") || (m === "-?")))) {
            optSuffix = m;
          }
        });
      }
      return (((((((((("{ " + modStr) + "[") + node.binding) + " in ") + constraint) + "]") + optSuffix) + ": ") + value) + " }");
    }
  };
  let emitTemplateType = (node) => {
    {
      let out = "`";
      node.parts.forEach((part) => {
        if ((part.tag === "str")) {
          out = (out + part.value);
        }
        else {
          out = (((out + "${") + emitTypeExpr(part.type)) + "}");
        }
      });
      out = (out + "`");
      return out;
    }
  };
  let emitTypeParamDecl = (p) => {
    {
      let out = p.name;
      if (p.constraint) {
        out = ((out + " extends ") + emitTypeExpr(p.constraint));
      }
      if (p.default) {
        out = ((out + " = ") + emitTypeExpr(p.default));
      }
      return out;
    }
  };
  let main = () => {
    {
      let filePath = process.argv[2];
      let input = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
      let inputStream = CharStream.fromString(input);
      let lexer = new Stage3DLexer(inputStream);
      let tokenStream = new CommonTokenStream(lexer);
      let parser = new Stage3DParser(tokenStream);
      let tree = parser.program();
      let surfaceAst = astProgram(tree);
      let canonicalAst = lowerProgram(surfaceAst);
      console.log(emitProgram(canonicalAst));
    }
  };
  main();
}
