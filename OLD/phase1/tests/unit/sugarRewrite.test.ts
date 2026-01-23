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

test("single-binding let sugar with type and body", () => {
    const src = `(let x: number 42 (console.log x))`;
    const out = rewriteSugar(src).trim();
    assert.ok(out.includes(`(let* (((x number) 42)) (call (prop console "log") x))`), `unexpected rewrite: ${out}`);
});

test("single-binding const sugar without type", () => {
    const src = `(const y  "hi" (console.log y))`;
    const out = rewriteSugar(src).trim();
    assert.ok(out.includes(`(const* ((y "hi")) (call (prop console "log") y))`), `unexpected rewrite: ${out}`);
});

test("parenthesized dot-sigil field is converted to quoted name", () => {
    const src = `(class Person (.name: string ""))`;
    const out = rewriteSugar(src).trim();
    // expect the `(.name: string "")` to be preprocessed into `(field "name" ...)`
    assert.ok(out.includes(`(field "name"`), `unexpected rewrite: ${out}`);
});

test("assignment sugar with dotted target rewrites to assign+prop and preserves value", () => {
    const src = `(this.field := (+ 1 this.field))`;
    const out = rewriteSugar(src).trim();
    assert.strictEqual(out, `(assign (prop this "field") (+ 1 (prop this "field")))`);
});

test("assignment sugar with identifier target rewrites to assign", () => {
    const src = `(x := 42)`;
    const out = rewriteSugar(src).trim();
    assert.strictEqual(out, `(assign x 42)`);
});

test("invalid assignment target throws", () => {
    // target is a non-lvalue expression (list) — should error
    const src = `((+ 1) := 3)`;
    assert.throws(() => rewriteSugar(src), /invalid assignment target/);
});
