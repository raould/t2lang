export type CompilerStage = "parse" | "resolve" | "typecheck" | "codegen";

export type EventSeverity = "debug" | "info" | "warn" | "error";

export const EVENT_SEVERITY_PRIORITY: Record<EventSeverity, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export function canEmitForLevel(level: EventSeverity, severity: EventSeverity): boolean {
  return EVENT_SEVERITY_PRIORITY[severity] >= EVENT_SEVERITY_PRIORITY[level];
}

export function isEventSeverity(value: string): value is EventSeverity {
  return value === "debug" || value === "info" || value === "warn" || value === "error";
}

export interface CompilerEvent {
  phase: CompilerStage;
  kind: "snapshot" | "trace" | "codegen";
  timestamp: number;
  seed: string;
  stamp: string;
  severity: EventSeverity;
  data: unknown;
}

export interface EventSink {
  emit(event: CompilerEvent): Promise<void>;
  readonly events: CompilerEvent[];
}

export class ArrayEventSink implements EventSink {
  public readonly events: CompilerEvent[] = [];

  public async emit(event: CompilerEvent): Promise<void> {
    this.events.push(event);
  }
}
