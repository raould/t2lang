#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Command, CommanderError } from "commander";
import { compilePhaseA } from "./api.js";
import { CompilerEvent, CompilerStage } from "./events.js";

const VALID_TRACE_PHASES: CompilerStage[] = ["parse", "resolve", "typecheck", "codegen"];

interface CliOptions {
  output?: string;
  stdout?: boolean;
  trace?: boolean;
  tracePhases?: string[];
}

function buildCommand(): Command {
  const cmd = new Command();
  cmd
    .name("t2tc")
    .description("Phase A t2 compiler")
    .argument("<input>", "Input .t2 file path (use '-' for stdin)")
    .option("-o, --output <path>", "Output file path")
    .option("--stdout", "Write output to stdout")
    .option("--trace", "Show trace events for every phase")
    .option(
      "--trace-phases <phases>",
      "Comma-separated list of trace phases (parse, resolve, typecheck, codegen)",
      parseTracePhaseList,
      [] as string[]
    )
    .allowUnknownOption(false);
  return cmd;
}

function parseTracePhaseList(value: string): string[] {
  const phases = value
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (phases.length === 0) {
    throw new CommanderError(1, "trace-phases", "--trace-phases requires at least one phase");
  }
  for (const phase of phases) {
    if (!VALID_TRACE_PHASES.includes(phase as CompilerStage)) {
      throw new CommanderError(1, "trace-phases", `Unknown trace phase '${phase}'`);
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
  const result = await compilePhaseA(source, { sourcePath: isStdin ? "stdin.t2" : inputPath });

  if (result.diagnostics.length > 0) {
    console.error("Compilation produced diagnostics:");
    formatDiagnostics(result.diagnostics);
    process.exit(1);
  }

  for (const event of result.events) {
    logEvent(event, tracePhases);
  }

  if (writeStdout) {
    console.log(result.tsSource);
    return;
  }

  const target = options.output ?? (isStdin ? "output.ts" : getDefaultOutput(inputPath));
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, result.tsSource, "utf8");
  console.log(`Compiled ${inputPath} -> ${target}`);
}

function logEvent(event: CompilerEvent, tracePhases: Set<string>): void {
  if (tracePhases.size === 0) {
    return;
  }
  if (!tracePhases.has("all") && !tracePhases.has(event.phase)) {
    return;
  }
  const timestamp = new Date(event.timestamp).toISOString();
  const payload = summarizeEventData(event);
  console.error(
    `[trace] ${timestamp} ${event.phase} ${event.kind} seed=${event.seed} stamp=${event.stamp} ${payload}`
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

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
