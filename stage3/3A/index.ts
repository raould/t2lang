import { CharStream, CommonTokenStream } from 'antlr4ng';
import { Stage3ALexer } from './Stage3ALexer';
import { BindingContext, ParamContext, Stage3AParser } from './Stage3AParser';
import fs from 'node:fs';;
{
  let dbg = (...msgs) => {
    console.error(...msgs);;
  };
  let parseString = (tokenText) => {
    {
      let raw_ = tokenText;
      if (raw_.startsWith("\"\"\"")) {
        return raw_.slice(3, -3);
      }
      {
        let inner = raw_.slice(1, -1);
        return JSON.parse('"' + inner.replace(/"/g, '\\"') + '"');
      }
    }
  };
  let indent = (text) => {
    return text.split('\n').map(line => '  ' + line).join('\n');
  };
  let isDefined = (val) => {
    return val !== undefined;
  };
  let isOperator = (name) => {
    return ["<", ">", "<=", ">=", "&&", "||", "!=", "!==", "==", "===",
                      "+", "-", "*", "/", "%", "^", "!"].includes(name);
  };
  let astProgram = (ctx) => {
    {
      let body = ctx.topLevel().map(astTopLevel);
      return { tag: 'program', body };
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
      let params = ctx.fnSignature().param().map((p: ParamContext) => p.IDENTIFIER().getText());
      let body = ctx.statement().map(astStatement);
      return { tag: 'defmacro', name, params, body };
    }
  };
  let astDef = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let init = astExpression(ctx.expression());
      return { tag: 'def', name, init };
    }
  };
  let astStatement = (ctx) => {
    if (ctx.letStar()) {
      return astLetStar(ctx.letStar());
    }
    if (ctx.letStmt()) {
      return astLetStmt(ctx.letStmt());
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
    if (ctx.returnForm()) {
      return astReturn(ctx.returnForm());
    }
    {
      let expr = astExpression(ctx.expression());
      return { tag: 'expr-stmt', expr };
    }
  };
  let astLetStar = (ctx) => {
    {
      let bindings = ctx.binding().map((b: BindingContext) => {
                const id = b.IDENTIFIER().getText();
                const init = b.expression() ? astExpression(b.expression()) : undefined;
                return { name: id, init };
              });
      let body = ctx.statement().map(astStatement);
      return { tag: 'let*', bindings, body };
    }
  };
  let astLetStmt = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let init = astExpression(ctx.expression());
      return { tag: 'let', name, init };
    }
  };
  let astIf = (ctx) => {
    {
      let test = astExpression(ctx.expression());
      let ifthen = astStatement(ctx.statement(0));
      let ctxElse = ctx.statement(1);
      let ifelse = ctxElse != undefined ? astStatement(ctxElse) : undefined;
      return { tag: 'if', test, ifthen, ifelse };
    }
  };
  let astWhile = (ctx) => {
    {
      let test = astExpression(ctx.expression());
      let body = ctx.statement().map(astStatement);
      return { tag: 'while', test, body };
    }
  };
  let astBlock = (ctx) => {
    {
      let body = ctx.statement().map(astStatement);
      return { tag: 'block', body };
    }
  };
  let astReturn = (ctx) => {
    {
      let expr = ctx.expression() ? astExpression(ctx.expression()) : undefined;
      return { tag: 'return', expr };
    }
  };
  let astObjectExpr = (ctx) => {
    {
      let fields = ctx.objectField().map(f => {
                let key;
                if (f.IDENTIFIER()) { key = f.IDENTIFIER().getText(); }
                else if (f.KEYWORD()) { key = f.KEYWORD().getText(); }
                else { key = parseString(f.STRING().getText()); }
                const value = astExpression(f.expression());
                return { key, value };
              });
      return { tag: 'object', fields };
    }
  };
  let astArrayExpr = (ctx) => {
    {
      let elements = ctx.expression().map(astExpression);
      return { tag: 'array', elements };
    }
  };
  let astQuasiquote = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return { tag: 'quasi', expr };
    }
  };
  let astUnquote = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return { tag: 'unquote', expr };
    }
  };
  let astUnquoteSplicing = (ctx) => {
    {
      let expr = astExpression(ctx.expression());
      return { tag: 'unquote-splicing', expr };
    }
  };
  let astTernary = (ctx) => {
    {
      let test = astExpression(ctx.expression(0));
      let ifthen = astExpression(ctx.expression(1));
      let ifelse = astExpression(ctx.expression(2));
      return { tag: 'ternary', test, ifthen, ifelse };
    }
  };
  let astExpression = (ctx) => {
    if ((ctx == undefined)) {
      console.error('astExpression: ctx is undefined or null'); return { tag: 'error', reason: 'ctx undefined' };
    }
    if (ctx.literal()) {
      return astLiteral(ctx.literal());
    }
    if (ctx.KEYWORD()) {
      return { tag: 'keyword', value: ctx.KEYWORD().getText() };
    }
    if (ctx.IDENTIFIER()) {
      return { tag: 'identifier', name: ctx.IDENTIFIER().getText() };
    }
    if (ctx.lambda()) {
      return astLambda(ctx.lambda());
    }
    if (ctx.assign()) {
      return astAssign(ctx.assign());
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
    if (ctx.call()) {
      return astCall(ctx.call());
    }
    throw new Error('Unknown expression: ' + (ctx.getText ? ctx.getText() : ctx));
  };
  let astPropAccess = (ctx) => {
    {
      let object = astExpression(ctx.expression());
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
      return { tag: 'prop-access', object, key };
    }
  };
  let astIndexAccess = (ctx) => {
    {
      let object = astExpression(ctx.expression(0));
      let index = astExpression(ctx.expression(1));
      return { tag: 'index-access', object, index };
    }
  };
  let astLambda = (ctx) => {
    {
      let params = ctx.fnSignature().param().map((p: ParamContext) => p.IDENTIFIER().getText());
      let body = ctx.statement().map(astStatement);
      return { tag: 'lambda', params, body };
    }
  };
  let astAssign = (ctx) => {
    {
      let name = ctx.IDENTIFIER().getText();
      let value = astExpression(ctx.expression());
      return { tag: 'assign', name, value };
    }
  };
  let astCall = (ctx) => {
    {
      let exprs = ctx.expression().map(astExpression);
      return { tag: 'call', fn: exprs[0], args: exprs.slice(1) };
    }
  };
  let astLiteral = (ctx) => {
    if (ctx.NUMBER()) {
      return { tag: 'literal', value: Number(ctx.NUMBER().getText()) };
    }
    if (ctx.STRING()) {
      return { tag: 'literal', value: parseString(ctx.STRING().getText()) };
    }
    if (ctx.BOOLEAN()) {
      return { tag: 'literal', value: ctx.BOOLEAN().getText() === 'true' };
    }
    if (ctx.NULL()) {
      return { tag: 'literal', value: null };
    }
    if (ctx.UNDEFINED()) {
      return { tag: 'literal', value: undefined };
    }
    throw new Error('Unknown literal');
  };
  let lowerProgram = (node) => {
    {
      let body = node.body.map(lowerTopLevel);
      return { tag: 'program', body };
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
      return { tag: 'defmacro', name: node.name, params: node.params, body };
    }
  };
  let lowerDef = (node) => {
    {
      let init = lowerExpr(node.init);
      return { tag: 'let-stmt', name: node.name, init };
    }
  };
  let lowerStmt = (node) => {
    if ((node.tag === "let*")) {
      return lowerLetStar(node);
    }
    if ((node.tag === "let")) {
      return { tag: 'let-stmt', name: node.name, init: lowerExpr(node.init) };
    }
    if ((node.tag === "if")) {
      return { tag: 'if-stmt', test: lowerExpr(node.test), ifthen: lowerStmt(node.ifthen), ifelse: node.ifelse ? lowerStmt(node.ifelse) : undefined };
    }
    if ((node.tag === "while")) {
      return { tag: 'while-stmt', test: lowerExpr(node.test), body: node.body.map(lowerStmt) };
    }
    if ((node.tag === "block")) {
      return { tag: 'block-stmt', body: node.body.map(lowerStmt) };
    }
    if ((node.tag === "return")) {
      return { tag: 'return-stmt', expr: node.expr ? lowerExpr(node.expr) : undefined };
    }
    if ((node.tag === "expr-stmt")) {
      return { tag: 'expr-stmt', expr: lowerExpr(node.expr) };
    }
    throw new Error('lowerStmt: unexpected tag ' + node.tag);
  };
  let lowerLetStar = (node) => {
    {
      let stmts = [];
      node.bindings.forEach((b) => {
        stmts.push({ tag: 'let-stmt', name: b.name, init: b.init ? lowerExpr(b.init) : undefined });
      });
      node.body.forEach((s) => {
        stmts.push(lowerStmt(s));
      });
      return { tag: 'block-stmt', body: stmts };
    }
  };
  let lowerExpr = (node) => {
    if ((node.tag === "prop-access")) {
      return { tag: 'prop-access-expr', object: lowerExpr(node.object), key: node.key };
    }
    if ((node.tag === "index-access")) {
      return { tag: 'index-access-expr', object: lowerExpr(node.object), index: lowerExpr(node.index) };
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
      return { tag: 'lambda', params: node.params, body: node.body.map(lowerStmt) };
    }
    if ((node.tag === "assign")) {
      return { tag: 'assign-expr', name: node.name, value: lowerExpr(node.value) };
    }
    if ((node.tag === "object")) {
      return { tag: 'object-expr', fields: node.fields.map(f => ({ key: f.key, value: lowerExpr(f.value) })) };
    }
    if ((node.tag === "array")) {
      return { tag: 'array-expr', elements: node.elements.map(lowerExpr) };
    }
    if ((node.tag === "quasi")) {
      return { tag: 'quasi-expr', expr: lowerExpr(node.expr) };
    }
    if ((node.tag === "unquote")) {
      return { tag: 'unquote-expr', expr: lowerExpr(node.expr) };
    }
    if ((node.tag === "unquote-splicing")) {
      return { tag: 'unquote-splicing-expr', expr: lowerExpr(node.expr) };
    }
    if ((node.tag === "ternary")) {
      return { tag: 'ternary-expr', test: lowerExpr(node.test), ifthen: lowerExpr(node.ifthen), ifelse: lowerExpr(node.ifelse) };
    }
    if ((node.tag === "call")) {
      return lowerCall(node);
    }
    throw new Error('lowerExpr: unexpected tag ' + node.tag);
  };
  let lowerCall = (node) => {
    if (node.fn.tag === 'identifier' && isOperator(node.fn.name)) {
      {
        let op = node.fn.name;
        let args = node.args.map(lowerExpr);
        if ((args.length === 1)) {
          return { tag: 'operator-expr', op, args };
        }
        {
          let result = { tag: 'operator-expr', op, args: [args[0], args[1]] };
          let i = 2;
          while ((i < args.length)) {
            (result = { tag: 'operator-expr', op, args: [result, args[i]] });
            i++;
          }
          return result;
        }
      }
    }
    return { tag: 'call', fn: lowerExpr(node.fn), args: node.args.map(lowerExpr) };
  };
  let emitProgram = (node) => {
    return node.body.map(emitTopLevel).join('\n');
  };
  let emitTopLevel = (node) => {
    if ((node.tag === "defmacro")) {
      return '// macro: ' + node.name;
    }
    return emitStmt(node);
  };
  let emitStmt = (stmt) => {
    if ((stmt.tag === "let-stmt")) {
      if (isDefined(stmt.init)) {
        return 'let ' + stmt.name + ' = ' + emitExpr(stmt.init) + ';';
      }
      else {
        return 'let ' + stmt.name + ';';
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
    if ((stmt.tag === "return-stmt")) {
      if (stmt.expr) {
        return 'return ' + emitExpr(stmt.expr) + ';';
      }
      else {
        return 'return;';
      }
    }
    if ((stmt.tag === "expr-stmt")) {
      return emitExpr(stmt.expr) + ';';
    }
    throw new Error('emitStmt: unexpected tag ' + stmt.tag);
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
      return lines.join('\n');
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
      return lines.join('\n');
    }
  };
  let emitBlock = (node) => {
    {
      let lines = ['{'];
      node.body.forEach((s) => {
        lines.push(indent(emitStmt(s)));
      });
      lines.push("}");
      return lines.join('\n');
    }
  };
  let emitExpr = (expr) => {
    if ((expr.tag === "prop-access-expr")) {
      return emitExpr(expr.object) + '.' + expr.key;
    }
    if ((expr.tag === "index-access-expr")) {
      return emitExpr(expr.object) + '[' + emitExpr(expr.index) + ']';
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
      return '({' + expr.fields.map(f => f.key + ': ' + emitExpr(f.value)).join(', ') + '})';
    }
    if ((expr.tag === "array-expr")) {
      return '[' + expr.elements.map(emitExpr).join(', ') + ']';
    }
    if ((expr.tag === "quasi-expr")) {
      return '/* quasiquote */ ' + emitExpr(expr.expr);
    }
    if ((expr.tag === "unquote-expr")) {
      return '/* unquote */ ' + emitExpr(expr.expr);
    }
    if ((expr.tag === "unquote-splicing-expr")) {
      return '/* unquote-splicing */ ' + emitExpr(expr.expr);
    }
    if ((expr.tag === "ternary-expr")) {
      return '(' + emitExpr(expr.test) + ' ? ' + emitExpr(expr.ifthen) + ' : ' + emitExpr(expr.ifelse) + ')';
    }
    if ((expr.tag === "call")) {
      return emitCall(expr);
    }
    if ((expr.tag === "lambda")) {
      return emitLambda(expr);
    }
    if ((expr.tag === "assign-expr")) {
      return '(' + expr.name + ' = ' + emitExpr(expr.value) + ')';
    }
    if ((expr.tag === "operator-expr")) {
      return emitOperator(expr);
    }
    throw new Error('emitExpr: unexpected tag ' + expr.tag);
  };
  let emitLambda = (node) => {
    {
      let params = node.params.join(", ");
      let body = node.body.map(emitStmt);
      return '(' + params + ') => {\n' + indent(body.join('\n')) + '\n}';
    }
  };
  let emitCall = (node) => {
    if (node.fn.tag === 'identifier' && node.fn.name === 'raw' && node.args.length === 1 && node.args[0].tag === 'literal') {
      return node.args[0].value;
    }
    {
      let fn = emitExpr(node.fn);
      let args = node.args.map(emitExpr);
      if ((node.fn.tag === "lambda")) {
        return '(' + fn + ')(' + args.join(', ') + ')';
      }
      return fn + '(' + args.join(', ') + ')';
    }
  };
  let emitOperator = (node) => {
    {
      let args = node.args.map(emitExpr);
      if ((args.length === 1)) {
        return '(' + node.op + args[0] + ')';
      }
      return '(' + args[0] + ' ' + node.op + ' ' + args[1] + ')';
    }
  };
  let main = () => {
    {
      let input = fs.readFileSync(process.argv[2], "utf-8");
      let inputStream = CharStream.fromString(input);
      let lexer = new Stage3ALexer(inputStream);
      let tokenStream = new CommonTokenStream(lexer);
      let parser = new Stage3AParser(tokenStream);
      let tree = parser.program();
      let surfaceAst = astProgram(tree);
      let canonicalAst = lowerProgram(surfaceAst);
      console.log(emitProgram(canonicalAst));
    }
  };
  main();
}
