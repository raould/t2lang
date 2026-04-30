import { writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import * as ts from "typescript";
const _require  = createRequire(import.meta.url);
const { compileSource }  = _require("./stage10/index");
const { readerTransform }  = _require("./stage10/Stage9-reader");
const EVAL_FILE  = "__eval__.ts";
const MAX_OUTPUT  = 1024 * 1024;
const createEvalService  = function() {
  let currentSource  = "";
  let version  = 0;
  const host  = ({
    getScriptFileNames: function() {
      return [EVAL_FILE];
    },
    getScriptVersion: function() {
      return String(version);
    },
    getScriptSnapshot: function(sfn) {
      return ts.ScriptSnapshot.fromString(((sfn === EVAL_FILE) ? currentSource : (ts.sys.readFile(sfn) ?? "")));
    },
    getCurrentDirectory: function() {
      return process.cwd();
    },
    getCompilationSettings: function() {
      const settings  = ({
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        lib: ["lib.es2022.full.d.ts"],
        skipLibCheck: true
      });
      return settings;
    },
    getDefaultLibFileName: function(opts) {
      return ts.getDefaultLibFilePath(opts);
    },
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory
  });
  const svc  = ts.createLanguageService(host);
  return ({
    update: function(src) {
      currentSource = src;
      version += 1;
    },
    getDiagnostics: function() {
      return svc.getSemanticDiagnostics(EVAL_FILE);
    },
    emit: function() {
      return svc.getEmitOutput(EVAL_FILE);
    }
  });
};
const maybeTruncate  = function(s) {
  if ((s.length <= MAX_OUTPUT)) {
    return ({
      text: s,
      truncated: false
    });
  }
  return ({
    text: s.slice(0, MAX_OUTPUT),
    truncated: true
  });
};
const spawnAsync  = function(cmd, args, opts) {
  return new Promise(function(resolve) {
    const ac  = new AbortController();
    const timer  = setTimeout(function() {
      ac.abort();
    }, opts.timeout);
    if ((opts.signal && (!opts.signal.aborted))) {
      opts.signal.addEventListener("abort", function() {
        ac.abort();
      }, ({
        once: true
      }));
    }
    const child  = spawn(cmd, args, ({
      signal: ac.signal
    }));
    const outChunks  = [];
    const errChunks  = [];
    child.stdout.on("data", function(d) {
      outChunks.push(d);
    });
    child.stderr.on("data", function(d) {
      errChunks.push(d);
    });
    child.on("close", function(code) {
      clearTimeout(timer);
      resolve(({
        stdout: Buffer.concat(outChunks).toString("utf-8"),
        stderr: Buffer.concat(errChunks).toString("utf-8"),
        exitCode: (code ?? 1)
      }));
    });
    child.on("error", function(err) {
      clearTimeout(timer);
      const msg  = ((err.name === "AbortError") ? "execution timed out" : err.message);
      resolve(({
        stdout: "",
        stderr: msg,
        exitCode: 1
      }));
    });
  });
};
const scanToMatchingParen  = function(text, i) {
  let depth  = 0;
  let n  = text.length;
  while ((i < n)) {
    const ch  = text[i];
    if ((ch === "(")) {
      depth += 1;
    }
    if ((ch === ")")) {
      depth -= 1;
      if ((depth === 0)) {
        return i + 1;
      }
    }
    i += 1;
  }
  return i;
};
const extractTopLevelImports  = function(fileText) {
  const transformed  = readerTransform(fileText);
  const imports  = [];
  let depth  = 0;
  let i  = 0;
  const n  = transformed.length;
  while ((i < n)) {
    const ch  = transformed[i];
    if ((ch === "(")) {
      depth += 1;
      if ((depth === 2)) {
        const sub  = transformed.slice(i);
        if ((sub.startsWith("(import ") || sub.startsWith("(import-type "))) {
          const end  = scanToMatchingParen(transformed, i);
          imports.push(fileText.slice(i, end));
          i = end;
          depth -= 1;
          continue;
        }
      }
    }
    if ((ch === ")")) {
      depth -= 1;
    }
    i += 1;
  }
  return imports;
};
const extractModuleSpecifier  = function(form) {
  const m  = form.match(new RegExp("\"([^\"]+)\"\\s*\\)\\s*$"));
  if (m) {
    return m[1];
  }
  return null;
};
const injectImports  = function(source, imports) {
  if ((imports.length === 0)) {
    return source;
  }
  const existing  = new Set();
  const transformed  = readerTransform(source);
  let depth  = 0;
  let i  = 0;
  const n  = transformed.length;
  while ((i < n)) {
    const ch  = transformed[i];
    if ((ch === "(")) {
      depth += 1;
      if ((depth === 2)) {
        const sub  = transformed.slice(i);
        if ((sub.startsWith("(import ") || sub.startsWith("(import-type "))) {
          const end  = scanToMatchingParen(transformed, i);
          const form  = source.slice(i, end);
          const spec  = extractModuleSpecifier(form);
          if (spec) {
            existing.add(spec);
          }
          i = end;
          depth -= 1;
          continue;
        }
      }
    }
    if ((ch === ")")) {
      depth -= 1;
    }
    i += 1;
  }
  const toInject  = imports.filter(function(form) {
    const spec  = extractModuleSpecifier(form);
    return ((spec === null) || (!existing.has(spec)));
  });
  if ((toInject.length === 0)) {
    return source;
  }
  const insertAt  = 8;
  const injected  = toInject.join("\n");
  return (((source.slice(0, insertAt) + "\n") + injected) + source.slice(insertAt));
};
const handleT2Eval  = async function(evalService, signal, doc, params) {
  const text  = doc.getText(params.selection).trim();
  if ((text.length === 0)) {
    const emptyDiag  = [({
      message: "empty selection"
    })];
    return ({
      stdout: "",
      stderr: "",
      diagnostics: emptyDiag
    });
  }
  const trimmed  = text.trimStart();
  const wrapped  = ((trimmed.startsWith("(program ") || trimmed.startsWith("(program\n")) ? text : `(program\n${text}\n)`);
  const fileText  = doc.getText();
  const fileImports  = extractTopLevelImports(fileText);
  const source  = injectImports(wrapped, fileImports);
  let tsCode  = "";
  try {
    tsCode = compileSource(({
      source: source
    }));
  }
  catch (err) {
    const errDiag  = [({
      message: err.message
    })];
    const result  = ({
      stdout: "",
      stderr: "",
      diagnostics: errDiag
    });
    if ((params.mode === "verbose")) {
      result.finalT2 = source;
    }
    return result;
  }
  evalService.update(tsCode);
  const tsDiags  = evalService.getDiagnostics();
  if ((tsDiags.length > 0)) {
    const stderrMsg  = tsDiags.map(function(d) {
      return ts.flattenDiagnosticMessageText(d.messageText, "\n");
    }).join("\n");
    const result  = ({
      stdout: "",
      stderr: stderrMsg
    });
    if ((params.mode === "verbose")) {
      result.finalT2 = source;
      result.ts = tsCode;
    }
    return result;
  }
  const emitResult  = evalService.emit();
  if ((emitResult.emitSkipped || (emitResult.outputFiles.length === 0))) {
    return ({
      stdout: "",
      stderr: "emit failed",
      exitCode: 1
    });
  }
  const jsCode  = emitResult.outputFiles[0].text;
  const randSuffix  = Math.random().toString(36).slice(2);
  const jsPath  = join(tmpdir(), `t2eval-${randSuffix}.js`);
  try {
    writeFileSync(jsPath, jsCode, "utf-8");
    const runResult  = (await spawnAsync(process.execPath, [jsPath], ({
      timeout: 5000,
      signal: signal
    })));
    const out  = maybeTruncate(runResult.stdout);
    const result  = ({
      stdout: out.text,
      stderr: runResult.stderr
    });
    if (out.truncated) {
      result.truncated = true;
    }
    if ((params.mode === "verbose")) {
      result.finalT2 = source;
      result.ts = tsCode;
      result.js = jsCode;
    }
    return result;
  }
  finally {
    try {
      unlinkSync(jsPath);
    }
    catch (_) {
      undefined;
    }
  }
};
export { createEvalService, handleT2Eval };
