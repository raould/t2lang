// Stage10-debug.ts — hand-authored
// Debug context for the compiler pipeline.
// Implements the API specified in VERBOSITY.md.

export interface DebugContext {
  log_enter(stage: string, details?: Record<string, unknown>): void;
  log_leave(stage: string, details?: Record<string, unknown>): void;
  log_msg(stage: string, message: string): void;
  log_details(stage: string, details: Record<string, unknown>): void;
  flush(): void;
  isEnabled(stage: string): boolean;
}

// ---- Cycle-safe JSON serializer ----
// Replaces circular references with the sentinel "[circular]".
function safeStringify(value: unknown): string {
  const seen = new Set<unknown>();
  return JSON.stringify(value, (_key, val) => {
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) return "[circular]";
      seen.add(val);
    }
    return val;
  }, 2);
}

// ---- Active debug context ----
class ActiveDebugContext implements DebugContext {
  private entries: unknown[] = [];
  private enabledStages: Set<string> | null; // null = all stages enabled

  constructor(enabledStages: Set<string> | null) {
    this.enabledStages = enabledStages;
  }

  isEnabled(stage: string): boolean {
    return this.enabledStages === null || this.enabledStages.has(stage);
  }

  log_enter(stage: string, details?: Record<string, unknown>): void {
    if (!this.isEnabled(stage)) return;
    this.entries.push({ event: "enter", stage, ...(details ?? {}) });
  }

  log_leave(stage: string, details?: Record<string, unknown>): void {
    if (!this.isEnabled(stage)) return;
    this.entries.push({ event: "leave", stage, ...(details ?? {}) });
  }

  log_msg(stage: string, message: string): void {
    if (!this.isEnabled(stage)) return;
    this.entries.push({ event: "msg", stage, message });
  }

  log_details(stage: string, details: Record<string, unknown>): void {
    if (!this.isEnabled(stage)) return;
    this.entries.push({ event: "details", stage, details });
  }

  flush(): void {
    if (this.entries.length === 0) return;
    process.stderr.write(safeStringify(this.entries) + "\n");
  }
}

// ---- Null (no-op) debug context ----
// Used when --debug flags are absent; zero overhead.
class NullDebugContext implements DebugContext {
  isEnabled(_stage: string): boolean { return false; }
  log_enter(_stage: string, _details?: Record<string, unknown>): void {}
  log_leave(_stage: string, _details?: Record<string, unknown>): void {}
  log_msg(_stage: string, _message: string): void {}
  log_details(_stage: string, _details: Record<string, unknown>): void {}
  flush(): void {}
}

export const nullDebugContext: DebugContext = new NullDebugContext();

// ---- Factory ----
// Parses argv entries of the form "--debug" or "--debug-<stage>".
// Returns an active context if any debug flags are present, otherwise nullDebugContext.
export function makeDebugContext(argv: string[]): DebugContext {
  const enableAll = argv.includes("--debug");
  if (enableAll) {
    return new ActiveDebugContext(null);
  }
  const stages = new Set<string>();
  for (const arg of argv) {
    const m = arg.match(/^--debug-([a-z]+)$/);
    if (m) stages.add(m[1]);
  }
  if (stages.size > 0) {
    return new ActiveDebugContext(stages);
  }
  return nullDebugContext;
}

export function makeDebugContextFromOptions(opts: { debugAll?: boolean; debugStages?: string[] }): DebugContext {
  if (opts.debugAll) return new ActiveDebugContext(null);
  if (opts.debugStages && opts.debugStages.length > 0) return new ActiveDebugContext(new Set(opts.debugStages));
  return nullDebugContext;
}
