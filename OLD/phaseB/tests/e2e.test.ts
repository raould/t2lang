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
  const tempPath = path.join(os.tmpdir(), `t2b-e2e-${Date.now()}-${Math.floor(Math.random() * 100000)}`);
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

async function compileWithPhaseA(source: string): Promise<string> {
  const result = await compile(source, { prettyOption: "ugly" });
  return result.tsSource.trim();
}

async function expectCliMatches(source: string): Promise<void> {
  const expected = await compileWithPhaseA(source);
  const inputPath = writeTempInput(source);
  try {
    const result = spawnSync(process.execPath, [cliPath, "--stdout", "--pretty-option", "ugly", inputPath], {
      encoding: "utf8",
    });

    assert.strictEqual(result.error, undefined, "CLI failed to start");
    assert.strictEqual(
      result.status,
      0,
      `phaseB CLI exited with ${result.status ?? "unknown status"} stderr=${result.stderr ?? "<none>"}`
    );
    assert.strictEqual(result.stderr ?? "", "", "CLI should not write to stderr on success");
    assert.strictEqual(typeof result.stdout, "string", "CLI should emit TypeScript output to stdout");
    assert.strictEqual(result.stdout!.trim(), expected, "generated TypeScript does not match compiled Phase A output");
  } finally {
    cleanup(inputPath);
  }
}

test("phaseB CLI compiles a simple example end-to-end", async () => {
  await expectCliMatches(sampleSource);
});

test("phaseB CLI preserves async callable flags end-to-end", async () => {
  const source = `
(program
  (fn async asyncCallable ((value))
    (return value)))
`;
  await expectCliMatches(source);
});

test("phaseB CLI preserves generator callable flags end-to-end", async () => {
  const source = `
(program
  (fn generator generatorCallable ((value))
    (return value)))
`;
  await expectCliMatches(source);
});