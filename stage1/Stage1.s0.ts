let parseString = (tokenText) => {
  //console.log('parseString', tokenText);
  const raw = tokenText;
      const inner = raw.slice(1, -1);
      // antlr and json escapes are the same (?!)
      return JSON.parse('"' + inner.replace(/"/g, '\\"') + '"');;
};
let astProgram = (ctx) => {
  //console.log('astProgram', ctx);
  return {
          tag: "program",
          body: ctx.statement().map(astStatement),
      };;
};
let astStatement = (ctx) => {
  //console.log('astStatement', ctx);
  if (ctx.letStar()) {
          return astLetStar(ctx.letStar()!);
      }
      if (ctx.lambda()) {
          return astLambda(ctx.lambda()!);
      }
      if (ctx.raw()) {
          return astRaw(ctx.raw()!);
      }
      return astExpression(ctx.expression()!);;
};
let astLetStar = (ctx) => {
  //console.log('astLetStar', ctx);
  const bindings = ctx
      .binding()
      .map((b: BindingContext) => {
          const id = b.IDENTIFIER().getText();
          const init = b.expression() ? astExpression(b.expression()!) : undefined;
          return { name: id, init };
      });
      const body = ctx.statement().map(astStatement);
      return { tag: 'let*', bindings, body };;
};
let astLambda = (ctx) => {
  //console.log('astLambda', ctx);
  const params = ctx
      .fnSignature()
      .param()
      .map((p: ParamContext) => p.IDENTIFIER().getText());
      const body = ctx.statement().map(astStatement);
      return { tag: "lambda", params, body };;
};
let astExpression = (ctx) => {
  //console.log('astExpression', ctx);
      if (ctx.literal()) {
          return astLiteral(ctx.literal()!);
      }
      if (ctx.IDENTIFIER()) {
          return { tag: "identifier", name: ctx.IDENTIFIER()!.getText() };
      }
      if (ctx.call()) {
          return astCall(ctx.call()!);
      }
      if (ctx.lambda()) {
          return astLambda(ctx.lambda()!); 
      }
      if (ctx.raw()) {
          return astRaw(ctx.raw()!);
      }
      throw new Error("Unknown expression node");;
};
let astCall = (ctx) => {
  //console.log('astCall', ctx);
  const exprs = ctx
      .expression()
      .map(astExpression);
      return {
          tag: "call",
          fn: exprs[0],
          args: exprs.slice(1)
      };;
};
let astLiteral = (ctx) => {
  //console.log('astLiteral', ctx);
  if (ctx.NUMBER()) return { tag: "literal", value: Number(ctx.NUMBER()!.getText()) };
      if (ctx.STRING()) return { tag: "literal", value: parseString(ctx.STRING()!.getText()) }; 
      if (ctx.BOOLEAN()) return { tag: "literal", value: ctx.BOOLEAN()!.getText() === "true" }; 
      if (ctx.NULL()) return { tag: "literal", value: null }; 
      if (ctx.UNDEFINED()) return { tag: "literal", value: undefined };
      throw new Error("Unknown literal");;
};
let astRaw = (ctx) => {
  //console.log('astRaw', ctx);
  return {
          tag: "raw",
          code: parseString(ctx.STRING()!.getText())
      };;
};
let emitProgram = (node) => {
  //console.log('emitProgram', node);
  return node.body.map(emitStmt).join('\n');;
};
let emitLetStar = (node) => {
  //console.log('emitStar', node);
  const lines = [];
    for (const b of node.bindings) {
      if (b.init) {
        lines.push(`let ${b.name} = ${emitExpr(b.init)};`);
      } else {
        lines.push(`let ${b.name};`);
      }
    }
    for (const s of node.body) {
      lines.push(emitStmt(s));
    }
    return lines.join('\n');;
};
let emitExpr = (expr) => {
  //console.log('emitExpr', expr);
  switch (expr.tag) {
      case 'literal':     return JSON.stringify(expr.value);
      case 'identifier':  return expr.name;
      case 'call':        return emitCall(expr);
      case 'lambda':      return emitLambda(expr);
      case 'raw':         return expr.code;
      default: throw new Error(expr.tag);
    };
};
let emitLambda = (node) => {
  //console.log('emitLambda', node);
  const params = node.params.join(', ');
    const body = node.body.map(emitStmt).join('\n');
    return `(${params}) => {\n${indent(body)}\n}`;;
};
let emitCall = (node) => {
  const fn = emitExpr(node.fn); const args = node.args.map(emitExpr).join(', '); return `${fn}(${args})`;;
};
let emitStmt = (stmt) => {
  switch (stmt.tag) {
      case 'let*': return emitLetStar(stmt);
      default:     return emitExpr(stmt as Expr) + ';';
    };
};
let indent = (text) => {
  //console.log('emitIndent', text);
  return text.split('\n').map(line => '  ' + line).join('\n');;
};
let main = () => {
  const input = fs.readFileSync(process.argv[2], "utf-8");
  //console.log(input);
  const inputStream = CharStream.fromString(input);
  const lexer = new Stage1Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Stage1Parser(tokenStream);
  const tree = parser.program();
  //console.log(tree.toStringTree(parser));
  const ast = astProgram(tree);
  //console.log(JSON.stringify(ast, null, 2));
  console.log(emitProgram(ast));;
};
main();
