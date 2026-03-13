import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage8Lexer } from "./Stage8Lexer";
import { Stage8Parser } from "./Stage8Parser";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { astTopLevel } from "./Stage8-ast";
import { lowerTopLevel } from "./Stage8-lower";
import { emitTopLevel } from "./Stage8-codegen";
import { makeMacroEnv, gensym } from "./Stage8-macro-env";
import { expandAll, evalMacroExpr, formatExpansionErrors } from "./Stage8-macro-expand";
import { resolveTopLevel, addBinding } from "./Stage8-scope-resolve";
import { resetSpans, formatSpan } from "./Stage8-spans";
const parseFile  = (filePath) => {
  {
    let input  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage8Lexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser  = new Stage8Parser(tokenStream);
    let tree  = parser.program();
    let body  = tree.topLevel().map(astTopLevel);
    return ({
      tag: "program",
      text: tree.getText(),
      body: body
    });
  }
};
const _macroLoaderRef  = ({
  ":loader": null
});
const _macroModuleCache  = new Map();
const _macroLoadingSet  = new Set();
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
const loadMacroModule  = (relPath, namespace, env) => {
  {
    let absPath  = path.resolve(relPath);
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
          if ((node.tag === "macro-export")) {
            exports = node.specs;
          }
        });
        childEnv._exports = exports;
        _macroModuleCache.set(absPath, childEnv);
        {
          let nsMap  = new Map();
          env.macroNamespaces.set(namespace, nsMap);
          exports.forEach((exportName) => {
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
};
_macroLoaderRef.loader = loadMacroModule;
const processPrelude  = (preludePath, macroEnv) => {
  if ((!preludePath.endsWith(".t2"))) {
    {
      console.error(("error: prelude file must have .t2 extension: " + preludePath));
      process.exit(1);
    }
  }
  if ((!fs.existsSync(preludePath))) {
    {
      console.error(("error: prelude file not found: " + preludePath));
      process.exit(1);
    }
  }
  {
    let _spans  = resetSpans(preludePath);
    let programNode  = parseFile(preludePath);
    let _expanded  = expandAll(programNode, macroEnv, loadMacroModule);
    if ((macroEnv.errors.length > 0)) {
      {
        console.error((("error in macro prelude " + preludePath) + ":"));
        console.error(formatExpansionErrors(macroEnv.errors));
        process.exit(1);
      }
    }
  }
};
const main  = () => {
  {
    let argv  = process.argv.slice(2);
    let preludePaths  = [];
    let filePath  = "-";
    let i  = 0;
    while ((i < argv.length)) {
      if ((argv[i] === "--macro-prelude")) {
        {
          i = (i + 1);
          if ((i < argv.length)) {
            preludePaths.push(argv[i]);
          }
          else {
            {
              console.error("error: --macro-prelude requires a file path argument");
              process.exit(1);
            }
          }
        }
      }
      else {
        filePath = argv[i];
      }
      i = (i + 1);
    }
    {
      let isMacroCompilation  = ((filePath !== "-") && filePath.endsWith(".t2m"));
      let macroEnv  = makeMacroEnv(isMacroCompilation);
      preludePaths.forEach((preludePath) => {
        processPrelude(preludePath, macroEnv);
      });
      {
        let _spans  = resetSpans(((filePath === "-") ? "<stdin>" : filePath));
        let programNode  = parseFile(filePath);
        let expandResult  = expandAll(programNode, macroEnv, loadMacroModule);
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
main();
