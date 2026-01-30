import {
  Program,
  Statement,
  ExprStmt,
  Expression,
  Literal,
  Identifier,
  CallExpr,
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
  ArrayExpr,
  BlockStmt,
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
  TypeMapped,
  TypeNode,
  TypeObject,
  TypeParam,
  TypePrimitive,
  TypeRef,
  TypeUnion,
  InterfaceStmt,
  SpreadExpr,
  TernaryExpr,
  AwaitExpr,
  YieldExpr,
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
  const wrappedLines = [
    "void (async () => {",
    ...lines.map((line) => (line ? `  ${line}` : "")),
    "})();",
  ];
  const shiftedMappings = mappings.map((mapping) => ({
    ...mapping,
    generated: {
      line: mapping.generated.line + 1,
      column: mapping.generated.column,
    },
  }));
  const tsSource = wrappedLines.join("\n");
  return { tsSource, mappings: shiftedMappings };
}

async function emitStatement(stmt: Statement): Promise<EmittedStatement> {
  if (stmt instanceof ExprStmt) {
    if (stmt.expr instanceof TryCatchExpr) {
      return await emitTryCatchStatement(stmt.expr);
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
    const text = await emitFunctionExpression(stmt);
    return {
      lines: [`(${text});`],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof ClassExpr) {
    const text = await emitClassExpression(stmt);
    return {
      lines: [`(${text});`],
      mappings: [mappingFromSpan(stmt.span, 0)],
    };
  }
  if (stmt instanceof TypeAliasStmt) {
    return await emitTypeAlias(stmt);
  }
  if (stmt instanceof InterfaceStmt) {
    return await emitInterface(stmt);
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
    const callee = await emitExpression(expr.callee);
    const args = await Promise.all(expr.args.map(emitExpression));
    return `${callee}(${args.join(", ")})`;
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
  if (expr instanceof TypeApp) {
    // Safety check: The target of a TypeApp in an expression context must be an expression,
    // not a static type node like TypeRef or TypePrimitive.
    if (isTypeNodeValue(expr.expr)) {
      throw new Error(
        `Codegen Error: TypeApp in expression context has an invalid target: ${expr.expr.constructor.name}. Expected an expression.`
      );
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
        const valueText = await emitExpression(field.value);
        const keyText = formatObjectKey(field.key);
        return `${keyText}: ${valueText}`;
      })
    );
    return `{ ${entries.join(", ")} }`;
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

async function emitFunctionExpression(expr: FunctionExpr): Promise<string> {
  const prefix = expr.async ? "async " : "";
  const generator = expr.generator ? "*" : "";
  const typeParams = await emitTypeParams(expr.typeParams);
  const params = await Promise.all(
    expr.signature.parameters.map(async (param) => {
      const annotation = param.typeAnnotation ? `: ${await emitTypeNode(param.typeAnnotation)}` : "";
      return `${param.name.name}${annotation}`;
    })
  );
  const returnAnnotation = expr.signature.returnType ? `: ${await emitTypeNode(expr.signature.returnType)}` : "";
  const bodyBlock = new BlockStmt({ statements: expr.body, span: expr.span });
  const body = await emitStatementBody(bodyBlock);
  const bodyLines = ["{"];
  for (const line of body.lines) {
    bodyLines.push(`  ${line}`);
  }
  bodyLines.push("}");
  return `${prefix}function${generator}${typeParams}(${params.join(", ")})${returnAnnotation} ${bodyLines.join("\n")}`;
}

async function emitClassExpression(expr: ClassExpr): Promise<string> {
  const name = expr.name ? ` ${expr.name.name}` : "";
  const extendsClause = expr.extends ? ` extends ${await emitExpression(expr.extends)}` : "";
  const implementsClause = expr.implements && expr.implements.length > 0
    ? ` implements ${await Promise.all(expr.implements.map(emitExpression)).then((items) => items.join(", "))}`
    : "";
  const lines: string[] = [`class${name}${extendsClause}${implementsClause} {`];
  for (const stmt of expr.body.statements) {
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
  throw new Error("Unsupported binding target in codegen");
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
  const fields = await Promise.all(
    stmt.body.fields.map(async (field) => {
      const valueText = await emitTypeNode(field.fieldType);
      return `${formatObjectKey(field.key)}: ${valueText};`;
    })
  );
  return {
    lines: [`interface ${stmt.name.name} {`, ...fields.map((line) => `  ${line}`), `}`],
    mappings: [mappingFromSpan(stmt.span, 0)],
  };
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
    }
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
    const entries = await Promise.all(
      node.fields.map(async (field) => {
        const valueText = await emitTypeNode(field.fieldType);
        return `${formatObjectKey(field.key)}: ${valueText}`;
      })
    );
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
  if (node instanceof TypeMapped) {
    return emitTypeMapped(node);
  }
  if (node instanceof TypeApp) {
    const target = isTypeNodeValue(node.expr) ? await emitTypeNode(node.expr) : await emitExpression(node.expr);
    const typeArgs = await Promise.all(node.typeArgs.map(emitTypeNode));
    return `${target}<${typeArgs.join(", ")}>`;
  }
  throw new Error("Unsupported type node");
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
    value instanceof TypeRef ||
    value instanceof TypeFunction ||
    value instanceof TypeObject ||
    value instanceof TypeUnion ||
    value instanceof TypeIntersection ||
    value instanceof TypeLiteral ||
    value instanceof TypeMapped ||
    value instanceof TypeApp
  );
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
 
const OPERATOR_SYMBOLS: Record<string, string> = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "<": "<",
  ">": ">",
  "<=": "<=",
  ">=": ">=",
  "==": "==",
  "===": "===",
  "!=": "!=",
  "!==": "!==",
  "&&": "&&",
  "||": "||",
  "??": "??",
};

function formatOperatorExpression(operator: string, operands: string[]): string {
  if (operands.length === 0) {
    return "";
  }
  if (operands.length === 1) {
    if (operator === "-" || operator === "+") {
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
