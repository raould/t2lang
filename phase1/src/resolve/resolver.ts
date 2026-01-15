import { CompilerContext } from "../api.js";
import { ResolverBase } from "t2-phase0";
import type { Program } from "t2-phase0";

export class Resolver extends ResolverBase {
  constructor(ctx: CompilerContext) {
    super(ctx);
  }

  resolveProgram(program: Program): void {
    // Delegate to Phase0 resolver for standard resolution
    super.resolveProgram(program);
  }
}
