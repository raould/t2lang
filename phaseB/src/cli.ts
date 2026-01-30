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
      handleParserFailure(error, args.format, { sourceMap: { [actualPath]: source } });
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
    if (arg.startsWith("-")) {
      throw new CliError(`Unknown option '${arg}'`);
    }
    if (inputPath) {
      throw new CliError("Multiple input paths are not supported");
    }
    inputPath = arg;
  }

  return { inputPath, format, showHelp };
}

function printHelp(): void {
  console.log(
    `Usage: ${CLI_NAME} [options] <input>

Options:
  --error-format <format>  Choose diagnostic output (tty, short, json); defaults to ${DEFAULT_ERROR_FORMAT}
  -h, --help               Show this help message`
  );
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
