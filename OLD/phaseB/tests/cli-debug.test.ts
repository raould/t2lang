import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { compile } from "../../phaseA/dist/api.js";

const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const sampleSource = `
(program
  (return
    (object
      ("number" 42)
      ("string" "alpha")
      ("boolean" true)
      ("nullish" null))))
`;

function writeTempInput(contents: string): string {
  const tempPath = path.join(os.tmpdir(), `t2b-debug-${Date.now()}-${Math.floor(Math.random() * 100000)}`);
  fs.writeFileSync(tempPath, contents, "utf8");
  return tempPath;
}

function cleanup(filePath: string) {
  try {
    fs.unlinkSync(filePath);
  } catch {
    // ignore
  }
}

async function compileExpected(): Promise<string> {
  const result = await compile(sampleSource, { prettyOption: "ugly" });
  return result.tsSource.trim();
}

test("phaseB CLI --dump-ast prints AST and still emits TypeScript", async () => {
  const inputPath = writeTempInput(sampleSource);
  const expected = await compileExpected();
  try {
    const result = spawnSync(
      process.execPath,
      [cliPath, "--stdout", "--pretty-option", "ugly", "--dump-ast", inputPath],
      { encoding: "utf8" }
    );

    assert.strictEqual(result.status, 0, "CLI should exit successfully");
    assert.strictEqual(
      result.stderr?.includes("Normalized Phase A AST:"),
      true,
      "AST dump header expected"
    );
    assert.strictEqual(result.stdout?.trim(), expected, "stdout should still contain the compiled TypeScript");
  } finally {
    cleanup(inputPath);
  }
});

test("phaseB CLI --trace dumps Phase A snapshot ASTs", async () => {
  const inputPath = writeTempInput(sampleSource);
  const expected = await compileExpected();
  try {
    const result = spawnSync(
      process.execPath,
      [cliPath, "--trace", "--stdout", "--pretty-option", "ugly", inputPath],
      { encoding: "utf8" }
    );

    assert.strictEqual(result.status, 0, "CLI should exit successfully");
    assert.strictEqual(result.stdout?.trim(), expected, "stdout should still contain the compiled TypeScript");
    assert.ok(result.stderr?.includes("[trace] parse snapshot AST"), "trace should include parse snapshot AST");
    assert.ok(result.stderr?.includes("snapshot AST"), "trace should include at least one AST dump");
  } finally {
    cleanup(inputPath);
  }
});