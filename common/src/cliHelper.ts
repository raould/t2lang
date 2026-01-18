import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { printSexpr } from './ast/sexprPrinter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CliOptions {
    input: string;
    output: string | null;
    stdout: boolean;
    ast: boolean;
    astBeforeExpand: boolean;
    astAfterExpand: boolean;
    pretty: "ugly" | "newlines" | "pretty";
    help: boolean;
    version: boolean;

    // CompilerConfig-related flags
    emitTypes: boolean;
    enableTsc?: boolean;
    seed?: string;
    trace?: string[];
    logLevel: "none" | "debug";
}

const SUPPORTED_TRACE_PHASES = ['parse', 'expand', 'resolve', 'typeCheck', 'codegen', 'tsc'];

export function parseArgs(args: string[]): CliOptions {
    const options: CliOptions = {
        input: "",
        output: null,
        stdout: false,
        ast: false,
        astBeforeExpand: false,
        astAfterExpand: false,
        pretty: "newlines",
        help: false,
        version: false,
        emitTypes: true,
        seed: undefined,
        trace: [],
        logLevel: "none",
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
        } else if (arg === "--ast-before-expand") {
            options.astBeforeExpand = true;
        } else if (arg === "--ast-after-expand") {
            options.astAfterExpand = true;
        } else if (arg === "--emit-types") {
            options.emitTypes = true;
        } else if (arg === "--enable-tsc") {
            options.enableTsc = true;
        } else if (arg === "--seed") {
            i++;
            if (i >= args.length) {
                console.error("Error: --seed requires a seed string");
                process.exit(1);
            }
            options.seed = args[i];
        } else if (arg === "--trace") {
            i++;
            if (i >= args.length) {
                console.error("Error: --trace requires a comma-separated list of phases");
                process.exit(1);
            }
            const phases = args[i].split(",").map(s => s.trim()).filter(Boolean);
            // Validate phases
            for (const p of phases) {
                if (!SUPPORTED_TRACE_PHASES.includes(p)) {
                    throw new Error(`Unknown trace phase '${p}'. Supported phases: ${SUPPORTED_TRACE_PHASES.join(', ')}`);
                }
            }
            options.trace = phases;
        } else if (arg === "--log-level") {
            i++;
            if (i >= args.length) {
                console.error("Error: --log-level requires a value (none|debug)");
                process.exit(1);
            }
            const val = args[i];
            if (val !== "none" && val !== "debug") {
                console.error(`Error: Invalid log-level '${val}'. Use 'none' or 'debug'`);
                process.exit(1);
            }
            options.logLevel = val as "none" | "debug";
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
  t2c <input.t2> [options]
  t2c - [options]                   # read from stdin

Examples:
  t2c helloworld.t2                 # produces helloworld.ts
  t2c helloworld.t2 -o out.ts       # produces out.ts
  t2c helloworld.t2 --stdout        # prints to stdout
  t2c -                             # read from stdin, write to stdout
  t2c - -o out.ts                   # read from stdin, write to file
  echo '(program (foo 1))' | t2c -  # pipe input

Options:
  -o, --output <file>   Output file path (default: input with .ts extension)
  --stdout              Print output to stdout instead of file
    --ast                 Print AST dump to stderr (both before and after macro expansion)
    --ast-before-expand   Print AST dump to stderr just before macro expansion
    --ast-after-expand    Print AST dump to stderr just after macro expansion
    --pretty-option <ugly|newlines|pretty>  Set pretty mode (default: pretty)
  --emit-types          Emit TypeScript type annotations in output
  --enable-tsc          Run TypeScript compiler on emitted output (enableTsc)
  --seed <string>       Set compiler seed value
  --trace <p1,p2>       Comma-separated trace phases (supported: parse, expand, resolve, typeCheck, codegen, tsc)
  --log-level <none|debug>  Set logging verbosity
  -h, --help            Show this help message
  -v, --version         Show version
`.trim());
}

export function showVersion(pkgPath?: string): void {
    try {
        const file = pkgPath ?? path.join(__dirname, "..", "package.json");
        const pkg = JSON.parse(fs.readFileSync(file, "utf-8"));
        console.log(`t2c version ${pkg.version}`);
    } catch {
        console.log("t2c version 0.1.0");
    }
}

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

export function readStdin(): Promise<string> {
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

// Run CLI. Use `any` for compilation types to avoid leaking phase-specific
// type dependencies into the shared helper.
export async function runCli(
    notice: string,
    compileFn: (source: string, config?: Partial<any>) => Promise<any>,
    prettyEnum: { pretty: any; newlines: any; ugly: any },
    pkgPath?: string
): Promise<void> {
    const args = process.argv.slice(2);
    const options = parseArgs(args);

    if (options.help) {
        showHelp(notice);
        process.exit(0);
    }

    if (options.version) {
        showVersion(pkgPath);
        process.exit(0);
    }

    if (!options.input) {
        console.error("Error: No input file specified (use '-' for stdin)");
        console.error("Run 't2c --help' for usage information");
        process.exit(1);
    }

    let source: string;
    const isStdin = options.input === "-";

    if (isStdin) {
        if (!options.output) {
            options.stdout = true;
        }
        source = await readStdin();
    } else {
        if (!fs.existsSync(options.input)) {
            console.error(`Error: File not found: ${options.input}`);
            process.exit(1);
        }
        source = fs.readFileSync(options.input, "utf-8");
    }

    let mappedPretty: any = prettyEnum.pretty;
    switch (options.pretty) {
        case "pretty":
            mappedPretty = prettyEnum.pretty;
            break;
        case "newlines":
            mappedPretty = prettyEnum.newlines;
            break;
        case "ugly":
            mappedPretty = prettyEnum.ugly;
            break;
        default:
            throw new Error(`Unknown pretty mode: ${options.pretty}`);
    }

    const result = await compileFn(source, {
        logLevel: options.logLevel,
        prettyOutput: mappedPretty,
        // Legacy `--ast` toggles both dumps; the more specific flags control
        // dumps independently.
        dumpAst: options.ast,
        dumpAstBeforeExpand: options.ast || options.astBeforeExpand,
        dumpAstAfterExpand: options.ast || options.astAfterExpand,
        seed: options.seed ?? "default",
        tracePhases: options.trace ?? [],
        emitTypes: options.emitTypes
        , enableTsc: options.enableTsc ?? false
    });

    // Print ASTs according to requested flags. If `--ast` was given, print
    // both before and after expansion (if available). Otherwise print the
    // specific requested dump(s).
    if (options.ast || options.astBeforeExpand) {
        const parseDump = result.events.find((e: any) => e.kind === "astDump" && e.phase === 'parse');
        if (parseDump) {
            console.error("--- AST (before macro expansion) ---");
            console.error("--- WARNING: This is pseudo-code, NOT valid T2 syntax! ---");
            try {
                const ast = (parseDump.data && (parseDump.data.ast ?? parseDump.data)) || parseDump.data;
                console.error(printSexpr(ast));
            } catch (err) {
                console.error('AST print failed:', String(err));
                console.error(JSON.stringify(parseDump.data, null, 2));
            }
            console.error("--- END AST ---");
        }
    }
    if (options.ast || options.astAfterExpand) {
        const expandDump = result.events.find((e: any) => e.kind === "astDump" && e.phase === 'expand');
        if (expandDump) {
            console.error("--- AST (after macro expansion) ---");
            console.error("--- WARNING: This is pseudo-code, NOT valid T2 syntax! ---");
            try {
                const ast = (expandDump.data && (expandDump.data.ast ?? expandDump.data)) || expandDump.data;
                console.error(printSexpr(ast));
            } catch (err) {
                console.error('AST print failed:', String(err));
                console.error(JSON.stringify(expandDump.data, null, 2));
            }
            console.error("--- END AST ---");
        }
    }

    if (result.errors.length > 0) {
        console.error(`Compilation failed with ${result.errors.length} error(s):`);
        for (const error of result.errors) {
            console.error("  " + formatError(error));
        }
        process.exit(1);
    }

    if (options.stdout) {
        let out = result.tsSource;
        try {
            const prettier = await import('prettier');
            const formatted: any = prettier.format(out, { parser: 'typescript' });
            if (formatted && typeof formatted.then === 'function') {
                out = await formatted;
            } else {
                out = formatted;
            }
        } catch {
            // ignore
        }
        console.log(out);
    } else {
        const outputPath = options.output ?? getOutputPath(options.input);
        let out = result.tsSource;
        try {
            const prettier = await import('prettier');
            const formatted: any = prettier.format(out, { parser: 'typescript' });
            if (formatted && typeof formatted.then === 'function') {
                out = await formatted;
            } else {
                out = formatted;
            }
        } catch {
            // ignore
        }
        fs.writeFileSync(outputPath, out, "utf-8");
        console.error(`Compiled ${options.input} -> ${outputPath}`);
    }
}
