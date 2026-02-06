#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Command, CommanderError, Option } from "commander";
import { ParseError } from "./reader.js";
import type { ReaderErrorCode } from "./reader.js";
import type { SourceLoc } from "./location.js";
import { compile } from "./api.js";
import type {
  SnapshotRecord,
  Diagnostic as PhaseADiagnostic,
  Span as PhaseASpan,
} from "../../phaseA/dist/api.js";
import {
  DEFAULT_ERROR_FORMAT,
  Diagnostic,
  DiagnosticContext,
  ErrorFormat,
  diagnosticFromParseError,
  formatDiagnostics,
  parseErrorFormat,
} from "./diagnostics.js";
import {
  ArrayEventSink,
  canEmitForLevel,
  CompilerEvent,
  CompilerStage,
  EventSeverity,
  isEventSeverity,
} from "../../phaseA/dist/events.js";

const VALID_LOG_PHASES: CompilerStage[] = ["parse", "resolve", "typecheck", "codegen"];
const VALID_PRETTY_OPTIONS = ["pretty", "ugly"] as const;

type PrettyOption = (typeof VALID_PRETTY_OPTIONS)[number];

interface CliOptions {
  output?: string;
  stdout?: boolean;
  log?: boolean;
  logPhases?: string[];
  seed?: string;
  prettyOption?: PrettyOption;
  logLevel?: "debug" | "info" | "warn" | "error";
  trace?: boolean;
  tracePhases?: string[];
  dumpAst?: boolean;
  errorFormat?: string;
  color?: boolean;
  noColor?: boolean;
}

export async function main(argv: string[]): Promise<void> {
  const cmd = buildCommand();
  try {
    await cmd.parseAsync(argv);
  } catch (error) {
    if (error instanceof CommanderError) {
      const commanderError = error as CommanderError;
      if (commanderError.code !== "commander.helpDisplayed") {
        console.error(commanderError.message);
      }
      return;
    }
    throw error;
  }

  const options = cmd.opts<CliOptions>();
  const formatArg = options.errorFormat ?? DEFAULT_ERROR_FORMAT;
  const format = parseErrorFormat(formatArg);
  if (!format) {
    throw new CommanderError(1, "error-format", `Unknown error format '${formatArg}'`);
  }

  const useColor = options.noColor ? false : options.color ?? true;
  const inputPath = cmd.args[0];
  if (!inputPath) {
    console.error("Error: No input file specified (use '-' for stdin)");
    process.exitCode = 1;
    return;
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

  const { source, actualPath } = await readSource(inputPath);
  const isStdin = actualPath === "<stdin>";
  let writeStdout = Boolean(options.stdout) || isStdin;
  if (options.output === "-") {
    writeStdout = true;
  }

  const sourcePath = actualPath;
  const prettyOption = options.prettyOption ?? "pretty";
  const compilerStamp = await loadCompilerStamp();
  const seed = options.seed ?? "default";
  const compilerContext = {
    events: new ArrayEventSink(),
    seed,
    stamp: compilerStamp,
    logLevel,
  };

  const diagContext: DiagnosticContext = {
    sourceMap: { [sourcePath]: source },
    useColor,
  };

  let result: Awaited<ReturnType<typeof compile>>;
  try {
    result = await compile(source, {
      sourcePath,
      seed,
      prettyOption,
      logLevel,
      compilerContext,
    });
  } catch (error) {
    handleParserFailure(error, format, {
      sourceMap: { [actualPath]: source },
      useColor,
    });
    return;
  }

  if (options.dumpAst) {
    console.error("Normalized Phase A AST:");
    console.error(JSON.stringify(result.phaseAProgram, stringifyFilter, 2));
  }

  const normalizedDiagnostics = normalizePhaseADiagnostics(result.diagnostics);
  if (normalizedDiagnostics.length > 0) {
    console.error("Compilation produced diagnostics:");
    console.error(formatDiagnostics(normalizedDiagnostics, format, diagContext));
    process.exitCode = 1;
    return;
  }

  const target = options.output ?? (isStdin ? "stdout.ts" : getDefaultOutput(inputPath));
  if (writeStdout) {
    console.log(result.tsSource);
  } else {
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, result.tsSource, "utf8");
    console.error(`Compiled ${inputPath} -> ${target}`);
  }

  for (const event of result.events) {
    logEvent(event, logPhases, logLevel);
    await logTraceEvent(event, tracePhases, logLevel);
  }
}

function buildCommand(): Command {
  const cmd = new Command();
  cmd
    .name("t2b")
    .description("Phase B t2 compiler")
    .argument("<input>", "Input .t2 file path (use '-' for stdin)")
    .option("-o, --output <path>", "Output file path")
    .option("--stdout", "Write output to stdout")
    .option("--seed <seed>", "Deterministic seed value", "default")
    .addOption(new Option("--pretty-option <style>", "Format output").default("pretty").choices([...VALID_PRETTY_OPTIONS]))
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
    .option("--dump-ast", "Print the Phase A AST (after sugar/macro expansion)", false)
    .option("--error-format <format>", "Choose diagnostic output (tty, short, json)", DEFAULT_ERROR_FORMAT)
    .option("--color", "Force colored diagnostic output")
    .option("--no-color", "Disable diagnostic coloring")
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

async function readSource(inputPath: string): Promise<{ source: string; actualPath: string }> {
  if (inputPath === "-") {
    const source = await readStdin();
    return { source, actualPath: "<stdin>" };
  }
  const resolved = path.resolve(inputPath);
  const source = await fs.readFile(resolved, "utf8");
  return { source, actualPath: resolved };
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

function handleParserFailure(error: unknown, format: ErrorFormat, context: DiagnosticContext): void {
  if (error instanceof ParseError) {
    const diag = diagnosticFromParseError(error);
    console.error(formatDiagnostics([diag], format, context));
    process.exitCode = 1;
    return;
  }
  throw error;
}

function getDefaultOutput(input: string): string {
  const parsed = path.parse(input);
  return path.join(parsed.dir, `${parsed.name}.ts`);
}

function normalizePhaseADiagnostics(diags: PhaseADiagnostic[]): Diagnostic[] {
  return diags.map((diag) => ({
    code: (diag.code as ReaderErrorCode) ?? "E001",
    level: "error",
    message: diag.message,
    loc: spanToSourceLoc(diag.span),
  }));
}

function spanToSourceLoc(span: PhaseASpan): SourceLoc {
  const line = span.startLine ?? 1;
  const column = span.startColumn ?? 1;
  const endLine = span.endLine ?? line;
  const endColumn = span.endColumn ?? column;
  return {
    file: span.source ?? "<unknown>",
    line,
    column,
    endLine,
    endColumn,
  };
}

function logEvent(event: CompilerEvent, phases: Set<string>, level: EventSeverity): void {
  if (!shouldEmitForPhase(phases, event.phase)) {
    return;
  }
  if (!shouldEmitForLevel(level, event.severity)) {
    return;
  }
  const timestamp = new Date(event.timestamp).toISOString();
  const payload = summarizeEventData(event);
  const diagSummary = summarizeEventDiagnostics(event);
  console.error(
    `[log] ${timestamp} ${event.phase} ${event.kind} seed=${event.seed} stamp=${event.stamp} ${payload}${diagSummary}`
  );
}

async function logTraceEvent(event: CompilerEvent, phases: Set<string>, level: EventSeverity): Promise<void> {
  if (!shouldEmitForPhase(phases, event.phase)) {
    return;
  }
  if (!shouldEmitForLevel(level, event.severity)) {
    return;
  }

  if (event.kind === "trace") {
    const timestamp = new Date(event.timestamp).toISOString();
    const payload = summarizeEventData(event);
    const diagSummary = summarizeEventDiagnostics(event);
    console.error(
      `[trace] ${timestamp} ${event.phase} seed=${event.seed} stamp=${event.stamp} ${payload}${diagSummary}`
    );
    return;
  }

  if (event.kind === "snapshot") {
    const snapshotData = event.data;
    if (!snapshotData || typeof snapshotData !== "object") {
      return;
    }
    const snapshot = snapshotData as SnapshotRecord;
    if (typeof snapshot.program !== "function") {
      return;
    }
    const stageLabel = snapshot.stage ?? event.phase;
    try {
      const program = await snapshot.program();
      console.error(`[trace] ${stageLabel} snapshot AST:`);
      console.error(JSON.stringify(program, stringifyFilter, 2));
    } catch (error) {
      console.error(`[trace] ${stageLabel} snapshot AST failed:`, error);
    }
  }
}

function summarizeEventData(event: CompilerEvent): string {
  if (!event.data) {
    return "(no data)";
  }
  switch (event.kind) {
    case "trace":
      if (typeof event.data === "object" && event.data !== null) {
        const trace = event.data as { stage?: string; event?: string };
        return `(trace ${trace.stage ?? "unknown"}:${trace.event ?? "unknown"})`;
      }
      return JSON.stringify(event.data, stringifyFilter);
    case "snapshot":
      if (typeof event.data === "object" && event.data !== null && "stage" in event.data) {
        return `(snapshot stage=${(event.data as { stage?: string }).stage ?? "unknown"})`;
      }
      return JSON.stringify(event.data, stringifyFilter);
    default:
      console.error("Unknown event kind, defaulting to json.", event.kind);
      return JSON.stringify(event.data, stringifyFilter);
  }
}

function summarizeEventDiagnostics(event: CompilerEvent): string {
  const diagnostics = extractEventDiagnostics(event.data);
  if (diagnostics.length === 0) {
    return "";
  }
  const messages = diagnostics
    .map((diag) => {
      if (typeof diag === "string") {
        return diag;
      }
      if (diag && typeof diag === "object" && "message" in diag && typeof (diag as { message?: unknown }).message === "string") {
        return (diag as { message: string }).message;
      }
      try {
        return JSON.stringify(diag);
      } catch {
        return String(diag);
      }
    })
    .filter(Boolean as unknown as (value: string) => boolean);
  if (messages.length === 0) {
    return "";
  }
  return ` diagnostics=[${messages.join("; ")}]`;
}

function extractEventDiagnostics(data: unknown): unknown[] {
  if (!data || typeof data !== "object") {
    return [];
  }
  const diagnostics = (data as { diagnostics?: unknown }).diagnostics;
  if (!Array.isArray(diagnostics)) {
    return [];
  }
  return diagnostics;
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

function shouldEmitForLevel(level: EventSeverity, severity: EventSeverity): boolean {
  const normalizedLevel = isEventSeverity(level) ? level : "info";
  return canEmitForLevel(normalizedLevel, severity);
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
