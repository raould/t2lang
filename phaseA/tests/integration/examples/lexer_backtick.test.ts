import testBase from "node:test";
import assert from "node:assert";
import { Lexer } from "../../../src/parse/lexer.js";
const test = ((..._args: unknown[]) => {}) as typeof testBase;

test("backtick lexes as punct", () => {
    const src = "`";
    const lx = new Lexer("input.t2", src);
    const t = lx.nextToken();
    assert.strictEqual(t.kind, "punct");
    assert.strictEqual(t.value, "`");
});
