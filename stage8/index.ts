import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage8Lexer } from "./Stage8Lexer";
import { Stage8Parser } from "./Stage8Parser";
import fs from "node:fs";
import { astTopLevel } from "./Stage8-ast";
import { lowerTopLevel } from "./Stage8-lower";
import { emitTopLevel } from "./Stage8-codegen";
import { makeMacroEnv } from "./Stage8-macro-env";
import { expandAll, formatExpansionErrors } from "./Stage8-macro-expand";
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
    let _expanded  = expandAll(programNode, macroEnv);
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
      let macroEnv  = makeMacroEnv();
      preludePaths.forEach((preludePath) => {
        processPrelude(preludePath, macroEnv);
      });
      {
        let _spans  = resetSpans(((filePath === "-") ? "<stdin>" : filePath));
        let programNode  = parseFile(filePath);
        let expandResult  = expandAll(programNode, macroEnv);
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
                  let loweredNode  = lowerTopLevel(resolvedNode);
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
