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

export class PhaseBError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly params?: ErrorParams
  ) {
    super(message);
    this.name = "PhaseBError";
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

export function reportError(code: string, params?: ErrorParams): PhaseBError {
  const definition = requireRegistryEntry(code);
  const message = interpolate(definition.message, params);
  return new PhaseBError(code, message, params);
}
