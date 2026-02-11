import { SourceLocation } from "../ast/nodes.js";

export interface CompilerError {
  message: string;
  location: SourceLocation;
  phase: "parse" | "resolve" | "typeCheck" | "codegen" | "tsc";
}

export function isCompilerError(err: unknown): err is CompilerError {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    "location" in err &&
    "phase" in err
  );
}
