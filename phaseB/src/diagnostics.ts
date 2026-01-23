import { ParseError } from "./reader.js";
import type { ReaderErrorCode } from "./reader.js";
import type { ExpansionFrame, SourceLoc } from "./location.js";

export type DiagnosticLevel = "error" | "warning" | "note" | "help";

export interface DiagnosticNote {
  message: string;
  loc?: SourceLoc;
}

export interface Diagnostic {
  code: ReaderErrorCode;
  level: DiagnosticLevel;
  message: string;
  loc: SourceLoc;
  notes?: DiagnosticNote[];
  help?: string;
  expansionStack?: ExpansionFrame[];
}

export type ErrorFormat = "tty" | "short" | "json";
export const DEFAULT_ERROR_FORMAT: ErrorFormat = "tty";
const ERROR_FORMATS: ErrorFormat[] = ["tty", "short", "json"];

export interface DiagnosticContext {
  sourceMap?: Record<string, string>;
  useColor?: boolean;
}

export function parseErrorFormat(value: string): ErrorFormat | null {
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  return ERROR_FORMATS.find((format) => format === normalized) ?? null;
}

export function formatDiagnostics(
  diagnostics: Diagnostic[],
  format: ErrorFormat,
  context: DiagnosticContext = {}
): string {
  if (diagnostics.length === 0) {
    return "";
  }
  switch (format) {
    case "json":
      return formatJson(diagnostics);
    case "short":
      return formatShort(diagnostics);
    default:
      return formatTty(diagnostics, context);
  }
}

export function diagnosticFromParseError(error: ParseError): Diagnostic {
  return {
    code: error.code,
    level: "error",
    message: error.message,
    loc: error.loc,
    expansionStack: error.expansionStack,
  };
}

function formatJson(diagnostics: Diagnostic[]): string {
  const payload = {
    errors: diagnostics.map((diag) => diagToJson(diag)),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

function diagToJson(diag: Diagnostic): Record<string, unknown> {
  const json: Record<string, unknown> = {
    code: diag.code,
    level: diag.level,
    message: diag.message,
    file: diag.loc.file,
    line: diag.loc.line,
    column: diag.loc.column,
    endLine: diag.loc.endLine,
    endColumn: diag.loc.endColumn,
  };
  if (diag.notes?.length) {
    json.notes = diag.notes.map((note) => noteToJson(note));
  }
  if (diag.help) {
    json.help = diag.help;
  }
  if (diag.expansionStack?.length) {
    json.expansionStack = diag.expansionStack.map((frame) => ({
      macroName: frame.macroName,
      callSite: frame.callSite,
      macroDefSite: frame.macroDefSite,
    }));
  }
  return json;
}

function noteToJson(note: DiagnosticNote): Record<string, unknown> {
  return note.loc
    ? {
        message: note.message,
        file: note.loc.file,
        line: note.loc.line,
        column: note.loc.column,
      }
    : { message: note.message };
}

function formatShort(diagnostics: Diagnostic[]): string {
  const lines = diagnostics.map((diag) => {
    return `${diag.loc.file}:${diag.loc.line}:${diag.loc.column}: ${diag.level}[${diag.code}]: ${diag.message}`;
  });
  return `${lines.join("\n")}\n`;
}

function formatTty(diagnostics: Diagnostic[], context: DiagnosticContext): string {
  const rendered = diagnostics.map((diag) => formatTtyDiagnostic(diag, context));
  return `${rendered.join("\n\n")}\n`;
}

function formatTtyDiagnostic(diag: Diagnostic, context: DiagnosticContext): string {
  const useColor = context.useColor ?? true;
  const levelLabel = useColor ? `${RED}${diag.level}${RESET}` : diag.level;
  const lines: string[] = [];
  lines.push(`${levelLabel}[${diag.code}]: ${diag.message}`);
  lines.push(`  --> ${diag.loc.file}:${diag.loc.line}:${diag.loc.column}`);
  lines.push("   |");

  const snippet = renderSourceSnippet(diag, context);
  if (snippet) {
    lines.push(snippet);
  }

  if (diag.notes) {
    for (const note of diag.notes) {
      lines.push(...renderNote(note));
    }
  }

  if (diag.help) {
    lines.push(`   = help: ${diag.help}`);
  }

  if (diag.expansionStack) {
    for (const frame of diag.expansionStack) {
      lines.push(`   = note: in expansion of macro '${frame.macroName}'`);
      lines.push(
        `     --> ${frame.callSite.file}:${frame.callSite.line}:${frame.callSite.column}`
      );
    }
  }

  return lines.join("\n");
}

function renderNote(note: DiagnosticNote): string[] {
  if (note.loc) {
    return [
      `   = note: ${note.message}`,
      `     --> ${note.loc.file}:${note.loc.line}:${note.loc.column}`,
    ];
  }
  return [`   = note: ${note.message}`];
}

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function renderSourceSnippet(diag: Diagnostic, context: DiagnosticContext): string | null {
  const source = context.sourceMap?.[diag.loc.file];
  if (!source) {
    return null;
  }
  const lines = source.split(/\r?\n/);
  const lineIndex = diag.loc.line - 1;
  if (lineIndex < 0 || lineIndex >= lines.length) {
    return null;
  }
  const startLineText = lines[lineIndex];
  const endLineIndex = diag.loc.endLine - 1;
  const endLineText = endLineIndex >= 0 && endLineIndex < lines.length ? lines[endLineIndex] : "";
  const width = Math.max(diag.loc.line.toString().length, diag.loc.endLine.toString().length);

  if (diag.loc.line === diag.loc.endLine || !endLineText) {
    return renderLineSnippet(diag.loc.line, startLineText, diag.loc.column, diag.loc.endColumn, width);
  }

  const parts: string[] = [];
  parts.push(renderLineSnippet(diag.loc.line, startLineText, diag.loc.column, diag.loc.column, width));
  if (endLineIndex > lineIndex + 1) {
    parts.push(`${" ".repeat(width)} | ...`);
  }
  parts.push(renderLineSnippet(diag.loc.endLine, endLineText, 1, diag.loc.endColumn, width));
  return parts.join("\n");
}

function renderLineSnippet(
  lineNumber: number,
  text: string,
  startColumn: number,
  endColumn: number,
  width: number
): string {
  const safeStart = Math.max(0, startColumn - 1);
  const pointerLength = Math.max(1, endColumn - startColumn);
  const adjustedStart = Math.min(safeStart, text.length);
  const lineNumberText = lineNumber.toString().padStart(width, " ");
  const snippetLine = `${lineNumberText} | ${text}`;
  const pointerLine = `${" ".repeat(width)} | ${" ".repeat(adjustedStart)}${"^".repeat(
    Math.min(pointerLength, Math.max(1, text.length - adjustedStart))
  )}`;
  return `${snippetLine}\n${pointerLine}`;
}