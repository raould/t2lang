import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage9Lexer } from "./Stage9Lexer";
import { Stage9Parser } from "./Stage9Parser";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { astTopLevel, setAstDebugContext } from "./Stage9-ast";
import { sugarTopLevel } from "./Stage9-sugar";
import { lowerTopLevel } from "./Stage9-lower";
import { emitTopLevel, setImportContext } from "./Stage9-codegen";
import { makeMacroEnv, gensym } from "./Stage9-macro-env";
import { expandAll, evalMacroExpr, formatExpansionErrors } from "./Stage9-macro-expand";
import { resolveTopLevel, addBinding } from "./Stage9-scope-resolve";
import { resetSpans, formatSpan } from "./Stage9-spans";
import { readerTransform } from "./Stage9-reader";
import { makeDebugContext } from "./Stage9-debug";
const checkParenBalance  = (tokenStream, filePath) => {
  {
    tokenStream.fill();
    {
      let tokens  = tokenStream.tokens;
      let depth  = 0;
      let ok  = true;
      tokens.forEach((tok) => {
        if ((tok.type === Stage9Lexer.LPAREN)) {
          depth = (depth + 1);
        }
        if ((tok.type === Stage9Lexer.RPAREN)) {
          {
            depth = (depth - 1);
            if ((depth < 0)) {
              {
                ok = false;
                depth = 0;
              }
            }
          }
        }
      });
      if ((!ok)) {
        {
          console.error((filePath + ": unmatched closing parenthesis"));
          process.exit(1);
        }
      }
      if ((depth > 0)) {
        {
          console.error(((((filePath + ": ") + depth) + " unclosed parenthes") + ((depth === 1) ? "is" : "es")));
          process.exit(1);
        }
      }
    }
  }
};
const parseFile  = (filePath) => {
  {
    let rawInput  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let input  = readerTransform(rawInput);
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage9Lexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let _  = checkParenBalance(tokenStream, filePath);
    let parser  = new Stage9Parser(tokenStream);
    let tree  = parser.program();
    let rawBody  = tree.topLevel().map(astTopLevel);
    let body  = rawBody.map(sugarTopLevel);
    if ((parser.numberOfSyntaxErrors > 0)) {
      {
        console.error(((((filePath + ": ") + parser.numberOfSyntaxErrors) + " parse error") + ((parser.numberOfSyntaxErrors === 1) ? "" : "s")));
        process.exit(1);
      }
    }
    return ({
      tag: "program",
      text: tree.getText(),
      body: body
    });
  }
};
const _macroLoaderRef  = ({
  loader: null
});
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
      {
        console.error((("Errors in macro module " + filePath) + ":"));
        console.error(formatExpansionErrors(expandedResult.errors));
        process.exit(1);
      }
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
      {
        console.error(("error: macro-import @-path must include \"/\" after the scope name: " + relPath));
        process.exit(1);
      }
    }
    {
      let scope  = relPath.slice(1, slashIdx);
      let restPath  = relPath.slice((slashIdx + 1));
      let root  = _macroRoots.get(scope);
      if ((!root)) {
        {
          console.error((((("error: unknown macro scope \"@" + scope) + "\" in macro-import; pass --macro-root ") + scope) + "=<path>"));
          process.exit(1);
        }
      }
      return path.resolve(root, restPath);
    }
  }
};
const loadMacroModule  = (relPath, namespace, env) => {
  {
    let absPath  = ((relPath.startsWith(".") && env.sourceDir) ? path.resolve(env.sourceDir, relPath) : resolveMacroPath(relPath));
    if ((!fs.existsSync(absPath))) {
      {
        console.error(("Macro module not found: " + absPath));
        process.exit(1);
      }
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
          {
            console.error((("Errors in macro module " + absPath) + ":"));
            console.error(formatExpansionErrors(expandedResult.errors));
            process.exit(1);
          }
        }
        {
          let exports  = [];
          let reexports  = [];
          expandedResult.ast.body.forEach((node) => {
            if (((node.tag === "defmacro") || (node.tag === "macro-def"))) {
              childEnv.macros.set(node.name, ({
                name: node.name,
                params: node.params,
                rest: node.rest,
                body: node.body,
                scopeId: node.scopeId
              }));
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
                        {
                          childEnv.macros.set(macName, srcMap.get(macName));
                          reexports.push(macName);
                        }
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
          {
            console.error((formatSpan(node.id) + ": .t2m files may only contain macro definitions, #[macro-time] bindings, macro-import, macro-export, and macro-reexport"));
            process.exit(1);
          }
        }
      });
    }
    else {
      programNode.body.forEach((node) => {
        if (((node.tag === "macro-export") || (node.tag === "macro-reexport"))) {
          {
            console.error((formatSpan(node.id) + ": macro-export is not allowed in .t2 files; use a .t2m file to export macros"));
            process.exit(1);
          }
        }
      });
    }
  }
};
const main  = () => {
  {
    let rawArgv  = process.argv.slice(2);
    let dbg  = makeDebugContext(rawArgv);
    let argv  = rawArgv.filter((a) => {
      return (!a.startsWith("--debug"));
    });
    let _  = setAstDebugContext(dbg);
    let __  = process.on("exit", () => {
      dbg.flush();
    });
    let filePath  = "-";
    let rootDir  = null;
    let outDir  = null;
    let t2exts  = ["t2"];
    let t2mexts  = ["t2m"];
    let i  = 0;
    while ((i < argv.length)) {
      if ((argv[i] === "--macro-root")) {
        {
          i = (i + 1);
          if ((i < argv.length)) {
            {
              let arg  = argv[i];
              let eqIdx  = arg.indexOf("=");
              if ((eqIdx === -1)) {
                {
                  console.error(("error: --macro-root requires scope=path format, got: " + arg));
                  process.exit(1);
                }
              }
              {
                let scope  = arg.slice(0, eqIdx);
                let absRoot  = path.resolve(arg.slice((eqIdx + 1)));
                _macroRoots.set(scope, absRoot);
              }
            }
          }
          else {
            {
              console.error("error: --macro-root requires a scope=path argument");
              process.exit(1);
            }
          }
        }
      }
      else {
        if ((argv[i] === "--root-dir")) {
          {
            i = (i + 1);
            if ((i < argv.length)) {
              rootDir = argv[i];
            }
            else {
              {
                console.error("error: --root-dir requires a directory argument");
                process.exit(1);
              }
            }
          }
        }
        else {
          if ((argv[i] === "--out-dir")) {
            {
              i = (i + 1);
              if ((i < argv.length)) {
                outDir = argv[i];
              }
              else {
                {
                  console.error("error: --out-dir requires a directory argument");
                  process.exit(1);
                }
              }
            }
          }
          else {
            if ((argv[i] === "--t2ext")) {
              {
                i = (i + 1);
                if ((i < argv.length)) {
                  t2exts.push(argv[i].replace(new RegExp("^\\\\."), ""));
                }
                else {
                  {
                    console.error("error: --t2ext requires an extension argument");
                    process.exit(1);
                  }
                }
              }
            }
            else {
              if ((argv[i] === "--t2mext")) {
                {
                  i = (i + 1);
                  if ((i < argv.length)) {
                    t2mexts.push(argv[i].replace(new RegExp("^\\\\."), ""));
                  }
                  else {
                    {
                      console.error("error: --t2mext requires an extension argument");
                      process.exit(1);
                    }
                  }
                }
              }
              else {
                filePath = argv[i];
              }
            }
          }
        }
      }
    }
    i = (i + 1);
  }
  if ((filePath !== "-")) {
    {
      if ((rootDir === null)) {
        rootDir = path.dirname(path.resolve(filePath));
      }
      rootDir = path.resolve(rootDir);
      if ((outDir === null)) {
        outDir = rootDir;
      }
      else {
        outDir = path.resolve(outDir);
      }
    }
  }
  setImportContext(filePath, rootDir, outDir);
  {
    let isMacroCompilation  = ((filePath !== "-") && t2mexts.some((ext) => {
      return filePath.endsWith(("." + ext));
    }));
    let macroEnv  = makeMacroEnv(isMacroCompilation);
    if ((filePath !== "-")) {
      macroEnv.sourceDir = path.dirname(path.resolve(filePath));
    }
    {
      let _spans  = resetSpans(((filePath === "-") ? "<stdin>" : filePath));
      let programNode  = parseFile(filePath);
      validateFileTypeConstraints(programNode, isMacroCompilation);
      {
        let expandResult  = expandAll(programNode, macroEnv, loadMacroModule, dbg);
        if ((macroEnv.errors.length > 0)) {
          {
            console.error(formatExpansionErrors(macroEnv.errors));
            process.exit(1);
          }
        }
        {
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
                  process.stdout.write((emittedStr + "\n"));
                }
              }
            }
            catch (e) {
              console.error(((("error at " + formatSpan((expandedNode.callSiteId || expandedNode.id))) + ": ") + e.message));
              process.exit(1);
            }
          });
        }
      }
    }
  }
};
