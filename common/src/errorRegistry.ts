import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export type EventSeverity = "debug" | "info" | "warn" | "error";

export interface ErrorRegistryEntry {
  message: string;
  category: string;
  severity: EventSeverity;
  docs?: string;
}

interface ErrorRegistry {
  errors: Record<string, ErrorRegistryEntry>;
}

const registryPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../errors/reg_errors.json");
const registry: ErrorRegistry = JSON.parse(readFileSync(registryPath, "utf8"));

export function getRegistryEntry(id: string): ErrorRegistryEntry | undefined {
  return registry.errors[id];
}

export function requireRegistryEntry(id: string): ErrorRegistryEntry {
  const entry = getRegistryEntry(id);
  if (!entry) {
    throw new Error(`Unknown diagnostic registry id '${id}'`);
  }
  return entry;
}

export type ErrorParams = Record<string, string | number | undefined>;

export interface SourceLoc {
  file: string;
  line: number;
  column: number;
  endLine: number;
  endColumn: number;
}

export interface ErrorInfo {
  loc?: SourceLoc;
  phase?: string;
  hint?: string;
  data?: Record<string, unknown>;
}

export class T2CompilationError extends Error { 
  constructor(
    public readonly code: string,
    message: string,
    public readonly params?: ErrorParams,
    public readonly info?: ErrorInfo
  ) {
    super(message);
    this.name = "T2CompilationError";
  }
}

function interpolate(template: string, params?: ErrorParams): string { // i am so sorry it happened like this.
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key];
    if (value === undefined || value === null) {
      return match;
    }
    return String(value);
  });
}

function isSourceLoc(value: unknown): value is SourceLoc {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as SourceLoc;
  return typeof candidate.file === "string"
    && typeof candidate.line === "number"
    && typeof candidate.column === "number"
    && typeof candidate.endLine === "number"
    && typeof candidate.endColumn === "number";
}

function isErrorInfo(value: unknown): value is ErrorInfo {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as ErrorInfo;
  return "loc" in candidate || "phase" in candidate || "hint" in candidate || "data" in candidate;
}

function normalizeErrorInfo(info?: ErrorInfo | SourceLoc): ErrorInfo | undefined {
  if (!info) {
    return undefined;
  }
  if (isSourceLoc(info)) {
    return { loc: info };
  }
  return info;
}

export function reportError(
  code: string,
  paramsOrInfo?: ErrorParams | ErrorInfo | SourceLoc,
  info?: ErrorInfo | SourceLoc
): T2CompilationError {
  const definition = requireRegistryEntry(code);
  let params: ErrorParams | undefined;
  let resolvedInfo = normalizeErrorInfo(info);
  if (paramsOrInfo) {
    if (isSourceLoc(paramsOrInfo) || isErrorInfo(paramsOrInfo)) {
      resolvedInfo = normalizeErrorInfo(paramsOrInfo) ?? resolvedInfo;
    } else {
      params = paramsOrInfo as ErrorParams;
    }
  }
  const message = interpolate(definition.message, params);
  return new T2CompilationError(code, message, params, resolvedInfo);
}
