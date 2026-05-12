import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage10Lexer } from "./Stage10Lexer";
import { Stage10Parser } from "./Stage10Parser";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { astTopLevel, setAstDebugContext } from "./Stage10-ast";
import { sugarTopLevel } from "./Stage10-sugar";
import { lowerTopLevel } from "./Stage10-lower";
import { emitTopLevel, setImportContext } from "./Stage10-codegen";
import { makeMacroEnv, gensym } from "./Stage10-macro-env";
import { expandAll, evalMacroExpr, formatExpansionErrors } from "./Stage10-macro-expand";
import { resolveTopLevel, addBinding } from "./Stage10-scope-resolve";
import { resetSpans, formatSpan } from "./Stage10-spans";
import { readerTransform } from "./Stage10-reader";
import { nullDebugContext } from "./Stage10-debug";
const checkParenBalance  = (tokenStream, filePath) => {
  tokenStream.fill();
  {
    let tokens  = tokenStream.tokens;
    let depth  = 0;
    let ok  = true;
    tokens.forEach((tok) => {
      if ((tok.type === Stage10Lexer.LPAREN)) {
        depth = (depth + 1);
      }
      if ((tok.type === Stage10Lexer.RPAREN)) {
        depth = (depth - 1);
        if ((depth < 0)) {
          ok = false;
          depth = 0;
        }
      }
    });
    if ((!ok)) {
      throw new Error((filePath + ": unmatched closing parenthesis"));
    }
    if ((depth > 0)) {
      throw new Error(((((filePath + ": ") + depth) + " unclosed parenthes") + ((depth === 1) ? "is" : "es")));
    }
  }
};
const parseFile  = (filePath, sourceText) => {
  {
    let rawInput  = (sourceText ? sourceText : fs.readFileSync(filePath, "utf-8"));
    let input  = readerTransform(rawInput);
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage10Lexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let _  = checkParenBalance(tokenStream, filePath);
    let parser  = new Stage10Parser(tokenStream);
    let tree  = parser.program();
    let rawBody  = tree.topLevel().map(astTopLevel);
    let body  = rawBody.map(sugarTopLevel);
    if ((parser.numberOfSyntaxErrors > 0)) {
      throw new Error(((((filePath + ": ") + parser.numberOfSyntaxErrors) + " parse error") + ((parser.numberOfSyntaxErrors === 1) ? "" : "s")));
    }
    return {
      tag: "program",
      text: tree.getText(),
      body: body
    };
  }
};
const _macroLoaderRef  = {
  loader: null
};
const _macroModuleCache  = new Map();
const _macroLoadingSet  = new Set();
const _macroRoots  = new Map();
const compileMacroModule  = (filePath) => {
  {
    let input  = fs.readFileSync(filePath, "utf-8");
    let _spans  = resetSpans(filePath);
    let programNode  = parseFile(filePath);
    let macroEnv  = makeMacroEnv(true);
    let expandedResult  = expandAll(programNode, macroEnv, _macroLoaderRef.loader);
    if ((expandedResult.errors.length > 0)) {
      throw new Error(((("Errors in macro module " + filePath) + ":\n") + formatExpansionErrors(expandedResult.errors)));
    }
    {
      let output  = [];
      let chain  = [];
      expandedResult.ast.body.forEach((expandedNode) => {
        {
          let resolvedNode  = resolveTopLevel(expandedNode, chain);
          if (((resolvedNode.tag === "let-decl") || (resolvedNode.tag === "const-decl"))) {
            chain = addBinding(chain, resolvedNode.name, new Set());
          }
          {
            let loweredNode  = lowerTopLevel(resolvedNode, true);
            let emittedStr  = emitTopLevel(loweredNode);
            output.push(emittedStr);
          }
        }
      });
      return output.join("\n");
    }
  }
};
const resolveMacroPath  = (relPath) => {
  if ((!relPath.startsWith("@"))) {
    return path.resolve(relPath);
  }
  {
    let slashIdx  = relPath.indexOf("/");
    if ((slashIdx === -1)) {
      throw new Error(("error: macro-import @-path must include \"/\" after the scope name: " + relPath));
    }
    {
      let scope  = relPath.slice(1, slashIdx);
      let restPath  = relPath.slice((slashIdx + 1));
      let root  = _macroRoots.get(scope);
      if ((!root)) {
        throw new Error((((("error: unknown macro scope \"@" + scope) + "\" in macro-import; pass --macro-root ") + scope) + "=<path>"));
      }
      return path.resolve(root, restPath);
    }
  }
};
const loadMacroModule  = (relPath, namespace, env) => {
  {
    let absPath  = ((relPath.startsWith(".") && env.sourceDir) ? path.resolve(env.sourceDir, relPath) : resolveMacroPath(relPath));
    if ((!fs.existsSync(absPath))) {
      throw new Error(("Macro module not found: " + absPath));
    }
    if (_macroModuleCache.has(absPath)) {
      {
        let cached  = _macroModuleCache.get(absPath);
        let exports  = cached._exports;
        let nsMap  = new Map();
        env.macroNamespaces.set(namespace, nsMap);
        exports.forEach((exportName) => {
          if (cached.macros.has(exportName)) {
            nsMap.set(exportName, cached.macros.get(exportName));
          }
        });
        cached.moduleVars.forEach((varVal, varKey) => {
          env.moduleVars.set(varKey, varVal);
        });
        return;
      }
    }
    {
      let _spans  = resetSpans(absPath);
      let programNode  = parseFile(absPath);
      let childEnv  = makeMacroEnv(true);
      childEnv.sourceDir = path.dirname(absPath);
      {
        let expandedResult  = expandAll(programNode, childEnv, loadMacroModule);
        if ((expandedResult.errors.length > 0)) {
          throw new Error(((("Errors in macro module " + absPath) + ":\n") + formatExpansionErrors(expandedResult.errors)));
        }
        {
          let exports  = [];
          let reexports  = [];
          expandedResult.ast.body.forEach((node) => {
            if (((node.tag === "defmacro") || (node.tag === "macro-def"))) {
              childEnv.macros.set(node.name, {
                name: node.name,
                params: node.params,
                rest: node.rest,
                body: node.body,
                scopeId: node.scopeId
              });
            }
            if (((node.tag === "const-decl") || (node.tag === "let-decl"))) {
              {
                let val  = evalMacroExpr(node.init, new Map(), childEnv);
                childEnv.moduleVars.set(node.name, val);
              }
            }
            if ((node.tag === "macro-time-fn-def")) {
              childEnv.moduleVars.set(node.name, node.init);
            }
            if ((node.tag === "macro-export")) {
              exports = node.specs;
            }
            if ((node.tag === "macro-reexport")) {
              {
                let srcNs  = node.namespace;
                let names  = node.names;
                let srcMap  = childEnv.macroNamespaces.get(srcNs);
                if (srcMap) {
                  {
                    let targetNames  = ((names.length === 0) ? Array.from(srcMap.keys()) : names);
                    targetNames.forEach((macName) => {
                      if (srcMap.has(macName)) {
                        childEnv.macros.set(macName, srcMap.get(macName));
                        reexports.push(macName);
                      }
                    });
                  }
                }
              }
            }
          });
          childEnv._exports = exports.concat(reexports);
          _macroModuleCache.set(absPath, childEnv);
          {
            let nsMap  = new Map();
            env.macroNamespaces.set(namespace, nsMap);
            childEnv._exports.forEach((exportName) => {
              if (childEnv.macros.has(exportName)) {
                nsMap.set(exportName, childEnv.macros.get(exportName));
              }
            });
            childEnv.moduleVars.forEach((varVal, varKey) => {
              env.moduleVars.set(varKey, varVal);
            });
          }
        }
      }
    }
  }
};
_macroLoaderRef.loader = loadMacroModule;
const validateFileTypeConstraints  = (programNode, isMacroCompilation) => {
  {
    let macroTags  = new Set(["defmacro", "macro-time-fn-def", "macro-import", "macro-export", "macro-reexport"]);
    if (isMacroCompilation) {
      programNode.body.forEach((node) => {
        if ((!macroTags.has(node.tag))) {
          throw new Error((formatSpan(node.id) + ": .t2m files may only contain macro definitions, #[macro-time] bindings, macro-import, macro-export, and macro-reexport"));
        }
      });
    }
    else {
      programNode.body.forEach((node) => {
        if (((node.tag === "macro-export") || (node.tag === "macro-reexport"))) {
          throw new Error((formatSpan(node.id) + ": macro-export is not allowed in .t2 files; use a .t2m file to export macros"));
        }
      });
    }
  }
};
const compileCore  = (filePath, source, config) => {
  {
    let rootDir  = config.rootDir;
    let outDir  = config.outDir;
    let t2exts  = (config.t2exts || ["t2"]);
    let t2mexts  = (config.t2mexts || ["t2m"]);
    let macroRoots  = config.macroRoots;
    let dbg  = (config.debug || nullDebugContext);
    setAstDebugContext(dbg);
    _macroRoots.clear();
    _macroModuleCache.clear();
    _macroLoadingSet.clear();
    if (macroRoots) {
      macroRoots.forEach((v, k) => {
        _macroRoots.set(k, v);
      });
    }
    if (filePath) {
      if ((rootDir === undefined)) {
        rootDir = path.dirname(filePath);
      }
      rootDir = path.resolve(rootDir);
      if ((outDir === undefined)) {
        outDir = rootDir;
      }
      else {
        outDir = path.resolve(outDir);
      }
    }
    setImportContext(filePath, rootDir, outDir);
    {
      let isMacroCompilation  = (filePath && t2mexts.some((ext) => {
        return filePath.endsWith(("." + ext));
      }));
      let macroEnv  = makeMacroEnv(isMacroCompilation);
      let displayName  = (filePath || "<stdin>");
      if (filePath) {
        macroEnv.sourceDir = path.dirname(filePath);
      }
      {
        let _spans  = resetSpans(displayName);
        let programNode  = parseFile(displayName, source);
        validateFileTypeConstraints(programNode, isMacroCompilation);
        {
          let expandResult  = expandAll(programNode, macroEnv, loadMacroModule, dbg);
          if ((macroEnv.errors.length > 0)) {
            throw new Error(formatExpansionErrors(macroEnv.errors));
          }
          {
            let output  = [];
            let chain  = [];
            expandResult.ast.body.forEach((expandedNode) => {
              try {
                {
                  let resolvedNode  = resolveTopLevel(expandedNode, chain);
                  if (((resolvedNode.tag === "let-decl") || (resolvedNode.tag === "const-decl"))) {
                    chain = addBinding(chain, resolvedNode.name, new Set());
                  }
                  {
                    let loweredNode  = lowerTopLevel(resolvedNode, isMacroCompilation);
                    let emittedStr  = emitTopLevel(loweredNode);
                    output.push(emittedStr);
                  }
                }
              }
              catch (e) {
                throw new Error(((("error at " + formatSpan((expandedNode.callSiteId || expandedNode.id))) + ": ") + e.message));
              }
            });
            return output.join("\n");
          }
        }
      }
    }
  }
};
const compile  = (config) => {
  {
    let filePath  = path.resolve(config.filePath);
    return compileCore(filePath, null, config);
  }
};
const compileSource  = (config) => {
  {
    let filePath  = (config.filePath ? path.resolve(config.filePath) : null);
    return compileCore(filePath, config.source, config);
  }
};
export { compile, compileSource };
