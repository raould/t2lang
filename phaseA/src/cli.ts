#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { compilePhaseA } from "./api.js";

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

function formatDiagnostics(diags: Array<{ message: string; span?: { source?: string; start?: number; end?: number } }>): void {
  for (const diag of diags) {
    if (diag.span && diag.span.source) {
      console.error(`${diag.span.source}:${diag.span.start ?? 0}-${diag.span.end ?? 0}: ${diag.message}`);
    } else {
      console.error(diag.message);
    }
  }
}

export async function main(argv: string[]): Promise<void> {
  const args = argv.slice(2);
  let inputPath: string | null = null;
  let outputPath: string | null = null;
  let writeStdout = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-o" || arg === "--output") {
      i++;
      if (i >= args.length) {
        console.error("Error: --output requires a file path");
        process.exit(1);
      }
      outputPath = args[i];
    } else if (arg === "--stdout") {
      writeStdout = true;
    } else if (arg.startsWith("-") && arg !== "-") {
      console.error(`Unknown option '${arg}'`);
      process.exit(1);
    } else {
      if (inputPath) {
        console.error("Error: Multiple input files not supported");
        process.exit(1);
      }
      inputPath = arg;
    }
  }

  if (!inputPath) {
    console.error("Error: No input file specified (use '-' for stdin)");
    process.exit(1);
  }

  const isStdin = inputPath === "-";
  if (isStdin && !outputPath && !writeStdout) {
    writeStdout = true;
  }
  if (outputPath === "-") {
    writeStdout = true;
    outputPath = null;
  }

  const source = await readSource(inputPath);
  const result = await compilePhaseA(source);

  if (result.diagnostics.length > 0) {
    console.error("Compilation produced diagnostics:");
    formatDiagnostics(result.diagnostics);
    process.exit(1);
  }

  if (writeStdout) {
    console.log(result.tsSource);
    return;
  }

  const target = outputPath ?? (isStdin ? "output.ts" : getDefaultOutput(inputPath));
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, result.tsSource, "utf8");
  console.log(`Compiled ${inputPath} -> ${target}`);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}