import { parseSource } from "./parse.js";
import { generateCode } from "./codegen.js";
import { serializeLazy, SerializedProgram, SerializedProgramThunk } from "./serialization.js";
import { createProcessor, Context, Diagnostic, Program } from "./phaseA1.js";
import { ArrayEventSink, CompilerEvent, CompilerStage } from "./events.js";

export interface CompilePhaseAConfig {
  prettyOption?: "pretty" | "ugly";
  emitTypes?: boolean;
  seed?: string;
}

export interface SnapshotRecord {
  stage: CompilerStage;
  program: SerializedProgramThunk;
  seed: string;
  stamp: string;
}

export interface CompilePhaseAResult {
  tsSource: string;
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
      kind: "astDump",
      timestamp: Date.now(),
      seed,
      stamp,
      data: snapshot,
    });
  };

  const parsedProgram = await parseSource(source);
  await emitStage("parse", parsedProgram);

  const processor = await createProcessor(ctx);
  const { program: resolvedProgram } = await processor.run(parsedProgram);
  await emitStage("resolve", resolvedProgram);

  await emitStage("typecheck", resolvedProgram);

  const { tsSource } = await generateCode(resolvedProgram, finalConfig);
  await emitStage("codegen", resolvedProgram);

  return {
    tsSource,
    diagnostics: ctx.diagnostics,
    snapshots,
    events: eventSink.events,
  };
}

export async function evaluateSnapshot(snapshot: SnapshotRecord): Promise<SerializedProgram> {
  return snapshot.program();
}