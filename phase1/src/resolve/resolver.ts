import { MacroDef } from "../ast/nodes.js";
import { CompilerContext } from "../api.js";
import { ResolverBase } from "t2-phase0";

export class Resolver extends ResolverBase {
  constructor(ctx: CompilerContext) {
    super(ctx);
  }

  resolveProgram(program: any): void {
    // Use base resolution for regular symbols
    super.resolveProgram(program as any);

    // Then resolve macro definitions specially so their params get symbols
    for (const stmt of program.body) {
      if (stmt.kind === "defmacro") {
        this.resolveMacroDef(stmt as MacroDef, this.globalScope);
      }
    }
  }

  private resolveMacroDef(node: MacroDef, scope: any): void {
    const macroScope = this.createScope(scope);

    for (const param of node.params) {
      const sym = this.createSymbol(param.name, macroScope);
      param.symbolId = sym.id;
    }

    for (const expr of node.body) {
      this.resolveExpr(expr as any, macroScope);
    }
  }
}
