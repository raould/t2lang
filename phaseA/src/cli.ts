#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Command, CommanderError, Option } from "commander";
import { compilePhaseA } from "./api.js";
import { CompilerEvent, CompilerStage, EventSeverity, ArrayEventSink } from "./events.js";
import { PhaseACompilerContext } from "./compilerContext.js";

const VALID_LOG_PHASES: CompilerStage[] = ["parse", "resolve", "typecheck", "codegen"];

interface CliOptions {
  output?: string;
  stdout?: boolean;
  log?: boolean;
  logPhases?: string[];
  seed?: string;
  emitTypes?: boolean;
  prettyOption?: "pretty" | "ugly";
  ast?: boolean;
  astBeforeExpand?: boolean;
  astAfterExpand?: boolean;
  dumpSnapshots?: string;
  logLevel?: "debug" | "info" | "warn" | "error";
  trace?: boolean;
  tracePhases?: string[];
}

type SnapshotEntry = { stage: CompilerStage; program: () => Promise<unknown> };

function buildCommand(): Command {
  const cmd = new Command();
  cmd
    .name("t2tc")
    .description("Phase A t2 compiler")
    .argument("<input>", "Input .t2 file path (use '-' for stdin)")
    .option("-o, --output <path>", "Output file path")
    .option("--stdout", "Write output to stdout")
    .option("--seed <seed>", "Deterministic seed value", "default")
    .option("--emit-types", "Emit TypeScript type annotations", false) // TODO: implement
    .addOption( // TODO: implement
      new Option("--pretty-option <style>", "Pretty print output")
        .default("pretty")
        .choices(["pretty", "ugly"])
    )
    .option("--ast", "Print AST dumps before/after expansion", false)
    .option("--ast-before-expand", "Print AST before expand (alias of parse)", false)
    .option("--ast-after-expand", "Print AST after expand (alias of parse)", false)
    .option("--dump-snapshots <dir>", "Write JSON snapshots to a directory")
    .addOption(
      new Option("--log-level <level>", "Log verbosity")
      .default("info")
      .choices(["debug", "info", "warn", "error"])
    )
    .option("--log", "Show log events for every phase")
    .option(
      "--log-phases <phases>",
      "Comma-separated list of logged phases (parse, resolve, typecheck, codegen)",
      parsePhaseList,
      [] as string[]
    )
    .option("--trace", "Show trace events for every phase")
    .option(
      "--trace-phases <phases>",
      "Comma-separated list of traced phases (parse, resolve, typecheck, codegen)",
      parsePhaseList,
      [] as string[]
    )
    .allowUnknownOption(false);
  return cmd;
}

function parsePhaseList(value: string): string[] {
  const phases = value
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (phases.length === 0) {
    throw new CommanderError(1, "log-phases", "--log-phases requires at least one phase");
  }
  for (const phase of phases) {
    if (!VALID_LOG_PHASES.includes(phase as CompilerStage)) {
      throw new CommanderError(1, "log-phases", `Unknown log phase '${phase}'`);
    }
  }
  return phases;
}

async function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      buffer += chunk;
    });
    process.stdin.on("end", () => resolve(buffer));
    process.stdin.on("error", reject);
  });
}

async function readSource(source: string): Promise<string> {
  if (!source || source === "-") {
    return readStdin();
  }
  return fs.readFile(source, "utf8");
}

function getDefaultOutput(input: string): string {
  const parsed = path.parse(input);
  return path.join(parsed.dir, `${parsed.name}.ts`);
}

function formatDiagnostics(
  diags: Array<{
    message: string;
    span?: {
      source?: string;
      start?: number;
      end?: number;
      startLine?: number;
      startColumn?: number;
      endLine?: number;
      endColumn?: number;
    };
  }>
): void {
  for (const diag of diags) {
    if (diag.span && diag.span.source) {
      if (diag.span.startLine != null) {
        const column = diag.span.startColumn ?? 1;
        console.error(`${diag.span.source}:${diag.span.startLine}:${column}: ${diag.message}`);
      } else {
        console.error(`${diag.span.source}:${diag.span.start ?? 0}-${diag.span.end ?? 0}: ${diag.message}`);
      }
    } else {
      console.error(diag.message);
    }
  }
}

export async function main(argv: string[]): Promise<void> {
  const cmd = buildCommand();
  try {
    await cmd.parseAsync(argv);
  } catch (err) {
    if (err instanceof CommanderError) {
      if (err.code !== "commander.helpDisplayed") {
        console.error(err.message);
      }
      return;
    }
    throw err;
  }

  const options = cmd.opts<CliOptions>();
  const inputPath = cmd.args[0];
  if (!inputPath) {
    console.error("Error: No input file specified (use '-' for stdin)");
    process.exit(1);
  }

  const logPhases = new Set<string>(options.logPhases ?? []);
  if (options.log) {
    logPhases.add("all");
  }
  const logLevel = options.logLevel ?? "info";
  const tracePhases = new Set<string>(options.tracePhases ?? []);
  if (options.trace) {
    tracePhases.add("all");
  }

  const isStdin = inputPath === "-";
  let writeStdout = Boolean(options.stdout) || isStdin;
  if (options.output === "-") {
    writeStdout = true;
  }

  const source = await readSource(inputPath);
  const prettyOption = options.prettyOption ?? "pretty";
  const compilerSerializerStamp = await loadCompilerStamp();
  const seed = options.seed ?? "default";
  const compilerContext: PhaseACompilerContext = {
    events: new ArrayEventSink(),
    seed,
    stamp: compilerSerializerStamp,
  };
  const result = await compilePhaseA(source, {
    sourcePath: isStdin ? "stdin.t2" : inputPath,
    seed: options.seed,
    emitTypes: options.emitTypes,
    prettyOption,
    stamp: compilerSerializerStamp,
    compilerContext,
  });

  if (result.diagnostics.length > 0) {
    console.error("Compilation produced diagnostics:");
    formatDiagnostics(result.diagnostics);
    process.exit(1);
  }

  for (const event of result.events) {
    logEvent(event, logPhases, logLevel);
    logTraceEvent(event, tracePhases, logLevel);
  }

  const snapshotByStage = new Map<CompilerStage, SnapshotEntry>();
  for (const snapshot of result.snapshots) {
    snapshotByStage.set(snapshot.stage, snapshot);
  }

  const dumpAstBefore = Boolean(options.ast || options.astBeforeExpand);
  const dumpAstAfter = Boolean(options.ast || options.astAfterExpand);

  if (dumpAstBefore) {
    await printAstDump("AST before expand", "parse", snapshotByStage);
  }

  if (dumpAstAfter) {
    await printAstDump("AST after expand", "resolve", snapshotByStage);
  }

  if (options.dumpSnapshots) {
    await dumpSnapshots(options.dumpSnapshots, result.snapshots);
  }

  const outputSource = await formatWithPrettier(result.tsSource, prettyOption);

  if (writeStdout) {
    console.log(outputSource);
    return;
  }

  const target = options.output ?? (isStdin ? "output.ts" : getDefaultOutput(inputPath));
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, outputSource, "utf8");
  console.log(`Compiled ${inputPath} -> ${target}`);
}

async function dumpSnapshots(targetDir: string, snapshots: SnapshotEntry[]): Promise<void> {
  await fs.mkdir(targetDir, { recursive: true });
  for (const snapshot of snapshots) {
    const serialized = await snapshot.program();
    const filePath = path.join(targetDir, `${snapshot.stage}.json`);
    await fs.writeFile(filePath, JSON.stringify(serialized, null, 2), "utf8");
  }
}

async function printAstDump(title: string, stage: CompilerStage, snapshots: Map<CompilerStage, SnapshotEntry>): Promise<void> {
  const snapshot = snapshots.get(stage);
  if (!snapshot) {
    return;
  }
  const serialized = await snapshot.program();
  console.error(`--- ${title} (${stage}) ---`);
  console.error(JSON.stringify(serialized, null, 2));
  console.error(`--- END ${title} (${stage}) ---`);
}

function logEvent(event: CompilerEvent, logPhases: Set<string>, logLevel: string): void {
  if (!shouldEmitForPhase(logPhases, event.phase)) {
    return;
  }
  if (!shouldEmitForLevel(logLevel, event.severity)) {
    return;
  }
  const timestamp = new Date(event.timestamp).toISOString();
  const payload = summarizeEventData(event);
  console.error(
    `[log] ${timestamp} ${event.phase} ${event.kind} seed=${event.seed} stamp=${event.stamp} ${payload}`
  );
}

function logTraceEvent(event: CompilerEvent, tracePhases: Set<string>, logLevel: string): void {
  if (event.kind !== "trace") {
    return;
  }
  if (tracePhases.size === 0) {
    return;
  }
  if (!shouldEmitForPhase(tracePhases, event.phase)) {
    return;
  }
  if (!shouldEmitForLevel(logLevel, event.severity)) {
    return;
  }
  const timestamp = new Date(event.timestamp).toISOString();
  const payload = summarizeEventData(event);
  console.error(
    `[trace] ${timestamp} ${event.phase} seed=${event.seed} stamp=${event.stamp} ${payload}`
  );
}

function summarizeEventData(event: CompilerEvent): string {
  if (!event.data) {
    return "(no data)";
  }
  switch (event.kind) {
    case "trace": {
      if (typeof event.data === "object" && event.data !== null) {
        const trace = event.data as { stage?: string; event?: string };
        return `(trace ${trace.stage ?? "unknown"}:${trace.event ?? "unknown"})`;
      }
      return JSON.stringify(event.data, stringifyFilter);
    }
    case "snapshot": {
      if (typeof event.data === "object" && event.data !== null && "stage" in event.data) {
        return `(snapshot stage=${(event.data as { stage?: string }).stage ?? "unknown"})`;
      }
      return JSON.stringify(event.data, stringifyFilter);
    }
    default: {
      console.error("Unknown event kind, defaulting to json.", event.kind);
      return JSON.stringify(event.data, stringifyFilter);
    }
  }
}

function stringifyFilter(_key: string, value: unknown): unknown {
  if (typeof value === "function") {
    return "<thunk>";
  }
  return value;
}

function shouldEmitForPhase(phases: Set<string>, phase: CompilerStage): boolean {
  if (phases.size === 0) {
    return false;
  }
  if (phases.has("all")) {
    return true;
  }
  return phases.has(phase);
}

const SEVERITY_PRIORITY: Record<EventSeverity, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldEmitForLevel(level: string, severity: EventSeverity): boolean {
  const normalizedLevel = isSeverity(level) ? level : "info";
  return SEVERITY_PRIORITY[severity] >= SEVERITY_PRIORITY[normalizedLevel];
}

function isSeverity(value: string): value is EventSeverity {
  return value === "debug" || value === "info" || value === "warn" || value === "error";
}

async function formatWithPrettier(source: string, prettyOption: "pretty" | "ugly"): Promise<string> {
  if (prettyOption !== "pretty") {
    return source;
  }
  try {
    const module = await import("prettier");
    const formatFn = (module as { format?: (text: string, opts?: { parser: string }) => string | Promise<string> }).format
      ?? (module as { default?: { format?: (text: string, opts?: { parser: string }) => string | Promise<string> } }).default?.format;
    if (typeof formatFn === "function") {
      const formatted = await formatFn(source, { parser: "typescript" });
      if (typeof formatted === "string") {
        return formatted;
      }
    }
  } catch {
    // Prettier missing or failed; fall back to raw output.
  }
  return source;
}

async function loadCompilerStamp(): Promise<string> {
  const startPaths = [process.cwd(), path.dirname(fileURLToPath(import.meta.url))];
  for (const startPath of startPaths) {
    const found = await findFileAbove(startPath, ".internal_id");
    if (found) {
      const contents = (await fs.readFile(found, "utf8")).trim();
      if (contents) {
        return contents;
      }
      return `${Date.now()}`;
    }
  }
  return `${Date.now()}`;
}

async function findFileAbove(start: string, name: string): Promise<string | null> {
  let current = path.resolve(start);
  while (true) {
    const candidate = path.join(current, name);
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      const parent = path.dirname(current);
      if (parent === current) {
        return null;
      }
      current = parent;
    }
  }
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
