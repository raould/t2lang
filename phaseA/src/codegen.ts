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
  BlockStmt,
  AssignExpr,
  ReturnExpr,
  IfStmt,
  WhileStmt,
} from "./phaseA1.js";

export interface CompilerConfig {
  prettyOutput?: "pretty" | "ugly";
  emitTypes?: boolean;
}

export interface CodegenResult {
  tsSource: string;
  mappings: SourceMapping[];
}

export interface SourceMapping {
  generated: { line: number; column: number };
  original: { line: number; column: number };
  source: string;
}

interface EmittedStatement {
  lines: string[];
  mappings: Array<{ lineOffset: number; original: { line: number; column: number }; source: string }>;
}

export async function generateCode(program: Program, config: CompilerConfig = {}): Promise<CodegenResult> {
  const lines: string[] = [];
  const mappings: SourceMapping[] = [];
  let generatedLine = 1;
  for (const stmt of program.body) {
    const emitted = await emitStatement(stmt);
    const offsetMap: number[] = [];
    let outputOffset = 0;
    for (let i = 0; i < emitted.lines.length; i++) {
      const line = emitted.lines[i];
      if (line.trim()) {
        lines.push(line);
        offsetMap[i] = outputOffset;
        outputOffset++;
      } else {
        offsetMap[i] = -1;
      }
    }
    for (const mapping of emitted.mappings) {
      const mappedOffset = offsetMap[mapping.lineOffset];
      if (mappedOffset >= 0) {
        mappings.push({
          generated: { line: generatedLine + mappedOffset, column: 1 },
          original: mapping.original,
          source: mapping.source,
        });
      }
    }
    generatedLine += outputOffset;
  }
  const tsSource = lines.join("\n");
  return { tsSource, mappings };
}

async function emitStatement(stmt: Statement): Promise<EmittedStatement> {
  if (stmt instanceof ExprStmt) {
    return {
      lines: [`${await emitExpression(stmt.expr)};`],
      mappings: [mappingFromSpan(stmt.expr.span, 0)],
    };
  }
  if (stmt instanceof LetStarExpr) {
    const lines: string[] = [];
    const mappings: EmittedStatement["mappings"] = [];
    for (const binding of stmt.bindings) {
      lines.push(await renderBinding(binding, stmt.isConst));
      mappings.push(mappingFromSpan(binding.target.span, lines.length - 1));
    }
    for (const inner of stmt.body) {
      const emitted = await emitStatement(inner);
      const baseOffset = lines.length;
      lines.push(...emitted.lines);
      for (const mapping of emitted.mappings) {
        mappings.push({
          lineOffset: baseOffset + mapping.lineOffset,
          original: mapping.original,
          source: mapping.source,
        });
      }
    }
    return { lines, mappings };
  }
  if (stmt instanceof AssignExpr) {
    const target = await emitExpression(stmt.target);
    const value = await emitExpression(stmt.value);
    return {
      lines: [`${target} = ${value};`],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ReturnExpr) {
    if (stmt.value) {
      const value = await emitExpression(stmt.value);
      return {
        lines: [`return ${value};`],
        mappings: [mappingFromSpan(stmt.span, 0)],
      };
    }
    return {
      lines: ["return;"],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof IfStmt) {
    const test = await emitExpression(stmt.test);
    const consequent = await emitStatementBody(stmt.consequent);
    const lines: string[] = [`if (${test}) {`];
    for (const line of consequent.lines) {
      lines.push(`  ${line}`);
    }
    lines.push("}");
    if (stmt.alternate) {
      const alternate = await emitStatementBody(stmt.alternate);
      lines.push("else {");
      for (const line of alternate.lines) {
        lines.push(`  ${line}`);
      }
      lines.push("}");
    }
    return {
      lines,
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof WhileStmt) {
    const condition = await emitExpression(stmt.condition);
    const body = await emitStatementBody(stmt.body);
    const lines: string[] = [`while (${condition}) {`];
    for (const line of body.lines) {
      lines.push(`  ${line}`);
    }
    lines.push("}");
    return {
      lines,
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof BlockStmt) {
    const lines: string[] = ["{"];
    const mappings: EmittedStatement["mappings"] = [];
    for (const inner of stmt.statements) {
      const emitted = await emitStatement(inner);
      const baseOffset = lines.length;
      for (const line of emitted.lines) {
        lines.push(`  ${line}`);
      }
      for (const mapping of emitted.mappings) {
        mappings.push({
          lineOffset: baseOffset + mapping.lineOffset,
          original: mapping.original,
          source: mapping.source,
        });
      }
    }
    lines.push("}");
    return { lines, mappings };
  }
  return { lines: [""], mappings: [] };
}

async function emitStatementBody(stmt: Statement): Promise<EmittedStatement> {
  if (stmt instanceof BlockStmt) {
    const lines: string[] = [];
    const mappings: EmittedStatement["mappings"] = [];
    for (const inner of stmt.statements) {
      const emitted = await emitStatement(inner);
      const baseOffset = lines.length;
      lines.push(...emitted.lines);
      for (const mapping of emitted.mappings) {
        mappings.push({
          lineOffset: baseOffset + mapping.lineOffset,
          original: mapping.original,
          source: mapping.source,
        });
      }
    }
    return { lines, mappings };
  }
  return emitStatement(stmt);
}

async function renderBinding(binding: Binding, isConst: boolean): Promise<string> {
  const name = binding.target instanceof Identifier ? binding.target.name : "_";
  const init = binding.init ? await emitExpression(binding.init) : "undefined";
  const keyword = isConst ? "const" : "let";
  return `${keyword} ${name} = ${init};`;
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

function mappingFromSpan(span: { source: string; startLine?: number; startColumn?: number }, lineOffset: number) {
  return {
    lineOffset,
    original: {
      line: span.startLine ?? 1,
      column: span.startColumn ?? 1,
    },
    source: span.source,
  };
}

async function formatLiteral(value: unknown): Promise<string> {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean" || typeof value === "number") return `${value}`;
  return "undefined";
}
