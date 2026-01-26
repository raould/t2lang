import {
  Program,
  Statement,
  ExprStmt,
  Expression,
  Literal,
  Identifier,
  CallExpr,
  LetStarExpr,
  Binding,
  ArrayExpr,
} from "./phaseA1.js";

export interface CompilerConfig {
  prettyOutput?: "pretty" | "ugly";
  emitTypes?: boolean;
}

export interface CodegenResult {
  tsSource: string;
  mappings: unknown[];
}

export async function generateCode(program: Program, config: CompilerConfig = {}): Promise<CodegenResult> {
  const lines: string[] = [];
  for (const stmt of program.body) {
    const rendered = await emitStatement(stmt);
    if (rendered.trim()) {
      lines.push(rendered);
    }
  }
  const tsSource = lines.join("\n");
  return { tsSource, mappings: [] };
}

async function emitStatement(stmt: Statement): Promise<string> {
  if (stmt instanceof ExprStmt) {
    return `${await emitExpression(stmt.expr)};`;
  }
  if (stmt instanceof LetStarExpr) {
    const declarations = await Promise.all(stmt.bindings.map(renderBinding));
    const bodySegments = [];
    for (const inner of stmt.body) {
      const rendered = await emitStatement(inner);
      if (rendered.trim()) {
        bodySegments.push(rendered);
      }
    }
    const declarationsBlock = declarations.join("\n");
    const bodyBlock = bodySegments.join("\n");
    return `${declarationsBlock}${bodyBlock ? "\n" + bodyBlock : ""}`;
  }
  return "";
}

async function renderBinding(binding: Binding): Promise<string> {
  const name = binding.target instanceof Identifier ? binding.target.name : "_";
  const init = binding.init ? await emitExpression(binding.init) : "undefined";
  return `const ${name} = ${init};`;
}

async function emitExpression(expr: Expression): Promise<string> {
  if (expr instanceof Literal) {
    return await formatLiteral(expr.value);
  }
  if (expr instanceof Identifier) {
    return expr.name;
  }
  if (expr instanceof CallExpr) {
    const callee = await emitExpression(expr.callee);
    const args = await Promise.all(expr.args.map(emitExpression));
    return `${callee}(${args.join(", ")})`;
  }
  if (expr instanceof ArrayExpr) {
    const entries = await Promise.all(expr.elements.map(emitExpression));
    return `[${entries.join(", ")}]`;
  }
  return "undefined";
}

async function formatLiteral(value: unknown): Promise<string> {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean" || typeof value === "number") return `${value}`;
  return "undefined";
}
