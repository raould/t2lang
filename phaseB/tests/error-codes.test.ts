import assert from "node:assert";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const cliPath = fileURLToPath(new URL("../dist/cli.js", import.meta.url));
const fixturesDir = fileURLToPath(new URL("./fixtures/error-codes", import.meta.url));

type ErrorFixture = {
  code: string;
  fixture: string;
  message: string;
  line?: number;
  column?: number;
};

const ERROR_FIXTURES: ErrorFixture[] = [
  { code: "E001", fixture: "E001_unclosed_paren.t2", message: "unclosed '(' delimiter" },
  { code: "E002", fixture: "E002_unexpected_close.t2", message: "unexpected ')' encountered" },
  { code: "E004", fixture: "E004_unclosed_string.t2", message: "unclosed string literal" },
  { code: "E005", fixture: "E005_invalid_escape.t2", message: "invalid escape sequence '\\q'", column: 6 },
  { code: "E006", fixture: "E006_invalid_dotted.t2", message: "invalid dotted identifier" },
  { code: "E007", fixture: "E007_malformed_numeric.t2", message: "malformed numeric literal" },
];

for (const errorCase of ERROR_FIXTURES) {
  test(`phaseB CLI surfaces ${errorCase.code}`, () => {
    const fixturePath = path.join(fixturesDir, errorCase.fixture);
    const result = spawnSync(
      process.execPath,
      [cliPath, "--error-format", "short", "--no-color", fixturePath],
      { encoding: "utf8" }
    );

    assert.strictEqual(result.status, 1, "CLI should exit with failure for parse errors");
    const actual = result.stderr?.trim();
    const expected = `${fixturePath}:${errorCase.line ?? 1}:${errorCase.column ?? 1}: error[${errorCase.code}]: ${errorCase.message}`;
    assert.strictEqual(actual, expected);
    assert.strictEqual(result.stdout, "", "CLI should not emit any stdout on parse failure");
  });
}
