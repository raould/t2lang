import test from "node:test";
import assert from "node:assert";
import type { Diagnostic } from "../src/diagnostics.js";
import { formatDiagnostics, parseErrorFormat } from "../src/diagnostics.js";

test("parseErrorFormat accepts known formats", () => {
  assert.strictEqual(parseErrorFormat("tty"), "tty");
  assert.strictEqual(parseErrorFormat("JSON"), "json");
  assert.strictEqual(parseErrorFormat("short"), "short");
  assert.strictEqual(parseErrorFormat("unknown"), null);
});

test("formatDiagnostics produces detailed tty output", () => {
  const sourceText = "first line\n  (foo\n";
  const diag: Diagnostic = {
    code: "E001",
    level: "error",
    message: "unclosed '(' delimiter",
    loc: {
      file: "app.t2",
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 4,
    },
    notes: [
      {
        message: "list opened here",
        loc: {
          file: "app.t2",
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      },
    ],
    help: "add a closing parenthesis",
    expansionStack: [
      {
        macroName: "when",
        callSite: {
          file: "macros.t2",
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 6,
        },
        macroDefSite: {
          file: "macros.t2",
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
        },
      },
    ],
  };

  const output = formatDiagnostics(
    [diag],
    "tty",
    { sourceMap: { "app.t2": sourceText }, useColor: false }
  );

  const expected = [
    "error[E001]: unclosed '(' delimiter",
    "  --> app.t2:2:3",
    "   |",
    "2 |   (foo",
    "  |   ^",
    "   = note: list opened here",
    "     --> app.t2:1:1",
    "   = help: add a closing parenthesis",
    "   = note: in expansion of macro 'when'",
    "     --> macros.t2:4:1",
    "",
  ].join("\n");

  assert.strictEqual(output, expected);
});

test("formatDiagnostics tty applies colors when enabled", () => {
  const diag: Diagnostic = {
    code: "E004",
    level: "error",
    message: "unclosed string",
    loc: {
      file: "app.t2",
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 2,
    },
  };
  const output = formatDiagnostics([diag], "tty", { useColor: true });
  assert.ok(output.startsWith("\x1b[31merror\x1b[0m[E004]"));
});

test("formatDiagnostics json follows spec", () => {
  const diag: Diagnostic = {
    code: "E001",
    level: "error",
    message: "unclosed '(' delimiter",
    loc: {
      file: "app.t2",
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 4,
    },
  };

  const output = formatDiagnostics([diag], "json");
  const parsed = JSON.parse(output);
  assert.deepStrictEqual(parsed, {
    errors: [
      {
        code: "E001",
        level: "error",
        message: "unclosed '(' delimiter",
        file: "app.t2",
        line: 2,
        column: 3,
        endLine: 2,
        endColumn: 4,
      },
    ],
  });
});

test("formatDiagnostics short emits concise lines", () => {
  const diag: Diagnostic = {
    code: "E002",
    level: "error",
    message: "unexpected ')' encountered",
    loc: {
      file: "app.t2",
      line: 1,
      column: 5,
      endLine: 1,
      endColumn: 6,
    },
  };

  const output = formatDiagnostics([diag], "short");
  assert.strictEqual(output, "app.t2:1:5: error[E002]: unexpected ')' encountered\n");
});
