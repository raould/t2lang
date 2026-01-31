#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { ParseError, parsePhaseB } from "./reader.js";
import {
  DEFAULT_ERROR_FORMAT,
  DiagnosticContext,
  ErrorFormat,
  diagnosticFromParseError,
  formatDiagnostics,
  parseErrorFormat,
} from "./diagnostics.js";

const CLI_NAME = "t2b";

class CliError extends Error {}

interface CliArgs {
  inputPath?: string;
  format: ErrorFormat;
  showHelp: boolean;
  color: boolean;
}

export async function main(argv: string[]): Promise<void> {
  try {
    const args = parseArguments(argv);
    if (args.showHelp) {
      printHelp();
      return;
    }

    if (!args.inputPath) {
      printHelp();
      process.exitCode = 1;
      return;
    }

    const { source, actualPath } = await readSource(args.inputPath);
    try {
      parsePhaseB(source, actualPath);
    } catch (error) {
      handleParserFailure(error, args.format, {
        sourceMap: { [actualPath]: source },
        useColor: args.color,
      });
    }
  } catch (error) {
    if (error instanceof CliError) {
      console.error(error.message);
      printHelp();
      process.exitCode = 1;
      return;
    }
    throw error;
  }
}

function parseArguments(argv: string[]): CliArgs {
  let format: ErrorFormat = DEFAULT_ERROR_FORMAT;
  let inputPath: string | undefined;
  let showHelp = false;
  let color = true;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "-h" || arg === "--help") {
      showHelp = true;
      break;
    }
    if (arg === "--error-format") {
      const next = argv[++index];
      if (!next) {
        throw new CliError("--error-format requires a value");
      }
      const parsed = parseErrorFormat(next);
      if (!parsed) {
        #!/usr/bin/env node
        import fs from "node:fs/promises";
        import path from "node:path";
        import process from "node:process";
        import { fileURLToPath } from "node:url";
        import { ParseError, parsePhaseB } from "./reader.js";
        import { compilePhaseA } from "../phaseA/src/api.js";
        import {
          DEFAULT_ERROR_FORMAT,
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
        } from "../phaseA/src/events.js";

        const CLI_NAME = "t2b";
        const VALID_LOG_PHASES: CompilerStage[] = ["parse", "resolve", "typecheck", "codegen"];
        const VALID_PRETTY_OPTIONS = ["pretty", "ugly"] as const;

        type PrettyOption = (typeof VALID_PRETTY_OPTIONS)[number];

        interface CliArgs {
          inputPath?: string;
          format: ErrorFormat;
          showHelp: boolean;
          color: boolean;
          output?: string;
          stdout: boolean;
          seed: string;
          prettyOption: PrettyOption;
          log: boolean;
          logLevel: EventSeverity;
          logPhases: string[];
          trace: boolean;
          tracePhases: string[];
        }

        class CliError extends Error {}

        export async function main(argv: string[]): Promise<void> {
          try {
            const args = parseArguments(argv);
            if (args.showHelp) {
              printHelp();
              return;
            }

            if (!args.inputPath) {
              printHelp();
              process.exitCode = 1;
              return;
            }

            const { source, actualPath } = await readSource(args.inputPath);
            try {
              parsePhaseB(source, actualPath);
            } catch (error) {
              handleParserFailure(error, args.format, {
                sourceMap: { [actualPath]: source },
                useColor: args.color,
              });
              return;
            }

            const isStdin = actualPath === "<stdin>";
            const writeStdout = args.stdout || isStdin;
            const sourcePath = actualPath;
            const prettyOption = args.prettyOption;
            const compilerStamp = await loadCompilerStamp();
            const compilerContext = {
              events: new ArrayEventSink(),
              seed: args.seed,
              stamp: compilerStamp,
              logLevel: args.logLevel,
            };

            const diagContext: DiagnosticContext = {
              sourceMap: { [sourcePath]: source },
              useColor: args.color,
            };

            const result = await compilePhaseA(source, {
              sourcePath,
              seed: args.seed,
              prettyOption,
              logLevel: args.logLevel,
              compilerContext,
            });

            if (result.diagnostics.length > 0) {
              console.error("Compilation produced diagnostics:");
              console.error(formatDiagnostics(result.diagnostics, args.format, diagContext));
              process.exitCode = 1;
              return;
            }

            const target = args.output ?? (isStdin ? "stdout.ts" : getDefaultOutput(args.inputPath));
            if (writeStdout) {
              console.log(result.tsSource);
            } else {
              await fs.mkdir(path.dirname(target), { recursive: true });
              await fs.writeFile(target, result.tsSource, "utf8");
              console.error(`Compiled ${args.inputPath} -> ${target}`);
            }

            const logPhases = new Set<string>(args.logPhases);
            if (args.log) {
              logPhases.add("all");
            }
            const tracePhases = new Set<string>(args.tracePhases);
            if (args.trace) {
              tracePhases.add("all");
            }

            for (const event of result.events) {
              logEvent(event, logPhases, args.logLevel);
              logTraceEvent(event, tracePhases, args.logLevel);
            }
          } catch (error) {
            if (error instanceof CliError) {
              console.error(error.message);
              printHelp();
              process.exitCode = 1;
              return;
            }
            throw error;
          }
        }

        function parseArguments(argv: string[]): CliArgs {
          let format: ErrorFormat = DEFAULT_ERROR_FORMAT;
          let inputPath: string | undefined;
          let showHelp = false;
          let color = true;
          let output: string | undefined;
          let stdout = false;
          let seed = "default";
          let prettyOption: PrettyOption = "pretty";
          let log = false;
          let logLevel: EventSeverity = "info";
          const logPhases: string[] = [];
          let trace = false;
          const tracePhases: string[] = [];

          for (let index = 0; index < argv.length; index += 1) {
            const arg = argv[index];
            if (arg === "-h" || arg === "--help") {
              showHelp = true;
              break;
            }
            if (arg === "--error-format") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--error-format requires a value");
              }
              const parsed = parseErrorFormat(next);
              if (!parsed) {
                throw new CliError(`Unknown error format '${next}'`);
              }
              format = parsed;
              continue;
            }
            if (arg.startsWith("--error-format=")) {
              const [, supplied] = arg.split("=", 2);
              const parsed = parseErrorFormat(supplied);
              if (!parsed) {
                throw new CliError(`Unknown error format '${supplied}'`);
              }
              format = parsed;
              continue;
            }
            if (arg === "--color") {
              color = true;
              continue;
            }
            if (arg === "--no-color") {
              color = false;
              continue;
            }
            if (arg === "--output") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--output requires a path");
              }
              output = next;
              continue;
            }
            if (arg === "--stdout") {
              stdout = true;
              continue;
            }
            if (arg === "--seed") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--seed requires a value");
              }
              seed = next;
              continue;
            }
            if (arg === "--pretty-option") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--pretty-option requires either 'pretty' or 'ugly'");
              }
              if (!VALID_PRETTY_OPTIONS.includes(next as PrettyOption)) {
                throw new CliError(`Unknown pretty option '${next}'`);
              }
              prettyOption = next as PrettyOption;
              continue;
            }
            if (arg === "--log") {
              log = true;
              continue;
            }
            if (arg === "--log-level") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--log-level requires a value");
              }
              if (!isEventSeverity(next)) {
                throw new CliError(`Unknown log level '${next}'`);
              }
              logLevel = next;
              continue;
            }
            if (arg === "--log-phases") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--log-phases requires at least one phase");
              }
              logPhases.push(...parsePhaseList(next));
              continue;
            }
            if (arg === "--trace") {
              trace = true;
              continue;
            }
            if (arg === "--trace-phases") {
              const next = argv[++index];
              if (!next) {
                throw new CliError("--trace-phases requires at least one phase");
              }
              tracePhases.push(...parsePhaseList(next));
              continue;
            }
            if (arg.startsWith("-")) {
              throw new CliError(`Unknown option '${arg}'`);
            }
            if (inputPath) {
              throw new CliError("Multiple input paths are not supported");
            }
            inputPath = arg;
          }

          return {
            inputPath,
            format,
            showHelp,
            color,
            output,
            stdout,
            seed,
            prettyOption,
            log,
            logLevel,
            logPhases,
            trace,
            tracePhases,
          };
        }

        function parsePhaseList(value: string): string[] {
          const phases = value
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);
          if (phases.length === 0) {
            throw new CliError("At least one phase must be specified");
          }
          for (const phase of phases) {
            if (!VALID_LOG_PHASES.includes(phase as CompilerStage)) {
              throw new CliError(`Unknown phase '${phase}'`);
            }
          }
          return phases;
        }

        function printHelp(): void {
          console.log(`Usage: ${CLI_NAME} [options] <input>
        \nOptions:
          --error-format <format>  Choose diagnostic output (tty, short, json); defaults to ${DEFAULT_ERROR_FORMAT}
          --color                  Force colored diagnostic output (default)
          --no-color               Disable diagnostic coloring
          --output <path>          Write TypeScript output to a file
          --stdout                 Always print TypeScript to stdout
          --seed <value>           Deterministic seed value for compilation (default: 'default')
          --pretty-option <style>  Format output (pretty|ugly) (default: pretty)
          --log                    Emit compiler events as log messages
          --log-level <level>      Set the minimum severity for emitted logs (debug, info, warn, error)
          --log-phases <phases>    Comma-separated phases to include in logs
          --trace                  Emit trace events
          --trace-phases <phases>  Comma-separated phases to include in traces
          -h, --help               Show this help message`);
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

        function logTraceEvent(event: CompilerEvent, phases: Set<string>, level: EventSeverity): void {
          if (event.kind !== "trace") {
            return;
          }
          if (phases.size === 0) {
            return;
          }
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
            `[trace] ${timestamp} ${event.phase} seed=${event.seed} stamp=${event.stamp} ${payload}${diagSummary}`
          );
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
              } catch (err) {
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
          main(process.argv.slice(2)).catch((error) => {
            console.error(error);
            process.exitCode = 1;
          });
        }
