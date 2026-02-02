import { parseSource } from "./parse.js";
import { generateCode } from "./codegen.js";
import { serializeLazy, SerializedProgram, SerializedProgramThunk } from "./serialization.js";
import { createProcessor, Context, Diagnostic, Program } from "./phaseA1.js";
import { ArrayEventSink, CompilerEvent, CompilerStage, EventSeverity } from "./events.js";
import { PhaseACompilerContext } from "./compilerContext.js";

export interface CompilePhaseA0Config {
  prettyOption?: "pretty" | "ugly";
  emitTypes?: boolean;
  seed?: string;
  stamp?: string;
  logLevel?: EventSeverity;
  compilerContext?: PhaseACompilerContext;
  sourcePath?: string;
}

export interface CompilePhaseAConfig
  extends CompilePhaseA0Config {
  dumpAst?: boolean;
}

export interface SnapshotRecord {
  stage: CompilerStage;
  program: SerializedProgramThunk;
  seed: string;
  stamp: string;
}

export interface CompilePhaseA0Result {
  tsSource: string;
  mappings: Array<{ generated: { line: number; column: number }; original: { line: number; column: number }; source: string }>;
  diagnostics: Diagnostic[];
  snapshots: SnapshotRecord[];
  events: CompilerEvent[];
}

export interface CompilePhaseAResult {
  tsSource: string;
  errors: Diagnostic[];
  events: Array<{ kind: string; phase?: CompilerStage; data?: unknown }>;
}

const DEFAULT_CONFIG: CompilePhaseA0Config = {
  prettyOption: "pretty",
  emitTypes: false,
  seed: "default",
  logLevel: "debug",
};

export async function compilePhaseA0(source: string, config: CompilePhaseA0Config = {}): Promise<CompilePhaseA0Result> {
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
    const parsedProgram = await parseSource(source, finalConfig.sourcePath ?? "input.t2");
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

export async function compile(
  source: string,
  options: CompilePhaseAConfig = {}
): Promise<CompilePhaseAResult> {
  const result = await compilePhaseA0(source, options);

  const events: Array<{ kind: string; phase?: CompilerStage; data?: unknown }> = [];
  const parseSnapshot = result.snapshots.find((entry) => entry.stage === "parse");
  const resolveSnapshot = result.snapshots.find((entry) => entry.stage === "resolve");

  if (options.dumpAst !== false && parseSnapshot) {
    const ast = await parseSnapshot.program();
    events.push({ kind: "astDump", phase: "parse", data: { ast } });
  }

  if (resolveSnapshot) {
    const ast = await resolveSnapshot.program();
    events.push({ kind: "resolveDump", phase: "resolve", data: { ast } });
  }

  return {
    tsSource: result.tsSource,
    errors: result.diagnostics,
    events,
  };
}

export async function evaluateSnapshot(snapshot: SnapshotRecord): Promise<SerializedProgram> {
  return snapshot.program();
}