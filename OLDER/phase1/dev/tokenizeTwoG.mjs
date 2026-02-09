import { Lexer } from '../dist/parse/lexer.js';
const src = `
(program
  (defmacro twoG () (let* ((a (gensym "x")) (b (gensym "x"))) (quote (array ~a ~b))))
  (call (prop console "log") (twoG)))
`;
const lex = new Lexer('input.t2', src);
let t;
while ((t = lex.nextToken())) {
    console.log(t);
    if (t.kind === 'eof') break;
}