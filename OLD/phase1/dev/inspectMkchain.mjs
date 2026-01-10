import { Parser } from '../dist/parse/parser.js';
const src = `(program (defmacro mkchain (obj name) (quote (prop ~obj ~name))) (call (prop console "log") (mkchain console "error")))`;
const parser = new Parser('input.t2', src, null);
try {
    const program = parser.parseProgram();
    console.log(JSON.stringify(program, null, 2));
} catch (e) {
    console.error('PARSE ERROR:', e);
    // show parser tokens and index
    try {
        console.error('Current token index:', parser.base.index);
        console.error('Current token:', parser.base.current());
        console.error('Tokens around index:', parser.base.tokens.slice(Math.max(0, parser.base.index - 5), parser.base.index + 5));
    } catch {
        console.error('failed to introspect parser');
    }
}
