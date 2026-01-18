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

import { compilePhase1 } from "./api.js";
import { PrettyOption } from "./codegen/index.js";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { printSexpr } from './util/sexprPrinter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom CLI: use common parser at runtime but print AST dumps as sexpr
// Import the shared CLI helper. Prefer the local workspace build if present,
// otherwise fall back to the installed package name. This makes development
// flows (running from source) pick up local CLI helper changes.
let parseArgs: any, showHelp: any, showVersion: any, readStdin: any, getOutputPath: any, formatError: any;
try {
    // @ts-expect-error - prefer local workspace helper when running from source
    const local = await import('../common/src/cliHelper.js');
    ({ parseArgs, showHelp, showVersion, readStdin, getOutputPath, formatError } = (local as any));
} catch {
    const mod = await import('t2lang-common');
    ({ parseArgs, showHelp, showVersion, readStdin, getOutputPath, formatError } = (mod as any));
}

const args = process.argv.slice(2);
const options = parseArgs(args);

if (options.help) {
    showHelp("Phase1");
    process.exit(0);
}

if (options.version) {
    showVersion(path.join(__dirname, "..", "package.json"));
    process.exit(0);
}

if (!options.input) {
    console.error("Error: No input file specified (use '-' for stdin)");
    console.error("Run 't2c --help' for usage information");
    process.exit(1);
}

let source;
if (options.input === "-") {
    if (!options.output) options.stdout = true;
    source = await readStdin();
} else {
    const fs = await import('node:fs');
    if (!fs.existsSync(options.input)) { console.error(`Error: File not found: ${options.input}`); process.exit(1); }
    source = fs.readFileSync(options.input, 'utf-8');
}

const mappedPretty = options.pretty === 'pretty' ? PrettyOption.pretty : PrettyOption.ugly;

const result = await compilePhase1(source, {
    logLevel: options.logLevel,
    prettyOutput: mappedPretty,
    dumpAst: options.ast,
    // Cast to any to allow local debug flags passed through to Phase1
    dumpAstBeforeExpand: options.ast || options.astBeforeExpand,
    dumpAstAfterExpand: options.ast || options.astAfterExpand,
    seed: options.seed ?? 'default',
    tracePhases: options.trace ?? [],
    emitTypes: options.emitTypes,
    // enableTsc removed; TypeScript checks should be done with separate tool
} as any);

if (options.ast || options.astBeforeExpand) {
    const parseDump = (result.events as any).find((e: any) => e.kind === 'astDump' && e.phase === 'parse');
    if (parseDump) {
        console.error('--- AST (before macro expansion) ---');
        try { console.error(printSexpr((parseDump as any).data.ast)); } catch (err) { console.error('AST print failed:', String(err)); }
        console.error('--- END AST ---');
    }
}
if (options.ast || options.astAfterExpand) {
    const expandDump = (result.events as any).find((e: any) => e.kind === 'astDump' && e.phase === 'expand');
    if (expandDump) {
        console.error('--- AST (after macro expansion) ---');
        try { console.error(printSexpr((expandDump as any).data.ast)); } catch (err) { console.error('AST print failed:', String(err)); }
        console.error('--- END AST ---');
    }
}

if (result.errors.length > 0) {
    console.error(`Compilation failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) console.error('  ' + formatError(error));
    process.exit(1);
}

if (options.stdout) {
    let out = result.tsSource;
    if (mappedPretty === PrettyOption.pretty) {
        try { const prettier = await import('prettier'); const formatted: any = prettier.format(out, { parser: 'typescript' }); out = (formatted && typeof formatted.then === 'function') ? await formatted : formatted; } catch { /* ignore formatting errors */ }
    }
    console.log(out);
} else {
    const fs = await import('node:fs');
    const outputPath = options.output ?? getOutputPath(options.input);
    let out = result.tsSource;
    if (mappedPretty === PrettyOption.pretty) {
        try { const prettier = await import('prettier'); const formatted: any = prettier.format(out, { parser: 'typescript' }); out = (formatted && typeof formatted.then === 'function') ? await formatted : formatted; } catch { /* ignore formatting errors */ }
    }
    fs.writeFileSync(outputPath, out, 'utf-8');
    console.error(`Compiled ${options.input} -> ${outputPath}`);
}
