import { EventSink, CompilerEvent, CompilerStage, EventSeverity, canEmitForLevel } from "./events.js";

export interface PhaseACompilerContext {
  events: EventSink;
  seed: string;
  stamp: string;
  logLevel?: EventSeverity;
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
  const level = ctx.logLevel ?? "debug";
  if (!canEmitForLevel(level, severity)) {
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
