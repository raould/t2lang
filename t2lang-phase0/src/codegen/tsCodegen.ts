import {
  Program,
  Statement,
  Expr,
  Identifier,
  LiteralExpr,
  CallExpr,
  LetStarExpr,
  IfExpr,
  PropExpr,
  FunctionExpr,
  ReturnExpr,
  WhileExpr,
  ArrayExpr,
  ObjectExpr,
  AssignExpr,
  ForExpr,
  IndexExpr,
  NewExpr,
  ClassExpr,
  TypeAssertExpr,
  ImportStmt,
  ExportStmt,
  ThrowExpr,
  TryCatchExpr,
  BlockStmt,
  TypeAliasStmt,
  SourceLocation
} from "../ast/nodes.js";
import { TypeNode } from "../ast/nodes.js";
import { TypeTable, Type } from "../typecheck/typeChecker.js";

import { createRequire } from "module";

export enum PrettyOption {
  ugly = "ugly",
  newlines = "newlines",
  pretty = "pretty"
}

export interface TsCodegenOptions {
  pretty: PrettyOption;
  emitTypes: boolean;
  typeTable?: TypeTable;
  runtimePropCallCheck?: boolean;
}

export interface PositionMapping {
  tsStart: number;
  tsEnd: number;
  t2Location: SourceLocation;
}

export interface CodegenResult {
  tsSource: string;
  mappings: PositionMapping[];
}

class TsBuilder {
  private output = '';
  private mappings: PositionMapping[] = [];

  emit(str: string): void {
    this.output += str;
  }

  emitWithMapping(str: string, location: SourceLocation): void {
    const start = this.output.length;
    this.output += str;
    const end = this.output.length;
    this.mappings.push({ tsStart: start, tsEnd: end, t2Location: location });
  }

  getResult(): CodegenResult {
    return { tsSource: this.output, mappings: this.mappings };
  }
}

function typeToString(t: Type): string {
  switch (t.kind) {
    case "number":
    case "string":
    case "boolean":
    case "null":
    case "undefined":
    case "unknown":
      return t.kind;
    case "literal":
      if (t.value === "undefined") return "undefined";
      return typeof t.value === "string" ? JSON.stringify(t.value) : String(t.value);
    case "array":
      return `${typeToString(t.element)}[]`;
    case "object": {
      const parts = t.fields.map((f) => `${f.name}: ${typeToString(f.type)}`);
      return `{ ${parts.join(", ")} }`;
    }
    case "function": {
      const params = t.params.map((p) => typeToString(p)).join(", ");
      return `(${params}) => ${typeToString(t.returns)}`;
    }
    case "union": {
      const parts = t.types.map((tt) => typeToString(tt));
      return parts.join(" | ");
    }
    case "intersection": {
      const parts = t.types.map((tt) => typeToString(tt));
      return parts.join(" & ");
    }
  }
}

export async function genProgram(program: Program, options: TsCodegenOptions, typeTable?: TypeTable): Promise<CodegenResult> {
  if (typeTable) {
    options.typeTable = typeTable;
  }
  const builder = new TsBuilder();

  for (const stmt of program.body) {
    genStatement(stmt, options, builder);
  }

  const result = builder.getResult();

  let code: string;
  switch (options.pretty) {
    case PrettyOption.ugly:
      code = result.tsSource;
      break;
    case PrettyOption.newlines:
      code = result.tsSource + "\n";
      break;
    case PrettyOption.pretty: {
      const require = createRequire(import.meta.url);
      let prettierPkg: unknown;
      try {
        prettierPkg = require("prettier");
        const formatter = prettierPkg as { format: (text: string, opts?: { parser: string }) => string };
        code = await formatter.format(result.tsSource + "\n", { parser: "typescript" });
        // Note: formatting changes positions, so mappings are invalidated for pretty mode
        // For now, clear mappings if pretty
        if (code !== result.tsSource + "\n") {
          result.mappings = [];
        }
      } catch {
        throw new Error(
          "Prettier is not installed. Install it with `npm install --save prettier` to use PrettyOption.pretty."
        );
      }
      break;
    }
    default:
      code = result.tsSource;
  }

  return { tsSource: code, mappings: result.mappings };
}

function genStatement(stmt: Statement, options: TsCodegenOptions, builder: TsBuilder): void {
  switch (stmt.kind) {
    case "exprStmt": {
      const exprCode = genExpr(stmt.expr, options);
      builder.emitWithMapping(exprCode + ";", stmt.location);
      break;
    }
    case "block":
      builder.emitWithMapping(genBlock(stmt as BlockStmt, options), stmt.location);
      break;
    case "let*":
      builder.emitWithMapping(genLetStar(stmt as LetStarExpr, options), stmt.location);
      break;
    case "type-alias":
      builder.emitWithMapping(genTypeAlias(stmt as TypeAliasStmt), stmt.location);
      break;
    case "import":
      builder.emitWithMapping(genImport(stmt as ImportStmt), stmt.location);
      break;
    case "export":
      builder.emitWithMapping(genExport(stmt as ExportStmt, options), stmt.location);
      break;
    default:
      builder.emit("/* unsupported statement */");
  }
}

function genExpr(expr: Expr, options: TsCodegenOptions): string {
  switch (expr.kind) {
    case "identifier":
      return (expr as Identifier).name;

    case "literal":
      return genLiteral(expr as LiteralExpr);

    case "call":
      return genCall(expr as CallExpr, options);

    case "let*":
      return genLetStar(expr as LetStarExpr, options);

    case "if":
      return genIf(expr as IfExpr, options);

    case "prop":
      return genProp(expr as PropExpr, options);

    case "function":
      return genFunction(expr as FunctionExpr, options);

    case "return":
      return genReturn(expr as ReturnExpr, options);

    case "while":
      return genWhile(expr as WhileExpr, options);

    case "array":
      return genArray(expr as ArrayExpr, options);

    case "object":
      return genObject(expr as ObjectExpr, options);

    case "assign":
      return genAssign(expr as AssignExpr, options);

    case "for":
      return genFor(expr as ForExpr, options);

    case "index":
      return genIndex(expr as IndexExpr, options);

    case "new":
      return genNew(expr as NewExpr, options);

    case "class":
      return genClass(expr as ClassExpr, options);

    case "type-assert":
      return genTypeAssert(expr as TypeAssertExpr, options);

    case "throw":
      return genThrow(expr as ThrowExpr, options);

    case "try-catch":
      return genTryCatch(expr as TryCatchExpr, options);

    case "block":
      return genBlock(expr as BlockStmt, options);

    default:
      return "/* unsupported */";
  }
}

function genLiteral(node: LiteralExpr): string {
  const v = node.value;

  // Check for special "undefined" sentinel before string check
  if (v === "undefined") return "undefined";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (v === null) return "null";

  return "undefined";
}

const BINARY_OPERATORS: Set<string> = new Set([
  "+", "-", "*", "/", "%",
  "==", "!=", "===", "!==",
  "<", "<=", ">", ">=",
  "&&", "||",
  "&", "|", "^",
  "<<", ">>", ">>>"
  , "**"
]);

const UNARY_OPERATORS: Set<string> = new Set([
  "!", "-", "~", "typeof", "!!"
]);

function genCall(node: CallExpr, options: TsCodegenOptions): string {
  // Check if callee is an identifier that's an operator
  if (node.callee.kind === "identifier") {
    const name = (node.callee as Identifier).name;
    let op = name;
    // Map word-forms to JS operators
    if (name === 'and') op = '&&';
    if (name === 'or') op = '||';
    if (name === 'not') op = '!';
    // xor handled specially below

    // Binary operator with exactly 2 args
    if (BINARY_OPERATORS.has(op) && node.args.length === 2) {
      const left = genExpr(node.args[0], options);
      const right = genExpr(node.args[1], options);
      return `(${left} ${op} ${right})`;
    }

    // Special-case boolean xor word-form
    if (name === 'xor' && node.args.length === 2) {
      const left = genExpr(node.args[0], options);
      const right = genExpr(node.args[1], options);
      return `((${left} && !${right}) || (!${left} && ${right}))`;
    }

    // Unary operator with exactly 1 arg
    if (UNARY_OPERATORS.has(op) && node.args.length === 1) {
      const operand = genExpr(node.args[0], options);
      if (op === "typeof") {
        return `typeof ${operand}`;
      }
      return `(${op}${operand})`;
    }
  }

  // Regular function call
  // If caller requested runtime prop-call checks and the callee is a prop,
  // generate a safe wrapper that evaluates the object once and verifies
  // the property is callable before invoking it.
  if (options.runtimePropCallCheck && node.callee.kind === "prop") {
    const prop = node.callee as PropExpr;
    const objectExpr = genExpr(prop.object, options);
    const propName = prop.property;
    const args = node.args.map(arg => genExpr(arg, options)).join(", ");
    // Use an IIFE to evaluate object once and avoid naming collisions.
    return `((__obj) => { if (typeof __obj[${JSON.stringify(propName)}] !== \"function\") { throw new Error(\`Property ${propName} is not a function\`); } return __obj[${JSON.stringify(propName)}](${args}); })(${objectExpr})`;
  }

  const callee = genExpr(node.callee, options);
  const args = node.args.map(arg => genExpr(arg, options)).join(", ");
  return `${callee}(${args})`;
}

function genIf(node: IfExpr, options: TsCodegenOptions): string {
  const condition = genExpr(node.condition, options);
  const thenBranch = node.thenBranch.kind === "block"
    ? genBlock(node.thenBranch as BlockStmt, options)
    : `{ ${genExpr(node.thenBranch, options)}; }`;

  if (node.elseBranch === null) {
    return `if (${condition}) ${thenBranch}`;
  }

  const elseBranch = node.elseBranch.kind === "block"
    ? genBlock(node.elseBranch as BlockStmt, options)
    : `{ ${genExpr(node.elseBranch, options)}; }`;
  return `if (${condition}) ${thenBranch} else ${elseBranch}`;
}

function genProp(node: PropExpr, options: TsCodegenOptions): string {
  const object = genExpr(node.object, options);
  return `${object}.${node.property}`;
}

function genFunction(node: FunctionExpr, options: TsCodegenOptions): string {
  const params = node.params
    .map((p) => {
      if (options.emitTypes && options.typeTable && p.typeId !== null && p.typeId !== undefined) {
        const t = options.typeTable.get(p.typeId);
        if (t.kind !== "unknown") {
          return `${p.name}: ${typeToString(t)}`;
        }
      }
      return p.name;
    })
    .join(", ");

  let returnTypeAnn = "";
  if (options.emitTypes && options.typeTable && node.typeId !== null && node.typeId !== undefined) {
    const t = options.typeTable.get(node.typeId);
    if (t.kind === "function") {
      returnTypeAnn = `: ${typeToString(t.returns)}`;
    }
  }

  let result = "";
  if (node.name === null) {
    // Lambda / anonymous function
    result += `(${params})${returnTypeAnn} => {\n`;
  } else {
    // Named function
    result += `function ${node.name.name}(${params})${returnTypeAnn} {\n`;
  }

  for (const e of node.body) {
    if (e.kind === "block") {
      // Unwrap nested block inside function body to avoid double braces
      for (const inner of (e as BlockStmt).body) {
        result += genExpr(inner, options);
        result += ";\n";
      }
    } else {
      result += genExpr(e, options);
      result += ";\n";
    }
  }
  result += "}";
  return result;
}

function genReturn(node: ReturnExpr, options: TsCodegenOptions): string {
  if (node.value === null) {
    return "return";
  }
  const value = genExpr(node.value, options);
  return `return ${value}`;
}

function genWhile(node: WhileExpr, options: TsCodegenOptions): string {
  const condition = genExpr(node.condition, options);
  const bodyLines = node.body.map(e => genExpr(e, options) + ";");
  const body = bodyLines.join("\n");
  return `while (${condition}) {\n${body}\n}`;
}

function genArray(node: ArrayExpr, options: TsCodegenOptions): string {
  const elements = node.elements.map(e => genExpr(e, options)).join(", ");
  return `[${elements}]`;
}

function genObject(node: ObjectExpr, options: TsCodegenOptions): string {
  const fields = node.fields.map(f => {
    const value = genExpr(f.value, options);
    return `"${f.key}": ${value}`;
  }).join(", ");
  return `{ ${fields} }`;
}

function genAssign(node: AssignExpr, options: TsCodegenOptions): string {
  const target = genExpr(node.target, options);
  const value = genExpr(node.value, options);
  return `${target} = ${value}`;
}

function genFor(node: ForExpr, options: TsCodegenOptions): string {
  const init = node.init !== null ? genExpr(node.init, options) : "";
  const condition = node.condition !== null ? genExpr(node.condition, options) : "";
  const update = node.update !== null ? genExpr(node.update, options) : "";
  const bodyLines = node.body.map(e => genExpr(e, options) + ";");
  const body = bodyLines.join("\n");
  return `for (${init}; ${condition}; ${update}) {\n${body}\n}`;
}

function genIndex(node: IndexExpr, options: TsCodegenOptions): string {
  const object = genExpr(node.object, options);
  const index = genExpr(node.index, options);
  return `${object}[${index}]`;
}

function genNew(node: NewExpr, options: TsCodegenOptions): string {
  const callee = genExpr(node.callee, options);
  const args = node.args.map(a => genExpr(a, options)).join(", ");
  return `new ${callee}(${args})`;
}

function genClass(node: ClassExpr, options: TsCodegenOptions): string {
  const extendsClause = node.superclass !== null ? ` extends ${node.superclass.name}` : "";
  let classType: Type | null = null;
  if (options.emitTypes && options.typeTable && node.typeId !== null && node.typeId !== undefined) {
    classType = options.typeTable.get(node.typeId);
  }

  let result = `class ${node.name.name}${extendsClause} {\n`;

  // Fields
  for (const field of node.fields) {
    let typeAnn = "";
    if (classType && classType.kind === "object") {
      const match = classType.fields.find((f) => f.name === field.name);
      if (match && match.type.kind !== "unknown") {
        typeAnn = `: ${typeToString(match.type)}`;
      }
    }
    result += `  ${field.name}${typeAnn}`;
    if (field.initializer !== null) {
      result += " = ";
      result += genExpr(field.initializer, options);
    }
    result += ";\n";
  }

  // Methods
  for (const method of node.methods) {
    const params = method.params.map(p => p.name).join(", ");
    result += `  ${method.name}(${params}) {\n`;
    for (const e of method.body) {
      result += "    ";
      result += genExpr(e, options);
      result += ";\n";
    }
    result += "  }\n";
  }

  result += "}\n";
  return result;
}

function genTypeAssert(node: TypeAssertExpr, options: TsCodegenOptions): string {
  const expr = genExpr(node.expr, options);
  return `(${expr} as ${genType(node.typeAnnotation)})`;
}

function genType(typeNode: TypeNode | null | undefined): string {
  if (!typeNode) return "any";
  switch (typeNode.kind) {
    case "type-array":
      return `${genType(typeNode.element)}[]`;
    case "type-ref":
      return typeNode.name;
    case "type-number":
      return "number";
    case "type-string":
      return "string";
    case "type-boolean":
      return "boolean";
    case "type-null":
      return "null";
    case "type-undefined":
      return "undefined";
    case "type-literal":
      if (typeNode.value === "undefined") return "undefined";
      return typeof typeNode.value === "string" ? JSON.stringify(typeNode.value) : String(typeNode.value);
    case "type-object": {
      const parts = typeNode.fields.map((f) => `${f.name}: ${genType(f.type)}`);
      return `{ ${parts.join(", ")} }`;
    }
    case "type-function": {
      const params = typeNode.params.map((p) => genType(p)).join(", ");
      return `(${params}) => ${genType(typeNode.returns)}`;
    }
    case "type-union":
      return typeNode.types.map(genType).join(" | ");
    case "type-intersection":
      return typeNode.types.map(genType).join(" & ");
    default:
      return "any";
  }
}

function genTypeAlias(node: TypeAliasStmt): string {
  return `type ${node.name.name} = ${genType(node.typeAnnotation)};`;
}

function genThrow(node: ThrowExpr, options: TsCodegenOptions): string {
  const value = genExpr(node.value, options);
  return `throw ${value}`;
}

function genImport(node: ImportStmt): string {
  if (node.importKind === "default") {
    return `import ${node.name} from "${node.from}";`;
  } else if (node.importKind === "named") {
    const names = node.names!.join(", ");
    return `import { ${names} } from "${node.from}";`;
  } else if (node.importKind === "all") {
    return `import * as ${node.alias} from "${node.from}";`;
  }
  return "";
}

function genExport(node: ExportStmt, options: TsCodegenOptions): string {
  if (node.exportKind === "named") {
    return `export { ${node.name} };`;
  } else if (node.exportKind === "default") {
    const declaration = genExpr(node.declaration!, options);
    return `export default ${declaration}`;
  }
  return "";
}

function genTryCatch(node: TryCatchExpr, options: TsCodegenOptions): string {
  const tryLines = node.tryBody.map(e => genExpr(e, options) + ";").join("\n  ");

  let catchClause = "";
  if (node.catchBody.length > 0 || node.catchParam !== null) {
    const catchParam = node.catchParam !== null ? node.catchParam.name : "e";
    const catchLines = node.catchBody.map(e => genExpr(e, options) + ";").join("\n  ");
    catchClause = ` catch (${catchParam}) {\n  ${catchLines}\n}`;
  }

  let finallyClause = "";
  if (node.finallyBody.length > 0) {
    const finallyLines = node.finallyBody.map(e => genExpr(e, options) + ";").join("\n  ");
    finallyClause = ` finally {\n  ${finallyLines}\n}`;
  }

  return `try {\n  ${tryLines}\n}${catchClause}${finallyClause}`;
}

function genLetStar(node: LetStarExpr, options: TsCodegenOptions): string {
  let result = "{\n";
  const keyword = node.isConst ? "const" : "let";

  for (const binding of node.bindings) {
    result += `${keyword} ${binding.name.name}`;
    if (options.emitTypes && options.typeTable && binding.name.typeId !== null && binding.name.typeId !== undefined) {
      const t = options.typeTable.get(binding.name.typeId);
      result += `: ${typeToString(t)}`;
    }
    result += " = ";
    result += genExpr(binding.init, options);
    result += ";\n";
  }

  for (const expr of node.body) {
    result += genExpr(expr, options);
    result += ";\n";
  }

  result += "}\n";
  return result;
}

function genBlock(node: BlockStmt, options: TsCodegenOptions): string {
  let result = "{\n";
  for (const e of node.body) {
    result += genExpr(e, options);
    result += ";\n";
  }
  result += "}\n";
  return result;
}
