import { ArrayEventSink, EventSink } from "./events/eventSink.js";
import { Program } from "./ast/nodes.js";
import { Parser } from "./parse/parser.js";
import { rewriteSugarWithMap } from "./parse/sugarRewrite.js";
import { MacroExpander } from "./expand/macroExpander.js";
import { Resolver } from "./resolve/resolver.js";
import { TypeChecker } from "./typecheck/index.js";
import { genProgram, PrettyOption } from "./codegen/index.js";
import type { Phase0Program } from "./ast/nodes.js";
import { CompilerError, isCompilerError } from "./errors/compilerError.js";
import * as ts from 'typescript';

import type { CompilerConfig } from "phase0";

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
    prettyOutput: PrettyOption.pretty,
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
  const cfg = config as Partial<Record<string, unknown>>;
  if (typeof cfg['dumpAst'] !== 'undefined') {
    if (typeof cfg['dumpAstBeforeExpand'] === 'undefined') {
      fullConfig.dumpAstBeforeExpand = cfg['dumpAst'] as boolean;
    }
    if (typeof cfg['dumpAstAfterExpand'] === 'undefined') {
      fullConfig.dumpAstAfterExpand = cfg['dumpAst'] as boolean;
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
    const { text: rewritten, map: rewriteMap } = rewriteSugarWithMap(source);
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
      // Push errors but attempt to remap certain common messages back to
      // locations in the original `source` so messages reference the
      // user's input (not the rewritten sexpr string).
        for (const err of typeCheckResult.errors) {
        let mapped = err;
        if (typeof err.message === 'string' && err.message.includes('Constructors may not have return type annotations')) {
          // Prefer locating the constructor return-type directly in the
          // original source when possible (more robust for stdin input).
          try {
            const origReturnRegex = /:\s*([A-Za-z0-9_]+)/;
            const mOrigReturn = origReturnRegex.exec(source);
            if (mOrigReturn && typeof mOrigReturn.index === 'number') {
              const token = mOrigReturn[1];
              const tokenIndex = mOrigReturn.index + mOrigReturn[0].lastIndexOf(token);
              const tokenLen = token.length;
              const origStart = tokenIndex;
              const origEnd = origStart + tokenLen;
              const up = source.slice(0, origStart);
              const line = (up.match(/\n/g)?.length ?? 0) + 1;
              const lastNl = up.lastIndexOf('\n');
              const column = origStart - (lastNl === -1 ? 0 : lastNl + 1) + 1;
              mapped = { ...err, location: { file: 'input.t2', start: origStart, end: origEnd, line, column } } as any;
            } else {
              // Fallback: try tight mapping from rewritten text using the
              // rewriteMap (best-effort when original pattern not found).
              const ctorRegex = /\(method\s+"constructor"[\s\S]*?:\s*([A-Za-z0-9_]+)/;
              const mCtor = ctorRegex.exec(rewritten);
              if (mCtor && typeof mCtor.index === 'number') {
                const token = mCtor[1];
                const tokenRelIndex = mCtor.index + mCtor[0].lastIndexOf(token);
                const tokenLen = token.length;
                if (rewriteMap && tokenRelIndex >= 0 && tokenRelIndex < rewriteMap.length) {
                  const sliceEnd = Math.min(tokenRelIndex + tokenLen, rewriteMap.length);
                  const mappedChars: number[] = [];
                  for (let i = tokenRelIndex; i < sliceEnd; i++) {
                    const v = rewriteMap[i];
                    if (typeof v === 'number' && v >= 0) mappedChars.push(v);
                  }
                  const origStart = mappedChars.length > 0 ? Math.min(...mappedChars) : (rewriteMap[tokenRelIndex] ?? 0);
                  let origEnd = mappedChars.length > 0 ? Math.max(...mappedChars) + 1 : (origStart + tokenLen);
                  const up = source.slice(0, origStart);
                  const line = (up.match(/\n/g)?.length ?? 0) + 1;
                  const lastNl = up.lastIndexOf('\n');
                  const column = origStart - (lastNl === -1 ? 0 : lastNl + 1) + 1;
                  mapped = { ...err, location: { file: 'input.t2', start: origStart, end: origEnd, line, column } } as any;
                }
              }
            }
          } catch { /* fallthrough to general mapping below */ }
        }
        // If we couldn't map from original text, but we have a rewriteMap
        // and the error location points into the rewritten text, remap
        // using the char-level mapping produced earlier.
        // Only attempt to remap when we do NOT already have a location
        // that refers to the original `input.t2`. Avoid overwriting any
        // earlier mapping that deliberately targeted the original source.
        if ((!mapped.location || mapped.location.file !== 'input.t2') && rewriteMap && mapped.location && typeof mapped.location.start === 'number') {
          const rstart = mapped.location.start;
          const rend = mapped.location.end ?? rstart;
          if (rstart >= 0 && rstart < rewriteMap.length) {
            const sliceEnd = Math.min(rend, rewriteMap.length);
            const mappedChars: number[] = [];
            for (let i = rstart; i < sliceEnd; i++) {
              const v = rewriteMap[i];
              if (typeof v === 'number' && v >= 0) mappedChars.push(v);
            }
            const origStart = mappedChars.length > 0 ? Math.min(...mappedChars) : (rewriteMap[rstart] ?? 0);
            let origEnd = mappedChars.length > 0 ? Math.max(...mappedChars) + 1 : (origStart + (rend - rstart || 1));
            if (origEnd < origStart) origEnd = origStart;
            const up = source.slice(0, origStart);
            const line = (up.match(/\n/g)?.length ?? 0) + 1;
            const lastNl = up.lastIndexOf('\n');
            const column = origStart - (lastNl === -1 ? 0 : lastNl + 1) + 1;
            mapped = { ...mapped, location: { file: 'input.t2', start: origStart, end: origEnd, line, column } } as any;
          }
        }
        errors.push(mapped);
      }
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

    // If we have a char-level rewrite map, remap any t2 locations in the
    // codegen mappings back to the original `source` so downstream
    // diagnostics (e.g. TypeScript errors) reference the user's input.
    if (rewriteMap && Array.isArray(rewriteMap) && rewriteMap.length > 0 && Array.isArray(codegenResult.mappings)) {
      for (const m of codegenResult.mappings) {
        const loc = (m as any).t2Location;
        if (loc && loc.file === 'input.t2' && typeof loc.start === 'number') {
          const rstart = loc.start as number;
          const rend = typeof loc.end === 'number' ? loc.end as number : rstart;
          if (rstart >= 0 && rstart < rewriteMap.length) {
            const sliceEnd = Math.min(rend, rewriteMap.length);
            const mappedChars: number[] = [];
            for (let i = rstart; i < sliceEnd; i++) {
              const v = rewriteMap[i];
              if (typeof v === 'number' && v >= 0) mappedChars.push(v);
            }
            const origStart = mappedChars.length > 0 ? Math.min(...mappedChars) : (rewriteMap[Math.min(rstart, rewriteMap.length - 1)] ?? 0);
            let origEnd = mappedChars.length > 0 ? Math.max(...mappedChars) + 1 : (rewriteMap[rewriteMap.length - 1] ?? source.length);
            if (origEnd < origStart) origEnd = origStart;
            const up = source.slice(0, origStart);
            const line = (up.match(/\n/g)?.length ?? 0) + 1;
            const lastNl = up.lastIndexOf('\n');
            const column = origStart - (lastNl === -1 ? 0 : lastNl + 1) + 1;
            (m as any).t2Location = { file: 'input.t2', start: origStart, end: origEnd, line, column };
          }
        }
      }
    }

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
