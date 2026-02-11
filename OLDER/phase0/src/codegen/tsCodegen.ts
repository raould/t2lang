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
  TypeAppExpr,
  ImportStmt,
  ExportStmt,
  ThrowExpr,
  TryCatchExpr,
  BlockStmt,
  TypeAliasStmt,
  SourceLocation,
  TypeParam,
  InterfaceExpr
} from "../ast/nodes.js";
import { TypeNode } from "../ast/nodes.js";
import { TypeTable, Type } from "../typecheck/typeChecker.js";

import { createRequire } from "module";

export enum PrettyOption {
  ugly = "ugly",
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
        // Fall back to unformatted output if Prettier is not available.
        code = result.tsSource;
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

    case "interface":
      return genInterface(expr as InterfaceExpr);

    case "type-assert":
      return genTypeAssert(expr as TypeAssertExpr, options);

    case "type-app":
      return genTypeApp(expr as TypeAppExpr, options);

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
  "??",
  "&", "|", "^",
  "<<", ">>", ">>>",
  "in", "instanceof"
  , "**"
]);

const UNARY_OPERATORS: Set<string> = new Set([
  "!", "-", "~", "typeof", "!!", "++", "--"
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

    // Ternary special form: (ternary cond then else)
    if ((name === 'ternary' || name === '?:') && node.args.length === 3) {
      const cond = genExpr(node.args[0], options);
      const th = genExpr(node.args[1], options);
      const el = genExpr(node.args[2], options);
      return `(${cond} ? ${th} : ${el})`;
    }

    // Nullish-assignment special form: (??= target value) -> `target ??= value`
    if (name === '??=' && node.args.length === 2) {
      const target = genExpr(node.args[0], options);
      const value = genExpr(node.args[1], options);
      return `(${target} ??= ${value})`;
    }

    // Compound-assignment operators, emit as native `target <op> value`
    const ASSIGNMENT_OPERATORS: Set<string> = new Set([
      "+=", "-=", "*=", "/=", "%=", "**=",
      "<<=", ">>=", ">>>=",
      "&=", "^=", "|=",
      "&&=", "||=",
      // Note: '??=' handled above
    ]);

    if (ASSIGNMENT_OPERATORS.has(name) && node.args.length === 2) {
      const target = genExpr(node.args[0], options);
      const value = genExpr(node.args[1], options);
      return `(${target} ${name} ${value})`;
    }

    // Binary operator with 2 or more args: emit left-associative chain
    if (BINARY_OPERATORS.has(op) && node.args.length >= 2) {
      const parts = node.args.map(a => genExpr(a, options));
      const joined = parts.join(` ${op} `);
      return `(${joined})`;
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
        return `typeof (${operand})`;
      }
      // Parenthesize the operand and wrap the whole expression so unary
      // operators appear as grouped expressions (e.g. `(! (true))`). This
      // matches test expectations for operator formatting.
      return `(${op}(${operand}))`;
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
    return `((__obj) => { if (typeof __obj[${JSON.stringify(propName)}] !== "function") { throw new Error(\`Property ${propName} is not a function\`); } return __obj[${JSON.stringify(propName)}](${args}); })(${objectExpr})`;
  }

  // Handle a common flattened pattern produced by Phase1 sugar where an
  // inner `(call (obj.method))` form was inlined as two separate args:
  // `call` followed by a `prop` node. In that case, emit a proper
  // zero-arg invocation of the property: `obj.method()`.
  let calleeStr = genExpr(node.callee, options);
  const reconstructedArgs: string[] = [];
  if (node.args.length >= 2
      && node.args[0].kind === 'identifier'
      && (node.args[0] as Identifier).name === 'call'
      && node.args[1].kind === 'prop') {
    // Build a `prop()` invocation string for the second argument
    const methodStr = genExpr(node.args[1], options);
    reconstructedArgs.push(`${methodStr}()`);
    // Append any remaining args after the flattened pair
    for (let i = 2; i < node.args.length; i++) {
      reconstructedArgs.push(genExpr(node.args[i], options));
    }
  } else {
    for (const arg of node.args) reconstructedArgs.push(genExpr(arg, options));
  }

  return `${calleeStr}(${reconstructedArgs.join(', ')})`;
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

function genTypeParams(typeparams: TypeParam[] | undefined): string {
  if (!typeparams || typeparams.length === 0) return "";
  const parts = typeparams.map(tp => {
    let s = tp.name.name;
    if (tp.constraint) {
      s += ` extends ${genType(tp.constraint)}`;
    }
    if (tp.defaultType) {
      s += ` = ${genType(tp.defaultType)}`;
    }
    return s;
  });
  return `<${parts.join(", ")}>`;
}

function genFunction(node: FunctionExpr, options: TsCodegenOptions): string {
  const typeParamsStr = genTypeParams(node.typeparams);
  const params = node.params
    .map((p) => {
      if (options.emitTypes) {
        // Prefer an explicit inline param type annotation parsed into the AST
        if ((p as any).typeAnnotation) {
          return `${p.name}: ${genType((p as any).typeAnnotation)}`;
        }
        if (options.typeTable && p.typeId !== null && p.typeId !== undefined) {
          const t = options.typeTable.get(p.typeId);
          if (t.kind !== "unknown") {
            return `${p.name}: ${typeToString(t)}`;
          }
        }
        // emit explicit `any` when no type info is available
        return `${p.name}: any`;
      }
      return p.name;
    })
    .join(", ");

  let returnTypeAnn = "";
  if (options.emitTypes) {
    // Prefer explicit inline return type annotation if present
    if (node.returnType) {
      returnTypeAnn = `: ${genType(node.returnType)}`;
    } else if (options.typeTable && node.typeId !== null && node.typeId !== undefined) {
      const t = options.typeTable.get(node.typeId);
      if (t.kind === "function") {
        returnTypeAnn = `: ${typeToString(t.returns)}`;
      }
    }
  }

  let result = "";
  if (node.name === null) {
    // Lambda / anonymous function
    if (typeParamsStr) {
      result += `${typeParamsStr}(${params})${returnTypeAnn} => {\n`;
    } else {
      result += `(${params})${returnTypeAnn} => {\n`;
    }
  } else {
    // Named function
    result += `function ${node.name.name}${typeParamsStr}(${params})${returnTypeAnn} {\n`;
  }

  // Emit body so that the last expression is returned implicitly when
  // it is not an explicit (return ...) form. This preserves the
  // expression-oriented semantics of Phase0.
  if (node.body.length === 0) {
    // empty body -> nothing
  } else {
    for (let i = 0; i < node.body.length; i++) {
      const e = node.body[i];
      const isLast = i === node.body.length - 1;

      if (isLast) {
        if (e.kind === "return") {
          // emit existing return
          result += genReturn(e as ReturnExpr, options);
          result += ";\n";
        } else {
          // Emit an implicit `return` only when there is an explicit
          // inline return type annotation, or when type information is
          // available indicating this is a function with a known return
          // type. Otherwise emit the last expression as a plain
          // expression statement (no `return`).
          let shouldImplicitReturn = false;
          if (node.returnType) {
            shouldImplicitReturn = true;
          } else if (options.emitTypes && options.typeTable && node.typeId !== null && node.typeId !== undefined) {
            const fnType = options.typeTable.get(node.typeId);
            if (fnType && fnType.kind === "function") {
              shouldImplicitReturn = true;
            }
          }

          if (shouldImplicitReturn) {
            result += `return ${genExpr(e, options)};\n`;
          } else {
            result += `${genExpr(e, options)};\n`;
          }
        }
      } else {
        if (e.kind === "block") {
          // unwrap block for non-final positions
          for (const inner of (e as BlockStmt).body) {
            result += genExpr(inner, options);
            result += ";\n";
          }
        } else {
          result += genExpr(e, options);
          result += ";\n";
        }
      }
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
  const typeParamsStr = genTypeParams(node.typeparams);
  const extendsClause = node.superclass !== null ? ` extends ${node.superclass.name}` : "";
  let classType: Type | null = null;
  if (options.emitTypes && options.typeTable && node.typeId !== null && node.typeId !== undefined) {
    classType = options.typeTable.get(node.typeId);
  }

  let result = `class ${node.name.name}${typeParamsStr}${extendsClause} {\n`;

  // Fields
  for (const field of node.fields) {
    let typeAnn = "";
    if (classType && classType.kind === "object") {
      const match = classType.fields.find((f) => f.name === field.name);
      if (match && match.type.kind !== "unknown") {
        typeAnn = `: ${typeToString(match.type)}`;
      }
    }
    // Prefer an explicit type annotation if the field initializer was
    // emitted as a Phase1 `(typed TYPE INIT...)` wrapper. Detect that
    // pattern and extract the TYPE and INIT so we can emit a proper
    // TypeScript type annotation and initializer instead of a runtime
    // `typed(...)` call.
    let initializerCode: string | null | undefined = undefined;
    if (field.initializer !== null) {
      // detect `(typed TYPE INIT...)` pattern
      if (field.initializer.kind === "call") {
        const call = field.initializer as CallExpr;
        if (call.callee.kind === "identifier" && (call.callee as Identifier).name === "typed" && call.args.length >= 1) {
          const typeArg = call.args[0];
          // handle simple identifier type refs like `string`, `number`
          if (typeArg.kind === "identifier") {
            typeAnn = `: ${(typeArg as Identifier).name}`;
            // If a second arg (init) is present, use it as the initializer;
            // otherwise treat `(typed TYPE)` as a type-only annotation with
            // no runtime initializer.
            if (call.args.length >= 2) {
              initializerCode = genExpr(call.args[1], options);
            } else {
              initializerCode = null;
            }
          } else if (typeArg.kind === "literal") {
            // literal type (rare) — stringify
            const lit = typeArg as LiteralExpr;
            if (typeof lit.value === "string") {
              typeAnn = `: ${JSON.stringify(lit.value)}`;
              if (call.args.length >= 2) {
                initializerCode = genExpr(call.args[1], options);
              } else {
                initializerCode = null;
              }
            }
          }
        }
      }
      if (initializerCode === undefined) {
        initializerCode = genExpr(field.initializer, options);
      }
    }

    // Emit data modifiers if present: access, static, readonly
    const mods: string[] = [];
    if ((field as any).access) mods.push((field as any).access);
    if ((field as any).isStatic) mods.push("static");
    if ((field as any).isReadonly) mods.push("readonly");
    const modStr = mods.length > 0 ? mods.join(" ") + " " : "";
    result += `  ${modStr}${field.name}${typeAnn}`;
    if (initializerCode !== null) {
      result += " = ";
      result += initializerCode;
    }
    result += ";\n";
  }

  // Methods
  for (const method of node.methods) {
    const params = method.params
      .map((p) => {
        if (options.emitTypes) {
          if ((p as any).typeAnnotation) {
            return `${p.name}: ${genType((p as any).typeAnnotation)}`;
          }
          if (options.typeTable && p.typeId !== null && p.typeId !== undefined) {
            const t = options.typeTable.get(p.typeId);
            if (t.kind !== "unknown") {
              return `${p.name}: ${typeToString(t)}`;
            }
          }
          return `${p.name}: any`;
        }
        return p.name;
      })
      .join(", ");

    // Optional return type annotation for methods. Prefer explicit
    // annotations; otherwise, when `emitTypes` is enabled and the
    // typeChecker produced a function type id for this method, emit
    // an inferred return annotation from the type table.
    let returnTypeAnn = "";
    if ((method as any).returnType) {
      if (method.name !== "constructor") {
        returnTypeAnn = `: ${genType((method as any).returnType)}`;
      }
    } else if (options.emitTypes && options.typeTable && (method as any).typeId !== undefined && (method as any).typeId !== null) {
      if (method.name !== "constructor") {
        const ft = options.typeTable.get((method as any).typeId);
        if (ft && ft.kind === "function" && ft.returns.kind !== "unknown") {
          returnTypeAnn = `: ${typeToString(ft.returns)}`;
        }
      }
    }
    // Omit return type annotation for constructors to keep emitted TS valid.
    result += `  ${method.name}(${params})${returnTypeAnn} {\n`;

    // Emit method body. Preserve explicit `return` forms. For a final
    // expression that is not an explicit `return`, emit an implicit
    // `return` so methods behave like expression-oriented bodies.
    if (!method.body || method.body.length === 0) {
      // empty body -> nothing
    } else {
      for (let i = 0; i < method.body.length; i++) {
        const e = method.body[i];
        const isLast = i === method.body.length - 1;
        result += "    ";
        if (isLast) {
          // Constructors should not implicitly return the final
          // expression. Emit the final expression as a plain
          // statement for constructors.
          if (method.name === "constructor") {
            if (e.kind === "block") {
              for (const inner of (e as BlockStmt).body) {
                result += genExpr(inner, options);
                result += ";\n";
              }
            } else {
              result += genExpr(e, options);
              result += ";\n";
            }
          } else {
              if (e.kind === "return") {
                result += genReturn(e as ReturnExpr, options);
                result += ";\n";
              } else {
                // Decide whether to emit an implicit `return` for the final
                // expression. Default is to implicitly return the final
                // expression unless an explicit return annotation indicates
                // `undefined`/`void`, or the inferred function return is
                // `undefined`.
                let shouldImplicitReturn = true;
                if ((method as any).returnType) {
                  const rt = (method as any).returnType as TypeNode;
                  if (rt.kind === "type-undefined") {
                    shouldImplicitReturn = false;
                  } else if (rt.kind === "type-ref") {
                    const nm = (rt as any).name as string;
                    if (nm === "undefined" || nm === "void") {
                      shouldImplicitReturn = false;
                    } else {
                      shouldImplicitReturn = true;
                    }
                  } else {
                    shouldImplicitReturn = true;
                  }
                } else if (options.typeTable && (method as any).typeId !== null && (method as any).typeId !== undefined) {
                  const fnType = options.typeTable.get((method as any).typeId);
                  if (fnType && fnType.kind === "function") {
                    shouldImplicitReturn = fnType.returns.kind !== "undefined";
                  }
                }

                if (shouldImplicitReturn) {
                  result += `return ${genExpr(e, options)};\n`;
                } else {
                  result += `${genExpr(e, options)};\n`;
                }
              }
          }
        } else {
          if (e.kind === "block") {
            for (const inner of (e as BlockStmt).body) {
              result += genExpr(inner, options);
              result += ";\n";
            }
          } else {
            result += genExpr(e, options);
            result += ";\n";
          }
        }
      }
    }

    result += "  }\n";
  }

  result += "}\n";
  return result;
}

function genInterface(node: InterfaceExpr): string {
  const typeParamsStr = genTypeParams(node.typeparams);
  let result = `interface ${node.name.name}${typeParamsStr} {\n`;

  // Methods
  for (const method of node.methods) {
    const params = method.params.map(p => genType(p)).join(", ");
    const returns = genType(method.returns);
    result += `  ${method.name}(${params}): ${returns};\n`;
  }

  result += "}\n";
  return result;
}

function genTypeAssert(node: TypeAssertExpr, options: TsCodegenOptions): string {
  const expr = genExpr(node.expr, options);
  return `(${expr} as ${genType(node.typeAnnotation)})`;
}

function genTypeApp(node: TypeAppExpr, options: TsCodegenOptions): string {
  const expr = genExpr(node.expr, options);
  const typeArgs = node.typeArgs.map(t => genType(t)).join(", ");
  return `${expr}<${typeArgs}>`;
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
    case "type-app":
      return `${genType(typeNode.expr)}<${typeNode.typeArgs.map(genType).join(", ")}>`;
    default:
      return "any";
  }
}

function genTypeAlias(node: TypeAliasStmt): string {
  const typeParamsStr = genTypeParams(node.typeparams);
  return `type ${node.name.name}${typeParamsStr} = ${genType(node.typeAnnotation)};`;
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
  // Allow let/const with empty body: emit only bindings when body is empty.
  if (!node.body) {
    node.body = [];
  }

  let result = "{\n";
  const keyword = node.isConst ? "const" : "let";

  for (const binding of node.bindings) {
    result += `${keyword} ${binding.name.name}`;
    // Compute a fallback type annotation when initializer is a `new` call
    // (e.g. `new Person(...)`) so we can emit `: Person` when no other
    // type information is available.
    let constructorTypeAnn: string | null = null;
    if (binding.init && binding.init.kind === 'new') {
      const initNew = binding.init as NewExpr;
      if (initNew.callee.kind === 'identifier') {
        constructorTypeAnn = (initNew.callee as Identifier).name;
      }
    }

    // Emit type annotations only when `emitTypes` is enabled.
    if (options.emitTypes) {
      // Prefer explicit inline type annotation parsed into the AST,
      // then prefer the typeTable entry. If neither exists, fall back to
      // constructorTypeAnn when available.
      if ((binding.name as any).typeAnnotation) {
        result += `: ${genType((binding.name as any).typeAnnotation)}`;
      } else if (options.typeTable && binding.name.typeId !== null && binding.name.typeId !== undefined) {
        const t = options.typeTable.get(binding.name.typeId);
        const tstr = typeToString(t);
        if (tstr !== "unknown") {
          result += `: ${tstr}`;
        } else if (constructorTypeAnn) {
          result += `: ${constructorTypeAnn}`;
        }
      } else if (constructorTypeAnn) {
        result += `: ${constructorTypeAnn}`;
      }
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
