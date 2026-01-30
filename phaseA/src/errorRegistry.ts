import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { EventSeverity } from "./events.js";

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
