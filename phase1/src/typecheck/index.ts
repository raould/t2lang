import { CompilerContext } from "../api.js";
import { TypeCheckerBase } from "t2-phase0";

/**
 * Thin Phase1 TypeChecker that reuses Phase0's TypeCheckerBase.
 */
export class TypeChecker extends TypeCheckerBase {
  constructor(ctx: CompilerContext) {
    super(ctx);
  }
}
