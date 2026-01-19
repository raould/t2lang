import { CompilerContext } from "../api.js";
import { ResolverBase } from "t2lang-phase0";
import type { Phase0Program } from "../ast/nodes.js";

export class Resolver extends ResolverBase {
  constructor(ctx: CompilerContext) {
    super(ctx);
  }

  resolveProgram(program: Phase0Program): void {
    // Delegate to Phase0 resolver for standard resolution
    type SuperParam = Parameters<ResolverBase["resolveProgram"]>[0];
    const p = program as unknown as SuperParam;
    super.resolveProgram(p);
  }
}
