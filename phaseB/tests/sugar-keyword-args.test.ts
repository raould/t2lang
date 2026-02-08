import test from "node:test";
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";

test("function calls reject keyword-style arguments", () => {
  assert.throws(
    () => parsePhaseBRaw("(greet name: \"Bob\" formal: true)", "keyword-args.t2"),
    /keyword arguments are not supported/i
  );
});

test("call form rejects keyword-style arguments", () => {
  assert.throws(
    () => parsePhaseBRaw("(call greet name: \"Bob\")", "keyword-args-call.t2"),
    /keyword arguments are not supported/i
  );
});
