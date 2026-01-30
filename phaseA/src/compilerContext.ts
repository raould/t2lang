import { EventSink, CompilerEvent, CompilerStage, EventSeverity } from "./events.js";

export interface PhaseACompilerContext {
  events: EventSink;
  seed: string;
  stamp: string;
  cacheStamp?: string;
}

export async function emitPhaseATrace(
  ctx: PhaseACompilerContext | undefined,
  phase: CompilerStage,
  label: string,
  data?: unknown,
  severity: EventSeverity = "debug"
): Promise<void> {
  if (!ctx) {
    return;
  }
  await ctx.events.emit({
    phase,
    kind: "trace",
    timestamp: Date.now(),
    seed: ctx.seed,
    stamp: ctx.stamp,
    severity,
    data: { label, ...{ payload: data } },
  });
}
