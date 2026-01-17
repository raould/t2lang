import { Lexer as BaseLexer, Parser as BaseParser } from 't2lang-phase0';
const src = `(program (defmacro mkchain (obj name) (quote (prop ~obj ~name))) (call (prop console "log") (mkchain console "error")))`;
const baseLexer = new BaseLexer('input.t2', src);
const tokens = [];
let t;
while ((t = baseLexer.nextToken())) {
    tokens.push(t);
    if (t.kind === 'eof') break;
}
console.log('BaseLexer tokens:', tokens);
const parser = new BaseParser('input.t2', src, null);
const program = parser.parseProgram();
console.log('Phase0 AST:', JSON.stringify(program, null, 2));
