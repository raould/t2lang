import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage6Lexer } from "./Stage6Lexer";
import { Stage6Parser } from "./Stage6Parser";
import fs from "node:fs";
import { astTopLevel } from "./Stage6-ast";
import { lowerTopLevel } from "./Stage6-lower";
import { emitTopLevel } from "./Stage6-codegen";
import { makeMacroEnv, registerTopLevelNode } from "./Stage6-macro-env";
import { expandTopLevel, formatExpansionErrors } from "./Stage6-macro-expand";
import { resolveTopLevel, addBinding } from "./Stage6-scope-resolve";
import { resetSpans } from "./Stage6-spans";
const main  = () => {
  {
    let filePath  = process.argv[2];
    let input  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage6Lexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser  = new Stage6Parser(tokenStream);
    let tree  = parser.program();
    let _spans  = resetSpans(((filePath === "-") ? "<stdin>" : filePath));
    let macroEnv  = makeMacroEnv();
    {
      let chain  = [];
      tree.topLevel().forEach((ctx) => {
        {
          let surfaceNode  = astTopLevel(ctx);
          registerTopLevelNode(surfaceNode, macroEnv);
          {
            let expandedNode  = expandTopLevel(surfaceNode, macroEnv);
            if ((macroEnv.errors.length > 0)) {
              {
                console.error(formatExpansionErrors(macroEnv.errors));
                process.exit(1);
              }
            }
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
        }
      });
    }
  }
};
main();
