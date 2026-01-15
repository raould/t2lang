import {
  Program,
  Statement,
  Expr,
  LiteralExpr,
  Identifier,
  CallExpr,
  LetExpr,
  IfExpr,
  PropExpr,
  FunctionExpr,
  GensymExpr,
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
  TryCatchExpr,
  TypeNode,
  BlockStmt,
  TypeAliasStmt,
  MacroDef
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
}

export interface TypeCheckResult {
  program: Program;
  typeTable: TypeTable;
  errors: CompilerError[];
}

export class TypeChecker {
  private typeTable = new TypeTable();
  private errors: CompilerError[] = [];
  private typeEnv: Array<Map<number, Type>> = [new Map()];
  private typeAliases = new Map<string, Type>();

  constructor(private readonly ctx: CompilerContext) {}

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
    } else if (stmt.kind === "let") {
      this.checkLet(stmt as LetExpr);
    } else if (stmt.kind === "defmacro") {
      this.checkMacroDef(stmt as MacroDef);
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
      case "let":
        return this.checkLet(expr as LetExpr);
      case "if":
        return this.checkIf(expr as IfExpr);
      case "prop":
        return this.checkProp(expr as PropExpr);
      case "function":
        return this.checkFunction(expr as FunctionExpr);
      case "gensym":
        return this.checkGensym(expr as GensymExpr);
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
      case "try-catch":
        return this.checkTryCatch(expr as TryCatchExpr);
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
    for (const arg of node.args) {
      argTypeIds.push(this.checkExpr(arg));
    }

    let t: Type = { kind: "unknown" };
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
    for (const param of node.params) {
      if (param.symbolId !== undefined) {
        const unknownType: Type = { kind: "unknown" };
        const paramTypeId = this.typeTable.add(unknownType);
        param.typeId = paramTypeId;
        this.setTypeForSymbol(param.symbolId, unknownType);
      }
    }

    for (const expr of node.body) {
      this.checkExpr(expr);
    }

    const params: Type[] = [];
    for (let i = 0; i < node.params.length; i++) {
      params.push({ kind: "unknown" });
    }

    const returnTypeIds: number[] = [];
    for (const expr of node.body) {
      this.collectReturnTypes(expr, returnTypeIds);
    }

    let returnType: Type = { kind: "unknown" };
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

    this.popScope();

    const t: Type = { kind: "function", params, returns: returnType };
    const id = this.typeTable.add(t);
    node.typeId = id;

    if (node.name !== null && node.name.symbolId !== undefined) {
      this.setTypeForSymbol(node.name.symbolId, t);
    }

    return id;
  }

  private checkGensym(node: GensymExpr): number {
    const t: Type = { kind: "literal", value: "gensym_placeholder" }; // Placeholder, actual gensym is runtime
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkMacroDef(node: MacroDef): void {
    // Push scope for macro params
    this.pushScope();

    // Add params to scope
    for (const param of node.params) {
      if (param.symbolId !== undefined) {
        this.setTypeForSymbol(param.symbolId, { kind: "unknown" });
      }
    }

    // Check body
    for (const expr of node.body) {
      this.checkExpr(expr);
    }

    this.popScope();
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
    const fields: { name: string; type: Type }[] = [];
    for (const field of node.fields) {
      let fieldType: Type = { kind: "unknown" };
      if (field.initializer !== null) {
        const fieldTypeId = this.checkExpr(field.initializer);
        if (fieldTypeId !== null) {
          fieldType = this.typeTable.get(fieldTypeId);
        }
      }
      fields.push({ name: field.name, type: fieldType });
    }
    for (const method of node.methods) {
      for (const expr of method.body) {
        this.checkExpr(expr);
      }
    }

    const t: Type = { kind: "object", fields };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
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

  private checkTypeAlias(node: TypeAliasStmt): void {
    const resolved = this.resolveTypeNode(node.typeAnnotation);
    if (resolved === null) {
      const err: CompilerError = {
        message: `Unknown type reference in type-alias`,
        location: node.typeAnnotation?.location ?? node.location,
        phase: "typeCheck"
      };
      throw err;
    }
    this.typeAliases.set(node.name.name, resolved);
  }

  private checkThrow(node: ThrowExpr): number {
    this.checkExpr(node.value);

    const t: Type = { kind: "undefined" };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkTryCatch(node: TryCatchExpr): number {
    for (const expr of node.tryBody) {
      this.checkExpr(expr);
    }
    for (const expr of node.catchBody) {
      this.checkExpr(expr);
    }
    for (const expr of node.finallyBody) {
      this.checkExpr(expr);
    }

    const t: Type = { kind: "unknown" };
    const id = this.typeTable.add(t);
    node.typeId = id;
    return id;
  }

  private checkLet(node: LetExpr): number | null {
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
        if (name === "undefined") return { kind: "undefined" };
        if (name === "null") return { kind: "null" };
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

    if (expr.kind === "let") {
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

  private pushScope(): void {
    this.typeEnv.push(new Map());
  }

  private popScope(): void {
    this.typeEnv.pop();
  }

  private setTypeForSymbol(symbolId: number, type: Type): void {
    const scope = this.typeEnv[this.typeEnv.length - 1];
    scope.set(symbolId, type);
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
            message: `Unknown property ${target.property} on object type` ,
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
