import { SourceLocation } from "../ast/nodes.js";

export interface CompilerEvent {
  phase: "parse" | "expand" | "resolve" | "typeCheck" | "codegen" | "tsc";
  kind: string;
  location?: SourceLocation;
  data?: unknown;
}

export interface EventSink {
  emit(event: CompilerEvent): void;
}

export class ArrayEventSink implements EventSink {
  public readonly events: CompilerEvent[] = [];

  emit(event: CompilerEvent): void {
    this.events.push(event);
  }
}
