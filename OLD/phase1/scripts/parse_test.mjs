import { Parser } from '../dist/parse/parser.js';
import { ArrayEventSink } from '../dist/events/eventSink.js';
import { Lexer } from '../dist/parse/lexer.js';

const src = '(program (defmacro where (wb wl) `(let* (~@wl) ~wb)))';
console.log('Source:', src);

console.log('\n-- Phase1 Lexer tokens --');
const lx = new Lexer('input.t2', src);
let t;
while (true) {
    t = lx.nextToken();
    console.log(t);
    if (t.kind === 'eof') break;
}

console.log('\n-- Using Parser --');
try {
    const p = new Parser('input.t2', src, { config: {}, eventSink: new ArrayEventSink() });
    const ast = p.parseProgram();
    console.log('Parsed AST:', JSON.stringify(ast, null, 2));
} catch (e) {
    console.error('Parser Error:', e);
}
