import assert from "node:assert";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const exampleInput = fileURLToPath(new URL("../../phaseA/examples/example_literals.t2", import.meta.url));
const exampleExpected = fs
  .readFileSync(fileURLToPath(new URL("../../phaseA/examples/example_literals.ts", import.meta.url)), "utf8")
  .trim();

test("phaseB CLI --dump-ast prints AST and still emits TypeScript", () => {
  const result = spawnSync(
    process.execPath,
    [cliPath, "--stdout", "--dump-ast", exampleInput],
    { encoding: "utf8" }
  );

  assert.strictEqual(result.status, 0, "CLI should exit successfully");
  assert.strictEqual(result.stderr?.includes("Parsed Phase B AST:"), true, "AST dump header expected");
  assert.strictEqual(result.stdout?.trim(), exampleExpected, "stdout should still contain the compiled TypeScript");
});

test("phaseB CLI --trace dumps Phase A snapshot ASTs", () => {
  const result = spawnSync(
    process.execPath,
    [cliPath, "--trace", "--stdout", exampleInput],
    { encoding: "utf8" }
  );

  assert.strictEqual(result.status, 0, "CLI should exit successfully");
  assert.strictEqual(result.stdout?.trim(), exampleExpected, "stdout should still contain the compiled TypeScript");
  assert.ok(result.stderr?.includes("[trace] parse snapshot AST"), "trace should include parse snapshot AST");
  assert.ok(result.stderr?.includes("snapshot AST"), "trace should include at least one AST dump");
});