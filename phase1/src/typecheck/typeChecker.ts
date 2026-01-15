export { TypeChecker } from "./index.js";
/*
  constructor(ctx: CompilerContext) {
    super(ctx);
  }

  // If Phase1 needs additional behavior (e.g., macro-specific checks)
  // we can override public methods or add helpers here. For now, delegate
  // to the base implementation.
  checkProgram(program: Program): TypeCheckResult {
    // The Phase0 TypeCheckerBase expects a Phase0-shaped Program. The
    // MacroExpander in Phase1 already normalizes to Phase0 AST before
    // calling into the typechecker, so simply delegate to the base.
    return super.checkProgram(program as any) as TypeCheckResult;
  }
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
*/
