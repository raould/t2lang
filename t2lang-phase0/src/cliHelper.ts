import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CliOptions {
  input: string;
  output: string | null;
  stdout: boolean;
  ast: boolean;
  pretty: "ugly" | "newlines" | "pretty";
  help: boolean;
  version: boolean;
}

export function parseArgs(args: string[]): CliOptions {
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
      options.pretty = "pretty";
    } else if (arg.startsWith("-") && arg !== "-") {
      console.error(`Error: Unknown option '${arg}'`);
      process.exit(1);
    } else {
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

export function showHelp(notice?: string): void {
  console.log(`
T2 Compiler ${notice ?? ''}

  Usage:
  t2tc <input.t2> [options]
  t2tc - [options]                   # read from stdin

Examples:
  t2tc helloworld.t2                 # produces helloworld.ts
  t2tc helloworld.t2 -o out.ts       # produces out.ts
  t2tc helloworld.t2 --stdout        # prints to stdout
  t2tc -                             # read from stdin, write to stdout
  t2tc - -o out.ts                   # read from stdin, write to file
  echo '(program (foo 1))' | t2tc -  # pipe input

Options:
  -o, --output <file>   Output file path (default: input with .ts extension)
  --stdout              Print output to stdout instead of file
  --ast                 Print AST dump to stderr
  --pretty-option <ugly|newlines|pretty>  Set pretty mode (default: newlines)
  -h, --help            Show this help message
  -v, --version         Show version
`.trim());
}

export function showVersion(pkgPath?: string): void {
  try {
    const file = pkgPath ?? path.join(__dirname, "..", "package.json");
    const pkg = JSON.parse(fs.readFileSync(file, "utf-8"));
    console.log(`t2tc version ${pkg.version}`);
  } catch {
    console.log("t2tc version 0.1.0");
  }
}
console.error("Run 't2tc --help' for usage information");
export function getOutputPath(inputPath: string): string {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, parsed.name + ".ts");
}

export function formatError(error: { message: string; location?: { file: string; line: number; column: number } }): string {
  if (error.location) {
    return `${error.location.file}:${error.location.line}:${error.location.column}: ${error.message}`;
  }
  return error.message;
}

// Delegate runCli to the shared implementation in ../common/src/cliHelper.js
export async function runCli(notice: string, compileFn: (source: string, config?: Partial<any>) => Promise<any>, prettyEnum: { pretty: any; newlines: any; ugly: any }, pkgPath?: string): Promise<void> {
  // Import the shared package (installed via workspace) at runtime.
  const mod = await import("t2lang-common");
  return mod.runCli(notice, compileFn, prettyEnum, pkgPath);
}
