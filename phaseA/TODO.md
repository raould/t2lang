# TODO

# pt 1

* Bootstrapping the pipeline: compilePhaseA (in api.ts) already runs the processor and produces diagnostics/snapshots, but it doesn’t parse actual .t2 text or generate TypeScript. We need to implement the missing pieces in Phase A:
    * Parser (Phase A only): consume .t2 text and produce phaseA1 AST nodes per phaseA/GRAMMAR.md and phaseA/AST-Spec-Draft.md (no Phase0/Phase1/common/OLD dependencies).
        * Done: let*, const*, block, assign, return, if, while, basic array/call atoms.
        * Done: for-classic/for-of/for-await, throw, try/catch/finally, switch, prop/index/object/new, import/export, type forms.
    * Codegen: walk the Phase A AST and emit TS, respecting pretty/ugly and emitTypes flags.
        * Done: let/const bindings, assign, return, block, if, while; array/call/ident/literal.
        * Done: for/try/throw/switch, prop/index/object/new, functions/classes, import/export, types, operator lowering.
    * Done: Diagnostics/tracing: connect parser + processor so compilePhaseA emits diagnostics/events (AST dumps, trace events, snapshots) compatible with the CLI flags (--ast*, --log, --log-level).
    * Done: Enrich event/diagnostic metadata (e.g., severity tags) so --log-level=warn/error can truly filter logs without disabling all event output.
* Done: CLI glue: once parsing and codegen exist, update cli.ts to:
    * Parse CLI arguments for input/output, AST dump flags, trace phases, pretty modes, etc.
    * Call compilePhaseA with the parsed source and config, then write the generated TypeScript to the requested destination (file or stdout), handling Prettier when requested.
    * Emit AST dumps/traces via the new event stream.
    * Reuse the serialization helpers for --dump-snapshot or replay hooks as needed.
* Distribution packaging: keep the shebang and package bin entries so npx t2tc runs the Phase A CLI, and ensure tsc builds the CLI entry (maybe add a cli.js entry or hook into package.json scripts).

# pt 2

* Next: Grammar implementation checklist (Phase A parser + codegen, aligned with phaseA/GRAMMAR.md and AST-Spec-Draft.md):
    * Done: program + stmt forms: program, exprStmt, block, let*, const*, assign, return, if, while, for-classic, for-of/for-await, throw, try/catch/finally, switch.
    * Done: core expr forms: call, prop (literal property only), index (computed), object, array, ternary, new, await, yield, spread.
    * Done: declarations: fn, class, method, field, interface, type-alias, import/export.
    * Done: operator lowering: recognize operator-call heads and emit infix/prefix TS (Phase B sugar stays separate).
    * Done: type AST parsing/emission: type-ref, type-literal, type-object, type-array, type-union, type-intersection, type-function, type-mapped, typeparams, type-app.

# pt 3

* Phase B macros must update --ast-before-expand and --ast-after-expand to be working before and after macros, repectively.

* Trace/log/event plumbing – Spec mandates a standalone Phase A CLI that emits stage-tagged events (phaseA-parse, phaseA-typecheck, etc.), exposes ArrayEventSink-style traces, includes compiler stamp/UTC/seed info, and honors --trace/--log-level flags. Nothing in src currently interfaces with CLI or event sinks, so wiring Phase A processors into a traced runtime is top priority (matches your suggestion).
    * Add a lightweight PhaseAEventSink (mirroring Phase1’s ArrayEventSink) plus shared PhaseACompilerContext that stores { cacheStamp, seed, events: EventSink }. The processors in phaseA0.ts/phaseA1.ts will accept that context so they can emit events like emit({ phase: "parse", kind: "trace", data: {...}}) before/after each visitor run; these events should include the stage label (phaseA-parse, phaseA-typecheck, etc.), UTC timestamp, compiler stamp, and the current seed per the spec [PhaseA-PhaseB-Spec-Draft.md#CLI&DiagnosticSurface].
    * Extend the returned data from the processors’ run functions so they hand back the diagnostics plus any stage-specific metadata (e.g., parseTime, typecheckTime) so the CLI can populate event payloads for trace listeners.

# pt 4

* CLI integration (PhaseA CLI entry)
    * Once tracing is wired, hooking up AST dumps, snapshots, and Prettier will reuse the same event stream: e.g., the CLI can write the AST to disk whenever the phaseA-parse event fires if --ast-before-expand is true, and it can call into a serializer to emit the JSON snapshot mentioned in the tooling section.
    * The CLI’s --trace flag will control which event kinds are printed, and --seed ensures every event payload (and snapshot) references the deterministic seed value.
    * Pretty vs. ugly output – The CLI must still run Prettier when --pretty-option pretty is requested, just like Phase1. Right now Phase A only contains AST/processors without any PrettyOption handling or CLI entry point.
    * Seed handling (--seed) – The spec says traces and diagnostics must record deterministic seeds. Phase A needs a CLI/api that accepts --seed and surfaces it to the trace/log infrastructure.
    * AST dumps (--ast, --ast-before-expand, --ast-after-expand) – These flags should print the AST at each pipeline milestone. The current Phase A code has no parser or CLI to generate those dumps, so building the parse/expand stages (and optional macro stage) plus hooks to log them is required.
    * Snapshot serialization per stage – The compiler must be able to serialize each stage (parse, after sugar/macro expand, resolve, typecheck, codegen) for replay. Phase A lacks any stage-tracking infrastructure or snapshot writers, so we’d need to add structured emitters tied to each event dump.
    * Pretty-printing of generated .ts – As above, until there’s a CLI that produces codegen output and optionally runs Prettier it’s not implemented.
    * Integrating diagnostics registry and namespaces (T2A:) – Diagnostics need to emit stage metadata plus per-phase prefixes, which requires wiring the spec’s registry into the future CLI.

# pt 5

* Phase B macros, sugar.
  * dot-forms.
  * infix.

