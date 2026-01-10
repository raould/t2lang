import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage3CLexer } from "./Stage3CLexer";
import { BindingContext, ParamContext, Stage3CParser } from "./Stage3CParser";
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
      let initName = initCtx.IDENTIFIER().getText();
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
      let bindings = ctx.binding().map((b) => {
        {
          let id = b.IDENTIFIER().getText();
          let init = (b.expression() ? astExpression(b.expression()) : undefined);
          return ({name: id, init: init});
        }
      });
      let body = ctx.statement().map(astStatement);
      return ({tag: "let*", bindings: bindings, body: body});
    }
  };
  let astLetStmt = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let init = astExpression(ctx.expression());
      return ({tag: "let", name: name, init: init});
    }
  };
  let astConstStar = (ctx) => {
    {
      let bindings = ctx.binding().map((b) => {
        {
          let id = b.IDENTIFIER().getText();
          let init = (b.expression() ? astExpression(b.expression()) : undefined);
          return ({name: id, init: init});
        }
      });
      let body = ctx.statement().map(astStatement);
      return ({tag: "const*", bindings: bindings, body: body});
    }
  };
  let astConstStmt = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let init = astExpression(ctx.expression());
      return ({tag: "const", name: name, init: init});
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
            (key = f.IDENTIFIER().getText());
          }
          if (f.KEYWORD()) {
            (key = f.KEYWORD().getText());
          }
          if (f.STRING()) {
            (key = parseString(f.STRING().getText()));
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
        (i = (i + 2));
      }
      return ({tag: "cond", clauses: clauses});
    }
  };
  let astNewExpr = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let args = ctx.expression().map(astExpression);
      return ({tag: "new", name: name, args: args});
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
  let astPropAccess = (ctx) => {
    {
      let obj = astExpression(ctx.expression());
      let key;
      if (ctx.IDENTIFIER()) {
        (key = ctx.IDENTIFIER().getText());
      }
      if (ctx.KEYWORD()) {
        (key = ctx.KEYWORD().getText());
      }
      if (ctx.STRING()) {
        (key = parseString(ctx.STRING().getText()));
      }
      return ({tag: "prop-access", object: obj, key: key});
    }
  };
  let astIndexAccess = (ctx) => {
    {
      let obj = astExpression(ctx.expression(0));
      let idx = astExpression(ctx.expression(1));
      return ({tag: "index-access", object: obj, index: idx});
    }
  };
  let astLambda = (ctx) => {
    {
      let params = ctx.fnSignature().param().map((p) => {
        return p.IDENTIFIER().getText();
      });
      let body = ctx.statement().map(astStatement);
      return ({tag: "lambda", params: params, body: body});
    }
  };
  let astAssign = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let value = astExpression(ctx.expression());
      return ({tag: "assign", name: name, value: value});
    }
  };
  let astCall = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      return ({tag: "call", fn: exprs[0], args: exprs.slice(1)});
    }
  };
  let astLiteral = (ctx) => {
    if (ctx.NUMBER()) {
      return ({tag: "literal", value: Number(ctx.NUMBER().getText())});
    }
    if (ctx.STRING()) {
      return ({tag: "literal", value: parseString(ctx.STRING().getText())});
    }
    if (ctx.BOOLEAN()) {
      return ({tag: "literal", value: (ctx.BOOLEAN().getText() === "true")});
    }
    if (ctx.NULL()) {
      return ({tag: "literal", value: null});
    }
    if (ctx.UNDEFINED()) {
      return ({tag: "literal", value: undefined});
    }
    throw new Error("Unknown literal");
  };
  let lowerProgram = (node) => {
    {
      let body = node.body.map(lowerTopLevel);
      return ({tag: "program", body: body});
    }
  };
  let lowerTopLevel = (node) => {
    if ((node.tag === "defmacro")) {
      return lowerDefmacro(node);
    }
    if ((node.tag === "def")) {
      return lowerDef(node);
    }
    return lowerStmt(node);
  };
  let lowerDefmacro = (node) => {
    {
      let body = node.body.map(lowerStmt);
      return ({tag: "defmacro", name: node.name, params: node.params, body: body});
    }
  };
  let lowerDef = (node) => {
    {
      let init = lowerExpr(node.init);
      return ({tag: "let-stmt", name: node.name, init: init});
    }
  };
  let lowerStmt = (node) => {
    if ((node.tag === "let*")) {
      return lowerLetStar(node);
    }
    if ((node.tag === "let")) {
      return ({tag: "let-stmt", name: node.name, init: lowerExpr(node.init)});
    }
    if ((node.tag === "const*")) {
      return lowerConstStar(node);
    }
    if ((node.tag === "const")) {
      return ({tag: "const-stmt", name: node.name, init: lowerExpr(node.init)});
    }
    if ((node.tag === "if")) {
      return ({tag: "if-stmt", test: lowerExpr(node.test), ifthen: lowerStmt(node.ifthen), ifelse: (node.ifelse ? lowerStmt(node.ifelse) : undefined)});
    }
    if ((node.tag === "while")) {
      return ({tag: "while-stmt", test: lowerExpr(node.test), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "block")) {
      return ({tag: "block-stmt", body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "return")) {
      return ({tag: "return-stmt", expr: (node.expr ? lowerExpr(node.expr) : undefined)});
    }
    if ((node.tag === "assign")) {
      return ({tag: "assign-stmt", name: node.name, value: lowerExpr(node.value)});
    }
    if ((node.tag === "throw")) {
      return ({tag: "throw-stmt", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "import")) {
      return lowerImport(node);
    }
    if ((node.tag === "switch")) {
      return lowerSwitch(node);
    }
    if ((node.tag === "for")) {
      return ({tag: "for-stmt", initName: node.initName, initExpr: lowerExpr(node.initExpr), test: lowerExpr(node.test), updateName: node.updateName, updateExpr: lowerExpr(node.updateExpr), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "for-in")) {
      return ({tag: "for-in-stmt", name: node.name, object: lowerExpr(node.object), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "for-of")) {
      return ({tag: "for-of-stmt", name: node.name, iterable: lowerExpr(node.iterable), body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "expr-stmt")) {
      return ({tag: "expr-stmt", expr: lowerExpr(node.expr)});
    }
    throw new Error((("lowerStmt: unexpected tag >" + node.tag) + "<"));
  };
  let lowerLetStar = (node) => {
    {
      let stmts = [];
      node.bindings.forEach((b) => {
        stmts.push(({tag: "let-stmt", name: b.name, init: (b.init ? lowerExpr(b.init) : (":else" ? undefined : undefined))}));
      });
      node.body.forEach((s) => {
        stmts.push(lowerStmt(s));
      });
      return ({tag: "block-stmt", body: stmts});
    }
  };
  let lowerConstStar = (node) => {
    {
      let stmts = [];
      node.bindings.forEach((b) => {
        stmts.push(({tag: "const-stmt", name: b.name, init: (b.init ? lowerExpr(b.init) : (":else" ? undefined : undefined))}));
      });
      node.body.forEach((s) => {
        stmts.push(lowerStmt(s));
      });
      return ({tag: "block-stmt", body: stmts});
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
            (defaultName = f.value.value);
          }
          if ((f.key === ":namespace")) {
            (namespaceName = f.value.value);
          }
          if ((f.key === ":named")) {
            (named = f.value.elements.map((el) => {
              {
                let nm = undefined;
                let al = undefined;
                el.fields.forEach((ff) => {
                  if ((ff.key === ":name")) {
                    (nm = ff.value.value);
                  }
                  if ((ff.key === ":as")) {
                    (al = ff.value.value);
                  }
                });
                return ({name: nm, alias: al});
              }
            }));
          }
        });
      }
      return ({tag: "import-stmt", defaultName: defaultName, namespaceName: namespaceName, named: named, source: node.source});
    }
  };
  let lowerSwitch = (node) => {
    {
      let discriminant = lowerExpr(node.discriminant);
      let cases = node.cases.map((c) => {
        return ({test: lowerExpr(c.test), body: c.body.map(lowerStmt)});
      });
      let defaultCase = (node.defaultCase ? ({body: node.defaultCase.body.map(lowerStmt)}) : undefined);
      return ({tag: "switch-stmt", discriminant: discriminant, cases: cases, defaultCase: defaultCase});
    }
  };
  let lowerExpr = (node) => {
    if ((node.tag === "prop-access")) {
      return ({tag: "prop-access-expr", object: lowerExpr(node.object), key: node.key});
    }
    if ((node.tag === "index-access")) {
      return ({tag: "index-access-expr", object: lowerExpr(node.object), index: lowerExpr(node.index)});
    }
    if ((node.tag === "literal")) {
      return node;
    }
    if ((node.tag === "keyword")) {
      return node;
    }
    if ((node.tag === "identifier")) {
      return node;
    }
    if ((node.tag === "lambda")) {
      return ({tag: "lambda", params: node.params, body: node.body.map(lowerStmt)});
    }
    if ((node.tag === "object")) {
      return ({tag: "object-expr", fields: node.fields.map((f) => {
        return ({key: f.key, value: lowerExpr(f.value)});
      })});
    }
    if ((node.tag === "array")) {
      return ({tag: "array-expr", elements: node.elements.map(lowerExpr)});
    }
    if ((node.tag === "quasi")) {
      return ({tag: "quasi-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "unquote")) {
      return ({tag: "unquote-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "unquote-splicing")) {
      return ({tag: "unquote-splicing-expr", expr: lowerExpr(node.expr)});
    }
    if ((node.tag === "ternary")) {
      return ({tag: "ternary-expr", test: lowerExpr(node.test), ifthen: lowerExpr(node.ifthen), ifelse: lowerExpr(node.ifelse)});
    }
    if ((node.tag === "cond")) {
      return lowerCond(node);
    }
    if ((node.tag === "new")) {
      return ({tag: "new-expr", name: node.name, args: node.args.map(lowerExpr)});
    }
    if ((node.tag === "opt-chain")) {
      return ({tag: "opt-chain-expr", object: lowerExpr(node.object), key: node.key});
    }
    if ((node.tag === "null-coalesce")) {
      return ({tag: "null-coalesce-expr", left: lowerExpr(node.left), right: lowerExpr(node.right)});
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
          return ({tag: "operator-expr", op: op, args: args});
        }
        {
          let result = ({tag: "operator-expr", op: op, args: [args[0], args[1]]});
          let i = 2;
          while ((i < args.length)) {
            (result = ({tag: "operator-expr", op: op, args: [result, args[i]]}));
            (i = (i + 1));
          }
          return result;
        }
      }
    }
    return ({tag: "call", fn: lowerExpr(node.fn), args: node.args.map(lowerExpr)});
  };
  let lowerCond = (node) => {
    {
      let clauses = node.clauses;
      let i = (clauses.length - 1);
      let last = clauses[i];
      let result = ({tag: "ternary-expr", test: lowerExpr(last.test), ifthen: lowerExpr(last.expr), ifelse: ({tag: "literal", value: undefined})});
      (i = (i - 1));
      while ((i >= 0)) {
        {
          let c = clauses[i];
          (result = ({tag: "ternary-expr", test: lowerExpr(c.test), ifthen: lowerExpr(c.expr), ifelse: result}));
        }
        (i = (i - 1));
      }
      return result;
    }
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
    if ((stmt.tag === "let-stmt")) {
      if (isDefined(stmt.init)) {
        return (((("let " + stmt.name) + " = ") + emitExpr(stmt.init)) + ";");
      }
      else {
        return (("let " + stmt.name) + ";");
      }
    }
    if ((stmt.tag === "const-stmt")) {
      if (isDefined(stmt.init)) {
        return (((("const " + stmt.name) + " = ") + emitExpr(stmt.init)) + ";");
      }
      else {
        return (("const " + stmt.name) + ";");
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
      return ((emitExpr(expr.object) + ".") + expr.key);
    }
    if ((expr.tag === "index-access-expr")) {
      return (((emitExpr(expr.object) + "[") + emitExpr(expr.index)) + "]");
    }
    if ((expr.tag === "literal")) {
      return JSON.stringify(expr.value);
    }
    if ((expr.tag === "keyword")) {
      return JSON.stringify(expr.value);
    }
    if ((expr.tag === "identifier")) {
      return expr.name;
    }
    if ((expr.tag === "object-expr")) {
      return (("({" + expr.fields.map((f) => {
        return ((f.key + ": ") + emitExpr(f.value));
      }).join(", ")) + "})");
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
    if ((expr.tag === "new-expr")) {
      return (((("new " + expr.name) + "(") + expr.args.map(emitExpr).join(", ")) + ")");
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
  let emitCall = (node) => {
    {
      let fn = emitExpr(node.fn);
      let args = node.args.map(emitExpr);
      if ((node.fn.tag === "lambda")) {
        return (((("(" + fn) + ")(") + args.join(", ")) + ")");
      }
      return (((fn + "(") + args.join(", ")) + ")");
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
  let main = () => {
    {
      let input = fs.readFileSync(process.argv[2], "utf-8");
      let inputStream = CharStream.fromString(input);
      let lexer = new Stage3CLexer(inputStream);
      let tokenStream = new CommonTokenStream(lexer);
      let parser = new Stage3CParser(tokenStream);
      let tree = parser.program();
      let surfaceAst = astProgram(tree);
      let canonicalAst = lowerProgram(surfaceAst);
      console.log(emitProgram(canonicalAst));
    }
  };
  main();
}
