import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage3DLexer } from "./Stage3DLexer";
import { StarBindingContext, SingleBindingContext, ParamContext, Stage3DParser } from "./Stage3DParser";
import fs from "node:fs";
{
  let dbg = (...msgs) => {
    console.error(msgs);
  };
  let parseString = (tokenText) => {
    {
      let raw_ = tokenText;
      if (raw_.startsWith("\"\"\"")) {
        return raw_.slice(3, -3);
      }
      {
        let inner = raw_.slice(1, -1);
        return JSON.parse((("\"" + inner.replace(/"/g, "\\\"")) + "\""));
      }
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
  let astProgram = (ctx) => {
    {
      let body = ctx.topLevel().map(astTopLevel);
      return ({tag: "program", body: body});
    }
  };
  let astTopLevel = (ctx) => {
    if (ctx.defmacro()) {
      return astDefmacro(ctx.defmacro());
    }
    if (ctx.def()) {
      return astDef(ctx.def());
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
      return ({tag: "defmacro", name: name, params: params, body: body});
    }
  };
  let astDef = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let init = astExpression(ctx.expression());
      return ({tag: "def", name: name, init: init});
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
      return ({tag: "expr-stmt", expr: expr});
    }
  };
  let astThrow = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({tag: "throw", expr: expr});
    }
  };
  let astImport = (ctx) => {
    {
      let spec = (ctx.objectExpr() ? astObjectExpr(ctx.objectExpr()) : undefined);
      let source = parseString(ctx.STRING().getText());
      return ({tag: "import", spec: spec, source: source});
    }
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
      return ({tag: "switch", discriminant: discriminant, cases: cases, defaultCase: defaultCase});
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
      return ({tag: "for", initName: initName, initExpr: initExpr, test: test, updateName: updateName, updateExpr: updateExpr, body: body});
    }
  };
  let astForIn = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let obj = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return ({tag: "for-in", name: name, object: obj, body: body});
    }
  };
  let astForOf = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let iterable = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return ({tag: "for-of", name: name, iterable: iterable, body: body});
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
      return ({tag: "let*", bindings: bindings, body: body});
    }
  };
  let astLetStmt = (ctx) => {
    {
      let bindCtx = ctx.singleBinding();
      let name = bindCtx.IDENTIFIER().getText();
      let typeAnnotation = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
      let init = astExpression(ctx.expression());
      return ({tag: "let", name: name, typeAnnotation: typeAnnotation, init: init});
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
      return ({tag: "const*", bindings: bindings, body: body});
    }
  };
  let astConstStmt = (ctx) => {
    {
      let bindCtx = ctx.singleBinding();
      let name = bindCtx.IDENTIFIER().getText();
      let typeAnnotation = (bindCtx.typeExpr() ? astTypeExpr(bindCtx.typeExpr()) : undefined);
      let init = astExpression(ctx.expression());
      return ({tag: "const", name: name, typeAnnotation: typeAnnotation, init: init});
    }
  };
  let astIf = (ctx) => {
    {
      let test = astExpression(ctx.expression());
      let ifthen = astStatement(ctx.statement(0));
      let ctxElse = ctx.statement(1);
      let ifelse = (ctxElse ? astStatement(ctxElse) : undefined);
      return ({tag: "if", test: test, ifthen: ifthen, ifelse: ifelse});
    }
  };
  let astWhile = (ctx) => {
    {
      let test = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return ({tag: "while", test: test, body: body});
    }
  };
  let astBlock = (ctx) => {
    {
      let body = ctx.statement().map(astStatement);
      return ({tag: "block", body: body});
    }
  };
  let astReturn = (ctx) => {
    {
      let expr = (ctx.expression() ? astExpression(ctx.expression()) : undefined);
      return ({tag: "return", expr: expr});
    }
  };
  let astObjectExpr = (ctx) => {
    {
      let fields = ctx.objectField().map((f) => {
        {
          let key;
          if (f.IDENTIFIER()) {
            key = f.IDENTIFIER().getText();
          }
          if (f.KEYWORD()) {
            key = f.KEYWORD().getText();
          }
          if (f.STRING()) {
            key = parseString(f.STRING().getText());
          }
          {
            let value = astExpression(f.expression());
            return ({key: key, value: value});
          }
        }
      });
      return ({tag: "object", fields: fields});
    }
  };
  let astArrayExpr = (ctx) => {
    {
      let elements = ctx.expression().map(astExpression);
      return ({tag: "array", elements: elements});
    }
  };
  let astQuasiquote = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({tag: "quasi", expr: expr});
    }
  };
  let astUnquote = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({tag: "unquote", expr: expr});
    }
  };
  let astUnquoteSplicing = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return ({tag: "unquote-splicing", expr: expr});
    }
  };
  let astTernary = (ctx) => {
    {
      let test = astExpression(ctx.expression(0));
      let ifthen = astExpression(ctx.expression(1));
      let ifelse = astExpression(ctx.expression(2));
      return ({tag: "ternary", test: test, ifthen: ifthen, ifelse: ifelse});
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
      return ({tag: "cond", clauses: clauses});
    }
  };
  let astNewExpr = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let raw = ctx.typeArgs();
      let typeArgs = (raw ? raw.typeExpr().map(astTypeExpr) : []);
      let args = ctx.expression().map(astExpression);
      return ({tag: "new", name: name, typeArgs: typeArgs, args: args});
    }
  };
  let astOptChain = (ctx) => {
    {
      let obj = astExpression(ctx.expression());
      let prop = ctx.IDENTIFIER().getText();
      return ({tag: "opt-chain", object: obj, key: prop});
    }
  };
  let astNullCoalesce = (ctx) => {
    {
      let left = astExpression(ctx.expression(0));
      let right = astExpression(ctx.expression(1));
      return ({tag: "null-coalesce", left: left, right: right});
    }
  };
  let astExpression = (ctx) => {
    if ((ctx == undefined)) {
      {
        console.error("astExpression: ctx is undefined or null");
        return ({tag: "error", reason: "ctx undefined"});
      }
    }
    if (ctx.literal()) {
      return astLiteral(ctx.literal());
    }
    if (ctx.KEYWORD()) {
      return ({tag: "keyword", value: ctx.KEYWORD().getText()});
    }
    if (ctx.IDENTIFIER()) {
      {
        let text = ctx.IDENTIFIER().getText();
        if (text.includes(".")) {
          throw new Error((("Invalid use of dotted identifier: " + text) + ". Use (. obj prop) syntax instead."));
        }
        return ({tag: "identifier", name: text});
      }
    }
    if (ctx.lambda()) {
      return astLambda(ctx.lambda());
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
    if (ctx.call()) {
      return astCall(ctx.call());
    }
    throw new Error(("Unknown expression: " + (ctx.getText ? ctx.getText() : ctx)));
  };
  let astCall = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      let raw = ctx.typeArgs();
      let typeArgs = (raw ? raw.typeExpr().map(astTypeExpr) : []);
      return ({tag: "call", fn: exprs[0], args: exprs.slice(1), typeArgs: typeArgs});
    }
    astPropAccess((ctx) => {
      {
        let obj = astExpression(ctx.expression());
        let key;
        if (ctx.IDENTIFIER()) {
          key = ctx.IDENTIFIER().getText();
        }
        if (ctx.KEYWORD()) {
          key = ctx.KEYWORD().getText();
        }
        if (ctx.STRING()) {
          key = parseString(ctx.STRING().getText());
        }
        return ({tag: "prop-access", object: obj, key: key});
      }
    });
    astIndexAccess((ctx) => {
      {
        let obj = astExpression(ctx.expression(0));
        let idx = astExpression(ctx.expression(1));
        return ({tag: "index-access", object: obj, index: idx});
      }
    });
    astLambda((ctx) => {
      {
        let params = ctx.fnSignature().param().map((p) => {
          return p.IDENTIFIER().getText();
        });
        let body = ctx.statement().map(astStatement);
        return ({tag: "lambda", params: params, body: body});
      }
    });
    astAssign((ctx) => {
      {
        let name = ctx.IDENTIFIER().getText();
        let value = astExpression(ctx.expression());
        return ({tag: "assign", name: name, value: value});
      }
    });
    typeArgs(typeArgs);
  };
}
