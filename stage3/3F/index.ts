import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage3FLexer } from "./Stage3FLexer";
import { Stage3FParser } from "./Stage3FParser";
import fs from "node:fs";
import { astProgram } from "./Stage3F-ast";
import { lowerProgram } from "./Stage3F-lower";
import { emitProgram } from "./Stage3F-codegen";
let main  = () => {
  {
    let filePath  = process.argv[2];
    let input  = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream  = CharStream.fromString(input);
    let lexer  = new Stage3FLexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser  = new Stage3FParser(tokenStream);
    let tree  = parser.program();
    let surfaceAst  = astProgram(tree);
    let canonicalAst  = lowerProgram(surfaceAst);
    console.log(emitProgram(canonicalAst));
  }
};
main();
