import { Parser as BaseParser } from 't2lang-phase0';
const src = `(program (defmacro mkchain (obj name) (quote (prop ~obj ~name))) (call (prop console "log") (mkchain console "error")))`;
const parser = new BaseParser('input.t2', src, null);
console.log('Starting step parse... tokens:', parser.tokens.map(t => ({ k: t.kind, v: t.value, i: t.location.start })));
try {
    const a1 = parser.parseSexpr();
    console.log('Parsed sexpr1:', JSON.stringify(a1, null, 2));
    const a2 = parser.parseSexpr();
    console.log('Parsed sexpr2:', JSON.stringify(a2, null, 2));
} catch (e) {
    console.error('ERROR', e);
    console.error('Index now:', parser.index, 'current', parser.current());
}
