import { Parser } from '../dist/parse/parser.js';
const src = '(program (defmacro noop ()) (noop))';
const parser = new Parser('input.t2', src, null);
try {
    const program = parser.parseProgram();
    console.log(JSON.stringify(program, null, 2));
} catch (e) {
    console.error('PARSE ERROR:', e);
    // print current token index and token
    console.error('Current index:', parser.base.index);
    console.error('Current token:', parser.base.current());
    console.error('Tokens:', parser.base.tokens);
}
