import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { compile } from "../src/api.ts";
import type { CompilePhaseBResult } from "../src/api.ts";

const require = createRequire(import.meta.url);
const ts = require("typescript") as typeof import("typescript");

const VIRTUAL_INPUT = "input.ts";
const VIRTUAL_LIB = "lib.d.ts";
const VIRTUAL_LIB_SOURCE = [
  "interface Array<T> {}",
  "interface Boolean {}",
  "interface CallableFunction {}",
  "interface Function {}",
  "interface IArguments {}",
  "interface NewableFunction {}",
  "interface Number {}",
  "interface Object {}",
  "interface RegExp {}",
  "interface String {}",
  "declare const console: { log: (...args: any[]) => void; };",
].join("\n");

function makeCompilerHost(tsSource: string): ts.CompilerHost {
  return {
    getSourceFile: (fileName, languageVersion) => {
      if (fileName === VIRTUAL_INPUT) {
        return ts.createSourceFile(fileName, tsSource, languageVersion, true);
      }
      if (fileName === VIRTUAL_LIB) {
        return ts.createSourceFile(fileName, VIRTUAL_LIB_SOURCE, languageVersion, true);
      }
      return undefined;
    },
    getDefaultLibFileName: () => VIRTUAL_LIB,
    writeFile: () => {},
    getCurrentDirectory: () => "",
    getCanonicalFileName: (fileName) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (fileName) => fileName === VIRTUAL_INPUT || fileName === VIRTUAL_LIB,
    readFile: (fileName) => {
      if (fileName === VIRTUAL_INPUT) {
        return tsSource;
      }
      if (fileName === VIRTUAL_LIB) {
        return VIRTUAL_LIB_SOURCE;
      }
      return undefined;
    },
    directoryExists: () => true,
    getDirectories: () => [],
  };
}

export async function runE2E_TSC(t2: string): Promise<[CompilePhaseBResult, string[]]> {
  const result = { ...(await compile(t2, { prettyOption: "pretty" })), errors: [] as unknown[] };
  if (result.errors.length > 0) { console.error(result.errors); }

  const host = makeCompilerHost(result.tsSource);
  const program = ts.createProgram({
    rootNames: [VIRTUAL_INPUT, VIRTUAL_LIB],
    options: {
      noEmit: true,
      strict: true,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      noLib: true,
    },
    host,
  });

  const diagnostics = ts.getPreEmitDiagnostics(program);
  const tscErrors = diagnostics.map((diag) => {
    const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
    return `TS${diag.code}: ${message}`;
  });

  const { errors, ...compileResult } = result;
  void errors;
  return [compileResult as CompilePhaseBResult, tscErrors];
}

export async function runE2E_NodeJS(
  t2: string
): Promise<[CompilePhaseBResult, string[], { stdout: string; stderr: string }]> {
  const result = { ...(await compile(t2, { prettyOption: "pretty" })), errors: [] as unknown[] };
  if (result.errors.length > 0) { console.error(result.errors); }

  const host = makeCompilerHost(result.tsSource);
  const options: ts.CompilerOptions = {
    noEmit: false,
    noEmitOnError: false,
    strict: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    noLib: true,
  };
  const program = ts.createProgram({
    rootNames: [VIRTUAL_INPUT, VIRTUAL_LIB],
    options,
    host,
  });

  const preDiagnostics = ts.getPreEmitDiagnostics(program);
  let emittedJs = "";
  const emitResult = program.emit(undefined, (fileName, data) => {
    if (fileName.endsWith(".js")) {
      emittedJs = data;
    }
  });
  const allDiagnostics = [...preDiagnostics, ...emitResult.diagnostics];
  const tscErrors = allDiagnostics.map((diag) => {
    const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
    return `TS${diag.code}: ${message}`;
  });

  const execResult = spawnSync(process.execPath, ["-e", emittedJs], { encoding: "utf8" });
  const stdout = execResult.stdout ?? "";
  const stderr = execResult.stderr ?? "";

  const { errors, ...compileResult } = result;
  void errors;
  return [compileResult as CompilePhaseBResult, tscErrors, { stdout, stderr }];
}
