import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage5Lexer } from "./Stage5Lexer";
import { Stage5Parser } from "./Stage5Parser";
import fs from "node:fs";
import { astProgram } from "./Stage5-ast";
import { lowerProgram } from "./Stage5-lower";
import { emitProgram } from "./Stage5-codegen";
import { makeMacroEnv, collectMacros } from "./Stage5-macro-env";
import { expandAll, formatExpansionErrors } from "./Stage5-macro-expand";
import { resolveNames } from "./Stage5-scope-resolve";
import { resetSpans } from "./Stage5-spans";
let main  = () => {
  {
    let filePath  = process.argv[2];
    let input  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage5Lexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser  = new Stage5Parser(tokenStream);
    let tree  = parser.program();
    let _spans  = resetSpans(((filePath === "-") ? "<stdin>" : filePath));
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
