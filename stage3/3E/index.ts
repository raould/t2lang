import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage3ELexer } from "./Stage3ELexer";
import { Stage3EParser } from "./Stage3EParser";
import fs from "node:fs";
import { astProgram } from "./Stage3E-ast";
import { lowerProgram } from "./Stage3E-lower";
import { emitProgram } from "./Stage3E-codegen";
let main  = () => {
  {
    let filePath  = process.argv[2];
    let input  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage3ELexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser  = new Stage3EParser(tokenStream);
    let tree  = parser.program();
    let surfaceAst  = astProgram(tree);
    let canonicalAst  = lowerProgram(surfaceAst);
    console.log(emitProgram(canonicalAst));
  }
};
main();
