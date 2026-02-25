import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage4Lexer } from "./Stage4Lexer";
import { Stage4Parser } from "./Stage4Parser";
import fs from "node:fs";
import { astProgram } from "./Stage4-ast";
import { lowerProgram } from "./Stage4-lower";
import { emitProgram } from "./Stage4-codegen";
import { makeMacroEnv, collectMacros } from "./Stage4-macro-env";
import { expandAll, formatExpansionErrors } from "./Stage4-macro-expand";
import { resolveNames } from "./Stage4-scope-resolve";
let main  = () => {
  {
    let filePath  = process.argv[2];
    let input  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage4Lexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser  = new Stage4Parser(tokenStream);
    let tree  = parser.program();
    let surfaceAst  = astProgram(tree);
    let macroEnv  = makeMacroEnv();
    let _  = collectMacros(surfaceAst, macroEnv);
    let expandResult  = expandAll(surfaceAst, macroEnv);
    let expandErrors  = expandResult.errors;
    if ((expandErrors.length > 0)) {
      {
        console.error(formatExpansionErrors(expandErrors));
        process.exit(1);
      }
    }
    {
      let expandedAst  = expandResult.ast;
      let resolvedAst  = resolveNames(expandedAst).ast;
      let canonicalAst  = lowerProgram(resolvedAst);
      console.log(emitProgram(canonicalAst));
    }
  }
};
main();
