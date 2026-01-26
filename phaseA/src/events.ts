export type CompilerStage = "parse" | "resolve" | "typecheck" | "codegen";

export interface CompilerEvent {
  phase: CompilerStage;
  kind: "astDump" | "trace" | "codegen";
  timestamp: number;
  seed: string;
  stamp: string;
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
