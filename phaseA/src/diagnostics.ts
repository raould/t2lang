import type { Diagnostic } from "./phaseA0.js";

export type DiagnosticLevel = "error";
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

function formatJson(diagnostics: Diagnostic[]): string {
  const payload = { errors: diagnostics.map((diag) => diagToJson(diag)) };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

function diagToJson(diag: Diagnostic): Record<string, unknown> {
  const json: Record<string, unknown> = {
    message: diag.message,
    file: diag.span.source,
  };
  if (diag.code) {
    json.code = diag.code;
  }
  if (diag.stage) {
    json.stage = diag.stage;
  }
  if (diag.span.startLine != null) {
    json.line = diag.span.startLine;
  }
  if (diag.span.startColumn != null) {
    json.column = diag.span.startColumn;
  }
  if (diag.span.endLine != null) {
    json.endLine = diag.span.endLine;
  }
  if (diag.span.endColumn != null) {
    json.endColumn = diag.span.endColumn;
  }
  return json;
}

function formatShort(diagnostics: Diagnostic[]): string {
  const lines = diagnostics.map((diag) => {
    const code = diag.code ?? "unknown";
    const span = diag.span;
    const line = span.startLine ?? 0;
    const column = span.startColumn ?? 0;
    const stagePrefix = diag.stage ? `${diag.stage} ` : "";
    return `${span.source}:${line}:${column}: ${stagePrefix}error[${code}]: ${diag.message}`;
  });
  return `${lines.join("\n")}\n`;
}

function formatTty(diagnostics: Diagnostic[], context: DiagnosticContext): string {
  const rendered = diagnostics.map((diag) => formatTtyDiagnostic(diag, context));
  return `${rendered.join("\n\n")}\n`;
}

function formatTtyDiagnostic(diag: Diagnostic, context: DiagnosticContext): string {
  const useColor = context.useColor ?? true;
  const levelLabel = useColor ? `${RED}error${RESET}` : "error";
  const code = diag.code ?? "unknown";
  const span = diag.span;
  const line = span.startLine ?? 0;
  const column = span.startColumn ?? 0;
  const lines: string[] = [];
  lines.push(`${levelLabel}[${code}]: ${diag.message}`);
  lines.push(`  --> ${span.source}:${line}:${column}`);
  lines.push("   |");

  const snippet = renderSourceSnippet(diag, context);
  if (snippet) {
    lines.push(snippet);
  }

  if (diag.stage) {
    lines.push(`   = stage: ${diag.stage}`);
  }

  return lines.join("\n");
}

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function renderSourceSnippet(diag: Diagnostic, context: DiagnosticContext): string | null {
  const source = context.sourceMap?.[diag.span.source];
  if (!source) {
    return null;
  }
  const lines = source.split(/\r?\n/);
  const startLine = diag.span.startLine ?? 1;
  const lineIndex = startLine - 1;
  if (lineIndex < 0 || lineIndex >= lines.length) {
    return null;
  }
  const endLine = diag.span.endLine ?? startLine;
  const startLineText = lines[lineIndex];
  const endLineIndex = endLine - 1;
  const endLineText = endLineIndex >= 0 && endLineIndex < lines.length ? lines[endLineIndex] : "";
  const width = Math.max(startLine.toString().length, endLine.toString().length);

  const startColumn = diag.span.startColumn ?? 1;
  const endColumn = diag.span.endColumn ?? Math.max(startColumn + 1, startColumn);

  if (startLine === endLine || !endLineText) {
    return renderLineSnippet(startLine, startLineText, startColumn, endColumn, width);
  }

  const parts: string[] = [];
  parts.push(renderLineSnippet(startLine, startLineText, startColumn, startColumn, width));
  if (endLineIndex > lineIndex + 1) {
    parts.push(`${" ".repeat(width)} | ...`);
  }
  parts.push(renderLineSnippet(endLine, endLineText, 1, endColumn, width));
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
