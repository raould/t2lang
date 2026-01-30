export type CompilerStage = "parse" | "resolve" | "typecheck" | "codegen";

export type EventSeverity = "debug" | "info" | "warn" | "error";

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
