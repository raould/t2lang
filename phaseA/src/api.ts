import { parseSource } from "./parse.js";
import { generateCode } from "./codegen.js";
import { serializeLazy, SerializedProgram, SerializedProgramThunk } from "./serialization.js";
import { createProcessor, Context, Program } from "./phaseA1.js";
import type { Diagnostic, Span } from "./phaseA1.js";
import { ArrayEventSink, CompilerEvent, CompilerStage, EventSeverity } from "./events.js";
import { PhaseACompilerContext } from "./compilerContext.js";

export type { Diagnostic, Span };

export interface CompilePhaseAConfig {
  prettyOption?: "pretty" | "ugly";
  emitTypes?: boolean;
  seed?: string;
  stamp?: string;
  logLevel?: EventSeverity;
  compilerContext?: PhaseACompilerContext;
  sourcePath?: string;
  dumpAst?: boolean;
  program?: Program;
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
  logLevel: "debug",
};

export async function compile(source: string, config: CompilePhaseAConfig = {}): Promise<CompilePhaseAResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const sourcePath = finalConfig.sourcePath ?? "input.t2";
  try {
    const providedContext = finalConfig.compilerContext;
    const stamp = providedContext?.stamp ?? finalConfig.stamp ?? `${Date.now()}`;
    const seed = providedContext?.seed ?? finalConfig.seed!;
    const logLevel = providedContext?.logLevel ?? finalConfig.logLevel ?? "debug";
    const defaultEvents = providedContext?.events ?? new ArrayEventSink();
    const compilerContext: PhaseACompilerContext = providedContext ?? {
      events: defaultEvents,
      seed,
      stamp,
      logLevel,
    };
    compilerContext.events = defaultEvents;
    compilerContext.seed = seed;
    compilerContext.stamp = stamp;
    compilerContext.logLevel = logLevel;
    const ctx: Context = { diagnostics: [], scopeStack: [], compilerContext };

    const snapshots: SnapshotRecord[] = [];

    const emitStage = async (stage: CompilerStage, program: Program): Promise<void> => {
      const lazyProgram = serializeLazy(program);
      const snapshot: SnapshotRecord = { stage, program: lazyProgram, seed: compilerContext.seed, stamp: compilerContext.stamp };
      snapshots.push(snapshot);
      await compilerContext.events.emit({
        phase: stage,
        kind: "snapshot",
        timestamp: Date.now(),
        seed: compilerContext.seed,
        stamp: compilerContext.stamp,
        severity: "info",
        data: snapshot,
      });
    };

    const emitTrace = async (stage: CompilerStage, event: "start" | "done"): Promise<void> => {
      await compilerContext.events.emit({
        phase: stage,
        kind: "trace",
        timestamp: Date.now(),
        seed: compilerContext.seed,
        stamp: compilerContext.stamp,
        severity: "debug",
        data: {
          stage,
          event,
          diagnostics: ctx.diagnostics.slice(),
        },
      });
    };

    await emitTrace("parse", "start");
    const parsedProgram = finalConfig.program ?? await parseSource(source, finalConfig.sourcePath ?? "input.t2");
    if (process.env.T2_DEBUG_PARSE === "1") {
      const nodeCount = parsedProgram.body.length;
      console.error(`[DEBUG] Parsed AST: nodeCount=${nodeCount}`);
    }
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
    const { tsSource, mappings } = await generateCode(resolvedProgram, {
      prettyOption: finalConfig.prettyOption,
      emitTypes: finalConfig.emitTypes,
    });
    if (process.env.T2_DEBUG_CODEGEN === "1") {
      console.error(`[DEBUG] Codegen output: size=${tsSource.length}`);
    }
    await emitStage("codegen", resolvedProgram);
    await emitTrace("codegen", "done");

    if (finalConfig.dumpAst !== false) {
      const parseSnapshot = snapshots.find((s) => s.stage === "parse");
      if (parseSnapshot) {
        await compilerContext.events.emit({
          phase: "parse",
          kind: "astDump",
          timestamp: Date.now(),
          seed: compilerContext.seed,
          stamp: compilerContext.stamp,
          severity: "info",
          data: { ast: await parseSnapshot.program() },
        });
      }
      const resolveSnapshot = snapshots.find((s) => s.stage === "resolve");
      if (resolveSnapshot) {
        await compilerContext.events.emit({
          phase: "resolve",
          kind: "resolveDump",
          timestamp: Date.now(),
          seed: compilerContext.seed,
          stamp: compilerContext.stamp,
          severity: "info",
          data: { ast: await resolveSnapshot.program() },
        });
      }
    }

    return {
      tsSource,
      mappings,
      diagnostics: ctx.diagnostics,
      snapshots,
      events: compilerContext.events.events,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const diagnostic: Diagnostic = {
      message: `T2A:Unhandled error: ${message}`,
      span: { start: 0, end: 0, source: sourcePath },
      stage: "parse",
    };
    return {
      tsSource: "",
      mappings: [],
      diagnostics: [diagnostic],
      snapshots: [],
      events: [],
    };
  }
}

export async function evaluateSnapshot(snapshot: SnapshotRecord): Promise<SerializedProgram> {
  return snapshot.program();
}