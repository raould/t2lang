import {
  Program,
  Statement,
  Expr,
  LiteralExpr,
  Identifier,
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
  ThrowExpr,
  TypeNode,
  BlockStmt,
  TypeAliasStmt,
  TypeAppExpr
} from "../ast/nodes.js";
import { CompilerContext } from "../api.js";
import { CompilerError, isCompilerError } from "../errors/compilerError.js";

export type Type =
  | { kind: "number" }
  | { kind: "string" }
  | { kind: "boolean" }
  | { kind: "null" }
  | { kind: "undefined" }
  | { kind: "unknown" }
  | { kind: "literal"; value: string | number | boolean | null | "undefined" }
  | { kind: "array"; element: Type }
  | { kind: "object"; fields: { name: string; type: Type }[] }
  | { kind: "function"; params: Type[]; returns: Type }
  | { kind: "union"; types: Type[] }
  | { kind: "intersection"; types: Type[] };

export class TypeTable {
  private types: Type[] = [];

  add(t: Type): number {
    this.types.push(t);
    return this.types.length - 1;
  }

  get(id: number): Type {
    return this.types[id];
  }

  // Provide a JSON-friendly serialization for debugging
  toJSON(): Type[] {
    return this.types.slice();
  }
}

export interface TypeCheckResult {
  program: Program;
  typeTable: TypeTable;
  errors: CompilerError[];
}

export class TypeCheckerBase {
  protected typeTable = new TypeTable();
  private errors: CompilerError[] = [];
  private syntheticSymbolCounter: number = -1;

  private typeEnv: Array<Map<number, Type>> = [new Map()];
  private typeParamEnv: Array<Map<string, Type>> = [new Map()];
  private typeAliases = new Map<string, Type>();

  constructor(private readonly ctx: CompilerContext) { }

  checkProgram(program: Program): TypeCheckResult {
    for (const stmt of program.body) {
      try {
        this.checkStatement(stmt);
      } catch (err) {
        if (isCompilerError(err)) {
          this.errors.push(err);
        } else {
          throw err;
        }
      }
    }

    this.ctx.eventSink.emit({
      phase: "typeCheck",
      kind: "typeDump",
      data: { ast: program, typeTable: this.typeTable }
    });

    return { program, typeTable: this.typeTable, errors: this.errors };
  }

  private checkStatement(stmt: Statement): void {
    if (stmt.kind === "exprStmt") {
      this.checkExpr(stmt.expr);
    } else if (stmt.kind === "block") {
      for (const expr of stmt.body) {
        this.checkExpr(expr);
      }
    } else if (stmt.kind === "let*") {
      this.checkLetStar(stmt as LetStarExpr);
    } else if (stmt.kind === "type-alias") {
      this.checkTypeAlias(stmt as TypeAliasStmt);
    }
  }

  private checkExpr(expr: Expr): number | null {
    switch (expr.kind) {
      case "literal":
        return this.annotateLiteral(expr as LiteralExpr);
      case "identifier":
        return this.annotateIdentifier(expr as Identifier);
      case "call":
        return this.annotateCall(expr as CallExpr);
      case "let*":
        return this.checkLetStar(expr as LetStarExpr);
      case "if":
        return this.checkIf(expr as IfExpr);
      case "prop":
        return this.checkProp(expr as PropExpr);
      case "function":
        return this.checkFunction(expr as FunctionExpr);
      case "return":
        return this.checkReturn(expr as ReturnExpr);
      case "while":
        return this.checkWhile(expr as WhileExpr);
      case "array":
        return this.checkArray(expr as ArrayExpr);
      case "object":
        return this.checkObject(expr as ObjectExpr);
      case "assign":
        return this.checkAssign(expr as AssignExpr);
      case "for":
        return this.checkFor(expr as ForExpr);
      case "index":
        return this.checkIndex(expr as IndexExpr);
      case "new":
        return this.checkNew(expr as NewExpr);
      case "class":
        return this.checkClass(expr as ClassExpr);
      case "type-assert":
        return this.checkTypeAssert(expr as TypeAssertExpr);
      case "throw":
        return this.checkThrow(expr as ThrowExpr);
      case "type-app":
        return this.checkTypeApp(expr as TypeAppExpr);
      case "block":
        return this.checkBlock(expr as BlockStmt);
      default:
        return null;
    }
  }

  private checkBlock(node: BlockStmt): number | null {
    this.pushScope();
    let lastTypeId: number | null = null;
    for (const expr of node.body) {
      lastTypeId = this.checkExpr(expr);
    }
    const resultId = lastTypeId ?? this.typeTable.add({ kind: "undefined" });
    node.typeId = resultId;
    this.popScope();
    return resultId;
  }

  private annotateLiteral(node: LiteralExpr): number {
    let t: Type = { kind: "unknown" };

    if (typeof node.value === "number") t = { kind: "literal", value: node.value };
    else if (typeof node.value === "string") t = { kind: "literal", value: node.value };
    else if (typeof node.value === "boolean") t = { kind: "literal", value: node.value };
    else if (node.value === null) t = { kind: "literal", value: null };
    else if (node.value === "undefined") t = { kind: "literal", value: "undefined" };

    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private annotateIdentifier(node: Identifier): number {
    let t: Type = { kind: "unknown" };
    if (node.symbolId !== undefined) {
      const known = this.getTypeForSymbol(node.symbolId);
      if (known) {
        t = known;
      }
    }
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private annotateCall(node: CallExpr): number {
    const calleeTypeId = this.checkExpr(node.callee);
    const argTypeIds: Array<number | null> = [];
    // Evaluate argument types
    for (const a of node.args) {
      const atid = this.checkExpr(a);
      argTypeIds.push(atid ?? null);
    }
    const argTypes: Type[] = argTypeIds.map((id) => (id !== null && id !== undefined) ? this.typeTable.get(id) : { kind: "unknown" } as Type);
    let name: string | null = null;
    if (node.callee.kind === "identifier") {
      name = (node.callee as Identifier).name;
    }
    let t: Type = { kind: "unknown" };

    const isNumeric = (ty: Type) => ty.kind === "number" || (ty.kind === "literal" && typeof ty.value === "number") || ty.kind === "unknown";
    const isBoolean = (ty: Type) => ty.kind === "boolean" || (ty.kind === "literal" && typeof ty.value === "boolean") || ty.kind === "unknown";

    // Comparisons
      if (name !== null && ((name === '<' || name === '<=' || name === '>' || name === '>=') && node.args.length === 2)) {
        if (!isNumeric(argTypes[0]) || !isNumeric(argTypes[1])) {
          throw { message: `Comparison ${name} requires comparable operands`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'boolean' };
      }

      // Equality
      else if ((name === '==' || name === '===' || name === '!=' || name === '!==') && node.args.length === 2) {
        t = { kind: 'boolean' };
      }

      // Logical
      else if ((name === 'and' || name === 'or' || name === '&&' || name === '||') && node.args.length === 2) {
        if (!isBoolean(argTypes[0]) || !isBoolean(argTypes[1])) {
          throw { message: `Logical operator ${name} requires boolean operands`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'boolean' };
      }

      // Double-bang: coercion to boolean of any value
      else if (name === '!!' && node.args.length === 1) {
        t = { kind: 'boolean' };
      }

        // typeof operator returns a string
        else if (name === 'typeof' && node.args.length === 1) {
          t = { kind: 'string' };
        }

      // Prefix increment: (++ x) increments numeric l-values and yields number
      else if (name === '++' && node.args.length === 1) {
        // Ensure the argument is a valid assignment target (identifier, prop, index)
        const targetExpr = node.args[0];
        const targetType = this.getAssignmentTargetType(targetExpr);
        if (!targetType) {
          throw { message: `invalid assignment target for ++`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        const argType = argTypes[0];
        const isNumeric = (ty: Type) => ty.kind === 'number' || (ty.kind === 'literal' && typeof ty.value === 'number') || ty.kind === 'unknown';
        if (!isNumeric(argType)) {
          throw { message: `increment operator ++ requires numeric operand`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'number' };
      }

      // Prefix decrement: (-- x) decrements numeric l-values and yields number
      else if (name === '--' && node.args.length === 1) {
        // Ensure the argument is a valid assignment target (identifier, prop, index)
        const targetExpr = node.args[0];
        const targetType = this.getAssignmentTargetType(targetExpr);
        if (!targetType) {
          throw { message: `invalid assignment target for --`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        const argType = argTypes[0];
        const isNumeric = (ty: Type) => ty.kind === 'number' || (ty.kind === 'literal' && typeof ty.value === 'number') || ty.kind === 'unknown';
        if (!isNumeric(argType)) {
          throw { message: `decrement operator -- requires numeric operand`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'number' };
      }

      else if ((name === 'not' || name === '!') && node.args.length === 1) {
        if (!isBoolean(argTypes[0])) {
          throw { message: `Logical operator ${name} requires boolean operand`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'boolean' };
      }

      // Bitwise
      else if ((name === '&' || name === '|' || name === '^' || name === '<<' || name === '>>' || name === '>>>') && node.args.length === 2) {
        if (!isNumeric(argTypes[0]) || !isNumeric(argTypes[1])) {
          throw { message: `Bitwise operator ${name} requires numeric operands`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'number' };
      }

      // Boolean xor word-form
      else if (name === 'xor' && node.args.length === 2) {
        if (!isBoolean(argTypes[0]) || !isBoolean(argTypes[1])) {
          throw { message: `xor requires boolean operands`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'boolean' };
      }

      // instanceof: (instanceof left right) -> boolean, right should be a constructor/function
      else if (name === 'instanceof' && node.args.length === 2) {
        const right = argTypes[1];
        if (right && right.kind !== 'unknown' && right.kind !== 'function') {
          throw { message: `Right-hand side of instanceof must be a constructor/function`, location: node.location, phase: 'typeCheck' } as CompilerError;
        }
        t = { kind: 'boolean' };
      }

      // Nullish coalescing: (?? left right)
      else if (name === '??' && node.args.length === 2) {
        const left = argTypes[0];
        const right = argTypes[1];

        // Helper to remove null/undefined from a type
        const removeNullish = (tt: Type): Type => {
          if (tt.kind === 'union') {
            const parts = tt.types.filter((p) => p.kind !== 'null' && p.kind !== 'undefined');
            if (parts.length === 0) return { kind: 'unknown' };
            if (parts.length === 1) return parts[0];
            return { kind: 'union', types: parts };
          }
          if (tt.kind === 'null' || tt.kind === 'undefined') return { kind: 'unknown' };
          return tt;
        };

        const leftNonNull = left ? removeNullish(left) : { kind: 'unknown' } as Type;
        const rightType = right ?? { kind: 'unknown' } as Type;

        // If left (without nullish) is unknown, result is right; otherwise form union of leftNonNull and right
        if (leftNonNull.kind === 'unknown') {
          t = rightType;
        } else if (this.typesEqual(leftNonNull, rightType)) {
          t = leftNonNull;
        } else if (rightType.kind === 'unknown') {
          t = leftNonNull;
        } else {
          // Merge into union, avoiding duplicates
          const types: Type[] = [];
          const pushIfNew = (x: Type) => {
            if (!types.some((y) => this.typesEqual(x, y))) types.push(x);
          };
          pushIfNew(leftNonNull);
          pushIfNew(rightType);
          t = types.length === 1 ? types[0] : { kind: 'union', types };
        }
      }

      // Nullish-assignment: (??= target value) - treat like assignment
      else if (name === '??=' && node.args.length === 2) {
        // First arg is a target expression; determine its target type
        const targetExpr = node.args[0];
        const valueExpr = node.args[1];
        const targetType = this.getAssignmentTargetType(targetExpr);
        const valueTypeId = this.checkExpr(valueExpr);
        const valueType = valueTypeId !== null ? this.typeTable.get(valueTypeId) : { kind: 'unknown' } as Type;

        if (targetType && valueType) {
          if (!this.isAssignable(valueType, targetType)) {
            const err: CompilerError = {
              message: `Nullish-assignment value type ${this.typeToString(valueType)} not assignable to target type ${this.typeToString(targetType)}`,
              location: node.location,
              phase: 'typeCheck'
            };
            throw err;
          }
        }

        t = targetType ?? valueType;
      }

      // Compound-assignment operators (e.g. +=, -=, *=, etc.) - treat like assignment
      else if ((name === '+=' || name === '-=' || name === '*=' || name === '/=' || name === '%=' || name === '**=' ||
                name === '<<=' || name === '>>=' || name === '>>>=' || name === '&=' || name === '^=' || name === '|=' ||
                name === '&&=' || name === '||=') && node.args.length === 2) {
        const targetExpr = node.args[0];
        const valueExpr = node.args[1];
        const targetType = this.getAssignmentTargetType(targetExpr);
        const valueTypeId = this.checkExpr(valueExpr);
        const valueType = valueTypeId !== null ? this.typeTable.get(valueTypeId) : { kind: 'unknown' } as Type;

        if (targetType && valueType) {
          if (!this.isAssignable(valueType, targetType)) {
            const err: CompilerError = {
              message: `Assignment value type ${this.typeToString(valueType)} not assignable to target type ${this.typeToString(targetType)}`,
              location: node.location,
              phase: 'typeCheck'
            };
            throw err;
          }
        }

        t = targetType ?? valueType;
      }

      // Ternary: (ternary cond then else)
      else if ((name === 'ternary' || name === '?:') && node.args.length === 3) {
        // ensure condition is boolean
        const condTypeId = argTypeIds[0];
        if (condTypeId !== null) this.checkConditionType(condTypeId, node.args[0].location);
        const thenType = argTypes[1] ?? { kind: 'unknown' } as Type;
        const elseType = argTypes[2] ?? { kind: 'unknown' } as Type;
        if (this.typesEqual(thenType, elseType)) {
          t = thenType;
        } else {
          // union
          const types: Type[] = [];
          if (!types.some((y) => this.typesEqual(thenType, y))) types.push(thenType);
          if (!types.some((y) => this.typesEqual(elseType, y))) types.push(elseType);
          t = { kind: 'union', types };
        }
      }
    if (calleeTypeId !== null) {
      const calleeType = this.typeTable.get(calleeTypeId);
      if (calleeType.kind === "function") {
        if (calleeType.params.length !== node.args.length) {
          const err: CompilerError = {
            message: `Call arity mismatch: expected ${calleeType.params.length} args but got ${node.args.length}`,
            location: node.location,
            phase: "typeCheck"
          };
          throw err;
        }

        for (let i = 0; i < calleeType.params.length; i++) {
          const expected = calleeType.params[i];
          const argTypeId = argTypeIds[i];
          if (argTypeId !== null) {
            const actual = this.typeTable.get(argTypeId);
            if (!this.isAssignable(actual, expected)) {
              const err: CompilerError = {
                message: `Call argument ${i + 1} type mismatch: expected ${this.typeToString(expected)} but got ${this.typeToString(actual)}`,
                location: node.location,
                phase: "typeCheck"
              };
              throw err;
            }
          }
        }

        t = calleeType.returns;
      } else if (calleeType.kind !== "unknown") {
        const err: CompilerError = {
          message: `Cannot call non-function type ${this.typeToString(calleeType)}`,
          location: node.location,
          phase: "typeCheck"
        };
        throw err;
      }
    }

    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkIf(node: IfExpr): number | null {
    const conditionTypeId = this.checkExpr(node.condition);
    this.checkConditionType(conditionTypeId, node.location);
    const thenTypeId = this.checkExpr(node.thenBranch);

    let elseTypeId: number | null = null;
    if (node.elseBranch !== null) {
      elseTypeId = this.checkExpr(node.elseBranch);
    }

    let resultTypeId: number | null = thenTypeId;
    if (node.elseBranch !== null && thenTypeId !== null && elseTypeId !== null) {
      const thenType = this.typeTable.get(thenTypeId);
      const elseType = this.typeTable.get(elseTypeId);
      if (!this.typesEqual(thenType, elseType)) {
        resultTypeId = this.typeTable.add({ kind: "unknown" });
      }
    }

    node.typeId = resultTypeId;
    return resultTypeId;
  }

  private checkProp(node: PropExpr): number {
    const objectTypeId = this.checkExpr(node.object);

    let t: Type = { kind: "unknown" };
    if (objectTypeId !== null) {
      const objectType = this.typeTable.get(objectTypeId);
      if (objectType.kind === "object") {
        const field = objectType.fields.find((f) => f.name === node.property);
        if (field) {
          t = field.type;
        } else {
          const err: CompilerError = {
            message: `Unknown property ${node.property} on object type`,
            location: node.location,
            phase: "typeCheck"
          };
          throw err;
        }
      } else if (objectType.kind === "array") {
        // Arrays are objects in JS; allow property access without error.
      } else if (objectType.kind !== "unknown") {
        const err: CompilerError = {
          message: `Cannot access property on non-object type ${this.typeToString(objectType)}`,
          location: node.location,
          phase: "typeCheck"
        };
        throw err;
      }
    }
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkFunction(node: FunctionExpr): number {
    this.pushScope();
    // Add type parameters to scope
    if (node.typeparams) {
      for (const tp of node.typeparams) {
        this.setTypeForTypeParam(tp.name.name, { kind: "unknown" });
      }
    }
    // Initialize parameter types: respect inline annotations when present
    for (const param of node.params) {
      if (param.symbolId !== undefined) {
        let paramType: Type = { kind: "unknown" };
        if ((param as any).typeAnnotation) {
          const resolved = this.resolveTypeNode((param as any).typeAnnotation as TypeNode);
          if (resolved === null) {
            const err: CompilerError = {
              message: `Unknown type in parameter annotation for ${param.name}`,
              location: (param as any).typeAnnotation?.location ?? param.location,
              phase: "typeCheck"
            };
            throw err;
          }
          paramType = resolved;
        }
        const paramTypeId = this.typeTable.add(paramType);
        param.typeId = paramTypeId;
        this.setTypeForSymbol(param.symbolId, paramType);
      }
    }

    for (const expr of node.body) {
      this.checkExpr(expr);
    }

    const params: Type[] = [];
    for (let i = 0; i < node.params.length; i++) {
      const p = node.params[i];
      if (p.typeId !== undefined && p.typeId !== null) {
        params.push(this.typeTable.get(p.typeId));
      } else {
        params.push({ kind: "unknown" });
      }
    }

    const returnTypeIds: number[] = [];
    for (const expr of node.body) {
      this.collectReturnTypes(expr, returnTypeIds);
    }

    // Determine return type: if function has an explicit inline return annotation,
    // resolve it and enforce that every `return` expression is assignable to it.
    let returnType: Type = { kind: "unknown" };
    if (node.returnType) {
      const resolved = this.resolveTypeNode(node.returnType);
      if (resolved === null) {
        const err: CompilerError = {
          message: `Unknown type in function return annotation`,
          location: node.returnType.location,
          phase: "typeCheck"
        };
        throw err;
      }
      // If the function was explicitly declared to return `undefined`/void,
      // disallow any explicit `return <value>` forms inside the body.
      if (resolved.kind === "undefined") {
        const returnNodes: ReturnExpr[] = [];
        for (const expr of node.body) {
          this.collectReturnExprs(expr, returnNodes);
        }
        for (const rn of returnNodes) {
          if (rn.value !== null) {
            const err: CompilerError = {
              message: `Explicit return with a value is not allowed in a void function`,
              location: rn.location,
              phase: "typeCheck"
            };
            throw err;
          }
        }
      }
      // For each observed return expression, verify assignability
      for (const rid of returnTypeIds) {
        const actual = this.typeTable.get(rid);
        if (!this.isAssignable(actual, resolved)) {
          const err: CompilerError = {
            message: `Return type mismatch: expected ${this.typeToString(resolved)} but got ${this.typeToString(actual)}`,
            location: node.location,
            phase: "typeCheck"
          };
          throw err;
        }
      }
      returnType = resolved;
    } else {
      if (returnTypeIds.length > 0) {
        const firstType = this.typeTable.get(returnTypeIds[0]);
        let allSame = true;
        for (let i = 1; i < returnTypeIds.length; i++) {
          const t = this.typeTable.get(returnTypeIds[i]);
          if (!this.typesEqual(firstType, t)) {
            allSame = false;
            break;
          }
        }
        if (allSame) {
          returnType = firstType;
        }
      }
    }

    this.popScope();

    const t: Type = { kind: "function", params, returns: returnType };
    const id = this.typeTable.add(t);
    node.typeId = id;

    if (node.name !== null && node.name.symbolId !== undefined) {
      this.setTypeForSymbol(node.name.symbolId, t);
    }

    return id;
  }

  private checkReturn(node: ReturnExpr): number {
    let id: number;
    if (node.value !== null) {
      const valueTypeId = this.checkExpr(node.value);
      if (valueTypeId !== null) {
        id = valueTypeId;
      } else {
        id = this.typeTable.add({ kind: "unknown" });
      }
    } else {
      id = this.typeTable.add({ kind: "undefined" });
    }
    node.typeId = id;
    return id;
  }

  private checkWhile(node: WhileExpr): number {
    const conditionTypeId = this.checkExpr(node.condition);
    this.checkConditionType(conditionTypeId, node.location);
    for (const expr of node.body) {
      this.checkExpr(expr);
    }

    const t: Type = { kind: "undefined" };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkArray(node: ArrayExpr): number {
    const elementTypes: Type[] = [];

    for (const elem of node.elements) {
      const elemTypeId = this.checkExpr(elem);
      if (elemTypeId !== null) {
        elementTypes.push(this.typeTable.get(elemTypeId));
      }
    }

    let elementType: Type = { kind: "unknown" };
    if (elementTypes.length > 0) {
      const first = elementTypes[0];
      const allSame = elementTypes.every((t) => this.typesEqual(t, first));
      if (allSame) {
        elementType = first;
      }
    }

    elementType = this.widenLiteral(elementType);

    const t: Type = { kind: "array", element: elementType };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkObject(node: ObjectExpr): number {
    const fields: { name: string; type: Type }[] = [];
    for (const field of node.fields) {
      const fieldTypeId = this.checkExpr(field.value);
      const fieldType = fieldTypeId !== null ? this.typeTable.get(fieldTypeId) : { kind: "unknown" } as Type;
      fields.push({ name: field.key, type: this.widenLiteral(fieldType) });
    }

    const t: Type = { kind: "object", fields };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkAssign(node: AssignExpr): number {
    
    const targetType = this.getAssignmentTargetType(node.target);
    const valueTypeId = this.checkExpr(node.value);
    if (targetType && valueTypeId !== null) {
      const valueType = this.typeTable.get(valueTypeId);
      if (!this.isAssignable(valueType, targetType)) {
        const err: CompilerError = {
          message: `Assignment type mismatch: expected ${this.typeToString(targetType)} but got ${this.typeToString(valueType)}`,
          location: node.location,
          phase: "typeCheck"
        };
        throw err;
      }
    }
    if (node.target.kind === "identifier" && valueTypeId !== null) {
      if (node.target.symbolId !== undefined) {
        const valueType = this.typeTable.get(valueTypeId);
        this.setTypeForSymbol(node.target.symbolId, this.widenLiteral(valueType));
      }
    }
    node.typeId = valueTypeId ?? null;
    return valueTypeId ?? this.typeTable.add({ kind: "unknown" });
  }

  private checkFor(node: ForExpr): number {
    if (node.init !== null) {
      this.checkExpr(node.init);
    }
    if (node.condition !== null) {
      const conditionTypeId = this.checkExpr(node.condition);
      this.checkConditionType(conditionTypeId, node.location);
    }
    if (node.update !== null) {
      this.checkExpr(node.update);
    }
    for (const expr of node.body) {
      this.checkExpr(expr);
    }

    const t: Type = { kind: "undefined" };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkIndex(node: IndexExpr): number {
    const objectTypeId = this.checkExpr(node.object);
    const indexTypeId = this.checkExpr(node.index);
    this.checkIndexType(indexTypeId, node.location);

    let t: Type = { kind: "unknown" };
    if (objectTypeId !== null) {
      const objectType = this.typeTable.get(objectTypeId);
      if (objectType.kind === "array") {
        t = objectType.element;
      } else if (objectType.kind !== "unknown") {
        const err: CompilerError = {
          message: `Cannot index non-array type ${this.typeToString(objectType)}`,
          location: node.location,
          phase: "typeCheck"
        };
        throw err;
      }
    }
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkNew(node: NewExpr): number {
    this.checkExpr(node.callee);
    for (const arg of node.args) {
      this.checkExpr(arg);
    }

    const t: Type = { kind: "unknown" };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkClass(node: ClassExpr): number {
    this.pushScope();
    // Add type parameters to scope
    if (node.typeparams) {
      for (const tp of node.typeparams) {
        this.setTypeForTypeParam(tp.name.name, { kind: "unknown" });
      }
    }
    const fields: { name: string; type: Type }[] = [];
    for (const field of node.fields) {
      let fieldType: Type = { kind: "unknown" };
      if (field.initializer !== null) {
        const fieldTypeId = this.checkExpr(field.initializer);
        if (fieldTypeId !== null) {
          fieldType = this.typeTable.get(fieldTypeId);
        }
      }
      // Widen literal initializers (e.g. `0` -> `number`) so assignments
      // to fields don't incorrectly require matching literal values.
      fields.push({ name: field.name, type: this.widenLiteral(fieldType) });
    }
    // Create a provisional object type for the class so method bodies can
    // reference `this` with a proper type during checking. Reserve a
    // synthetic symbol id for `this` and bind it in the class scope.
    const provisionalObjType: Type = { kind: "object", fields };
    const provisionalObjTypeId = this.typeTable.add(provisionalObjType);
    const thisSymId = this.syntheticSymbolCounter--;
    this.setTypeForSymbol(thisSymId, provisionalObjType);
    for (const method of node.methods) {
      // Recursively assign the synthetic `this` symbol id to any
      // identifier named `this` inside the method body so property
      // accesses and assignments (including nested positions) resolve
      // to the provisional class object type.
      const assignThisSym = (expr: Expr) => {
        if (expr.kind === "identifier") {
          const idn = expr as Identifier;
          if (idn.name === "this") {
            idn.symbolId = thisSymId;
            this.ctx.eventSink.emit({ phase: "typeCheck", kind: "identifierResolved", location: idn.location, data: { name: "this", symbolId: thisSymId } });
          }
          return;
        }
        // Avoid traversing into nested function expressions
        if (expr.kind === "function") return;

        // Walk into known container expressions
        if (expr.kind === "prop") {
          const p = expr as PropExpr;
          assignThisSym(p.object);
          return;
        }
        if (expr.kind === "assign") {
          const a = expr as AssignExpr;
          assignThisSym(a.target);
          assignThisSym(a.value);
          return;
        }
        if (expr.kind === "call") {
          const c = expr as CallExpr;
          assignThisSym(c.callee);
          for (const a of c.args) assignThisSym(a);
          return;
        }
        if (expr.kind === "if") {
          const i = expr as IfExpr;
          assignThisSym(i.condition);
          assignThisSym(i.thenBranch);
          if (i.elseBranch) assignThisSym(i.elseBranch);
          return;
        }
        if (expr.kind === "let*") {
          const l = expr as LetStarExpr;
          for (const b of l.bindings) {
            assignThisSym(b.init);
          }
          for (const be of l.body) assignThisSym(be);
          return;
        }
        if (expr.kind === "block") {
          const bl = expr as BlockStmt;
          for (const be of bl.body) assignThisSym(be);
          return;
        }
        if (expr.kind === "return") {
          const r = expr as ReturnExpr;
          if (r.value) assignThisSym(r.value);
          return;
        }
        if (expr.kind === "for" || expr.kind === "while") {
          const loop = expr as ForExpr | WhileExpr;
          if ((loop as ForExpr).init) assignThisSym((loop as ForExpr).init!);
          if ((loop as ForExpr).condition) assignThisSym((loop as ForExpr).condition!);
          if ((loop as ForExpr).update) assignThisSym((loop as ForExpr).update!);
          if ((loop as WhileExpr).body) {
            for (const be of (loop as WhileExpr).body) assignThisSym(be);
          }
          return;
        }
        if (expr.kind === "object") {
          const o = expr as ObjectExpr;
          for (const f of o.fields) assignThisSym(f.value);
          return;
        }
        if (expr.kind === "array") {
          const a = expr as ArrayExpr;
          for (const el of a.elements) assignThisSym(el);
          return;
        }
        if (expr.kind === "index") {
          const idx = expr as IndexExpr;
          assignThisSym(idx.object);
          assignThisSym(idx.index);
          return;
        }
        if (expr.kind === "new") {
          const n = expr as NewExpr;
          assignThisSym(n.callee);
          for (const a of n.args) assignThisSym(a);
          return;
        }
      };

      for (const expr of method.body) assignThisSym(expr);
      // Each method gets its own scope for type parameters and local
      // bindings. Initialize parameter types respecting inline
      // annotations and resolver-assigned symbol ids.
      this.pushScope();
      for (const param of method.params) {
        if (param.symbolId !== undefined) {
          let paramType: Type = { kind: "unknown" };
          if ((param as any).typeAnnotation) {
            const resolved = this.resolveTypeNode((param as any).typeAnnotation as TypeNode);
            if (resolved === null) {
              const err: CompilerError = {
                message: `Unknown type in parameter annotation for ${param.name}`,
                location: (param as any).typeAnnotation?.location ?? param.location,
                phase: "typeCheck"
              };
              throw err;
            }
            paramType = resolved;
          }
          const paramTypeId = this.typeTable.add(paramType);
          param.typeId = paramTypeId;
          this.setTypeForSymbol(param.symbolId, paramType);
        }
      }

      // Pre-scan method body for `this.<field> := <expr>` assignments so
      // we can add class fields inferred from constructor assignments
      // (or other methods). This happens after params are in scope so
      // RHS expressions can be type-checked to obtain useful types.
      for (const expr of method.body) {
        if (expr.kind === "assign") {
          const a = expr as AssignExpr;
          if (a.target.kind === "prop") {
            const p = a.target as PropExpr;
            if (p.object.kind === "identifier" && (p.object as Identifier).symbolId === thisSymId) {
              // Type-check RHS to get a type for the field
              const rhsTypeId = this.checkExpr(a.value);
              const rhsType = rhsTypeId !== null ? this.typeTable.get(rhsTypeId) : { kind: "unknown" } as Type;
              const existing = fields.find((f) => f.name === p.property);
              if (existing) {
                // If we previously had unknown, replace with inferred
                if (existing.type.kind === "unknown") {
                  existing.type = this.widenLiteral(rhsType);
                }
              } else {
                fields.push({ name: p.property, type: this.widenLiteral(rhsType) });
              }
            }
          }
        }
      }

      // Type-check method body expressions now that params are in scope
      for (const expr of method.body) {
        this.checkExpr(expr);
      }

      // Collect return expression types and/or nodes for validation
      const returnTypeIds: number[] = [];
      for (const expr of method.body) {
        this.collectReturnTypes(expr, returnTypeIds);
      }

      // If there are no explicit `return` expressions, consider the final
      // expression's type as the method's return (expression-oriented body).
      if (returnTypeIds.length === 0 && method.body.length > 0) {
        const last = method.body[method.body.length - 1];
        if (last.kind !== "return" && (last as any).typeId !== undefined && (last as any).typeId !== null) {
          const lastType = this.typeTable.get((last as any).typeId);
          // use widened literal types for inferred returns
          returnTypeIds.push(this.typeTable.add(this.widenLiteral(lastType)));
        }
      }

      // Determine return type for the method
      let returnType: Type = { kind: "unknown" };
      if ((method as any).returnType) {
        // Constructors are not allowed to have return-type annotations
        if (method.name === "constructor") {
          const err: CompilerError = {
            message: `Constructors may not have return type annotations`,
            location: (method as any).returnType.location ?? node.location,
            phase: "typeCheck"
          };
          throw err;
        }

        const resolved = this.resolveTypeNode((method as any).returnType as TypeNode);
        if (resolved === null) {
          const err: CompilerError = {
            message: `Unknown type in method return annotation`,
            location: (method as any).returnType.location ?? node.location,
            phase: "typeCheck"
          };
          throw err;
        }

        // Disallow explicit value returns when declared void/undefined
        if (resolved.kind === "undefined") {
          const returnNodes: ReturnExpr[] = [];
          for (const expr of method.body) {
            this.collectReturnExprs(expr, returnNodes);
          }
          for (const rn of returnNodes) {
            if (rn.value !== null) {
              const err: CompilerError = {
                message: `Explicit return with a value is not allowed in a void method`,
                location: rn.location,
                phase: "typeCheck"
              };
              throw err;
            }
          }
        }

        // Validate each observed return against the declared return type
        for (const rid of returnTypeIds) {
          const actual = this.typeTable.get(rid);
          if (!this.isAssignable(actual, resolved)) {
            const err: CompilerError = {
              message: `Return type mismatch: expected ${this.typeToString(resolved)} but got ${this.typeToString(actual)}`,
              location: method.params.length > 0 ? method.params[0].location : node.location,
              phase: "typeCheck"
            };
            throw err;
          }
        }

        returnType = resolved;
      } else {
        if (returnTypeIds.length > 0) {
          const firstType = this.typeTable.get(returnTypeIds[0]);
          let allSame = true;
          for (let i = 1; i < returnTypeIds.length; i++) {
            const t = this.typeTable.get(returnTypeIds[i]);
            if (!this.typesEqual(firstType, t)) {
              allSame = false;
              break;
            }
          }
          if (allSame) {
            // Widen literal types for inferred returns so emitted TS uses
            // general types (e.g. `boolean` instead of literal `true`).
            returnType = this.widenLiteral(firstType);
          }
        }
      }

      // Register the function type for the method so codegen can emit
      // an inferred return annotation when `emitTypes` is enabled.
      const paramsTypes: Type[] = method.params.map((p) => {
        if (p.typeId !== undefined && p.typeId !== null) return this.typeTable.get(p.typeId);
        return { kind: "unknown" } as Type;
      });
      const fnType: Type = { kind: "function", params: paramsTypes, returns: returnType };
      const fnTypeId = this.typeTable.add(fnType);
      (method as any).typeId = fnTypeId;

      this.popScope();
    }

    // Use the provisional object type id created above as the class type id.
    node.typeId = provisionalObjTypeId;
    this.popScope();
    return provisionalObjTypeId;
  }

  private checkTypeAssert(node: TypeAssertExpr): number {
    const exprTypeId = this.checkExpr(node.expr);

    const resolved = this.resolveTypeNode(node.typeAnnotation);
    if (resolved === null) {
      const err: CompilerError = {
        message: `Unknown type reference in type-assert`,
        location: node.typeAnnotation?.location ?? node.location,
        phase: "typeCheck"
      };
      throw err;
    }

    if (exprTypeId !== null) {
      const actual = this.typeTable.get(exprTypeId);
      if (!this.isAssignable(actual, resolved)) {
        const err: CompilerError = {
          message: `Type-assert mismatch: expected ${this.typeToString(resolved)} but got ${this.typeToString(actual)}`,
          location: node.location,
          phase: "typeCheck"
        };
        throw err;
      }
    }

    const id = this.typeTable.add(resolved);
    node.typeId = id;
    return id;
  }

  private checkTypeApp(node: TypeAppExpr): number {
    // For minimal type checking, just check the expression
    return this.checkExpr(node.expr) ?? this.typeTable.add({ kind: "unknown" });
  }

  private checkTypeAlias(node: TypeAliasStmt): void {
    this.pushScope();
    // Add type parameters to scope
    if (node.typeparams) {
      for (const tp of node.typeparams) {
        this.setTypeForTypeParam(tp.name.name, { kind: "unknown" });
      }
    }
    const resolved = this.resolveTypeNode(node.typeAnnotation);
    if (resolved === null) {
      this.popScope();
      const err: CompilerError = {
        message: `Unknown type reference in type-alias`,
        location: node.typeAnnotation?.location ?? node.location,
        phase: "typeCheck"
      };
      throw err;
    }
    this.typeAliases.set(node.name.name, resolved);
    this.popScope();
  }

  private checkThrow(node: ThrowExpr): number {
    this.checkExpr(node.value);

    const t: Type = { kind: "undefined" };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkLetStar(node: LetStarExpr): number | null {
    this.pushScope();
    for (const binding of node.bindings) {
      const initTypeId = this.checkExpr(binding.init);
      const bindingType = initTypeId !== null ? this.typeTable.get(initTypeId) : { kind: "unknown" } as Type;
      const widened = this.widenLiteral(bindingType);
      const bindingTypeId = this.typeTable.add(widened);
      binding.name.typeId = bindingTypeId;
      if (binding.name.symbolId !== undefined) {
        this.setTypeForSymbol(binding.name.symbolId, widened);
      }
    }

    let lastTypeId: number | null = null;
    for (const expr of node.body) {
      lastTypeId = this.checkExpr(expr);
    }

    node.typeId = lastTypeId ?? null;

    this.ctx.eventSink.emit({
      phase: "typeCheck",
      kind: "letTyped",
      location: node.location,
      data: { isConst: node.isConst }
    });

    this.popScope();
    return lastTypeId;
  }

  private resolveTypeNode(tn: TypeNode | null | undefined): Type | null {
    if (!tn) return null;
    switch (tn.kind) {
      case "type-number":
        return { kind: "number" };
      case "type-string":
        return { kind: "string" };
      case "type-boolean":
        return { kind: "boolean" };
      case "type-null":
        return { kind: "null" };
      case "type-undefined":
        return { kind: "undefined" };
      case "type-literal":
        return { kind: "literal", value: tn.value };
      case "type-ref": {
        const name = tn.name;
        if (name === "number") return { kind: "number" };
        if (name === "string") return { kind: "string" };
        if (name === "boolean") return { kind: "boolean" };
        if (name === "void") return { kind: "undefined" };
        if (name === "undefined") return { kind: "undefined" };
        if (name === "null") return { kind: "null" };
        // Check type parameters first
        for (let i = this.typeParamEnv.length - 1; i >= 0; i--) {
          const type = this.typeParamEnv[i].get(name);
          if (type) return type;
        }
        const alias = this.typeAliases.get(name);
        if (alias) return alias;
        return null;
      }
      case "type-array": {
        const elem = tn.element;
        const elemType = this.resolveTypeNode(elem);
        if (!elemType) return null;
        return { kind: "array", element: elemType };
      }
      case "type-object": {
        const fields: { name: string; type: Type }[] = [];
        for (const field of tn.fields) {
          const resolved = this.resolveTypeNode(field.type);
          if (!resolved) return null;
          fields.push({ name: field.name, type: resolved });
        }
        return { kind: "object", fields };
      }
      case "type-function": {
        const params: Type[] = [];
        for (const p of tn.params) {
          const resolved = this.resolveTypeNode(p);
          if (!resolved) return null;
          params.push(resolved);
        }
        const returns = this.resolveTypeNode(tn.returns);
        if (!returns) return null;
        return { kind: "function", params, returns };
      }
      case "type-union": {
        const types: Type[] = [];
        for (const t of tn.types) {
          const resolved = this.resolveTypeNode(t);
          if (!resolved) return null;
          types.push(resolved);
        }
        return { kind: "union", types };
      }
      case "type-intersection": {
        const types: Type[] = [];
        for (const t of tn.types) {
          const resolved = this.resolveTypeNode(t);
          if (!resolved) return null;
          types.push(resolved);
        }
        return { kind: "intersection", types };
      }
      case "type-app": {
        const exprType = this.resolveTypeNode(tn.expr);
        return exprType ?? { kind: "unknown" };
      }
      default:
        return null;
    }
  }

  private collectReturnTypes(expr: Expr, out: number[]): void {
    if (expr.kind === "return") {
      if (expr.typeId !== null && expr.typeId !== undefined) {
        out.push(expr.typeId);
      }
      return;
    }

    if (expr.kind === "if") {
      this.collectReturnTypes(expr.thenBranch, out);
      if (expr.elseBranch !== null) {
        this.collectReturnTypes(expr.elseBranch, out);
      }
      return;
    }

    if (expr.kind === "let*") {
      for (const bodyExpr of expr.body) {
        this.collectReturnTypes(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "while") {
      for (const bodyExpr of expr.body) {
        this.collectReturnTypes(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "for") {
      for (const bodyExpr of expr.body) {
        this.collectReturnTypes(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "try-catch") {
      for (const bodyExpr of expr.tryBody) {
        this.collectReturnTypes(bodyExpr, out);
      }
      for (const bodyExpr of expr.catchBody) {
        this.collectReturnTypes(bodyExpr, out);
      }
      for (const bodyExpr of expr.finallyBody) {
        this.collectReturnTypes(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "function") {
      return;
    }
  }

  private collectReturnExprs(expr: Expr, out: ReturnExpr[]): void {
    if (expr.kind === "return") {
      out.push(expr as ReturnExpr);
      return;
    }

    if (expr.kind === "if") {
      this.collectReturnExprs(expr.thenBranch, out);
      if (expr.elseBranch !== null) {
        this.collectReturnExprs(expr.elseBranch, out);
      }
      return;
    }

    if (expr.kind === "let*") {
      for (const bodyExpr of expr.body) {
        this.collectReturnExprs(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "while") {
      for (const bodyExpr of expr.body) {
        this.collectReturnExprs(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "for") {
      for (const bodyExpr of expr.body) {
        this.collectReturnExprs(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "try-catch") {
      for (const bodyExpr of expr.tryBody) {
        this.collectReturnExprs(bodyExpr, out);
      }
      for (const bodyExpr of expr.catchBody) {
        this.collectReturnExprs(bodyExpr, out);
      }
      for (const bodyExpr of expr.finallyBody) {
        this.collectReturnExprs(bodyExpr, out);
      }
      return;
    }

    if (expr.kind === "function") {
      return;
    }
  }

  private pushScope(): void {
    this.typeEnv.push(new Map());
    this.typeParamEnv.push(new Map());
  }

  private popScope(): void {
    this.typeEnv.pop();
    this.typeParamEnv.pop();
  }

  private setTypeForSymbol(symbolId: number, type: Type): void {
    const scope = this.typeEnv[this.typeEnv.length - 1];
    scope.set(symbolId, type);
  }

  private setTypeForTypeParam(name: string, type: Type): void {
    const scope = this.typeParamEnv[this.typeParamEnv.length - 1];
    scope.set(name, type);
  }

  private getTypeForSymbol(symbolId: number): Type | null {
    for (let i = this.typeEnv.length - 1; i >= 0; i--) {
      const scope = this.typeEnv[i];
      if (scope.has(symbolId)) {
        return scope.get(symbolId) ?? null;
      }
    }
    return null;
  }

  private getAssignmentTargetType(target: Expr): Type | null {
    if (target.kind === "index") {
      const objectTypeId = this.checkExpr(target.object);
      this.checkExpr(target.index);
      if (objectTypeId !== null) {
        const objectType = this.typeTable.get(objectTypeId);
        if (objectType.kind === "array") {
          return objectType.element;
        }
        if (objectType.kind !== "unknown") {
          const err: CompilerError = {
            message: `Cannot index non-array type ${this.typeToString(objectType)}`,
            location: target.location,
            phase: "typeCheck"
          };
          throw err;
        }
      }
      return null;
    }

    if (target.kind === "prop") {
      const objectTypeId = this.checkExpr(target.object);
      if (objectTypeId !== null) {
        const objectType = this.typeTable.get(objectTypeId);
        if (objectType.kind === "object") {
          const field = objectType.fields.find((f) => f.name === target.property);
          if (field) {
            return field.type;
          }
          const err: CompilerError = {
            message: `Unknown property ${target.property} on object type`,
            location: target.location,
            phase: "typeCheck"
          };
          throw err;
        }
        if (objectType.kind !== "unknown" && objectType.kind !== "array") {
          const err: CompilerError = {
            message: `Cannot assign property on non-object type ${this.typeToString(objectType)}`,
            location: target.location,
            phase: "typeCheck"
          };
          throw err;
        }
      }
      return null;
    }

    if (target.kind === "identifier") {
      if (target.symbolId !== undefined) {
        const known = this.getTypeForSymbol(target.symbolId);
        if (known) {
          return known;
        }
      }
      return null;
    }

    this.checkExpr(target);
    return null;
  }

  private typesEqual(a: Type, b: Type): boolean {
    if (a.kind !== b.kind) return false;
    if (a.kind === "literal" && b.kind === "literal") {
      return a.value === b.value;
    }
    if (a.kind === "array" && b.kind === "array") {
      return this.typesEqual(a.element, b.element);
    }
    if (a.kind === "object" && b.kind === "object") {
      if (a.fields.length !== b.fields.length) return false;
      for (let i = 0; i < a.fields.length; i++) {
        const af = a.fields[i];
        const bf = b.fields[i];
        if (af.name !== bf.name) return false;
        if (!this.typesEqual(af.type, bf.type)) return false;
      }
      return true;
    }
    if (a.kind === "function" && b.kind === "function") {
      if (a.params.length !== b.params.length) return false;
      for (let i = 0; i < a.params.length; i++) {
        if (!this.typesEqual(a.params[i], b.params[i])) return false;
      }
      return this.typesEqual(a.returns, b.returns);
    }
    return true;
  }

  private isAssignable(actual: Type, expected: Type): boolean {
    if (expected.kind === "unknown" || actual.kind === "unknown") return true;
    if (this.typesEqual(actual, expected)) return true;
    if (actual.kind === "literal") {
      const base = this.literalBaseType(actual);
      if (base && this.isAssignable(base, expected)) return true;
    }
    if (expected.kind === "literal") {
      return actual.kind === "literal" && actual.value === expected.value;
    }
    if (expected.kind === "object" && actual.kind === "object") {
      for (const ef of expected.fields) {
        const af = actual.fields.find((f) => f.name === ef.name);
        if (!af) return false;
        if (!this.isAssignable(af.type, ef.type)) return false;
      }
      return true;
    }
    if (expected.kind === "union") {
      return expected.types.some((et) => this.isAssignable(actual, et));
    }
    if (expected.kind === "intersection") {
      return expected.types.every((et) => this.isAssignable(actual, et));
    }
    return false;
  }

  private typeToString(t: Type): string {
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
        return `${this.typeToString(t.element)}[]`;
      case "object": {
        const parts = t.fields.map((f) => `${f.name}: ${this.typeToString(f.type)}`);
        return `{ ${parts.join(", ")} }`;
      }
      case "function": {
        const params = t.params.map((p) => this.typeToString(p)).join(", ");
        return `(${params}) => ${this.typeToString(t.returns)}`;
      }
      case "union": {
        const parts = t.types.map((tt) => this.typeToString(tt));
        return parts.join(" | ");
      }
      case "intersection": {
        const parts = t.types.map((tt) => this.typeToString(tt));
        return parts.join(" & ");
      }
    }
  }

  private literalBaseType(t: { kind: "literal"; value: string | number | boolean | null | "undefined" }): Type | null {
    if (t.value === null) return { kind: "null" };
    if (t.value === "undefined") return { kind: "undefined" };
    if (typeof t.value === "number") return { kind: "number" };
    if (typeof t.value === "string") return { kind: "string" };
    if (typeof t.value === "boolean") return { kind: "boolean" };
    return null;
  }

  private widenLiteral(t: Type): Type {
    if (t.kind !== "literal") return t;
    return this.literalBaseType(t) ?? { kind: "unknown" };
  }

  private checkConditionType(typeId: number | null, location: { file: string; start: number; end: number; line: number; column: number }): void {
    if (typeId === null) return;
    const t = this.typeTable.get(typeId);
    if (t.kind === "unknown" || t.kind === "boolean") return;
    if (t.kind === "literal") {
      const base = this.literalBaseType(t);
      if (base && base.kind === "boolean") return;
    }
    const err: CompilerError = {
      message: `Condition must be boolean, got ${this.typeToString(t)}`,
      location,
      phase: "typeCheck"
    };
    throw err;
  }

  private checkIndexType(typeId: number | null, location: { file: string; start: number; end: number; line: number; column: number }): void {
    if (typeId === null) return;
    const t = this.typeTable.get(typeId);
    if (t.kind === "unknown" || t.kind === "number") return;
    if (t.kind === "literal") {
      const base = this.literalBaseType(t);
      if (base && base.kind === "number") return;
    }
    const err: CompilerError = {
      message: `Index must be number, got ${this.typeToString(t)}`,
      location,
      phase: "typeCheck"
    };
    throw err;
  }
}
// Keep default TypeChecker export for Phase0 compatibility
export class TypeChecker extends TypeCheckerBase { }

export default TypeChecker;