import { Lexer } from '../dist/parse/lexer.js';
const src = `(program (defmacro mkchain (obj name) (quote (prop ~obj ~name))) (call (prop console "log") (mkchain console "error")))`;
const lexer = new Lexer('input.t2', src);
let t;
while ((t = lexer.nextToken()) && t.kind !== 'eof') {
    console.log(t);
}
console.log(lexer.nextToken());
