import { CompilerContext } from "../api.js";
import { TypeCheckerBase } from "t2-phase0";
import type { Phase0Program } from "../ast/nodes.js";

/**
 * Thin Phase1 TypeChecker that reuses Phase0's TypeCheckerBase.
 */
export class TypeChecker extends TypeCheckerBase {
  constructor(ctx: CompilerContext) {
    super(ctx);
  }

  // Explicitly accept Phase0Program to make the Phase1 -> Phase0 boundary clear
  checkProgram(program: Phase0Program): ReturnType<TypeCheckerBase["checkProgram"]> {
    return super.checkProgram(program as any);
  }
}
