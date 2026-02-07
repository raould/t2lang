import { reportError } from "../../common/dist/errorRegistry.js";
import {
  Program,
  Statement,
  ExprStmt,
  Expression,
  Literal,
  Identifier,
  CallExpr,
  CallWithThisExpr,
  PropExpr,
  IndexExpr,
  ObjectExpr,
  NewExpr,
  LetStarExpr,
  Binding,
  BindingTarget,
  ArrayPattern,
  ObjectPattern,
  RestPattern,
  DefaultPattern,
  ArrayExpr,
  BlockStmt,
  StaticBlockStmt,
  AssignExpr,
  ReturnExpr,
  IfStmt,
  WhileStmt,
  ForClassic,
  ForOf,
  ForAwait,
  ThrowExpr,
  FunctionExpr,
  ClassExpr,
  TryCatchExpr,
  SwitchStmt,
  BreakStmt,
  ContinueStmt,
  ImportStmt,
  ExportStmt,
  NamedImport,
  NamedExport,
  TypeAliasStmt,
  TypeAssertExpr,
  TypeApp,
  TypeField,
  TypeFunction,
  TypeIntersection,
  TypeLiteral,
  TypeTemplateLiteral,
  TypeMapped,
  TypeNode,
  TypeObject,
  TypeParam,
  TypePrimitive,
  TypeRef,
  TypeUnion,
  TypeVar,
  TypeTuple,
  TypeArray,
  TypeNullable,
  TypeKeyof,
  TypeTypeof,
  TypeIndexed,
  TypeConditional,
  TypeInfer,
  TypeThis,
  IndexSignature,
  InterfaceStmt,
  EnumStmt,
  EnumMember,
  NamespaceStmt,
  SpreadExpr,
  TemplateExpr,
  NonNullAssertExpr,
  TernaryExpr,
  AwaitExpr,
  YieldExpr,
} from "./phaseA1.js";
export interface CompilerConfig {
  prettyOption?: "pretty" | "ugly";
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
  const requiresAsync = programRequiresAsync(program);
  const isModule = program.body.some((stmt) => stmt instanceof ImportStmt || stmt instanceof ExportStmt);
  let tsLines = lines;
  let lineShift = 0;
  if (config.prettyOption === "pretty" && !isModule) {
    tsLines = ["{", ...tsLines, "}"];
    lineShift += 1;
  }
  if (requiresAsync) {
    const wrapperPrefix = "async ";
    tsLines = [
      `void (${wrapperPrefix}() => {`,
      ...tsLines.map((line) => (line ? `  ${line}` : "")),
      "})();",
    ];
    lineShift += 1;
  }
  const shiftedMappings = mappings.map((mapping) => ({
    ...mapping,
    generated: {
      line: mapping.generated.line + lineShift,
      column: mapping.generated.column,
    },
  }));
  const tsSource = tsLines.join("\n");
  return { tsSource, mappings: shiftedMappings };
}

async function emitStatement(stmt: Statement): Promise<EmittedStatement> {
  if (stmt instanceof StaticBlockStmt) {
    const lines: string[] = ["static {"];
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
  if (stmt instanceof ExprStmt) {
    if (stmt.expr instanceof TryCatchExpr) {
      return await emitTryCatchStatement(stmt.expr);
    }
    if (stmt.expr instanceof ClassExpr) {
      const text = await emitClassExpression(stmt.expr);
      return {
        lines: [text],
        mappings: [mappingFromSpan(stmt.expr.span, 0)],
      };
    }
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
  if (stmt instanceof BreakStmt) {
    const label = stmt.label ? ` ${stmt.label.name}` : "";
    return {
      lines: [`break${label};`],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ContinueStmt) {
    const label = stmt.label ? ` ${stmt.label.name}` : "";
    return {
      lines: [`continue${label};`],
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
  if (stmt instanceof SwitchStmt) {
    const discriminant = await emitExpression(stmt.discriminant);
    const lines: string[] = [`switch (${discriminant}) {`];
    for (const c of stmt.cases) {
      const label = c.test ? `case ${await emitExpression(c.test)}:` : "default:";
      lines.push(`  ${label}`);
      for (const inner of c.consequent) {
        const emitted = await emitStatement(inner);
        for (const line of emitted.lines) {
          lines.push(`    ${line}`);
        }
      }
    }
    lines.push("}");
    return {
      lines,
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ImportStmt) {
    const spec = stmt.spec;
    const segments: string[] = [];
    if (spec.defaultBinding) {
      segments.push(spec.defaultBinding.name);
    }
    if (spec.named && spec.named.length > 0) {
      const entries = spec.named.map(formatNamedImportEntry).join(", ");
      segments.push(`{ ${entries} }`);
    }
    if (spec.namespaceBinding) {
      segments.push(`* as ${spec.namespaceBinding.name}`);
    }
    const clause = segments.join(", ");
    const source = await emitExpression(spec.source);
    return {
      lines: [`import ${clause} from ${source};`],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ExportStmt) {
    const spec = stmt.spec;
    if (spec.namespaceExport) {
      const target = spec.namespaceExport.name;
      const source = spec.source ? await emitExpression(spec.source) : undefined;
      const fromClause = source ? ` from ${source}` : "";
      return {
        lines: [`export * as ${target}${fromClause};`],
        mappings: [mappingFromSpan(stmt.span, 0)],
      };
    }
    if (spec.defaultExport) {
      const value = await emitExpression(spec.defaultExport);
      return {
        lines: [`export default ${value};`],
        mappings: [mappingFromSpan(stmt.span, 0)],
      };
    }
    if (spec.named && spec.named.length > 0) {
      const entries = spec.named.map(formatNamedExportEntry).join(", ");
      const source = spec.source ? await emitExpression(spec.source) : undefined;
      const fromClause = source ? ` from ${source}` : "";
      return {
        lines: [`export { ${entries} }${fromClause};`],
        mappings: [mappingFromSpan(stmt.span, 0)],
      };
    }
    return { lines: ["export {};"], mappings: [mappingFromSpan(stmt.span, 0)] };
  }
  if (stmt instanceof FunctionExpr) {
    if (stmt.callableKind === "lambda") {
      const text = await emitFunctionExpression(stmt, false);
      return {
        lines: [`${text};`],
        mappings: [mappingFromSpan(stmt.span, 0)],
      };
    }
    const text = await emitFunctionExpression(stmt, true);
    return {
      lines: [text],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ClassExpr) {
    const text = await emitClassExpression(stmt);
    return {
      lines: [text],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof TypeAliasStmt) {
    return await emitTypeAlias(stmt);
  }
  if (stmt instanceof InterfaceStmt) {
    return await emitInterface(stmt);
  }
  if (stmt instanceof EnumStmt) {
    return await emitEnum(stmt);
  }
  if (stmt instanceof NamespaceStmt) {
    return await emitNamespace(stmt);
  }
  if (stmt instanceof ForClassic) {
    const initClause = stmt.init ? await clauseFromStatement(stmt.init) : "";
    const condition = stmt.condition ? await emitExpression(stmt.condition) : "";
    const update = stmt.update ? await emitExpression(stmt.update) : "";
    const body = await emitStatementBody(stmt.body);
    const lines: string[] = [`for (${initClause}; ${condition}; ${update}) {`];
    for (const line of body.lines) {
      lines.push(`  ${line}`);
    }
    lines.push("}");
    return {
      lines,
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ForOf) {
    const bindingClause = await emitBindingClause(stmt.binding);
    const iterable = await emitExpression(stmt.iterable);
    const body = await emitStatementBody(stmt.body);
    const lines: string[] = [`for (let ${bindingClause} of ${iterable}) {`];
    for (const line of body.lines) {
      lines.push(`  ${line}`);
    }
    lines.push("}");
    return {
      lines,
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ForAwait) {
    const bindingClause = await emitBindingClause(stmt.binding);
    const iterable = await emitExpression(stmt.iterable);
    const body = await emitStatementBody(stmt.body);
    const lines: string[] = [`for await (let ${bindingClause} of ${iterable}) {`];
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
  const targetText = await emitBindingTarget(binding.target);
  const init = binding.init ? await emitExpression(binding.init) : "undefined";
  const keyword = isConst ? "const" : "let";
  return `${keyword} ${targetText} = ${init};`;
}

async function emitExpression(expr: Expression): Promise<string> {
  if (expr instanceof Literal) {
    return await formatLiteral(expr.value);
  }
  if (expr instanceof Identifier) {
    return expr.name;
  }
  if (expr instanceof CallExpr) {
    if (expr.callee instanceof Identifier) {
      const operator = OPERATOR_SYMBOLS[expr.callee.name];
      if (operator) {
        const args = await Promise.all(expr.args.map(emitExpression));
        return formatOperatorExpression(operator, args);
      }
      if (expr.callee.name === "assign" && expr.args.length === 2) {
        const [targetExpr, valueExpr] = await Promise.all(expr.args.map(emitExpression));
        return `${targetExpr} = ${valueExpr}`;
      }
    }
    const calleeText = await emitExpression(expr.callee);
    const needsParens = expr.callee instanceof FunctionExpr || expr.callee instanceof ClassExpr;
    const callee = needsParens ? `(${calleeText})` : calleeText;
    const args = await Promise.all(expr.args.map(emitExpression));
    return `${callee}(${args.join(", ")})`;
  }
  if (expr instanceof CallWithThisExpr) {
    const fn = await emitExpression(expr.fn);
    const thisArg = await emitExpression(expr.thisArg);
    const args = await Promise.all(expr.args.map(emitExpression));
    const callArgs = [thisArg, ...args].join(", ");
    return `${fn}.call(${callArgs})`;
  }
  if (expr instanceof ArrayExpr) {
    const entries = await Promise.all(expr.elements.map(emitExpression));
    return `[${entries.join(", ")}]`;
  }
  if (expr instanceof SpreadExpr) {
    const inner = await emitExpression(expr.expr);
    return `...${inner}`;
  }
  if (expr instanceof FunctionExpr) {
    return emitFunctionExpression(expr);
  }
  if (expr instanceof ClassExpr) {
    return emitClassExpression(expr);
  }
  if (expr instanceof TernaryExpr) {
    const test = await emitExpression(expr.test);
    const consequent = await emitExpression(expr.consequent);
    const alternate = await emitExpression(expr.alternate);
    return `${test} ? ${consequent} : ${alternate}`;
  }
  if (expr instanceof AwaitExpr) {
    const argument = await emitExpression(expr.argument);
    return `await ${argument}`;
  }
  if (expr instanceof YieldExpr) {
    const keyword = expr.delegate ? "yield*" : "yield";
    if (expr.argument) {
      const argument = await emitExpression(expr.argument);
      return `${keyword} ${argument}`;
    }
    return keyword;
  }
  if (expr instanceof TypeAssertExpr) {
    const value = await emitExpression(expr.expr);
    const typeText = await emitTypeNode(expr.assertedType);
    return `(${value} as ${typeText})`;
  }
  if (expr instanceof NonNullAssertExpr) {
    const value = await emitExpression(expr.expr);
    return `(${value})!`;
  }
  if (expr instanceof TypeApp) {
    // Safety check: The target of a TypeApp in an expression context must be an expression,
    // not a static type node like TypeRef or TypePrimitive.
    if (isTypeNodeValue(expr.expr)) {
      throw reportError("T2:0312", { target: expr.expr.constructor.name });
    }
    const target = await emitExpression(expr.expr as Expression);
    const typeArgs = await Promise.all(expr.typeArgs.map(emitTypeNode));
    return `${target}<${typeArgs.join(", ")}>`;
  }
  if (expr instanceof PropExpr) {
    const objectExpr = await emitExpression(expr.object);
    if (isIdentifierName(expr.name)) {
      return `${objectExpr}.${expr.name}`;
    }
    return `${objectExpr}[${JSON.stringify(expr.name)}]`;
  }
  if (expr instanceof IndexExpr) {
    const objectExpr = await emitExpression(expr.object);
    const indexExpr = await emitExpression(expr.index);
    return `${objectExpr}[${indexExpr}]`;
  }
  if (expr instanceof ObjectExpr) {
    if (expr.fields.length === 0) {
      return "{}";
    }
    const entries = await Promise.all(
      expr.fields.map(async (field) => {
        if (field.kind === "spread") {
          const valueText = await emitExpression(field.expr);
          return `...${valueText}`;
        }
        if (field.kind === "computed") {
          const keyText = await emitExpression(field.key);
          const valueText = await emitExpression(field.value);
          return `[${keyText}]: ${valueText}`;
        }
        const valueText = await emitExpression(field.value);
        const keyText = formatObjectKey(field.key);
        return `${keyText}: ${valueText}`;
      })
    );
    return `{ ${entries.join(", ")} }`;
  }
  if (expr instanceof TemplateExpr) {
    const parts: string[] = [];
    for (const part of expr.parts) {
      if (part instanceof Literal && typeof part.value === "string") {
        parts.push(escapeTemplateText(part.value));
        continue;
      }
      const exprText = await emitExpression(part);
      parts.push(`\${${exprText}}`);
    }
    return `\`${parts.join("")}\``;
  }
  if (expr instanceof NewExpr) {
    const calleeExpr = await emitExpression(expr.callee);
    const args = await Promise.all(expr.args.map(emitExpression));
    return `new ${calleeExpr}(${args.join(", ")})`;
  }
  if (expr instanceof ThrowExpr) {
    const argument = await emitExpression(expr.argument);
    return `throw ${argument}`;
  }
  return "undefined";
}

async function emitFunctionExpression(expr: FunctionExpr, asDeclaration = false): Promise<string> {
  const prefix = expr.async ? "async " : "";
  const generator = expr.generator ? "*" : "";
  const { typeParams, params, returnAnnotation } = await emitFunctionSignature(expr);
  if (expr.overload) {
    if (!asDeclaration) {
      throw reportError("T2:0226");
    }
    const namePart = expr.name ? ` ${expr.name.name}` : "";
    return `${prefix}function${generator}${namePart}${typeParams}(${params.join(", ")})${returnAnnotation};`;
  }
  const bodyText = await renderFunctionBody(expr);
  const canUseArrow = !asDeclaration && !expr.generator && expr.callableKind === "lambda";
  if (canUseArrow) {
    return `${prefix}${typeParams}(${params.join(", ")})${returnAnnotation} => ${bodyText}`;
  }
  const namePart = expr.name ? ` ${expr.name.name}` : "";
  return `${prefix}function${generator}${namePart}${typeParams}(${params.join(", ")})${returnAnnotation} ${bodyText}`;
}

async function emitFunctionSignature(expr: FunctionExpr): Promise<{ typeParams: string; params: string[]; returnAnnotation: string }> {
  const typeParams = await emitTypeParams(expr.typeParams);
  const params = await Promise.all(
    expr.signature.parameters.map(async (param) => {
      const paramProperty = param.paramProperty;
      const access = paramProperty?.access ? `${paramProperty.access} ` : "";
      const readonlyPrefix = paramProperty?.readonly ? "readonly " : "";
      const annotation = param.typeAnnotation ? `: ${await emitTypeNode(param.typeAnnotation)}` : "";
      const defaultValue = param.defaultValue ? ` = ${await emitExpression(param.defaultValue)}` : "";
      return `${access}${readonlyPrefix}${param.name.name}${annotation}${defaultValue}`;
    })
  );
  const returnAnnotation = expr.signature.returnType ? `: ${await emitTypeNode(expr.signature.returnType)}` : "";
  return { typeParams, params, returnAnnotation };
}

async function renderFunctionBody(expr: FunctionExpr): Promise<string> {
  const bodyStatements = expr.body.slice();
  const bodyBlock = new BlockStmt({ statements: bodyStatements, span: expr.span });
  const body = await emitStatementBody(bodyBlock);
  const lines = ["{"];
  for (const line of body.lines) {
    lines.push(line);
  }
  lines.push("}");
  return lines.join("\n");
}

async function emitMethodDefinition(expr: FunctionExpr): Promise<string> {
  if (!expr.methodName) {
    throw reportError("T2:0207");
  }
  const isConstructor = expr.methodName === "constructor";
  if (expr.callableKind === "getter" && expr.signature.parameters.length !== 0) {
    throw reportError("T2:0180");
  }
  if (expr.callableKind === "setter" && expr.signature.parameters.length !== 1) {
    throw reportError("T2:0239");
  }
  if (isConstructor && (expr.async || expr.generator)) {
    throw reportError("T2:0142");
  }
  if (isConstructor && expr.abstract) {
    throw reportError("T2:0141");
  }
  const { typeParams, params, returnAnnotation } = await emitFunctionSignature(expr);
  const prefix = expr.async ? "async " : "";
  const generator = expr.generator ? "*" : "";
  const key = formatClassMemberKey(expr.methodName);
  const accessorPrefix = expr.callableKind === "getter" ? "get " : expr.callableKind === "setter" ? "set " : "";
  const abstractPrefix = expr.abstract ? "abstract " : "";
  if (isConstructor) {
    if (expr.overload) {
      return `constructor(${params.join(", ")});`;
    }
    const bodyText = await renderFunctionBody(expr);
    return `constructor(${params.join(", ")}) ${bodyText}`;
  }
  if (expr.abstract || expr.overload) {
    return `${abstractPrefix}${prefix}${accessorPrefix}${generator}${key}${typeParams}(${params.join(", ")})${returnAnnotation};`;
  }
  const bodyText = await renderFunctionBody(expr);
  return `${prefix}${accessorPrefix}${generator}${key}${typeParams}(${params.join(", ")})${returnAnnotation} ${bodyText}`;
}

async function emitClassExpression(expr: ClassExpr): Promise<string> {
  const name = expr.name ? ` ${expr.name.name}` : "";
  const typeParams = await emitTypeParams(expr.typeParams);
  const abstractPrefix = expr.abstract ? "abstract " : "";
  const extendsClause = expr.extends ? ` extends ${await emitExpression(expr.extends)}` : "";
  const implementsClause = expr.implements && expr.implements.length > 0
    ? ` implements ${await Promise.all(expr.implements.map(emitExpression)).then((items) => items.join(", "))}`
    : "";
  const decoratorLines: string[] = [];
  if (expr.decorators) {
    for (const dec of expr.decorators) {
      const decText = await emitExpression(dec);
      decoratorLines.push(`@${decText}`);
    }
  }
  const lines: string[] = [...decoratorLines, `${abstractPrefix}class${name}${typeParams}${extendsClause}${implementsClause} {`];
  for (const stmt of expr.body.statements) {
    if (stmt instanceof StaticBlockStmt) {
      const emitted = await emitStatement(stmt);
      for (const line of emitted.lines) {
        lines.push(`  ${line}`);
      }
      continue;
    }
    if (stmt instanceof FunctionExpr && (stmt.callableKind === "method" || stmt.callableKind === "getter" || stmt.callableKind === "setter")) {
      const methodText = await emitMethodDefinition(stmt);
      lines.push(`  ${methodText}`);
      continue;
    }
    if (stmt instanceof IndexSignature) {
      const indexText = await emitIndexSignature(stmt);
      lines.push(`  ${indexText};`);
      continue;
    }
    const classField = await tryEmitClassField(stmt);
    if (classField) {
      lines.push(`  ${classField}`);
      continue;
    }
    const emitted = await emitStatement(stmt);
    for (const line of emitted.lines) {
      lines.push(`  ${line}`);
    }
  }
  lines.push("}");
  return lines.join("\n");
}

const IDENTIFIER_REGEX = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function isIdentifierName(name: string): boolean {
  return IDENTIFIER_REGEX.test(name);
}

function formatObjectKey(key: string): string {
  return isIdentifierName(key) ? key : JSON.stringify(key);
}

interface ClassFieldDescriptor {
  access?: "public" | "protected" | "private";
  isStatic: boolean;
  isReadonly: boolean;
  name: string;
  initializer?: Expression;
}

async function tryEmitClassField(stmt: Statement): Promise<string | undefined> {
  if (!(stmt instanceof ExprStmt)) {
    return undefined;
  }
  const expr = stmt.expr;
  if (!(expr instanceof CallExpr)) {
    return undefined;
  }
  if (!(expr.callee instanceof Identifier) || expr.callee.name !== "field") {
    return undefined;
  }
  const descriptor = extractClassFieldDescriptor(expr);
  if (!descriptor) {
    return undefined;
  }
  const initializerText = descriptor.initializer ? await emitExpression(descriptor.initializer) : undefined;
  const prefix = formatClassFieldModifiers(descriptor);
  const key = formatClassFieldKey(descriptor.name);
  const suffix = initializerText ? ` = ${initializerText}` : "";
  return `${prefix}${key}${suffix};`;
}

function extractClassFieldDescriptor(expr: CallExpr): ClassFieldDescriptor | undefined {
  const descriptor: ClassFieldDescriptor = { isStatic: false, isReadonly: false, name: "" };
  let idx = 0;
  while (idx < expr.args.length) {
    const arg = expr.args[idx];
    if (arg instanceof Identifier) {
      const modifier = arg.name;
      if (modifier === "public" || modifier === "protected" || modifier === "private") {
        if (!descriptor.access) {
          descriptor.access = modifier as ClassFieldDescriptor["access"];
        }
        idx++;
        continue;
      }
      if (modifier === "static") {
        descriptor.isStatic = true;
        idx++;
        continue;
      }
      if (modifier === "readonly") {
        descriptor.isReadonly = true;
        idx++;
        continue;
      }
    }
    break;
  }

  if (idx >= expr.args.length) {
    return undefined;
  }
  const nameArg = expr.args[idx];
  if (!(nameArg instanceof Literal) || typeof nameArg.value !== "string") {
    return undefined;
  }
  descriptor.name = nameArg.value;
  idx++;

  if (idx < expr.args.length) {
    descriptor.initializer = expr.args[idx];
  }
  return descriptor;
}

function formatClassFieldModifiers(descriptor: ClassFieldDescriptor): string {
  const parts: string[] = [];
  if (descriptor.access) {
    parts.push(descriptor.access);
  }
  if (descriptor.isStatic) {
    parts.push("static");
  }
  if (descriptor.isReadonly) {
    parts.push("readonly");
  }
  return parts.length > 0 ? `${parts.join(" ")} ` : "";
}

function formatClassFieldKey(key: string): string {
  return formatClassMemberKey(key);
}

const PRIVATE_FIELD_REGEX = /^#[A-Za-z_$][A-Za-z0-9_$]*$/;

function isPrivateFieldName(name: string): boolean {
  return PRIVATE_FIELD_REGEX.test(name);
}

function formatClassMemberKey(key: string): string {
  if (isPrivateFieldName(key)) {
    return key;
  }
  if (isIdentifierName(key)) {
    return key;
  }
  return `[${JSON.stringify(key)}]`;
}

async function emitTypeField(field: TypeField): Promise<string> {
  const valueText = await emitTypeNode(field.fieldType);
  const readonlyPrefix = field.readonlyFlag ? "readonly " : "";
  const optionalSuffix = field.optional ? "?" : "";
  return `${readonlyPrefix}${formatObjectKey(field.key)}${optionalSuffix}: ${valueText}`;
}

async function emitEnum(stmt: EnumStmt): Promise<EmittedStatement> {
  const members = await Promise.all(stmt.members.map(emitEnumMember));
  return {
    lines: [`enum ${stmt.name.name} {`, ...members.map((line) => `  ${line}`), `}`],
    mappings: [mappingFromSpan(stmt.span, 0)],
  };
}

async function emitEnumMember(member: EnumMember): Promise<string> {
  if (member.value) {
    const valueText = await emitExpression(member.value);
    return `${formatObjectKey(member.name)} = ${valueText},`;
  }
  return `${formatObjectKey(member.name)},`;
}

async function emitNamespace(stmt: NamespaceStmt): Promise<EmittedStatement> {
  const bodyLines: string[] = [];
  for (const inner of stmt.body) {
    const emitted = await emitStatement(inner);
    for (const line of emitted.lines) {
      bodyLines.push(`  ${line}`);
    }
  }
  return {
    lines: [`namespace ${stmt.name.name} {`, ...bodyLines, `}`],
    mappings: [mappingFromSpan(stmt.span, 0)],
  };
}

function formatNamedImportEntry(entry: NamedImport): string {
  const localName = entry.local.name;
  if (entry.imported === localName) {
    return localName;
  }
  return `${entry.imported} as ${localName}`;
}

function formatNamedExportEntry(entry: NamedExport): string {
  const localName = entry.local?.name ?? entry.exported;
  const exportedName = entry.exported ?? localName;
  if (localName === exportedName) {
    return localName;
  }
  return `${localName} as ${exportedName}`;
}

async function clauseFromStatement(stmt: Statement): Promise<string> {
  const emitted = await emitStatement(stmt);
  const text = emitted.lines.map((line) => line.trim()).filter(Boolean).join(" ");
  return stripTrailingSemicolon(text);
}

function stripTrailingSemicolon(text: string): string {
  if (!text) {
    return "";
  }
  if (text.endsWith(";")) {
    return text.slice(0, -1);
  }
  return text;
}

async function emitBindingClause(binding: Binding): Promise<string> {
  const targetText = await emitBindingTarget(binding.target);
  if (binding.init) {
    const initText = await emitExpression(binding.init);
    return `${targetText} = ${initText}`;
  }
  return targetText;
}

async function emitBindingTarget(target: BindingTarget): Promise<string> {
  if (target instanceof Identifier) {
    return target.name;
  }
  if (target instanceof ArrayPattern) {
    const parts = await Promise.all(target.elements.map(emitBindingTarget));
    if (target.rest) {
      const restText = await emitBindingTarget(target.rest);
      parts.push(restText);
    }
    return `[${parts.join(", ")}]`;
  }
  if (target instanceof ObjectPattern) {
    const fields = await Promise.all(
      target.properties.map(async (property) => {
        if (property.target instanceof DefaultPattern && property.target.target instanceof Identifier) {
          const defaultText = await emitExpression(property.target.defaultValue);
          if (property.target.target.name === property.key) {
            return `${property.key} = ${defaultText}`;
          }
        }
        const valueText = await emitBindingTarget(property.target);
        return valueText === property.key ? property.key : `${property.key}: ${valueText}`;
      })
    );
    if (target.rest) {
      const restText = await emitBindingTarget(target.rest);
      fields.push(restText);
    }
    if (fields.length === 0) {
      return "{}";
    }
    return `{ ${fields.join(", ")} }`;
  }
  if (target instanceof RestPattern) {
    const inner = await emitBindingTarget(target.target);
    return `...${inner}`;
  }
  if (target instanceof DefaultPattern) {
    const inner = await emitBindingTarget(target.target);
    const defaultValue = await emitExpression(target.defaultValue);
    return `${inner} = ${defaultValue}`;
  }
  throw reportError("T2:0302");
}

async function emitTryCatchStatement(expr: TryCatchExpr): Promise<EmittedStatement> {
  const lines: string[] = ["try {"];
  const body = await emitStatementBody(expr.body);
  for (const line of body.lines) {
    lines.push(`  ${line}`);
  }
  lines.push("}");
  if (expr.catchClause) {
    const binding = expr.catchClause.binding ? await emitBindingTarget(expr.catchClause.binding.target) : undefined;
    const header = binding ? `catch (${binding}) {` : "catch {";
    lines.push(header);
    for (const stmt of expr.catchClause.body) {
      const emitted = await emitStatement(stmt);
      for (const line of emitted.lines) {
        lines.push(`  ${line}`);
      }
    }
    lines.push("}");
  }
  if (expr.finallyClause) {
    lines.push("finally {");
    for (const stmt of expr.finallyClause.body) {
      const emitted = await emitStatement(stmt);
      for (const line of emitted.lines) {
        lines.push(`  ${line}`);
      }
    }
    lines.push("}");
  }
  return { lines, mappings: [mappingFromSpan(expr.span, 0)] };
}

async function emitTypeAlias(stmt: TypeAliasStmt): Promise<EmittedStatement> {
  const typeParams = await emitTypeParams(stmt.typeParams);
  const text = await emitTypeNode(stmt.typeValue);
  return {
    lines: [`type ${stmt.name.name}${typeParams} = ${text};`],
    mappings: [mappingFromSpan(stmt.span, 0)],
  };
}

async function emitInterface(stmt: InterfaceStmt): Promise<EmittedStatement> {
  const fields = await Promise.all(stmt.body.fields.map(emitTypeField));
  const indexSignatures = stmt.body.indexSignatures
    ? await Promise.all(stmt.body.indexSignatures.map(emitIndexSignature))
    : [];
  const lines: string[] = [`interface ${stmt.name.name} {`];
  for (const field of fields) {
    lines.push(`  ${field};`);
  }
  for (const indexSig of indexSignatures) {
    lines.push(`  ${indexSig};`);
  }
  return {
    lines: [...lines, `}`],
    mappings: [mappingFromSpan(stmt.span, 0)],
  };
}

async function emitIndexSignature(node: IndexSignature): Promise<string> {
  const keyType = await emitTypeNode(node.keyType);
  const valueType = await emitTypeNode(node.valueType);
  const readonlyPrefix = node.readonlyFlag ? "readonly " : "";
  return `${readonlyPrefix}[${node.key.name}: ${keyType}]: ${valueType}`;
}

async function emitTypeParams(params?: TypeParam[]): Promise<string> {
  if (!params || params.length === 0) {
    return "";
  }
  const entries = await Promise.all(params.map(emitTypeParam));
  return `<${entries.join(", ")}>`;
}

async function emitTypeParam(param: TypeParam): Promise<string> {
  const parts: string[] = [];
  if (param.const) {
    parts.push("const");
  }
  if (param.infer) {
    parts.push("infer");
  }
  parts.push(param.name.name);
  if (param.constraint) {
    const constraint = await emitTypeNode(param.constraint);
    parts.push(`extends ${constraint}`);
  }
  if (param.defaultType) {
    const defaultText = await emitTypeNode(param.defaultType);
    parts.push(`= ${defaultText}`);
  }
  return parts.join(" ");
}

async function emitTypeNode(node: TypeNode): Promise<string> {
  if (node instanceof TypePrimitive) {
    switch (node.kind) {
      case "type-string":
        return "string";
      case "type-number":
        return "number";
      case "type-boolean":
        return "boolean";
      case "type-null":
        return "null";
      case "type-undefined":
        return "undefined";
      case "type-void":
        return "void";
      case "type-any":
        return "any";
      case "type-unknown":
        return "unknown";
      case "type-never":
        return "never";
      case "type-object":
        return "object";
      case "type-symbol":
        return "symbol";
      case "type-bigint":
        return "bigint";
    }
  }
  if (node instanceof TypeVar) {
    return node.name.name;
  }
  if (node instanceof TypeTuple) {
    const entries = await Promise.all(node.types.map(emitTypeNode));
    return `[${entries.join(", ")}]`;
  }
  if (node instanceof TypeArray) {
    const element = await emitTypeNode(node.element);
    return `${element}[]`;
  }
  if (node instanceof TypeNullable) {
    const inner = await emitTypeNode(node.inner);
    return `${inner} | null | undefined`;
  }
  if (node instanceof TypeKeyof) {
    const target = await emitTypeNode(node.target);
    return `keyof ${target}`;
  }
  if (node instanceof TypeTypeof) {
    const expr = await emitExpression(node.expr);
    return `typeof ${expr}`;
  }
  if (node instanceof TypeIndexed) {
    const objectText = await emitTypeNode(node.object);
    const indexText = await emitTypeNode(node.index);
    return `${objectText}[${indexText}]`;
  }
  if (node instanceof TypeConditional) {
    const check = await emitTypeNode(node.check);
    const extendsText = await emitTypeNode(node.extends);
    const trueText = await emitTypeNode(node.trueType);
    const falseText = await emitTypeNode(node.falseType);
    return `${check} extends ${extendsText} ? ${trueText} : ${falseText}`;
  }
  if (node instanceof TypeInfer) {
    return `infer ${node.name.name}`;
  }
  if (node instanceof TypeThis) {
    return "this";
  }
  if (node instanceof TypeRef) {
    const args = node.typeArgs ? await Promise.all(node.typeArgs.map(emitTypeNode)) : [];
    const suffix = args.length > 0 ? `<${args.join(", ")}>` : "";
    return `${node.identifier.name}${suffix}`;
  }
  if (node instanceof TypeFunction) {
    const typeParamText = await emitTypeParams(node.typeParams);
    const params = await Promise.all(node.params.map(emitTypeNode));
    const returns = await emitTypeNode(node.returns);
    return `${typeParamText}(${params.join(", ")}) => ${returns}`;
  }
  if (node instanceof TypeObject) {
    const entries = await Promise.all(node.fields.map(emitTypeField));
    return `{ ${entries.join("; ")} }`;
  }
  if (node instanceof TypeUnion) {
    const entries = await Promise.all(node.types.map(emitTypeNode));
    return entries.join(" | ");
  }
  if (node instanceof TypeIntersection) {
    const entries = await Promise.all(node.types.map(emitTypeNode));
    return entries.join(" & ");
  }
  if (node instanceof TypeLiteral) {
    const entries = await Promise.all(node.value.map((literal) => formatLiteral(literal.value)));
    return entries.join(" | ");
  }
  if (node instanceof TypeTemplateLiteral) {
    const parts: string[] = [];
    for (const part of node.parts) {
      if (typeof part === "string") {
        parts.push(escapeTemplateText(part));
        continue;
      }
      const typeText = await emitTypeNode(part);
      parts.push(`\${${typeText}}`);
    }
    return `\`${parts.join("")}\``;
  }
  if (node instanceof TypeMapped) {
    return emitTypeMapped(node);
  }
  if (node instanceof TypeApp) {
    const target = isTypeNodeValue(node.expr) ? await emitTypeNode(node.expr) : await emitExpression(node.expr);
    const typeArgs = await Promise.all(node.typeArgs.map(emitTypeNode));
    return `${target}<${typeArgs.join(", ")}>`;
  }
  throw reportError("T2:0309");
}

async function emitTypeMapped(node: TypeMapped): Promise<string> {
  const readonlyPrefix = node.readonlyModifier ? `${node.readonlyModifier === "readonly" ? "readonly " : "-readonly "}` : "";
  const optionalSuffix = node.optionalModifier ? `${node.optionalModifier === "optional" ? "?" : "-?"}` : "";
  const nameText = node.nameRemap ? ` as ${await emitTypeNode(node.nameRemap)}` : "";
  const inTypeNode = node.via ?? node.typeParam.constraint;
  const inTypeText = inTypeNode ? await emitTypeNode(inTypeNode) : "any";
  const valueText = await emitTypeNode(node.valueType);
  return `{ ${readonlyPrefix}[${node.typeParam.name.name} in ${inTypeText}${nameText}]${optionalSuffix}: ${valueText} }`;
}

function isTypeNodeValue(value: unknown): value is TypeNode {
  return (
    value instanceof TypePrimitive ||
    value instanceof TypeVar ||
    value instanceof TypeTuple ||
    value instanceof TypeArray ||
    value instanceof TypeNullable ||
    value instanceof TypeKeyof ||
    value instanceof TypeTypeof ||
    value instanceof TypeIndexed ||
    value instanceof TypeConditional ||
    value instanceof TypeInfer ||
    value instanceof TypeThis ||
    value instanceof TypeRef ||
    value instanceof TypeFunction ||
    value instanceof TypeObject ||
    value instanceof TypeUnion ||
    value instanceof TypeIntersection ||
    value instanceof TypeLiteral ||
    value instanceof TypeTemplateLiteral ||
    value instanceof TypeMapped ||
    value instanceof TypeApp
  );
}

function escapeTemplateText(value: string): string {
  return value.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
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

function programRequiresAsync(program: Program): boolean {
  return program.body.some((stmt) => containsAsyncStatement(stmt));
}

function containsAsyncStatement(stmt: Statement): boolean {
  if (stmt instanceof ForAwait) {
    return true;
  }
  if (stmt instanceof ExprStmt) {
    return containsAsyncExpression(stmt.expr);
  }
  if (stmt instanceof LetStarExpr) {
    if (stmt.bindings.some((binding) => binding.init && containsAsyncExpression(binding.init))) {
      return true;
    }
    return stmt.body.some((inner) => containsAsyncStatement(inner));
  }
  if (stmt instanceof AssignExpr) {
    return containsAsyncExpression(stmt.target) || containsAsyncExpression(stmt.value);
  }
  if (stmt instanceof ReturnExpr) {
    return stmt.value ? containsAsyncExpression(stmt.value) : false;
  }
  if (stmt instanceof IfStmt) {
    if (containsAsyncExpression(stmt.test)) {
      return true;
    }
    if (containsAsyncStatement(stmt.consequent)) {
      return true;
    }
    return stmt.alternate ? containsAsyncStatement(stmt.alternate) : false;
  }
  if (stmt instanceof WhileStmt) {
    return containsAsyncExpression(stmt.condition) || containsAsyncStatement(stmt.body);
  }
  if (stmt instanceof BlockStmt) {
    return stmt.statements.some((inner) => containsAsyncStatement(inner));
  }
  if (stmt instanceof ForClassic) {
    if (stmt.init && containsAsyncStatement(stmt.init)) {
      return true;
    }
    if (stmt.condition && containsAsyncExpression(stmt.condition)) {
      return true;
    }
    if (stmt.update && containsAsyncExpression(stmt.update)) {
      return true;
    }
    return containsAsyncStatement(stmt.body);
  }
  if (stmt instanceof ForOf) {
    if (stmt.binding.init && containsAsyncExpression(stmt.binding.init)) {
      return true;
    }
    if (containsAsyncExpression(stmt.iterable)) {
      return true;
    }
    return containsAsyncStatement(stmt.body);
  }
  if (stmt instanceof SwitchStmt) {
    if (containsAsyncExpression(stmt.discriminant)) {
      return true;
    }
    for (const c of stmt.cases) {
      if (c.test && containsAsyncExpression(c.test)) {
        return true;
      }
      if (c.consequent.some((inner) => containsAsyncStatement(inner))) {
        return true;
      }
    }
    return false;
  }
  if (stmt instanceof FunctionExpr || stmt instanceof ClassExpr) {
    return false;
  }
  return false;
}

function containsAsyncExpression(expr: Expression): boolean {
  if (expr instanceof AwaitExpr) {
    return true;
  }
  if (expr instanceof CallExpr) {
    if (containsAsyncExpression(expr.callee)) {
      return true;
    }
    return expr.args.some((arg) => containsAsyncExpression(arg));
  }
  if (expr instanceof ArrayExpr) {
    return expr.elements.some((element) => containsAsyncExpression(element));
  }
  if (expr instanceof SpreadExpr) {
    return containsAsyncExpression(expr.expr);
  }
  if (expr instanceof ObjectExpr) {
    return expr.fields.some((field) => {
      if (field.kind === "spread") {
        return containsAsyncExpression(field.expr);
      }
      if (field.kind === "computed") {
        return containsAsyncExpression(field.key) || containsAsyncExpression(field.value);
      }
      return containsAsyncExpression(field.value);
    });
  }
  if (expr instanceof NewExpr) {
    if (containsAsyncExpression(expr.callee)) {
      return true;
    }
    return expr.args.some((arg) => containsAsyncExpression(arg));
  }
  if (expr instanceof ThrowExpr) {
    return containsAsyncExpression(expr.argument);
  }
  if (expr instanceof PropExpr) {
    return containsAsyncExpression(expr.object);
  }
  if (expr instanceof IndexExpr) {
    return containsAsyncExpression(expr.object) || containsAsyncExpression(expr.index);
  }
  if (expr instanceof TernaryExpr) {
    return (
      containsAsyncExpression(expr.test) ||
      containsAsyncExpression(expr.consequent) ||
      containsAsyncExpression(expr.alternate)
    );
  }
  if (expr instanceof YieldExpr && expr.argument) {
    return containsAsyncExpression(expr.argument);
  }
  if (expr instanceof TypeAssertExpr) {
    return containsAsyncExpression(expr.expr);
  }
  if (expr instanceof TypeApp) {
    if (!isTypeNodeValue(expr.expr)) {
      if (containsAsyncExpression(expr.expr as Expression)) {
        return true;
      }
    }
    return false;
  }
  if (expr instanceof FunctionExpr || expr instanceof ClassExpr) {
    return false;
  }
  if (expr instanceof TryCatchExpr) {
    if (containsAsyncStatement(expr.body)) {
      return true;
    }
    if (expr.catchClause && expr.catchClause.body.some((inner) => containsAsyncStatement(inner))) {
      return true;
    }
    if (expr.finallyClause && expr.finallyClause.body.some((inner) => containsAsyncStatement(inner))) {
      return true;
    }
    return false;
  }
  return false;
}
 
const OPERATOR_SYMBOLS: Record<string, string> = {
  "!": "!",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "**": "**",
  "%": "%",
  ",": ",",
  "<<": "<<",
  ">>": ">>",
  ">>>": ">>>",
  "<": "<",
  ">": ">",
  "<=": "<=",
  ">=": ">=",
  "==": "==",
  "===": "===",
  "!=": "!=",
  "!==": "!==",
  "&": "&",
  "^": "^",
  "|": "|",
  "&&": "&&",
  "||": "||",
  "??": "??",
};

function formatOperatorExpression(operator: string, operands: string[]): string {
  if (operands.length === 0) {
    return "";
  }
  if (operands.length === 1) {
    if (operator === "-" || operator === "+" || operator === "!") {
      return `${operator}${operands[0]}`;
    }
    return operands[0];
  }
  return operands.slice(1).reduce((acc, current) => `(${acc} ${operator} ${current})`, operands[0]);
}

async function formatLiteral(value: unknown): Promise<string> {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean" || typeof value === "number") return `${value}`;
  return "undefined";
}
