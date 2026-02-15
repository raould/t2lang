import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage2Lexer } from "./Stage2Lexer";
import { BindingContext, ParamContext, Stage2Parser } from "./Stage2Parser";
import fs from "node:fs";;
let dbg = (...msgs) => {
  console.log(...msgs);;
};
let parseString = (tokenText) => {
  const raw = tokenText;
            const inner = raw.slice(1, -1);
            return JSON.parse('"' + inner.replace(/"/g, '\\"') + '"');;
};
let indent = (text) => {
  return text.split('\n').map(line => '  ' + line).join('\n');;
};
let astProgram = (ctx) => {
  return {
                tag: "program",
                body: ctx.topLevel().map(astTopLevel),
            };;
};
let astTopLevel = (ctx) => {
  if (ctx.defmacro()) {
                return astDefmacro(ctx.defmacro()!);
            }
            if (ctx.def()) {
                return astDef(ctx.def()!);
            }
            return astStatement(ctx.statement()!);;
};
let astDefmacro = (ctx) => {
  const name = ctx.IDENTIFIER().getText();
            const params = ctx.fnSignature().param()
                .map((p: ParamContext) => p.IDENTIFIER().getText());
            const body = ctx.statement().map(astStatement);
            return { tag: "defmacro", name, params, body };;
};
let astDef = (ctx) => {
  const name = ctx.IDENTIFIER().getText();
            const init = astExpression(ctx.expression()!);
            return { tag: "def", name, init };;
};
let astStatement = (ctx) => {
  if (ctx.letStar()) {
                return astLetStar(ctx.letStar()!);
            }
            if (ctx.letStmt()) {
                return astLetStmt(ctx.letStmt()!);
            }
            if (ctx.ifForm()) {
                return astIf(ctx.ifForm()!);
            }
            if (ctx.whileForm()) {
                return astWhile(ctx.whileForm()!);
            }
            if (ctx.block()) {
                return astBlock(ctx.block()!);
            }
            if (ctx.returnForm()) {
                return astReturn(ctx.returnForm()!);
            }
            return { tag: 'expr-stmt', expr: astExpression(ctx.expression()!) };;
};
let astLetStar = (ctx) => {
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
let astLetStmt = (ctx) => {
  const name = ctx.IDENTIFIER().getText();
            const init = astExpression(ctx.expression()!);
            return { tag: 'let', name, init };;
};
let astIf = (ctx) => {
  const test = astExpression(ctx.expression());
            const ifthen = astStatement(ctx.statement(0));
            const ctxElse = ctx.statement(1);
            const ifelse = (ctxElse == undefined) ? undefined : astStatement(ctxElse);
            return { tag: 'if', test, ifthen, ifelse };;
};
let astWhile = (ctx) => {
  const test = astExpression(ctx.expression());
            const body = ctx.statement().map(astStatement);
            return { tag: 'while', test, body };;
};
let astBlock = (ctx) => {
  const body = ctx.statement().map(astStatement);
            return { tag: 'block', body };;
};
let astReturn = (ctx) => {
  const expr = ctx.expression() ? astExpression(ctx.expression()!) : undefined;
            return { tag: 'return', expr };;
};
let astExpression = (ctx) => {
  if (ctx.literal()) {
                return astLiteral(ctx.literal()!);
            }
            if (ctx.IDENTIFIER()) {
                return { tag: "identifier", name: ctx.IDENTIFIER()!.getText() };
            }
            if (ctx.lambda()) {
                return astLambda(ctx.lambda()!);
            }
            if (ctx.assign()) {
                return astAssign(ctx.assign()!);
            }
            if (ctx.call()) {
                return astCall(ctx.call()!);
            }
            throw new Error("Unknown expression: " + ctx.getText());;
};
let astLambda = (ctx) => {
  const params = ctx
            .fnSignature()
            .param()
            .map((p: ParamContext) => p.IDENTIFIER().getText());
            const body = ctx.statement().map(astStatement);
            return { tag: "lambda", params, body };;
};
let astAssign = (ctx) => {
  const name = ctx.IDENTIFIER().getText();
            const value = astExpression(ctx.expression()!);
            return { tag: "assign", name, value };;
};
let astCall = (ctx) => {
  const exprs = ctx.expression().map(astExpression);
            return {
                tag: "call",
                fn: exprs[0],
                args: exprs.slice(1)
            };;
};
let astLiteral = (ctx) => {
  if (ctx.NUMBER()) return { tag: "literal", value: Number(ctx.NUMBER()!.getText()) };
            if (ctx.STRING()) return { tag: "literal", value: parseString(ctx.STRING()!.getText()) };
            if (ctx.BOOLEAN()) return { tag: "literal", value: ctx.BOOLEAN()!.getText() === "true" };
            if (ctx.NULL()) return { tag: "literal", value: null };
            if (ctx.UNDEFINED()) return { tag: "literal", value: undefined };
            throw new Error("Unknown literal");;
};
let lowerProgram = (node) => {
  return {
                tag: "program",
                body: node.body.map(lowerTopLevel),
            };;
};
let lowerTopLevel = (node) => {
  switch (node.tag) {
            case 'defmacro':
                return lowerDefmacro(node);
            case 'def':
                return lowerDef(node);
            default:
                return lowerStmt(node);
            };
};
let lowerDefmacro = (node) => {
  return {
                tag: "defmacro",
                name: node.name,
                params: node.params,
                body: node.body.map(lowerStmt),
            };;
};
let lowerDef = (node) => {
  return {
                tag: "let-stmt",
                name: node.name,
                init: lowerExpr(node.init),
            };;
};
let lowerStmt = (node) => {
  switch (node.tag) {
            case 'let*':
                return lowerLetStar(node);
            case 'let':
                return { tag: 'let-stmt', name: node.name, init: lowerExpr(node.init) };
            case 'if':
                return { tag: 'if-stmt', test: lowerExpr(node.test),
                         ifthen: lowerStmt(node.ifthen),
                         ifelse: node.ifelse ? lowerStmt(node.ifelse) : undefined };
            case 'while':
                return { tag: 'while-stmt', test: lowerExpr(node.test),
                         body: node.body.map(lowerStmt) };
            case 'block':
                return { tag: 'block-stmt', body: node.body.map(lowerStmt) };
            case 'return':
                return { tag: 'return-stmt', expr: node.expr ? lowerExpr(node.expr) : undefined };
            case 'expr-stmt':
                return { tag: 'expr-stmt', expr: lowerExpr(node.expr) };
            default:
                throw new Error("lowerStmt: unexpected tag " + node.tag);
            };
};
let lowerLetStar = (node) => {
  const stmts = [];
            for (const b of node.bindings) {
                stmts.push({
                    tag: 'let-stmt',
                    name: b.name,
                    init: b.init ? lowerExpr(b.init) : undefined,
                });
            }
            for (const s of node.body) {
                stmts.push(lowerStmt(s));
            }
            return { tag: 'block-stmt', body: stmts };;
};
let lowerExpr = (node) => {
  switch (node.tag) {
            case 'literal':
                return node;
            case 'identifier':
                return node;
            case 'lambda':
                return { tag: 'lambda', params: node.params,
                         body: node.body.map(lowerStmt) };
            case 'assign':
                return { tag: 'assign-expr', name: node.name,
                         value: lowerExpr(node.value) };
            case 'call':
                return lowerCall(node);
            default:
                throw new Error("lowerExpr: unexpected tag " + node.tag);
            };
};
let lowerCall = (node) => {
  if (node.fn.tag === 'identifier' && isOperator(node.fn.name)) {
                const op = node.fn.name;
                const args = node.args.map(lowerExpr);
                if (args.length === 1) {
                    return { tag: 'operator-expr', op, args };
                }
                // fold (+ a b c) → (operator-expr + (operator-expr + a b) c)
                let result = { tag: 'operator-expr', op, args: [args[0], args[1]] };
                for (let i = 2; i < args.length; i++) {
                    result = { tag: 'operator-expr', op, args: [result, args[i]] };
                }
                return result;
            }
            return {
                tag: 'call',
                fn: lowerExpr(node.fn),
                args: node.args.map(lowerExpr),
            };;
};
let emitProgram = (node) => {
  return node.body.map(emitTopLevel).join('\n');;
};
let emitTopLevel = (node) => {
  switch (node.tag) {
            case 'defmacro':
                // TODO: macros are compile-time only, emit nothing
                return '// macro: ' + node.name;
            default:
                return emitStmt(node);
            };
};
let emitStmt = (stmt) => {
  switch (stmt.tag) {
            case 'let-stmt':
                return stmt.init != undefined
                    ? 'let ' + stmt.name + ' = ' + emitExpr(stmt.init) + ';'
                    : 'let ' + stmt.name + ';';
            case 'if-stmt':
                return emitIf(stmt);
            case 'while-stmt':
                return emitWhile(stmt);
            case 'block-stmt':
                return emitBlock(stmt);
            case 'return-stmt':
                return stmt.expr
                    ? 'return ' + emitExpr(stmt.expr) + ';'
                    : 'return;';
            case 'expr-stmt':
                return emitExpr(stmt.expr) + ';';
            default:
                throw new Error("emitStmt: unexpected tag " + stmt.tag);
            };
};
let emitIf = (node) => {
  const lines = [];
            lines.push('if (' + emitExpr(node.test) + ') {');
            lines.push(indent(emitStmt(node.ifthen)));
            lines.push('}');
            if (node.ifelse != undefined) {
                lines.push('else {');
                lines.push(indent(emitStmt(node.ifelse)));
                lines.push('}');
            }
            return lines.join('\n');;
};
let emitWhile = (node) => {
  const lines = [];
            lines.push('while (' + emitExpr(node.test) + ') {');
            for (const s of node.body) {
                lines.push(indent(emitStmt(s)));
            }
            lines.push('}');
            return lines.join('\n');;
};
let emitBlock = (node) => {
  const lines = ['{'];
            for (const s of node.body) {
                lines.push(indent(emitStmt(s)));
            }
            lines.push('}');
            return lines.join('\n');;
};
let emitExpr = (expr) => {
  switch (expr.tag) {
            case 'literal':
                return JSON.stringify(expr.value);
            case 'identifier':
                return expr.name;
            case 'call':
                return emitCall(expr);
            case 'lambda':
                return emitLambda(expr);
            case 'assign-expr':
                return '(' + expr.name + ' = ' + emitExpr(expr.value) + ')';
            case 'operator-expr':
                return emitOperator(expr);
            default:
                throw new Error("emitExpr: unexpected tag " + expr.tag);
            };
};
let emitLambda = (node) => {
  const params = node.params.join(', ');
            const body = node.body.map(emitStmt).join('\n');
            return '(' + params + ') => {\n' + indent(body) + '\n}';;
};
let isOperator = (name) => {
  return ["<", ">", "<=", ">=", "&&", "||", "!=", "==", "===",
                    "+", "-", "*", "/", "%", "^", "!"].includes(name);;
};
let emitCall = (node) => {
  const fn = emitExpr(node.fn);
            const args = node.args.map(emitExpr).join(', ');
            return fn + '(' + args + ')';;
};
let emitOperator = (node) => {
  const args = node.args.map(emitExpr);
            if (args.length === 1) {
                return '(' + node.op + args[0] + ')';
            }
            return '(' + args[0] + ' ' + node.op + ' ' + args[1] + ')';;
};
let main = () => {
  
            const input = fs.readFileSync(process.argv[2], "utf-8");
            const inputStream = CharStream.fromString(input);
            const lexer = new Stage2Lexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new Stage2Parser(tokenStream);
            const tree = parser.program();
  
            // Phase A: CST → surface AST
            const surfaceAst = astProgram(tree);
  
            // Phase B: sugar lowering → canonical AST
            const canonicalAst = lowerProgram(surfaceAst);
  
            // Phase C: codegen → TypeScript
            console.log(emitProgram(canonicalAst));;
};
main();
