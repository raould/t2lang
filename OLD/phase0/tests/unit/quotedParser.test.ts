import test from "node:test";
import assert from "node:assert";
import { attachQuotedParsers } from "../../src/lib/quotedParser.js";

// Minimal parser stub to test quoted parsing helpers
function makeStub(tokens: any[]) {
    let idx = 0;
    return {
        tokens,
        file: "input.t2",
        current() { return this.tokens[idx]; },
        advance() { return this.tokens[idx++]; },
        error(msg: string, tok: any) { throw new Error(msg + " @ " + JSON.stringify(tok)); },
        parseAtom() { const t = this.current(); this.advance(); if (t.kind === 'number') return { kind: 'literal', value: t.value, location: t.location }; if (t.kind === 'identifier') return { kind: 'identifier', name: t.value, location: t.location }; return null; },
        parseSexpr() { // for simplicity, parse atoms or nested quoted lists
            return this.parseAtom();
        }
    };
}

const loc = { file: "input.t2", start: 0, end: 0, line: 1, column: 1 };

test("attachQuotedParsers parses simple quoted list", () => {
    // tokens for (quote (array 1 2)) -> '(', 'quote', '(', 'array', 1, 2, ')', ')'
    const tokens = [
        { kind: 'punct', value: '(', location: loc },
        { kind: 'identifier', value: 'quote', location: loc },
        { kind: 'punct', value: '(', location: loc },
        { kind: 'identifier', value: 'array', location: loc },
        { kind: 'number', value: 1, location: loc },
        { kind: 'number', value: 2, location: loc },
        { kind: 'punct', value: ')', location: loc },
        { kind: 'punct', value: ')', location: loc },
        { kind: 'eof', value: null, location: loc }
    ];
    const stub = makeStub(tokens);
    attachQuotedParsers(stub as any);

    // Simulate calling parseQuote when current token is 'quote'
    // Advance once to move past '(' then call parseQuote with the open token
    const open = stub.advance(); // (
    // next token is 'quote'
    stub.advance(); // consume 'quote' as parseImplicitCall would
    const quoted = (stub as any).parseQuote(open);
    assert.strictEqual(quoted.kind, 'quote');
    assert.strictEqual(quoted.expr.kind, 'call');
    const call = quoted.expr;
    assert.strictEqual(call.callee.name, 'array');
    assert.strictEqual(call.args.length, 2);
});
