#!/usr/bin/env node
/**
 * T2 Phase 0 Compiler CLI
 * 
 * Usage:
 *   t2c <input.t2> [options]
 *   t2c - [options]                   # read from stdin
 *   cat file.t2 | t2c -               # pipe input
 * 
 * Examples:
 *   t2c helloworld.t2                 # produces helloworld.ts
 *   t2c helloworld.t2 -o out.ts       # produces out.ts
 *   t2c helloworld.t2 --stdout        # prints to stdout
 *   t2c -                             # read from stdin, write to stdout
 *   t2c - -o out.ts                   # read from stdin, write to file
 *   echo '(program (foo 1))' | t2c -  # pipe input
 * 
 * Options:
 *   -o, --output <file>   Output file path (default: input with .ts extension)
 *   --stdout              Print output to stdout instead of file
 *   --ast                 Print AST dump to stderr
 *   --pretty-option       <ugly|newlines|pretty>  Set pretty mode (default: newlines)
 *   -h, --help            Show this help message
 *   -v, --version         Show version
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { compilePhase0 } from "./api.js";
import { PrettyOption } from "./codegen/tsCodegen.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CliOptions {
  input: string;
  output: string | null;
  stdout: boolean;
  ast: boolean;
  pretty: "ugly" | "newlines" | "pretty";
  help: boolean;
  version: boolean;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    input: "",
    output: null,
    stdout: false,
    ast: false,
    pretty: "newlines",
    help: false,
    version: false,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else if (arg === "-v" || arg === "--version") {
      options.version = true;
    } else if (arg === "-o" || arg === "--output") {
      i++;
      if (i >= args.length) {
        console.error("Error: --output requires a file path");
        process.exit(1);
      }
      options.output = args[i];
    } else if (arg === "--stdout") {
      options.stdout = true;
    } else if (arg === "--ast") {
      options.ast = true;
    } else if (arg === "--pretty-option") {
      i++;
      if (i >= args.length) {
        console.error("Error: --pretty-option requires a mode (ugly|newlines|pretty)");
        process.exit(1);
      }
      const mode = args[i];
      if (mode !== "ugly" && mode !== "newlines" && mode !== "pretty") {
        console.error(`Error: Invalid pretty mode '${mode}'. Use one of: ugly, newlines, pretty`);
        process.exit(1);
      }
      options.pretty = mode as "ugly" | "newlines" | "pretty";
    } else if (arg === "--pretty") {
      // Request full Prettier formatting
      options.pretty = "pretty";
    } else if (arg.startsWith("-") && arg !== "-") {
      console.error(`Error: Unknown option '${arg}'`);
      process.exit(1);
    } else {
      // Positional argument = input file (or "-" for stdin)
      if (options.input) {
        console.error("Error: Multiple input files not supported");
        process.exit(1);
      }
      options.input = arg;
    }
    i++;
  }

  return options;
}

function showHelp(): void {
  console.log(`
T2 Phase 0 Compiler

Usage:
  t2c <input.t2> [options]
  t2c - [options]                   # read from stdin

Examples:
  t2c helloworld.t2                 # produces helloworld.ts
  t2c helloworld.t2 -o out.ts       # produces out.ts
  t2c helloworld.t2 --stdout       # prints to stdout
  t2c -                             # read from stdin, write to stdout
  t2c - -o out.ts                   # read from stdin, write to file
  echo '(program (foo 1))' | t2c -  # pipe input

Options:
  -o, --output <file>   Output file path (default: input with .ts extension)
  --stdout              Print output to stdout instead of file
  --ast                 Print AST dump to stderr
  --pretty-option <ugly|newlines|pretty>  Set pretty mode (default: newlines)
  -h, --help            Show this help message
  -v, --version         Show version
`.trim());
}

function showVersion(): void {
  // Read version from package.json
  try {
    const pkgPath = path.join(__dirname, "..", "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    console.log(`t2c version ${pkg.version}`);
  } catch {
    console.log("t2c version 0.1.0");
  }
}

function getOutputPath(inputPath: string): string {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, parsed.name + ".ts");
}

function formatError(error: { message: string; location?: { file: string; line: number; column: number } }): string {
  if (error.location) {
    return `${error.location.file}:${error.location.line}:${error.location.column}: ${error.message}`;
  }
  return error.message;
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      resolve(data);
    });
    process.stdin.on("error", (err) => {
      reject(err);
    });
  });
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  if (options.version) {
    showVersion();
    process.exit(0);
  }

  if (!options.input) {
    console.error("Error: No input file specified (use '-' for stdin)");
    console.error("Run 't2c --help' for usage information");
    process.exit(1);
  }

  // Read source from file or stdin
  let source: string;
  const isStdin = options.input === "-";

  if (isStdin) {
    // Reading from stdin implies stdout output (unless -o is specified)
    if (!options.output) {
      options.stdout = true;
    }
    source = await readStdin();
  } else {
    // Check input file exists
    if (!fs.existsSync(options.input)) {
      console.error(`Error: File not found: ${options.input}`);
      process.exit(1);
    }
    source = fs.readFileSync(options.input, "utf-8");
  }

  // Compile
  let mappedPretty: PrettyOption;
  switch (options.pretty) {
    case "pretty":
      mappedPretty = PrettyOption.pretty;
      break;
    case "newlines":
      mappedPretty = PrettyOption.newlines;
      break;
    case "ugly":
      mappedPretty = PrettyOption.ugly;
      break;
    default:
      throw new Error(`Unknown pretty mode: ${options.pretty}`);
  }

  const result = await compilePhase0(source, {
    prettyOutput: mappedPretty,
    dumpAst: options.ast,
  });

  // Print AST if requested
  if (options.ast) {
    const astDump = result.events.find(e => e.kind === "astDump");
    if (astDump) {
      console.error("--- AST ---");
      console.error(JSON.stringify(astDump.data, null, 2));
      console.error("--- END AST ---");
    }
  }

  // Check for errors
  if (result.errors.length > 0) {
    console.error(`Compilation failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) {
      console.error("  " + formatError(error));
    }
    process.exit(1);
  }

  // Output
  if (options.stdout) {
    console.log(result.tsSource);
  } else {
    const outputPath = options.output ?? getOutputPath(options.input);
    fs.writeFileSync(outputPath, result.tsSource, "utf-8");
    console.error(`Compiled ${options.input} -> ${outputPath}`);
  }
}

main();
