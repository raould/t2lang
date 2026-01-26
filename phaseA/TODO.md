# TODO

# now

* Replace the “JSON-only” CLI stub: cli.ts currently expects a serialized AST from stdin. We need to rewire it so t2tc reads .t2 source, parses it, and emits .ts output (matching the user’s “t2tc hello_let.t2 → hello_let.ts” workflow). That means implementing input/output handling (stdin vs file, -o, --stdout, etc.) and flag parsing similar to cli.ts, but without importing Phase0 or Phase1 helpers since Phase A must be self-contained.
* Bootstrapping the pipeline: compilePhaseA (in api.ts) already runs the processor and produces diagnostics/snapshots, but it doesn’t parse actual .t2 text or generate TypeScript. We need to implement the missing pieces in Phase A:
    * Parser: bring in or build a Phase A parser that consumes .t2 text and produces phaseA1 AST nodes (or reuse the existing Phase A parser once available) instead of relying on Phase0’s parser.
    * Codegen: add a code generator that walks the Phase A AST and produces TypeScript text, respecting pretty/ugly modes and emitTypes flags. This will probably live near api.ts or a new codegen module.
    * Diagnostics/tracing: connect the parser + processor so compilePhaseA delivers diagnostics/events just like Phase0 does today (AST dumps, trace events, snapshots). That ensures the CLI can still support --ast*, --trace, etc. without referencing other phases.
* CLI glue: once parsing and codegen exist, update cli.ts to:
    * Parse CLI arguments for input/output, AST dump flags, trace phases, pretty modes, etc.
    * Call compilePhaseA with the parsed source and config, then write the generated TypeScript to the requested destination (file or stdout), handling Prettier when requested.
    * Emit AST dumps/traces via the new event stream.
    * Reuse the serialization helpers for --dump-snapshot or replay hooks as needed.
* Distribution packaging: keep the shebang and package bin entries so npx t2tc runs the Phase A CLI, and ensure tsc builds the CLI entry (maybe add a cli.js entry or hook into package.json scripts).

# then

* Trace/log/event plumbing – Spec mandates a standalone Phase A CLI that emits stage-tagged events (phaseA-parse, phaseA-typecheck, etc.), exposes ArrayEventSink-style traces, includes compiler stamp/UTC/seed info, and honors --trace/--log-level flags. Nothing in src currently interfaces with CLI or event sinks, so wiring Phase A processors into a traced runtime is top priority (matches your suggestion).
    * Add a lightweight PhaseAEventSink (mirroring Phase1’s ArrayEventSink) plus shared PhaseACompilerContext that stores { cacheStamp, seed, events: EventSink }. The processors in phaseA0.ts/phaseA1.ts will accept that context so they can emit events like emit({ phase: "parse", kind: "trace", data: {...}}) before/after each visitor run; these events should include the stage label (phaseA-parse, phaseA-typecheck, etc.), UTC timestamp, compiler stamp, and the current seed per the spec [PhaseA-PhaseB-Spec-Draft.md#CLI&DiagnosticSurface].
    * Extend the returned data from the processors’ run functions so they hand back the diagnostics plus any stage-specific metadata (e.g., parseTime, typecheckTime) so the CLI can populate event payloads for trace listeners.
CLI integration (PhaseA CLI entry)
    * Introduce cli.ts (the future t2tc/t2jc driver) that parses the flags we listed (--trace, --log-level, --seed, --ast*, --emit-types, etc.) using the shared common/cliHelper. That CLI will create the compiler context (seed default, compiler stamp from .internal_id) and instantiate the event sink before it starts.
    * As each pipeline stage runs (parse, optional macro expand, resolve, typecheck, codegen), the CLI records begin/end events via the sink so consumers can filter them with --trace. The CLI also forwards the --log-level setting down to the context so diagnostics and processors can decide whether to emit debug vs. info messages.
    * Build a thin api.ts that wraps the AST processors, adds the new trace hooks, and exposes compilePhaseA(source, config) similar to Phase1’s compilePhase1. The API should:
    * Parse the input (creating the Phase A AST with phaseA1 nodes). Emit phaseA-parse begin/end events (including AST dumps when --ast(-before/after)-expand is enabled).
    * If macros exist in Phase A, run them (or else skip) and emit phaseA-expand.
    * Run the phaseA1 processor for resolve/typecheck, emitting phaseA-resolve/phaseA-typecheck events and capturing diagnostics.
    * Run codegen (eventual output) and emit phaseA-codegen.
    * Each event should carry the current seed from the CLI (e.g., context.seed) and the compiler stamp so the trace log can reproduce the run exactly as the spec requests.
    * Update the processors so they push diagnostics that include phase metadata (parse, resolve, typecheck) and use a Phase A–specific prefix (T2A:) from reg_errors.json.
    * When the CLI emits events, include the diagnostics array so observers can see what errors occurred in that stage; also log them at the requested verbosity level (--log-level).
    * Once tracing is wired, hooking up AST dumps, snapshots, and Prettier will reuse the same event stream: e.g., the CLI can write the AST to disk whenever the phaseA-parse event fires if --ast-before-expand is true, and it can call into a serializer to emit the JSON snapshot mentioned in the tooling section.
    * The CLI’s --trace flag will control which event kinds are printed, and --seed ensures every event payload (and snapshot) references the deterministic seed value.
* Pretty vs. ugly output – The CLI must still run Prettier when --pretty-option pretty is requested, just like Phase1. Right now Phase A only contains AST/processors without any PrettyOption handling or CLI entry point.
* Seed handling (--seed) – The spec says traces and diagnostics must record deterministic seeds. Phase A needs a CLI/api that accepts --seed and surfaces it to the trace/log infrastructure.
* AST dumps (--ast, --ast-before-expand, --ast-after-expand) – These flags should print the AST at each pipeline milestone. The current Phase A code has no parser or CLI to generate those dumps, so building the parse/expand stages (and optional macro stage) plus hooks to log them is required.
* Snapshot serialization per stage – The compiler must be able to serialize each stage (parse, after sugar/macro expand, resolve, typecheck, codegen) for replay. Phase A lacks any stage-tracking infrastructure or snapshot writers, so we’d need to add structured emitters tied to each event dump.
* Pretty-printing of generated .ts – As above, until there’s a CLI that produces codegen output and optionally runs Prettier it’s not implemented.
* Integrating diagnostics registry and namespaces (T2A:) – Diagnostics need to emit stage metadata plus per-phase prefixes, which requires wiring the spec’s registry into the future CLI.

## Pseudocode for missing compiler stages

```
function parse(source: string): ProgramSnapshot {
    const tokens = tokenize(source);
    const ast = walkSexprs(tokens, createPhaseA1Nodes);
    emitEvent('parse:start', { seed, stamp, span: ast.span });
    if (cliFlags.ast || cliFlags.astBeforeExpand) {
        dumpAst(ast);
    }
    emitEvent('parse:done', serialize(ast));
    return { ast, serialized: serialize(ast) };
}

function resolve(program: Program, context: CompilerContext): ResolveResult {
    pushScope();
    for (const stmt of program.body) {
        visitStatement(stmt, { resolve: true, context });
    }
    popScope();
    emitEvent('resolve', { diagnostics: context.diagnostics.slice(), serialized: serialize(program)});
    return { program, diagnostics: context.diagnostics };
}

function typecheck(program: Program, context: CompilerContext): TypecheckResult {
    for (const stmt of program.body) {
        typeCheckStatement(stmt, context);
    }
    emitEvent('typecheck', { diagnostics: context.diagnostics.slice(), serialized: serialize(program) });
    return { program, diagnostics: context.diagnostics };
}

function codegen(program: Program, config: CompilerConfig): CodegenResult {
    const tsSource = emitTs(program, config.prettyOutput);
    const mappings = mapSpans(program, tsSource);
    emitEvent('codegen', { tsSource, mappings, serialized: serialize(program) });
    return { tsSource, mappings };
}

function gatherErrors(context: CompilerContext): CompilerError[] {
    return context.diagnostics.map(d => ({ message: d.message, span: d.span, phase: d.phase || 'phaseA' }));
}

function emitEvent(phase: string, payload: unknown) {
    if (!eventSink) return;
    eventSink.emit({ phase, kind: 'trace', timestamp: Date.now(), stamp, seed, data: payload });
}
```
