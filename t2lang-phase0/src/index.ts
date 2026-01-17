// Main exports from t2lang-phase0
// This file re-exports all public APIs for use by phase1 and other consumers

// AST nodes and types
export * from "./ast/nodes.js";

// Parser and Lexer
export { Parser } from "./parse/parser.js";
export { Lexer, Token, TokenKind } from "./parse/lexer.js";

// Resolver
export { Resolver, ResolverBase } from "./resolve/resolver.js";

// Type checker
export { TypeChecker, TypeCheckerBase, TypeTable, Type } from "./typecheck/typeChecker.js";

// Code generator
export { genProgram, PrettyOption, TsCodegenOptions, CodegenResult, PositionMapping } from "./codegen/tsCodegen.js";

// Events
export { EventSink, ArrayEventSink, CompilerEvent } from "./events/eventSink.js";

// Errors
export { CompilerError, isCompilerError } from "./errors/compilerError.js";

// API types and functions
export {
  CompilerConfig,
  CompilerContext,
  CompileResult,
  compilePhase0
} from "./api.js";

// CLI helper
export { runCli } from "./cliHelper.js";

// Utilities
export { GensymGenerator } from "./lib/gensym.js";
