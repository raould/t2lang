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
 *   --pretty-option       <ugly|pretty>  Set pretty mode (default: pretty)
 *   -h, --help            Show this help message
 *   -v, --version         Show version
 */

import { compilePhase1 } from "./api.js";
import { PrettyOption } from "./codegen/index.js";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { printSexpr } from './util/sexprPrinter.js';
import * as fs from 'node:fs';
import { rewriteSugar, rewriteSugarWithMap, parseToNodes } from "./parse/sugarRewrite.js";
import { Parser } from "./parse/parser.js";

// Static imports from the shared CLI helper to avoid runtime `import()` logic.
import * as common from 't2lang-common';
import type { CompilerEvent } from "./events/eventSink.js";
type CliOptions = {
    help?: boolean;
    version?: boolean;
    input?: string;
    output?: string;
    stdout?: boolean;
    ast?: boolean;
    astBeforeExpand?: boolean;
    astAfterExpand?: boolean;
    pretty?: 'pretty' | 'ugly';
    logLevel?: string;
    seed?: string;
    trace?: string[];
    emitTypes?: boolean;
};

type CommonCliImports = {
    parseArgs: (args: string[]) => CliOptions;
    showHelp: (notice?: string) => void;
    showVersion: (pkgPath?: string) => void;
    readStdin: () => Promise<string>;
    getOutputPath: (input: string) => string;
    formatError: (err: { message: string; location?: { file: string; line: number; column: number } }) => string;
    importOptional: (mod: string) => Promise<unknown>;
};
const { parseArgs, showHelp, showVersion, readStdin, getOutputPath, formatError, importOptional } = common as unknown as CommonCliImports;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (!fs.existsSync(options.input)) { console.error(`Error: File not found: ${options.input}`); process.exit(1); }
    source = fs.readFileSync(options.input, 'utf-8');
}

const mappedPretty = options.pretty === 'pretty' ? PrettyOption.pretty : PrettyOption.ugly;

let result = await compilePhase1(source, {
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
} as Parameters<typeof compilePhase1>[1]);
// If compilation failed when input was piped via stdin, emit diagnostics
// (rewrite, token stream, parse nodes) to stderr to help debug tokenization
// and parser mismatches that only appear for piped input.
if (options.input === "-" && result.errors.length > 0) {
    try {
        // Attempt to map error locations (which refer to the rewritten
        // source) back to the original stdin source so line/column
        // numbers are meaningful to the user. Prefer the char-level
        // mapping produced by `rewriteSugarWithMap`, falling back to
        // heuristic string searches when the char map is empty.
        const mapLocationToOriginal = (err: any) => {
            if (!err || !err.location || typeof err.location.start !== 'number') return err;
            const rstart = err.location.start as number;
            const rend = (typeof err.location.end === 'number') ? err.location.end as number : rstart;
            // Use precise char-map if available
            if (typeof rewriteRes !== 'undefined' && Array.isArray(rewriteRes.map) && rewriteRes.map.length > 0 && rstart >= 0 && rstart < rewriteRes.text.length) {
                const origStart = rewriteRes.map[Math.min(rstart, rewriteRes.map.length - 1)];
                const mapEndIndex = Math.min(rend, rewriteRes.map.length - 1);
                let origEnd = (mapEndIndex >= 0) ? rewriteRes.map[mapEndIndex] : (rewriteRes.map[rewriteRes.map.length - 1] ?? source.length);
                if (origEnd < origStart) origEnd = origStart;
                const upTo = source.slice(0, origStart);
                const line = (upTo.match(/\n/g)?.length ?? 0) + 1;
                const lastNl = upTo.lastIndexOf('\n');
                const column = origStart - (lastNl === -1 ? 0 : lastNl + 1) + 1;
                return { ...err, location: { file: 'input.t2', start: origStart, end: origEnd, line, column } };
            }

            // Fall back to previous token/ctx heuristics when the map is empty
            const rewritten = rewriteRes ? rewriteRes.text : (() => { try { return rewriteSugar(source); } catch { return ''; } })();
            const start = rstart;
            const end = rend;
            const token = rewritten.slice(start, end).trim();
            const ctxBefore = rewritten.slice(Math.max(0, start - 20), start);
            const ctxAfter = rewritten.slice(end, Math.min(rewritten.length, end + 20));
            const candidates = [] as string[];
            if (token) candidates.push(token);
            if (token) candidates.push(`returns ${token}`);
            if (token) candidates.push(`: ${token}`);
            if (ctxBefore || ctxAfter) candidates.push((ctxBefore + token + ctxAfter).trim());
            for (const cand of candidates) {
                if (!cand) continue;
                const idx = source.indexOf(cand);
                if (idx !== -1) {
                    const upTo = source.slice(0, idx);
                    const line = (upTo.match(/\n/g)?.length ?? 0) + 1;
                    const lastNl = upTo.lastIndexOf('\n');
                    const column = idx - (lastNl === -1 ? 0 : lastNl + 1) + 1;
                    const newLoc = { file: 'input.t2', start: idx, end: idx + cand.length, line, column };
                    return { ...err, location: newLoc };
                }
            }
            return err;
        };

        // Build rewritten once for mapping attempts (text + char->orig map)
        const rewriteRes = (() => {
            try { return rewriteSugarWithMap(source); }
            catch (e) {
                try { return { text: rewriteSugar(source), map: [] as number[] }; } catch { return { text: '', map: [] as number[] }; }
            }
        })();
        const rewrittenForMap = rewriteRes.text;
        const parseDump = result.events.find((e: any) => e.kind === 'astDump' && e.phase === 'parse');
        const parsedAst = parseDump ? (parseDump.data && (((parseDump.data) as any).ast ?? parseDump.data)) : null;
        const mappedErrors = result.errors.map((e: any) => {
            let mapped = mapLocationToOriginal(e);
            if (mapped.location && mapped.location.line === 1 && parsedAst) {
                // Try AST-based mapping: find a parse node that encloses the
                // rewritten location and map using a nearby identifier (e.g. method name).
                const findEnclosing = (node: any): any | null => {
                    if (!node || !node.location) return null;
                    if (node.location.start <= e.location.start && e.location.end <= node.location.end) return node;
                    for (const k of Object.keys(node)) {
                        const child = node[k];
                        if (Array.isArray(child)) {
                            for (const c of child) {
                                if (typeof c === 'object' && c !== null) {
                                    const found = findEnclosing(c);
                                    if (found) return found;
                                }
                            }
                        } else if (typeof child === 'object' && child !== null) {
                            const found = findEnclosing(child);
                            if (found) return found;
                        }
                    }
                    return null;
                };
                const node = findEnclosing(parsedAst);
                if (node && typeof node === 'object') {
                    // Try mapping by node name if available
                    const nameVal = (node.name && (node.name.name ?? node.name)) || (node.kind === 'method' && node.name) || null;
                    let searchName = null;
                    if (nameVal && typeof nameVal === 'string') {
                        // strip surrounding quotes if present
                        searchName = nameVal.replace(/^\"|\"$/g, '');
                    }
                    if (searchName) {
                        const idx = source.indexOf(searchName);
                        if (idx !== -1) {
                            // look for a nearby ": TYPE" token after the name on same line
                            const lineStart = source.lastIndexOf('\n', idx) + 1;
                            const lineEndIdx = source.indexOf('\n', idx);
                            const lineEnd = lineEndIdx === -1 ? source.length : lineEndIdx;
                            const lineText = source.slice(lineStart, lineEnd);
                            // search for ': <token>' in the line
                            const token = rewrittenForMap.slice(e.location.start, e.location.end).trim();
                            const colonIdx = lineText.indexOf(`: ${token}`);
                            if (colonIdx !== -1) {
                                const absIdx = lineStart + colonIdx + 2; // position at token start
                                const upTo = source.slice(0, absIdx);
                                const line = (upTo.match(/\n/g)?.length ?? 0) + 1;
                                const lastNl = upTo.lastIndexOf('\n');
                                const column = absIdx - (lastNl === -1 ? 0 : lastNl + 1) + 1;
                                mapped = { ...mapped, location: { file: 'input.t2', start: absIdx, end: absIdx + token.length, line, column } };
                            }
                        }
                    }
                }
            }
            return mapped;
        });
        result = { ...result, errors: mappedErrors };

        // Recompute line/column from the original stdin `source` using
        // any numeric `location.start` offset so printed locations point
        // into the piped file instead of the rewritten text.
        const recomputeFromSource = (err: any) => {
            if (!err || !err.location) return err;
            const loc = err.location;
            if (typeof loc.start === 'number' && loc.start >= 0 && loc.start <= source.length) {
                const up = source.slice(0, loc.start);
                const line = (up.match(/\n/g)?.length ?? 0) + 1;
                const lastNl = up.lastIndexOf('\n');
                const column = loc.start - (lastNl === -1 ? 0 : lastNl + 1) + 1;
                return { ...err, location: { file: 'input.t2', start: loc.start, end: Math.min(loc.end ?? loc.start, source.length), line, column } };
            }
            return err;
        };

        result = { ...result, errors: result.errors.map(recomputeFromSource) };
        const firstErr = result.errors[0];
        console.error('--- STDIN DIAGNOSTICS BEGIN ---');
        console.error(`stdin length: ${source.length}`);
        console.error('First error:', JSON.stringify(firstErr));

        // Show the Phase1 rewrite output (first/last slices)
        try {
            const rewritten = rewriteRes.text;
            console.error('--- Rewritten source (trimmed) ---');
            console.error(rewritten.slice(0, 1024));
            if (rewritten.length > 1024) console.error('... (truncated)');
        } catch (e) {
            console.error('rewriteSugar failed:', String(e));
        }

        // Show parseToNodes (token-level parsed s-exprs) from the raw source
        try {
            const nodes = parseToNodes(source);
            console.error('--- parseToNodes (first 20 nodes) ---');
            console.error(JSON.stringify(nodes.slice(0, 20), null, 2));
        } catch (e) {
            console.error('parseToNodes failed:', String(e));
        }

        // Build a Parser over the rewritten source and dump the token stream
        try {
            const diagCtx = { config: {}, eventSink: { emit: () => {} } } as any;
            const rewritten = rewriteRes.text;
            const parserForTokens = new Parser('input.t2', rewritten, diagCtx as any);
            const toks = (parserForTokens as any).base.tokens as any[];
            console.error('--- Tokens (index, kind, value, location) ---');
            for (let i = 0; i < toks.length; i++) {
                const t = toks[i];
                // show problematic characters (error tokens) and dot-sigil markers
                if (i < 120 || t.kind === 'error' || (t.kind === 'identifier' && typeof t.value === 'string' && t.value.startsWith('.'))) {
                    console.error(i, t.kind, String(t.value), JSON.stringify(t.location));
                } else if (i === 120) {
                    console.error('...');
                }
            }
            console.error('Total tokens:', toks.length);
        } catch (e) {
            console.error('token dump failed:', String(e));
        }

        console.error('--- STDIN DIAGNOSTICS END ---');
    } catch (e) {
        console.error('stdin diagnostics failed:', String(e));
    }

        // Note: previously we attempted a fallback by writing stdin to a
        // temporary file and re-running compilation. That behavior created
        // ephemeral files in the repo root and made mapping logic harder to
        // reason about. With the char-level rewrite mapping in place we do
        // not need the file fallback; keep diagnostics as-is.
}

if (options.ast || options.astBeforeExpand) {
    const parseDump = result.events.find((e: CompilerEvent) => e.kind === 'astDump' && e.phase === 'parse') as CompilerEvent | undefined;
    if (parseDump) {
        console.error('--- AST (before macro expansion) ---');
        try {
            const payload = parseDump.data;
            const toPrint = (payload && typeof payload === 'object' && 'ast' in (payload as Record<string, unknown>)) ? ((payload as Record<string, unknown>).ast ?? payload) : payload;
            console.error(printSexpr(toPrint));
        } catch (err) { console.error('AST print failed:', String(err)); }
        console.error('--- END AST ---');
    }
}
if (options.ast || options.astAfterExpand) {
    const expandDump = result.events.find((e: CompilerEvent) => e.kind === 'astDump' && e.phase === 'expand') as CompilerEvent | undefined;
    if (expandDump) {
        console.error('--- AST (after macro expansion) ---');
        try {
            const payload = expandDump.data;
            const toPrint = (payload && typeof payload === 'object' && 'ast' in (payload as Record<string, unknown>)) ? ((payload as Record<string, unknown>).ast ?? payload) : payload;
            console.error(printSexpr(toPrint));
        } catch (err) { console.error('AST print failed:', String(err)); }
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
        try {
            const prettier = await importOptional('prettier');
            if (prettier) {
                const prettierAny = prettier as { format?: (text: string, opts?: { parser: string }) => string | Promise<string> };
                if (prettierAny.format) {
                    const formatted = prettierAny.format(out, { parser: 'typescript' }) as string | Promise<string>;
                    if (formatted && typeof (formatted as any).then === 'function') {
                        out = await (formatted as Promise<string>);
                    } else if (typeof formatted === 'string') {
                        out = formatted;
                    }
                }
            }
        } catch { /* ignore formatting errors */ }
    }
    console.log(out);
} else {
    const outputPath = options.output ?? getOutputPath(options.input);
    let out = result.tsSource;
    if (mappedPretty === PrettyOption.pretty) {
        try {
            const prettier = await importOptional('prettier');
            if (prettier) {
                const prettierAny = prettier as { format?: (text: string, opts?: { parser: string }) => string | Promise<string> };
                if (prettierAny.format) {
                    const formatted = prettierAny.format(out, { parser: 'typescript' }) as string | Promise<string>;
                    if (formatted && typeof (formatted as any).then === 'function') {
                        out = await (formatted as Promise<string>);
                    } else if (typeof formatted === 'string') {
                        out = formatted;
                    }
                }
            }
        } catch { /* ignore formatting errors */ }
    }
    fs.writeFileSync(outputPath, out, 'utf-8');
    console.error(`Compiled ${options.input} -> ${outputPath}`);
}
