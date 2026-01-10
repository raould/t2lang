import { CharStream, CommonTokenStream } from "antlr4ng";
import { Stage3DLexer } from "./Stage3DLexer";
import { Stage3DParser } from "./Stage3DParser";
import fs from "node:fs";
import { astProgram } from "./Stage3D-ast";
import { lowerProgram } from "./Stage3D-lower";
import { emitProgram } from "./Stage3D-codegen";
let main = () => {
  {
    let filePath = process.argv[2];
    let input = fs.readFileSync(((filePath === "-") ? 0 : filePath), "utf-8");
    let inputStream = CharStream.fromString(input);
    let lexer = new Stage3DLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new Stage3DParser(tokenStream);
    let tree = parser.program();
    let surfaceAst = astProgram(tree);
    let canonicalAst = lowerProgram(surfaceAst);
    console.log(emitProgram(canonicalAst));
  }
};
main();
