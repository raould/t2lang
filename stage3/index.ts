raw("import { CharStream, CommonTokenStream } from 'antlr4ng';\nimport { Stage3Lexer } from './Stage3Lexer';\nimport { BindingContext, ParamContext, Stage3Parser } from './Stage3Parser';\nimport fs from 'node:fs';");
{
  let dbg = (...msgs) => {
    raw("console.error(...msgs);");
  };
  let parseString = (tokenText) => {
    {
      let raw_ = tokenText;
      if (call(raw_.startsWith, "\"\"\"")) {
        raw("return raw_.slice(3, -3)");
      }
      {
        let inner = call(raw_.slice, 1, -1);
        raw("return JSON.parse('\"' + inner.replace(/\"/g, '\\\\\"') + '\"')");
      }
    }
  };
  let indent = (text) => {
    raw("return text.split('\\n').map(line => '  ' + line).join('\\n')");
  };
  let isDefined = (val) => {
    raw("return val !== undefined");
  };
  let astProgram = (ctx) => {
    {
      let body = raw("ctx.topLevel().map(astTopLevel)");
      raw("return { tag: 'program', body }");
    }
  };
  let astTopLevel = (ctx) => {
    if (call(ctx.defmacro)) {
      raw("return astDefmacro(ctx.defmacro())");
    }
    if (call(ctx.def)) {
      raw("return astDef(ctx.def())");
    }
    raw("return astStatement(ctx.statement())");
  };
  let astDefmacro = (ctx) => {
    {
      let name = raw("ctx.IDENTIFIER().getText()");
      let params = raw("ctx.fnSignature().param().map((p: ParamContext) => p.IDENTIFIER().getText())");
      let body = raw("ctx.statement().map(astStatement)");
      raw("return { tag: 'defmacro', name, params, body }");
    }
  };
  let astDef = (ctx) => {
    {
      let name = raw("ctx.IDENTIFIER().getText()");
      let init = call(astExpression, call(ctx.expression));
      raw("return { tag: 'def', name, init }");
    }
  };
  let astStatement = (ctx) => {
    if (call(ctx.letStar)) {
      raw("return astLetStar(ctx.letStar())");
    }
    if (call(ctx.letStmt)) {
      raw("return astLetStmt(ctx.letStmt())");
    }
    if (call(ctx.ifForm)) {
      raw("return astIf(ctx.ifForm())");
    }
    if (call(ctx.whileForm)) {
      raw("return astWhile(ctx.whileForm())");
    }
    if (call(ctx.block)) {
      raw("return astBlock(ctx.block())");
    }
    if (call(ctx.returnForm)) {
      raw("return astReturn(ctx.returnForm())");
    }
    {
      let expr = call(astExpression, call(ctx.expression));
      raw("return { tag: 'expr-stmt', expr }");
    }
  };
  let astLetStar = (ctx) => {
    {
      let bindings = raw("ctx.binding().map((b: BindingContext) => {\n          const id = b.IDENTIFIER().getText();\n          const init = b.expression() ? astExpression(b.expression()) : undefined;\n          return { name: id, init };\n        })");
      let body = raw("ctx.statement().map(astStatement)");
      raw("return { tag: 'let*', bindings, body }");
    }
  };
  let astLetStmt = (ctx) => {
    {
      let name = raw("ctx.IDENTIFIER().getText()");
      let init = call(astExpression, call(ctx.expression));
      raw("return { tag: 'let', name, init }");
    }
  };
  let astIf = (ctx) => {
    {
      let test = call(astExpression, call(ctx.expression));
      let ifthen = call(astStatement, call(ctx.statement, 0));
      let ctxElse = call(ctx.statement, 1);
      let ifelse = raw("ctxElse != undefined ? astStatement(ctxElse) : undefined");
      raw("return { tag: 'if', test, ifthen, ifelse }");
    }
  };
  let astWhile = (ctx) => {
    {
      let test = call(astExpression, call(ctx.expression));
      let body = raw("ctx.statement().map(astStatement)");
      raw("return { tag: 'while', test, body }");
    }
  };
  let astBlock = (ctx) => {
    {
      let body = raw("ctx.statement().map(astStatement)");
      raw("return { tag: 'block', body }");
    }
  };
  let astReturn = (ctx) => {
    {
      let expr = raw("ctx.expression() ? astExpression(ctx.expression()) : undefined");
      raw("return { tag: 'return', expr }");
    }
  };
  let astObjectExpr = (ctx) => {
    {
      let fields = raw("ctx.objectField().map(f => {\n          const key = f.IDENTIFIER ? f.IDENTIFIER().getText() : f.KEYWORD ? f.KEYWORD().getText() : parseString(f.STRING().getText());\n          const value = astExpression(f.expression());\n          return { key, value };\n        })");
      raw("return { tag: 'object', fields }");
    }
  };
  let astArrayExpr = (ctx) => {
    {
      let elements = raw("ctx.expression().map(astExpression)");
      raw("return { tag: 'array', elements }");
    }
  };
  let astQuasiquote = (ctx) => {
    {
      let expr = call(astExpression, call(ctx.expression));
      raw("return { tag: 'quasi', expr }");
    }
  };
  let astUnquote = (ctx) => {
    {
      let expr = call(astExpression, call(ctx.expression));
      raw("return { tag: 'unquote', expr }");
    }
  };
  let astUnquoteSplicing = (ctx) => {
    {
      let expr = call(astExpression, call(ctx.expression));
      raw("return { tag: 'unquote-splicing', expr }");
    }
  };
  let astExpression = (ctx) => {
    if (call(ctx.literal)) {
      raw("return astLiteral(ctx.literal())");
    }
    if (call(ctx.KEYWORD)) {
      raw("return { tag: 'keyword', value: ctx.KEYWORD().getText() }");
    }
    if (call(ctx.IDENTIFIER)) {
      raw("return { tag: 'identifier', name: ctx.IDENTIFIER().getText() }");
    }
    if (call(ctx.lambda)) {
      raw("return astLambda(ctx.lambda())");
    }
    if (call(ctx.assign)) {
      raw("return astAssign(ctx.assign())");
    }
    if (call(ctx.objectExpr)) {
      raw("return astObjectExpr(ctx.objectExpr())");
    }
    if (call(ctx.arrayExpr)) {
      raw("return astArrayExpr(ctx.arrayExpr())");
    }
    if (call(ctx.quasiquote)) {
      raw("return astQuasiquote(ctx.quasiquote())");
    }
    if (call(ctx.unquote)) {
      raw("return astUnquote(ctx.unquote())");
    }
    if (call(ctx.unquoteSplicing)) {
      raw("return astUnquoteSplicing(ctx.unquoteSplicing())");
    }
    if (call(ctx.call)) {
      raw("return astCall(ctx.call())");
    }
    raw("throw new Error('Unknown expression: ' + ctx.getText())");
  };
  let astLambda = (ctx) => {
    {
      let params = raw("ctx.fnSignature().param().map((p: ParamContext) => p.IDENTIFIER().getText())");
      let body = raw("ctx.statement().map(astStatement)");
      raw("return { tag: 'lambda', params, body }");
    }
  };
  let astAssign = (ctx) => {
    {
      let name = raw("ctx.IDENTIFIER().getText()");
      let value = call(astExpression, call(ctx.expression));
      raw("return { tag: 'assign', name, value }");
    }
  };
  let astCall = (ctx) => {
    {
      let exprs = raw("ctx.expression().map(astExpression)");
      raw("return { tag: 'call', fn: exprs[0], args: exprs.slice(1) }");
    }
  };
  let astLiteral = (ctx) => {
    if (call(ctx.NUMBER)) {
      raw("return { tag: 'literal', value: Number(ctx.NUMBER().getText()) }");
    }
    if (call(ctx.STRING)) {
      raw("return { tag: 'literal', value: parseString(ctx.STRING().getText()) }");
    }
    if (call(ctx.BOOLEAN)) {
      raw("return { tag: 'literal', value: ctx.BOOLEAN().getText() === 'true' }");
    }
    if (call(ctx.NULL)) {
      raw("return { tag: 'literal', value: null }");
    }
    if (call(ctx.UNDEFINED)) {
      raw("return { tag: 'literal', value: undefined }");
    }
    raw("throw new Error('Unknown literal')");
  };
  let lowerProgram = (node) => {
    {
      let body = call(node.body.map, lowerTopLevel);
      raw("return { tag: 'program', body }");
    }
  };
  let lowerTopLevel = (node) => {
    if (call(===, node.tag, "defmacro")) {
      raw("return lowerDefmacro(node)");
    }
    if (call(===, node.tag, "def")) {
      raw("return lowerDef(node)");
    }
    raw("return lowerStmt(node)");
  };
  let lowerDefmacro = (node) => {
    {
      let body = call(node.body.map, lowerStmt);
      raw("return { tag: 'defmacro', name: node.name, params: node.params, body }");
    }
  };
  let lowerDef = (node) => {
    {
      let init = call(lowerExpr, node.init);
      raw("return { tag: 'let-stmt', name: node.name, init }");
    }
  };
  let lowerStmt = (node) => {
    if (call(===, node.tag, "let*")) {
      raw("return lowerLetStar(node)");
    }
    if (call(===, node.tag, "let")) {
      raw("return { tag: 'let-stmt', name: node.name, init: lowerExpr(node.init) }");
    }
    if (call(===, node.tag, "if")) {
      raw("return { tag: 'if-stmt', test: lowerExpr(node.test), ifthen: lowerStmt(node.ifthen), ifelse: node.ifelse ? lowerStmt(node.ifelse) : undefined }");
    }
    if (call(===, node.tag, "while")) {
      raw("return { tag: 'while-stmt', test: lowerExpr(node.test), body: node.body.map(lowerStmt) }");
    }
    if (call(===, node.tag, "block")) {
      raw("return { tag: 'block-stmt', body: node.body.map(lowerStmt) }");
    }
    if (call(===, node.tag, "return")) {
      raw("return { tag: 'return-stmt', expr: node.expr ? lowerExpr(node.expr) : undefined }");
    }
    if (call(===, node.tag, "expr-stmt")) {
      raw("return { tag: 'expr-stmt', expr: lowerExpr(node.expr) }");
    }
    raw("throw new Error('lowerStmt: unexpected tag ' + node.tag)");
  };
  let lowerLetStar = (node) => {
    {
      let stmts = raw("[]");
      call(node.bindings.forEach, (b) => {
        raw("stmts.push({ tag: 'let-stmt', name: b.name, init: b.init ? lowerExpr(b.init) : undefined })");
      });
      call(node.body.forEach, (s) => {
        call(stmts.push, call(lowerStmt, s));
      });
      raw("return { tag: 'block-stmt', body: stmts }");
    }
  };
  let lowerExpr = (node) => {
    if (call(===, node.tag, "literal")) {
      raw("return node");
    }
    if (call(===, node.tag, "keyword")) {
      raw("return node");
    }
    if (call(===, node.tag, "identifier")) {
      raw("return node");
    }
    if (call(===, node.tag, "lambda")) {
      raw("return { tag: 'lambda', params: node.params, body: node.body.map(lowerStmt) }");
    }
    if (call(===, node.tag, "assign")) {
      raw("return { tag: 'assign-expr', name: node.name, value: lowerExpr(node.value) }");
    }
    if (call(===, node.tag, "object")) {
      raw("return { tag: 'object-expr', fields: node.fields }");
    }
    if (call(===, node.tag, "array")) {
      raw("return { tag: 'array-expr', elements: node.elements }");
    }
    if (call(===, node.tag, "quasi")) {
      raw("return { tag: 'quasi-expr', expr: lowerExpr(node.expr) }");
    }
    if (call(===, node.tag, "unquote")) {
      raw("return { tag: 'unquote-expr', expr: lowerExpr(node.expr) }");
    }
    if (call(===, node.tag, "unquote-splicing")) {
      raw("return { tag: 'unquote-splicing-expr', expr: lowerExpr(node.expr) }");
    }
    if (call(===, node.tag, "call")) {
      raw("return lowerCall(node)");
    }
    raw("throw new Error('lowerExpr: unexpected tag ' + node.tag)");
  };
  let lowerCall = (node) => {
    raw("return { tag: 'call', fn: lowerExpr(node.fn), args: node.args.map(lowerExpr) }");
  };
  let emitProgram = (node) => {
    raw("return node.body.map(emitTopLevel).join('\\n')");
  };
  let emitTopLevel = (node) => {
    if (call(===, node.tag, "defmacro")) {
      raw("return '// macro: ' + node.name");
    }
    raw("return emitStmt(node)");
  };
  let emitStmt = (stmt) => {
    if (call(===, stmt.tag, "let-stmt")) {
      if (call(isDefined, stmt.init)) {
        raw("return 'let ' + stmt.name + ' = ' + emitExpr(stmt.init) + ';'");
      }
    }
    else {
      raw("return 'let ' + stmt.name + ';'");
    }
    if (call(===, stmt.tag, "if-stmt")) {
      raw("return emitIf(stmt)");
    }
    if (call(===, stmt.tag, "while-stmt")) {
      raw("return emitWhile(stmt)");
    }
    if (call(===, stmt.tag, "block-stmt")) {
      raw("return emitBlock(stmt)");
    }
    if (call(===, stmt.tag, "return-stmt")) {
      if (stmt.expr) {
        raw("return 'return ' + emitExpr(stmt.expr) + ';'");
      }
    }
    else {
      raw("return 'return;'");
    }
    if (call(===, stmt.tag, "expr-stmt")) {
      raw("return emitExpr(stmt.expr) + ';'");
    }
    raw("throw new Error('emitStmt: unexpected tag ' + stmt.tag)");
  };
  let emitIf = (node) => {
    {
      let lines = raw("[]");
      call(lines.push, call(+, "if (", call(emitExpr, node.test), ") {"));
      call(lines.push, call(indent, call(emitStmt, node.ifthen)));
      call(lines.push, "}");
      if (call(isDefined, node.ifelse)) {
        {
          call(lines.push, "else {");
          call(lines.push, call(indent, call(emitStmt, node.ifelse)));
          call(lines.push, "}");
        }
      }
      raw("return lines.join('\\n')");
    }
  };
  let emitWhile = (node) => {
    {
      let lines = raw("[]");
      call(lines.push, call(+, "while (", call(emitExpr, node.test), ") {"));
      call(node.body.forEach, (s) => {
        call(lines.push, call(indent, call(emitStmt, s)));
      });
      call(lines.push, "}");
      raw("return lines.join('\\n')");
    }
  };
  let emitBlock = (node) => {
    {
      let lines = raw("['{']");
      call(node.body.forEach, (s) => {
        call(lines.push, call(indent, call(emitStmt, s)));
      });
      call(lines.push, "}");
      raw("return lines.join('\\n')");
    }
  };
  let emitExpr = (expr) => {
    if (call(===, expr.tag, "literal")) {
      raw("return JSON.stringify(expr.value)");
    }
    if (call(===, expr.tag, "keyword")) {
      raw("return JSON.stringify(expr.value)");
    }
    if (call(===, expr.tag, "identifier")) {
      raw("return expr.name");
    }
    if (call(===, expr.tag, "object-expr")) {
      raw("return '{' + expr.fields.map(f => f.key + ': ' + emitExpr(f.value)).join(', ') + '}'");
    }
    if (call(===, expr.tag, "array-expr")) {
      raw("return '[' + expr.elements.map(emitExpr).join(', ') + ']'");
    }
    if (call(===, expr.tag, "quasi-expr")) {
      raw("return '/* quasiquote */ ' + emitExpr(expr.expr)");
    }
    if (call(===, expr.tag, "unquote-expr")) {
      raw("return '/* unquote */ ' + emitExpr(expr.expr)");
    }
    if (call(===, expr.tag, "unquote-splicing-expr")) {
      raw("return '/* unquote-splicing */ ' + emitExpr(expr.expr)");
    }
    if (call(===, expr.tag, "call")) {
      raw("return emitCall(expr)");
    }
    if (call(===, expr.tag, "lambda")) {
      raw("return emitLambda(expr)");
    }
    if (call(===, expr.tag, "assign-expr")) {
      raw("return '(' + expr.name + ' = ' + emitExpr(expr.value) + ')'");
    }
    raw("throw new Error('emitExpr: unexpected tag ' + expr.tag)");
  };
  let emitLambda = (node) => {
    {
      let params = call(node.params.join, ", ");
      let body = call(node.body.map, emitStmt);
      raw("return '(' + params + ') => {\\n' + indent(body.join('\\n')) + '\\n}'");
    }
  };
  let emitCall = (node) => {
    {
      let fn = call(emitExpr, node.fn);
      let args = call(node.args.map, emitExpr);
      raw("return fn + '(' + args.join(', ') + ')'");
    }
  };
  let main = () => {
    {
      let input = call(fs.readFileSync, raw("process.argv[2]"), "utf-8");
      let inputStream = call(CharStream.fromString, input);
      let lexer = raw("new Stage3Lexer(inputStream)");
      let tokenStream = raw("new CommonTokenStream(lexer)");
      let parser = raw("new Stage3Parser(tokenStream)");
      let tree = call(parser.program);
      let surfaceAst = call(astProgram, tree);
      let canonicalAst = call(lowerProgram, surfaceAst);
      call(console.log, call(emitProgram, canonicalAst));
    }
  };
  call(main);
}
