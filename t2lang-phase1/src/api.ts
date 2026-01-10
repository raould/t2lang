import { ArrayEventSink, EventSink } from "./events/eventSink.js";
import { Program } from "./ast/nodes.js";
import { Parser } from "./parse/parser.js";
import { rewriteSugar } from "./parse/sugarRewrite.js";
import { MacroExpander } from "./expand/macroExpander.js";
import { Resolver } from "./resolve/resolver.js";
import { TypeChecker } from "./typecheck/index.js";
import { genProgram, PrettyOption } from "./codegen/index.js";
import type { Phase0Program } from "./ast/nodes.js";
import { CompilerError, isCompilerError } from "./errors/compilerError.js";
import * as ts from 'typescript';

import type { CompilerConfig } from "t2lang-phase0";

type LocalCompilerConfig = CompilerConfig & {
  dumpAstBeforeExpand?: boolean;
  dumpAstAfterExpand?: boolean;
};

export interface CompilerContext {
  config: CompilerConfig;
  eventSink: EventSink;
}

export interface CompileResult {
  tsSource: string;
  errors: CompilerError[];
  events: ArrayEventSink["events"];
}

export async function compilePhase1(
  source: string,
  config: Partial<CompilerConfig> = {}
): Promise<CompileResult> {
  const fullConfig: LocalCompilerConfig = {
    logLevel: "none",
    prettyOutput: PrettyOption.newlines,
    // Legacy single flag kept for convenience; Phase1 supports finer-grained
    // AST dumps before and after macro expansion.
    dumpAst: true,
    dumpAstBeforeExpand: true,
    dumpAstAfterExpand: true,
    seed: "default",
    tracePhases: [],
    emitTypes: false,
    enableTsc: false,
    runtimePropCallCheck: false,
    ...config
  };

  // If caller explicitly provided the legacy `dumpAst` flag, respect it
  // by default for both before/after dumps unless the caller supplied
  // the more specific flags.
  const cfgAny = config as any;
  if (typeof cfgAny.dumpAst !== 'undefined') {
    if (typeof cfgAny.dumpAstBeforeExpand === 'undefined') {
      fullConfig.dumpAstBeforeExpand = cfgAny.dumpAst;
    }
    if (typeof cfgAny.dumpAstAfterExpand === 'undefined') {
      fullConfig.dumpAstAfterExpand = cfgAny.dumpAst;
    }
  }

  const eventSink = new ArrayEventSink();
  const ctx: CompilerContext = { config: fullConfig, eventSink };

  const errors: CompilerError[] = [];
  let parsedAst: Program | null = null;
  let phase0Ast: Phase0Program;
  let tsSource = "";

  try {
    // Apply Phase1-only sugar rewrites before parsing Phase0 sexprs.
    const rewritten = rewriteSugar(source);
    const parser = new Parser("input.t2", rewritten, ctx);
    parsedAst = parser.parseProgram();

    // Debug hook: print parse AST
    if (process.env.T2_DEBUG_PARSE === "1") {
      const nodeCount = Array.isArray(parsedAst?.body) ? parsedAst!.body.length : 0;
      console.error(`[DEBUG] Parsed AST: nodeCount=${nodeCount}`);
    }

    if (fullConfig.dumpAstBeforeExpand || fullConfig.dumpAst) {
      ctx.eventSink.emit({
        phase: "parse",
        kind: "astDump",
        data: { ast: parsedAst }
      });
    }

    // Macro expansion phase - expands all macro calls
    const expander = new MacroExpander(ctx);
    phase0Ast = expander.expandProgram(parsedAst!)

    // Debug hook: print expanded AST
    if (process.env.T2_DEBUG_EXPAND === "1") {
      const nodeCount = Array.isArray(phase0Ast?.body) ? phase0Ast!.body.length : 0;
      console.error(`[DEBUG] Expanded AST: nodeCount=${nodeCount}`);
    }

    if (fullConfig.dumpAstAfterExpand || fullConfig.dumpAst) {
      ctx.eventSink.emit({
        phase: "expand",
        kind: "astDump",
        data: { ast: phase0Ast }
      });
    }

    const resolver = new Resolver(ctx);
    resolver.resolveProgram(phase0Ast);

    // Debug hook: print resolved AST
    if (process.env.T2_DEBUG_RESOLVE === "1") {
      const nodeCount = Array.isArray(phase0Ast?.body) ? phase0Ast!.body.length : 0;
      console.error(`[DEBUG] Resolved AST: nodeCount=${nodeCount}`);
    }

    const typeChecker = new TypeChecker(ctx);
    // phase0Ast is already typed as Phase0Program (normalized by the expander)
    const typeCheckResult = typeChecker.checkProgram(phase0Ast);

    // Debug hook: print type-checked AST and type table
    if (process.env.T2_DEBUG_TYPECHECK === "1") {
      const cnt = Array.isArray(phase0Ast?.body) ? phase0Ast!.body.length : 0;
      console.error(`[DEBUG] TypeCheck result: nodeCount=${cnt}, types=${typeCheckResult.typeTable.toJSON().length}`);
    }

    if (typeCheckResult.errors.length > 0) {
      errors.push(...typeCheckResult.errors);
    }

    const codegenResult = await genProgram(
      phase0Ast,
      {
        pretty: fullConfig.prettyOutput,
        emitTypes: fullConfig.emitTypes
        , runtimePropCallCheck: fullConfig.runtimePropCallCheck
      },
      typeCheckResult.typeTable
    );
    tsSource = codegenResult.tsSource;

    // Debug hook: print codegen output
    if (process.env.T2_DEBUG_CODEGEN === "1") {
      console.error("[DEBUG] Codegen output:\n" + tsSource);
    }

    if (fullConfig.enableTsc) {
      // Run TypeScript compiler for additional validation
      const compilerOptions: ts.CompilerOptions = {
        noEmit: true,
        strict: true,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        lib: ["es2020", "dom"]
      };

      const tsProgram = ts.createProgram({
        rootNames: ['input.ts'],
        options: compilerOptions,
        host: {
          getSourceFile: (fileName) => {
            if (fileName === 'input.ts') {
              return ts.createSourceFile(fileName, tsSource, ts.ScriptTarget.ES2020);
            }
            const text = ts.sys.readFile(fileName);
            if (text !== undefined && text !== null) {
              return ts.createSourceFile(fileName, text, ts.ScriptTarget.ES2020);
            }
            return undefined;
          },
          getDefaultLibFileName: (opts) => ts.getDefaultLibFileName(opts),
          writeFile: () => { },
          getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
          getCanonicalFileName: (fileName) => ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
          useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
          getNewLine: () => ts.sys.newLine,
          fileExists: (fileName) => fileName === 'input.ts' || ts.sys.fileExists(fileName),
          readFile: (fileName) => fileName === 'input.ts' ? tsSource : ts.sys.readFile(fileName),
        }
      });

      const tsDiagnostics = ts.getPreEmitDiagnostics(tsProgram);
      for (const diag of tsDiagnostics) {
        if (diag.file && diag.start !== undefined && diag.length !== undefined) {
          const tsStart = diag.start;
          const tsEnd = diag.start + diag.length;
          // Find the mapping that contains this position
          const mapping = codegenResult.mappings.find(m => m.tsStart <= tsStart && tsEnd <= m.tsEnd);
          const location = mapping ? mapping.t2Location : {
            file: 'input.t2',
            start: 0,
            end: 0,
            line: 1,
            column: 1
          };
          const message = ts.flattenDiagnosticMessageText(diag.messageText, '\n');
          errors.push({
            message: `TypeScript: ${message}`,
            location,
            phase: "tsc"
          });
        }
      }
    }
  } catch (err) {
    if (isCompilerError(err)) {
      errors.push(err);
    } else {
      throw err;
    }
  }

  const ret: CompileResult = {
    tsSource,
    errors,
    events: eventSink.events
  };
  return (ret);
}
