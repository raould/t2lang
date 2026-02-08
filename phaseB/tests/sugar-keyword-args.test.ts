import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { helperMatchNode } from "./e2e_helpers.js";

test("function calls reject keyword-style arguments", () => {
  assert.throws(
    () => parsePhaseBRaw("(greet name: \"Bob\" formal: true)", "keyword-args.t2"),
    /keyword arguments are not supported/i
  );
});

test("function calls accept obj of keyword-style arguments", async () => {
    const source = `(program
      (let ((greet (lambda (args:any) (console.log args))))
        (greet { name: \"Bob\" formal: true })))
    `;
    await helperMatchNode(source, /Bob/, true);
});

test("call form rejects keyword-style arguments", () => {
  assert.throws(
    () => parsePhaseBRaw("(call greet name: \"Bob\")", "keyword-args-call.t2"),
    /keyword arguments are not supported/i
  );
});

test("call form accept obj of keyword-style arguments", async () => {
    const source = `(program
      (let ((greet (lambda (args:any) (console.log args))))
        (call greet { name: \"Bob\" formal: true })))
    `;
    await helperMatchNode(source, /Bob/, true);
});


