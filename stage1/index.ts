import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage1Lexer } from "./Stage1Lexer";
import { BindingContext, ParamContext, Stage1Parser } from "./Stage1Parser";
import fs from "node:fs";;
let dbg = (...msgs) => {
  //console.error(...msgs);;
};
let parseString = (tokenText) => {
  const raw = tokenText;
            if (raw.startsWith('\"\"\"')) {
                return raw.slice(3, -3);
            }
            const inner = raw.slice(1, -1);
            return JSON.parse('"' + inner.replace(/"/g, '\\"') + '"');;
};
let astProgram = (ctx) => {
  dbg('+++astProgram', Object.keys(ctx), ctx.getText());
  return {
                tag: "program",
                body: ctx.statement().map(astStatement),
            };;
};
let astStatement = (ctx) => {
  dbg('+++astStatement', Object.keys(ctx), ctx.getText());;
  dbg("letStar", !!ctx.letStar());;
  dbg("lambda", !!ctx.lambda());;
  dbg("raw", !!ctx.raw());;
  dbg("if", !!ctx.if());;
  dbg("while", !!ctx.while());;
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
              if (ctx.while()) {
                return astWhile(ctx.while());
              }
              dbg("expression", ctx.expression());
              return { tag: 'expr-stmt', expr: astExpression(ctx.expression()!) };;
};
let astIf = (ctx) => {
  dbg('+++astIf', Object.keys(ctx), ctx.getText());;
  const test = astExpression(ctx.expression());
              const ifthen = astStatement(ctx.statement(0));
              const ctxElse = ctx.statement(1);
              const ifelse = (ctxElse == undefined) ? undefined : astStatement(ctxElse);
              return { tag: 'if', test, ifthen, ifelse };;
};
let astWhile = (ctx) => {
  dbg('+++astWhile', Object.keys(ctx), ctx.getText());;
  const test = astExpression(ctx.expression());
              const body = astStatement(ctx.statement());
              return { tag: 'while', test, body };;
};
let astLetStar = (ctx) => {
  dbg('+++astLetStar', Object.keys(ctx), ctx.getText());;
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
  dbg('+++astLambda', Object.keys(ctx), ctx.getText());;
  const params = ctx
            .fnSignature()
            .param()
            .map((p: ParamContext) => p.IDENTIFIER().getText());
            const body = ctx.statement().map(astStatement);
            return { tag: "lambda", params, body };;
};
let astExpression = (ctx) => {
  dbg('+++astExpression', Object.keys(ctx), ctx.getText());;
  dbg('+++astExpression literal?', !!ctx.literal());;
  dbg('+++astExpression identifier?', !!ctx.IDENTIFIER());;
  dbg('+++astExpression call?', !!ctx.call());;
  dbg('+++astExpression lambda?', !!ctx.lambda());;
  dbg('+++astExpression raw?', !!ctx.raw());;
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
  dbg('+++astCall', Object.keys(ctx), ctx.getText());;
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
  dbg('+++astLiteral', Object.keys(ctx), ctx.getText());;
  if (ctx.NUMBER()) return { tag: "literal", value: Number(ctx.NUMBER()!.getText()) };
      if (ctx.STRING()) return { tag: "literal", value: parseString(ctx.STRING()!.getText()) }; 
      if (ctx.BOOLEAN()) return { tag: "literal", value: ctx.BOOLEAN()!.getText() === "true" }; 
      if (ctx.NULL()) return { tag: "literal", value: null }; 
      if (ctx.UNDEFINED()) return { tag: "literal", value: undefined };
      throw new Error("Unknown literal");;
};
let astRaw = (ctx) => {
  dbg('+++astRaw', Object.keys(ctx), ctx.getText());;
  return {
          tag: "raw",
          code: parseString(ctx.STRING()!.getText())
      };;
};
let emitProgram = (node) => {
  dbg('+++emitProgram', Object.keys(node));;
  return node.body.map(emitStmt).join('\n');;
};
let emitIf = (node) => {
  dbg('+++if', Object.keys(node));;
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
let emitWhile = (node) => {
  dbg('+++while', Object.keys(node));;
  const lines=[];
              lines.push(`while (${emitExpr(node.test)}) {`);
              lines.push(indent(emitStmt(node.body)));
              lines.push("}");
              return lines.join('\n');;
};
let emitLetStar = (node) => {
  dbg('+++emitStar', Object.keys(node));;
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
let emitStmt = (stmt) => {
  switch (stmt.tag) {
              case 'let*':  		return emitLetStar(stmt);
              case 'if':    		return emitIf(stmt);
              case 'while': 		return emitWhile(stmt);
              case 'expr-stmt': return emitExpr(stmt.expr) + ";";
              default:      		throw new Error("unexpected " + stmt);
            };
};
let emitExpr = (expr) => {
  dbg('+++emitExpr', Object.keys(expr));;
  switch (expr.tag) {
            case 'literal':     return JSON.stringify(expr.value);
            case 'identifier':  return expr.name;
            case 'call':        return emitCall(expr);
            case 'lambda':      return emitLambda(expr);
            case 'raw':         return expr.code;
            case 'if':          throw new Error("if");
            case 'while':       throw new Error("while");
            default: throw new Error("Unhandled expr.tag >" + expr.tag + "<");
          };
};
let emitLambda = (node) => {
  dbg('+++emitLambda', Object.keys(node));;
  const params = node.params.join(', ');
              const body = node.body.map(emitStmt).join('\n');
              return `(${params}) => {\n${indent(body)}\n}`;
};
let isOperator = (name) => {
  return ["<", ">", "<=", ">=", "&&", "||", "!=", "==", "===", "+", "-", "*", "/", "%", "^"].includes(name);  ;
};
let emitCall = (node) => {
  dbg('+++emitCall', Object.keys(node));;
  
            //console.error("???", node.fn.name, node.fn.tag);
            if (node.fn.tag === 'identifier' && isOperator(node.fn.name)) {
              dbg("OPERATOR", node.fn.name);
              const fn = emitExpr(node.fn);
              const args = node.args.map(emitExpr);
              if (args.length === 1) {
                return `(${fn}${args})`;
              } else {
                return `(${args.join(fn)})`;
              }
            } else {
              const fn = emitExpr(node.fn);
              const args = node.args.map(emitExpr).join(', ');
              return `${fn}(${args})`;
  };
};
let indent = (text) => {
  dbg('+++emitIndent', text);;
  return text.split('\n').map(line => '  ' + line).join('\n');;
};
let main = () => {
  
                const input = fs.readFileSync(process.argv[2], "utf-8");
                const inputStream = CharStream.fromString(input);
                const lexer = new Stage1Lexer(inputStream);
                const tokenStream = new CommonTokenStream(lexer);
                const parser = new Stage1Parser(tokenStream);
                const tree = parser.program();
                //console.error("???", tree.toStringTree(parser));
                const ast = astProgram(tree);
                console.log(emitProgram(ast));;
};
main();
