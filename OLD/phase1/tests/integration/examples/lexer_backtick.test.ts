import test from "node:test";
import assert from "node:assert";
import { Lexer } from "../../../src/parse/lexer.js";

test("backtick expands to (quote ...) in phase1", () => {
    // Phase1's lexer expands reader macro ` into a (quote ...) form, so the
    // first token returned is the synthesized '(' and the next token is the
    // identifier 'quote'. Use a small quoted form to validate the expansion.
    const src = "`(foo)";
    const lx = new Lexer("input.t2", src);

    const t1 = lx.nextToken();
    assert.strictEqual(t1.kind, "punct");
    assert.strictEqual(t1.value, "("); // synthesized open paren for (quote ...)

    const t2 = lx.nextToken();
    assert.strictEqual(t2.kind, "identifier");
    assert.strictEqual(t2.value, "quote");

    const t3 = lx.nextToken();
    assert.strictEqual(t3.kind, "punct");
    assert.strictEqual(t3.value, "(");

    const t4 = lx.nextToken();
    assert.strictEqual(t4.kind, "identifier");
    assert.strictEqual(t4.value, "foo");
});
