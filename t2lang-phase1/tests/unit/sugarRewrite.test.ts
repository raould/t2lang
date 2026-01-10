import test from "node:test";
import assert from "node:assert";
import { rewriteSugar } from "../../src/parse/sugarRewrite.js";

test("dotted head rewrites to call+prop", () => {
    const src = `(a.b x)`;
    const out = rewriteSugar(src).trim();
    assert.ok(out.includes(`(call (prop a "b") x)`), `unexpected rewrite: ${out}`);
});

test("bracketed computed head rewrites to call+prop", () => {
    const src = `(obj["m"] 1 2)`;
    const out = rewriteSugar(src).trim();
    assert.ok(out.includes(`(call (prop obj "m") 1 2)`), `unexpected rewrite: ${out}`);
});
