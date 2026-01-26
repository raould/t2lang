import { Lexer } from '../dist/parse/lexer.js';
const src = '(program (defmacro where (wb wl) `(let* (~@wl) ~wb)))';
const lex = new Lexer('input.t2', src);
let t;
while ((t = lex.nextToken())) {
    console.log(t);
    if (t.kind === 'eof') break;
}