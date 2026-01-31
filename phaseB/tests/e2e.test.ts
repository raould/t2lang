import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import test from "node:test";

const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const exampleInput = fileURLToPath(new URL("../../phaseA/examples/example_literals.t2", import.meta.url));
const exampleExpected = fs.readFileSync(
  fileURLToPath(new URL("../../phaseA/examples/example_literals.ts", import.meta.url)),
  "utf8"
).trim();

test("phaseB CLI compiles a simple example end-to-end", () => {
  const result = spawnSync(process.execPath, [cliPath, "--stdout", exampleInput], {
    encoding: "utf8",
  });

  assert.strictEqual(result.error, undefined, "CLI failed to start");
  assert.strictEqual(
    result.status,
    0,
    `phaseB CLI exited with ${result.status ?? "unknown status"} stderr=${result.stderr ?? "<none>"}`
  );
  assert.strictEqual(result.stderr ?? "", "", "CLI should not write to stderr on success");
  assert.strictEqual(
    typeof result.stdout,
    "string",
    "CLI should emit TypeScript output to stdout"
  );
  assert.strictEqual(
    result.stdout!.trim(),
    exampleExpected,
    "generated TypeScript does not match example output"
  );
});