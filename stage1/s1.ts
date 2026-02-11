import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage1Lexer } from "./Stage1Lexer";
import { RawContext, BindingContext, CallContext, ExpressionContext, LambdaContext, LetStarContext, LiteralContext, ParamContext, ProgramContext, Stage1Parser, StatementContext } from "./Stage1Parser";
import fs from "node:fs";

// INSERT_STAGE0_COMPILED
import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage1Lexer } from "./Stage1Lexer";
import { RawContext, BindingContext, CallContext, ExpressionContext, LambdaContext, LetStarContext, LiteralContext, ParamContext, ProgramContext, Stage1Parser, StatementContext } from "./Stage1Parser";
import fs from "node:fs";;
let parseString = (tokenText) => {
  console.log('+++parseString', tokenText);;
  const raw = tokenText;
      const inner = raw.slice(1, -1);
      // antlr and json escapes are the same (?!)
      return JSON.parse('"' + inner.replace(/"/g, '\\"') + '"');;
};
let astProgram = (ctx) => {
  console.log('+++astProgram', Object.keys(ctx));;
  return {
          tag: "program",
          body: ctx.statement().map(astStatement),
      };;
};
let astStatement = (ctx) => {
  console.log('+++astStatement', Object.keys(ctx));;
  if (ctx.letStar()) {
          return astLetStar(ctx.letStar()!);
      }
      if (ctx.lambda()) {
          return astLambda(ctx.lambda()!);
      }
      if (ctx.raw()) {
          return astRaw(ctx.raw()!);
      }
      if (ctx.if()) {
          return astIf(ctx.if());
      }
      return astExpression(ctx.expression()!);;
};
let astIf = (ctx) => {
  console.log('+++astIf', Object.keys(ctx));;
  const test = astExpression(ctx.expression());
        const ifthen = astStatement(ctx.statement(0));
        const ctxElse = ctx.statement(1);
        const ifelse = (ctxElse == undefined) ? undefined : astStatement(ctxElse);
        return { tag: 'if', test, ifthen, ifelse };;
};
let astWhile = (ctx) => {
  console.log('+++astWhile', Object.keys(ctx));;
};
let astLetStar = (ctx) => {
  console.log('+++astLetStar', Object.keys(ctx));;
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
  console.log('+++astLambda', Object.keys(ctx));;
  const params = ctx
      .fnSignature()
      .param()
      .map((p: ParamContext) => p.IDENTIFIER().getText());
      const body = ctx.statement().map(astStatement);
      return { tag: "lambda", params, body };;
};
let astExpression = (ctx) => {
  console.log('+++astExpression', Object.keys(ctx));;
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
  console.log('+++astCall', Object.keys(ctx));;
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
  console.log('+++astLiteral', Object.keys(ctx));;
  if (ctx.NUMBER()) return { tag: "literal", value: Number(ctx.NUMBER()!.getText()) };
      if (ctx.STRING()) return { tag: "literal", value: parseString(ctx.STRING()!.getText()) }; 
      if (ctx.BOOLEAN()) return { tag: "literal", value: ctx.BOOLEAN()!.getText() === "true" }; 
      if (ctx.NULL()) return { tag: "literal", value: null }; 
      if (ctx.UNDEFINED()) return { tag: "literal", value: undefined };
      throw new Error("Unknown literal");;
};
let astRaw = (ctx) => {
  console.log('+++astRaw', Object.keys(ctx));;
  return {
          tag: "raw",
          code: parseString(ctx.STRING()!.getText())
      };;
};
let emitProgram = (node) => {
  console.log('+++emitProgram', Object.keys(node));;
  return node.body.map(emitStmt).join('\n');;
};
let emitIf = (node) => {
  console.log('+++if', Object.keys(node));;
  const lines=[];
        lines.push(`if (${emitExpr(node.test)}) {`);
        lines.push(indent(emitStmt(node.ifthen)));
        lines.push("}");
        if (node.ifelse != undefined) {
          lines.push("else {");
          lines.push(indent(emitStmt(node.ifelse)));
          lines.push("}");
        }
        return lines.join('\n');;
};
let emitLetStar = (node) => {
  console.log('+++emitStar', Object.keys(node));;
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
  console.log('+++emitExpr', Object.keys(expr));;
  switch (expr.tag) {
      case 'literal':     return JSON.stringify(expr.value);
      case 'identifier':  return expr.name;
      case 'call':        return emitCall(expr);
      case 'lambda':      return emitLambda(expr);
      case 'raw':         return expr.code;
      case 'if':          return emitIf(expr);
      default: throw new Error("unhandled expr.tag >" + expr.tag + "<");
    };
};
let emitLambda = (node) => {
  console.log('+++emitLambda', Object.keys(node));;
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
  console.log('+++emitIndent', text);;
  return text.split('\n').map(line => '  ' + line).join('\n');;
};
let main = () => {
  const input = fs.readFileSync(process.argv[2], "utf-8");
  const inputStream = CharStream.fromString(input);
  const lexer = new Stage1Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Stage1Parser(tokenStream);
  const tree = parser.program();
  console.log("???", tree.toStringTree(parser));
  const ast = astProgram(tree);
  console.log(emitProgram(ast));;
};
main();
