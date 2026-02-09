import { Lexer } from '../dist/parse/lexer.js';

const src = `(program (defmacro test-macro () (let* ((x (gensym "myvar"))) (quote ~x))) (test-macro))`;
const lexer = new Lexer('input.t2', src);
let t;
while ((t = lexer.nextToken()) && t.kind !== 'eof') {
    console.log(t);
}
console.log(lexer.nextToken());
