import { parseSource } from "./parse.js";
import { generateCode } from "./codegen.js";
import { serializeLazy, SerializedProgram, SerializedProgramThunk } from "./serialization.js";
import { createProcessor, Context, Diagnostic, Program } from "./phaseA1.js";
import { ArrayEventSink, CompilerEvent, CompilerStage } from "./events.js";

export interface CompilePhaseAConfig {
  prettyOption?: "pretty" | "ugly";
  emitTypes?: boolean;
  seed?: string;
  sourcePath?: string;
}

export interface SnapshotRecord {
  stage: CompilerStage;
  program: SerializedProgramThunk;
  seed: string;
  stamp: string;
}

export interface CompilePhaseAResult {
  tsSource: string;
  mappings: Array<{ generated: { line: number; column: number }; original: { line: number; column: number }; source: string }>;
  diagnostics: Diagnostic[];
  snapshots: SnapshotRecord[];
  events: CompilerEvent[];
}

const DEFAULT_CONFIG: CompilePhaseAConfig = {
  prettyOption: "pretty",
  emitTypes: false,
  seed: "default",
};

export async function compilePhaseA(source: string, config: CompilePhaseAConfig = {}): Promise<CompilePhaseAResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const seed = finalConfig.seed!;
  const stamp = `${Date.now()}`;

  const eventSink = new ArrayEventSink();
  const ctx: Context = { diagnostics: [], scopeStack: [] };

  const snapshots: SnapshotRecord[] = [];

  const emitStage = async (stage: CompilerStage, program: Program): Promise<void> => {
    const lazyProgram = serializeLazy(program);
    const snapshot: SnapshotRecord = { stage, program: lazyProgram, seed, stamp };
    snapshots.push(snapshot);
    await eventSink.emit({
      phase: stage,
      kind: "snapshot",
      timestamp: Date.now(),
      seed,
      stamp,
      data: snapshot,
    });
  };

  const emitTrace = async (stage: CompilerStage, event: "start" | "done"): Promise<void> => {
    await eventSink.emit({
      phase: stage,
      kind: "trace",
      timestamp: Date.now(),
      seed,
      stamp,
      data: { stage, event },
    });
  };

  await emitTrace("parse", "start");
  const parsedProgram = await parseSource(source, finalConfig.sourcePath ?? "input.t2");
  await emitStage("parse", parsedProgram);
  await emitTrace("parse", "done");

  const processor = await createProcessor(ctx);
  await emitTrace("resolve", "start");
  const { program: resolvedProgram } = await processor.run(parsedProgram);
  await emitStage("resolve", resolvedProgram);
  await emitTrace("resolve", "done");

  await emitTrace("typecheck", "start");
  await emitStage("typecheck", resolvedProgram);
  await emitTrace("typecheck", "done");

  await emitTrace("codegen", "start");
  const { tsSource, mappings } = await generateCode(resolvedProgram, finalConfig);
  await emitStage("codegen", resolvedProgram);
  await emitTrace("codegen", "done");

  return {
    tsSource,
    mappings,
    diagnostics: ctx.diagnostics,
    snapshots,
    events: eventSink.events,
  };
}

export async function evaluateSnapshot(snapshot: SnapshotRecord): Promise<SerializedProgram> {
  return snapshot.program();
}