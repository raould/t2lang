import { Parser } from '../dist/parse/parser.js';

const src = '(program (defmacro where (wb wl) `(let* (~@wl) ~wb)))';
const parser = new Parser('input.t2', src, null);
const program = parser.parseProgram();
console.log(JSON.stringify(program, null, 2));
