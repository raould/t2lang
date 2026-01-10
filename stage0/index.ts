import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage0Lexer } from "./Stage0Lexer";
import { RawContext, BindingContext, CallContext, ExpressionContext, LambdaContext, LetStarContext, LiteralContext, ParamContext, ProgramContext, Stage0Parser, StatementContext } from "./Stage0Parser";
import fs from "node:fs";

// AST node types.

type Literal = { tag: "literal", value: any };
type Identifier = { tag: "identifier", name: string };
type Call = { tag: "call", fn: Expr, args: Expr[] };
type Lambda = { tag: "lambda", params: string[], body: Stmt[] };
type Raw = { tag: "raw", code: string };
type Expr = Literal | Identifier | Call | Lambda | Raw;

type LetStar = { tag: "let*", bindings: { name: string, init?: Expr }[], body: Stmt[] };
type Stmt = LetStar | Expr;

type Program = { tag: "program"; body: Stmt[] };

// CTS -> AST.

function buildProgram(ctx: ProgramContext): Program {
    return {
        tag: "program",
        body: ctx.statement().map(buildStatement),
    };
}

function buildStatement(ctx: StatementContext): Stmt {
    if (ctx.letStar()) {
        return buildLetStar(ctx.letStar()!);
    }
    if (ctx.lambda()) {
        return buildLambda(ctx.lambda()!);
    }
    if (ctx.raw()) {
        return buildRaw(ctx.raw()!);
    }
    return buildExpression(ctx.expression()!);
}

function buildLetStar(ctx: LetStarContext): Stmt {
    const bindings = ctx
    .binding()
    .map((b: BindingContext) => {
        const id = b.IDENTIFIER().getText();
        const init = b.expression() ? buildExpression(b.expression()!) : undefined;
        return { name: id, init };
    });
    const body = ctx.statement().map(buildStatement);
    return { tag: "let*", bindings, body };
}

function buildLambda(ctx: LambdaContext): Expr {
    const params = ctx
    .fnSignature()
    .param()
    .map((p: ParamContext) => p.IDENTIFIER().getText());
    const body = ctx.statement().map(buildStatement);
    return { tag: "lambda", params, body };
}

function buildExpression(ctx: ExpressionContext): Expr {
    if (ctx.literal()) {
        return buildLiteral(ctx.literal()!);
    }
    if (ctx.IDENTIFIER()) {
        return { tag: "identifier", name: ctx.IDENTIFIER()!.getText() };
    }
    if (ctx.call()) {
        return buildCall(ctx.call()!);
    }
    if (ctx.lambda()) {
        return buildLambda(ctx.lambda()!); 
    }
    if (ctx.raw()) {
        return buildRaw(ctx.raw()!);
    }
    throw new Error("Unknown expression node");
}

function buildCall(ctx: CallContext): Expr {
    const exprs = ctx
    .expression()
    .map(buildExpression);
    return {
        tag: "call",
        fn: exprs[0],
        args: exprs.slice(1)
    };
}

function buildLiteral(ctx: LiteralContext): Expr {
    if (ctx.NUMBER()) return { tag: "literal", value: Number(ctx.NUMBER()!.getText()) };
    if (ctx.STRING()) return { tag: "literal", value: parseString(ctx.STRING()!.getText()) }; 
    if (ctx.BOOLEAN()) return { tag: "literal", value: ctx.BOOLEAN()!.getText() === "true" }; 
    if (ctx.NULL()) return { tag: "literal", value: null }; 
    if (ctx.UNDEFINED()) return { tag: "literal", value: undefined };
    throw new Error("Unknown literal");
}

function buildRaw(ctx: RawContext): Expr {
    return {
        tag: "raw",
        code: parseString(ctx.STRING()!.getText())
    };
}

function parseString(tokenText: string): string {
    const raw = tokenText;
    if (raw.startsWith('"""')) {
        return raw.slice(3, -3);
    }
    else {
        const inner = raw.slice(1, -1);
        // antlr and json escapes are the same (?!)
        return JSON.parse('"' + inner.replace(/"/g, '\\"') + '"');
    }
}

// AST -> TS codegen.

export function emitProgram(node: Program): string {
  return node.body.map(emitStmt).join("\n");
}

function emitStmt(stmt: Stmt): string {
    switch (stmt.tag) {
    case "let*":			return emitLetStar(stmt);
    default:     			return emitExpr(stmt as Expr) + ";";
    }
}

function emitLetStar(node: LetStar): string {
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

  return lines.join("\n");
}

function emitExpr(expr: Expr): string {
    switch (expr.tag) {
    case "literal":     return JSON.stringify(expr.value);
    case "identifier":  return expr.name;
    case "call":        return emitCall(expr);
    case "lambda":      return emitLambda(expr);
    case "raw":         return expr.code;
    default: throw new Error(`emitExpr: unhandled tag '${expr.tag}'`);
    }
}

function emitCall(node: Call): string {
  const fn = emitExpr(node.fn);
  const args = node.args.map(emitExpr).join(", ");
  return `${fn}(${args})`;
}

function emitLambda(node: Lambda): string {
  const params = node.params.join(", ");
  const body = node.body.map(emitStmt).join("\n");
  return `(${params}) => {\n${indent(body)}\n}`;
}

function indent(text: string): string {
  return text.split("\n").map(line => "  " + line).join("\n");
}

const input = fs.readFileSync(process.argv[2], "utf-8");
//console.log(input);
const inputStream = CharStream.fromString(input);
const lexer = new Stage0Lexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new Stage0Parser(tokenStream);
const tree = parser.program();
//console.log(tree.toStringTree(parser));
const ast = buildProgram(tree);
//console.log(JSON.stringify(ast, null, 2));
console.log(emitProgram(ast));
